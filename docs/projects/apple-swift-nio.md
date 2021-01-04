---
id: apple-swift-nio
title: Apple - SwiftNIO
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
  <span className="badge badge--secondary marginRight">swift</span>
  <span className="badge badge--secondary marginRight">asynchronous-io</span>
  <span className="badge badge--secondary marginRight">networking</span>
  <span className="badge badge--secondary marginRight">event-driven</span>
</div>

## Project description

SwiftNIO is a NIO client server framework which enables quick and easy development of **network applications** in Swift.   

<a href="https://apple.github.io/swift-nio/docs/current/NIO/index.html"><Highlight color="#25c2a0">Website link</Highlight></a>

Here is a list of **low-level protocol** implementations:

<p align="center">
<img
  alt="Low-level protocol implementations"
  width="500px"
  src={useBaseUrl('img/swiftnio1692/low-level.png')}
/>
<br/>
<em>Low-level protocol implementations</em>
</p>

SwiftNIO applications are constructed of 8 types of **components**:

<p align="center">
<img
  alt="Artchitecture"
  width="700px"
  src={useBaseUrl('img/swiftnio1692/architecture.png')}
/>
<br/>
<em>Basic architecture</em>
</p>
