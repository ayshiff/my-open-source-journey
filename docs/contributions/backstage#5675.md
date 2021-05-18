---
id: backstage5675
title: Backstage - Techdocs End-to-End testing
sidebar_label: 12. Backstage - Techdocs End-to-End testing
---

<p className="post_date">14 May 2021</p>

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';
import { Open, ImageWrapper } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
  <div>
    <Open />
  </div>
  <span className="badge badge--secondary marginRight">Typescript</span>
  <span className="badge badge--secondary marginRight">Cypress</span>
  <span className="badge badge--secondary marginRight">e2e testing</span>
</div>
</div>

:::info Contribution link
https://github.com/backstage/backstage/pull/5675
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
<ImageWrapper
  alt="Contribution presentation"
  src={useBaseUrl('img/backstage5675/cover.jpg')}
/>
<em>Backstage + TechDocs</em>
</div>

### Project

You can find the <a href="/docs/projects/backstage"><Highlight color="#203666">Backstage project presentation here</Highlight></a>.

### Context

In this contribution we will talk about a specific part of Backstage: **TechDocs**.   
**TechDocs** is a docs-like-code plugin that lets you write your technical documentation next to your code.   
The concept is pretty simple, you write your docs in Markdown files and TechDocs creates a reader-friendly experience for you.

Here is some screenshots of what the plugin looks like inside Backstage.

<br />
<div className="image-wrapper">
<ImageWrapper
  alt="TechDocs entities"
  width="100%"
  src={useBaseUrl('img/backstage5675/entities.jpg')}
/>
<em>TechDocs Dashboard containing the different documentation entities</em>
</div>

<br />
<div className="image-wrapper">
<ImageWrapper
  alt="TechDocs entitiy"
  width="100%"
  src={useBaseUrl('img/backstage5675/entity.jpg')}
/>
<em>TechDocs documentation entity</em>
</div>

### Current behavior

Some functionality of TechDocs relies on interactions between the BackStage app and the shadow root that contains the TechDocs site.

<div className="image-wrapper">
<ImageWrapper
  alt="Contexts"
  width="450px"
  src={useBaseUrl('img/backstage5675/contexts.png')}
/>
</div>

These interactions should be tested to ensure that the TechDocs features are working properly and to avoid regressions.

Here is an example of some e2e tests that we will implement:

- Navigating to a TechDocs site from a **given URL**
- Navigating to a TechDocs site via the **primary navigation bar**
- Navigating to a TechDocs site fragment via the **table of contents**
and so on...

:::note Issue link
https://github.com/backstage/backstage/issues/5588
:::

## Implement the solution

:::warning changes
This PR being still Open, some parts are likely to change.  
I will keep the article updated if any changes are made.
:::

To implement our solution we will use <a href="https://www.cypress.io/"><Highlight color="#203666">Cypress</Highlight></a>.   

But first... *What is Cypress?*

Cypress is a JavaScript End to End testing framework that lets you write Developer-friendly tests.   
Here is a screenshot of the **Cypress user interface** runing Backstage:

<div className="image-wrapper">
<ImageWrapper
  alt="Cypress"
  width="100%"
  src={useBaseUrl('img/backstage5675/cypress.jpg')}
/>
<em>Cypress presentation</em>
</div>

In the screenshot above you can see:
- the **test status menu** used to see how many tests passed or failed
- the **app preview** used to see what happens in your app while the tests are running
- the **command log** shows what it looked when the test ran (also called "time travel")

### Define custom commands

Cypress comes with its own API for creating custom commands that we can use in our tests.   

We will define two commands:

- `loginAsGuest` to log the User as a guest by setting the custom cookie `@backstage/core:SignInPage:provider` to `guest`
- `getTechDocsShadowRoot` to get the shadow DOM root of the TechDocs site more easily

```js title="support/commands.js"
Cypress.Commands.add('loginAsGuest', () => {
  window.localStorage.setItem('@backstage/core:SignInPage:provider', 'guest');
});

Cypress.Commands.add('getTechDocsShadowRoot', () => {
  cy.get('[data-testid="techdocs-content-shadowroot"]').shadow();
});
```

### Configure the viewport

In order to make certain elements visible (like the table of contents), we will have to set a custom viewport size.
We will take the `macbook-15` preset dimensions and define those values inside the `cypress.json` configuration file.
This will tell Cypress to set a custom screen size for our application.

```json title="cypress.json"
{
  "viewportWidth": 1440,
  "viewportHeight": 900
}
```

### Add our first tests

Our first test will be to check that the User can correctly access the TechDocs home page.   

We can access it by visiting the `/docs` endpoint.

```js
it('should navigate to the home TechDocs page', () => {
  cy.visit('/docs');
  cy.contains('Documentation');
});
```

Or we can access it through the Backstage context via the primary navigation bar to the left.

<div className="image-wrapper">
<ImageWrapper
  alt="Navigating to TechDocs"
  width="100%"
  src={useBaseUrl('img/backstage5675/navigating-to-techdocs.jpg')}
