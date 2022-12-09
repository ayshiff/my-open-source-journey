"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[327,364],{121:function(e,t,n){n.r(t),n.d(t,{Highlight:function(){return u},assets:function(){return d},contentTitle:function(){return l},default:function(){return m},frontMatter:function(){return r},metadata:function(){return c},toc:function(){return p}});var a=n(3117),s=(n(7294),n(3905)),i=n(4996),o=n(6395);const r={id:"backstage3794",title:"Backstage - Techdocs AWS Support",sidebar_label:"3. Backstage - Techdocs AWS Support"},l=void 0,c={unversionedId:"contributions/backstage3794",id:"contributions/backstage3794",title:"Backstage - Techdocs AWS Support",description:"Typescript",source:"@site/docs/contributions/backstage#3794.md",sourceDirName:"contributions",slug:"/contributions/backstage3794",permalink:"/docs/contributions/backstage3794",draft:!1,editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/contributions/backstage#3794.md",tags:[],version:"current",frontMatter:{id:"backstage3794",title:"Backstage - Techdocs AWS Support",sidebar_label:"3. Backstage - Techdocs AWS Support"},sidebar:"docs",previous:{title:"2. xLayers - Rethink UX",permalink:"/docs/contributions/xlayers395"},next:{title:"4. LifeTime - Activity detail",permalink:"/docs/contributions/lifetime28"}},d={},u=e=>{let{children:t,color:n}=e;return(0,s.kt)("span",{style:{backgroundColor:n,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},p=[{value:"Introduction",id:"introduction",level:2},{value:"Project",id:"project",level:3},{value:"Context",id:"context",level:3},{value:"Current behavior",id:"current-behavior",level:3},{value:"Implement the solution",id:"implement-the-solution",level:2},{value:"Add a new <code>awsS3</code> publisher",id:"add-a-new-awss3-publisher",level:3},{value:"Add tests and mock <code>aws-sdk</code>",id:"add-tests-and-mock-aws-sdk",level:3},{value:"Add steps about how to use AWS S3 in TechDocs",id:"add-steps-about-how-to-use-aws-s3-in-techdocs",level:3},{value:"Add the &quot;glue&quot; between our elements",id:"add-the-glue-between-our-elements",level:3},{value:"Updates config reference documentation",id:"updates-config-reference-documentation",level:4},{value:"Updates configuration schema",id:"updates-configuration-schema",level:4},{value:"Add changesets",id:"add-changesets",level:3},{value:"Takeaway",id:"takeaway",level:2},{value:"Problems encountered",id:"problems-encountered",level:3},{value:"What did I learn ?",id:"what-did-i-learn-",level:3}],h={Highlight:u,toc:p};function m(e){let{components:t,...n}=e;return(0,s.kt)("wrapper",(0,a.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("div",{className:"pr_infos"},(0,s.kt)("div",{className:"marginBottom"},(0,s.kt)("div",null,(0,s.kt)(o.Merged,{date:"7 Jan 2021",mdxType:"Merged"})),(0,s.kt)("span",{className:"badge badge--secondary marginRight"},"Typescript"),(0,s.kt)("span",{className:"badge badge--secondary marginRight"},"AWS"),(0,s.kt)("span",{className:"badge badge--secondary marginRight"},"Documentation"))),(0,s.kt)("admonition",{title:"Contribution link",type:"info"},(0,s.kt)("p",{parentName:"admonition"},(0,s.kt)("a",{parentName:"p",href:"https://github.com/backstage/backstage/pull/3794"},"https://github.com/backstage/backstage/pull/3794"))),(0,s.kt)("admonition",{title:"Contribution Type",type:"tip"},(0,s.kt)("p",{parentName:"admonition"},"This contribution is a new ",(0,s.kt)("strong",{parentName:"p"},"feature"),".")),(0,s.kt)("h2",{id:"introduction"},"Introduction"),(0,s.kt)("div",{className:"image-wrapper"},(0,s.kt)("br",null),(0,s.kt)("img",{alt:"Contribution presentation",width:"100%",src:(0,i.Z)("img/backstage3794/cover.jpg")}),(0,s.kt)("br",null),(0,s.kt)("em",null,"Techdocs AWS Support")),(0,s.kt)("h3",{id:"project"},"Project"),(0,s.kt)("p",null,"You can find the ",(0,s.kt)("a",{href:"/docs/projects/backstage"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"Backstage project presentation here")),"."),(0,s.kt)("h3",{id:"context"},"Context"),(0,s.kt)("p",null,"To understand a little bit more about the initial issue you need to understand what TechDocs is."),(0,s.kt)("p",null,"Techdocs is a docs-like-code solution build into Backstage.\nThis means you can write your documentation in Markdown files which live next to your code."),(0,s.kt)("p",null,(0,s.kt)("em",{parentName:"p"},"Today, it is one of the core products in Spotify\u2019s developer experience offering with 2,400+ documentation sites and 1,000+ engineers using it daily.")," ",(0,s.kt)("strong",{parentName:"p"},(0,s.kt)("em",{parentName:"strong"},"backstage.io"))),(0,s.kt)("p",null,"You can read more about TechDocs announcement ",(0,s.kt)("a",{href:"https://backstage.io/blog/2020/09/08/announcing-tech-docs"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"here")),"."),(0,s.kt)("h3",{id:"current-behavior"},"Current behavior"),(0,s.kt)("p",null,"To render the documentation, TechDocs uses the generated static files.",(0,s.kt)("br",{parentName:"p"}),"\n",'In the "recommended" setup you need to add a cloud storage providers like ',(0,s.kt)("inlineCode",{parentName:"p"},"Google GCS"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"AWS S3"),", etc."),(0,s.kt)("p",null,"Currently only ",(0,s.kt)("inlineCode",{parentName:"p"},"Google GCS")," is supported by TechDocs, the goal of the issue is to implement ",(0,s.kt)("inlineCode",{parentName:"p"},"AWS S3")," as TechDocs external storage to store and read generated documentation sites."),(0,s.kt)("admonition",{title:"Issue link",type:"note"},(0,s.kt)("p",{parentName:"admonition"},(0,s.kt)("a",{parentName:"p",href:"https://github.com/backstage/backstage/issues/3714"},"https://github.com/backstage/backstage/issues/3714"))),(0,s.kt)("h2",{id:"implement-the-solution"},"Implement the solution"),(0,s.kt)("admonition",{title:"code blocks",type:"caution"},(0,s.kt)("p",{parentName:"admonition"},"The code blocks are intentionally incomplete for the sake of readability.",(0,s.kt)("br",{parentName:"p"}),"\n","If you want to read the full code you'll find it in the PR link at the top.")),(0,s.kt)("h3",{id:"add-a-new-awss3-publisher"},"Add a new ",(0,s.kt)("inlineCode",{parentName:"h3"},"awsS3")," publisher"),(0,s.kt)("p",null,"The publisher is used for ",(0,s.kt)("strong",{parentName:"p"},"two things"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"publish")," generated static files to a storage"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"read")," files from storage when users visit a TechDocs page")),(0,s.kt)("p",null,"Each publisher needs to implement ",(0,s.kt)("inlineCode",{parentName:"p"},"PublisherBase")," abstract class and its four methods (",(0,s.kt)("inlineCode",{parentName:"p"},"publish"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"fetchTechDocsMetadata"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"docsRouter")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"hasDocsBeenGenerated"),")."),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"The ",(0,s.kt)("inlineCode",{parentName:"li"},"publish")," method is used to upload all the files from the generated ",(0,s.kt)("inlineCode",{parentName:"li"},"directory")," to the S3 bucket."),(0,s.kt)("li",{parentName:"ul"},"The ",(0,s.kt)("inlineCode",{parentName:"li"},"hasDocsBeenGenerated")," method is used to check if index.html of an Entity's docs site is available."),(0,s.kt)("li",{parentName:"ul"},"The ",(0,s.kt)("inlineCode",{parentName:"li"},"fetchTechDocsMetadata")," method is used to fetch the ",(0,s.kt)("inlineCode",{parentName:"li"},"techdocs_metadata.json")," file from our bucket."),(0,s.kt)("li",{parentName:"ul"},"The ",(0,s.kt)("inlineCode",{parentName:"li"},"docsRouter")," method is used to create an express middleware that serves static files in techdocs-backend.")),(0,s.kt)("p",null,"Before implementaing our methods we need to instantiate the AWS SDK with some config:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"credentials.accessKeyId"),": the User ",(0,s.kt)("strong",{parentName:"li"},"access key id")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"credentials.secretAccessKey"),": the User ",(0,s.kt)("strong",{parentName:"li"},"secret access key")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("inlineCode",{parentName:"li"},"region"),": AWS Region")),(0,s.kt)("p",null,"Now that our sdk is instantiated we can implement our methods."),(0,s.kt)("p",null,"We'll take the example of the ",(0,s.kt)("inlineCode",{parentName:"p"},"fetchTechDocsMetadata")," method:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="packages/techdocs-common/src/stages/publish/awsS3.ts"',title:'"packages/techdocs-common/src/stages/publish/awsS3.ts"'},"  fetchTechDocsMetadata(entityName: EntityName): Promise<string> {\n    return new Promise((resolve, reject) => {\n      const entityRootDir = `${entityName.namespace}/${entityName.kind}/${entityName.name}`;\n\n      const fileStreamChunks: Array<any> = [];\n      this.storageClient\n        // Retrieves our object from Amazon S3\n        .getObject({\n          Bucket: this.bucketName,\n          Key: `${entityRootDir}/techdocs_metadata.json`,\n        })\n        // Returns the raw HTTP stream managed by the request\n        .createReadStream()\n        // Listen for errors returned by the service\n        .on('error', err => {\n          this.logger.error(err.message);\n          reject(err.message);\n        })\n        .on('data', chunk => {\n          fileStreamChunks.push(chunk);\n        })\n        .on('end', () => {\n          const techdocsMetadataJson = Buffer.concat(\n            fileStreamChunks,\n          ).toString();\n          resolve(techdocsMetadataJson);\n        });\n    });\n  }\n")),(0,s.kt)("h3",{id:"add-tests-and-mock-aws-sdk"},"Add tests and mock ",(0,s.kt)("inlineCode",{parentName:"h3"},"aws-sdk")),(0,s.kt)("p",null,"I followed the TDD method by writing my tests first and then write the code that will allow these tests to pass."),(0,s.kt)("p",null,"For a better understanding of this article, I prefer to present the code to you before presenting the tests."),(0,s.kt)("p",null,"Following the BDD Approach for the ",(0,s.kt)("inlineCode",{parentName:"p"},"fetchTechDocsMetadata")," test, we have something like:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Given")," a ",(0,s.kt)("inlineCode",{parentName:"li"},"entityNameMock")," containing a ",(0,s.kt)("inlineCode",{parentName:"li"},"name"),", ",(0,s.kt)("inlineCode",{parentName:"li"},"namespace")," and a ",(0,s.kt)("inlineCode",{parentName:"li"},"kind")),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"When")," the user wants to fetch the tech docs metadata"),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Then")," the user gets the tech docs metadata content")),(0,s.kt)("p",null,"By taking the previous method, we have a test file that looks like:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="packages/techdocs-common/src/stages/publish/publish.test.ts"',title:'"packages/techdocs-common/src/stages/publish/publish.test.ts"'},'describe("fetchTechDocsMetadata", () => {\n  it("should return tech docs metadata", async () => {\n    const entityNameMock = {\n      name: "name",\n      namespace: "/namespace",\n      kind: "kind",\n    };\n    const entityRootDir = `${entityNameMock.namespace}/${entityNameMock.kind}/${entityNameMock.name}`;\n\n    mockFs({\n      [entityRootDir]: {\n        "techdocs_metadata.json": "file-content",\n      },\n    });\n\n    expect(await publisher.fetchTechDocsMetadata(entityNameMock)).toBe(\n      "file-content"\n    );\n    mockFs.restore();\n  });\n});\n')),(0,s.kt)("p",null,"As you can see in the code above, we don't actually use the real AWS SDK, we mocked it."),(0,s.kt)("p",null,"To test the publisher behavior, we need to ",(0,s.kt)("strong",{parentName:"p"},"mock the AWS SDK")," which provides a JS API for AWS services.\nTo do this I used jest's mock feature. As our library is called ",(0,s.kt)("inlineCode",{parentName:"p"},"aws-sdk"),", we will create a file",(0,s.kt)("inlineCode",{parentName:"p"}," aws-sdk.ts")," in ",(0,s.kt)("inlineCode",{parentName:"p"},"__mocks__")," containing our implementation of the ",(0,s.kt)("inlineCode",{parentName:"p"},"S3")," methods.",(0,s.kt)("br",{parentName:"p"}),"\n","We will then have to define in this file an ",(0,s.kt)("inlineCode",{parentName:"p"},"S3")," class which corresponds to the class we are using."),(0,s.kt)("p",null,"For the tests we mock the reading of our files from a bucket with local files that we mock with ",(0,s.kt)("inlineCode",{parentName:"p"},"mock-fs"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="packages/techdocs-common/__mocks__/aws-sdk.ts"',title:'"packages/techdocs-common/__mocks__/aws-sdk.ts"'},'export class S3 {\n  private readonly options;\n\n  constructor(options: S3Types.ClientConfiguration) {\n    this.options = options;\n  }\n  // ...\n\n  // We mock the `getObject` method of aws-sdk/S3\n  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property\n\n  getObject({ Key }: { Key: string }) {\n    return {\n      createReadStream: () => {\n        const emitter = new EventEmitter();\n        process.nextTick(() => {\n          if (fs.existsSync(Key)) {\n            emitter.emit("data", Buffer.from(fs.readFileSync(Key)));\n          } else {\n            emitter.emit(\n              "error",\n              new Error(`The file ${Key} doest not exist !`)\n            );\n          }\n          emitter.emit("end");\n        });\n        return emitter;\n      },\n    };\n  }\n}\n\nexport default {\n  S3,\n};\n')),(0,s.kt)("h3",{id:"add-steps-about-how-to-use-aws-s3-in-techdocs"},"Add steps about how to use AWS S3 in TechDocs"),(0,s.kt)("p",null,"The main step here was to explain to the users how they can ",(0,s.kt)("strong",{parentName:"p"},"configure an AWS S3 Bucket")," with TechDocs."),(0,s.kt)("p",null,"I did an ",(0,s.kt)("a",{href:"https://github.com/backstage/backstage/blob/acdcf944e890ad44c0124e658981e4ed0d14893e/docs/features/techdocs/using-cloud-storage.md"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"explanation"))," on how to use ",(0,s.kt)("strong",{parentName:"p"},"AWS Policies")," and how they work.",(0,s.kt)("br",{parentName:"p"}),"\n","In the example we show how to use the ",(0,s.kt)("em",{parentName:"p"},"User")," and ",(0,s.kt)("em",{parentName:"p"},"Bucket")," policy to manage our access to our Bucket."),(0,s.kt)("div",{className:"image-wrapper"},(0,s.kt)("br",null),(0,s.kt)(o.ImageWrapper,{alt:"AWS S3 TechDocs",width:"100%",src:(0,i.Z)("img/backstage3794/aws-s3.drawio.svg"),mdxType:"ImageWrapper"}),(0,s.kt)("em",null,"AWS S3 in TechDocs")),(0,s.kt)("br",null),(0,s.kt)("p",null,"As specified in the comments of the pull request, a next feature will be implemented on top of this one to handle S3 configuration apart from creating an access user agent.",(0,s.kt)("br",{parentName:"p"}),"\n","It will add the possibility to read from the instance profile or ",(0,s.kt)("inlineCode",{parentName:"p"},"~/.aws/credentials"),"."),(0,s.kt)("h3",{id:"add-the-glue-between-our-elements"},'Add the "glue" between our elements'),(0,s.kt)("p",null,"This step contains all the other elements that form the glue between the main pieces of this contribution.",(0,s.kt)("br",{parentName:"p"}),"\n","I still find it important to add it since without these elements our code cannot work."),(0,s.kt)("p",null,"Our job as developers is also to write documentation, add comments ... which will improve the ",(0,s.kt)("strong",{parentName:"p"},"Developer experience (DX)"),"."),(0,s.kt)("h4",{id:"updates-config-reference-documentation"},"Updates config reference documentation"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-py",metastring:'{4-10} title="docs/features/techdocs/configuration.md"',"{4-10}":!0,title:'"docs/features/techdocs/configuration.md"'},"# Required when techdocs.publisher.type is set to 'awsS3'. Skip otherwise.\nawsS3:\n  # An API key is required to write to a storage bucket.\n  credentials:\n    accessKeyId:\n      $env: TECHDOCS_AWSS3_ACCESS_KEY_ID_CREDENTIAL\n    secretAccessKey:\n      $env: TECHDOCS_AWSS3_SECRET_ACCESS_KEY_CREDENTIAL\n  region:\n    $env: AWSS3_REGION\n  # AWS S3 Bucket Name\n  bucketName: 'techdocs-storage',\n")),(0,s.kt)("h4",{id:"updates-configuration-schema"},"Updates configuration schema"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="plugins/techdocs/config.d.ts"',title:'"plugins/techdocs/config.d.ts"'},"{\n  /**\n   * attr: 'type' - accepts a string value\n   * e.g. type: 'awsS3'\n   * alternatives: 'googleGcs' etc.\n   * @see http://backstage.io/docs/features/techdocs/configuration\n   */\n  type: 'awsS3';\n  /**\n   * awsS3 required when 'type' is set to awsS3\n   */\n  awsS3?: {\n    /**\n     * Credentials used to access a storage bucket\n     * @visibility secret\n     */\n    credentials: {\n      /**\n       * User access key id\n       * attr: 'accessKeyId' - accepts a string value\n       * @visibility secret\n       */\n      accessKeyId: string;\n      /**\n       * User secret access key\n       * attr: 'secretAccessKey' - accepts a string value\n       * @visibility secret\n       */\n      secretAccessKey: string;\n    };\n    /**\n     * Cloud Storage Bucket Name\n     * attr: 'bucketName' - accepts a string value\n     * @visibility secret\n     */\n    bucketName: string;\n    /**\n     * AWS Region\n     * attr: 'region' - accepts a string value\n     * @visibility secret\n     */\n    region?: string;\n  };\n}\n")),(0,s.kt)("h3",{id:"add-changesets"},"Add changesets"),(0,s.kt)("p",null,"The final step is to add ",(0,s.kt)("strong",{parentName:"p"},"changesets")," which will contains the list of our file changes.",(0,s.kt)("br",{parentName:"p"}),"\n","It lets us declare ",(0,s.kt)("strong",{parentName:"p"},"how our changes should be released"),".",(0,s.kt)("br",{parentName:"p"}),"\n","In our case we only have ",(0,s.kt)("inlineCode",{parentName:"p"},"patch")," changes."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-py",metastring:'title=".changeset/chilly-dodos-drop.md"',title:'".changeset/chilly-dodos-drop.md"'},"---\n'@backstage/techdocs-common': patch\n'@backstage/plugin-techdocs-backend': patch\n---\n\n1. Added option to use AWS S3 as a choice to store the static generated files for TechDocs.\n")),(0,s.kt)("h2",{id:"takeaway"},"Takeaway"),(0,s.kt)("h3",{id:"problems-encountered"},"Problems encountered"),(0,s.kt)("p",null,"Someone in the comments suggested using ",(0,s.kt)("a",{href:"https://aws.amazon.com/about-aws/whats-new/2020/12/aws-sdk-javascript-version-3-generally-available/"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"AWS JavaScript SDK v3"))," as it has first-class TypeScript support.\nThe issue was that there was a problem with Typescript that was going to be fixed in a ",(0,s.kt)("a",{href:"https://github.com/aws/aws-sdk-js-v3/pull/1812"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"PR")),".",(0,s.kt)("br",{parentName:"p"}),"\n","So I had to wait until the fix was merged to bump the aws sdk version."),(0,s.kt)("p",null,"In addition, after merging the PR into master, the tests on Windows did not pass.",(0,s.kt)("br",{parentName:"p"}),"\n","This was related to the path delimiters used in tests by ",(0,s.kt)("inlineCode",{parentName:"p"},"mock-fs"),".",(0,s.kt)("br",{parentName:"p"}),"\n","So I had to do another ",(0,s.kt)("a",{href:"https://github.com/backstage/backstage/pull/3925"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"Pull Request"))," to fix this problem."),(0,s.kt)("p",null,"This PR also made it possible to identify new features:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Enable publishers support using nested directories in a bucket: ",(0,s.kt)("a",{href:"https://github.com/backstage/backstage/issues/3948"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"Issue link"))),(0,s.kt)("li",{parentName:"ul"},"Load GCS credentials from the environment: ",(0,s.kt)("a",{href:"https://github.com/backstage/backstage/issues/3947"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"Issue link"))),(0,s.kt)("li",{parentName:"ul"},"Load AWS credentials from the shared credentials file: ",(0,s.kt)("a",{href:"https://github.com/backstage/backstage/issues/3946"},(0,s.kt)(u,{color:"#203666",mdxType:"Highlight"},"Issue link")))),(0,s.kt)("h3",{id:"what-did-i-learn-"},"What did I learn ?"),(0,s.kt)("p",null,"This contribution has allowed me to use the ",(0,s.kt)("inlineCode",{parentName:"p"},"aws-sdk")," v3 and to compare it with the v2 version.\nIt also allowed me to improve my english by writing some documentation (Not being a native English speaker, it is important for me to improve myself by practicing my English.)"),(0,s.kt)("p",null,"It allowed me, thanks to the review of the different members working on the project, to improve my code, my logic and to question my work to be more rigorous."))}m.isMDXComponent=!0},6395:function(e,t,n){n.r(t),n.d(t,{ImageWrapper:function(){return h},Merged:function(){return p},Open:function(){return m},Status:function(){return k},assets:function(){return d},contentTitle:function(){return l},default:function(){return b},frontMatter:function(){return r},metadata:function(){return c},toc:function(){return u}});var a=n(3117),s=n(7294),i=n(3905),o=n(2879);const r={},l=void 0,c={unversionedId:"utils",id:"utils",title:"utils",description:"",source:"@site/docs/utils.md",sourceDirName:".",slug:"/utils",permalink:"/docs/utils",draft:!1,editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/utils.md",tags:[],version:"current",frontMatter:{}},d={},u=[],p=e=>{let{date:t}=e;return(0,i.kt)("div",null,(0,i.kt)("div",{className:"merged"},(0,i.kt)("span",null,(0,i.kt)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16",fill:"white","aria-hidden":"true",className:"status_svg"},(0,i.kt)("path",{fillRule:"evenodd",d:"M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z"})),"Merged")),t||null)},h=e=>{let{src:t,alt:n,width:a}=e;const[r,l]=s.useState(!1);return(0,i.kt)("div",null,(0,i.kt)("div",{className:"image-zoom",onClick:()=>l(!0)},(0,i.kt)("img",{src:t,alt:n,width:a})),r&&(0,i.kt)(o.Z,{mainSrc:t,onCloseRequest:()=>l(!1),mdxType:"Lightbox"}))},m=e=>{let{date:t}=e;return(0,i.kt)("div",null,(0,i.kt)("div",{className:"open"},(0,i.kt)("span",null,(0,i.kt)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16",fill:"white","aria-hidden":"true",className:"status_svg"},(0,i.kt)("path",{fillRule:"evenodd",d:"M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"})),"Open")),t||null)},k=e=>{let{url:t}=e;const[n,a]=s.useState(null);return s.useEffect((()=>{let e=!0;return fetch(t).then((e=>e.json())).then((t=>{e&&a(t.merged)})),()=>{e=!1}}),[]),null===n?(0,i.kt)("div",null):!0===n?(0,i.kt)(p,{mdxType:"Merged"}):(0,i.kt)(m,{mdxType:"Open"})},g={toc:u,Merged:p,ImageWrapper:h,Open:m,Status:k};function b(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}))}b.isMDXComponent=!0}}]);