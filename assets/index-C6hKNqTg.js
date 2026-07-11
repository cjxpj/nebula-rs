var Sl=Object.defineProperty;var Rl=(n,e,t)=>e in n?Sl(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var rn=(n,e,t)=>Rl(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ks(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const on={},Je=[],se=()=>{},kr=()=>!1,Xt=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ns=n=>n.startsWith("onUpdate:"),vn=Object.assign,qs=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Ol=Object.prototype.hasOwnProperty,W=(n,e)=>Ol.call(n,e),H=Array.isArray,Ke=n=>Tt(n)==="[object Map]",Tr=n=>Tt(n)==="[object Set]",ki=n=>Tt(n)==="[object Date]",B=n=>typeof n=="function",fn=n=>typeof n=="string",ie=n=>typeof n=="symbol",X=n=>n!==null&&typeof n=="object",Sr=n=>(X(n)||B(n))&&B(n.then)&&B(n.catch),Rr=Object.prototype.toString,Tt=n=>Rr.call(n),El=n=>Tt(n).slice(8,-1),Or=n=>Tt(n)==="[object Object]",Ws=n=>fn(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ct=Ks(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),es=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Pl=/-\w/g,On=es(n=>n.replace(Pl,e=>e.slice(1).toUpperCase())),Al=/\B([A-Z])/g,Le=es(n=>n.replace(Al,"-$1").toLowerCase()),ts=es(n=>n.charAt(0).toUpperCase()+n.slice(1)),gs=es(n=>n?`on${ts(n)}`:""),te=(n,e)=>!Object.is(n,e),Lt=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Er=(n,e,t,s=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:s,value:t})},Ys=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Ti;const ss=()=>Ti||(Ti=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Zs(n){if(H(n)){const e={};for(let t=0;t<n.length;t++){const s=n[t],i=fn(s)?Ml(s):Zs(s);if(i)for(const r in i)e[r]=i[r]}return e}else if(fn(n)||X(n))return n}const Cl=/;(?![^(]*\))/g,Nl=/:([^]+)/,Il=/\/\*[^]*?\*\//g;function Ml(n){const e={};return n.replace(Il,"").split(Cl).forEach(t=>{if(t){const s=t.split(Nl);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Hn(n){let e="";if(fn(n))e=n;else if(H(n))for(let t=0;t<n.length;t++){const s=Hn(n[t]);s&&(e+=s+" ")}else if(X(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Ll="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Dl=Ks(Ll);function Pr(n){return!!n||n===""}function jl(n,e){if(n.length!==e.length)return!1;let t=!0;for(let s=0;t&&s<n.length;s++)t=Qs(n[s],e[s]);return t}function Qs(n,e){if(n===e)return!0;let t=ki(n),s=ki(e);if(t||s)return t&&s?n.getTime()===e.getTime():!1;if(t=ie(n),s=ie(e),t||s)return n===e;if(t=H(n),s=H(e),t||s)return t&&s?jl(n,e):!1;if(t=X(n),s=X(e),t||s){if(!t||!s)return!1;const i=Object.keys(n).length,r=Object.keys(e).length;if(i!==r)return!1;for(const o in n){const l=n.hasOwnProperty(o),a=e.hasOwnProperty(o);if(l&&!a||!l&&a||!Qs(n[o],e[o]))return!1}}return String(n)===String(e)}const Ar=n=>!!(n&&n.__v_isRef===!0),bn=n=>fn(n)?n:n==null?"":H(n)||X(n)&&(n.toString===Rr||!B(n.toString))?Ar(n)?bn(n.value):JSON.stringify(n,Cr,2):String(n),Cr=(n,e)=>Ar(e)?Cr(n,e.value):Ke(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[s,i],r)=>(t[$s(s,r)+" =>"]=i,t),{})}:Tr(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>$s(t))}:ie(e)?$s(e):X(e)&&!H(e)&&!Or(e)?String(e):e,$s=(n,e="")=>{var t;return ie(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let _n;class Hl{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&_n&&(_n.active?(this.parent=_n,this.index=(_n.scopes||(_n.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=_n;try{return _n=this,e()}finally{_n=t}}}on(){++this._on===1&&(this.prevScope=_n,_n=this)}off(){if(this._on>0&&--this._on===0){if(_n===this)_n=this.prevScope;else{let e=_n;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,s;for(t=0,s=this.effects.length;t<s;t++)this.effects[t].stop();for(this.effects.length=0,t=0,s=this.cleanups.length;t<s;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function Bl(){return _n}let ln;const ms=new WeakSet;class Nr{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,_n&&(_n.active?_n.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ms.has(this)&&(ms.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Mr(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Si(this),Lr(this);const e=ln,t=Bn;ln=this,Bn=!0;try{return this.fn()}finally{Dr(this),ln=e,Bn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)ei(e);this.deps=this.depsTail=void 0,Si(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ms.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ps(this)&&this.run()}get dirty(){return Ps(this)}}let Ir=0,ut,ft;function Mr(n,e=!1){if(n.flags|=8,e){n.next=ft,ft=n;return}n.next=ut,ut=n}function Xs(){Ir++}function ni(){if(--Ir>0)return;if(ft){let e=ft;for(ft=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;ut;){let e=ut;for(ut=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){n||(n=s)}e=t}}if(n)throw n}function Lr(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Dr(n){let e,t=n.depsTail,s=t;for(;s;){const i=s.prevDep;s.version===-1?(s===t&&(t=i),ei(s),Fl(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}n.deps=e,n.depsTail=t}function Ps(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(jr(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function jr(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===bt)||(n.globalVersion=bt,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Ps(n))))return;n.flags|=2;const e=n.dep,t=ln,s=Bn;ln=n,Bn=!0;try{Lr(n);const i=n.fn(n._value);(e.version===0||te(i,n._value))&&(n.flags|=128,n._value=i,e.version++)}catch(i){throw e.version++,i}finally{ln=t,Bn=s,Dr(n),n.flags&=-3}}function ei(n,e=!1){const{dep:t,prevSub:s,nextSub:i}=n;if(s&&(s.nextSub=i,n.prevSub=void 0),i&&(i.prevSub=s,n.nextSub=void 0),t.subs===n&&(t.subs=s,!s&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)ei(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Fl(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Bn=!0;const Hr=[];function re(){Hr.push(Bn),Bn=!1}function oe(){const n=Hr.pop();Bn=n===void 0?!0:n}function Si(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=ln;ln=void 0;try{e()}finally{ln=t}}}let bt=0;class Ul{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ti{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ln||!Bn||ln===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==ln)t=this.activeLink=new Ul(ln,this),ln.deps?(t.prevDep=ln.depsTail,ln.depsTail.nextDep=t,ln.depsTail=t):ln.deps=ln.depsTail=t,Br(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const s=t.nextDep;s.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=s),t.prevDep=ln.depsTail,t.nextDep=void 0,ln.depsTail.nextDep=t,ln.depsTail=t,ln.deps===t&&(ln.deps=s)}return t}trigger(e){this.version++,bt++,this.notify(e)}notify(e){Xs();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{ni()}}}function Br(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Br(s)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const As=new WeakMap,Ae=Symbol(""),Cs=Symbol(""),vt=Symbol("");function xn(n,e,t){if(Bn&&ln){let s=As.get(n);s||As.set(n,s=new Map);let i=s.get(t);i||(s.set(t,i=new ti),i.map=s,i.key=t),i.track()}}function de(n,e,t,s,i,r){const o=As.get(n);if(!o){bt++;return}const l=a=>{a&&a.trigger()};if(Xs(),e==="clear")o.forEach(l);else{const a=H(n),u=a&&Ws(t);if(a&&t==="length"){const c=Number(s);o.forEach((f,p)=>{(p==="length"||p===vt||!ie(p)&&p>=c)&&l(f)})}else switch((t!==void 0||o.has(void 0))&&l(o.get(t)),u&&l(o.get(vt)),e){case"add":a?u&&l(o.get("length")):(l(o.get(Ae)),Ke(n)&&l(o.get(Cs)));break;case"delete":a||(l(o.get(Ae)),Ke(n)&&l(o.get(Cs)));break;case"set":Ke(n)&&l(o.get(Ae));break}}ni()}function Ue(n){const e=q(n);return e===n?e:(xn(e,"iterate",vt),jn(n)?e:e.map(Un))}function is(n){return xn(n=q(n),"iterate",vt),n}function ne(n,e){return ge(n)?Ye(Ce(n)?Un(e):e):Un(e)}const zl={__proto__:null,[Symbol.iterator](){return _s(this,Symbol.iterator,n=>ne(this,n))},concat(...n){return Ue(this).concat(...n.map(e=>H(e)?Ue(e):e))},entries(){return _s(this,"entries",n=>(n[1]=ne(this,n[1]),n))},every(n,e){return ae(this,"every",n,e,void 0,arguments)},filter(n,e){return ae(this,"filter",n,e,t=>t.map(s=>ne(this,s)),arguments)},find(n,e){return ae(this,"find",n,e,t=>ne(this,t),arguments)},findIndex(n,e){return ae(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ae(this,"findLast",n,e,t=>ne(this,t),arguments)},findLastIndex(n,e){return ae(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ae(this,"forEach",n,e,void 0,arguments)},includes(...n){return bs(this,"includes",n)},indexOf(...n){return bs(this,"indexOf",n)},join(n){return Ue(this).join(n)},lastIndexOf(...n){return bs(this,"lastIndexOf",n)},map(n,e){return ae(this,"map",n,e,void 0,arguments)},pop(){return tt(this,"pop")},push(...n){return tt(this,"push",n)},reduce(n,...e){return Ri(this,"reduce",n,e)},reduceRight(n,...e){return Ri(this,"reduceRight",n,e)},shift(){return tt(this,"shift")},some(n,e){return ae(this,"some",n,e,void 0,arguments)},splice(...n){return tt(this,"splice",n)},toReversed(){return Ue(this).toReversed()},toSorted(n){return Ue(this).toSorted(n)},toSpliced(...n){return Ue(this).toSpliced(...n)},unshift(...n){return tt(this,"unshift",n)},values(){return _s(this,"values",n=>ne(this,n))}};function _s(n,e,t){const s=is(n),i=s[e]();return s!==n&&!jn(n)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=t(r.value)),r}),i}const Vl=Array.prototype;function ae(n,e,t,s,i,r){const o=is(n),l=o!==n&&!jn(n),a=o[e];if(a!==Vl[e]){const f=a.apply(n,r);return l?Un(f):f}let u=t;o!==n&&(l?u=function(f,p){return t.call(this,ne(n,f),p,n)}:t.length>2&&(u=function(f,p){return t.call(this,f,p,n)}));const c=a.call(o,u,s);return l&&i?i(c):c}function Ri(n,e,t,s){const i=is(n),r=i!==n&&!jn(n);let o=t,l=!1;i!==n&&(r?(l=s.length===0,o=function(u,c,f){return l&&(l=!1,u=ne(n,u)),t.call(this,u,ne(n,c),f,n)}):t.length>3&&(o=function(u,c,f){return t.call(this,u,c,f,n)}));const a=i[e](o,...s);return l?ne(n,a):a}function bs(n,e,t){const s=q(n);xn(s,"iterate",vt);const i=s[e](...t);return(i===-1||i===!1)&&ri(t[0])?(t[0]=q(t[0]),s[e](...t)):i}function tt(n,e,t=[]){re(),Xs();const s=q(n)[e].apply(n,t);return ni(),oe(),s}const Gl=Ks("__proto__,__v_isRef,__isVue"),Fr=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ie));function Jl(n){ie(n)||(n=String(n));const e=q(this);return xn(e,"has",n),e.hasOwnProperty(n)}class Ur{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,s){if(t==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return r;if(t==="__v_raw")return s===(i?r?ta:Jr:r?Gr:Vr).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=H(e);if(!i){let a;if(o&&(a=zl[t]))return a;if(t==="hasOwnProperty")return Jl}const l=Reflect.get(e,t,wn(e)?e:s);if((ie(t)?Fr.has(t):Gl(t))||(i||xn(e,"get",t),r))return l;if(wn(l)){const a=o&&Ws(t)?l:l.value;return i&&X(a)?Is(a):a}return X(l)?i?Is(l):rs(l):l}}class zr extends Ur{constructor(e=!1){super(!1,e)}set(e,t,s,i){let r=e[t];const o=H(e)&&Ws(t);if(!this._isShallow){const u=ge(r);if(!jn(s)&&!ge(s)&&(r=q(r),s=q(s)),!o&&wn(r)&&!wn(s))return u||(r.value=s),!0}const l=o?Number(t)<e.length:W(e,t),a=Reflect.set(e,t,s,wn(e)?e:i);return e===q(i)&&a&&(l?te(s,r)&&de(e,"set",t,s):de(e,"add",t,s)),a}deleteProperty(e,t){const s=W(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&s&&de(e,"delete",t,void 0),i}has(e,t){const s=Reflect.has(e,t);return(!ie(t)||!Fr.has(t))&&xn(e,"has",t),s}ownKeys(e){return xn(e,"iterate",H(e)?"length":Ae),Reflect.ownKeys(e)}}class Kl extends Ur{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const ql=new zr,Wl=new Kl,Yl=new zr(!0);const Ns=n=>n,At=n=>Reflect.getPrototypeOf(n);function Zl(n,e,t){return function(...s){const i=this.__v_raw,r=q(i),o=Ke(r),l=n==="entries"||n===Symbol.iterator&&o,a=n==="keys"&&o,u=i[n](...s),c=t?Ns:e?Ye:Un;return!e&&xn(r,"iterate",a?Cs:Ae),vn(Object.create(u),{next(){const{value:f,done:p}=u.next();return p?{value:f,done:p}:{value:l?[c(f[0]),c(f[1])]:c(f),done:p}}})}}function Ct(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Ql(n,e){const t={get(i){const r=this.__v_raw,o=q(r),l=q(i);n||(te(i,l)&&xn(o,"get",i),xn(o,"get",l));const{has:a}=At(o),u=e?Ns:n?Ye:Un;if(a.call(o,i))return u(r.get(i));if(a.call(o,l))return u(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!n&&xn(q(i),"iterate",Ae),i.size},has(i){const r=this.__v_raw,o=q(r),l=q(i);return n||(te(i,l)&&xn(o,"has",i),xn(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,a=q(l),u=e?Ns:n?Ye:Un;return!n&&xn(a,"iterate",Ae),l.forEach((c,f)=>i.call(r,u(c),u(f),o))}};return vn(t,n?{add:Ct("add"),set:Ct("set"),delete:Ct("delete"),clear:Ct("clear")}:{add(i){const r=q(this),o=At(r),l=q(i),a=!e&&!jn(i)&&!ge(i)?l:i;return o.has.call(r,a)||te(i,a)&&o.has.call(r,i)||te(l,a)&&o.has.call(r,l)||(r.add(a),de(r,"add",a,a)),this},set(i,r){!e&&!jn(r)&&!ge(r)&&(r=q(r));const o=q(this),{has:l,get:a}=At(o);let u=l.call(o,i);u||(i=q(i),u=l.call(o,i));const c=a.call(o,i);return o.set(i,r),u?te(r,c)&&de(o,"set",i,r):de(o,"add",i,r),this},delete(i){const r=q(this),{has:o,get:l}=At(r);let a=o.call(r,i);a||(i=q(i),a=o.call(r,i)),l&&l.call(r,i);const u=r.delete(i);return a&&de(r,"delete",i,void 0),u},clear(){const i=q(this),r=i.size!==0,o=i.clear();return r&&de(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=Zl(i,n,e)}),t}function si(n,e){const t=Ql(n,e);return(s,i,r)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?s:Reflect.get(W(t,i)&&i in s?t:s,i,r)}const Xl={get:si(!1,!1)},na={get:si(!1,!0)},ea={get:si(!0,!1)};const Vr=new WeakMap,Gr=new WeakMap,Jr=new WeakMap,ta=new WeakMap;function sa(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function rs(n){return ge(n)?n:ii(n,!1,ql,Xl,Vr)}function Kr(n){return ii(n,!1,Yl,na,Gr)}function Is(n){return ii(n,!0,Wl,ea,Jr)}function ii(n,e,t,s,i){if(!X(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=i.get(n);if(r)return r;const o=sa(El(n));if(o===0)return n;const l=new Proxy(n,o===2?s:t);return i.set(n,l),l}function Ce(n){return ge(n)?Ce(n.__v_raw):!!(n&&n.__v_isReactive)}function ge(n){return!!(n&&n.__v_isReadonly)}function jn(n){return!!(n&&n.__v_isShallow)}function ri(n){return n?!!n.__v_raw:!1}function q(n){const e=n&&n.__v_raw;return e?q(e):n}function ia(n){return!W(n,"__v_skip")&&Object.isExtensible(n)&&Er(n,"__v_skip",!0),n}const Un=n=>X(n)?rs(n):n,Ye=n=>X(n)?Is(n):n;function wn(n){return n?n.__v_isRef===!0:!1}function pe(n){return qr(n,!1)}function ra(n){return qr(n,!0)}function qr(n,e){return wn(n)?n:new oa(n,e)}class oa{constructor(e,t){this.dep=new ti,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:q(e),this._value=t?e:Un(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,s=this.__v_isShallow||jn(e)||ge(e);e=s?e:q(e),te(e,t)&&(this._rawValue=e,this._value=s?e:Un(e),this.dep.trigger())}}function hn(n){return wn(n)?n.value:n}const la={get:(n,e,t)=>e==="__v_raw"?n:hn(Reflect.get(n,e,t)),set:(n,e,t,s)=>{const i=n[e];return wn(i)&&!wn(t)?(i.value=t,!0):Reflect.set(n,e,t,s)}};function Wr(n){return Ce(n)?n:new Proxy(n,la)}class aa{constructor(e,t,s){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ti(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=bt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ln!==this)return Mr(this,!0),!0}get value(){const e=this.dep.track();return jr(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ca(n,e,t=!1){let s,i;return B(n)?s=n:(s=n.get,i=n.set),new aa(s,i,t)}const Nt={},Ft=new WeakMap;let Oe;function ua(n,e=!1,t=Oe){if(t){let s=Ft.get(t);s||Ft.set(t,s=[]),s.push(n)}}function fa(n,e,t=on){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:a}=t,u=A=>i?A:jn(A)||i===!1||i===0?he(A,1):he(A);let c,f,p,g,y=!1,w=!1;if(wn(n)?(f=()=>n.value,y=jn(n)):Ce(n)?(f=()=>u(n),y=!0):H(n)?(w=!0,y=n.some(A=>Ce(A)||jn(A)),f=()=>n.map(A=>{if(wn(A))return A.value;if(Ce(A))return u(A);if(B(A))return a?a(A,2):A()})):B(n)?e?f=a?()=>a(n,2):n:f=()=>{if(p){re();try{p()}finally{oe()}}const A=Oe;Oe=c;try{return a?a(n,3,[g]):n(g)}finally{Oe=A}}:f=se,e&&i){const A=f,Y=i===!0?1/0:i;f=()=>he(A(),Y)}const N=Bl(),L=()=>{c.stop(),N&&N.active&&qs(N.effects,c)};if(r&&e){const A=e;e=(...Y)=>{const an=A(...Y);return L(),an}}let E=w?new Array(n.length).fill(Nt):Nt;const C=A=>{if(!(!(c.flags&1)||!c.dirty&&!A))if(e){const Y=c.run();if(A||i||y||(w?Y.some((an,Z)=>te(an,E[Z])):te(Y,E))){p&&p();const an=Oe;Oe=c;try{const Z=[Y,E===Nt?void 0:w&&E[0]===Nt?[]:E,g];E=Y,a?a(e,3,Z):e(...Z)}finally{Oe=an}}}else c.run()};return l&&l(C),c=new Nr(f),c.scheduler=o?()=>o(C,!1):C,g=A=>ua(A,!1,c),p=c.onStop=()=>{const A=Ft.get(c);if(A){if(a)a(A,4);else for(const Y of A)Y();Ft.delete(c)}},e?s?C(!0):E=c.run():o?o(C.bind(null,!0),!0):c.run(),L.pause=c.pause.bind(c),L.resume=c.resume.bind(c),L.stop=L,L}function he(n,e=1/0,t){if(e<=0||!X(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,wn(n))he(n.value,e,t);else if(H(n))for(let s=0;s<n.length;s++)he(n[s],e,t);else if(Tr(n)||Ke(n))n.forEach(s=>{he(s,e,t)});else if(Or(n)){for(const s in n)he(n[s],e,t);for(const s of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,s)&&he(n[s],e,t)}return n}/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function St(n,e,t,s){try{return s?n(...s):n()}catch(i){os(i,e,t)}}function zn(n,e,t,s){if(B(n)){const i=St(n,e,t,s);return i&&Sr(i)&&i.catch(r=>{os(r,e,t)}),i}if(H(n)){const i=[];for(let r=0;r<n.length;r++)i.push(zn(n[r],e,t,s));return i}}function os(n,e,t,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||on;if(e){let l=e.parent;const a=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const c=l.ec;if(c){for(let f=0;f<c.length;f++)if(c[f](n,a,u)===!1)return}l=l.parent}if(r){re(),St(r,null,10,[n,a,u]),oe();return}}da(n,t,i,s,o)}function da(n,e,t,s=!0,i=!1){if(i)throw n;console.error(n)}const Sn=[];let Xn=-1;const qe=[];let xe=null,ze=0;const Yr=Promise.resolve();let Ut=null;function Rt(n){const e=Ut||Yr;return n?e.then(this?n.bind(this):n):e}function ha(n){let e=Xn+1,t=Sn.length;for(;e<t;){const s=e+t>>>1,i=Sn[s],r=xt(i);r<n||r===n&&i.flags&2?e=s+1:t=s}return e}function oi(n){if(!(n.flags&1)){const e=xt(n),t=Sn[Sn.length-1];!t||!(n.flags&2)&&e>=xt(t)?Sn.push(n):Sn.splice(ha(e),0,n),n.flags|=1,Zr()}}function Zr(){Ut||(Ut=Yr.then(Xr))}function pa(n){H(n)?qe.push(...n):xe&&n.id===-1?xe.splice(ze+1,0,n):n.flags&1||(qe.push(n),n.flags|=1),Zr()}function Oi(n,e,t=Xn+1){for(;t<Sn.length;t++){const s=Sn[t];if(s&&s.flags&2){if(n&&s.id!==n.uid)continue;Sn.splice(t,1),t--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Qr(n){if(qe.length){const e=[...new Set(qe)].sort((t,s)=>xt(t)-xt(s));if(qe.length=0,xe){xe.push(...e);return}for(xe=e,ze=0;ze<xe.length;ze++){const t=xe[ze];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}xe=null,ze=0}}const xt=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Xr(n){try{for(Xn=0;Xn<Sn.length;Xn++){const e=Sn[Xn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),St(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Xn<Sn.length;Xn++){const e=Sn[Xn];e&&(e.flags&=-2)}Xn=-1,Sn.length=0,Qr(),Ut=null,(Sn.length||qe.length)&&Xr()}}let Nn=null,no=null;function zt(n){const e=Nn;return Nn=n,no=n&&n.type.__scopeId||null,e}function ga(n,e=Nn,t){if(!e||n._n)return n;const s=(...i)=>{s._d&&Jt(-1);const r=zt(e);let o;try{o=n(...i)}finally{zt(r),s._d&&Jt(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function $a(n,e){if(Nn===null)return n;const t=us(Nn),s=n.dirs||(n.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,a=on]=e[i];r&&(B(r)&&(r={mounted:r,updated:r}),r.deep&&he(o),s.push({dir:r,instance:t,value:o,oldValue:void 0,arg:l,modifiers:a}))}return n}function Se(n,e,t,s){const i=n.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let a=l.dir[s];a&&(re(),zn(a,t,8,[n.el,l,n,e]),oe())}}function Dt(n,e){if(yn){let t=yn.provides;const s=yn.parent&&yn.parent.provides;s===t&&(t=yn.provides=Object.create(s)),t[n]=e}}function Fn(n,e,t=!1){const s=bc();if(s||We){let i=We?We._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&n in i)return i[n];if(arguments.length>1)return t&&B(e)?e.call(s&&s.proxy):e}}const ma=Symbol.for("v-scx"),_a=()=>Fn(ma);function ba(n,e){return li(n,null,e)}function Ne(n,e,t){return li(n,e,t)}function li(n,e,t=on){const{immediate:s,deep:i,flush:r,once:o}=t,l=vn({},t),a=e&&s||!e&&r!=="post";let u;if(wt){if(r==="sync"){const g=_a();u=g.__watcherHandles||(g.__watcherHandles=[])}else if(!a){const g=()=>{};return g.stop=se,g.resume=se,g.pause=se,g}}const c=yn;l.call=(g,y,w)=>zn(g,c,y,w);let f=!1;r==="post"?l.scheduler=g=>{Pn(g,c&&c.suspense)}:r!=="sync"&&(f=!0,l.scheduler=(g,y)=>{y?g():oi(g)}),l.augmentJob=g=>{e&&(g.flags|=4),f&&(g.flags|=2,c&&(g.id=c.uid,g.i=c))};const p=fa(n,e,l);return wt&&(u?u.push(p):a&&p()),p}function va(n,e,t){const s=this.proxy,i=fn(n)?n.includes(".")?eo(s,n):()=>s[n]:n.bind(s,s);let r;B(e)?r=e:(r=e.handler,t=e);const o=Ot(this),l=li(i,r.bind(s),t);return o(),l}function eo(n,e){const t=e.split(".");return()=>{let s=n;for(let i=0;i<t.length&&s;i++)s=s[t[i]];return s}}const xa=Symbol("_vte"),ya=n=>n.__isTeleport,vs=Symbol("_leaveCb");function ai(n,e){n.shapeFlag&6&&n.component?(n.transition=e,ai(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function to(n,e){return B(n)?vn({name:n.name},e,{setup:n}):n}function so(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Ei(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const Vt=new WeakMap;function dt(n,e,t,s,i=!1){if(H(n)){n.forEach((w,N)=>dt(w,e&&(H(e)?e[N]:e),t,s,i));return}if(ht(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&dt(n,e,t,s.component.subTree);return}const r=s.shapeFlag&4?us(s.component):s.el,o=i?null:r,{i:l,r:a}=n,u=e&&e.r,c=l.refs===on?l.refs={}:l.refs,f=l.setupState,p=q(f),g=f===on?kr:w=>Ei(c,w)?!1:W(p,w),y=(w,N)=>!(N&&Ei(c,N));if(u!=null&&u!==a){if(Pi(e),fn(u))c[u]=null,g(u)&&(f[u]=null);else if(wn(u)){const w=e;y(u,w.k)&&(u.value=null),w.k&&(c[w.k]=null)}}if(B(a)){re();try{St(a,l,12,[o,c])}finally{oe()}}else{const w=fn(a),N=wn(a);if(w||N){const L=()=>{if(n.f){const E=w?g(a)?f[a]:c[a]:y()||!n.k?a.value:c[n.k];if(i)H(E)&&qs(E,r);else if(H(E))E.includes(r)||E.push(r);else if(w)c[a]=[r],g(a)&&(f[a]=c[a]);else{const C=[r];y(a,n.k)&&(a.value=C),n.k&&(c[n.k]=C)}}else w?(c[a]=o,g(a)&&(f[a]=o)):N&&(y(a,n.k)&&(a.value=o),n.k&&(c[n.k]=o))};if(o){const E=()=>{L(),Vt.delete(n)};E.id=-1,Vt.set(n,E),Pn(E,t)}else Pi(n),L()}}}function Pi(n){const e=Vt.get(n);e&&(e.flags|=8,Vt.delete(n))}ss().requestIdleCallback;ss().cancelIdleCallback;const ht=n=>!!n.type.__asyncLoader,io=n=>n.type.__isKeepAlive;function wa(n,e){ro(n,"a",e)}function ka(n,e){ro(n,"da",e)}function ro(n,e,t=yn){const s=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(ls(e,s,t),t){let i=t.parent;for(;i&&i.parent;)io(i.parent.vnode)&&Ta(s,e,t,i),i=i.parent}}function Ta(n,e,t,s){const i=ls(e,n,s,!0);ci(()=>{qs(s[e],i)},t)}function ls(n,e,t=yn,s=!1){if(t){const i=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{re();const l=Ot(t),a=zn(e,t,n,o);return l(),oe(),a});return s?i.unshift(r):i.push(r),r}}const $e=n=>(e,t=yn)=>{(!wt||n==="sp")&&ls(n,(...s)=>e(...s),t)},Sa=$e("bm"),oo=$e("m"),Ra=$e("bu"),Oa=$e("u"),Ea=$e("bum"),ci=$e("um"),Pa=$e("sp"),Aa=$e("rtg"),Ca=$e("rtc");function Na(n,e=yn){ls("ec",n,e)}const Ia="components";function Ma(n,e){return Da(Ia,n,!0,e)||n}const La=Symbol.for("v-ndc");function Da(n,e,t=!0,s=!1){const i=Nn||yn;if(i){const r=i.type;{const l=kc(r,!1);if(l&&(l===e||l===On(e)||l===ts(On(e))))return r}const o=Ai(i[n]||r[n],e)||Ai(i.appContext[n],e);return!o&&s?r:o}}function Ai(n,e){return n&&(n[e]||n[On(e)]||n[ts(On(e))])}function Ee(n,e,t,s){let i;const r=t,o=H(n);if(o||fn(n)){const l=o&&Ce(n);let a=!1,u=!1;l&&(a=!jn(n),u=ge(n),n=is(n)),i=new Array(n.length);for(let c=0,f=n.length;c<f;c++)i[c]=e(a?u?Ye(Un(n[c])):Un(n[c]):n[c],c,void 0,r)}else if(typeof n=="number"){i=new Array(n);for(let l=0;l<n;l++)i[l]=e(l+1,l,void 0,r)}else if(X(n))if(n[Symbol.iterator])i=Array.from(n,(l,a)=>e(l,a,void 0,r));else{const l=Object.keys(n);i=new Array(l.length);for(let a=0,u=l.length;a<u;a++){const c=l[a];i[a]=e(n[c],c,a,r)}}else i=[];return i}const Ms=n=>n?Oo(n)?us(n):Ms(n.parent):null,pt=vn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ms(n.parent),$root:n=>Ms(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>ao(n),$forceUpdate:n=>n.f||(n.f=()=>{oi(n.update)}),$nextTick:n=>n.n||(n.n=Rt.bind(n.proxy)),$watch:n=>va.bind(n)}),xs=(n,e)=>n!==on&&!n.__isScriptSetup&&W(n,e),ja={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:a}=n;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return i[e];case 4:return t[e];case 3:return r[e]}else{if(xs(s,e))return o[e]=1,s[e];if(i!==on&&W(i,e))return o[e]=2,i[e];if(W(r,e))return o[e]=3,r[e];if(t!==on&&W(t,e))return o[e]=4,t[e];Ls&&(o[e]=0)}}const u=pt[e];let c,f;if(u)return e==="$attrs"&&xn(n.attrs,"get",""),u(n);if((c=l.__cssModules)&&(c=c[e]))return c;if(t!==on&&W(t,e))return o[e]=4,t[e];if(f=a.config.globalProperties,W(f,e))return f[e]},set({_:n},e,t){const{data:s,setupState:i,ctx:r}=n;return xs(i,e)?(i[e]=t,!0):s!==on&&W(s,e)?(s[e]=t,!0):W(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:s,appContext:i,props:r,type:o}},l){let a;return!!(t[l]||n!==on&&l[0]!=="$"&&W(n,l)||xs(e,l)||W(r,l)||W(s,l)||W(pt,l)||W(i.config.globalProperties,l)||(a=o.__cssModules)&&a[l])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:W(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Ci(n){return H(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Ls=!0;function Ha(n){const e=ao(n),t=n.proxy,s=n.ctx;Ls=!1,e.beforeCreate&&Ni(e.beforeCreate,n,"bc");const{data:i,computed:r,methods:o,watch:l,provide:a,inject:u,created:c,beforeMount:f,mounted:p,beforeUpdate:g,updated:y,activated:w,deactivated:N,beforeDestroy:L,beforeUnmount:E,destroyed:C,unmounted:A,render:Y,renderTracked:an,renderTriggered:Z,errorCaptured:Gn,serverPrefetch:me,expose:Jn,inheritAttrs:_e,components:ke,directives:Kn,filters:nt}=e;if(u&&Ba(u,s,null),o)for(const nn in o){const J=o[nn];B(J)&&(s[nn]=J.bind(t))}if(i){const nn=i.call(t,t);X(nn)&&(n.data=rs(nn))}if(Ls=!0,r)for(const nn in r){const J=r[nn],le=B(J)?J.bind(t,t):B(J.get)?J.get.bind(t,t):se,be=!B(J)&&B(J.set)?J.set.bind(t):se,qn=Rn({get:le,set:be});Object.defineProperty(s,nn,{enumerable:!0,configurable:!0,get:()=>qn.value,set:En=>qn.value=En})}if(l)for(const nn in l)lo(l[nn],s,t,nn);if(a){const nn=B(a)?a.call(t):a;Reflect.ownKeys(nn).forEach(J=>{Dt(J,nn[J])})}c&&Ni(c,n,"c");function $n(nn,J){H(J)?J.forEach(le=>nn(le.bind(t))):J&&nn(J.bind(t))}if($n(Sa,f),$n(oo,p),$n(Ra,g),$n(Oa,y),$n(wa,w),$n(ka,N),$n(Na,Gn),$n(Ca,an),$n(Aa,Z),$n(Ea,E),$n(ci,A),$n(Pa,me),H(Jn))if(Jn.length){const nn=n.exposed||(n.exposed={});Jn.forEach(J=>{Object.defineProperty(nn,J,{get:()=>t[J],set:le=>t[J]=le,enumerable:!0})})}else n.exposed||(n.exposed={});Y&&n.render===se&&(n.render=Y),_e!=null&&(n.inheritAttrs=_e),ke&&(n.components=ke),Kn&&(n.directives=Kn),me&&so(n)}function Ba(n,e,t=se){H(n)&&(n=Ds(n));for(const s in n){const i=n[s];let r;X(i)?"default"in i?r=Fn(i.from||s,i.default,!0):r=Fn(i.from||s):r=Fn(i),wn(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function Ni(n,e,t){zn(H(n)?n.map(s=>s.bind(e.proxy)):n.bind(e.proxy),e,t)}function lo(n,e,t,s){let i=s.includes(".")?eo(t,s):()=>t[s];if(fn(n)){const r=e[n];B(r)&&Ne(i,r)}else if(B(n))Ne(i,n.bind(t));else if(X(n))if(H(n))n.forEach(r=>lo(r,e,t,s));else{const r=B(n.handler)?n.handler.bind(t):e[n.handler];B(r)&&Ne(i,r,n)}}function ao(n){const e=n.type,{mixins:t,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,l=r.get(e);let a;return l?a=l:!i.length&&!t&&!s?a=e:(a={},i.length&&i.forEach(u=>Gt(a,u,o,!0)),Gt(a,e,o)),X(e)&&r.set(e,a),a}function Gt(n,e,t,s=!1){const{mixins:i,extends:r}=e;r&&Gt(n,r,t,!0),i&&i.forEach(o=>Gt(n,o,t,!0));for(const o in e)if(!(s&&o==="expose")){const l=Fa[o]||t&&t[o];n[o]=l?l(n[o],e[o]):e[o]}return n}const Fa={data:Ii,props:Mi,emits:Mi,methods:lt,computed:lt,beforeCreate:kn,created:kn,beforeMount:kn,mounted:kn,beforeUpdate:kn,updated:kn,beforeDestroy:kn,beforeUnmount:kn,destroyed:kn,unmounted:kn,activated:kn,deactivated:kn,errorCaptured:kn,serverPrefetch:kn,components:lt,directives:lt,watch:za,provide:Ii,inject:Ua};function Ii(n,e){return e?n?function(){return vn(B(n)?n.call(this,this):n,B(e)?e.call(this,this):e)}:e:n}function Ua(n,e){return lt(Ds(n),Ds(e))}function Ds(n){if(H(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function kn(n,e){return n?[...new Set([].concat(n,e))]:e}function lt(n,e){return n?vn(Object.create(null),n,e):e}function Mi(n,e){return n?H(n)&&H(e)?[...new Set([...n,...e])]:vn(Object.create(null),Ci(n),Ci(e??{})):e}function za(n,e){if(!n)return e;if(!e)return n;const t=vn(Object.create(null),n);for(const s in e)t[s]=kn(n[s],e[s]);return t}function co(){return{app:null,config:{isNativeTag:kr,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Va=0;function Ga(n,e){return function(s,i=null){B(s)||(s=vn({},s)),i!=null&&!X(i)&&(i=null);const r=co(),o=new WeakSet,l=[];let a=!1;const u=r.app={_uid:Va++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:Sc,get config(){return r.config},set config(c){},use(c,...f){return o.has(c)||(c&&B(c.install)?(o.add(c),c.install(u,...f)):B(c)&&(o.add(c),c(u,...f))),u},mixin(c){return r.mixins.includes(c)||r.mixins.push(c),u},component(c,f){return f?(r.components[c]=f,u):r.components[c]},directive(c,f){return f?(r.directives[c]=f,u):r.directives[c]},mount(c,f,p){if(!a){const g=u._ceVNode||gn(s,i);return g.appContext=r,p===!0?p="svg":p===!1&&(p=void 0),n(g,c,p),a=!0,u._container=c,c.__vue_app__=u,us(g.component)}},onUnmount(c){l.push(c)},unmount(){a&&(zn(l,u._instance,16),n(null,u._container),delete u._container.__vue_app__)},provide(c,f){return r.provides[c]=f,u},runWithContext(c){const f=We;We=u;try{return c()}finally{We=f}}};return u}}let We=null;const Ja=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${On(e)}Modifiers`]||n[`${Le(e)}Modifiers`];function Ka(n,e,...t){if(n.isUnmounted)return;const s=n.vnode.props||on;let i=t;const r=e.startsWith("update:"),o=r&&Ja(s,e.slice(7));o&&(o.trim&&(i=t.map(c=>fn(c)?c.trim():c)),o.number&&(i=t.map(Ys)));let l,a=s[l=gs(e)]||s[l=gs(On(e))];!a&&r&&(a=s[l=gs(Le(e))]),a&&zn(a,n,6,i);const u=s[l+"Once"];if(u){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,zn(u,n,6,i)}}const qa=new WeakMap;function uo(n,e,t=!1){const s=t?qa:e.emitsCache,i=s.get(n);if(i!==void 0)return i;const r=n.emits;let o={},l=!1;if(!B(n)){const a=u=>{const c=uo(u,e,!0);c&&(l=!0,vn(o,c))};!t&&e.mixins.length&&e.mixins.forEach(a),n.extends&&a(n.extends),n.mixins&&n.mixins.forEach(a)}return!r&&!l?(X(n)&&s.set(n,null),null):(H(r)?r.forEach(a=>o[a]=null):vn(o,r),X(n)&&s.set(n,o),o)}function as(n,e){return!n||!Xt(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),W(n,e[0].toLowerCase()+e.slice(1))||W(n,Le(e))||W(n,e))}function Li(n){const{type:e,vnode:t,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:a,render:u,renderCache:c,props:f,data:p,setupState:g,ctx:y,inheritAttrs:w}=n,N=zt(n);let L,E;try{if(t.shapeFlag&4){const A=i||s,Y=A;L=ee(u.call(Y,A,c,f,g,p,y)),E=l}else{const A=e;L=ee(A.length>1?A(f,{attrs:l,slots:o,emit:a}):A(f,null)),E=e.props?l:Wa(l)}}catch(A){gt.length=0,os(A,n,1),L=gn(we)}let C=L;if(E&&w!==!1){const A=Object.keys(E),{shapeFlag:Y}=C;A.length&&Y&7&&(r&&A.some(ns)&&(E=Ya(E,r)),C=Ze(C,E,!1,!0))}return t.dirs&&(C=Ze(C,null,!1,!0),C.dirs=C.dirs?C.dirs.concat(t.dirs):t.dirs),t.transition&&ai(C,t.transition),L=C,zt(N),L}const Wa=n=>{let e;for(const t in n)(t==="class"||t==="style"||Xt(t))&&((e||(e={}))[t]=n[t]);return e},Ya=(n,e)=>{const t={};for(const s in n)(!ns(s)||!(s.slice(9)in e))&&(t[s]=n[s]);return t};function Za(n,e,t){const{props:s,children:i,component:r}=n,{props:o,children:l,patchFlag:a}=e,u=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&a>=0){if(a&1024)return!0;if(a&16)return s?Di(s,o,u):!!o;if(a&8){const c=e.dynamicProps;for(let f=0;f<c.length;f++){const p=c[f];if(fo(o,s,p)&&!as(u,p))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Di(s,o,u):!0:!!o;return!1}function Di(n,e,t){const s=Object.keys(e);if(s.length!==Object.keys(n).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(fo(e,n,r)&&!as(t,r))return!0}return!1}function fo(n,e,t){const s=n[t],i=e[t];return t==="style"&&X(s)&&X(i)?!Qs(s,i):s!==i}function Qa({vnode:n,parent:e,suspense:t},s){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.suspense.vnode.el=i.el=s,n=i),i===n)(n=e.vnode).el=s,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=s)}const ho={},po=()=>Object.create(ho),go=n=>Object.getPrototypeOf(n)===ho;function Xa(n,e,t,s=!1){const i={},r=po();n.propsDefaults=Object.create(null),$o(n,e,i,r);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=s?i:Kr(i):n.type.props?n.props=i:n.props=r,n.attrs=r}function nc(n,e,t,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=n,l=q(i),[a]=n.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const c=n.vnode.dynamicProps;for(let f=0;f<c.length;f++){let p=c[f];if(as(n.emitsOptions,p))continue;const g=e[p];if(a)if(W(r,p))g!==r[p]&&(r[p]=g,u=!0);else{const y=On(p);i[y]=js(a,l,y,g,n,!1)}else g!==r[p]&&(r[p]=g,u=!0)}}}else{$o(n,e,i,r)&&(u=!0);let c;for(const f in l)(!e||!W(e,f)&&((c=Le(f))===f||!W(e,c)))&&(a?t&&(t[f]!==void 0||t[c]!==void 0)&&(i[f]=js(a,l,f,void 0,n,!0)):delete i[f]);if(r!==l)for(const f in r)(!e||!W(e,f))&&(delete r[f],u=!0)}u&&de(n.attrs,"set","")}function $o(n,e,t,s){const[i,r]=n.propsOptions;let o=!1,l;if(e)for(let a in e){if(ct(a))continue;const u=e[a];let c;i&&W(i,c=On(a))?!r||!r.includes(c)?t[c]=u:(l||(l={}))[c]=u:as(n.emitsOptions,a)||(!(a in s)||u!==s[a])&&(s[a]=u,o=!0)}if(r){const a=q(t),u=l||on;for(let c=0;c<r.length;c++){const f=r[c];t[f]=js(i,a,f,u[f],n,!W(u,f))}}return o}function js(n,e,t,s,i,r){const o=n[t];if(o!=null){const l=W(o,"default");if(l&&s===void 0){const a=o.default;if(o.type!==Function&&!o.skipFactory&&B(a)){const{propsDefaults:u}=i;if(t in u)s=u[t];else{const c=Ot(i);s=u[t]=a.call(null,e),c()}}else s=a;i.ce&&i.ce._setProp(t,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===Le(t))&&(s=!0))}return s}const ec=new WeakMap;function mo(n,e,t=!1){const s=t?ec:e.propsCache,i=s.get(n);if(i)return i;const r=n.props,o={},l=[];let a=!1;if(!B(n)){const c=f=>{a=!0;const[p,g]=mo(f,e,!0);vn(o,p),g&&l.push(...g)};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}if(!r&&!a)return X(n)&&s.set(n,Je),Je;if(H(r))for(let c=0;c<r.length;c++){const f=On(r[c]);ji(f)&&(o[f]=on)}else if(r)for(const c in r){const f=On(c);if(ji(f)){const p=r[c],g=o[f]=H(p)||B(p)?{type:p}:vn({},p),y=g.type;let w=!1,N=!0;if(H(y))for(let L=0;L<y.length;++L){const E=y[L],C=B(E)&&E.name;if(C==="Boolean"){w=!0;break}else C==="String"&&(N=!1)}else w=B(y)&&y.name==="Boolean";g[0]=w,g[1]=N,(w||W(g,"default"))&&l.push(f)}}const u=[o,l];return X(n)&&s.set(n,u),u}function ji(n){return n[0]!=="$"&&!ct(n)}const ui=n=>n==="_"||n==="_ctx"||n==="$stable",fi=n=>H(n)?n.map(ee):[ee(n)],tc=(n,e,t)=>{if(e._n)return e;const s=ga((...i)=>fi(e(...i)),t);return s._c=!1,s},_o=(n,e,t)=>{const s=n._ctx;for(const i in n){if(ui(i))continue;const r=n[i];if(B(r))e[i]=tc(i,r,s);else if(r!=null){const o=fi(r);e[i]=()=>o}}},bo=(n,e)=>{const t=fi(e);n.slots.default=()=>t},vo=(n,e,t)=>{for(const s in e)(t||!ui(s))&&(n[s]=e[s])},sc=(n,e,t)=>{const s=n.slots=po();if(n.vnode.shapeFlag&32){const i=e._;i?(vo(s,e,t),t&&Er(s,"_",i,!0)):_o(e,s)}else e&&bo(n,e)},ic=(n,e,t)=>{const{vnode:s,slots:i}=n;let r=!0,o=on;if(s.shapeFlag&32){const l=e._;l?t&&l===1?r=!1:vo(i,e,t):(r=!e.$stable,_o(e,i)),o=e}else e&&(bo(n,e),o={default:1});if(r)for(const l in i)!ui(l)&&o[l]==null&&delete i[l]},Pn=cc;function rc(n){return oc(n)}function oc(n,e){const t=ss();t.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:a,setText:u,setElementText:c,parentNode:f,nextSibling:p,setScopeId:g=se,insertStaticContent:y}=n,w=(d,h,$,_=null,v=null,m=null,S=void 0,T=null,k=!!h.dynamicChildren)=>{if(d===h)return;d&&!st(d,h)&&(_=b(d),En(d,v,m,!0),d=null),h.patchFlag===-2&&(k=!1,h.dynamicChildren=null);const{type:x,ref:D,shapeFlag:O}=h;switch(x){case cs:N(d,h,$,_);break;case we:L(d,h,$,_);break;case jt:d==null&&E(h,$,_,S);break;case cn:ke(d,h,$,_,v,m,S,T,k);break;default:O&1?Y(d,h,$,_,v,m,S,T,k):O&6?Kn(d,h,$,_,v,m,S,T,k):(O&64||O&128)&&x.process(d,h,$,_,v,m,S,T,k,I)}D!=null&&v?dt(D,d&&d.ref,m,h||d,!h):D==null&&d&&d.ref!=null&&dt(d.ref,null,m,d,!0)},N=(d,h,$,_)=>{if(d==null)s(h.el=l(h.children),$,_);else{const v=h.el=d.el;h.children!==d.children&&u(v,h.children)}},L=(d,h,$,_)=>{d==null?s(h.el=a(h.children||""),$,_):h.el=d.el},E=(d,h,$,_)=>{[d.el,d.anchor]=y(d.children,h,$,_,d.el,d.anchor)},C=({el:d,anchor:h},$,_)=>{let v;for(;d&&d!==h;)v=p(d),s(d,$,_),d=v;s(h,$,_)},A=({el:d,anchor:h})=>{let $;for(;d&&d!==h;)$=p(d),i(d),d=$;i(h)},Y=(d,h,$,_,v,m,S,T,k)=>{if(h.type==="svg"?S="svg":h.type==="math"&&(S="mathml"),d==null)an(h,$,_,v,m,S,T,k);else{const x=d.el&&d.el._isVueCE?d.el:null;try{x&&x._beginPatch(),me(d,h,v,m,S,T,k)}finally{x&&x._endPatch()}}},an=(d,h,$,_,v,m,S,T)=>{let k,x;const{props:D,shapeFlag:O,transition:M,dirs:j}=d;if(k=d.el=o(d.type,m,D&&D.is,D),O&8?c(k,d.children):O&16&&Gn(d.children,k,null,_,v,ys(d,m),S,T),j&&Se(d,null,_,"created"),Z(k,d,d.scopeId,S,_),D){for(const sn in D)sn!=="value"&&!ct(sn)&&r(k,sn,null,D[sn],m,_);"value"in D&&r(k,"value",null,D.value,m),(x=D.onVnodeBeforeMount)&&Qn(x,_,d)}j&&Se(d,null,_,"beforeMount");const G=lc(v,M);G&&M.beforeEnter(k),s(k,h,$),((x=D&&D.onVnodeMounted)||G||j)&&Pn(()=>{try{x&&Qn(x,_,d),G&&M.enter(k),j&&Se(d,null,_,"mounted")}finally{}},v)},Z=(d,h,$,_,v)=>{if($&&g(d,$),_)for(let m=0;m<_.length;m++)g(d,_[m]);if(v){let m=v.subTree;if(h===m||ko(m.type)&&(m.ssContent===h||m.ssFallback===h)){const S=v.vnode;Z(d,S,S.scopeId,S.slotScopeIds,v.parent)}}},Gn=(d,h,$,_,v,m,S,T,k=0)=>{for(let x=k;x<d.length;x++){const D=d[x]=T?fe(d[x]):ee(d[x]);w(null,D,h,$,_,v,m,S,T)}},me=(d,h,$,_,v,m,S)=>{const T=h.el=d.el;let{patchFlag:k,dynamicChildren:x,dirs:D}=h;k|=d.patchFlag&16;const O=d.props||on,M=h.props||on;let j;if($&&Re($,!1),(j=M.onVnodeBeforeUpdate)&&Qn(j,$,h,d),D&&Se(h,d,$,"beforeUpdate"),$&&Re($,!0),x&&(!d.dynamicChildren||d.dynamicChildren.length!==x.length)&&(k=0,S=!1,x=null),(O.innerHTML&&M.innerHTML==null||O.textContent&&M.textContent==null)&&c(T,""),x?Jn(d.dynamicChildren,x,T,$,_,ys(h,v),m):S||J(d,h,T,null,$,_,ys(h,v),m,!1),k>0){if(k&16)_e(T,O,M,$,v);else if(k&2&&O.class!==M.class&&r(T,"class",null,M.class,v),k&4&&r(T,"style",O.style,M.style,v),k&8){const G=h.dynamicProps;for(let sn=0;sn<G.length;sn++){const en=G[sn],dn=O[en],mn=M[en];(mn!==dn||en==="value")&&r(T,en,dn,mn,v,$)}}k&1&&d.children!==h.children&&c(T,h.children)}else!S&&x==null&&_e(T,O,M,$,v);((j=M.onVnodeUpdated)||D)&&Pn(()=>{j&&Qn(j,$,h,d),D&&Se(h,d,$,"updated")},_)},Jn=(d,h,$,_,v,m,S)=>{for(let T=0;T<h.length;T++){const k=d[T],x=h[T],D=k.el&&(k.type===cn||!st(k,x)||k.shapeFlag&198)?f(k.el):$;w(k,x,D,null,_,v,m,S,!0)}},_e=(d,h,$,_,v)=>{if(h!==$){if(h!==on)for(const m in h)!ct(m)&&!(m in $)&&r(d,m,h[m],null,v,_);for(const m in $){if(ct(m))continue;const S=$[m],T=h[m];S!==T&&m!=="value"&&r(d,m,T,S,v,_)}"value"in $&&r(d,"value",h.value,$.value,v)}},ke=(d,h,$,_,v,m,S,T,k)=>{const x=h.el=d?d.el:l(""),D=h.anchor=d?d.anchor:l("");let{patchFlag:O,dynamicChildren:M,slotScopeIds:j}=h;j&&(T=T?T.concat(j):j),d==null?(s(x,$,_),s(D,$,_),Gn(h.children||[],$,D,v,m,S,T,k)):O>0&&O&64&&M&&d.dynamicChildren&&d.dynamicChildren.length===M.length?(Jn(d.dynamicChildren,M,$,v,m,S,T),(h.key!=null||v&&h===v.subTree)&&xo(d,h,!0)):J(d,h,$,D,v,m,S,T,k)},Kn=(d,h,$,_,v,m,S,T,k)=>{h.slotScopeIds=T,d==null?h.shapeFlag&512?v.ctx.activate(h,$,_,S,k):nt(h,$,_,v,m,S,k):He(d,h,k)},nt=(d,h,$,_,v,m,S)=>{const T=d.component=_c(d,_,v);if(io(d)&&(T.ctx.renderer=I),vc(T,!1,S),T.asyncDep){if(v&&v.registerDep(T,$n,S),!d.el){const k=T.subTree=gn(we);L(null,k,h,$),d.placeholder=k.el}}else $n(T,d,h,$,v,m,S)},He=(d,h,$)=>{const _=h.component=d.component;if(Za(d,h,$))if(_.asyncDep&&!_.asyncResolved){nn(_,h,$);return}else _.next=h,_.update();else h.el=d.el,_.vnode=h},$n=(d,h,$,_,v,m,S)=>{const T=()=>{if(d.isMounted){let{next:O,bu:M,u:j,parent:G,vnode:sn}=d;{const Yn=yo(d);if(Yn){O&&(O.el=sn.el,nn(d,O,S)),Yn.asyncDep.then(()=>{Pn(()=>{d.isUnmounted||x()},v)});return}}let en=O,dn;Re(d,!1),O?(O.el=sn.el,nn(d,O,S)):O=sn,M&&Lt(M),(dn=O.props&&O.props.onVnodeBeforeUpdate)&&Qn(dn,G,O,sn),Re(d,!0);const mn=Li(d),Wn=d.subTree;d.subTree=mn,w(Wn,mn,f(Wn.el),b(Wn),d,v,m),O.el=mn.el,en===null&&Qa(d,mn.el),j&&Pn(j,v),(dn=O.props&&O.props.onVnodeUpdated)&&Pn(()=>Qn(dn,G,O,sn),v)}else{let O;const{el:M,props:j}=h,{bm:G,m:sn,parent:en,root:dn,type:mn}=d,Wn=ht(h);Re(d,!1),G&&Lt(G),!Wn&&(O=j&&j.onVnodeBeforeMount)&&Qn(O,en,h),Re(d,!0);{dn.ce&&dn.ce._hasShadowRoot()&&dn.ce._injectChildStyle(mn,d.parent?d.parent.type:void 0);const Yn=d.subTree=Li(d);w(null,Yn,$,_,d,v,m),h.el=Yn.el}if(sn&&Pn(sn,v),!Wn&&(O=j&&j.onVnodeMounted)){const Yn=h;Pn(()=>Qn(O,en,Yn),v)}(h.shapeFlag&256||en&&ht(en.vnode)&&en.vnode.shapeFlag&256)&&d.a&&Pn(d.a,v),d.isMounted=!0,h=$=_=null}};d.scope.on();const k=d.effect=new Nr(T);d.scope.off();const x=d.update=k.run.bind(k),D=d.job=k.runIfDirty.bind(k);D.i=d,D.id=d.uid,k.scheduler=()=>oi(D),Re(d,!0),x()},nn=(d,h,$)=>{h.component=d;const _=d.vnode.props;d.vnode=h,d.next=null,nc(d,h.props,_,$),ic(d,h.children,$),re(),Oi(d),oe()},J=(d,h,$,_,v,m,S,T,k=!1)=>{const x=d&&d.children,D=d?d.shapeFlag:0,O=h.children,{patchFlag:M,shapeFlag:j}=h;if(M>0){if(M&128){be(x,O,$,_,v,m,S,T,k);return}else if(M&256){le(x,O,$,_,v,m,S,T,k);return}}j&8?(D&16&&Mn(x,v,m),O!==x&&c($,O)):D&16?j&16?be(x,O,$,_,v,m,S,T,k):Mn(x,v,m,!0):(D&8&&c($,""),j&16&&Gn(O,$,_,v,m,S,T,k))},le=(d,h,$,_,v,m,S,T,k)=>{d=d||Je,h=h||Je;const x=d.length,D=h.length,O=Math.min(x,D);let M;for(M=0;M<O;M++){const j=h[M]=k?fe(h[M]):ee(h[M]);w(d[M],j,$,null,v,m,S,T,k)}x>D?Mn(d,v,m,!0,!1,O):Gn(h,$,_,v,m,S,T,k,O)},be=(d,h,$,_,v,m,S,T,k)=>{let x=0;const D=h.length;let O=d.length-1,M=D-1;for(;x<=O&&x<=M;){const j=d[x],G=h[x]=k?fe(h[x]):ee(h[x]);if(st(j,G))w(j,G,$,null,v,m,S,T,k);else break;x++}for(;x<=O&&x<=M;){const j=d[O],G=h[M]=k?fe(h[M]):ee(h[M]);if(st(j,G))w(j,G,$,null,v,m,S,T,k);else break;O--,M--}if(x>O){if(x<=M){const j=M+1,G=j<D?h[j].el:_;for(;x<=M;)w(null,h[x]=k?fe(h[x]):ee(h[x]),$,G,v,m,S,T,k),x++}}else if(x>M)for(;x<=O;)En(d[x],v,m,!0),x++;else{const j=x,G=x,sn=new Map;for(x=G;x<=M;x++){const An=h[x]=k?fe(h[x]):ee(h[x]);An.key!=null&&sn.set(An.key,x)}let en,dn=0;const mn=M-G+1;let Wn=!1,Yn=0;const et=new Array(mn);for(x=0;x<mn;x++)et[x]=0;for(x=j;x<=O;x++){const An=d[x];if(dn>=mn){En(An,v,m,!0);continue}let Zn;if(An.key!=null)Zn=sn.get(An.key);else for(en=G;en<=M;en++)if(et[en-G]===0&&st(An,h[en])){Zn=en;break}Zn===void 0?En(An,v,m,!0):(et[Zn-G]=x+1,Zn>=Yn?Yn=Zn:Wn=!0,w(An,h[Zn],$,null,v,m,S,T,k),dn++)}const xi=Wn?ac(et):Je;for(en=xi.length-1,x=mn-1;x>=0;x--){const An=G+x,Zn=h[An],yi=h[An+1],wi=An+1<D?yi.el||wo(yi):_;et[x]===0?w(null,Zn,$,wi,v,m,S,T,k):Wn&&(en<0||x!==xi[en]?qn(Zn,$,wi,2):en--)}}},qn=(d,h,$,_,v=null)=>{const{el:m,type:S,transition:T,children:k,shapeFlag:x}=d;if(x&6){qn(d.component.subTree,h,$,_);return}if(x&128){d.suspense.move(h,$,_);return}if(x&64){S.move(d,h,$,I);return}if(S===cn){s(m,h,$);for(let O=0;O<k.length;O++)qn(k[O],h,$,_);s(d.anchor,h,$);return}if(S===jt){C(d,h,$);return}if(_!==2&&x&1&&T)if(_===0)T.persisted&&!m[vs]?s(m,h,$):(T.beforeEnter(m),s(m,h,$),Pn(()=>T.enter(m),v));else{const{leave:O,delayLeave:M,afterLeave:j}=T,G=()=>{d.ctx.isUnmounted?i(m):s(m,h,$)},sn=()=>{const en=m._isLeaving||!!m[vs];m._isLeaving&&m[vs](!0),T.persisted&&!en?G():O(m,()=>{G(),j&&j()})};M?M(m,G,sn):sn()}else s(m,h,$)},En=(d,h,$,_=!1,v=!1)=>{const{type:m,props:S,ref:T,children:k,dynamicChildren:x,shapeFlag:D,patchFlag:O,dirs:M,cacheIndex:j,memo:G}=d;if(O===-2&&(v=!1),T!=null&&(re(),dt(T,null,$,d,!0),oe()),j!=null&&(h.renderCache[j]=void 0),D&256){h.ctx.deactivate(d);return}const sn=D&1&&M,en=!ht(d);let dn;if(en&&(dn=S&&S.onVnodeBeforeUnmount)&&Qn(dn,h,d),D&6)Te(d.component,$,_);else{if(D&128){d.suspense.unmount($,_);return}sn&&Se(d,null,h,"beforeUnmount"),D&64?d.type.remove(d,h,$,I,_):x&&!x.hasOnce&&(m!==cn||O>0&&O&64)?Mn(x,h,$,!1,!0):(m===cn&&O&384||!v&&D&16)&&Mn(k,h,$),_&&Be(d)}const mn=G!=null&&j==null;(en&&(dn=S&&S.onVnodeUnmounted)||sn||mn)&&Pn(()=>{dn&&Qn(dn,h,d),sn&&Se(d,null,h,"unmounted"),mn&&(d.el=null)},$)},Be=d=>{const{type:h,el:$,anchor:_,transition:v}=d;if(h===cn){Fe($,_);return}if(h===jt){A(d);return}const m=()=>{i($),v&&!v.persisted&&v.afterLeave&&v.afterLeave()};if(d.shapeFlag&1&&v&&!v.persisted){const{leave:S,delayLeave:T}=v,k=()=>S($,m);T?T(d.el,m,k):k()}else m()},Fe=(d,h)=>{let $;for(;d!==h;)$=p(d),i(d),d=$;i(h)},Te=(d,h,$)=>{const{bum:_,scope:v,job:m,subTree:S,um:T,m:k,a:x}=d;Hi(k),Hi(x),_&&Lt(_),v.stop(),m&&(m.flags|=8,En(S,d,h,$)),T&&Pn(T,h),Pn(()=>{d.isUnmounted=!0},h)},Mn=(d,h,$,_=!1,v=!1,m=0)=>{for(let S=m;S<d.length;S++)En(d[S],h,$,_,v)},b=d=>{if(d.shapeFlag&6)return b(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const h=p(d.anchor||d.el),$=h&&h[xa];return $?p($):h};let P=!1;const R=(d,h,$)=>{let _;d==null?h._vnode&&(En(h._vnode,null,null,!0),_=h._vnode.component):w(h._vnode||null,d,h,null,null,null,$),h._vnode=d,P||(P=!0,Oi(_),Qr(),P=!1)},I={p:w,um:En,m:qn,r:Be,mt:nt,mc:Gn,pc:J,pbc:Jn,n:b,o:n};return{render:R,hydrate:void 0,createApp:Ga(R)}}function ys({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Re({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function lc(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function xo(n,e,t=!1){const s=n.children,i=e.children;if(H(s)&&H(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=fe(i[r]),l.el=o.el),!t&&l.patchFlag!==-2&&xo(o,l)),l.type===cs&&(l.patchFlag===-1&&(l=i[r]=fe(l)),l.el=o.el),l.type===we&&!l.el&&(l.el=o.el)}}function ac(n){const e=n.slice(),t=[0];let s,i,r,o,l;const a=n.length;for(s=0;s<a;s++){const u=n[s];if(u!==0){if(i=t[t.length-1],n[i]<u){e[s]=i,t.push(s);continue}for(r=0,o=t.length-1;r<o;)l=r+o>>1,n[t[l]]<u?r=l+1:o=l;u<n[t[r]]&&(r>0&&(e[s]=t[r-1]),t[r]=s)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function yo(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:yo(e)}function Hi(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function wo(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?wo(e.subTree):null}const ko=n=>n.__isSuspense;function cc(n,e){e&&e.pendingBranch?H(n)?e.effects.push(...n):e.effects.push(n):pa(n)}const cn=Symbol.for("v-fgt"),cs=Symbol.for("v-txt"),we=Symbol.for("v-cmt"),jt=Symbol.for("v-stc"),gt=[];let In=null;function F(n=!1){gt.push(In=n?null:[])}function uc(){gt.pop(),In=gt[gt.length-1]||null}let yt=1;function Jt(n,e=!1){yt+=n,n<0&&In&&e&&(In.hasOnce=!0)}function To(n){return n.dynamicChildren=yt>0?In||Je:null,uc(),yt>0&&In&&In.push(n),n}function U(n,e,t,s,i,r){return To(z(n,e,t,s,i,r,!0))}function So(n,e,t,s,i){return To(gn(n,e,t,s,i,!0))}function Kt(n){return n?n.__v_isVNode===!0:!1}function st(n,e){return n.type===e.type&&n.key===e.key}const Ro=({key:n})=>n??null,Ht=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?fn(n)||wn(n)||B(n)?{i:Nn,r:n,k:e,f:!!t}:n:null);function z(n,e=null,t=null,s=0,i=null,r=n===cn?0:1,o=!1,l=!1){const a={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Ro(e),ref:e&&Ht(e),scopeId:no,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Nn};return l?(qt(a,t),r&128&&n.normalize(a)):t&&(a.shapeFlag|=fn(t)?8:16),yt>0&&!o&&In&&(a.patchFlag>0||r&6)&&a.patchFlag!==32&&In.push(a),a}const gn=fc;function fc(n,e=null,t=null,s=0,i=null,r=!1){if((!n||n===La)&&(n=we),Kt(n)){const l=Ze(n,e,!0);return t&&qt(l,t),yt>0&&!r&&In&&(l.shapeFlag&6?In[In.indexOf(n)]=l:In.push(l)),l.patchFlag=-2,l}if(Tc(n)&&(n=n.__vccOpts),e){e=dc(e);let{class:l,style:a}=e;l&&!fn(l)&&(e.class=Hn(l)),X(a)&&(ri(a)&&!H(a)&&(a=vn({},a)),e.style=Zs(a))}const o=fn(n)?1:ko(n)?128:ya(n)?64:X(n)?4:B(n)?2:0;return z(n,e,t,s,i,o,r,!0)}function dc(n){return n?ri(n)||go(n)?vn({},n):n:null}function Ze(n,e,t=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:a}=n,u=e?gc(i||{},e):i,c={__v_isVNode:!0,__v_skip:!0,type:n.type,props:u,key:u&&Ro(u),ref:e&&e.ref?t&&r?H(r)?r.concat(Ht(e)):[r,Ht(e)]:Ht(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==cn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:a,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ze(n.ssContent),ssFallback:n.ssFallback&&Ze(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return a&&s&&ai(c,a.clone(c)),c}function hc(n=" ",e=0){return gn(cs,null,n,e)}function pc(n,e){const t=gn(jt,null,n);return t.staticCount=e,t}function Ie(n="",e=!1){return e?(F(),So(we,null,n)):gn(we,null,n)}function ee(n){return n==null||typeof n=="boolean"?gn(we):H(n)?gn(cn,null,n.slice()):Kt(n)?fe(n):gn(cs,null,String(n))}function fe(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ze(n)}function qt(n,e){let t=0;const{shapeFlag:s}=n;if(e==null)e=null;else if(H(e))t=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),qt(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!go(e)?e._ctx=Nn:i===3&&Nn&&(Nn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(B(e)){if(s&65){qt(n,{default:e});return}e={default:e,_ctx:Nn},t=32}else e=String(e),s&64?(t=16,e=[hc(e)]):t=8;n.children=e,n.shapeFlag|=t}function gc(...n){const e={};for(let t=0;t<n.length;t++){const s=n[t];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=Hn([e.class,s.class]));else if(i==="style")e.style=Zs([e.style,s.style]);else if(Xt(i)){const r=e[i],o=s[i];o&&r!==o&&!(H(r)&&r.includes(o))?e[i]=r?[].concat(r,o):o:o==null&&r==null&&!ns(i)&&(e[i]=o)}else i!==""&&(e[i]=s[i])}return e}function Qn(n,e,t,s=null){zn(n,e,7,[t,s])}const $c=co();let mc=0;function _c(n,e,t){const s=n.type,i=(e?e.appContext:n.appContext)||$c,r={uid:mc++,vnode:n,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Hl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:mo(s,i),emitsOptions:uo(s,i),emit:null,emitted:null,propsDefaults:on,inheritAttrs:s.inheritAttrs,ctx:on,data:on,props:on,attrs:on,slots:on,refs:on,setupState:on,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Ka.bind(null,r),n.ce&&n.ce(r),r}let yn=null;const bc=()=>yn||Nn;let Wt,Hs;{const n=ss(),e=(t,s)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};Wt=e("__VUE_INSTANCE_SETTERS__",t=>yn=t),Hs=e("__VUE_SSR_SETTERS__",t=>wt=t)}const Ot=n=>{const e=yn;return Wt(n),n.scope.on(),()=>{n.scope.off(),Wt(e)}},Bi=()=>{yn&&yn.scope.off(),Wt(null)};function Oo(n){return n.vnode.shapeFlag&4}let wt=!1;function vc(n,e=!1,t=!1){e&&Hs(e);const{props:s,children:i}=n.vnode,r=Oo(n);Xa(n,s,r,e),sc(n,i,t||e);const o=r?xc(n,e):void 0;return e&&Hs(!1),o}function xc(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,ja);const{setup:s}=t;if(s){re();const i=n.setupContext=s.length>1?wc(n):null,r=Ot(n),o=St(s,n,0,[n.props,i]),l=Sr(o);if(oe(),r(),(l||n.sp)&&!ht(n)&&so(n),l){if(o.then(Bi,Bi),e)return o.then(a=>{Fi(n,a)}).catch(a=>{os(a,n,0)});n.asyncDep=o}else Fi(n,o)}else Eo(n)}function Fi(n,e,t){B(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:X(e)&&(n.setupState=Wr(e)),Eo(n)}function Eo(n,e,t){const s=n.type;n.render||(n.render=s.render||se);{const i=Ot(n);re();try{Ha(n)}finally{oe(),i()}}}const yc={get(n,e){return xn(n,"get",""),n[e]}};function wc(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,yc),slots:n.slots,emit:n.emit,expose:e}}function us(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Wr(ia(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in pt)return pt[t](n)},has(e,t){return t in e||t in pt}})):n.proxy}function kc(n,e=!0){return B(n)?n.displayName||n.name:n.name||e&&n.__name}function Tc(n){return B(n)&&"__vccOpts"in n}const Rn=(n,e)=>ca(n,e,wt);function Po(n,e,t){try{Jt(-1);const s=arguments.length;return s===2?X(e)&&!H(e)?Kt(e)?gn(n,null,[e]):gn(n,e):gn(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&Kt(t)&&(t=[t]),gn(n,e,t))}finally{Jt(1)}}const Sc="3.5.39";/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Bs;const Ui=typeof window<"u"&&window.trustedTypes;if(Ui)try{Bs=Ui.createPolicy("vue",{createHTML:n=>n})}catch{}const Ao=Bs?n=>Bs.createHTML(n):n=>n,Rc="http://www.w3.org/2000/svg",Oc="http://www.w3.org/1998/Math/MathML",ue=typeof document<"u"?document:null,zi=ue&&ue.createElement("template"),Ec={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,s)=>{const i=e==="svg"?ue.createElementNS(Rc,n):e==="mathml"?ue.createElementNS(Oc,n):t?ue.createElement(n,{is:t}):ue.createElement(n);return n==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:n=>ue.createTextNode(n),createComment:n=>ue.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ue.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,s,i,r){const o=t?t.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===r||!(i=i.nextSibling)););else{zi.innerHTML=Ao(s==="svg"?`<svg>${n}</svg>`:s==="mathml"?`<math>${n}</math>`:n);const l=zi.content;if(s==="svg"||s==="mathml"){const a=l.firstChild;for(;a.firstChild;)l.appendChild(a.firstChild);l.removeChild(a)}e.insertBefore(l,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Pc=Symbol("_vtc");function Ac(n,e,t){const s=n[Pc];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Vi=Symbol("_vod"),Cc=Symbol("_vsh"),Nc=Symbol(""),Ic=/(?:^|;)\s*display\s*:/;function Mc(n,e,t){const s=n.style,i=fn(t);let r=!1;if(t&&!i){if(e)if(fn(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();t[l]==null&&at(s,l,"")}else for(const o in e)t[o]==null&&at(s,o,"");for(const o in t){o==="display"&&(r=!0);const l=t[o];l!=null?Dc(n,o,!fn(e)&&e?e[o]:void 0,l)||at(s,o,l):at(s,o,"")}}else if(i){if(e!==t){const o=s[Nc];o&&(t+=";"+o),s.cssText=t,r=Ic.test(t)}}else e&&n.removeAttribute("style");Vi in n&&(n[Vi]=r?s.display:"",n[Cc]&&(s.display="none"))}const Gi=/\s*!important$/;function at(n,e,t){if(H(t))t.forEach(s=>at(n,e,s));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const s=Lc(n,e);Gi.test(t)?n.setProperty(Le(s),t.replace(Gi,""),"important"):n[s]=t}}const Ji=["Webkit","Moz","ms"],ws={};function Lc(n,e){const t=ws[e];if(t)return t;let s=On(e);if(s!=="filter"&&s in n)return ws[e]=s;s=ts(s);for(let i=0;i<Ji.length;i++){const r=Ji[i]+s;if(r in n)return ws[e]=r}return e}function Dc(n,e,t,s){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&fn(s)&&t===s}const Ki="http://www.w3.org/1999/xlink";function qi(n,e,t,s,i,r=Dl(e)){s&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Ki,e.slice(6,e.length)):n.setAttributeNS(Ki,e,t):t==null||r&&!Pr(t)?n.removeAttribute(e):n.setAttribute(e,r?"":ie(t)?String(t):t)}function Wi(n,e,t,s,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ao(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?n.getAttribute("value")||"":n.value,a=t==null?n.type==="checkbox"?"on":"":String(t);(l!==a||!("_value"in n))&&(n.value=a),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=Pr(t):t==null&&l==="string"?(t="",o=!0):l==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(i||e)}function Ve(n,e,t,s){n.addEventListener(e,t,s)}function jc(n,e,t,s){n.removeEventListener(e,t,s)}const Yi=Symbol("_vei");function Hc(n,e,t,s,i=null){const r=n[Yi]||(n[Yi]={}),o=r[e];if(s&&o)o.value=s;else{const[l,a]=Uc(e);if(s){const u=r[e]=Gc(s,i);Ve(n,l,u,a)}else o&&(jc(n,l,o,a),r[e]=void 0)}}const Bc=/(Once|Passive|Capture)$/,Fc=/^on:?(?:Once|Passive|Capture)$/;function Uc(n){let e,t;for(;(t=n.match(Bc))&&!Fc.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):Le(n.slice(2)),e]}let ks=0;const zc=Promise.resolve(),Vc=()=>ks||(zc.then(()=>ks=0),ks=Date.now());function Gc(n,e){const t=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=t.attached)return;const i=t.value;if(H(i)){const r=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{r.call(s),s._stopped=!0};const o=i.slice(),l=[s];for(let a=0;a<o.length&&!s._stopped;a++){const u=o[a];u&&zn(u,e,5,l)}}else zn(i,e,5,[s])};return t.value=n,t.attached=Vc(),t}const Zi=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Jc=(n,e,t,s,i,r)=>{const o=i==="svg";e==="class"?Ac(n,s,o):e==="style"?Mc(n,t,s):Xt(e)?ns(e)||Hc(n,e,t,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Kc(n,e,s,o))?(Wi(n,e,s),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&qi(n,e,s,o,r,e!=="value")):n._isVueCE&&(qc(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!fn(s)))?Wi(n,On(e),s,r,e):(e==="true-value"?n._trueValue=s:e==="false-value"&&(n._falseValue=s),qi(n,e,s,o))};function Kc(n,e,t,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in n&&Zi(e)&&B(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Zi(e)&&fn(t)?!1:e in n}function qc(n,e){const t=n._def.props;if(!t)return!1;const s=On(e);return Array.isArray(t)?t.some(i=>On(i)===s):Object.keys(t).some(i=>On(i)===s)}const Qi=n=>{const e=n.props["onUpdate:modelValue"]||!1;return H(e)?t=>Lt(e,t):e};function Wc(n){n.target.composing=!0}function Xi(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Ts=Symbol("_assign");function nr(n,e,t){return e&&(n=n.trim()),t&&(n=Ys(n)),n}const Yc={created(n,{modifiers:{lazy:e,trim:t,number:s}},i){n[Ts]=Qi(i);const r=s||i.props&&i.props.type==="number";Ve(n,e?"change":"input",o=>{o.target.composing||n[Ts](nr(n.value,t,r))}),(t||r)&&Ve(n,"change",()=>{n.value=nr(n.value,t,r)}),e||(Ve(n,"compositionstart",Wc),Ve(n,"compositionend",Xi),Ve(n,"change",Xi))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:s,trim:i,number:r}},o){if(n[Ts]=Qi(o),n.composing)return;const l=(r||n.type==="number")&&!/^0\d/.test(n.value)?Ys(n.value):n.value,a=e??"";if(l===a)return;const u=n.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===n&&n.type!=="range"&&(s&&e===t||i&&n.value.trim()===a)||(n.value=a)}},Zc=["ctrl","shift","alt","meta"],Qc={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>Zc.some(t=>n[`${t}Key`]&&!e.includes(t))},Xc=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),s=e.join(".");return t[s]||(t[s]=(i,...r)=>{for(let o=0;o<e.length;o++){const l=Qc[e[o]];if(l&&l(i,e))return}return n(i,...r)})},nu=vn({patchProp:Jc},Ec);let er;function eu(){return er||(er=rc(nu))}const tu=(...n)=>{const e=eu().createApp(...n),{mount:t}=e;return e.mount=s=>{const i=iu(s);if(!i)return;const r=e._component;!B(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=t(i,!1,su(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function su(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function iu(n){return fn(n)?document.querySelector(n):n}const Bt=pe(localStorage.getItem("theme")!=="light");ba(()=>{const n=Bt.value?"dark":"light";document.documentElement.setAttribute("data-theme",n),localStorage.setItem("theme",n)});function ru(){function n(){Bt.value=!Bt.value}return{isDark:Bt,toggle:n}}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ge=typeof document<"u";function Co(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function ou(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Co(n.default)}const K=Object.assign;function Ss(n,e){const t={};for(const s in e){const i=e[s];t[s]=Vn(i)?i.map(n):n(i)}return t}const $t=()=>{},Vn=Array.isArray;function tr(n,e){const t={};for(const s in n)t[s]=s in e?e[s]:n[s];return t}const No=/#/g,lu=/&/g,au=/\//g,cu=/=/g,uu=/\?/g,Io=/\+/g,fu=/%5B/g,du=/%5D/g,Mo=/%5E/g,hu=/%60/g,Lo=/%7B/g,pu=/%7C/g,Do=/%7D/g,gu=/%20/g;function di(n){return n==null?"":encodeURI(""+n).replace(pu,"|").replace(fu,"[").replace(du,"]")}function $u(n){return di(n).replace(Lo,"{").replace(Do,"}").replace(Mo,"^")}function Fs(n){return di(n).replace(Io,"%2B").replace(gu,"+").replace(No,"%23").replace(lu,"%26").replace(hu,"`").replace(Lo,"{").replace(Do,"}").replace(Mo,"^")}function mu(n){return Fs(n).replace(cu,"%3D")}function _u(n){return di(n).replace(No,"%23").replace(uu,"%3F")}function bu(n){return _u(n).replace(au,"%2F")}function kt(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const vu=/\/$/,xu=n=>n.replace(vu,"");function Rs(n,e,t="/"){let s,i={},r="",o="";const l=e.indexOf("#");let a=e.indexOf("?");return a=l>=0&&a>l?-1:a,a>=0&&(s=e.slice(0,a),r=e.slice(a,l>0?l:e.length),i=n(r.slice(1))),l>=0&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=Tu(s??e,t),{fullPath:s+r+o,path:s,query:i,hash:kt(o)}}function yu(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function sr(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function wu(n,e,t){const s=e.matched.length-1,i=t.matched.length-1;return s>-1&&s===i&&Qe(e.matched[s],t.matched[i])&&jo(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Qe(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function jo(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!ku(n[t],e[t]))return!1;return!0}function ku(n,e){return Vn(n)?ir(n,e):Vn(e)?ir(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function ir(n,e){return Vn(e)?n.length===e.length&&n.every((t,s)=>t===e[s]):n.length===1&&n[0]===e}function Tu(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),s=n.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=t.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const ve={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Us=function(n){return n.pop="pop",n.push="push",n}({}),Os=function(n){return n.back="back",n.forward="forward",n.unknown="",n}({});function Su(n){if(!n)if(Ge){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),xu(n)}const Ru=/^[^#]+#/;function Ou(n,e){return n.replace(Ru,"#")+e}function Eu(n,e){const t=document.documentElement.getBoundingClientRect(),s=n.getBoundingClientRect();return{behavior:e.behavior,left:s.left-t.left-(e.left||0),top:s.top-t.top-(e.top||0)}}const fs=()=>({left:window.scrollX,top:window.scrollY});function Pu(n){let e;if("el"in n){const t=n.el,s=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?s?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=Eu(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function rr(n,e){return(history.state?history.state.position-e:-1)+n}const zs=new Map;function Au(n,e){zs.set(n,e)}function Cu(n){const e=zs.get(n);return zs.delete(n),e}function Nu(n){return typeof n=="string"||n&&typeof n=="object"}function Ho(n){return typeof n=="string"||typeof n=="symbol"}let un=function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n}({});const Bo=Symbol("");un.MATCHER_NOT_FOUND+"",un.NAVIGATION_GUARD_REDIRECT+"",un.NAVIGATION_ABORTED+"",un.NAVIGATION_CANCELLED+"",un.NAVIGATION_DUPLICATED+"";function Xe(n,e){return K(new Error,{type:n,[Bo]:!0},e)}function ce(n,e){return n instanceof Error&&Bo in n&&(e==null||!!(n.type&e))}const Iu=["params","query","hash"];function Mu(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of Iu)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function Lu(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<t.length;++s){const i=t[s].replace(Io," "),r=i.indexOf("="),o=kt(r<0?i:i.slice(0,r)),l=r<0?null:kt(i.slice(r+1));if(o in e){let a=e[o];Vn(a)||(a=e[o]=[a]),a.push(l)}else e[o]=l}return e}function or(n){let e="";for(let t in n){const s=n[t];if(t=mu(t),s==null){s!==void 0&&(e+=(e.length?"&":"")+t);continue}(Vn(s)?s.map(i=>i&&Fs(i)):[s&&Fs(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function Du(n){const e={};for(const t in n){const s=n[t];s!==void 0&&(e[t]=Vn(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const ju=Symbol(""),lr=Symbol(""),ds=Symbol(""),hi=Symbol(""),Vs=Symbol("");function it(){let n=[];function e(s){return n.push(s),()=>{const i=n.indexOf(s);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function ye(n,e,t,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,a)=>{const u=p=>{p===!1?a(Xe(un.NAVIGATION_ABORTED,{from:t,to:e})):p instanceof Error?a(p):Nu(p)?a(Xe(un.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(o&&s.enterCallbacks[i]===o&&typeof p=="function"&&o.push(p),l())},c=r(()=>n.call(s&&s.instances[i],e,t,u));let f=Promise.resolve(c);n.length<3&&(f=f.then(u)),f.catch(p=>a(p))})}function Es(n,e,t,s,i=r=>r()){const r=[];for(const o of n)for(const l in o.components){let a=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(Co(a)){const u=(a.__vccOpts||a)[e];u&&r.push(ye(u,t,s,o,l,i))}else{let u=a();r.push(()=>u.then(c=>{if(!c)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const f=ou(c)?c.default:c;o.mods[l]=c,o.components[l]=f;const p=(f.__vccOpts||f)[e];return p&&ye(p,t,s,o,l,i)()}))}}return r}function Hu(n,e){const t=[],s=[],i=[],r=Math.max(e.matched.length,n.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(n.matched.find(u=>Qe(u,l))?s.push(l):t.push(l));const a=n.matched[o];a&&(e.matched.find(u=>Qe(u,a))||i.push(a))}return[t,s,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Bu=()=>location.protocol+"//"+location.host;function Fo(n,e){const{pathname:t,search:s,hash:i}=e,r=n.indexOf("#");if(r>-1){let o=i.includes(n.slice(r))?n.slice(r).length:1,l=i.slice(o);return l[0]!=="/"&&(l="/"+l),sr(l,"")}return sr(t,n)+s+i}function Fu(n,e,t,s){let i=[],r=[],o=null;const l=({state:p})=>{const g=Fo(n,location),y=t.value,w=e.value;let N=0;if(p){if(t.value=g,e.value=p,o&&o===y){o=null;return}N=w?p.position-w.position:0}else s(g);i.forEach(L=>{L(t.value,y,{delta:N,type:Us.pop,direction:N?N>0?Os.forward:Os.back:Os.unknown})})};function a(){o=t.value}function u(p){i.push(p);const g=()=>{const y=i.indexOf(p);y>-1&&i.splice(y,1)};return r.push(g),g}function c(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(K({},p.state,{scroll:fs()}),"")}}function f(){for(const p of r)p();r=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",c),document.removeEventListener("visibilitychange",c)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",c),document.addEventListener("visibilitychange",c),{pauseListeners:a,listen:u,destroy:f}}function ar(n,e,t,s=!1,i=!1){return{back:n,current:e,forward:t,replaced:s,position:window.history.length,scroll:i?fs():null}}function Uu(n){const{history:e,location:t}=window,s={value:Fo(n,t)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(a,u,c){const f=n.indexOf("#"),p=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+a:Bu()+n+a;try{e[c?"replaceState":"pushState"](u,"",p),i.value=u}catch(g){console.error(g),t[c?"replace":"assign"](p)}}function o(a,u){r(a,K({},e.state,ar(i.value.back,a,i.value.forward,!0),u,{position:i.value.position}),!0),s.value=a}function l(a,u){const c=K({},i.value,e.state,{forward:a,scroll:fs()});r(c.current,c,!0),r(a,K({},ar(s.value,a,null),{position:c.position+1},u),!1),s.value=a}return{location:s,state:i,push:l,replace:o}}function zu(n){n=Su(n);const e=Uu(n),t=Fu(n,e.state,e.location,e.replace);function s(r,o=!0){o||t.pauseListeners(),history.go(r)}const i=K({location:"",base:n,go:s,createHref:Ou.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function Vu(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),zu(n)}let Pe=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n}({});var pn=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n}(pn||{});const Gu={type:Pe.Static,value:""},Ju=/[a-zA-Z0-9_]/;function Ku(n){if(!n)return[[]];if(n==="/")return[[Gu]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(g){throw new Error(`ERR (${t})/"${u}": ${g}`)}let t=pn.Static,s=t;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,a,u="",c="";function f(){u&&(t===pn.Static?r.push({type:Pe.Static,value:u}):t===pn.Param||t===pn.ParamRegExp||t===pn.ParamRegExpEnd?(r.length>1&&(a==="*"||a==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),r.push({type:Pe.Param,value:u,regexp:c,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=a}for(;l<n.length;){if(a=n[l++],a==="\\"&&t!==pn.ParamRegExp){s=t,t=pn.EscapeNext;continue}switch(t){case pn.Static:a==="/"?(u&&f(),o()):a===":"?(f(),t=pn.Param):p();break;case pn.EscapeNext:p(),t=s;break;case pn.Param:a==="("?t=pn.ParamRegExp:Ju.test(a)?p():(f(),t=pn.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--);break;case pn.ParamRegExp:a===")"?c[c.length-1]=="\\"?c=c.slice(0,-1)+a:t=pn.ParamRegExpEnd:c+=a;break;case pn.ParamRegExpEnd:f(),t=pn.Static,a!=="*"&&a!=="?"&&a!=="+"&&l--,c="";break;default:e("Unknown state");break}}return t===pn.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),f(),o(),i}const cr="[^/]+?",qu={sensitive:!1,strict:!1,start:!0,end:!0};var Tn=function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n}(Tn||{});const Wu=/[.+*?^${}()[\]/\\]/g;function Yu(n,e){const t=K({},qu,e),s=[];let i=t.start?"^":"";const r=[];for(const u of n){const c=u.length?[]:[Tn.Root];t.strict&&!u.length&&(i+="/");for(let f=0;f<u.length;f++){const p=u[f];let g=Tn.Segment+(t.sensitive?Tn.BonusCaseSensitive:0);if(p.type===Pe.Static)f||(i+="/"),i+=p.value.replace(Wu,"\\$&"),g+=Tn.Static;else if(p.type===Pe.Param){const{value:y,repeatable:w,optional:N,regexp:L}=p;r.push({name:y,repeatable:w,optional:N});const E=L||cr;if(E!==cr){g+=Tn.BonusCustomRegExp;try{`${E}`}catch(A){throw new Error(`Invalid custom RegExp for param "${y}" (${E}): `+A.message)}}let C=w?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;f||(C=N&&u.length<2?`(?:/${C})`:"/"+C),N&&(C+="?"),i+=C,g+=Tn.Dynamic,N&&(g+=Tn.BonusOptional),w&&(g+=Tn.BonusRepeatable),E===".*"&&(g+=Tn.BonusWildcard)}c.push(g)}s.push(c)}if(t.strict&&t.end){const u=s.length-1;s[u][s[u].length-1]+=Tn.BonusStrict}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function l(u){const c=u.match(o),f={};if(!c)return null;for(let p=1;p<c.length;p++){const g=c[p]||"",y=r[p-1];f[y.name]=g&&y.repeatable?g.split("/"):g}return f}function a(u){let c="",f=!1;for(const p of n){(!f||!c.endsWith("/"))&&(c+="/"),f=!1;for(const g of p)if(g.type===Pe.Static)c+=g.value;else if(g.type===Pe.Param){const{value:y,repeatable:w,optional:N}=g,L=y in u?u[y]:"";if(Vn(L)&&!w)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const E=Vn(L)?L.join("/"):L;if(!E)if(N)p.length<2&&(c.endsWith("/")?c=c.slice(0,-1):f=!0);else throw new Error(`Missing required param "${y}"`);c+=E}}return c||"/"}return{re:o,score:s,keys:r,parse:l,stringify:a}}function Zu(n,e){let t=0;for(;t<n.length&&t<e.length;){const s=e[t]-n[t];if(s)return s;t++}return n.length<e.length?n.length===1&&n[0]===Tn.Static+Tn.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Tn.Static+Tn.Segment?1:-1:0}function Uo(n,e){let t=0;const s=n.score,i=e.score;for(;t<s.length&&t<i.length;){const r=Zu(s[t],i[t]);if(r)return r;t++}if(Math.abs(i.length-s.length)===1){if(ur(s))return 1;if(ur(i))return-1}return i.length-s.length}function ur(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Qu={strict:!1,end:!0,sensitive:!1};function Xu(n,e,t){const s=Yu(Ku(n.path),t),i=K(s,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function nf(n,e){const t=[],s=new Map;e=tr(Qu,e);function i(f){return s.get(f)}function r(f,p,g){const y=!g,w=dr(f);w.aliasOf=g&&g.record;const N=tr(e,f),L=[w];if("alias"in f){const A=typeof f.alias=="string"?[f.alias]:f.alias;for(const Y of A)L.push(dr(K({},w,{components:g?g.record.components:w.components,path:Y,aliasOf:g?g.record:w})))}let E,C;for(const A of L){const{path:Y}=A;if(p&&Y[0]!=="/"){const an=p.record.path,Z=an[an.length-1]==="/"?"":"/";A.path=p.record.path+(Y&&Z+Y)}if(E=Xu(A,p,N),g?g.alias.push(E):(C=C||E,C!==E&&C.alias.push(E),y&&f.name&&!hr(E)&&o(f.name)),zo(E)&&a(E),w.children){const an=w.children;for(let Z=0;Z<an.length;Z++)r(an[Z],E,g&&g.children[Z])}g=g||E}return C?()=>{o(C)}:$t}function o(f){if(Ho(f)){const p=s.get(f);p&&(s.delete(f),t.splice(t.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=t.indexOf(f);p>-1&&(t.splice(p,1),f.record.name&&s.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function l(){return t}function a(f){const p=sf(f,t);t.splice(p,0,f),f.record.name&&!hr(f)&&s.set(f.record.name,f)}function u(f,p){let g,y={},w,N;if("name"in f&&f.name){if(g=s.get(f.name),!g)throw Xe(un.MATCHER_NOT_FOUND,{location:f});N=g.record.name,y=K(fr(p.params,g.keys.filter(C=>!C.optional).concat(g.parent?g.parent.keys.filter(C=>C.optional):[]).map(C=>C.name)),f.params&&fr(f.params,g.keys.map(C=>C.name))),w=g.stringify(y)}else if(f.path!=null)w=f.path,g=t.find(C=>C.re.test(w)),g&&(y=g.parse(w),N=g.record.name);else{if(g=p.name?s.get(p.name):t.find(C=>C.re.test(p.path)),!g)throw Xe(un.MATCHER_NOT_FOUND,{location:f,currentLocation:p});N=g.record.name,y=K({},p.params,f.params),w=g.stringify(y)}const L=[];let E=g;for(;E;)L.unshift(E.record),E=E.parent;return{name:N,path:w,params:y,matched:L,meta:tf(L)}}n.forEach(f=>r(f));function c(){t.length=0,s.clear()}return{addRoute:r,resolve:u,removeRoute:o,clearRoutes:c,getRoutes:l,getRecordMatcher:i}}function fr(n,e){const t={};for(const s of e)s in n&&(t[s]=n[s]);return t}function dr(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:ef(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function ef(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const s in n.components)e[s]=typeof t=="object"?t[s]:t;return e}function hr(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function tf(n){return n.reduce((e,t)=>K(e,t.meta),{})}function sf(n,e){let t=0,s=e.length;for(;t!==s;){const r=t+s>>1;Uo(n,e[r])<0?s=r:t=r+1}const i=rf(n);return i&&(s=e.lastIndexOf(i,s-1)),s}function rf(n){let e=n;for(;e=e.parent;)if(zo(e)&&Uo(n,e)===0)return e}function zo({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function pr(n){const e=Fn(ds),t=Fn(hi),s=Rn(()=>{const a=hn(n.to);return e.resolve(a)}),i=Rn(()=>{const{matched:a}=s.value,{length:u}=a,c=a[u-1],f=t.matched;if(!c||!f.length)return-1;const p=f.findIndex(Qe.bind(null,c));if(p>-1)return p;const g=gr(a[u-2]);return u>1&&gr(c)===g&&f[f.length-1].path!==g?f.findIndex(Qe.bind(null,a[u-2])):p}),r=Rn(()=>i.value>-1&&uf(t.params,s.value.params)),o=Rn(()=>i.value>-1&&i.value===t.matched.length-1&&jo(t.params,s.value.params));function l(a={}){if(cf(a)){const u=e[hn(n.replace)?"replace":"push"](hn(n.to)).catch($t);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:Rn(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function of(n){return n.length===1?n[0]:n}const lf=to({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:pr,setup(n,{slots:e}){const t=rs(pr(n)),{options:s}=Fn(ds),i=Rn(()=>({[$r(n.activeClass,s.linkActiveClass,"router-link-active")]:t.isActive,[$r(n.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&of(e.default(t));return n.custom?r:Po("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},r)}}}),af=lf;function cf(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function uf(n,e){for(const t in e){const s=e[t],i=n[t];if(typeof s=="string"){if(s!==i)return!1}else if(!Vn(i)||i.length!==s.length||s.some((r,o)=>r.valueOf()!==i[o].valueOf()))return!1}return!0}function gr(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const $r=(n,e,t)=>n??e??t,ff=to({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const s=Fn(Vs),i=Rn(()=>n.route||s.value),r=Fn(lr,0),o=Rn(()=>{let u=hn(r);const{matched:c}=i.value;let f;for(;(f=c[u])&&!f.components;)u++;return u}),l=Rn(()=>i.value.matched[o.value]);Dt(lr,Rn(()=>o.value+1)),Dt(ju,l),Dt(Vs,i);const a=pe();return Ne(()=>[a.value,l.value,n.name],([u,c,f],[p,g,y])=>{c&&(c.instances[f]=u,g&&g!==c&&u&&u===p&&(c.leaveGuards.size||(c.leaveGuards=g.leaveGuards),c.updateGuards.size||(c.updateGuards=g.updateGuards))),u&&c&&(!g||!Qe(c,g)||!p)&&(c.enterCallbacks[f]||[]).forEach(w=>w(u))},{flush:"post"}),()=>{const u=i.value,c=n.name,f=l.value,p=f&&f.components[c];if(!p)return mr(t.default,{Component:p,route:u});const g=f.props[c],y=g?g===!0?u.params:typeof g=="function"?g(u):g:null,N=Po(p,K({},y,e,{onVnodeUnmounted:L=>{L.component.isUnmounted&&(f.instances[c]=null)},ref:a}));return mr(t.default,{Component:N,route:u})||N}}});function mr(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const df=ff;function hf(n){const e=nf(n.routes,n),t=n.parseQuery||Lu,s=n.stringifyQuery||or,i=n.history,r=it(),o=it(),l=it(),a=ra(ve);let u=ve;Ge&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const c=Ss.bind(null,b=>""+b),f=Ss.bind(null,bu),p=Ss.bind(null,kt);function g(b,P){let R,I;return Ho(b)?(R=e.getRecordMatcher(b),I=P):I=b,e.addRoute(I,R)}function y(b){const P=e.getRecordMatcher(b);P&&e.removeRoute(P)}function w(){return e.getRoutes().map(b=>b.record)}function N(b){return!!e.getRecordMatcher(b)}function L(b,P){if(P=K({},P||a.value),typeof b=="string"){const $=Rs(t,b,P.path),_=e.resolve({path:$.path},P),v=i.createHref($.fullPath);return K($,_,{params:p(_.params),hash:kt($.hash),redirectedFrom:void 0,href:v})}let R;if(b.path!=null)R=K({},b,{path:Rs(t,b.path,P.path).path});else{const $=K({},b.params);for(const _ in $)$[_]==null&&delete $[_];R=K({},b,{params:f($)}),P.params=f(P.params)}const I=e.resolve(R,P),V=b.hash||"";I.params=c(p(I.params));const d=yu(s,K({},b,{hash:$u(V),path:I.path})),h=i.createHref(d);return K({fullPath:d,hash:V,query:s===or?Du(b.query):b.query||{}},I,{redirectedFrom:void 0,href:h})}function E(b){return typeof b=="string"?Rs(t,b,a.value.path):K({},b)}function C(b,P){if(u!==b)return Xe(un.NAVIGATION_CANCELLED,{from:P,to:b})}function A(b){return Z(b)}function Y(b){return A(K(E(b),{replace:!0}))}function an(b,P){const R=b.matched[b.matched.length-1];if(R&&R.redirect){const{redirect:I}=R;let V=typeof I=="function"?I(b,P):I;return typeof V=="string"&&(V=V.includes("?")||V.includes("#")?V=E(V):{path:V},V.params={}),K({query:b.query,hash:b.hash,params:V.path!=null?{}:b.params},V)}}function Z(b,P){const R=u=L(b),I=a.value,V=b.state,d=b.force,h=b.replace===!0,$=an(R,I);if($)return Z(K(E($),{state:typeof $=="object"?K({},V,$.state):V,force:d,replace:h}),P||R);const _=R;_.redirectedFrom=P;let v;return!d&&wu(s,I,R)&&(v=Xe(un.NAVIGATION_DUPLICATED,{to:_,from:I}),qn(I,I,!0,!1)),(v?Promise.resolve(v):Jn(_,I)).catch(m=>ce(m)?ce(m,un.NAVIGATION_GUARD_REDIRECT)?m:be(m):J(m,_,I)).then(m=>{if(m){if(ce(m,un.NAVIGATION_GUARD_REDIRECT))return Z(K({replace:h},E(m.to),{state:typeof m.to=="object"?K({},V,m.to.state):V,force:d}),P||_)}else m=ke(_,I,!0,h,V);return _e(_,I,m),m})}function Gn(b,P){const R=C(b,P);return R?Promise.reject(R):Promise.resolve()}function me(b){const P=Fe.values().next().value;return P&&typeof P.runWithContext=="function"?P.runWithContext(b):b()}function Jn(b,P){let R;const[I,V,d]=Hu(b,P);R=Es(I.reverse(),"beforeRouteLeave",b,P);for(const $ of I)$.leaveGuards.forEach(_=>{R.push(ye(_,b,P))});const h=Gn.bind(null,b,P);return R.push(h),Mn(R).then(()=>{R=[];for(const $ of r.list())R.push(ye($,b,P));return R.push(h),Mn(R)}).then(()=>{R=Es(V,"beforeRouteUpdate",b,P);for(const $ of V)$.updateGuards.forEach(_=>{R.push(ye(_,b,P))});return R.push(h),Mn(R)}).then(()=>{R=[];for(const $ of d)if($.beforeEnter)if(Vn($.beforeEnter))for(const _ of $.beforeEnter)R.push(ye(_,b,P));else R.push(ye($.beforeEnter,b,P));return R.push(h),Mn(R)}).then(()=>(b.matched.forEach($=>$.enterCallbacks={}),R=Es(d,"beforeRouteEnter",b,P,me),R.push(h),Mn(R))).then(()=>{R=[];for(const $ of o.list())R.push(ye($,b,P));return R.push(h),Mn(R)}).catch($=>ce($,un.NAVIGATION_CANCELLED)?$:Promise.reject($))}function _e(b,P,R){l.list().forEach(I=>me(()=>I(b,P,R)))}function ke(b,P,R,I,V){const d=C(b,P);if(d)return d;const h=P===ve,$=Ge?history.state:{};R&&(I||h?i.replace(b.fullPath,K({scroll:h&&$&&$.scroll},V)):i.push(b.fullPath,V)),a.value=b,qn(b,P,R,h),be()}let Kn;function nt(){Kn||(Kn=i.listen((b,P,R)=>{if(!Te.listening)return;const I=L(b),V=an(I,Te.currentRoute.value);if(V){Z(K(V,{replace:!0,force:!0}),I).catch($t);return}u=I;const d=a.value;Ge&&Au(rr(d.fullPath,R.delta),fs()),Jn(I,d).catch(h=>ce(h,un.NAVIGATION_ABORTED|un.NAVIGATION_CANCELLED)?h:ce(h,un.NAVIGATION_GUARD_REDIRECT)?(Z(K(E(h.to),{force:!0}),I).then($=>{ce($,un.NAVIGATION_ABORTED|un.NAVIGATION_DUPLICATED)&&!R.delta&&R.type===Us.pop&&i.go(-1,!1)}).catch($t),Promise.reject()):(R.delta&&i.go(-R.delta,!1),J(h,I,d))).then(h=>{h=h||ke(I,d,!1),h&&(R.delta&&!ce(h,un.NAVIGATION_CANCELLED)?i.go(-R.delta,!1):R.type===Us.pop&&ce(h,un.NAVIGATION_ABORTED|un.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),_e(I,d,h)}).catch($t)}))}let He=it(),$n=it(),nn;function J(b,P,R){be(b);const I=$n.list();return I.length?I.forEach(V=>V(b,P,R)):console.error(b),Promise.reject(b)}function le(){return nn&&a.value!==ve?Promise.resolve():new Promise((b,P)=>{He.add([b,P])})}function be(b){return nn||(nn=!b,nt(),He.list().forEach(([P,R])=>b?R(b):P()),He.reset()),b}function qn(b,P,R,I){const{scrollBehavior:V}=n;if(!Ge||!V)return Promise.resolve();const d=!R&&Cu(rr(b.fullPath,0))||(I||!R)&&history.state&&history.state.scroll||null;return Rt().then(()=>V(b,P,d)).then(h=>h&&Pu(h)).catch(h=>J(h,b,P))}const En=b=>i.go(b);let Be;const Fe=new Set,Te={currentRoute:a,listening:!0,addRoute:g,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:N,getRoutes:w,resolve:L,options:n,push:A,replace:Y,go:En,back:()=>En(-1),forward:()=>En(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:$n.add,isReady:le,install(b){b.component("RouterLink",af),b.component("RouterView",df),b.config.globalProperties.$router=Te,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>hn(a)}),Ge&&!Be&&a.value===ve&&(Be=!0,A(i.location).catch(I=>{}));const P={};for(const I in ve)Object.defineProperty(P,I,{get:()=>a.value[I],enumerable:!0});b.provide(ds,Te),b.provide(hi,Kr(P)),b.provide(Vs,a);const R=b.unmount;Fe.add(b),b.unmount=function(){Fe.delete(b),Fe.size<1&&(u=ve,Kn&&Kn(),Kn=null,a.value=ve,Be=!1,nn=!1),R()}}};function Mn(b){return b.reduce((P,R)=>P.then(()=>me(R)),Promise.resolve())}return Te}function pf(){return Fn(ds)}function hs(n){return Fn(hi)}const Gs=[{text:"入门",items:[{text:"概述",link:"/v1.0/"},{text:"词法结构",link:"/v1.0/lexical"},{text:"类型系统",link:"/v1.0/types"},{text:"变量与赋值",link:"/v1.0/variables"},{text:"表达式与运算符",link:"/v1.0/expressions"},{text:"控制流",link:"/v1.0/control-flow"},{text:"词条系统",link:"/v1.0/entries"},{text:"JSON 数据处理",link:"/v1.0/json"},{text:"面向对象编程",link:"/v1.0/oop"},{text:"模块与引入",link:"/v1.0/modules"},{text:"函数",link:"/v1.0/functions"},{text:"内置函数",link:"/v1.0/flow-output",children:[{text:"回调",link:"/v1.0/flow-callback"},{text:"主回调",link:"/v1.0/flow-main-callback"},{text:"打印",link:"/v1.0/output-print"},{text:"打印返回",link:"/v1.0/output-print-return"},{text:"服务器",link:"/v1.0/server"},{text:"对象创建",link:"/v1.0/object"},{text:"字符串",link:"/v1.0/string"},{text:"数学",link:"/v1.0/math"},{text:"网络",link:"/v1.0/network"},{text:"类型",link:"/v1.0/type"},{text:"文件",link:"/v1.0/file"},{text:"画布",link:"/v1.0/canvas"}]}]}];function Vo(n){const e=[];for(const t of n)t.link&&!t.children?e.push(t):t.children&&(t.link&&e.push({text:t.text,link:t.link}),e.push(...Vo(t.children)));return e}const It=Gs.flatMap(n=>Vo(n.items));function gf(){const n=hs(),e=Rn(()=>It.findIndex(i=>i.link.split("#")[0]===n.path)),t=Rn(()=>e.value>0?It[e.value-1]:null),s=Rn(()=>e.value<It.length-1?It[e.value+1]:null);return{prev:t,next:s}}const De=(n,e)=>{const t=n.__vccOpts||n;for(const[s,i]of e)t[s]=i;return t},$f={class:"sidebar-nav"},mf={class:"sidebar-section-title"},_f=["href"],bf=["href"],vf={key:1,class:"sidebar-section-title"},xf=["href"],yf={class:"sidebar-sub-title"},wf={class:"sidebar-sub-group"},kf=["href"],Tf=["href"],Sf={key:2,class:"sidebar-sub-title"},Rf={__name:"Sidebar",setup(n){const e=hs();function t(i){const r=i.indexOf("#"),o=r>=0?i.substring(0,r):i,l=r>=0?i.substring(r):"";return"#"+o+l}function s(i){const[r,o]=i.split("#");return o?e.path===r&&e.hash==="#"+o:e.path===r&&!e.hash}return(i,r)=>(F(),U("nav",$f,[(F(!0),U(cn,null,Ee(hn(Gs),(o,l)=>(F(),U("div",{key:o.text,class:Hn(["sidebar-group",{"has-divider":l<hn(Gs).length-1}])},[z("p",mf,bn(o.text),1),(F(!0),U(cn,null,Ee(o.items,a=>(F(),U(cn,{key:a.link||a.text},[a.link&&!a.children?(F(),U("a",{key:0,href:t(a.link),class:Hn(["sidebar-link","sidebar-link-sub",{active:s(a.link)}])},bn(a.text),11,_f)):(F(),U(cn,{key:1},[a.link?(F(),U("a",{key:0,href:t(a.link),class:Hn(["sidebar-section-title","sidebar-section-link",{active:s(a.link)}])},bn(a.text),11,bf)):(F(),U("p",vf,bn(a.text),1)),(F(!0),U(cn,null,Ee(a.children||[],u=>(F(),U(cn,{key:u.link||u.text},[u.link&&!u.children?(F(),U("a",{key:0,href:t(u.link),class:Hn(["sidebar-link","sidebar-link-sub",{active:s(u.link)}])},bn(u.text),11,xf)):u.children?(F(),U(cn,{key:1},[z("p",yf,bn(u.text),1),z("div",wf,[(F(!0),U(cn,null,Ee(u.children,c=>(F(),U(cn,{key:c.link||c.text},[c.link&&!c.children?(F(),U("a",{key:0,href:t(c.link),class:Hn(["sidebar-link","sidebar-link-fn",{active:s(c.link)}])},bn(c.text),11,kf)):c.children&&c.link?(F(),U("a",{key:1,href:t(c.link),class:Hn(["sidebar-link","sidebar-link-fn",{active:s(c.link)}])},bn(c.text),11,Tf)):c.children?(F(),U("p",Sf,bn(c.text),1)):Ie("",!0)],64))),128))])],64)):Ie("",!0)],64))),128))],64))],64))),128))],2))),128))]))}},Of=De(Rf,[["__scopeId","data-v-3b852181"]]),Ef={key:0,class:"right-nav"},Pf=["onClick"],Af={__name:"RightNav",setup(n){const e=hs(),t=pf(),s=pe([]),i=pe("");let r=[],o=!1;function l(){const f=document.querySelector(".markdown-body");if(!f){s.value=[],r=[];return}r=Array.from(f.querySelectorAll("h2[id], h3[id]")),s.value=r.map(p=>({id:p.id,text:p.textContent,tag:p.tagName}))}function a(f){t.replace({hash:"#"+f});const p=document.getElementById(f);p&&p.scrollIntoView({behavior:"smooth",block:"start"})}function u(){if(!r.length)return;let f=r[0].id;for(const p of r)p.getBoundingClientRect().top<=120&&(f=p.id);i.value=f}function c(){o||(requestAnimationFrame(()=>{u(),o=!1}),o=!0)}return Ne(()=>e.path,()=>Rt(l),{immediate:!0}),oo(()=>window.addEventListener("scroll",c,{passive:!0})),ci(()=>window.removeEventListener("scroll",c)),(f,p)=>s.value.length?(F(),U("nav",Ef,[(F(!0),U(cn,null,Ee(s.value,g=>(F(),U("a",{key:g.id,href:"javascript:void(0)",class:Hn(["right-nav-link",{active:i.value===g.id},g.tag==="H3"?"sub":""]),onClick:y=>a(g.id)},bn(g.text),11,Pf))),128))])):Ie("",!0)}},Cf=De(Af,[["__scopeId","data-v-aef8329c"]]),Go=`# @画布

内置函数 | 共 29 个函数。画布模块提供像素级图像创建、绘制、特效处理。

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

[← @类型](./type)

[文件操作 →](./file)
`,Jo=`# 控制流

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
`,qo='# 表达式与运算符\n\n表达式是 NR 中执行计算和逻辑判断的核心机制。本章涵盖数学表达式 `[...]`、比较运算符、逻辑运算符及其优先级规则。理解运算符的优先级、结合性和类型转换行为，对于编写正确的 [条件判断](./control-flow) 和[变量赋值](./variables)至关重要。\n\nNR 的运算符体系分为三个层级：**数学运算符**（在 `[...]` 内使用）、**比较运算符**和**逻辑运算符**。它们在表达式中按固定的优先级顺序求值。\n\n## 数学表达式 `[...]`\n\n```\nresult:[1+2*3]              → "7"\nscore:[%base%*2+10]\n```\n\n### 运算符优先级总表（从高到低）\n\n| 优先级 | 类别 | 运算符 | 结合性 | 说明 |\n|--------|------|--------|--------|------|\n| 1（最高） | 分组 | `()` | — | 括号分组 |\n| 2 | 一元 | `-` | 右→左 | 一元负号 |\n| 3 | 幂 | `^` | 右→左 | 幂运算（`2^3^2 = 2^9 = 512`） |\n| 4 | 乘除取余 | `*` `/` `%` | 左→右 | 乘、除、取余 |\n| 5 | 加减 | `+` `-` | 左→右 | 加、减 |\n| 6 | 位移 | `<<` `>>` | 左→右 | 左移、右移 |\n| 7 | 比较 | `>=` `<=` `>` `<` `==` `!=` `===` `!==` `~=` `in` | — | 比较运算（非数学表达式） |\n| 8 | 逻辑 AND | `&&` `&` | 左→右（短路） | 逻辑与 |\n| 9（最低） | 逻辑 OR | `\\|\\|` `\\|` | 左→右（短路） | 逻辑或 |\n\n**结合性说明**：\n\n- **左结合**（左→右）：`a / b / c` 解释为 `(a / b) / c`\n- **右结合**（右→左）：`- -x` 解释为 `-(-x)`；`2^3^2` 解释为 `2^(3^2)`\n\n注意：比较和逻辑运算符不在 `[...]` 数学表达式中使用——它们出现在条件语句（`如果:`、`循环>`）和 `$if$` 等结构中。数学表达式 `[...]` 内部仅使用优先级 1-6 的运算符。\n\n- 整数运算结果仍为整数，浮点数参与则为浮点\n- 位运算和幂运算强制转整数\n\n### 混合类型运算的边界情况\n\n当数学表达式中混合不同类型的操作数时，结果遵循以下规则：\n\n```\n// 类型提升示例\n[1+2.0]        → 3.0   （Int + Float → Float）\n[3/2]          → 1     （Int 除法，截断）\n[3/2.0]        → 1.5   （Float 除法）\n\n// 边界情况\n[1/0]          → 报错（整数除零）\n[1.0/0.0]      → inf   （浮点除零，返回无穷大）\n[-2147483648]    → 溢出 (i64 边界)\n[0.1+0.2]      → 0.30000000000000004  （IEEE 754 精度问题）\n```\n\n**注意事项：**\n\n- 整数除法 `a / b` 结果为整数（向零截断），不是四舍五入。\n- 幂运算 `a ^ b` 要求 b 为非负整数（包括 0）。\n- 位移运算 `a << b` 中 b 必须是非负整数，且结果类型为整数。\n\n## 比较运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `==` | 字符串相等（宽松，自动类型转换） |\n| `!=` | 字符串不等（宽松） |\n| `===` | 严格相等（比较值和类型） |\n| `!==` | 严格不等（比较值和类型） |\n| `>=` `<=` `>` `<` | 数值比较 |\n| `~=` | 正则匹配 |\n| `in` | 包含判断 |\n\n### 严格比较 `===` / `!==`\n\n- `===` 要求值和**类型**都相同：`1 === 1` 为真，`1 === 1.0`（Int vs Float）为假\n- `!==` 取反：类型不同或值不同时为真\n- 普通 `==` / `!=` 做字符串比较，不区分类型\n\n```\n如果:%a%===1       ← 严格检查整数 1\n整数 1\n如果尾\n\n如果:%a%===1.5     ← 严格检查浮点数 1.5\n浮点数 1.5\n如果尾\n```\n\n### 比较运算边界情况\n\n```\n// 数值比较中的类型问题\n[1>0.5]          → 在条件中为真（自动类型提升比较数值）\n1 == 1.0            → 条件判断中为真（宽松相等，都转为 "1"）\n1 === 1.0           → 条件判断中为假（严格相等，Int vs Float）\n```\n\n- 数值比较（`>` `<` `>=` `<=`）会自动尝试将双方转为数值再比较。一方无法转数值时报错。\n- `==` 宽松相等适合快速判断，但**在需要区分 Int/Float 时请用 `===`**。\n- `~=`（正则匹配）右侧必须是正则模式；`in` 左侧检查是否包含于右侧（字符串子串或数组元素）。\n\n## 逻辑运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `&&` / `&` | 逻辑 AND（短路） |\n| `\\|\\|` / `\\|` | 逻辑 OR（短路） |\n\n单操作数时做真值判断：非空、非 `"0"`、非 `"false"`、非 `"null"` 为真。\n',Wo=`\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF\uFEFF# 文件操作

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

> 所有文件操作函数失败时返回空字符串，建议在关键操作前使用 \`$存在文件$\` 或 \`$存在文件夹$\` 做前置检查。\`$写$\`/\`$读$\` 提供键值数据库抽象，适合缓存和持久化状态。网络下载请参见 [@访问](./network) 的超时说明。

[← @画布](./canvas)

[返回内置函数 →](./flow-output)
`,Yo=`# $回调$ — 正则匹配内部词条

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

> 回调机制基于正则匹配内部词条，在独立子上下文中执行。`,Zo=`# $主回调$ — 匹配主词条

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

> \`$回调$\` 和 \`$主回调$\` 是 NR 实现逻辑分发和控制反转的核心。`,Qo=`# 内置函数

NR 语言所有函数在引擎启动时即注册完毕，始终可用，无需任何导入声明。

| 分类 | 章节 | 函数数量 | 说明 |
| --- | --- | --- | --- |
| 流程控制 | [流程控制](./flow-callback) | 2 | \`$回调$\`、\`$主回调$\` |
| 输出 | [输出](./output-print) | 2 | \`$打印$\`、\`$打印返回$\` |
| 服务器 | [服务器](./server) | 1 | \`$启动服务器$\` |
| 对象创建 | [对象创建](./object) | 1 | \`$new$\` |
| 访问 | [访问](./network) | 3 | 快捷 HTTP 请求 |
| 文件操作 | [文件操作](./file) | 23 | 文件读写、存在判断、列表、删除等 |
| 画布 | [@画布](./canvas) | 29 | 像素级图像绘制 |
| 字符串 | [@字符串](./string) | 26 | 字符串操作 |
| 数学 | [@数学](./math) | 8 | 数学运算 |
| 访问状态机 | [@访问](./network) | 12 | HTTP 客户端状态机 |
| 类型转换 | [@类型](./type) | 4 | 类型转换 |

## 内置函数

所有函数均为引擎内置，无需 \`#引入\` 即可直接调用。

[← 模块与引入](./modules) [流程控制 →](./flow-callback)
`,Xo=`# 函数

函数是 NR 语言中封装可复用逻辑的基本单元。本章涵盖函数定义语法、参数传递、可变参数、递归限制、初始化函数（\`[f]初始化\`）以及脚本执行入口（\`[f]main\`）。

- **函数调用表达式**：以 \`$函数名 参数$\` 形式主动调用，在所在位置被返回值替换。
- **声明即执行**：函数体中每行按顺序执行，最后一行的值（或 \`$打印返回$\` 的结果）即为返回值。
- **与词条的区别**：函数通过 \`$...$\` 主动调用，而词条由触发词匹配引擎驱动。
- **\`[f]main\` 执行入口**：文件被加载时自动调用，是脚本执行的起点。
- **\`[f]初始化\`**：文件加载时自动执行一次，常用于设置默认变量值。

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

## \`[f]初始化\`

- \`[f]初始化\` 是一个独立函数，在文件被引入时自动执行一次
- 常用于设置默认变量值、初始化全局状态
- 位于词条区域（空行之后），与其他函数定义位置相同

## \`[f]main\` — 执行入口

\`[f]main\` 是 NR 脚本的**执行入口函数**。当 \`.nr\` 文件被直接加载或作为入口文件运行时，引擎会自动查找并执行 \`[f]main\`：

\`\`\`
[f]main
$打印 程序启动$
结果：[%x%+%y%]
\`\`\`

- **自动执行**：文件加载完成后，引擎自动调用 \`[f]main\`
- **执行顺序**：\`[f]初始化\` 先于 \`[f]main\` 执行
- **返回值**：\`[f]main\` 最后一行的值即为整个脚本的返回值
- **可缺省**：如果文件中没有定义 \`[f]main\`，引擎不会报错，仅执行头部区域和 \`[f]初始化\`

### \`[f]初始化\` 与 \`[f]main\` 的区别

| 特性 | \`[f]初始化\` | \`[f]main\` |
|------|------------|-----------|
| 执行时机 | 文件被引入时，最先执行 | 文件被引入时，\`[f]初始化\` 之后执行 |
| 典型用途 | 设置默认变量、初始化全局状态 | 脚本主逻辑入口 |
| 能否省略 | 可以 | 可以 |
| 执行次数 | 每个文件一次 | 入口文件一次
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
| [内置函数](./flow-output) | 流程控制、输出、服务器、对象创建、字符串、数学、网络、类型、画布、文件操作 |

## 快速开始

一个 \`.nr\` 文件由**头部区域**和**词条区域**组成，两者用空行分隔：

\`\`\`
头部变量/引入代码

                            ← 空行分隔
[f]初始化                   ← 引入时自动执行一次
$打印 初始化完成$

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

- **VS Code 语法高亮扩展**：为 \`.nr\` 文件提供语法高亮、注释切换、括号匹配等支持。<a href="./vscode-nr/nr-language-0.1.0.vsix">点击下载 .vsix</a>

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
> 关于 JSON 数组操作的更多内容，参见 [@类型](./type)

[← 函数](./functions) [面向对象编程 →](./oop)
`,tl=`# 词法结构

本章介绍 NR 语言的基础词法规则，涵盖源文件结构、注释、转义、字符串语法等核心概念。词法结构决定了你的代码如何被解析器"阅读"，理解这些规则是写出正确 NR 代码的第一步。后续章节中涉及的[类型系统](./types)、[变量赋值](./variables)等均在此基础上工作。

NR 源文件要求使用 **UTF-8 编码**。解析器在处理文件时会 trim 行首尾空白，但保留缩进结构。一个合法的 \`.nr\` 文件至少包含：头部区域的可选初始化代码、一个空行分隔符，以及至少一个词条或函数定义。

## 源文件结构

一个 \`.nr\` 文件由**头部区域**和**词条区域**组成，两者用空行分隔：

\`\`\`
头部变量/引入代码

                            ← 空行分隔
[f]初始化                   ← 引入时自动执行一次
$打印 初始化完成$

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

> **自动执行函数**：文件被引入时，引擎会按顺序自动查找并执行 \`[f]初始化\` 和 \`[f]main\`。两者均为独立函数，定义在词条区域（空行之后），而非头部区域。\`[f]初始化\` 先于 \`[f]main\` 执行。详见 [函数](./functions)。

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
`,sl=`# @数学

共 8 个函数。提供绝对值、最值、幂运算、求和、取整等基础数学运算。

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
`,il=`# 模块与引入

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
\`\`\`

### 使用引入的包

引入后通过 \`$包名.成员$\` 访问：

\`\`\`
$other.方法$               ← 调用包内函数
$other.主回调$             ← 匹配包内词条
%other.变量%               ← 读取包头部变量
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

### 批量引入

多个路径可用逗号分隔，一次引入多个模块/文件：

\`\`\`
#引入=a.nr,b.nr,plugins/             // 批量引入文件和目录
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
> - **初始化顺序**：多个引入的 \`[f]初始化\` 按头部的**定义顺序**依次执行
> - **包内词条隔离**：被引入包的词条不会参与当前文件的**主触发匹配**——只能通过 \`$包名.主回调$\` 显式调用
> - 关于词条系统和函数的基础概念，参见[第 6 章 词条系统](./entries)和[第 7 章 函数](./functions)

[← 面向对象编程](./oop) [内置函数 →](./flow-output)
`,rl=`# 访问 · @访问

NR 提供 HTTP 客户端调用：**快捷函数**（\`$访问$\`、\`$访问POST$\`、\`$访问转发$\`）和 **@访问 状态机 API**（精细控制请求的每个阶段）。

## 网络访问概述

两种调用方式对比：

- **快捷函数**：\`$访问$\`、\`$访问POST$\`、\`$访问转发$\` — 无需导入，一行完成的简化调用。适合简单场景。
- **@访问 状态机 API**：精细控制请求的每个阶段——创建、切换方法、设置头部/超时、发送、读取结果。适合需要定制请求细节的复杂场景。

## @访问

所有函数均为引擎内置，无需导入。@访问 模块提供**OOP 风格**的 HTTP 客户端：通过 \`$创建访问 url$\` 创建请求对象，随后通过 OOP 方法调用逐步配置并发送。

**状态机流程**：创建访问 → 切换GET/POST → 设置头部 → 设置超时 → 发送 → 内容

### 状态机生命周期

\`$创建访问$\` 返回一个 OOP 请求对象。对象方法的调用形式为 \`$变量.方法$\`，对象自动维护内部状态。状态机转移路径如下：

| 阶段 | 操作 | 说明 |
| --- | --- | --- |
| 1. 创建 | \`$创建访问 url$\` | 初始化请求对象，默认 GET 方法，返回 OOP 对象 |
| 2. 配置方法 | \`$对象.切换GET$\` / \`$对象.切换POST$\` / \`$对象.POST$\` / \`$对象.POST文件$\` | 设置 HTTP 方法和请求体 |
| 3. 配置选项 | \`$对象.设置头部$\` / \`$对象.设置超时$\` / \`$对象.启用跳转$\` / \`$对象.禁用跳转$\` | 设置头部、超时、重定向策略 |
| 4. 执行 | \`$对象.发送$\` | 实际发起网络请求（阻塞） |
| 5. 读取 | \`$对象.内容$\` / \`$对象.全部内容$\` | 获取响应体 |

同一请求对象只能发送一次，发送后不可修改配置。

<a id="net-create"></a>

### \`$创建访问$\` — 创建请求对象

- **格式**：\`$创建访问 [url]$\`
- **参数**：目标 URL
- **返回值**：OOP 请求对象

初始化 HTTP 请求状态机，默认 GET 方法。

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

状态机模式（\`@访问\`）不自动添加 User-Agent，需通过 \`$对象.设置头部$\` 手动指定。

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

[← @数学](./math)

[@类型 →](./type)
`,ol=`# 对象创建

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
`,ll='# 面向对象编程\n\nNR 的 OOP 系统建立在词条引擎之上的上下文隔离与状态持久化机制。本章涵盖类定义、实例变量、对象创建与方法调用、自我调用、构造函数输出以及与传统 OOP 的对比。\n\n<dl>\n  <dt>类</dt>\n  <dd>一组绑定到特定命名空间的方法集合，使用 <code class="nr-sig">[函数:类名]</code> 语法定义。</dd>\n  <dt>实例变量</dt>\n  <dd>以 <code class="nr-sig">.字段</code> 前缀命名的变量，在对象方法调用间自动持久化。</dd>\n  <dt>对象</dt>\n  <dd>通过 <code class="nr-sig">$new ClassName$</code> 创建，每个实例维护独立的变量作用域。</dd>\n</dl>\n\n## 类定义\n\n使用 `[函数:类名]`、`[f:类名]` 或 `[F:类名]` 语法：\n\n```\n[函数:Counter]初始化\n$打印 初始化$\n.count:0\n\n[f:Counter]add num     ← [f:类名] 是 [函数:类名] 的简写\n.count+:%num%\n\n[函数:Counter]get\n当前计数：%.count%\n```\n\n- 内部触发词为 `类名.方法名`\n- 构造函数查找顺序：`类名.new` → `类名.初始化`\n\n### 类生命周期\n\n一个 NR 对象的完整生命周期如下：\n\n1. **创建**：通过 `$new ClassName args$` 创建对象实例，引擎查找并执行构造函数\n2. **初始化**：构造函数中设置初始实例变量（`.field:value`），构造函数返回类名字符串给调用者\n3. **使用**：通过 `$对象名.方法 参数$` 调用方法；每次方法调用前从存储中加载实例变量，执行后自动写回\n4. **消亡**：当对象变量被覆盖或超出作用域时，实例数据随之释放\n\n**存储机制**：实例变量存储在引擎内部的键值存储中，键的格式为 `对象名.字段名`。这意味着不同对象的 `.count` 完全独立。\n\n## 实例变量 `.字段`\n\n以 `.` 开头的变量是**实例变量**，在同一个对象的多次方法调用之间持久化：\n\n```\n[f:Counter]add num\n.count+:%num%           ← .count 跨调用保持\n```\n\n- 方法调用前从主上下文加载（`对象名.字段`），执行后自动写回\n- 不同对象的实例变量相互独立\n\n## 创建对象与调用方法\n\n```\nobj:$new Counter$\nobj:$new Counter 参数$\n\n$obj.add 5$             ← 调用方法\n$obj.get$               ← 无参调用\n```\n\n方法返回值通过 `$...$` 替换到调用处。\n\n## 自我调用 `$.method$`\n\n在类方法内部，使用 `$.方法名` 调用同一对象的其他方法：\n\n```\n[函数:Counter]get\n$.add 1$                ← 等价于 $Counter.add 1$\n当前计数：%.count%\n```\n\n- `$.method$` 通过 `self` 变量自动解析为 `ClassName.method`\n- 只能在类方法内部使用（`self` 变量不为空时生效）\n- 支持传参：`$.method arg1 arg2$`\n\n## 构造函数与输出\n\n```\n[函数:Counter]初始化\n.count:0\na                       ← 裸文本直接打印到终端\n$打印 初始化$            ← $打印$ 输出到终端\n```\n\n- 构造函数中的裸文本直接打印到终端，不走管道输出\n- `$打印$` 和 `$打印返回$` 同样输出到终端\n- 构造函数返回 `类名` 字符串（可赋给变量）\n\n## NR OOP vs 传统 OOP 对比\n\n| 概念 | NR OOP | 传统 OOP（Java/Python） |\n| --- | --- | --- |\n| 类定义 | `[函数:类名]方法名` 分散定义 | `class { }` 集中定义 |\n| 继承 | 不支持类继承 | `extends` / 接口实现 |\n| 实例变量 | `.字段`，引擎自动持久化 | `this.field`，内存中维护 |\n| 构造函数 | `类名.new` 或 `类名.初始化` | `constructor()` / `__init__()` |\n| 方法调用 | `$对象.方法 args$` | `obj.method(args)` |\n| 自我调用 | `$.method$` 语法糖 | `this.method()` |\n| 访问控制 | 无 public/private，全公开 | public/protected/private |\n| 多态 | 不支持 | 虚函数/接口 |\n| 适用场景 | 对话状态、简单实体、计数器 | 通用软件工程 |\n\n> **注意事项**\n> - **无继承**：NR 不支持类继承。如需共享行为，使用[普通函数](./functions)或[模块引入](./modules)替代\n> - **实例变量命名**：`.字段` 命名空间与普通变量独立，`.count` 和 `count` 是两个不同的变量\n> - **构造函数返回值**：构造函数返回的是**类名字符串**（如 `"Counter"`），而非对象引用。真正的"对象标识"是赋值的变量名\n> - **方法中修改实例变量**：在类方法中修改 `.字段` 后，引擎**在执行完毕后自动写回**——不需要显式的 "save" 操作\n> 关于对象创建 `$new$` 的更多用法，参见[对象创建](./object)\n\n[← JSON 数据处理](./json) [模块与引入 →](./modules)\n',al=`# $打印返回$ — 输出并返回

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

内置函数 | 共 3 个（\`$创建服务器$\`、\`.静态\`、\`.启动\`）。支持 OOP 风格启动 TCP/HTTP 双栈服务器，可配置静态文件服务。

## OOP 风格

\`\`\`
$s:创建服务器$                  # 创建服务器对象，返回句柄 服务器@N
$s.静态 本地目录 网络路径$       # 配置静态文件服务（网络路径可留空=根路径）
$s.启动 端口 处理函数$           # 启动服务器开始监听
\`\`\`

### \`$创建服务器$\` — 创建服务器对象

<dl>
  <dt>格式</dt><dd><code>$var:创建服务器$</code></dd>
  <dt>参数</dt><dd>无</dd>
  <dt>返回值</dt><dd>服务器实例句柄（如 <code>服务器@0</code>），存入指定变量</dd>
</dl>

创建一个服务器 OOP 实例，默认端口 8080，未配置静态目录和处理函数。

\`\`\`
$s:创建服务器$
$打印 服务器句柄：%s%$     # → 服务器句柄：服务器@0
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

支持的 MIME 类型：

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

> 转发时读取 \`_DATA\` 变量获取原始请求数据。详见 [@访问](./network#net-访问转发)。

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

> 服务器自动检测 HTTP/TCP，HTTP 模式返回标准响应，TCP 模式支持长连接逐行交互。配合 [@访问](./network) 可构建完整 Web 服务。

[← 输出](./output-print) [对象创建 →](./object)
`,fl=`# @字符串

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

> 所有字符串函数均基于字符（非字节）操作，Unicode 安全。判断类函数返回 "1"/"0"。需要数字判断和转换的场景，请结合 [@类型](./type) 模块使用。

[← 流程控制·输出](./flow-output) [@数学 →](./math)
`,dl=`# @类型

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

> 类型转换失败时均返回空字符串（不赋值），建议在关键转换前配合判断函数做前置验证。详情参见 [@数学](./math) 的浮点精度说明。

[← @访问](./network)

[@画布 →](./canvas)
`,hl='# 类型系统\n\nNR 的类型系统是**动态、弱类型**的——变量无需声明类型，运行时自动确定。值在大多数场景下会自动在文本和数字之间转换，`==` 运算符做宽松比较。本章涵盖 NR 中的原始数据类型（没有对象/数组，只有文本、数字和布尔值），以及类型检测、判断和转换操作。\n\nNR 的 `Value` 不是简单的"字符串或数字"二分法——它是一个完整的枚举类型，内部由 Rust 的 `enum` 实现，每个变体携带不同的数据表示。这意味着两个值即使"看起来一样"，也可能属于不同类型，进而影响相等性比较和运算行为。\n\n## 类型一览\n\nNR 变量存储的是**带类型的值**（`Value`），而非纯字符串。类型在赋值时自动推断。\n\n| 类型 | 示例 | 说明 |\n|------|------|------|\n| `整数` | `1`, `-5`, `100` | 64 位有符号整数 |\n| `浮点` | `1.5`, `-0.5`, `3.14` | 64 位浮点数 |\n| `字符串` | `"hello"`, `abc` | 字符串 |\n| `布尔` | `true`, `false` | 布尔值 |\n| `空` | `null` | 空值 |\n| `对象` | — | 对象引用（`$new$` 返回） |\n| `函数` | — | 函数指针（`%func@name%` 返回） |\n\n- `count:5` → Int，`name:Alice` → Str\n- 但 `[...]` 数学表达式运算结果保留数值类型\n- `$new$` 返回值为对象类型\n- `%func@key%` 返回值为函数类型\n\n## 各类型详解\n\n### 整数（Int）\n\n64 位有符号整数（`i64`），范围约为 `-9.2×10¹⁸` 到 `9.2×10¹⁸`。\n\n```\na:42\nb:-100\nc:0\n\n%TYPE@a%   → "整数"\n%TYPE@b%   → "整数"\n%TYPE@c%   → "整数"\n```\n\n整数字面量不能包含小数点、前导零（会被当作十进制解析）或科学计数法。\n\n### 浮点（Float）\n\n64 位浮点数（`f64`），符合 IEEE 754 标准。\n\n```\npi:3.14\nneg:-0.5\nbig:1.5e10\n\n%TYPE@pi%    → "浮点"\n%TYPE@neg%   → "浮点"\n%TYPE@big%   → "浮点"\n```\n\n浮点数和整数在比较（`==`）时**视为不同**：`1 == 1.0` 在严格比较下为假。浮点运算可能产生精度误差，这是 IEEE 754 浮点数的固有特性。\n\n### 字符串（Str）\n\nUTF-8 编码的字符串。不带特殊前缀的纯文本字面量自动判定为字符串。\n\n```\nname:Alice\ngreeting:Hello World\nempty:""              ← 显式空字符串\n\n%TYPE@name%       → "字符串"\n%TYPE@greeting%   → "字符串"\n```\n\n注意：`greeting:Hello World` 中空格不需要转义（赋值操作符 `:` 之后直到行尾均为值部分）。但在 `$...$` 参数传递中空格会分割参数，参见 [词法结构 § 转义规则](./lexical)。\n\n### 布尔（Bool）\n\n只有 `true` 和 `false` 两个字面量。\n\n```\nflag:true\ndone:false\n\n%TYPE@flag%   → "布尔"\n%TYPE@done%   → "布尔"\n```\n\n布尔值可直接用于条件表达式（[控制流](./control-flow)），也可参与逻辑运算（[表达式 § 逻辑运算符](./expressions)）。\n\n### 空值（Null）\n\n表示"无值"或"未设置"。仅有一种字面量：`null`。\n\n```\ndata:null\n\n%TYPE@data%   → "空"\n```\n\n`null` 与空字符串 `""` 不同：`null` 是一个独立的类型标记，而 `""` 是值为空的字符串。在条件判断中，`null` 被视为假值。\n\n### 对象（Object）\n\n由 `$new$` 创建，内部持有一个 JSON 对象引用。对象类型值不可直接输出为文本，需通过 `%TYPE@` 查询或使用 JSON 操作符访问其字段。\n\n```\nobj:$new$ {"key":"val"}\n\n%TYPE@obj%   → "对象"\n```\n\n`$new$` 不是赋值操作符——它是创建新对象的内置函数，参见 [词条系统](./entries)。\n\n### 函数（Func）\n\n由 `%func@name%` 获取，存储的是函数指针/引用，而非函数体文本。\n\n```\nptr:%func@greet%\n\n%TYPE@ptr%   → "函数"\n```\n\n函数类型值主要用途：作为回调传入其他函数，或在需要延迟调用时暂存。\n\n## 类型特性对照\n\n| 类型 | 可修改（`+:` 等） | 宽松相等 `==` | 严格相等 `===` | 数值排序 `>` `<` |\n|------|-------------------|--------------|---------------|------------------|\n| Int | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Float | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Str | ✅ 串接 | 内容比较（含类型转换） | 值和类型均相同 | ❌ 无意义 |\n| Bool | ❌ | 字符串化后比较 | 值和类型均相同 | ❌ |\n| Null | ❌ | — | — | ❌ |\n| Object | — | 引用相等 | 引用相等 | ❌ |\n| Func | ❌ | 引用相等 | 引用相等 | ❌ |\n\n## 类型强制转换与兼容性\n\n### 算术上下文中的类型转换\n\n在 `[...]` 数学表达式中，操作数的类型决定了运算结果的类型：\n\n```\n// 整数运算 → 整数\na:[1+2]          → Int(3)\n\n// 浮点数参与 → 浮点\nb:[1+2.0]        → Float(3.0)\nc:[3.14*2]       → Float(6.28)\n\n// 字符串自动转为数值参与运算\nd:["3"+2]        → Int(5)  或报错\n```\n\n- 整数 + 整数 → 整数\n- 任一操作数为浮点 → 结果提升为浮点\n- 字符串操作数：尝试按数值解析，失败则报错\n\n### 比较上下文中的类型转换\n\n`==`（宽松相等）会将两边值转为字符串后比较：\n\n```\n1 == "1"       → true（都转为 "1"）\n1 == 1.0       → true（都转为 "1"，但用 === 则为 false）\ntrue == "true" → true\nnull == ""     → false（"null" ≠ ""）\n```\n\n`===`（严格相等）要求**类型和值都相同**：\n\n```\n1 === 1       → true\n1 === 1.0     → false（Int vs Float）\n"1" === 1     → false（Str vs Int）\ntrue === true → true\n```\n\n**注意事项：**\n\n- 条件判断中（如 `如果:`），**推荐使用严格比较 `===`** 以避免意外的类型转换带来的误判。\n- 数值比较（`>`、`<`、`>=`、`<=`）要求两边均为数值类型（Int 或 Float），字符串会被尝试解析为数值。\n- `0`、`""`、`null`、`false` 在布尔上下文中均为"假"，但它们彼此之间**不相等**（除了 `0 == false` 会因为字符串化为 `"0" == "false"` 而返回假）。\n\n## 类型查询 `%TYPE@var%`\n\n```\ncount:5\nname:Alice\n\n%TYPE@count%   → "整数"\n%TYPE@name%    → "字符串"\n```\n\n未设置变量返回空字符串。\n',pl='# 变量与赋值\n\n变量是 NR 中最基本的存储单元。本章涵盖变量的作用域规则、赋值操作符的语义差异、条件赋值、内置变量以及文本切片等核心机制。理解变量系统是正确组织数据流和控制状态的前提，与[类型系统](./types)和[表达式](./expressions)密切协作。\n\nNR 的赋值不是简单的"文本替换"——它会根据操作符和值的内容自动推断类型（[§ 类型一览](./types)），并在不同作用域间管理变量生命周期。\n\n## 作用域\n\n| 类型 | 作用域 | 说明 |\n|------|--------|------|\n| 局部变量 | 当前上下文 | 子上下文创建时重置 |\n| 全局变量 | 所有子上下文 | 子上下文创建时克隆共享 |\n\n### 作用域选择规则\n\nNR 根据**赋值位置**自动决定变量的作用域：\n\n- **头部区域（第一个空行之前）**中赋值的变量为**全局变量**。这些变量在词条触发、函数调用等子上下文中可被读取和修改。\n- **词条、函数、循环体内部**中首次赋值的变量为**局部变量**。局部变量仅在当前执行上下文中可见，进入子函数或子上下文时会创建独立的副本。\n\n```\n// 头部区域 → 全局变量，整个文件可见\ncounter:0\nbase_url:https://api.example.com\n\n// ← 空行分隔\n\n// 词条内部 → 局部变量\n开始\ntemp:%counter%             ← 可读全局变量\ncounter+:[%counter%+1]   ← 可修改全局变量\nlocal_var:临时值            ← 局部变量，外部不可见\n```\n\n### 作用域注意事项\n\n- 全局变量在**每次词条触发时保持其值**，不会重置。这使得 `counter+:1` 可以在多次触发间累加。\n- 子上下文（如 `$call$` 函数调用）中读取全局变量时，获取的是**当前快照值**；修改全局变量会影响父上下文。\n- 在同一作用域中，对已存在的变量再次使用 `:` 赋值会**覆盖**其值和类型。\n\n## 赋值操作符\n\n| 操作符 | 示例 | 语义 |\n|--------|------|------|\n| `:` | `name:Alice` | **自适应赋值**：值尝试解析为 JSON 字面量（数字/布尔/null/对象/数组），不成则当字符串 |\n| `::` | `greeting::Hello` | **纯文本赋值**：值始终作为字符串，不解析 JSON |\n| `+:` | `score+:5` | 自增 / JSON追加 / 字符串拼接 |\n| `-:` | `count-:1` | 自减 |\n| `*:` | `val*:2` | 乘法 / 字符串重复 |\n| `/:` | `val/:2` | 除法 |\n| `%:` | `val%:3` | 取余 |\n\n> 只有 ASCII 半角冒号 `:`（U+003A）被识别为赋值操作符。中文全角冒号 `：`（U+FF1A）**不是**操作符，在文本中直接原样输出。\n\n### `:`（自适应赋值）vs `::`（纯文本赋值）\n\n这是 NR 中最容易被忽视但最重要的语义差异：\n\n| 特性 | `:`（单冒号） | `::`（双冒号） |\n|------|-------------|---------------|\n| 值解析 | 尝试解析为 JSON 字面量 | 始终作为字符串 |\n| `1` | Int(1) | Str("1") |\n| `1.5` | Float(1.5) | Str("1.5") |\n| `true` | Bool(true) | Str("true") |\n| `null` | Null | Str("null") |\n| `{"a":1}` | JSON 对象 | Str("{\'a\':1}") |\n| `Alice` | Str("Alice") | Str("Alice") |\n\n```\n// : 自适应赋值——数字被识别为数值类型\ncount:100\n%TYPE@count%   → "整数"\n\n// :: 纯文本赋值——永远是字符串\nid::100\n%TYPE@id%      → "字符串"\n\n// 实际影响：数学运算\n[%count%+1]   → 101   （Int 运算）\n// [%id%+1]   → 报错 / 意外（字符串不能加）\n```\n\n### 何时使用 `::`\n\n- 存储**编号、ID、电话号**等不应被当作数字处理的值（如 `id::001` 不会丢掉前导零）\n- 存储可能是数字字面量的**字符串**（如文件名"123.json"）\n- 需要精确控制类型以避免意外数值运算的场景\n\n**注意事项：** 当你对 `::` 赋值的变量使用 `+:`（自增）时，由于值是字符串，`+:` 会执行**字符串拼接**而非数学加法。这可能不是你想要的行为。\n\n## 条件赋值 `?:`\n\n```\nkey:@a?:@b?:fallback\n```\n\n从左到右尝试读取 JSON 路径，第一个非空、非 null、非 false 的值被赋值。\n\n## 内置变量\n\n| 变量 | 说明 |\n|------|------|\n| `%空格%` | 空格 `" "` |\n| `%换行%` | 换行 `"\\n"` |\n| `%时间戳%` | Unix 时间戳（秒） |\n| `%毫秒时间戳%` | Unix 时间戳（毫秒） |\n| `%微秒时间戳%` | Unix 时间戳（微秒） |\n| `%纳秒时间戳%` | Unix 时间戳（纳秒） |\n| `%时间%` | 格式化本地时间 `YYYY-MM-DD HH:MM:SS`（UTC+8） |\n| `%随机数M-N%` | 随机整数 `[M, N]`（含两端） |\n| `%!key%` | 布尔取反：空/0/false/null → `"1"`，否则 → `"0"` |\n| `%?key%` | 可选变量：不存在返回空字符串 |\n| `%++var%` | 自增：先自增再返回递增后的值（变量不存在默认 0） |\n| `%--var%` | 自减：先自减再返回递减后的值（变量不存在默认 0） |\n| `%参数%` | 所有参数列表（JSON 数组） |\n| `%参数0%` | 函数名 / 完整触发名 |\n| `%参数N%` | 第 N 个参数 |\n| `%self%` | 当前对象名 / 函数名 |\n| `%触发%` | 当前触发词 |\n| `%行数%` | 当前行号（1-based） |\n| `%B64@key%` | Base64 解码 |\n| `%URL编码@key%` | URL 编码 |\n| `%len@key%` / `%长度@key%` | 返回变量值的字符长度 |\n| `%@var[切片]%` / `@var[切片]` | 符号截取文本（Python 风格切片，支持 `%` 快捷两种写法） |\n| `%func@key%` | 获取函数指针（类型为"函数"，display 为函数名） |\n| `%包名.变量%` | 跨包变量引用（如 `%mypkg.x%` 读取引入包的头部变量） |\n\n### 内置变量的生命周期\n\n内置变量（`%xxx%`）与用户定义的变量在生命周期上有本质区别：\n\n- **即时求值**：每次读取内置变量（如 `%时间戳%`）时，都会**重新计算**当前值。它不存储"快照"，而是每次调用运行时函数。\n- **不可赋值**：不能对内置变量使用 `:` 赋值——`%时间戳%:123` 是无效的。\n- **临时性**：内置变量的值仅在当前表达式求值瞬间有效。如需多次使用同一值，应将其赋值给用户变量：`ts:%时间戳%`。\n- **参数变量 `%参数N%`** 在函数体内是局部变量，函数返回后失效；在词条触发时反映的是触发参数。\n\n```\n// 推荐做法：缓存内置变量\nstart_time:%毫秒时间戳%\n// ... 多步操作 ...\nelapsed:[%毫秒时间戳%-%start_time%]   ← 两次读取产生不同值，差值有意义\n```\n\n## 符号截取文本 `%@var[切片]%` / `@var[切片]`\n\n内联文本切片语法，对变量值按字符（`.chars()`）进行 Python 风格切片。中文、emoji 等多字节字符均算一个字符。\n\n**两种写法等价**：\n\n- `%@var[切片]%` —— 标准写法，需 `%` 包裹\n- `@var[切片]` —— 快捷写法，无需 `%` 包裹，直接解析\n\n**基本语法**：`@变量名[start:end:step]`\n\n| 写法 | 含义 |\n|------|------|\n| `@a[1:]` | 从第 2 个字符到末尾 |\n| `@a[1:3]` | 第 2 ~ 3 个字符（index 1 和 2，不含 3） |\n| `@a[:3]` | 前 3 个字符 |\n| `@a[-3:]` | 末尾 3 个字符 |\n| `@a[1:6:2]` | index 1~5，步长 2（隔一个取一个） |\n| `@a[::2]` | 从头到尾，步长 2 |\n| `@a[::-1]` | 反转字符串 |\n\n```\nname:你好世界NR语言\n\n%name%             → "你好世界NR语言"\n%len@name%         → "8"\n\n// 标准写法\n%@name[1:]%        → "好世界NR语言"\n%@name[1:3]%       → "好世"\n%@name[:2]%        → "你好"\n%@name[-3:]%       → "R语言"\n%@name[::-1]%      → "言语RN界世好你"\n\n// 快捷写法（无需 % 包裹）\n@name[1:]          → "好世界NR语言"\n@name[1:3]         → "好世"\n@name[:2]          → "你好"\n@name[-3:]         → "R语言"\n@name[::-1]        → "言语RN界世好你"\n```\n\n> 快捷写法 `@var[切片]` 通过方括号内含 `:` 来与 JSON 路径导航（`@json[key]`）区分。不含 `:` 的方括号仍走 JSON 路径逻辑。\n',Nf=Object.assign({"../../v1.0/canvas.md":Go,"../../v1.0/control-flow.md":Jo,"../../v1.0/entries.md":Ko,"../../v1.0/expressions.md":qo,"../../v1.0/file.md":Wo,"../../v1.0/flow-callback.md":Yo,"../../v1.0/flow-main-callback.md":Zo,"../../v1.0/flow-output.md":Qo,"../../v1.0/functions.md":Xo,"../../v1.0/index.md":nl,"../../v1.0/json.md":el,"../../v1.0/lexical.md":tl,"../../v1.0/math.md":sl,"../../v1.0/modules.md":il,"../../v1.0/network.md":rl,"../../v1.0/object.md":ol,"../../v1.0/oop.md":ll,"../../v1.0/output-print-return.md":al,"../../v1.0/output-print.md":cl,"../../v1.0/server.md":ul,"../../v1.0/string.md":fl,"../../v1.0/type.md":dl,"../../v1.0/types.md":hl,"../../v1.0/variables.md":pl}),gl=[];for(const[n,e]of Object.entries(Nf)){const t=n.match(/v1\.0\/(.+)\.md$/);if(!t)continue;let s=t[1];const i=s==="index"?"/v1.0/":`/v1.0/${s}`,r=e.match(/^#\s+(.+)$/m),o=r?r[1]:i,l=[],a=/^#{2,3}\s+(.+)$/gm;let u;for(;(u=a.exec(e))!==null;)l.push(u[1]);gl.push({path:i,title:o,headings:l,content:e})}function If(n){if(!n.trim())return[];const e=n.toLowerCase().split(/\s+/).filter(Boolean);return gl.filter(t=>{const s=(t.title+" "+t.headings.join(" ")+" "+t.content).toLowerCase();return e.every(i=>s.includes(i))}).map(t=>{const s=t.content.toLowerCase().indexOf(e[0]),i=Math.max(0,s-40),r=Math.min(t.content.length,s+120);let o=t.content.slice(i,r).replace(/\n+/g," ");return i>0&&(o="..."+o),r<t.content.length&&(o+="..."),{...t,snippet:o}}).slice(0,10)}const Mf={class:"search-modal"},Lf={class:"search-input-wrap"},Df={key:0,class:"search-results"},jf=["onClick","onMouseenter"],Hf={class:"result-title"},Bf={class:"result-path"},Ff={class:"result-snippet"},Uf={key:1,class:"search-empty"},zf={__name:"SearchModal",emits:["close"],setup(n,{emit:e}){const t=e,s=pe(""),i=pe([]),r=pe(0),o=pe(null);Rt(()=>{var u;return(u=o.value)==null?void 0:u.focus()}),Ne(s,u=>{i.value=If(u),r.value=0});function l(u){window.location.hash="#"+u,t("close")}function a(u){u.key==="Escape"?t("close"):u.key==="ArrowDown"?(u.preventDefault(),r.value=Math.min(r.value+1,i.value.length-1)):u.key==="ArrowUp"?(u.preventDefault(),r.value=Math.max(r.value-1,0)):u.key==="Enter"&&i.value[r.value]&&l(i.value[r.value].path)}return(u,c)=>(F(),U("div",{class:"search-overlay",onClick:c[2]||(c[2]=Xc(f=>t("close"),["self"]))},[z("div",Mf,[z("div",Lf,[c[3]||(c[3]=z("svg",{class:"search-icon",viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor","stroke-width":"2"},[z("circle",{cx:"11",cy:"11",r:"8"}),z("path",{d:"m21 21-4.35-4.35"})],-1)),$a(z("input",{ref_key:"inputEl",ref:o,"onUpdate:modelValue":c[0]||(c[0]=f=>s.value=f),class:"search-input",placeholder:"搜索文档...",onKeydown:a},null,544),[[Yc,s.value]]),z("button",{class:"search-close",onClick:c[1]||(c[1]=f=>t("close"))},"Esc")]),i.value.length?(F(),U("div",Df,[(F(!0),U(cn,null,Ee(i.value,(f,p)=>(F(),U("div",{key:f.path,class:Hn(["search-result",{active:p===r.value}]),onClick:g=>l(f.path),onMouseenter:g=>r.value=p},[z("div",Hf,bn(f.title),1),z("div",Bf,bn(f.path),1),z("div",Ff,bn(f.snippet),1)],42,jf))),128))])):s.value?(F(),U("div",Uf," 未找到相关结果 ")):Ie("",!0)])]))}},Vf=De(zf,[["__scopeId","data-v-66966829"]]),Gf=["value"],Jf="/v1.0/",Kf={__name:"VersionSwitcher",setup(n){const e=[{label:"v1.0",path:"/v1.0/"}];function t(s){window.location.hash="#"+s.target.value}return(s,i)=>(F(),U("select",{class:"version-select",value:Jf,onChange:t},[(F(),U(cn,null,Ee(e,r=>z("option",{key:r.path,value:r.path},bn(r.label),9,Gf)),64))],32))}},qf=De(Kf,[["__scopeId","data-v-8cf198cc"]]),Wf={class:"header"},Yf=["title"],Zf={key:0,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},Qf={key:1,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},Xf={class:"main"},nd={class:"sidebar"},ed={class:"content"},td={key:0,class:"right-aside"},sd={__name:"App",setup(n){const{isDark:e,toggle:t}=ru(),s=pe(!1);function i(r){(r.ctrlKey||r.metaKey)&&r.key==="k"&&(r.preventDefault(),s.value=!0)}return(r,o)=>{const l=Ma("router-view");return F(),U(cn,null,[z("div",{class:"app",onKeydown:i},[z("header",Wf,[o[6]||(o[6]=z("a",{class:"logo",href:"#/"},"NR 语言参考手册",-1)),gn(qf),o[7]||(o[7]=z("div",{class:"header-spacer"},null,-1)),z("button",{class:"icon-btn",onClick:o[0]||(o[0]=a=>s.value=!0),title:"搜索 (Ctrl+K)"},[...o[3]||(o[3]=[z("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},[z("circle",{cx:"11",cy:"11",r:"8"}),z("path",{d:"m21 21-4.35-4.35"})],-1)])]),z("button",{class:"icon-btn",onClick:o[1]||(o[1]=(...a)=>hn(t)&&hn(t)(...a)),title:hn(e)?"浅色模式":"深色模式"},[hn(e)?(F(),U("svg",Zf,[...o[4]||(o[4]=[z("circle",{cx:"12",cy:"12",r:"5"},null,-1),z("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"},null,-1)])])):(F(),U("svg",Qf,[...o[5]||(o[5]=[z("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])]))],8,Yf)]),z("div",Xf,[z("aside",nd,[gn(Of)]),z("main",ed,[gn(l)]),r.$route.path!=="/"?(F(),U("aside",td,[gn(Cf)])):Ie("",!0)])],32),s.value?(F(),So(Vf,{key:0,onClose:o[2]||(o[2]=a=>s.value=!1)})):Ie("",!0)],64)}}},id=De(sd,[["__scopeId","data-v-a715b592"]]),rd={},od={class:"home"};function ld(n,e){return F(),U("div",od,[...e[0]||(e[0]=[pc('<section class="hero" data-v-f50f9c69><h1 class="hero-name" data-v-f50f9c69>NR 语言</h1><p class="hero-text" data-v-f50f9c69>参考手册</p><p class="hero-tagline" data-v-f50f9c69>Nebula 词库引擎的领域特定语言</p><a class="hero-btn" href="#/v1.0/" data-v-f50f9c69>开始阅读</a></section><section class="features" data-v-f50f9c69><div class="feature" data-v-f50f9c69><h3 data-v-f50f9c69>简洁语法</h3><p data-v-f50f9c69>NR 采用直观的触发词-响应模式，头部空行分隔结构，让词库编写像写笔记一样自然。</p></div><div class="feature" data-v-f50f9c69><h3 data-v-f50f9c69>动态类型</h3><p data-v-f50f9c69>支持整数、浮点、字符串、布尔、对象、函数等类型，运行时自动推断，灵活高效。</p></div><div class="feature" data-v-f50f9c69><h3 data-v-f50f9c69>模块化</h3><p data-v-f50f9c69>支持文件/目录引入、跨包调用、热更新，轻松构建大型自动化文本生成系统。</p></div></section><section class="tools" data-v-f50f9c69><h2 data-v-f50f9c69>工具</h2><p data-v-f50f9c69><a href="./vscode-nr/nr-language-0.1.0.vsix" data-v-f50f9c69>下载 VS Code 语法高亮扩展 (.vsix)</a></p><p data-v-f50f9c69>安装：VS Code → <code data-v-f50f9c69>Ctrl+Shift+P</code> → &quot;Install from VSIX...&quot; → 选择下载的文件</p><p class="vsix-notice" data-v-f50f9c69>注意：此插件仅提供最新版本，不保证历史版本兼容。</p></section><section class="info" data-v-f50f9c69><h2 data-v-f50f9c69>项目信息</h2><ul data-v-f50f9c69><li data-v-f50f9c69><strong data-v-f50f9c69>引擎</strong>：Nebula 词库引擎</li><li data-v-f50f9c69><strong data-v-f50f9c69>实现语言</strong>：Rust</li><li data-v-f50f9c69><strong data-v-f50f9c69>许可证</strong>：Copyright (c) 2025 保留所有权利</li></ul></section>',4)])])}const ad=De(rd,[["render",ld],["__scopeId","data-v-f50f9c69"]]);function pi(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let je=pi();function $l(n){je=n}const ml=/[&<>"']/,cd=new RegExp(ml.source,"g"),_l=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,ud=new RegExp(_l.source,"g"),fd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},_r=n=>fd[n];function Cn(n,e){if(e){if(ml.test(n))return n.replace(cd,_r)}else if(_l.test(n))return n.replace(ud,_r);return n}const dd=/(^|[^\[])\^/g;function tn(n,e){let t=typeof n=="string"?n:n.source;e=e||"";const s={replace:(i,r)=>{let o=typeof r=="string"?r:r.source;return o=o.replace(dd,"$1"),t=t.replace(i,o),s},getRegex:()=>new RegExp(t,e)};return s}function br(n){try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const mt={exec:()=>null};function vr(n,e){const t=n.replace(/\|/g,(r,o,l)=>{let a=!1,u=o;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),s=t.split(/ \|/);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!s[s.length-1].trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(/\\\|/g,"|");return s}function rt(n,e,t){const s=n.length;if(s===0)return"";let i=0;for(;i<s&&n.charAt(s-i-1)===e;)i++;return n.slice(0,s-i)}function hd(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return-1}function xr(n,e,t,s){const i=e.href,r=e.title?Cn(e.title):null,o=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:i,title:r,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:i,title:r,text:Cn(o)}}function pd(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const s=t[1];return e.split(`
`).map(i=>{const r=i.match(/^\s+/);if(r===null)return i;const[o]=r;return o.length>=s.length?i.slice(s.length):i}).join(`
`)}class Yt{constructor(e){rn(this,"options");rn(this,"rules");rn(this,"lexer");this.options=e||je}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(/^(?: {1,4}| {0,3}\t)/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:rt(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],i=pd(s,t[3]||"");return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(/#$/.test(s)){const i=rt(s,"#");(this.options.pedantic||!i||/ $/.test(i))&&(s=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:rt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=rt(t[0],`
`).split(`
`),i="",r="";const o=[];for(;s.length>0;){let l=!1;const a=[];let u;for(u=0;u<s.length;u++)if(/^ {0,3}>/.test(s[u]))a.push(s[u]),l=!0;else if(!l)a.push(s[u]);else break;s=s.slice(u);const c=a.join(`
`),f=c.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");i=i?`${i}
${c}`:c,r=r?`${r}
${f}`:f;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=p,s.length===0)break;const g=o[o.length-1];if((g==null?void 0:g.type)==="code")break;if((g==null?void 0:g.type)==="blockquote"){const y=g,w=y.raw+`
`+s.join(`
`),N=this.blockquote(w);o[o.length-1]=N,i=i.substring(0,i.length-y.raw.length)+N.raw,r=r.substring(0,r.length-y.text.length)+N.text;break}else if((g==null?void 0:g.type)==="list"){const y=g,w=y.raw+`
`+s.join(`
`),N=this.list(w);o[o.length-1]=N,i=i.substring(0,i.length-g.raw.length)+N.raw,r=r.substring(0,r.length-y.raw.length)+N.raw,s=w.substring(o[o.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const i=s.length>1,r={type:"list",raw:"",ordered:i,start:i?+s.slice(0,-1):"",loose:!1,items:[]};s=i?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=i?s:"[*+-]");const o=new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l=!1;for(;e;){let a=!1,u="",c="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(/^\t+/,L=>" ".repeat(3*L.length)),p=e.split(`
`,1)[0],g=!f.trim(),y=0;if(this.options.pedantic?(y=2,c=f.trimStart()):g?y=t[1].length+1:(y=t[2].search(/[^ ]/),y=y>4?1:y,c=f.slice(y),y+=t[1].length),g&&/^[ \t]*$/.test(p)&&(u+=p+`
`,e=e.substring(p.length+1),a=!0),!a){const L=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),E=new RegExp(`^ {0,${Math.min(3,y-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),C=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:\`\`\`|~~~)`),A=new RegExp(`^ {0,${Math.min(3,y-1)}}#`),Y=new RegExp(`^ {0,${Math.min(3,y-1)}}<(?:[a-z].*>|!--)`,"i");for(;e;){const an=e.split(`
`,1)[0];let Z;if(p=an,this.options.pedantic?(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  "),Z=p):Z=p.replace(/\t/g,"    "),C.test(p)||A.test(p)||Y.test(p)||L.test(p)||E.test(p))break;if(Z.search(/[^ ]/)>=y||!p.trim())c+=`
`+Z.slice(y);else{if(g||f.replace(/\t/g,"    ").search(/[^ ]/)>=4||C.test(f)||A.test(f)||E.test(f))break;c+=`
`+p}!g&&!p.trim()&&(g=!0),u+=an+`
`,e=e.substring(an.length+1),f=Z.slice(y)}}r.loose||(l?r.loose=!0:/\n[ \t]*\n[ \t]*$/.test(u)&&(l=!0));let w=null,N;this.options.gfm&&(w=/^\[[ xX]\] /.exec(c),w&&(N=w[0]!=="[ ] ",c=c.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:u,task:!!w,checked:N,loose:!1,text:c,tokens:[]}),r.raw+=u}r.items[r.items.length-1].raw=r.items[r.items.length-1].raw.trimEnd(),r.items[r.items.length-1].text=r.items[r.items.length-1].text.trimEnd(),r.raw=r.raw.trimEnd();for(let a=0;a<r.items.length;a++)if(this.lexer.state.top=!1,r.items[a].tokens=this.lexer.blockTokens(r.items[a].text,[]),!r.loose){const u=r.items[a].tokens.filter(f=>f.type==="space"),c=u.length>0&&u.some(f=>/\n.*\n/.test(f.raw));r.loose=c}if(r.loose)for(let a=0;a<r.items.length;a++)r.items[a].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(/\s+/g," "),i=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:i,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const s=vr(t[1]),i=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===i.length){for(const l of i)/^ *-+: *$/.test(l)?o.align.push("right"):/^ *:-+: *$/.test(l)?o.align.push("center"):/^ *:-+ *$/.test(l)?o.align.push("left"):o.align.push(null);for(let l=0;l<s.length;l++)o.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:o.align[l]});for(const l of r)o.rows.push(vr(l,o.header.length).map((a,u)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:o.align[u]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:Cn(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&/^</.test(s)){if(!/>$/.test(s))return;const o=rt(s.slice(0,-1),"\\");if((s.length-o.length)%2===0)return}else{const o=hd(t[2],"()");if(o>-1){const a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);o&&(i=o[1],r=o[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(s)?i=i.slice(1):i=i.slice(1,-1)),xr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const i=(s[2]||s[1]).replace(/\s+/g," "),r=t[i.toLowerCase()];if(!r){const o=s[0].charAt(0);return{type:"text",raw:o,text:o}}return xr(s,r,s[0],this.lexer)}}emStrong(e,t,s=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&s.match(/[\p{L}\p{N}]/u))return;if(!(i[1]||i[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const o=[...i[0]].length-1;let l,a,u=o,c=0;const f=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(f.lastIndex=0,t=t.slice(-1*e.length+o);(i=f.exec(t))!=null;){if(l=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!l)continue;if(a=[...l].length,i[3]||i[4]){u+=a;continue}else if((i[5]||i[6])&&o%3&&!((o+a)%3)){c+=a;continue}if(u-=a,u>0)continue;a=Math.min(a,a+u+c);const p=[...i[0]][0].length,g=e.slice(0,o+i.index+p+a);if(Math.min(o,a)%2){const w=g.slice(1,-1);return{type:"em",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}const y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(/\n/g," ");const i=/[^ ]/.test(s),r=/^ /.test(s)&&/ $/.test(s);return i&&r&&(s=s.substring(1,s.length-1)),s=Cn(s,!0),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,i;return t[2]==="@"?(s=Cn(t[1]),i="mailto:"+s):(s=Cn(t[1]),i=s),{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let i,r;if(t[2]==="@")i=Cn(t[0]),r="mailto:"+i;else{let o;do o=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(o!==t[0]);i=Cn(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let s;return this.lexer.state.inRawBlock?s=t[0]:s=Cn(t[0]),{type:"text",raw:t[0],text:s}}}}const gd=/^(?:[ \t]*(?:\n|$))+/,$d=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,md=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Et=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,_d=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bl=/(?:[*+-]|\d{1,9}[.)])/,vl=tn(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,bl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),gi=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,bd=/^[^\n]+/,$i=/(?!\s*\])(?:\\.|[^\[\]\\])+/,vd=tn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",$i).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),xd=tn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bl).getRegex(),ps="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",mi=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,yd=tn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",mi).replace("tag",ps).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xl=tn(gi).replace("hr",Et).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex(),wd=tn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xl).getRegex(),_i={blockquote:wd,code:$d,def:vd,fences:md,heading:_d,hr:Et,html:yd,lheading:vl,list:xd,newline:gd,paragraph:xl,table:mt,text:bd},yr=tn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Et).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex(),kd={..._i,table:yr,paragraph:tn(gi).replace("hr",Et).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",yr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ps).getRegex()},Td={..._i,html:tn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",mi).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:mt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:tn(gi).replace("hr",Et).replace("heading",` *#{1,6} *[^
]`).replace("lheading",vl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},yl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Sd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,wl=/^( {2,}|\\)\n(?!\s*$)/,Rd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Pt="\\p{P}\\p{S}",Od=tn(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Pt).getRegex(),Ed=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Pd=tn(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Pt).getRegex(),Ad=tn("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Pt).getRegex(),Cd=tn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Pt).getRegex(),Nd=tn(/\\([punct])/,"gu").replace(/punct/g,Pt).getRegex(),Id=tn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Md=tn(mi).replace("(?:-->|$)","-->").getRegex(),Ld=tn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Md).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Zt=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,Dd=tn(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Zt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),kl=tn(/^!?\[(label)\]\[(ref)\]/).replace("label",Zt).replace("ref",$i).getRegex(),Tl=tn(/^!?\[(ref)\](?:\[\])?/).replace("ref",$i).getRegex(),jd=tn("reflink|nolink(?!\\()","g").replace("reflink",kl).replace("nolink",Tl).getRegex(),bi={_backpedal:mt,anyPunctuation:Nd,autolink:Id,blockSkip:Ed,br:wl,code:Sd,del:mt,emStrongLDelim:Pd,emStrongRDelimAst:Ad,emStrongRDelimUnd:Cd,escape:yl,link:Dd,nolink:Tl,punctuation:Od,reflink:kl,reflinkSearch:jd,tag:Ld,text:Rd,url:mt},Hd={...bi,link:tn(/^!?\[(label)\]\((.*?)\)/).replace("label",Zt).getRegex(),reflink:tn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Zt).getRegex()},Js={...bi,escape:tn(yl).replace("])","~|])").getRegex(),url:tn(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Bd={...Js,br:tn(wl).replace("{2,}","*").getRegex(),text:tn(Js.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Mt={normal:_i,gfm:kd,pedantic:Td},ot={normal:bi,gfm:Js,breaks:Bd,pedantic:Hd};class Ln{constructor(e){rn(this,"tokens");rn(this,"options");rn(this,"state");rn(this,"tokenizer");rn(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||je,this.options.tokenizer=this.options.tokenizer||new Yt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Mt.normal,inline:ot.normal};this.options.pedantic?(t.block=Mt.pedantic,t.inline=ot.pedantic):this.options.gfm&&(t.block=Mt.gfm,this.options.breaks?t.inline=ot.breaks:t.inline=ot.gfm),this.tokenizer.rules=t}static get rules(){return{block:Mt,inline:ot}}static lex(e,t){return new Ln(t).lex(e)}static lexInline(e,t){return new Ln(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.options.pedantic&&(e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""));let i,r,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(i=l.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))){if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length),i.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+i.raw,r.text+=`
`+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title});continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const a=e.slice(1);let u;this.options.extensions.startBlock.forEach(c=>{u=c.call({lexer:this},a),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(o=e.substring(0,l+1))}if(this.state.top&&(i=this.tokenizer.paragraph(o))){r=t[t.length-1],s&&(r==null?void 0:r.type)==="paragraph"?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i),s=o.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&r.type==="text"?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let s,i,r,o=e,l,a,u;if(this.tokens.links){const c=Object.keys(this.tokens.links);if(c.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)c.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,l.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(a||(u=""),a=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(c=>(s=c.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))){if(s=this.tokenizer.escape(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.tag(e)){e=e.substring(s.raw.length),i=t[t.length-1],i&&s.type==="text"&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(s=this.tokenizer.link(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(s.raw.length),i=t[t.length-1],i&&s.type==="text"&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(s=this.tokenizer.emStrong(e,o,u)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.codespan(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.br(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.del(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.autolink(e)){e=e.substring(s.raw.length),t.push(s);continue}if(!this.state.inLink&&(s=this.tokenizer.url(e))){e=e.substring(s.raw.length),t.push(s);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let c=1/0;const f=e.slice(1);let p;this.options.extensions.startInline.forEach(g=>{p=g.call({lexer:this},f),typeof p=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(r=e.substring(0,c+1))}if(s=this.tokenizer.inlineText(r)){e=e.substring(s.raw.length),s.raw.slice(-1)!=="_"&&(u=s.raw.slice(-1)),a=!0,i=t[t.length-1],i&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(e){const c="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(c);break}else throw new Error(c)}}return t}}class Qt{constructor(e){rn(this,"options");rn(this,"parser");this.options=e||je}space(e){return""}code({text:e,lang:t,escaped:s}){var o;const i=(o=(t||"").match(/^\S*/))==null?void 0:o[0],r=e.replace(/\n$/,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const i=this.parser.parseInline(s),r=br(e);if(r===null)return i;e=r;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:s}){const i=br(e);if(i===null)return s;e=i;let r=`<img src="${e}" alt="${s}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class vi{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class Dn{constructor(e){rn(this,"options");rn(this,"renderer");rn(this,"textRenderer");this.options=e||je,this.options.renderer=this.options.renderer||new Qt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new vi}static parse(e,t){return new Dn(t).parse(e)}static parseInline(e,t){return new Dn(t).parseInline(e)}parse(e,t=!0){let s="";for(let i=0;i<e.length;i++){const r=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const l=r,a=this.options.extensions.renderers[l.type].call({parser:this},l);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=a||"";continue}}const o=r;switch(o.type){case"space":{s+=this.renderer.space(o);continue}case"hr":{s+=this.renderer.hr(o);continue}case"heading":{s+=this.renderer.heading(o);continue}case"code":{s+=this.renderer.code(o);continue}case"table":{s+=this.renderer.table(o);continue}case"blockquote":{s+=this.renderer.blockquote(o);continue}case"list":{s+=this.renderer.list(o);continue}case"html":{s+=this.renderer.html(o);continue}case"paragraph":{s+=this.renderer.paragraph(o);continue}case"text":{let l=o,a=this.renderer.text(l);for(;i+1<e.length&&e[i+1].type==="text";)l=e[++i],a+=`
`+this.renderer.text(l);t?s+=this.renderer.paragraph({type:"paragraph",raw:a,text:a,tokens:[{type:"text",raw:a,text:a}]}):s+=a;continue}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,t){t=t||this.renderer;let s="";for(let i=0;i<e.length;i++){const r=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const o=r;switch(o.type){case"escape":{s+=t.text(o);break}case"html":{s+=t.html(o);break}case"link":{s+=t.link(o);break}case"image":{s+=t.image(o);break}case"strong":{s+=t.strong(o);break}case"em":{s+=t.em(o);break}case"codespan":{s+=t.codespan(o);break}case"br":{s+=t.br(o);break}case"del":{s+=t.del(o);break}case"text":{s+=t.text(o);break}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}}class _t{constructor(e){rn(this,"options");rn(this,"block");this.options=e||je}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Ln.lex:Ln.lexInline}provideParser(){return this.block?Dn.parse:Dn.parseInline}}rn(_t,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class Fd{constructor(...e){rn(this,"defaults",pi());rn(this,"options",this.setOptions);rn(this,"parse",this.parseMarkdown(!0));rn(this,"parseInline",this.parseMarkdown(!1));rn(this,"Parser",Dn);rn(this,"Renderer",Qt);rn(this,"TextRenderer",vi);rn(this,"Lexer",Ln);rn(this,"Tokenizer",Yt);rn(this,"Hooks",_t);this.use(...e)}walkTokens(e,t){var i,r;let s=[];for(const o of e)switch(s=s.concat(t.call(this,o)),o.type){case"table":{const l=o;for(const a of l.header)s=s.concat(this.walkTokens(a.tokens,t));for(const a of l.rows)for(const u of a)s=s.concat(this.walkTokens(u.tokens,t));break}case"list":{const l=o;s=s.concat(this.walkTokens(l.items,t));break}default:{const l=o;(r=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&r[l.type]?this.defaults.extensions.childTokens[l.type].forEach(a=>{const u=l[a].flat(1/0);s=s.concat(this.walkTokens(u,t))}):l.tokens&&(s=s.concat(this.walkTokens(l.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const i={...s};if(i.async=this.defaults.async||i.async||!1,s.extensions&&(s.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const o=t.renderers[r.name];o?t.renderers[r.name]=function(...l){let a=r.renderer.apply(this,l);return a===!1&&(a=o.apply(this,l)),a}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[r.level];o?o.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),i.extensions=t),s.renderer){const r=this.defaults.renderer||new Qt(this.defaults);for(const o in s.renderer){if(!(o in r))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const l=o,a=s.renderer[l],u=r[l];r[l]=(...c)=>{let f=a.apply(r,c);return f===!1&&(f=u.apply(r,c)),f||""}}i.renderer=r}if(s.tokenizer){const r=this.defaults.tokenizer||new Yt(this.defaults);for(const o in s.tokenizer){if(!(o in r))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const l=o,a=s.tokenizer[l],u=r[l];r[l]=(...c)=>{let f=a.apply(r,c);return f===!1&&(f=u.apply(r,c)),f}}i.tokenizer=r}if(s.hooks){const r=this.defaults.hooks||new _t;for(const o in s.hooks){if(!(o in r))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const l=o,a=s.hooks[l],u=r[l];_t.passThroughHooks.has(o)?r[l]=c=>{if(this.defaults.async)return Promise.resolve(a.call(r,c)).then(p=>u.call(r,p));const f=a.call(r,c);return u.call(r,f)}:r[l]=(...c)=>{let f=a.apply(r,c);return f===!1&&(f=u.apply(r,c)),f}}i.hooks=r}if(s.walkTokens){const r=this.defaults.walkTokens,o=s.walkTokens;i.walkTokens=function(l){let a=[];return a.push(o.call(this,l)),r&&(a=a.concat(r.call(this,l))),a}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ln.lex(e,t??this.defaults)}parser(e,t){return Dn.parse(e,t??this.defaults)}parseMarkdown(e){return(s,i)=>{const r={...i},o={...this.defaults,...r},l=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof s>"u"||s===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const a=o.hooks?o.hooks.provideLexer():e?Ln.lex:Ln.lexInline,u=o.hooks?o.hooks.provideParser():e?Dn.parse:Dn.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(s):s).then(c=>a(c,o)).then(c=>o.hooks?o.hooks.processAllTokens(c):c).then(c=>o.walkTokens?Promise.all(this.walkTokens(c,o.walkTokens)).then(()=>c):c).then(c=>u(c,o)).then(c=>o.hooks?o.hooks.postprocess(c):c).catch(l);try{o.hooks&&(s=o.hooks.preprocess(s));let c=a(s,o);o.hooks&&(c=o.hooks.processAllTokens(c)),o.walkTokens&&this.walkTokens(c,o.walkTokens);let f=u(c,o);return o.hooks&&(f=o.hooks.postprocess(f)),f}catch(c){return l(c)}}}onError(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+Cn(s.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(s);throw s}}}const Me=new Fd;function Q(n,e){return Me.parse(n,e)}Q.options=Q.setOptions=function(n){return Me.setOptions(n),Q.defaults=Me.defaults,$l(Q.defaults),Q};Q.getDefaults=pi;Q.defaults=je;Q.use=function(...n){return Me.use(...n),Q.defaults=Me.defaults,$l(Q.defaults),Q};Q.walkTokens=function(n,e){return Me.walkTokens(n,e)};Q.parseInline=Me.parseInline;Q.Parser=Dn;Q.parser=Dn.parse;Q.Renderer=Qt;Q.TextRenderer=vi;Q.Lexer=Ln;Q.lexer=Ln.lex;Q.Tokenizer=Yt;Q.Hooks=_t;Q.parse=Q;Q.options;Q.setOptions;Q.use;Q.walkTokens;Q.parseInline;Dn.parse;Ln.lex;const Ud={key:0,class:"doc-footer"},zd={class:"doc-footer-inner"},Vd=["href"],Gd={class:"footer-text"},Jd={key:1,class:"footer-link prev placeholder"},Kd=["href"],qd={class:"footer-text"},Wd={key:3,class:"footer-link next placeholder"},Yd={__name:"DocFooter",setup(n){const{prev:e,next:t}=gf();return(s,i)=>hn(e)||hn(t)?(F(),U("nav",Ud,[z("div",zd,[hn(e)?(F(),U("a",{key:0,href:"#"+hn(e).link,class:"footer-link prev"},[i[0]||(i[0]=z("span",{class:"footer-label"},"上一章",-1)),z("span",Gd,bn(hn(e).text),1)],8,Vd)):(F(),U("div",Jd)),hn(t)?(F(),U("a",{key:2,href:"#"+hn(t).link,class:"footer-link next"},[i[1]||(i[1]=z("span",{class:"footer-label"},"下一章",-1)),z("span",qd,bn(hn(t).text),1)],8,Kd)):(F(),U("div",Wd))])])):Ie("",!0)}},Zd=De(Yd,[["__scopeId","data-v-c9726e4b"]]),Qd=["innerHTML"],wr={__name:"MarkdownPage",setup(n){const e=hs(),t=Object.assign({"../../v1.0/canvas.md":Go,"../../v1.0/control-flow.md":Jo,"../../v1.0/entries.md":Ko,"../../v1.0/expressions.md":qo,"../../v1.0/file.md":Wo,"../../v1.0/flow-callback.md":Yo,"../../v1.0/flow-main-callback.md":Zo,"../../v1.0/flow-output.md":Qo,"../../v1.0/functions.md":Xo,"../../v1.0/index.md":nl,"../../v1.0/json.md":el,"../../v1.0/lexical.md":tl,"../../v1.0/math.md":sl,"../../v1.0/modules.md":il,"../../v1.0/network.md":rl,"../../v1.0/object.md":ol,"../../v1.0/oop.md":ll,"../../v1.0/output-print-return.md":al,"../../v1.0/output-print.md":cl,"../../v1.0/server.md":ul,"../../v1.0/string.md":fl,"../../v1.0/type.md":dl,"../../v1.0/types.md":hl,"../../v1.0/variables.md":pl});function s(l){return l.replace(/<[^>]*>/g,"").toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g,"-").replace(/^-|-$/g,"")}function i(l){return l.replace(/<(h[23])>(.*?)<\/\1>/gi,(a,u,c)=>`<${u} id="${s(c)}">${c}</${u}>`)}function r(l){return l.replace(/\]\(\.\/([^)]*?)\)/g,(a,u)=>/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(u)||u.startsWith("http")?a:`](#/v1.0/${u})`)}const o=Rn(()=>{let l;e.path==="/v1.0/"?l="../../v1.0/index.md":l=`../../v1.0/${e.params.page}.md`;const a=t[l];return a?i(Q.parse(r(a),{gfm:!0,breaks:!1})):"<p>页面未找到</p>"});return Ne([()=>e.hash,o],([l])=>{Rt(()=>{if(l){const a=document.getElementById(l.slice(1));a&&a.scrollIntoView({behavior:"smooth",block:"start"})}})}),(l,a)=>(F(),U(cn,null,[z("article",{class:"markdown-body",innerHTML:o.value},null,8,Qd),gn(Zd)],64))}},Xd=hf({history:Vu(),routes:[{path:"/",component:ad},{path:"/v1.0",redirect:"/v1.0/"},{path:"/v1.0/",component:wr},{path:"/v1.0/:page",component:wr}],scrollBehavior(n){return n.hash?{el:n.hash,behavior:"smooth",top:80}:{top:0}}});tu(id).use(Xd).mount("#app");
