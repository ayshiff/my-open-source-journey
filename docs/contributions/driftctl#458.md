---
id: driftctl458
title: driftctl - Support for Terraform Cloud
sidebar_label: 11. driftctl - Support for Terraform Cloud
---

<p className="post_date">26 Apr 2021</p>

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
        <Merged />
    </div>
  <span className="badge badge--secondary marginRight">AWS</span>
  <span className="badge badge--secondary marginRight">Terraform</span>
  <span className="badge badge--secondary marginRight">Infrastructure-drift</span>
  <span className="badge badge--secondary marginRight">Golang</span>
</div>
</div>

:::info Contribution link
https://github.com/cloudskiff/driftctl/pull/458
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/driftctl/cover.jpg')} width="100%" alt="driftctl presentation" />
<em>driftctl presentation</em>
</div>

### Project

You can find the **driftctl project presentation** <a href="/docs/projects/driftctl"><Highlight color="#203666">here</Highlight></a>.

### Context

In order to understand some parts of the contribution, you have to be familiar with **Terraform Cloud**.

_What is Terraform Cloud/Terraform Enterprise?_

**Terraform Cloud** is a managed service providing a consistent and reliable environment to manage Terraform runs.

Here is some screenshots of what the Terraform Cloud Dashboard looks like.

<br />

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/driftctl/tfcloud2.jpg')} width="100%" alt="Terraform Cloud Dashboard" />
<em>Terraform Cloud Dashboard</em>
</div>

<br />

_How Terraform Cloud Works?_

- **Write**: Create new infrastructure or manage existing one that you’ve already written using Terraform
- **Compose**: Use <a href="https://www.terraform.io/docs/cloud/workspaces/"><Highlight color="#203666">Workspaces</Highlight></a> to manage your environments
- **Plan**: Create an execution <a href="https://www.terraform.io/docs/cli/commands/plan.html"><Highlight color="#203666">plan</Highlight></a> 
- **Provision & Manage**: Use Terraform <a href="https://www.terraform.io/docs/cloud/run/run-environment.html"><Highlight color="#203666">Cloud’s run environment</Highlight></a> as an execution platform
- **Collaborate & Share**: Use the <a href="https://www.terraform.io/docs/cloud/registry/"><Highlight color="#203666">Private Module Registry</Highlight></a> to provide <a href="https://www.hashicorp.com/products/terraform/self-service-infrastructure"><Highlight color="#203666">Self-Service Infrastructure</Highlight></a>

Here is a schema showing the Terraform Cloud architecture.

<br />

<div className="image-wrapper">
  <ImageWrapper src="https://www.terraform.io/_next/static/images/why-tf-cloud-6813cc7ad5ea75683e614be235f071cc.png?fit=max&fm=webp&q=80&w=2500" width="450px" alt="Architecture Diagram" />
<em>terraform.io/cloud</em>
</div>

<br />

**Terraform Enterprise** focuses more on large enterprises by providing a self-hosted distribution of Terraform Cloud.

### Current behavior

Currently, a user can retrieve the `terraform.tfstate` file from the following places:

- `tfstate://`: Local
- `tfstate+s3://`: AWS S3
- `tfstate+http://`: HTTP Endpoint
- `tfstate+https://`: HTTPS Endpoint

The idea is to bring support for Terraform Cloud/Terraform Enterprise.

:::note Issue links
https://github.com/cloudskiff/driftctl/issues/434  
:::

### Implement the solution

The logic is pretty straightforward as we can use the Terraform Cloud API to retrieve the **current state** for a given Workspace.

```bash
GET /workspaces/:workspace_id/current-state-version
```

Note that Terraform Cloud also retains **historical state versions** that we can retrieve using the following endpoint.
```bash
GET /state-versions/:state_version_id
```

Here is a sample request example to fetch the current state from the Workplace with the id `ws-6fHMCom98SDXSQUv`:

```bash
curl \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  https://app.terraform.io/api/v2/workspaces/ws-6fHMCom98SDXSQUv/current-state-version
```

We will then receive a response with the following shape:

```json
{
  "data": {
    "id": "sv-SDboVZC8TCxXEneJ",
    "type": "state-versions",
    "attributes": {
      "vcs-commit-sha": null,
      "vcs-commit-url": null,
      "created-at": "2018-08-27T14:49:47.902Z",
      "hosted-state-download-url": "https://archivist.terraform.io/v1/object/...",
      "serial": 3
    },
    "relationships": {
      "run": {
        "data": {
          "type": "runs"
        }
      },
      "created-by": {
        "data": {
          "id": "api-org-hashicorp",
          "type": "users"
        },
        "links": {
          "related": "/api/v2/runs/sv-SDboVZC8TCxXEneJ/created-by"
        }
      },
      "outputs": {
        "data": [
          {
            "id": "wsout-J2zM24JPFbfc7bE5",
            "type": "state-version-outputs"
          }
        ]
      }
    },
    "links": {
      "self": "/api/v2/state-versions/sv-SDboVZC8TCxXEneJ"
    }
  }
}
```