/>
</div>
<br />

Writing the corresponding Cypress tests gives us the following code.

```js
it('should navigate to the TechDocs page via the primary navigation bar', () => {
  cy.visit('/');
  cy.get('[data-testid="sidebar-root"]')
    .get('div')
    .get('a[href="/docs"]')
    .click();

  cy.contains('Documentation');
});

it('should navigate to the TechDocs home page from the "Overview" tab', () => {
  cy.visit('/docs');
  cy.get('[data-testid="read_docs"]').eq(0).click();

  cy.location().should(loc => {
    expect(loc.pathname).to.eq('/docs/default/Component/backstage');
  });
});
```

Note that we use the `data-testid` selector as by default Cypress will favor <a href="https://docs.cypress.io/guides/core-concepts/test-runner#Uniqueness"><Highlight color="#203666">these selectors</Highlight></a>.   
By retrieving the elements with a `data-testid` attribute, we make sure that our tests are not coupled to the behavior or styling of the element.   
It also allows us to show that this element is used within our tests so that everyone is aware.

Once we have selected a specific TechDocs entity, we can check that the User can correctly navigate within the TechDocs pages via the navigation bar to the left.

<div className="image-wrapper">
<ImageWrapper
  alt="Navigating bar"
  width="100%"
  src={useBaseUrl('img/backstage5675/navigation-bar.jpg')}
/>
</div>

We will visit the corresponding TechDocs entity page and simulate the clicks on the navigation bar items: `Overview > Roadmap`.

```js
it('should navigate to the TechDocs page via the navigation bar', () => {
  cy.visit('/docs/default/Component/backstage');

  cy.getTechDocsShadowRoot().within(() => {
    cy.get('[data-testid="md-nav-overview"]').click();
    cy.get('[data-testid="md-nav-roadmap"]').click();

    cy.contains('Phases');
    cy.contains('Detailed roadmap');
  });
});
```

The User can also navigate within the current page via the table of contents to the right.   
By clicking on an anchor link, the page will scroll to the selected item in the page.

<div className="image-wrapper">
<ImageWrapper
  alt="Check scroll position"
  width="450px"
  src={useBaseUrl('img/backstage5675/scroll-position.jpg')}
/>
</div>
<br />

To test that we have scrolled to the correct element we will check that the `offsetTop` value of our element equals the `scrollY` of the `window` object.

<div className="image-wrapper">
<ImageWrapper
  alt="Table of content"
  width="100%"
  src={useBaseUrl('img/backstage5675/table-of-content.jpg')}
/>
</div>
<br />

Here is the Cypress test that covers this case.

```js
it('should navigate to the TechDocs page via the table of contents - Level 1', () => {
  cy.visit('/docs/default/Component/backstage/overview/roadmap');

  return cy.getTechDocsShadowRoot().within(() => {
    cy.get('[data-testid="md-nav-phases"]').click();

    cy.get('#phases').then($el => {
      cy.window()
        .its('scrollY')
        .should($scrollY => {
          expect($scrollY).to.be.closeTo($el[0].offsetTop, 200);
        });
    });
  });
});
```

The last test that we want to cover is the `Previous/Next` links at the bottom of each page.   
We'll check that the `Previous` link takes us to the previous page.

<div className="image-wrapper">
<ImageWrapper
  alt="Prev-Next page"
  width="100%"
  src={useBaseUrl('img/backstage5675/prev-next.jpg')}
/>
</div>

Once again we will visit a TechDocs page, click on the previous link defined by its class `md-footer-nav__link.md-footer-nav__link--next` and make sure that it takes us to the correct page.

```js
it('should navigate to the next page within a TechDocs page', () => {
  cy.visit('/docs/default/Component/backstage/overview/roadmap');
  cy.scrollTo('bottom');

  cy.getTechDocsShadowRoot().within(() => {
    cy.get('.md-footer-nav__link.md-footer-nav__link--next').click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq(
        '/docs/default/Component/backstage/overview/vision/',
      );
    });
  });
});
```

## Final result

<div className="image-wrapper">
<ImageWrapper
  alt="Results"
  width="100%"
  src={useBaseUrl('img/backstage5675/results.jpg')}
/>
</div>

Here is the final test-suite that covers the different interactions between the Backstage context and the TechDocs site embedded. As we can see all the tests are completed in **32s**.

<div className="image-wrapper">
<ImageWrapper
  alt="Contribution presentation"
  width="100%"
  src={useBaseUrl('img/backstage5675/e2e.png')}
/>
<em>Cypress test-suite</em>
</div>

## Takeaway

### Problems encountered

As the TechDocs frontend is strongly linked to the API response and we don't know how all this stuff will change in the future, we will certainly not mock the API response as we used to do but let the backend do its job.   
It means that I will certainly remove the `cy.intercept` in the tests.

### What did I learn ?

This contribution has allowed me to define some user workflows and use **Cypress** to test them.   
