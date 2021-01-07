---
id: backstage
title: Spotify - Backstage
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
  <span className="badge badge--secondary marginRight">Typescript</span>
  <span className="badge badge--secondary marginRight">infrastructure</span>
  <span className="badge badge--secondary marginRight">microservices</span>
  <span className="badge badge--secondary marginRight">developer-portal</span>
  <span className="badge badge--secondary marginRight">dx</span>
</div>

## Project description

<img
  alt="Backstage presentation"
  src="https://raw.githubusercontent.com/backstage/backstage/master/docs/assets/headline.png"
/>

<a href="https://backstage.io/"><Highlight color="#25c2a0">Website link</Highlight></a>

When you want to deploy something in the cloud you probably need tools like Terraform, Kubernetes, CI pipelines, the AWS CLI...

Backstage is a platform that **unifies** all your infrastructure tooling, services, documentation with a single UI.   
It gives you an uniform overview of all your services. It also lets you create easily new ressources such as a new backend service.

Backstage was created by **Spotify** but is now hosted by the **Cloud Native Computing Foundation (CNCF)** as a Sandbox level project.

For more informations about Backstage you can find it <a href="https://backstage.io/docs/overview/what-is-backstage"><Highlight color="#25c2a0">here</Highlight></a>.