The part that interests us is the `hosted-state-download-url` attribute which provides a url from which we can download the raw state `tfstate`.  
We can then use this url with the `HTTPReader` already present in driftctl which allows us to get a state from an https endpoint.

To summarize, here is the final workflow:

1. Fetch hosted-state-download-url from the API with the provided `WORKSPACE_ID` (`tfstate+tfcloud://WORKSPACE_ID`) and the API token through the provided `tfc-token` (`--tfc-token TFC_TOKEN`)
2. Use `HTTPReader` with the retrieved `hosted-state-download-url`

### Add the new IaC source

As said above, we will add a new IaC source to scan resources from the input Terraform statefile.  
This new flag will be : `tfstate+tfcloud://$WORKSPACE_ID` with `$WORKSPACE_ID` representing the ID for the workspace whose current state version we want to fetch.

**_Define constants and Terraform Cloud types._**

```go title="pkg/iac/terraform/state/backend/tfcloud_reader.go"
// Used in scan --from tfstate+tfcloud
const BackendKeyTFCloud = "tfcloud"
// Terraform Cloud API base root
const TFCloudAPI = "https://app.terraform.io/api/v2"

type TFCloudAttributes struct {
	HostedStateDownloadUrl string `json:"hosted-state-download-url"`
}

type TFCloudData struct {
	Attributes TFCloudAttributes `json:"attributes"`
}
// Body of the current-state-version response
type TFCloudBody struct {
	Data TFCloudData `json:"data"`
}
```

**_Define our TFCloudReader method._**

```go title="pkg/iac/terraform/state/backend/tfcloud_reader.go"
/*
  workspaceId: retrieved from "tfstate+tfcloud://workspaceId"
  opts: contains our token within the TFCloudToken attribute
*/
func NewTFCloudReader(client pkghttp.HTTPClient, workspaceId string, opts *Options) (*HTTPBackend, error) {
  // 1. Fetch the current-state-version from the TFCloud API
	req, err := http.NewRequest(http.MethodGet, fmt.Sprintf("%s/workspaces/%s/current-state-version", TFCloudAPI, workspaceId), nil)

	if err != nil {
		return nil, err
	}

  // 2. Provide the right headers (with the token in Authorization)
	req.Header.Add("Content-Type", "application/vnd.api+json")
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", opts.TFCloudToken))

	client := &http.Client{}
	res, err := client.Do(req)

	if err != nil {
    return nil, err
	}

  /* 3. Test that we have the correct response
        - We can have 401 in case the provided authentication api_token is wrong
        - We can have 404 in case the provided workspace_id is wrong
  */
	if res.StatusCode < 200 || res.StatusCode >= 400 {
		return nil, errors.Errorf("error requesting terraform cloud backend state: status code: %d", res.StatusCode)
	}

	bodyBytes, _ := ioutil.ReadAll(res.Body)

	body := TFCloudBody{}
	err = json.Unmarshal(bodyBytes, &body)

	if err != nil {
		return nil, err
	}

  // 4. Retrieve the hosted-state-download-url from the body response
	rawURL := body.Data.Attributes.HostedStateDownloadUrl
	logrus.WithFields(logrus.Fields{"hosted-state-download-url": rawURL}).Trace("Terraform Cloud backend response")

	opt := Options{}

  // 5. Return a new HTTP reader with the hosted-state-download-url
	return NewHTTPReader(&http.Client{}, rawURL, &opt)
}
```

The `NewTFCloudReader` function above will be triggered when we'll use `tfstate+tfcloud`.

This logic is defined in the main state backend file:

```go {19,20,21,22} title="pkg/iac/terraform/state/backend/backend.go"
func GetBackend(config config.SupplierConfig, opts *Options) (Backend, error) {
	backend := config.Backend
	if !IsSupported(backend) {
		return nil, errors.Errorf("Unsupported backend '%s'", backend)
	}
	switch backend {
    // ""
	  case BackendKeyFile:
	  	return NewFileReader(config.Path)
    // "s3"
	  case BackendKeyS3:
	  	return NewS3Reader(config.Path)
    // "http"
	  case BackendKeyHTTP:
	  	fallthrough
    // "https"
	  case BackendKeyHTTPS:
  		return NewHTTPReader(&http.Client{}, fmt.Sprintf("%s://%s", config.Backend, config.Path), opts)
    // "tfcloud"
    // config.Path contains our workspace id and opts contains HTTP Headers and the API token
	  case BackendKeyTFCloud:
	  	return NewTFCloudReader(&http.Client{}, config.Path, opts)
	  default:
	  	return nil, errors.Errorf("Unsupported backend '%s'", backend)
	}
```

