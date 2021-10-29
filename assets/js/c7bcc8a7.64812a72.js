"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[182],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return p}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=l(r),p=o,g=d["".concat(u,".").concat(p)]||d[p]||f[p]||i;return r?n.createElement(g,a(a({ref:t},s),{},{components:r})):n.createElement(g,a({ref:t},s))}));function p(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=d;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var l=2;l<i;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},3919:function(e,t,r){function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!n(e)}r.d(t,{b:function(){return n},Z:function(){return o}})},4996:function(e,t,r){r.d(t,{C:function(){return i},Z:function(){return a}});var n=r(2263),o=r(3919);function i(){var e=(0,n.Z)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,r=void 0===t?"/":t,i=e.url;return{withBaseUrl:function(e,t){return function(e,t,r,n){var i=void 0===n?{}:n,a=i.forcePrependBaseUrl,c=void 0!==a&&a,u=i.absolute,l=void 0!==u&&u;if(!r)return r;if(r.startsWith("#"))return r;if((0,o.b)(r))return r;if(c)return t+r;var s=r.startsWith(t)?r:t+r.replace(/^\//,"");return l?e+s:s}(i,r,e,t)}}}function a(e,t){return void 0===t&&(t={}),(0,i().withBaseUrl)(e,t)}},2826:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return s},Highlight:function(){return f},toc:function(){return d},default:function(){return g}});var n=r(3117),o=r(102),i=(r(7294),r(3905)),a=r(4996),c=["components"],u={id:"flutter",title:"Google - Flutter"},l=void 0,s={unversionedId:"projects/flutter",id:"projects/flutter",isDocsHomePage:!1,title:"Google - Flutter",description:"backgroundColor: color,",source:"@site/docs/projects/flutter.md",sourceDirName:"projects",slug:"/projects/flutter",permalink:"/docs/projects/flutter",editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/projects/flutter.md",tags:[],version:"current",frontMatter:{id:"flutter",title:"Google - Flutter"},sidebar:"docs",previous:{title:"CloudSkiff - driftctl",permalink:"/docs/projects/driftctl"}},f=function(e){var t=e.children,r=e.color;return(0,i.kt)("span",{style:{backgroundColor:r,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},d=[{value:"Project description",id:"project-description",children:[{value:"Related contributions",id:"related-contributions",children:[],level:3}],level:2}],p={Highlight:f,toc:d};function g(e){var t=e.components,r=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("div",{className:"marginBottom"},(0,i.kt)("span",{className:"badge badge--secondary marginRight"},"Mobile"),(0,i.kt)("span",{className:"badge badge--secondary marginRight"},"Dart"),(0,i.kt)("span",{className:"badge badge--secondary marginRight"},"Android-iOS"),(0,i.kt)("span",{className:"badge badge--secondary marginRight"},"macOS-Windows"),(0,i.kt)("span",{className:"badge badge--secondary marginRight"},"Web")),(0,i.kt)("h2",{id:"project-description"},"Project description"),(0,i.kt)("div",{className:"image-wrapper"},(0,i.kt)("img",{alt:"Flutter presentation",src:(0,a.Z)("img/flutter/flutter.jpeg"),width:"600"})),(0,i.kt)("a",{href:"https://flutter.dev/"},(0,i.kt)(f,{color:"#203666",mdxType:"Highlight"},"Website link")),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Flutter is Google's SDK for crafting beautiful, fast user experiences for mobile, web, and desktop from a single codebase. Flutter works with existing code, is used by developers and organizations around the world, and is free and open source.")),(0,i.kt)("p",null,"For more information about Flutter you can find it ",(0,i.kt)("a",{href:"https://github.com/flutter/flutter"},(0,i.kt)(f,{color:"#203666",mdxType:"Highlight"},"here")),"."),(0,i.kt)("h3",{id:"related-contributions"},"Related contributions"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{href:"/docs/contributions/flutter"},(0,i.kt)(f,{color:"#203666",mdxType:"Highlight"},"13. Flutter contributions")))))}g.isMDXComponent=!0}}]);