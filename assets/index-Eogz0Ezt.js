var Rl=Object.defineProperty;var Tl=(n,e,t)=>e in n?Rl(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var rn=(n,e,t)=>Tl(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ks(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const on={},qe=[],se=()=>{},ki=()=>!1,Qt=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Xt=n=>n.startsWith("onUpdate:"),bn=Object.assign,Js=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},El=Object.prototype.hasOwnProperty,W=(n,e)=>El.call(n,e),B=Array.isArray,Ke=n=>St(n)==="[object Map]",Si=n=>St(n)==="[object Set]",kr=n=>St(n)==="[object Date]",F=n=>typeof n=="function",fn=n=>typeof n=="string",re=n=>typeof n=="symbol",X=n=>n!==null&&typeof n=="object",Ri=n=>(X(n)||F(n))&&F(n.then)&&F(n.catch),Ti=Object.prototype.toString,St=n=>Ti.call(n),Al=n=>St(n).slice(8,-1),Ei=n=>St(n)==="[object Object]",Ws=n=>fn(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ct=Ks(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ns=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Ol=/-\w/g,En=ns(n=>n.replace(Ol,e=>e.slice(1).toUpperCase())),Pl=/\B([A-Z])/g,Le=ns(n=>n.replace(Pl,"-$1").toLowerCase()),es=ns(n=>n.charAt(0).toUpperCase()+n.slice(1)),gs=ns(n=>n?`on${es(n)}`:""),te=(n,e)=>!Object.is(n,e),Mt=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Ai=(n,e,t,s=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:s,value:t})},Ys=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Sr;const ts=()=>Sr||(Sr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Zs(n){if(B(n)){const e={};for(let t=0;t<n.length;t++){const s=n[t],r=fn(s)?Ml(s):Zs(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(fn(n)||X(n))return n}const Nl=/;(?![^(]*\))/g,Cl=/:([^]+)/,Il=/\/\*[^]*?\*\//g;function Ml(n){const e={};return n.replace(Il,"").split(Nl).forEach(t=>{if(t){const s=t.split(Cl);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Bn(n){let e="";if(fn(n))e=n;else if(B(n))for(let t=0;t<n.length;t++){const s=Bn(n[t]);s&&(e+=s+" ")}else if(X(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Ll="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Dl=Ks(Ll);function Oi(n){return!!n||n===""}function Hl(n,e){if(n.length!==e.length)return!1;let t=!0;for(let s=0;t&&s<n.length;s++)t=Qs(n[s],e[s]);return t}function Qs(n,e){if(n===e)return!0;let t=kr(n),s=kr(e);if(t||s)return t&&s?n.getTime()===e.getTime():!1;if(t=re(n),s=re(e),t||s)return n===e;if(t=B(n),s=B(e),t||s)return t&&s?Hl(n,e):!1;if(t=X(n),s=X(e),t||s){if(!t||!s)return!1;const r=Object.keys(n).length,i=Object.keys(e).length;if(r!==i)return!1;for(const o in n){const l=n.hasOwnProperty(o),a=e.hasOwnProperty(o);if(l&&!a||!l&&a||!Qs(n[o],e[o]))return!1}}return String(n)===String(e)}const Pi=n=>!!(n&&n.__v_isRef===!0),vn=n=>fn(n)?n:n==null?"":B(n)||X(n)&&(n.toString===Ti||!F(n.toString))?Pi(n)?vn(n.value):JSON.stringify(n,Ni,2):String(n),Ni=(n,e)=>Pi(e)?Ni(n,e.value):Ke(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[s,r],i)=>(t[$s(s,i)+" =>"]=r,t),{})}:Si(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>$s(t))}:re(e)?$s(e):X(e)&&!B(e)&&!Ei(e)?String(e):e,$s=(n,e="")=>{var t;return re(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _n;class Bl{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&_n&&(_n.active?(this.parent=_n,this.index=(_n.scopes||(_n.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=_n;try{return _n=this,e()}finally{_n=t}}}on(){++this._on===1&&(this.prevScope=_n,_n=this)}off(){if(this._on>0&&--this._on===0){if(_n===this)_n=this.prevScope;else{let e=_n;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,s;for(t=0,s=this.effects.length;t<s;t++)this.effects[t].stop();for(this.effects.length=0,t=0,s=this.cleanups.length;t<s;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Fl(){return _n}let ln;const ms=new WeakSet;class Ci{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_n&&(_n.active?_n.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ms.has(this)&&(ms.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Mi(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Rr(this),Li(this);const e=ln,t=Fn;ln=this,Fn=!0;try{return this.fn()}finally{Di(this),ln=e,Fn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)er(e);this.deps=this.depsTail=void 0,Rr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ms.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Os(this)&&this.run()}get dirty(){return Os(this)}}let Ii=0,ut,ft;function Mi(n,e=!1){if(n.flags|=8,e){n.next=ft,ft=n;return}n.next=ut,ut=n}function Xs(){Ii++}function nr(){if(--Ii>0)return;if(ft){let e=ft;for(ft=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;ut;){let e=ut;for(ut=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){n||(n=s)}e=t}}if(n)throw n}function Li(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Di(n){let e,t=n.depsTail,s=t;for(;s;){const r=s.prevDep;s.version===-1?(s===t&&(t=r),er(s),jl(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}n.deps=e,n.depsTail=t}function Os(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Hi(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Hi(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===vt)||(n.globalVersion=vt,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Os(n))))return;n.flags|=2;const e=n.dep,t=ln,s=Fn;ln=n,Fn=!0;try{Li(n);const r=n.fn(n._value);(e.version===0||te(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{ln=t,Fn=s,Di(n),n.flags&=-3}}function er(n,e=!1){const{dep:t,prevSub:s,nextSub:r}=n;if(s&&(s.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=s,n.nextSub=void 0),t.subs===n&&(t.subs=s,!s&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)er(i,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function jl(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Fn=!0;const Bi=[];function ie(){Bi.push(Fn),Fn=!1}function oe(){const n=Bi.pop();Fn=n===void 0?!0:n}function Rr(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=ln;ln=void 0;try{e()}finally{ln=t}}}let vt=0;class Ul{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class tr{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ln||!Fn||ln===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ln)t=this.activeLink=new Ul(ln,this),ln.deps?(t.prevDep=ln.depsTail,ln.depsTail.nextDep=t,ln.depsTail=t):ln.deps=ln.depsTail=t,Fi(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const s=t.nextDep;s.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=s),t.prevDep=ln.depsTail,t.nextDep=void 0,ln.depsTail.nextDep=t,ln.depsTail=t,ln.deps===t&&(ln.deps=s)}return t}trigger(e){this.version++,vt++,this.notify(e)}notify(e){Xs();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{nr()}}}function Fi(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Fi(s)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Ps=new WeakMap,Pe=Symbol(""),Ns=Symbol(""),bt=Symbol("");function xn(n,e,t){if(Fn&&ln){let s=Ps.get(n);s||Ps.set(n,s=new Map);let r=s.get(t);r||(s.set(t,r=new tr),r.map=s,r.key=t),r.track()}}function de(n,e,t,s,r,i){const o=Ps.get(n);if(!o){vt++;return}const l=a=>{a&&a.trigger()};if(Xs(),e==="clear")o.forEach(l);else{const a=B(n),u=a&&Ws(t);if(a&&t==="length"){const c=Number(s);o.forEach((f,p)=>{(p==="length"||p===bt||!re(p)&&p>=c)&&l(f)})}else switch((t!==void 0||o.has(void 0))&&l(o.get(t)),u&&l(o.get(bt)),e){case"add":a?u&&l(o.get("length")):(l(o.get(Pe)),Ke(n)&&l(o.get(Ns)));break;case"delete":a||(l(o.get(Pe)),Ke(n)&&l(o.get(Ns)));break;case"set":Ke(n)&&l(o.get(Pe));break}}nr()}function Ue(n){const e=J(n);return e===n?e:(xn(e,"iterate",bt),Hn(n)?e:e.map(Un))}function ss(n){return xn(n=J(n),"iterate",bt),n}function ne(n,e){return ge(n)?Ye(Ne(n)?Un(e):e):Un(e)}const Vl={__proto__:null,[Symbol.iterator](){return _s(this,Symbol.iterator,n=>ne(this,n))},concat(...n){return Ue(this).concat(...n.map(e=>B(e)?Ue(e):e))},entries(){return _s(this,"entries",n=>(n[1]=ne(this,n[1]),n))},every(n,e){return ae(this,"every",n,e,void 0,arguments)},filter(n,e){return ae(this,"filter",n,e,t=>t.map(s=>ne(this,s)),arguments)},find(n,e){return ae(this,"find",n,e,t=>ne(this,t),arguments)},findIndex(n,e){return ae(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ae(this,"findLast",n,e,t=>ne(this,t),arguments)},findLastIndex(n,e){return ae(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ae(this,"forEach",n,e,void 0,arguments)},includes(...n){return vs(this,"includes",n)},indexOf(...n){return vs(this,"indexOf",n)},join(n){return Ue(this).join(n)},lastIndexOf(...n){return vs(this,"lastIndexOf",n)},map(n,e){return ae(this,"map",n,e,void 0,arguments)},pop(){return tt(this,"pop")},push(...n){return tt(this,"push",n)},reduce(n,...e){return Tr(this,"reduce",n,e)},reduceRight(n,...e){return Tr(this,"reduceRight",n,e)},shift(){return tt(this,"shift")},some(n,e){return ae(this,"some",n,e,void 0,arguments)},splice(...n){return tt(this,"splice",n)},toReversed(){return Ue(this).toReversed()},toSorted(n){return Ue(this).toSorted(n)},toSpliced(...n){return Ue(this).toSpliced(...n)},unshift(...n){return tt(this,"unshift",n)},values(){return _s(this,"values",n=>ne(this,n))}};function _s(n,e,t){const s=ss(n),r=s[e]();return s!==n&&!Hn(n)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=t(i.value)),i}),r}const zl=Array.prototype;function ae(n,e,t,s,r,i){const o=ss(n),l=o!==n&&!Hn(n),a=o[e];if(a!==zl[e]){const f=a.apply(n,i);return l?Un(f):f}let u=t;o!==n&&(l?u=function(f,p){return t.call(this,ne(n,f),p,n)}:t.length>2&&(u=function(f,p){return t.call(this,f,p,n)}));const c=a.call(o,u,s);return l&&r?r(c):c}function Tr(n,e,t,s){const r=ss(n),i=r!==n&&!Hn(n);let o=t,l=!1;r!==n&&(i?(l=s.length===0,o=function(u,c,f){return l&&(l=!1,u=ne(n,u)),t.call(this,u,ne(n,c),f,n)}):t.length>3&&(o=function(u,c,f){return t.call(this,u,c,f,n)}));const a=r[e](o,...s);return l?ne(n,a):a}function vs(n,e,t){const s=J(n);xn(s,"iterate",bt);const r=s[e](...t);return(r===-1||r===!1)&&ir(t[0])?(t[0]=J(t[0]),s[e](...t)):r}function tt(n,e,t=[]){ie(),Xs();const s=J(n)[e].apply(n,t);return nr(),oe(),s}const Gl=Ks("__proto__,__v_isRef,__isVue"),ji=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(re));function ql(n){re(n)||(n=String(n));const e=J(this);return xn(e,"has",n),e.hasOwnProperty(n)}class Ui{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,s){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return i;if(t==="__v_raw")return s===(r?i?ta:qi:i?Gi:zi).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=B(e);if(!r){let a;if(o&&(a=Vl[t]))return a;if(t==="hasOwnProperty")return ql}const l=Reflect.get(e,t,wn(e)?e:s);if((re(t)?ji.has(t):Gl(t))||(r||xn(e,"get",t),i))return l;if(wn(l)){const a=o&&Ws(t)?l:l.value;return r&&X(a)?Is(a):a}return X(l)?r?Is(l):rs(l):l}}class Vi extends Ui{constructor(e=!1){super(!1,e)}set(e,t,s,r){let i=e[t];const o=B(e)&&Ws(t);if(!this._isShallow){const u=ge(i);if(!Hn(s)&&!ge(s)&&(i=J(i),s=J(s)),!o&&wn(i)&&!wn(s))return u||(i.value=s),!0}const l=o?Number(t)<e.length:W(e,t),a=Reflect.set(e,t,s,wn(e)?e:r);return e===J(r)&&a&&(l?te(s,i)&&de(e,"set",t,s):de(e,"add",t,s)),a}deleteProperty(e,t){const s=W(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&s&&de(e,"delete",t,void 0),r}has(e,t){const s=Reflect.has(e,t);return(!re(t)||!ji.has(t))&&xn(e,"has",t),s}ownKeys(e){return xn(e,"iterate",B(e)?"length":Pe),Reflect.ownKeys(e)}}class Kl extends Ui{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Jl=new Vi,Wl=new Kl,Yl=new Vi(!0);const Cs=n=>n,Ot=n=>Reflect.getPrototypeOf(n);function Zl(n,e,t){return function(...s){const r=this.__v_raw,i=J(r),o=Ke(i),l=n==="entries"||n===Symbol.iterator&&o,a=n==="keys"&&o,u=r[n](...s),c=t?Cs:e?Ye:Un;return!e&&xn(i,"iterate",a?Ns:Pe),bn(Object.create(u),{next(){const{value:f,done:p}=u.next();return p?{value:f,done:p}:{value:l?[c(f[0]),c(f[1])]:c(f),done:p}}})}}function Pt(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Ql(n,e){const t={get(r){const i=this.__v_raw,o=J(i),l=J(r);n||(te(r,l)&&xn(o,"get",r),xn(o,"get",l));const{has:a}=Ot(o),u=e?Cs:n?Ye:Un;if(a.call(o,r))return u(i.get(r));if(a.call(o,l))return u(i.get(l));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!n&&xn(J(r),"iterate",Pe),r.size},has(r){const i=this.__v_raw,o=J(i),l=J(r);return n||(te(r,l)&&xn(o,"has",r),xn(o,"has",l)),r===l?i.has(r):i.has(r)||i.has(l)},forEach(r,i){const o=this,l=o.__v_raw,a=J(l),u=e?Cs:n?Ye:Un;return!n&&xn(a,"iterate",Pe),l.forEach((c,f)=>r.call(i,u(c),u(f),o))}};return bn(t,n?{add:Pt("add"),set:Pt("set"),delete:Pt("delete"),clear:Pt("clear")}:{add(r){const i=J(this),o=Ot(i),l=J(r),a=!e&&!Hn(r)&&!ge(r)?l:r;return o.has.call(i,a)||te(r,a)&&o.has.call(i,r)||te(l,a)&&o.has.call(i,l)||(i.add(a),de(i,"add",a,a)),this},set(r,i){!e&&!Hn(i)&&!ge(i)&&(i=J(i));const o=J(this),{has:l,get:a}=Ot(o);let u=l.call(o,r);u||(r=J(r),u=l.call(o,r));const c=a.call(o,r);return o.set(r,i),u?te(i,c)&&de(o,"set",r,i):de(o,"add",r,i),this},delete(r){const i=J(this),{has:o,get:l}=Ot(i);let a=o.call(i,r);a||(r=J(r),a=o.call(i,r)),l&&l.call(i,r);const u=i.delete(r);return a&&de(i,"delete",r,void 0),u},clear(){const r=J(this),i=r.size!==0,o=r.clear();return i&&de(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Zl(r,n,e)}),t}function sr(n,e){const t=Ql(n,e);return(s,r,i)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?s:Reflect.get(W(t,r)&&r in s?t:s,r,i)}const Xl={get:sr(!1,!1)},na={get:sr(!1,!0)},ea={get:sr(!0,!1)};const zi=new WeakMap,Gi=new WeakMap,qi=new WeakMap,ta=new WeakMap;function sa(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function rs(n){return ge(n)?n:rr(n,!1,Jl,Xl,zi)}function Ki(n){return rr(n,!1,Yl,na,Gi)}function Is(n){return rr(n,!0,Wl,ea,qi)}function rr(n,e,t,s,r){if(!X(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const i=r.get(n);if(i)return i;const o=sa(Al(n));if(o===0)return n;const l=new Proxy(n,o===2?s:t);return r.set(n,l),l}function Ne(n){return ge(n)?Ne(n.__v_raw):!!(n&&n.__v_isReactive)}function ge(n){return!!(n&&n.__v_isReadonly)}function Hn(n){return!!(n&&n.__v_isShallow)}function ir(n){return n?!!n.__v_raw:!1}function J(n){const e=n&&n.__v_raw;return e?J(e):n}function ra(n){return!W(n,"__v_skip")&&Object.isExtensible(n)&&Ai(n,"__v_skip",!0),n}const Un=n=>X(n)?rs(n):n,Ye=n=>X(n)?Is(n):n;function wn(n){return n?n.__v_isRef===!0:!1}function pe(n){return Ji(n,!1)}function ia(n){return Ji(n,!0)}function Ji(n,e){return wn(n)?n:new oa(n,e)}class oa{constructor(e,t){this.dep=new tr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:J(e),this._value=t?e:Un(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,s=this.__v_isShallow||Hn(e)||ge(e);e=s?e:J(e),te(e,t)&&(this._rawValue=e,this._value=s?e:Un(e),this.dep.trigger())}}function hn(n){return wn(n)?n.value:n}const la={get:(n,e,t)=>e==="__v_raw"?n:hn(Reflect.get(n,e,t)),set:(n,e,t,s)=>{const r=n[e];return wn(r)&&!wn(t)?(r.value=t,!0):Reflect.set(n,e,t,s)}};function Wi(n){return Ne(n)?n:new Proxy(n,la)}class aa{constructor(e,t,s){this.fn=e,this.setter=t,this._value=void 0,this.dep=new tr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=vt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ln!==this)return Mi(this,!0),!0}get value(){const e=this.dep.track();return Hi(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ca(n,e,t=!1){let s,r;return F(n)?s=n:(s=n.get,r=n.set),new aa(s,r,t)}const Nt={},Ft=new WeakMap;let Ee;function ua(n,e=!1,t=Ee){if(t){let s=Ft.get(t);s||Ft.set(t,s=[]),s.push(n)}}function fa(n,e,t=on){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:l,call:a}=t,u=P=>r?P:Hn(P)||r===!1||r===0?he(P,1):he(P);let c,f,p,g,y=!1,w=!1;if(wn(n)?(f=()=>n.value,y=Hn(n)):Ne(n)?(f=()=>u(n),y=!0):B(n)?(w=!0,y=n.some(P=>Ne(P)||Hn(P)),f=()=>n.map(P=>{if(wn(P))return P.value;if(Ne(P))return u(P);if(F(P))return a?a(P,2):P()})):F(n)?e?f=a?()=>a(n,2):n:f=()=>{if(p){ie();try{p()}finally{oe()}}const P=Ee;Ee=c;try{return a?a(n,3,[g]):n(g)}finally{Ee=P}}:f=se,e&&r){const P=f,Y=r===!0?1/0:r;f=()=>he(P(),Y)}const C=Fl(),L=()=>{c.stop(),C&&C.active&&Js(C.effects,c)};if(i&&e){const P=e;e=(...Y)=>{const an=P(...Y);return L(),an}}let A=w?new Array(n.length).fill(Nt):Nt;const N=P=>{if(!(!(c.flags&1)||!c.dirty&&!P))if(e){const Y=c.run();if(P||r||y||(w?Y.some((an,Z)=>te(an,A[Z])):te(Y,A))){p&&p();const an=Ee;Ee=c;try{const Z=[Y,A===Nt?void 0:w&&A[0]===Nt?[]:A,g];A=Y,a?a(e,3,Z):e(...Z)}finally{Ee=an}}}else c.run()};return l&&l(N),c=new Ci(f),c.scheduler=o?()=>o(N,!1):N,g=P=>ua(P,!1,c),p=c.onStop=()=>{const P=Ft.get(c);if(P){if(a)a(P,4);else for(const Y of P)Y();Ft.delete(c)}},e?s?N(!0):A=c.run():o?o(N.bind(null,!0),!0):c.run(),L.pause=c.pause.bind(c),L.resume=c.resume.bind(c),L.stop=L,L}function he(n,e=1/0,t){if(e<=0||!X(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,wn(n))he(n.value,e,t);else if(B(n))for(let s=0;s<n.length;s++)he(n[s],e,t);else if(Si(n)||Ke(n))n.forEach(s=>{he(s,e,t)});else if(Ei(n)){for(const s in n)he(n[s],e,t);for(const s of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,s)&&he(n[s],e,t)}return n}/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Rt(n,e,t,s){try{return s?n(...s):n()}catch(r){is(r,e,t)}}function Vn(n,e,t,s){if(F(n)){const r=Rt(n,e,t,s);return r&&Ri(r)&&r.catch(i=>{is(i,e,t)}),r}if(B(n)){const r=[];for(let i=0;i<n.length;i++)r.push(Vn(n[i],e,t,s));return r}}function is(n,e,t,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||on;if(e){let l=e.parent;const a=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const c=l.ec;if(c){for(let f=0;f<c.length;f++)if(c[f](n,a,u)===!1)return}l=l.parent}if(i){ie(),Rt(i,null,10,[n,a,u]),oe();return}}da(n,t,r,s,o)}function da(n,e,t,s=!0,r=!1){if(r)throw n;console.error(n)}const Rn=[];let Xn=-1;const Je=[];let xe=null,Ve=0;const Yi=Promise.resolve();let jt=null;function os(n){const e=jt||Yi;return n?e.then(this?n.bind(this):n):e}function ha(n){let e=Xn+1,t=Rn.length;for(;e<t;){const s=e+t>>>1,r=Rn[s],i=xt(r);i<n||i===n&&r.flags&2?e=s+1:t=s}return e}function or(n){if(!(n.flags&1)){const e=xt(n),t=Rn[Rn.length-1];!t||!(n.flags&2)&&e>=xt(t)?Rn.push(n):Rn.splice(ha(e),0,n),n.flags|=1,Zi()}}function Zi(){jt||(jt=Yi.then(Xi))}function pa(n){B(n)?Je.push(...n):xe&&n.id===-1?xe.splice(Ve+1,0,n):n.flags&1||(Je.push(n),n.flags|=1),Zi()}function Er(n,e,t=Xn+1){for(;t<Rn.length;t++){const s=Rn[t];if(s&&s.flags&2){if(n&&s.id!==n.uid)continue;Rn.splice(t,1),t--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Qi(n){if(Je.length){const e=[...new Set(Je)].sort((t,s)=>xt(t)-xt(s));if(Je.length=0,xe){xe.push(...e);return}for(xe=e,Ve=0;Ve<xe.length;Ve++){const t=xe[Ve];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}xe=null,Ve=0}}const xt=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Xi(n){try{for(Xn=0;Xn<Rn.length;Xn++){const e=Rn[Xn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Rt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xn<Rn.length;Xn++){const e=Rn[Xn];e&&(e.flags&=-2)}Xn=-1,Rn.length=0,Qi(),jt=null,(Rn.length||Je.length)&&Xi()}}let Cn=null,no=null;function Ut(n){const e=Cn;return Cn=n,no=n&&n.type.__scopeId||null,e}function ga(n,e=Cn,t){if(!e||n._n)return n;const s=(...r)=>{s._d&&Gt(-1);const i=Ut(e);let o;try{o=n(...r)}finally{Ut(i),s._d&&Gt(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function $a(n,e){if(Cn===null)return n;const t=us(Cn),s=n.dirs||(n.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,l,a=on]=e[r];i&&(F(i)&&(i={mounted:i,updated:i}),i.deep&&he(o),s.push({dir:i,instance:t,value:o,oldValue:void 0,arg:l,modifiers:a}))}return n}function Re(n,e,t,s){const r=n.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const l=r[o];i&&(l.oldValue=i[o].value);let a=l.dir[s];a&&(ie(),Vn(a,t,8,[n.el,l,n,e]),oe())}}function Lt(n,e){if(yn){let t=yn.provides;const s=yn.parent&&yn.parent.provides;s===t&&(t=yn.provides=Object.create(s)),t[n]=e}}function jn(n,e,t=!1){const s=vc();if(s||We){let r=We?We._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&F(e)?e.call(s&&s.proxy):e}}const ma=Symbol.for("v-scx"),_a=()=>jn(ma);function va(n,e){return lr(n,null,e)}function Ce(n,e,t){return lr(n,e,t)}function lr(n,e,t=on){const{immediate:s,deep:r,flush:i,once:o}=t,l=bn({},t),a=e&&s||!e&&i!=="post";let u;if(wt){if(i==="sync"){const g=_a();u=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=se,g.resume=se,g.pause=se,g}}const c=yn;l.call=(g,y,w)=>Vn(g,c,y,w);let f=!1;i==="post"?l.scheduler=g=>{On(g,c&&c.suspense)}:i!=="sync"&&(f=!0,l.scheduler=(g,y)=>{y?g():or(g)}),l.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,c&&(g.id=c.uid,g.i=c))};const p=fa(n,e,l);return wt&&(u?u.push(p):a&&p()),p}function ba(n,e,t){const s=this.proxy,r=fn(n)?n.includes(".")?eo(s,n):()=>s[n]:n.bind(s,s);let i;F(e)?i=e:(i=e.handler,t=e);const o=Tt(this),l=lr(r,i.bind(s),t);return o(),l}function eo(n,e){const t=e.split(".");return()=>{let s=n;for(let r=0;r<t.length&&s;r++)s=s[t[r]];return s}}const xa=Symbol("_vte"),ya=n=>n.__isTeleport,bs=Symbol("_leaveCb");function ar(n,e){n.shapeFlag&6&&n.component?(n.transition=e,ar(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function to(n,e){return F(n)?bn({name:n.name},e,{setup:n}):n}function so(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Ar(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Vt=new WeakMap;function dt(n,e,t,s,r=!1){if(B(n)){n.forEach((w,C)=>dt(w,e&&(B(e)?e[C]:e),t,s,r));return}if(ht(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&dt(n,e,t,s.component.subTree);return}const i=s.shapeFlag&4?us(s.component):s.el,o=r?null:i,{i:l,r:a}=n,u=e&&e.r,c=l.refs===on?l.refs={}:l.refs,f=l.setupState,p=J(f),g=f===on?ki:w=>Ar(c,w)?!1:W(p,w),y=(w,C)=>!(C&&Ar(c,C));if(u!=null&&u!==a){if(Or(e),fn(u))c[u]=null,g(u)&&(f[u]=null);else if(wn(u)){const w=e;y(u,w.k)&&(u.value=null),w.k&&(c[w.k]=null)}}if(F(a)){ie();try{Rt(a,l,12,[o,c])}finally{oe()}}else{const w=fn(a),C=wn(a);if(w||C){const L=()=>{if(n.f){const A=w?g(a)?f[a]:c[a]:y()||!n.k?a.value:c[n.k];if(r)B(A)&&Js(A,i);else if(B(A))A.includes(i)||A.push(i);else if(w)c[a]=[i],g(a)&&(f[a]=c[a]);else{const N=[i];y(a,n.k)&&(a.value=N),n.k&&(c[n.k]=N)}}else w?(c[a]=o,g(a)&&(f[a]=o)):C&&(y(a,n.k)&&(a.value=o),n.k&&(c[n.k]=o))};if(o){const A=()=>{L(),Vt.delete(n)};A.id=-1,Vt.set(n,A),On(A,t)}else Or(n),L()}}}function Or(n){const e=Vt.get(n);e&&(e.flags|=8,Vt.delete(n))}ts().requestIdleCallback;ts().cancelIdleCallback;const ht=n=>!!n.type.__asyncLoader,ro=n=>n.type.__isKeepAlive;function wa(n,e){io(n,"a",e)}function ka(n,e){io(n,"da",e)}function io(n,e,t=yn){const s=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(ls(e,s,t),t){let r=t.parent;for(;r&&r.parent;)ro(r.parent.vnode)&&Sa(s,e,t,r),r=r.parent}}function Sa(n,e,t,s){const r=ls(e,n,s,!0);cr(()=>{Js(s[e],r)},t)}function ls(n,e,t=yn,s=!1){if(t){const r=t[n]||(t[n]=[]),i=e.__weh||(e.__weh=(...o)=>{ie();const l=Tt(t),a=Vn(e,t,n,o);return l(),oe(),a});return s?r.unshift(i):r.push(i),i}}const $e=n=>(e,t=yn)=>{(!wt||n==="sp")&&ls(n,(...s)=>e(...s),t)},Ra=$e("bm"),oo=$e("m"),Ta=$e("bu"),Ea=$e("u"),Aa=$e("bum"),cr=$e("um"),Oa=$e("sp"),Pa=$e("rtg"),Na=$e("rtc");function Ca(n,e=yn){ls("ec",n,e)}const Ia="components";function Ma(n,e){return Da(Ia,n,!0,e)||n}const La=Symbol.for("v-ndc");function Da(n,e,t=!0,s=!1){const r=Cn||yn;if(r){const i=r.type;{const l=kc(i,!1);if(l&&(l===e||l===En(e)||l===es(En(e))))return i}const o=Pr(r[n]||i[n],e)||Pr(r.appContext[n],e);return!o&&s?i:o}}function Pr(n,e){return n&&(n[e]||n[En(e)]||n[es(En(e))])}function Ae(n,e,t,s){let r;const i=t,o=B(n);if(o||fn(n)){const l=o&&Ne(n);let a=!1,u=!1;l&&(a=!Hn(n),u=ge(n),n=ss(n)),r=new Array(n.length);for(let c=0,f=n.length;c<f;c++)r[c]=e(a?u?Ye(Un(n[c])):Un(n[c]):n[c],c,void 0,i)}else if(typeof n=="number"){r=new Array(n);for(let l=0;l<n;l++)r[l]=e(l+1,l,void 0,i)}else if(X(n))if(n[Symbol.iterator])r=Array.from(n,(l,a)=>e(l,a,void 0,i));else{const l=Object.keys(n);r=new Array(l.length);for(let a=0,u=l.length;a<u;a++){const c=l[a];r[a]=e(n[c],c,a,i)}}else r=[];return r}const Ms=n=>n?Eo(n)?us(n):Ms(n.parent):null,pt=bn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ms(n.parent),$root:n=>Ms(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>ao(n),$forceUpdate:n=>n.f||(n.f=()=>{or(n.update)}),$nextTick:n=>n.n||(n.n=os.bind(n.proxy)),$watch:n=>ba.bind(n)}),xs=(n,e)=>n!==on&&!n.__isScriptSetup&&W(n,e),Ha={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:s,data:r,props:i,accessCache:o,type:l,appContext:a}=n;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return r[e];case 4:return t[e];case 3:return i[e]}else{if(xs(s,e))return o[e]=1,s[e];if(r!==on&&W(r,e))return o[e]=2,r[e];if(W(i,e))return o[e]=3,i[e];if(t!==on&&W(t,e))return o[e]=4,t[e];Ls&&(o[e]=0)}}const u=pt[e];let c,f;if(u)return e==="$attrs"&&xn(n.attrs,"get",""),u(n);if((c=l.__cssModules)&&(c=c[e]))return c;if(t!==on&&W(t,e))return o[e]=4,t[e];if(f=a.config.globalProperties,W(f,e))return f[e]},set({_:n},e,t){const{data:s,setupState:r,ctx:i}=n;return xs(r,e)?(r[e]=t,!0):s!==on&&W(s,e)?(s[e]=t,!0):W(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(i[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:s,appContext:r,props:i,type:o}},l){let a;return!!(t[l]||n!==on&&l[0]!=="$"&&W(n,l)||xs(e,l)||W(i,l)||W(s,l)||W(pt,l)||W(r.config.globalProperties,l)||(a=o.__cssModules)&&a[l])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:W(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Nr(n){return B(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Ls=!0;function Ba(n){const e=ao(n),t=n.proxy,s=n.ctx;Ls=!1,e.beforeCreate&&Cr(e.beforeCreate,n,"bc");const{data:r,computed:i,methods:o,watch:l,provide:a,inject:u,created:c,beforeMount:f,mounted:p,beforeUpdate:g,updated:y,activated:w,deactivated:C,beforeDestroy:L,beforeUnmount:A,destroyed:N,unmounted:P,render:Y,renderTracked:an,renderTriggered:Z,errorCaptured:Gn,serverPrefetch:me,expose:qn,inheritAttrs:_e,components:ke,directives:Kn,filters:nt}=e;if(u&&Fa(u,s,null),o)for(const nn in o){const q=o[nn];F(q)&&(s[nn]=q.bind(t))}if(r){const nn=r.call(t,t);X(nn)&&(n.data=rs(nn))}if(Ls=!0,i)for(const nn in i){const q=i[nn],le=F(q)?q.bind(t,t):F(q.get)?q.get.bind(t,t):se,ve=!F(q)&&F(q.set)?q.set.bind(t):se,Jn=Tn({get:le,set:ve});Object.defineProperty(s,nn,{enumerable:!0,configurable:!0,get:()=>Jn.value,set:An=>Jn.value=An})}if(l)for(const nn in l)lo(l[nn],s,t,nn);if(a){const nn=F(a)?a.call(t):a;Reflect.ownKeys(nn).forEach(q=>{Lt(q,nn[q])})}c&&Cr(c,n,"c");function $n(nn,q){B(q)?q.forEach(le=>nn(le.bind(t))):q&&nn(q.bind(t))}if($n(Ra,f),$n(oo,p),$n(Ta,g),$n(Ea,y),$n(wa,w),$n(ka,C),$n(Ca,Gn),$n(Na,an),$n(Pa,Z),$n(Aa,A),$n(cr,P),$n(Oa,me),B(qn))if(qn.length){const nn=n.exposed||(n.exposed={});qn.forEach(q=>{Object.defineProperty(nn,q,{get:()=>t[q],set:le=>t[q]=le,enumerable:!0})})}else n.exposed||(n.exposed={});Y&&n.render===se&&(n.render=Y),_e!=null&&(n.inheritAttrs=_e),ke&&(n.components=ke),Kn&&(n.directives=Kn),me&&so(n)}function Fa(n,e,t=se){B(n)&&(n=Ds(n));for(const s in n){const r=n[s];let i;X(r)?"default"in r?i=jn(r.from||s,r.default,!0):i=jn(r.from||s):i=jn(r),wn(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Cr(n,e,t){Vn(B(n)?n.map(s=>s.bind(e.proxy)):n.bind(e.proxy),e,t)}function lo(n,e,t,s){let r=s.includes(".")?eo(t,s):()=>t[s];if(fn(n)){const i=e[n];F(i)&&Ce(r,i)}else if(F(n))Ce(r,n.bind(t));else if(X(n))if(B(n))n.forEach(i=>lo(i,e,t,s));else{const i=F(n.handler)?n.handler.bind(t):e[n.handler];F(i)&&Ce(r,i,n)}}function ao(n){const e=n.type,{mixins:t,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=n.appContext,l=i.get(e);let a;return l?a=l:!r.length&&!t&&!s?a=e:(a={},r.length&&r.forEach(u=>zt(a,u,o,!0)),zt(a,e,o)),X(e)&&i.set(e,a),a}function zt(n,e,t,s=!1){const{mixins:r,extends:i}=e;i&&zt(n,i,t,!0),r&&r.forEach(o=>zt(n,o,t,!0));for(const o in e)if(!(s&&o==="expose")){const l=ja[o]||t&&t[o];n[o]=l?l(n[o],e[o]):e[o]}return n}const ja={data:Ir,props:Mr,emits:Mr,methods:lt,computed:lt,beforeCreate:kn,created:kn,beforeMount:kn,mounted:kn,beforeUpdate:kn,updated:kn,beforeDestroy:kn,beforeUnmount:kn,destroyed:kn,unmounted:kn,activated:kn,deactivated:kn,errorCaptured:kn,serverPrefetch:kn,components:lt,directives:lt,watch:Va,provide:Ir,inject:Ua};function Ir(n,e){return e?n?function(){return bn(F(n)?n.call(this,this):n,F(e)?e.call(this,this):e)}:e:n}function Ua(n,e){return lt(Ds(n),Ds(e))}function Ds(n){if(B(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function kn(n,e){return n?[...new Set([].concat(n,e))]:e}function lt(n,e){return n?bn(Object.create(null),n,e):e}function Mr(n,e){return n?B(n)&&B(e)?[...new Set([...n,...e])]:bn(Object.create(null),Nr(n),Nr(e??{})):e}function Va(n,e){if(!n)return e;if(!e)return n;const t=bn(Object.create(null),n);for(const s in e)t[s]=kn(n[s],e[s]);return t}function co(){return{app:null,config:{isNativeTag:ki,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let za=0;function Ga(n,e){return function(s,r=null){F(s)||(s=bn({},s)),r!=null&&!X(r)&&(r=null);const i=co(),o=new WeakSet,l=[];let a=!1;const u=i.app={_uid:za++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:Rc,get config(){return i.config},set config(c){},use(c,...f){return o.has(c)||(c&&F(c.install)?(o.add(c),c.install(u,...f)):F(c)&&(o.add(c),c(u,...f))),u},mixin(c){return i.mixins.includes(c)||i.mixins.push(c),u},component(c,f){return f?(i.components[c]=f,u):i.components[c]},directive(c,f){return f?(i.directives[c]=f,u):i.directives[c]},mount(c,f,p){if(!a){const g=u._ceVNode||gn(s,r);return g.appContext=i,p===!0?p="svg":p===!1&&(p=void 0),n(g,c,p),a=!0,u._container=c,c.__vue_app__=u,us(g.component)}},onUnmount(c){l.push(c)},unmount(){a&&(Vn(l,u._instance,16),n(null,u._container),delete u._container.__vue_app__)},provide(c,f){return i.provides[c]=f,u},runWithContext(c){const f=We;We=u;try{return c()}finally{We=f}}};return u}}let We=null;const qa=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${En(e)}Modifiers`]||n[`${Le(e)}Modifiers`];function Ka(n,e,...t){if(n.isUnmounted)return;const s=n.vnode.props||on;let r=t;const i=e.startsWith("update:"),o=i&&qa(s,e.slice(7));o&&(o.trim&&(r=t.map(c=>fn(c)?c.trim():c)),o.number&&(r=t.map(Ys)));let l,a=s[l=gs(e)]||s[l=gs(En(e))];!a&&i&&(a=s[l=gs(Le(e))]),a&&Vn(a,n,6,r);const u=s[l+"Once"];if(u){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,Vn(u,n,6,r)}}const Ja=new WeakMap;function uo(n,e,t=!1){const s=t?Ja:e.emitsCache,r=s.get(n);if(r!==void 0)return r;const i=n.emits;let o={},l=!1;if(!F(n)){const a=u=>{const c=uo(u,e,!0);c&&(l=!0,bn(o,c))};!t&&e.mixins.length&&e.mixins.forEach(a),n.extends&&a(n.extends),n.mixins&&n.mixins.forEach(a)}return!i&&!l?(X(n)&&s.set(n,null),null):(B(i)?i.forEach(a=>o[a]=null):bn(o,i),X(n)&&s.set(n,o),o)}function as(n,e){return!n||!Qt(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),W(n,e[0].toLowerCase()+e.slice(1))||W(n,Le(e))||W(n,e))}function Lr(n){const{type:e,vnode:t,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:l,emit:a,render:u,renderCache:c,props:f,data:p,setupState:g,ctx:y,inheritAttrs:w}=n,C=Ut(n);let L,A;try{if(t.shapeFlag&4){const P=r||s,Y=P;L=ee(u.call(Y,P,c,f,g,p,y)),A=l}else{const P=e;L=ee(P.length>1?P(f,{attrs:l,slots:o,emit:a}):P(f,null)),A=e.props?l:Wa(l)}}catch(P){gt.length=0,is(P,n,1),L=gn(we)}let N=L;if(A&&w!==!1){const P=Object.keys(A),{shapeFlag:Y}=N;P.length&&Y&7&&(i&&P.some(Xt)&&(A=Ya(A,i)),N=Ze(N,A,!1,!0))}return t.dirs&&(N=Ze(N,null,!1,!0),N.dirs=N.dirs?N.dirs.concat(t.dirs):t.dirs),t.transition&&ar(N,t.transition),L=N,Ut(C),L}const Wa=n=>{let e;for(const t in n)(t==="class"||t==="style"||Qt(t))&&((e||(e={}))[t]=n[t]);return e},Ya=(n,e)=>{const t={};for(const s in n)(!Xt(s)||!(s.slice(9)in e))&&(t[s]=n[s]);return t};function Za(n,e,t){const{props:s,children:r,component:i}=n,{props:o,children:l,patchFlag:a}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&a>=0){if(a&1024)return!0;if(a&16)return s?Dr(s,o,u):!!o;if(a&8){const c=e.dynamicProps;for(let f=0;f<c.length;f++){const p=c[f];if(fo(o,s,p)&&!as(u,p))return!0}}}else return(r||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Dr(s,o,u):!0:!!o;return!1}function Dr(n,e,t){const s=Object.keys(e);if(s.length!==Object.keys(n).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(fo(e,n,i)&&!as(t,i))return!0}return!1}function fo(n,e,t){const s=n[t],r=e[t];return t==="style"&&X(s)&&X(r)?!Qs(s,r):s!==r}function Qa({vnode:n,parent:e,suspense:t},s){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.suspense.vnode.el=r.el=s,n=r),r===n)(n=e.vnode).el=s,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=s)}const ho={},po=()=>Object.create(ho),go=n=>Object.getPrototypeOf(n)===ho;function Xa(n,e,t,s=!1){const r={},i=po();n.propsDefaults=Object.create(null),$o(n,e,r,i);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=s?r:Ki(r):n.type.props?n.props=r:n.props=i,n.attrs=i}function nc(n,e,t,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=n,l=J(r),[a]=n.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const c=n.vnode.dynamicProps;for(let f=0;f<c.length;f++){let p=c[f];if(as(n.emitsOptions,p))continue;const g=e[p];if(a)if(W(i,p))g!==i[p]&&(i[p]=g,u=!0);else{const y=En(p);r[y]=Hs(a,l,y,g,n,!1)}else g!==i[p]&&(i[p]=g,u=!0)}}}else{$o(n,e,r,i)&&(u=!0);let c;for(const f in l)(!e||!W(e,f)&&((c=Le(f))===f||!W(e,c)))&&(a?t&&(t[f]!==void 0||t[c]!==void 0)&&(r[f]=Hs(a,l,f,void 0,n,!0)):delete r[f]);if(i!==l)for(const f in i)(!e||!W(e,f))&&(delete i[f],u=!0)}u&&de(n.attrs,"set","")}function $o(n,e,t,s){const[r,i]=n.propsOptions;let o=!1,l;if(e)for(let a in e){if(ct(a))continue;const u=e[a];let c;r&&W(r,c=En(a))?!i||!i.includes(c)?t[c]=u:(l||(l={}))[c]=u:as(n.emitsOptions,a)||(!(a in s)||u!==s[a])&&(s[a]=u,o=!0)}if(i){const a=J(t),u=l||on;for(let c=0;c<i.length;c++){const f=i[c];t[f]=Hs(r,a,f,u[f],n,!W(u,f))}}return o}function Hs(n,e,t,s,r,i){const o=n[t];if(o!=null){const l=W(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&F(a)){const{propsDefaults:u}=r;if(t in u)s=u[t];else{const c=Tt(r);s=u[t]=a.call(null,e),c()}}else s=a;r.ce&&r.ce._setProp(t,s)}o[0]&&(i&&!l?s=!1:o[1]&&(s===""||s===Le(t))&&(s=!0))}return s}const ec=new WeakMap;function mo(n,e,t=!1){const s=t?ec:e.propsCache,r=s.get(n);if(r)return r;const i=n.props,o={},l=[];let a=!1;if(!F(n)){const c=f=>{a=!0;const[p,g]=mo(f,e,!0);bn(o,p),g&&l.push(...g)};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}if(!i&&!a)return X(n)&&s.set(n,qe),qe;if(B(i))for(let c=0;c<i.length;c++){const f=En(i[c]);Hr(f)&&(o[f]=on)}else if(i)for(const c in i){const f=En(c);if(Hr(f)){const p=i[c],g=o[f]=B(p)||F(p)?{type:p}:bn({},p),y=g.type;let w=!1,C=!0;if(B(y))for(let L=0;L<y.length;++L){const A=y[L],N=F(A)&&A.name;if(N==="Boolean"){w=!0;break}else N==="String"&&(C=!1)}else w=F(y)&&y.name==="Boolean";g[0]=w,g[1]=C,(w||W(g,"default"))&&l.push(f)}}const u=[o,l];return X(n)&&s.set(n,u),u}function Hr(n){return n[0]!=="$"&&!ct(n)}const ur=n=>n==="_"||n==="_ctx"||n==="$stable",fr=n=>B(n)?n.map(ee):[ee(n)],tc=(n,e,t)=>{if(e._n)return e;const s=ga((...r)=>fr(e(...r)),t);return s._c=!1,s},_o=(n,e,t)=>{const s=n._ctx;for(const r in n){if(ur(r))continue;const i=n[r];if(F(i))e[r]=tc(r,i,s);else if(i!=null){const o=fr(i);e[r]=()=>o}}},vo=(n,e)=>{const t=fr(e);n.slots.default=()=>t},bo=(n,e,t)=>{for(const s in e)(t||!ur(s))&&(n[s]=e[s])},sc=(n,e,t)=>{const s=n.slots=po();if(n.vnode.shapeFlag&32){const r=e._;r?(bo(s,e,t),t&&Ai(s,"_",r,!0)):_o(e,s)}else e&&vo(n,e)},rc=(n,e,t)=>{const{vnode:s,slots:r}=n;let i=!0,o=on;if(s.shapeFlag&32){const l=e._;l?t&&l===1?i=!1:bo(r,e,t):(i=!e.$stable,_o(e,r)),o=e}else e&&(vo(n,e),o={default:1});if(i)for(const l in r)!ur(l)&&o[l]==null&&delete r[l]},On=cc;function ic(n){return oc(n)}function oc(n,e){const t=ts();t.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:l,createComment:a,setText:u,setElementText:c,parentNode:f,nextSibling:p,setScopeId:g=se,insertStaticContent:y}=n,w=(d,h,$,_=null,b=null,m=null,R=void 0,S=null,k=!!h.dynamicChildren)=>{if(d===h)return;d&&!st(d,h)&&(_=v(d),An(d,b,m,!0),d=null),h.patchFlag===-2&&(k=!1,h.dynamicChildren=null);const{type:x,ref:D,shapeFlag:E}=h;switch(x){case cs:C(d,h,$,_);break;case we:L(d,h,$,_);break;case Dt:d==null&&A(h,$,_,R);break;case cn:ke(d,h,$,_,b,m,R,S,k);break;default:E&1?Y(d,h,$,_,b,m,R,S,k):E&6?Kn(d,h,$,_,b,m,R,S,k):(E&64||E&128)&&x.process(d,h,$,_,b,m,R,S,k,I)}D!=null&&b?dt(D,d&&d.ref,m,h||d,!h):D==null&&d&&d.ref!=null&&dt(d.ref,null,m,d,!0)},C=(d,h,$,_)=>{if(d==null)s(h.el=l(h.children),$,_);else{const b=h.el=d.el;h.children!==d.children&&u(b,h.children)}},L=(d,h,$,_)=>{d==null?s(h.el=a(h.children||""),$,_):h.el=d.el},A=(d,h,$,_)=>{[d.el,d.anchor]=y(d.children,h,$,_,d.el,d.anchor)},N=({el:d,anchor:h},$,_)=>{let b;for(;d&&d!==h;)b=p(d),s(d,$,_),d=b;s(h,$,_)},P=({el:d,anchor:h})=>{let $;for(;d&&d!==h;)$=p(d),r(d),d=$;r(h)},Y=(d,h,$,_,b,m,R,S,k)=>{if(h.type==="svg"?R="svg":h.type==="math"&&(R="mathml"),d==null)an(h,$,_,b,m,R,S,k);else{const x=d.el&&d.el._isVueCE?d.el:null;try{x&&x._beginPatch(),me(d,h,b,m,R,S,k)}finally{x&&x._endPatch()}}},an=(d,h,$,_,b,m,R,S)=>{let k,x;const{props:D,shapeFlag:E,transition:M,dirs:H}=d;if(k=d.el=o(d.type,m,D&&D.is,D),E&8?c(k,d.children):E&16&&Gn(d.children,k,null,_,b,ys(d,m),R,S),H&&Re(d,null,_,"created"),Z(k,d,d.scopeId,R,_),D){for(const sn in D)sn!=="value"&&!ct(sn)&&i(k,sn,null,D[sn],m,_);"value"in D&&i(k,"value",null,D.value,m),(x=D.onVnodeBeforeMount)&&Qn(x,_,d)}H&&Re(d,null,_,"beforeMount");const G=lc(b,M);G&&M.beforeEnter(k),s(k,h,$),((x=D&&D.onVnodeMounted)||G||H)&&On(()=>{try{x&&Qn(x,_,d),G&&M.enter(k),H&&Re(d,null,_,"mounted")}finally{}},b)},Z=(d,h,$,_,b)=>{if($&&g(d,$),_)for(let m=0;m<_.length;m++)g(d,_[m]);if(b){let m=b.subTree;if(h===m||ko(m.type)&&(m.ssContent===h||m.ssFallback===h)){const R=b.vnode;Z(d,R,R.scopeId,R.slotScopeIds,b.parent)}}},Gn=(d,h,$,_,b,m,R,S,k=0)=>{for(let x=k;x<d.length;x++){const D=d[x]=S?fe(d[x]):ee(d[x]);w(null,D,h,$,_,b,m,R,S)}},me=(d,h,$,_,b,m,R)=>{const S=h.el=d.el;let{patchFlag:k,dynamicChildren:x,dirs:D}=h;k|=d.patchFlag&16;const E=d.props||on,M=h.props||on;let H;if($&&Te($,!1),(H=M.onVnodeBeforeUpdate)&&Qn(H,$,h,d),D&&Re(h,d,$,"beforeUpdate"),$&&Te($,!0),x&&(!d.dynamicChildren||d.dynamicChildren.length!==x.length)&&(k=0,R=!1,x=null),(E.innerHTML&&M.innerHTML==null||E.textContent&&M.textContent==null)&&c(S,""),x?qn(d.dynamicChildren,x,S,$,_,ys(h,b),m):R||q(d,h,S,null,$,_,ys(h,b),m,!1),k>0){if(k&16)_e(S,E,M,$,b);else if(k&2&&E.class!==M.class&&i(S,"class",null,M.class,b),k&4&&i(S,"style",E.style,M.style,b),k&8){const G=h.dynamicProps;for(let sn=0;sn<G.length;sn++){const en=G[sn],dn=E[en],mn=M[en];(mn!==dn||en==="value")&&i(S,en,dn,mn,b,$)}}k&1&&d.children!==h.children&&c(S,h.children)}else!R&&x==null&&_e(S,E,M,$,b);((H=M.onVnodeUpdated)||D)&&On(()=>{H&&Qn(H,$,h,d),D&&Re(h,d,$,"updated")},_)},qn=(d,h,$,_,b,m,R)=>{for(let S=0;S<h.length;S++){const k=d[S],x=h[S],D=k.el&&(k.type===cn||!st(k,x)||k.shapeFlag&198)?f(k.el):$;w(k,x,D,null,_,b,m,R,!0)}},_e=(d,h,$,_,b)=>{if(h!==$){if(h!==on)for(const m in h)!ct(m)&&!(m in $)&&i(d,m,h[m],null,b,_);for(const m in $){if(ct(m))continue;const R=$[m],S=h[m];R!==S&&m!=="value"&&i(d,m,S,R,b,_)}"value"in $&&i(d,"value",h.value,$.value,b)}},ke=(d,h,$,_,b,m,R,S,k)=>{const x=h.el=d?d.el:l(""),D=h.anchor=d?d.anchor:l("");let{patchFlag:E,dynamicChildren:M,slotScopeIds:H}=h;H&&(S=S?S.concat(H):H),d==null?(s(x,$,_),s(D,$,_),Gn(h.children||[],$,D,b,m,R,S,k)):E>0&&E&64&&M&&d.dynamicChildren&&d.dynamicChildren.length===M.length?(qn(d.dynamicChildren,M,$,b,m,R,S),(h.key!=null||b&&h===b.subTree)&&xo(d,h,!0)):q(d,h,$,D,b,m,R,S,k)},Kn=(d,h,$,_,b,m,R,S,k)=>{h.slotScopeIds=S,d==null?h.shapeFlag&512?b.ctx.activate(h,$,_,R,k):nt(h,$,_,b,m,R,k):Be(d,h,k)},nt=(d,h,$,_,b,m,R)=>{const S=d.component=_c(d,_,b);if(ro(d)&&(S.ctx.renderer=I),bc(S,!1,R),S.asyncDep){if(b&&b.registerDep(S,$n,R),!d.el){const k=S.subTree=gn(we);L(null,k,h,$),d.placeholder=k.el}}else $n(S,d,h,$,b,m,R)},Be=(d,h,$)=>{const _=h.component=d.component;if(Za(d,h,$))if(_.asyncDep&&!_.asyncResolved){nn(_,h,$);return}else _.next=h,_.update();else h.el=d.el,_.vnode=h},$n=(d,h,$,_,b,m,R)=>{const S=()=>{if(d.isMounted){let{next:E,bu:M,u:H,parent:G,vnode:sn}=d;{const Yn=yo(d);if(Yn){E&&(E.el=sn.el,nn(d,E,R)),Yn.asyncDep.then(()=>{On(()=>{d.isUnmounted||x()},b)});return}}let en=E,dn;Te(d,!1),E?(E.el=sn.el,nn(d,E,R)):E=sn,M&&Mt(M),(dn=E.props&&E.props.onVnodeBeforeUpdate)&&Qn(dn,G,E,sn),Te(d,!0);const mn=Lr(d),Wn=d.subTree;d.subTree=mn,w(Wn,mn,f(Wn.el),v(Wn),d,b,m),E.el=mn.el,en===null&&Qa(d,mn.el),H&&On(H,b),(dn=E.props&&E.props.onVnodeUpdated)&&On(()=>Qn(dn,G,E,sn),b)}else{let E;const{el:M,props:H}=h,{bm:G,m:sn,parent:en,root:dn,type:mn}=d,Wn=ht(h);Te(d,!1),G&&Mt(G),!Wn&&(E=H&&H.onVnodeBeforeMount)&&Qn(E,en,h),Te(d,!0);{dn.ce&&dn.ce._hasShadowRoot()&&dn.ce._injectChildStyle(mn,d.parent?d.parent.type:void 0);const Yn=d.subTree=Lr(d);w(null,Yn,$,_,d,b,m),h.el=Yn.el}if(sn&&On(sn,b),!Wn&&(E=H&&H.onVnodeMounted)){const Yn=h;On(()=>Qn(E,en,Yn),b)}(h.shapeFlag&256||en&&ht(en.vnode)&&en.vnode.shapeFlag&256)&&d.a&&On(d.a,b),d.isMounted=!0,h=$=_=null}};d.scope.on();const k=d.effect=new Ci(S);d.scope.off();const x=d.update=k.run.bind(k),D=d.job=k.runIfDirty.bind(k);D.i=d,D.id=d.uid,k.scheduler=()=>or(D),Te(d,!0),x()},nn=(d,h,$)=>{h.component=d;const _=d.vnode.props;d.vnode=h,d.next=null,nc(d,h.props,_,$),rc(d,h.children,$),ie(),Er(d),oe()},q=(d,h,$,_,b,m,R,S,k=!1)=>{const x=d&&d.children,D=d?d.shapeFlag:0,E=h.children,{patchFlag:M,shapeFlag:H}=h;if(M>0){if(M&128){ve(x,E,$,_,b,m,R,S,k);return}else if(M&256){le(x,E,$,_,b,m,R,S,k);return}}H&8?(D&16&&Mn(x,b,m),E!==x&&c($,E)):D&16?H&16?ve(x,E,$,_,b,m,R,S,k):Mn(x,b,m,!0):(D&8&&c($,""),H&16&&Gn(E,$,_,b,m,R,S,k))},le=(d,h,$,_,b,m,R,S,k)=>{d=d||qe,h=h||qe;const x=d.length,D=h.length,E=Math.min(x,D);let M;for(M=0;M<E;M++){const H=h[M]=k?fe(h[M]):ee(h[M]);w(d[M],H,$,null,b,m,R,S,k)}x>D?Mn(d,b,m,!0,!1,E):Gn(h,$,_,b,m,R,S,k,E)},ve=(d,h,$,_,b,m,R,S,k)=>{let x=0;const D=h.length;let E=d.length-1,M=D-1;for(;x<=E&&x<=M;){const H=d[x],G=h[x]=k?fe(h[x]):ee(h[x]);if(st(H,G))w(H,G,$,null,b,m,R,S,k);else break;x++}for(;x<=E&&x<=M;){const H=d[E],G=h[M]=k?fe(h[M]):ee(h[M]);if(st(H,G))w(H,G,$,null,b,m,R,S,k);else break;E--,M--}if(x>E){if(x<=M){const H=M+1,G=H<D?h[H].el:_;for(;x<=M;)w(null,h[x]=k?fe(h[x]):ee(h[x]),$,G,b,m,R,S,k),x++}}else if(x>M)for(;x<=E;)An(d[x],b,m,!0),x++;else{const H=x,G=x,sn=new Map;for(x=G;x<=M;x++){const Pn=h[x]=k?fe(h[x]):ee(h[x]);Pn.key!=null&&sn.set(Pn.key,x)}let en,dn=0;const mn=M-G+1;let Wn=!1,Yn=0;const et=new Array(mn);for(x=0;x<mn;x++)et[x]=0;for(x=H;x<=E;x++){const Pn=d[x];if(dn>=mn){An(Pn,b,m,!0);continue}let Zn;if(Pn.key!=null)Zn=sn.get(Pn.key);else for(en=G;en<=M;en++)if(et[en-G]===0&&st(Pn,h[en])){Zn=en;break}Zn===void 0?An(Pn,b,m,!0):(et[Zn-G]=x+1,Zn>=Yn?Yn=Zn:Wn=!0,w(Pn,h[Zn],$,null,b,m,R,S,k),dn++)}const xr=Wn?ac(et):qe;for(en=xr.length-1,x=mn-1;x>=0;x--){const Pn=G+x,Zn=h[Pn],yr=h[Pn+1],wr=Pn+1<D?yr.el||wo(yr):_;et[x]===0?w(null,Zn,$,wr,b,m,R,S,k):Wn&&(en<0||x!==xr[en]?Jn(Zn,$,wr,2):en--)}}},Jn=(d,h,$,_,b=null)=>{const{el:m,type:R,transition:S,children:k,shapeFlag:x}=d;if(x&6){Jn(d.component.subTree,h,$,_);return}if(x&128){d.suspense.move(h,$,_);return}if(x&64){R.move(d,h,$,I);return}if(R===cn){s(m,h,$);for(let E=0;E<k.length;E++)Jn(k[E],h,$,_);s(d.anchor,h,$);return}if(R===Dt){N(d,h,$);return}if(_!==2&&x&1&&S)if(_===0)S.persisted&&!m[bs]?s(m,h,$):(S.beforeEnter(m),s(m,h,$),On(()=>S.enter(m),b));else{const{leave:E,delayLeave:M,afterLeave:H}=S,G=()=>{d.ctx.isUnmounted?r(m):s(m,h,$)},sn=()=>{const en=m._isLeaving||!!m[bs];m._isLeaving&&m[bs](!0),S.persisted&&!en?G():E(m,()=>{G(),H&&H()})};M?M(m,G,sn):sn()}else s(m,h,$)},An=(d,h,$,_=!1,b=!1)=>{const{type:m,props:R,ref:S,children:k,dynamicChildren:x,shapeFlag:D,patchFlag:E,dirs:M,cacheIndex:H,memo:G}=d;if(E===-2&&(b=!1),S!=null&&(ie(),dt(S,null,$,d,!0),oe()),H!=null&&(h.renderCache[H]=void 0),D&256){h.ctx.deactivate(d);return}const sn=D&1&&M,en=!ht(d);let dn;if(en&&(dn=R&&R.onVnodeBeforeUnmount)&&Qn(dn,h,d),D&6)Se(d.component,$,_);else{if(D&128){d.suspense.unmount($,_);return}sn&&Re(d,null,h,"beforeUnmount"),D&64?d.type.remove(d,h,$,I,_):x&&!x.hasOnce&&(m!==cn||E>0&&E&64)?Mn(x,h,$,!1,!0):(m===cn&&E&384||!b&&D&16)&&Mn(k,h,$),_&&Fe(d)}const mn=G!=null&&H==null;(en&&(dn=R&&R.onVnodeUnmounted)||sn||mn)&&On(()=>{dn&&Qn(dn,h,d),sn&&Re(d,null,h,"unmounted"),mn&&(d.el=null)},$)},Fe=d=>{const{type:h,el:$,anchor:_,transition:b}=d;if(h===cn){je($,_);return}if(h===Dt){P(d);return}const m=()=>{r($),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(d.shapeFlag&1&&b&&!b.persisted){const{leave:R,delayLeave:S}=b,k=()=>R($,m);S?S(d.el,m,k):k()}else m()},je=(d,h)=>{let $;for(;d!==h;)$=p(d),r(d),d=$;r(h)},Se=(d,h,$)=>{const{bum:_,scope:b,job:m,subTree:R,um:S,m:k,a:x}=d;Br(k),Br(x),_&&Mt(_),b.stop(),m&&(m.flags|=8,An(R,d,h,$)),S&&On(S,h),On(()=>{d.isUnmounted=!0},h)},Mn=(d,h,$,_=!1,b=!1,m=0)=>{for(let R=m;R<d.length;R++)An(d[R],h,$,_,b)},v=d=>{if(d.shapeFlag&6)return v(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const h=p(d.anchor||d.el),$=h&&h[xa];return $?p($):h};let O=!1;const T=(d,h,$)=>{let _;d==null?h._vnode&&(An(h._vnode,null,null,!0),_=h._vnode.component):w(h._vnode||null,d,h,null,null,null,$),h._vnode=d,O||(O=!0,Er(_),Qi(),O=!1)},I={p:w,um:An,m:Jn,r:Fe,mt:nt,mc:Gn,pc:q,pbc:qn,n:v,o:n};return{render:T,hydrate:void 0,createApp:Ga(T)}}function ys({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Te({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function lc(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function xo(n,e,t=!1){const s=n.children,r=e.children;if(B(s)&&B(r))for(let i=0;i<s.length;i++){const o=s[i];let l=r[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=r[i]=fe(r[i]),l.el=o.el),!t&&l.patchFlag!==-2&&xo(o,l)),l.type===cs&&(l.patchFlag===-1&&(l=r[i]=fe(l)),l.el=o.el),l.type===we&&!l.el&&(l.el=o.el)}}function ac(n){const e=n.slice(),t=[0];let s,r,i,o,l;const a=n.length;for(s=0;s<a;s++){const u=n[s];if(u!==0){if(r=t[t.length-1],n[r]<u){e[s]=r,t.push(s);continue}for(i=0,o=t.length-1;i<o;)l=i+o>>1,n[t[l]]<u?i=l+1:o=l;u<n[t[i]]&&(i>0&&(e[s]=t[i-1]),t[i]=s)}}for(i=t.length,o=t[i-1];i-- >0;)t[i]=o,o=e[o];return t}function yo(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:yo(e)}function Br(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function wo(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?wo(e.subTree):null}const ko=n=>n.__isSuspense;function cc(n,e){e&&e.pendingBranch?B(n)?e.effects.push(...n):e.effects.push(n):pa(n)}const cn=Symbol.for("v-fgt"),cs=Symbol.for("v-txt"),we=Symbol.for("v-cmt"),Dt=Symbol.for("v-stc"),gt=[];let In=null;function j(n=!1){gt.push(In=n?null:[])}function uc(){gt.pop(),In=gt[gt.length-1]||null}let yt=1;function Gt(n,e=!1){yt+=n,n<0&&In&&e&&(In.hasOnce=!0)}function So(n){return n.dynamicChildren=yt>0?In||qe:null,uc(),yt>0&&In&&In.push(n),n}function U(n,e,t,s,r,i){return So(V(n,e,t,s,r,i,!0))}function Ro(n,e,t,s,r){return So(gn(n,e,t,s,r,!0))}function qt(n){return n?n.__v_isVNode===!0:!1}function st(n,e){return n.type===e.type&&n.key===e.key}const To=({key:n})=>n??null,Ht=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?fn(n)||wn(n)||F(n)?{i:Cn,r:n,k:e,f:!!t}:n:null);function V(n,e=null,t=null,s=0,r=null,i=n===cn?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&To(e),ref:e&&Ht(e),scopeId:no,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Cn};return l?(Kt(a,t),i&128&&n.normalize(a)):t&&(a.shapeFlag|=fn(t)?8:16),yt>0&&!o&&In&&(a.patchFlag>0||i&6)&&a.patchFlag!==32&&In.push(a),a}const gn=fc;function fc(n,e=null,t=null,s=0,r=null,i=!1){if((!n||n===La)&&(n=we),qt(n)){const l=Ze(n,e,!0);return t&&Kt(l,t),yt>0&&!i&&In&&(l.shapeFlag&6?In[In.indexOf(n)]=l:In.push(l)),l.patchFlag=-2,l}if(Sc(n)&&(n=n.__vccOpts),e){e=dc(e);let{class:l,style:a}=e;l&&!fn(l)&&(e.class=Bn(l)),X(a)&&(ir(a)&&!B(a)&&(a=bn({},a)),e.style=Zs(a))}const o=fn(n)?1:ko(n)?128:ya(n)?64:X(n)?4:F(n)?2:0;return V(n,e,t,s,r,o,i,!0)}function dc(n){return n?ir(n)||go(n)?bn({},n):n:null}function Ze(n,e,t=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:l,transition:a}=n,u=e?gc(r||{},e):r,c={__v_isVNode:!0,__v_skip:!0,type:n.type,props:u,key:u&&To(u),ref:e&&e.ref?t&&i?B(i)?i.concat(Ht(e)):[i,Ht(e)]:Ht(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==cn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:a,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ze(n.ssContent),ssFallback:n.ssFallback&&Ze(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return a&&s&&ar(c,a.clone(c)),c}function hc(n=" ",e=0){return gn(cs,null,n,e)}function pc(n,e){const t=gn(Dt,null,n);return t.staticCount=e,t}function Ie(n="",e=!1){return e?(j(),Ro(we,null,n)):gn(we,null,n)}function ee(n){return n==null||typeof n=="boolean"?gn(we):B(n)?gn(cn,null,n.slice()):qt(n)?fe(n):gn(cs,null,String(n))}function fe(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ze(n)}function Kt(n,e){let t=0;const{shapeFlag:s}=n;if(e==null)e=null;else if(B(e))t=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),Kt(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!go(e)?e._ctx=Cn:r===3&&Cn&&(Cn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(F(e)){if(s&65){Kt(n,{default:e});return}e={default:e,_ctx:Cn},t=32}else e=String(e),s&64?(t=16,e=[hc(e)]):t=8;n.children=e,n.shapeFlag|=t}function gc(...n){const e={};for(let t=0;t<n.length;t++){const s=n[t];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=Bn([e.class,s.class]));else if(r==="style")e.style=Zs([e.style,s.style]);else if(Qt(r)){const i=e[r],o=s[r];o&&i!==o&&!(B(i)&&i.includes(o))?e[r]=i?[].concat(i,o):o:o==null&&i==null&&!Xt(r)&&(e[r]=o)}else r!==""&&(e[r]=s[r])}return e}function Qn(n,e,t,s=null){Vn(n,e,7,[t,s])}const $c=co();let mc=0;function _c(n,e,t){const s=n.type,r=(e?e.appContext:n.appContext)||$c,i={uid:mc++,vnode:n,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Bl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:mo(s,r),emitsOptions:uo(s,r),emit:null,emitted:null,propsDefaults:on,inheritAttrs:s.inheritAttrs,ctx:on,data:on,props:on,attrs:on,slots:on,refs:on,setupState:on,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Ka.bind(null,i),n.ce&&n.ce(i),i}let yn=null;const vc=()=>yn||Cn;let Jt,Bs;{const n=ts(),e=(t,s)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};Jt=e("__VUE_INSTANCE_SETTERS__",t=>yn=t),Bs=e("__VUE_SSR_SETTERS__",t=>wt=t)}const Tt=n=>{const e=yn;return Jt(n),n.scope.on(),()=>{n.scope.off(),Jt(e)}},Fr=()=>{yn&&yn.scope.off(),Jt(null)};function Eo(n){return n.vnode.shapeFlag&4}let wt=!1;function bc(n,e=!1,t=!1){e&&Bs(e);const{props:s,children:r}=n.vnode,i=Eo(n);Xa(n,s,i,e),sc(n,r,t||e);const o=i?xc(n,e):void 0;return e&&Bs(!1),o}function xc(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Ha);const{setup:s}=t;if(s){ie();const r=n.setupContext=s.length>1?wc(n):null,i=Tt(n),o=Rt(s,n,0,[n.props,r]),l=Ri(o);if(oe(),i(),(l||n.sp)&&!ht(n)&&so(n),l){if(o.then(Fr,Fr),e)return o.then(a=>{jr(n,a)}).catch(a=>{is(a,n,0)});n.asyncDep=o}else jr(n,o)}else Ao(n)}function jr(n,e,t){F(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:X(e)&&(n.setupState=Wi(e)),Ao(n)}function Ao(n,e,t){const s=n.type;n.render||(n.render=s.render||se);{const r=Tt(n);ie();try{Ba(n)}finally{oe(),r()}}}const yc={get(n,e){return xn(n,"get",""),n[e]}};function wc(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,yc),slots:n.slots,emit:n.emit,expose:e}}function us(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Wi(ra(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in pt)return pt[t](n)},has(e,t){return t in e||t in pt}})):n.proxy}function kc(n,e=!0){return F(n)?n.displayName||n.name:n.name||e&&n.__name}function Sc(n){return F(n)&&"__vccOpts"in n}const Tn=(n,e)=>ca(n,e,wt);function Oo(n,e,t){try{Gt(-1);const s=arguments.length;return s===2?X(e)&&!B(e)?qt(e)?gn(n,null,[e]):gn(n,e):gn(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&qt(t)&&(t=[t]),gn(n,e,t))}finally{Gt(1)}}const Rc="3.5.39";/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Fs;const Ur=typeof window<"u"&&window.trustedTypes;if(Ur)try{Fs=Ur.createPolicy("vue",{createHTML:n=>n})}catch{}const Po=Fs?n=>Fs.createHTML(n):n=>n,Tc="http://www.w3.org/2000/svg",Ec="http://www.w3.org/1998/Math/MathML",ue=typeof document<"u"?document:null,Vr=ue&&ue.createElement("template"),Ac={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,s)=>{const r=e==="svg"?ue.createElementNS(Tc,n):e==="mathml"?ue.createElementNS(Ec,n):t?ue.createElement(n,{is:t}):ue.createElement(n);return n==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:n=>ue.createTextNode(n),createComment:n=>ue.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ue.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,s,r,i){const o=t?t.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===i||!(r=r.nextSibling)););else{Vr.innerHTML=Po(s==="svg"?`<svg>${n}</svg>`:s==="mathml"?`<math>${n}</math>`:n);const l=Vr.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Oc=Symbol("_vtc");function Pc(n,e,t){const s=n[Oc];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const zr=Symbol("_vod"),Nc=Symbol("_vsh"),Cc=Symbol(""),Ic=/(?:^|;)\s*display\s*:/;function Mc(n,e,t){const s=n.style,r=fn(t);let i=!1;if(t&&!r){if(e)if(fn(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();t[l]==null&&at(s,l,"")}else for(const o in e)t[o]==null&&at(s,o,"");for(const o in t){o==="display"&&(i=!0);const l=t[o];l!=null?Dc(n,o,!fn(e)&&e?e[o]:void 0,l)||at(s,o,l):at(s,o,"")}}else if(r){if(e!==t){const o=s[Cc];o&&(t+=";"+o),s.cssText=t,i=Ic.test(t)}}else e&&n.removeAttribute("style");zr in n&&(n[zr]=i?s.display:"",n[Nc]&&(s.display="none"))}const Gr=/\s*!important$/;function at(n,e,t){if(B(t))t.forEach(s=>at(n,e,s));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const s=Lc(n,e);Gr.test(t)?n.setProperty(Le(s),t.replace(Gr,""),"important"):n[s]=t}}const qr=["Webkit","Moz","ms"],ws={};function Lc(n,e){const t=ws[e];if(t)return t;let s=En(e);if(s!=="filter"&&s in n)return ws[e]=s;s=es(s);for(let r=0;r<qr.length;r++){const i=qr[r]+s;if(i in n)return ws[e]=i}return e}function Dc(n,e,t,s){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&fn(s)&&t===s}const Kr="http://www.w3.org/1999/xlink";function Jr(n,e,t,s,r,i=Dl(e)){s&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Kr,e.slice(6,e.length)):n.setAttributeNS(Kr,e,t):t==null||i&&!Oi(t)?n.removeAttribute(e):n.setAttribute(e,i?"":re(t)?String(t):t)}function Wr(n,e,t,s,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Po(t):t);return}const i=n.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?n.getAttribute("value")||"":n.value,a=t==null?n.type==="checkbox"?"on":"":String(t);(l!==a||!("_value"in n))&&(n.value=a),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=Oi(t):t==null&&l==="string"?(t="",o=!0):l==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(r||e)}function ze(n,e,t,s){n.addEventListener(e,t,s)}function Hc(n,e,t,s){n.removeEventListener(e,t,s)}const Yr=Symbol("_vei");function Bc(n,e,t,s,r=null){const i=n[Yr]||(n[Yr]={}),o=i[e];if(s&&o)o.value=s;else{const[l,a]=Uc(e);if(s){const u=i[e]=Gc(s,r);ze(n,l,u,a)}else o&&(Hc(n,l,o,a),i[e]=void 0)}}const Fc=/(Once|Passive|Capture)$/,jc=/^on:?(?:Once|Passive|Capture)$/;function Uc(n){let e,t;for(;(t=n.match(Fc))&&!jc.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):Le(n.slice(2)),e]}let ks=0;const Vc=Promise.resolve(),zc=()=>ks||(Vc.then(()=>ks=0),ks=Date.now());function Gc(n,e){const t=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=t.attached)return;const r=t.value;if(B(r)){const i=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{i.call(s),s._stopped=!0};const o=r.slice(),l=[s];for(let a=0;a<o.length&&!s._stopped;a++){const u=o[a];u&&Vn(u,e,5,l)}}else Vn(r,e,5,[s])};return t.value=n,t.attached=zc(),t}const Zr=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,qc=(n,e,t,s,r,i)=>{const o=r==="svg";e==="class"?Pc(n,s,o):e==="style"?Mc(n,t,s):Qt(e)?Xt(e)||Bc(n,e,t,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Kc(n,e,s,o))?(Wr(n,e,s),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Jr(n,e,s,o,i,e!=="value")):n._isVueCE&&(Jc(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!fn(s)))?Wr(n,En(e),s,i,e):(e==="true-value"?n._trueValue=s:e==="false-value"&&(n._falseValue=s),Jr(n,e,s,o))};function Kc(n,e,t,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in n&&Zr(e)&&F(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Zr(e)&&fn(t)?!1:e in n}function Jc(n,e){const t=n._def.props;if(!t)return!1;const s=En(e);return Array.isArray(t)?t.some(r=>En(r)===s):Object.keys(t).some(r=>En(r)===s)}const Qr=n=>{const e=n.props["onUpdate:modelValue"]||!1;return B(e)?t=>Mt(e,t):e};function Wc(n){n.target.composing=!0}function Xr(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ss=Symbol("_assign");function ni(n,e,t){return e&&(n=n.trim()),t&&(n=Ys(n)),n}const Yc={created(n,{modifiers:{lazy:e,trim:t,number:s}},r){n[Ss]=Qr(r);const i=s||r.props&&r.props.type==="number";ze(n,e?"change":"input",o=>{o.target.composing||n[Ss](ni(n.value,t,i))}),(t||i)&&ze(n,"change",()=>{n.value=ni(n.value,t,i)}),e||(ze(n,"compositionstart",Wc),ze(n,"compositionend",Xr),ze(n,"change",Xr))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:s,trim:r,number:i}},o){if(n[Ss]=Qr(o),n.composing)return;const l=(i||n.type==="number")&&!/^0\d/.test(n.value)?Ys(n.value):n.value,a=e??"";if(l===a)return;const u=n.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===n&&n.type!=="range"&&(s&&e===t||r&&n.value.trim()===a)||(n.value=a)}},Zc=["ctrl","shift","alt","meta"],Qc={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>Zc.some(t=>n[`${t}Key`]&&!e.includes(t))},Xc=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),s=e.join(".");return t[s]||(t[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const l=Qc[e[o]];if(l&&l(r,e))return}return n(r,...i)})},nu=bn({patchProp:qc},Ac);let ei;function eu(){return ei||(ei=ic(nu))}const tu=(...n)=>{const e=eu().createApp(...n),{mount:t}=e;return e.mount=s=>{const r=ru(s);if(!r)return;const i=e._component;!F(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,su(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function su(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function ru(n){return fn(n)?document.querySelector(n):n}const Bt=pe(localStorage.getItem("theme")!=="light");va(()=>{const n=Bt.value?"dark":"light";document.documentElement.setAttribute("data-theme",n),localStorage.setItem("theme",n)});function iu(){function n(){Bt.value=!Bt.value}return{isDark:Bt,toggle:n}}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ge=typeof document<"u";function No(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function ou(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&No(n.default)}const K=Object.assign;function Rs(n,e){const t={};for(const s in e){const r=e[s];t[s]=zn(r)?r.map(n):n(r)}return t}const $t=()=>{},zn=Array.isArray;function ti(n,e){const t={};for(const s in n)t[s]=s in e?e[s]:n[s];return t}const Co=/#/g,lu=/&/g,au=/\//g,cu=/=/g,uu=/\?/g,Io=/\+/g,fu=/%5B/g,du=/%5D/g,Mo=/%5E/g,hu=/%60/g,Lo=/%7B/g,pu=/%7C/g,Do=/%7D/g,gu=/%20/g;function dr(n){return n==null?"":encodeURI(""+n).replace(pu,"|").replace(fu,"[").replace(du,"]")}function $u(n){return dr(n).replace(Lo,"{").replace(Do,"}").replace(Mo,"^")}function js(n){return dr(n).replace(Io,"%2B").replace(gu,"+").replace(Co,"%23").replace(lu,"%26").replace(hu,"`").replace(Lo,"{").replace(Do,"}").replace(Mo,"^")}function mu(n){return js(n).replace(cu,"%3D")}function _u(n){return dr(n).replace(Co,"%23").replace(uu,"%3F")}function vu(n){return _u(n).replace(au,"%2F")}function kt(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const bu=/\/$/,xu=n=>n.replace(bu,"");function Ts(n,e,t="/"){let s,r={},i="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return a=l>=0&&a>l?-1:a,a>=0&&(s=e.slice(0,a),i=e.slice(a,l>0?l:e.length),r=n(i.slice(1))),l>=0&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=Su(s??e,t),{fullPath:s+i+o,path:s,query:r,hash:kt(o)}}function yu(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function si(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function wu(n,e,t){const s=e.matched.length-1,r=t.matched.length-1;return s>-1&&s===r&&Qe(e.matched[s],t.matched[r])&&Ho(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Qe(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Ho(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!ku(n[t],e[t]))return!1;return!0}function ku(n,e){return zn(n)?ri(n,e):zn(e)?ri(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function ri(n,e){return zn(e)?n.length===e.length&&n.every((t,s)=>t===e[s]):n.length===1&&n[0]===e}function Su(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),s=n.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=t.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")i>1&&i--;else break;return t.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const be={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Us=function(n){return n.pop="pop",n.push="push",n}({}),Es=function(n){return n.back="back",n.forward="forward",n.unknown="",n}({});function Ru(n){if(!n)if(Ge){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),xu(n)}const Tu=/^[^#]+#/;function Eu(n,e){return n.replace(Tu,"#")+e}function Au(n,e){const t=document.documentElement.getBoundingClientRect(),s=n.getBoundingClientRect();return{behavior:e.behavior,left:s.left-t.left-(e.left||0),top:s.top-t.top-(e.top||0)}}const fs=()=>({left:window.scrollX,top:window.scrollY});function Ou(n){let e;if("el"in n){const t=n.el,s=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?s?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=Au(r,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function ii(n,e){return(history.state?history.state.position-e:-1)+n}const Vs=new Map;function Pu(n,e){Vs.set(n,e)}function Nu(n){const e=Vs.get(n);return Vs.delete(n),e}function Cu(n){return typeof n=="string"||n&&typeof n=="object"}function Bo(n){return typeof n=="string"||typeof n=="symbol"}let un=function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n}({});const Fo=Symbol("");un.MATCHER_NOT_FOUND+"",un.NAVIGATION_GUARD_REDIRECT+"",un.NAVIGATION_ABORTED+"",un.NAVIGATION_CANCELLED+"",un.NAVIGATION_DUPLICATED+"";function Xe(n,e){return K(new Error,{type:n,[Fo]:!0},e)}function ce(n,e){return n instanceof Error&&Fo in n&&(e==null||!!(n.type&e))}const Iu=["params","query","hash"];function Mu(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of Iu)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function Lu(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<t.length;++s){const r=t[s].replace(Io," "),i=r.indexOf("="),o=kt(i<0?r:r.slice(0,i)),l=i<0?null:kt(r.slice(i+1));if(o in e){let a=e[o];zn(a)||(a=e[o]=[a]),a.push(l)}else e[o]=l}return e}function oi(n){let e="";for(let t in n){const s=n[t];if(t=mu(t),s==null){s!==void 0&&(e+=(e.length?"&":"")+t);continue}(zn(s)?s.map(r=>r&&js(r)):[s&&js(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+t,r!=null&&(e+="="+r))})}return e}function Du(n){const e={};for(const t in n){const s=n[t];s!==void 0&&(e[t]=zn(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const Hu=Symbol(""),li=Symbol(""),ds=Symbol(""),hr=Symbol(""),zs=Symbol("");function rt(){let n=[];function e(s){return n.push(s),()=>{const r=n.indexOf(s);r>-1&&n.splice(r,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function ye(n,e,t,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((l,a)=>{const u=p=>{p===!1?a(Xe(un.NAVIGATION_ABORTED,{from:t,to:e})):p instanceof Error?a(p):Cu(p)?a(Xe(un.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(o&&s.enterCallbacks[r]===o&&typeof p=="function"&&o.push(p),l())},c=i(()=>n.call(s&&s.instances[r],e,t,u));let f=Promise.resolve(c);n.length<3&&(f=f.then(u)),f.catch(p=>a(p))})}function As(n,e,t,s,r=i=>i()){const i=[];for(const o of n)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(No(a)){const u=(a.__vccOpts||a)[e];u&&i.push(ye(u,t,s,o,l,r))}else{let u=a();i.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const f=ou(c)?c.default:c;o.mods[l]=c,o.components[l]=f;const p=(f.__vccOpts||f)[e];return p&&ye(p,t,s,o,l,r)()}))}}return i}function Bu(n,e){const t=[],s=[],r=[],i=Math.max(e.matched.length,n.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(n.matched.find(u=>Qe(u,l))?s.push(l):t.push(l));const a=n.matched[o];a&&(e.matched.find(u=>Qe(u,a))||r.push(a))}return[t,s,r]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Fu=()=>location.protocol+"//"+location.host;function jo(n,e){const{pathname:t,search:s,hash:r}=e,i=n.indexOf("#");if(i>-1){let o=r.includes(n.slice(i))?n.slice(i).length:1,l=r.slice(o);return l[0]!=="/"&&(l="/"+l),si(l,"")}return si(t,n)+s+r}function ju(n,e,t,s){let r=[],i=[],o=null;const l=({state:p})=>{const g=jo(n,location),y=t.value,w=e.value;let C=0;if(p){if(t.value=g,e.value=p,o&&o===y){o=null;return}C=w?p.position-w.position:0}else s(g);r.forEach(L=>{L(t.value,y,{delta:C,type:Us.pop,direction:C?C>0?Es.forward:Es.back:Es.unknown})})};function a(){o=t.value}function u(p){r.push(p);const g=()=>{const y=r.indexOf(p);y>-1&&r.splice(y,1)};return i.push(g),g}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(K({},p.state,{scroll:fs()}),"")}}function f(){for(const p of i)p();i=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:a,listen:u,destroy:f}}function ai(n,e,t,s=!1,r=!1){return{back:n,current:e,forward:t,replaced:s,position:window.history.length,scroll:r?fs():null}}function Uu(n){const{history:e,location:t}=window,s={value:jo(n,t)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(a,u,c){const f=n.indexOf("#"),p=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+a:Fu()+n+a;try{e[c?"replaceState":"pushState"](u,"",p),r.value=u}catch(g){console.error(g),t[c?"replace":"assign"](p)}}function o(a,u){i(a,K({},e.state,ai(r.value.back,a,r.value.forward,!0),u,{position:r.value.position}),!0),s.value=a}function l(a,u){const c=K({},r.value,e.state,{forward:a,scroll:fs()});i(c.current,c,!0),i(a,K({},ai(s.value,a,null),{position:c.position+1},u),!1),s.value=a}return{location:s,state:r,push:l,replace:o}}function Vu(n){n=Ru(n);const e=Uu(n),t=ju(n,e.state,e.location,e.replace);function s(i,o=!0){o||t.pauseListeners(),history.go(i)}const r=K({location:"",base:n,go:s,createHref:Eu.bind(null,n)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function zu(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),Vu(n)}let Oe=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n}({});var pn=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n}(pn||{});const Gu={type:Oe.Static,value:""},qu=/[a-zA-Z0-9_]/;function Ku(n){if(!n)return[[]];if(n==="/")return[[Gu]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(g){throw new Error(`ERR (${t})/"${u}": ${g}`)}let t=pn.Static,s=t;const r=[];let i;function o(){i&&r.push(i),i=[]}let l=0,a,u="",c="";function f(){u&&(t===pn.Static?i.push({type:Oe.Static,value:u}):t===pn.Param||t===pn.ParamRegExp||t===pn.ParamRegExpEnd?(i.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Oe.Param,value:u,regexp:c,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=a}for(;l<n.length;){if(a=n[l++],a==="\\"&&t!==pn.ParamRegExp){s=t,t=pn.EscapeNext;continue}switch(t){case pn.Static:a==="/"?(u&&f(),o()):a===":"?(f(),t=pn.Param):p();break;case pn.EscapeNext:p(),t=s;break;case pn.Param:a==="("?t=pn.ParamRegExp:qu.test(a)?p():(f(),t=pn.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case pn.ParamRegExp:a===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+a:t=pn.ParamRegExpEnd:c+=a;break;case pn.ParamRegExpEnd:f(),t=pn.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--,c="";break;default:e("Unknown state");break}}return t===pn.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),f(),o(),r}const ci="[^/]+?",Ju={sensitive:!1,strict:!1,start:!0,end:!0};var Sn=function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n}(Sn||{});const Wu=/[.+*?^${}()[\]/\\]/g;function Yu(n,e){const t=K({},Ju,e),s=[];let r=t.start?"^":"";const i=[];for(const u of n){const c=u.length?[]:[Sn.Root];t.strict&&!u.length&&(r+="/");for(let f=0;f<u.length;f++){const p=u[f];let g=Sn.Segment+(t.sensitive?Sn.BonusCaseSensitive:0);if(p.type===Oe.Static)f||(r+="/"),r+=p.value.replace(Wu,"\\$&"),g+=Sn.Static;else if(p.type===Oe.Param){const{value:y,repeatable:w,optional:C,regexp:L}=p;i.push({name:y,repeatable:w,optional:C});const A=L||ci;if(A!==ci){g+=Sn.BonusCustomRegExp;try{`${A}`}catch(P){throw new Error(`Invalid custom RegExp for param "${y}" (${A}): `+P.message)}}let N=w?`((?:${A})(?:/(?:${A}))*)`:`(${A})`;f||(N=C&&u.length<2?`(?:/${N})`:"/"+N),C&&(N+="?"),r+=N,g+=Sn.Dynamic,C&&(g+=Sn.BonusOptional),w&&(g+=Sn.BonusRepeatable),A===".*"&&(g+=Sn.BonusWildcard)}c.push(g)}s.push(c)}if(t.strict&&t.end){const u=s.length-1;s[u][s[u].length-1]+=Sn.BonusStrict}t.strict||(r+="/?"),t.end?r+="$":t.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,t.sensitive?"":"i");function l(u){const c=u.match(o),f={};if(!c)return null;for(let p=1;p<c.length;p++){const g=c[p]||"",y=i[p-1];f[y.name]=g&&y.repeatable?g.split("/"):g}return f}function a(u){let c="",f=!1;for(const p of n){(!f||!c.endsWith("/"))&&(c+="/"),f=!1;for(const g of p)if(g.type===Oe.Static)c+=g.value;else if(g.type===Oe.Param){const{value:y,repeatable:w,optional:C}=g,L=y in u?u[y]:"";if(zn(L)&&!w)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const A=zn(L)?L.join("/"):L;if(!A)if(C)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):f=!0);else throw new Error(`Missing required param "${y}"`);c+=A}}return c||"/"}return{re:o,score:s,keys:i,parse:l,stringify:a}}function Zu(n,e){let t=0;for(;t<n.length&&t<e.length;){const s=e[t]-n[t];if(s)return s;t++}return n.length<e.length?n.length===1&&n[0]===Sn.Static+Sn.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Sn.Static+Sn.Segment?1:-1:0}function Uo(n,e){let t=0;const s=n.score,r=e.score;for(;t<s.length&&t<r.length;){const i=Zu(s[t],r[t]);if(i)return i;t++}if(Math.abs(r.length-s.length)===1){if(ui(s))return 1;if(ui(r))return-1}return r.length-s.length}function ui(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Qu={strict:!1,end:!0,sensitive:!1};function Xu(n,e,t){const s=Yu(Ku(n.path),t),r=K(s,{record:n,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function nf(n,e){const t=[],s=new Map;e=ti(Qu,e);function r(f){return s.get(f)}function i(f,p,g){const y=!g,w=di(f);w.aliasOf=g&&g.record;const C=ti(e,f),L=[w];if("alias"in f){const P=typeof f.alias=="string"?[f.alias]:f.alias;for(const Y of P)L.push(di(K({},w,{components:g?g.record.components:w.components,path:Y,aliasOf:g?g.record:w})))}let A,N;for(const P of L){const{path:Y}=P;if(p&&Y[0]!=="/"){const an=p.record.path,Z=an[an.length-1]==="/"?"":"/";P.path=p.record.path+(Y&&Z+Y)}if(A=Xu(P,p,C),g?g.alias.push(A):(N=N||A,N!==A&&N.alias.push(A),y&&f.name&&!hi(A)&&o(f.name)),Vo(A)&&a(A),w.children){const an=w.children;for(let Z=0;Z<an.length;Z++)i(an[Z],A,g&&g.children[Z])}g=g||A}return N?()=>{o(N)}:$t}function o(f){if(Bo(f)){const p=s.get(f);p&&(s.delete(f),t.splice(t.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=t.indexOf(f);p>-1&&(t.splice(p,1),f.record.name&&s.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function l(){return t}function a(f){const p=sf(f,t);t.splice(p,0,f),f.record.name&&!hi(f)&&s.set(f.record.name,f)}function u(f,p){let g,y={},w,C;if("name"in f&&f.name){if(g=s.get(f.name),!g)throw Xe(un.MATCHER_NOT_FOUND,{location:f});C=g.record.name,y=K(fi(p.params,g.keys.filter(N=>!N.optional).concat(g.parent?g.parent.keys.filter(N=>N.optional):[]).map(N=>N.name)),f.params&&fi(f.params,g.keys.map(N=>N.name))),w=g.stringify(y)}else if(f.path!=null)w=f.path,g=t.find(N=>N.re.test(w)),g&&(y=g.parse(w),C=g.record.name);else{if(g=p.name?s.get(p.name):t.find(N=>N.re.test(p.path)),!g)throw Xe(un.MATCHER_NOT_FOUND,{location:f,currentLocation:p});C=g.record.name,y=K({},p.params,f.params),w=g.stringify(y)}const L=[];let A=g;for(;A;)L.unshift(A.record),A=A.parent;return{name:C,path:w,params:y,matched:L,meta:tf(L)}}n.forEach(f=>i(f));function c(){t.length=0,s.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:c,getRoutes:l,getRecordMatcher:r}}function fi(n,e){const t={};for(const s of e)s in n&&(t[s]=n[s]);return t}function di(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:ef(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function ef(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const s in n.components)e[s]=typeof t=="object"?t[s]:t;return e}function hi(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function tf(n){return n.reduce((e,t)=>K(e,t.meta),{})}function sf(n,e){let t=0,s=e.length;for(;t!==s;){const i=t+s>>1;Uo(n,e[i])<0?s=i:t=i+1}const r=rf(n);return r&&(s=e.lastIndexOf(r,s-1)),s}function rf(n){let e=n;for(;e=e.parent;)if(Vo(e)&&Uo(n,e)===0)return e}function Vo({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function pi(n){const e=jn(ds),t=jn(hr),s=Tn(()=>{const a=hn(n.to);return e.resolve(a)}),r=Tn(()=>{const{matched:a}=s.value,{length:u}=a,c=a[u-1],f=t.matched;if(!c||!f.length)return-1;const p=f.findIndex(Qe.bind(null,c));if(p>-1)return p;const g=gi(a[u-2]);return u>1&&gi(c)===g&&f[f.length-1].path!==g?f.findIndex(Qe.bind(null,a[u-2])):p}),i=Tn(()=>r.value>-1&&uf(t.params,s.value.params)),o=Tn(()=>r.value>-1&&r.value===t.matched.length-1&&Ho(t.params,s.value.params));function l(a={}){if(cf(a)){const u=e[hn(n.replace)?"replace":"push"](hn(n.to)).catch($t);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:Tn(()=>s.value.href),isActive:i,isExactActive:o,navigate:l}}function of(n){return n.length===1?n[0]:n}const lf=to({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:pi,setup(n,{slots:e}){const t=rs(pi(n)),{options:s}=jn(ds),r=Tn(()=>({[$i(n.activeClass,s.linkActiveClass,"router-link-active")]:t.isActive,[$i(n.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const i=e.default&&of(e.default(t));return n.custom?i:Oo("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},i)}}}),af=lf;function cf(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function uf(n,e){for(const t in e){const s=e[t],r=n[t];if(typeof s=="string"){if(s!==r)return!1}else if(!zn(r)||r.length!==s.length||s.some((i,o)=>i.valueOf()!==r[o].valueOf()))return!1}return!0}function gi(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const $i=(n,e,t)=>n??e??t,ff=to({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const s=jn(zs),r=Tn(()=>n.route||s.value),i=jn(li,0),o=Tn(()=>{let u=hn(i);const{matched:c}=r.value;let f;for(;(f=c[u])&&!f.components;)u++;return u}),l=Tn(()=>r.value.matched[o.value]);Lt(li,Tn(()=>o.value+1)),Lt(Hu,l),Lt(zs,r);const a=pe();return Ce(()=>[a.value,l.value,n.name],([u,c,f],[p,g,y])=>{c&&(c.instances[f]=u,g&&g!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=g.leaveGuards),c.updateGuards.size||(c.updateGuards=g.updateGuards))),u&&c&&(!g||!Qe(c,g)||!p)&&(c.enterCallbacks[f]||[]).forEach(w=>w(u))},{flush:"post"}),()=>{const u=r.value,c=n.name,f=l.value,p=f&&f.components[c];if(!p)return mi(t.default,{Component:p,route:u});const g=f.props[c],y=g?g===!0?u.params:typeof g=="function"?g(u):g:null,C=Oo(p,K({},y,e,{onVnodeUnmounted:L=>{L.component.isUnmounted&&(f.instances[c]=null)},ref:a}));return mi(t.default,{Component:C,route:u})||C}}});function mi(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const df=ff;function hf(n){const e=nf(n.routes,n),t=n.parseQuery||Lu,s=n.stringifyQuery||oi,r=n.history,i=rt(),o=rt(),l=rt(),a=ia(be);let u=be;Ge&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=Rs.bind(null,v=>""+v),f=Rs.bind(null,vu),p=Rs.bind(null,kt);function g(v,O){let T,I;return Bo(v)?(T=e.getRecordMatcher(v),I=O):I=v,e.addRoute(I,T)}function y(v){const O=e.getRecordMatcher(v);O&&e.removeRoute(O)}function w(){return e.getRoutes().map(v=>v.record)}function C(v){return!!e.getRecordMatcher(v)}function L(v,O){if(O=K({},O||a.value),typeof v=="string"){const $=Ts(t,v,O.path),_=e.resolve({path:$.path},O),b=r.createHref($.fullPath);return K($,_,{params:p(_.params),hash:kt($.hash),redirectedFrom:void 0,href:b})}let T;if(v.path!=null)T=K({},v,{path:Ts(t,v.path,O.path).path});else{const $=K({},v.params);for(const _ in $)$[_]==null&&delete $[_];T=K({},v,{params:f($)}),O.params=f(O.params)}const I=e.resolve(T,O),z=v.hash||"";I.params=c(p(I.params));const d=yu(s,K({},v,{hash:$u(z),path:I.path})),h=r.createHref(d);return K({fullPath:d,hash:z,query:s===oi?Du(v.query):v.query||{}},I,{redirectedFrom:void 0,href:h})}function A(v){return typeof v=="string"?Ts(t,v,a.value.path):K({},v)}function N(v,O){if(u!==v)return Xe(un.NAVIGATION_CANCELLED,{from:O,to:v})}function P(v){return Z(v)}function Y(v){return P(K(A(v),{replace:!0}))}function an(v,O){const T=v.matched[v.matched.length-1];if(T&&T.redirect){const{redirect:I}=T;let z=typeof I=="function"?I(v,O):I;return typeof z=="string"&&(z=z.includes("?")||z.includes("#")?z=A(z):{path:z},z.params={}),K({query:v.query,hash:v.hash,params:z.path!=null?{}:v.params},z)}}function Z(v,O){const T=u=L(v),I=a.value,z=v.state,d=v.force,h=v.replace===!0,$=an(T,I);if($)return Z(K(A($),{state:typeof $=="object"?K({},z,$.state):z,force:d,replace:h}),O||T);const _=T;_.redirectedFrom=O;let b;return!d&&wu(s,I,T)&&(b=Xe(un.NAVIGATION_DUPLICATED,{to:_,from:I}),Jn(I,I,!0,!1)),(b?Promise.resolve(b):qn(_,I)).catch(m=>ce(m)?ce(m,un.NAVIGATION_GUARD_REDIRECT)?m:ve(m):q(m,_,I)).then(m=>{if(m){if(ce(m,un.NAVIGATION_GUARD_REDIRECT))return Z(K({replace:h},A(m.to),{state:typeof m.to=="object"?K({},z,m.to.state):z,force:d}),O||_)}else m=ke(_,I,!0,h,z);return _e(_,I,m),m})}function Gn(v,O){const T=N(v,O);return T?Promise.reject(T):Promise.resolve()}function me(v){const O=je.values().next().value;return O&&typeof O.runWithContext=="function"?O.runWithContext(v):v()}function qn(v,O){let T;const[I,z,d]=Bu(v,O);T=As(I.reverse(),"beforeRouteLeave",v,O);for(const $ of I)$.leaveGuards.forEach(_=>{T.push(ye(_,v,O))});const h=Gn.bind(null,v,O);return T.push(h),Mn(T).then(()=>{T=[];for(const $ of i.list())T.push(ye($,v,O));return T.push(h),Mn(T)}).then(()=>{T=As(z,"beforeRouteUpdate",v,O);for(const $ of z)$.updateGuards.forEach(_=>{T.push(ye(_,v,O))});return T.push(h),Mn(T)}).then(()=>{T=[];for(const $ of d)if($.beforeEnter)if(zn($.beforeEnter))for(const _ of $.beforeEnter)T.push(ye(_,v,O));else T.push(ye($.beforeEnter,v,O));return T.push(h),Mn(T)}).then(()=>(v.matched.forEach($=>$.enterCallbacks={}),T=As(d,"beforeRouteEnter",v,O,me),T.push(h),Mn(T))).then(()=>{T=[];for(const $ of o.list())T.push(ye($,v,O));return T.push(h),Mn(T)}).catch($=>ce($,un.NAVIGATION_CANCELLED)?$:Promise.reject($))}function _e(v,O,T){l.list().forEach(I=>me(()=>I(v,O,T)))}function ke(v,O,T,I,z){const d=N(v,O);if(d)return d;const h=O===be,$=Ge?history.state:{};T&&(I||h?r.replace(v.fullPath,K({scroll:h&&$&&$.scroll},z)):r.push(v.fullPath,z)),a.value=v,Jn(v,O,T,h),ve()}let Kn;function nt(){Kn||(Kn=r.listen((v,O,T)=>{if(!Se.listening)return;const I=L(v),z=an(I,Se.currentRoute.value);if(z){Z(K(z,{replace:!0,force:!0}),I).catch($t);return}u=I;const d=a.value;Ge&&Pu(ii(d.fullPath,T.delta),fs()),qn(I,d).catch(h=>ce(h,un.NAVIGATION_ABORTED|un.NAVIGATION_CANCELLED)?h:ce(h,un.NAVIGATION_GUARD_REDIRECT)?(Z(K(A(h.to),{force:!0}),I).then($=>{ce($,un.NAVIGATION_ABORTED|un.NAVIGATION_DUPLICATED)&&!T.delta&&T.type===Us.pop&&r.go(-1,!1)}).catch($t),Promise.reject()):(T.delta&&r.go(-T.delta,!1),q(h,I,d))).then(h=>{h=h||ke(I,d,!1),h&&(T.delta&&!ce(h,un.NAVIGATION_CANCELLED)?r.go(-T.delta,!1):T.type===Us.pop&&ce(h,un.NAVIGATION_ABORTED|un.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),_e(I,d,h)}).catch($t)}))}let Be=rt(),$n=rt(),nn;function q(v,O,T){ve(v);const I=$n.list();return I.length?I.forEach(z=>z(v,O,T)):console.error(v),Promise.reject(v)}function le(){return nn&&a.value!==be?Promise.resolve():new Promise((v,O)=>{Be.add([v,O])})}function ve(v){return nn||(nn=!v,nt(),Be.list().forEach(([O,T])=>v?T(v):O()),Be.reset()),v}function Jn(v,O,T,I){const{scrollBehavior:z}=n;if(!Ge||!z)return Promise.resolve();const d=!T&&Nu(ii(v.fullPath,0))||(I||!T)&&history.state&&history.state.scroll||null;return os().then(()=>z(v,O,d)).then(h=>h&&Ou(h)).catch(h=>q(h,v,O))}const An=v=>r.go(v);let Fe;const je=new Set,Se={currentRoute:a,listening:!0,addRoute:g,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:C,getRoutes:w,resolve:L,options:n,push:P,replace:Y,go:An,back:()=>An(-1),forward:()=>An(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:$n.add,isReady:le,install(v){v.component("RouterLink",af),v.component("RouterView",df),v.config.globalProperties.$router=Se,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>hn(a)}),Ge&&!Fe&&a.value===be&&(Fe=!0,P(r.location).catch(I=>{}));const O={};for(const I in be)Object.defineProperty(O,I,{get:()=>a.value[I],enumerable:!0});v.provide(ds,Se),v.provide(hr,Ki(O)),v.provide(zs,a);const T=v.unmount;je.add(v),v.unmount=function(){je.delete(v),je.size<1&&(u=be,Kn&&Kn(),Kn=null,a.value=be,Fe=!1,nn=!1),T()}}};function Mn(v){return v.reduce((O,T)=>O.then(()=>me(T)),Promise.resolve())}return Se}function pf(){return jn(ds)}function hs(n){return jn(hr)}const Gs=[{text:"入门",items:[{text:"概述",link:"/v1.0/"},{text:"词法结构",link:"/v1.0/lexical"},{text:"类型系统",link:"/v1.0/types"},{text:"变量与赋值",link:"/v1.0/variables"},{text:"表达式与运算符",link:"/v1.0/expressions"},{text:"控制流",link:"/v1.0/control-flow"},{text:"词条系统",link:"/v1.0/entries"},{text:"JSON 数据处理",link:"/v1.0/json"},{text:"面向对象编程",link:"/v1.0/oop"},{text:"模块与引入",link:"/v1.0/modules"},{text:"函数",link:"/v1.0/functions"},{text:"内置函数",children:[{text:"回调",link:"/v1.0/flow-callback"},{text:"主回调",link:"/v1.0/flow-main-callback"},{text:"打印",link:"/v1.0/output-print"},{text:"打印返回",link:"/v1.0/output-print-return"},{text:"服务器",link:"/v1.0/server"},{text:"对象创建",link:"/v1.0/object"}]},{text:"标准库",children:[{text:"字符串",link:"/v1.0/string"},{text:"数学",link:"/v1.0/math"},{text:"网络",link:"/v1.0/network"},{text:"类型",link:"/v1.0/type"},{text:"文件",link:"/v1.0/file"},{text:"画布",link:"/v1.0/canvas"}]}]}];function zo(n){const e=[];for(const t of n)t.link&&!t.children?e.push(t):t.children&&(t.link&&e.push({text:t.text,link:t.link}),e.push(...zo(t.children)));return e}const Ct=Gs.flatMap(n=>zo(n.items));function gf(){const n=hs(),e=Tn(()=>Ct.findIndex(r=>r.link.split("#")[0]===n.path)),t=Tn(()=>e.value>0?Ct[e.value-1]:null),s=Tn(()=>e.value<Ct.length-1?Ct[e.value+1]:null);return{prev:t,next:s}}const De=(n,e)=>{const t=n.__vccOpts||n;for(const[s,r]of e)t[s]=r;return t},$f={class:"sidebar-nav"},mf={class:"sidebar-section-title"},_f=["href"],vf=["href"],bf={key:1,class:"sidebar-section-title"},xf=["href"],yf={class:"sidebar-sub-title"},wf={class:"sidebar-sub-group"},kf=["href"],Sf=["href"],Rf={key:2,class:"sidebar-sub-title"},Tf={__name:"Sidebar",setup(n){const e=hs();function t(r){const i=r.indexOf("#"),o=i>=0?r.substring(0,i):r,l=i>=0?r.substring(i):"";return"#"+o+l}function s(r){const[i,o]=r.split("#");return o?e.path===i&&e.hash==="#"+o:e.path===i&&!e.hash}return(r,i)=>(j(),U("nav",$f,[(j(!0),U(cn,null,Ae(hn(Gs),(o,l)=>(j(),U("div",{key:o.text,class:Bn(["sidebar-group",{"has-divider":l<hn(Gs).length-1}])},[V("p",mf,vn(o.text),1),(j(!0),U(cn,null,Ae(o.items,a=>(j(),U(cn,{key:a.link||a.text},[a.link&&!a.children?(j(),U("a",{key:0,href:t(a.link),class:Bn(["sidebar-link","sidebar-link-sub",{active:s(a.link)}])},vn(a.text),11,_f)):(j(),U(cn,{key:1},[a.link?(j(),U("a",{key:0,href:t(a.link),class:Bn(["sidebar-section-title","sidebar-section-link",{active:s(a.link)}])},vn(a.text),11,vf)):(j(),U("p",bf,vn(a.text),1)),(j(!0),U(cn,null,Ae(a.children||[],u=>(j(),U(cn,{key:u.link||u.text},[u.link&&!u.children?(j(),U("a",{key:0,href:t(u.link),class:Bn(["sidebar-link","sidebar-link-sub",{active:s(u.link)}])},vn(u.text),11,xf)):u.children?(j(),U(cn,{key:1},[V("p",yf,vn(u.text),1),V("div",wf,[(j(!0),U(cn,null,Ae(u.children,c=>(j(),U(cn,{key:c.link||c.text},[c.link&&!c.children?(j(),U("a",{key:0,href:t(c.link),class:Bn(["sidebar-link","sidebar-link-fn",{active:s(c.link)}])},vn(c.text),11,kf)):c.children&&c.link?(j(),U("a",{key:1,href:t(c.link),class:Bn(["sidebar-link","sidebar-link-fn",{active:s(c.link)}])},vn(c.text),11,Sf)):c.children?(j(),U("p",Rf,vn(c.text),1)):Ie("",!0)],64))),128))])],64)):Ie("",!0)],64))),128))],64))],64))),128))],2))),128))]))}},Ef=De(Tf,[["__scopeId","data-v-3b852181"]]),Af={key:0,class:"right-nav"},Of=["onClick"],Pf={__name:"RightNav",setup(n){const e=hs(),t=pf(),s=pe([]),r=pe("");let i=[],o=!1;function l(){const f=document.querySelector(".markdown-body");if(!f){s.value=[],i=[];return}i=Array.from(f.querySelectorAll("h2[id], h3[id]")),s.value=i.map(p=>({id:p.id,text:p.textContent,tag:p.tagName}))}function a(f){t.replace({hash:"#"+f});const p=document.getElementById(f);p&&p.scrollIntoView({behavior:"smooth",block:"start"})}function u(){if(!i.length)return;let f=i[0].id;for(const p of i)p.getBoundingClientRect().top<=120&&(f=p.id);r.value=f}function c(){o||(requestAnimationFrame(()=>{u(),o=!1}),o=!0)}return Ce(()=>e.path,l,{immediate:!0,flush:"post"}),oo(()=>window.addEventListener("scroll",c,{passive:!0})),cr(()=>window.removeEventListener("scroll",c)),(f,p)=>s.value.length?(j(),U("nav",Af,[(j(!0),U(cn,null,Ae(s.value,g=>(j(),U("a",{key:g.id,href:"javascript:void(0)",class:Bn(["right-nav-link",{active:r.value===g.id},g.tag==="H3"?"sub":""]),onClick:y=>a(g.id)},vn(g.text),11,Of))),128))])):Ie("",!0)}},Nf=De(Pf,[["__scopeId","data-v-e8c3bd07"]]),Go=`# @画布

标准库 | 共 29 个函数。画布模块提供像素级图像创建、绘制、特效处理。基于内存像素缓冲区，通过句柄（handle）管理多画布实例。\`$创建画布$\` 返回画布句柄，需自行赋值给变量（如 \`画:$创建画布 800 600$\`），后续操作通过该句柄引用画布。使用前需 \`#引入=@画布\`。

## 画布生命周期

画布的完整生命周期为三个阶段：

1. **创建（Create）**：通过 \`$创建画布$\` 分配内存像素缓冲区，返回句柄。此时可指定宽高和背景色。
2. **绘制（Draw）**：通过 \`$绘制.xxx$\` 系列函数在缓冲区上绘制图形、文本、图片。所有绘制操作即时生效，顺序决定层叠关系（后绘制覆盖先绘制）。
3. **获取（Get）**：通过 \`$画布.获取$\` 将像素缓冲区编码为 PNG 格式输出。获取后画布仍可继续修改，但通常此时即为最终结果。

画布句柄在脚本执行期间持续有效，脚本结束后自动释放。同一脚本可同时持有多个画布句柄。

<a id="canvas-create"></a>

### \`$创建画布$\` — 创建画布

- **格式**：\`$创建画布 [width] [height] [bgColor]$\`
- **参数**：宽度、高度、可选的背景色（默认白色）
- **返回值**：画布句柄

分配内存像素缓冲区，返回画布句柄。背景色支持预定义颜色名、十六进制、RGB 格式。

\`\`\`
$创建画布 800 600$           → 白色背景
$创建画布 800 600 红色$         → 红色背景
$创建画布 300 200 #FFFFFF$     → 十六进制背景色
$创建画布 300 200 255,0,0$     → RGB 背景色
\`\`\`

<a id="canvas-get"></a>

### \`$画布.获取$\` — 获取画布输出

- **格式**：\`$画布.获取 [handle] [format]$\`
- **参数**：画布句柄、可选的输出格式（默认 PNG；支持 \`"png"\`、\`"jpeg"\`、\`"raw"\`）
- **返回值**：编码的像素数据（PNG、JPEG 或原始 RGBA 字节）

将像素缓冲区编码输出。\`"raw"\` 格式返回原始 RGBA 像素缓冲区字节。

\`\`\`
img:$画布.获取 %画%$
\`\`\`

## 画笔设置

### 颜色格式参考

画布模块支持以下颜色格式：

| 格式 | 示例 | 说明 |
| --- | --- | --- |
| 预定义颜色名 | \`红色\`、\`蓝色\`、\`绿色\`、\`黄色\`、\`黑色\`、\`白色\`、\`随机\` | 引擎内置颜色常量，"随机"每次生成不同颜色 |
| 十六进制 | \`#FF6600\`、\`#FFF\` | 标准 HTML 颜色格式，支持 6 位和 3 位缩写 |
| RGB | \`255,0,0\`、\`128,64,32\` | 三个 0-255 的整数，逗号分隔 |
| RGBA | \`255,0,0,128\` | RGB + Alpha（0-255），Alpha=0 完全透明 |

<a id="canvas-set-color"></a>

### \`$画笔.设置颜色$\` — 设置画笔颜色

- **格式**：\`$画笔.设置颜色 [handle] [color]$\`
- **参数**：画布句柄、颜色
- **返回值**：无

设置当前画布的画笔颜色，后续绘制操作使用该颜色。

\`\`\`
$画笔.设置颜色 %_% 红色$
$画笔.设置颜色 %_% #FF6600$
$画笔.设置颜色 %_% 128,64,32$
$画笔.设置颜色 %_% 随机$
\`\`\`

### \`$画笔.获取颜色$\` — 获取画笔颜色

- **格式**：\`$画笔.获取颜色 [handle]$\`
- **参数**：画布句柄
- **返回值**：当前颜色（RGBA 格式，如 "255,0,0,255"）

\`\`\`
c:$画笔.获取颜色 %_%$            → "255,0,0,255"
\`\`\`

### \`$画笔.大小$\` — 设置画笔大小

- **格式**：\`$画笔.大小 [handle] [size]$\`
- **参数**：画布句柄、画笔粗细
- **返回值**：无

设置画笔粗细，影响线条宽度和描边厚度。

\`\`\`
$画笔.大小 %_% 3$
\`\`\`

## 基本绘制

### \`$绘制.点$\` — 绘制像素点

- **格式**：\`$绘制.点 [handle] [x] [y] [color]$\`
- **参数**：画布句柄、x 坐标、y 坐标、可选的颜色
- **返回值**：无

算法：直接设置目标坐标 (x, y) 的像素颜色。若坐标超出画布范围则忽略。

<a id="canvas-line"></a>

### \`$绘制.线$\` — 绘制线段

- **格式**：\`$绘制.线 [handle] [x1] [y1] [x2] [y2] [color]$\`
- **参数**：画布句柄、起点坐标、终点坐标、可选的颜色
- **返回值**：无

算法：使用 Bresenham 直线算法绘制线段，画笔大小影响线宽。

\`\`\`
$绘制.线 %_% 0 0 200 200$
\`\`\`

<a id="canvas-rect"></a>

### \`$绘制.方形$\` — 绘制填充矩形

- **格式**：\`$绘制.方形 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、左上角 x、左上角 y、宽度、高度、可选的颜色
- **返回值**：无

算法：以 (x, y) 为左上角，填充宽 w × 高 h 的矩形区域。

\`\`\`
$绘制.方形 %_% 50 50 100 80$
$绘制.方形 %_% 50 50 100 80 蓝色$
\`\`\`

### \`$绘制.方形描边$\` — 绘制矩形描边

- **格式**：\`$绘制.方形描边 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、左上角 x、左上角 y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制矩形轮廓线，不填充内部。画笔大小影响边框厚度。

\`\`\`
$绘制.方形描边 %_% 200 100 150 100$
\`\`\`

## 椭圆与圆形

<a id="canvas-ellipse"></a>

### \`$绘制.椭圆$\` — 绘制填充椭圆

- **格式**：\`$绘制.椭圆 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

算法：使用中点椭圆算法（Midpoint Ellipse Algorithm）绘制填充椭圆。当 w = h 时为圆形。

\`\`\`
$绘制.椭圆 %_% 100 100 200 150$
$绘制.椭圆 %_% 100 100 100 100 红色$    → 圆形
\`\`\`

### \`$绘制.椭圆描边$\` — 椭圆描边

- **格式**：\`$绘制.椭圆描边 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制椭圆轮廓线，不填充内部。画笔大小影响边框厚度。

### \`$绘制.圆形$\` — 绘制填充圆形

- **格式**：\`$绘制.圆形 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

在指定外接矩形内绘制填充圆形。

### \`$绘制.圆形描边$\` — 圆形描边

- **格式**：\`$绘制.圆形描边 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制圆形轮廓线，不填充内部。

### \`$绘制.圆弧$\` — 绘制圆弧

- **格式**：\`$绘制.圆弧 [handle] [cx] [cy] [radius] [startDeg] [endDeg] [color]$\`
- **参数**：画布句柄、圆心坐标 x、y、半径、起始角度、终止角度、可选的颜色
- **返回值**：无

角度制参数指定起止角度，从 3 点钟方向顺时针绘制。

\`\`\`
$绘制.圆弧 %_% 100 100 50 0 180$
$绘制.圆弧 %_% 100 100 50 0 180 蓝色$
\`\`\`

## 多边形

### \`$绘制.多边形$\` — 绘制填充多边形

- **格式**：\`$绘制.多边形 [handle] [x,y] [x,y] [...] [color]$\`
- **参数**：画布句柄、顶点坐标列表、可选的颜色
- **返回值**：无

算法：使用扫描线填充算法（Scanline Fill）。按顺序连接各顶点形成闭合多边形路径，内部区域均匀填充。

\`\`\`
$绘制.多边形 %_% 100,50 200,50 250,150 150,200 50,150$
$绘制.多边形 %_% 100,50 200,50 150,150 红色$     → 三角形
\`\`\`

### \`$绘制.多边形描边$\` — 绘制多边形描边

- **格式**：\`$绘制.多边形描边 [handle] [x,y] [x,y] [...] [color]$\`
- **参数**：画布句柄、顶点坐标列表、可选的颜色
- **返回值**：无

仅绘制多边形轮廓线，不填充内部。

## 特效绘制

### \`$绘制.喷漆$\` — 喷漆特效

- **格式**：\`$绘制.喷漆 [handle] [x1] [y1] [x2] [y2] [rangeRadius] [density] [color] [pointRadius]$\`
- **参数**：画布句柄、起点、终点、喷洒范围半径（默认 max(画布大小, 3)）、密度 1-100（默认 50）、颜色（默认当前画笔颜色）、点半径（默认 1）
- **返回值**：无

算法：在连接起点和终点的线段上，以指定的喷洒范围和密度，随机散布像素点。模拟喷漆罐的喷洒效果。

### \`$绘制.波浪$\` — 波浪线

- **格式**：\`$绘制.波浪 [handle] [x1] [y1] [x2] [y2] [amplitude] [frequency] [width]$\`
- **参数**：画布句柄、起点、终点、可选的振幅、频率、线宽
- **返回值**：无

算法：沿连接两点之间的线段绘制正弦波曲线，振幅和频率可调。

\`\`\`
$绘制.波浪 %_% 50 200 300 200$
$绘制.波浪 %_% 50 200 300 200 10 30 3$
\`\`\`

### \`$绘制.油漆桶$\` — 泛洪填充

- **格式**：\`$绘制.油漆桶 [handle] [x] [y] [color]$\`
- **参数**：画布句柄、起始坐标、填充颜色
- **返回值**：无

算法：基于广度优先搜索（BFS）的泛洪填充。从指定起点像素开始，将颜色相同且连通的相邻像素全部替换为目标颜色。

\`\`\`
$绘制.方形描边 %_% 100 100 50 50$
$绘制.油漆桶 %_% 120 120 红色$
\`\`\`

### \`$绘制.随机点$\` / \`$绘制.随机线条$\` — 随机点/线条

- **格式**：\`$绘制.随机点 [handle] [density] [color]$\` / \`$绘制.随机线条 [handle] [density] [color]$\`
- **参数**：画布句柄、密度、可选的颜色
- **返回值**：无

算法：在画布上随机位置生成点或线条，数量由密度参数控制。用于生成噪点、星空等随机纹理效果。

## 文本与图片

<a id="canvas-text"></a>

### \`$绘制.文本$\` — 绘制文本

- **格式**：\`$绘制.文本 [handle] [x] [y] [text] [color] [strokeColor]$\`
- **参数**：画布句柄、x 坐标、y 坐标、文本内容、可选的颜色、可选的描边颜色
- **返回值**：无

算法：使用引擎内置的位图字体将文本渲染为像素。支持可选的描边颜色参数。

\`\`\`
$绘制.文本 %_% 50 50 Hello 黑色$
$绘制.文本 %_% 100 100 Rotated 黑色 红色$
\`\`\`

<a id="canvas-image"></a>

### \`$绘制.图片$\` — 绘制图片

- **格式**：\`$绘制.图片 [handle] [srcCanvasOrData] [x] [y] [alpha]$\`
- **参数**：画布句柄、源画布句柄或 Base64 图片数据、左上角 x、y、可选的透明度
- **返回值**：无

算法：将源画布或 Base64 编码的图片数据逐像素复制到目标画布的指定区域。支持 alpha 混合。

\`\`\`
$绘制.图片 %_% %srcCanvas% 50 50$
$绘制.图片 %_% %srcCanvas% 50 50 128$
\`\`\`

## 特效处理

### \`$画布.旋转$\` — 旋转画布

- **格式**：\`$画布.旋转 [handle] [degrees] [bgColor]$\`
- **参数**：画布句柄、旋转角度、可选的背景色
- **返回值**：无

算法：按角度对整个画布像素矩阵做仿射变换，空白区域用背景色填充。

\`\`\`
$画布.旋转 %_% 90 白色$
\`\`\`

### \`$画布.圆形$\` — 圆角裁剪

- **格式**：\`$画布.圆形 [handle] [radius] [bgColor]$\`
- **参数**：画布句柄、圆角半径、可选的背景色
- **返回值**：无

将画布裁剪为圆角矩形。

### \`$画布.灰度$\` — 灰度化

- **格式**：\`$画布.灰度 [handle]$\`
- **参数**：画布句柄
- **返回值**：无

算法：取 RGB 加权平均值（亮度公式）将画布转为灰度。

\`\`\`
$画布.灰度 %_%$
\`\`\`

### \`$画布.马赛克$\` — 全图马赛克特效

- **格式**：\`$画布.马赛克 [handle] [blockSize]$\`
- **参数**：画布句柄、马赛克块大小
- **返回值**：无

算法：对整个画布按指定块大小对像素取均值，产生马赛克效果。

\`\`\`
$画布.马赛克 %_% 16$
\`\`\`

### \`$绘制.马赛克$\` — 区域马赛克特效

- **格式**：\`$绘制.马赛克 [handle] [x] [y] [w] [h] [blockSize]$\`
- **参数**：画布句柄、区域左上角 x、y、宽度、高度、马赛克块大小
- **返回值**：无

算法：对指定矩形区域按块大小对像素取均值，产生马赛克效果。

\`\`\`
$绘制.马赛克 %_% 50 50 200 150 16$
\`\`\`

### \`$绘制.高斯模糊$\` — 高斯模糊

- **格式**：\`$绘制.高斯模糊 [handle] [x] [y] [w] [h]$\`
- **参数**：画布句柄、模糊区域左上角 x、y、宽度、高度
- **返回值**：无

算法：对指定矩形区域使用高斯核卷积实现平滑模糊效果。

\`\`\`
$绘制.高斯模糊 %_% 50 50 200 150$
\`\`\`

## 完整示例

\`\`\`
#引入=@画布

[函数]画三角形
$创建画布 600 400$
$画笔.大小 %_% 3$
$画笔.设置颜色 %_% 红色$
$绘制.多边形描边 %_% 300,50 550,350 50,350$
$画笔.设置颜色 %_% 黄色$
$绘制.多边形 %_% 300,80 500,320 100,320$
$绘制.文本 %_% Triangle 230 180 14 黑色$
$绘制.波浪 %_% 50 50 550 50 5 30 3$
$画布.获取 %_%$
\`\`\`

## 性能提示

画布内存占用 = 宽度 × 高度 × 4 字节（RGBA）。大画布（如 4096×4096）可能占用 64MB 以上内存。建议：

- 普通场景画布控制在 1920×1080 以内
- \`$绘制.高斯模糊$\` 和 \`$画布.旋转$\` 等全画布操作在大画布上性能开销较大，每帧建议不超过数次
- \`$绘制.油漆桶$\` 的 BFS 泛洪填充在连通区域极大时可能触发栈/队列增长，极端情况下可能导致 OOM
- 使用完毕的句柄建议复用（覆盖绘制）而非反复创建新画布，以减少内存分配

> 画布句柄在脚本期间持续有效，脚本结束后自动释放。颜色支持预定义名、十六进制、RGB、RGBA 四种格式。所有绘制操作即时生效，顺序决定层叠关系。图像处理性能受画布尺寸影响较大，建议合理控制画布大小。

[← @类型](./type)

[文件操作 →](./file)
`,qo=`# 控制流

控制流决定了 NR 代码的执行路径。本章涵盖条件分支（\`如果\`/\`if\`）、三种循环结构、中断跳转指令以及标签与 goto 机制。控制流语句依赖于 [表达式与运算符](./expressions) 中定义的比较和逻辑运算来做出决策。

## 条件分支

\`\`\`
如果:%score%>=90
优秀
否则如果:%score%>=60
及格
否则
不及格
如果尾

if:%score%>=90
A
elif:%score%>=60
B
else
C
end
\`\`\`

| 关键字 | 作用 |
|--------|------|
| \`如果:条件\` / \`if:条件\` | 开启分支 |
| \`否则如果:条件\` / \`elif:条件\` | 添加新分支 |
| \`否则\` / \`else\` | 默认分支 |
| \`如果尾\` / \`end\` | 关闭分支 |

支持嵌套。

### 使用场景与注意事项

- 中文关键字（\`如果\`/\`否则如果\`/\`否则\`/\`如果尾\`）和英文关键字（\`if\`/\`elif\`/\`else\`/\`end\`）功能完全等价，可混用（不推荐）。
- 每个 \`如果\`/\`if\` 必须以 \`如果尾\`/\`end\` 显式关闭，不支持省略。
- **嵌套分支**时的缩进是可选的——解析器通过 \`如果尾\`/\`end\` 配对来确定结构，而不是缩进。
- 条件表达式自身的求值规则参见 [表达式 § 比较运算符](./expressions) 和 [类型系统 § 布尔值](./types)。

## 循环

NR 提供三种循环结构，分别适用于不同场景：

### 计数循环

\`\`\`
循环>i=3           ← i 为循环变量，3 次
第 %i% 行
<循环

循环>j             ← 无限循环（需中断指令退出）
%j%
<循环
\`\`\`

循环变量可在循环体内修改以实现自定义步长。

**使用场景**：计数循环适用于"重复 N 次"的场景——生成列表、批量调用、分页等。循环变量 \`i\` 从 1 开始自动递增到 N。

### 条件循环

\`\`\`
循环>%i%<=100      ← 每轮重新计算条件
第 %i% 行
i+:[%i%+1]         ← 手动递增
<循环
\`\`\`

\`循环>\` 后跟比较表达式（含 \`<=\` \`>=\` \`<\` \`>\` \`!=\` \`==\`）时，每轮重算条件。

**使用场景**：条件循环（类似 \`while\`）适用于"当某条件满足时持续"的场景——迭代直到某个值的变化、等待异步结果、处理前未知循环次数的操作。注意需要在循环体内手动更新条件变量，否则会变成无限循环。

### 遍历循环

\`\`\`
遍历>key,val=%data%
%key%:%val%
<遍历

遍历>item=%list%
%item%
<遍历
\`\`\`

- 逗号分隔：第一个变量为键/索引，第二个为值
- 数据源：JSON 数组、对象或变量引用

**使用场景**：遍历循环（类似 \`for...in\`）适用于处理 JSON 数据——渲染对象属性列表、遍历数组元素、处理 API 返回的集合数据。

## 中断与跳转指令

| 指令 | 语义 |
|------|------|
| \`>终止\` | 停止所有执行 |
| \`>终止 msg\` | 停止并输出 msg |
| \`>跳过\` | 跳过当前循环体 / 分支体剩余部分 |
| \`>终止循环\` / \`>跳出\` | 跳出计数循环 / 条件循环 |
| \`>终止遍历\` | 跳出遍历循环 |

### 嵌套循环中的 break/continue 行为

中断指令只作用于**最内层**循环：

\`\`\`
循环>i=3           ← 外层循环
  循环>j=10         ← 内层循环
    >跳出            ← 只跳出内层 j 循环，外层 i 继续
  <循环
<循环
\`\`\`

- \`>跳过\`：跳过当前循环体剩余行，进入下一轮迭代（仅最内层）。
- \`>终止循环\`/\`>跳出\`：完全退出当前计数/条件循环（仅最内层）。
- \`>终止遍历\`：完全退出当前遍历循环（仅最内层）。
- \`>终止\`（不带参数）：停止**所有**执行，不限于当前循环。

如需从内层循环中跳出外层循环，可以使用标签 + \`goto\` 指令（参见[标签与 goto](#_5-4-标签与-goto)）。

## 标签与 goto

使用 Go 风格标签替代传统行号跳转。

### 定义标签

\`\`\`
:start
内容行
\`\`\`

以 \`:\` 开头、仅含字母/数字/下划线的行被视为标签。标签不产生输出。

### 跳转到标签

\`\`\`
goto start
\`\`\`

\`\`\`
[函数]flow x
第一行
goto skip_middle
第二行           ← 被跳过
第三行           ← 被跳过
:skip_middle
第四行：%x%     ← 从这里继续
\`\`\`

**跨函数 goto**：子函数中的 \`goto label\` 可跳转到父调用方的同名标签，通过 \`external_labels\` 机制层层向上传播。

### goto 安全注意事项

- **使用 goto 时要极其谨慎**：滥用 goto 会导致代码逻辑难以理解和维护。在绝大多数情况下，条件分支和循环结构已经足够。
- **合法使用场景**：从深层嵌套中跳转退出、跳出多重嵌套循环、错误处理阶段的统一跳转。
- **避免**：用 goto 替代正常循环、在函数间随意跳转造成执行上下文混乱、跳转到未定义的标签（运行时错误）。
- 标签在同一个函数内的解析范围是**整个函数**，不局限于定义位置之后——函数头也可以 \`goto\` 到函数体末端的标签。
- 跨函数 goto 会传播到所有祖先调用者，直到找到匹配标签。如果最顶层也没找到，将产生运行时错误。
`,Ko=`# 词条系统

词条（Entry）是 NR 语言最核心的抽象概念。本章涵盖词条的定义、匹配机制、普通词条与内部词条的区别，以及与 OOP 类词条的配合方式。

- **词条（Entry）**：NR 文件词条区域中定义的一条 **触发词 → 响应内容** 映射规则。
- **词条区域**：\`.nr\` 文件头部空行之后的部分，由一系列词条组成。
- **匹配引擎**：当用户输入（或系统内部调用）命中触发词时执行对应词条内容并返回输出。

NR 的词条系统本质上是一个**模式匹配引擎**，支持三种词条类型：

- **普通词条**：直接参与主触发词匹配，是 NR 的核心交互机制
- **内部词条**（\`[内部]\` / \`[L]\`）：不参与主触发匹配，只能通过 \`$回调$\` 显式调用
- **类内部词条**（\`[L:类名]\`）：绑定到特定 OOP 类，在对应类上下文中优先匹配

## 词条匹配原理

当 NR 引擎收到触发输入（用户消息、HTTP 请求路径、TCP 首行等）时，按以下顺序匹配词条：

1. **精确匹配**：查找完全相同的普通词条触发词
2. **正则匹配**：按定义顺序遍历带正则的触发词（如 \`订单\\d+\`）
3. **默认匹配**：若存在触发词为 \`*\` 的词条，作为兜底匹配

匹配成功后，引擎在**当前变量上下文**中执行词条内容，所有 \`%变量%\` 替换和 \`$函数调用$\` 均在当前上下文中求值。

> **注意事项**
> - 触发词**大小写不敏感**（默认行为），"Hello" 和 "hello" 视为相同触发词
> - 如果同时存在精确匹配和正则匹配的词条，**精确匹配优先**
> - 多个正则词条可能同时匹配同一输入——**先定义先匹配**
> - 触发词中可以包含空格和中文字符，无特殊限制
> - 词条内容中的空白行用于分隔词条，因此内容区域不要出现空行；如需空行效果可查看多行字符串语法

## 普通词条

普通词条是 NR 中最常用的词条形式。它们位于文件的词条区域中，直接被引擎用于响应外部输入。每个普通词条的第一行为触发词，后续行直到空行为止都是词条内容。

\`\`\`
你好
你好，很高兴认识你！

再见
拜拜！
\`\`\`

- 第一行为**触发词**，后续行为**词条内容**
- 空行表示词条结束
- 词条内容可以包含变量替换（\`%变量%\`）和函数调用（\`$函数$\`）
- 词条内容中的非 \`$...$\` 普通文本，将在词条匹配后作为输出直接返回

### 带正则的触发词

触发词可以包含正则表达式，用于灵活匹配一类输入：

\`\`\`
订单\\d+
您查询的是订单 %触发%，正在为您处理……

删除 (.*)
确认删除 %括号1% 吗？
\`\`\`

- 正则捕获组 \`(.*)\` 的结果存入 \`%括号1%\`、\`%括号2%\`…
- 整个匹配到的触发词可通过 \`%触发%\` 获取
- 正则词条按定义顺序匹配，建议将更具体的正则放在前面

## 内部词条 \`[内部]\` / \`[L]\` / \`[L:类名]\`

内部词条不参与主触发匹配，只能被 \`$回调$\` 显式调用。它们用于封装可复用的子流程，类似于"私有函数"的概念。

\`\`\`
[内部]say_hello
你好，%参数1%！

[L]calc           ← [L] 是 [内部] 的简写
结果是 [%a%+%b%]

[L:Counter]match  ← [L:类名] 定义类专用内部词条
类内部匹配成功
\`\`\`

- 触发词支持正则（如 \`a.*\`），匹配后 \`%括号1%\`、\`%括号2%\` 捕获分组
- \`[L:ClassName]\` 形式的触发词存储为 \`ClassName.TriggerText\`，在 OOP 上下文中优先匹配
- 内部词条在**新的子上下文**中执行，不会污染调用者的变量空间
- 参数通过 \`$回调 pattern arg1 arg2$\` 传递，在内部词条中通过 \`%参数1%\`、\`%参数2%\` 访问

### 普通词条 vs 内部词条 对比

| 特性 | 普通词条 | 内部词条 |
|------|----------|----------|
| 主触发匹配 | ✅ 参与 | ❌ 不参与 |
| 调用方式 | 用户输入 / \`$主回调$\` | \`$回调$\` |
| 执行上下文 | 当前上下文 | 新子上下文 |
| 定义语法 | 直接写触发词 | \`[内部]\` / \`[L]\` |
| 典型用途 | 响应用户输入 | 内部子流程复用 |

关于 \`$回调$\` 和 \`$主回调$\` 的详细用法，参见[流程控制](./flow-output)。
`,Jo='# 表达式与运算符\n\n表达式是 NR 中执行计算和逻辑判断的核心机制。本章涵盖数学表达式 `[...]`、比较运算符、逻辑运算符及其优先级规则。理解运算符的优先级、结合性和类型转换行为，对于编写正确的 [条件判断](./control-flow) 和[变量赋值](./variables)至关重要。\n\nNR 的运算符体系分为三个层级：**数学运算符**（在 `[...]` 内使用）、**比较运算符**和**逻辑运算符**。它们在表达式中按固定的优先级顺序求值。\n\n## 数学表达式 `[...]`\n\n```\nresult:[1+2*3]              → "7"\nscore:[%base%*2+10]\n```\n\n### 运算符优先级总表（从高到低）\n\n| 优先级 | 类别 | 运算符 | 结合性 | 说明 |\n|--------|------|--------|--------|------|\n| 1（最高） | 分组 | `()` | — | 括号分组 |\n| 2 | 一元 | `-` | 右→左 | 一元负号 |\n| 3 | 幂 | `^` | 右→左 | 幂运算（`2^3^2 = 2^9 = 512`） |\n| 4 | 乘除取余 | `*` `/` `%` | 左→右 | 乘、除、取余 |\n| 5 | 加减 | `+` `-` | 左→右 | 加、减 |\n| 6 | 位移 | `<<` `>>` | 左→右 | 左移、右移 |\n| 7 | 比较 | `>=` `<=` `>` `<` `==` `!=` `===` `!==` `~=` `in` | — | 比较运算（非数学表达式） |\n| 8 | 逻辑 AND | `&&` `&` | 左→右（短路） | 逻辑与 |\n| 9（最低） | 逻辑 OR | `\\|\\|` `\\|` | 左→右（短路） | 逻辑或 |\n\n**结合性说明**：\n\n- **左结合**（左→右）：`a / b / c` 解释为 `(a / b) / c`\n- **右结合**（右→左）：`- -x` 解释为 `-(-x)`；`2^3^2` 解释为 `2^(3^2)`\n\n注意：比较和逻辑运算符不在 `[...]` 数学表达式中使用——它们出现在条件语句（`如果:`、`循环>`）和 `$if$` 等结构中。数学表达式 `[...]` 内部仅使用优先级 1-6 的运算符。\n\n- 整数运算结果仍为整数，浮点数参与则为浮点\n- 位运算和幂运算强制转整数\n\n### 混合类型运算的边界情况\n\n当数学表达式中混合不同类型的操作数时，结果遵循以下规则：\n\n```\n// 类型提升示例\n[1+2.0]        → 3.0   （Int + Float → Float）\n[3/2]          → 1     （Int 除法，截断）\n[3/2.0]        → 1.5   （Float 除法）\n\n// 边界情况\n[1/0]          → 报错（整数除零）\n[1.0/0.0]      → inf   （浮点除零，返回无穷大）\n[-2147483648]    → 溢出 (i64 边界)\n[0.1+0.2]      → 0.30000000000000004  （IEEE 754 精度问题）\n```\n\n**注意事项：**\n\n- 整数除法 `a / b` 结果为整数（向零截断），不是四舍五入。\n- 幂运算 `a ^ b` 要求 b 为非负整数（包括 0）。\n- 位移运算 `a << b` 中 b 必须是非负整数，且结果类型为整数。\n\n## 比较运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `==` | 字符串相等（宽松，自动类型转换） |\n| `!=` | 字符串不等（宽松） |\n| `===` | 严格相等（比较值和类型） |\n| `!==` | 严格不等（比较值和类型） |\n| `>=` `<=` `>` `<` | 数值比较 |\n| `~=` | 正则匹配 |\n| `in` | 包含判断 |\n\n### 严格比较 `===` / `!==`\n\n- `===` 要求值和**类型**都相同：`1 === 1` 为真，`1 === 1.0`（Int vs Float）为假\n- `!==` 取反：类型不同或值不同时为真\n- 普通 `==` / `!=` 做字符串比较，不区分类型\n\n```\n如果:%a%===1       ← 严格检查整数 1\n整数 1\n如果尾\n\n如果:%a%===1.5     ← 严格检查浮点数 1.5\n浮点数 1.5\n如果尾\n```\n\n### 比较运算边界情况\n\n```\n// 数值比较中的类型问题\n[1>0.5]          → 在条件中为真（自动类型提升比较数值）\n1 == 1.0            → 条件判断中为真（宽松相等，都转为 "1"）\n1 === 1.0           → 条件判断中为假（严格相等，Int vs Float）\n```\n\n- 数值比较（`>` `<` `>=` `<=`）会自动尝试将双方转为数值再比较。一方无法转数值时报错。\n- `==` 宽松相等适合快速判断，但**在需要区分 Int/Float 时请用 `===`**。\n- `~=`（正则匹配）右侧必须是正则模式；`in` 左侧检查是否包含于右侧（字符串子串或数组元素）。\n\n## 逻辑运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `&&` / `&` | 逻辑 AND（短路） |\n| `\\|\\|` / `\\|` | 逻辑 OR（短路） |\n\n单操作数时做真值判断：非空、非 `"0"`、非 `"false"`、非 `"null"` 为真。\n',Wo=`\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF# 文件操作

基础函数 | 共 22 个函数。使用 \`#引入=@文件\` 导入后可用。包含文件读写、存在性判断、列表遍历、删除、重命名、复制、下载等功能。

## 文件系统概述

NR 的文件操作基于脚本运行目录（工作目录）的相对路径。所有路径参数支持以下形式：

- **相对路径**：\`logs/app.log\`、\`data/config.json\`——相对于当前工作目录
- **绝对路径**：\`/var/log/app.log\`——不受工作目录影响

文件操作的权限受运行 NR 引擎的操作系统用户权限限制：若引擎进程对目标路径无读/写权限，相关函数将返回空值或失败（不抛异常）。

## 数据库键值存储

\`$写$\` 和 \`$读$\` 提供了一种**基于文件的键值数据库**抽象。数据以特殊格式持久化存储，每个"文件名"实际上对应一个独立的键值存储。与 \`$写文件$\`/\`$读文件$\` 的区别：

| 特性 | \`$写文件$\` / \`$读文件$\` | \`$写$\` / \`$读$\` |
| --- | --- | --- |
| 数据模型 | 整体文本覆盖 | 键值对存取 |
| 并发安全 | 依赖文件系统 | 引擎内部加锁 |
| 适用场景 | 配置文件、日志 | 缓存、持久化状态 |

## 错误处理

所有文件操作函数在出错时**返回空字符串（不赋值）**，不抛出异常。常见错误场景：

- 文件/目录不存在 → 返回空字符串
- 权限不足 → 静默失败，返回空字符串
- 路径非法（如包含非法字符）→ 操作无效
- 磁盘空间不足 → 写入操作静默失败

建议在关键文件操作前使用 \`$存在文件$\` 或 \`$存在文件夹$\` 做前置检查。

<a id="file-write"></a>

### \`$写文件$\` — 写入文件

- **格式**：\`$写文件 [路径] [内容]$\`
- **参数**：文件路径、要写入的内容
- **返回值**：无

将内容写入指定路径的文件，若文件不存在则创建，若存在则覆盖。

\`\`\`
$写文件 logs/app.log 启动成功$
$写文件 data/config.json {"port":8080}$
\`\`\`

<a id="file-read"></a>

### \`$读文件$\` — 读取文件

- **格式**：\`$读文件 [路径] [默认值]$\`
- **参数**：文件路径、可选的默认值
- **返回值**：文件全部内容；文件不存在或失败时返回默认值（省略时返回空字符串）

读取文件的全部内容作为字符串返回。读取时自动将 \`\\r\\n\` 和 \`\\r\` 换行符归一化为 \`\\n\`。

\`\`\`
$读文件 data/config.json 默认配置$
\`\`\`

<a id="file-kv-write"></a>

### \`$写$\` — 键值数据库写入

- **格式**：\`$写 [文件名] [键名] [值]$\`
- **参数**：数据库文件名、键名、值
- **返回值**：无

向键值数据库中写入一个键值对。同一键名多次写入会覆盖旧值。

\`\`\`
$写 cache 用户1 小明$
\`\`\`

<a id="file-kv-read"></a>

### \`$读$\` — 键值数据库读取

- **格式**：\`$读 [文件名] [键名] [默认值]$\`
- **参数**：数据库文件名、可选的键名、可选的默认值
- **返回值**：不指定键名时返回所有键值对的 JSON 数组；指定键名时返回对应值，键不存在则返回默认值

从键值数据库中读取数据。

\`\`\`
$读 cache$                       → 所有键值对的 JSON 数组
$读 cache 用户1$                 → "小明"
$读 cache 用户3 无名氏$          → "无名氏"
\`\`\`

<a id="file-exists"></a>

### \`$存在文件$\` — 判断文件是否存在

- **格式**：\`$存在文件 [路径]$\`
- **参数**：文件路径
- **返回值**："true"（存在）或 "false"（不存在）

判断指定路径的文件是否存在（不包含目录）。

\`\`\`
$存在文件 config.yaml$
\`\`\`

<a id="file-dir-exists"></a>

### \`$存在文件夹$\` — 判断目录是否存在

- **格式**：\`$存在文件夹 [路径]$\`
- **参数**：目录路径
- **返回值**："true"（存在）或 "false"（不存在）

\`\`\`
$存在文件夹 uploads$
\`\`\`

<a id="file-path-exists"></a>

### \`$存在文件或文件夹$\` — 判断路径是否存在

- **格式**：\`$存在文件或文件夹 [路径]$\`
- **参数**：任意路径
- **返回值**："true"（存在）或 "false"（不存在）

判断指定路径是否存在（无论是文件还是目录）。

\`\`\`
$存在文件或文件夹 database/cache$
\`\`\`

<a id="file-ext"></a>

### \`$文件后缀$\` — 获取文件扩展名

- **格式**：\`$文件后缀 [文件名]$\`
- **参数**：文件名
- **返回值**：扩展名（含点号）；无后缀则返回空字符串

\`\`\`
$文件后缀 photo.jpg$             → ".jpg"
\`\`\`

<a id="file-list-dirs"></a>

### \`$文件夹列表$\` — 列出子目录

- **格式**：\`$文件夹列表 [路径]$\`
- **参数**：目录路径
- **返回值**：子目录名称的 JSON 数组字符串；无子目录返回 "[]"

\`\`\`
$文件夹列表 data$                → "[\\"backup\\",\\"images\\"]"
\`\`\`

<a id="file-list-files"></a>

### \`$文件列表$\` — 列出文件

- **格式**：\`$文件列表 [路径]$\`
- **参数**：目录路径
- **返回值**：文件名称的 JSON 数组字符串（不含子目录）

\`\`\`
$文件列表 images$                → "[\\"logo.png\\",\\"banner.jpg\\"]"
\`\`\`

<a id="file-random-dir"></a>

### \`$随机文件夹名$\` — 生成随机目录名

- **格式**：\`$随机文件夹名 [路径]$\`
- **参数**：父目录路径
- **返回值**：随机文件夹名称字符串（不实际创建目录）

生成一个随机的文件夹名称字符串，不实际创建目录。用于需要临时目录名的场景。

<a id="file-random-file"></a>

### \`$随机文件名$\` — 生成随机文件名

- **格式**：\`$随机文件名 [路径]$\`
- **参数**：父目录路径
- **返回值**：随机文件名称字符串（不实际创建文件）

生成一个随机的文件名称字符串，不实际创建文件。

### \`$读文件.随机一行$\` — 随机读取一行

- **格式**：\`$读文件.随机一行 [路径] [默认值]$\`
- **参数**：文件路径、可选的默认值
- **返回值**：随机选中的一行；文件不存在时返回默认值

从文本文件中随机读取一行。文件按行分割后随机选取，每行被选中的概率均等。

\`\`\`
$读文件.随机一行 quotes.txt 无内容$
\`\`\`

### \`$读文件.行数$\` — 统计文件行数

- **格式**：\`$读文件.行数 [路径] [默认值]$\`
- **参数**：文件路径、可选的默认值
- **返回值**：总行数

统计文本文件的总行数。空行也算一行。

\`\`\`
$读文件.行数 data.log$           → "150"
\`\`\`

<a id="file-read-lines"></a>

### \`$读文件行$\` — 读取指定行范围

- **格式**：\`$读文件行 [路径] [起始行] [数量] [默认值]$\`
- **参数**：文件路径、起始行（从 1 开始）、行数、可选的默认值
- **返回值**：JSON 数组字符串；起始行超出范围返回默认值

从指定起始行读取若干行，以 JSON 数组字符串形式返回。

\`\`\`
$读文件行 data.log 10 5$          → JSON 数组
\`\`\`

<a id="file-size"></a>

### \`$文件大小$\` — 获取文件大小

- **格式**：\`$文件大小 [路径]$\`
- **参数**：文件路径
- **返回值**：文件字节大小；文件不存在返回 "0"

\`\`\`
$文件大小 video.mp4$             → "104857600"
\`\`\`

<a id="file-dir-size"></a>

### \`$文件夹大小$\` — 获取目录大小

- **格式**：\`$文件夹大小 [路径]$\`
- **参数**：目录路径
- **返回值**：目录及其子目录中所有文件的总字节大小

递归计算目录及其所有子目录中文件的总字节大小。

<a id="file-delete"></a>

### \`$删除文件$\` — 删除文件

- **格式**：\`$删除文件 [路径]$\`
- **参数**：文件路径
- **返回值**：无

删除指定文件。

\`\`\`
$删除文件 temp/cache.tmp$
\`\`\`

<a id="file-delete-dir"></a>

### \`$删除文件夹$\` — 递归删除目录

- **格式**：\`$删除文件夹 [路径]$\`
- **参数**：目录路径
- **返回值**：无

递归删除指定目录及其所有内容。谨慎使用，此操作不可逆。

<a id="file-rename"></a>

### \`$重命名$\` — 重命名文件或目录

- **格式**：\`$重命名 [旧名] [新名]$\`
- **参数**：旧名称、新名称
- **返回值**："true"（成功）或 "false"（失败）

将文件或目录从旧名称改为新名称。目标已存在时可能失败。

\`\`\`
$重命名 old.txt new.txt$
\`\`\`

<a id="file-copy"></a>

### \`$复制粘贴$\` — 复制文件

- **格式**：\`$复制粘贴 [源路径] [目标路径]$\`
- **参数**：源文件路径、目标文件路径
- **返回值**："true"（成功）或 "false"（失败）

复制源文件（或目录）到目标路径。若源为目录则递归复制整个目录。若目标已存在则覆盖。

\`\`\`
$复制粘贴 source.txt dest.txt$
\`\`\`

<a id="file-download"></a>

### \`$下载文件$\` — 下载文件

- **格式**：\`$下载文件 [下载地址] [保存路径]$\`
- **参数**：下载 URL、本地保存路径
- **返回值**："true"（成功）或空字符串（失败）

从指定 URL 下载文件并保存到本地路径。使用引擎内置的 HTTP 客户端，超时等行为与网络访问模块一致。

\`\`\`
$下载文件 https://example.com/logo.png assets/logo.png$
\`\`\`

> 所有文件操作函数失败时返回空字符串，建议在关键操作前使用 \`$存在文件$\` 或 \`$存在文件夹$\` 做前置检查。\`$写$\`/\`$读$\` 提供键值数据库抽象，适合缓存和持久化状态。网络下载请参见 [@访问](./network) 的超时说明。

[← @画布](./canvas)

[返回基础函数 →](./flow-output)
`,Yo=`# $回调$ — 正则匹配内部词条

基础函数 | 无需导入。

<dl>
  <dt>格式</dt><dd><code>$回调 [触发词]$</code></dd>
  <dt>参数</dt><dd>触发词，用于正则匹配内部词条</dd>
  <dt>返回值</dt><dd>匹配到的内部词条的执行结果；无匹配返回空字符串</dd>
</dl>

在新子上下文中正则匹配 \`[内部]\` 词条并执行，捕获分组存入 \`%括号1%\`、\`%括号2%\` 等。新上下文执行，不污染调用者变量。

\`\`\`
[内部]say_(.*)
你好，%括号1%！

$回调 say_hello$          ← 匹配 say_(.*)，%括号1%=hello
\`\`\`

> 回调机制基于正则匹配内部词条，在独立子上下文中执行。`,Zo=`# $主回调$ — 匹配主词条

基础函数 | 无需导入。

<dl>
  <dt>格式</dt><dd><code>$主回调 [触发词]$</code></dd>
  <dt>参数</dt><dd>触发词</dd>
  <dt>返回值</dt><dd>匹配到的词条的执行结果</dd>
</dl>

以指定触发词匹配普通词条，在**当前变量上下文**中执行。

\`\`\`
$主回调 你好$          ← 匹配主词条"你好"
\`\`\`

与 \`$回调$\` 的区别：\`$回调$\` 匹配内部词条（新上下文），\`$主回调$\` 匹配普通词条（保留上下文）。

> \`$回调$\` 和 \`$主回调$\` 是 NR 实现逻辑分发和控制反转的核心。`,Qo=`# 基础函数

本章涵盖 NR 语言全部函数的参考文档。函数分为两类：**基础函数**（始终可用，无需导入）和**标准库函数**（需通过 \`#引入=@模块名\` 导入后生效）。

- **基础函数**：引擎启动时即注册完毕，始终可用，无需导入。
- **标准库函数**：需通过 \`#引入=@模块名\` 导入后生效。路径以 \`@\` 开头，由引擎内置，无需对应 \`.nr\` 文件。

\`\`\`
#引入=@字符串          ← 无状态库，不赋变量名，函数全局可用
#引入=@数学            ← 无状态库，不赋变量名，函数全局可用
t:#引入=@类型
net:#引入=@访问

[函数]main
$大写 hello$
$长度 Hello World$
$绝对值 -5$
\`\`\`

## 函数分类索引

| 分类 | 章节 | 函数数量 | 说明 |
| --- | --- | --- | --- |
| **基础函数** | | | |
| 流程控制 | [流程控制](./flow-control) | 2 | \`$回调$\`、\`$主回调$\` |
| 输出 | [输出](./output) | 2 | \`$打印$\`、\`$打印返回$\` |
| 服务器 | [服务器](./server) | 1 | \`$启动服务器$\` |
| 对象创建 | [对象创建](./object) | 1 | \`$new$\` |
| 访问 | [访问](./network) | 3 | 快捷 HTTP 请求（无需导入） |
| 文件操作 | [文件操作](./file) | 22 | 文件读写、存在判断、列表、删除等 |
| **标准库** | | | |
| @字符串 | [@字符串](./string) | 22 | 字符串操作 |
| @数学 | [@数学](./math) | 8 | 数学运算 |
| @访问 | [@访问](./network) | 12 | HTTP 客户端状态机 |
| @类型 | [@类型](./type) | 4 | 类型转换 |
| @画布 | [@画布](./canvas) | 29 | 像素级图像绘制 |

## 基础函数

基础函数在引擎启动时即注册完毕，始终可用，无需任何导入声明。

> 基础函数无需导入，始终可用。标准库函数需通过 \`#引入=@模块名\` 加载。

[← 模块与引入](./modules) [流程控制 →](./flow-control)
`,Xo=`# 函数

函数是 NR 语言中封装可复用逻辑的基本单元。本章涵盖函数定义语法、参数传递、可变参数、递归限制以及初始化函数。

- **函数调用表达式**：以 \`$函数名 参数$\` 形式主动调用，在所在位置被返回值替换。
- **声明即执行**：函数体中每行按顺序执行，最后一行的值（或 \`$打印返回$\` 的结果）即为返回值。
- **与词条的区别**：函数通过 \`$...$\` 主动调用，而词条由触发词匹配引擎驱动。

## 定义与语法

| 声明方式 | 含义 |
|----------|------|
| \`[函数]name\` | 标准函数 |
| \`[F]name\` / \`[f]name\` | \`[函数]\` 的简写 |
| \`[函数:ClassName]method\` | OOP 类方法 |
| \`[f:ClassName]method\` / \`[F:ClassName]method\` | OOP 类方法简写 |

\`\`\`
[函数]add
和是 [%x%+%y%]

[F]greet
你好，%参数1%！

[f]初始化           ← [f] 自动执行
初始化完成

[f:Counter]add num  ← OOP 类方法简写
.count+:%num%
\`\`\`

**函数名规则**：仅允许字母、数字、下划线、空格、中文、\`.\`、\`#\`、\`=\`。\`...\` 只能出现在末尾表示可变参数。

### 函数命名规范

| 范例 | 说明 |
|------|------|
| \`[函数]计算总和\` | 中文函数名，适合中文 DSL 场景 |
| \`[f]add_user\` | 英文下划线风格 |
| \`[F]Send Message\` | 带空格的英文名，调用时 \`$Send Message$\` |
| \`[f:MyClass]init\` | 类方法，方法名同样遵循命名规则 |

**原则**：

- 函数名在**同一作用域内必须唯一**；后定义的函数会覆盖同名函数
- 函数名不支持 \`-\` 等特殊符号
- 避免使用与基础函数同名的函数名（如 \`打印\`、\`new\`），会导致覆盖

## 参数

### 命名参数

\`\`\`
[函数]greet name
你好，%name%！

$greet Alice$       ← %参数1% = %name1% = "Alice"
\`\`\`

- 命名参数自动绑定到 \`%参数名%\`
- \`%参数0%\` 始终为**函数名**（或词条触发时的完整触发名）
- \`%参数N%\`（N>=1）：未定义命名参数时自动设置；有命名参数时不设置

### 可变参数 \`...\`

\`\`\`
[函数]log msg...
收到消息：%msg%
参数个数：%len@msg%

$log a b c d$       ← msg = ["a","b","c","d"], msg1=a, msg2=b, ...
\`\`\`

- \`...\` 标记可变参数
- 参数打包为 JSON 数组存入 \`%参数名%\`
- 逐个存入 \`%参数名1%\`、\`%参数名2%\`…

### 默认参数值

\`\`\`
[函数]Counter add num=1
.count+:%num%

$myCounter.add 5$   ← num=5（显式传参）
$myCounter.add$     ← num=1（使用默认值）
\`\`\`

- 语法：\`参数名=默认值\`，等号两侧不加空格
- 有默认值的参数在调用时可省略，省略时自动注入默认值
- 默认值仅作字符串使用，不进行变量替换
- 多个默认参数可同时存在，如 \`[函数]draw x=0 y=0 color=red\`

### 可变参数深入：打包与解包

可变参数 \`...\` 底层将额外参数打包为一个 **JSON 数组**。这意味着你可以在函数体内对可变参数进行数组操作：

\`\`\`
[函数]show_args base ...
基础参数：%base%
总数：%len@...
第一个额外参数：[%...%、0]
所有额外参数：%...%

$show_args A x y z$
// 输出：
// 基础参数：A
// 总数：3
// 第一个额外参数：x
// 所有额外参数：["x","y","z"]
\`\`\`

- \`%参数名%\` 返回完整的 JSON 数组字符串表示
- \`%参数名1%\`、\`%参数名2%\`… 逐个访问元素（从 1 开始）
- 可以用 \`%len@...%\` 获取可变参数的数量
- 可变参数也可以与其他普通参数混合使用（可变参数必须在最后）

## 递归与调用限制

NR 引擎对函数调用深度有限制，防止无限递归导致栈溢出：

- **最大调用深度**：约 128 层（引擎内部限制，可能因版本而异）
- **递归函数**可以定义，但需自行确保终止条件
- 超出深度限制时，引擎会抛出错误并终止当前调用链

\`\`\`
[函数]factorial n
[如果 %n% <= 1]
 1
[否则]
 [%n%*$factorial [%n%-1]$]
\`\`\`

> **注意事项**
> - 递归函数需在 \`[如果]\` 中明确终止条件，否则会导致引擎报错
> - 对于大数据量的迭代算法，建议使用 \`[循环]\` 替代递归——效率更高且无深度限制
> - 函数调用开销与参数数量相关：可变参数函数在参数较多时开销更大

## \`[f]初始化\`

- 每个 \`.nr\` 文件的头部区域可放置 \`[f]初始化\`
- 文件加载时自动执行一次
- 常用于设置默认变量值
`,nl=`NR 是 Nebula 词库引擎的领域特定语言（DSL），扩展名为 \`.nr\`，用于定义词条、函数、变量和自动化流程。适用于聊天机器人、互动小说、自动化文本生成等场景。

## 目录

| 标题 | 内容概要 |
|------|----------|
| [词法结构](./lexical) | 源文件结构、注释、转义规则、多行字符串、代码块语法 |
| [类型系统](./types) | 整数/浮点/字符串/布尔/空/对象/函数类型、类型查询 |
| [变量与赋值](./variables) | 作用域、赋值操作符、条件赋值、内置变量、符号截取文本 |
| [表达式与运算符](./expressions) | 数学表达式、比较运算符、严格比较、逻辑运算符 |
| [控制流](./control-flow) | 条件分支、循环、中断与跳转、标签与 goto |
| [词条系统](./entries) | 普通词条、内部词条、类内部词条 |
| [函数](./functions) | 定义语法、命名/可变参数、默认参数值、初始化函数 |
| [JSON 数据处理](./json) | 内联 JSON、对象/数组 DSL、导航取值写入、数组追加 |
| [面向对象编程](./oop) | 类定义、实例变量、对象创建与方法调用、自我调用 |
| [模块与引入](./modules) | 文件/目录引入、跨包调用、热更新 |
| [基础函数](./flow-output) | 流程控制、输出、服务器、对象创建、标准库函数（@字符串/@数学/@访问/@类型/@画布）、文件操作 |

## 快速开始

一个 \`.nr\` 文件由**头部区域**和**词条区域**组成，两者用空行分隔：

\`\`\`
头部变量/初始化代码

                            ← 空行分隔
触发词1
词条内容

触发词2
词条内容

[函数]函数名
函数内容

[内部]内部词条名
内部词条内容
\`\`\`

## 项目信息

- **引擎**：Nebula 词库引擎
- **实现语言**：Rust
- **许可证**：Copyright (c) 2025 保留所有权利

## 工具

- **VS Code 语法高亮扩展**：为 \`.nr\` 文件提供语法高亮、注释切换、括号匹配等支持。<a href="./vscode-nr/nr-language-1.0.0.vsix">点击下载 .vsix</a>

安装方法：VS Code 中按 \`Ctrl+Shift+P\`，输入 "Extensions: Install from VSIX..."，选择下载的文件即可。也可以将 \`vscode-nr\` 文件夹复制到 \`%USERPROFILE%\\.vscode\\extensions\\\` 目录下。
`,el=`# JSON 数据处理

NR 内置强大的 JSON 处理能力，本章涵盖内联 JSON 赋值、JSON DSL 对象与数组语法、导航取值/写入、数组追加以及变量替换在 JSON 上下文中的使用。

<dl>
  <dt>JSON DSL</dt>
  <dd>NR 特有的 <code>{ }</code> 和 <code>[ ]</code> 块语法，以更可读的方式构建 JSON 数据，深度集成变量替换和函数调用。</dd>
  <dt>自适应解析</dt>
  <dd><code>key:value</code> 中 value 会被解析为 JSON 字面量（数字/布尔/null/对象/数组），否则作为字符串。</dd>
  <dt>核心用途</dt>
  <dd>复杂数据结构存储、与外部 API 的数据交换、可变参数和配置对象的载体。</dd>
</dl>

## 内联 JSON 赋值

\`\`\`
data:{"name":"Alice","age":25,"items":[1,2,3]}
\`\`\`

## JSON 对象 DSL \`{ }\`

多行构建 JSON 对象，每行 \`key:value\` 或 \`key::value\`：

\`\`\`
user:{
    name:Alice
    age:25
    active:true
    tags:["a","b"]
    note::raw text
    姓名:张三
}
\`\`\`

| 分隔符 | 值处理 |
| --- | --- |
| \`key:value\` | **自适应**：尝试解析 value 为 JSON 字面量（数字/布尔/null/对象/数组），不成则加引号当字符串 |
| \`key::value\` | **强制字符串**：始终作为字符串 |

\`\`\`
a:{
    x:123        → 123 (Number)
    y:true       → true (Bool)
    z:null       → null
    w:[]         → [] (空数组)
    v:hello      → "hello" (非 JSON 字面量，加引号)
    名称::Alice  → "Alice" (强制字符串)
}
\`\`\`

## 重复键自动合并

NR 的 JSON DSL 有一个独特的特性：当同一个对象中出现重复的键时，**值会自动合并为数组**，而非覆盖。这极大简化了构建列表型数据的场景。

\`\`\`
a:{
    tag:a
    tag:b
    tag:c
}
// → {"tag":["a","b","c"]}
\`\`\`

- **合并规则**：第一个值作为数组的第一个元素，后续同名键的值依次追加
- **适用性**：仅在 JSON 对象 DSL 块 \`{ }\` 中生效，内联 JSON 不适用
- **混合类型**：合并的值可以不同类型，如 \`tag:a\` 和 \`tag:123\` 合并为 \`["a",123]\`

## JSON 数组 DSL \`[ ]\`

\`\`\`
list:[
    a,
    b,
    123,
    ::hello,
    key:val,
]
\`\`\`

- **纯值**：自适应解析（\`true\`→Bool, \`123\`→Number, \`abc\`→String）
- **\`::value\`**：强制字符串
- **\`key:value\`**：单键对象，值自适应
- **\`key::value\`**：单键对象，值强制字符串

## 导航取值 \`@\`

\`\`\`
@data[name]           → "Alice"
@data[items][0]       → "1"
@data[items][%i%]     → 动态索引（变量替换）
\`\`\`

\`\`\`
@a[0][name]           → 数组第 0 个元素的 name 字段
\`\`\`

## 导航写入

\`\`\`
data[name]:Bob                        ← 修改已有字段
@data[name]:Bob                       ← @ 前缀等价写法
data[info][city]:上海                  ← 多级写入
@data[info][city]:上海                ← @ 前缀等价写法
\`\`\`

### 自适应与强制字符串

\`\`\`
@data[age]:25          → Number(25)，自适应解析
@data[age]::25         → String("25")，强制字符串
\`\`\`

## 数组追加 \`[]\`

\`\`\`
list:[a,b]
@list[]:c              → list = ["a","b","c"]
@list[]:123            → list = ["a","b","c",123] (自适应 → Number)
@list[]::123           → list = ["a","b","c",123,"123"] (强制字符串)
\`\`\`

## 变量替换与函数调用

\`\`\`
prefix:Hello
msg:{
    text:%prefix% World
    ts:%时间戳%
}
// → {"text":"Hello World","ts":"1719500000"}
\`\`\`

## 深度导航最佳实践

当 JSON 结构嵌套较深时，关注以下要点可以帮助你编写更可靠的导航代码：

- **逐级取值**：使用 \`@data[a][b][c]\` 逐级展开，不要跳级假设中间路径存在
- **动态路径**：索引处可以使用变量，如 \`@data[%key%]\`，但需确保变量值不为空
- **路径不存在时**：导航到不存在的路径返回空字符串，不会报错；写入不存在的路径会**自动创建中间对象**
- **数组越界**：访问不存在的数组索引返回空字符串

\`\`\`
// 安全的多级导航模式
key:%参数1%
value:@config[settings][%key%]

[如果 %value% == ]
 值不存在，使用默认值
 value:default
\`\`\`

> **注意事项**
> - **自适应模式注意**：\`key:value\` 会尝试将 value 解析为 JSON 字面量。如果 value 恰巧是 \`true\`、\`null\`、数字等，它会被解析为对应的类型而非字符串——请根据场景选择 \`:\` 或 \`::\`
> - **变量替换时机**：JSON DSL 块 \`{ }\` 中的 \`%变量%\` 在**赋值时**替换，而非定义时
> - **大文件考虑**：大型 JSON 结构建议使用内联 JSON 赋值而非 DSL 块，解析效率更高
> - **嵌套 DSL**：JSON DSL 块可以嵌套，但每层都需要独立的 \`{ }\` 或 \`[ ]\` 标记
> - 关于 JSON 数组操作的更多内容，参见 [@类型 标准库](./type)

[← 函数](./functions) [面向对象编程 →](./oop)
`,tl=`# 词法结构

本章介绍 NR 语言的基础词法规则，涵盖源文件结构、注释、转义、字符串语法等核心概念。词法结构决定了你的代码如何被解析器"阅读"，理解这些规则是写出正确 NR 代码的第一步。后续章节中涉及的[类型系统](./types)、[变量赋值](./variables)等均在此基础上工作。

NR 源文件要求使用 **UTF-8 编码**。解析器在处理文件时会 trim 行首尾空白，但保留缩进结构。一个合法的 \`.nr\` 文件至少包含：头部区域的可选初始化代码、一个空行分隔符，以及至少一个词条或函数定义。

## 源文件结构

一个 \`.nr\` 文件由**头部区域**和**词条区域**组成，两者用空行分隔：

\`\`\`
头部变量/初始化代码

                            ← 空行分隔
触发词1
词条内容

触发词2
词条内容

[函数]函数名
函数内容

[内部]内部词条名
内部词条内容
\`\`\`

### 头部区域

头部区域位于文件开头，在第一个空行之前。此区域通常包含：

- **全局变量初始化**：用 \`变量:值\` 语法定义全局共享变量（参见 [变量与赋值](./variables)）
- **包引用**：引入外部包
- **初始化表达式**：数学运算、JSON 初始化等

头部代码在解析时首先执行，且**只执行一次**。头部区域的变量在词条触发时仍保持其值（全局作用域）。

### 词条区域

词条区域包含所有匹配规则和函数定义。每一条规则由**触发词**（行首不含特殊前缀的文本）开头，后续行为该词条的响应内容。函数以 \`[函数]函数名\` 开头，内部词条以 \`[内部]词条名\` 开头。

**注意事项：** 头部区域与词条区域之间的**空行分隔符是必需的**。如果缺少这个空行，解析器会将头部代码误认为是词条的触发词，导致解析错误或行为异常。

## 注释

\`\`\`
// 单行注释

/*
   多行注释
*/
\`\`\`

### 编译器指令

以 \`//@\` 开头的特殊注释：

| 指令 | 作用 |
|------|------|
| \`//@关闭缩进\` | 后续行不 trim 缩进 |
| \`//@启用缩进\` | 恢复 trim 缩进 |

## 转义规则

NR 在不同上下文中使用不同的转义规则。理解转义机制对于传递特殊字符（如空格、引号、换行符）至关重要。

### 转义总览

| 上下文 | 转义序列 | 结果 |
|--------|----------|------|
| \`$...$\` 内部 | \`\\ \` | 空格（不分割参数） |
| \`$...$\` 内部 | \`\\\\\` | \`\\\` |
| \`$...$\` 内部 | \`\\$\` | \`$\` |
| 外部文本 | \`\\\\r\` | \`\\n\` |
| 多行文本 \`"""\` | \`\\"\\"\\"\` | \`"""\` |
| 多行文本 \`'''\` | \`\\'''\` | \`'''\` |

### \`$...$\` 内部转义详解

\`$...$\` 包裹的参数传递区域中，空格默认被当作**参数分隔符**。如需在参数中包含空格，必须使用 \`\\ \` 转义：

\`\`\`
// 错误：空格导致 "hello" 和 "world" 被解析为两个参数
$函数名 hello world$

// 正确：\\ 转义空格，整个 "hello world" 为一个参数
$函数名 hello\\ world$
\`\`\`

### 外部文本转义

在 \`$...$\` 外部的普通文本中，\`\\\\r\` 会被转换为换行符 \`\\n\`。这允许在单行词条内容中嵌入换行。

### 多行字符串转义

在多行字符串（\`"""\` 或 \`'''\`）中，如果需要输出文本自身的三引号，必须使用转义。双引号多行中用 \`\\"\\"\\"\` 表示三个双引号字符；单引号多行中用 \`\\'''\` 表示三个单引号字符。

**注意事项：**

- 在 \`$...$\` 内部，\`\\\\\` 表示一个字面反斜杠——如果需要输出 \`\\n\` 这样的转义序列，需要写成 \`\\\\\\\\r\`（第一个 \`\\\\\` 产生字面 \`\\\`，后跟 \`\\\\r\`）。
- 外部文本中不支持 \`\\t\`（制表符）转义，如需制表符请直接使用 Tab 字符。
- 转义仅在字符串边界内生效，已赋值到变量的字符串不会再次解析转义序列。

## 多行字符串

NR 提供两种多行字符串语法：**三引号多行**和**块语法**。选择哪种取决于是否需要变量替换以及内容的可读性要求。

### 双引号多行 \`"""..."""\`

支持变量替换：

\`\`\`
msg:"""
第一行 %name%
第二行
"""
\`\`\`

使用场景：需要在多行文本中嵌入变量值时。文本中的 \`%变量名%\` 会被替换为对应值。

### 单引号多行 \`'''...'''\`

原样保留，不做任何变量替换：

\`\`\`
msg:'''
原样内容
不替换变量 %name%
'''
\`\`\`

使用场景：需要输出包含 \`%\` 符号的文本（如代码片段、模板说明）时。单引号多行中的 \`%name%\` 会原样输出，不会被替换成变量值。

### 核心区别对照

| 特性 | \`"""..."""\`（双引号） | \`'''...'''\`（单引号） |
|------|----------------------|----------------------|
| 变量替换 \`%var%\` | ✅ 替换 | ❌ 不替换 |
| 表达式求值 \`[expr]\` | ✅ 求值 | ❌ 不求值 |
| 转义 \`\\"\\"\\"\` | ✅ 支持 | — |
| 转义 \`\\'''\` | — | ✅ 支持 |

### 注意事项

- 三引号多行字符串的**缩进会被 trim**：以缩进最浅的那行为基准，所有行统一去除前缀空白。
- 如果需要在 \`'''...'''\` 中临时嵌入变量，可将其拆分后用 \`%变量%\` 拼接，但这会破坏多行结构。更好的做法是使用双引号多行并转义不需要替换的 \`%\`。
- 三引号必须独立成行或以行末位置结束——混合在同一行内的三引号和内容可能导致解析歧义。

### 块语法

\`\`\`
文本>var=\\n
第一行
第二行
<文本

纯文本>var=\\n
原样第一行
<文本
\`\`\`

- \`文本>\` 做变量替换，\`纯文本>\` 不做
- \`\\n\` 为行分隔符
- 无 \`=\` 时直接输出不存变量

## 其他词法

### 代码块语法 \`#{ }#\`

\`\`\`
函数名 #{
内容行1
内容行2
}#
\`\`\`

### 异步输出标记 \`#:\`

当前实现为同步：

\`\`\`
#:%name%
\`\`\`
`,sl=`# @数学

导入：\`#引入=@数学\`（不赋变量名，函数全局可用）| 共 8 个函数。提供绝对值、最值、幂运算、求和、取整等基础数学运算。

<a id="math-abs"></a>

### \`$绝对值$\` — 取绝对值

- **格式**：\`$绝对值 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：数字的绝对值

正数保持不变，负数取相反数。支持整数和浮点数。

\`\`\`
$绝对值 -5$          → "5"
$绝对值 3.14$        → "3.14"
\`\`\`

<a id="math-max"></a>

### \`$最大值$\` — 取最大值

- **格式**：\`$最大值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最大的数字

从一组数字中返回最大值。支持可变数量的参数。

\`\`\`
$最大值 3 7 2$       → "7"
\`\`\`

<a id="math-min"></a>

### \`$最小值$\` — 取最小值

- **格式**：\`$最小值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最小的数字

从一组数字中返回最小值。支持可变数量的参数。

\`\`\`
$最小值 3 7 2$       → "2"
\`\`\`

<a id="math-pow"></a>

### \`$幂运算$\` — 幂运算

- **格式**：\`$幂运算 [底数] [指数]$\`
- **参数**：底数和指数（均为数字）
- **返回值**：底数的指数次幂

计算底数的指数次幂。支持分数指数（如 0.5 即开平方根）、负指数。

\`\`\`
$幂运算 2 3$          → "8"
$幂运算 2 10$         → "1024"
$幂运算 9 0.5$        → "3"
\`\`\`

<a id="math-sum"></a>

### \`$求和$\` — 求和

- **格式**：\`$求和 [数字1] [数字2] [...]$\`
- **参数**：一组数字，支持可变数量
- **返回值**：所有数字的累加和

对一组数字进行累加求和。

\`\`\`
$求和 1 2 3 4 5$      → "15"
\`\`\`

<a id="math-ceil"></a>

### \`$向上取整$\` — 向上取整

- **格式**：\`$向上取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不小于输入值的最小整数

向正无穷方向取整。

\`\`\`
$向上取整 3.14$        → "4"
$向上取整 -3.14$       → "-3"
\`\`\`

<a id="math-floor"></a>

### \`$向下取整$\` — 向下取整

- **格式**：\`$向下取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不大于输入值的最大整数

向负无穷方向取整。

\`\`\`
$向下取整 3.14$        → "3"
$向下取整 -3.14$       → "-4"
\`\`\`

<a id="math-round"></a>

### \`$取整$\` — 四舍五入取整

- **格式**：\`$取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：四舍五入到最接近的整数

按四舍五入规则将数值取整到最接近的整数。0.5 向上取整。

\`\`\`
$取整 3.6$           → "4"
$取整 3.2$           → "3"
\`\`\`

## 浮点精度说明

NR 的数学运算基于 IEEE 754 双精度浮点数（f64）。这意味着：

- 整数在 ±2<sup>53</sup> 范围内可精确表示，超出此范围的整数可能丢失精度
- 小数运算可能存在经典浮点误差（如 \`0.1 + 0.2\` 可能不是精确的 0.3）
- 对于需要精确小数计算的场景（如货币），建议先转换为整数（乘以 10<sup>n</sup>）计算后再除以 10<sup>n</sup>
- \`$幂运算$\` 采用标准浮点幂运算，极端值（极大底数 × 极大指数）可能溢出为 inf

> 所有数学函数均基于 f64 运算，传入非数字参数时行为未定义。建议与 [@类型](./type) 的转换函数配合使用，确保输入为有效数字。

[← @字符串](./string)

[@访问 →](./network)
`,rl=`# 模块与引入

NR 的模块系统允许将一个 \`.nr\` 文件（或整个目录）作为**独立包**引入。本章涵盖引入语法、模块解析算法、热重载、跨包变量访问以及标准库结构。

<dl>
  <dt>包（Package）</dt>
  <dd>被引入的 <code>.nr</code> 文件，拥有独立的变量作用域和词条空间。</dd>
  <dt>跨包访问</dt>
  <dd>通过 <code class="nr-sig">$包名.成员$</code> 语法访问被引入包的函数、词条和变量。</dd>
  <dt>头部区域</dt>
  <dd>文件第一个空行之前的部分，引入语句和变量定义在此处。</dd>
</dl>

## 引入语法

\`\`\`
myPkg:#引入=other.nr       ← 以对象形式引入
#引入=folder/              ← 目录引入，合并所有 .nr 文件
\`\`\`

### 使用引入的包

\`\`\`
$myPkg.方法$               ← 调用包内函数
$myPkg.主回调$             ← 匹配包内词条
%myPkg.变量%               ← 读取包头部变量
\`\`\`

- 包内 \`[f]初始化\` 在加载时自动执行
- 运行时支持热更新：当引用文件发生修改时，下次调用自动检测 mtime 变化并重新加载
- 文件夹引入时，每个 \`.nr\` 子文件的初始化独立执行

## 模块解析算法

NR 引擎按以下顺序解析 \`#引入=路径\` 中的路径：

### 文件引入（\`path.nr\`）

1. 在**当前文件所在目录**下查找 \`path.nr\`
2. 若未找到，在引擎配置的**全局搜索路径**中查找
3. 若仍未找到，报错：模块未找到

### 目录引入（\`path/\` 或 \`path\`）

1. 在对应位置查找**目录**
2. 扫描目录下所有 \`.nr\` 文件（不包括子目录）
3. 将所有 \`.nr\` 文件的内容**合并**为一个逻辑包
4. 每个子文件的 \`[f]初始化\` 独立执行

\`\`\`
// 目录结构
plugins/
  a.nr        ← [f]初始化 → 设置 .ver:1
  b.nr        ← [f]初始化 → 设置 .type:http

// 引入
p:#引入=plugins/

// 访问
%p.ver%            ← 读取 a.nr 中的变量
$p.handle$         ← 调用 b.nr 中的函数
\`\`\`

### 引入解析顺序示意

\`\`\`
#引入=utils           // 1. 先找 utils.nr（文件）
                       // 2. 再找 utils/（目录）
                       // 3. 全局路径查找

#引入=lib/utils.nr    // 相对路径，从当前文件目录出发
\`\`\`
#引入=@字符串          // @ 前缀：直接查内置标准库，函数全局可用
\`\`\`

## 热重载行为

NR 引擎内置了**热重载（Hot Reload）**机制，使开发调试更加高效：

- **检测方式**：引擎记录每个引入文件的 \`mtime\`（最后修改时间），每次跨包调用前对比当前 \`mtime\`
- **触发时机**：仅在**下一次调用时**检测并重载，不会主动轮询
- **重载范围**：仅重载被修改的文件；目录引入时，只重载 \`mtime\` 变化的子文件
- **状态保留**：重载后包内重新执行 \`[f]初始化\`，之前的状态（变量值）**不会保留**

> **注意事项**
> - 热重载是**开发特性**，生产环境中建议关闭或确保文件不会被意外修改
> - 频繁重载大文件可能影响性能
> - 重载不会影响已在执行的调用链——当前调用完成后才生效

## 跨包变量访问

通过 \`%包名.变量名%\` 可以读取引入包头部区域定义的变量：

\`\`\`
// config.nr（被引入的包）
version:2.0
debug:true
app_name:NebulaApp

[f]初始化
加载配置完成

// main.nr（引入方）
cfg:#引入=config.nr

[函数]show
版本：%cfg.version%
调试模式：%cfg.debug%
应用名：%cfg.app_name%
\`\`\`

- 只能读取**头部变量**（空行前定义的变量）
- 跨包**不能直接写入**对方变量；修改需通过调用包内函数间接完成
- 包的变量作用域完全独立，不会与引入方的同名变量冲突

## 标准库结构

标准库函数需通过 \`#引入=@模块名\` 导入后生效。路径以 \`@\` 开头，由引擎内置，无需对应 \`.nr\` 文件。

\`\`\`
#引入=@字符串          ← 无状态库，不赋变量名，函数全局可用
#引入=@数学            ← 无状态库，不赋变量名，函数全局可用
t:#引入=@类型
net:#引入=@访问

[函数]main
$大写 hello$
$长度 Hello World$
$绝对值 -5$
\`\`\`

标准库函数通过 \`$包名.方法$\` 调用。详见[第 11 章 基础函数](./flow-output)。

## 标准库一览

| 模块名 | 引入语法 | 典型方法 |
| --- | --- | --- |
| @字符串 | \`#引入=@字符串\` | \`$大写$\`、\`$长度$\`、\`$文本包含$\` |
| @数学 | \`#引入=@数学\` | \`$绝对值$\`、\`$最大值$\`、\`$取整$\` |
| @类型 | \`t:#引入=@类型\` | \`$t.转文本$\`、\`$t.转数字$\`、\`$t.转整数$\` |
| @访问 | \`net:#引入=@访问\` | HTTP 请求相关 |
| @画布 | \`c:#引入=@画布\` | 图形绘制相关 |

> **注意事项**
> - **循环依赖**：如果 A 引入 B、B 又引入 A，引擎会检测并报错。设计模块结构时避免双向引入
> - **包名冲突**：包别名（\`包名:#引入=...\`）在同一文件中必须唯一；后定义的同名引入会**覆盖**之前的
> - **初始化顺序**：多个引入的 \`[f]初始化\` 按头部的**定义顺序**依次执行
> - **包内词条隔离**：被引入包的词条不会参与当前文件的**主触发匹配**——只能通过 \`$包名.主回调$\` 显式调用
> - 关于词条系统和函数的基础概念，参见[第 6 章 词条系统](./entries)和[第 7 章 函数](./functions)

[← 面向对象编程](./oop) [基础函数 →](./flow-output)
`,il=`# 访问 · @访问

NR 提供两种 HTTP 客户端调用方式：**快捷函数**（基础函数，一行完成）和 **@访问 状态机 API**（标准库，精细控制请求的每个阶段）。

## 网络访问概述

两种调用方式对比：

- **快捷函数**：\`$访问$\`、\`$访问POST$\`、\`$访问转发$\` — 基础函数，无需导入，一行完成的简化调用。适合简单场景。
- **@访问 状态机 API**：精细控制请求的每个阶段——创建、切换方法、设置头部/超时、发送、读取结果。适合需要定制请求细节的复杂场景。

## @访问

导入：\`net:#引入=@访问\` | 共 12 个状态机函数。快捷函数（无需导入）：\`$访问$\`、\`$访问POST$\`（见访问章节）

\`@访问\` 模块提供**状态机模式**的 HTTP 客户端：先创建请求对象，逐步配置（方法/头部/超时/文件），最后发送并读取结果。

**状态机流程**：新建 → 切换GET/POST → 设置头部 → 设置超时 → 发送 → 内容

### 状态机生命周期

每个 \`$net.新建$\` 创建的请求句柄代表一个独立的 HTTP 请求状态机。状态机转移路径如下：

| 阶段 | 操作 | 说明 |
| --- | --- | --- |
| 1. 创建 | \`$net.新建 url$\` | 初始化请求对象，默认 GET 方法 |
| 2. 配置方法 | \`$net.切换GET$\` / \`$net.切换POST$\` / \`$net.POST$\` / \`$net.POST文件$\` | 设置 HTTP 方法和请求体 |
| 3. 配置选项 | \`$net.设置头部$\` / \`$net.设置超时$\` / \`$net.启用跳转$\` / \`$net.禁用跳转$\` | 设置头部、超时、重定向策略 |
| 4. 执行 | \`$net.发送$\` | 实际发起网络请求（阻塞） |
| 5. 读取 | \`$net.内容$\` / \`$net.全部内容$\` | 获取响应体 |

同一请求句柄只能发送一次，发送后不可修改配置。

<a id="net-create"></a>

### \`$net.新建$\` — 创建请求对象

- **格式**：\`$net.新建 [url]$\`
- **参数**：目标 URL
- **返回值**：请求句柄

初始化 HTTP 请求状态机，默认 GET 方法。

\`\`\`
req:$net.新建 https://httpbin.org/post$
\`\`\`

<a id="net-switch-get"></a>

### \`$net.切换GET$\` — 切换到 GET 方法

- **格式**：\`$net.切换GET [handle]$\`
- **参数**：请求句柄
- **返回值**：无

将请求方法设置为 GET。

\`\`\`
$net.切换GET %req%$
\`\`\`

<a id="net-switch-post"></a>

### \`$net.切换POST$\` — 切换到 POST 方法

- **格式**：\`$net.切换POST [handle] [body]$\`
- **参数**：请求句柄、请求体
- **返回值**：无

将请求方法设置为 POST 并传入请求体。

\`\`\`
$net.切换POST %req% {"key":"value"}$
\`\`\`

<a id="net-post"></a>

### \`$net.POST$\` — 设置 POST 请求体

- **格式**：\`$net.POST [handle] [body]$\`
- **参数**：请求句柄、请求体
- **返回值**：无

在已切换到 POST 的状态机上设置请求体。

\`\`\`
$net.POST %req% {"name":"Alice","age":25}$
\`\`\`

<a id="net-post-file"></a>

### \`$net.POST文件$\` — 设置文件上传

- **格式**：\`$net.POST文件 [handle] [field] [data] [filename]$\`
- **参数**：请求句柄、表单字段名、文件数据、文件名
- **返回值**：无

通过 multipart/form-data 上传文件。

\`\`\`
$net.POST文件 %req% file %file_content% upload.txt$
\`\`\`

### \`$net.启用跳转$\` / \`$net.禁用跳转$\` — 控制重定向

- **格式**：\`$net.启用跳转 [handle]$\` / \`$net.禁用跳转 [handle]$\`
- **参数**：请求句柄
- **返回值**：无

启用或禁用 HTTP 重定向跟随。

\`\`\`
$net.启用跳转 %req%$
$net.禁用跳转 %req%$
\`\`\`

<a id="net-set-header"></a>

### \`$net.设置头部$\` — 设置请求头

- **格式**：\`$net.设置头部 [handle] [json_headers]$\`
- **参数**：请求句柄、JSON 格式的请求头键值对
- **返回值**：无

以 JSON 对象格式设置 HTTP 请求头。

\`\`\`
$net.设置头部 %req% {"Authorization":"Bearer xxxx","Content-Type":"application/json"}$
\`\`\`

<a id="net-set-timeout"></a>

### \`$net.设置超时$\` — 设置超时

- **格式**：\`$net.设置超时 [handle] [seconds]$\`
- **参数**：请求句柄、超时秒数
- **返回值**：无

设置请求超时时间（秒）。默认无超时限制。

\`\`\`
$net.设置超时 %req% 30$
\`\`\`

<a id="net-send"></a>

### \`$net.发送$\` — 发送请求

- **格式**：\`$net.发送 [handle]$\`
- **参数**：请求句柄
- **返回值**：无

实际发起网络请求（阻塞）。发送后不可修改配置。

\`\`\`
$net.发送 %req%$
\`\`\`

<a id="net-content-all"></a>

### \`$net.全部内容$\` — 读取全部响应内容

- **格式**：\`$net.全部内容 [handle]$\`
- **参数**：请求句柄
- **返回值**：完整响应 JSON（含状态码、头部、data 字段）

> 注意：\`data\` 字段中的敏感数据（如 HTML 页面、二进制内容等）会被自动替换为 \`"已屏蔽"\`。需要原始响应体请使用 \`$net.内容$\`。

\`\`\`
$net.全部内容 %req%$
\`\`\`

<a id="net-content"></a>

### \`$net.内容$\` — 读取响应内容

- **格式**：\`$net.内容 [handle]$\`
- **参数**：请求句柄
- **返回值**：响应体内容

\`\`\`
body:$net.内容 %req%$
\`\`\`

### 状态机完整示例

\`\`\`
net:#引入=@访问

[函数]post_json
req:$net.新建 https://httpbin.org/post$
$net.切换POST %req%$
$net.设置头部 %req% {"Content-Type":"application/json"}$
$net.POST %req% {"name":"Alice"}$
$net.设置超时 %req% 10$
$net.发送 %req%$
result:$net.内容 %req%$
\`\`\`

## 访问

无需导入，始终可用 | 共 3 个函数

### User-Agent 说明

快捷函数（\`$访问$\`、\`$访问POST$\`）默认发送 \`User-Agent: Nebula-Client/1.0\` 请求头。如果目标服务器要求特定 User-Agent，可通过 headers 参数覆盖：

\`\`\`
$访问 https://httpbin.org/headers {"User-Agent":"MyApp/2.0"}$
\`\`\`

状态机模式（\`@访问\`）不自动添加 User-Agent，需通过 \`$net.设置头部$\` 手动指定。

### 超时与错误处理

\`$访问$\` 和 \`$访问POST$\` 默认超时为 15 秒，超时后返回空字符串。状态机模式默认无超时限制，需通过 \`$net.设置超时$\` 显式设置。

当网络请求因以下原因失败时，所有访问函数均返回**空字符串**：

- DNS 解析失败
- 连接被拒绝（目标端口未开放）
- 超时（仅当设置了超时限制）
- TLS/SSL 握手失败
- HTTP 状态码 4xx/5xx（响应体仍然返回，不会因状态码而报错）

### \`$访问$\` — GET 请求

- **格式**：\`$访问 [url] [headers_json]$\`
- **参数**：URL、可选的 JSON 格式请求头
- **返回值**：响应体文本；失败返回空字符串

发起 HTTP GET 请求。自动补全 \`http://\` 前缀，默认 User-Agent: \`Nebula-Client/1.0\`，超时 15 秒。

\`\`\`
$访问 https://httpbin.org/ip$
$访问 https://httpbin.org/headers {"Authorization":"Bearer xxx"}$
\`\`\`

### \`$访问POST$\` — POST 请求

- **格式**：\`$访问POST [url] [body] [headers_json]$\`
- **参数**：URL、请求体、可选的 JSON 格式请求头
- **返回值**：响应体文本；失败返回空字符串

发起 HTTP POST 请求，默认超时 15 秒。

\`\`\`
$访问POST https://httpbin.org/post {"key":"value"}$
$访问POST https://httpbin.org/post {"key":"value"} {"Authorization":"Bearer xxx"}$
\`\`\`

### \`$访问转发$\` — 转发请求

- **格式**：\`$访问转发 [url]$\`
- **参数**：目标 URL
- **返回值**：转发后的响应

仅在 \`$启动服务器$\` 的 HTTP 模式下可用，需读取 \`_DATA\` 变量获取原始请求数据。

\`\`\`
$访问转发 https://backend.internal/api$
\`\`\`

> 仅在 \`$启动服务器$\` 的 HTTP 模式下可用。

> 状态机模式提供完整控制，快捷函数适合快速调用。所有请求失败时返回空字符串而非抛异常。网络操作是阻塞的，注意超时设置。配合 [启动服务器](./server) 可构建完整 Web 服务。

[← @数学](./math)

[@类型 →](./type)
`,ol=`# 对象创建

基础函数 | 共 1 个函数。\`$new$\` 创建自定义对象实例。

\`$new$\` 是 NR 中创建自定义对象实例的核心函数。在 NR 的对象模型中，类本质上是一组使用了特定命名约定的词条集合。创建对象时，引擎通过词条匹配找到构造函数并执行。

## 构造函数查找机制

\`$new$\` 按下述优先级查找构造函数：

1. **\`类名.new\`** → 若存在词条 \`[内部]类名.new\`，优先使用
2. **\`类名.初始化\`** → 作为备选构造函数

若两者都不存在，\`$new$\` 返回空字符串（不赋值）。

### \`$new$\` — 创建对象实例

<dl>
  <dt>格式</dt><dd><code>$new [类名] [参数...]$</code></dd>
  <dt>参数</dt><dd>类名、可选的初始化参数（可变数量）</dd>
  <dt>返回值</dt><dd>对象句柄或标识符；构造函数不存在时返回空字符串</dd>
</dl>

支持传入任意数量的初始化参数：

\`\`\`
obj:$new Counter$           → 无参数构造
obj:$new Counter 42$        → 传入初始值
obj:$new Person 张三 25$    → 传入多个参数
\`\`\`

在构造函数内部，这些参数逐项传入，可通过词条内部变量获取。构造函数的返回值会被 \`$new$\` 表达式捕获，通常用于返回对象句柄或标识符。

## 典型用法

\`\`\`
[内部]Counter.new
0

[内部]Counter.加一
@.计算 %参数1%+1

[内部]Counter.获取
%参数1%

[函数]main
c:$new Counter$
$%c%.加一$
$%c%.加一$
$打印 $%c%.获取$$     ← 输出 2
\`\`\`

详见第 9 章。

> \`$new$\` 构造函数查找优先级：类名.new → 类名.初始化。详见[面向对象编程](./oop)。

[← 服务器](./server) [字符串操作 →](./string)
`,ll='# 面向对象编程\n\nNR 的 OOP 系统建立在词条引擎之上的上下文隔离与状态持久化机制。本章涵盖类定义、实例变量、对象创建与方法调用、自我调用、构造函数输出以及与传统 OOP 的对比。\n\n<dl>\n  <dt>类</dt>\n  <dd>一组绑定到特定命名空间的方法集合，使用 <code class="nr-sig">[函数:类名]</code> 语法定义。</dd>\n  <dt>实例变量</dt>\n  <dd>以 <code class="nr-sig">.字段</code> 前缀命名的变量，在对象方法调用间自动持久化。</dd>\n  <dt>对象</dt>\n  <dd>通过 <code class="nr-sig">$new ClassName$</code> 创建，每个实例维护独立的变量作用域。</dd>\n</dl>\n\n## 类定义\n\n使用 `[函数:类名]`、`[f:类名]` 或 `[F:类名]` 语法：\n\n```\n[函数:Counter]初始化\n$打印 初始化$\n.count:0\n\n[f:Counter]add num     ← [f:类名] 是 [函数:类名] 的简写\n.count+:%num%\n\n[函数:Counter]get\n当前计数：%.count%\n```\n\n- 内部触发词为 `类名.方法名`\n- 构造函数查找顺序：`类名.new` → `类名.初始化`\n\n### 类生命周期\n\n一个 NR 对象的完整生命周期如下：\n\n1. **创建**：通过 `$new ClassName args$` 创建对象实例，引擎查找并执行构造函数\n2. **初始化**：构造函数中设置初始实例变量（`.field:value`），构造函数返回类名字符串给调用者\n3. **使用**：通过 `$对象名.方法 参数$` 调用方法；每次方法调用前从存储中加载实例变量，执行后自动写回\n4. **消亡**：当对象变量被覆盖或超出作用域时，实例数据随之释放\n\n**存储机制**：实例变量存储在引擎内部的键值存储中，键的格式为 `对象名.字段名`。这意味着不同对象的 `.count` 完全独立。\n\n## 实例变量 `.字段`\n\n以 `.` 开头的变量是**实例变量**，在同一个对象的多次方法调用之间持久化：\n\n```\n[f:Counter]add num\n.count+:%num%           ← .count 跨调用保持\n```\n\n- 方法调用前从主上下文加载（`对象名.字段`），执行后自动写回\n- 不同对象的实例变量相互独立\n\n## 创建对象与调用方法\n\n```\nobj:$new Counter$\nobj:$new Counter 参数$\n\n$obj.add 5$             ← 调用方法\n$obj.get$               ← 无参调用\n```\n\n方法返回值通过 `$...$` 替换到调用处。\n\n## 自我调用 `$.method$`\n\n在类方法内部，使用 `$.方法名` 调用同一对象的其他方法：\n\n```\n[函数:Counter]get\n$.add 1$                ← 等价于 $Counter.add 1$\n当前计数：%.count%\n```\n\n- `$.method$` 通过 `_` 变量自动解析为 `ClassName.method`\n- 只能在类方法内部使用（`_` 变量不为空时生效）\n- 支持传参：`$.method arg1 arg2$`\n\n## 构造函数与输出\n\n```\n[函数:Counter]初始化\n.count:0\na                       ← 裸文本直接打印到终端\n$打印 初始化$            ← $打印$ 输出到终端\n```\n\n- 构造函数中的裸文本直接打印到终端，不走管道输出\n- `$打印$` 和 `$打印返回$` 同样输出到终端\n- 构造函数返回 `类名` 字符串（可赋给变量）\n\n## NR OOP vs 传统 OOP 对比\n\n| 概念 | NR OOP | 传统 OOP（Java/Python） |\n| --- | --- | --- |\n| 类定义 | `[函数:类名]方法名` 分散定义 | `class { }` 集中定义 |\n| 继承 | 不支持类继承 | `extends` / 接口实现 |\n| 实例变量 | `.字段`，引擎自动持久化 | `this.field`，内存中维护 |\n| 构造函数 | `类名.new` 或 `类名.初始化` | `constructor()` / `__init__()` |\n| 方法调用 | `$对象.方法 args$` | `obj.method(args)` |\n| 自我调用 | `$.method$` 语法糖 | `this.method()` |\n| 访问控制 | 无 public/private，全公开 | public/protected/private |\n| 多态 | 不支持 | 虚函数/接口 |\n| 适用场景 | 对话状态、简单实体、计数器 | 通用软件工程 |\n\n> **注意事项**\n> - **无继承**：NR 不支持类继承。如需共享行为，使用[普通函数](./functions)或[模块引入](./modules)替代\n> - **实例变量命名**：`.字段` 命名空间与普通变量独立，`.count` 和 `count` 是两个不同的变量\n> - **构造函数返回值**：构造函数返回的是**类名字符串**（如 `"Counter"`），而非对象引用。真正的"对象标识"是赋值的变量名\n> - **方法中修改实例变量**：在类方法中修改 `.字段` 后，引擎**在执行完毕后自动写回**——不需要显式的 "save" 操作\n> - 关于对象创建 `$new$` 的更多用法，参见[对象创建](./flow-output)\n\n[← JSON 数据处理](./json) [模块与引入 →](./modules)\n',al=`# $打印返回$ — 输出并返回

基础函数 | 无需导入。

<dl>
  <dt>格式</dt><dd><code>$打印返回 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>内容本身（同时写入结果流）</dd>
</dl>

同时输出和返回值，适用于需要输出日志的同时传递数据。

\`\`\`
result:$打印返回 %msg%$
\`\`\`

> \`$打印返回$\` 追加到结果流同时作为表达式值返回。`,cl=`# $打印$ — 输出内容

基础函数 | 无需导入。

<dl>
  <dt>格式</dt><dd><code>$打印 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>空字符串（不产生表达式返回值）</dd>
</dl>

输出到结果流，不产生返回值（在 \`$...$\` 中替换为空字符串）。

\`\`\`
$打印 你好，世界！$
$打印 当前值：%count%$
\`\`\`

> \`$打印$\` 追加到结果流但不产生表达式值，适用于纯日志输出。`,ul=`# 服务器

基础函数 | 共 1 个函数。\`$启动服务器$\` 启动 TCP/HTTP 服务器，自动检测协议。

### \`$启动服务器$\` — TCP/HTTP 服务器

<dl>
  <dt>格式</dt><dd><code>$启动服务器 [端口] [处理函数]$</code></dd>
  <dt>参数</dt><dd>监听端口、可选的处理函数</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

启动 TCP 服务器，监听 \`0.0.0.0:端口\`：

\`\`\`
$启动服务器 8080 handle$
\`\`\`

## HTTP 模式 vs TCP 模式

| 特性 | HTTP 模式 | TCP 模式 |
| --- | --- | --- |
| 检测方式 | 请求首行匹配 HTTP 方法（GET/POST/PUT/DELETE 等） | 首行不匹配 HTTP 方法 |
| 触发词来源 | 请求路径（不含查询参数） | 首行原始内容 |
| 响应格式 | 标准 HTTP 响应（状态行 + 头部 + 正文） | 原始文本，无 HTTP 包装 |
| 连接模型 | 每个请求一个连接（短连接） | 持续交互（长连接），逐行读写 |
| \`_DATA\` 变量 | 包含完整 HTTP 请求正文 | 不适用 |
| 适用场景 | Web API、网页服务 | 自定义协议、聊天服务 |

- 自动检测 HTTP 请求（GET/POST/PUT/DELETE 等），返回标准 HTTP 响应
- **HTTP 模式**：请求路径作为触发词，\`%触发%\` 为路径
- **TCP 模式**：首行作为触发词，后续行持续交互（长连接）
- 处理函数可选，不指定时直接按触发词匹配主词条

> 服务器自动检测 HTTP/TCP，HTTP 模式返回标准响应，TCP 模式支持长连接逐行交互。配合 [@访问](./network) 可构建完整 Web 服务。

[← 输出](./output) [对象创建 →](./object)
`,fl=`# @字符串

导入：\`#引入=@字符串\`（不赋变量名，函数全局可用）| 共 22 个函数。提供长度、分割、大小写转换、对齐、判断等全面的字符串操作。\`$截取$\`、\`$替换$\`、\`$删前缀$\`、\`$删后缀$\` 属于基础函数，无需导入。

<a id="string-substr"></a>

### \`$截取$\` — 截取子串 <span class="badge">基础</span>

<dl>
  <dt>格式</dt><dd><code>$截取 [字符串] [开始] [长度]$</code></dd>
  <dt>参数</dt><dd>字符串、起始索引（从 0 开始）、可选的长度</dd>
  <dt>返回值</dt><dd>截取的子串</dd>
</dl>

索引从 0 开始。若省略长度参数，则截取从起点到末尾。Unicode 字符按字符边界截取，不会从多字节字符中间切断。

\`\`\`
$截取 hello 1 3$   → "ell"
$截取 你好世界 2$    → "世界"
\`\`\`

<a id="string-replace"></a>

### \`$替换$\` — 替换子串 <span class="badge">基础</span>

<dl>
  <dt>格式</dt><dd><code>$替换 [字符串] [旧] [新]$</code></dd>
  <dt>参数</dt><dd>源字符串、要替换的旧子串、新子串</dd>
  <dt>返回值</dt><dd>替换后的字符串</dd>
</dl>

将字符串中**所有**出现的旧子串替换为新子串（全局替换，非仅首个匹配）。

\`\`\`
$替换 hello world o x$   → "hellx wxrld"
\`\`\`

<a id="string-trim-prefix"></a>

### \`$删前缀$\` — 删除前缀 <span class="badge">基础</span>

<dl>
  <dt>格式</dt><dd><code>$删前缀 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的前缀</dd>
  <dt>返回值</dt><dd>删除前缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删前缀 https://example.com https://$   → "example.com"
\`\`\`

<a id="string-trim-suffix"></a>

### \`$删后缀$\` — 删除后缀 <span class="badge">基础</span>

<dl>
  <dt>格式</dt><dd><code>$删后缀 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的后缀</dd>
  <dt>返回值</dt><dd>删除后缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删后缀 file.txt .txt$   → "file"
\`\`\`

<a id="string-len"></a>

### \`$长度$\` — 获取字符串长度

<dl>
  <dt>格式</dt><dd><code>$长度 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>字符数（非字节数）</dd>
</dl>

对于 Unicode 字符串，返回的是**字符数**（而非字节数），一个中文字、一个 emoji 均计为 1。这与某些语言的 \`len()\` 返回字节数不同。

\`\`\`
$长度 hello$        → "5"
$长度 你好世界$      → "4"
\`\`\`

<a id="string-contains"></a>

### \`$文本包含$\` — 判断是否包含子串

<dl>
  <dt>格式</dt><dd><code>$文本包含 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串</dd>
  <dt>返回值</dt><dd>"1"（包含）或 "0"（不包含）</dd>
</dl>

判断字符串中是否包含指定子串。区分大小写。

\`\`\`
$文本包含 hello ll$    → "1"
$文本包含 hello xy$    → "0"
\`\`\`

<a id="string-split"></a>

### \`$文本分割$\` — 按分隔符切分取索引

<dl>
  <dt>格式</dt><dd><code>$文本分割 [字符串] [分隔符] [索引]$</code></dd>
  <dt>参数</dt><dd>源字符串、分隔符、索引（从 0 开始）</dd>
  <dt>返回值</dt><dd>指定索引位置的元素；索引越界返回空字符串</dd>
</dl>

按分隔符将字符串切分为数组，返回指定索引位置的元素。

\`\`\`
$文本分割 a,b,c , 0$   → "a"
\`\`\`

<a id="string-trim"></a>

### \`$头尾去空$\` — 去除首尾空白

<dl>
  <dt>格式</dt><dd><code>$头尾去空 [文本]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>去除首尾空白后的字符串</dd>
</dl>

去除字符串首尾的空白字符（空格、制表符、换行符等）。不会修改字符串中间的空白。

\`\`\`
$头尾去空 \\ \\ hello\\ \\ $   → "hello"
\`\`\`

<a id="string-is-digit"></a>

### \`$判断数字$\` — 判断是否全为数字

<dl>
  <dt>格式</dt><dd><code>$判断数字 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为数字）或 "0"（否则）</dd>
</dl>

判断字符串是否全部由数字字符组成。注意：含小数点、负号的字符串（如 "-3.14"）返回 "0"。

\`\`\`
$判断数字 123$       → "1"
$判断数字 hello$     → "0"
\`\`\`

<a id="string-upper"></a>

### \`$大写$\` — 转大写

<dl>
  <dt>格式</dt><dd><code>$大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有小写字母转为大写后的字符串</dd>
</dl>

将字符串中所有小写字母转为大写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$大写 hello$         → "HELLO"
\`\`\`

<a id="string-lower"></a>

### \`$小写$\` — 转小写

<dl>
  <dt>格式</dt><dd><code>$小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有大写字母转为小写后的字符串</dd>
</dl>

将字符串中所有大写字母转为小写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$小写 HELLO$         → "hello"
\`\`\`

<a id="string-title"></a>

### \`$首字母大写$\` — 首字母大写

<dl>
  <dt>格式</dt><dd><code>$首字母大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>每个单词首字母大写后的字符串</dd>
</dl>

将每个单词的首字母转为大写，其余字母转为小写。单词以空白字符为分界。

\`\`\`
$首字母大写 hello world$   → "Hello World"
\`\`\`

<a id="string-swapcase"></a>

### \`$大小写互换$\` — 大小写互换

<dl>
  <dt>格式</dt><dd><code>$大小写互换 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>大小写互换后的字符串</dd>
</dl>

将字符串中的大写字母转为小写，小写字母转为大写。非字母字符保持不变。

\`\`\`
$大小写互换 Hello$         → "hELLO"
\`\`\`

<a id="string-find"></a>

### \`$查找$\` — 查找子串位置

<dl>
  <dt>格式</dt><dd><code>$查找 [字符串] [子串] [起始位置]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串、可选的起始位置（默认 0）</dd>
  <dt>返回值</dt><dd>首次出现的索引（从 0 开始）；未找到返回 "-1"</dd>
</dl>

从指定起始位置查找子串首次出现的位置索引。

\`\`\`
$查找 hello e$       → "1"
$查找 hello l 3$     → "3"
\`\`\`

<a id="string-count"></a>

### \`$计数$\` — 统计子串出现次数

<dl>
  <dt>格式</dt><dd><code>$计数 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要统计的子串</dd>
  <dt>返回值</dt><dd>不重叠出现次数</dd>
</dl>

统计子串在字符串中出现的次数。不重叠计数。

\`\`\`
$计数 hello l$       → "2"
\`\`\`

<a id="string-starts-with"></a>

### \`$开头判断$\` — 判断是否以某子串开头

<dl>
  <dt>格式</dt><dd><code>$开头判断 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的前缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$开头判断 https://example.com https$    → "1"
\`\`\`

<a id="string-ends-with"></a>

### \`$结尾判断$\` — 判断是否以某子串结尾

<dl>
  <dt>格式</dt><dd><code>$结尾判断 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的后缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$结尾判断 file.txt .txt$    → "1"
\`\`\`

<a id="string-join"></a>

### \`$文本连接$\` — 用分隔符连接多个文本

<dl>
  <dt>格式</dt><dd><code>$文本连接 [分隔符] [文本1] [文本2] [...]$</code></dd>
  <dt>参数</dt><dd>分隔符、至少两个文本片段</dd>
  <dt>返回值</dt><dd>用分隔符连接后的字符串</dd>
</dl>

用指定的分隔符将多个文本片段连接成一个字符串。支持可变数量的参数。

\`\`\`
$文本连接 , a b c$           → "a,b,c"
\`\`\`

<a id="string-repeat"></a>

### \`$文本重复$\` — 重复文本

<dl>
  <dt>格式</dt><dd><code>$文本重复 [文本] [次数]$</code></dd>
  <dt>参数</dt><dd>要重复的文本、重复次数</dd>
  <dt>返回值</dt><dd>重复拼接后的字符串</dd>
</dl>

将文本重复指定次数后拼接。当重复次数很大时请注意性能影响。

\`\`\`
$文本重复 ab 3$      → "ababab"
\`\`\`

<a id="string-is-alpha"></a>

### \`$判断字母$\` — 判断是否全为字母

<dl>
  <dt>格式</dt><dd><code>$判断字母 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为 A-Z、a-z）或 "0"（否则）</dd>
</dl>

\`\`\`
$判断字母 Hello$        → "1"
\`\`\`

<a id="string-is-lower"></a>

### \`$判断小写$\` — 判断是否全为小写

<dl>
  <dt>格式</dt><dd><code>$判断小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为小写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$判断小写 hello$         → "1"
\`\`\`

<a id="string-is-upper"></a>

### \`$判断大写$\` — 判断是否全为大写

<dl>
  <dt>格式</dt><dd><code>$判断大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为大写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$判断大写 HELLO$         → "1"
\`\`\`

<a id="string-is-whitespace"></a>

### \`$判断空白$\` — 判断是否全为空白

<dl>
  <dt>格式</dt><dd><code>$判断空白 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为空白字符）或 "0"（否则）</dd>
</dl>

空字符串也返回 "1"。

\`\`\`
$判断空白 \\ \\ $           → "1"
\`\`\`

<a id="string-pad-left"></a>

### \`$左对齐$\` — 左对齐填充

<dl>
  <dt>格式</dt><dd><code>$左对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>左对齐并在右侧填充后的字符串</dd>
</dl>

将文本靠左对齐，右侧用填充字符补足到指定宽度。若文本已超过宽度则不做截断。

\`\`\`
$左对齐 hi 5$            → "hi   "
\`\`\`

<a id="string-pad-right"></a>

### \`$右对齐$\` — 右对齐填充

<dl>
  <dt>格式</dt><dd><code>$右对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>右对齐并在左侧填充后的字符串</dd>
</dl>

\`\`\`
$右对齐 42 5 0$          → "00042"
\`\`\`

<a id="string-pad-center"></a>

### \`$居中$\` — 居中对齐填充

<dl>
  <dt>格式</dt><dd><code>$居中 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>居中对齐并用填充字符两侧填充后的字符串</dd>
</dl>

将文本居中对齐，两侧用空格补足到指定宽度。若两侧填充数不相等，左侧少填一个。

\`\`\`
$居中 hi 6$              → "  hi  "
\`\`\`

## 性能提示

字符串在 NR 中是**不可变**的：每次字符串操作（拼接、截取等）都会产生新的字符串对象。在循环中对大量字符串进行拼接时，建议使用 \`$文本连接$\` 一次性拼接多个片段，而非多次拼接操作，以减少内存分配次数。

\`$文本重复$\` 在重复次数极大（万级以上）时内存占用会显著增加，请合理控制重复次数。

## Unicode 行为说明

\`$长度$\` 以 Unicode 字符（grapheme cluster）为最小单位操作，不会在多字节字符中间切断。大小写转换函数（\`$大写$\`、\`$小写$\`、\`$首字母大写$\`、\`$大小写互换$\`）目前仅处理 ASCII 范围内的英文字母，中文字符不受影响。判断类函数（\`$判断字母$\`、\`$判断数字$\` 等）也仅基于 ASCII 字符集进行判断。

> 所有字符串函数均基于字符（非字节）操作，Unicode 安全。判断类函数返回 "1"/"0"。需要数字判断和转换的场景，请结合 [@类型](./type) 模块使用。

[← 流程控制·输出](./flow-output) [@数学 →](./math)
`,dl=`# @类型

导入：\`t:#引入=@类型\` | 共 4 个函数。提供文本与数字之间的显式类型转换，以及转换失败的边界行为说明。

## 类型转换概述

NR 是**弱类型**语言，大多数场景下值会自动在文本和数字之间转换——例如 \`$@.计算 1+2$\` 会将参数 "1" 和 "2" 自动转为数字计算。但在以下场景中，**显式类型转换**是必需的：

- 从外部数据源（文件读取、网络响应）获取的数据始终是字符串，需要转为数字才能参与数学运算
- 需要确保某个值是数字类型以触发引擎的数值路径（某些函数对数字和文本有不同行为）
- 需要将数字转为文本以拼接或保存

类型转换的结果通过特殊前缀 \`__N\` 标记为"数值型内部值"，引擎在后续操作中将其视为数字。

## 转换失败与边界情况

当输入无法解析为目标类型时，\`$t.转数字$\`、\`$t.转整数$\`、\`$t.转浮点$\` 均返回**空字符串（不赋值）**，而非抛出错误或返回 0。常见边界情况：

| 输入 | \`$t.转数字$\` | \`$t.转整数$\` | \`$t.转浮点$\` |
| --- | --- | --- | --- |
| \`"123"\` | __N123 | __N123 | __N123 |
| \`"3.14"\` | __N3.14 | __N3 | __N3.14 |
| \`"hello"\` | （空） | （空） | （空） |
| \`""\` | （空） | （空） | （空） |
| \`"42abc"\` | （空） | （空） | （空） |
| \`"-5"\` | __N-5 | __N-5 | __N-5 |
| \`"1e3"\` | __N1000 | __N1 | __N1000 |

注意：\`$t.转整数$\` 对浮点文本执行**向零截断**（直接丢弃小数部分），而非四舍五入。科学计数法（如 "1e3"）在转整数时仅解析到 "1" 即停止。

<a id="type-to-string"></a>

### \`$t.转文本$\` — 将值转为文本

- **格式**：\`$t.转文本 [值]$\`
- **参数**：任意类型的值
- **返回值**：值的文本表示

将任意值转换为字符串形式。

\`\`\`
$t.转文本 123$         → "123"
$t.转文本 %count%$     → count 的文本形式
\`\`\`

<a id="type-to-number"></a>

### \`$t.转数字$\` — 文本转数字

- **格式**：\`$t.转数字 [文本]$\`
- **参数**：要转换的文本
- **返回值**：数字值（内部标记 __N）；失败时返回空字符串

将文本解析为 f64 浮点数。支持整数、小数、负数、科学计数法。

\`\`\`
$t.转数字 3.14$        → "__N3.14"
$t.转数字 hello$       → （空）
\`\`\`

<a id="type-to-int"></a>

### \`$t.转整数$\` — 文本转整数

- **格式**：\`$t.转整数 [文本]$\`
- **参数**：要转换的文本
- **返回值**：整数值（向零截断）；失败时返回空字符串

将文本解析为整数，支持浮点文本自动截断取整（向零方向）。

\`\`\`
$t.转整数 42$          → "__N42"
$t.转整数 3.99$        → "__N3"
\`\`\`

<a id="type-to-float"></a>

### \`$t.转浮点$\` — 文本转浮点

- **格式**：\`$t.转浮点 [文本]$\`
- **参数**：要转换的文本
- **返回值**：浮点数值；失败时返回空字符串

将文本解析为 f64 浮点数，与 \`$t.转数字$\` 行为一致。

\`\`\`
$t.转浮点 3.14$        → "__N3.14"
$t.转浮点 5$           → "__N5"
\`\`\`

> 类型转换失败时均返回空字符串（不赋值），建议在关键转换前配合判断函数做前置验证。详情参见 [@数学](./math) 的浮点精度说明。

[← @访问](./network)

[@画布 →](./canvas)
`,hl='# 类型系统\n\nNR 的类型系统是**动态、弱类型**的——变量无需声明类型，运行时自动确定。值在大多数场景下会自动在文本和数字之间转换，`==` 运算符做宽松比较。本章涵盖 NR 中的原始数据类型（没有对象/数组，只有文本、数字和布尔值），以及类型检测、判断和转换操作。\n\nNR 的 `Value` 不是简单的"字符串或数字"二分法——它是一个完整的枚举类型，内部由 Rust 的 `enum` 实现，每个变体携带不同的数据表示。这意味着两个值即使"看起来一样"，也可能属于不同类型，进而影响相等性比较和运算行为。\n\n## 类型一览\n\nNR 变量存储的是**带类型的值**（`Value`），而非纯字符串。类型在赋值时自动推断。\n\n| 类型 | 示例 | 说明 |\n|------|------|------|\n| `整数` | `1`, `-5`, `100` | 64 位有符号整数 |\n| `浮点` | `1.5`, `-0.5`, `3.14` | 64 位浮点数 |\n| `字符串` | `"hello"`, `abc` | 字符串 |\n| `布尔` | `true`, `false` | 布尔值 |\n| `空` | `null` | 空值 |\n| `对象` | — | 对象引用（`$new$` 返回） |\n| `函数` | — | 函数指针（`%func@name%` 返回） |\n\n- `count:5` → Int，`name:Alice` → Str\n- 但 `[...]` 数学表达式运算结果保留数值类型\n- `$new$` 返回值为对象类型\n- `%func@key%` 返回值为函数类型\n\n## 各类型详解\n\n### 整数（Int）\n\n64 位有符号整数（`i64`），范围约为 `-9.2×10¹⁸` 到 `9.2×10¹⁸`。\n\n```\na:42\nb:-100\nc:0\n\n%TYPE@a%   → "整数"\n%TYPE@b%   → "整数"\n%TYPE@c%   → "整数"\n```\n\n整数字面量不能包含小数点、前导零（会被当作十进制解析）或科学计数法。\n\n### 浮点（Float）\n\n64 位浮点数（`f64`），符合 IEEE 754 标准。\n\n```\npi:3.14\nneg:-0.5\nbig:1.5e10\n\n%TYPE@pi%    → "浮点"\n%TYPE@neg%   → "浮点"\n%TYPE@big%   → "浮点"\n```\n\n浮点数和整数在比较（`==`）时**视为不同**：`1 == 1.0` 在严格比较下为假。浮点运算可能产生精度误差，这是 IEEE 754 浮点数的固有特性。\n\n### 字符串（Str）\n\nUTF-8 编码的字符串。不带特殊前缀的纯文本字面量自动判定为字符串。\n\n```\nname:Alice\ngreeting:Hello World\nempty:""              ← 显式空字符串\n\n%TYPE@name%       → "字符串"\n%TYPE@greeting%   → "字符串"\n```\n\n注意：`greeting:Hello World` 中空格不需要转义（赋值操作符 `:` 之后直到行尾均为值部分）。但在 `$...$` 参数传递中空格会分割参数，参见 [词法结构 § 转义规则](./lexical)。\n\n### 布尔（Bool）\n\n只有 `true` 和 `false` 两个字面量。\n\n```\nflag:true\ndone:false\n\n%TYPE@flag%   → "布尔"\n%TYPE@done%   → "布尔"\n```\n\n布尔值可直接用于条件表达式（[控制流](./control-flow)），也可参与逻辑运算（[表达式 § 逻辑运算符](./expressions)）。\n\n### 空值（Null）\n\n表示"无值"或"未设置"。仅有一种字面量：`null`。\n\n```\ndata:null\n\n%TYPE@data%   → "空"\n```\n\n`null` 与空字符串 `""` 不同：`null` 是一个独立的类型标记，而 `""` 是值为空的字符串。在条件判断中，`null` 被视为假值。\n\n### 对象（Object）\n\n由 `$new$` 创建，内部持有一个 JSON 对象引用。对象类型值不可直接输出为文本，需通过 `%TYPE@` 查询或使用 JSON 操作符访问其字段。\n\n```\nobj:$new$ {"key":"val"}\n\n%TYPE@obj%   → "对象"\n```\n\n`$new$` 不是赋值操作符——它是创建新对象的内置函数，参见 [词条系统](./entries)。\n\n### 函数（Func）\n\n由 `%func@name%` 获取，存储的是函数指针/引用，而非函数体文本。\n\n```\nptr:%func@greet%\n\n%TYPE@ptr%   → "函数"\n```\n\n函数类型值主要用途：作为回调传入其他函数，或在需要延迟调用时暂存。\n\n## 类型特性对照\n\n| 类型 | 可修改（`+:` 等） | 宽松相等 `==` | 严格相等 `===` | 数值排序 `>` `<` |\n|------|-------------------|--------------|---------------|------------------|\n| Int | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Float | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Str | ✅ 串接 | 内容比较（含类型转换） | 值和类型均相同 | ❌ 无意义 |\n| Bool | ❌ | 字符串化后比较 | 值和类型均相同 | ❌ |\n| Null | ❌ | — | — | ❌ |\n| Object | — | 引用相等 | 引用相等 | ❌ |\n| Func | ❌ | 引用相等 | 引用相等 | ❌ |\n\n## 类型强制转换与兼容性\n\n### 算术上下文中的类型转换\n\n在 `[...]` 数学表达式中，操作数的类型决定了运算结果的类型：\n\n```\n// 整数运算 → 整数\na:[1+2]          → Int(3)\n\n// 浮点数参与 → 浮点\nb:[1+2.0]        → Float(3.0)\nc:[3.14*2]       → Float(6.28)\n\n// 字符串自动转为数值参与运算\nd:["3"+2]        → Int(5)  或报错\n```\n\n- 整数 + 整数 → 整数\n- 任一操作数为浮点 → 结果提升为浮点\n- 字符串操作数：尝试按数值解析，失败则报错\n\n### 比较上下文中的类型转换\n\n`==`（宽松相等）会将两边值转为字符串后比较：\n\n```\n1 == "1"       → true（都转为 "1"）\n1 == 1.0       → true（都转为 "1"，但用 === 则为 false）\ntrue == "true" → true\nnull == ""     → false（"null" ≠ ""）\n```\n\n`===`（严格相等）要求**类型和值都相同**：\n\n```\n1 === 1       → true\n1 === 1.0     → false（Int vs Float）\n"1" === 1     → false（Str vs Int）\ntrue === true → true\n```\n\n**注意事项：**\n\n- 条件判断中（如 `如果:`），**推荐使用严格比较 `===`** 以避免意外的类型转换带来的误判。\n- 数值比较（`>`、`<`、`>=`、`<=`）要求两边均为数值类型（Int 或 Float），字符串会被尝试解析为数值。\n- `0`、`""`、`null`、`false` 在布尔上下文中均为"假"，但它们彼此之间**不相等**（除了 `0 == false` 会因为字符串化为 `"0" == "false"` 而返回假）。\n\n## 类型查询 `%TYPE@var%`\n\n```\ncount:5\nname:Alice\n\n%TYPE@count%   → "整数"\n%TYPE@name%    → "字符串"\n```\n\n未设置变量返回空字符串。\n',pl='# 变量与赋值\n\n变量是 NR 中最基本的存储单元。本章涵盖变量的作用域规则、赋值操作符的语义差异、条件赋值、内置变量以及文本切片等核心机制。理解变量系统是正确组织数据流和控制状态的前提，与[类型系统](./types)和[表达式](./expressions)密切协作。\n\nNR 的赋值不是简单的"文本替换"——它会根据操作符和值的内容自动推断类型（[§ 类型一览](./types)），并在不同作用域间管理变量生命周期。\n\n## 作用域\n\n| 类型 | 作用域 | 说明 |\n|------|--------|------|\n| 局部变量 | 当前上下文 | 子上下文创建时重置 |\n| 全局变量 | 所有子上下文 | 子上下文创建时克隆共享 |\n\n### 作用域选择规则\n\nNR 根据**赋值位置**自动决定变量的作用域：\n\n- **头部区域（第一个空行之前）**中赋值的变量为**全局变量**。这些变量在词条触发、函数调用等子上下文中可被读取和修改。\n- **词条、函数、循环体内部**中首次赋值的变量为**局部变量**。局部变量仅在当前执行上下文中可见，进入子函数或子上下文时会创建独立的副本。\n\n```\n// 头部区域 → 全局变量，整个文件可见\ncounter:0\nbase_url:https://api.example.com\n\n// ← 空行分隔\n\n// 词条内部 → 局部变量\n开始\ntemp:%counter%             ← 可读全局变量\ncounter+:[%counter%+1]   ← 可修改全局变量\nlocal_var:临时值            ← 局部变量，外部不可见\n```\n\n### 作用域注意事项\n\n- 全局变量在**每次词条触发时保持其值**，不会重置。这使得 `counter+:1` 可以在多次触发间累加。\n- 子上下文（如 `$call$` 函数调用）中读取全局变量时，获取的是**当前快照值**；修改全局变量会影响父上下文。\n- 在同一作用域中，对已存在的变量再次使用 `:` 赋值会**覆盖**其值和类型。\n\n## 赋值操作符\n\n| 操作符 | 示例 | 语义 |\n|--------|------|------|\n| `:` | `name:Alice` | **自适应赋值**：值尝试解析为 JSON 字面量（数字/布尔/null/对象/数组），不成则当字符串 |\n| `::` | `greeting::Hello` | **纯文本赋值**：值始终作为字符串，不解析 JSON |\n| `+:` | `score+:5` | 自增 / JSON追加 / 字符串拼接 |\n| `-:` | `count-:1` | 自减 |\n| `*:` | `val*:2` | 乘法 / 字符串重复 |\n| `/:` | `val/:2` | 除法 |\n| `%:` | `val%:3` | 取余 |\n\n> 只有 ASCII 半角冒号 `:`（U+003A）被识别为赋值操作符。中文全角冒号 `：`（U+FF1A）**不是**操作符，在文本中直接原样输出。\n\n### `:`（自适应赋值）vs `::`（纯文本赋值）\n\n这是 NR 中最容易被忽视但最重要的语义差异：\n\n| 特性 | `:`（单冒号） | `::`（双冒号） |\n|------|-------------|---------------|\n| 值解析 | 尝试解析为 JSON 字面量 | 始终作为字符串 |\n| `1` | Int(1) | Str("1") |\n| `1.5` | Float(1.5) | Str("1.5") |\n| `true` | Bool(true) | Str("true") |\n| `null` | Null | Str("null") |\n| `{"a":1}` | JSON 对象 | Str("{\'a\':1}") |\n| `Alice` | Str("Alice") | Str("Alice") |\n\n```\n// : 自适应赋值——数字被识别为数值类型\ncount:100\n%TYPE@count%   → "整数"\n\n// :: 纯文本赋值——永远是字符串\nid::100\n%TYPE@id%      → "字符串"\n\n// 实际影响：数学运算\n[%count%+1]   → 101   （Int 运算）\n// [%id%+1]   → 报错 / 意外（字符串不能加）\n```\n\n### 何时使用 `::`\n\n- 存储**编号、ID、电话号**等不应被当作数字处理的值（如 `id::001` 不会丢掉前导零）\n- 存储可能是数字字面量的**字符串**（如文件名"123.json"）\n- 需要精确控制类型以避免意外数值运算的场景\n\n**注意事项：** 当你对 `::` 赋值的变量使用 `+:`（自增）时，由于值是字符串，`+:` 会执行**字符串拼接**而非数学加法。这可能不是你想要的行为。\n\n## 条件赋值 `?:`\n\n```\nkey:@a?:@b?:fallback\n```\n\n从左到右尝试读取 JSON 路径，第一个非空、非 null、非 false 的值被赋值。\n\n## 内置变量\n\n| 变量 | 说明 |\n|------|------|\n| `%空格%` | 空格 `" "` |\n| `%换行%` | 换行 `"\\n"` |\n| `%时间戳%` | Unix 时间戳（秒） |\n| `%毫秒时间戳%` | Unix 时间戳（毫秒） |\n| `%微秒时间戳%` | Unix 时间戳（微秒） |\n| `%纳秒时间戳%` | Unix 时间戳（纳秒） |\n| `%时间%` | 格式化本地时间 `YYYY-MM-DD HH:MM:SS`（UTC+8） |\n| `%随机数M-N%` | 随机整数 `[M, N]`（含两端） |\n| `%!key%` | 布尔取反：空/0/false/null → `"1"`，否则 → `"0"` |\n| `%?key%` | 可选变量：不存在返回空字符串 |\n| `%++var%` | 自增：先自增再返回递增后的值（变量不存在默认 0） |\n| `%--var%` | 自减：先自减再返回递减后的值（变量不存在默认 0） |\n| `%参数%` | 所有参数列表（JSON 数组） |\n| `%参数0%` | 函数名 / 完整触发名 |\n| `%参数N%` | 第 N 个参数 |\n| `%_%` | 当前对象名 / 函数名 |\n| `%触发%` | 当前触发词 |\n| `%行数%` | 当前行号（1-based） |\n| `%B64@key%` | Base64 解码 |\n| `%URL编码@key%` | URL 编码 |\n| `%len@key%` / `%长度@key%` | 返回变量值的字符长度 |\n| `%@var[切片]%` / `@var[切片]` | 符号截取文本（Python 风格切片，支持 `%` 快捷两种写法） |\n| `%func@key%` | 获取函数指针（类型为"函数"，display 为函数名） |\n| `%包名.变量%` | 跨包变量引用（如 `%mypkg.x%` 读取引入包的头部变量） |\n\n### 内置变量的生命周期\n\n内置变量（`%xxx%`）与用户定义的变量在生命周期上有本质区别：\n\n- **即时求值**：每次读取内置变量（如 `%时间戳%`）时，都会**重新计算**当前值。它不存储"快照"，而是每次调用运行时函数。\n- **不可赋值**：不能对内置变量使用 `:` 赋值——`%时间戳%:123` 是无效的。\n- **临时性**：内置变量的值仅在当前表达式求值瞬间有效。如需多次使用同一值，应将其赋值给用户变量：`ts:%时间戳%`。\n- **参数变量 `%参数N%`** 在函数体内是局部变量，函数返回后失效；在词条触发时反映的是触发参数。\n\n```\n// 推荐做法：缓存内置变量\nstart_time:%毫秒时间戳%\n// ... 多步操作 ...\nelapsed:[%毫秒时间戳%-%start_time%]   ← 两次读取产生不同值，差值有意义\n```\n\n## 符号截取文本 `%@var[切片]%` / `@var[切片]`\n\n内联文本切片语法，对变量值按字符（`.chars()`）进行 Python 风格切片。中文、emoji 等多字节字符均算一个字符。\n\n**两种写法等价**：\n\n- `%@var[切片]%` —— 标准写法，需 `%` 包裹\n- `@var[切片]` —— 快捷写法，无需 `%` 包裹，直接解析\n\n**基本语法**：`@变量名[start:end:step]`\n\n| 写法 | 含义 |\n|------|------|\n| `@a[1:]` | 从第 2 个字符到末尾 |\n| `@a[1:3]` | 第 2 ~ 3 个字符（index 1 和 2，不含 3） |\n| `@a[:3]` | 前 3 个字符 |\n| `@a[-3:]` | 末尾 3 个字符 |\n| `@a[1:6:2]` | index 1~5，步长 2（隔一个取一个） |\n| `@a[::2]` | 从头到尾，步长 2 |\n| `@a[::-1]` | 反转字符串 |\n\n```\nname:你好世界NR语言\n\n%name%             → "你好世界NR语言"\n%len@name%         → "8"\n\n// 标准写法\n%@name[1:]%        → "好世界NR语言"\n%@name[1:3]%       → "好世"\n%@name[:2]%        → "你好"\n%@name[-3:]%       → "R语言"\n%@name[::-1]%      → "言语RN界世好你"\n\n// 快捷写法（无需 % 包裹）\n@name[1:]          → "好世界NR语言"\n@name[1:3]         → "好世"\n@name[:2]          → "你好"\n@name[-3:]         → "R语言"\n@name[::-1]        → "言语RN界世好你"\n```\n\n> 快捷写法 `@var[切片]` 通过方括号内含 `:` 来与 JSON 路径导航（`@json[key]`）区分。不含 `:` 的方括号仍走 JSON 路径逻辑。\n',Cf=Object.assign({"../../v1.0/canvas.md":Go,"../../v1.0/control-flow.md":qo,"../../v1.0/entries.md":Ko,"../../v1.0/expressions.md":Jo,"../../v1.0/file.md":Wo,"../../v1.0/flow-callback.md":Yo,"../../v1.0/flow-main-callback.md":Zo,"../../v1.0/flow-output.md":Qo,"../../v1.0/functions.md":Xo,"../../v1.0/index.md":nl,"../../v1.0/json.md":el,"../../v1.0/lexical.md":tl,"../../v1.0/math.md":sl,"../../v1.0/modules.md":rl,"../../v1.0/network.md":il,"../../v1.0/object.md":ol,"../../v1.0/oop.md":ll,"../../v1.0/output-print-return.md":al,"../../v1.0/output-print.md":cl,"../../v1.0/server.md":ul,"../../v1.0/string.md":fl,"../../v1.0/type.md":dl,"../../v1.0/types.md":hl,"../../v1.0/variables.md":pl}),gl=[];for(const[n,e]of Object.entries(Cf)){const t=n.match(/v1\.0\/(.+)\.md$/);if(!t)continue;let s=t[1];const r=s==="index"?"/v1.0/":`/v1.0/${s}`,i=e.match(/^#\s+(.+)$/m),o=i?i[1]:r,l=[],a=/^#{2,3}\s+(.+)$/gm;let u;for(;(u=a.exec(e))!==null;)l.push(u[1]);gl.push({path:r,title:o,headings:l,content:e})}function If(n){if(!n.trim())return[];const e=n.toLowerCase().split(/\s+/).filter(Boolean);return gl.filter(t=>{const s=(t.title+" "+t.headings.join(" ")+" "+t.content).toLowerCase();return e.every(r=>s.includes(r))}).map(t=>{const s=t.content.toLowerCase().indexOf(e[0]),r=Math.max(0,s-40),i=Math.min(t.content.length,s+120);let o=t.content.slice(r,i).replace(/\n+/g," ");return r>0&&(o="..."+o),i<t.content.length&&(o+="..."),{...t,snippet:o}}).slice(0,10)}const Mf={class:"search-modal"},Lf={class:"search-input-wrap"},Df={key:0,class:"search-results"},Hf=["onClick","onMouseenter"],Bf={class:"result-title"},Ff={class:"result-path"},jf={class:"result-snippet"},Uf={key:1,class:"search-empty"},Vf={__name:"SearchModal",emits:["close"],setup(n,{emit:e}){const t=e,s=pe(""),r=pe([]),i=pe(0),o=pe(null);os(()=>{var u;return(u=o.value)==null?void 0:u.focus()}),Ce(s,u=>{r.value=If(u),i.value=0});function l(u){window.location.hash="#"+u,t("close")}function a(u){u.key==="Escape"?t("close"):u.key==="ArrowDown"?(u.preventDefault(),i.value=Math.min(i.value+1,r.value.length-1)):u.key==="ArrowUp"?(u.preventDefault(),i.value=Math.max(i.value-1,0)):u.key==="Enter"&&r.value[i.value]&&l(r.value[i.value].path)}return(u,c)=>(j(),U("div",{class:"search-overlay",onClick:c[2]||(c[2]=Xc(f=>t("close"),["self"]))},[V("div",Mf,[V("div",Lf,[c[3]||(c[3]=V("svg",{class:"search-icon",viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor","stroke-width":"2"},[V("circle",{cx:"11",cy:"11",r:"8"}),V("path",{d:"m21 21-4.35-4.35"})],-1)),$a(V("input",{ref_key:"inputEl",ref:o,"onUpdate:modelValue":c[0]||(c[0]=f=>s.value=f),class:"search-input",placeholder:"搜索文档...",onKeydown:a},null,544),[[Yc,s.value]]),V("button",{class:"search-close",onClick:c[1]||(c[1]=f=>t("close"))},"Esc")]),r.value.length?(j(),U("div",Df,[(j(!0),U(cn,null,Ae(r.value,(f,p)=>(j(),U("div",{key:f.path,class:Bn(["search-result",{active:p===i.value}]),onClick:g=>l(f.path),onMouseenter:g=>i.value=p},[V("div",Bf,vn(f.title),1),V("div",Ff,vn(f.path),1),V("div",jf,vn(f.snippet),1)],42,Hf))),128))])):s.value?(j(),U("div",Uf," 未找到相关结果 ")):Ie("",!0)])]))}},zf=De(Vf,[["__scopeId","data-v-66966829"]]),Gf=["value"],qf="/v1.0/",Kf={__name:"VersionSwitcher",setup(n){const e=[{label:"v1.0",path:"/v1.0/"}];function t(s){window.location.hash="#"+s.target.value}return(s,r)=>(j(),U("select",{class:"version-select",value:qf,onChange:t},[(j(),U(cn,null,Ae(e,i=>V("option",{key:i.path,value:i.path},vn(i.label),9,Gf)),64))],32))}},Jf=De(Kf,[["__scopeId","data-v-8cf198cc"]]),Wf={class:"header"},Yf=["title"],Zf={key:0,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},Qf={key:1,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},Xf={class:"main"},nd={class:"sidebar"},ed={class:"content"},td={key:0,class:"right-aside"},sd={__name:"App",setup(n){const{isDark:e,toggle:t}=iu(),s=pe(!1);function r(i){(i.ctrlKey||i.metaKey)&&i.key==="k"&&(i.preventDefault(),s.value=!0)}return(i,o)=>{const l=Ma("router-view");return j(),U(cn,null,[V("div",{class:"app",onKeydown:r},[V("header",Wf,[o[6]||(o[6]=V("a",{class:"logo",href:"#/"},"NR 语言参考手册",-1)),gn(Jf),o[7]||(o[7]=V("div",{class:"header-spacer"},null,-1)),V("button",{class:"icon-btn",onClick:o[0]||(o[0]=a=>s.value=!0),title:"搜索 (Ctrl+K)"},[...o[3]||(o[3]=[V("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},[V("circle",{cx:"11",cy:"11",r:"8"}),V("path",{d:"m21 21-4.35-4.35"})],-1)])]),V("button",{class:"icon-btn",onClick:o[1]||(o[1]=(...a)=>hn(t)&&hn(t)(...a)),title:hn(e)?"浅色模式":"深色模式"},[hn(e)?(j(),U("svg",Zf,[...o[4]||(o[4]=[V("circle",{cx:"12",cy:"12",r:"5"},null,-1),V("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"},null,-1)])])):(j(),U("svg",Qf,[...o[5]||(o[5]=[V("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])]))],8,Yf)]),V("div",Xf,[V("aside",nd,[gn(Ef)]),V("main",ed,[gn(l)]),i.$route.path!=="/"?(j(),U("aside",td,[gn(Nf)])):Ie("",!0)])],32),s.value?(j(),Ro(zf,{key:0,onClose:o[2]||(o[2]=a=>s.value=!1)})):Ie("",!0)],64)}}},rd=De(sd,[["__scopeId","data-v-a715b592"]]),id={},od={class:"home"};function ld(n,e){return j(),U("div",od,[...e[0]||(e[0]=[pc('<section class="hero" data-v-81833c9c><h1 class="hero-name" data-v-81833c9c>NR 语言</h1><p class="hero-text" data-v-81833c9c>参考手册</p><p class="hero-tagline" data-v-81833c9c>Nebula 词库引擎的领域特定语言</p><a class="hero-btn" href="#/v1.0/" data-v-81833c9c>开始阅读</a></section><section class="features" data-v-81833c9c><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>简洁语法</h3><p data-v-81833c9c>NR 采用直观的触发词-响应模式，头部空行分隔结构，让词库编写像写笔记一样自然。</p></div><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>动态类型</h3><p data-v-81833c9c>支持整数、浮点、字符串、布尔、对象、函数等类型，运行时自动推断，灵活高效。</p></div><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>模块化</h3><p data-v-81833c9c>支持文件/目录引入、跨包调用、热更新，轻松构建大型自动化文本生成系统。</p></div></section><section class="tools" data-v-81833c9c><h2 data-v-81833c9c>工具</h2><p data-v-81833c9c><a href="./vscode-nr/nr-language-1.0.0.vsix" data-v-81833c9c>下载 VS Code 语法高亮扩展 (.vsix)</a></p><p data-v-81833c9c>安装：VS Code → <code data-v-81833c9c>Ctrl+Shift+P</code> → &quot;Install from VSIX...&quot; → 选择下载的文件</p><p class="vsix-notice" data-v-81833c9c>注意：此插件仅提供最新版本，不保证历史版本兼容。</p></section><section class="info" data-v-81833c9c><h2 data-v-81833c9c>项目信息</h2><ul data-v-81833c9c><li data-v-81833c9c><strong data-v-81833c9c>引擎</strong>：Nebula 词库引擎</li><li data-v-81833c9c><strong data-v-81833c9c>实现语言</strong>：Rust</li><li data-v-81833c9c><strong data-v-81833c9c>许可证</strong>：Copyright (c) 2025 保留所有权利</li></ul></section>',4)])])}const ad=De(id,[["render",ld],["__scopeId","data-v-81833c9c"]]);function pr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let He=pr();function $l(n){He=n}const ml=/[&<>"']/,cd=new RegExp(ml.source,"g"),_l=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,ud=new RegExp(_l.source,"g"),fd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_i=n=>fd[n];function Nn(n,e){if(e){if(ml.test(n))return n.replace(cd,_i)}else if(_l.test(n))return n.replace(ud,_i);return n}const dd=/(^|[^\[])\^/g;function tn(n,e){let t=typeof n=="string"?n:n.source;e=e||"";const s={replace:(r,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(dd,"$1"),t=t.replace(r,o),s},getRegex:()=>new RegExp(t,e)};return s}function vi(n){try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const mt={exec:()=>null};function bi(n,e){const t=n.replace(/\|/g,(i,o,l)=>{let a=!1,u=o;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),s=t.split(/ \|/);let r=0;if(s[0].trim()||s.shift(),s.length>0&&!s[s.length-1].trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;r<s.length;r++)s[r]=s[r].trim().replace(/\\\|/g,"|");return s}function it(n,e,t){const s=n.length;if(s===0)return"";let r=0;for(;r<s&&n.charAt(s-r-1)===e;)r++;return n.slice(0,s-r)}function hd(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return-1}function xi(n,e,t,s){const r=e.href,i=e.title?Nn(e.title):null,o=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:r,title:i,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:r,title:i,text:Nn(o)}}function pd(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const s=t[1];return e.split(`
`).map(r=>{const i=r.match(/^\s+/);if(i===null)return r;const[o]=i;return o.length>=s.length?r.slice(s.length):r}).join(`
`)}class Wt{constructor(e){rn(this,"options");rn(this,"rules");rn(this,"lexer");this.options=e||He}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(/^(?: {1,4}| {0,3}\t)/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:it(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],r=pd(s,t[3]||"");return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(/#$/.test(s)){const r=it(s,"#");(this.options.pedantic||!r||/ $/.test(r))&&(s=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:it(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=it(t[0],`
`).split(`
`),r="",i="";const o=[];for(;s.length>0;){let l=!1;const a=[];let u;for(u=0;u<s.length;u++)if(/^ {0,3}>/.test(s[u]))a.push(s[u]),l=!0;else if(!l)a.push(s[u]);else break;s=s.slice(u);const c=a.join(`
`),f=c.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");r=r?`${r}
${c}`:c,i=i?`${i}
${f}`:f;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=p,s.length===0)break;const g=o[o.length-1];if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){const y=g,w=y.raw+`
`+s.join(`
`),C=this.blockquote(w);o[o.length-1]=C,r=r.substring(0,r.length-y.raw.length)+C.raw,i=i.substring(0,i.length-y.text.length)+C.text;break}else if((g==null?void 0:g.type)==="list"){const y=g,w=y.raw+`
`+s.join(`
`),C=this.list(w);o[o.length-1]=C,r=r.substring(0,r.length-g.raw.length)+C.raw,i=i.substring(0,i.length-y.raw.length)+C.raw,s=w.substring(o[o.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const r=s.length>1,i={type:"list",raw:"",ordered:r,start:r?+s.slice(0,-1):"",loose:!1,items:[]};s=r?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=r?s:"[*+-]");const o=new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l=!1;for(;e;){let a=!1,u="",c="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(/^\t+/,L=>" ".repeat(3*L.length)),p=e.split(`
`,1)[0],g=!f.trim(),y=0;if(this.options.pedantic?(y=2,c=f.trimStart()):g?y=t[1].length+1:(y=t[2].search(/[^ ]/),y=y>4?1:y,c=f.slice(y),y+=t[1].length),g&&/^[ \t]*$/.test(p)&&(u+=p+`
`,e=e.substring(p.length+1),a=!0),!a){const L=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),A=new RegExp(`^ {0,${Math.min(3,y-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),N=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:\`\`\`|~~~)`),P=new RegExp(`^ {0,${Math.min(3,y-1)}}#`),Y=new RegExp(`^ {0,${Math.min(3,y-1)}}<(?:[a-z].*>|!--)`,"i");for(;e;){const an=e.split(`
`,1)[0];let Z;if(p=an,this.options.pedantic?(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  "),Z=p):Z=p.replace(/\t/g,"    "),N.test(p)||P.test(p)||Y.test(p)||L.test(p)||A.test(p))break;if(Z.search(/[^ ]/)>=y||!p.trim())c+=`
`+Z.slice(y);else{if(g||f.replace(/\t/g,"    ").search(/[^ ]/)>=4||N.test(f)||P.test(f)||A.test(f))break;c+=`
`+p}!g&&!p.trim()&&(g=!0),u+=an+`
`,e=e.substring(an.length+1),f=Z.slice(y)}}i.loose||(l?i.loose=!0:/\n[ \t]*\n[ \t]*$/.test(u)&&(l=!0));let w=null,C;this.options.gfm&&(w=/^\[[ xX]\] /.exec(c),w&&(C=w[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),i.items.push({type:"list_item",raw:u,task:!!w,checked:C,loose:!1,text:c,tokens:[]}),i.raw+=u}i.items[i.items.length-1].raw=i.items[i.items.length-1].raw.trimEnd(),i.items[i.items.length-1].text=i.items[i.items.length-1].text.trimEnd(),i.raw=i.raw.trimEnd();for(let a=0;a<i.items.length;a++)if(this.lexer.state.top=!1,i.items[a].tokens=this.lexer.blockTokens(i.items[a].text,[]),!i.loose){const u=i.items[a].tokens.filter(f=>f.type==="space"),c=u.length>0&&u.some(f=>/\n.*\n/.test(f.raw));i.loose=c}if(i.loose)for(let a=0;a<i.items.length;a++)i.items[a].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(/\s+/g," "),r=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:r,title:i}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const s=bi(t[1]),r=t[2].replace(/^\||\| *$/g,"").split("|"),i=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===r.length){for(const l of r)/^ *-+: *$/.test(l)?o.align.push("right"):/^ *:-+: *$/.test(l)?o.align.push("center"):/^ *:-+ *$/.test(l)?o.align.push("left"):o.align.push(null);for(let l=0;l<s.length;l++)o.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:o.align[l]});for(const l of i)o.rows.push(bi(l,o.header.length).map((a,u)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[u]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Nn(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&/^</.test(s)){if(!/>$/.test(s))return;const o=it(s.slice(0,-1),"\\");if((s.length-o.length)%2===0)return}else{const o=hd(t[2],"()");if(o>-1){const a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],i="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);o&&(r=o[1],i=o[3])}else i=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(s)?r=r.slice(1):r=r.slice(1,-1)),xi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const r=(s[2]||s[1]).replace(/\s+/g," "),i=t[r.toLowerCase()];if(!i){const o=s[0].charAt(0);return{type:"text",raw:o,text:o}}return xi(s,i,s[0],this.lexer)}}emStrong(e,t,s=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&s.match(/[\p{L}\p{N}]/u))return;if(!(r[1]||r[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const o=[...r[0]].length-1;let l,a,u=o,c=0;const f=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,t=t.slice(-1*e.length+o);(r=f.exec(t))!=null;){if(l=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!l)continue;if(a=[...l].length,r[3]||r[4]){u+=a;continue}else if((r[5]||r[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(u-=a,u>0)continue;a=Math.min(a,a+u+c);const p=[...r[0]][0].length,g=e.slice(0,o+r.index+p+a);if(Math.min(o,a)%2){const w=g.slice(1,-1);return{type:"em",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}const y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(/\n/g," ");const r=/[^ ]/.test(s),i=/^ /.test(s)&&/ $/.test(s);return r&&i&&(s=s.substring(1,s.length-1)),s=Nn(s,!0),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,r;return t[2]==="@"?(s=Nn(t[1]),r="mailto:"+s):(s=Nn(t[1]),r=s),{type:"link",raw:t[0],text:s,href:r,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let r,i;if(t[2]==="@")r=Nn(t[0]),i="mailto:"+r;else{let o;do o=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(o!==t[0]);r=Nn(t[0]),t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let s;return this.lexer.state.inRawBlock?s=t[0]:s=Nn(t[0]),{type:"text",raw:t[0],text:s}}}}const gd=/^(?:[ \t]*(?:\n|$))+/,$d=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,md=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Et=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,_d=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vl=/(?:[*+-]|\d{1,9}[.)])/,bl=tn(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,vl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),gr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,vd=/^[^\n]+/,$r=/(?!\s*\])(?:\\.|[^\[\]\\])+/,bd=tn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$r).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xd=tn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vl).getRegex(),ps="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",mr=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yd=tn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",mr).replace("tag",ps).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xl=tn(gr).replace("hr",Et).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex(),wd=tn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xl).getRegex(),_r={blockquote:wd,code:$d,def:bd,fences:md,heading:_d,hr:Et,html:yd,lheading:bl,list:xd,newline:gd,paragraph:xl,table:mt,text:vd},yi=tn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Et).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex(),kd={..._r,table:yi,paragraph:tn(gr).replace("hr",Et).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex()},Sd={..._r,html:tn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",mr).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:tn(gr).replace("hr",Et).replace("heading",` *#{1,6} *[^
]`).replace("lheading",bl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},yl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Rd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wl=/^( {2,}|\\)\n(?!\s*$)/,Td=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,At="\\p{P}\\p{S}",Ed=tn(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,At).getRegex(),Ad=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Od=tn(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,At).getRegex(),Pd=tn("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,At).getRegex(),Nd=tn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,At).getRegex(),Cd=tn(/\\([punct])/,"gu").replace(/punct/g,At).getRegex(),Id=tn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Md=tn(mr).replace("(?:-->|$)","-->").getRegex(),Ld=tn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Md).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Yt=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Dd=tn(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Yt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),kl=tn(/^!?\[(label)\]\[(ref)\]/).replace("label",Yt).replace("ref",$r).getRegex(),Sl=tn(/^!?\[(ref)\](?:\[\])?/).replace("ref",$r).getRegex(),Hd=tn("reflink|nolink(?!\\()","g").replace("reflink",kl).replace("nolink",Sl).getRegex(),vr={_backpedal:mt,anyPunctuation:Cd,autolink:Id,blockSkip:Ad,br:wl,code:Rd,del:mt,emStrongLDelim:Od,emStrongRDelimAst:Pd,emStrongRDelimUnd:Nd,escape:yl,link:Dd,nolink:Sl,punctuation:Ed,reflink:kl,reflinkSearch:Hd,tag:Ld,text:Td,url:mt},Bd={...vr,link:tn(/^!?\[(label)\]\((.*?)\)/).replace("label",Yt).getRegex(),reflink:tn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Yt).getRegex()},qs={...vr,escape:tn(yl).replace("])","~|])").getRegex(),url:tn(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Fd={...qs,br:tn(wl).replace("{2,}","*").getRegex(),text:tn(qs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},It={normal:_r,gfm:kd,pedantic:Sd},ot={normal:vr,gfm:qs,breaks:Fd,pedantic:Bd};class Ln{constructor(e){rn(this,"tokens");rn(this,"options");rn(this,"state");rn(this,"tokenizer");rn(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||He,this.options.tokenizer=this.options.tokenizer||new Wt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:It.normal,inline:ot.normal};this.options.pedantic?(t.block=It.pedantic,t.inline=ot.pedantic):this.options.gfm&&(t.block=It.gfm,this.options.breaks?t.inline=ot.breaks:t.inline=ot.gfm),this.tokenizer.rules=t}static get rules(){return{block:It,inline:ot}}static lex(e,t){return new Ln(t).lex(e)}static lexInline(e,t){return new Ln(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.options.pedantic&&(e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""));let r,i,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(r=l.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const a=e.slice(1);let u;this.options.extensions.startBlock.forEach(c=>{u=c.call({lexer:this},a),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(o=e.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){i=t[t.length-1],s&&(i==null?void 0:i.type)==="paragraph"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(r),s=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),i=t[t.length-1],i&&i.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(r);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let s,r,i,o=e,l,a,u;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)c.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,l.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(a||(u=""),a=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(s=c.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))){if(s=this.tokenizer.escape(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.tag(e)){e=e.substring(s.raw.length),r=t[t.length-1],r&&s.type==="text"&&r.type==="text"?(r.raw+=s.raw,r.text+=s.text):t.push(s);continue}if(s=this.tokenizer.link(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(s.raw.length),r=t[t.length-1],r&&s.type==="text"&&r.type==="text"?(r.raw+=s.raw,r.text+=s.text):t.push(s);continue}if(s=this.tokenizer.emStrong(e,o,u)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.codespan(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.br(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.del(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.autolink(e)){e=e.substring(s.raw.length),t.push(s);continue}if(!this.state.inLink&&(s=this.tokenizer.url(e))){e=e.substring(s.raw.length),t.push(s);continue}if(i=e,this.options.extensions&&this.options.extensions.startInline){let c=1/0;const f=e.slice(1);let p;this.options.extensions.startInline.forEach(g=>{p=g.call({lexer:this},f),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(i=e.substring(0,c+1))}if(s=this.tokenizer.inlineText(i)){e=e.substring(s.raw.length),s.raw.slice(-1)!=="_"&&(u=s.raw.slice(-1)),a=!0,r=t[t.length-1],r&&r.type==="text"?(r.raw+=s.raw,r.text+=s.text):t.push(s);continue}if(e){const c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return t}}class Zt{constructor(e){rn(this,"options");rn(this,"parser");this.options=e||He}space(e){return""}code({text:e,lang:t,escaped:s}){var o;const r=(o=(t||"").match(/^\S*/))==null?void 0:o[0],i=e.replace(/\n$/,"")+`
`;return r?'<pre><code class="language-'+Nn(r)+'">'+(s?i:Nn(i,!0))+`</code></pre>
`:"<pre><code>"+(s?i:Nn(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,s=e.start;let r="";for(let l=0;l<e.items.length;l++){const a=e.items[l];r+=this.listitem(a)}const i=t?"ol":"ul",o=t&&s!==1?' start="'+s+'"':"";return"<"+i+o+`>
`+r+"</"+i+`>
`}listitem(e){let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?e.tokens.length>0&&e.tokens[0].type==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+e.tokens[0].tokens[0].text)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" "}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",s="";for(let i=0;i<e.header.length;i++)s+=this.tablecell(e.header[i]);t+=this.tablerow({text:s});let r="";for(let i=0;i<e.rows.length;i++){const o=e.rows[i];s="";for(let l=0;l<o.length;l++)s+=this.tablecell(o[l]);r+=this.tablerow({text:s})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),s=e.header?"th":"td";return(e.align?`<${s} align="${e.align}">`:`<${s}>`)+t+`</${s}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const r=this.parser.parseInline(s),i=vi(e);if(i===null)return r;e=i;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:s}){const r=vi(e);if(r===null)return s;e=r;let i=`<img src="${e}" alt="${s}"`;return t&&(i+=` title="${t}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class br{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class Dn{constructor(e){rn(this,"options");rn(this,"renderer");rn(this,"textRenderer");this.options=e||He,this.options.renderer=this.options.renderer||new Zt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new br}static parse(e,t){return new Dn(t).parse(e)}static parseInline(e,t){return new Dn(t).parseInline(e)}parse(e,t=!0){let s="";for(let r=0;r<e.length;r++){const i=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const l=i,a=this.options.extensions.renderers[l.type].call({parser:this},l);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=a||"";continue}}const o=i;switch(o.type){case"space":{s+=this.renderer.space(o);continue}case"hr":{s+=this.renderer.hr(o);continue}case"heading":{s+=this.renderer.heading(o);continue}case"code":{s+=this.renderer.code(o);continue}case"table":{s+=this.renderer.table(o);continue}case"blockquote":{s+=this.renderer.blockquote(o);continue}case"list":{s+=this.renderer.list(o);continue}case"html":{s+=this.renderer.html(o);continue}case"paragraph":{s+=this.renderer.paragraph(o);continue}case"text":{let l=o,a=this.renderer.text(l);for(;r+1<e.length&&e[r+1].type==="text";)l=e[++r],a+=`
`+this.renderer.text(l);t?s+=this.renderer.paragraph({type:"paragraph",raw:a,text:a,tokens:[{type:"text",raw:a,text:a}]}):s+=a;continue}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,t){t=t||this.renderer;let s="";for(let r=0;r<e.length;r++){const i=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}const o=i;switch(o.type){case"escape":{s+=t.text(o);break}case"html":{s+=t.html(o);break}case"link":{s+=t.link(o);break}case"image":{s+=t.image(o);break}case"strong":{s+=t.strong(o);break}case"em":{s+=t.em(o);break}case"codespan":{s+=t.codespan(o);break}case"br":{s+=t.br(o);break}case"del":{s+=t.del(o);break}case"text":{s+=t.text(o);break}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}}class _t{constructor(e){rn(this,"options");rn(this,"block");this.options=e||He}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ln.lex:Ln.lexInline}provideParser(){return this.block?Dn.parse:Dn.parseInline}}rn(_t,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class jd{constructor(...e){rn(this,"defaults",pr());rn(this,"options",this.setOptions);rn(this,"parse",this.parseMarkdown(!0));rn(this,"parseInline",this.parseMarkdown(!1));rn(this,"Parser",Dn);rn(this,"Renderer",Zt);rn(this,"TextRenderer",br);rn(this,"Lexer",Ln);rn(this,"Tokenizer",Wt);rn(this,"Hooks",_t);this.use(...e)}walkTokens(e,t){var r,i;let s=[];for(const o of e)switch(s=s.concat(t.call(this,o)),o.type){case"table":{const l=o;for(const a of l.header)s=s.concat(this.walkTokens(a.tokens,t));for(const a of l.rows)for(const u of a)s=s.concat(this.walkTokens(u.tokens,t));break}case"list":{const l=o;s=s.concat(this.walkTokens(l.items,t));break}default:{const l=o;(i=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&i[l.type]?this.defaults.extensions.childTokens[l.type].forEach(a=>{const u=l[a].flat(1/0);s=s.concat(this.walkTokens(u,t))}):l.tokens&&(s=s.concat(this.walkTokens(l.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const r={...s};if(r.async=this.defaults.async||r.async||!1,s.extensions&&(s.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const o=t.renderers[i.name];o?t.renderers[i.name]=function(...l){let a=i.renderer.apply(this,l);return a===!1&&(a=o.apply(this,l)),a}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[i.level];o?o.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),r.extensions=t),s.renderer){const i=this.defaults.renderer||new Zt(this.defaults);for(const o in s.renderer){if(!(o in i))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const l=o,a=s.renderer[l],u=i[l];i[l]=(...c)=>{let f=a.apply(i,c);return f===!1&&(f=u.apply(i,c)),f||""}}r.renderer=i}if(s.tokenizer){const i=this.defaults.tokenizer||new Wt(this.defaults);for(const o in s.tokenizer){if(!(o in i))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const l=o,a=s.tokenizer[l],u=i[l];i[l]=(...c)=>{let f=a.apply(i,c);return f===!1&&(f=u.apply(i,c)),f}}r.tokenizer=i}if(s.hooks){const i=this.defaults.hooks||new _t;for(const o in s.hooks){if(!(o in i))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const l=o,a=s.hooks[l],u=i[l];_t.passThroughHooks.has(o)?i[l]=c=>{if(this.defaults.async)return Promise.resolve(a.call(i,c)).then(p=>u.call(i,p));const f=a.call(i,c);return u.call(i,f)}:i[l]=(...c)=>{let f=a.apply(i,c);return f===!1&&(f=u.apply(i,c)),f}}r.hooks=i}if(s.walkTokens){const i=this.defaults.walkTokens,o=s.walkTokens;r.walkTokens=function(l){let a=[];return a.push(o.call(this,l)),i&&(a=a.concat(i.call(this,l))),a}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ln.lex(e,t??this.defaults)}parser(e,t){return Dn.parse(e,t??this.defaults)}parseMarkdown(e){return(s,r)=>{const i={...r},o={...this.defaults,...i},l=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&i.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof s>"u"||s===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const a=o.hooks?o.hooks.provideLexer():e?Ln.lex:Ln.lexInline,u=o.hooks?o.hooks.provideParser():e?Dn.parse:Dn.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(s):s).then(c=>a(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>u(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(l);try{o.hooks&&(s=o.hooks.preprocess(s));let c=a(s,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let f=u(c,o);return o.hooks&&(f=o.hooks.postprocess(f)),f}catch(c){return l(c)}}}onError(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const r="<p>An error occurred:</p><pre>"+Nn(s.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(s);throw s}}}const Me=new jd;function Q(n,e){return Me.parse(n,e)}Q.options=Q.setOptions=function(n){return Me.setOptions(n),Q.defaults=Me.defaults,$l(Q.defaults),Q};Q.getDefaults=pr;Q.defaults=He;Q.use=function(...n){return Me.use(...n),Q.defaults=Me.defaults,$l(Q.defaults),Q};Q.walkTokens=function(n,e){return Me.walkTokens(n,e)};Q.parseInline=Me.parseInline;Q.Parser=Dn;Q.parser=Dn.parse;Q.Renderer=Zt;Q.TextRenderer=br;Q.Lexer=Ln;Q.lexer=Ln.lex;Q.Tokenizer=Wt;Q.Hooks=_t;Q.parse=Q;Q.options;Q.setOptions;Q.use;Q.walkTokens;Q.parseInline;Dn.parse;Ln.lex;const Ud={key:0,class:"doc-footer"},Vd={class:"doc-footer-inner"},zd=["href"],Gd={class:"footer-text"},qd={key:1,class:"footer-link prev placeholder"},Kd=["href"],Jd={class:"footer-text"},Wd={key:3,class:"footer-link next placeholder"},Yd={__name:"DocFooter",setup(n){const{prev:e,next:t}=gf();return(s,r)=>hn(e)||hn(t)?(j(),U("nav",Ud,[V("div",Vd,[hn(e)?(j(),U("a",{key:0,href:"#"+hn(e).link,class:"footer-link prev"},[r[0]||(r[0]=V("span",{class:"footer-label"},"上一章",-1)),V("span",Gd,vn(hn(e).text),1)],8,zd)):(j(),U("div",qd)),hn(t)?(j(),U("a",{key:2,href:"#"+hn(t).link,class:"footer-link next"},[r[1]||(r[1]=V("span",{class:"footer-label"},"下一章",-1)),V("span",Jd,vn(hn(t).text),1)],8,Kd)):(j(),U("div",Wd))])])):Ie("",!0)}},Zd=De(Yd,[["__scopeId","data-v-c9726e4b"]]),Qd=["innerHTML"],wi={__name:"MarkdownPage",setup(n){const e=hs(),t=Object.assign({"../../v1.0/canvas.md":Go,"../../v1.0/control-flow.md":qo,"../../v1.0/entries.md":Ko,"../../v1.0/expressions.md":Jo,"../../v1.0/file.md":Wo,"../../v1.0/flow-callback.md":Yo,"../../v1.0/flow-main-callback.md":Zo,"../../v1.0/flow-output.md":Qo,"../../v1.0/functions.md":Xo,"../../v1.0/index.md":nl,"../../v1.0/json.md":el,"../../v1.0/lexical.md":tl,"../../v1.0/math.md":sl,"../../v1.0/modules.md":rl,"../../v1.0/network.md":il,"../../v1.0/object.md":ol,"../../v1.0/oop.md":ll,"../../v1.0/output-print-return.md":al,"../../v1.0/output-print.md":cl,"../../v1.0/server.md":ul,"../../v1.0/string.md":fl,"../../v1.0/type.md":dl,"../../v1.0/types.md":hl,"../../v1.0/variables.md":pl});function s(l){return l.replace(/<[^>]*>/g,"").toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g,"-").replace(/^-|-$/g,"")}function r(l){return l.replace(/<(h[23])>(.*?)<\/\1>/gi,(a,u,c)=>`<${u} id="${s(c)}">${c}</${u}>`)}function i(l){return l.replace(/\]\(\.\/([^)]*?)\)/g,(a,u)=>/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(u)||u.startsWith("http")?a:`](#/v1.0/${u})`)}const o=Tn(()=>{let l;e.path==="/v1.0/"?l="../../v1.0/index.md":l=`../../v1.0/${e.params.page}.md`;const a=t[l];return a?r(Q.parse(i(a),{gfm:!0,breaks:!1})):"<p>页面未找到</p>"});return Ce([()=>e.hash,o],([l])=>{os(()=>{if(l){const a=document.getElementById(l.slice(1));a&&a.scrollIntoView({behavior:"smooth",block:"start"})}})}),(l,a)=>(j(),U(cn,null,[V("article",{class:"markdown-body",innerHTML:o.value},null,8,Qd),gn(Zd)],64))}},Xd=hf({history:zu(),routes:[{path:"/",component:ad},{path:"/v1.0",redirect:"/v1.0/"},{path:"/v1.0/",component:wi},{path:"/v1.0/:page",component:wi}],scrollBehavior(n){return n.hash?{el:n.hash,behavior:"smooth",top:80}:{top:0}}});tu(rd).use(Xd).mount("#app");
