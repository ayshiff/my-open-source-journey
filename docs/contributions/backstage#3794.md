---
id: backstage3794
title: Backstage - Techdocs AWS Support
sidebar_label: 1 / Backstage - Techdocs AWS Support
---

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';

<div className="marginBottom">
  <span className="badge badge--secondary marginRight">Typescript</span>
  <span className="badge badge--secondary marginRight">AWS</span>
  <span className="badge badge--secondary marginRight">Documentation</span>
</div>


:::info Pull-Request link
https://github.com/backstage/backstage/pull/3794
:::

:::tip Pull-Request Type
This PR is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
<br/>
<img
  alt="Contribution presentation"
  width="500px"
  src={useBaseUrl('img/backstage3794/presentation.png')}
/>
<br/>
<em>Techdocs AWS Support</em>
</div>

### Project

You can find the <a href="/docs/projects/backstage"><Highlight color="#25c2a0">Backstage project presentation here</Highlight></a>.

### Context

To understand a little bit more about the initial issue you need to understand what TechDocs is.

Techdocs is a docs-like-code solution build into Backstage.
This means you can write your documentation in Markdown files which live next to your code.

*Today, it is one of the core products in Spotify’s developer experience offering with 2,400+ documentation sites and 1,000+ engineers using it daily.* ***backstage.io***

You can read more about TechDocs announcement <a href="https://backstage.io/blog/2020/09/08/announcing-tech-docs"><Highlight color="#25c2a0">here</Highlight></a>.

### Current behavior

To render the documentation, TechDocs uses the generated static files.   
In the "recommended" setup you need to add a cloud storage providers like `Google GCS`, `AWS S3`, etc.

Currently only `Google GCS` is supported by TechDocs, the goal of the issue is to implement `AWS S3` as TechDocs external storage to store and read generated documentation sites.

:::note Issue link
https://github.com/backstage/backstage/issues/3714
:::

## Implement the solution

:::caution code blocks
The code blocks are intentionally not complete for the sake of readability.   
If you want to read the full code you'll find it in the PR link at the top.
:::

### Add a new `awsS3` publisher

The publisher is used for **two things**:

- **publish** generated static files to a storage
- **read** files from storage when users visit a TechDocs page 

Each publisher needs to implement `PublisherBase` abstract class and its four methods (`publish`, `fetchTechDocsMetadata`, `docsRouter` and `hasDocsBeenGenerated`).

- The `publish` method is used to upload all the files from the generated `directory` to the S3 bucket.
- The `hasDocsBeenGenerated` method is used to check if index.html of an Entity's docs site is available.
- The `fetchTechDocsMetadata` method is used to fetch the `techdocs_metadata.json` file from our bucket.
- The `docsRouter` method is used to create an express middleware that serves static files in techdocs-backend.

Before implementaing our methods we need to instatntiate the AWS SDK with some config:

- `credentials.accessKeyId`: the User **access key id**
- `credentials.secretAccessKey`: the User **secret access key**
- `region`: AWS Region

Now that our sdk is instantiated we can implement our methods.

We'll take the example of the `fetchTechDocsMetadata` method:

```ts title="packages/techdocs-common/src/stages/publish/awsS3.ts"
  fetchTechDocsMetadata(entityName: EntityName): Promise<string> {
    return new Promise((resolve, reject) => {
      const entityRootDir = `${entityName.namespace}/${entityName.kind}/${entityName.name}`;

      const fileStreamChunks: Array<any> = [];
      this.storageClient
        // Retrieves our object from Amazon S3
        .getObject({
          Bucket: this.bucketName,
          Key: `${entityRootDir}/techdocs_metadata.json`,
        })
        // Returns the raw HTTP stream managed by the request
        .createReadStream()
        // Listen for errors returned by the service
        .on('error', err => {
          this.logger.error(err.message);
          reject(err.message);
        })
        .on('data', chunk => {
          fileStreamChunks.push(chunk);
        })
        .on('end', () => {
          const techdocsMetadataJson = Buffer.concat(
            fileStreamChunks,
          ).toString();
          resolve(techdocsMetadataJson);
        });
    });
  }
```

### Add tests and mock `aws-sdk`

I followed the TDD method by writing my tests first and then write the code that will allow these tests to pass.

For a better understanding in this article, I prefer to present the code to you before presenting the tests.

Following the BDD Approach for the `fetchTechDocsMetadata` test, we have something like:

- **Given** a `entityNameMock` containing a `name`, `namespace` and a `kind`
- **When** the user wants to fetch the tech docs metadata
- **Then** the user gets the tech docs metadata content

By taking the previous method, we have a test file that looks like:

```ts title="packages/techdocs-common/src/stages/publish/publish.test.ts"
describe('fetchTechDocsMetadata', () => {
   it('should return tech docs metadata', async () => {
    const entityNameMock = {
      name: 'name',
      namespace: '/namespace',
      kind: 'kind',
    };
    const entityRootDir = `${entityNameMock.namespace}/${entityNameMock.kind}/${entityNameMock.name}`;

    mockFs({
      [entityRootDir]: {
        'techdocs_metadata.json': 'file-content',
      },
    });

    expect(await publisher.fetchTechDocsMetadata(entityNameMock)).toBe(
      'file-content',
    );
    mockFs.restore();
   });
});
```

As you can see in the code above, we don't actually use the real AWS SDK, we mocked it.

To test the publisher behavior, we need to **mock the AWS SDK** which provides a JS API for AWS services.
To do this I used jest's mock feature. As our library is called `aws-sdk`, we will create a file` aws-sdk.ts` in `__mocks__` containing our implementation of the `S3` methods.   
We will then have to define in this file an `S3` class which corresponds to the class we are using.

