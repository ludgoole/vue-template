import{d as C,C as $,D as g,x as k,E as y,F as p,G as _,H as t,K as m,J as E,b as v,M as x,N as R,A as q,R as D,Q as N,S as P,U as f}from"./assets/index.6fed36b7.js";import{P as S}from"./index.120130b6.js";const V={class:"Introduction"},b={"mt-8":"","px-6":""},A=t("header",{"font-800":""}," \u4F60\u5F53\u524D\u5B66\u4E60\u7684\u662F: ",-1),H=t("div",{gap:"","my-8":""},null,-1),L={"mt-8":"","px-6":""},M=t("header",{"font-800":""}," \u8BFE\u7A0B\u76EE\u5F55 ",-1),U=["onClick"],j=C({__name:"introduction",setup(w){const h=D(),u=P(),n=N("emitter"),{title:r}=$(g()),a=["\u4EC0\u4E48\u662F\u7F16\u7801\uFF1F","\u4EC0\u4E48\u662F\u4E32\u8054\uFF1F","\u4EC0\u4E48\u662F\u5730\u70B9\u6869\uFF1F"],e=1,c=a[e],i=()=>u.push({path:"/result",query:{title:r.value}}),l=F=>u.push({path:"/course",query:{title:F}});return k(()=>{r.value=h.query.title,n.on("on-click-right",i)}),y(()=>{n.off("on-click-right",i)}),(F,d)=>{const B=S;return p(),_("div",V,[t("section",b,[A,t("p",{"mt-4":"",onClick:d[0]||(d[0]=o=>l(`\u7B2C${e+1}\u8BFE ${m(c)}`))},E(`\u7B2C${e+1}\u8BFE ${m(c)}`),1),v(B,{"mt-2":"",percentage:60,"show-pivot":!1})]),H,t("section",L,[M,t("ul",null,[(p(),_(x,null,R(a,(o,s)=>t("li",{key:o,"my-4":"",onClick:z=>l(`\u7B2C${s+1}\u8BFE ${o}`)},[t("p",{class:q({"color-pramiry":s===e})},E(`\u7B2C${s+1}\u8BFE ${o}`),3)],8,U)),64))])])])}}});typeof f=="function"&&f(j);export{j as default};
