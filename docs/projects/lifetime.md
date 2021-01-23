---
id: lifetime
title: LifeTime
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
  <span className="badge badge--secondary marginRight">coaching</span>
  <span className="badge badge--secondary marginRight">react-native</span>
  <span className="badge badge--secondary marginRight">ReasonML</span>
</div>

## Project description

LifeTime is a personal coach, helping you to reach your goals and spend your valuable time on things you love.
It relies on your calendar events to learn how you use your time.

For more informations about LifeTime you can find it <a href="https://github.com/xlayers/xlayers"><Highlight color="#25c2a0">here</Highlight></a>.

<a href="https://moox.io/apps/lifetime/"><Highlight color="#25c2a0">Website link</Highlight></a>

<div className="image-wrapper">
<br/>
<img
  alt="Life Time Screenshots"
  width="500px"
  src={useBaseUrl('img/lifetime/screenshots.png')}
/>
<br/>
<em>LifeTime screens</em>
</div>

### Related contributions

- <a href="/docs/contributions/lifetime28"><Highlight color="#25c2a0">4. LifeTime - Events list</Highlight></a>

