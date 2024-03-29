---
id: xlayers395
title: xLayers - Rethink UX
sidebar_label: 2. xLayers - Rethink UX
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

import { Merged, ImageWrapper } from '../utils.md';

<div className="pr_infos">
<div className="marginBottom">
<div>
<Merged date="20 Nov 2020"/>
</div>
  <span className="badge badge--secondary marginRight">Angular</span>
  <span className="badge badge--secondary marginRight">Typescript</span>
  <span className="badge badge--secondary marginRight">UX</span>
</div>
</div>

:::info Contribution link
https://github.com/xlayers/xlayers/pull/395
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
<br/>
<ImageWrapper
  alt="Contribution presentation"
  width="100%"
  src={useBaseUrl('img/xlayers395/cover.jpg')}
/>
<em>xLayers contribution</em>
</div>

### Project

You can find the <a href="/docs/projects/xlayers"><Highlight color="#203666">xLayers project presentation here</Highlight></a>.

<div className="image-wrapper">
<br/>
<ImageWrapper
  alt="xLayers presentation"
  width="500px"
  src={useBaseUrl('img/xlayers395/viewer.webp')}
/>
<em>The Viewer interface</em>
</div>

### Context

The main idea of the issue is to find a new workflow for the user, to **rethink the UX**.

From the **first** page to the **last** one.

### Current behavior

Currently the user workflow looks like this:

<div className="image-wrapper">
<ImageWrapper
  alt="xLayers current user workflow"
  src={useBaseUrl('img/xlayers395/current-workflow.png')}
  width="450px"
/>
<em>Current workflow diagram</em>
</div>
<br/>

The main issue is that xLayers generates code for **all** supported framework at once.   
This could be problematic in the future if it supports **more frameworks**.

:::note Issue link
https://github.com/xlayers/xlayers/issues/379
:::

## Implement the solution

- On the landing page, we will allow users to **choose their framework** they wanna generate code for.
- The code generation UI should only show **the selected framework**.   
Users can **switch** the selected framework.

:::caution code blocks
The code blocks are intentionally incomplete for the sake of readability.  
If you want to read the full code you'll find it in the PR link at the top.
:::

### Update the landing page

My first suggestion for this page was to implement a **carousel** with all the supported frameworks.   
By discussing with the other members of the team we decided to display only a **simple list**.

<div className="image-wrapper">
<ImageWrapper
  alt="xLayers current user workflow"
  src={useBaseUrl('img/xlayers395/landing-page.png')}
/>
<em>The landing page wireframe</em>
</div>
<br/>

As we need to use the different `CodeGenKind` (frameworks) in two different pages, I extracted a list to a shared file where we put all our `CodeGenKind` elements.

Each element contains:

- a **label** for the text preview
- a **svgIcon** for the icon name
- a **codegenType** to reference the element

```ts title="apps/xlayers/src/shared/codegen-list.ts"
export interface UICodeGen {
  label: string;
  svgIcon: string;
  codegenType: CodeGenKind;
}

export const codeGenList: UICodeGen[] = [
  {
    label: 'Angular',
    svgIcon: 'angular',
    codegenType: CodeGenKind.Angular,
  },
  {
    label: 'Vue',
    svgIcon: 'vue',
    codegenType: CodeGenKind.Vue,
  },
  {
    label: 'React',
    svgIcon: 'react',
    codegenType: CodeGenKind.React,
  },
  // ...
];
```

### Update the code generation page

As this page **already includes** a way to switch between frameworks, my first suggestion was to remove the frameworks tab bar and replace it with a simple dropdown component which will be much more **unobtrusive** and it will not disturb the user. And we also **save space** for the code editor !

<div className="image-wrapper">
<ImageWrapper
  alt="xLayers current user workflow"
  src={useBaseUrl('img/xlayers395/code-generation-ui.png')}
/>
<em>The code generation page wireframe</em>
</div>
<br/>

Nothing magic here, we have a `mat-select` containing our list of frameworks.   
The `mat-select-trigger` allows us to add the framework `mat-icon` inside the select.   

