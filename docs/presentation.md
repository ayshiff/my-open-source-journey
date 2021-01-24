---
id: presentation
title: Concept presentation
---

import clsx from 'clsx';
import styles from '../src/pages/styles.module.css';

export const Highlight = ({children, color}) => ( <span 
      className={clsx(styles.article_highlight)}>{children}</span> );

export const HighlightWebsite = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

The concept is simple, **every two weeks** (semi-monthly) I choose a **contribution** to Open Source that I made during these two weeks that I find quite complete and particularly interesting to present to you.   
It is also an opportunity for me to **present some Open Source projects**.   

This contribution will be in the form of a <Highlight color="#203666">Pull Request</Highlight>.

I will share with you an article which will be in the form below but I keep the freedom to adjust the shape of the articles according to the content I want to present.

### Contribution details
#### Contribution references

A badge will indicate the **Contribution link** (on GitHub) and another badge will indicate the **type of contribution** (feature, bug fix ...)

:::info Contribution link
This is an example of a Pull Request link badge.
:::

:::tip Contribution Type
This is an example of a Pull Request type badge.
:::
#### Tags

Some tags will be used to display **technologies and concepts** used for the contribution.   
You can find them in the following form:

<div>
  <span className="badge badge--secondary marginRight">Tech 1</span>
  <span className="badge badge--secondary marginRight">Tech 2</span>
  <span className="badge badge--secondary marginRight">Concept 1</span>
  &nbsp; . . .
</div>

## Introduction
### Project description

I will put here a brief **description** of the project to which the contribution is made.   
**Understanding**, **playing** with and **familiarizing** yourself with the project is important when contributing to an Open Source repository.   
The purpose of this step is to make you understand the usefulness of the project and to provide you with an **introductory context**.

Note that each project may have **several contributions**.

### Context

This step will be a continuation of the first one, it will allow you to understand in **more detail** the context in which the contribution takes place.

I will also add the **project website link** (if available) in the following form: <a href=""><HighlightWebsite color="#25c2a0">Example website link</HighlightWebsite></a>

## Current Behavior - *actual state*

This step will give you an overview of the **current state** (if there is one) and the **desired state**.   

It will allow you to understand from a **functional point of view** what we expect this contribution to achieve.   
It will recall the **outcome statement** and add information you will need to have to understand the article.

:::note Issue link
This is an example of an issue link badge.
:::

## The solution - *expected state*

This step will surely be the **most important**.   

I will explain my reasoning to you and general **concepts** you need to understand.   
I will illustrate my reasoning with certain **pieces of code**, some **diagrams**...   

I will try to be as clear as possible so that you can broadly understand the work I have done.

## Takeaway
### Problem encountered

Here I will show you some **issues** (if there were any) that I may have encountered while resolving the issue.   

I will present these problems to you with a little perspective to show you how I was able to **learn from these problems** and find solutions.

### What did I learn ?

One of the main motivation that drives me to contribute to Open Source is to **learn new things**.   
I will therefore share here the things that I was able to learn by making this contribution.