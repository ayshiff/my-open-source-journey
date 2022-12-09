"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[443],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,m=u["".concat(l,".").concat(d)]||u[d]||f[d]||i;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:o,a[1]=c;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},746:function(e,t,n){n.r(t),n.d(t,{Highlight:function(){return s},assets:function(){return p},contentTitle:function(){return c},default:function(){return d},frontMatter:function(){return a},metadata:function(){return l},toc:function(){return u}});var r=n(3117),o=(n(7294),n(3905)),i=n(4996);const a={id:"apple-swift-nio",title:"Apple - SwiftNIO"},c=void 0,l={unversionedId:"projects/apple-swift-nio",id:"projects/apple-swift-nio",title:"Apple - SwiftNIO",description:"swift",source:"@site/docs/projects/apple-swift-nio.md",sourceDirName:"projects",slug:"/projects/apple-swift-nio",permalink:"/docs/projects/apple-swift-nio",draft:!1,editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/projects/apple-swift-nio.md",tags:[],version:"current",frontMatter:{id:"apple-swift-nio",title:"Apple - SwiftNIO"},sidebar:"docs",previous:{title:"Spotify - Backstage",permalink:"/docs/projects/backstage"},next:{title:"Netflix - ConsoleMe",permalink:"/docs/projects/consoleme"}},p={},s=e=>{let{children:t,color:n}=e;return(0,o.kt)("span",{style:{backgroundColor:n,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},u=[{value:"Project description",id:"project-description",level:2},{value:"Related contributions",id:"related-contributions",level:3}],f={Highlight:s,toc:u};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("div",{className:"marginBottom"},(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"swift"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"asynchronous-io"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"networking"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"event-driven")),(0,o.kt)("h2",{id:"project-description"},"Project description"),(0,o.kt)("p",null,"SwiftNIO is a NIO (",(0,o.kt)("strong",{parentName:"p"},"N"),"on Blocking ",(0,o.kt)("strong",{parentName:"p"},"I"),"nput ",(0,o.kt)("strong",{parentName:"p"},"O"),"utput) client server framework which enables quick and easy development of ",(0,o.kt)("strong",{parentName:"p"},"network applications")," in Swift.",(0,o.kt)("br",{parentName:"p"}),"\n","As indicated by its name, it uses ",(0,o.kt)("strong",{parentName:"p"},'"non-blocking I/O"')," in opposition to blocking I/O as the application doesn't wait for data to be sent to or received from the network."),(0,o.kt)("div",{className:"image-wrapper"},(0,o.kt)("img",{alt:"Non-blocking I/O",width:"700px",src:(0,i.Z)("img/swiftnio1692/non-blocking-io.png")})),(0,o.kt)("p",null,"It doesn't aim to provide high-level solutions as it is focused on providing the low-level building blocks for higher-level applications.   "),(0,o.kt)("a",{href:"https://apple.github.io/swift-nio/docs/current/NIO/index.html"},(0,o.kt)(s,{color:"#203666",mdxType:"Highlight"},"Website link")),(0,o.kt)("p",null,"Here is a list of ",(0,o.kt)("strong",{parentName:"p"},"low-level protocol")," implementations:"),(0,o.kt)("div",{className:"image-wrapper"},(0,o.kt)("img",{alt:"Low-level protocol implementations",width:"500px",src:(0,i.Z)("img/swiftnio1692/low-level.png")}),(0,o.kt)("br",null),(0,o.kt)("em",null,"Low-level protocol implementations")),(0,o.kt)("p",null,"SwiftNIO applications are constructed of 8 types of ",(0,o.kt)("strong",{parentName:"p"},"components"),":"),(0,o.kt)("div",{className:"image-wrapper"},(0,o.kt)("img",{alt:"Artchitecture",width:"700px",src:(0,i.Z)("img/swiftnio1692/architecture.png")}),(0,o.kt)("br",null),(0,o.kt)("em",null,"Basic architecture")),(0,o.kt)("h3",{id:"related-contributions"},"Related contributions"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{href:"/docs/contributions/apple-swift-nio1692"},(0,o.kt)(s,{color:"#203666",mdxType:"Highlight"},"1. SwiftNIO core - SocketAddress creation")))))}d.isMDXComponent=!0}}]);