```html title="apps/xlayers/src/app/editor/code/editor-container/editor-container.component.html"
<!-- ... -->
<mat-form-field class="framework_selection" appearance="fill">
  <mat-label>Framework</mat-label>
  <mat-select
    [(ngModel)]="selectedFramework"
    (selectionChange)="onChange($event)"
  >
    <mat-select-trigger>
      <div class="flex-container">
        <mat-icon svgIcon="{{ selectedFramework.svgIcon }}"></mat-icon
        >{{ selectedFramework.label }}
      </div>
    </mat-select-trigger>
    <mat-option *ngFor="let framework of frameworks" [value]="framework">
      <div class="flex-container">
        <mat-icon svgIcon="{{ framework.svgIcon }}"></mat-icon>
        {{ framework.label }}
      </div>
    </mat-option>
  </mat-select>
</mat-form-field>
<!-- ... -->
```

### Update the store

As we need to make the user choice persistent between the two pages, we will update our <a href="https://ngrx.io/"><Highlight color="#203666">NgRx</Highlight></a> store by creating a new `Action` that will be dispatched when the user choose a framework in the landing page.

<div className="image-wrapper">
<ImageWrapper
  alt="NgRx diagram"
  src={useBaseUrl('img/xlayers395/ngrx.png')}
/>
<em>NgRx diagram</em>
</div>
<br/>

This Action updates the `kind` value of the `codegen` state which will tell us which framework the user has chosen.
If for some reason the user didn't choose a framework, we set `kind` to 1 (corresponding to `Angular`) by default.   

```ts {3-4,7-10,14-16,24-34} title="apps/xlayers/src/app/core/state/page.state.ts"
export interface CodeGenSettings {
  kind: CodeGenKind;
  content?: XlayersNgxEditorModel[];
  buttons?: XlayersExporterNavBar;
}

export class SelectCodegenKind {
  static readonly type = '[CodeGen] Select Kind';
  constructor(public kind: CodeGenKind) {}
}

@State<CodeGenSettings>({
  name: 'codegen',
  defaults: {
    kind: 1,
  },
})
@Injectable()
export class CodeGenState {
  // ...
  return codegen;
}

@Action(SelectCodegenKind)
selectKind(
  { setState, getState }: StateContext<CodeGenSettings>,
  action: SelectCodegenKind
) {
  const state = getState();
  setState({
    ...state,
    kind: action.kind,
  });
}
```

Inside the landing page we will **dispatch** the `SelectCodegenKind` action:

```ts title="apps/xlayers/src/home/landing/landing.component.ts"
selectFramework(framework: CodeGenKind) {
  this.store.dispatch(new SelectCodegenKind(framework));
  this.router.navigateByUrl('/upload');
}
```

Inside the codegen generation page, we can **subscribe** to the `codegen` from our store and generate the code for the selected `codegen.kind`.

```ts title="apps/xlayers/src/app/editor/code/editor-container/editor-container.component.ts"
ngOnInit() {
  this.store.select(CodeGenState.codegen).subscribe((codegen) => {
    if (codegen.kind) {
      this.selectedFramework = this.frameworks.find(
        (framework) => framework.codegenType === codegen.kind
      );
    }
    this.codeSetting = this.codegen.generate(codegen.kind);
  });
}
```

## Final result

This is the final user workflow.

<div className="image-wrapper">
<ImageWrapper
  alt="xLayers new user workflow"
  src={useBaseUrl('img/xlayers395/new-workflow.png')}
  width="450px"
/>
<em>New workflow diagram</em>
</div>
<br/>

Here is a small presentation of the final user workflow in xLayers.

<div className="image-wrapper">
<ImageWrapper
  alt="xLayers new user workflow"
  src={useBaseUrl('img/xlayers395/new-workflow.gif')}
/>
<em>New workflow</em>
</div>

## Takeaway

### Problems encountered

The simplest part of this contribution was the implementation of the solution.   
The design of the user experience was a little more interesting and needed us to think way more than we thought.

### What did I learn ?

As I said above, the richest part was the reflection around the user experience.   
In addition, I was able to discover a codebase that I did not know and apply some concepts of NgRx.

