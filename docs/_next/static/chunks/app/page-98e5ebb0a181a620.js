(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1661:()=>{},2182:(e,a,l)=>{"use strict";l.r(a),l.d(a,{default:()=>r});let t="github-page"===l(3849).env.APP_ENV;function s(){return t?"/react-vue-animate-course":""}function r(e){let{src:a}=e;return"".concat(s()).concat(a)}s()},2793:e=>{e.exports={nav:"nav_nav__XMwaT",logo:"nav_logo__w8_2x",menu:"nav_menu__6aa2H","nav-button-container":"nav_nav-button-container__nkvsO"}},2825:(e,a,l)=>{"use strict";l.r(a),l.d(a,{default:()=>H});var t=l(8081),s=l(2149),r=l(6293);function n(e){let{className:a}=e;return(0,t.jsx)("svg",{className:a,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 155.46 93.74",fill:"currentColor",width:"1em",height:"1em",children:(0,t.jsx)("path",{d:"M0,31.18h31.18v62.56H0V31.18Zm155.46,5.67v56.89h-31.18V45.36c0-7.83-6.34-14.18-14.17-14.18h-17.01c.29,1.85,.44,3.74,.44,5.67v56.89h-31.18V45.36c0-7.83-6.35-14.18-14.17-14.18H31.18V0h25.51c13.15,0,24.69,6.89,31.21,17.25,2.62,4.15,4.43,8.86,5.2,13.92V0h25.51c20.35,0,36.85,16.5,36.85,36.85Z"})})}var c=l(2793),i=l.n(c),o=l(8864);let d=e=>Object.prototype.toString.call(e).slice(8,-1);function u(){for(var e=arguments.length,a=Array(e),l=0;l<e;l++)a[l]=arguments[l];let{length:t}=a,s=[];for(let e=0;e<t;e++){let l=a[e];if(l){if("String"===d(l))s.push(l);else"Array"===d(l)?s=s.concat(l):"Object"===d(l)&&Object.keys(l).forEach(e=>{l[e]&&s.push(e)})}}return[...new Set(s)].join(" ")}let v={overflow:"hidden",display:"flex",flexDirection:"column"},m={display:"flex"},x=e=>{let{words:a,textOneClassName:l="",textTwoClassName:n="",isHover:c=!1,stagger:i,duration:d=.6}=e,u=(0,s.useRef)(null),[m,x]=(0,s.useState)(!1),w=(0,s.useCallback)(()=>{var e,a;u.current.style.height="".concat(null===(a=u.current)||void 0===a?void 0:null===(e=a.children[0])||void 0===e?void 0:e.offsetHeight,"px")},[]);return(0,s.useEffect)(()=>(window.addEventListener("resize",w),()=>{window.removeEventListener("resize",w)}),[]),(0,s.useEffect)(()=>{w(),x(!0)},[a]),(0,o.L)(()=>{c?(r.Ay.to(".line2",{yPercent:-100,duration:d,stagger:i,ease:"power3.inOut"}),r.Ay.to(".line1",{yPercent:-100,duration:d,stagger:i,ease:"power3.inOut"})):(r.Ay.to(".line1",{yPercent:0,duration:d,stagger:i,ease:"power3.inOut"}),r.Ay.to(".line2",{yPercent:0,duration:d,stagger:i,ease:"power3.inOut"}))},{scope:u,dependencies:[c]}),(0,t.jsxs)("div",{ref:u,style:v,children:[(0,t.jsx)(h,{words:a,className:l,lineIndex:1}),m&&(0,t.jsx)(h,{words:a,className:n,lineIndex:2})]})};function h(e){let{words:a,className:l,lineIndex:s}=e;return(0,t.jsx)("div",{style:m,children:a.map((e,a)=>(0,t.jsx)("span",{className:u(l,"line".concat(s)),children:e},a))})}function w(e){let{word:a,stagger:l}=e,[r,n]=(0,s.useState)(!1),c=(0,s.useMemo)(()=>a.split("").map(e=>" "===e?"\xa0":e),[a]);return(0,t.jsx)("div",{className:i()["nav-button-container"],onMouseEnter:()=>{n(!0)},onMouseLeave:()=>{n(!1)},children:(0,t.jsx)(x,{words:c,isHover:r,stagger:l})})}function j(){return(0,t.jsxs)("div",{className:i().nav,children:[(0,t.jsx)(n,{className:i().logo}),(0,t.jsx)("div",{className:i().menu,children:(0,t.jsx)(w,{word:"React Gsap",stagger:.01})})]})}let N=[10,-10,0,0,-4,-4,-1],p=e=>{var a,l;let{items:t,container:s,animationGalleryARef:n,animationGalleryBRef:c,animationGalleryCRef:i}=e;null===(a=c.current)||void 0===a||a.kill(),null===(l=i.current)||void 0===l||l.kill(),n.current=r.Ay.timeline(),s.current&&t.length>0&&(t.forEach(e=>{r.Ay.set(e,{x:"-50%"})}),n.current.to(t,{top:0,rotation:-5,left:0,ease:"power3.inOut",duration:.6}),n.current.to(t,{top:0,ease:"power1.out",duration:.1}),n.current.to(t,{xPercent:e=>(e-2.5)*90,yPercent:e=>N[e],rotation:e=>(e-3)*5,duration:.6,scale:1,ease:"power3.inOut"}),n.current.to(t,{y:"-10%",repeat:-1,yoyo:!0,duration:2,stagger:{each:.1},ease:"power2.inOut"},"-=0.4"))},f=e=>{var a,l;let{items:t,container:s,animationGalleryARef:n,animationGalleryBRef:c,animationGalleryCRef:i}=e;null===(a=n.current)||void 0===a||a.kill(),null===(l=i.current)||void 0===l||l.kill(),c.current=r.Ay.timeline(),s.current&&t.length>0&&(c.current.to(t,{xPercent:-80,rotation:0,yPercent:10,left:0,top:0,scale:1,duration:.6,ease:"power3.inOut"}),c.current.to(t,{xPercent:e=>"".concat(100*e-90),yPercent:e=>"".concat(20*e+10),scale:1.3,duration:.4,ease:"power3.inOut"}))},y=["motion.webp","gsap.webp","three.webp","blender.webp","vue.webp","react.webp"],b="item",g=e=>{var a,l;let{items:t,container:s,animationGalleryARef:n,animationGalleryBRef:c,animationGalleryCRef:i}=e;if(null===(a=n.current)||void 0===a||a.kill(),null===(l=c.current)||void 0===l||l.kill(),i.current=r.Ay.timeline(),s.current&&t.length>0){i.current.to(t,{xPercent:0,rotation:-15,yPercent:-50,scale:1,duration:.4,ease:"power3.inOut"});let e=2*Math.PI/6;i.current.to(t,{yPercent:a=>200*Math.sin(a*e)-50,xPercent:a=>200*Math.cos(a*e),scale:.4,duration:.6,rotation:20})}};var C=l(5186);function A(e){let{state:a,animationGalleryARef:l,animationGalleryBRef:r,animationGalleryCRef:n}=e,c=(0,s.useRef)(null);return(0,s.useEffect)(()=>{"A"===a&&p({container:c,items:document.querySelectorAll(".".concat(b)),animationGalleryARef:l,animationGalleryBRef:r,animationGalleryCRef:n}),"B"===a&&f({container:c,items:document.querySelectorAll(".".concat(b)),animationGalleryARef:l,animationGalleryBRef:r,animationGalleryCRef:n}),"C"===a&&g({container:c,items:document.querySelectorAll(".".concat(b)),animationGalleryARef:l,animationGalleryBRef:r,animationGalleryCRef:n})},[l,r,n,a]),(0,t.jsx)("section",{className:"gallery-container",ref:c,children:(0,t.jsx)("div",{className:"gallery",children:y.map(e=>(0,t.jsx)("div",{className:"".concat(b),children:(0,t.jsx)(C.default,{src:"".concat("/animation-home","/").concat(e),alt:e,fill:!0})},e))})})}l(6375),l(4306);let k=(0,s.forwardRef)(()=>{let e=(0,s.useRef)(null);return(0,o.L)(()=>{r.Ay.to(".style-a .word",{duration:.6,y:"0%",stagger:.04,ease:"power3.out"})},{scope:e}),(0,t.jsxs)("div",{className:"style-a",ref:e,children:[(0,t.jsxs)("span",{className:u("font-light","text-a"),children:[(0,t.jsx)("div",{className:"word",children:"乡"}),(0,t.jsx)("div",{className:"word",children:"亲"}),(0,t.jsx)("div",{className:"word",children:"们，"}),(0,t.jsx)("div",{className:"word",children:"前"}),(0,t.jsx)("div",{className:"word",children:"端"}),(0,t.jsx)("div",{className:"word",children:"动"}),(0,t.jsx)("div",{className:"word",children:"效"})]}),(0,t.jsxs)("span",{className:u("font-bold","text-a"),children:[(0,t.jsx)("div",{className:"word",children:"一"}),(0,t.jsx)("div",{className:"word",children:"起"}),(0,t.jsx)("div",{className:"word",children:"玩"}),(0,t.jsx)("div",{className:"word",children:"转"}),(0,t.jsx)("div",{className:"word",children:"！"})]})]})});l(8416);let S=(0,s.forwardRef)(()=>{let e=(0,s.useRef)(null);return(0,o.L)(()=>{r.os.to(".style-b .word",{duration:.6,y:"0%",stagger:.02,ease:"power3.out"})},{scope:e}),(0,t.jsxs)("div",{className:"style-b",ref:e,children:[(0,t.jsxs)("span",{className:u("font-light","text-b"),children:[(0,t.jsx)("div",{className:"word",children:"我"}),(0,t.jsx)("div",{className:"word",children:"是"}),(0,t.jsx)("div",{className:"word",children:"孟"}),(0,t.jsx)("div",{className:"word",children:"祥"}),(0,t.jsx)("div",{className:"word",children:"同"}),(0,t.jsx)("div",{className:"word",children:"学"}),(0,t.jsx)("div",{className:"word",children:"，"})]}),(0,t.jsxs)("span",{className:u("font-light","text-b"),children:[(0,t.jsx)("div",{className:"word",children:"热"}),(0,t.jsx)("div",{className:"word",children:"爱"}),(0,t.jsx)("div",{className:"word",children:"前"}),(0,t.jsx)("div",{className:"word",children:"端"}),(0,t.jsx)("div",{className:"word",children:"，"})]}),(0,t.jsxs)("span",{className:u("font-bold","text-b"),children:[(0,t.jsx)("div",{className:"word",children:"为"}),(0,t.jsx)("div",{className:"word",children:"你"}),(0,t.jsx)("div",{className:"word",children:"呈"}),(0,t.jsx)("div",{className:"word",children:"现"}),(0,t.jsx)("div",{className:"word",children:"高"}),(0,t.jsx)("div",{className:"word",children:"级"}),(0,t.jsx)("div",{className:"word",children:"动"}),(0,t.jsx)("div",{className:"word",children:"效"}),(0,t.jsx)("div",{className:"word",children:"课"}),(0,t.jsx)("div",{className:"word",children:"程"}),(0,t.jsx)("div",{className:"word",children:"！"})]})]})});l(9078);let _=(0,s.forwardRef)(()=>{let e=(0,s.useRef)(null);return(0,o.L)(()=>{r.os.to(".style-c .word",{duration:.4,y:"0%",stagger:.04,ease:"power3.out"})},{scope:e}),(0,t.jsxs)("div",{className:"style-c",ref:e,children:[(0,t.jsxs)("span",{className:u("font-light","text-c"),children:[(0,t.jsx)("div",{className:"word",children:"让"}),(0,t.jsx)("div",{className:"word",children:"你"}),(0,t.jsx)("div",{className:"word",children:"的"}),(0,t.jsx)("div",{className:"word",children:"博"}),(0,t.jsx)("div",{className:"word",children:"客"}),(0,t.jsx)("div",{className:"word",children:"亮"}),(0,t.jsx)("div",{className:"word",children:"眼"})]}),(0,t.jsxs)("span",{className:u("font-bold","text-c"),children:[(0,t.jsx)("div",{className:"word",children:"让"}),(0,t.jsx)("div",{className:"word",children:"简"}),(0,t.jsx)("div",{className:"word",children:"历"}),(0,t.jsx)("div",{className:"word",children:"更"}),(0,t.jsx)("div",{className:"word",children:"有"}),(0,t.jsx)("div",{className:"word",children:"竞"}),(0,t.jsx)("div",{className:"word",children:"争"}),(0,t.jsx)("div",{className:"word",children:"力"})]})]})});function R(e){let{state:a}=e;return(0,t.jsxs)("div",{className:"title",children:["A"===a&&(0,t.jsx)(k,{}),"B"===a&&(0,t.jsx)(S,{}),"C"===a&&(0,t.jsx)(_,{})]})}l(5953);let P={leaveTitleA:e=>{let{onCompleteCallback:a,onStartCallback:l}=e;r.Ay.to(".style-a .word",{duration:.4,y:"100%",ease:"power3.in",onComplete:()=>{null==a||a()},onStart:()=>{null==l||l()}})},leaveTitleB:e=>{let{onCompleteCallback:a,onStartCallback:l}=e;r.Ay.to(".style-b .word",{duration:.4,y:"100%",ease:"power2.in",onComplete:()=>{null==a||a()},onStart:()=>{null==l||l()}})},leaveTitleC:e=>{let{onCompleteCallback:a,onStartCallback:l}=e;r.Ay.to(".style-b .word",{duration:.4,y:"100%",ease:"power2.in",onComplete:()=>{null==a||a()},onStart:()=>{null==l||l()}})}},B="indicator",O="indicator-item",E={leaveIndicatorA:()=>{r.Ay.to(".indicator-a .".concat(B),{duration:.4,y:"100%",ease:"power3.in"})},leaveIndicatorB:()=>{r.Ay.to(".indicator-b .".concat(B),{duration:.4,y:"100%",ease:"power3.in"})},leaveIndicatorC:()=>{r.Ay.to(".indicator-c .".concat(B),{duration:.4,y:"100%",ease:"power3.in"})}};function I(e){let{setState:a,state:l}=e;return(0,t.jsxs)("div",{className:B,children:[(0,t.jsx)("div",{className:u(O,"A"===l?"active":null),onClick:()=>{"B"===l&&P.leaveTitleB({onCompleteCallback:()=>a("A"),onStartCallback:()=>E.leaveIndicatorB()}),"C"===l&&P.leaveTitleC({onCompleteCallback:()=>a("A"),onStartCallback:()=>E.leaveIndicatorC()})},children:"横向展开"}),(0,t.jsx)("div",{className:u(O,"B"===l?"active":null),onClick:()=>{var e,t;"A"===l&&(null===(e=P.leaveTitleA)||void 0===e||e.call(P,{onCompleteCallback:()=>a("B"),onStartCallback:()=>E.leaveIndicatorA()})),"C"===l&&(null===(t=P.leaveTitleC)||void 0===t||t.call(P,{onCompleteCallback:()=>a("B"),onStartCallback:()=>E.leaveIndicatorC()}))},children:"斜向展开"}),(0,t.jsx)("div",{className:u(O,"C"===l?"active":null),onClick:()=>{var e,t;"A"===l&&(null===(e=P.leaveTitleA)||void 0===e||e.call(P,{onCompleteCallback:()=>a("C"),onStartCallback:()=>E.leaveIndicatorA()})),"B"===l&&(null===(t=P.leaveTitleB)||void 0===t||t.call(P,{onCompleteCallback:()=>a("C"),onStartCallback:()=>E.leaveIndicatorB()}))},children:"圆形展开"})]})}l(5357),l(9407);let L=e=>{let{setState:a,state:l}=e,n=(0,s.useRef)(null);return(0,o.L)(()=>{r.os.to(".indicator-a .".concat(B),{duration:.6,y:"0%",stagger:.04,delay:1,ease:"power3.out"})},{scope:n}),(0,t.jsx)("div",{className:"indicator-a",ref:n,children:(0,t.jsx)(I,{setState:a,state:l})})};l(1661);let T=e=>{let{setState:a,state:l}=e,n=(0,s.useRef)(null);return(0,o.L)(()=>{r.os.to(".indicator-b .".concat(B),{duration:.6,y:"0%",x:"0%",stagger:.04,delay:.5,ease:"power3.out"})},{scope:n}),(0,t.jsx)("div",{className:"indicator-b",ref:n,children:(0,t.jsx)(I,{setState:a,state:l})})};l(7359);let M=e=>{let{setState:a,state:l}=e,n=(0,s.useRef)(null);return(0,o.L)(()=>{r.os.to(".indicator-c .".concat(B),{duration:.6,y:"0%",stagger:.04,delay:.6,ease:"power3.out"})},{scope:n}),(0,t.jsx)("div",{className:"indicator-c",ref:n,children:(0,t.jsx)(I,{setState:a,state:l})})};function V(e){let{setState:a,state:l}=e;return(0,t.jsxs)("div",{className:"indicator-wrapper",children:["A"===l&&(0,t.jsx)(L,{setState:a,state:l}),"B"===l&&(0,t.jsx)(T,{setState:a,state:l}),"C"===l&&(0,t.jsx)(M,{setState:a,state:l})]})}function H(){let e=(0,s.useRef)(null),[a,l]=(0,s.useState)("A"),n=(0,s.useRef)(r.Ay.timeline()),c=(0,s.useRef)(r.Ay.timeline()),i=(0,s.useRef)(r.Ay.timeline());return(0,t.jsxs)("div",{className:"page",ref:e,children:[(0,t.jsx)(j,{}),(0,t.jsx)(R,{state:a}),(0,t.jsx)(A,{state:a,animationGalleryARef:n,animationGalleryBRef:c,animationGalleryCRef:i}),(0,t.jsx)(V,{setState:l,state:a})]})}l(8507)},4306:()=>{},5357:()=>{},5953:()=>{},6375:()=>{},7359:()=>{},8214:(e,a,l)=>{Promise.resolve().then(l.bind(l,2825))},8416:()=>{},8507:()=>{},9078:()=>{},9407:()=>{}},e=>{var a=a=>e(e.s=a);e.O(0,[625,267,467,497,954,358],()=>a(8214)),_N_E=e.O()}]);