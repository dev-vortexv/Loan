"use strict";(self.webpackChunkloan_management=self.webpackChunkloan_management||[]).push([[774],{23266:function(e,t,a){a.d(t,{A:function(){return O}});var n=a(98587),r=a(58168),i=a(9950),o=a(72004),s=a(88465),l=a(99269),d=a(59254),c=a(19608),u=a(18463),p=a(13372),h=a(8079),m=a(79044),g=a(31506),f=a(40777),v=a(92455),b=a(88543),y=a(1763),A=a(423);function $(e){return(0,A.Ay)("MuiMenuItem",e)}var w=(0,y.A)("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),x=a(44414);const C=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],k=(0,d.Ay)(h.A,{shouldForwardProp:e=>(0,c.A)(e)||"classes"===e,name:"MuiMenuItem",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,a.dense&&t.dense,a.divider&&t.divider,!a.disableGutters&&t.gutters]}})((e=>{let{theme:t,ownerState:a}=e;return(0,r.A)({},t.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:`1px solid ${(t.vars||t).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(t.vars||t).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${w.selected}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:(0,l.X4)(t.palette.primary.main,t.palette.action.selectedOpacity),[`&.${w.focusVisible}`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.focusOpacity}))`:(0,l.X4)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.focusOpacity)}},[`&.${w.selected}:hover`]:{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / calc(${t.vars.palette.action.selectedOpacity} + ${t.vars.palette.action.hoverOpacity}))`:(0,l.X4)(t.palette.primary.main,t.palette.action.selectedOpacity+t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:t.vars?`rgba(${t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.selectedOpacity})`:(0,l.X4)(t.palette.primary.main,t.palette.action.selectedOpacity)}},[`&.${w.focusVisible}`]:{backgroundColor:(t.vars||t).palette.action.focus},[`&.${w.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity},[`& + .${f.A.root}`]:{marginTop:t.spacing(1),marginBottom:t.spacing(1)},[`& + .${f.A.inset}`]:{marginLeft:52},[`& .${b.A.root}`]:{marginTop:0,marginBottom:0},[`& .${b.A.inset}`]:{paddingLeft:36},[`& .${v.A.root}`]:{minWidth:36}},!a.dense&&{[t.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&(0,r.A)({minHeight:32,paddingTop:4,paddingBottom:4},t.typography.body2,{[`& .${v.A.root} svg`]:{fontSize:"1.25rem"}}))}));var O=i.forwardRef((function(e,t){const a=(0,u.b)({props:e,name:"MuiMenuItem"}),{autoFocus:l=!1,component:d="li",dense:c=!1,divider:h=!1,disableGutters:f=!1,focusVisibleClassName:v,role:b="menuitem",tabIndex:y,className:A}=a,w=(0,n.A)(a,C),O=i.useContext(p.A),S=i.useMemo((()=>({dense:c||O.dense||!1,disableGutters:f})),[O.dense,c,f]),M=i.useRef(null);(0,m.A)((()=>{l&&M.current&&M.current.focus()}),[l]);const R=(0,r.A)({},a,{dense:S.dense,divider:h,disableGutters:f}),I=(e=>{const{disabled:t,dense:a,divider:n,disableGutters:i,selected:o,classes:l}=e,d={root:["root",a&&"dense",t&&"disabled",!i&&"gutters",n&&"divider",o&&"selected"]},c=(0,s.A)(d,$,l);return(0,r.A)({},l,c)})(a),X=(0,g.A)(M,t);let N;return a.disabled||(N=void 0!==y?y:-1),(0,x.jsx)(p.A.Provider,{value:S,children:(0,x.jsx)(k,(0,r.A)({ref:X,role:b,tabIndex:N,component:d,focusVisibleClassName:(0,o.A)(I.focusVisible,v),className:(0,o.A)(I.root,A)},w,{ownerState:R,classes:I}))})}))},82917:function(e,t,a){a.d(t,{A:function(){return S}});var n=a(98587),r=a(58168),i=a(9950),o=a(72004),s=a(88283),l=a(88465);function d(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function c(e){return parseFloat(e)}var u=a(97497),p=a(59254),h=a(18463),m=a(1763),g=a(423);function f(e){return(0,g.Ay)("MuiSkeleton",e)}(0,m.A)("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var v=a(44414);const b=["animation","className","component","height","style","variant","width"];let y,A,$,w,x=e=>e;const C=(0,s.i7)(y||(y=x`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),k=(0,s.i7)(A||(A=x`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),O=(0,p.Ay)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:a}=e;return[t.root,t[a.variant],!1!==a.animation&&t[a.animation],a.hasChildren&&t.withChildren,a.hasChildren&&!a.width&&t.fitContent,a.hasChildren&&!a.height&&t.heightAuto]}})((e=>{let{theme:t,ownerState:a}=e;const n=d(t.shape.borderRadius)||"px",i=c(t.shape.borderRadius);return(0,r.A)({display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:(0,u.X4)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===a.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${i}${n}/${Math.round(i/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}},"circular"===a.variant&&{borderRadius:"50%"},"rounded"===a.variant&&{borderRadius:(t.vars||t).shape.borderRadius},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})}),(e=>{let{ownerState:t}=e;return"pulse"===t.animation&&(0,s.AH)($||($=x`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),C)}),(e=>{let{ownerState:t,theme:a}=e;return"wave"===t.animation&&(0,s.AH)(w||(w=x`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),k,(a.vars||a).palette.action.hover)}));var S=i.forwardRef((function(e,t){const a=(0,h.b)({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:s,component:d="span",height:c,style:u,variant:p="text",width:m}=a,g=(0,n.A)(a,b),y=(0,r.A)({},a,{animation:i,component:d,variant:p,hasChildren:Boolean(g.children)}),A=(e=>{const{classes:t,variant:a,animation:n,hasChildren:r,width:i,height:o}=e,s={root:["root",a,n,r&&"withChildren",r&&!i&&"fitContent",r&&!o&&"heightAuto"]};return(0,l.A)(s,f,t)})(y);return(0,v.jsx)(O,(0,r.A)({as:d,ref:t,className:(0,o.A)(A.root,s),ownerState:y},g,{style:(0,r.A)({width:m,height:c},u)}))}))},97497:function(e,t,a){a.d(t,{X4:function(){return l},a:function(){return c},e$:function(){return d}});var n=a(78099),r=a(26747);function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return(0,r.A)(e,t,a)}function o(e){if(e.type)return e;if("#"===e.charAt(0))return o(function(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let a=e.match(t);return a&&1===a[0].length&&(a=a.map((e=>e+e))),a?`rgb${4===a.length?"a":""}(${a.map(((e,t)=>t<3?parseInt(e,16):Math.round(parseInt(e,16)/255*1e3)/1e3)).join(", ")})`:""}(e));const t=e.indexOf("("),a=e.substring(0,t);if(-1===["rgb","rgba","hsl","hsla","color"].indexOf(a))throw new Error((0,n.A)(9,e));let r,i=e.substring(t+1,e.length-1);if("color"===a){if(i=i.split(" "),r=i.shift(),4===i.length&&"/"===i[3].charAt(0)&&(i[3]=i[3].slice(1)),-1===["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(r))throw new Error((0,n.A)(10,r))}else i=i.split(",");return i=i.map((e=>parseFloat(e))),{type:a,values:i,colorSpace:r}}function s(e){const{type:t,colorSpace:a}=e;let{values:n}=e;return-1!==t.indexOf("rgb")?n=n.map(((e,t)=>t<3?parseInt(e,10):e)):-1!==t.indexOf("hsl")&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),n=-1!==t.indexOf("color")?`${a} ${n.join(" ")}`:`${n.join(", ")}`,`${t}(${n})`}function l(e,t){return e=o(e),t=i(t),"rgb"!==e.type&&"hsl"!==e.type||(e.type+="a"),"color"===e.type?e.values[3]=`/${t}`:e.values[3]=t,s(e)}function d(e,t){if(e=o(e),t=i(t),-1!==e.type.indexOf("hsl"))e.values[2]*=1-t;else if(-1!==e.type.indexOf("rgb")||-1!==e.type.indexOf("color"))for(let a=0;a<3;a+=1)e.values[a]*=1-t;return s(e)}function c(e,t){if(e=o(e),t=i(t),-1!==e.type.indexOf("hsl"))e.values[2]+=(100-e.values[2])*t;else if(-1!==e.type.indexOf("rgb"))for(let a=0;a<3;a+=1)e.values[a]+=(255-e.values[a])*t;else if(-1!==e.type.indexOf("color"))for(let a=0;a<3;a+=1)e.values[a]+=(1-e.values[a])*t;return s(e)}}}]);