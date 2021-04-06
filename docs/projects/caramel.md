---
id: caramel
title: AbstractMachinesLab - Caramel
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
  <span className="badge badge--secondary marginRight">Erlang</span>
  <span className="badge badge--secondary marginRight">Elixir</span>
  <span className="badge badge--secondary marginRight">Compiler</span>
  <span className="badge badge--secondary marginRight">Ocaml</span>
  <span className="badge badge--secondary marginRight">functional-language</span>
</div>

## Project description

<div className="image-wrapper">
<img
  alt="Caramel presentation"
  src={useBaseUrl('img/caramel/caramel.png')}
  width="200"
/>
</div>

<br />

Caramel is a functional language for building type-safe, scalable, and maintainable applications.

It leverages the OCaml compiler and the Erlang VM.

For more information about Caramel you can find it <a href="https://caramel.run/"><Highlight color="#203666">here</Highlight></a>.

Here is a Hello World example:

```ocaml
(* file: hello_world.ml *)
let main _ = Io.format "~s~n" ["Hello World"]
```

### Related contributions

- <a href="/docs/contributions/caramel91"><Highlight color="#203666">9. Caramel - Pipe operator support</Highlight></a>