---
id: caramel91
title: Caramel - Pipe operator support
sidebar_label: 9. Caramel - Pipe operator support
---

<p className="post_date">29 Mar 2021</p>

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
  <span className="badge badge--secondary marginRight">Erlang</span>
  <span className="badge badge--secondary marginRight">Elixir</span>
  <span className="badge badge--secondary marginRight">Compiler</span>
  <span className="badge badge--secondary marginRight">Ocaml</span>
  <span className="badge badge--secondary marginRight">functional-language</span>
</div>
</div>

:::info Contribution link
https://github.com/AbstractMachinesLab/caramel/pull/91
:::

:::tip Contribution Type
This contribution is a new **feature**.
:::

## Introduction

<div className="image-wrapper">
  <ImageWrapper src={useBaseUrl('img/caramel/cover.jpg')} width="100%" alt="Contribution presentation" />
<em>Caramel pipe operator</em>
</div>

### Project

You can find the **Caramel project presentation** <a href="/docs/projects/caramel"><Highlight color="#203666">here</Highlight></a>.

### Context

This contribution adds pipe operator (`|>`) support to the Caramel language.    

Here is a summary of the different steps in a compiler:

1. **Lexing** the source into tokens
2. **Parsing** the token stream into an AST (abstract syntax tree)
3. **Validating** the AST
4. **Translating** the AST

### Current behavior

In many functional programming languages, it is a common way to compose functions into a readable left-to-right "pipeline" of steps of computation.

For example in <a href="https://ocaml.org/releases/4.11/htmlman/libref/Stdlib.html#VAL(%7C%3E)"><Highlight color="#203666">OCaml</Highlight></a>

:::note Issue link
https://github.com/AbstractMachinesLab/caramel/issues/72
:::

## Implement the solution

:::caution code blocks
The code blocks are intentionally incomplete for the sake of readability.  
If you want to read the full code you'll find it in the PR link at the top.
:::

:::warning changes
This PR being still Open, some parts are likely to change.  
 I will keep the article updated if any changes are made.
:::

### Caramel runtime

The first idea was to expose the pipe operator as an external that maps to a `caramel_runtime:pipe`function.

```ocaml title="caramel/stdlib/caramel_runtime.ml"
external ( |> ) : 'a -> ('a -> 'b) -> 'b = "pipe"
```

```ocaml title="caramel/stdlib/caramel_runtime.erl"
pipe(A, B) -> B(A).
```

```ocaml title="caramel/compiler/ocaml_to_erlang/names.ml"
let ocaml_to_erlang_primitive_op t =
  match t with
  (* ... *)
  | "|>" ->
      Name.qualified
        ~m:(Name.atom (Atom.mk "caramel_runtime"))
        ~f:(Name.atom (Atom.mk "pipe"))
```

It means that if we have this input:

```ocaml
10 |> subtract 2 |> divide 4 |> print_int
```

It will output:

```ocaml
caramel_runtime:pipe(
  caramel_runtime:pipe(
    caramel_runtime:pipe
    (10, subtract(2)), Divide(4)
  ),
fun print_int/1).
```

The problem was that we needed to first implement partial application to make it work.

So we went for another solution: rewrite the pipes into SSA (static single assignment).

### Static single assignment

The translation phase is broken down into 3 phases:

- The AST is lowered into an IR (intermediate representation)
- The IR is analyzed
- The IR is translated

SSA introduces a new constraint: all variables are assigned exactly once.

The idea is to go from this:

```ocaml
let f x = x |> add 1 |> div 2 |> mult 3
```

To this:

```ocaml
f(X) ->
  Caramel@Tmp1 = add(1, X),
  Caramel@Tmp2 = div(2, Caramel@Tmp1),
  Caramel@Tmp3 = mult(3, Caramel@Tmp2).
```

## Final result

## Takeaway

### Problems encountered

Setting up the environment locally as well as testing the behavior of the developed functionality was a bit complicated because there was a strong dependency with GitHub.   
(e.g. Some scenarios to reproduce as creating a release...)

### What did I learn ?

This contribution allowed me to review some concepts about **compilers** and **functional** programming languages.
