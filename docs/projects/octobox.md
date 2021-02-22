---
id: octobox
title: Octobox
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
  <span className="badge badge--secondary marginRight">Ruby</span>
  <span className="badge badge--secondary marginRight">github-notifications</span>
  <span className="badge badge--secondary marginRight">triage</span>
  <span className="badge badge--secondary marginRight">inbox</span>
</div>

## Project description

Octobox is a tool that helps you manage your GitHub notifications efficiently.   

For more information about Octobox you can find it <a href="https://octobox.io/documentation"><Highlight color="#25c2a0">here</Highlight></a>.

<div className="image-wrapper">
<img
  alt="Octobox presentation"
  src={useBaseUrl('img/octobox/presentation.png')}
  width="600"
/>
<br/>
<em>Octobox dashboard</em>
</div>

<a href="https://octobox.io//"><Highlight color="#25c2a0">Website link</Highlight></a>

### Related contributions

- <a href="/docs/contributions/octobox2597"><Highlight color="#25c2a0">6. Octobox - Notifications filter</Highlight></a>