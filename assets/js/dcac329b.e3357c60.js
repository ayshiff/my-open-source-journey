"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[150],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(r),g=o,f=u["".concat(s,".").concat(g)]||u[g]||d[g]||a;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=g;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var l=2;l<a;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},8337:function(e,t,r){r.r(t),r.d(t,{Highlight:function(){return l},assets:function(){return s},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return a},metadata:function(){return c},toc:function(){return p}});var n=r(3117),o=(r(7294),r(3905));r(4996);const a={id:"backstage",title:"Spotify - Backstage"},i=void 0,c={unversionedId:"projects/backstage",id:"projects/backstage",title:"Spotify - Backstage",description:"Typescript",source:"@site/docs/projects/backstage.md",sourceDirName:"projects",slug:"/projects/backstage",permalink:"/docs/projects/backstage",draft:!1,editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/projects/backstage.md",tags:[],version:"current",frontMatter:{id:"backstage",title:"Spotify - Backstage"},sidebar:"docs",previous:{title:"13. Google - Flutter contributions",permalink:"/docs/contributions/flutter"},next:{title:"Apple - SwiftNIO",permalink:"/docs/projects/apple-swift-nio"}},s={},l=e=>{let{children:t,color:r}=e;return(0,o.kt)("span",{style:{backgroundColor:r,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},p=[{value:"Project description",id:"project-description",level:2},{value:"Related contributions",id:"related-contributions",level:3}],u={Highlight:l,toc:p};function d(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("div",{className:"marginBottom"},(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"Typescript"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"infrastructure"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"microservices"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"developer-portal"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"dx")),(0,o.kt)("h2",{id:"project-description"},"Project description"),(0,o.kt)("img",{alt:"Backstage presentation",src:"https://raw.githubusercontent.com/backstage/backstage/master/docs/assets/headline.png"}),(0,o.kt)("a",{href:"https://backstage.io/"},(0,o.kt)(l,{color:"#203666",mdxType:"Highlight"},"Website link")),(0,o.kt)("p",null,"When you want to deploy something in the cloud you probably need tools like Terraform, Kubernetes, CI pipelines, the AWS CLI..."),(0,o.kt)("p",null,"Backstage is a platform that ",(0,o.kt)("strong",{parentName:"p"},"unifies")," all your infrastructure tooling, services, documentation with a single UI.",(0,o.kt)("br",{parentName:"p"}),"\n","It gives you an uniform overview of all your services. It also lets you create easily new ressources such as a new backend service."),(0,o.kt)("p",null,"Backstage was created by ",(0,o.kt)("strong",{parentName:"p"},"Spotify")," but is now hosted by the ",(0,o.kt)("strong",{parentName:"p"},"Cloud Native Computing Foundation (CNCF)")," as a Sandbox level project."),(0,o.kt)("p",null,"For more information about Backstage you can find it ",(0,o.kt)("a",{href:"https://backstage.io/docs/overview/what-is-backstage"},(0,o.kt)(l,{color:"#203666",mdxType:"Highlight"},"here")),"."),(0,o.kt)("h3",{id:"related-contributions"},"Related contributions"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{href:"/docs/contributions/backstage3794"},(0,o.kt)(l,{color:"#203666",mdxType:"Highlight"},"3. Backstage - Techdocs AWS Support"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{href:"/docs/contributions/backstage4416"},(0,o.kt)(l,{color:"#203666",mdxType:"Highlight"},"5. Backstage - Splunk On-Call Plugin"))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{href:"/docs/contributions/backstage5675"},(0,o.kt)(l,{color:"#203666",mdxType:"Highlight"},"12. Backstage - Techdocs End-to-End testing")))))}d.isMDXComponent=!0}}]);