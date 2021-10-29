"use strict";(self.webpackChunkthe_open_source_with_remi=self.webpackChunkthe_open_source_with_remi||[]).push([[659],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return d}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),f=l(r),d=i,m=f["".concat(u,".").concat(d)]||f[d]||p[d]||o;return r?n.createElement(m,a(a({ref:t},s),{},{components:r})):n.createElement(m,a({ref:t},s))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var l=2;l<o;l++)a[l]=r[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3919:function(e,t,r){function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function i(e){return void 0!==e&&!n(e)}r.d(t,{b:function(){return n},Z:function(){return i}})},4996:function(e,t,r){r.d(t,{C:function(){return o},Z:function(){return a}});var n=r(2263),i=r(3919);function o(){var e=(0,n.Z)().siteConfig,t=(e=void 0===e?{}:e).baseUrl,r=void 0===t?"/":t,o=e.url;return{withBaseUrl:function(e,t){return function(e,t,r,n){var o=void 0===n?{}:n,a=o.forcePrependBaseUrl,c=void 0!==a&&a,u=o.absolute,l=void 0!==u&&u;if(!r)return r;if(r.startsWith("#"))return r;if((0,i.b)(r))return r;if(c)return t+r;var s=r.startsWith(t)?r:t+r.replace(/^\//,"");return l?e+s:s}(o,r,e,t)}}}function a(e,t){return void 0===t&&(t={}),(0,o().withBaseUrl)(e,t)}},3265:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return u},contentTitle:function(){return l},metadata:function(){return s},Highlight:function(){return p},toc:function(){return f},default:function(){return m}});var n=r(3117),i=r(102),o=(r(7294),r(3905)),a=(r(9578),r(4996)),c=["components"],u={id:"lifetime",title:"LifeTime"},l=void 0,s={unversionedId:"projects/lifetime",id:"projects/lifetime",isDocsHomePage:!1,title:"LifeTime",description:"backgroundColor: color,",source:"@site/docs/projects/lifetime.md",sourceDirName:"projects",slug:"/projects/lifetime",permalink:"/docs/projects/lifetime",editUrl:"https://github.com/ayshiff/my-open-source-journey/docs/projects/lifetime.md",tags:[],version:"current",frontMatter:{id:"lifetime",title:"LifeTime"},sidebar:"docs",previous:{title:"xLayers",permalink:"/docs/projects/xlayers"},next:{title:"Octobox",permalink:"/docs/projects/octobox"}},p=function(e){var t=e.children,r=e.color;return(0,o.kt)("span",{style:{backgroundColor:r,borderRadius:"2px",color:"#fff",padding:"0.2rem",fontWeight:600}},t)},f=[{value:"Project description",id:"project-description",children:[{value:"Related contributions",id:"related-contributions",children:[],level:3}],level:2}],d={Highlight:p,toc:f};function m(e){var t=e.components,r=(0,i.Z)(e,c);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("div",{className:"marginBottom"},(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"coaching"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"react-native"),(0,o.kt)("span",{className:"badge badge--secondary marginRight"},"Reason / ReScript")),(0,o.kt)("h2",{id:"project-description"},"Project description"),(0,o.kt)("p",null,"LifeTime is a personal coach, helping you to reach your goals and spend your valuable time on things you love.\nIt relies on your calendar events to learn how you use your time."),(0,o.kt)("p",null,"For more information about LifeTime you can find it ",(0,o.kt)("a",{href:"https://github.com/MoOx/LifeTime"},(0,o.kt)(p,{color:"#203666",mdxType:"Highlight"},"here")),"."),(0,o.kt)("a",{href:"https://moox.io/apps/lifetime/"},(0,o.kt)(p,{color:"#203666",mdxType:"Highlight"},"Website link")),(0,o.kt)("div",{className:"image-wrapper"},(0,o.kt)("br",null),(0,o.kt)("img",{alt:"Life Time Screenshots",width:"500px",src:(0,a.Z)("img/lifetime/screenshots.png")}),(0,o.kt)("br",null),(0,o.kt)("em",null,"LifeTime screens")),(0,o.kt)("h3",{id:"related-contributions"},"Related contributions"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{href:"/docs/contributions/lifetime28"},(0,o.kt)(p,{color:"#203666",mdxType:"Highlight"},"4. LifeTime - Activity detail")))))}m.isMDXComponent=!0},9578:function(e,t){t.Z={header:"header_2zn2",about_container:"about_container_Rw7G",layout:"layout_1Wqo",test:"test_1AcY",about_description:"about_description_1zgr",about_profile_img:"about_profile_img_1aG2",description:"description_326Q",heroBanner:"heroBanner_3P7f",buttons:"buttons_1r9m",features:"features_3azU",featureImage:"featureImage_ZtzX",arrow_down:"arrow_down_19NZ",index_highlight:"index_highlight_fc7R",article_highlight:"article_highlight_mYCY",about_highlight:"about_highlight_2cTu","image-wrapper":"image-wrapper_2WiC"}}}]);