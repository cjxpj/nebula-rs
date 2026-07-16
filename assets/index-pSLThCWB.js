var Al=Object.defineProperty;var Cl=(n,e,t)=>e in n?Al(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var rn=(n,e,t)=>Cl(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ws(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const on={},Ke=[],se=()=>{},Zr=()=>!1,ts=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ss=n=>n.startsWith("onUpdate:"),vn=Object.assign,Ys=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Nl=Object.prototype.hasOwnProperty,W=(n,e)=>Nl.call(n,e),H=Array.isArray,qe=n=>Rt(n)==="[object Map]",Xr=n=>Rt(n)==="[object Set]",Zi=n=>Rt(n)==="[object Date]",F=n=>typeof n=="function",dn=n=>typeof n=="string",ie=n=>typeof n=="symbol",X=n=>n!==null&&typeof n=="object",no=n=>(X(n)||F(n))&&F(n.then)&&F(n.catch),eo=Object.prototype.toString,Rt=n=>eo.call(n),Il=n=>Rt(n).slice(8,-1),to=n=>Rt(n)==="[object Object]",Qs=n=>dn(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,dt=Ws(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),is=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Ll=/-\w/g,En=is(n=>n.replace(Ll,e=>e.slice(1).toUpperCase())),Ml=/\B([A-Z])/g,De=is(n=>n.replace(Ml,"-$1").toLowerCase()),rs=is(n=>n.charAt(0).toUpperCase()+n.slice(1)),ms=is(n=>n?`on${rs(n)}`:""),te=(n,e)=>!Object.is(n,e),Ht=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},so=(n,e,t,s=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:s,value:t})},Zs=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Xi;const os=()=>Xi||(Xi=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Xs(n){if(H(n)){const e={};for(let t=0;t<n.length;t++){const s=n[t],i=dn(s)?Fl(s):Xs(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(dn(n)||X(n))return n}const Dl=/;(?![^(]*\))/g,jl=/:([^]+)/,Hl=/\/\*[^]*?\*\//g;function Fl(n){const e={};return n.replace(Hl,"").split(Dl).forEach(t=>{if(t){const s=t.split(jl);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Hn(n){let e="";if(dn(n))e=n;else if(H(n))for(let t=0;t<n.length;t++){const s=Hn(n[t]);s&&(e+=s+" ")}else if(X(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Bl="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ul=Ws(Bl);function io(n){return!!n||n===""}function Vl(n,e){if(n.length!==e.length)return!1;let t=!0;for(let s=0;t&&s<n.length;s++)t=ni(n[s],e[s]);return t}function ni(n,e){if(n===e)return!0;let t=Zi(n),s=Zi(e);if(t||s)return t&&s?n.getTime()===e.getTime():!1;if(t=ie(n),s=ie(e),t||s)return n===e;if(t=H(n),s=H(e),t||s)return t&&s?Vl(n,e):!1;if(t=X(n),s=X(e),t||s){if(!t||!s)return!1;const i=Object.keys(n).length,r=Object.keys(e).length;if(i!==r)return!1;for(const o in n){const l=n.hasOwnProperty(o),a=e.hasOwnProperty(o);if(l&&!a||!l&&a||!ni(n[o],e[o]))return!1}}return String(n)===String(e)}const ro=n=>!!(n&&n.__v_isRef===!0),xn=n=>dn(n)?n:n==null?"":H(n)||X(n)&&(n.toString===eo||!F(n.toString))?ro(n)?xn(n.value):JSON.stringify(n,oo,2):String(n),oo=(n,e)=>ro(e)?oo(n,e.value):qe(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[s,i],r)=>(t[bs(s,r)+" =>"]=i,t),{})}:Xr(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>bs(t))}:ie(e)?bs(e):X(e)&&!H(e)&&!to(e)?String(e):e,bs=(n,e="")=>{var t;return ie(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _n;class zl{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&_n&&(_n.active?(this.parent=_n,this.index=(_n.scopes||(_n.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=_n;try{return _n=this,e()}finally{_n=t}}}on(){++this._on===1&&(this.prevScope=_n,_n=this)}off(){if(this._on>0&&--this._on===0){if(_n===this)_n=this.prevScope;else{let e=_n;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,s;for(t=0,s=this.effects.length;t<s;t++)this.effects[t].stop();for(this.effects.length=0,t=0,s=this.cleanups.length;t<s;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function Gl(){return _n}let ln;const _s=new WeakSet;class lo{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_n&&(_n.active?_n.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,_s.has(this)&&(_s.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||co(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,nr(this),uo(this);const e=ln,t=Fn;ln=this,Fn=!0;try{return this.fn()}finally{fo(this),ln=e,Fn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)si(e);this.deps=this.depsTail=void 0,nr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?_s.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Cs(this)&&this.run()}get dirty(){return Cs(this)}}let ao=0,ft,ht;function co(n,e=!1){if(n.flags|=8,e){n.next=ht,ht=n;return}n.next=ft,ft=n}function ei(){ao++}function ti(){if(--ao>0)return;if(ht){let e=ht;for(ht=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;ft;){let e=ft;for(ft=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){n||(n=s)}e=t}}if(n)throw n}function uo(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function fo(n){let e,t=n.depsTail,s=t;for(;s;){const i=s.prevDep;s.version===-1?(s===t&&(t=i),si(s),Jl(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}n.deps=e,n.depsTail=t}function Cs(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(ho(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function ho(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===vt)||(n.globalVersion=vt,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Cs(n))))return;n.flags|=2;const e=n.dep,t=ln,s=Fn;ln=n,Fn=!0;try{uo(n);const i=n.fn(n._value);(e.version===0||te(i,n._value))&&(n.flags|=128,n._value=i,e.version++)}catch(i){throw e.version++,i}finally{ln=t,Fn=s,fo(n),n.flags&=-3}}function si(n,e=!1){const{dep:t,prevSub:s,nextSub:i}=n;if(s&&(s.nextSub=i,n.prevSub=void 0),i&&(i.prevSub=s,n.nextSub=void 0),t.subs===n&&(t.subs=s,!s&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)si(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Jl(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Fn=!0;const po=[];function re(){po.push(Fn),Fn=!1}function oe(){const n=po.pop();Fn=n===void 0?!0:n}function nr(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=ln;ln=void 0;try{e()}finally{ln=t}}}let vt=0;class Kl{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ii{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ln||!Fn||ln===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ln)t=this.activeLink=new Kl(ln,this),ln.deps?(t.prevDep=ln.depsTail,ln.depsTail.nextDep=t,ln.depsTail=t):ln.deps=ln.depsTail=t,go(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const s=t.nextDep;s.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=s),t.prevDep=ln.depsTail,t.nextDep=void 0,ln.depsTail.nextDep=t,ln.depsTail=t,ln.deps===t&&(ln.deps=s)}return t}trigger(e){this.version++,vt++,this.notify(e)}notify(e){ei();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{ti()}}}function go(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)go(s)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Ns=new WeakMap,Ae=Symbol(""),Is=Symbol(""),yt=Symbol("");function yn(n,e,t){if(Fn&&ln){let s=Ns.get(n);s||Ns.set(n,s=new Map);let i=s.get(t);i||(s.set(t,i=new ii),i.map=s,i.key=t),i.track()}}function fe(n,e,t,s,i,r){const o=Ns.get(n);if(!o){vt++;return}const l=a=>{a&&a.trigger()};if(ei(),e==="clear")o.forEach(l);else{const a=H(n),u=a&&Qs(t);if(a&&t==="length"){const c=Number(s);o.forEach((d,p)=>{(p==="length"||p===yt||!ie(p)&&p>=c)&&l(d)})}else switch((t!==void 0||o.has(void 0))&&l(o.get(t)),u&&l(o.get(yt)),e){case"add":a?u&&l(o.get("length")):(l(o.get(Ae)),qe(n)&&l(o.get(Is)));break;case"delete":a||(l(o.get(Ae)),qe(n)&&l(o.get(Is)));break;case"set":qe(n)&&l(o.get(Ae));break}}ti()}function Ve(n){const e=q(n);return e===n?e:(yn(e,"iterate",yt),jn(n)?e:e.map(Un))}function ls(n){return yn(n=q(n),"iterate",yt),n}function ne(n,e){return ge(n)?Qe(Ce(n)?Un(e):e):Un(e)}const ql={__proto__:null,[Symbol.iterator](){return xs(this,Symbol.iterator,n=>ne(this,n))},concat(...n){return Ve(this).concat(...n.map(e=>H(e)?Ve(e):e))},entries(){return xs(this,"entries",n=>(n[1]=ne(this,n[1]),n))},every(n,e){return ae(this,"every",n,e,void 0,arguments)},filter(n,e){return ae(this,"filter",n,e,t=>t.map(s=>ne(this,s)),arguments)},find(n,e){return ae(this,"find",n,e,t=>ne(this,t),arguments)},findIndex(n,e){return ae(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ae(this,"findLast",n,e,t=>ne(this,t),arguments)},findLastIndex(n,e){return ae(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ae(this,"forEach",n,e,void 0,arguments)},includes(...n){return vs(this,"includes",n)},indexOf(...n){return vs(this,"indexOf",n)},join(n){return Ve(this).join(n)},lastIndexOf(...n){return vs(this,"lastIndexOf",n)},map(n,e){return ae(this,"map",n,e,void 0,arguments)},pop(){return it(this,"pop")},push(...n){return it(this,"push",n)},reduce(n,...e){return er(this,"reduce",n,e)},reduceRight(n,...e){return er(this,"reduceRight",n,e)},shift(){return it(this,"shift")},some(n,e){return ae(this,"some",n,e,void 0,arguments)},splice(...n){return it(this,"splice",n)},toReversed(){return Ve(this).toReversed()},toSorted(n){return Ve(this).toSorted(n)},toSpliced(...n){return Ve(this).toSpliced(...n)},unshift(...n){return it(this,"unshift",n)},values(){return xs(this,"values",n=>ne(this,n))}};function xs(n,e,t){const s=ls(n),i=s[e]();return s!==n&&!jn(n)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=t(r.value)),r}),i}const Wl=Array.prototype;function ae(n,e,t,s,i,r){const o=ls(n),l=o!==n&&!jn(n),a=o[e];if(a!==Wl[e]){const d=a.apply(n,r);return l?Un(d):d}let u=t;o!==n&&(l?u=function(d,p){return t.call(this,ne(n,d),p,n)}:t.length>2&&(u=function(d,p){return t.call(this,d,p,n)}));const c=a.call(o,u,s);return l&&i?i(c):c}function er(n,e,t,s){const i=ls(n),r=i!==n&&!jn(n);let o=t,l=!1;i!==n&&(r?(l=s.length===0,o=function(u,c,d){return l&&(l=!1,u=ne(n,u)),t.call(this,u,ne(n,c),d,n)}):t.length>3&&(o=function(u,c,d){return t.call(this,u,c,d,n)}));const a=i[e](o,...s);return l?ne(n,a):a}function vs(n,e,t){const s=q(n);yn(s,"iterate",yt);const i=s[e](...t);return(i===-1||i===!1)&&li(t[0])?(t[0]=q(t[0]),s[e](...t)):i}function it(n,e,t=[]){re(),ei();const s=q(n)[e].apply(n,t);return ti(),oe(),s}const Yl=Ws("__proto__,__v_isRef,__isVue"),$o=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ie));function Ql(n){ie(n)||(n=String(n));const e=q(this);return yn(e,"has",n),e.hasOwnProperty(n)}class mo{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,s){if(t==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return r;if(t==="__v_raw")return s===(i?r?la:vo:r?xo:_o).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=H(e);if(!i){let a;if(o&&(a=ql[t]))return a;if(t==="hasOwnProperty")return Ql}const l=Reflect.get(e,t,kn(e)?e:s);if((ie(t)?$o.has(t):Yl(t))||(i||yn(e,"get",t),r))return l;if(kn(l)){const a=o&&Qs(t)?l:l.value;return i&&X(a)?Ms(a):a}return X(l)?i?Ms(l):as(l):l}}class bo extends mo{constructor(e=!1){super(!1,e)}set(e,t,s,i){let r=e[t];const o=H(e)&&Qs(t);if(!this._isShallow){const u=ge(r);if(!jn(s)&&!ge(s)&&(r=q(r),s=q(s)),!o&&kn(r)&&!kn(s))return u||(r.value=s),!0}const l=o?Number(t)<e.length:W(e,t),a=Reflect.set(e,t,s,kn(e)?e:i);return e===q(i)&&a&&(l?te(s,r)&&fe(e,"set",t,s):fe(e,"add",t,s)),a}deleteProperty(e,t){const s=W(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&s&&fe(e,"delete",t,void 0),i}has(e,t){const s=Reflect.has(e,t);return(!ie(t)||!$o.has(t))&&yn(e,"has",t),s}ownKeys(e){return yn(e,"iterate",H(e)?"length":Ae),Reflect.ownKeys(e)}}class Zl extends mo{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Xl=new bo,na=new Zl,ea=new bo(!0);const Ls=n=>n,It=n=>Reflect.getPrototypeOf(n);function ta(n,e,t){return function(...s){const i=this.__v_raw,r=q(i),o=qe(r),l=n==="entries"||n===Symbol.iterator&&o,a=n==="keys"&&o,u=i[n](...s),c=t?Ls:e?Qe:Un;return!e&&yn(r,"iterate",a?Is:Ae),vn(Object.create(u),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:l?[c(d[0]),c(d[1])]:c(d),done:p}}})}}function Lt(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function sa(n,e){const t={get(i){const r=this.__v_raw,o=q(r),l=q(i);n||(te(i,l)&&yn(o,"get",i),yn(o,"get",l));const{has:a}=It(o),u=e?Ls:n?Qe:Un;if(a.call(o,i))return u(r.get(i));if(a.call(o,l))return u(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!n&&yn(q(i),"iterate",Ae),i.size},has(i){const r=this.__v_raw,o=q(r),l=q(i);return n||(te(i,l)&&yn(o,"has",i),yn(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=q(l),u=e?Ls:n?Qe:Un;return!n&&yn(a,"iterate",Ae),l.forEach((c,d)=>i.call(r,u(c),u(d),o))}};return vn(t,n?{add:Lt("add"),set:Lt("set"),delete:Lt("delete"),clear:Lt("clear")}:{add(i){const r=q(this),o=It(r),l=q(i),a=!e&&!jn(i)&&!ge(i)?l:i;return o.has.call(r,a)||te(i,a)&&o.has.call(r,i)||te(l,a)&&o.has.call(r,l)||(r.add(a),fe(r,"add",a,a)),this},set(i,r){!e&&!jn(r)&&!ge(r)&&(r=q(r));const o=q(this),{has:l,get:a}=It(o);let u=l.call(o,i);u||(i=q(i),u=l.call(o,i));const c=a.call(o,i);return o.set(i,r),u?te(r,c)&&fe(o,"set",i,r):fe(o,"add",i,r),this},delete(i){const r=q(this),{has:o,get:l}=It(r);let a=o.call(r,i);a||(i=q(i),a=o.call(r,i)),l&&l.call(r,i);const u=r.delete(i);return a&&fe(r,"delete",i,void 0),u},clear(){const i=q(this),r=i.size!==0,o=i.clear();return r&&fe(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=ta(i,n,e)}),t}function ri(n,e){const t=sa(n,e);return(s,i,r)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?s:Reflect.get(W(t,i)&&i in s?t:s,i,r)}const ia={get:ri(!1,!1)},ra={get:ri(!1,!0)},oa={get:ri(!0,!1)};const _o=new WeakMap,xo=new WeakMap,vo=new WeakMap,la=new WeakMap;function aa(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function as(n){return ge(n)?n:oi(n,!1,Xl,ia,_o)}function yo(n){return oi(n,!1,ea,ra,xo)}function Ms(n){return oi(n,!0,na,oa,vo)}function oi(n,e,t,s,i){if(!X(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=i.get(n);if(r)return r;const o=aa(Il(n));if(o===0)return n;const l=new Proxy(n,o===2?s:t);return i.set(n,l),l}function Ce(n){return ge(n)?Ce(n.__v_raw):!!(n&&n.__v_isReactive)}function ge(n){return!!(n&&n.__v_isReadonly)}function jn(n){return!!(n&&n.__v_isShallow)}function li(n){return n?!!n.__v_raw:!1}function q(n){const e=n&&n.__v_raw;return e?q(e):n}function ca(n){return!W(n,"__v_skip")&&Object.isExtensible(n)&&so(n,"__v_skip",!0),n}const Un=n=>X(n)?as(n):n,Qe=n=>X(n)?Ms(n):n;function kn(n){return n?n.__v_isRef===!0:!1}function pe(n){return wo(n,!1)}function ua(n){return wo(n,!0)}function wo(n,e){return kn(n)?n:new da(n,e)}class da{constructor(e,t){this.dep=new ii,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:q(e),this._value=t?e:Un(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,s=this.__v_isShallow||jn(e)||ge(e);e=s?e:q(e),te(e,t)&&(this._rawValue=e,this._value=s?e:Un(e),this.dep.trigger())}}function fn(n){return kn(n)?n.value:n}const fa={get:(n,e,t)=>e==="__v_raw"?n:fn(Reflect.get(n,e,t)),set:(n,e,t,s)=>{const i=n[e];return kn(i)&&!kn(t)?(i.value=t,!0):Reflect.set(n,e,t,s)}};function ko(n){return Ce(n)?n:new Proxy(n,fa)}class ha{constructor(e,t,s){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ii(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=vt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ln!==this)return co(this,!0),!0}get value(){const e=this.dep.track();return ho(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function pa(n,e,t=!1){let s,i;return F(n)?s=n:(s=n.get,i=n.set),new ha(s,i,t)}const Mt={},zt=new WeakMap;let Ee;function ga(n,e=!1,t=Ee){if(t){let s=zt.get(t);s||zt.set(t,s=[]),s.push(n)}}function $a(n,e,t=on){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=t,u=A=>i?A:jn(A)||i===!1||i===0?he(A,1):he(A);let c,d,p,g,y=!1,w=!1;if(kn(n)?(d=()=>n.value,y=jn(n)):Ce(n)?(d=()=>u(n),y=!0):H(n)?(w=!0,y=n.some(A=>Ce(A)||jn(A)),d=()=>n.map(A=>{if(kn(A))return A.value;if(Ce(A))return u(A);if(F(A))return a?a(A,2):A()})):F(n)?e?d=a?()=>a(n,2):n:d=()=>{if(p){re();try{p()}finally{oe()}}const A=Ee;Ee=c;try{return a?a(n,3,[g]):n(g)}finally{Ee=A}}:d=se,e&&i){const A=d,Y=i===!0?1/0:i;d=()=>he(A(),Y)}const N=Gl(),M=()=>{c.stop(),N&&N.active&&Ys(N.effects,c)};if(r&&e){const A=e;e=(...Y)=>{const an=A(...Y);return M(),an}}let O=w?new Array(n.length).fill(Mt):Mt;const C=A=>{if(!(!(c.flags&1)||!c.dirty&&!A))if(e){const Y=c.run();if(A||i||y||(w?Y.some((an,Q)=>te(an,O[Q])):te(Y,O))){p&&p();const an=Ee;Ee=c;try{const Q=[Y,O===Mt?void 0:w&&O[0]===Mt?[]:O,g];O=Y,a?a(e,3,Q):e(...Q)}finally{Ee=an}}}else c.run()};return l&&l(C),c=new lo(d),c.scheduler=o?()=>o(C,!1):C,g=A=>ga(A,!1,c),p=c.onStop=()=>{const A=zt.get(c);if(A){if(a)a(A,4);else for(const Y of A)Y();zt.delete(c)}},e?s?C(!0):O=c.run():o?o(C.bind(null,!0),!0):c.run(),M.pause=c.pause.bind(c),M.resume=c.resume.bind(c),M.stop=M,M}function he(n,e=1/0,t){if(e<=0||!X(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,kn(n))he(n.value,e,t);else if(H(n))for(let s=0;s<n.length;s++)he(n[s],e,t);else if(Xr(n)||qe(n))n.forEach(s=>{he(s,e,t)});else if(to(n)){for(const s in n)he(n[s],e,t);for(const s of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,s)&&he(n[s],e,t)}return n}/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Et(n,e,t,s){try{return s?n(...s):n()}catch(i){cs(i,e,t)}}function Vn(n,e,t,s){if(F(n)){const i=Et(n,e,t,s);return i&&no(i)&&i.catch(r=>{cs(r,e,t)}),i}if(H(n)){const i=[];for(let r=0;r<n.length;r++)i.push(Vn(n[r],e,t,s));return i}}function cs(n,e,t,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||on;if(e){let l=e.parent;const a=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const c=l.ec;if(c){for(let d=0;d<c.length;d++)if(c[d](n,a,u)===!1)return}l=l.parent}if(r){re(),Et(r,null,10,[n,a,u]),oe();return}}ma(n,t,i,s,o)}function ma(n,e,t,s=!0,i=!1){if(i)throw n;console.error(n)}const Rn=[];let Xn=-1;const We=[];let ve=null,ze=0;const So=Promise.resolve();let Gt=null;function Ot(n){const e=Gt||So;return n?e.then(this?n.bind(this):n):e}function ba(n){let e=Xn+1,t=Rn.length;for(;e<t;){const s=e+t>>>1,i=Rn[s],r=wt(i);r<n||r===n&&i.flags&2?e=s+1:t=s}return e}function ai(n){if(!(n.flags&1)){const e=wt(n),t=Rn[Rn.length-1];!t||!(n.flags&2)&&e>=wt(t)?Rn.push(n):Rn.splice(ba(e),0,n),n.flags|=1,To()}}function To(){Gt||(Gt=So.then(Eo))}function _a(n){H(n)?We.push(...n):ve&&n.id===-1?ve.splice(ze+1,0,n):n.flags&1||(We.push(n),n.flags|=1),To()}function tr(n,e,t=Xn+1){for(;t<Rn.length;t++){const s=Rn[t];if(s&&s.flags&2){if(n&&s.id!==n.uid)continue;Rn.splice(t,1),t--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Ro(n){if(We.length){const e=[...new Set(We)].sort((t,s)=>wt(t)-wt(s));if(We.length=0,ve){ve.push(...e);return}for(ve=e,ze=0;ze<ve.length;ze++){const t=ve[ze];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}ve=null,ze=0}}const wt=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Eo(n){try{for(Xn=0;Xn<Rn.length;Xn++){const e=Rn[Xn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Et(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xn<Rn.length;Xn++){const e=Rn[Xn];e&&(e.flags&=-2)}Xn=-1,Rn.length=0,Ro(),Gt=null,(Rn.length||We.length)&&Eo()}}let Nn=null,Oo=null;function Jt(n){const e=Nn;return Nn=n,Oo=n&&n.type.__scopeId||null,e}function xa(n,e=Nn,t){if(!e||n._n)return n;const s=(...i)=>{s._d&&Wt(-1);const r=Jt(e);let o;try{o=n(...i)}finally{Jt(r),s._d&&Wt(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function va(n,e){if(Nn===null)return n;const t=hs(Nn),s=n.dirs||(n.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=on]=e[i];r&&(F(r)&&(r={mounted:r,updated:r}),r.deep&&he(o),s.push({dir:r,instance:t,value:o,oldValue:void 0,arg:l,modifiers:a}))}return n}function Te(n,e,t,s){const i=n.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(re(),Vn(a,t,8,[n.el,l,n,e]),oe())}}function Ft(n,e){if(wn){let t=wn.provides;const s=wn.parent&&wn.parent.provides;s===t&&(t=wn.provides=Object.create(s)),t[n]=e}}function Bn(n,e,t=!1){const s=kc();if(s||Ye){let i=Ye?Ye._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&n in i)return i[n];if(arguments.length>1)return t&&F(e)?e.call(s&&s.proxy):e}}const ya=Symbol.for("v-scx"),wa=()=>Bn(ya);function ka(n,e){return ci(n,null,e)}function Ne(n,e,t){return ci(n,e,t)}function ci(n,e,t=on){const{immediate:s,deep:i,flush:r,once:o}=t,l=vn({},t),a=e&&s||!e&&r!=="post";let u;if(St){if(r==="sync"){const g=wa();u=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=se,g.resume=se,g.pause=se,g}}const c=wn;l.call=(g,y,w)=>Vn(g,c,y,w);let d=!1;r==="post"?l.scheduler=g=>{Pn(g,c&&c.suspense)}:r!=="sync"&&(d=!0,l.scheduler=(g,y)=>{y?g():ai(g)}),l.augmentJob=g=>{e&&(g.flags|=4),d&&(g.flags|=2,c&&(g.id=c.uid,g.i=c))};const p=$a(n,e,l);return St&&(u?u.push(p):a&&p()),p}function Sa(n,e,t){const s=this.proxy,i=dn(n)?n.includes(".")?Po(s,n):()=>s[n]:n.bind(s,s);let r;F(e)?r=e:(r=e.handler,t=e);const o=Pt(this),l=ci(i,r.bind(s),t);return o(),l}function Po(n,e){const t=e.split(".");return()=>{let s=n;for(let i=0;i<t.length&&s;i++)s=s[t[i]];return s}}const Ta=Symbol("_vte"),Ra=n=>n.__isTeleport,ys=Symbol("_leaveCb");function ui(n,e){n.shapeFlag&6&&n.component?(n.transition=e,ui(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Ao(n,e){return F(n)?vn({name:n.name},e,{setup:n}):n}function Co(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function sr(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Kt=new WeakMap;function pt(n,e,t,s,i=!1){if(H(n)){n.forEach((w,N)=>pt(w,e&&(H(e)?e[N]:e),t,s,i));return}if(gt(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&pt(n,e,t,s.component.subTree);return}const r=s.shapeFlag&4?hs(s.component):s.el,o=i?null:r,{i:l,r:a}=n,u=e&&e.r,c=l.refs===on?l.refs={}:l.refs,d=l.setupState,p=q(d),g=d===on?Zr:w=>sr(c,w)?!1:W(p,w),y=(w,N)=>!(N&&sr(c,N));if(u!=null&&u!==a){if(ir(e),dn(u))c[u]=null,g(u)&&(d[u]=null);else if(kn(u)){const w=e;y(u,w.k)&&(u.value=null),w.k&&(c[w.k]=null)}}if(F(a)){re();try{Et(a,l,12,[o,c])}finally{oe()}}else{const w=dn(a),N=kn(a);if(w||N){const M=()=>{if(n.f){const O=w?g(a)?d[a]:c[a]:y()||!n.k?a.value:c[n.k];if(i)H(O)&&Ys(O,r);else if(H(O))O.includes(r)||O.push(r);else if(w)c[a]=[r],g(a)&&(d[a]=c[a]);else{const C=[r];y(a,n.k)&&(a.value=C),n.k&&(c[n.k]=C)}}else w?(c[a]=o,g(a)&&(d[a]=o)):N&&(y(a,n.k)&&(a.value=o),n.k&&(c[n.k]=o))};if(o){const O=()=>{M(),Kt.delete(n)};O.id=-1,Kt.set(n,O),Pn(O,t)}else ir(n),M()}}}function ir(n){const e=Kt.get(n);e&&(e.flags|=8,Kt.delete(n))}os().requestIdleCallback;os().cancelIdleCallback;const gt=n=>!!n.type.__asyncLoader,No=n=>n.type.__isKeepAlive;function Ea(n,e){Io(n,"a",e)}function Oa(n,e){Io(n,"da",e)}function Io(n,e,t=wn){const s=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(us(e,s,t),t){let i=t.parent;for(;i&&i.parent;)No(i.parent.vnode)&&Pa(s,e,t,i),i=i.parent}}function Pa(n,e,t,s){const i=us(e,n,s,!0);di(()=>{Ys(s[e],i)},t)}function us(n,e,t=wn,s=!1){if(t){const i=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{re();const l=Pt(t),a=Vn(e,t,n,o);return l(),oe(),a});return s?i.unshift(r):i.push(r),r}}const $e=n=>(e,t=wn)=>{(!St||n==="sp")&&us(n,(...s)=>e(...s),t)},Aa=$e("bm"),Lo=$e("m"),Ca=$e("bu"),Na=$e("u"),Ia=$e("bum"),di=$e("um"),La=$e("sp"),Ma=$e("rtg"),Da=$e("rtc");function ja(n,e=wn){us("ec",n,e)}const Ha="components";function Fa(n,e){return Ua(Ha,n,!0,e)||n}const Ba=Symbol.for("v-ndc");function Ua(n,e,t=!0,s=!1){const i=Nn||wn;if(i){const r=i.type;{const l=Oc(r,!1);if(l&&(l===e||l===En(e)||l===rs(En(e))))return r}const o=rr(i[n]||r[n],e)||rr(i.appContext[n],e);return!o&&s?r:o}}function rr(n,e){return n&&(n[e]||n[En(e)]||n[rs(En(e))])}function Oe(n,e,t,s){let i;const r=t,o=H(n);if(o||dn(n)){const l=o&&Ce(n);let a=!1,u=!1;l&&(a=!jn(n),u=ge(n),n=ls(n)),i=new Array(n.length);for(let c=0,d=n.length;c<d;c++)i[c]=e(a?u?Qe(Un(n[c])):Un(n[c]):n[c],c,void 0,r)}else if(typeof n=="number"){i=new Array(n);for(let l=0;l<n;l++)i[l]=e(l+1,l,void 0,r)}else if(X(n))if(n[Symbol.iterator])i=Array.from(n,(l,a)=>e(l,a,void 0,r));else{const l=Object.keys(n);i=new Array(l.length);for(let a=0,u=l.length;a<u;a++){const c=l[a];i[a]=e(n[c],c,a,r)}}else i=[];return i}const Ds=n=>n?tl(n)?hs(n):Ds(n.parent):null,$t=vn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ds(n.parent),$root:n=>Ds(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Do(n),$forceUpdate:n=>n.f||(n.f=()=>{ai(n.update)}),$nextTick:n=>n.n||(n.n=Ot.bind(n.proxy)),$watch:n=>Sa.bind(n)}),ws=(n,e)=>n!==on&&!n.__isScriptSetup&&W(n,e),Va={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=n;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return i[e];case 4:return t[e];case 3:return r[e]}else{if(ws(s,e))return o[e]=1,s[e];if(i!==on&&W(i,e))return o[e]=2,i[e];if(W(r,e))return o[e]=3,r[e];if(t!==on&&W(t,e))return o[e]=4,t[e];js&&(o[e]=0)}}const u=$t[e];let c,d;if(u)return e==="$attrs"&&yn(n.attrs,"get",""),u(n);if((c=l.__cssModules)&&(c=c[e]))return c;if(t!==on&&W(t,e))return o[e]=4,t[e];if(d=a.config.globalProperties,W(d,e))return d[e]},set({_:n},e,t){const{data:s,setupState:i,ctx:r}=n;return ws(i,e)?(i[e]=t,!0):s!==on&&W(s,e)?(s[e]=t,!0):W(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:s,appContext:i,props:r,type:o}},l){let a;return!!(t[l]||n!==on&&l[0]!=="$"&&W(n,l)||ws(e,l)||W(r,l)||W(s,l)||W($t,l)||W(i.config.globalProperties,l)||(a=o.__cssModules)&&a[l])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:W(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function or(n){return H(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let js=!0;function za(n){const e=Do(n),t=n.proxy,s=n.ctx;js=!1,e.beforeCreate&&lr(e.beforeCreate,n,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:u,created:c,beforeMount:d,mounted:p,beforeUpdate:g,updated:y,activated:w,deactivated:N,beforeDestroy:M,beforeUnmount:O,destroyed:C,unmounted:A,render:Y,renderTracked:an,renderTriggered:Q,errorCaptured:Gn,serverPrefetch:me,expose:Jn,inheritAttrs:be,components:ke,directives:Kn,filters:tt}=e;if(u&&Ga(u,s,null),o)for(const nn in o){const J=o[nn];F(J)&&(s[nn]=J.bind(t))}if(i){const nn=i.call(t,t);X(nn)&&(n.data=as(nn))}if(js=!0,r)for(const nn in r){const J=r[nn],le=F(J)?J.bind(t,t):F(J.get)?J.get.bind(t,t):se,_e=!F(J)&&F(J.set)?J.set.bind(t):se,qn=mn({get:le,set:_e});Object.defineProperty(s,nn,{enumerable:!0,configurable:!0,get:()=>qn.value,set:On=>qn.value=On})}if(l)for(const nn in l)Mo(l[nn],s,t,nn);if(a){const nn=F(a)?a.call(t):a;Reflect.ownKeys(nn).forEach(J=>{Ft(J,nn[J])})}c&&lr(c,n,"c");function $n(nn,J){H(J)?J.forEach(le=>nn(le.bind(t))):J&&nn(J.bind(t))}if($n(Aa,d),$n(Lo,p),$n(Ca,g),$n(Na,y),$n(Ea,w),$n(Oa,N),$n(ja,Gn),$n(Da,an),$n(Ma,Q),$n(Ia,O),$n(di,A),$n(La,me),H(Jn))if(Jn.length){const nn=n.exposed||(n.exposed={});Jn.forEach(J=>{Object.defineProperty(nn,J,{get:()=>t[J],set:le=>t[J]=le,enumerable:!0})})}else n.exposed||(n.exposed={});Y&&n.render===se&&(n.render=Y),be!=null&&(n.inheritAttrs=be),ke&&(n.components=ke),Kn&&(n.directives=Kn),me&&Co(n)}function Ga(n,e,t=se){H(n)&&(n=Hs(n));for(const s in n){const i=n[s];let r;X(i)?"default"in i?r=Bn(i.from||s,i.default,!0):r=Bn(i.from||s):r=Bn(i),kn(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function lr(n,e,t){Vn(H(n)?n.map(s=>s.bind(e.proxy)):n.bind(e.proxy),e,t)}function Mo(n,e,t,s){let i=s.includes(".")?Po(t,s):()=>t[s];if(dn(n)){const r=e[n];F(r)&&Ne(i,r)}else if(F(n))Ne(i,n.bind(t));else if(X(n))if(H(n))n.forEach(r=>Mo(r,e,t,s));else{const r=F(n.handler)?n.handler.bind(t):e[n.handler];F(r)&&Ne(i,r,n)}}function Do(n){const e=n.type,{mixins:t,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!t&&!s?a=e:(a={},i.length&&i.forEach(u=>qt(a,u,o,!0)),qt(a,e,o)),X(e)&&r.set(e,a),a}function qt(n,e,t,s=!1){const{mixins:i,extends:r}=e;r&&qt(n,r,t,!0),i&&i.forEach(o=>qt(n,o,t,!0));for(const o in e)if(!(s&&o==="expose")){const l=Ja[o]||t&&t[o];n[o]=l?l(n[o],e[o]):e[o]}return n}const Ja={data:ar,props:cr,emits:cr,methods:ct,computed:ct,beforeCreate:Sn,created:Sn,beforeMount:Sn,mounted:Sn,beforeUpdate:Sn,updated:Sn,beforeDestroy:Sn,beforeUnmount:Sn,destroyed:Sn,unmounted:Sn,activated:Sn,deactivated:Sn,errorCaptured:Sn,serverPrefetch:Sn,components:ct,directives:ct,watch:qa,provide:ar,inject:Ka};function ar(n,e){return e?n?function(){return vn(F(n)?n.call(this,this):n,F(e)?e.call(this,this):e)}:e:n}function Ka(n,e){return ct(Hs(n),Hs(e))}function Hs(n){if(H(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Sn(n,e){return n?[...new Set([].concat(n,e))]:e}function ct(n,e){return n?vn(Object.create(null),n,e):e}function cr(n,e){return n?H(n)&&H(e)?[...new Set([...n,...e])]:vn(Object.create(null),or(n),or(e??{})):e}function qa(n,e){if(!n)return e;if(!e)return n;const t=vn(Object.create(null),n);for(const s in e)t[s]=Sn(n[s],e[s]);return t}function jo(){return{app:null,config:{isNativeTag:Zr,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Wa=0;function Ya(n,e){return function(s,i=null){F(s)||(s=vn({},s)),i!=null&&!X(i)&&(i=null);const r=jo(),o=new WeakSet,l=[];let a=!1;const u=r.app={_uid:Wa++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:Ac,get config(){return r.config},set config(c){},use(c,...d){return o.has(c)||(c&&F(c.install)?(o.add(c),c.install(u,...d)):F(c)&&(o.add(c),c(u,...d))),u},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),u},component(c,d){return d?(r.components[c]=d,u):r.components[c]},directive(c,d){return d?(r.directives[c]=d,u):r.directives[c]},mount(c,d,p){if(!a){const g=u._ceVNode||gn(s,i);return g.appContext=r,p===!0?p="svg":p===!1&&(p=void 0),n(g,c,p),a=!0,u._container=c,c.__vue_app__=u,hs(g.component)}},onUnmount(c){l.push(c)},unmount(){a&&(Vn(l,u._instance,16),n(null,u._container),delete u._container.__vue_app__)},provide(c,d){return r.provides[c]=d,u},runWithContext(c){const d=Ye;Ye=u;try{return c()}finally{Ye=d}}};return u}}let Ye=null;const Qa=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${En(e)}Modifiers`]||n[`${De(e)}Modifiers`];function Za(n,e,...t){if(n.isUnmounted)return;const s=n.vnode.props||on;let i=t;const r=e.startsWith("update:"),o=r&&Qa(s,e.slice(7));o&&(o.trim&&(i=t.map(c=>dn(c)?c.trim():c)),o.number&&(i=t.map(Zs)));let l,a=s[l=ms(e)]||s[l=ms(En(e))];!a&&r&&(a=s[l=ms(De(e))]),a&&Vn(a,n,6,i);const u=s[l+"Once"];if(u){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,Vn(u,n,6,i)}}const Xa=new WeakMap;function Ho(n,e,t=!1){const s=t?Xa:e.emitsCache,i=s.get(n);if(i!==void 0)return i;const r=n.emits;let o={},l=!1;if(!F(n)){const a=u=>{const c=Ho(u,e,!0);c&&(l=!0,vn(o,c))};!t&&e.mixins.length&&e.mixins.forEach(a),n.extends&&a(n.extends),n.mixins&&n.mixins.forEach(a)}return!r&&!l?(X(n)&&s.set(n,null),null):(H(r)?r.forEach(a=>o[a]=null):vn(o,r),X(n)&&s.set(n,o),o)}function ds(n,e){return!n||!ts(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),W(n,e[0].toLowerCase()+e.slice(1))||W(n,De(e))||W(n,e))}function ur(n){const{type:e,vnode:t,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:u,renderCache:c,props:d,data:p,setupState:g,ctx:y,inheritAttrs:w}=n,N=Jt(n);let M,O;try{if(t.shapeFlag&4){const A=i||s,Y=A;M=ee(u.call(Y,A,c,d,g,p,y)),O=l}else{const A=e;M=ee(A.length>1?A(d,{attrs:l,slots:o,emit:a}):A(d,null)),O=e.props?l:nc(l)}}catch(A){mt.length=0,cs(A,n,1),M=gn(we)}let C=M;if(O&&w!==!1){const A=Object.keys(O),{shapeFlag:Y}=C;A.length&&Y&7&&(r&&A.some(ss)&&(O=ec(O,r)),C=Ze(C,O,!1,!0))}return t.dirs&&(C=Ze(C,null,!1,!0),C.dirs=C.dirs?C.dirs.concat(t.dirs):t.dirs),t.transition&&ui(C,t.transition),M=C,Jt(N),M}const nc=n=>{let e;for(const t in n)(t==="class"||t==="style"||ts(t))&&((e||(e={}))[t]=n[t]);return e},ec=(n,e)=>{const t={};for(const s in n)(!ss(s)||!(s.slice(9)in e))&&(t[s]=n[s]);return t};function tc(n,e,t){const{props:s,children:i,component:r}=n,{props:o,children:l,patchFlag:a}=e,u=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&a>=0){if(a&1024)return!0;if(a&16)return s?dr(s,o,u):!!o;if(a&8){const c=e.dynamicProps;for(let d=0;d<c.length;d++){const p=c[d];if(Fo(o,s,p)&&!ds(u,p))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?dr(s,o,u):!0:!!o;return!1}function dr(n,e,t){const s=Object.keys(e);if(s.length!==Object.keys(n).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(Fo(e,n,r)&&!ds(t,r))return!0}return!1}function Fo(n,e,t){const s=n[t],i=e[t];return t==="style"&&X(s)&&X(i)?!ni(s,i):s!==i}function sc({vnode:n,parent:e,suspense:t},s){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.suspense.vnode.el=i.el=s,n=i),i===n)(n=e.vnode).el=s,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=s)}const Bo={},Uo=()=>Object.create(Bo),Vo=n=>Object.getPrototypeOf(n)===Bo;function ic(n,e,t,s=!1){const i={},r=Uo();n.propsDefaults=Object.create(null),zo(n,e,i,r);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=s?i:yo(i):n.type.props?n.props=i:n.props=r,n.attrs=r}function rc(n,e,t,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=n,l=q(i),[a]=n.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const c=n.vnode.dynamicProps;for(let d=0;d<c.length;d++){let p=c[d];if(ds(n.emitsOptions,p))continue;const g=e[p];if(a)if(W(r,p))g!==r[p]&&(r[p]=g,u=!0);else{const y=En(p);i[y]=Fs(a,l,y,g,n,!1)}else g!==r[p]&&(r[p]=g,u=!0)}}}else{zo(n,e,i,r)&&(u=!0);let c;for(const d in l)(!e||!W(e,d)&&((c=De(d))===d||!W(e,c)))&&(a?t&&(t[d]!==void 0||t[c]!==void 0)&&(i[d]=Fs(a,l,d,void 0,n,!0)):delete i[d]);if(r!==l)for(const d in r)(!e||!W(e,d))&&(delete r[d],u=!0)}u&&fe(n.attrs,"set","")}function zo(n,e,t,s){const[i,r]=n.propsOptions;let o=!1,l;if(e)for(let a in e){if(dt(a))continue;const u=e[a];let c;i&&W(i,c=En(a))?!r||!r.includes(c)?t[c]=u:(l||(l={}))[c]=u:ds(n.emitsOptions,a)||(!(a in s)||u!==s[a])&&(s[a]=u,o=!0)}if(r){const a=q(t),u=l||on;for(let c=0;c<r.length;c++){const d=r[c];t[d]=Fs(i,a,d,u[d],n,!W(u,d))}}return o}function Fs(n,e,t,s,i,r){const o=n[t];if(o!=null){const l=W(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&F(a)){const{propsDefaults:u}=i;if(t in u)s=u[t];else{const c=Pt(i);s=u[t]=a.call(null,e),c()}}else s=a;i.ce&&i.ce._setProp(t,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===De(t))&&(s=!0))}return s}const oc=new WeakMap;function Go(n,e,t=!1){const s=t?oc:e.propsCache,i=s.get(n);if(i)return i;const r=n.props,o={},l=[];let a=!1;if(!F(n)){const c=d=>{a=!0;const[p,g]=Go(d,e,!0);vn(o,p),g&&l.push(...g)};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}if(!r&&!a)return X(n)&&s.set(n,Ke),Ke;if(H(r))for(let c=0;c<r.length;c++){const d=En(r[c]);fr(d)&&(o[d]=on)}else if(r)for(const c in r){const d=En(c);if(fr(d)){const p=r[c],g=o[d]=H(p)||F(p)?{type:p}:vn({},p),y=g.type;let w=!1,N=!0;if(H(y))for(let M=0;M<y.length;++M){const O=y[M],C=F(O)&&O.name;if(C==="Boolean"){w=!0;break}else C==="String"&&(N=!1)}else w=F(y)&&y.name==="Boolean";g[0]=w,g[1]=N,(w||W(g,"default"))&&l.push(d)}}const u=[o,l];return X(n)&&s.set(n,u),u}function fr(n){return n[0]!=="$"&&!dt(n)}const fi=n=>n==="_"||n==="_ctx"||n==="$stable",hi=n=>H(n)?n.map(ee):[ee(n)],lc=(n,e,t)=>{if(e._n)return e;const s=xa((...i)=>hi(e(...i)),t);return s._c=!1,s},Jo=(n,e,t)=>{const s=n._ctx;for(const i in n){if(fi(i))continue;const r=n[i];if(F(r))e[i]=lc(i,r,s);else if(r!=null){const o=hi(r);e[i]=()=>o}}},Ko=(n,e)=>{const t=hi(e);n.slots.default=()=>t},qo=(n,e,t)=>{for(const s in e)(t||!fi(s))&&(n[s]=e[s])},ac=(n,e,t)=>{const s=n.slots=Uo();if(n.vnode.shapeFlag&32){const i=e._;i?(qo(s,e,t),t&&so(s,"_",i,!0)):Jo(e,s)}else e&&Ko(n,e)},cc=(n,e,t)=>{const{vnode:s,slots:i}=n;let r=!0,o=on;if(s.shapeFlag&32){const l=e._;l?t&&l===1?r=!1:qo(i,e,t):(r=!e.$stable,Jo(e,i)),o=e}else e&&(Ko(n,e),o={default:1});if(r)for(const l in i)!fi(l)&&o[l]==null&&delete i[l]},Pn=pc;function uc(n){return dc(n)}function dc(n,e){const t=os();t.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:u,setElementText:c,parentNode:d,nextSibling:p,setScopeId:g=se,insertStaticContent:y}=n,w=(f,h,$,b=null,x=null,m=null,T=void 0,S=null,k=!!h.dynamicChildren)=>{if(f===h)return;f&&!rt(f,h)&&(b=_(f),On(f,x,m,!0),f=null),h.patchFlag===-2&&(k=!1,h.dynamicChildren=null);const{type:v,ref:D,shapeFlag:E}=h;switch(v){case fs:N(f,h,$,b);break;case we:M(f,h,$,b);break;case Bt:f==null&&O(h,$,b,T);break;case cn:ke(f,h,$,b,x,m,T,S,k);break;default:E&1?Y(f,h,$,b,x,m,T,S,k):E&6?Kn(f,h,$,b,x,m,T,S,k):(E&64||E&128)&&v.process(f,h,$,b,x,m,T,S,k,I)}D!=null&&x?pt(D,f&&f.ref,m,h||f,!h):D==null&&f&&f.ref!=null&&pt(f.ref,null,m,f,!0)},N=(f,h,$,b)=>{if(f==null)s(h.el=l(h.children),$,b);else{const x=h.el=f.el;h.children!==f.children&&u(x,h.children)}},M=(f,h,$,b)=>{f==null?s(h.el=a(h.children||""),$,b):h.el=f.el},O=(f,h,$,b)=>{[f.el,f.anchor]=y(f.children,h,$,b,f.el,f.anchor)},C=({el:f,anchor:h},$,b)=>{let x;for(;f&&f!==h;)x=p(f),s(f,$,b),f=x;s(h,$,b)},A=({el:f,anchor:h})=>{let $;for(;f&&f!==h;)$=p(f),i(f),f=$;i(h)},Y=(f,h,$,b,x,m,T,S,k)=>{if(h.type==="svg"?T="svg":h.type==="math"&&(T="mathml"),f==null)an(h,$,b,x,m,T,S,k);else{const v=f.el&&f.el._isVueCE?f.el:null;try{v&&v._beginPatch(),me(f,h,x,m,T,S,k)}finally{v&&v._endPatch()}}},an=(f,h,$,b,x,m,T,S)=>{let k,v;const{props:D,shapeFlag:E,transition:L,dirs:j}=f;if(k=f.el=o(f.type,m,D&&D.is,D),E&8?c(k,f.children):E&16&&Gn(f.children,k,null,b,x,ks(f,m),T,S),j&&Te(f,null,b,"created"),Q(k,f,f.scopeId,T,b),D){for(const sn in D)sn!=="value"&&!dt(sn)&&r(k,sn,null,D[sn],m,b);"value"in D&&r(k,"value",null,D.value,m),(v=D.onVnodeBeforeMount)&&Zn(v,b,f)}j&&Te(f,null,b,"beforeMount");const G=fc(x,L);G&&L.beforeEnter(k),s(k,h,$),((v=D&&D.onVnodeMounted)||G||j)&&Pn(()=>{try{v&&Zn(v,b,f),G&&L.enter(k),j&&Te(f,null,b,"mounted")}finally{}},x)},Q=(f,h,$,b,x)=>{if($&&g(f,$),b)for(let m=0;m<b.length;m++)g(f,b[m]);if(x){let m=x.subTree;if(h===m||Zo(m.type)&&(m.ssContent===h||m.ssFallback===h)){const T=x.vnode;Q(f,T,T.scopeId,T.slotScopeIds,x.parent)}}},Gn=(f,h,$,b,x,m,T,S,k=0)=>{for(let v=k;v<f.length;v++){const D=f[v]=S?de(f[v]):ee(f[v]);w(null,D,h,$,b,x,m,T,S)}},me=(f,h,$,b,x,m,T)=>{const S=h.el=f.el;let{patchFlag:k,dynamicChildren:v,dirs:D}=h;k|=f.patchFlag&16;const E=f.props||on,L=h.props||on;let j;if($&&Re($,!1),(j=L.onVnodeBeforeUpdate)&&Zn(j,$,h,f),D&&Te(h,f,$,"beforeUpdate"),$&&Re($,!0),v&&(!f.dynamicChildren||f.dynamicChildren.length!==v.length)&&(k=0,T=!1,v=null),(E.innerHTML&&L.innerHTML==null||E.textContent&&L.textContent==null)&&c(S,""),v?Jn(f.dynamicChildren,v,S,$,b,ks(h,x),m):T||J(f,h,S,null,$,b,ks(h,x),m,!1),k>0){if(k&16)be(S,E,L,$,x);else if(k&2&&E.class!==L.class&&r(S,"class",null,L.class,x),k&4&&r(S,"style",E.style,L.style,x),k&8){const G=h.dynamicProps;for(let sn=0;sn<G.length;sn++){const en=G[sn],hn=E[en],bn=L[en];(bn!==hn||en==="value")&&r(S,en,hn,bn,x,$)}}k&1&&f.children!==h.children&&c(S,h.children)}else!T&&v==null&&be(S,E,L,$,x);((j=L.onVnodeUpdated)||D)&&Pn(()=>{j&&Zn(j,$,h,f),D&&Te(h,f,$,"updated")},b)},Jn=(f,h,$,b,x,m,T)=>{for(let S=0;S<h.length;S++){const k=f[S],v=h[S],D=k.el&&(k.type===cn||!rt(k,v)||k.shapeFlag&198)?d(k.el):$;w(k,v,D,null,b,x,m,T,!0)}},be=(f,h,$,b,x)=>{if(h!==$){if(h!==on)for(const m in h)!dt(m)&&!(m in $)&&r(f,m,h[m],null,x,b);for(const m in $){if(dt(m))continue;const T=$[m],S=h[m];T!==S&&m!=="value"&&r(f,m,S,T,x,b)}"value"in $&&r(f,"value",h.value,$.value,x)}},ke=(f,h,$,b,x,m,T,S,k)=>{const v=h.el=f?f.el:l(""),D=h.anchor=f?f.anchor:l("");let{patchFlag:E,dynamicChildren:L,slotScopeIds:j}=h;j&&(S=S?S.concat(j):j),f==null?(s(v,$,b),s(D,$,b),Gn(h.children||[],$,D,x,m,T,S,k)):E>0&&E&64&&L&&f.dynamicChildren&&f.dynamicChildren.length===L.length?(Jn(f.dynamicChildren,L,$,x,m,T,S),(h.key!=null||x&&h===x.subTree)&&Wo(f,h,!0)):J(f,h,$,D,x,m,T,S,k)},Kn=(f,h,$,b,x,m,T,S,k)=>{h.slotScopeIds=S,f==null?h.shapeFlag&512?x.ctx.activate(h,$,b,T,k):tt(h,$,b,x,m,T,k):Fe(f,h,k)},tt=(f,h,$,b,x,m,T)=>{const S=f.component=wc(f,b,x);if(No(f)&&(S.ctx.renderer=I),Sc(S,!1,T),S.asyncDep){if(x&&x.registerDep(S,$n,T),!f.el){const k=S.subTree=gn(we);M(null,k,h,$),f.placeholder=k.el}}else $n(S,f,h,$,x,m,T)},Fe=(f,h,$)=>{const b=h.component=f.component;if(tc(f,h,$))if(b.asyncDep&&!b.asyncResolved){nn(b,h,$);return}else b.next=h,b.update();else h.el=f.el,b.vnode=h},$n=(f,h,$,b,x,m,T)=>{const S=()=>{if(f.isMounted){let{next:E,bu:L,u:j,parent:G,vnode:sn}=f;{const Yn=Yo(f);if(Yn){E&&(E.el=sn.el,nn(f,E,T)),Yn.asyncDep.then(()=>{Pn(()=>{f.isUnmounted||v()},x)});return}}let en=E,hn;Re(f,!1),E?(E.el=sn.el,nn(f,E,T)):E=sn,L&&Ht(L),(hn=E.props&&E.props.onVnodeBeforeUpdate)&&Zn(hn,G,E,sn),Re(f,!0);const bn=ur(f),Wn=f.subTree;f.subTree=bn,w(Wn,bn,d(Wn.el),_(Wn),f,x,m),E.el=bn.el,en===null&&sc(f,bn.el),j&&Pn(j,x),(hn=E.props&&E.props.onVnodeUpdated)&&Pn(()=>Zn(hn,G,E,sn),x)}else{let E;const{el:L,props:j}=h,{bm:G,m:sn,parent:en,root:hn,type:bn}=f,Wn=gt(h);Re(f,!1),G&&Ht(G),!Wn&&(E=j&&j.onVnodeBeforeMount)&&Zn(E,en,h),Re(f,!0);{hn.ce&&hn.ce._hasShadowRoot()&&hn.ce._injectChildStyle(bn,f.parent?f.parent.type:void 0);const Yn=f.subTree=ur(f);w(null,Yn,$,b,f,x,m),h.el=Yn.el}if(sn&&Pn(sn,x),!Wn&&(E=j&&j.onVnodeMounted)){const Yn=h;Pn(()=>Zn(E,en,Yn),x)}(h.shapeFlag&256||en&&gt(en.vnode)&&en.vnode.shapeFlag&256)&&f.a&&Pn(f.a,x),f.isMounted=!0,h=$=b=null}};f.scope.on();const k=f.effect=new lo(S);f.scope.off();const v=f.update=k.run.bind(k),D=f.job=k.runIfDirty.bind(k);D.i=f,D.id=f.uid,k.scheduler=()=>ai(D),Re(f,!0),v()},nn=(f,h,$)=>{h.component=f;const b=f.vnode.props;f.vnode=h,f.next=null,rc(f,h.props,b,$),cc(f,h.children,$),re(),tr(f),oe()},J=(f,h,$,b,x,m,T,S,k=!1)=>{const v=f&&f.children,D=f?f.shapeFlag:0,E=h.children,{patchFlag:L,shapeFlag:j}=h;if(L>0){if(L&128){_e(v,E,$,b,x,m,T,S,k);return}else if(L&256){le(v,E,$,b,x,m,T,S,k);return}}j&8?(D&16&&Ln(v,x,m),E!==v&&c($,E)):D&16?j&16?_e(v,E,$,b,x,m,T,S,k):Ln(v,x,m,!0):(D&8&&c($,""),j&16&&Gn(E,$,b,x,m,T,S,k))},le=(f,h,$,b,x,m,T,S,k)=>{f=f||Ke,h=h||Ke;const v=f.length,D=h.length,E=Math.min(v,D);let L;for(L=0;L<E;L++){const j=h[L]=k?de(h[L]):ee(h[L]);w(f[L],j,$,null,x,m,T,S,k)}v>D?Ln(f,x,m,!0,!1,E):Gn(h,$,b,x,m,T,S,k,E)},_e=(f,h,$,b,x,m,T,S,k)=>{let v=0;const D=h.length;let E=f.length-1,L=D-1;for(;v<=E&&v<=L;){const j=f[v],G=h[v]=k?de(h[v]):ee(h[v]);if(rt(j,G))w(j,G,$,null,x,m,T,S,k);else break;v++}for(;v<=E&&v<=L;){const j=f[E],G=h[L]=k?de(h[L]):ee(h[L]);if(rt(j,G))w(j,G,$,null,x,m,T,S,k);else break;E--,L--}if(v>E){if(v<=L){const j=L+1,G=j<D?h[j].el:b;for(;v<=L;)w(null,h[v]=k?de(h[v]):ee(h[v]),$,G,x,m,T,S,k),v++}}else if(v>L)for(;v<=E;)On(f[v],x,m,!0),v++;else{const j=v,G=v,sn=new Map;for(v=G;v<=L;v++){const An=h[v]=k?de(h[v]):ee(h[v]);An.key!=null&&sn.set(An.key,v)}let en,hn=0;const bn=L-G+1;let Wn=!1,Yn=0;const st=new Array(bn);for(v=0;v<bn;v++)st[v]=0;for(v=j;v<=E;v++){const An=f[v];if(hn>=bn){On(An,x,m,!0);continue}let Qn;if(An.key!=null)Qn=sn.get(An.key);else for(en=G;en<=L;en++)if(st[en-G]===0&&rt(An,h[en])){Qn=en;break}Qn===void 0?On(An,x,m,!0):(st[Qn-G]=v+1,Qn>=Yn?Yn=Qn:Wn=!0,w(An,h[Qn],$,null,x,m,T,S,k),hn++)}const Wi=Wn?hc(st):Ke;for(en=Wi.length-1,v=bn-1;v>=0;v--){const An=G+v,Qn=h[An],Yi=h[An+1],Qi=An+1<D?Yi.el||Qo(Yi):b;st[v]===0?w(null,Qn,$,Qi,x,m,T,S,k):Wn&&(en<0||v!==Wi[en]?qn(Qn,$,Qi,2):en--)}}},qn=(f,h,$,b,x=null)=>{const{el:m,type:T,transition:S,children:k,shapeFlag:v}=f;if(v&6){qn(f.component.subTree,h,$,b);return}if(v&128){f.suspense.move(h,$,b);return}if(v&64){T.move(f,h,$,I);return}if(T===cn){s(m,h,$);for(let E=0;E<k.length;E++)qn(k[E],h,$,b);s(f.anchor,h,$);return}if(T===Bt){C(f,h,$);return}if(b!==2&&v&1&&S)if(b===0)S.persisted&&!m[ys]?s(m,h,$):(S.beforeEnter(m),s(m,h,$),Pn(()=>S.enter(m),x));else{const{leave:E,delayLeave:L,afterLeave:j}=S,G=()=>{f.ctx.isUnmounted?i(m):s(m,h,$)},sn=()=>{const en=m._isLeaving||!!m[ys];m._isLeaving&&m[ys](!0),S.persisted&&!en?G():E(m,()=>{G(),j&&j()})};L?L(m,G,sn):sn()}else s(m,h,$)},On=(f,h,$,b=!1,x=!1)=>{const{type:m,props:T,ref:S,children:k,dynamicChildren:v,shapeFlag:D,patchFlag:E,dirs:L,cacheIndex:j,memo:G}=f;if(E===-2&&(x=!1),S!=null&&(re(),pt(S,null,$,f,!0),oe()),j!=null&&(h.renderCache[j]=void 0),D&256){h.ctx.deactivate(f);return}const sn=D&1&&L,en=!gt(f);let hn;if(en&&(hn=T&&T.onVnodeBeforeUnmount)&&Zn(hn,h,f),D&6)Se(f.component,$,b);else{if(D&128){f.suspense.unmount($,b);return}sn&&Te(f,null,h,"beforeUnmount"),D&64?f.type.remove(f,h,$,I,b):v&&!v.hasOnce&&(m!==cn||E>0&&E&64)?Ln(v,h,$,!1,!0):(m===cn&&E&384||!x&&D&16)&&Ln(k,h,$),b&&Be(f)}const bn=G!=null&&j==null;(en&&(hn=T&&T.onVnodeUnmounted)||sn||bn)&&Pn(()=>{hn&&Zn(hn,h,f),sn&&Te(f,null,h,"unmounted"),bn&&(f.el=null)},$)},Be=f=>{const{type:h,el:$,anchor:b,transition:x}=f;if(h===cn){Ue($,b);return}if(h===Bt){A(f);return}const m=()=>{i($),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(f.shapeFlag&1&&x&&!x.persisted){const{leave:T,delayLeave:S}=x,k=()=>T($,m);S?S(f.el,m,k):k()}else m()},Ue=(f,h)=>{let $;for(;f!==h;)$=p(f),i(f),f=$;i(h)},Se=(f,h,$)=>{const{bum:b,scope:x,job:m,subTree:T,um:S,m:k,a:v}=f;hr(k),hr(v),b&&Ht(b),x.stop(),m&&(m.flags|=8,On(T,f,h,$)),S&&Pn(S,h),Pn(()=>{f.isUnmounted=!0},h)},Ln=(f,h,$,b=!1,x=!1,m=0)=>{for(let T=m;T<f.length;T++)On(f[T],h,$,b,x)},_=f=>{if(f.shapeFlag&6)return _(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const h=p(f.anchor||f.el),$=h&&h[Ta];return $?p($):h};let P=!1;const R=(f,h,$)=>{let b;f==null?h._vnode&&(On(h._vnode,null,null,!0),b=h._vnode.component):w(h._vnode||null,f,h,null,null,null,$),h._vnode=f,P||(P=!0,tr(b),Ro(),P=!1)},I={p:w,um:On,m:qn,r:Be,mt:tt,mc:Gn,pc:J,pbc:Jn,n:_,o:n};return{render:R,hydrate:void 0,createApp:Ya(R)}}function ks({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Re({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function fc(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Wo(n,e,t=!1){const s=n.children,i=e.children;if(H(s)&&H(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=de(i[r]),l.el=o.el),!t&&l.patchFlag!==-2&&Wo(o,l)),l.type===fs&&(l.patchFlag===-1&&(l=i[r]=de(l)),l.el=o.el),l.type===we&&!l.el&&(l.el=o.el)}}function hc(n){const e=n.slice(),t=[0];let s,i,r,o,l;const a=n.length;for(s=0;s<a;s++){const u=n[s];if(u!==0){if(i=t[t.length-1],n[i]<u){e[s]=i,t.push(s);continue}for(r=0,o=t.length-1;r<o;)l=r+o>>1,n[t[l]]<u?r=l+1:o=l;u<n[t[r]]&&(r>0&&(e[s]=t[r-1]),t[r]=s)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function Yo(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Yo(e)}function hr(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Qo(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Qo(e.subTree):null}const Zo=n=>n.__isSuspense;function pc(n,e){e&&e.pendingBranch?H(n)?e.effects.push(...n):e.effects.push(n):_a(n)}const cn=Symbol.for("v-fgt"),fs=Symbol.for("v-txt"),we=Symbol.for("v-cmt"),Bt=Symbol.for("v-stc"),mt=[];let In=null;function B(n=!1){mt.push(In=n?null:[])}function gc(){mt.pop(),In=mt[mt.length-1]||null}let kt=1;function Wt(n,e=!1){kt+=n,n<0&&In&&e&&(In.hasOnce=!0)}function Xo(n){return n.dynamicChildren=kt>0?In||Ke:null,gc(),kt>0&&In&&In.push(n),n}function V(n,e,t,s,i,r){return Xo(U(n,e,t,s,i,r,!0))}function nl(n,e,t,s,i){return Xo(gn(n,e,t,s,i,!0))}function Yt(n){return n?n.__v_isVNode===!0:!1}function rt(n,e){return n.type===e.type&&n.key===e.key}const el=({key:n})=>n??null,Ut=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?dn(n)||kn(n)||F(n)?{i:Nn,r:n,k:e,f:!!t}:n:null);function U(n,e=null,t=null,s=0,i=null,r=n===cn?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&el(e),ref:e&&Ut(e),scopeId:Oo,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Nn};return l?(Qt(a,t),r&128&&n.normalize(a)):t&&(a.shapeFlag|=dn(t)?8:16),kt>0&&!o&&In&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&In.push(a),a}const gn=$c;function $c(n,e=null,t=null,s=0,i=null,r=!1){if((!n||n===Ba)&&(n=we),Yt(n)){const l=Ze(n,e,!0);return t&&Qt(l,t),kt>0&&!r&&In&&(l.shapeFlag&6?In[In.indexOf(n)]=l:In.push(l)),l.patchFlag=-2,l}if(Pc(n)&&(n=n.__vccOpts),e){e=mc(e);let{class:l,style:a}=e;l&&!dn(l)&&(e.class=Hn(l)),X(a)&&(li(a)&&!H(a)&&(a=vn({},a)),e.style=Xs(a))}const o=dn(n)?1:Zo(n)?128:Ra(n)?64:X(n)?4:F(n)?2:0;return U(n,e,t,s,i,o,r,!0)}function mc(n){return n?li(n)||Vo(n)?vn({},n):n:null}function Ze(n,e,t=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=n,u=e?xc(i||{},e):i,c={__v_isVNode:!0,__v_skip:!0,type:n.type,props:u,key:u&&el(u),ref:e&&e.ref?t&&r?H(r)?r.concat(Ut(e)):[r,Ut(e)]:Ut(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==cn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:a,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ze(n.ssContent),ssFallback:n.ssFallback&&Ze(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return a&&s&&ui(c,a.clone(c)),c}function bc(n=" ",e=0){return gn(fs,null,n,e)}function _c(n,e){const t=gn(Bt,null,n);return t.staticCount=e,t}function Le(n="",e=!1){return e?(B(),nl(we,null,n)):gn(we,null,n)}function ee(n){return n==null||typeof n=="boolean"?gn(we):H(n)?gn(cn,null,n.slice()):Yt(n)?de(n):gn(fs,null,String(n))}function de(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ze(n)}function Qt(n,e){let t=0;const{shapeFlag:s}=n;if(e==null)e=null;else if(H(e))t=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),Qt(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!Vo(e)?e._ctx=Nn:i===3&&Nn&&(Nn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(F(e)){if(s&65){Qt(n,{default:e});return}e={default:e,_ctx:Nn},t=32}else e=String(e),s&64?(t=16,e=[bc(e)]):t=8;n.children=e,n.shapeFlag|=t}function xc(...n){const e={};for(let t=0;t<n.length;t++){const s=n[t];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=Hn([e.class,s.class]));else if(i==="style")e.style=Xs([e.style,s.style]);else if(ts(i)){const r=e[i],o=s[i];o&&r!==o&&!(H(r)&&r.includes(o))?e[i]=r?[].concat(r,o):o:o==null&&r==null&&!ss(i)&&(e[i]=o)}else i!==""&&(e[i]=s[i])}return e}function Zn(n,e,t,s=null){Vn(n,e,7,[t,s])}const vc=jo();let yc=0;function wc(n,e,t){const s=n.type,i=(e?e.appContext:n.appContext)||vc,r={uid:yc++,vnode:n,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new zl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Go(s,i),emitsOptions:Ho(s,i),emit:null,emitted:null,propsDefaults:on,inheritAttrs:s.inheritAttrs,ctx:on,data:on,props:on,attrs:on,slots:on,refs:on,setupState:on,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Za.bind(null,r),n.ce&&n.ce(r),r}let wn=null;const kc=()=>wn||Nn;let Zt,Bs;{const n=os(),e=(t,s)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};Zt=e("__VUE_INSTANCE_SETTERS__",t=>wn=t),Bs=e("__VUE_SSR_SETTERS__",t=>St=t)}const Pt=n=>{const e=wn;return Zt(n),n.scope.on(),()=>{n.scope.off(),Zt(e)}},pr=()=>{wn&&wn.scope.off(),Zt(null)};function tl(n){return n.vnode.shapeFlag&4}let St=!1;function Sc(n,e=!1,t=!1){e&&Bs(e);const{props:s,children:i}=n.vnode,r=tl(n);ic(n,s,r,e),ac(n,i,t||e);const o=r?Tc(n,e):void 0;return e&&Bs(!1),o}function Tc(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Va);const{setup:s}=t;if(s){re();const i=n.setupContext=s.length>1?Ec(n):null,r=Pt(n),o=Et(s,n,0,[n.props,i]),l=no(o);if(oe(),r(),(l||n.sp)&&!gt(n)&&Co(n),l){if(o.then(pr,pr),e)return o.then(a=>{gr(n,a)}).catch(a=>{cs(a,n,0)});n.asyncDep=o}else gr(n,o)}else sl(n)}function gr(n,e,t){F(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:X(e)&&(n.setupState=ko(e)),sl(n)}function sl(n,e,t){const s=n.type;n.render||(n.render=s.render||se);{const i=Pt(n);re();try{za(n)}finally{oe(),i()}}}const Rc={get(n,e){return yn(n,"get",""),n[e]}};function Ec(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Rc),slots:n.slots,emit:n.emit,expose:e}}function hs(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(ko(ca(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in $t)return $t[t](n)},has(e,t){return t in e||t in $t}})):n.proxy}function Oc(n,e=!0){return F(n)?n.displayName||n.name:n.name||e&&n.__name}function Pc(n){return F(n)&&"__vccOpts"in n}const mn=(n,e)=>pa(n,e,St);function il(n,e,t){try{Wt(-1);const s=arguments.length;return s===2?X(e)&&!H(e)?Yt(e)?gn(n,null,[e]):gn(n,e):gn(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&Yt(t)&&(t=[t]),gn(n,e,t))}finally{Wt(1)}}const Ac="3.5.39";/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Us;const $r=typeof window<"u"&&window.trustedTypes;if($r)try{Us=$r.createPolicy("vue",{createHTML:n=>n})}catch{}const rl=Us?n=>Us.createHTML(n):n=>n,Cc="http://www.w3.org/2000/svg",Nc="http://www.w3.org/1998/Math/MathML",ue=typeof document<"u"?document:null,mr=ue&&ue.createElement("template"),Ic={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,s)=>{const i=e==="svg"?ue.createElementNS(Cc,n):e==="mathml"?ue.createElementNS(Nc,n):t?ue.createElement(n,{is:t}):ue.createElement(n);return n==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:n=>ue.createTextNode(n),createComment:n=>ue.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ue.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,s,i,r){const o=t?t.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===r||!(i=i.nextSibling)););else{mr.innerHTML=rl(s==="svg"?`<svg>${n}</svg>`:s==="mathml"?`<math>${n}</math>`:n);const l=mr.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Lc=Symbol("_vtc");function Mc(n,e,t){const s=n[Lc];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const br=Symbol("_vod"),Dc=Symbol("_vsh"),jc=Symbol(""),Hc=/(?:^|;)\s*display\s*:/;function Fc(n,e,t){const s=n.style,i=dn(t);let r=!1;if(t&&!i){if(e)if(dn(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();t[l]==null&&ut(s,l,"")}else for(const o in e)t[o]==null&&ut(s,o,"");for(const o in t){o==="display"&&(r=!0);const l=t[o];l!=null?Uc(n,o,!dn(e)&&e?e[o]:void 0,l)||ut(s,o,l):ut(s,o,"")}}else if(i){if(e!==t){const o=s[jc];o&&(t+=";"+o),s.cssText=t,r=Hc.test(t)}}else e&&n.removeAttribute("style");br in n&&(n[br]=r?s.display:"",n[Dc]&&(s.display="none"))}const _r=/\s*!important$/;function ut(n,e,t){if(H(t))t.forEach(s=>ut(n,e,s));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const s=Bc(n,e);_r.test(t)?n.setProperty(De(s),t.replace(_r,""),"important"):n[s]=t}}const xr=["Webkit","Moz","ms"],Ss={};function Bc(n,e){const t=Ss[e];if(t)return t;let s=En(e);if(s!=="filter"&&s in n)return Ss[e]=s;s=rs(s);for(let i=0;i<xr.length;i++){const r=xr[i]+s;if(r in n)return Ss[e]=r}return e}function Uc(n,e,t,s){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&dn(s)&&t===s}const vr="http://www.w3.org/1999/xlink";function yr(n,e,t,s,i,r=Ul(e)){s&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(vr,e.slice(6,e.length)):n.setAttributeNS(vr,e,t):t==null||r&&!io(t)?n.removeAttribute(e):n.setAttribute(e,r?"":ie(t)?String(t):t)}function wr(n,e,t,s,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?rl(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?n.getAttribute("value")||"":n.value,a=t==null?n.type==="checkbox"?"on":"":String(t);(l!==a||!("_value"in n))&&(n.value=a),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=io(t):t==null&&l==="string"?(t="",o=!0):l==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(i||e)}function Ge(n,e,t,s){n.addEventListener(e,t,s)}function Vc(n,e,t,s){n.removeEventListener(e,t,s)}const kr=Symbol("_vei");function zc(n,e,t,s,i=null){const r=n[kr]||(n[kr]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=Kc(e);if(s){const u=r[e]=Yc(s,i);Ge(n,l,u,a)}else o&&(Vc(n,l,o,a),r[e]=void 0)}}const Gc=/(Once|Passive|Capture)$/,Jc=/^on:?(?:Once|Passive|Capture)$/;function Kc(n){let e,t;for(;(t=n.match(Gc))&&!Jc.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):De(n.slice(2)),e]}let Ts=0;const qc=Promise.resolve(),Wc=()=>Ts||(qc.then(()=>Ts=0),Ts=Date.now());function Yc(n,e){const t=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=t.attached)return;const i=t.value;if(H(i)){const r=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{r.call(s),s._stopped=!0};const o=i.slice(),l=[s];for(let a=0;a<o.length&&!s._stopped;a++){const u=o[a];u&&Vn(u,e,5,l)}}else Vn(i,e,5,[s])};return t.value=n,t.attached=Wc(),t}const Sr=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Qc=(n,e,t,s,i,r)=>{const o=i==="svg";e==="class"?Mc(n,s,o):e==="style"?Fc(n,t,s):ts(e)?ss(e)||zc(n,e,t,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Zc(n,e,s,o))?(wr(n,e,s),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&yr(n,e,s,o,r,e!=="value")):n._isVueCE&&(Xc(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!dn(s)))?wr(n,En(e),s,r,e):(e==="true-value"?n._trueValue=s:e==="false-value"&&(n._falseValue=s),yr(n,e,s,o))};function Zc(n,e,t,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in n&&Sr(e)&&F(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Sr(e)&&dn(t)?!1:e in n}function Xc(n,e){const t=n._def.props;if(!t)return!1;const s=En(e);return Array.isArray(t)?t.some(i=>En(i)===s):Object.keys(t).some(i=>En(i)===s)}const Tr=n=>{const e=n.props["onUpdate:modelValue"]||!1;return H(e)?t=>Ht(e,t):e};function nu(n){n.target.composing=!0}function Rr(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Rs=Symbol("_assign");function Er(n,e,t){return e&&(n=n.trim()),t&&(n=Zs(n)),n}const eu={created(n,{modifiers:{lazy:e,trim:t,number:s}},i){n[Rs]=Tr(i);const r=s||i.props&&i.props.type==="number";Ge(n,e?"change":"input",o=>{o.target.composing||n[Rs](Er(n.value,t,r))}),(t||r)&&Ge(n,"change",()=>{n.value=Er(n.value,t,r)}),e||(Ge(n,"compositionstart",nu),Ge(n,"compositionend",Rr),Ge(n,"change",Rr))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:s,trim:i,number:r}},o){if(n[Rs]=Tr(o),n.composing)return;const l=(r||n.type==="number")&&!/^0\d/.test(n.value)?Zs(n.value):n.value,a=e??"";if(l===a)return;const u=n.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===n&&n.type!=="range"&&(s&&e===t||i&&n.value.trim()===a)||(n.value=a)}},tu=["ctrl","shift","alt","meta"],su={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>tu.some(t=>n[`${t}Key`]&&!e.includes(t))},iu=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),s=e.join(".");return t[s]||(t[s]=(i,...r)=>{for(let o=0;o<e.length;o++){const l=su[e[o]];if(l&&l(i,e))return}return n(i,...r)})},ru=vn({patchProp:Qc},Ic);let Or;function ou(){return Or||(Or=uc(ru))}const lu=(...n)=>{const e=ou().createApp(...n),{mount:t}=e;return e.mount=s=>{const i=cu(s);if(!i)return;const r=e._component;!F(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=t(i,!1,au(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function au(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function cu(n){return dn(n)?document.querySelector(n):n}const Vt=pe(localStorage.getItem("theme")!=="light");ka(()=>{const n=Vt.value?"dark":"light";document.documentElement.setAttribute("data-theme",n),localStorage.setItem("theme",n)});function uu(){function n(){Vt.value=!Vt.value}return{isDark:Vt,toggle:n}}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Je=typeof document<"u";function ol(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function du(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&ol(n.default)}const K=Object.assign;function Es(n,e){const t={};for(const s in e){const i=e[s];t[s]=zn(i)?i.map(n):n(i)}return t}const bt=()=>{},zn=Array.isArray;function Pr(n,e){const t={};for(const s in n)t[s]=s in e?e[s]:n[s];return t}const ll=/#/g,fu=/&/g,hu=/\//g,pu=/=/g,gu=/\?/g,al=/\+/g,$u=/%5B/g,mu=/%5D/g,cl=/%5E/g,bu=/%60/g,ul=/%7B/g,_u=/%7C/g,dl=/%7D/g,xu=/%20/g;function pi(n){return n==null?"":encodeURI(""+n).replace(_u,"|").replace($u,"[").replace(mu,"]")}function vu(n){return pi(n).replace(ul,"{").replace(dl,"}").replace(cl,"^")}function Vs(n){return pi(n).replace(al,"%2B").replace(xu,"+").replace(ll,"%23").replace(fu,"%26").replace(bu,"`").replace(ul,"{").replace(dl,"}").replace(cl,"^")}function yu(n){return Vs(n).replace(pu,"%3D")}function wu(n){return pi(n).replace(ll,"%23").replace(gu,"%3F")}function ku(n){return wu(n).replace(hu,"%2F")}function Tt(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const Su=/\/$/,Tu=n=>n.replace(Su,"");function Os(n,e,t="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return a=l>=0&&a>l?-1:a,a>=0&&(s=e.slice(0,a),r=e.slice(a,l>0?l:e.length),i=n(r.slice(1))),l>=0&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=Pu(s??e,t),{fullPath:s+r+o,path:s,query:i,hash:Tt(o)}}function Ru(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Ar(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function Eu(n,e,t){const s=e.matched.length-1,i=t.matched.length-1;return s>-1&&s===i&&Xe(e.matched[s],t.matched[i])&&fl(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Xe(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function fl(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!Ou(n[t],e[t]))return!1;return!0}function Ou(n,e){return zn(n)?Cr(n,e):zn(e)?Cr(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function Cr(n,e){return zn(e)?n.length===e.length&&n.every((t,s)=>t===e[s]):n.length===1&&n[0]===e}function Pu(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),s=n.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=t.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const xe={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let zs=function(n){return n.pop="pop",n.push="push",n}({}),Ps=function(n){return n.back="back",n.forward="forward",n.unknown="",n}({});function Au(n){if(!n)if(Je){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Tu(n)}const Cu=/^[^#]+#/;function Nu(n,e){return n.replace(Cu,"#")+e}function Iu(n,e){const t=document.documentElement.getBoundingClientRect(),s=n.getBoundingClientRect();return{behavior:e.behavior,left:s.left-t.left-(e.left||0),top:s.top-t.top-(e.top||0)}}const ps=()=>({left:window.scrollX,top:window.scrollY});function Lu(n){let e;if("el"in n){const t=n.el,s=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?s?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=Iu(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Nr(n,e){return(history.state?history.state.position-e:-1)+n}const Gs=new Map;function Mu(n,e){Gs.set(n,e)}function Du(n){const e=Gs.get(n);return Gs.delete(n),e}function ju(n){return typeof n=="string"||n&&typeof n=="object"}function hl(n){return typeof n=="string"||typeof n=="symbol"}let un=function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n}({});const pl=Symbol("");un.MATCHER_NOT_FOUND+"",un.NAVIGATION_GUARD_REDIRECT+"",un.NAVIGATION_ABORTED+"",un.NAVIGATION_CANCELLED+"",un.NAVIGATION_DUPLICATED+"";function nt(n,e){return K(new Error,{type:n,[pl]:!0},e)}function ce(n,e){return n instanceof Error&&pl in n&&(e==null||!!(n.type&e))}const Hu=["params","query","hash"];function Fu(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of Hu)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function Bu(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<t.length;++s){const i=t[s].replace(al," "),r=i.indexOf("="),o=Tt(r<0?i:i.slice(0,r)),l=r<0?null:Tt(i.slice(r+1));if(o in e){let a=e[o];zn(a)||(a=e[o]=[a]),a.push(l)}else e[o]=l}return e}function Ir(n){let e="";for(let t in n){const s=n[t];if(t=yu(t),s==null){s!==void 0&&(e+=(e.length?"&":"")+t);continue}(zn(s)?s.map(i=>i&&Vs(i)):[s&&Vs(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function Uu(n){const e={};for(const t in n){const s=n[t];s!==void 0&&(e[t]=zn(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const Vu=Symbol(""),Lr=Symbol(""),gs=Symbol(""),gi=Symbol(""),Js=Symbol("");function ot(){let n=[];function e(s){return n.push(s),()=>{const i=n.indexOf(s);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function ye(n,e,t,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,a)=>{const u=p=>{p===!1?a(nt(un.NAVIGATION_ABORTED,{from:t,to:e})):p instanceof Error?a(p):ju(p)?a(nt(un.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(o&&s.enterCallbacks[i]===o&&typeof p=="function"&&o.push(p),l())},c=r(()=>n.call(s&&s.instances[i],e,t,u));let d=Promise.resolve(c);n.length<3&&(d=d.then(u)),d.catch(p=>a(p))})}function As(n,e,t,s,i=r=>r()){const r=[];for(const o of n)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(ol(a)){const u=(a.__vccOpts||a)[e];u&&r.push(ye(u,t,s,o,l,i))}else{let u=a();r.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const d=du(c)?c.default:c;o.mods[l]=c,o.components[l]=d;const p=(d.__vccOpts||d)[e];return p&&ye(p,t,s,o,l,i)()}))}}return r}function zu(n,e){const t=[],s=[],i=[],r=Math.max(e.matched.length,n.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(n.matched.find(u=>Xe(u,l))?s.push(l):t.push(l));const a=n.matched[o];a&&(e.matched.find(u=>Xe(u,a))||i.push(a))}return[t,s,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Gu=()=>location.protocol+"//"+location.host;function gl(n,e){const{pathname:t,search:s,hash:i}=e,r=n.indexOf("#");if(r>-1){let o=i.includes(n.slice(r))?n.slice(r).length:1,l=i.slice(o);return l[0]!=="/"&&(l="/"+l),Ar(l,"")}return Ar(t,n)+s+i}function Ju(n,e,t,s){let i=[],r=[],o=null;const l=({state:p})=>{const g=gl(n,location),y=t.value,w=e.value;let N=0;if(p){if(t.value=g,e.value=p,o&&o===y){o=null;return}N=w?p.position-w.position:0}else s(g);i.forEach(M=>{M(t.value,y,{delta:N,type:zs.pop,direction:N?N>0?Ps.forward:Ps.back:Ps.unknown})})};function a(){o=t.value}function u(p){i.push(p);const g=()=>{const y=i.indexOf(p);y>-1&&i.splice(y,1)};return r.push(g),g}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(K({},p.state,{scroll:ps()}),"")}}function d(){for(const p of r)p();r=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:a,listen:u,destroy:d}}function Mr(n,e,t,s=!1,i=!1){return{back:n,current:e,forward:t,replaced:s,position:window.history.length,scroll:i?ps():null}}function Ku(n){const{history:e,location:t}=window,s={value:gl(n,t)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,u,c){const d=n.indexOf("#"),p=d>-1?(t.host&&document.querySelector("base")?n:n.slice(d))+a:Gu()+n+a;try{e[c?"replaceState":"pushState"](u,"",p),i.value=u}catch(g){console.error(g),t[c?"replace":"assign"](p)}}function o(a,u){r(a,K({},e.state,Mr(i.value.back,a,i.value.forward,!0),u,{position:i.value.position}),!0),s.value=a}function l(a,u){const c=K({},i.value,e.state,{forward:a,scroll:ps()});r(c.current,c,!0),r(a,K({},Mr(s.value,a,null),{position:c.position+1},u),!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function qu(n){n=Au(n);const e=Ku(n),t=Ju(n,e.state,e.location,e.replace);function s(r,o=!0){o||t.pauseListeners(),history.go(r)}const i=K({location:"",base:n,go:s,createHref:Nu.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function Wu(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),qu(n)}let Pe=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n}({});var pn=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n}(pn||{});const Yu={type:Pe.Static,value:""},Qu=/[a-zA-Z0-9_]/;function Zu(n){if(!n)return[[]];if(n==="/")return[[Yu]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(g){throw new Error(`ERR (${t})/"${u}": ${g}`)}let t=pn.Static,s=t;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,u="",c="";function d(){u&&(t===pn.Static?r.push({type:Pe.Static,value:u}):t===pn.Param||t===pn.ParamRegExp||t===pn.ParamRegExpEnd?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),r.push({type:Pe.Param,value:u,regexp:c,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=a}for(;l<n.length;){if(a=n[l++],a==="\\"&&t!==pn.ParamRegExp){s=t,t=pn.EscapeNext;continue}switch(t){case pn.Static:a==="/"?(u&&d(),o()):a===":"?(d(),t=pn.Param):p();break;case pn.EscapeNext:p(),t=s;break;case pn.Param:a==="("?t=pn.ParamRegExp:Qu.test(a)?p():(d(),t=pn.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case pn.ParamRegExp:a===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+a:t=pn.ParamRegExpEnd:c+=a;break;case pn.ParamRegExpEnd:d(),t=pn.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--,c="";break;default:e("Unknown state");break}}return t===pn.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),d(),o(),i}const Dr="[^/]+?",Xu={sensitive:!1,strict:!1,start:!0,end:!0};var Tn=function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n}(Tn||{});const nd=/[.+*?^${}()[\]/\\]/g;function ed(n,e){const t=K({},Xu,e),s=[];let i=t.start?"^":"";const r=[];for(const u of n){const c=u.length?[]:[Tn.Root];t.strict&&!u.length&&(i+="/");for(let d=0;d<u.length;d++){const p=u[d];let g=Tn.Segment+(t.sensitive?Tn.BonusCaseSensitive:0);if(p.type===Pe.Static)d||(i+="/"),i+=p.value.replace(nd,"\\$&"),g+=Tn.Static;else if(p.type===Pe.Param){const{value:y,repeatable:w,optional:N,regexp:M}=p;r.push({name:y,repeatable:w,optional:N});const O=M||Dr;if(O!==Dr){g+=Tn.BonusCustomRegExp;try{`${O}`}catch(A){throw new Error(`Invalid custom RegExp for param "${y}" (${O}): `+A.message)}}let C=w?`((?:${O})(?:/(?:${O}))*)`:`(${O})`;d||(C=N&&u.length<2?`(?:/${C})`:"/"+C),N&&(C+="?"),i+=C,g+=Tn.Dynamic,N&&(g+=Tn.BonusOptional),w&&(g+=Tn.BonusRepeatable),O===".*"&&(g+=Tn.BonusWildcard)}c.push(g)}s.push(c)}if(t.strict&&t.end){const u=s.length-1;s[u][s[u].length-1]+=Tn.BonusStrict}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function l(u){const c=u.match(o),d={};if(!c)return null;for(let p=1;p<c.length;p++){const g=c[p]||"",y=r[p-1];d[y.name]=g&&y.repeatable?g.split("/"):g}return d}function a(u){let c="",d=!1;for(const p of n){(!d||!c.endsWith("/"))&&(c+="/"),d=!1;for(const g of p)if(g.type===Pe.Static)c+=g.value;else if(g.type===Pe.Param){const{value:y,repeatable:w,optional:N}=g,M=y in u?u[y]:"";if(zn(M)&&!w)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const O=zn(M)?M.join("/"):M;if(!O)if(N)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):d=!0);else throw new Error(`Missing required param "${y}"`);c+=O}}return c||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function td(n,e){let t=0;for(;t<n.length&&t<e.length;){const s=e[t]-n[t];if(s)return s;t++}return n.length<e.length?n.length===1&&n[0]===Tn.Static+Tn.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Tn.Static+Tn.Segment?1:-1:0}function $l(n,e){let t=0;const s=n.score,i=e.score;for(;t<s.length&&t<i.length;){const r=td(s[t],i[t]);if(r)return r;t++}if(Math.abs(i.length-s.length)===1){if(jr(s))return 1;if(jr(i))return-1}return i.length-s.length}function jr(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const sd={strict:!1,end:!0,sensitive:!1};function id(n,e,t){const s=ed(Zu(n.path),t),i=K(s,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function rd(n,e){const t=[],s=new Map;e=Pr(sd,e);function i(d){return s.get(d)}function r(d,p,g){const y=!g,w=Fr(d);w.aliasOf=g&&g.record;const N=Pr(e,d),M=[w];if("alias"in d){const A=typeof d.alias=="string"?[d.alias]:d.alias;for(const Y of A)M.push(Fr(K({},w,{components:g?g.record.components:w.components,path:Y,aliasOf:g?g.record:w})))}let O,C;for(const A of M){const{path:Y}=A;if(p&&Y[0]!=="/"){const an=p.record.path,Q=an[an.length-1]==="/"?"":"/";A.path=p.record.path+(Y&&Q+Y)}if(O=id(A,p,N),g?g.alias.push(O):(C=C||O,C!==O&&C.alias.push(O),y&&d.name&&!Br(O)&&o(d.name)),ml(O)&&a(O),w.children){const an=w.children;for(let Q=0;Q<an.length;Q++)r(an[Q],O,g&&g.children[Q])}g=g||O}return C?()=>{o(C)}:bt}function o(d){if(hl(d)){const p=s.get(d);p&&(s.delete(d),t.splice(t.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=t.indexOf(d);p>-1&&(t.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(o),d.alias.forEach(o))}}function l(){return t}function a(d){const p=ad(d,t);t.splice(p,0,d),d.record.name&&!Br(d)&&s.set(d.record.name,d)}function u(d,p){let g,y={},w,N;if("name"in d&&d.name){if(g=s.get(d.name),!g)throw nt(un.MATCHER_NOT_FOUND,{location:d});N=g.record.name,y=K(Hr(p.params,g.keys.filter(C=>!C.optional).concat(g.parent?g.parent.keys.filter(C=>C.optional):[]).map(C=>C.name)),d.params&&Hr(d.params,g.keys.map(C=>C.name))),w=g.stringify(y)}else if(d.path!=null)w=d.path,g=t.find(C=>C.re.test(w)),g&&(y=g.parse(w),N=g.record.name);else{if(g=p.name?s.get(p.name):t.find(C=>C.re.test(p.path)),!g)throw nt(un.MATCHER_NOT_FOUND,{location:d,currentLocation:p});N=g.record.name,y=K({},p.params,d.params),w=g.stringify(y)}const M=[];let O=g;for(;O;)M.unshift(O.record),O=O.parent;return{name:N,path:w,params:y,matched:M,meta:ld(M)}}n.forEach(d=>r(d));function c(){t.length=0,s.clear()}return{addRoute:r,resolve:u,removeRoute:o,clearRoutes:c,getRoutes:l,getRecordMatcher:i}}function Hr(n,e){const t={};for(const s of e)s in n&&(t[s]=n[s]);return t}function Fr(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:od(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function od(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const s in n.components)e[s]=typeof t=="object"?t[s]:t;return e}function Br(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function ld(n){return n.reduce((e,t)=>K(e,t.meta),{})}function ad(n,e){let t=0,s=e.length;for(;t!==s;){const r=t+s>>1;$l(n,e[r])<0?s=r:t=r+1}const i=cd(n);return i&&(s=e.lastIndexOf(i,s-1)),s}function cd(n){let e=n;for(;e=e.parent;)if(ml(e)&&$l(n,e)===0)return e}function ml({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Ur(n){const e=Bn(gs),t=Bn(gi),s=mn(()=>{const a=fn(n.to);return e.resolve(a)}),i=mn(()=>{const{matched:a}=s.value,{length:u}=a,c=a[u-1],d=t.matched;if(!c||!d.length)return-1;const p=d.findIndex(Xe.bind(null,c));if(p>-1)return p;const g=Vr(a[u-2]);return u>1&&Vr(c)===g&&d[d.length-1].path!==g?d.findIndex(Xe.bind(null,a[u-2])):p}),r=mn(()=>i.value>-1&&pd(t.params,s.value.params)),o=mn(()=>i.value>-1&&i.value===t.matched.length-1&&fl(t.params,s.value.params));function l(a={}){if(hd(a)){const u=e[fn(n.replace)?"replace":"push"](fn(n.to)).catch(bt);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:mn(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function ud(n){return n.length===1?n[0]:n}const dd=Ao({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Ur,setup(n,{slots:e}){const t=as(Ur(n)),{options:s}=Bn(gs),i=mn(()=>({[zr(n.activeClass,s.linkActiveClass,"router-link-active")]:t.isActive,[zr(n.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&ud(e.default(t));return n.custom?r:il("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},r)}}}),fd=dd;function hd(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function pd(n,e){for(const t in e){const s=e[t],i=n[t];if(typeof s=="string"){if(s!==i)return!1}else if(!zn(i)||i.length!==s.length||s.some((r,o)=>r.valueOf()!==i[o].valueOf()))return!1}return!0}function Vr(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const zr=(n,e,t)=>n??e??t,gd=Ao({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const s=Bn(Js),i=mn(()=>n.route||s.value),r=Bn(Lr,0),o=mn(()=>{let u=fn(r);const{matched:c}=i.value;let d;for(;(d=c[u])&&!d.components;)u++;return u}),l=mn(()=>i.value.matched[o.value]);Ft(Lr,mn(()=>o.value+1)),Ft(Vu,l),Ft(Js,i);const a=pe();return Ne(()=>[a.value,l.value,n.name],([u,c,d],[p,g,y])=>{c&&(c.instances[d]=u,g&&g!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=g.leaveGuards),c.updateGuards.size||(c.updateGuards=g.updateGuards))),u&&c&&(!g||!Xe(c,g)||!p)&&(c.enterCallbacks[d]||[]).forEach(w=>w(u))},{flush:"post"}),()=>{const u=i.value,c=n.name,d=l.value,p=d&&d.components[c];if(!p)return Gr(t.default,{Component:p,route:u});const g=d.props[c],y=g?g===!0?u.params:typeof g=="function"?g(u):g:null,N=il(p,K({},y,e,{onVnodeUnmounted:M=>{M.component.isUnmounted&&(d.instances[c]=null)},ref:a}));return Gr(t.default,{Component:N,route:u})||N}}});function Gr(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const $d=gd;function md(n){const e=rd(n.routes,n),t=n.parseQuery||Bu,s=n.stringifyQuery||Ir,i=n.history,r=ot(),o=ot(),l=ot(),a=ua(xe);let u=xe;Je&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=Es.bind(null,_=>""+_),d=Es.bind(null,ku),p=Es.bind(null,Tt);function g(_,P){let R,I;return hl(_)?(R=e.getRecordMatcher(_),I=P):I=_,e.addRoute(I,R)}function y(_){const P=e.getRecordMatcher(_);P&&e.removeRoute(P)}function w(){return e.getRoutes().map(_=>_.record)}function N(_){return!!e.getRecordMatcher(_)}function M(_,P){if(P=K({},P||a.value),typeof _=="string"){const $=Os(t,_,P.path),b=e.resolve({path:$.path},P),x=i.createHref($.fullPath);return K($,b,{params:p(b.params),hash:Tt($.hash),redirectedFrom:void 0,href:x})}let R;if(_.path!=null)R=K({},_,{path:Os(t,_.path,P.path).path});else{const $=K({},_.params);for(const b in $)$[b]==null&&delete $[b];R=K({},_,{params:d($)}),P.params=d(P.params)}const I=e.resolve(R,P),z=_.hash||"";I.params=c(p(I.params));const f=Ru(s,K({},_,{hash:vu(z),path:I.path})),h=i.createHref(f);return K({fullPath:f,hash:z,query:s===Ir?Uu(_.query):_.query||{}},I,{redirectedFrom:void 0,href:h})}function O(_){return typeof _=="string"?Os(t,_,a.value.path):K({},_)}function C(_,P){if(u!==_)return nt(un.NAVIGATION_CANCELLED,{from:P,to:_})}function A(_){return Q(_)}function Y(_){return A(K(O(_),{replace:!0}))}function an(_,P){const R=_.matched[_.matched.length-1];if(R&&R.redirect){const{redirect:I}=R;let z=typeof I=="function"?I(_,P):I;return typeof z=="string"&&(z=z.includes("?")||z.includes("#")?z=O(z):{path:z},z.params={}),K({query:_.query,hash:_.hash,params:z.path!=null?{}:_.params},z)}}function Q(_,P){const R=u=M(_),I=a.value,z=_.state,f=_.force,h=_.replace===!0,$=an(R,I);if($)return Q(K(O($),{state:typeof $=="object"?K({},z,$.state):z,force:f,replace:h}),P||R);const b=R;b.redirectedFrom=P;let x;return!f&&Eu(s,I,R)&&(x=nt(un.NAVIGATION_DUPLICATED,{to:b,from:I}),qn(I,I,!0,!1)),(x?Promise.resolve(x):Jn(b,I)).catch(m=>ce(m)?ce(m,un.NAVIGATION_GUARD_REDIRECT)?m:_e(m):J(m,b,I)).then(m=>{if(m){if(ce(m,un.NAVIGATION_GUARD_REDIRECT))return Q(K({replace:h},O(m.to),{state:typeof m.to=="object"?K({},z,m.to.state):z,force:f}),P||b)}else m=ke(b,I,!0,h,z);return be(b,I,m),m})}function Gn(_,P){const R=C(_,P);return R?Promise.reject(R):Promise.resolve()}function me(_){const P=Ue.values().next().value;return P&&typeof P.runWithContext=="function"?P.runWithContext(_):_()}function Jn(_,P){let R;const[I,z,f]=zu(_,P);R=As(I.reverse(),"beforeRouteLeave",_,P);for(const $ of I)$.leaveGuards.forEach(b=>{R.push(ye(b,_,P))});const h=Gn.bind(null,_,P);return R.push(h),Ln(R).then(()=>{R=[];for(const $ of r.list())R.push(ye($,_,P));return R.push(h),Ln(R)}).then(()=>{R=As(z,"beforeRouteUpdate",_,P);for(const $ of z)$.updateGuards.forEach(b=>{R.push(ye(b,_,P))});return R.push(h),Ln(R)}).then(()=>{R=[];for(const $ of f)if($.beforeEnter)if(zn($.beforeEnter))for(const b of $.beforeEnter)R.push(ye(b,_,P));else R.push(ye($.beforeEnter,_,P));return R.push(h),Ln(R)}).then(()=>(_.matched.forEach($=>$.enterCallbacks={}),R=As(f,"beforeRouteEnter",_,P,me),R.push(h),Ln(R))).then(()=>{R=[];for(const $ of o.list())R.push(ye($,_,P));return R.push(h),Ln(R)}).catch($=>ce($,un.NAVIGATION_CANCELLED)?$:Promise.reject($))}function be(_,P,R){l.list().forEach(I=>me(()=>I(_,P,R)))}function ke(_,P,R,I,z){const f=C(_,P);if(f)return f;const h=P===xe,$=Je?history.state:{};R&&(I||h?i.replace(_.fullPath,K({scroll:h&&$&&$.scroll},z)):i.push(_.fullPath,z)),a.value=_,qn(_,P,R,h),_e()}let Kn;function tt(){Kn||(Kn=i.listen((_,P,R)=>{if(!Se.listening)return;const I=M(_),z=an(I,Se.currentRoute.value);if(z){Q(K(z,{replace:!0,force:!0}),I).catch(bt);return}u=I;const f=a.value;Je&&Mu(Nr(f.fullPath,R.delta),ps()),Jn(I,f).catch(h=>ce(h,un.NAVIGATION_ABORTED|un.NAVIGATION_CANCELLED)?h:ce(h,un.NAVIGATION_GUARD_REDIRECT)?(Q(K(O(h.to),{force:!0}),I).then($=>{ce($,un.NAVIGATION_ABORTED|un.NAVIGATION_DUPLICATED)&&!R.delta&&R.type===zs.pop&&i.go(-1,!1)}).catch(bt),Promise.reject()):(R.delta&&i.go(-R.delta,!1),J(h,I,f))).then(h=>{h=h||ke(I,f,!1),h&&(R.delta&&!ce(h,un.NAVIGATION_CANCELLED)?i.go(-R.delta,!1):R.type===zs.pop&&ce(h,un.NAVIGATION_ABORTED|un.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),be(I,f,h)}).catch(bt)}))}let Fe=ot(),$n=ot(),nn;function J(_,P,R){_e(_);const I=$n.list();return I.length?I.forEach(z=>z(_,P,R)):console.error(_),Promise.reject(_)}function le(){return nn&&a.value!==xe?Promise.resolve():new Promise((_,P)=>{Fe.add([_,P])})}function _e(_){return nn||(nn=!_,tt(),Fe.list().forEach(([P,R])=>_?R(_):P()),Fe.reset()),_}function qn(_,P,R,I){const{scrollBehavior:z}=n;if(!Je||!z)return Promise.resolve();const f=!R&&Du(Nr(_.fullPath,0))||(I||!R)&&history.state&&history.state.scroll||null;return Ot().then(()=>z(_,P,f)).then(h=>h&&Lu(h)).catch(h=>J(h,_,P))}const On=_=>i.go(_);let Be;const Ue=new Set,Se={currentRoute:a,listening:!0,addRoute:g,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:N,getRoutes:w,resolve:M,options:n,push:A,replace:Y,go:On,back:()=>On(-1),forward:()=>On(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:$n.add,isReady:le,install(_){_.component("RouterLink",fd),_.component("RouterView",$d),_.config.globalProperties.$router=Se,Object.defineProperty(_.config.globalProperties,"$route",{enumerable:!0,get:()=>fn(a)}),Je&&!Be&&a.value===xe&&(Be=!0,A(i.location).catch(I=>{}));const P={};for(const I in xe)Object.defineProperty(P,I,{get:()=>a.value[I],enumerable:!0});_.provide(gs,Se),_.provide(gi,yo(P)),_.provide(Js,a);const R=_.unmount;Ue.add(_),_.unmount=function(){Ue.delete(_),Ue.size<1&&(u=xe,Kn&&Kn(),Kn=null,a.value=xe,Be=!1,nn=!1),R()}}};function Ln(_){return _.reduce((P,R)=>P.then(()=>me(R)),Promise.resolve())}return Se}function bd(){return Bn(gs)}function et(n){return Bn(gi)}const $i=`# 画布

内置函数 | 共 28 个函数。画布模块提供像素级图像创建、绘制、特效处理。

唯一返回 OOP 句柄的是 \`$创建画布$\`，赋值给变量后通过 \`$变量.方法$\` 调用其余所有画布函数，无需手动传递句柄。

## 画布生命周期

画布的完整生命周期为三个阶段：

1. **创建（Create）**：通过 \`$创建画布$\` 分配内存像素缓冲区，返回句柄。此时可指定宽高和背景色。
2. **绘制（Draw）**：通过绘制函数在缓冲区上绘制图形、文本、图片。所有绘制操作即时生效，顺序决定层叠关系（后绘制覆盖先绘制）。
3. **获取（Get）**：通过 \`$画布获取$\` 将像素缓冲区编码为 PNG 格式输出。获取后画布仍可继续修改，但通常此时即为最终结果。

画布句柄在脚本执行期间持续有效，脚本结束后自动释放。同一脚本可同时持有多个画布句柄。

<a id="canvas-create"></a>

### \`$创建画布$\` — 创建画布

- **格式**：\`$创建画布 [width] [height] [bgColor]$\`
- **参数**：宽度、高度、可选的背景色（默认白色）
- **返回值**：画布句柄（支持 OOP 方法调用）

分配内存像素缓冲区，返回画布句柄。背景色支持预定义颜色名、十六进制、RGB 格式。

\`\`\`
画:$创建画布 800 600$           → 白色背景
$创建画布 800 600 红色$         → 红色背景
$创建画布 300 200 #FFFFFF$     → 十六进制背景色
$创建画布 300 200 255,0,0$     → RGB 背景色
\`\`\`

<a id="canvas-get"></a>

### \`$画布获取$\` — 获取画布输出

- **格式**：\`$画布获取 [format]$\`
- **参数**：可选的输出格式（默认 PNG；支持 \`"png"\`、\`"jpeg"\`、\`"raw"\`）
- **返回值**：编码的像素数据（PNG、JPEG 或原始 RGBA 字节）

将像素缓冲区编码输出。\`"raw"\` 格式返回原始 RGBA 像素缓冲区字节。

\`\`\`
$画.获取$                        → 默认 PNG
$画.获取 jpeg$                   → JPEG 格式
data:$画.获取 raw$               → 原始 RGBA 字节
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

### \`$画笔设置颜色$\` — 设置画笔颜色

- **格式**：\`$画笔设置颜色 [color]$\`
- **参数**：颜色
- **返回值**：无

设置当前画布的画笔颜色，后续绘制操作使用该颜色。

\`\`\`
$画.画笔设置颜色 红色$
$画.画笔设置颜色 #FF6600$
\`\`\`

### \`$画笔获取颜色$\` — 获取画笔颜色

- **格式**：\`$画笔获取颜色$\`
- **参数**：无
- **返回值**：当前颜色（RGBA 格式，如 "255,0,0,255"）

\`\`\`
c:$画.画笔获取颜色$              → "255,0,0,255"
\`\`\`

### \`$画笔大小$\` — 设置画笔大小

- **格式**：\`$画笔大小 [size]$\`
- **参数**：画笔粗细
- **返回值**：无

设置画笔粗细，影响线条宽度和描边厚度。

\`\`\`
$画.画笔大小 3$
\`\`\`

## 基本绘制

### \`$绘制点$\` — 绘制像素点

- **格式**：\`$绘制点 [x] [y] [color]$\`
- **参数**：x 坐标、y 坐标、可选的颜色
- **返回值**：无

算法：直接设置目标坐标 (x, y) 的像素颜色。若坐标超出画布范围则忽略。

\`\`\`
$画.绘制点 100 200$
$画.绘制点 100 200 红色$
\`\`\`

<a id="canvas-line"></a>

### \`$绘制线$\` — 绘制线段

- **格式**：\`$绘制线 [x1] [y1] [x2] [y2] [color]$\`
- **参数**：起点坐标、终点坐标、可选的颜色
- **返回值**：无

算法：使用 Bresenham 直线算法绘制线段，画笔大小影响线宽。

\`\`\`
$画.绘制线 0 0 200 200$
\`\`\`

<a id="canvas-rect"></a>

### \`$绘制方形$\` — 绘制填充矩形

- **格式**：\`$绘制方形 [x] [y] [w] [h] [radius] [color]$\`
- **参数**：左上角 x、左上角 y、宽度、高度、可选的圆角半径、可选的颜色
- **返回值**：无

算法：以 (x, y) 为左上角，填充宽 w × 高 h 的矩形区域。

\`\`\`
$画.绘制方形 50 50 100 80$
$画.绘制方形 50 50 100 80 蓝色$
\`\`\`

### \`$绘制方形描边$\` — 绘制矩形描边

- **格式**：\`$绘制方形描边 [x] [y] [w] [h] [radius] [color]$\`
- **参数**：左上角 x、左上角 y、宽度、高度、可选的圆角半径、可选的颜色
- **返回值**：无

仅绘制矩形轮廓线，不填充内部。画笔大小影响边框厚度。

\`\`\`
$画.绘制方形描边 200 100 150 100$
\`\`\`

## 椭圆与圆形

<a id="canvas-ellipse"></a>

### \`$绘制椭圆$\` — 绘制填充椭圆

- **格式**：\`$绘制椭圆 [x] [y] [w] [h] [color]$\`
- **参数**：外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

算法：使用中点椭圆算法（Midpoint Ellipse Algorithm）绘制填充椭圆。当 w = h 时为圆形。

\`\`\`
$画.绘制椭圆 100 100 200 150$
$画.绘制椭圆 100 100 100 100 红色$
\`\`\`

### \`$绘制椭圆描边$\` — 椭圆描边

- **格式**：\`$绘制椭圆描边 [x] [y] [w] [h] [color]$\`
- **参数**：外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制椭圆轮廓线，不填充内部。画笔大小影响边框厚度。

### \`$绘制圆形$\` — 绘制填充圆形

- **格式**：\`$绘制圆形 [cx] [cy] [radius] [startDeg] [endDeg] [color]$\`
- **参数**：圆心 x、y、半径、起始角度、终止角度、可选的颜色
- **返回值**：无

在指定外接矩形内绘制填充圆形。

### \`$绘制圆形描边$\` — 圆形描边

- **格式**：\`$绘制圆形描边 [cx] [cy] [radius] [startDeg] [endDeg] [color]$\`
- **参数**：圆心 x、y、半径、起始角度、终止角度、可选的颜色
- **返回值**：无

仅绘制圆形轮廓线，不填充内部。

### \`$绘制圆弧$\` — 绘制圆弧

- **格式**：\`$绘制圆弧 [cx] [cy] [radius] [startDeg] [endDeg] [color]$\`
- **参数**：圆心坐标 x、y、半径、起始角度、终止角度、可选的颜色
- **返回值**：无

角度制参数指定起止角度，从 3 点钟方向顺时针绘制。

\`\`\`
$画.绘制圆弧 100 100 50 0 180$
$画.绘制圆弧 100 100 50 0 180 蓝色$
\`\`\`

## 多边形

### \`$绘制多边形$\` — 绘制填充多边形

- **格式**：\`$绘制多边形 [x,y] [x,y] [...] [color]$\`
- **参数**：顶点坐标列表、可选的颜色
- **返回值**：无

算法：使用扫描线填充算法（Scanline Fill）。按顺序连接各顶点形成闭合多边形路径，内部区域均匀填充。

\`\`\`
$画.绘制多边形 100,50 200,50 250,150 150,200 50,150$
$画.绘制多边形 100,50 200,50 150,150 红色$
\`\`\`

### \`$绘制多边形描边$\` — 绘制多边形描边

- **格式**：\`$绘制多边形描边 [x,y] [x,y] [...] [color]$\`
- **参数**：顶点坐标列表、可选的颜色
- **返回值**：无

仅绘制多边形轮廓线，不填充内部。

## 特效绘制

### \`$绘制喷漆$\` — 喷漆特效

- **格式**：\`$绘制喷漆 [x1] [y1] [x2] [y2] [rangeRadius] [density] [color] [pointRadius]$\`
- **参数**：起点、终点、喷洒范围半径（默认 max(画布大小, 3)）、密度 1-100（默认 50）、颜色（默认当前画笔颜色）、点半径（默认 1）
- **返回值**：无

算法：在连接起点和终点的线段上，以指定的喷洒范围和密度，随机散布像素点。模拟喷漆罐的喷洒效果。

### \`$绘制波浪$\` — 波浪线

- **格式**：\`$绘制波浪 [x1] [y1] [x2] [y2] [amplitude] [wavelength] [step]$\`
- **参数**：起点、终点、可选的振幅、波长、步长
- **返回值**：无

算法：沿连接两点之间的线段绘制正弦波曲线，振幅和频率可调。

\`\`\`
$画.绘制波浪 50 200 300 200$
$画.绘制波浪 50 200 300 200 10 30 3$
\`\`\`

### \`$绘制油漆桶$\` — 泛洪填充

- **格式**：\`$绘制油漆桶 [x] [y] [color]$\`
- **参数**：起始坐标、填充颜色
- **返回值**：无

算法：基于广度优先搜索（BFS）的泛洪填充。从指定起点像素开始，将颜色相同且连通的相邻像素全部替换为目标颜色。

\`\`\`
$画.绘制方形描边 100 100 50 50$
$画.绘制油漆桶 120 120 红色$
\`\`\`

### \`$绘制随机点$\` / \`$绘制随机线条$\` — 随机点/线条

- **格式**：\`$绘制随机点 [dotCount]$\` / \`$绘制随机线条 [lineCount]$\`
- **参数**：密度
- **返回值**：无

算法：在画布上随机位置生成点或线条，数量由密度参数控制。用于生成噪点、星空等随机纹理效果。

\`\`\`
$画.绘制随机点 500$
$画.绘制随机线条 100$
\`\`\`

## 文本与图片

<a id="canvas-text"></a>

### \`$绘制文本$\` — 绘制文本

- **格式**：\`$绘制文本 [x] [y] [text] [color] [strokeColor] [strokeWidth]$\`
- **参数**：x 坐标、y 坐标、文本内容、可选的颜色、可选的描边颜色、可选的描边宽度
- **返回值**：无

算法：使用引擎内置的位图字体将文本渲染为像素。支持可选的描边颜色参数。

\`\`\`
$画.绘制文本 50 50 Hello 黑色$
$画.绘制文本 100 100 Rotated 黑色 红色$
\`\`\`

<a id="canvas-image"></a>

### \`$绘制图片$\` — 绘制图片

- **格式**：\`$绘制图片 [srcCanvasOrData] [x] [y] [alpha]$\`
- **参数**：源画布句柄或 Base64 图片数据、左上角 x、y、可选的透明度
- **返回值**：无

算法：将源画布或 Base64 编码的图片数据逐像素复制到目标画布的指定区域。支持 alpha 混合。

\`\`\`
$画.绘制图片 %srcCanvas% 50 50$
$画.绘制图片 %srcCanvas% 50 50 128$
\`\`\`

## 特效处理

### \`$画布旋转$\` — 旋转画布

- **格式**：\`$画布旋转 [degrees] [bgColor]$\`
- **参数**：旋转角度、可选的背景色
- **返回值**：无

算法：按角度对整个画布像素矩阵做仿射变换，空白区域用背景色填充。

\`\`\`
$画.画布旋转 90 白色$
\`\`\`

### \`$画布圆形$\` — 圆角裁剪

- **格式**：\`$画布圆形 [radius] [bgColor]$\`
- **参数**：圆角半径、可选的背景色
- **返回值**：无

将画布裁剪为圆角矩形。

### \`$画布灰度$\` — 灰度化

- **格式**：\`$画布灰度$\`
- **参数**：无
- **返回值**：无

算法：取 RGB 加权平均值（亮度公式）将画布转为灰度。

\`\`\`
$画.画布灰度$
\`\`\`

### \`$画布马赛克$\` — 全图马赛克特效

- **格式**：\`$画布马赛克 [blockSize]$\`
- **参数**：马赛克块大小
- **返回值**：无

算法：对整个画布按指定块大小对像素取均值，产生马赛克效果。

\`\`\`
$画.画布马赛克 16$
\`\`\`

### \`$绘制马赛克$\` — 区域马赛克特效

- **格式**：\`$绘制马赛克 [x] [y] [w] [h]$\`
- **参数**：区域左上角 x、y、宽度、高度
- **返回值**：无

算法：对指定矩形区域按块大小对像素取均值，产生马赛克效果。

\`\`\`
$画.绘制马赛克 50 50 200 150$
\`\`\`

### \`$绘制高斯模糊$\` — 高斯模糊

- **格式**：\`$绘制高斯模糊 [x] [y] [w] [h]$\`
- **参数**：模糊区域左上角 x、y、宽度、高度
- **返回值**：无

算法：对指定矩形区域使用高斯核卷积实现平滑模糊效果。

\`\`\`
$画.绘制高斯模糊 50 50 200 150$
\`\`\`

## OOP 调用

画布模块内置支持 OOP 风格调用，无需通过 \`$new$\` 创建包装对象。直接将 \`$创建画布$\` 的返回值赋给变量，即可通过 \`$变量.方法$\` 链式调用所有画布函数。

### \`$创建画布$\` + OOP 调用

\`\`\`
画:$创建画布 800 600$            ← 创建并存入 %画%
$画.画笔设置颜色 红色$            ← 自动使用 %画% 作为 self
$画.画笔大小 3$
$画.绘制方形 50 50 100 80$
$画.绘制圆形 400 300 150$
$画.绘制线 0 0 800 600 蓝色$
$画.画布灰度$
$画.获取$
\`\`\`

### 完整 OOP 示例

\`\`\`
画:$创建画布 800 600$
$画.画笔设置颜色 蓝色$
$画.绘制圆形 400 300 200$
$画.画笔设置颜色 红色$
$画.绘制方形 350 250 100$
$画.画笔设置颜色 绿色$
$画.绘制椭圆 400 150 80 40$
$画.画笔设置颜色 黑色$
$画.绘制文本 360 520 画布OOP示例$
$画.获取$
\`\`\`

> 如需同时操作多个画布，可使用显式句柄方式：\`$画布获取 %handle%$\`。

## 完整示例

\`\`\`
[函数]画三角形
画:$创建画布 600 400$
$画.画笔大小 3$
$画.画笔设置颜色 红色$
$画.绘制多边形描边 300,50 550,350 50,350$
$画.画笔设置颜色 黄色$
$画.绘制多边形 300,80 500,320 100,320$
$画.绘制文本 230 180 Triangle 黑色$
$画.绘制波浪 50 50 550 50 5 30 3$
$画.获取$
\`\`\`

## 性能提示

画布内存占用 = 宽度 × 高度 × 4 字节（RGBA）。大画布（如 4096×4096）可能占用 64MB 以上内存。建议：

- 普通场景画布控制在 1920×1080 以内
- \`$绘制高斯模糊$\` 和 \`$画布旋转$\` 等全画布操作在大画布上性能开销较大，每帧建议不超过数次
- \`$绘制油漆桶$\` 的 BFS 泛洪填充在连通区域极大时可能触发栈/队列增长，极端情况下可能导致 OOM
- 使用完毕的句柄建议复用（覆盖绘制）而非反复创建新画布，以减少内存分配

> 画布句柄在脚本期间持续有效，脚本结束后自动释放。颜色支持预定义名、十六进制、RGB、RGBA 四种格式。所有绘制操作即时生效，顺序决定层叠关系。图像处理性能受画布尺寸影响较大，建议合理控制画布大小。

[← 加密编码](./crypto)

[文件操作 →](./file)
`,mi=`# 命令行工具

Nebula 引擎提供多种命令行运行模式，支持批处理、交互式 REPL、DAP 调试和自动更新。

## 运行模式

### 批处理模式

\`\`\`bash
nebula <文件.nr>
\`\`\`

加载并执行 \`.nr\` 脚本文件，自动调用 \`[f]main\` 函数并将输出打印到标准输出。

\`\`\`
nebula main.nr
\`\`\`

### 交互 REPL 模式

\`\`\`bash
nebula -i <文件.nr>
\`\`\`

加载脚本后进入交互式 REPL（Read-Eval-Print Loop），逐行输入触发词并实时查看匹配结果。

\`\`\`
nebula -i main.nr
Nebula REPL
>>> hello
你好，世界！
>>> quit
\`\`\`

REPL 模式下：
- 每行输入作为触发词进行主词条匹配
- 匹配结果实时打印
- 空行跳过
- 按 \`Ctrl+C\` 退出

### DAP 调试模式

\`\`\`bash
nebula --debug [文件.nr]
\`\`\`

启动 Debug Adapter Protocol 服务，通过 stdin/stdout 与 VS Code 通信。支持断点调试、单步执行和变量查看。

\`\`\`
nebula --debug main.nr
\`\`\`

文件路径可选：不指定时可以通过 VS Code 的 \`launch.json\` 在运行时传入。

详见 [DAP 调试](./debug)。

## 更新命令

Nebula 内置了自动更新功能，从 GitHub Releases 检测并下载新版本。

### 检测更新

\`\`\`bash
nebula --check-update
nebula -c
\`\`\`

查询 [GitHub Releases](https://github.com/cjxpj/nebula-rs/releases) 的最新版本，与当前版本对比：

- **有新版本**：显示当前版本、最新版本号、更新内容和可下载文件列表
- **已是最新**：显示"已是最新版本"

### 自动更新

\`\`\`bash
nebula --update
nebula -u
\`\`\`

下载最新版本并替换当前程序：

1. 检测 GitHub Releases 是否有新版本
2. 自动匹配当前平台的资源文件（Windows / macOS / Linux）
3. 下载新版本程序
4. 替换旧文件并退出

\`\`\`
nebula --update
正在更新: v0.1.0 -> v0.1.1
  下载中: https://github.com/cjxpj/nebula-rs/releases/download/...
  下载完成 (1234567 字节)
更新已启动，正在退出当前进程...
\`\`\`

**Windows 平台**：通过批处理脚本实现文件替换——旧进程退出后，脚本等待 2 秒，将新文件覆盖旧文件，然后重新启动。

**Linux/macOS 平台**：直接通过 \`rename\` 原子替换文件，然后重启进程。

### 指定更新资源

\`\`\`bash
nebula --update --asset <关键词>
\`\`\`

当同一版本有多个平台的资源文件时，可通过 \`--asset\` 参数指定下载匹配名称的资源。默认自动根据当前操作系统选择。

\`\`\`
nebula --update --asset x86_64
\`\`\`

### 更新选项

| 选项 | 简写 | 说明 |
|------|------|------|
| \`--check-update\` | \`-c\` | 检测新版本，不下载 |
| \`--update\` | \`-u\` | 下载并安装最新版本 |
| \`--asset\` | | 指定下载资源的匹配关键词 |

## 帮助

\`\`\`bash
nebula -h
nebula --help
\`\`\`

显示版本号和用法说明：

\`\`\`
Nebula 脚本引擎 v0.1.1

用法:
  nebula <文件路径>              批处理模式（执行 main 函数）
  nebula -i <文件路径>           交互 REPL 模式

更新命令:
  nebula --check-update [-c]     检测是否有新版本
  nebula --update [-u]           下载并安装最新版本

更新选项:
  --asset <关键词>              指定下载资源的匹配关键词

其他:
  nebula -h, --help              显示帮助
\`\`\`

[← DAP 调试](./debug)
`,bi=`# 判断逻辑

判断逻辑决定了 NR 代码的执行路径。本章涵盖条件分支（\`如果\`/\`if\`）、三种循环结构、中断跳转指令以及标签与 goto 机制。判断逻辑语句依赖于 [表达式与运算符](./expressions) 中定义的比较和逻辑运算来做出决策。

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

NR 提供两种循环结构，分别适用于不同场景：

### 条件循环

\`\`\`
循环>%i%<=100      ← 每轮重新计算条件
第 %i% 行
i+:[%i%+1]         ← 手动递增
<循环

循环>              ← 无限循环（需中断指令退出）
<循环
\`\`\`

\`循环>\` 后跟条件表达式时作为条件循环，每轮重算条件；不跟任何内容时作为无限循环。

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
| \`>终止循环\` / \`>跳出\` | 跳出条件循环 |
| \`>终止遍历\` | 跳出遍历循环 |

### 嵌套循环中的 break/continue 行为

中断指令只作用于**最内层**循环：

\`\`\`
循环>               ← 外层循环
  循环>%flag%==1    ← 内层循环
    >跳出            ← 只跳出内层循环，外层继续
  <循环
<循环
\`\`\`

- \`>跳过\`：跳过当前循环体剩余行，进入下一轮迭代（仅最内层）。
- \`>终止循环\`/\`>跳出\`：完全退出当前条件循环（仅最内层）。
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
`,_i=`# 加密与编码

共 2 个函数。提供 Ed25519 数字签名和字节级十六进制编码。

## 加密编码概述

NR 的加密函数基于 Ed25519 非对称签名算法。签名流程为：

1. **生成种子**：将密钥字符串截取/填充到 32 字节（通过 \`$文本重复$\` + \`@seed[:32]\`）
2. **签名**：\`$ed25519签名$\` 从种子派生密钥对，对消息签名，返回 64 字节原始签名
3. **编码**：\`$hex编码$\` 将原始签名字节转为 128 字符十六进制字符串

典型场景为 QQ 机器人 / Webhook 的验证回调（对标 Go \`handleValidation\`）。

<a id="crypto-ed25519-sign"></a>

### \`$ed25519签名$\` — Ed25519 签名

<dl>
  <dt>格式</dt><dd><code>$ed25519签名 [种子] [消息]$</code></dd>
  <dt>参数</dt><dd>32 字节种子字符串、待签名的消息字符串</dd>
  <dt>返回值</dt><dd>64 字节原始签名（latin-1 编码字符串，每个字符为一个字节值）</dd>
</dl>

从种子派生 Ed25519 签名密钥，对消息进行签名。种子不足 32 字节时以零填充，超长时截取前 32 字节。返回的签名需配合 \`$hex编码$\` 转为可读十六进制。

\`\`\`
sig_bytes:$ed25519签名 %seed% %msg%$
signature:$hex编码 %sig_bytes%$   → 128 字符 hex 字符串
\`\`\`

> **注意**：\`$ed25519签名$\` 返回原始字节字符串，直接输出为乱码。必须通过 \`$hex编码$\` 转为十六进制后才能用于 JSON 响应。

<a id="crypto-hex-encode"></a>

### \`$hex编码$\` — 字节转十六进制

<dl>
  <dt>格式</dt><dd><code>$hex编码 [数据]$</code></dd>
  <dt>参数</dt><dd>原始字节字符串（每个字符视为一个字节值 0–255）</dd>
  <dt>返回值</dt><dd>十六进制字符串，每字节对应两个 hex 字符</dd>
</dl>

将任意字节字符串转为十六进制表示。常用于将 \`$ed25519签名$\` 的原始签名输出转为 JSON 友好的 hex 格式。

\`\`\`
$hex编码 abc$         → "616263"
$hex编码 %sig_bytes%$ → 128 字符 hex 签名
\`\`\`

| 输入 | 输出 | 说明 |
| --- | --- | --- |
| \`"a"\` (0x61) | \`"61"\` | 单字符 |
| \`"abc"\` | \`"616263"\` | a=97=0x61, b=98=0x62, c=99=0x63 |
| \`"\\x00\\xff"\` | \`"00ff"\` | 控制字符也能正确编码 |

---

## 完整示例：Webhook 验证

\`\`\`
[f]handle_validation body_json secret
// 1. 解析 Payload
payload:%body_json%
data:@payload[data]
event_ts:@data[event_ts]
plain_token:@data[plain_token]

// 2. 生成 32 字节种子
seed:%secret%
循环>%长度@seed%<32
seed:$文本重复 %seed% 2$
<循环
seed:@seed[:32]

// 3. 签名
msg:%event_ts%%plain_token%
sig_bytes:$ed25519签名 %seed% %msg%$
signature:$hex编码 %sig_bytes%$

// 4. 返回
$打印返回 {"plain_token":"%plain_token%","signature":"%signature%"}$
\`\`\`

[← 类型转换](./type)

[← 内置函数总览](./flow-output)
`,xi=`# DAP 调试

Nebula 引擎内置了 Debug Adapter Protocol（DAP）服务，支持在 VS Code 中对 \`.nr\` 脚本进行断点调试、单步执行和变量查看。

## 启动调试

\`\`\`bash
nebula --debug [文件路径]
\`\`\`

如果启动时指定了文件路径，引擎会立即加载文件并等待 VS Code 连接。也可以在 VS Code 的 \`launch.json\` 中指定 \`program\` 字段，由调试器在运行时传入文件路径。

## 调试功能

### 断点

在 VS Code 编辑器中点击行号左侧的空白区域即可设置断点。断点命中时执行暂停：

- 断点基于**文件路径 + 行号**定位
- 支持同时设置多个断点
- 每次暂停时，调试控制台中会显示暂停位置的文件名和行号

### 单步执行

| 操作 | 快捷键 (VS Code) | 说明 |
|------|-----------------|------|
| 继续 (Continue) | \`F5\` | 恢复执行直到下一个断点 |
| 单步跳过 (Step Over) | \`F10\` | 执行当前行，不进入函数内部 |
| 单步进入 (Step In) | \`F11\` | 进入函数调用内部 |
| 单步跳出 (Step Out) | \`Shift+F11\` | 执行完当前函数并返回到调用方 |
| 暂停 (Pause) | \`Ctrl+Shift+F5\` | 暂停正在运行的脚本 |

### 调用栈

暂停时，VS Code 的"调用堆栈"面板会显示完整的函数调用链：

- 每层栈帧显示**函数名**、**文件名**和**行号**
- 点击不同栈帧可切换当前查看的作用域

### 变量查看

暂停时，"变量"面板会展示当前作用域链中的所有变量：

- **作用域层级**：按作用域链从局部到全局分层显示
- **嵌套变量**：点号分隔的变量（如 \`obj.field1.field2\`）会自动展开为树形结构
- **值截断**：超过 200 字符的变量值会自动截断，保留前 200 字符

### 输出事件

脚本运行期间，\`$打印$\` 等输出会实时显示在 VS Code 的调试控制台中。

## VS Code 配置

### 安装语法高亮扩展

下载并安装 VS Code 语法高亮扩展（\`.vsix\`）：

1. 下载 [nr-language-0.1.1.vsix](../vscode-nr/nr-language-0.1.1.vsix)
2. VS Code 中按 \`Ctrl+Shift+P\`，输入 "Extensions: Install from VSIX..."
3. 选择下载的 \`.vsix\` 文件

### launch.json 配置

在项目根目录创建 \`.vscode/launch.json\`：

\`\`\`json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "nebula",
      "request": "launch",
      "name": "调试 .nr 脚本",
      "program": "\${workspaceFolder}/主脚本.nr"
    }
  ]
}
\`\`\`

## 架构说明

DAP 调试采用**双线程架构**：

| 线程 | 职责 |
|------|------|
| 主线程 | DAP 消息循环，通过 stdin/stdout 与 VS Code 通信 |
| 执行器线程 | 运行 NR 脚本，通过 mpsc channel 与主线程协调 |

每条语句执行前，执行器线程会检查是否遇到断点或步进命令，决定是否暂停。暂停期间执行器线程阻塞等待恢复命令，主线程持续响应 VS Code 的消息请求（如读取变量、调用栈等）。

### 步进语义

| 命令 | 实现逻辑 |
|------|----------|
| Step Over | 在同深度或更浅的调用层级暂停 |
| Step In | 下一条语句立即暂停。如果当前不是函数调用，行为等同于 Step Over |
| Step Out | 在深度小于起始深度的层级暂停 |

## DAP 协议支持能力

| 能力 | 支持 |
|------|------|
| 断点设置/移除 | 支持 |
| 条件断点 | 不支持 |
| 命中计数断点 | 不支持 |
| Function Breakpoints | 不支持 |
| Logpoints | 不支持 |
| Set Variable | 不支持 |
| Evaluate for Hovers | 不支持 |

[← 内置函数](./flow-output) [命令行工具 →](./cli)
`,vi=`# 词条系统

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
`,yi='# 表达式与运算符\n\n表达式是 NR 中执行计算和逻辑判断的核心机制。本章涵盖数学表达式 `[...]`、比较运算符、逻辑运算符及其优先级规则。理解运算符的优先级、结合性和类型转换行为，对于编写正确的 [条件判断](./control-flow) 和[变量赋值](./variables)至关重要。\n\nNR 的运算符体系分为三个层级：**数学运算符**（在 `[...]` 内使用）、**比较运算符**和**逻辑运算符**。它们在表达式中按固定的优先级顺序求值。\n\n## 数学表达式 `[...]`\n\n```\nresult:[1+2*3]              → "7"\nscore:[%base%*2+10]\n```\n\n### 运算符优先级总表（从高到低）\n\n| 优先级 | 类别 | 运算符 | 结合性 | 说明 |\n|--------|------|--------|--------|------|\n| 1（最高） | 分组 | `()` | — | 括号分组 |\n| 2 | 一元 | `-` | 右→左 | 一元负号 |\n| 3 | 幂 | `^` | 右→左 | 幂运算（`2^3^2 = 2^9 = 512`） |\n| 4 | 乘除取余 | `*` `/` `%` | 左→右 | 乘、除、取余 |\n| 5 | 加减 | `+` `-` | 左→右 | 加、减 |\n| 6 | 位移 | `<<` `>>` | 左→右 | 左移、右移 |\n| 7 | 比较 | `>=` `<=` `>` `<` `==` `!=` `===` `!==` `~=` `in` | — | 比较运算（非数学表达式） |\n| 8 | 逻辑 AND | `&&` `&` | 左→右（短路） | 逻辑与 |\n| 9（最低） | 逻辑 OR | `\\|\\|` `\\|` | 左→右（短路） | 逻辑或 |\n\n**结合性说明**：\n\n- **左结合**（左→右）：`a / b / c` 解释为 `(a / b) / c`\n- **右结合**（右→左）：`- -x` 解释为 `-(-x)`；`2^3^2` 解释为 `2^(3^2)`\n\n注意：比较和逻辑运算符不在 `[...]` 数学表达式中使用——它们出现在条件语句（`如果:`、`循环>`）和 `$if$` 等结构中。数学表达式 `[...]` 内部仅使用优先级 1-6 的运算符。\n\n- 整数运算结果仍为整数，浮点数参与则为浮点\n- 位运算和幂运算强制转整数\n\n### 混合类型运算的边界情况\n\n当数学表达式中混合不同类型的操作数时，结果遵循以下规则：\n\n```\n// 类型提升示例\n[1+2.0]        → 3.0   （Int + Float → Float）\n[3/2]          → 1     （Int 除法，截断）\n[3/2.0]        → 1.5   （Float 除法）\n\n// 边界情况\n[1/0]          → 报错（整数除零）\n[1.0/0.0]      → inf   （浮点除零，返回无穷大）\n[-2147483648]    → 溢出 (i64 边界)\n[0.1+0.2]      → 0.30000000000000004  （IEEE 754 精度问题）\n```\n\n**注意事项：**\n\n- 整数除法 `a / b` 结果为整数（向零截断），不是四舍五入。\n- 幂运算 `a ^ b` 要求 b 为非负整数（包括 0）。\n- 位移运算 `a << b` 中 b 必须是非负整数，且结果类型为整数。\n\n## 比较运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `==` | 字符串相等（宽松，自动类型转换） |\n| `!=` | 字符串不等（宽松） |\n| `===` | 严格相等（比较值和类型） |\n| `!==` | 严格不等（比较值和类型） |\n| `>=` `<=` `>` `<` | 数值比较 |\n| `~=` | 正则匹配 |\n| `in` | 包含判断 |\n\n### 严格比较 `===` / `!==`\n\n- `===` 要求值和**类型**都相同：`1 === 1` 为真，`1 === 1.0`（Int vs Float）为假\n- `!==` 取反：类型不同或值不同时为真\n- 普通 `==` / `!=` 做字符串比较，不区分类型\n\n```\n如果:%a%===1       ← 严格检查整数 1\n整数 1\n如果尾\n\n如果:%a%===1.5     ← 严格检查浮点数 1.5\n浮点数 1.5\n如果尾\n```\n\n### 比较运算边界情况\n\n```\n// 数值比较中的类型问题\n[1>0.5]          → 在条件中为真（自动类型提升比较数值）\n1 == 1.0            → 条件判断中为真（宽松相等，都转为 "1"）\n1 === 1.0           → 条件判断中为假（严格相等，Int vs Float）\n```\n\n- 数值比较（`>` `<` `>=` `<=`）会自动尝试将双方转为数值再比较。一方无法转数值时报错。\n- `==` 宽松相等适合快速判断，但**在需要区分 Int/Float 时请用 `===`**。\n- `~=`（正则匹配）右侧必须是正则模式；`in` 左侧检查是否包含于右侧（字符串子串或数组元素）。\n\n## 逻辑运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `&&` / `&` | 逻辑 AND（短路） |\n| `\\|\\|` / `\\|` | 逻辑 OR（短路） |\n\n单操作数时做真值判断：非空、非 `"0"`、非 `"false"`、非 `"null"` 为真。\n',wi=`# 文件操作

共 23 个函数。包含文件读写、存在性判断、文件后缀与头部、列表遍历、删除、重命名、复制、下载等功能。

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

<a id="file-header"></a>

### \`$文件头部$\` — 获取文件 Content-Type

- **格式**：\`$文件头部 [路径或后缀]$\`
- **参数**：文件路径或文件后缀名（可含点号可不含）
- **返回值**：对应的 Content-Type 字符串；未匹配时返回 "application/octet-stream"

根据文件后缀名返回对应的 HTTP Content-Type 头部。既支持完整文件路径，也支持直接传后缀。

\`\`\`
$文件头部 index.html$             → "text/html; charset=utf-8"
$文件头部 style.css$              → "text/css; charset=utf-8"
$文件头部 logo.png$               → "image/png"
$文件头部 .jpg$                   → "image/jpeg"
$文件头部 unknown.xyz$            → "application/octet-stream"
\`\`\`

支持的后缀类型包括：html、css、js、json、xml、txt、csv、md、yaml、toml、png、jpg、jpeg、gif、svg、ico、webp、bmp、tiff、woff、woff2、ttf、otf、eot、mp3、wav、ogg、flac、mp4、webm、avi、pdf、zip、tar、gz、bz2、7z、rar、doc、docx、xls、xlsx、ppt、pptx、wasm 等。

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

> 所有文件操作函数失败时返回空字符串，建议在关键操作前使用 \`$存在文件$\` 或 \`$存在文件夹$\` 做前置检查。\`$写$\`/\`$读$\` 提供键值数据库抽象，适合缓存和持久化状态。网络下载请参见 [网络访问](./network) 的超时说明。

[← 画布](./canvas)

[返回内置函数 →](./flow-output)
`,ki=`# $回调$ — 正则匹配内部词条

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

### 配合内置函数示例

\`$回调$\` 常用于分发请求到不同的内部处理逻辑。

\`handlers.nr\`

\`\`\`
[内部]cmd_(.*)
任务 %括号1% 执行中
\`\`\`

\`main.nr\`

\`\`\`
#引入=handlers.nr

[函数]main
result:$handlers.回调 cmd_deploy$
$打印 %result%$
\`\`\`

> 回调机制基于正则匹配内部词条，在独立子上下文中执行。`,Si=`# $主回调$ — 匹配主词条

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

### 配合内置函数示例

\`$主回调$\` 在同一上下文中分发，结果可被后续代码复用。

\`routes.nr\`

\`\`\`
天气
今天天气不错

处理
$转整数 %参数1%
\`\`\`

\`main.nr\`

\`\`\`
#引入=routes.nr

[函数]main
$routes.主回调 天气$
msg:$routes.主回调 处理 42$
$打印 %msg%$
\`\`\`

> \`$回调$\` 和 \`$主回调$\` 是 NR 实现逻辑分发和控制反转的核心。`,Ti="# 内置函数\n\nNR 语言所有函数在引擎启动时即注册完毕，始终可用，无需任何导入声明。\n\n| 分类 | 章节 | 函数数量 | 说明 |\n| --- | --- | --- | --- |\n| 流程控制 | [流程控制](./flow-callback) | 2 | `$回调$`、`$主回调$` |\n| 输出 | [输出](./output-print) | 2 | `$打印$`、`$打印返回$` |\n| 服务器 | [服务器](./server) | 3 | `$创建服务器$`、`.静态`、`.启动` |\n| 对象创建 | [对象创建](./object) | 1 | `$new$` |\n| 快捷访问 | [访问](./network) | 3 | `$访问$`、`$访问POST$`、`$访问转发$` |\n| 文件操作 | [文件操作](./file) | 23 | 文件读写、存在判断、列表、删除等 |\n| 画布 | [画布](./canvas) | 28 | 像素级图像绘制 |\n| 字符串 | [字符串](./string) | 26 | 字符串操作 |\n| 数学 | [数学](./math) | 11 | 数学运算 |\n| 访问状态机 | [网络访问](./network) | 12 | HTTP 客户端状态机 |\n| 类型转换 | [类型转换](./type) | 4 | 类型转换 |\n| 加密编码 | [加密编码](./crypto) | 2 | Ed25519 签名、hex 编码 |\n\n## 内置函数\n\n所有函数均为引擎内置，无需 `#引入` 即可直接调用。\n\n[← 模块与引入](./modules) [流程控制 →](./flow-callback)\n",Ri=`# 函数

函数是 NR 语言中封装可复用逻辑的基本单元。本章涵盖函数定义语法、参数传递、可变参数、递归限制以及脚本执行入口（\`[f]main\`）。

- **函数调用表达式**：以 \`$函数名 参数$\` 形式主动调用，在所在位置被返回值替换。
- **声明即执行**：函数体中每行按顺序执行，最后一行的值（或 \`$打印返回$\` 的结果）即为返回值。
- **与词条的区别**：函数通过 \`$...$\` 主动调用，而词条由触发词匹配引擎驱动。
- **\`[f]main\` 执行入口**：文件被加载时自动调用，是脚本执行的起点。

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

[f]main              ← 脚本执行入口，自动调用
$打印 程序启动$

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
- 避免使用与内置函数同名的函数名（如 \`打印\`、\`new\`），会导致覆盖

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

## \`[f]main\` — 执行入口

\`[f]main\` 是 NR 脚本的**执行入口函数**。当 \`.nr\` 文件被直接加载或作为入口文件运行时，引擎会自动查找并执行 \`[f]main\`：

\`\`\`
[f]main
$打印 程序启动$
结果：[%x%+%y%]
\`\`\`

- **自动执行**：文件加载完成后，引擎自动调用 \`[f]main\`
- **返回值**：\`[f]main\` 最后一行的值即为整个脚本的返回值
- **可缺省**：如果文件中没有定义 \`[f]main\`，引擎不会报错，仅执行头部区域
`,Ei=`NR 是 Nebula 词库引擎的领域特定语言（DSL），扩展名为 \`.nr\`，用于定义词条、函数、变量和自动化流程。适用于聊天机器人、互动小说、自动化文本生成等场景。

## 目录

| 标题 | 内容概要 |
|------|----------|
| [词法结构](./lexical) | 源文件结构、注释、转义规则、多行字符串、代码块语法 |
| [类型系统](./types) | 整数/浮点/字符串/布尔/空/对象/函数类型、类型查询 |
| [变量与赋值](./variables) | 作用域、赋值操作符、条件赋值、内置变量、符号截取文本 |
| [表达式与运算符](./expressions) | 数学表达式、比较运算符、严格比较、逻辑运算符 |
| [判断逻辑](./control-flow) | 条件分支、循环、中断与跳转、标签与 goto |
| [词条系统](./entries) | 普通词条、内部词条、类内部词条 |
| [函数](./functions) | 定义语法、命名/可变参数、默认参数值 |
| [JSON 数据处理](./json) | 内联 JSON、对象/数组 DSL、导航取值写入、数组追加 |
| [面向对象编程](./oop) | 类定义、实例变量、指针池句柄、对象创建与方法调用 |
| [加密编码](./crypto) | Ed25519 签名、字节级十六进制编码 |
| [模块与引入](./modules) | 文件/目录引入、星号引入、跨包调用、热更新 |
| [内置函数](./flow-output) | 流程控制、输出、服务器、加密、字符串、数学、网络、类型、画布、文件操作 |
| [DAP 调试](./debug) | VS Code 断点调试、单步执行、调用栈、变量查看 |
| [命令行工具](./cli) | 批处理、交互 REPL、自动更新、帮助 |

## 快速开始

一个 \`.nr\` 文件由**头部区域**和**词条区域**组成，两者用空行分隔：

\`\`\`
头部变量/引入代码

                            ← 空行分隔
[f]main                     ← 可选的脚本执行入口
$打印 程序启动$

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

- **VS Code 语法高亮扩展**：为 \`.nr\` 文件提供语法高亮、注释切换、括号匹配、断点调试等支持。<a href="../vscode-nr/nr-language-0.1.1.vsix">点击下载 .vsix</a>

安装方法：VS Code 中按 \`Ctrl+Shift+P\`，输入 "Extensions: Install from VSIX..."，选择下载的文件即可。也可以将 \`vscode-nr\` 文件夹复制到 \`%USERPROFILE%\\.vscode\\extensions\\\` 目录下。
`,Oi=`# JSON 数据处理

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
> 关于 JSON 数组操作的更多内容，参见 [类型转换](./type)

[← 函数](./functions) [面向对象编程 →](./oop)
`,Pi=`# 词法结构

本章介绍 NR 语言的基础词法规则，涵盖源文件结构、注释、转义、字符串语法等核心概念。词法结构决定了你的代码如何被解析器"阅读"，理解这些规则是写出正确 NR 代码的第一步。后续章节中涉及的[类型系统](./types)、[变量赋值](./variables)等均在此基础上工作。

NR 源文件要求使用 **UTF-8 编码**。解析器在处理文件时会 trim 行首尾空白，但保留缩进结构。一个合法的 \`.nr\` 文件至少包含：头部区域的可选初始化代码、一个空行分隔符，以及至少一个词条或函数定义。

## 源文件结构

一个 \`.nr\` 文件由**头部区域**和**词条区域**组成，两者用空行分隔：

\`\`\`
头部变量/引入代码

                            ← 空行分隔
[f]main                     ← 可选的脚本执行入口
$打印 程序启动$

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

> **自动执行函数**：文件被引入时，引擎会自动查找并执行 \`[f]main\`。详见 [函数](./functions)。

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
`,Ai=`# 数学

共 11 个函数。提供绝对值、最值、幂运算、求和、取整、随机数等基础数学运算。

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

> 所有数学函数均基于 f64 运算，传入非数字参数时行为未定义。建议与 [类型转换](./type) 的转换函数配合使用，确保输入为有效数字。

[← 字符串](./string)

[网络访问 →](./network)
`,Ci=`# 模块与引入

NR 的模块系统允许将一个 \`.nr\` 文件（或整个目录）作为**独立包**引入。本章涵盖引入语法、模块解析算法、热重载、跨包变量访问以及内置函数。

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
#引入=other.nr              ← 文件引入（自动以文件名作为包名）
#引入=folder/               ← 目录引入（自动以目录名作为包名）
myPkg:#引入=other.nr        ← 显式指定包名（别名引入）
#引入*=other.nr             ← 星号引入（注入全部函数/词条到当前作用域）
\`\`\`

### 使用引入的包

引入后通过 \`$包名.成员$\` 访问：

\`\`\`
$other.方法$               ← 调用包内函数
$other.主回调$             ← 匹配包内词条
%other.变量%               ← 读取包头部变量
\`\`\`

- 包内头部区域的可执行代码（如 \`$打印 ok$\`）在加载时自动执行
- 运行时支持热重载：每次 \`a:#引入=test\` 调用都会重新加载并执行头部代码
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
4. 每行头部代码（变量赋值和可执行语句）按顺序执行

\`\`\`
// 目录结构
plugins/
  a.nr        ← 头部变量 .ver:1
  b.nr        ← 头部变量 .type:http

// 引入
#引入=plugins/

// 访问
%plugins.ver%            ← 读取 a.nr 中的变量
$plugins.handle$         ← 调用 b.nr 中的函数
\`\`\`

### 引入解析顺序示意

\`\`\`
#引入=utils              // 1. 先找 utils.nr（文件）
                          // 2. 再找 utils/（目录）
                          // 3. 全局路径查找

#引入=lib/utils.nr       // 相对路径，从当前文件目录出发
\`\`\`

### 星号引入 \`#引入*=\`

使用 \`#引入*=路径\` 将包中所有函数、词条和变量**注入到当前作用域**，无需通过 \`$包名.成员$\` 即可直接调用：

\`\`\`
#引入*=utils.nr

[函数]main
$工具函数$               ← 直接调用 utils.nr 中的函数，无需 utils. 前缀
\`\`\`

- 注入的函数会自动关联源包的头部变量，调用时引擎自动注入源包的上下文
- 适合工具函数库场景，减少重复的包名前缀
- 注意避免命名冲突：星号引入的函数名会覆盖当前作用域中的同名函数

### 批量引入

多个路径可用逗号分隔，一次引入多个模块/文件：

\`\`\`
#引入=a.nr,b.nr,plugins/             // 批量引入文件和目录
#引入*=utils.nr,helpers.nr           // 批量星号引入
\`\`\`

## 热重载行为

NR 引擎内置了**热重载（Hot Reload）**机制：

- **触发时机**：运行时 \`a:#引入=path\` 每次调用都会重新解析并执行头部代码
- **重载范围**：仅重载被引用的文件；目录引入时，所有子文件重新合并
- **状态覆盖**：头部变量被新值覆盖，头部可执行代码重新执行
- **重复引入**：同一包多次引入静默覆盖，不报错

## 跨包变量访问

通过 \`%包名.变量名%\` 可以读取引入包头部区域定义的变量：

\`\`\`
// config.nr（被引入的包）
version:2.0
debug:true
app_name:NebulaApp

// main.nr（引入方）
#引入=config.nr

[函数]show
版本：%config.version%
调试模式：%config.debug%
应用名：%config.app_name%
\`\`\`

- 只能读取**头部变量**（空行前定义的变量）
- 跨包**不能直接写入**对方变量；修改需通过调用包内函数间接完成
- 包的变量作用域完全独立，不会与引入方的同名变量冲突

## 内置函数

所有函数均为引擎内置，始终可用，无需 \`#引入\` 即可直接调用。

\`\`\`
[函数]main
$大写 hello$
$长度 Hello World$
$绝对值 -5$
\`\`\`

详见[内置函数](./flow-output)。

## 内置函数一览

| 分类 | 典型方法 |
| --- | --- |
| 字符串 | \`$大写$\`、\`$长度$\`、\`$文本包含$\` |
| 数学 | \`$绝对值$\`、\`$最大值$\`、\`$取整$\` |
| 类型转换 | \`$转文本$\`、\`$转数字$\`、\`$转整数$\` |
| 访问状态机 | HTTP 请求相关 |
| 画布 | 图形绘制相关 |

> **注意事项**
> - **循环依赖**：如果 A 引入 B、B 又引入 A，引擎会检测并报错。设计模块结构时避免双向引入
> - **包名冲突**：别名引入（\`别名:#引入=...\`）在同一文件中必须唯一；自动命名引入（\`#引入=path\`）重复时幂等跳过
> - **初始化顺序**：多个引入的头部代码按**定义顺序**依次执行
> - **包内词条隔离**：被引入包的词条不会参与当前文件的**主触发匹配**——只能通过 \`$包名.主回调$\` 显式调用
> - 关于词条系统和函数的基础概念，参见[第 6 章 词条系统](./entries)和[第 7 章 函数](./functions)

[← 面向对象编程](./oop) [内置函数 →](./flow-output)
`,Ni=`# 网络访问

NR 提供 HTTP 客户端调用：**快捷函数**（\`$访问$\`、\`$访问POST$\`、\`$访问转发$\`）和 **状态机 API**（精细控制请求的每个阶段）。

## 网络访问概述

两种调用方式对比：

- **快捷函数**：\`$访问$\`、\`$访问POST$\`、\`$访问转发$\` — 无需导入，一行完成的简化调用。适合简单场景。
- **状态机 API**：精细控制请求的每个阶段——创建、切换方法、设置头部/超时、发送、读取结果。适合需要定制请求细节的复杂场景。

## 状态机 API

所有函数均为引擎内置，无需导入。状态机 API 提供**OOP 风格**的 HTTP 客户端：通过 \`$创建访问 url$\` 创建请求对象，随后通过 OOP 方法调用逐步配置并发送。

**状态机流程**：创建访问 → 切换GET/POST → 设置头部 → 设置超时 → 发送 → 内容

### 状态机生命周期

\`$创建访问$\` 返回一个 OOP 请求对象。对象方法的调用形式为 \`$变量.方法$\`，对象自动维护内部状态。状态机转移路径如下：

| 阶段 | 操作 | 说明 |
| --- | --- | --- |
| 1. 创建 | \`$创建访问 url$\` | 初始化请求对象，默认 GET 方法，返回 \`0x\` 指针句柄 |
| 2. 配置方法 | \`$对象.切换GET$\` / \`$对象.切换POST$\` / \`$对象.POST$\` / \`$对象.POST文件$\` | 设置 HTTP 方法和请求体 |
| 3. 配置选项 | \`$对象.设置头部$\` / \`$对象.设置超时$\` / \`$对象.启用跳转$\` / \`$对象.禁用跳转$\` | 设置头部、超时、重定向策略 |
| 4. 执行 | \`$对象.发送$\` | 实际发起网络请求（阻塞） |
| 5. 读取 | \`$对象.内容$\` / \`$对象.全部内容$\` | 获取响应体 |

同一请求对象只能发送一次，发送后不可修改配置。

<a id="net-create"></a>

### \`$创建访问$\` — 创建请求对象

- **格式**：\`$创建访问 [url]$\`
- **参数**：目标 URL
- **返回值**：\`0x\` 指针句柄（请求对象）

初始化 HTTP 请求状态机，默认 GET 方法。请求对象存储在引擎统一指针池中，通过引用计数管理生命周期。

\`\`\`
net:$创建访问 https://httpbin.org/post$
\`\`\`

<a id="net-switch-get"></a>

### \`$对象.切换GET$\` — 切换到 GET 方法

- **格式**：\`$对象.切换GET$\`
- **参数**：无
- **返回值**：无

将请求方法设置为 GET。

\`\`\`
$net.切换GET$
\`\`\`

<a id="net-switch-post"></a>

### \`$对象.切换POST$\` — 切换到 POST 方法

- **格式**：\`$对象.切换POST [body]$\`
- **参数**：请求体（可选）
- **返回值**：无

将请求方法设置为 POST 并可传入请求体。

\`\`\`
$net.切换POST {"key":"value"}$
\`\`\`

<a id="net-post"></a>

### \`$对象.POST$\` — 设置 POST 请求体

- **格式**：\`$对象.POST [body]$\`
- **参数**：请求体
- **返回值**：无

在已切换到 POST 的状态机上设置请求体。

\`\`\`
$net.POST {"name":"Alice","age":25}$
\`\`\`

<a id="net-post-file"></a>

### \`$对象.POST文件$\` — 设置文件上传

- **格式**：\`$对象.POST文件 [field] [data] [filename]$\`
- **参数**：表单字段名、文件数据、文件名
- **返回值**：无

通过 multipart/form-data 上传文件。

\`\`\`
$net.POST文件 file %file_content% upload.txt$
\`\`\`

### \`$对象.启用跳转$\` / \`$对象.禁用跳转$\` — 控制重定向

- **格式**：\`$对象.启用跳转$\` / \`$对象.禁用跳转$\`
- **参数**：无
- **返回值**：无

启用或禁用 HTTP 重定向跟随。

\`\`\`
$net.启用跳转$
$net.禁用跳转$
\`\`\`

<a id="net-set-header"></a>

### \`$对象.设置头部$\` — 设置请求头

- **格式**：\`$对象.设置头部 [json_headers]$\`
- **参数**：JSON 格式的请求头键值对
- **返回值**：无

以 JSON 对象格式设置 HTTP 请求头。

\`\`\`
$net.设置头部 {"Authorization":"Bearer xxxx","Content-Type":"application/json"}$
\`\`\`

<a id="net-set-timeout"></a>

### \`$对象.设置超时$\` — 设置超时

- **格式**：\`$对象.设置超时 [seconds]$\`
- **参数**：超时秒数
- **返回值**：无

设置请求超时时间（秒）。默认无超时限制。

\`\`\`
$net.设置超时 30$
\`\`\`

<a id="net-send"></a>

### \`$对象.发送$\` — 发送请求

- **格式**：\`$对象.发送$\`
- **参数**：无
- **返回值**：无

实际发起网络请求（阻塞）。发送后不可修改配置。

\`\`\`
$net.发送$
\`\`\`

<a id="net-content-all"></a>

### \`$对象.全部内容$\` — 读取全部响应内容

- **格式**：\`$对象.全部内容$\`
- **参数**：无
- **返回值**：完整响应 JSON（含状态码、头部、data 字段）

> 注意：\`data\` 字段中的敏感数据（如 HTML 页面、二进制内容等）会被自动替换为 \`"已屏蔽"\`。需要原始响应体请使用 \`$对象.内容$\`。

\`\`\`
$net.全部内容$
\`\`\`

<a id="net-content"></a>

### \`$对象.内容$\` — 读取响应内容

- **格式**：\`$对象.内容$\`
- **参数**：无
- **返回值**：响应体内容

\`\`\`
body:$net.内容$
\`\`\`

### 状态机完整示例

\`\`\`
[函数]post_json
net:$创建访问 https://httpbin.org/post$
$net.切换POST$
$net.设置头部 {"Content-Type":"application/json"}$
$net.POST {"name":"Alice"}$
$net.设置超时 10$
$net.发送$
result:$net.内容$
\`\`\`

### 兼容显式句柄模式

如需并行管理多个请求，可使用传统句柄模式：

\`\`\`
req1:$创建访问 https://httpbin.org/get$
req2:$创建访问 https://httpbin.org/post$
$切换POST %req2%$
$设置头部 %req2% {"Content-Type":"application/json"}$
$发送 %req1%$
$发送 %req2%$
\`\`\`

显式传句柄时参数位置与传统 API 一致，\`切换POST\`、\`设置头部\` 等函数会检测首参是否为句柄自动适配。

## 访问

无需导入，始终可用 | 共 3 个函数

### User-Agent 说明

快捷函数（\`$访问$\`、\`$访问POST$\`）默认发送 \`User-Agent: Nebula-Client/1.0\` 请求头。如果目标服务器要求特定 User-Agent，可通过 headers 参数覆盖：

\`\`\`
$访问 https://httpbin.org/headers {"User-Agent":"MyApp/2.0"}$
\`\`\`

状态机模式不自动添加 User-Agent，需通过 \`$对象.设置头部$\` 手动指定。

### 超时与错误处理

\`$访问$\` 和 \`$访问POST$\` 默认超时为 15 秒，超时后返回空字符串。状态机模式默认无超时限制，需通过 \`$对象.设置超时$\` 显式设置。

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

<a id="net-访问转发"></a>

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

[← 数学](./math)

[类型转换 →](./type)
`,Ii=`# 对象创建

内置函数 | 共 1 个函数。\`$new$\` 创建自定义对象实例。

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
  <dt>返回值</dt><dd>对象句柄（<code>0x</code> 开头的十六进制指针）；构造函数不存在时返回空字符串</dd>
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
[函数:Counter]初始化
.count:0

[f:Counter]加一
.count+:%参数1%+1

[函数:Counter]获取
当前计数：%.count%

[函数]main
c:$new Counter$
$c.加一$
$c.加一$
现在计数：$c.获取$      ← 输出 "现在计数：2"
\`\`\`

- \`[函数:Counter]初始化\`：构造函数，设置实例变量 \`.count:0\`
- \`[f:Counter]加一\`：方法，更新实例变量 \`.count\`
- \`$c.方法$\`：OOP 点号调用，\`c\` 为对象变量，\`加一\` 为方法名

详见 [面向对象编程](./oop)。

> \`$new$\` 构造函数查找优先级：类名.new → 类名.初始化。详见[面向对象编程](./oop)。

[← 服务器](./server) [字符串操作 →](./string)
`,Li='# 面向对象编程\n\nNR 的 OOP 系统建立在词条引擎之上的上下文隔离与状态持久化机制。本章涵盖类定义、实例变量、对象创建与方法调用、自我调用、构造函数输出以及与传统 OOP 的对比。\n\n<dl>\n  <dt>类</dt>\n  <dd>一组绑定到特定命名空间的方法集合，使用 <code class="nr-sig">[函数:类名]</code> 语法定义。</dd>\n  <dt>实例变量</dt>\n  <dd>以 <code class="nr-sig">.字段</code> 前缀命名的变量，在对象方法调用间自动持久化。</dd>\n  <dt>对象</dt>\n  <dd>通过 <code class="nr-sig">$new ClassName$</code> 创建，每个实例维护独立的变量作用域。</dd>\n</dl>\n\n## 类定义\n\n使用 `[函数:类名]`、`[f:类名]` 或 `[F:类名]` 语法：\n\n```\n[函数:Counter]初始化\n$打印 初始化$\n.count:0\n\n[f:Counter]add num     ← [f:类名] 是 [函数:类名] 的简写\n.count+:%num%\n\n[函数:Counter]get\n当前计数：%.count%\n```\n\n- 内部触发词为 `类名.方法名`\n- 构造函数查找顺序：`类名.new` → `类名.初始化`\n\n### 类生命周期\n\n一个 NR 对象的完整生命周期如下：\n\n1. **创建**：通过 `$new ClassName args$` 创建对象实例，引擎查找并执行构造函数\n2. **初始化**：构造函数中设置初始实例变量（`.field:value`），构造函数返回类名字符串给调用者\n3. **使用**：通过 `$对象名.方法 参数$` 调用方法；每次方法调用前从存储中加载实例变量，执行后自动写回\n4. **消亡**：当对象变量被覆盖或超出作用域时，实例数据随之释放\n\n**存储机制**：实例变量存储在引擎内部的键值存储中，键的格式为 `对象名.字段名`。这意味着不同对象的 `.count` 完全独立。\n\n## 实例变量 `.字段`\n\n以 `.` 开头的变量是**实例变量**，在同一个对象的多次方法调用之间持久化：\n\n```\n[f:Counter]add num\n.count+:%num%           ← .count 跨调用保持\n```\n\n- 方法调用前从主上下文加载（`对象名.字段`），执行后自动写回\n- 不同对象的实例变量相互独立\n\n## 创建对象与调用方法\n\n```\nobj:$new Counter$\nobj:$new Counter 参数$\n\n$obj.add 5$             ← 调用方法\n$obj.get$               ← 无参调用\n```\n\n方法返回值通过 `$...$` 替换到调用处。\n\n## 自我调用 `$.method$`\n\n在类方法内部，使用 `$.方法名` 调用同一对象的其他方法：\n\n```\n[函数:Counter]get\n$.add 1$                ← 等价于 $Counter.add 1$\n当前计数：%.count%\n```\n\n- `$.method$` 通过 `self` 变量自动解析为 `ClassName.method`\n- 只能在类方法内部使用（`self` 变量不为空时生效）\n- 支持传参：`$.method arg1 arg2$`\n\n## 实例句柄\n\n`$new$` 返回的是一个以 `0x` 开头的十六进制指针句柄（如 `0x1a2b3c4d`），存储在引擎的统一指针池中。每个实例通过引用计数管理生命周期——赋值给变量时引用计数加一，变量被覆盖或超出作用域时引用计数减一，归零时自动释放。\n\n```\nc:$new Counter$\n$打印 %c%$        # → 0x1a2b3c4d\n```\n\n句柄对用户透明，无需直接操作——只要持有句柄的变量未丢失，即可通过 `$变量.方法$` 正常调用。\n\n## 构造函数与输出\n\n```\n[函数:Counter]初始化\n.count:0\na                       ← 裸文本直接打印到终端\n$打印 初始化$            ← $打印$ 输出到终端\n```\n\n- 构造函数中的裸文本直接打印到终端，不走管道输出\n- `$打印$` 和 `$打印返回$` 同样输出到终端\n- 构造函数返回 `类名` 字符串（可赋给变量）\n\n## NR OOP vs 传统 OOP 对比\n\n| 概念 | NR OOP | 传统 OOP（Java/Python） |\n| --- | --- | --- |\n| 类定义 | `[函数:类名]方法名` 分散定义 | `class { }` 集中定义 |\n| 继承 | 不支持类继承 | `extends` / 接口实现 |\n| 实例变量 | `.字段`，引擎自动持久化 | `this.field`，内存中维护 |\n| 构造函数 | `类名.new` 或 `类名.初始化` | `constructor()` / `__init__()` |\n| 方法调用 | `$对象.方法 args$` | `obj.method(args)` |\n| 自我调用 | `$.method$` 语法糖 | `this.method()` |\n| 访问控制 | 无 public/private，全公开 | public/protected/private |\n| 多态 | 不支持 | 虚函数/接口 |\n| 适用场景 | 对话状态、简单实体、计数器 | 通用软件工程 |\n\n> **注意事项**\n> - **无继承**：NR 不支持类继承。如需共享行为，使用[普通函数](./functions)或[模块引入](./modules)替代\n> - **实例变量命名**：`.字段` 命名空间与普通变量独立，`.count` 和 `count` 是两个不同的变量\n> - **构造函数返回值**：构造函数返回的是**类名字符串**（如 `"Counter"`），而非对象引用。真正的"对象标识"是赋值的变量名\n> - **方法中修改实例变量**：在类方法中修改 `.字段` 后，引擎**在执行完毕后自动写回**——不需要显式的 "save" 操作\n> 关于对象创建 `$new$` 的更多用法，参见[对象创建](./object)\n\n[← JSON 数据处理](./json) [模块与引入 →](./modules)\n',Mi=`# $打印$ / $打印返回$ — 输出内容

内置函数 | 共 2 个（\`$打印$\`、\`$打印返回$\`）。两者都向结果流追加内容，区别在于是否同时产生表达式返回值。

## \`$打印$\` — 仅输出

<dl>
  <dt>格式</dt><dd><code>$打印 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>空字符串（不产生表达式返回值）</dd>
</dl>

输出到结果流，在 \`$...$\` 表达式中替换为空字符串。适用于纯日志输出。

## \`$打印返回$\` — 输出并返回

<dl>
  <dt>格式</dt><dd><code>$打印返回 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>内容本身（同时写入结果流）</dd>
</dl>

同时输出和返回值，适用于需要输出日志的同时将数据传递给外部调用者（如 \`$var:函数$\` 赋值）。

## 对比示例

\`\`\`
; 仅日志
$打印 调试信息：%x%$

; 在函数中返回数据
[函数]get_name
$打印返回 %name%$

result:$调用 get_name$     ; result 获得函数返回值
\`\`\`

| 函数 | 写入结果流 | 表达式返回值 | 适用场景 |
| --- | --- | --- | --- |
| \`$打印 你好$\` | 你好 | 空字符串 | 纯日志输出 |
| \`$打印返回 你好$\` | 你好 | 你好 | 输出日志同时传递数据 |
`,Di=`# 服务器

内置函数 | 共 3 个（\`$创建服务器$\`、\`.静态\`、\`.启动\`）。支持 OOP 风格启动 TCP/HTTP 双栈服务器，可配置静态文件服务。

## OOP 风格

\`\`\`
$s:创建服务器$                  # 创建服务器对象，返回 0x 指针句柄
$s.静态 本地目录 网络路径$       # 配置静态文件服务（网络路径可留空=根路径）
$s.启动 端口 处理函数$           # 启动服务器开始监听
\`\`\`

### \`$创建服务器$\` — 创建服务器对象

<dl>
  <dt>格式</dt><dd><code>$var:创建服务器$</code></dd>
  <dt>参数</dt><dd>无</dd>
  <dt>返回值</dt><dd>服务器实例句柄（<code>0x</code> 开头十六进制指针），存入指定变量</dd>
</dl>

创建一个服务器 OOP 实例，默认端口 8080，未配置静态目录和处理函数。实例存储在引擎统一的指针池中，通过引用计数管理生命周期。

\`\`\`
$s:创建服务器$
$打印 服务器句柄：%s%$     # → 服务器句柄：0x1a2b3c4d
\`\`\`

### \`.静态\` — 配置静态文件目录

<dl>
  <dt>格式</dt><dd><code>$s.静态 本地目录 [网络路径]$</code></dd>
  <dt>参数</dt><dd>本地文件目录路径、可选的网络 URL 路径（留空 = 根路径 <code>/</code>）</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

配置后，服务器启动时会自动处理匹配的静态文件请求：

- 网络路径为空时，所有 URL 路径映射到本地目录（如 \`/style.css\` → \`本地目录/style.css\`）
- 指定网络路径时，仅匹配该前缀的 URL（如 \`/assets/style.css\` → \`本地目录/style.css\`）
- 自动识别 MIME 类型（HTML、CSS、JS、图片、字体等）
- 目录请求自动查找 \`index.html\`
- 文件不存在时，尝试返回 \`404.html\`（HTTP 404 状态码）
- 无 \`404.html\` 时回退到路由处理

\`\`\`
$s.静态 public$             # 本地 public/ → 网络根路径 /
$s.静态 public assets$      # 本地 public/ → 网络路径 /assets/
\`\`\`

### \`.启动\` — 启动服务器

<dl>
  <dt>格式</dt><dd><code>$s.启动 [端口] [处理函数]$</code></dd>
  <dt>参数</dt><dd>监听端口（默认 8080）、可选的处理函数名或变量</dd>
  <dt>返回值</dt><dd>无（阻塞运行，持续监听）</dd>
</dl>

启动服务器监听 \`0.0.0.0:端口\`。传入的参数会覆盖创建时的默认配置。

\`\`\`
$s.启动 8080 %func@路由%$     # 端口 8080，路由处理函数
$s.启动 3000$                 # 端口 3000，无处理函数
\`\`\`

### OOP 完整示例

\`\`\`
[函数]main
$s:创建服务器$
$s.静态 数据/静态$
$s.启动 8080 route$

[函数]route
$如果 %_路径% == /api/hello
  你好，[%_GET%、"name"]

$如果 %_路径% == /api/json
  $_状态码%:201$
  {"status":"ok","data":[%_POST%]}
\`\`\`

## 静态文件服务

通过 OOP 风格的 \`.静态\` 方法配置静态文件目录。服务器收到 HTTP 请求时，优先检查请求路径是否匹配网络路径：

- 网络路径为空 → 所有 URL 映射到本地目录（如 \`/style.css\` → \`public/style.css\`）
- 指定网络路径 → 仅匹配该前缀的 URL（如 \`/assets/js/app.js\` → \`public/js/app.js\`）
- 目录请求（如 \`/\` 或 \`/assets/\`）→ 自动查找 \`index.html\`
- 文件不存在 → 尝试返回 \`404.html\`（HTTP 404），无则交由路由处理

### 路由判断示例

以 \`$s.静态 public assets$\` 为例（网络路径 = \`assets\`）：

| 请求 URL | 匹配结果 | 文件路径 | 说明 |
| --- | --- | --- | --- |
| \`/assets/style.css\` | 匹配 | \`public/style.css\` | 文件存在则返回 |
| \`/assets/js/app.js\` | 匹配 | \`public/js/app.js\` | 子目录正常映射 |
| \`/assets\` | 匹配 | \`public/index.html\` | 精确匹配 → 自动查找 index |
| \`/assets/\` | 匹配 | \`public/index.html\` | 目录请求 → 自动查找 index |
| \`/assets/404.html\` | 匹配 | \`public/404.html\` | 不存在 → 触发 404.html |
| \`/assetssomething/x.js\` | 不匹配 | — | 前缀边界检查，交由路由 |
| \`/api/data\` | 不匹配 | — | 非静态前缀，交由路由 |

以 \`$s.静态 public$\` 为例（网络路径 = 空，根路径）：

| 请求 URL | 匹配结果 | 文件路径 | 说明 |
| --- | --- | --- | --- |
| \`/style.css\` | 匹配 | \`public/style.css\` | 根路径：所有 URL 都匹配 |
| \`/\` | 匹配 | \`public/index.html\` | 目录请求 → 自动查找 index |
| \`/api/data\` | 匹配 | \`public/api/data\` | 不存在 → 404.html → 路由 |

### 支持的 MIME 类型

| 扩展名 | Content-Type |
| --- | --- |
| \`.html\` \`.htm\` | \`text/html; charset=utf-8\` |
| \`.css\` | \`text/css; charset=utf-8\` |
| \`.js\` | \`application/javascript; charset=utf-8\` |
| \`.json\` | \`application/json; charset=utf-8\` |
| \`.png\` | \`image/png\` |
| \`.jpg\` \`.jpeg\` | \`image/jpeg\` |
| \`.gif\` | \`image/gif\` |
| \`.svg\` | \`image/svg+xml\` |
| \`.ico\` | \`image/x-icon\` |
| \`.woff\` \`.woff2\` | \`font/woff\` / \`font/woff2\` |
| \`.ttf\` | \`font/ttf\` |
| \`.wasm\` | \`application/wasm\` |
| \`.txt\` | \`text/plain; charset=utf-8\` |
| 其他 | \`application/octet-stream\` |

\`\`\`
; === 静态文件服务示例 ===
[函数]main
$s:创建服务器$
$s.静态 public assets$
$s.启动 8080 router$

[函数]router
$如果 %_路径% == /api/data
  {"data":[1,2,3]}
\`\`\`

目录结构：
\`\`\`
public/
  index.html          ← 访问 /assets/ 返回此文件
  style.css           ← 访问 /assets/style.css
  js/app.js           ← 访问 /assets/js/app.js
  images/logo.png     ← 访问 /assets/images/logo.png
\`\`\`

## HTTP 模式 vs TCP 模式

| 特性 | HTTP 模式 | TCP 模式 |
| --- | --- | --- |
| 检测方式 | 请求首行匹配 HTTP 方法（GET/POST/PUT/DELETE/HEAD/OPTIONS/PATCH） | 首行不匹配 HTTP 方法 |
| 触发词来源 | 请求路径（含查询参数，如 \`/api/user?id=1\`） | 首行原始内容 |
| 响应格式 | 标准 HTTP/1.1 响应（状态行 + 头部 + 正文） | 原始文本，无 HTTP 包装 |
| 连接模型 | 每个请求一个连接（短连接） | 持续交互（长连接），逐行读写 |
| \`_DATA\` 变量 | 包含完整 HTTP 请求数据 | 不适用 |
| 静态文件 | 支持（OOP 风格） | 不适用 |
| 适用场景 | Web API、网页服务 | 自定义协议、聊天服务、Telnet 应用 |

- **HTTP 模式**：请求路径作为触发词，\`%触发%\` 为完整路径（含查询参数）
- **TCP 模式**：首行作为触发词，后续行持续交互（长连接）
- 处理函数可选，不指定时直接按触发词匹配主词条

## HTTP 模式

### 支持的 HTTP 方法

GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH 均自动识别。

### 请求变量

在 HTTP 模式下，服务器自动设置以下变量，可在处理函数或词条中直接使用：

| 变量 | 内容 | 说明 |
| --- | --- | --- |
| \`%触发%\` | \`/api/user?id=1\` | 完整请求路径（含查询参数） |
| \`%_路径%\` | \`/api/user\` | 路径部分（不含查询参数） |
| \`%_GET%\` | \`{"id":"1"}\` | URL 查询参数，JSON 对象格式 |
| \`%_POST%\` | \`{"name":"Alice"}\` | POST/PUT/PATCH 请求体，自动解析 JSON；非 JSON 内容包装为 \`{"raw":"..."}\` |
| \`%_头部%\` | \`{"Content-Type":"application/json"}\` | 所有请求头，JSON 对象格式 |
| \`%_DATA%\` | JSON 聚合对象 | 包含 method、path、header、get、post 字段的完整请求数据 |
| \`%self%\` | 处理函数名 | 当前被调用的处理函数名称 |

\`_DATA\` 结构示例：

\`\`\`json
{
  "method": "POST",
  "path": "/api/user",
  "header": {"Content-Type": "application/json", "Authorization": "Bearer xxx"},
  "get": {"page": "1"},
  "post": {"name": "Alice", "age": 25}
}
\`\`\`

### 响应控制

可通过以下变量自定义 HTTP 响应：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| \`%_状态码%\` | \`200\` | 自定义 HTTP 状态码 |
| \`%_设置头部%\` | \`{}\` | 自定义响应头，JSON 对象格式 |

默认响应头包含：
- \`Content-Type: text/plain; charset=utf-8\`
- \`Access-Control-Allow-Origin: *\`（CORS 跨域支持）
- \`Connection: close\`

### 支持的状态码

200、201、204、301、302、304、400、401、403、404、405、500、502、503。

### 完整示例

\`\`\`
; === OOP 风格 ===
[函数]main
$s:创建服务器$
$s.静态 数据/静态$
$s.启动 8080 handler$

[函数]handler
$如果 %_路径% == /api/hello
  你好，[%_GET%、"name"]

$如果 %_路径% == /api/json
  $_状态码%:201$
  $_设置头部%:{"X-Custom":"value"}$
  {"status":"ok","data":[%_POST%]}
\`\`\`

用 curl 测试：

\`\`\`
curl http://localhost:8080/api/hello?name=世界
→ 你好，世界

curl -X POST http://localhost:8080/api/json -d '{"msg":"hello"}'
→ {"status":"ok","data":{"msg":"hello"}}
（状态码 201，含自定义响应头 X-Custom: value）
\`\`\`

### 请求转发

在 HTTP 模式下可使用 \`$访问转发$\` 将请求转发到后端服务：

\`\`\`
[函数]handler
$如果 %_路径% == /api/users
  $访问转发 https://backend.internal/api/users$
\`\`\`

> 转发时读取 \`_DATA\` 变量获取原始请求数据。详见 [网络访问](./network#net-访问转发)。

## TCP 模式

TCP 模式下不匹配 HTTP 方法的连接将进入**长连接**模式：

- **第一行**作为触发词进行首次匹配
- **后续每行**持续作为新触发词，逐行读取→匹配→输出
- 连接持续直到客户端断开或发送空行

适用于自定义文本协议、Telnet 聊天服务等场景。

\`\`\`
; === TCP 长连接示例 ===
[函数]main
$s:创建服务器$
$s.启动 2323$

hello
你好！输入 help 查看帮助。

help
可用命令：hello, time, quit

time
当前时间：%time%
\`\`\`

用 telnet 测试：

\`\`\`
telnet localhost 2323
> hello
你好！输入 help 查看帮助。
> time
当前时间：2025-...
\`\`\`

> 服务器自动检测 HTTP/TCP，HTTP 模式返回标准响应，TCP 模式支持长连接逐行交互。配合 [网络访问](./network) 可构建完整 Web 服务。

[← 输出](./output-print) [对象创建 →](./object)
`,ji=`# 字符串

共 26 个函数。提供长度、分割、大小写转换、对齐、判断等全面的字符串操作。

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

> 所有字符串函数均基于字符（非字节）操作，Unicode 安全。判断类函数返回 "1"/"0"。需要数字判断和转换的场景，请结合 [类型转换](./type) 模块使用。

[← 流程控制·输出](./flow-output) [数学 →](./math)
`,Hi=`# 类型转换

共 4 个函数。提供文本与数字之间的显式类型转换，以及转换失败的边界行为说明。

## 类型转换概述

NR 是**弱类型**语言，大多数场景下值会自动在文本和数字之间转换——例如 \`$@.计算 1+2$\` 会将参数 "1" 和 "2" 自动转为数字计算。但在以下场景中，**显式类型转换**是必需的：

- 从外部数据源（文件读取、网络响应）获取的数据始终是字符串，需要转为数字才能参与数学运算
- 需要确保某个值是数字类型以触发引擎的数值路径（某些函数对数字和文本有不同行为）
- 需要将数字转为文本以拼接或保存

类型转换的结果通过特殊前缀 \`__N\` 标记为"数值型内部值"，引擎在后续操作中将其视为数字。

## 转换失败与边界情况

当输入无法解析为目标类型时，\`$转数字$\`、\`$转整数$\`、\`$转浮点$\` 均返回**空字符串（不赋值）**，而非抛出错误或返回 0。常见边界情况：

| 输入 | \`$转数字$\` | \`$转整数$\` | \`$转浮点$\` |
| --- | --- | --- | --- |
| \`"123"\` | __N123 | __N123 | __N123 |
| \`"3.14"\` | __N3.14 | __N3 | __N3.14 |
| \`"hello"\` | （空） | （空） | （空） |
| \`""\` | （空） | （空） | （空） |
| \`"42abc"\` | （空） | （空） | （空） |
| \`"-5"\` | __N-5 | __N-5 | __N-5 |
| \`"1e3"\` | __N1000 | __N1 | __N1000 |

注意：\`$转整数$\` 对浮点文本执行**向零截断**（直接丢弃小数部分），而非四舍五入。科学计数法（如 "1e3"）在转整数时仅解析到 "1" 即停止。

<a id="type-to-string"></a>

### \`$转文本$\` — 将值转为文本

- **格式**：\`$转文本 [值]$\`
- **参数**：任意类型的值
- **返回值**：值的文本表示

将任意值转换为字符串形式。

\`\`\`
$转文本 123$         → "123"
$转文本 %count%$     → count 的文本形式
\`\`\`

<a id="type-to-number"></a>

### \`$转数字$\` — 文本转数字

- **格式**：\`$转数字 [文本]$\`
- **参数**：要转换的文本
- **返回值**：数字值（内部标记 __N）；失败时返回空字符串

将文本解析为 f64 浮点数。支持整数、小数、负数、科学计数法。

\`\`\`
$转数字 3.14$        → "__N3.14"
$转数字 hello$       → （空）
\`\`\`

<a id="type-to-int"></a>

### \`$转整数$\` — 文本转整数

- **格式**：\`$转整数 [文本]$\`
- **参数**：要转换的文本
- **返回值**：整数值（向零截断）；失败时返回空字符串

将文本解析为整数，支持浮点文本自动截断取整（向零方向）。

\`\`\`
$转整数 42$          → "__N42"
$转整数 3.99$        → "__N3"
\`\`\`

<a id="type-to-float"></a>

### \`$转浮点$\` — 文本转浮点

- **格式**：\`$转浮点 [文本]$\`
- **参数**：要转换的文本
- **返回值**：浮点数值；失败时返回空字符串

将文本解析为 f64 浮点数，与 \`$转数字$\` 行为一致。

\`\`\`
$转浮点 3.14$        → "__N3.14"
$转浮点 5$           → "__N5"
\`\`\`

> 类型转换失败时均返回空字符串（不赋值），建议在关键转换前配合判断函数做前置验证。详情参见 [数学](./math) 的浮点精度说明。

[← 网络访问](./network)

[加密编码 →](./crypto)
`,Fi='# 类型系统\n\nNR 的类型系统是**动态、弱类型**的——变量无需声明类型，运行时自动确定。值在大多数场景下会自动在文本和数字之间转换，`==` 运算符做宽松比较。本章涵盖 NR 中的原始数据类型（没有对象/数组，只有文本、数字和布尔值），以及类型检测、判断和转换操作。\n\nNR 的 `Value` 不是简单的"字符串或数字"二分法——它是一个完整的枚举类型，内部由 Rust 的 `enum` 实现，每个变体携带不同的数据表示。这意味着两个值即使"看起来一样"，也可能属于不同类型，进而影响相等性比较和运算行为。\n\n## 类型一览\n\nNR 变量存储的是**带类型的值**（`Value`），而非纯字符串。类型在赋值时自动推断。\n\n| 类型 | 示例 | 说明 |\n|------|------|------|\n| `整数` | `1`, `-5`, `100` | 64 位有符号整数 |\n| `浮点` | `1.5`, `-0.5`, `3.14` | 64 位浮点数 |\n| `字符串` | `"hello"`, `abc` | 字符串 |\n| `布尔` | `true`, `false` | 布尔值 |\n| `空` | `null` | 空值 |\n| `对象` | — | 对象引用（`$new$` 返回） |\n| `函数` | — | 函数指针（`%func@name%` 返回） |\n\n- `count:5` → Int，`name:Alice` → Str\n- 但 `[...]` 数学表达式运算结果保留数值类型\n- `$new$` 返回值为对象类型\n- `%func@key%` 返回值为函数类型\n\n## 各类型详解\n\n### 整数（Int）\n\n64 位有符号整数（`i64`），范围约为 `-9.2×10¹⁸` 到 `9.2×10¹⁸`。\n\n```\na:42\nb:-100\nc:0\n\n%TYPE@a%   → "整数"\n%TYPE@b%   → "整数"\n%TYPE@c%   → "整数"\n```\n\n整数字面量不能包含小数点、前导零（会被当作十进制解析）或科学计数法。\n\n### 浮点（Float）\n\n64 位浮点数（`f64`），符合 IEEE 754 标准。\n\n```\npi:3.14\nneg:-0.5\nbig:1.5e10\n\n%TYPE@pi%    → "浮点"\n%TYPE@neg%   → "浮点"\n%TYPE@big%   → "浮点"\n```\n\n浮点数和整数在比较（`==`）时**视为不同**：`1 == 1.0` 在严格比较下为假。浮点运算可能产生精度误差，这是 IEEE 754 浮点数的固有特性。\n\n### 字符串（Str）\n\nUTF-8 编码的字符串。不带特殊前缀的纯文本字面量自动判定为字符串。\n\n```\nname:Alice\ngreeting:Hello World\nempty:""              ← 显式空字符串\n\n%TYPE@name%       → "字符串"\n%TYPE@greeting%   → "字符串"\n```\n\n注意：`greeting:Hello World` 中空格不需要转义（赋值操作符 `:` 之后直到行尾均为值部分）。但在 `$...$` 参数传递中空格会分割参数，参见 [词法结构 § 转义规则](./lexical)。\n\n### 布尔（Bool）\n\n只有 `true` 和 `false` 两个字面量。\n\n```\nflag:true\ndone:false\n\n%TYPE@flag%   → "布尔"\n%TYPE@done%   → "布尔"\n```\n\n布尔值可直接用于条件表达式（[判断逻辑](./control-flow)），也可参与逻辑运算（[表达式 § 逻辑运算符](./expressions)）。\n\n### 空值（Null）\n\n表示"无值"或"未设置"。仅有一种字面量：`null`。\n\n```\ndata:null\n\n%TYPE@data%   → "空"\n```\n\n`null` 与空字符串 `""` 不同：`null` 是一个独立的类型标记，而 `""` 是值为空的字符串。在条件判断中，`null` 被视为假值。\n\n### 对象（Object）\n\n由 `$new$` 创建，内部持有一个 JSON 对象引用。对象类型值不可直接输出为文本，需通过 `%TYPE@` 查询或使用 JSON 操作符访问其字段。\n\n```\nobj:$new$ {"key":"val"}\n\n%TYPE@obj%   → "对象"\n```\n\n`$new$` 不是赋值操作符——它是创建新对象的内置函数，参见 [词条系统](./entries)。\n\n### 函数（Func）\n\n由 `%func@name%` 获取，存储的是函数指针/引用，而非函数体文本。\n\n```\nptr:%func@greet%\n\n%TYPE@ptr%   → "函数"\n```\n\n函数类型值主要用途：作为回调传入其他函数，或在需要延迟调用时暂存。\n\n## 类型特性对照\n\n| 类型 | 可修改（`+:` 等） | 宽松相等 `==` | 严格相等 `===` | 数值排序 `>` `<` |\n|------|-------------------|--------------|---------------|------------------|\n| Int | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Float | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Str | ✅ 串接 | 内容比较（含类型转换） | 值和类型均相同 | ❌ 无意义 |\n| Bool | ❌ | 字符串化后比较 | 值和类型均相同 | ❌ |\n| Null | ❌ | — | — | ❌ |\n| Object | — | 引用相等 | 引用相等 | ❌ |\n| Func | ❌ | 引用相等 | 引用相等 | ❌ |\n\n## 类型强制转换与兼容性\n\n### 算术上下文中的类型转换\n\n在 `[...]` 数学表达式中，操作数的类型决定了运算结果的类型：\n\n```\n// 整数运算 → 整数\na:[1+2]          → Int(3)\n\n// 浮点数参与 → 浮点\nb:[1+2.0]        → Float(3.0)\nc:[3.14*2]       → Float(6.28)\n\n// 字符串自动转为数值参与运算\nd:["3"+2]        → Int(5)  或报错\n```\n\n- 整数 + 整数 → 整数\n- 任一操作数为浮点 → 结果提升为浮点\n- 字符串操作数：尝试按数值解析，失败则报错\n\n### 比较上下文中的类型转换\n\n`==`（宽松相等）会将两边值转为字符串后比较：\n\n```\n1 == "1"       → true（都转为 "1"）\n1 == 1.0       → true（都转为 "1"，但用 === 则为 false）\ntrue == "true" → true\nnull == ""     → false（"null" ≠ ""）\n```\n\n`===`（严格相等）要求**类型和值都相同**：\n\n```\n1 === 1       → true\n1 === 1.0     → false（Int vs Float）\n"1" === 1     → false（Str vs Int）\ntrue === true → true\n```\n\n**注意事项：**\n\n- 条件判断中（如 `如果:`），**推荐使用严格比较 `===`** 以避免意外的类型转换带来的误判。\n- 数值比较（`>`、`<`、`>=`、`<=`）要求两边均为数值类型（Int 或 Float），字符串会被尝试解析为数值。\n- `0`、`""`、`null`、`false` 在布尔上下文中均为"假"，但它们彼此之间**不相等**（除了 `0 == false` 会因为字符串化为 `"0" == "false"` 而返回假）。\n\n## 类型查询 `%TYPE@var%`\n\n```\ncount:5\nname:Alice\n\n%TYPE@count%   → "整数"\n%TYPE@name%    → "字符串"\n```\n\n未设置变量返回空字符串。\n',Bi='# 变量与赋值\n\n变量是 NR 中最基本的存储单元。本章涵盖变量的作用域规则、赋值操作符的语义差异、条件赋值、内置变量以及文本切片等核心机制。理解变量系统是正确组织数据流和控制状态的前提，与[类型系统](./types)和[表达式](./expressions)密切协作。\n\nNR 的赋值不是简单的"文本替换"——它会根据操作符和值的内容自动推断类型（[§ 类型一览](./types)），并在不同作用域间管理变量生命周期。\n\n## 作用域\n\n| 类型 | 作用域 | 说明 |\n|------|--------|------|\n| 局部变量 | 当前上下文 | 子上下文创建时重置 |\n| 全局变量 | 所有子上下文 | 子上下文创建时克隆共享 |\n\n### 作用域选择规则\n\nNR 根据**赋值位置**自动决定变量的作用域：\n\n- **头部区域（第一个空行之前）**中赋值的变量为**全局变量**。这些变量在词条触发、函数调用等子上下文中可被读取和修改。\n- **词条、函数、循环体内部**中首次赋值的变量为**局部变量**。局部变量仅在当前执行上下文中可见，进入子函数或子上下文时会创建独立的副本。\n\n```\n// 头部区域 → 全局变量，整个文件可见\ncounter:0\nbase_url:https://api.example.com\n\n// ← 空行分隔\n\n// 词条内部 → 局部变量\n开始\ntemp:%counter%             ← 可读全局变量\ncounter+:[%counter%+1]   ← 可修改全局变量\nlocal_var:临时值            ← 局部变量，外部不可见\n```\n\n### 作用域注意事项\n\n- 全局变量在**每次词条触发时保持其值**，不会重置。这使得 `counter+:1` 可以在多次触发间累加。\n- 子上下文（如 `$call$` 函数调用）中读取全局变量时，获取的是**当前快照值**；修改全局变量会影响父上下文。\n- 在同一作用域中，对已存在的变量再次使用 `:` 赋值会**覆盖**其值和类型。\n\n## 赋值操作符\n\n| 操作符 | 示例 | 语义 |\n|--------|------|------|\n| `:` | `name:Alice` | **自适应赋值**：值尝试解析为 JSON 字面量（数字/布尔/null/对象/数组），不成则当字符串 |\n| `::` | `greeting::Hello` | **纯文本赋值**：值始终作为字符串，不解析 JSON |\n| `+:` | `score+:5` | 自增 / JSON追加 / 字符串拼接 |\n| `-:` | `count-:1` | 自减 |\n| `*:` | `val*:2` | 乘法 / 字符串重复 |\n| `/:` | `val/:2` | 除法 |\n| `%:` | `val%:3` | 取余 |\n\n> 只有 ASCII 半角冒号 `:`（U+003A）被识别为赋值操作符。中文全角冒号 `：`（U+FF1A）**不是**操作符，在文本中直接原样输出。\n\n### `:`（自适应赋值）vs `::`（纯文本赋值）\n\n这是 NR 中最容易被忽视但最重要的语义差异：\n\n| 特性 | `:`（单冒号） | `::`（双冒号） |\n|------|-------------|---------------|\n| 值解析 | 尝试解析为 JSON 字面量 | 始终作为字符串 |\n| `1` | Int(1) | Str("1") |\n| `1.5` | Float(1.5) | Str("1.5") |\n| `true` | Bool(true) | Str("true") |\n| `null` | Null | Str("null") |\n| `{"a":1}` | JSON 对象 | Str("{\'a\':1}") |\n| `Alice` | Str("Alice") | Str("Alice") |\n\n```\n// : 自适应赋值——数字被识别为数值类型\ncount:100\n%TYPE@count%   → "整数"\n\n// :: 纯文本赋值——永远是字符串\nid::100\n%TYPE@id%      → "字符串"\n\n// 实际影响：数学运算\n[%count%+1]   → 101   （Int 运算）\n// [%id%+1]   → 报错 / 意外（字符串不能加）\n```\n\n### 何时使用 `::`\n\n- 存储**编号、ID、电话号**等不应被当作数字处理的值（如 `id::001` 不会丢掉前导零）\n- 存储可能是数字字面量的**字符串**（如文件名"123.json"）\n- 需要精确控制类型以避免意外数值运算的场景\n\n**注意事项：** 当你对 `::` 赋值的变量使用 `+:`（自增）时，由于值是字符串，`+:` 会执行**字符串拼接**而非数学加法。这可能不是你想要的行为。\n\n## 条件赋值 `?:`\n\n```\nkey:@a?:@b?:fallback\n```\n\n从左到右尝试读取 JSON 路径，第一个非空、非 null、非 false 的值被赋值。\n\n## 内置变量\n\n| 变量 | 说明 |\n|------|------|\n| `%空格%` | 空格 `" "` |\n| `%换行%` | 换行 `"\\n"` |\n| `%时间戳%` | Unix 时间戳（秒） |\n| `%毫秒时间戳%` | Unix 时间戳（毫秒） |\n| `%微秒时间戳%` | Unix 时间戳（微秒） |\n| `%纳秒时间戳%` | Unix 时间戳（纳秒） |\n| `%时间%` | 格式化本地时间 `YYYY-MM-DD HH:MM:SS`（UTC+8） |\n| `%随机数M-N%` | 随机整数 `[M, N]`（含两端） |\n| `%!key%` | 布尔取反：空/0/false/null → `"1"`，否则 → `"0"` |\n| `%?key%` | 可选变量：不存在返回空字符串 |\n| `%++var%` | 自增：先自增再返回递增后的值（变量不存在默认 0） |\n| `%--var%` | 自减：先自减再返回递减后的值（变量不存在默认 0） |\n| `%参数%` | 所有参数列表（JSON 数组） |\n| `%参数0%` | 函数名 / 完整触发名 |\n| `%参数N%` | 第 N 个参数 |\n| `%self%` | 当前对象名 / 函数名 |\n| `%触发%` | 当前触发词 |\n| `%行数%` | 当前行号（1-based） |\n| `%B64@key%` | Base64 解码 |\n| `%URL编码@key%` | URL 编码 |\n| `%len@key%` / `%长度@key%` | 返回变量值的字符长度 |\n| `%@var[切片]%` / `@var[切片]` | 符号截取文本（Python 风格切片，支持 `%` 快捷两种写法） |\n| `%func@key%` | 获取函数指针（类型为"函数"，display 为函数名） |\n| `%包名.变量%` | 跨包变量引用（如 `%mypkg.x%` 读取引入包的头部变量） |\n\n### 内置变量的生命周期\n\n内置变量（`%xxx%`）与用户定义的变量在生命周期上有本质区别：\n\n- **即时求值**：每次读取内置变量（如 `%时间戳%`）时，都会**重新计算**当前值。它不存储"快照"，而是每次调用运行时函数。\n- **不可赋值**：不能对内置变量使用 `:` 赋值——`%时间戳%:123` 是无效的。\n- **临时性**：内置变量的值仅在当前表达式求值瞬间有效。如需多次使用同一值，应将其赋值给用户变量：`ts:%时间戳%`。\n- **参数变量 `%参数N%`** 在函数体内是局部变量，函数返回后失效；在词条触发时反映的是触发参数。\n\n```\n// 推荐做法：缓存内置变量\nstart_time:%毫秒时间戳%\n// ... 多步操作 ...\nelapsed:[%毫秒时间戳%-%start_time%]   ← 两次读取产生不同值，差值有意义\n```\n\n## 符号截取文本 `%@var[切片]%` / `@var[切片]`\n\n内联文本切片语法，对变量值按字符（`.chars()`）进行 Python 风格切片。中文、emoji 等多字节字符均算一个字符。\n\n**两种写法等价**：\n\n- `%@var[切片]%` —— 标准写法，需 `%` 包裹\n- `@var[切片]` —— 快捷写法，无需 `%` 包裹，直接解析\n\n**基本语法**：`@变量名[start:end:step]`\n\n| 写法 | 含义 |\n|------|------|\n| `@a[1:]` | 从第 2 个字符到末尾 |\n| `@a[1:3]` | 第 2 ~ 3 个字符（index 1 和 2，不含 3） |\n| `@a[:3]` | 前 3 个字符 |\n| `@a[-3:]` | 末尾 3 个字符 |\n| `@a[1:6:2]` | index 1~5，步长 2（隔一个取一个） |\n| `@a[::2]` | 从头到尾，步长 2 |\n| `@a[::-1]` | 反转字符串 |\n\n```\nname:你好世界NR语言\n\n%name%             → "你好世界NR语言"\n%len@name%         → "8"\n\n// 标准写法\n%@name[1:]%        → "好世界NR语言"\n%@name[1:3]%       → "好世"\n%@name[:2]%        → "你好"\n%@name[-3:]%       → "R语言"\n%@name[::-1]%      → "言语RN界世好你"\n\n// 快捷写法（无需 % 包裹）\n@name[1:]          → "好世界NR语言"\n@name[1:3]         → "好世"\n@name[:2]          → "你好"\n@name[-3:]         → "R语言"\n@name[::-1]        → "言语RN界世好你"\n```\n\n> 快捷写法 `@var[切片]` 通过方括号内含 `:` 来与 JSON 路径导航（`@json[key]`）区分。不含 `:` 的方括号仍走 JSON 路径逻辑。\n',_d=Object.assign({"../../v0.1.0/canvas.md":$i,"../../v0.1.0/cli.md":mi,"../../v0.1.0/control-flow.md":bi,"../../v0.1.0/crypto.md":_i,"../../v0.1.0/debug.md":xi,"../../v0.1.0/entries.md":vi,"../../v0.1.0/expressions.md":yi,"../../v0.1.0/file.md":wi,"../../v0.1.0/flow-callback.md":ki,"../../v0.1.0/flow-main-callback.md":Si,"../../v0.1.0/flow-output.md":Ti,"../../v0.1.0/functions.md":Ri,"../../v0.1.0/index.md":Ei,"../../v0.1.0/json.md":Oi,"../../v0.1.0/lexical.md":Pi,"../../v0.1.0/math.md":Ai,"../../v0.1.0/modules.md":Ci,"../../v0.1.0/network.md":Ni,"../../v0.1.0/object.md":Ii,"../../v0.1.0/oop.md":Li,"../../v0.1.0/output-print.md":Mi,"../../v0.1.0/server.md":Di,"../../v0.1.0/string.md":ji,"../../v0.1.0/type.md":Hi,"../../v0.1.0/types.md":Fi,"../../v0.1.0/variables.md":Bi}),bl=new Set;for(const n of Object.keys(_d)){const e=n.match(/\.\.\/\.\.\/(v[^/]+)\//);e&&bl.add(e[1])}const At=[...bl].sort().reverse();function Ie(n){const e=n.match(/^\/(v[^/]+)/);return e?e[1]:At[0]||"v1.0"}const Ks=[{text:"入门",items:[{text:"概述",link:"/"},{text:"词法结构",link:"/lexical"},{text:"类型系统",link:"/types"},{text:"变量与赋值",link:"/variables"},{text:"表达式与运算符",link:"/expressions"},{text:"判断逻辑",link:"/control-flow"},{text:"词条系统",link:"/entries"},{text:"JSON 数据处理",link:"/json"},{text:"面向对象编程",link:"/oop"},{text:"模块与引入",link:"/modules"},{text:"函数",link:"/functions"},{text:"内置函数",link:"/flow-output",children:[{text:"回调",link:"/flow-callback"},{text:"主回调",link:"/flow-main-callback"},{text:"打印",link:"/output-print"},{text:"服务器",link:"/server"},{text:"对象创建",link:"/object"},{text:"字符串",link:"/string"},{text:"数学",link:"/math"},{text:"网络",link:"/network"},{text:"类型",link:"/type"},{text:"文件",link:"/file"},{text:"画布",link:"/canvas"}]}]}];function _l(n){const e=[];for(const t of n)t.link&&!t.children?e.push(t):t.children&&(t.link&&e.push({text:t.text,link:t.link}),e.push(..._l(t.children)));return e}const Dt=Ks.flatMap(n=>_l(n.items));function xd(){const n=et(),e=mn(()=>Dt.findIndex(i=>{const r=Ie(n.path),o=i.link.split("#")[0];return`/${r}${o}`===n.path})),t=mn(()=>{if(e.value<=0)return null;const i=Ie(n.path),r=Dt[e.value-1];return{text:r.text,link:`/${i}${r.link}`}}),s=mn(()=>{if(e.value>=Dt.length-1)return null;const i=Ie(n.path),r=Dt[e.value+1];return{text:r.text,link:`/${i}${r.link}`}});return{prev:t,next:s}}const je=(n,e)=>{const t=n.__vccOpts||n;for(const[s,i]of e)t[s]=i;return t},vd={class:"sidebar-nav"},yd={class:"sidebar-section-title"},wd=["href"],kd=["href"],Sd={key:1,class:"sidebar-section-title"},Td=["href"],Rd={class:"sidebar-sub-title"},Ed={class:"sidebar-sub-group"},Od=["href"],Pd=["href"],Ad={key:2,class:"sidebar-sub-title"},Cd={__name:"Sidebar",setup(n){const e=et(),t=mn(()=>Ie(e.path));function s(r){const o=r.indexOf("#"),l=o>=0?r.substring(0,o):r,a=o>=0?r.substring(o):"";return`#/${t.value}${l}${a}`}function i(r){const o=`/${t.value}`,[l,a]=r.split("#"),u=`${o}${l}`;return a?e.path===u&&e.hash==="#"+a:e.path===u&&!e.hash}return(r,o)=>(B(),V("nav",vd,[(B(!0),V(cn,null,Oe(fn(Ks),(l,a)=>(B(),V("div",{key:l.text,class:Hn(["sidebar-group",{"has-divider":a<fn(Ks).length-1}])},[U("p",yd,xn(l.text),1),(B(!0),V(cn,null,Oe(l.items,u=>(B(),V(cn,{key:u.link||u.text},[u.link&&!u.children?(B(),V("a",{key:0,href:s(u.link),class:Hn(["sidebar-link","sidebar-link-sub",{active:i(u.link)}])},xn(u.text),11,wd)):(B(),V(cn,{key:1},[u.link?(B(),V("a",{key:0,href:s(u.link),class:Hn(["sidebar-section-title","sidebar-section-link",{active:i(u.link)}])},xn(u.text),11,kd)):(B(),V("p",Sd,xn(u.text),1)),(B(!0),V(cn,null,Oe(u.children||[],c=>(B(),V(cn,{key:c.link||c.text},[c.link&&!c.children?(B(),V("a",{key:0,href:s(c.link),class:Hn(["sidebar-link","sidebar-link-sub",{active:i(c.link)}])},xn(c.text),11,Td)):c.children?(B(),V(cn,{key:1},[U("p",Rd,xn(c.text),1),U("div",Ed,[(B(!0),V(cn,null,Oe(c.children,d=>(B(),V(cn,{key:d.link||d.text},[d.link&&!d.children?(B(),V("a",{key:0,href:s(d.link),class:Hn(["sidebar-link","sidebar-link-fn",{active:i(d.link)}])},xn(d.text),11,Od)):d.children&&d.link?(B(),V("a",{key:1,href:s(d.link),class:Hn(["sidebar-link","sidebar-link-fn",{active:i(d.link)}])},xn(d.text),11,Pd)):d.children?(B(),V("p",Ad,xn(d.text),1)):Le("",!0)],64))),128))])],64)):Le("",!0)],64))),128))],64))],64))),128))],2))),128))]))}},Nd=je(Cd,[["__scopeId","data-v-b84c9d01"]]),Id={key:0,class:"right-nav"},Ld=["onClick"],Md={__name:"RightNav",setup(n){const e=et(),t=bd(),s=pe([]),i=pe("");let r=[],o=!1;function l(){const d=document.querySelector(".markdown-body");if(!d){s.value=[],r=[];return}r=Array.from(d.querySelectorAll("h2[id], h3[id]")),s.value=r.map(p=>({id:p.id,text:p.textContent,tag:p.tagName}))}function a(d){t.replace({hash:"#"+d});const p=document.getElementById(d);p&&p.scrollIntoView({behavior:"smooth",block:"start"})}function u(){if(!r.length)return;let d=r[0].id;for(const p of r)p.getBoundingClientRect().top<=120&&(d=p.id);i.value=d}function c(){o||(requestAnimationFrame(()=>{u(),o=!1}),o=!0)}return Ne(()=>e.path,()=>Ot(l),{immediate:!0}),Lo(()=>window.addEventListener("scroll",c,{passive:!0})),di(()=>window.removeEventListener("scroll",c)),(d,p)=>s.value.length?(B(),V("nav",Id,[(B(!0),V(cn,null,Oe(s.value,g=>(B(),V("a",{key:g.id,href:"javascript:void(0)",class:Hn(["right-nav-link",{active:i.value===g.id},g.tag==="H3"?"sub":""]),onClick:y=>a(g.id)},xn(g.text),11,Ld))),128))])):Le("",!0)}},Dd=je(Md,[["__scopeId","data-v-aef8329c"]]),jd=Object.assign({"../../v0.1.0/canvas.md":$i,"../../v0.1.0/cli.md":mi,"../../v0.1.0/control-flow.md":bi,"../../v0.1.0/crypto.md":_i,"../../v0.1.0/debug.md":xi,"../../v0.1.0/entries.md":vi,"../../v0.1.0/expressions.md":yi,"../../v0.1.0/file.md":wi,"../../v0.1.0/flow-callback.md":ki,"../../v0.1.0/flow-main-callback.md":Si,"../../v0.1.0/flow-output.md":Ti,"../../v0.1.0/functions.md":Ri,"../../v0.1.0/index.md":Ei,"../../v0.1.0/json.md":Oi,"../../v0.1.0/lexical.md":Pi,"../../v0.1.0/math.md":Ai,"../../v0.1.0/modules.md":Ci,"../../v0.1.0/network.md":Ni,"../../v0.1.0/object.md":Ii,"../../v0.1.0/oop.md":Li,"../../v0.1.0/output-print.md":Mi,"../../v0.1.0/server.md":Di,"../../v0.1.0/string.md":ji,"../../v0.1.0/type.md":Hi,"../../v0.1.0/types.md":Fi,"../../v0.1.0/variables.md":Bi});function Hd(n){const e=`../../${n}/`,t=[];for(const[s,i]of Object.entries(jd)){if(!s.startsWith(e))continue;const r=s.match(new RegExp(`${n}/(.+)\\.md$`));if(!r)continue;let o=r[1];const l=o==="index"?`/${n}/`:`/${n}/${o}`,a=i.match(/^#\s+(.+)$/m),u=a?a[1]:l,c=[],d=/^#{2,3}\s+(.+)$/gm;let p;for(;(p=d.exec(i))!==null;)c.push(p[1]);t.push({path:l,title:u,headings:c,content:i})}return t}const xl={};for(const n of At)xl[n]=Hd(n);function Fd(n,e){if(!n.trim())return[];const t=e?Ie(e):At[0],s=xl[t]||[],i=n.toLowerCase().split(/\s+/).filter(Boolean);return s.filter(r=>{const o=(r.title+" "+r.headings.join(" ")+" "+r.content).toLowerCase();return i.every(l=>o.includes(l))}).map(r=>{const o=r.content.toLowerCase().indexOf(i[0]),l=Math.max(0,o-40),a=Math.min(r.content.length,o+120);let u=r.content.slice(l,a).replace(/\n+/g," ");return l>0&&(u="..."+u),a<r.content.length&&(u+="..."),{...r,snippet:u}}).slice(0,10)}const Bd={class:"search-modal"},Ud={class:"search-input-wrap"},Vd={key:0,class:"search-results"},zd=["onClick","onMouseenter"],Gd={class:"result-title"},Jd={class:"result-path"},Kd={class:"result-snippet"},qd={key:1,class:"search-empty"},Wd={__name:"SearchModal",emits:["close"],setup(n,{emit:e}){const t=e,s=et(),i=pe(""),r=pe([]),o=pe(0),l=pe(null);Ot(()=>{var c;return(c=l.value)==null?void 0:c.focus()}),Ne(i,c=>{r.value=Fd(c,s.path),o.value=0});function a(c){window.location.hash="#"+c,t("close")}function u(c){c.key==="Escape"?t("close"):c.key==="ArrowDown"?(c.preventDefault(),o.value=Math.min(o.value+1,r.value.length-1)):c.key==="ArrowUp"?(c.preventDefault(),o.value=Math.max(o.value-1,0)):c.key==="Enter"&&r.value[o.value]&&a(r.value[o.value].path)}return(c,d)=>(B(),V("div",{class:"search-overlay",onClick:d[2]||(d[2]=iu(p=>t("close"),["self"]))},[U("div",Bd,[U("div",Ud,[d[3]||(d[3]=U("svg",{class:"search-icon",viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor","stroke-width":"2"},[U("circle",{cx:"11",cy:"11",r:"8"}),U("path",{d:"m21 21-4.35-4.35"})],-1)),va(U("input",{ref_key:"inputEl",ref:l,"onUpdate:modelValue":d[0]||(d[0]=p=>i.value=p),class:"search-input",placeholder:"搜索文档...",onKeydown:u},null,544),[[eu,i.value]]),U("button",{class:"search-close",onClick:d[1]||(d[1]=p=>t("close"))},"Esc")]),r.value.length?(B(),V("div",Vd,[(B(!0),V(cn,null,Oe(r.value,(p,g)=>(B(),V("div",{key:p.path,class:Hn(["search-result",{active:g===o.value}]),onClick:y=>a(p.path),onMouseenter:y=>o.value=g},[U("div",Gd,xn(p.title),1),U("div",Jd,xn(p.path),1),U("div",Kd,xn(p.snippet),1)],42,zd))),128))])):i.value?(B(),V("div",qd," 未找到相关结果 ")):Le("",!0)])]))}},Yd=je(Wd,[["__scopeId","data-v-8b5c2c8d"]]),Qd=["value"],Zd=["value"],Xd={__name:"VersionSwitcher",setup(n){const e=et(),t=mn(()=>At.map(r=>({label:r,path:`/${r}/`}))),s=mn(()=>`/${Ie(e.path)}/`);function i(r){window.location.hash="#"+r.target.value}return(r,o)=>(B(),V("select",{class:"version-select",value:s.value,onChange:i},[(B(!0),V(cn,null,Oe(t.value,l=>(B(),V("option",{key:l.path,value:l.path},xn(l.label),9,Zd))),128))],40,Qd))}},nf=je(Xd,[["__scopeId","data-v-5639bad0"]]),ef={class:"header"},tf=["title"],sf={key:0,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},rf={key:1,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},of={class:"main"},lf={class:"sidebar"},af={class:"content"},cf={key:0,class:"right-aside"},uf={__name:"App",setup(n){const{isDark:e,toggle:t}=uu(),s=pe(!1);function i(r){(r.ctrlKey||r.metaKey)&&r.key==="k"&&(r.preventDefault(),s.value=!0)}return(r,o)=>{const l=Fa("router-view");return B(),V(cn,null,[U("div",{class:"app",onKeydown:i},[U("header",ef,[o[6]||(o[6]=U("a",{class:"logo",href:"#/"},"NR 语言参考手册",-1)),gn(nf),o[7]||(o[7]=U("div",{class:"header-spacer"},null,-1)),U("button",{class:"icon-btn",onClick:o[0]||(o[0]=a=>s.value=!0),title:"搜索 (Ctrl+K)"},[...o[3]||(o[3]=[U("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},[U("circle",{cx:"11",cy:"11",r:"8"}),U("path",{d:"m21 21-4.35-4.35"})],-1)])]),U("button",{class:"icon-btn",onClick:o[1]||(o[1]=(...a)=>fn(t)&&fn(t)(...a)),title:fn(e)?"浅色模式":"深色模式"},[fn(e)?(B(),V("svg",sf,[...o[4]||(o[4]=[U("circle",{cx:"12",cy:"12",r:"5"},null,-1),U("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"},null,-1)])])):(B(),V("svg",rf,[...o[5]||(o[5]=[U("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])]))],8,tf)]),U("div",of,[U("aside",lf,[gn(Nd)]),U("main",af,[gn(l)]),r.$route.path!=="/"?(B(),V("aside",cf,[gn(Dd)])):Le("",!0)])],32),s.value?(B(),nl(Yd,{key:0,onClose:o[2]||(o[2]=a=>s.value=!1)})):Le("",!0)],64)}}},df=je(uf,[["__scopeId","data-v-ca8421cd"]]),ff={class:"home"},hf={class:"hero"},pf=["href"],gf={__name:"HomePage",setup(n){const e=At[0]||"v0.1.0";return(t,s)=>(B(),V("div",ff,[U("section",hf,[s[0]||(s[0]=U("h1",{class:"hero-name"},"NR 语言",-1)),s[1]||(s[1]=U("p",{class:"hero-text"},"参考手册",-1)),s[2]||(s[2]=U("p",{class:"hero-tagline"},"Nebula 词库引擎的领域特定语言",-1)),U("a",{class:"hero-btn",href:`#/${fn(e)}/`},"开始阅读",8,pf)]),s[3]||(s[3]=_c('<section class="features" data-v-dd2340e1><div class="feature" data-v-dd2340e1><h3 data-v-dd2340e1>简洁语法</h3><p data-v-dd2340e1>NR 采用直观的触发词-响应模式，头部空行分隔结构，让词库编写像写笔记一样自然。</p></div><div class="feature" data-v-dd2340e1><h3 data-v-dd2340e1>动态类型</h3><p data-v-dd2340e1>支持整数、浮点、字符串、布尔、对象、函数等类型，运行时自动推断，灵活高效。</p></div><div class="feature" data-v-dd2340e1><h3 data-v-dd2340e1>模块化</h3><p data-v-dd2340e1>支持文件/目录引入、跨包调用、热更新，轻松构建大型自动化文本生成系统。</p></div></section><section class="tools" data-v-dd2340e1><h2 data-v-dd2340e1>工具</h2><p data-v-dd2340e1><a href="./vscode-nr/nr-language-0.1.1.vsix" data-v-dd2340e1>下载 VS Code 语法高亮扩展 (.vsix)</a></p><p data-v-dd2340e1>安装：VS Code → <code data-v-dd2340e1>Ctrl+Shift+P</code> → &quot;Install from VSIX...&quot; → 选择下载的文件</p><p class="vsix-notice" data-v-dd2340e1>注意：此插件仅提供最新版本，不保证历史版本兼容。</p></section><section class="info" data-v-dd2340e1><h2 data-v-dd2340e1>项目信息</h2><ul data-v-dd2340e1><li data-v-dd2340e1><strong data-v-dd2340e1>引擎</strong>：Nebula 词库引擎</li><li data-v-dd2340e1><strong data-v-dd2340e1>实现语言</strong>：Rust</li><li data-v-dd2340e1><strong data-v-dd2340e1>许可证</strong>：Copyright (c) 2025 保留所有权利</li></ul></section>',3))]))}},$f=je(gf,[["__scopeId","data-v-dd2340e1"]]);function Ui(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let He=Ui();function vl(n){He=n}const yl=/[&<>"']/,mf=new RegExp(yl.source,"g"),wl=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,bf=new RegExp(wl.source,"g"),_f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jr=n=>_f[n];function Cn(n,e){if(e){if(yl.test(n))return n.replace(mf,Jr)}else if(wl.test(n))return n.replace(bf,Jr);return n}const xf=/(^|[^\[])\^/g;function tn(n,e){let t=typeof n=="string"?n:n.source;e=e||"";const s={replace:(i,r)=>{let o=typeof r=="string"?r:r.source;return o=o.replace(xf,"$1"),t=t.replace(i,o),s},getRegex:()=>new RegExp(t,e)};return s}function Kr(n){try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const _t={exec:()=>null};function qr(n,e){const t=n.replace(/\|/g,(r,o,l)=>{let a=!1,u=o;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),s=t.split(/ \|/);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!s[s.length-1].trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(/\\\|/g,"|");return s}function lt(n,e,t){const s=n.length;if(s===0)return"";let i=0;for(;i<s&&n.charAt(s-i-1)===e;)i++;return n.slice(0,s-i)}function vf(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return-1}function Wr(n,e,t,s){const i=e.href,r=e.title?Cn(e.title):null,o=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:i,title:r,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:i,title:r,text:Cn(o)}}function yf(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const s=t[1];return e.split(`
`).map(i=>{const r=i.match(/^\s+/);if(r===null)return i;const[o]=r;return o.length>=s.length?i.slice(s.length):i}).join(`
`)}class Xt{constructor(e){rn(this,"options");rn(this,"rules");rn(this,"lexer");this.options=e||He}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(/^(?: {1,4}| {0,3}\t)/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:lt(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],i=yf(s,t[3]||"");return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(/#$/.test(s)){const i=lt(s,"#");(this.options.pedantic||!i||/ $/.test(i))&&(s=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:lt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=lt(t[0],`
`).split(`
`),i="",r="";const o=[];for(;s.length>0;){let l=!1;const a=[];let u;for(u=0;u<s.length;u++)if(/^ {0,3}>/.test(s[u]))a.push(s[u]),l=!0;else if(!l)a.push(s[u]);else break;s=s.slice(u);const c=a.join(`
`),d=c.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");i=i?`${i}
${c}`:c,r=r?`${r}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,s.length===0)break;const g=o[o.length-1];if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){const y=g,w=y.raw+`
`+s.join(`
`),N=this.blockquote(w);o[o.length-1]=N,i=i.substring(0,i.length-y.raw.length)+N.raw,r=r.substring(0,r.length-y.text.length)+N.text;break}else if((g==null?void 0:g.type)==="list"){const y=g,w=y.raw+`
`+s.join(`
`),N=this.list(w);o[o.length-1]=N,i=i.substring(0,i.length-g.raw.length)+N.raw,r=r.substring(0,r.length-y.raw.length)+N.raw,s=w.substring(o[o.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const i=s.length>1,r={type:"list",raw:"",ordered:i,start:i?+s.slice(0,-1):"",loose:!1,items:[]};s=i?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=i?s:"[*+-]");const o=new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l=!1;for(;e;){let a=!1,u="",c="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let d=t[2].split(`
`,1)[0].replace(/^\t+/,M=>" ".repeat(3*M.length)),p=e.split(`
`,1)[0],g=!d.trim(),y=0;if(this.options.pedantic?(y=2,c=d.trimStart()):g?y=t[1].length+1:(y=t[2].search(/[^ ]/),y=y>4?1:y,c=d.slice(y),y+=t[1].length),g&&/^[ \t]*$/.test(p)&&(u+=p+`
`,e=e.substring(p.length+1),a=!0),!a){const M=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),O=new RegExp(`^ {0,${Math.min(3,y-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),C=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:\`\`\`|~~~)`),A=new RegExp(`^ {0,${Math.min(3,y-1)}}#`),Y=new RegExp(`^ {0,${Math.min(3,y-1)}}<(?:[a-z].*>|!--)`,"i");for(;e;){const an=e.split(`
`,1)[0];let Q;if(p=an,this.options.pedantic?(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  "),Q=p):Q=p.replace(/\t/g,"    "),C.test(p)||A.test(p)||Y.test(p)||M.test(p)||O.test(p))break;if(Q.search(/[^ ]/)>=y||!p.trim())c+=`
`+Q.slice(y);else{if(g||d.replace(/\t/g,"    ").search(/[^ ]/)>=4||C.test(d)||A.test(d)||O.test(d))break;c+=`
`+p}!g&&!p.trim()&&(g=!0),u+=an+`
`,e=e.substring(an.length+1),d=Q.slice(y)}}r.loose||(l?r.loose=!0:/\n[ \t]*\n[ \t]*$/.test(u)&&(l=!0));let w=null,N;this.options.gfm&&(w=/^\[[ xX]\] /.exec(c),w&&(N=w[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:u,task:!!w,checked:N,loose:!1,text:c,tokens:[]}),r.raw+=u}r.items[r.items.length-1].raw=r.items[r.items.length-1].raw.trimEnd(),r.items[r.items.length-1].text=r.items[r.items.length-1].text.trimEnd(),r.raw=r.raw.trimEnd();for(let a=0;a<r.items.length;a++)if(this.lexer.state.top=!1,r.items[a].tokens=this.lexer.blockTokens(r.items[a].text,[]),!r.loose){const u=r.items[a].tokens.filter(d=>d.type==="space"),c=u.length>0&&u.some(d=>/\n.*\n/.test(d.raw));r.loose=c}if(r.loose)for(let a=0;a<r.items.length;a++)r.items[a].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(/\s+/g," "),i=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:i,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const s=qr(t[1]),i=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===i.length){for(const l of i)/^ *-+: *$/.test(l)?o.align.push("right"):/^ *:-+: *$/.test(l)?o.align.push("center"):/^ *:-+ *$/.test(l)?o.align.push("left"):o.align.push(null);for(let l=0;l<s.length;l++)o.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:o.align[l]});for(const l of r)o.rows.push(qr(l,o.header.length).map((a,u)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[u]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Cn(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&/^</.test(s)){if(!/>$/.test(s))return;const o=lt(s.slice(0,-1),"\\");if((s.length-o.length)%2===0)return}else{const o=vf(t[2],"()");if(o>-1){const a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);o&&(i=o[1],r=o[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(s)?i=i.slice(1):i=i.slice(1,-1)),Wr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const i=(s[2]||s[1]).replace(/\s+/g," "),r=t[i.toLowerCase()];if(!r){const o=s[0].charAt(0);return{type:"text",raw:o,text:o}}return Wr(s,r,s[0],this.lexer)}}emStrong(e,t,s=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&s.match(/[\p{L}\p{N}]/u))return;if(!(i[1]||i[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const o=[...i[0]].length-1;let l,a,u=o,c=0;const d=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(i=d.exec(t))!=null;){if(l=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!l)continue;if(a=[...l].length,i[3]||i[4]){u+=a;continue}else if((i[5]||i[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(u-=a,u>0)continue;a=Math.min(a,a+u+c);const p=[...i[0]][0].length,g=e.slice(0,o+i.index+p+a);if(Math.min(o,a)%2){const w=g.slice(1,-1);return{type:"em",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}const y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(/\n/g," ");const i=/[^ ]/.test(s),r=/^ /.test(s)&&/ $/.test(s);return i&&r&&(s=s.substring(1,s.length-1)),s=Cn(s,!0),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,i;return t[2]==="@"?(s=Cn(t[1]),i="mailto:"+s):(s=Cn(t[1]),i=s),{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let i,r;if(t[2]==="@")i=Cn(t[0]),r="mailto:"+i;else{let o;do o=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(o!==t[0]);i=Cn(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let s;return this.lexer.state.inRawBlock?s=t[0]:s=Cn(t[0]),{type:"text",raw:t[0],text:s}}}}const wf=/^(?:[ \t]*(?:\n|$))+/,kf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Sf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ct=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Tf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,kl=/(?:[*+-]|\d{1,9}[.)])/,Sl=tn(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,kl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),Vi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Rf=/^[^\n]+/,zi=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ef=tn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",zi).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Of=tn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,kl).getRegex(),$s="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Gi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pf=tn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Gi).replace("tag",$s).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Tl=tn(Vi).replace("hr",Ct).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$s).getRegex(),Af=tn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Tl).getRegex(),Ji={blockquote:Af,code:kf,def:Ef,fences:Sf,heading:Tf,hr:Ct,html:Pf,lheading:Sl,list:Of,newline:wf,paragraph:Tl,table:_t,text:Rf},Yr=tn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ct).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$s).getRegex(),Cf={...Ji,table:Yr,paragraph:tn(Vi).replace("hr",Ct).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Yr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",$s).getRegex()},Nf={...Ji,html:tn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Gi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_t,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:tn(Vi).replace("hr",Ct).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Sl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Rl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,If=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,El=/^( {2,}|\\)\n(?!\s*$)/,Lf=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Nt="\\p{P}\\p{S}",Mf=tn(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Nt).getRegex(),Df=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,jf=tn(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Nt).getRegex(),Hf=tn("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Nt).getRegex(),Ff=tn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Nt).getRegex(),Bf=tn(/\\([punct])/,"gu").replace(/punct/g,Nt).getRegex(),Uf=tn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Vf=tn(Gi).replace("(?:-->|$)","-->").getRegex(),zf=tn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Vf).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ns=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Gf=tn(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",ns).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ol=tn(/^!?\[(label)\]\[(ref)\]/).replace("label",ns).replace("ref",zi).getRegex(),Pl=tn(/^!?\[(ref)\](?:\[\])?/).replace("ref",zi).getRegex(),Jf=tn("reflink|nolink(?!\\()","g").replace("reflink",Ol).replace("nolink",Pl).getRegex(),Ki={_backpedal:_t,anyPunctuation:Bf,autolink:Uf,blockSkip:Df,br:El,code:If,del:_t,emStrongLDelim:jf,emStrongRDelimAst:Hf,emStrongRDelimUnd:Ff,escape:Rl,link:Gf,nolink:Pl,punctuation:Mf,reflink:Ol,reflinkSearch:Jf,tag:zf,text:Lf,url:_t},Kf={...Ki,link:tn(/^!?\[(label)\]\((.*?)\)/).replace("label",ns).getRegex(),reflink:tn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ns).getRegex()},qs={...Ki,escape:tn(Rl).replace("])","~|])").getRegex(),url:tn(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},qf={...qs,br:tn(El).replace("{2,}","*").getRegex(),text:tn(qs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},jt={normal:Ji,gfm:Cf,pedantic:Nf},at={normal:Ki,gfm:qs,breaks:qf,pedantic:Kf};class Mn{constructor(e){rn(this,"tokens");rn(this,"options");rn(this,"state");rn(this,"tokenizer");rn(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||He,this.options.tokenizer=this.options.tokenizer||new Xt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:jt.normal,inline:at.normal};this.options.pedantic?(t.block=jt.pedantic,t.inline=at.pedantic):this.options.gfm&&(t.block=jt.gfm,this.options.breaks?t.inline=at.breaks:t.inline=at.gfm),this.tokenizer.rules=t}static get rules(){return{block:jt,inline:at}}static lex(e,t){return new Mn(t).lex(e)}static lexInline(e,t){return new Mn(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.options.pedantic&&(e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""));let i,r,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(i=l.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))){if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length),i.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+i.raw,r.text+=`
`+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title});continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const a=e.slice(1);let u;this.options.extensions.startBlock.forEach(c=>{u=c.call({lexer:this},a),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(o=e.substring(0,l+1))}if(this.state.top&&(i=this.tokenizer.paragraph(o))){r=t[t.length-1],s&&(r==null?void 0:r.type)==="paragraph"?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i),s=o.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&r.type==="text"?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let s,i,r,o=e,l,a,u;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)c.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,l.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(a||(u=""),a=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(s=c.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))){if(s=this.tokenizer.escape(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.tag(e)){e=e.substring(s.raw.length),i=t[t.length-1],i&&s.type==="text"&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(s=this.tokenizer.link(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(s.raw.length),i=t[t.length-1],i&&s.type==="text"&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(s=this.tokenizer.emStrong(e,o,u)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.codespan(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.br(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.del(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.autolink(e)){e=e.substring(s.raw.length),t.push(s);continue}if(!this.state.inLink&&(s=this.tokenizer.url(e))){e=e.substring(s.raw.length),t.push(s);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let c=1/0;const d=e.slice(1);let p;this.options.extensions.startInline.forEach(g=>{p=g.call({lexer:this},d),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(r=e.substring(0,c+1))}if(s=this.tokenizer.inlineText(r)){e=e.substring(s.raw.length),s.raw.slice(-1)!=="_"&&(u=s.raw.slice(-1)),a=!0,i=t[t.length-1],i&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(e){const c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return t}}class es{constructor(e){rn(this,"options");rn(this,"parser");this.options=e||He}space(e){return""}code({text:e,lang:t,escaped:s}){var o;const i=(o=(t||"").match(/^\S*/))==null?void 0:o[0],r=e.replace(/\n$/,"")+`
`;return i?'<pre><code class="language-'+Cn(i)+'">'+(s?r:Cn(r,!0))+`</code></pre>
`:"<pre><code>"+(s?r:Cn(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,s=e.start;let i="";for(let l=0;l<e.items.length;l++){const a=e.items[l];i+=this.listitem(a)}const r=t?"ol":"ul",o=t&&s!==1?' start="'+s+'"':"";return"<"+r+o+`>
`+i+"</"+r+`>
`}listitem(e){let t="";if(e.task){const s=this.checkbox({checked:!!e.checked});e.loose?e.tokens.length>0&&e.tokens[0].type==="paragraph"?(e.tokens[0].text=s+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=s+" "+e.tokens[0].tokens[0].text)):e.tokens.unshift({type:"text",raw:s+" ",text:s+" "}):t+=s+" "}return t+=this.parser.parse(e.tokens,!!e.loose),`<li>${t}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",s="";for(let r=0;r<e.header.length;r++)s+=this.tablecell(e.header[r]);t+=this.tablerow({text:s});let i="";for(let r=0;r<e.rows.length;r++){const o=e.rows[r];s="";for(let l=0;l<o.length;l++)s+=this.tablecell(o[l]);i+=this.tablerow({text:s})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const t=this.parser.parseInline(e.tokens),s=e.header?"th":"td";return(e.align?`<${s} align="${e.align}">`:`<${s}>`)+t+`</${s}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const i=this.parser.parseInline(s),r=Kr(e);if(r===null)return i;e=r;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:s}){const i=Kr(e);if(i===null)return s;e=i;let r=`<img src="${e}" alt="${s}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class qi{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class Dn{constructor(e){rn(this,"options");rn(this,"renderer");rn(this,"textRenderer");this.options=e||He,this.options.renderer=this.options.renderer||new es,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new qi}static parse(e,t){return new Dn(t).parse(e)}static parseInline(e,t){return new Dn(t).parseInline(e)}parse(e,t=!0){let s="";for(let i=0;i<e.length;i++){const r=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const l=r,a=this.options.extensions.renderers[l.type].call({parser:this},l);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=a||"";continue}}const o=r;switch(o.type){case"space":{s+=this.renderer.space(o);continue}case"hr":{s+=this.renderer.hr(o);continue}case"heading":{s+=this.renderer.heading(o);continue}case"code":{s+=this.renderer.code(o);continue}case"table":{s+=this.renderer.table(o);continue}case"blockquote":{s+=this.renderer.blockquote(o);continue}case"list":{s+=this.renderer.list(o);continue}case"html":{s+=this.renderer.html(o);continue}case"paragraph":{s+=this.renderer.paragraph(o);continue}case"text":{let l=o,a=this.renderer.text(l);for(;i+1<e.length&&e[i+1].type==="text";)l=e[++i],a+=`
`+this.renderer.text(l);t?s+=this.renderer.paragraph({type:"paragraph",raw:a,text:a,tokens:[{type:"text",raw:a,text:a}]}):s+=a;continue}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,t){t=t||this.renderer;let s="";for(let i=0;i<e.length;i++){const r=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const o=r;switch(o.type){case"escape":{s+=t.text(o);break}case"html":{s+=t.html(o);break}case"link":{s+=t.link(o);break}case"image":{s+=t.image(o);break}case"strong":{s+=t.strong(o);break}case"em":{s+=t.em(o);break}case"codespan":{s+=t.codespan(o);break}case"br":{s+=t.br(o);break}case"del":{s+=t.del(o);break}case"text":{s+=t.text(o);break}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}}class xt{constructor(e){rn(this,"options");rn(this,"block");this.options=e||He}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Mn.lex:Mn.lexInline}provideParser(){return this.block?Dn.parse:Dn.parseInline}}rn(xt,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class Wf{constructor(...e){rn(this,"defaults",Ui());rn(this,"options",this.setOptions);rn(this,"parse",this.parseMarkdown(!0));rn(this,"parseInline",this.parseMarkdown(!1));rn(this,"Parser",Dn);rn(this,"Renderer",es);rn(this,"TextRenderer",qi);rn(this,"Lexer",Mn);rn(this,"Tokenizer",Xt);rn(this,"Hooks",xt);this.use(...e)}walkTokens(e,t){var i,r;let s=[];for(const o of e)switch(s=s.concat(t.call(this,o)),o.type){case"table":{const l=o;for(const a of l.header)s=s.concat(this.walkTokens(a.tokens,t));for(const a of l.rows)for(const u of a)s=s.concat(this.walkTokens(u.tokens,t));break}case"list":{const l=o;s=s.concat(this.walkTokens(l.items,t));break}default:{const l=o;(r=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&r[l.type]?this.defaults.extensions.childTokens[l.type].forEach(a=>{const u=l[a].flat(1/0);s=s.concat(this.walkTokens(u,t))}):l.tokens&&(s=s.concat(this.walkTokens(l.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const i={...s};if(i.async=this.defaults.async||i.async||!1,s.extensions&&(s.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const o=t.renderers[r.name];o?t.renderers[r.name]=function(...l){let a=r.renderer.apply(this,l);return a===!1&&(a=o.apply(this,l)),a}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[r.level];o?o.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),i.extensions=t),s.renderer){const r=this.defaults.renderer||new es(this.defaults);for(const o in s.renderer){if(!(o in r))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const l=o,a=s.renderer[l],u=r[l];r[l]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=u.apply(r,c)),d||""}}i.renderer=r}if(s.tokenizer){const r=this.defaults.tokenizer||new Xt(this.defaults);for(const o in s.tokenizer){if(!(o in r))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const l=o,a=s.tokenizer[l],u=r[l];r[l]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=u.apply(r,c)),d}}i.tokenizer=r}if(s.hooks){const r=this.defaults.hooks||new xt;for(const o in s.hooks){if(!(o in r))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const l=o,a=s.hooks[l],u=r[l];xt.passThroughHooks.has(o)?r[l]=c=>{if(this.defaults.async)return Promise.resolve(a.call(r,c)).then(p=>u.call(r,p));const d=a.call(r,c);return u.call(r,d)}:r[l]=(...c)=>{let d=a.apply(r,c);return d===!1&&(d=u.apply(r,c)),d}}i.hooks=r}if(s.walkTokens){const r=this.defaults.walkTokens,o=s.walkTokens;i.walkTokens=function(l){let a=[];return a.push(o.call(this,l)),r&&(a=a.concat(r.call(this,l))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Mn.lex(e,t??this.defaults)}parser(e,t){return Dn.parse(e,t??this.defaults)}parseMarkdown(e){return(s,i)=>{const r={...i},o={...this.defaults,...r},l=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof s>"u"||s===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const a=o.hooks?o.hooks.provideLexer():e?Mn.lex:Mn.lexInline,u=o.hooks?o.hooks.provideParser():e?Dn.parse:Dn.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(s):s).then(c=>a(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>u(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(l);try{o.hooks&&(s=o.hooks.preprocess(s));let c=a(s,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let d=u(c,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(c){return l(c)}}}onError(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Cn(s.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(s);throw s}}}const Me=new Wf;function Z(n,e){return Me.parse(n,e)}Z.options=Z.setOptions=function(n){return Me.setOptions(n),Z.defaults=Me.defaults,vl(Z.defaults),Z};Z.getDefaults=Ui;Z.defaults=He;Z.use=function(...n){return Me.use(...n),Z.defaults=Me.defaults,vl(Z.defaults),Z};Z.walkTokens=function(n,e){return Me.walkTokens(n,e)};Z.parseInline=Me.parseInline;Z.Parser=Dn;Z.parser=Dn.parse;Z.Renderer=es;Z.TextRenderer=qi;Z.Lexer=Mn;Z.lexer=Mn.lex;Z.Tokenizer=Xt;Z.Hooks=xt;Z.parse=Z;Z.options;Z.setOptions;Z.use;Z.walkTokens;Z.parseInline;Dn.parse;Mn.lex;const Yf={key:0,class:"doc-footer"},Qf={class:"doc-footer-inner"},Zf=["href"],Xf={class:"footer-text"},nh={key:1,class:"footer-link prev placeholder"},eh=["href"],th={class:"footer-text"},sh={key:3,class:"footer-link next placeholder"},ih={__name:"DocFooter",setup(n){const{prev:e,next:t}=xd();return(s,i)=>fn(e)||fn(t)?(B(),V("nav",Yf,[U("div",Qf,[fn(e)?(B(),V("a",{key:0,href:"#"+fn(e).link,class:"footer-link prev"},[i[0]||(i[0]=U("span",{class:"footer-label"},"上一章",-1)),U("span",Xf,xn(fn(e).text),1)],8,Zf)):(B(),V("div",nh)),fn(t)?(B(),V("a",{key:2,href:"#"+fn(t).link,class:"footer-link next"},[i[1]||(i[1]=U("span",{class:"footer-label"},"下一章",-1)),U("span",th,xn(fn(t).text),1)],8,eh)):(B(),V("div",sh))])])):Le("",!0)}},rh=je(ih,[["__scopeId","data-v-c9726e4b"]]),oh=["innerHTML"],Qr={__name:"MarkdownPage",setup(n){const e=et(),t=Object.assign({"../../v0.1.0/canvas.md":$i,"../../v0.1.0/cli.md":mi,"../../v0.1.0/control-flow.md":bi,"../../v0.1.0/crypto.md":_i,"../../v0.1.0/debug.md":xi,"../../v0.1.0/entries.md":vi,"../../v0.1.0/expressions.md":yi,"../../v0.1.0/file.md":wi,"../../v0.1.0/flow-callback.md":ki,"../../v0.1.0/flow-main-callback.md":Si,"../../v0.1.0/flow-output.md":Ti,"../../v0.1.0/functions.md":Ri,"../../v0.1.0/index.md":Ei,"../../v0.1.0/json.md":Oi,"../../v0.1.0/lexical.md":Pi,"../../v0.1.0/math.md":Ai,"../../v0.1.0/modules.md":Ci,"../../v0.1.0/network.md":Ni,"../../v0.1.0/object.md":Ii,"../../v0.1.0/oop.md":Li,"../../v0.1.0/output-print.md":Mi,"../../v0.1.0/server.md":Di,"../../v0.1.0/string.md":ji,"../../v0.1.0/type.md":Hi,"../../v0.1.0/types.md":Fi,"../../v0.1.0/variables.md":Bi});function s(l){return l.replace(/<[^>]*>/g,"").toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g,"-").replace(/^-|-$/g,"")}function i(l){return l.replace(/<(h[23])>(.*?)<\/\1>/gi,(a,u,c)=>`<${u} id="${s(c)}">${c}</${u}>`)}function r(l,a){return l.replace(/\]\(\.\/([^)]*?)\)/g,(u,c)=>/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(c)||c.startsWith("http")?u:`](#/${a}/${c})`)}const o=mn(()=>{const l=Ie(e.path);let a;e.path===`/${l}/`?a=`../../${l}/index.md`:a=`../../${l}/${e.params.page}.md`;const u=t[a];return u?i(Z.parse(r(u,l),{gfm:!0,breaks:!1})):"<p>页面未找到</p>"});return Ne([()=>e.hash,o],([l])=>{Ot(()=>{if(l){const a=document.getElementById(l.slice(1));a&&a.scrollIntoView({behavior:"smooth",block:"start"})}})}),(l,a)=>(B(),V(cn,null,[U("article",{class:"markdown-body",innerHTML:o.value},null,8,oh),gn(rh)],64))}},lh=md({history:Wu(),routes:[{path:"/",component:$f},{path:"/:version",redirect:n=>`/${n.params.version}/`},{path:"/:version/",component:Qr},{path:"/:version/:page",component:Qr}],scrollBehavior(n){return n.hash?{el:n.hash,behavior:"smooth",top:80}:{top:0}}});lu(df).use(lh).mount("#app");
