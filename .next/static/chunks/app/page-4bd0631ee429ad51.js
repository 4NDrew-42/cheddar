(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{4562:(e,t,r)=>{Promise.resolve().then(r.bind(r,9809))},8173:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return g}});let n=r(306),o=r(5155),u=n._(r(2115)),l=r(180),a=r(1394),i=r(4116),s=r(4445),c=r(5353),f=r(2170),d=r(9544);function p(e,t,r){"undefined"!=typeof window&&(async()=>e.prefetch(t,r))().catch(e=>{})}function h(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}r(2363);let g=u.default.forwardRef(function(e,t){let r,n;let{href:l,as:g,children:y,prefetch:b=null,passHref:m,replace:j,shallow:v,scroll:x,onClick:_,onMouseEnter:P,onTouchStart:E,legacyBehavior:O=!1,...M}=e;r=y,O&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let k=u.default.useContext(a.AppRouterContext),C=!1!==b,w=null===b?s.PrefetchKind.AUTO:s.PrefetchKind.FULL,{href:N,as:I}=u.default.useMemo(()=>{let e=h(l);return{href:e,as:g?h(g):e}},[l,g]),T=u.default.useRef(N),S=u.default.useRef(I);O&&(n=u.default.Children.only(r));let A=O?n&&"object"==typeof n&&n.ref:t,[R,U,F]=(0,i.useIntersection)({rootMargin:"200px"}),L=u.default.useCallback(e=>{(S.current!==I||T.current!==N)&&(F(),S.current=I,T.current=N),R(e)},[I,N,F,R]),D=(0,c.useMergedRef)(L,A);u.default.useEffect(()=>{k&&U&&C&&p(k,N,{kind:w})},[I,N,U,C,k,w]);let K={ref:D,onClick(e){O||"function"!=typeof _||_(e),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),k&&!e.defaultPrevented&&function(e,t,r,n,o,l,a){let{nodeName:i}=e.currentTarget;"A"===i.toUpperCase()&&function(e){let t=e.currentTarget.getAttribute("target");return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||(e.preventDefault(),u.default.startTransition(()=>{let e=null==a||a;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:l,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})}))}(e,k,N,I,j,v,x)},onMouseEnter(e){O||"function"!=typeof P||P(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),k&&C&&p(k,N,{kind:w})},onTouchStart:function(e){O||"function"!=typeof E||E(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),k&&C&&p(k,N,{kind:w})}};return(0,f.isAbsoluteUrl)(I)?K.href=I:O&&!m&&("a"!==n.type||"href"in n.props)||(K.href=(0,d.addBasePath)(I)),O?u.default.cloneElement(n,K):(0,o.jsx)("a",{...M,...K,children:r})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8571:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{cancelIdleCallback:function(){return n},requestIdleCallback:function(){return r}});let r="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},n="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4116:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return i}});let n=r(2115),o=r(8571),u="function"==typeof IntersectionObserver,l=new Map,a=[];function i(e){let{rootRef:t,rootMargin:r,disabled:i}=e,s=i||!u,[c,f]=(0,n.useState)(!1),d=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{d.current=e},[]);return(0,n.useEffect)(()=>{if(u){if(s||c)return;let e=d.current;if(e&&e.tagName)return function(e,t,r){let{id:n,observer:o,elements:u}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=l.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},a.push(r),l.set(r,t),t}(r);return u.set(e,t),o.observe(e),function(){if(u.delete(e),o.unobserve(e),0===u.size){o.disconnect(),l.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:r})}else if(!c){let e=(0,o.requestIdleCallback)(()=>f(!0));return()=>(0,o.cancelIdleCallback)(e)}},[s,r,t,c,d.current]),[p,c,(0,n.useCallback)(()=>{f(!1)},[])]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5353:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=r(2115);function o(e,t){let r=(0,n.useRef)(()=>{}),o=(0,n.useRef)(()=>{});return(0,n.useMemo)(()=>e&&t?n=>{null===n?(r.current(),o.current()):(r.current=u(e,n),o.current=u(t,n))}:e||t,[e,t])}function u(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},180:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{formatUrl:function(){return u},formatWithValidation:function(){return a},urlObjectKeys:function(){return l}});let n=r(9955)._(r(4156)),o=/https?|ftp|gopher|file/;function u(e){let{auth:t,hostname:r}=e,u=e.protocol||"",l=e.pathname||"",a=e.hash||"",i=e.query||"",s=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?s=t+e.host:r&&(s=t+(~r.indexOf(":")?"["+r+"]":r),e.port&&(s+=":"+e.port)),i&&"object"==typeof i&&(i=String(n.urlQueryToSearchParams(i)));let c=e.search||i&&"?"+i||"";return u&&!u.endsWith(":")&&(u+=":"),e.slashes||(!u||o.test(u))&&!1!==s?(s="//"+(s||""),l&&"/"!==l[0]&&(l="/"+l)):s||(s=""),a&&"#"!==a[0]&&(a="#"+a),c&&"?"!==c[0]&&(c="?"+c),""+u+s+(l=l.replace(/[?#]/g,encodeURIComponent))+(c=c.replace("#","%23"))+a}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function a(e){return u(e)}},4156:(e,t)=>{"use strict";function r(e){let t={};return e.forEach((e,r)=>{void 0===t[r]?t[r]=e:Array.isArray(t[r])?t[r].push(e):t[r]=[t[r],e]}),t}function n(e){return"string"!=typeof e&&("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;return Object.entries(e).forEach(e=>{let[r,o]=e;Array.isArray(o)?o.forEach(e=>t.append(r,n(e))):t.set(r,n(o))}),t}function u(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return r.forEach(t=>{Array.from(t.keys()).forEach(t=>e.delete(t)),t.forEach((t,r)=>e.append(r,t))}),e}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{assign:function(){return u},searchParamsToUrlQuery:function(){return r},urlQueryToSearchParams:function(){return o}})},2170:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{DecodeError:function(){return h},MiddlewareNotFoundError:function(){return m},MissingStaticPage:function(){return b},NormalizeError:function(){return g},PageNotFoundError:function(){return y},SP:function(){return d},ST:function(){return p},WEB_VITALS:function(){return r},execOnce:function(){return n},getDisplayName:function(){return i},getLocationOrigin:function(){return l},getURL:function(){return a},isAbsoluteUrl:function(){return u},isResSent:function(){return s},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return c},stringifyError:function(){return j}});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function n(e){let t,r=!1;return function(){for(var n=arguments.length,o=Array(n),u=0;u<n;u++)o[u]=arguments[u];return r||(r=!0,t=e(...o)),t}}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,u=e=>o.test(e);function l(){let{protocol:e,hostname:t,port:r}=window.location;return e+"//"+t+(r?":"+r:"")}function a(){let{href:e}=window.location,t=l();return e.substring(t.length)}function i(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function s(e){return e.finished||e.headersSent}function c(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function f(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&s(r))return n;if(!n)throw Error('"'+i(e)+'.getInitialProps()" should resolve to an object. But found "'+n+'" instead.');return n}let d="undefined"!=typeof performance,p=d&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class h extends Error{}class g extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}}class b extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}}class m extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},9809:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(5155),o=r(8173),u=r.n(o);function l(){return(0,n.jsxs)("main",{className:"flex flex-col items-center justify-center min-h-screen bg-white text-black p-8",children:[(0,n.jsx)("h1",{className:"text-3xl font-bold mb-4",children:"Welcome to My Homepage"}),(0,n.jsx)("p",{className:"text-center max-w-md mb-6 leading-relaxed",children:"This is a custom landing page. Use it to introduce yourself, your product, or any other content you’d like your visitors to see first."}),(0,n.jsxs)("div",{className:"flex gap-4",children:[(0,n.jsx)(u(),{href:"/calendar",className:"py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400",children:"Go to Calendar"}),(0,n.jsx)(u(),{href:"https://nextjs.org/docs",target:"_blank",className:"py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400",children:"Next.js Docs"})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(4562)),_N_E=e.O()}]);