"use strict";(self.webpackChunkloan_management=self.webpackChunkloan_management||[]).push([[453],{35777:function(e,t,r){var n=r(59254),o=r(13048);const a=(0,n.Ay)("div")({"& .MuiDataGrid-root":{border:"none"},"& .MuiDataGrid-cell":{borderBottom:"none"},"& .name-column--cell":{color:o.A.primary.main,cursor:"pointer"},"& .name-column--cell--capitalize":{textTransform:"capitalize"},"& .name-column--cell:hover":{textDecoration:"underline"},"& .MuiDataGrid-columnHeaders":{backgroundColor:o.A.grey[200],borderBottom:"none",outline:"none !important",borderRadius:"0px"},"& .MuiDataGrid-virtualScroller":{scrollbarWidth:"1px"},"& .MuiDataGrid-toolbarContainer .MuiButton-text":{textTransform:"capitalize",fontSize:"15px"},".MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus,MuiDataGrid-columnHeaderCheckbox:focus":{outline:"none !important"},".css-1jiby6q-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-1jiby6q-MuiDataGrid-root .MuiDataGrid-cell:focus-within":{outline:"none"}});t.A=a},13048:function(e,t,r){var n=r(97497);const o={0:"#FFFFFF",100:"#F9FAFB",200:"#F4F6F8",300:"#DFE3E8",400:"#C4CDD5",500:"#919EAB",600:"#637381",700:"#454F5B",800:"#212B36",900:"#161C24"},a={common:{black:"#000",white:"#fff"},primary:{lighter:"#D1E9FC",light:"#76B0F1",main:"#2065D1",dark:"#103996",darker:"#061B64",contrastText:"#fff"},secondary:{lighter:"#D6E4FF",light:"#84A9FF",main:"#3366FF",dark:"#1939B7",darker:"#091A7A",contrastText:"#fff"},info:{lighter:"#D0F2FF",light:"#74CAFF",main:"#1890FF",dark:"#0C53B7",darker:"#04297A",contrastText:"#fff"},success:{lighter:"#E9FCD4",light:"#AAF27F",main:"#54D62C",dark:"#229A16",darker:"#08660D",contrastText:o[800]},warning:{lighter:"#FFF7CD",light:"#FFE16A",main:"#FFC107",dark:"#B78103",darker:"#7A4F01",contrastText:o[800]},error:{lighter:"#FFE7D9",light:"#FFA48D",main:"#FF4842",dark:"#B72136",darker:"#7A0C2E",contrastText:"#fff"},grey:o,divider:(0,n.X4)(o[500],.24),text:{primary:o[800],secondary:o[600],disabled:o[500]},background:{paper:"#fff",default:o[100],neutral:o[200]},action:{active:o[600],hover:(0,n.X4)(o[500],.08),selected:(0,n.X4)(o[500],.16),disabled:(0,n.X4)(o[500],.8),disabledBackground:(0,n.X4)(o[500],.24),focus:(0,n.X4)(o[500],.24),hoverOpacity:.08,disabledOpacity:.48}};t.A=a},65453:function(e,t,r){r.r(t),r.d(t,{default:function(){return de}});var n=r(9950),o=r(82053),a=r(10226),i=r(86817),l=r(23266),s=r(19808),c=r(93230),d=r(16491),u=r(48089),p=r(98587),m=r(58168),h=r(88465),g=r(59063),f=r(71824),v=r(92529),A=r(24701);var x=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const{autoHideDuration:t=null,disableWindowBlurListener:r=!1,onClose:o,open:a,resumeHideDuration:i}=e,l=(0,f.A)();n.useEffect((()=>{if(a)return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)};function e(e){e.defaultPrevented||"Escape"!==e.key&&"Esc"!==e.key||null==o||o(e,"escapeKeyDown")}}),[a,o]);const s=(0,v.A)(((e,t)=>{null==o||o(e,t)})),c=(0,v.A)((e=>{o&&null!=e&&l.start(e,(()=>{s(null,"timeout")}))}));n.useEffect((()=>(a&&c(t),l.clear)),[a,t,c,l]);const d=l.clear,u=n.useCallback((()=>{null!=t&&c(null!=i?i:.5*t)}),[t,i,c]),p=e=>t=>{const r=e.onFocus;null==r||r(t),d()},h=e=>t=>{const r=e.onMouseEnter;null==r||r(t),d()},g=e=>t=>{const r=e.onMouseLeave;null==r||r(t),u()};return n.useEffect((()=>{if(!r&&a)return window.addEventListener("focus",u),window.addEventListener("blur",d),()=>{window.removeEventListener("focus",u),window.removeEventListener("blur",d)}}),[r,a,u,d]),{getRootProps:function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const r=(0,m.A)({},(0,A.A)(e),(0,A.A)(t));return(0,m.A)({role:"presentation"},t,r,{onBlur:(n=r,e=>{const t=n.onBlur;null==t||t(e),u()}),onFocus:p(r),onMouseEnter:h(r),onMouseLeave:g(r)});var n},onClickAway:e=>{null==o||o(e,"clickaway")}}},y=r(39325),C=r(59254),w=r(14857),b=r(18463),k=r(61676),S=r(40165),F=r(72004),M=r(99269),D=r(2235),j=r(1763),E=r(423);function L(e){return(0,E.Ay)("MuiSnackbarContent",e)}(0,j.A)("MuiSnackbarContent",["root","message","action"]);var z=r(44414);const B=["action","className","message","role"],O=(0,C.Ay)(D.A,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(e,t)=>t.root})((e=>{let{theme:t}=e;const r="light"===t.palette.mode?.8:.98,n=(0,M.tL)(t.palette.background.default,r);return(0,m.A)({},t.typography.body2,{color:t.vars?t.vars.palette.SnackbarContent.color:t.palette.getContrastText(n),backgroundColor:t.vars?t.vars.palette.SnackbarContent.bg:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(t.vars||t).shape.borderRadius,flexGrow:1,[t.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})})),N=(0,C.Ay)("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),R=(0,C.Ay)("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8});var T=n.forwardRef((function(e,t){const r=(0,b.b)({props:e,name:"MuiSnackbarContent"}),{action:n,className:o,message:a,role:i="alert"}=r,l=(0,p.A)(r,B),s=r,c=(e=>{const{classes:t}=e;return(0,h.A)({root:["root"],action:["action"],message:["message"]},L,t)})(s);return(0,z.jsxs)(O,(0,m.A)({role:i,square:!0,elevation:6,className:(0,F.A)(c.root,o),ownerState:s,ref:t},l,{children:[(0,z.jsx)(N,{className:c.message,ownerState:s,children:a}),n?(0,z.jsx)(R,{className:c.action,ownerState:s,children:n}):null]}))}));function $(e){return(0,E.Ay)("MuiSnackbar",e)}(0,j.A)("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);const P=["onEnter","onExited"],I=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],H=(0,C.Ay)("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[`anchorOrigin${(0,k.A)(r.anchorOrigin.vertical)}${(0,k.A)(r.anchorOrigin.horizontal)}`]]}})((e=>{let{theme:t,ownerState:r}=e;return(0,m.A)({zIndex:(t.vars||t).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},"top"===r.anchorOrigin.vertical?{top:8}:{bottom:8},"left"===r.anchorOrigin.horizontal&&{justifyContent:"flex-start"},"right"===r.anchorOrigin.horizontal&&{justifyContent:"flex-end"},{[t.breakpoints.up("sm")]:(0,m.A)({},"top"===r.anchorOrigin.vertical?{top:24}:{bottom:24},"center"===r.anchorOrigin.horizontal&&{left:"50%",right:"auto",transform:"translateX(-50%)"},"left"===r.anchorOrigin.horizontal&&{left:24,right:"auto"},"right"===r.anchorOrigin.horizontal&&{right:24,left:"auto"})})}));var G=n.forwardRef((function(e,t){const r=(0,b.b)({props:e,name:"MuiSnackbar"}),o=(0,w.A)(),a={enter:o.transitions.duration.enteringScreen,exit:o.transitions.duration.leavingScreen},{action:i,anchorOrigin:{vertical:l,horizontal:s}={vertical:"bottom",horizontal:"left"},autoHideDuration:c=null,children:d,className:u,ClickAwayListenerProps:f,ContentProps:v,disableWindowBlurListener:A=!1,message:C,open:F,TransitionComponent:M=S.A,transitionDuration:D=a,TransitionProps:{onEnter:j,onExited:E}={}}=r,L=(0,p.A)(r.TransitionProps,P),B=(0,p.A)(r,I),O=(0,m.A)({},r,{anchorOrigin:{vertical:l,horizontal:s},autoHideDuration:c,disableWindowBlurListener:A,TransitionComponent:M,transitionDuration:D}),N=(e=>{const{classes:t,anchorOrigin:r}=e,n={root:["root",`anchorOrigin${(0,k.A)(r.vertical)}${(0,k.A)(r.horizontal)}`]};return(0,h.A)(n,$,t)})(O),{getRootProps:R,onClickAway:G}=x((0,m.A)({},O)),[W,X]=n.useState(!0),_=(0,g.A)({elementType:H,getSlotProps:R,externalForwardedProps:B,ownerState:O,additionalProps:{ref:t},className:[N.root,u]});return!F&&W?null:(0,z.jsx)(y.x,(0,m.A)({onClickAway:G},f,{children:(0,z.jsx)(H,(0,m.A)({},_,{children:(0,z.jsx)(M,(0,m.A)({appear:!0,in:F,timeout:D,direction:"top"===l?"down":"up",onEnter:(e,t)=>{X(!1),j&&j(e,t)},onExited:e=>{X(!0),E&&E(e)}},L,{children:d||(0,z.jsx)(T,(0,m.A)({message:C,action:i},v))}))}))}))})),W=r(24763);function X(e){return(0,E.Ay)("MuiAlert",e)}var _=(0,j.A)("MuiAlert",["root","action","icon","message","filled","colorSuccess","colorInfo","colorWarning","colorError","filledSuccess","filledInfo","filledWarning","filledError","outlined","outlinedSuccess","outlinedInfo","outlinedWarning","outlinedError","standard","standardSuccess","standardInfo","standardWarning","standardError"]),q=r(25333),V=r(65471),Y=(0,V.A)((0,z.jsx)("path",{d:"M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"}),"SuccessOutlined"),Z=(0,V.A)((0,z.jsx)("path",{d:"M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"}),"ReportProblemOutlined"),K=(0,V.A)((0,z.jsx)("path",{d:"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),"ErrorOutline"),Q=(0,V.A)((0,z.jsx)("path",{d:"M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"}),"InfoOutlined"),J=r(88780);const U=["action","children","className","closeText","color","components","componentsProps","icon","iconMapping","onClose","role","severity","slotProps","slots","variant"],ee=(0,C.Ay)(D.A,{name:"MuiAlert",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.root,t[r.variant],t[`${r.variant}${(0,k.A)(r.color||r.severity)}`]]}})((e=>{let{theme:t}=e;const r="light"===t.palette.mode?M.e$:M.a,n="light"===t.palette.mode?M.a:M.e$;return(0,m.A)({},t.typography.body2,{backgroundColor:"transparent",display:"flex",padding:"6px 16px",variants:[...Object.entries(t.palette).filter((e=>{let[,t]=e;return t.main&&t.light})).map((e=>{let[o]=e;return{props:{colorSeverity:o,variant:"standard"},style:{color:t.vars?t.vars.palette.Alert[`${o}Color`]:r(t.palette[o].light,.6),backgroundColor:t.vars?t.vars.palette.Alert[`${o}StandardBg`]:n(t.palette[o].light,.9),[`& .${_.icon}`]:t.vars?{color:t.vars.palette.Alert[`${o}IconColor`]}:{color:t.palette[o].main}}}})),...Object.entries(t.palette).filter((e=>{let[,t]=e;return t.main&&t.light})).map((e=>{let[n]=e;return{props:{colorSeverity:n,variant:"outlined"},style:{color:t.vars?t.vars.palette.Alert[`${n}Color`]:r(t.palette[n].light,.6),border:`1px solid ${(t.vars||t).palette[n].light}`,[`& .${_.icon}`]:t.vars?{color:t.vars.palette.Alert[`${n}IconColor`]}:{color:t.palette[n].main}}}})),...Object.entries(t.palette).filter((e=>{let[,t]=e;return t.main&&t.dark})).map((e=>{let[r]=e;return{props:{colorSeverity:r,variant:"filled"},style:(0,m.A)({fontWeight:t.typography.fontWeightMedium},t.vars?{color:t.vars.palette.Alert[`${r}FilledColor`],backgroundColor:t.vars.palette.Alert[`${r}FilledBg`]}:{backgroundColor:"dark"===t.palette.mode?t.palette[r].dark:t.palette[r].main,color:t.palette.getContrastText(t.palette[r].main)})}}))]})})),te=(0,C.Ay)("div",{name:"MuiAlert",slot:"Icon",overridesResolver:(e,t)=>t.icon})({marginRight:12,padding:"7px 0",display:"flex",fontSize:22,opacity:.9}),re=(0,C.Ay)("div",{name:"MuiAlert",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0",minWidth:0,overflow:"auto"}),ne=(0,C.Ay)("div",{name:"MuiAlert",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"flex-start",padding:"4px 0 0 16px",marginLeft:"auto",marginRight:-8}),oe={success:(0,z.jsx)(Y,{fontSize:"inherit"}),warning:(0,z.jsx)(Z,{fontSize:"inherit"}),error:(0,z.jsx)(K,{fontSize:"inherit"}),info:(0,z.jsx)(Q,{fontSize:"inherit"})};var ae=n.forwardRef((function(e,t){const r=(0,b.b)({props:e,name:"MuiAlert"}),{action:n,children:o,className:a,closeText:i="Close",color:l,components:s={},componentsProps:c={},icon:d,iconMapping:u=oe,onClose:g,role:f="alert",severity:v="success",slotProps:A={},slots:x={},variant:y="standard"}=r,C=(0,p.A)(r,U),w=(0,m.A)({},r,{color:l,severity:v,variant:y,colorSeverity:l||v}),S=(e=>{const{variant:t,color:r,severity:n,classes:o}=e,a={root:["root",`color${(0,k.A)(r||n)}`,`${t}${(0,k.A)(r||n)}`,`${t}`],icon:["icon"],message:["message"],action:["action"]};return(0,h.A)(a,X,o)})(w),M={slots:(0,m.A)({closeButton:s.CloseButton,closeIcon:s.CloseIcon},x),slotProps:(0,m.A)({},c,A)},[D,j]=(0,W.A)("closeButton",{elementType:q.A,externalForwardedProps:M,ownerState:w}),[E,L]=(0,W.A)("closeIcon",{elementType:J.A,externalForwardedProps:M,ownerState:w});return(0,z.jsxs)(ee,(0,m.A)({role:f,elevation:0,ownerState:w,className:(0,F.A)(S.root,a),ref:t},C,{children:[!1!==d?(0,z.jsx)(te,{ownerState:w,className:S.icon,children:d||u[v]||oe[v]}):null,(0,z.jsx)(re,{ownerState:w,className:S.message,children:o}),null!=n?(0,z.jsx)(ne,{ownerState:w,className:S.action,children:n}):null,null==n&&g?(0,z.jsx)(ne,{ownerState:w,className:S.action,children:(0,z.jsx)(D,(0,m.A)({size:"small","aria-label":i,title:i,color:"inherit",onClick:g},j,{children:(0,z.jsx)(E,(0,m.A)({fontSize:"small"},L))}))}):null]}))})),ie=r(35777),le=r(55035),se=r(73062),ce=r(27702);var de=()=>{const e=localStorage.getItem("user_id"),[t,r]=(0,n.useState)([]),[p,m]=(0,n.useState)([]),[h,g]=(0,n.useState)(null),[f,v]=(0,n.useState)(null),[A,x]=(0,n.useState)({open:!1,message:"",severity:"success"}),y=async()=>{const t=await(0,ce.x4)(`loan/list/pending?createdBy=${e}`);t&&200===t.status&&r(t.data.loans)},C=(e,t,r)=>{const n=new Date(e);let o=new Date(n);switch(r){case"daily":o.setDate(o.getDate()+t);break;case"weekly":o.setDate(o.getDate()+7*t);break;case"monthly":o.setMonth(o.getMonth()+t);break;case"yearly":o.setFullYear(o.getFullYear()+t);break;default:return null}return o},w=()=>{g(null),v(null)},b=e=>{(async e=>{try{const t=await(0,ce.X4)(`loan/edit/${f}`,{loanStatus:e});if(!t||200!==t.status)throw new Error("Failed to update status");y(),r((t=>t.map((t=>t._id===f?{...t,loanStatus:e}:t)))),x({open:!0,message:"Status updated successfully!",severity:"success"})}catch(t){x({open:!0,message:"Error updating status!",severity:"error"})}})(e),w()};(0,n.useEffect)((()=>{y(),(async()=>{const t=await(0,ce.x4)(`currency/list?createdBy=${e}`);if(t&&200===t.status){const e=t.data.getAllResult.filter((e=>"active"===e.currencyStatus));m(e)}})()}),[]);const k=[{field:"_id",headerName:"S.No.",flex:.5,cellClassName:"name-column--cell name-column--cell--capitalize",renderCell:e=>e.api.getAllRowIds().indexOf(e.id)+1},{field:"loanNumber",headerName:"Loan Number",flex:1,cellClassName:"name-column--cell--capitalize"},{field:"borrowers",headerName:"Borrowers",flex:1,cellClassName:"name-column--cell--capitalize"},{field:"loanType",headerName:"Loan Type",flex:1},{field:"loanStatus",headerName:"Loan Status",flex:1},{field:"principleAmount",headerName:"Principle Amount",flex:1,renderCell:e=>{var t,r;return(0,z.jsxs)(o.A,{children:[`${null===(t=p[0])||void 0===t?void 0:t.currencySymbol} ${null===e||void 0===e||null===(r=e.row)||void 0===r?void 0:r.principleAmount}`," "]})}},{field:"dueDate",headerName:"Due Date",flex:1,renderCell:e=>{var t,r,n,a,i;return(0,z.jsx)(o.A,{children:null!==e&&void 0!==e&&null!==(t=e.row)&&void 0!==t&&t.releaseDate?null===(r=C(null===e||void 0===e||null===(n=e.row)||void 0===n?void 0:n.releaseDate,null===e||void 0===e||null===(a=e.row)||void 0===a?void 0:a.loanDuration,null===e||void 0===e||null===(i=e.row)||void 0===i?void 0:i.durationPeriod))||void 0===r?void 0:r.toDateString():"-"})}},{field:"actions",headerName:"Actions",flex:1,renderCell:e=>(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(a.A,{variant:"contained",size:"small",onClick:t=>((e,t)=>{g(e.currentTarget),v(t)})(t,e.id),children:"Actions"}),(0,z.jsxs)(i.A,{anchorEl:h,open:Boolean(h)&&f===e.id,onClose:w,children:[(0,z.jsx)(l.A,{onClick:()=>b("approved"),children:"Approved"}),(0,z.jsx)(l.A,{onClick:()=>b("denied"),children:"Denied"}),(0,z.jsx)(l.A,{onClick:()=>b("defaulted"),children:"Default"})]})]})}];return(0,z.jsx)(z.Fragment,{children:(0,z.jsxs)(s.A,{children:[(0,z.jsx)(c.A,{direction:"row",alignItems:"center",mb:5,justifyContent:"space-between",children:(0,z.jsx)(o.A,{variant:"h4",children:"Pending-Loans-Lists"})}),(0,z.jsx)(ie.A,{children:(0,z.jsx)(d.A,{width:"100%",children:(0,z.jsx)(u.A,{style:{height:"600px",paddingTop:"15px"},children:(0,z.jsx)(le.zh,{rows:null!==t&&void 0!==t?t:[],columns:k,getRowId:e=>e._id,slots:{toolbar:se.O},slotProps:{toolbar:{showQuickFilter:!0}}})})})}),(0,z.jsx)(G,{open:A.open,autoHideDuration:3e3,onClose:()=>x({...A,open:!1}),children:(0,z.jsx)(ae,{severity:A.severity,onClose:()=>x({...A,open:!1}),children:A.message})})]})})}}}]);