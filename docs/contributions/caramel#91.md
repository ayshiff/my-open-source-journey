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

You can find the **Caramel programming language presentation** <a href="/docs/projects/caramel"><Highlight color="#203666">here</Highlight></a>.

### Context

This contribution adds pipe operator `|>` support to the Caramel language.    

Here is a summary of the different steps in a compiler:

1. **Lexing** the source into tokens
2. **Parsing** the token stream into an AST (abstract syntax tree)
3. **Validating** the AST
4. **Translating** the AST

### Current behavior

In many functional programming languages, it is a common way to compose functions into a readable left-to-right "pipeline" of steps of computation.

For example in <a href="https://ocaml.org/releases/4.11/htmlman/libref/Stdlib.html#VAL(%7C%3E)"><Highlight color="#203666">OCaml</Highlight></a>:

```ocaml
val (|>) : 'a -> ('a -> 'b) -> 'b
```

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

The first idea was to expose the pipe operator as an external that maps to a `caramel_runtime:pipe` function.

Here is the pipe operator signature:

```ocaml title="caramel/stdlib/caramel_runtime.ml"
external ( |> ) : 'a -> ('a -> 'b) -> 'b = "pipe"
```

Here is the pipe operator definition:

```ocaml title="caramel/stdlib/caramel_runtime.erl"
pipe(A, B) -> B(A).
```

We will tell the compiler to map `|>` to our caramel_runtime pipe function:

```ocaml title="caramel/compiler/ocaml_to_erlang/names.ml"
let ocaml_to_erlang_primitive_op t =
  match t with
  (* ... *)
  | "|>" ->
      Name.qualified
        ~m:(Name.atom (Atom.mk "caramel_runtime"))
        ~f:(Name.atom (Atom.mk "pipe"))
```

Finally given this input:

```ocaml
let print_int number = Io.format "~0tp~n" [ number ]

let subtract x y = y - x
let main _ =
  let divide x y = y / x in
  10 |> subtract 2 |> divide 4 |> print_int
```

It will output:

```erlang
-module(pipe).

-export([main/1]).
-export([print_int/1]).
-export([subtract/2]).

-spec print_int(_) -> ok.
print_int(Number) -> io:format(<<"~0tp~n">>, [Number | []]).

-spec subtract(integer(), integer()) -> integer().
subtract(X, Y) -> erlang:'-'(Y, X).

-spec main(_) -> ok.
main(_) ->
  Divide = fun
    (X, Y) -> erlang:'div'(Y, X)
  end,
  caramel_runtime:pipe(
    caramel_runtime:pipe(
      caramel_runtime:pipe(
        10, subtract(2)
      ),
    Divide(4)
  ),
fun print_int/1).
```

Look how the compiler has replaced our pipes.

The problem was that we needed to first implement partial application to make it work.   
**Partial application** involves passing less than the full number of arguments to a function.

For example:

```ocaml
let add a b = a + b
let addOne = add 1
```

`addOne` is the result of partially applying `add`.   
It is a function that takes an integer `b` and return `b` + 1.

In our example, `subtract` and `Divide` arr called with less arguments that they have to take.

So we went for another solution: rewrite the pipes into SSA (static single assignment).

### Static single assignment

The translation phase is broken down into 3 phases:

- The AST is lowered into an **IR** (intermediate representation)
- The IR is **analyzed**
- The IR is **translated**

SSA introduces a new constraint: all variables are assigned exactly **once**.

The idea is to go from this:

```ocaml
let f x = x |> add 1 |> div 2 |> mult 3
```

To something like this:

```ocaml
f(X) ->
  Caramel@Tmp1 = add(1, X),
  Caramel@Tmp2 = div(2, Caramel@Tmp1),
  Caramel@Tmp3 = mult(3, Caramel@Tmp2).
```

For now we will implement this logic in the ocaml translation side.

The goal is to go from `a |> f |> g` to `let a_f = f a in let a_f_g = g a_f`.

Inside `caramel/compiler/ocaml_to_erlang/fun.ml` there is a match clause for the function application.   
We will add a special case for the pipe operator.

```ocaml
| Texp_apply (expr, args) ->
    let name =
      match
        mk_expression expr ~var_names ~modules ~functions ~module_name
      with
      | Erlang.Ast.Expr_fun_ref { fref_name = n; _ } -> Expr.ident n
      | x -> x
    in
    let args =
      List.filter_map
        (function
          | _, None -> None
          | _, Some arg ->
              Some
                (mk_expression arg ~var_names ~modules ~functions ~module_name))
        args
    in
    Expr.apply name args
```

The idea is to check if the `name` variable is the pipe function and then do our logic to bind the result of `f x` to a new variable with a unique name.

```ocaml
if name = "<PIPE_OPERATOR>"
then (
  let f = args[0] in
  let x = args[1] in
  let f_x = Expr.apply f x in
  let new_var = "<NEW_VARIABLE_NAME>" in
  let binding = Expr.bind new_var f_x in
  Expr.var binding "<NEW_VARIABLE_NAME>"
)
else (
  Expr.apply name args
)
```

## Final result

The final result allows us to compose our function pipeline in this way:

```ocaml
"function1_arg_1"
  |> function1 "function1_arg_2" 
  |> function2 "function2_arg_1" 
  |> function3
```

## Takeaway

### Problems encountered

Understanding how the compiler works was the step that took me the most time.   
It required me to understand a codebase I'm not used to deal with.

### What did I learn ?

This contribution allowed me to review some concepts about **compilers** and **functional** programming languages.