For the tests we mock the reading of our files from a bucket with local files that we mock with `mock-fs`.

```ts title="packages/techdocs-common/__mocks__/aws-sdk.ts"
export class S3 {
  private readonly options;

  constructor(options: S3Types.ClientConfiguration) {
    this.options = options;
  }
  // ...

  // We mock the `getObject` method of aws-sdk/S3
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property

  getObject({ Key }: { Key: string }) {
    return {
      createReadStream: () => {
        const emitter = new EventEmitter();
        process.nextTick(() => {
          if (fs.existsSync(Key)) {
            emitter.emit('data', Buffer.from(fs.readFileSync(Key)));
          } else {
            emitter.emit(
              'error',
              new Error(`The file ${Key} doest not exist !`),
            );
          }
          emitter.emit('end');
        });
        return emitter;
      },
    };
  }
}

export default {
  S3,
};
```

### Add steps about how to use AWS S3 in TechDocs

The main step here was to explain to the users how they can **configure an AWS S3 Bucket** with TechDocs.   

I did an <a href="https://github.com/backstage/backstage/blob/acdcf944e890ad44c0124e658981e4ed0d14893e/docs/features/techdocs/using-cloud-storage.md"><Highlight color="#25c2a0">explanation</Highlight></a> on how to use **AWS Policies** and how they work.   
In the example we show how to use the *User* and *Bucket* policy to manage our access to our Bucket.

<div className="image-wrapper">
<br/>
<img
  alt="AWS S3 TechDocs"
  width="100%"
  src={useBaseUrl('img/backstage3794/aws-s3.drawio.svg')}
/>
<br/>
<em>AWS S3 in TechDocs</em>
</div>

As specified in the comments of the pull request, a next feature will be implemented on top of this one to handle S3 configuration apart from creating an access user agent.   
It will add the possibility to read from the instance profile or `~/.aws/credentials`.

### Add the "glue" between our elements

This step contains all the other elements that form the glue between the main pieces of this contribution.   
I still find it important to add it since without these elements our code cannot work.   

Our job as developers is also to write documentation, add comments ... which will improve the **Developer experience (DX)**.

#### Updates config reference documentation

```py {4-10} title="docs/features/techdocs/configuration.md"
# Required when techdocs.publisher.type is set to 'awsS3'. Skip otherwise.
awsS3:
  # An API key is required to write to a storage bucket.
  credentials:
    accessKeyId:
      $env: TECHDOCS_AWSS3_ACCESS_KEY_ID_CREDENTIAL
    secretAccessKey:
      $env: TECHDOCS_AWSS3_SECRET_ACCESS_KEY_CREDENTIAL
  region:
    $env: AWSS3_REGION
  # AWS S3 Bucket Name
  bucketName: 'techdocs-storage',
```

#### Updates configuration schema

```ts title="plugins/techdocs/config.d.ts"
{
  /**
   * attr: 'type' - accepts a string value
   * e.g. type: 'awsS3'
   * alternatives: 'googleGcs' etc.
   * @see http://backstage.io/docs/features/techdocs/configuration
   */
  type: 'awsS3';
  /**
   * awsS3 required when 'type' is set to awsS3
   */
  awsS3?: {
    /**
     * Credentials used to access a storage bucket
     * @visibility secret
     */
    credentials: {
      /**
       * User access key id
       * attr: 'accessKeyId' - accepts a string value
       * @visibility secret
       */
      accessKeyId: string;
      /**
       * User secret access key
       * attr: 'secretAccessKey' - accepts a string value
       * @visibility secret
       */
      secretAccessKey: string;
    };
    /**
     * Cloud Storage Bucket Name
     * attr: 'bucketName' - accepts a string value
     * @visibility secret
     */
    bucketName: string;
    /**
     * AWS Region
     * attr: 'region' - accepts a string value
     * @visibility secret
     */
    region?: string;
  };
}
```

### Add changesets

The final step is to add **changesets** which will contains the list of our file changes.   
It lets us declare **how our changes should be released**.   
In our case we only have `patch` changes.

```py title=".changeset/chilly-dodos-drop.md"
---
'@backstage/techdocs-common': patch
'@backstage/plugin-techdocs-backend': patch
---

1. Added option to use AWS S3 as a choice to store the static generated files for TechDocs.
```

## Takeaway

### Problems encountered

Someone in the comments suggested using <a href="https://aws.amazon.com/about-aws/whats-new/2020/12/aws-sdk-javascript-version-3-generally-available/"><Highlight color="#25c2a0">AWS JavaScript SDK v3</Highlight></a> as it has first-class TypeScript support.
The issue was that there was a problem with Typescript that was going to be fixed in a <a href="https://github.com/aws/aws-sdk-js-v3/pull/1812"><Highlight color="#25c2a0">PR</Highlight></a>.   
So I had to wait until the fix was merged to bump the aws sdk version.

In addition, after merging the PR into master, the tests on Windows did not pass.   
This was related to the path delimiters used in tests by `mock-fs`.   
So I had to do another <a href="https://github.com/backstage/backstage/pull/3925"><Highlight color="#25c2a0">Pull Request</Highlight></a> to fix this problem.
### What did I learn ?

This contribution allowed me to use the `aws-sdk` v3 and to compare it with the v2 version.
It also allowed me to improve my english by writing some documentation (Not being a native English speaker, it is important for me to improve myself by practicing my English.)

It allowed me, thanks to the review of the different members working on the project, to improve my code, my logic and to question my work to be more rigorous.