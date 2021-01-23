---
id: lifetime28
title: LifeTime - Events list
sidebar_label: 4. LifeTime - Events list
---

<p className="post_date">19 Jan 2021</p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Open } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
  <div>
    <Open />
  </div>
  <span className="badge badge--secondary marginRight">coaching</span>
  <span className="badge badge--secondary marginRight">react-native</span>
  <span className="badge badge--secondary marginRight">ReasonML</span>
</div>
</div>

:::info Pull-Request link
https://github.com/MoOx/LifeTime/pull/28
:::

:::tip Pull-Request Type
This PR is a new **feature**.
:::

## Introduction

This contribution is for me the opportunity to present you a language that I particularly like... ReasonML.

<div className="image-wrapper">
<br/>
<img
  alt="LifeTime presentation"
  width="100%"
  src={useBaseUrl('img/lifetime/presentation2.png')}
/>
<br/>
<em>LifeTime = ReasonML + calendars</em>
</div>

### Project

You can find the <a href="/docs/projects/lifetime"><Highlight color="#25c2a0">LifeTime project presentation here</Highlight></a>.

### Context

To understand a little bit more about the solution you need to understand what <a href="https://reasonml.github.io/"><Highlight color="#25c2a0">ReasonML</Highlight></a> is.

ReasonML is a programming langugage created at Facebook and powered by **OCaml**.   
It is a **new syntax** for the programming language OCaml. Anything possible in OCaml is possible in Reason!

The idea behind Reason is pretty simple: if it compiles it will works! (99% of the time)

<div className="image-wrapper">
<br/>
<img
  alt="ReasonML presentation"
  width="800px"
  src={useBaseUrl('img/lifetime/reasonml-presentation.png')}
/>
<br/>
<em>OCaml ecosystem with ReasonML</em>
</div>
<br/>

**The story of Messenger.com**

On September 8, 2017 the team at facebook working on ReasonML published a post where they explain that 50% of Messenger.com (the web version of Facebook Messenger) codebase was converted to Reason code.   

Here are some benefits they noticed:
- Build of the entire Reason part of the codebase is ~2s
- Bug reports has decreased (from a few one per day to **10 bugs** a year)
- Refactors are faster and introduce fewer bugs

### Current behavior

Let's go back to our project.   

Currently when a User arrives on the app, he arrives on the **Home screen** with:
- the **weekly chart**: displaying the week activities average
- the **top activities list**: displaying in descending order he activities with the most time 

When the User tap on an activity, he goes to the associated **Activity detail** screen with:
- the activity **category** list where he can choose the type of the activity
- the possibility to **hide/show** the activity

<div className="image-wrapper">
<br/>
<img
  alt="LifeTime presentation"
  width="600px"
  src={useBaseUrl('img/lifetime/context.png')}
/>
<br/>
<em>Home + Activity detail screens</em>
</div>
<br/>

The goal of the contribution is to add to this screen:
- an **event list** containing all the events of the activity
- a **graph** showing the different events

:::note Issue link
https://github.com/MoOx/LifeTime/issues/23
:::

## Implement the solution

:::caution code blocks
The code blocks are intentionally incomplete for the sake of readability.  
If you want to read the full code you'll find it in the PR link at the top.
:::

### Add the events list

<div className="image-wrapper">
<br/>
<img
  alt="Events list details"
  width="600px"
  src={useBaseUrl('img/lifetime/events-list-detail.png')}
/>
<br/>
<em>Events list</em>
</div>
<br/>

#### Final result

<div className="image-wrapper">
<br/>
<img
  alt="Events list final result"
  width="300px"
  src={useBaseUrl('img/lifetime/events-list.png')}
/>
<br/>
<em>Events list</em>
</div>
<br/>

### Add the events graph

#### Final result

<div className="image-wrapper">
<br/>
<img
  alt="Avtivity chart"
  width="300px"
  src={useBaseUrl('img/lifetime/activity-chart.png')}
/>
<br/>
<em>Avtivity chart</em>
</div>

## Takeaway

### Problems encountered

### What did I learn ?

