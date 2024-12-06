"use strict";(self.webpackChunkloan_management=self.webpackChunkloan_management||[]).push([[207],{71207:function(e,t,i){i.r(t),i.d(t,{default:function(){return _}});var a=i(9950),n=i(16491),r=i(19808),s=i(93230),l=i(82053),o=i(10226),d=i(48089),c=i(35777),u=i(55035),h=i(73062),m=i(7999),x=i(57988),p=i(20660),A=i(63464),g=i(60899),j=i(25979),y=i(29277),f=i(8145),v=i(79739),C=i(28170),D=i(6493),b=i(40033),F=i(7762),k=i(43939),w=i(60666),B=i(44414);var T=e=>{const{open:t,handleClose:i,editPackagesData:a,editData:n}=e,r=localStorage.getItem("user_id"),s=w.Ik({title:w.Yj().required("Title is required"),amount:w.ai().required("amount is required"),description:w.Yj().required("Description is required"),days:w.Yj().required("Days is required")}),d={title:n.title,amount:n.amount,description:n.description,days:n.days,assigned_agent:r,createdBy:r},c=(0,k.Wx)({initialValues:d,validationSchema:s,enableReinitialize:!0,onSubmit:async e=>{const t={title:e.title,days:e.days,amount:e.amount,description:e.description,assigned_agent:e.assigned_agent,createdBy:e.createdBy};a(t),i(),c.resetForm()}});return(0,B.jsx)("div",{children:(0,B.jsxs)(A.A,{open:t,onClose:i,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[(0,B.jsxs)(b.A,{id:"scroll-dialog-title",style:{display:"flex",justifyContent:"space-between"},children:[(0,B.jsx)(l.A,{variant:"h6",children:" edit"}),(0,B.jsx)(l.A,{children:(0,B.jsx)(F.A,{onClick:i,style:{cursor:"pointer"}})})]}),(0,B.jsx)(C.A,{dividers:!0,children:(0,B.jsx)("form",{children:(0,B.jsxs)(D.A,{id:"scroll-dialog-description",tabIndex:-1,children:[(0,B.jsx)(l.A,{style:{marginBottom:"15px"},variant:"h6",children:"Basic Information"}),(0,B.jsxs)(g.Ay,{container:!0,rowSpacing:3,columnSpacing:{xs:0,sm:5,md:4},children:[(0,B.jsx)(g.Ay,{item:!0,xs:12,sm:4,md:4,children:(0,B.jsxs)(j.A,{fullWidth:!0,children:[(0,B.jsx)(y.A,{children:"Title"}),(0,B.jsx)(f.A,{id:"title",name:"title",size:"small",fullWidth:!0,value:c.values.title,onChange:c.handleChange,error:c.touched.amount&&Boolean(c.errors.title),helperText:c.touched.title&&c.errors.title})]})}),(0,B.jsxs)(g.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,B.jsx)(y.A,{children:"Amount"}),(0,B.jsx)(f.A,{id:"amount",name:"amount",type:"number",size:"small",fullWidth:!0,value:c.values.amount,onChange:c.handleChange,error:c.touched.amount&&Boolean(c.errors.amount),helperText:c.touched.amount&&c.errors.amount})]}),(0,B.jsxs)(g.Ay,{item:!0,xs:12,sm:12,md:12,children:[(0,B.jsx)(y.A,{children:"Description"}),(0,B.jsx)(f.A,{id:"description",name:"description",label:"",size:"small",multiline:!0,rows:5,fullWidth:!0,value:c.values.description,onChange:c.handleChange,error:c.touched.description&&Boolean(c.errors.description),helperText:c.touched.description&&c.errors.description})]})]}),(0,B.jsx)(g.Ay,{container:!0,rowSpacing:3,columnSpacing:{xs:0,sm:5,md:4},children:(0,B.jsx)(g.Ay,{item:!0,xs:12,sm:12,md:12,children:(0,B.jsxs)(j.A,{fullWidth:!0,children:[(0,B.jsx)(y.A,{children:"Days"}),(0,B.jsx)(f.A,{id:"days",name:"days",size:"small",fullWidth:!0,value:c.values.days,onChange:c.handleChange,error:c.touched.days&&Boolean(c.errors.days),helperText:c.touched.days&&c.errors.days})]})})})]})})}),(0,B.jsxs)(v.A,{children:[(0,B.jsx)(o.A,{onClick:c.handleSubmit,variant:"contained",color:"primary",type:"submit",children:"save"}),(0,B.jsx)(o.A,{onClick:()=>{c.resetForm(),i()},variant:"outlined",color:"error",children:"cancel"})]})]})})},S=i(48875),z=i(27232);var M=e=>{const{open:t,handleClose:i,addPackagesData:a}=e,n=localStorage.getItem("user_id"),r=w.Ik({title:w.Yj().required("Title is required"),amount:w.ai().required("amount is required"),description:w.Yj().required("Description is required")}),s={title:"",amount:"",description:"",days:"",assigned_agent:n,createdBy:n},d=(0,k.Wx)({initialValues:s,validationSchema:r,onSubmit:async e=>{const t={title:e.title,days:e.days,amount:e.amount,description:e.description,assigned_agent:e.assigned_agent,createdBy:e.createdBy};a(t),i(),z.oR.success("Packages Add successfully"),d.resetForm()}});return(0,B.jsx)("div",{children:(0,B.jsxs)(A.A,{open:t,onClose:i,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[(0,B.jsxs)(b.A,{id:"scroll-dialog-title",style:{display:"flex",justifyContent:"space-between"},children:[(0,B.jsx)(l.A,{variant:"h6",children:"NewPackages"}),(0,B.jsx)(l.A,{children:(0,B.jsx)(F.A,{onClick:i,style:{cursor:"pointer"}})})]}),(0,B.jsx)(C.A,{dividers:!0,children:(0,B.jsx)("form",{children:(0,B.jsxs)(D.A,{id:"scroll-dialog-description",tabIndex:-1,children:[(0,B.jsx)(l.A,{style:{marginBottom:"15px"},variant:"h6",children:"Basic Information"}),(0,B.jsxs)(g.Ay,{container:!0,rowSpacing:3,columnSpacing:{xs:0,sm:5,md:4},children:[(0,B.jsx)(g.Ay,{item:!0,xs:12,md:4,children:(0,B.jsxs)(j.A,{fullWidth:!0,children:[(0,B.jsx)(y.A,{children:"Title"}),(0,B.jsx)(f.A,{id:"title",name:"title",size:"small",fullWidth:!0,value:d.values.title,onChange:d.handleChange,error:d.touched.amount&&Boolean(d.errors.title),helperText:d.touched.title&&d.errors.title})]})}),(0,B.jsxs)(g.Ay,{item:!0,xs:12,md:4,children:[(0,B.jsx)(y.A,{children:"Amount"}),(0,B.jsx)(f.A,{id:"amount",name:"amount",type:"number",size:"small",fullWidth:!0,value:d.values.amount,onChange:d.handleChange,error:d.touched.amount&&Boolean(d.errors.amount),helperText:d.touched.amount&&d.errors.amount})]}),(0,B.jsx)(g.Ay,{item:!0,xs:12,md:4,children:(0,B.jsxs)(j.A,{fullWidth:!0,children:[(0,B.jsx)(y.A,{children:"Days"}),(0,B.jsx)(f.A,{id:"days",name:"days",type:"number",size:"small",fullWidth:!0,value:d.values.days,onChange:d.handleChange,error:d.touched.days&&Boolean(d.errors.days),helperText:d.touched.days&&d.errors.days})]})}),(0,B.jsxs)(g.Ay,{item:!0,xs:12,sm:12,md:12,children:[(0,B.jsx)(y.A,{children:"Description"}),(0,B.jsx)(f.A,{id:"description",name:"description",label:"",size:"small",multiline:!0,rows:5,fullWidth:!0,value:d.values.description,onChange:d.handleChange,error:d.touched.description&&Boolean(d.errors.description),helperText:d.touched.description&&d.errors.description})]})]})]})})}),(0,B.jsxs)(v.A,{children:[(0,B.jsx)(o.A,{onClick:d.handleSubmit,variant:"contained",color:"primary",type:"submit",children:"save"}),(0,B.jsx)(o.A,{onClick:()=>{d.resetForm(),i()},variant:"outlined",color:"error",children:"cancel"})]})]})})},I=i(27702);var _=()=>{const e=localStorage.getItem("userRole"),t=localStorage.getItem("user_id"),[i,A]=(0,a.useState)(!1),[g,j]=(0,a.useState)([]),[y,f]=(0,a.useState)(!1),[v,C]=(0,a.useState)(!1),[D,b]=(0,a.useState)([]),[F,k]=(0,a.useState)(""),w=()=>f(!1),z=()=>C(!1),_=async()=>{const i=await(0,I.x4)("admin"===e?"packages/list":`packages/list/?createdBy=${t}`);var a;i&&200===i.status&&j(null===i||void 0===i||null===(a=i.data)||void 0===a?void 0:a.packagesAllData)},q=async e=>{const t=await(0,I.Gx)(`packages/delete/${e}`,e);t&&200===t.status&&_(),w()},N=async e=>{const t=e,i=await(0,I.X4)(`packages/edit/${null===D||void 0===D?void 0:D._id}`,t);i&&200===i.status&&_()};(0,a.useEffect)((()=>{_()}),[]);const W=[{field:"_id",headerName:"SNo",flex:.5,cellClassName:"name-column--cell name-column--cell--capitalize",valueGetter:e=>e.api.getRowIndexRelativeToVisibleRows(e.row._id)+1},{field:"title",headerName:"Title",flex:1,cellClassName:"name-column--cell name-column--cell--capitalize"},{field:"description",headerName:"Description",flex:1},{field:"amount",headerName:"Amount",flex:1},{field:"days",headerName:"Days",flex:1,cellClassName:"name-column--cell--capitalize"},{field:"action",headerName:"Action",flex:1,renderCell:e=>{const t=async e=>{b(e),C(!0)},i=async e=>{k(e._id),f(!0)};return(0,B.jsx)(B.Fragment,{children:(0,B.jsxs)(n.A,{sx:{display:"flex",alignItems:"center"},children:[(0,B.jsx)(T,{open:v,editData:D,handleClose:z,editPackagesData:N}),(0,B.jsx)(n.A,{onClick:()=>t(null===e||void 0===e?void 0:e.row),children:(0,B.jsx)(m.A,{sx:{color:"#6F2DA8"}})}),(0,B.jsx)(p.A,{openDelete:y,deleteId:F,handleCloseDelete:w,deleteData:q}),(0,B.jsx)(n.A,{onClick:()=>i(null===e||void 0===e?void 0:e.row),children:(0,B.jsx)(x.A,{sx:{color:"red"}})})]})})}}];return(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(M,{open:i,handleClose:()=>A(!1),addPackagesData:async i=>{const a=await(0,I.d_)("admin"===e?"packages/add":`packages/add/?createdBy=${t}`,i);a&&201===a.status&&_()}}),(0,B.jsxs)(r.A,{children:[(0,B.jsxs)(s.A,{direction:"row",alignItems:"center",mb:5,justifyContent:"space-between",children:[(0,B.jsx)(l.A,{variant:"h4",children:" PackagesList"}),(0,B.jsx)(s.A,{direction:"row",alignItems:"center",justifyContent:"flex-end",spacing:2,children:(0,B.jsx)(o.A,{variant:"contained",startIcon:(0,B.jsx)(S.A,{icon:"eva:plus-fill"}),onClick:()=>A(!0),children:"NewPackages"})})]}),(0,B.jsx)(c.A,{children:(0,B.jsx)(n.A,{width:"100%",children:(0,B.jsx)(d.A,{style:{height:"600px",paddingTop:"15px"},children:(0,B.jsx)(u.zh,{rows:null!==g&&void 0!==g?g:[],columns:W,getRowId:e=>e._id,slots:{toolbar:h.O},slotProps:{toolbar:{showQuickFilter:!0}}})})})})]})]})}},20660:function(e,t,i){i.d(t,{A:function(){return A}});i(9950);var a=i(10226),n=i(59254),r=i(63464),s=i(40033),l=i(28170),o=i(79739),d=i(25333),c=i(96319),u=i(82053),h=i(93230),m=i(44414);const x=(0,n.Ay)(r.A)((e=>{let{theme:t}=e;return{"& .MuiDialogContent-root":{padding:t.spacing(2)},"& .MuiDialogActions-root":{padding:t.spacing(1)}}}));function p(e){const{children:t,onClose:i,...a}=e;return(0,m.jsxs)(s.A,{sx:{m:0,p:2},...a,children:[t,i?(0,m.jsx)(d.A,{"aria-label":"close",onClick:i,sx:{position:"absolute",right:8,top:8,color:e=>e.palette.grey[500]},children:(0,m.jsx)(c.A,{})}):null]})}function A(e){const{openDelete:t,handleCloseDelete:i,deleteData:n,deleteId:r}=e;return(0,m.jsx)("div",{children:(0,m.jsxs)(x,{"aria-labelledby":"customized-dialog-title",open:t,children:[(0,m.jsx)(p,{id:"customized-dialog-title",onClose:i,children:"Delete"}),(0,m.jsx)(l.A,{dividers:!0,children:(0,m.jsx)(u.A,{gutterBottom:!0,p:3,children:"Are you sure you want to delete this item?"})}),(0,m.jsx)(o.A,{children:(0,m.jsxs)(h.A,{direction:"row",spacing:2,children:[(0,m.jsx)(a.A,{variant:"contained",color:"error",onClick:()=>{n(r)},children:"Yes"}),(0,m.jsx)(a.A,{variant:"contained",onClick:i,children:"No"})]})})]})})}},35777:function(e,t,i){var a=i(59254),n=i(13048);const r=(0,a.Ay)("div")({"& .MuiDataGrid-root":{border:"none"},"& .MuiDataGrid-cell":{borderBottom:"none"},"& .name-column--cell":{color:n.A.primary.main,cursor:"pointer"},"& .name-column--cell--capitalize":{textTransform:"capitalize"},"& .name-column--cell:hover":{textDecoration:"underline"},"& .MuiDataGrid-columnHeaders":{backgroundColor:n.A.grey[200],borderBottom:"none",outline:"none !important",borderRadius:"0px"},"& .MuiDataGrid-virtualScroller":{scrollbarWidth:"1px"},"& .MuiDataGrid-toolbarContainer .MuiButton-text":{textTransform:"capitalize",fontSize:"15px"},".MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus,MuiDataGrid-columnHeaderCheckbox:focus":{outline:"none !important"},".css-1jiby6q-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-1jiby6q-MuiDataGrid-root .MuiDataGrid-cell:focus-within":{outline:"none"}});t.A=r},13048:function(e,t,i){var a=i(97497);const n={0:"#FFFFFF",100:"#F9FAFB",200:"#F4F6F8",300:"#DFE3E8",400:"#C4CDD5",500:"#919EAB",600:"#637381",700:"#454F5B",800:"#212B36",900:"#161C24"},r={common:{black:"#000",white:"#fff"},primary:{lighter:"#D1E9FC",light:"#76B0F1",main:"#2065D1",dark:"#103996",darker:"#061B64",contrastText:"#fff"},secondary:{lighter:"#D6E4FF",light:"#84A9FF",main:"#3366FF",dark:"#1939B7",darker:"#091A7A",contrastText:"#fff"},info:{lighter:"#D0F2FF",light:"#74CAFF",main:"#1890FF",dark:"#0C53B7",darker:"#04297A",contrastText:"#fff"},success:{lighter:"#E9FCD4",light:"#AAF27F",main:"#54D62C",dark:"#229A16",darker:"#08660D",contrastText:n[800]},warning:{lighter:"#FFF7CD",light:"#FFE16A",main:"#FFC107",dark:"#B78103",darker:"#7A4F01",contrastText:n[800]},error:{lighter:"#FFE7D9",light:"#FFA48D",main:"#FF4842",dark:"#B72136",darker:"#7A0C2E",contrastText:"#fff"},grey:n,divider:(0,a.X4)(n[500],.24),text:{primary:n[800],secondary:n[600],disabled:n[500]},background:{paper:"#fff",default:n[100],neutral:n[200]},action:{active:n[600],hover:(0,a.X4)(n[500],.08),selected:(0,a.X4)(n[500],.16),disabled:(0,a.X4)(n[500],.8),disabledBackground:(0,a.X4)(n[500],.24),focus:(0,a.X4)(n[500],.24),hoverOpacity:.08,disabledOpacity:.48}};t.A=r},48875:function(e,t,i){i.d(t,{A:function(){return c}});var a=i(11942),n=i.n(a),r=i(9950),s=i(14650),l=i(16491),o=i(44414);const d=(0,r.forwardRef)(((e,t)=>{let{icon:i,width:a=20,sx:n,...r}=e;return(0,o.jsx)(l.A,{ref:t,component:s.In,icon:i,sx:{width:a,height:a,...n},...r})}));d.propTypes={sx:n().object,width:n().oneOfType([n().number,n().string]),icon:n().oneOfType([n().element,n().string])};var c=d},7762:function(e,t,i){var a=i(24994);t.A=void 0;var n=a(i(79526)),r=i(44414);t.A=(0,n.default)((0,r.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear")},96319:function(e,t,i){var a=i(24994);t.A=void 0;var n=a(i(79526)),r=i(44414);t.A=(0,n.default)((0,r.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Close")},57988:function(e,t,i){var a=i(24994);t.A=void 0;var n=a(i(79526)),r=i(44414);t.A=(0,n.default)((0,r.jsx)("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"}),"Delete")},7999:function(e,t,i){var a=i(24994);t.A=void 0;var n=a(i(79526)),r=i(44414);t.A=(0,n.default)((0,r.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"}),"Edit")},6493:function(e,t,i){i.d(t,{A:function(){return j}});var a=i(98587),n=i(58168),r=i(9950),s=i(72004),l=i(88465),o=i(59254),d=i(19608),c=i(18463),u=i(82053),h=i(1763),m=i(423);function x(e){return(0,m.Ay)("MuiDialogContentText",e)}(0,h.A)("MuiDialogContentText",["root"]);var p=i(44414);const A=["children","className"],g=(0,o.Ay)(u.A,{shouldForwardProp:e=>(0,d.A)(e)||"classes"===e,name:"MuiDialogContentText",slot:"Root",overridesResolver:(e,t)=>t.root})({});var j=r.forwardRef((function(e,t){const i=(0,c.b)({props:e,name:"MuiDialogContentText"}),{className:r}=i,o=(0,a.A)(i,A),d=(e=>{const{classes:t}=e,i=(0,l.A)({root:["root"]},x,t);return(0,n.A)({},t,i)})(o);return(0,p.jsx)(g,(0,n.A)({component:"p",variant:"body1",color:"text.secondary",ref:t,ownerState:o,className:(0,s.A)(d.root,r)},i,{classes:d}))}))}}]);