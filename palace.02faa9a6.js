import{f as _,g as x}from"./vant-vendor.48ec7026.js";import{k as C,D as E,r as F,b as V,H as a,E as l,L as n,u as r,j as k,G as c,F as v,I as B,Q as g,K as h,x as N}from"./vendor.5e9f7d32.js";import{u as A,b as m}from"./assets/index.300b3c66.js";const D={class:"Palace",flex:"","flex-col":""},b=["src"],y={"flex-1":"","overflow-auto":"","text-left":""},I=N(" \u4EE3\u7801\u662F\u5199\u51FA\u6765\u7ED9\u4EBA\u770B\u7684\uFF0C\u9644\u5E26\u80FD\u5728\u673A\u5668\u4E0A\u8FD0\u884C\u3002 "),w=C({__name:"palace",setup(H){const{title:i}=E(A()),p=g(),e=JSON.parse(p.query.image),o=F("");return V(()=>{i.value=e.name}),(L,s)=>{const d=_,f=x;return a(),l("div",D,[n("img",{src:r(e).path,alt:""},null,8,b),n("section",y,[k(f,{modelValue:o.value,"onUpdate:modelValue":s[0]||(s[0]=t=>o.value=t),accordion:""},{default:c(()=>[(a(!0),l(v,null,B(r(e).piles,(t,u)=>(a(),h(d,{key:u,title:`${u+1}.${t.name}`},{default:c(()=>[I]),_:2},1032,["title"]))),128))]),_:1},8,["modelValue"])])])}}});typeof m=="function"&&m(w);export{w as default};
