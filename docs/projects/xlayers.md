---
id: xlayers
title: xLayers
---

import clsx from 'clsx';
import styles from '../../src/pages/styles.module.css';

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';

<div className="marginBottom">
  <span className="badge badge--secondary marginRight">Designers</span>
  <span className="badge badge--secondary marginRight">UI / UX</span>
  <span className="badge badge--secondary marginRight">Angular</span>
  <span className="badge badge--secondary marginRight">Typescript</span>
</div>

## Project description

xLayers is a tool made to **reduce the gap** between designers and developers.  
It is a **code generation tool** that produces code from your design sketches.

For more information about xLayers you can find it <a href="https://github.com/xlayers/xlayers"><Highlight color="#203666">here</Highlight></a>.

<a href="https://xlayers.app/#/home"><Highlight color="#203666">Website link</Highlight></a>

<div className="image-wrapper">
<br/>
<img
  alt="xLayers presentation"
  src="https://raw.githubusercontent.com/xlayers/xlayers/main/apps/xlayers/src/assets/xlayers-ui-1.png?raw=true"
/>
<br/>
<em>The Viewer interface</em>
</div>

### Related contributions

- <a href="/docs/contributions/xlayers395"><Highlight color="#203666">2. xLayers - Rethink UX</Highlight></a>

