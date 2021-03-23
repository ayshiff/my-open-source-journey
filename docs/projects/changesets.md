---
id: changesets
title: Atlassian - Changesets
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
  <span className="badge badge--secondary marginRight">Versioning</span>
  <span className="badge badge--secondary marginRight">Changelogs</span>
  <span className="badge badge--secondary marginRight">Monorepos</span>
</div>

## Project description

Changesets is a workflow that lets contributors declare how the changes they introduce should be released.

It helps automating the package version updates, changelogs and publishing new versions of packages.

For more information about Changesets you can find it <a href="https://github.com/atlassian/changesets"><Highlight color="#203666">here</Highlight></a>.

<div className="image-wrapper">
<img
  alt="Changesets presentation"
  src="https://user-images.githubusercontent.com/11481355/66183943-dc418680-e6bd-11e9-998d-e43f90a974bd.png"
  width="600"
/>
<br/>
<em>Changesets bot</em>
</div>

### Related contributions

- <a href="/docs/contributions/changesets80"><Highlight color="#203666">8. Changesets - Comment on released PRs and issues</Highlight></a>