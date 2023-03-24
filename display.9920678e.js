import{F as Q,C as uu,c as eu}from"./vant-vendor.95c16213.js";import{u as H,_ as lu,b as Y}from"./assets/index.ed86cc75.js";import{k as Z,c as y,E as $,C as R,j as E,m as nu,u as e,r as s,e as au,H as u,d as ou,I as l,a1 as tu,x as su,N as C,W as Eu}from"./vendor.36e6497c.js";import{l as Fu}from"./lunar-vendor.cb1bd71e.js";const iu={class:"LiuyaoGua flex justify-between"},cu=Z({__name:"LiuyaoGua",props:{guaxiang:{default:()=>[6,7,8,9,8,7]}},setup(_){const g=_,{zhouyi:D}=H(),{yijing:a}=D,c=y(()=>g.guaxiang.map(t=>t===6?9:t===9?6:t)),A=y(()=>a.find(t=>t.\u5366\u8C61.toString()===c.toString())||a[0]),o=y(()=>A.value.\u4E94\u884C);return(t,f)=>{const p=lu;return $(),R("div",iu,[E(p,nu(t.$attrs,{guaxiang:_.guaxiang,"has-liushen":"","has-najia":"",size:20}),null,16,["guaxiang"]),E(p,{size:20,guaxiang:e(c),"bagong-wuxing":e(o),"has-najia":"","has-dongyao":!1},null,8,["guaxiang","bagong-wuxing"])])}}}),pu={class:"Display","py-4":"","text-left":""},du={"px-4":""},mu={"flex-center":""},Au=u("span",{"whitespace-nowrap":""},"\u5360\u95EE\uFF1A",-1),ru={"ml-4":""},Cu={"px-4":"","mt-4":""},_u={"flex-justify":"","text-size-sm":"","whitespace-nowrap":""},gu=u("div",null,[u("p",null,"1.\u53D6\u7528\u795E"),u("p",null,"2.\u65AD\u5409\u51F6"),u("p",null,"3.\u5B9A\u5E94\u671F"),u("p",null,"4.\u770B\u7EC6\u8282")],-1),Du={flex:"","text-size-sm":""},fu={"flex-1":""},vu={"flex-1":""},xu=Z({__name:"display",setup(_){const{zhouyi:g}=H(),D=Eu(),{query:a}=D,c=Fu.Lunar.fromDate(new Date),{tiangan:A,dizhi:o,wuxing:t}=g,f=s("1"),p=a.\u5360\u95EE||"\u4ECA\u65E5\u5929\u6C14\u5982\u4F55\uFF1F",q=(a.\u5366\u8C61||"678987").split("").map(Number),v=a.\u6708\u5EFA||c.getMonthZhi(),r=a.\u65E5\u8FB0||c.getDayInGanZhi(),J=a.\u65EC\u7A7A||c.getDayXunKong(),x=v,d=r.slice(-1),B=r.slice(0,1),K=o[d].\u9A7F\u9A6C,O=o[d].\u6843\u82B1,P=A[B].\u65E5\u7984,T=A[B].\u8D35\u4EBA,b=s(""),w=s(""),z=s(""),j=s(""),N=s(""),U=s(""),k=s(""),h=s(a.\u7528\u795E||""),G=s(a.\u5409\u51F6||""),I=s(a.\u5E94\u671F||""),L=s(a.\u7EC6\u8282||""),M=s(a.\u542F\u793A||""),S=m=>{if(!m)return;const n=m.slice(-1),i=m.slice(-2,-1);h.value=m,b.value=t[n].\u5143\u795E,w.value=t[n].\u5FCC\u795E,z.value=t[n].\u751F+t[n].\u65FA+t[n].\u5893+t[n].\u7EDD,j.value=o[i].\u516D\u51B2,N.value=o[i].\u516D\u5408,U.value=o[i].\u4E09\u5408,k.value=o[i].\u4E09\u5211};return au(()=>{S(a.\u7528\u795E)}),(m,n)=>{const i=Q,W=cu,V=uu,X=eu;return $(),R("div",pu,[u("header",du,[u("p",mu,[Au,E(i,{modelValue:e(p),"onUpdate:modelValue":n[0]||(n[0]=F=>ou(p)?p.value=F:null),class:"!p-0",placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D"},null,8,["modelValue"])]),u("p",null," \u65F6\u95F4\uFF1A"+l(e(tu)(new Date).format("YYYY\u5E74MM\u6708DD\u65E5HH\u65F6mm\u5206")),1),u("p",null,[su(" \u5E72\u652F\uFF1A"+l(e(v))+"\u6708 "+l(e(r))+"\u65E5 ",1),u("span",ru,"(\u65EC\u7A7A\uFF1A"+l(e(J))+")",1)]),u("p",null," \u795E\u715E\uFF1A\u9A7F\u9A6C-"+l(e(K))+"\xA0\u6843\u82B1-"+l(e(O))+"\xA0\u65E5\u7984-"+l(e(P))+"\xA0\u8D35\u4EBA-"+l(e(T)),1)]),u("section",Cu,[E(W,{gan:e(B),yongshen:h.value,guaxiang:e(q),onOnChange:S},null,8,["gan","yongshen","guaxiang"])]),E(X,{modelValue:f.value,"onUpdate:modelValue":n[5]||(n[5]=F=>f.value=F),accordion:"",border:!1,"mt-4":""},{default:C(()=>[E(V,{title:"\u65E5\u6708",name:"1",border:!1},{default:C(()=>[u("section",_u,[gu,u("div",null,[u("p",null,"\u6708\u5EFA\uFF1A"+l(e(v)),1),u("p",null,"\u516D\u51B2\uFF1A"+l(e(o)[e(x)].\u516D\u51B2),1),u("p",null,"\u516D\u5408\uFF1A"+l(e(o)[e(x)].\u516D\u5408),1),u("p",null,"\u4E09\u5211\uFF1A"+l(e(o)[e(x)].\u4E09\u5211),1)]),u("div",null,[u("p",null,"\u65E5\u8FB0\uFF1A"+l(e(r).slice(-1)),1),u("p",null,"\u516D\u51B2\uFF1A"+l(e(o)[e(d)].\u516D\u51B2),1),u("p",null,"\u516D\u5408\uFF1A"+l(e(o)[e(d)].\u516D\u5408),1),u("p",null,"\u4E09\u5211\uFF1A"+l(e(o)[e(d)].\u4E09\u5211),1)])])]),_:1}),E(V,{title:"\u7528\u795E",name:"2",border:!1},{default:C(()=>[u("section",Du,[u("div",fu,[u("p",null,"\u7528\u795E\uFF1A"+l(h.value),1),u("p",null,"\u5143\u795E\uFF1A"+l(b.value),1),u("p",null,"\u5FCC\u795E\uFF1A"+l(w.value),1),u("p",null,"\u516D\u51B2\uFF1A"+l(j.value),1)]),u("div",vu,[u("p",null,"\u4E09\u5408\uFF1A"+l(U.value),1),u("p",null,"\u4E09\u5211\uFF1A"+l(k.value),1),u("p",null,"\u5893\u5E93\uFF1A"+l(z.value),1),u("p",null,"\u516D\u5408\uFF1A"+l(N.value),1)])])]),_:1}),E(V,{title:"\u6279\u6CE8",name:"3",border:!1},{default:C(()=>[E(i,{modelValue:G.value,"onUpdate:modelValue":n[1]||(n[1]=F=>G.value=F),label:"\u5409\u51F6:","label-width":"32px"},null,8,["modelValue"]),E(i,{modelValue:I.value,"onUpdate:modelValue":n[2]||(n[2]=F=>I.value=F),label:"\u5E94\u671F:"},null,8,["modelValue"]),E(i,{modelValue:L.value,"onUpdate:modelValue":n[3]||(n[3]=F=>L.value=F),label:"\u7EC6\u8282:"},null,8,["modelValue"]),E(i,{modelValue:M.value,"onUpdate:modelValue":n[4]||(n[4]=F=>M.value=F),label:"\u542F\u793A:"},null,8,["modelValue"])]),_:1})]),_:1},8,["modelValue"])])}}});typeof Y=="function"&&Y(xu);export{xu as default};