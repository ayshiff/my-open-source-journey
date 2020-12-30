---
id: xlayers395
title: xLayers - Rethink UX
---

import clsx from 'clsx';
import styles from '../src/pages/styles.module.css';

export const Highlight = ({children, color}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
      fontWeight: 600,
    }}>{children}</span> );

import useBaseUrl from '@docusaurus/useBaseUrl';

<div class="marginBottom">
  <span class="badge badge--secondary marginRight">Angular</span>
  <span class="badge badge--secondary marginRight">Typescript</span>
  <span class="badge badge--secondary marginRight">UX</span>
</div>

:::info Pull-Request link
https://github.com/xlayers/xlayers/pull/395
:::

:::tip Pull-Request Type
This PR is a new **feature**.
:::

## Introduction

### Project description

xLayers is a tool made to **reduce the gap** between designers and developers.  
It is a **code generation tool** that produces code from your design sketches.

For more informations about xLayers you can find it <a href="https://github.com/xlayers/xlayers"><Highlight color="#25c2a0">here</Highlight></a>.

<a href="https://xlayers.app/#/home"><Highlight color="#25c2a0">Website link</Highlight></a>

<p align="center">
<br/>
<img
  alt="xLayers presentation"
  src="https://raw.githubusercontent.com/xlayers/xlayers/main/apps/xlayers/src/assets/xlayers-ui-1.png?raw=true"
/>
<br/>
<em>The Viewer interface</em>
</p>

### Context

The main idea of the issue is to find a new workflow for the user, to **rethink the UX**.

From the **first** page to the **last** one.

### Current behavior

Currently the user workflow looks like this:

<p align="center">
<img
  alt="xLayers current user workflow"
  src={useBaseUrl('img/xlayers395/current-workflow.png')}
  height="600px"
/>
<br/>
<em>Current workflow diagram</em>
</p>

The main issue is that xLayers generates code for **all** supported framework at once.   
This could be problematic in the future if it supports **more frameworks**.

:::note Issue link
https://github.com/xlayers/xlayers/issues/379
:::

## Implement the solution

- On the landing page, we will allow users to **choose their framework** they wanna generate code for.
- The code generation UI should only show **the selected framework**. Users can **switch** the selected framework.

:::caution code blocks
The code blocks are intentionally not complete for the sake of readability.  
If you want to read the full code you'll find it in the PR link at the top.
:::

### Update the landing page

My first suggestion for this page was to implement a carousel with all the supported frameworks.   
By discussing with the other members of the team we decided to display only a simple list.

<p align="center">
<img
  alt="xLayers current user workflow"
  src={useBaseUrl('img/xlayers395/landing-page.png')}
  height="600px"
/>
<br/>
<em>The landing page wireframe</em>
</p>

As we need to use the different `CodeGenKind` (frameworks) in two different pages, I extracted a list to a shared file where we put all our `CodeGenKind` elements.

Each element contains:

- a **label** for the preview
- a **svgIcon** for the icon
- a **codegenType** for the id

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

As this page already includes a way to switch between frameworks, my first suggestion was to remove the frameworks tab bar and replace it with a simple dropdown component which will be much more unobtrusive and it will not disturb the user. (And we also save space for the code editor).

<p align="center">
<img
  alt="xLayers current user workflow"
  src={useBaseUrl('img/xlayers395/code-generation-ui.png')}
/>
<br/>
<em>The code generation page wireframe</em>
</p>

Nothing magic here, we have a `mat-select` containing our frameworks.   
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

As we need to make the user choice persistent between the two pages, we will update our <a href="https://ngrx.io/"><Highlight color="#25c2a0">NgRx</Highlight></a> store by creating a new `Action` that will be dispatched when the user choose a framework in the landing page.

This Action updates the `kind` value of the `codegen` state which will tell us which framework the user has chosen.
If for some reason the user didn't choose a framework, we set `kind` as 1 (corresponding to `Angular`) by default.   

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

Inside the landing page we will know dispatch the `SelectCodegenKind` action:

```ts title="apps/xlayers/src/home/landing/landing.component.ts"
selectFramework(framework: CodeGenKind) {
  this.store.dispatch(new SelectCodegenKind(framework));
  this.router.navigateByUrl('/upload');
}
```

Inside the codegen generation page, we can know subsribe to the `codegen.kind` from our store and generate the code for the selected framework.

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
}	  }
```

## Final result

This is the final user workflow.

<p align="center">
<img
  alt="xLayers new user workflow"
  src={useBaseUrl('img/xlayers395/new-workflow.png')}
  height="600px"
/>
<br/>
<em>New workflow diagram</em>
</p>

Here is a small presentation of the final user workflow in xLayers.

<p align="center">
<img
  alt="xLayers new user workflow"
  src={useBaseUrl('img/xlayers395/new-workflow.gif')}
/>
<br/>
<em>New workflow</em>
</p>

## Takeaway

### Problems encountered

Someone in the comments suggested using <a href="https://aws.amazon.com/about-aws/whats-new/2020/12/aws-sdk-javascript-version-3-generally-available/"><Highlight color="#25c2a0">AWS JavaScript SDK v3</Highlight></a> as it has first-class TypeScript support.
The issue was that there was a problem with Typescript that was going to be fixed in a <a href="https://github.com/aws/aws-sdk-js-v3/pull/1812"><Highlight color="#25c2a0">PR</Highlight></a>.  
So I had to wait until the fix was merged to bump the aws sdk version.

### What did I learn ?

This contribution allowed me to use the `aws-sdk` v3 and to compare it with the v2 version.
It also allowed me to improve my english by writing some documentation (Not being a native English speaker, it is important for me to improve myself by practicing my English.)

It allowed me, thanks to the review of the different members working on the project, to improve my code, my logic and to question my work to be more rigorous.
