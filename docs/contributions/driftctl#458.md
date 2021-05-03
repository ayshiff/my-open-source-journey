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
import { Open, ImageWrapper } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
    <div>
        <Open />
    </div>
  <span className="badge badge--secondary marginRight">aws</span>
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

### Current behavior

Currently, a user can retrieve the `terraform.tfstate` file from the following places:

- `tfstate://`: Local
- `tfstate+s3://`: AWS S3
- `tfstate+http://`: HTTP Endpoint
- `tfstate+https://`: HTTPS Endpoint

The idea is to bring support for Terraform Cloud/Terraform Enterprise.

*What is Terraform Cloud/Terraform Enterprise?*

**Terraform Cloud** is a managed service providing a consistent and reliable environment to manage Terraform runs.

Here is some screenshots of what the Terraform Cloud Dashboard looks like.

<br />

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/driftctl/tfcloud2.jpg')} width="100%" alt="Terraform Cloud Dashboard" />
<em>Terraform Cloud Dashboard</em>
</div>

<!-- Here is a schema showing the tfcloud architecture.

<div className="image-wrapper">
  <ImageWrapper src="https://www.terraform.io/_next/static/images/how-it-works-d29952e53bb982c10035df394faefb74.jpg?fit=max&fm=webp&q=80&w=2500" width="450px" alt="Architecture Diagram" />
<em>terraform.io/cloud</em>
</div> -->

**Terraform Enterprise** focuses more on large enterprises by providing a self-hosted distribution of Terraform Cloud.

:::note Issue links
https://github.com/cloudskiff/driftctl/issues/434   
:::

### Implement the solution

The logic is pretty straightforward as we can use the Terraform Cloud API to retrieve the Current State Version for a given Workspace.

```bash
GET /workspaces/:workspace_id/current-state-version
```

Here is a sample request example:

```bash
curl \
  --header "Authorization: Bearer $TOKEN" \
  --header "Content-Type: application/vnd.api+json" \
  https://app.terraform.io/api/v2/workspaces/ws-6fHMCom98SDXSQUv/current-state-version
```

We will then receive a response with the following shape:

```json
{
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
}
```

The part that interests us is the `hosted-state-download-url` attribute which provides a url from which we can download the raw state `tfstate`.   
We can then use this url with the HTTPReader already present in driftctl which allows us to get a state from an https endpoint.

To summarize, here is the final workflow:

1. Fetch hosted-state-download-url from the API with the provided `WORKSPACE_ID` (`tfstate+tfcloud://WORKSPACE_ID`) and the API token through the headers (`--headers 'Authorization=Bearer API_TOKEN'`)
2. Use `HTTPReader` with the retrieved `hosted-state-download-url`

### Add the new IaC source

As said above, we will add a new IaC source to scan resources from the input Terraform statefile.   
This new flag will be : `tfstate+tfcloud://$WORKSPACE_ID` with `$WORKSPACE_ID` representing the ID for the workspace whose current state version we want to fetch.


***Define constants and Terraform Cloud types.***

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

***Define our TFCloudReader method.***

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

## Final result

Retrieve your workspace ID and API token from your Terraform Cloud account.

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/driftctl/credentials.jpg')} width="100%" alt="Terraform Cloud Credentials" />
<em>Terraform Cloud Credentials</em>
</div>

<br />

We can now scan our resource with the command:

```
driftctl scan --from tfstate+tfcloud://$WORKSPACE_ID --tfc-token $API_TOKEN
```

## Takeaway

### Problems encountered

The majority of the problems I encountered were related to golang. It's not a language I use much so I had to go back and forth between my IDE and the doc.

### What did I learn ?

This was my first contribution in **Golang** and also the first one using **Terraform Cloud**.