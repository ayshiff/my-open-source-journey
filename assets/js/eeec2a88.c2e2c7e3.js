"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[370,364],{6138:function(e,t,n){n.r(t),n.d(t,{Highlight:function(){return c},assets:function(){return p},contentTitle:function(){return s},default:function(){return h},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return m}});var a=n(3117),r=(n(7294),n(3905)),i=n(4996),o=n(6395);const l={id:"consoleme9008",title:"ConsoleMe - AWS IAM policy linting",sidebar_label:"7. ConsoleMe - AWS IAM policy linting"},s=void 0,d={unversionedId:"contributions/consoleme9008",id:"contributions/consoleme9008",title:"ConsoleMe - AWS IAM policy linting",description:"AWS",source:"@site/docs/contributions/consoleme#9008.md",sourceDirName:"contributions",slug:"/contributions/consoleme9008",permalink:"/docs/contributions/consoleme9008",draft:!1,editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/contributions/consoleme#9008.md",tags:[],version:"current",frontMatter:{id:"consoleme9008",title:"ConsoleMe - AWS IAM policy linting",sidebar_label:"7. ConsoleMe - AWS IAM policy linting"},sidebar:"docs",previous:{title:"6. Octobox - Notifications filter",permalink:"/docs/contributions/octobox2597"},next:{title:"8. Changesets - Comment on released PRs and issues",permalink:"/docs/contributions/changesets80"}},p={},c=e=>{let{children:t,color:n}=e;return(0,r.kt)("span",{style:{backgroundColor:n,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},m=[{value:"Introduction",id:"introduction",level:2},{value:"Project",id:"project",level:3},{value:"Context",id:"context",level:3},{value:"Policy",id:"policy",level:4},{value:"<em>What is IAM?</em>",id:"what-is-iam",level:4},{value:"Project architecture",id:"project-architecture",level:4},{value:"Current behavior",id:"current-behavior",level:3},{value:"Implement the solution",id:"implement-the-solution",level:2},{value:"Add the new handler",id:"add-the-new-handler",level:3},{value:"Add the parliament mocks",id:"add-the-parliament-mocks",level:3},{value:"Add the handler tests",id:"add-the-handler-tests",level:3},{value:"Add the Swagger entry",id:"add-the-swagger-entry",level:3},{value:"Integrate the errors to the editor - <em>UI</em>",id:"integrate-the-errors-to-the-editor---ui",level:3},{value:"Final result",id:"final-result",level:2},{value:"Takeaway",id:"takeaway",level:2},{value:"Problems encountered",id:"problems-encountered",level:3},{value:"What did I learn ?",id:"what-did-i-learn-",level:3}],u={Highlight:c,toc:m};function h(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("div",{className:"pr_infos"},(0,r.kt)("div",{className:"marginBottom"},(0,r.kt)("div",null,(0,r.kt)(o.Merged,{date:"8 Mar 2021",mdxType:"Merged"})),(0,r.kt)("span",{className:"badge badge--secondary marginRight"},"AWS"),(0,r.kt)("span",{className:"badge badge--secondary marginRight"},"IAM"),(0,r.kt)("span",{className:"badge badge--secondary marginRight"},"Cloud permissions"),(0,r.kt)("span",{className:"badge badge--secondary marginRight"},"Python"),(0,r.kt)("span",{className:"badge badge--secondary marginRight"},"ReactJS"))),(0,r.kt)("admonition",{title:"Contribution link",type:"info"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/Netflix/consoleme/pull/9008"},"https://github.com/Netflix/consoleme/pull/9008"))),(0,r.kt)("admonition",{title:"Contribution Type",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"This contribution is a new ",(0,r.kt)("strong",{parentName:"p"},"feature"),".")),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("div",{className:"image-wrapper"},(0,r.kt)(o.ImageWrapper,{src:(0,i.Z)("img/consoleme/cover.jpg"),width:"100%",alt:"Contribution presentation",mdxType:"ImageWrapper"}),(0,r.kt)("em",null,"ConsoleMe + AWS IAM Policy linting")),(0,r.kt)("h3",{id:"project"},"Project"),(0,r.kt)("p",null,"You can find the ",(0,r.kt)("strong",{parentName:"p"},"ConsoleMe project presentation")," ",(0,r.kt)("a",{href:"/docs/projects/consoleme"},(0,r.kt)(c,{color:"#203666",mdxType:"Highlight"},"here")),"."),(0,r.kt)("h3",{id:"context"},"Context"),(0,r.kt)("p",null,"In order to understand the problem that the project addresses, you need to be familiar with what a ",(0,r.kt)("strong",{parentName:"p"},"Policy")," is.",(0,r.kt)("br",{parentName:"p"}),"\n","ConsoleMe has a ",(0,r.kt)("strong",{parentName:"p"},"Policies view")," interface that allows you to list all resources across your synchronized environment from the AWS configuration such as organization's IAM roles and S3 buckets."),(0,r.kt)("h4",{id:"policy"},"Policy"),(0,r.kt)("p",null,"You can manage access by creating policies and attaching them to ",(0,r.kt)("strong",{parentName:"p"},"IAM identities")," (users - group of users - roles) or ",(0,r.kt)("strong",{parentName:"p"},"resources"),".",(0,r.kt)("br",{parentName:"p"}),"\n","A policy is an object that defines permissions when associated with an identity or a resource."),(0,r.kt)("p",null,"Here is an example of a policy that allows the user to perform all actions (",(0,r.kt)("inlineCode",{parentName:"p"},"dynamodb:*"),") on all the tables of the DynamoDB database in the account ",(0,r.kt)("inlineCode",{parentName:"p"},"123456789012"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "Version": "2012-10-17",\n  "Statement": {\n    "Effect": "Allow",\n    "Action": "dynamodb:*",\n    "Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/*"\n  }\n}\n')),(0,r.kt)("h4",{id:"what-is-iam"},(0,r.kt)("em",{parentName:"h4"},"What is IAM?")),(0,r.kt)("p",null,"Identity and Access Management (IAM) is a service that helps you control access to your AWS resources.",(0,r.kt)("br",{parentName:"p"}),"\n","You can use IAM to control ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"WHO"))," can do ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"WHAT"))," on which ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"RESOURCES")),"."),(0,r.kt)("h4",{id:"project-architecture"},"Project architecture"),(0,r.kt)("p",null,"Here is the project Architecture Diagram taken from the ConsoleMe ",(0,r.kt)("a",{href:"https://hawkins.gitbook.io/consoleme/architecture"},(0,r.kt)(c,{color:"#203666",mdxType:"Highlight"},"documentation")),"."),(0,r.kt)("div",{className:"image-wrapper"},(0,r.kt)(o.ImageWrapper,{src:(0,i.Z)("img/consoleme/diagram.png"),width:"80%",alt:"Architecture Diagram",mdxType:"ImageWrapper"}),(0,r.kt)("em",null,"Architecture Diagram")),(0,r.kt)("h3",{id:"current-behavior"},"Current behavior"),(0,r.kt)("p",null,"ConsoleMe has a native policy editors which allows users to ",(0,r.kt)("strong",{parentName:"p"},"create")," or ",(0,r.kt)("strong",{parentName:"p"},"edit")," IAM roles, SQS queues, SNS topics, and S3 buckets.",(0,r.kt)("br",{parentName:"p"}),"\n","It would be interesting to show to the user the potential linting errors he may have in his document."),(0,r.kt)("admonition",{title:"Issue link",type:"note"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("a",{parentName:"p",href:"https://github.com/Netflix/consoleme/issues/8933"},"https://github.com/Netflix/consoleme/issues/8933"))),(0,r.kt)("h2",{id:"implement-the-solution"},"Implement the solution"),(0,r.kt)("p",null,"Here are the user stories we will use as a reference:"),(0,r.kt)("p",null,"As a ",(0,r.kt)("em",{parentName:"p"},"TYPE_OF_USER"),", I want ",(0,r.kt)("em",{parentName:"p"},"SOME_GOAL")," so that ",(0,r.kt)("em",{parentName:"p"},"SOME_REASON"),"."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"As a")," User ",(0,r.kt)("strong",{parentName:"li"},"I want")," to see the different linting errors on the editor ",(0,r.kt)("strong",{parentName:"li"},"so that")," I can directly see which lines need updates."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"As a")," User ",(0,r.kt)("strong",{parentName:"li"},"I want")," to see the severity of the different linting errors ",(0,r.kt)("strong",{parentName:"li"},"so that")," I can directly focus on top priority errors."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"As a")," User ",(0,r.kt)("strong",{parentName:"li"},"I want")," to see the details of the different linting errors ",(0,r.kt)("strong",{parentName:"li"},"so that")," I can understand what I need to change.")),(0,r.kt)("p",null,"To check the linting of our document we will use the ",(0,r.kt)("a",{href:"https://github.com/duo-labs/parliament"},(0,r.kt)(c,{color:"#203666",mdxType:"Highlight"},"parliament library"))," which provides a way to reviews policies."),(0,r.kt)("h3",{id:"add-the-new-handler"},"Add the new handler"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"CheckPoliciesHandler")," handler will be used to retrieve policy errors based on the provided policy string.",(0,r.kt)("br",{parentName:"p"}),"\n","We will call the method ",(0,r.kt)("inlineCode",{parentName:"p"},"analyze_policy_string")," from the ",(0,r.kt)("inlineCode",{parentName:"p"},"parliament")," library which will return a ",(0,r.kt)("inlineCode",{parentName:"p"},"Finding")," list.  "),(0,r.kt)("p",null,"We will then need to enhance each of the elements to get the complete findings because the non-enhanced Finding representation is a simple string: ",(0,r.kt)("inlineCode",{parentName:"p"},"ISSUE - DETAIL - LOCATION")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py",metastring:'title="consoleme/handlers/v2/policies.py"',title:'"consoleme/handlers/v2/policies.py"'},'class CheckPoliciesHandler(BaseAPIV2Handler):\n    async def post(self):\n        """\n        POST /api/v2/policies/check\n        """\n        policy = tornado.escape.json_decode(self.request.body)\n        analyzed_policy = analyze_policy_string(policy)\n        findings = analyzed_policy.findings\n\n        enhanced_findings = []\n\n        for finding in findings:\n            enhanced_finding = enhance_finding(finding)\n            enhanced_findings.append(\n                {\n                    "issue": enhanced_finding.issue,\n                    "detail": enhanced_finding.detail,\n                    "location": enhanced_finding.location,\n                    "severity": enhanced_finding.severity,\n                    "title": enhanced_finding.title,\n                    "description": enhanced_finding.description,\n                }\n            )\n\n        self.write(json.dumps(enhanced_findings))\n        return\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"CheckPoliciesHandler")," will be mapped to a new route ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v2/policies/check"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py",metastring:'title="consoleme/routes.py"',title:'"consoleme/routes.py"'},'def make_app(jwt_validator=None):\n    """make_app."""\n    path = pkg_resources.resource_filename("consoleme", "templates")\n    # ... other routes\n    (r"/api/v2/policies/check", CheckPoliciesHandler),\n')),(0,r.kt)("h3",{id:"add-the-parliament-mocks"},"Add the parliament mocks"),(0,r.kt)("p",null,"In order to test our handler, we will need to mock the ",(0,r.kt)("inlineCode",{parentName:"p"},"parliament.analyze_policy_string")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"parliament.enhance_finding")," method calls.   "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py",metastring:'title="tests/conftest.py"',title:'"tests/conftest.py"'},'class MockParliament:\n    def __init__(self, return_value=None):\n        self.return_value = return_value\n\n    @property\n    def findings(self):\n        return self.return_value\n\n@pytest.fixture(scope="session")\ndef parliament(session_mocker):\n    session_mocker.patch(\n        "parliament.analyze_policy_string",\n        return_value=MockParliament(\n            return_value=[\n              """\n              RESOURCE_MISMATCH\n              - {"action": "s3:GetObject", "required_format": "arn:*:s3:::*/*"}\n              - {"line": 3, "column": 18, "filepath": "test.json"}\n              """\n            ]\n        ),\n    )\n    session_mocker.patch(\n        "parliament.enhance_finding",\n        return_value=Finding(\n            issue="RESOURCE_MISMATCH",\n            title="No resources match for the given action",\n            severity="MEDIUM",\n            description="",\n            detail="",\n            location={},\n        ),\n    )\n')),(0,r.kt)("h3",{id:"add-the-handler-tests"},"Add the handler tests"),(0,r.kt)("p",null,"We can now test our handler by simulating a fetch with a ",(0,r.kt)("strong",{parentName:"p"},"given request body"),".",(0,r.kt)("br",{parentName:"p"}),"\n","We can then test that the response of the fetch is the expected one (status code ",(0,r.kt)("inlineCode",{parentName:"p"},"200")," and correct response body)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-py",metastring:'title="tests/handlers/v2/test_policies.py"',title:'"tests/handlers/v2/test_policies.py"'},'def test_policies_check_api(self):\n    from consoleme.config import config\n    headers = {\n        config.get("auth.user_header_name"): "user@example.com",\n        config.get("auth.groups_header_name"): "groupa,groupb,groupc",\n    }\n    body = """{\n        "Version": "2012-10-17",\n        "Statement": {\n            "Effect": "Allow",\n            "Action":["s3:GetObject"],\n            "Resource": ["arn:aws:s3:::bucket1"]\n        }\n    }"""\n    response = self.fetch(\n        "/api/v2/policies/check", headers=headers, method="POST", body=body\n    )\n    self.assertEqual(response.code, 200)\n    response_j = json.loads(response.body)\n    self.assertEqual(len(response_j), 1)\n    first_error = response_j[0]\n    self.assertEqual(first_error["issue"], "RESOURCE_MISMATCH")\n    self.assertEqual(\n        first_error["title"], "No resources match for the given action"\n    )\n    self.assertEqual(first_error["severity"], "MEDIUM")\n\n')),(0,r.kt)("h3",{id:"add-the-swagger-entry"},"Add the Swagger entry"),(0,r.kt)("a",{href:"https://swagger.io/"},(0,r.kt)(c,{color:"#203666",mdxType:"Highlight"},"Swagger"))," is a a tool that helps you design, build and document REST APIs.",(0,r.kt)("p",null,"We will add a new entry for our route ",(0,r.kt)("inlineCode",{parentName:"p"},"/policies/check")," with a documentation about the request body and the response schema."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml",metastring:'title="swagger.yaml"',title:'"swagger.yaml"'},'/policies/check:\n  post:\n    summary: check a policy document\n    tags:\n      - policies\n    requestBody:\n      required: true\n      content:\n        application/json:\n          schema:\n            type: object\n    responses:\n      "200":\n        description: OK\n        content:\n          application/json:\n            schema:\n              $ref: "#/components/schemas/PolicyCheckModel"\n\n')),(0,r.kt)("div",{className:"image-wrapper"},(0,r.kt)(o.ImageWrapper,{src:(0,i.Z)("img/consoleme/swagger.png"),width:"400px",alt:"Swagger",mdxType:"ImageWrapper"}),(0,r.kt)("em",null,"Swagger UI - Policies check")),(0,r.kt)("h3",{id:"integrate-the-errors-to-the-editor---ui"},"Integrate the errors to the editor - ",(0,r.kt)("em",{parentName:"h3"},"UI")),(0,r.kt)("p",null,"The idea is pretty straightforward, every time the User will edit the policy, we will trigger a timeout of ",(0,r.kt)("inlineCode",{parentName:"p"},"CHECK_POLICY_TIMEOUT")," to check the linting errors of the document.",(0,r.kt)("br",{parentName:"p"}),"\n","The lint check is done with a ",(0,r.kt)("strong",{parentName:"p"},"delay")," to avoid too many calls when the user edits the document."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title=""',title:'""'},"useEffect(() => {\n  // Avoid linting errors if disabled\n  if (!enableLinting) {\n    return false;\n  }\n  timeout.current = setTimeout(() => {\n    if (policyDocument.length) {\n      policyCheck(policyDocument);\n    }\n  }, CHECK_POLICY_TIMEOUT);\n\n  return () => {\n    clearInterval(timeout.current);\n  };\n}, [policyCheck, policyDocument, enableLinting]);\n\n")),(0,r.kt)("p",null,"Once we have retrieved the linting errors from the API, we can display them in the ",(0,r.kt)("a",{href:"https://microsoft.github.io/monaco-editor/"},(0,r.kt)(c,{color:"#203666",mdxType:"Highlight"},"monaco editor")),"."),(0,r.kt)("p",null,"We will use the ",(0,r.kt)("inlineCode",{parentName:"p"},"deltaDecorations")," method on the editor instance. "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"deltaDecorations(\n  oldDecorations: string[], \n  newDecorations: IModelDeltaDecoration[]\n): string[]\n")),(0,r.kt)("p",null,"A decoration accepts some ",(0,r.kt)("inlineCode",{parentName:"p"},"options")," and a ",(0,r.kt)("inlineCode",{parentName:"p"},"range")," with the values ",(0,r.kt)("inlineCode",{parentName:"p"},"startLine"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"endLine"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"startColumn")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"endColumn"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface IModelDeltaDecoration {\n  options: IModelDecorationOptions;\n  range: IRange;\n}\n")),(0,r.kt)("p",null,"The parliament library can return 6 different severity type which we will group into 3 severity levels:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"INFO_ERRORS"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"MUTE | INFO | LOW")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"WARNING_ERRORS"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"MEDIUM")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"CRITICAL_ERRORS"),": ",(0,r.kt)("inlineCode",{parentName:"li"},"HIGH | CRITICAL"))),(0,r.kt)("p",null,"These groups allow us to display errors with a different color in the editor.",(0,r.kt)("br",{parentName:"p"}),"\n","This lets the user identify the different level of severity at a glance.   "),(0,r.kt)("div",{className:"image-wrapper"},(0,r.kt)(o.ImageWrapper,{src:(0,i.Z)("img/consoleme/editor.jpg"),width:"500",alt:"Editor",mdxType:"ImageWrapper"}),(0,r.kt)("em",null,"Inline policy editor")),(0,r.kt)("p",null,"The code bellow will allow us to display a highlighted area of the editor where the error is located."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},'const addEditorDecorations = ({ editor, errors }) => {\n  editor.deltaDecorations(\n    [],\n    errors.map((error) => ({\n      range: new monaco.Range(\n        (error.location && error.location.line) || 1,\n        1,\n        (error.location && error.location.line) || 1,\n        // Hardcoded has we don\'t have the endline number\n        Number.MAX_VALUE\n      ),\n      options: {\n        isWholeLine: false,\n        className: lintingErrorMapping[error.severity],\n        marginClassName: "warningIcon",\n        hoverMessage: {\n          value: `[${error.severity}] ${error.title} - ${error.detail} - ${error.description}`,\n        },\n      },\n    }))\n  );\n};\n')),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"hoverMessage")," attribute is used to display the linting error detail to the user on hover."),(0,r.kt)("div",{className:"image-wrapper"},(0,r.kt)(o.ImageWrapper,{src:(0,i.Z)("img/consoleme/hover.png"),width:"100%",alt:"Hover decoration message",mdxType:"ImageWrapper"}),(0,r.kt)("em",null,"Hover decoration message")),(0,r.kt)("h2",{id:"final-result"},"Final result"),(0,r.kt)("p",null,"Here is the final result that identifies ",(0,r.kt)("strong",{parentName:"p"},"bad IAM policy patterns")," in the editor.",(0,r.kt)("br",{parentName:"p"}),"\n","Every time we update the policy document, a ",(0,r.kt)("strong",{parentName:"p"},"timeout")," is triggered and when it ends, the linting error ",(0,r.kt)("strong",{parentName:"p"},"fetch")," is made and the errors are ",(0,r.kt)("strong",{parentName:"p"},"highlighted")," in the editor."),(0,r.kt)("div",{className:"image-wrapper"},(0,r.kt)(o.ImageWrapper,{src:(0,i.Z)("img/consoleme/final.gif"),width:"90%",alt:"Final result",mdxType:"ImageWrapper"})),(0,r.kt)("h2",{id:"takeaway"},"Takeaway"),(0,r.kt)("h3",{id:"problems-encountered"},"Problems encountered"),(0,r.kt)("p",null,"Setting up the project was a bit tedious and asked me to set up some things on my AWS account to be able to test behaviors locally.",(0,r.kt)("br",{parentName:"p"}),"\n","I also had to modify the versions I had a few times, so it took me a little longer than expected."),(0,r.kt)("h3",{id:"what-did-i-learn-"},"What did I learn ?"),(0,r.kt)("p",null,"This contribution allowed me to learn more about ",(0,r.kt)("strong",{parentName:"p"},"IAM Policies")," and its usage in a concrete use case.",(0,r.kt)("br",{parentName:"p"}),"\n","In addition, the architecture of the project was interesting and challenged me to set up my development environment and test the platform."))}h.isMDXComponent=!0},6395:function(e,t,n){n.r(t),n.d(t,{ImageWrapper:function(){return u},Merged:function(){return m},Open:function(){return h},Status:function(){return g},assets:function(){return p},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return l},metadata:function(){return d},toc:function(){return c}});var a=n(3117),r=n(7294),i=n(3905),o=n(2879);const l={},s=void 0,d={unversionedId:"utils",id:"utils",title:"utils",description:"",source:"@site/docs/utils.md",sourceDirName:".",slug:"/utils",permalink:"/docs/utils",draft:!1,editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/utils.md",tags:[],version:"current",frontMatter:{}},p={},c=[],m=e=>{let{date:t}=e;return(0,i.kt)("div",null,(0,i.kt)("div",{className:"merged"},(0,i.kt)("span",null,(0,i.kt)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16",fill:"white","aria-hidden":"true",className:"status_svg"},(0,i.kt)("path",{fillRule:"evenodd",d:"M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z"})),"Merged")),t||null)},u=e=>{let{src:t,alt:n,width:a}=e;const[l,s]=r.useState(!1);return(0,i.kt)("div",null,(0,i.kt)("div",{className:"image-zoom",onClick:()=>s(!0)},(0,i.kt)("img",{src:t,alt:n,width:a})),l&&(0,i.kt)(o.Z,{mainSrc:t,onCloseRequest:()=>s(!1),mdxType:"Lightbox"}))},h=e=>{let{date:t}=e;return(0,i.kt)("div",null,(0,i.kt)("div",{className:"open"},(0,i.kt)("span",null,(0,i.kt)("svg",{height:"16",viewBox:"0 0 16 16",version:"1.1",width:"16",fill:"white","aria-hidden":"true",className:"status_svg"},(0,i.kt)("path",{fillRule:"evenodd",d:"M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"})),"Open")),t||null)},g=e=>{let{url:t}=e;const[n,a]=r.useState(null);return r.useEffect((()=>{let e=!0;return fetch(t).then((e=>e.json())).then((t=>{e&&a(t.merged)})),()=>{e=!1}}),[]),null===n?(0,i.kt)("div",null):!0===n?(0,i.kt)(m,{mdxType:"Merged"}):(0,i.kt)(h,{mdxType:"Open"})},k={toc:c,Merged:m,ImageWrapper:u,Open:h,Status:g};function f(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},k,n,{components:t,mdxType:"MDXLayout"}))}f.isMDXComponent=!0}}]);