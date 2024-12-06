"use strict";(self.webpackChunkloan_management=self.webpackChunkloan_management||[]).push([[239],{35777:function(e,r,a){var t=a(59254),n=a(13048);const o=(0,t.Ay)("div")({"& .MuiDataGrid-root":{border:"none"},"& .MuiDataGrid-cell":{borderBottom:"none"},"& .name-column--cell":{color:n.A.primary.main,cursor:"pointer"},"& .name-column--cell--capitalize":{textTransform:"capitalize"},"& .name-column--cell:hover":{textDecoration:"underline"},"& .MuiDataGrid-columnHeaders":{backgroundColor:n.A.grey[200],borderBottom:"none",outline:"none !important",borderRadius:"0px"},"& .MuiDataGrid-virtualScroller":{scrollbarWidth:"1px"},"& .MuiDataGrid-toolbarContainer .MuiButton-text":{textTransform:"capitalize",fontSize:"15px"},".MuiDataGrid-cell:focus,.MuiDataGrid-columnHeader:focus,MuiDataGrid-columnHeaderCheckbox:focus":{outline:"none !important"},".css-1jiby6q-MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within, .css-1jiby6q-MuiDataGrid-root .MuiDataGrid-cell:focus-within":{outline:"none"}});r.A=o},13048:function(e,r,a){var t=a(97497);const n={0:"#FFFFFF",100:"#F9FAFB",200:"#F4F6F8",300:"#DFE3E8",400:"#C4CDD5",500:"#919EAB",600:"#637381",700:"#454F5B",800:"#212B36",900:"#161C24"},o={common:{black:"#000",white:"#fff"},primary:{lighter:"#D1E9FC",light:"#76B0F1",main:"#2065D1",dark:"#103996",darker:"#061B64",contrastText:"#fff"},secondary:{lighter:"#D6E4FF",light:"#84A9FF",main:"#3366FF",dark:"#1939B7",darker:"#091A7A",contrastText:"#fff"},info:{lighter:"#D0F2FF",light:"#74CAFF",main:"#1890FF",dark:"#0C53B7",darker:"#04297A",contrastText:"#fff"},success:{lighter:"#E9FCD4",light:"#AAF27F",main:"#54D62C",dark:"#229A16",darker:"#08660D",contrastText:n[800]},warning:{lighter:"#FFF7CD",light:"#FFE16A",main:"#FFC107",dark:"#B78103",darker:"#7A4F01",contrastText:n[800]},error:{lighter:"#FFE7D9",light:"#FFA48D",main:"#FF4842",dark:"#B72136",darker:"#7A0C2E",contrastText:"#fff"},grey:n,divider:(0,t.X4)(n[500],.24),text:{primary:n[800],secondary:n[600],disabled:n[500]},background:{paper:"#fff",default:n[100],neutral:n[200]},action:{active:n[600],hover:(0,t.X4)(n[500],.08),selected:(0,t.X4)(n[500],.16),disabled:(0,t.X4)(n[500],.8),disabledBackground:(0,t.X4)(n[500],.24),focus:(0,t.X4)(n[500],.24),hoverOpacity:.08,disabledOpacity:.48}};r.A=o},22239:function(e,r,a){a.r(r),a.d(r,{default:function(){return q}});var t=a(9950),n=a(16491),o=a(25333),l=a(19808),i=a(93230),s=a(82053),d=a(48089),u=a(35777),c=a(55035),m=a(73062),h=a(99532),A=a(10226),x=a(63464),p=a(79739),y=a(28170),f=a(6493),v=a(40033),j=a(60899),b=a(8145),g=a(7762),C=a(43939),F=a(60666),B=a(29277),D=a(25979),w=a(70006),T=a(23266),R=a(24516),k=a(27232),M=a(44414);var z=e=>{const{open:r,handleClose:a,loanData:t,editRepaymentData:n,EditRepayments:o,setEditRepaymentData:l}=e,i=localStorage.getItem("user_id"),d=F.Ik({borrowers:F.Yj().required("Borrowers is required"),addAmount:F.Yj().required(" Add Amount is required"),currentBalance:F.Yj().required("Current Balance is required"),paymentMethod:F.Yj().required("payment Method is required"),transactionReference:F.Yj().required("Transaction is required")}),u={borrowers:n?n.borrowers:"",addAmount:"",loanDuration:"",currentBalance:n?n.repaymentAmount:"",durationPeriod:n?n.durationPeriod:"",loanType:n?n.loanType:"",interestRate:n?n.interestRate:"",paymentMethod:n?n.paymentMethod:"",transactionReference:n?n.TransactionReference:"",repaymentAmount:"",createdBy:i},c=(0,C.Wx)({initialValues:u,validationSchema:d,enableReinitialize:!0,onSubmit:async(e,r)=>{let{resetForm:t}=r;const n={...e};o(n),a(),l(""),k.oR.success("Repayment Add successfully"),t()}});return(0,M.jsx)("div",{children:(0,M.jsxs)(x.A,{open:r,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[(0,M.jsxs)(v.A,{id:"scroll-dialog-title",style:{display:"flex",justifyContent:"space-between"},children:[(0,M.jsx)(s.A,{variant:"h6",children:" Add Repayments"}),(0,M.jsx)(s.A,{children:(0,M.jsx)(g.A,{onClick:a,style:{cursor:"pointer"}})})]}),(0,M.jsx)(y.A,{dividers:!0,children:(0,M.jsx)("form",{children:(0,M.jsx)(f.A,{id:"scroll-dialog-description",tabIndex:-1,children:(0,M.jsxs)(j.Ay,{container:!0,rowSpacing:3,columnSpacing:{xs:0,sm:5,md:4},children:[(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Borrowers Name"}),(0,M.jsxs)(D.A,{fullWidth:!0,children:[(0,M.jsx)(w.A,{labelId:"demo-simple-select-label",id:"",name:"borrowers",label:"",size:"small",value:c.values.borrowers||null,onChange:e=>{const r=e.target.value;c.setFieldValue("borrowers",r);const a=t.find((e=>e.borrowers===r));a&&c.setFieldValue("currentBalance",null===a||void 0===a?void 0:a.repaymentAmount)},error:c.touched.borrowers&&Boolean(c.errors.borrowers),children:null===t||void 0===t?void 0:t.map((e=>(0,M.jsx)(T.A,{value:`${null===e||void 0===e?void 0:e.borrowers}`,children:`${null===e||void 0===e?void 0:e.borrowers} `},null===e||void 0===e?void 0:e._id)))}),(0,M.jsx)(R.A,{error:c.touched.borrowers&&Boolean(c.errors.borrowers),children:c.touched.borrowers&&c.errors.borrowers})]})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,md:6,sm:6,children:[(0,M.jsx)(B.A,{children:"Loan Type"}),(0,M.jsx)(b.A,{id:"loanType",name:"loanType",size:"small",fullWidth:!0,value:c.values.loanType,onChange:c.handleChange,disabled:Boolean(c.values.loanType),error:c.touched.loanType&&Boolean(c.errors.loanType),helperText:c.touched.loanType&&c.errors.loanType})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Add Amount"}),(0,M.jsx)(b.A,{id:"addAmount",name:"addAmount",type:"number",size:"small",fullWidth:!0,value:c.values.addAmount,onChange:c.handleChange,error:c.touched.addAmount&&Boolean(c.errors.addAmount),helperText:c.touched.addAmount&&c.errors.addAmount})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Duration Period"}),(0,M.jsx)(b.A,{id:"durationPeriod",name:"durationPeriod",size:"small",fullWidth:!0,value:c.values.durationPeriod,onChange:c.handleChange,error:c.touched.durationPeriod&&Boolean(c.errors.durationPeriod),helperText:c.touched.durationPeriod&&c.errors.durationPeriod})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Loan Duration"}),(0,M.jsx)(b.A,{id:"loanDuration",name:"loanDuration",size:"small",type:"number",fullWidth:!0,value:c.values.loanDuration,onChange:e=>{const r=e.target.value;c.setFieldValue("loanDuration",r);const a=c.values.addAmount,t=c.values.interestRate,n=c.values.durationPeriod,o=c.values.currentBalance,l=((e,r,a,t)=>{let n=0;switch(t){case"daily":n=r/365;break;case"weekly":n=r/52;break;case"monthly":n=r/12;break;case"yearly":n=r;break;default:return 0}return e*n*a/100})(a,t,r,n);c.setFieldValue("interestAmount",parseInt(l)),c.setFieldValue("repaymentAmount",o+a+parseInt(l))},error:c.touched.loanDuration&&Boolean(c.errors.loanDuration),helperText:c.touched.loanDuration&&c.errors.loanDuration})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Current Balance"}),(0,M.jsx)(b.A,{id:"currentBalance",name:"currentBalance",type:"number",size:"small",fullWidth:!0,value:c.values.currentBalance,disabled:Boolean(c.values.currentBalance),onChange:c.handleChange,error:c.touched.currentBalance&&Boolean(c.errors.currentBalance),helperText:c.touched.currentBalance&&c.errors.currentBalance})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Interest Rate"}),(0,M.jsx)(b.A,{id:"interestRate",name:"interestRate",type:"number",size:"small",fullWidth:!0,value:c.values.interestRate,disabled:Boolean(c.values.interestRate),onChange:c.handleChange,error:c.touched.interestRate&&Boolean(c.errors.interestRate),helperText:c.touched.interestRate&&c.errors.interestRate})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Interest Amount"}),(0,M.jsx)(b.A,{id:"interestAmount",name:"interestAmount",type:"number",size:"small",fullWidth:!0,value:c.values.interestAmount,onChange:c.handleChange,error:c.touched.interestAmount&&Boolean(c.errors.interestAmount),helperText:c.touched.interestAmount&&c.errors.interestAmount})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,md:6,sm:6,children:[(0,M.jsx)(B.A,{children:"Repayment Amount"}),(0,M.jsx)(b.A,{id:"repaymentAmount",name:"repaymentAmount",size:"small",fullWidth:!0,value:c.values.repaymentAmount,onChange:c.handleChange,error:c.touched.repaymentAmount&&Boolean(c.errors.repaymentAmount),helperText:c.touched.repaymentAmount&&c.errors.repaymentAmount})]}),(0,M.jsxs)(j.Ay,{item:!0,xs:12,sm:6,md:6,children:[(0,M.jsx)(B.A,{children:"Payment method"}),(0,M.jsxs)(D.A,{fullWidth:!0,children:[(0,M.jsxs)(w.A,{labelId:"demo-simple-select-label",id:"",name:"paymentMethod",label:"",size:"small",value:c.values.paymentMethod||null,onChange:c.handleChange,error:c.touched.paymentMethod&&Boolean(c.errors.paymentMethod),children:[(0,M.jsx)(T.A,{value:"bankTransfer",children:"Bank Transfer"}),(0,M.jsx)(T.A,{value:"mobileTransfer",children:"Mobile Money"}),(0,M.jsx)(T.A,{value:"cheque",children:"Cheque"}),(0,M.jsx)(T.A,{value:"cash",children:"Cash"})]}),(0,M.jsx)(R.A,{error:c.touched.paymentMethod&&Boolean(c.errors.paymentMethod),children:c.touched.paymentMethod&&c.errors.paymentMethod})]})]})]})})})}),(0,M.jsxs)(p.A,{children:[(0,M.jsx)(A.A,{type:"submit",variant:"contained",onClick:c.handleSubmit,style:{textTransform:"capitalize"},color:"secondary",children:"Save"}),(0,M.jsx)(A.A,{type:"reset",variant:"outlined",style:{textTransform:"capitalize"},onClick:()=>{c.resetForm(),a(),l("")},color:"error",children:"Cancel"})]})]})})},S=a(27702);var q=()=>{const e=localStorage.getItem("user_id"),[r,a]=(0,t.useState)(!1),[A,x]=(0,t.useState)([]),[p,y]=(0,t.useState)([]),[f,v]=(0,t.useState)(""),j=async()=>{const r=await(0,S.x4)(`loan/list?createdBy=${e}`);r&&200===r.status&&y(r.data.getAllResult)};(0,t.useEffect)((()=>{(async()=>{const r=await(0,S.x4)(`loan/list?createdBy=${e}`);r&&200===r.status&&x(r.data.getAllResult)})(),j()}),[]);const b=[{field:"_id",headerName:"S.No.",flex:.5,cellClassName:"name-column--cell name-column--cell--capitalize",renderCell:e=>e.api.getAllRowIds().indexOf(e.id)+1},{field:"borrowers",headerName:"Borrowers Name",flex:1,cellClassName:"name-column--cell--capitalize"},{field:"loanStatus",headerName:"Loan Status",flex:1},{field:"loanType",headerName:"loan Type",flex:1},{field:"repaymentAmount",headerName:"Total Repayments",flex:1},{field:"action",headerName:"Action",flex:1,renderCell:e=>{const r=e=>{v(null===e||void 0===e?void 0:e.row),a(!0)};return(0,M.jsx)(n.A,{children:(0,M.jsx)(o.A,{fontSize:"40px",color:"primary",onClick:()=>r(e),children:(0,M.jsx)(h.A,{})})})}}];return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(z,{open:r,handleClose:()=>a(!1),loanData:A,editRepaymentData:f,EditRepayments:async e=>{const r=await(0,S.X4)(`loan/edit/${f._id}`,e);r&&200===r.status&&j()},setEditRepaymentData:v}),(0,M.jsxs)(l.A,{children:[(0,M.jsx)(i.A,{direction:"row",alignItems:"center",mb:5,justifyContent:"space-between",children:(0,M.jsx)(s.A,{variant:"h4",children:"Repayments Lists"})}),(0,M.jsx)(u.A,{children:(0,M.jsx)(n.A,{width:"100%",children:(0,M.jsx)(d.A,{style:{height:"600px",paddingTop:"15px"},children:(0,M.jsx)(c.zh,{rows:null!==p&&void 0!==p?p:[],columns:b,getRowId:e=>e._id,slots:{toolbar:m.O},slotProps:{toolbar:{showQuickFilter:!0}}})})})})]})]})}},99532:function(e,r,a){var t=a(24994);r.A=void 0;var n=t(a(79526)),o=a(44414);r.A=(0,n.default)((0,o.jsx)("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add")},7762:function(e,r,a){var t=a(24994);r.A=void 0;var n=t(a(79526)),o=a(44414);r.A=(0,n.default)((0,o.jsx)("path",{d:"M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"}),"Clear")},6493:function(e,r,a){a.d(r,{A:function(){return f}});var t=a(98587),n=a(58168),o=a(9950),l=a(72004),i=a(88465),s=a(59254),d=a(19608),u=a(18463),c=a(82053),m=a(1763),h=a(423);function A(e){return(0,h.Ay)("MuiDialogContentText",e)}(0,m.A)("MuiDialogContentText",["root"]);var x=a(44414);const p=["children","className"],y=(0,s.Ay)(c.A,{shouldForwardProp:e=>(0,d.A)(e)||"classes"===e,name:"MuiDialogContentText",slot:"Root",overridesResolver:(e,r)=>r.root})({});var f=o.forwardRef((function(e,r){const a=(0,u.b)({props:e,name:"MuiDialogContentText"}),{className:o}=a,s=(0,t.A)(a,p),d=(e=>{const{classes:r}=e,a=(0,i.A)({root:["root"]},A,r);return(0,n.A)({},r,a)})(s);return(0,x.jsx)(y,(0,n.A)({component:"p",variant:"body1",color:"text.secondary",ref:r,ownerState:s,className:(0,l.A)(d.root,o)},a,{classes:d}))}))}}]);