### Add some tests

To check that our code covers the different cases correctly, we will write three tests:

- Success to fetch URL with auth header
- Fail with **wrong workspaceId**
- Fail with **bad authentication token**

We will define an array of tests in which we will iterate.

Here is the example of the **success test case** when we manage to recover the state correctly.

```go title="pkg/iac/terraform/state/backend/tfcloud_reader_test.go"
{
  // Name of the current test
	name: "Should fetch URL with auth header",
  // Refers to the NewTFCloudReader arguments
	args: args{
		workspaceId: "workspaceId",
		options: &Options{
			TFCloudToken: "TOKEN",
		},
	},
	url:     "https://app.terraform.io/api/v2/workspaces/workspaceId/current-state-version",
  // Refers to the hosted-state-download-url result
	wantURL: "https://archivist.terraform.io/v1/object/test",
	wantErr: nil,
  // Mock the the different http calls
	mock: func() {
		httpmock.Reset()
    // Mock the Terraform Cloud API call
		httpmock.RegisterResponder(
			"GET",
			"https://app.terraform.io/api/v2/workspaces/workspaceId/current-state-version",
			httpmock.NewBytesResponder(
        http.StatusOK,
        []byte(`
        {
          "data":{
             "attributes":{
                "hosted-state-download-url":"https:archivist.terraform.io/v1/object/test"
             }
          }
        }`)
      ),
		)
    // Mock the state response from the hosted-state-download-url request
		httpmock.RegisterResponder(
			"GET",
			"https://archivist.terraform.io/v1/object/test",
			httpmock.NewBytesResponder(http.StatusOK, []byte(`{}`)),
		)
	},
},
```

Here is the main loop in which we check that each test matches what we expected.

```go title="pkg/iac/terraform/state/backend/tfcloud_reader_test.go"
for _, tt := range tests {
	t.Run(tt.name, func(t *testing.T) {
    // Mock the following HTTP calls
		tt.mock()
    // Call the reader with the args
		got, err := NewTFCloudReader(&http.Client{}, tt.args.workspaceId, tt.args.options)
    // Check if we wanted an error
		if tt.wantErr != nil {
      // Check the expected error with the actual one and return
			assert.EqualError(t, err, tt.wantErr.Error())
			return
		} else {
			assert.NoError(t, err)
		}
		assert.NotNil(t, got)
    // Check the expected url with the actual one
		assert.Equal(t, tt.wantURL, got.request.URL.String())
	})
}
```

## Final result

Retrieve your **workspace ID** and **API token** from your Terraform Cloud account.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/driftctl/credentials.jpg')} width="100%" alt="Terraform Cloud Credentials" />
<em>Terraform Cloud Credentials</em>
</div>

<br />

We can now scan our resource with the command:

```
driftctl scan --from tfstate+tfcloud://$WORKSPACE_ID --tfc-token $API_TOKEN
```

Which in my case gives the following output telling me that 9 resources are not covered by IaC.

```bash
Scanned resources:    (20)
Found resources not covered by IaC:
  aws_iam_policy_attachment:
    - role_test-arn:aws:iam::559417107340:policy/ConsoleMe
  aws_iam_role:
    - role_test
  aws_iam_access_key:
    - ******************** (User: test2)
    - ******************** (User: admin)
  aws_iam_policy:
    - arn:aws:iam::559417107340:policy/ConsoleMe
    - arn:aws:iam::559417107340:policy/test_policy_2
    - arn:aws:iam::559417107340:policy/test_policy
  aws_iam_user:
    - admin
    - test2
Found 9 resource(s)
 - 0% coverage
 - 0 covered by IaC
 - 9 not covered by IaC
 - 0 missing on cloud provider
 - 0/0 changed outside of IaC
```

You can try the tool yourself by following the <a href="https://docs.driftctl.com/"><Highlight color="#203666">driftctl official documentation</Highlight></a>.

## Takeaway

### Problems encountered

The majority of the problems I encountered were related to Golang. It's not a language I am familiar with so I often had to go back and forth between my IDE and the docs.

### What did I learn ?

This was my first contribution in **Golang** and also the first one using **Terraform Cloud**.
