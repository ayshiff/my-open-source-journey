---
id: backstage3794
title: Backstage - Techdocs AWS Support
---

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info Pull-Request link
https://github.com/backstage/backstage/pull/3794
:::

:::tip Pull-Request Type
This PR is a new **feature**.
:::

## Introduction



### Project description

<img
  alt="Backstage presentation"
  src="https://raw.githubusercontent.com/backstage/backstage/master/docs/assets/headline.png"
/>

<a href="https://backstage.io/"><Highlight color="#25c2a0">Website link</Highlight></a>

When you want to deploy something in the cloud you probably need tools like Terraform, Kubernetes, CI pipelines, the AWS CLI...

Backstage is a platform that **unifies** all your infrastructure tooling, services, documentation with a single UI.   
It gives you an uniform overview of all your services. It also lets you create easily new ressources such as a new backend service.

Backstage was created by **Spotify** but is now hosted by the **Cloud Native Computing Foundation (CNCF)** as a Sandbox level project.

For more informations about Backstage you can find it <a href="https://backstage.io/docs/overview/what-is-backstage"><Highlight color="#25c2a0">here</Highlight></a>.


### Context

To understand a little bit more about the initial issue you need to understand what TechDocs is.

Techdocs is a docs-like-code solution build into Backstage.
This means you can write your documentation in Markdown files which live next to your code.

*Today, it is one of the core products in Spotify’s developer experience offering with 2,400+ documentation sites and 1,000+ engineers using it daily.* ***backstage.io***

You can read more about TechDocs announcement <a href="https://backstage.io/blog/2020/09/08/announcing-tech-docs"><Highlight color="#25c2a0">here</Highlight></a>.

### Current behavior

To render the documentation, TechDocs uses the generated static files.   
In the "recommended" setup you need to add a cloud storage providers like `Google GCS`, `AWS S3`, etc.

Currently only `Google GCS` is supported by TechDocs, the goal of the issue was to implement AWS S3 as TechDocs external storage to store and read generated documentation sites.

:::note Issue link
https://github.com/backstage/backstage/issues/3714
:::

## Implement the solution

### New behavior - What does this implement/fix ?
### Proposed changes

**NOTE:** the code blocks are intentionally not complete for the sake of readability.
If you want to read the full code you'll find it in the PR link at the top.

:::caution code blocks
The code blocks are intentionally not complete for the sake of readability.   
If you want to read the full code you'll find it in the PR link at the top.
:::

**Added a new `awsS3` publisher**

```ts title="packages/techdocs-common/src/stages/publish/awsS3.ts"
export class AwsS3Publish implements PublisherBase {
  static fromConfig(config: Config, logger: Logger): PublisherBase {
    /**
     *  Instantiate our aws S3 client with credentials and
     *  region from the environement variables
     */
    const storageClient = new aws.S3({
      credentials: { accessKeyId, secretAccessKey },
      ...(region && { region }),
    });

    return new AwsS3Publish(storageClient, bucketName, logger);
  }

  constructor(
    private readonly storageClient: aws.S3,
    private readonly bucketName: string,
    private readonly logger: Logger,
  ) {
    this.storageClient = storageClient;
    this.bucketName = bucketName;
    this.logger = logger;
  }

  /**
   * Upload all the files from the generated `directory` to the S3 bucket.
   * Directory structure used in the bucket is - entityNamespace/entityKind/entityName/index.html
   */
  publish({ entity, directory }: PublishRequest): Promise<void> {
  }

  fetchTechDocsMetadata(entityName: EntityName): Promise<string> {
  }

  /**
   * Express route middleware to serve static files on a route in techdocs-backend.
   */
  docsRouter(): express.Handler {

  }

  /**
   * A helper function which checks if index.html of an Entity's docs site is available. This
   * can be used to verify if there are any pre-generated docs available to serve.
   */
  async hasDocsBeenGenerated(entity: Entity): Promise<boolean> {

  }
}
```

**Added tests and mocks for the publisher**

```ts title="packages/techdocs-common/src/stages/publish/publish.test.ts"
// ...
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
// ...
```

```ts title="packages/techdocs-common/__mocks__/aws-sdk.ts"
export class S3 {
  private readonly options;

  constructor(options: S3Types.ClientConfiguration) {
    this.options = options;
  }

  headObject({ Key }: { Key: string }) {
    return {
      promise: () => this.checkFileExists(Key),
    };
  }

  getObject({ Key }: { Key: string }) {
    return {
      promise: () => this.checkFileExists(Key),
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

  checkFileExists(Key: string) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(Key)) {
        resolve('');
      } else {
        reject({ message: 'The object doest not exist !' });
      }
    });
  }

  headBucket() {
    // ...
  }

  upload() {
    // ...
  }
}

export default {
  S3,
};
```
**Added steps about how to use AWS S3 in TechDocs**

**Updates config reference documentation**

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

<a href="https://github.com/backstage/backstage/blob/174fede6f08fc4234dae748116cf6b388b03acbc/packages/techdocs-common/src/stages/publish/awsS3.ts"><Highlight color="#25c2a0">Link</Highlight></a>


## Takeaway

### Problems encountered

Someone in the comments suggested using <a href="https://aws.amazon.com/about-aws/whats-new/2020/12/aws-sdk-javascript-version-3-generally-available/"><Highlight color="#25c2a0">AWS JavaScript SDK v3</Highlight></a> as it has first-class TypeScript support.
The issue was that there was a problem with Typescript that was going to be fixed in a <a href="https://github.com/aws/aws-sdk-js-v3/pull/1812"><Highlight color="#25c2a0">PR</Highlight></a>.   
So I had to wait until the fix was merged to bump the aws sdk version.
### What did I learn ?
