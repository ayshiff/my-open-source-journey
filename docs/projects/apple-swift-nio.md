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

SwiftNIO is a NIO (**N**on Blocking **I**nput **O**utput) client server framework which enables quick and easy development of **network applications** in Swift.   
As indicated by its name, it uses **"non-blocking I/O"** in opposition to blocking I/O as the application doesn't wait for data to be sent to or received from the network.

<div className="image-wrapper">
<img
  alt="Non-blocking I/O"
  width="700px"
  src={useBaseUrl('img/swiftnio1692/non-blocking-io.png')}
/>
</div>

It doesn't aim to provide high-level solutions as it is focused on providing the low-level building blocks for higher-level applications.   


<a href="https://apple.github.io/swift-nio/docs/current/NIO/index.html"><Highlight color="#203666">Website link</Highlight></a>

Here is a list of **low-level protocol** implementations:

<div className="image-wrapper">
<img
  alt="Low-level protocol implementations"
  width="500px"
  src={useBaseUrl('img/swiftnio1692/low-level.png')}
/>
<br/>
<em>Low-level protocol implementations</em>
</div>

SwiftNIO applications are constructed of 8 types of **components**:

<div className="image-wrapper">
<img
  alt="Artchitecture"
  width="700px"
  src={useBaseUrl('img/swiftnio1692/architecture.png')}
/>
<br/>
<em>Basic architecture</em>
</div>

### Related contributions

- <a href="/docs/contributions/apple-swift-nio1692"><Highlight color="#203666">1. SwiftNIO core - SocketAddress creation</Highlight></a>
