---
id: consoleme9008
title: ConsoleMe - AWS IAM policy linting
sidebar_label: 7. ConsoleMe - AWS IAM policy linting
---

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Merged, ImageWrapper } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
    <div>
        <Merged date="8 Mar 2021"/>
    </div>
  <span className="badge badge--secondary marginRight">AWS</span>
  <span className="badge badge--secondary marginRight">IAM</span>
  <span className="badge badge--secondary marginRight">Cloud permissions</span>
  <span className="badge badge--secondary marginRight">Python</span>
  <span className="badge badge--secondary marginRight">ReactJS</span>
</div>
</div>

:::info Contribution link
https://github.com/Netflix/consoleme/pull/9008
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/consoleme/cover.jpg')} width="100%" alt="Contribution presentation" />
<em>ConsoleMe + AWS IAM Policy linting</em>
</div>

### Project

You can find the **ConsoleMe project presentation** <a href="/docs/projects/consoleme"><Highlight color="#203666">here</Highlight></a>.

### Context

In order to understand the problem that the project addresses, you need to be familiar with what a **Policy** is.   
ConsoleMe has a **Policies view** interface that allows you to list all resources across your synchronized environment from the AWS configuration such as organization's IAM roles and S3 buckets.

#### Policy

You can manage access by creating policies and attaching them to **IAM identities** (users - group of users - roles) or **resources**.  
A policy is an object that defines permissions when associated with an identity or a resource.

Here is an example of a policy that allows the user to perform all actions (`dynamodb:*`) on all the tables of the DynamoDB database in the account `123456789012`.

```json
{
  "Version": "2012-10-17",
  "Statement": {
    "Effect": "Allow",
    "Action": "dynamodb:*",
    "Resource": "arn:aws:dynamodb:us-east-2:123456789012:table/*"
  }
}
```

#### *What is IAM?*

Identity and Access Management (IAM) is a service that helps you control access to your AWS resources.  
You can use IAM to control **_WHO_** can do **_WHAT_** on which **_RESOURCES_**.

#### Project architecture

Here is the project Architecture Diagram taken from the ConsoleMe <a href="https://hawkins.gitbook.io/consoleme/architecture"><Highlight color="#203666">documentation</Highlight></a>.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/consoleme/diagram.png')} width="80%" alt="Architecture Diagram" />
<em>Architecture Diagram</em>
</div>

### Current behavior

ConsoleMe has a native policy editors which allows users to **create** or **edit** IAM roles, SQS queues, SNS topics, and S3 buckets.   
It would be interesting to show to the user the potential linting errors he may have in his document.

:::note Issue link
https://github.com/Netflix/consoleme/issues/8933
:::

## Implement the solution

Here are the user stories we will use as a reference:

As a _TYPE_OF_USER_, I want _SOME_GOAL_ so that _SOME_REASON_.

- **As a** User **I want** to see the different linting errors on the editor **so that** I can directly see which lines need updates.
- **As a** User **I want** to see the severity of the different linting errors **so that** I can directly focus on top priority errors.
- **As a** User **I want** to see the details of the different linting errors **so that** I can understand what I need to change.

To check the linting of our document we will use the <a href="https://github.com/duo-labs/parliament"><Highlight color="#203666">parliament library</Highlight></a> which provides a way to reviews policies.

### Add the new handler

The `CheckPoliciesHandler` handler will be used to retrieve policy errors based on the provided policy string.  
We will call the method `analyze_policy_string` from the `parliament` library which will return a `Finding` list.  

We will then need to enhance each of the elements to get the complete findings because the non-enhanced Finding representation is a simple string: `ISSUE - DETAIL - LOCATION`

```py title="consoleme/handlers/v2/policies.py"
class CheckPoliciesHandler(BaseAPIV2Handler):
    async def post(self):
        """
        POST /api/v2/policies/check
        """
        policy = tornado.escape.json_decode(self.request.body)
        analyzed_policy = analyze_policy_string(policy)
        findings = analyzed_policy.findings

        enhanced_findings = []

        for finding in findings:
            enhanced_finding = enhance_finding(finding)
            enhanced_findings.append(
                {
                    "issue": enhanced_finding.issue,
                    "detail": enhanced_finding.detail,
                    "location": enhanced_finding.location,
                    "severity": enhanced_finding.severity,
                    "title": enhanced_finding.title,
                    "description": enhanced_finding.description,
                }
            )

        self.write(json.dumps(enhanced_findings))
        return
```

The `CheckPoliciesHandler` will be mapped to a new route `/api/v2/policies/check`.

```py title="consoleme/routes.py"
def make_app(jwt_validator=None):
    """make_app."""
    path = pkg_resources.resource_filename("consoleme", "templates")
    # ... other routes
    (r"/api/v2/policies/check", CheckPoliciesHandler),
```

### Add the parliament mocks

In order to test our handler, we will need to mock the `parliament.analyze_policy_string` and `parliament.enhance_finding` method calls.   


```py title="tests/conftest.py"
class MockParliament:
    def __init__(self, return_value=None):
        self.return_value = return_value

    @property
    def findings(self):
        return self.return_value

@pytest.fixture(scope="session")
def parliament(session_mocker):
    session_mocker.patch(
        "parliament.analyze_policy_string",
        return_value=MockParliament(
            return_value=[
              """
              RESOURCE_MISMATCH
              - {"action": "s3:GetObject", "required_format": "arn:*:s3:::*/*"}
              - {"line": 3, "column": 18, "filepath": "test.json"}
              """
            ]
        ),
    )
    session_mocker.patch(
        "parliament.enhance_finding",
        return_value=Finding(
            issue="RESOURCE_MISMATCH",
            title="No resources match for the given action",
            severity="MEDIUM",
            description="",
            detail="",
            location={},
        ),
    )
```

