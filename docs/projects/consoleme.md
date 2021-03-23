---
id: consoleme
title: Netflix - ConsoleMe
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
  <span className="badge badge--secondary marginRight">AWS</span>
  <span className="badge badge--secondary marginRight">IAM</span>
  <span className="badge badge--secondary marginRight">Cloud permissions</span>
</div>

## Project description

<a href="https://hawkins.gitbook.io/consoleme/"><Highlight color="#203666">Website link</Highlight></a>

ConsoleMe is a multi-account AWS administrator tool that helps you **manage multiple accounts** into a single web interface.

For example, it allows administrators to obtain console access to their onboarded accounts according to their authorization level.

For more information about ConsoleMe you can find it <a href="https://github.com/Netflix/consoleme"><Highlight color="#203666">here</Highlight></a>.

<div className="image-wrapper">
<img
  alt="Octobox presentation"
  src={useBaseUrl('img/consoleme/presentation.jpg')}
  width="600"
/>
<br/>
<em>ConsoleMe dashboard</em>
</div>

### Related contributions

- <a href="/docs/contributions/consoleme9008"><Highlight color="#203666">7. ConsoleMe - AWS IAM policy linting</Highlight></a>