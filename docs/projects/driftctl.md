---
id: driftctl
title: CloudSkiff - driftctl
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
  <span className="badge badge--secondary marginRight">aws</span>
  <span className="badge badge--secondary marginRight">Terraform</span>
  <span className="badge badge--secondary marginRight">Infrastructure-drift</span>
  <span className="badge badge--secondary marginRight">Golang</span>
</div>

## Project description

<div className="image-wrapper">
<img
  alt="Firefox iOS presentation"
  src={useBaseUrl('img/driftctl/logo.png')}
  width="80%"
/>
</div>

<br />

driftctl is an Open Source CLI that will warn of infrastrcuture drifts.    

*We track coverage for unit tests, why not infrastructure as code coverage?* - driftctl

***What can do driftctl?***

- Scan cloud provider and map resources with IaC code
- Analyze diffs, and warn about drift and unwanted unmanaged resources
- Schedule checks (CI/CD)

Here is an example output of the `scan` command which reads a Terraform input and compare it with the current profile infrastructure.

```bash
Found missing resources:
  aws_s3_bucket:
    - driftctl-bucket-test-2
Found resources not covered by IaC:
  aws_s3_bucket:
    - driftctl-bucket-test-3
Found changed resources:
  - driftctl-bucket-test-1 (aws_s3_bucket):
    ~ Versioning.0.Enabled: false => true
Found 3 resource(s)
 - 33% coverage
 - 1 covered by IaC
 - 1 not covered by IaC
 - 1 missing on cloud provider
 - 1/1 changed outside of IaC
```

For more information about driftctl you can find it <a href="https://driftctl.com/"><Highlight color="#203666">here</Highlight></a>.

### Related contributions

- <a href="/docs/contributions/driftctl458"><Highlight color="#203666">11. driftctl - Support for Terraform Cloud</Highlight></a>