### Add the handler tests

We can now test our handler by simulating a fetch with a **given request body**.   
We can then test that the response of the fetch is the expected one (status code `200` and correct response body).

```py title="tests/handlers/v2/test_policies.py"
def test_policies_check_api(self):
    from consoleme.config import config
    headers = {
        config.get("auth.user_header_name"): "user@example.com",
        config.get("auth.groups_header_name"): "groupa,groupb,groupc",
    }
    body = """{
        "Version": "2012-10-17",
        "Statement": {
            "Effect": "Allow",
            "Action":["s3:GetObject"],
            "Resource": ["arn:aws:s3:::bucket1"]
        }
    }"""
    response = self.fetch(
        "/api/v2/policies/check", headers=headers, method="POST", body=body
    )
    self.assertEqual(response.code, 200)
    response_j = json.loads(response.body)
    self.assertEqual(len(response_j), 1)
    first_error = response_j[0]
    self.assertEqual(first_error["issue"], "RESOURCE_MISMATCH")
    self.assertEqual(
        first_error["title"], "No resources match for the given action"
    )
    self.assertEqual(first_error["severity"], "MEDIUM")

```

### Add the Swagger entry

<a href="https://swagger.io/"><Highlight color="#203666">Swagger</Highlight></a> is a a tool that helps you design, build and document REST APIs.    

We will add a new entry for our route `/policies/check` with a documentation about the request body and the response schema.

```yaml title="swagger.yaml"
/policies/check:
  post:
    summary: check a policy document
    tags:
      - policies
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
    responses:
      "200":
        description: OK
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PolicyCheckModel"

```

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/consoleme/swagger.png')} width="400px" alt="Swagger" />
<em>Swagger UI - Policies check</em>
</div>


### Integrate the errors to the editor - *UI*

The idea is pretty straightforward, every time the User will edit the policy, we will trigger a timeout of `CHECK_POLICY_TIMEOUT` to check the linting errors of the document.   
The lint check is done with a **delay** to avoid too many calls when the user edits the document.

```tsx title=""
useEffect(() => {
  // Avoid linting errors if disabled
  if (!enableLinting) {
    return false;
  }
  timeout.current = setTimeout(() => {
    if (policyDocument.length) {
      policyCheck(policyDocument);
    }
  }, CHECK_POLICY_TIMEOUT);

  return () => {
    clearInterval(timeout.current);
  };
}, [policyCheck, policyDocument, enableLinting]);

```

Once we have retrieved the linting errors from the API, we can display them in the <a href="https://microsoft.github.io/monaco-editor/"><Highlight color="#203666">monaco editor</Highlight></a>.

We will use the `deltaDecorations` method on the editor instance. 

```ts
deltaDecorations(
  oldDecorations: string[], 
  newDecorations: IModelDeltaDecoration[]
): string[]
```

A decoration accepts some `options` and a `range` with the values `startLine`, `endLine`, `startColumn` and `endColumn`.

```ts
interface IModelDeltaDecoration {
  options: IModelDecorationOptions;
  range: IRange;
}
```

The parliament library can return 6 different severity type which we will group into 3 severity levels:

- `INFO_ERRORS`: `MUTE | INFO | LOW`
- `WARNING_ERRORS`: `MEDIUM`
- `CRITICAL_ERRORS`: `HIGH | CRITICAL`

These groups allow us to display errors with a different color in the editor.   
This lets the user identify the different level of severity at a glance.   

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/consoleme/editor.jpg')} width="500" alt="Editor" />
<em>Inline policy editor</em>
</div>

The code bellow will allow us to display a highlighted area of the editor where the error is located.

```tsx
const addEditorDecorations = ({ editor, errors }) => {
  editor.deltaDecorations(
    [],
    errors.map((error) => ({
      range: new monaco.Range(
        (error.location && error.location.line) || 1,
        1,
        (error.location && error.location.line) || 1,
        // Hardcoded has we don't have the endline number
        Number.MAX_VALUE
      ),
      options: {
        isWholeLine: false,
        className: lintingErrorMapping[error.severity],
        marginClassName: "warningIcon",
        hoverMessage: {
          value: `[${error.severity}] ${error.title} - ${error.detail} - ${error.description}`,
        },
      },
    }))
  );
};
```

The `hoverMessage` attribute is used to display the linting error detail to the user on hover.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/consoleme/hover.png')} width="100%" alt="Hover decoration message" />
<em>Hover decoration message</em>
</div>

## Final result

Here is the final result that identifies **bad IAM policy patterns** in the editor.   
Every time we update the policy document, a **timeout** is triggered and when it ends, the linting error **fetch** is made and the errors are **highlighted** in the editor.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/consoleme/final.gif')} width="90%" alt="Final result" />
</div>

## Takeaway

### Problems encountered

Setting up the project was a bit tedious and asked me to set up some things on my AWS account to be able to test behaviors locally.   
I also had to modify the versions I had a few times, so it took me a little longer than expected.

### What did I learn ?

This contribution allowed me to learn more about **IAM Policies** and its usage in a concrete use case.  
In addition, the architecture of the project was interesting and challenged me to set up my development environment and test the platform.
