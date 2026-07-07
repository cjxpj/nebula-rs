var _l=Object.defineProperty;var bl=(n,e,t)=>e in n?_l(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var tn=(n,e,t)=>bl(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Vs(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const sn={},je=[],ne=()=>{},wi=()=>!1,Zt=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Qt=n=>n.startsWith("onUpdate:"),_n=Object.assign,zs=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},xl=Object.prototype.hasOwnProperty,K=(n,e)=>xl.call(n,e),F=Array.isArray,Ue=n=>wt(n)==="[object Map]",ki=n=>wt(n)==="[object Set]",wr=n=>wt(n)==="[object Date]",B=n=>typeof n=="function",un=n=>typeof n=="string",te=n=>typeof n=="symbol",Z=n=>n!==null&&typeof n=="object",Si=n=>(Z(n)||B(n))&&B(n.then)&&B(n.catch),Ri=Object.prototype.toString,wt=n=>Ri.call(n),vl=n=>wt(n).slice(8,-1),Ti=n=>wt(n)==="[object Object]",Gs=n=>un(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,ot=Vs(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Xt=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},yl=/-\w/g,Rn=Xt(n=>n.replace(yl,e=>e.slice(1).toUpperCase())),wl=/\B([A-Z])/g,Pe=Xt(n=>n.replace(wl,"-$1").toLowerCase()),ns=Xt(n=>n.charAt(0).toUpperCase()+n.slice(1)),fs=Xt(n=>n?`on${ns(n)}`:""),Xn=(n,e)=>!Object.is(n,e),Ct=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Ei=(n,e,t,s=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:s,value:t})},qs=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let kr;const es=()=>kr||(kr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ks(n){if(F(n)){const e={};for(let t=0;t<n.length;t++){const s=n[t],r=un(s)?Tl(s):Ks(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(un(n)||Z(n))return n}const kl=/;(?![^(]*\))/g,Sl=/:([^]+)/,Rl=/\/\*[^]*?\*\//g;function Tl(n){const e={};return n.replace(Rl,"").split(kl).forEach(t=>{if(t){const s=t.split(Sl);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Ge(n){let e="";if(un(n))e=n;else if(F(n))for(let t=0;t<n.length;t++){const s=Ge(n[t]);s&&(e+=s+" ")}else if(Z(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const El="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Al=Vs(El);function Ai(n){return!!n||n===""}function Ol(n,e){if(n.length!==e.length)return!1;let t=!0;for(let s=0;t&&s<n.length;s++)t=Js(n[s],e[s]);return t}function Js(n,e){if(n===e)return!0;let t=wr(n),s=wr(e);if(t||s)return t&&s?n.getTime()===e.getTime():!1;if(t=te(n),s=te(e),t||s)return n===e;if(t=F(n),s=F(e),t||s)return t&&s?Ol(n,e):!1;if(t=Z(n),s=Z(e),t||s){if(!t||!s)return!1;const r=Object.keys(n).length,i=Object.keys(e).length;if(r!==i)return!1;for(const o in n){const l=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!Js(n[o],e[o]))return!1}}return String(n)===String(e)}const Oi=n=>!!(n&&n.__v_isRef===!0),de=n=>un(n)?n:n==null?"":F(n)||Z(n)&&(n.toString===Ri||!B(n.toString))?Oi(n)?de(n.value):JSON.stringify(n,Ni,2):String(n),Ni=(n,e)=>Oi(e)?Ni(n,e.value):Ue(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[s,r],i)=>(t[ds(s,i)+" =>"]=r,t),{})}:ki(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ds(t))}:te(e)?ds(e):Z(e)&&!F(e)&&!Ti(e)?String(e):e,ds=(n,e="")=>{var t;return te(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let mn;class Nl{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&mn&&(mn.active?(this.parent=mn,this.index=(mn.scopes||(mn.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=mn;try{return mn=this,e()}finally{mn=t}}}on(){++this._on===1&&(this.prevScope=mn,mn=this)}off(){if(this._on>0&&--this._on===0){if(mn===this)mn=this.prevScope;else{let e=mn;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,s;for(t=0,s=this.effects.length;t<s;t++)this.effects[t].stop();for(this.effects.length=0,t=0,s=this.cleanups.length;t<s;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Pl(){return mn}let rn;const hs=new WeakSet;class Pi{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,mn&&(mn.active?mn.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,hs.has(this)&&(hs.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Ii(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Sr(this),Mi(this);const e=rn,t=Hn;rn=this,Hn=!0;try{return this.fn()}finally{Li(this),rn=e,Hn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Zs(e);this.deps=this.depsTail=void 0,Sr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?hs.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Rs(this)&&this.run()}get dirty(){return Rs(this)}}let Ci=0,lt,ct;function Ii(n,e=!1){if(n.flags|=8,e){n.next=ct,ct=n;return}n.next=lt,lt=n}function Ws(){Ci++}function Ys(){if(--Ci>0)return;if(ct){let e=ct;for(ct=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;lt;){let e=lt;for(lt=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){n||(n=s)}e=t}}if(n)throw n}function Mi(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Li(n){let e,t=n.depsTail,s=t;for(;s;){const r=s.prevDep;s.version===-1?(s===t&&(t=r),Zs(s),Cl(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}n.deps=e,n.depsTail=t}function Rs(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Di(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Di(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===mt)||(n.globalVersion=mt,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Rs(n))))return;n.flags|=2;const e=n.dep,t=rn,s=Hn;rn=n,Hn=!0;try{Mi(n);const r=n.fn(n._value);(e.version===0||Xn(r,n._value))&&(n.flags|=128,n._value=r,e.version++)}catch(r){throw e.version++,r}finally{rn=t,Hn=s,Li(n),n.flags&=-3}}function Zs(n,e=!1){const{dep:t,prevSub:s,nextSub:r}=n;if(s&&(s.nextSub=r,n.prevSub=void 0),r&&(r.prevSub=s,n.nextSub=void 0),t.subs===n&&(t.subs=s,!s&&t.computed)){t.computed.flags&=-5;for(let i=t.computed.deps;i;i=i.nextDep)Zs(i,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function Cl(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Hn=!0;const Hi=[];function se(){Hi.push(Hn),Hn=!1}function re(){const n=Hi.pop();Hn=n===void 0?!0:n}function Sr(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=rn;rn=void 0;try{e()}finally{rn=t}}}let mt=0;class Il{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Qs{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!rn||!Hn||rn===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==rn)t=this.activeLink=new Il(rn,this),rn.deps?(t.prevDep=rn.depsTail,rn.depsTail.nextDep=t,rn.depsTail=t):rn.deps=rn.depsTail=t,Fi(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const s=t.nextDep;s.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=s),t.prevDep=rn.depsTail,t.nextDep=void 0,rn.depsTail.nextDep=t,rn.depsTail=t,rn.deps===t&&(rn.deps=s)}return t}trigger(e){this.version++,mt++,this.notify(e)}notify(e){Ws();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Ys()}}}function Fi(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)Fi(s)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Ts=new WeakMap,Ae=Symbol(""),Es=Symbol(""),_t=Symbol("");function bn(n,e,t){if(Hn&&rn){let s=Ts.get(n);s||Ts.set(n,s=new Map);let r=s.get(t);r||(s.set(t,r=new Qs),r.map=s,r.key=t),r.track()}}function ue(n,e,t,s,r,i){const o=Ts.get(n);if(!o){mt++;return}const l=c=>{c&&c.trigger()};if(Ws(),e==="clear")o.forEach(l);else{const c=F(n),u=c&&Gs(t);if(c&&t==="length"){const a=Number(s);o.forEach((d,p)=>{(p==="length"||p===_t||!te(p)&&p>=a)&&l(d)})}else switch((t!==void 0||o.has(void 0))&&l(o.get(t)),u&&l(o.get(_t)),e){case"add":c?u&&l(o.get("length")):(l(o.get(Ae)),Ue(n)&&l(o.get(Es)));break;case"delete":c||(l(o.get(Ae)),Ue(n)&&l(o.get(Es)));break;case"set":Ue(n)&&l(o.get(Ae));break}}Ys()}function De(n){const e=q(n);return e===n?e:(bn(e,"iterate",_t),Dn(n)?e:e.map(Fn))}function ts(n){return bn(n=q(n),"iterate",_t),n}function Zn(n,e){return he(n)?qe(Oe(n)?Fn(e):e):Fn(e)}const Ml={__proto__:null,[Symbol.iterator](){return ps(this,Symbol.iterator,n=>Zn(this,n))},concat(...n){return De(this).concat(...n.map(e=>F(e)?De(e):e))},entries(){return ps(this,"entries",n=>(n[1]=Zn(this,n[1]),n))},every(n,e){return oe(this,"every",n,e,void 0,arguments)},filter(n,e){return oe(this,"filter",n,e,t=>t.map(s=>Zn(this,s)),arguments)},find(n,e){return oe(this,"find",n,e,t=>Zn(this,t),arguments)},findIndex(n,e){return oe(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return oe(this,"findLast",n,e,t=>Zn(this,t),arguments)},findLastIndex(n,e){return oe(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return oe(this,"forEach",n,e,void 0,arguments)},includes(...n){return gs(this,"includes",n)},indexOf(...n){return gs(this,"indexOf",n)},join(n){return De(this).join(n)},lastIndexOf(...n){return gs(this,"lastIndexOf",n)},map(n,e){return oe(this,"map",n,e,void 0,arguments)},pop(){return Xe(this,"pop")},push(...n){return Xe(this,"push",n)},reduce(n,...e){return Rr(this,"reduce",n,e)},reduceRight(n,...e){return Rr(this,"reduceRight",n,e)},shift(){return Xe(this,"shift")},some(n,e){return oe(this,"some",n,e,void 0,arguments)},splice(...n){return Xe(this,"splice",n)},toReversed(){return De(this).toReversed()},toSorted(n){return De(this).toSorted(n)},toSpliced(...n){return De(this).toSpliced(...n)},unshift(...n){return Xe(this,"unshift",n)},values(){return ps(this,"values",n=>Zn(this,n))}};function ps(n,e,t){const s=ts(n),r=s[e]();return s!==n&&!Dn(n)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=t(i.value)),i}),r}const Ll=Array.prototype;function oe(n,e,t,s,r,i){const o=ts(n),l=o!==n&&!Dn(n),c=o[e];if(c!==Ll[e]){const d=c.apply(n,i);return l?Fn(d):d}let u=t;o!==n&&(l?u=function(d,p){return t.call(this,Zn(n,d),p,n)}:t.length>2&&(u=function(d,p){return t.call(this,d,p,n)}));const a=c.call(o,u,s);return l&&r?r(a):a}function Rr(n,e,t,s){const r=ts(n),i=r!==n&&!Dn(n);let o=t,l=!1;r!==n&&(i?(l=s.length===0,o=function(u,a,d){return l&&(l=!1,u=Zn(n,u)),t.call(this,u,Zn(n,a),d,n)}):t.length>3&&(o=function(u,a,d){return t.call(this,u,a,d,n)}));const c=r[e](o,...s);return l?Zn(n,c):c}function gs(n,e,t){const s=q(n);bn(s,"iterate",_t);const r=s[e](...t);return(r===-1||r===!1)&&er(t[0])?(t[0]=q(t[0]),s[e](...t)):r}function Xe(n,e,t=[]){se(),Ws();const s=q(n)[e].apply(n,t);return Ys(),re(),s}const Dl=Vs("__proto__,__v_isRef,__isVue"),Bi=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(te));function Hl(n){te(n)||(n=String(n));const e=q(this);return bn(e,"has",n),e.hasOwnProperty(n)}class ji{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,s){if(t==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(t==="__v_isReactive")return!r;if(t==="__v_isReadonly")return r;if(t==="__v_isShallow")return i;if(t==="__v_raw")return s===(r?i?Jl:Gi:i?zi:Vi).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=F(e);if(!r){let c;if(o&&(c=Ml[t]))return c;if(t==="hasOwnProperty")return Hl}const l=Reflect.get(e,t,vn(e)?e:s);if((te(t)?Bi.has(t):Dl(t))||(r||bn(e,"get",t),i))return l;if(vn(l)){const c=o&&Gs(t)?l:l.value;return r&&Z(c)?Os(c):c}return Z(l)?r?Os(l):ss(l):l}}class Ui extends ji{constructor(e=!1){super(!1,e)}set(e,t,s,r){let i=e[t];const o=F(e)&&Gs(t);if(!this._isShallow){const u=he(i);if(!Dn(s)&&!he(s)&&(i=q(i),s=q(s)),!o&&vn(i)&&!vn(s))return u||(i.value=s),!0}const l=o?Number(t)<e.length:K(e,t),c=Reflect.set(e,t,s,vn(e)?e:r);return e===q(r)&&c&&(l?Xn(s,i)&&ue(e,"set",t,s):ue(e,"add",t,s)),c}deleteProperty(e,t){const s=K(e,t);e[t];const r=Reflect.deleteProperty(e,t);return r&&s&&ue(e,"delete",t,void 0),r}has(e,t){const s=Reflect.has(e,t);return(!te(t)||!Bi.has(t))&&bn(e,"has",t),s}ownKeys(e){return bn(e,"iterate",F(e)?"length":Ae),Reflect.ownKeys(e)}}class Fl extends ji{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Bl=new Ui,jl=new Fl,Ul=new Ui(!0);const As=n=>n,Et=n=>Reflect.getPrototypeOf(n);function Vl(n,e,t){return function(...s){const r=this.__v_raw,i=q(r),o=Ue(i),l=n==="entries"||n===Symbol.iterator&&o,c=n==="keys"&&o,u=r[n](...s),a=t?As:e?qe:Fn;return!e&&bn(i,"iterate",c?Es:Ae),_n(Object.create(u),{next(){const{value:d,done:p}=u.next();return p?{value:d,done:p}:{value:l?[a(d[0]),a(d[1])]:a(d),done:p}}})}}function At(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function zl(n,e){const t={get(r){const i=this.__v_raw,o=q(i),l=q(r);n||(Xn(r,l)&&bn(o,"get",r),bn(o,"get",l));const{has:c}=Et(o),u=e?As:n?qe:Fn;if(c.call(o,r))return u(i.get(r));if(c.call(o,l))return u(i.get(l));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!n&&bn(q(r),"iterate",Ae),r.size},has(r){const i=this.__v_raw,o=q(i),l=q(r);return n||(Xn(r,l)&&bn(o,"has",r),bn(o,"has",l)),r===l?i.has(r):i.has(r)||i.has(l)},forEach(r,i){const o=this,l=o.__v_raw,c=q(l),u=e?As:n?qe:Fn;return!n&&bn(c,"iterate",Ae),l.forEach((a,d)=>r.call(i,u(a),u(d),o))}};return _n(t,n?{add:At("add"),set:At("set"),delete:At("delete"),clear:At("clear")}:{add(r){const i=q(this),o=Et(i),l=q(r),c=!e&&!Dn(r)&&!he(r)?l:r;return o.has.call(i,c)||Xn(r,c)&&o.has.call(i,r)||Xn(l,c)&&o.has.call(i,l)||(i.add(c),ue(i,"add",c,c)),this},set(r,i){!e&&!Dn(i)&&!he(i)&&(i=q(i));const o=q(this),{has:l,get:c}=Et(o);let u=l.call(o,r);u||(r=q(r),u=l.call(o,r));const a=c.call(o,r);return o.set(r,i),u?Xn(i,a)&&ue(o,"set",r,i):ue(o,"add",r,i),this},delete(r){const i=q(this),{has:o,get:l}=Et(i);let c=o.call(i,r);c||(r=q(r),c=o.call(i,r)),l&&l.call(i,r);const u=i.delete(r);return c&&ue(i,"delete",r,void 0),u},clear(){const r=q(this),i=r.size!==0,o=r.clear();return i&&ue(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{t[r]=Vl(r,n,e)}),t}function Xs(n,e){const t=zl(n,e);return(s,r,i)=>r==="__v_isReactive"?!n:r==="__v_isReadonly"?n:r==="__v_raw"?s:Reflect.get(K(t,r)&&r in s?t:s,r,i)}const Gl={get:Xs(!1,!1)},ql={get:Xs(!1,!0)},Kl={get:Xs(!0,!1)};const Vi=new WeakMap,zi=new WeakMap,Gi=new WeakMap,Jl=new WeakMap;function Wl(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ss(n){return he(n)?n:nr(n,!1,Bl,Gl,Vi)}function qi(n){return nr(n,!1,Ul,ql,zi)}function Os(n){return nr(n,!0,jl,Kl,Gi)}function nr(n,e,t,s,r){if(!Z(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const i=r.get(n);if(i)return i;const o=Wl(vl(n));if(o===0)return n;const l=new Proxy(n,o===2?s:t);return r.set(n,l),l}function Oe(n){return he(n)?Oe(n.__v_raw):!!(n&&n.__v_isReactive)}function he(n){return!!(n&&n.__v_isReadonly)}function Dn(n){return!!(n&&n.__v_isShallow)}function er(n){return n?!!n.__v_raw:!1}function q(n){const e=n&&n.__v_raw;return e?q(e):n}function Yl(n){return!K(n,"__v_skip")&&Object.isExtensible(n)&&Ei(n,"__v_skip",!0),n}const Fn=n=>Z(n)?ss(n):n,qe=n=>Z(n)?Os(n):n;function vn(n){return n?n.__v_isRef===!0:!1}function Te(n){return Ki(n,!1)}function Zl(n){return Ki(n,!0)}function Ki(n,e){return vn(n)?n:new Ql(n,e)}class Ql{constructor(e,t){this.dep=new Qs,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:q(e),this._value=t?e:Fn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,s=this.__v_isShallow||Dn(e)||he(e);e=s?e:q(e),Xn(e,t)&&(this._rawValue=e,this._value=s?e:Fn(e),this.dep.trigger())}}function dn(n){return vn(n)?n.value:n}const Xl={get:(n,e,t)=>e==="__v_raw"?n:dn(Reflect.get(n,e,t)),set:(n,e,t,s)=>{const r=n[e];return vn(r)&&!vn(t)?(r.value=t,!0):Reflect.set(n,e,t,s)}};function Ji(n){return Oe(n)?n:new Proxy(n,Xl)}class nc{constructor(e,t,s){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Qs(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=mt-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&rn!==this)return Ii(this,!0),!0}get value(){const e=this.dep.track();return Di(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function ec(n,e,t=!1){let s,r;return B(n)?s=n:(s=n.get,r=n.set),new nc(s,r,t)}const Ot={},Ht=new WeakMap;let Re;function tc(n,e=!1,t=Re){if(t){let s=Ht.get(t);s||Ht.set(t,s=[]),s.push(n)}}function sc(n,e,t=sn){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:l,call:c}=t,u=N=>r?N:Dn(N)||r===!1||r===0?fe(N,1):fe(N);let a,d,p,$,y=!1,w=!1;if(vn(n)?(d=()=>n.value,y=Dn(n)):Oe(n)?(d=()=>u(n),y=!0):F(n)?(w=!0,y=n.some(N=>Oe(N)||Dn(N)),d=()=>n.map(N=>{if(vn(N))return N.value;if(Oe(N))return u(N);if(B(N))return c?c(N,2):N()})):B(n)?e?d=c?()=>c(n,2):n:d=()=>{if(p){se();try{p()}finally{re()}}const N=Re;Re=a;try{return c?c(n,3,[$]):n($)}finally{Re=N}}:d=ne,e&&r){const N=d,J=r===!0?1/0:r;d=()=>fe(N(),J)}const C=Pl(),L=()=>{a.stop(),C&&C.active&&zs(C.effects,a)};if(i&&e){const N=e;e=(...J)=>{const ln=N(...J);return L(),ln}}let A=w?new Array(n.length).fill(Ot):Ot;const P=N=>{if(!(!(a.flags&1)||!a.dirty&&!N))if(e){const J=a.run();if(N||r||y||(w?J.some((ln,W)=>Xn(ln,A[W])):Xn(J,A))){p&&p();const ln=Re;Re=a;try{const W=[J,A===Ot?void 0:w&&A[0]===Ot?[]:A,$];A=J,c?c(e,3,W):e(...W)}finally{Re=ln}}}else a.run()};return l&&l(P),a=new Pi(d),a.scheduler=o?()=>o(P,!1):P,$=N=>tc(N,!1,a),p=a.onStop=()=>{const N=Ht.get(a);if(N){if(c)c(N,4);else for(const J of N)J();Ht.delete(a)}},e?s?P(!0):A=a.run():o?o(P.bind(null,!0),!0):a.run(),L.pause=a.pause.bind(a),L.resume=a.resume.bind(a),L.stop=L,L}function fe(n,e=1/0,t){if(e<=0||!Z(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,vn(n))fe(n.value,e,t);else if(F(n))for(let s=0;s<n.length;s++)fe(n[s],e,t);else if(ki(n)||Ue(n))n.forEach(s=>{fe(s,e,t)});else if(Ti(n)){for(const s in n)fe(n[s],e,t);for(const s of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,s)&&fe(n[s],e,t)}return n}/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function kt(n,e,t,s){try{return s?n(...s):n()}catch(r){rs(r,e,t)}}function Bn(n,e,t,s){if(B(n)){const r=kt(n,e,t,s);return r&&Si(r)&&r.catch(i=>{rs(i,e,t)}),r}if(F(n)){const r=[];for(let i=0;i<n.length;i++)r.push(Bn(n[i],e,t,s));return r}}function rs(n,e,t,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||sn;if(e){let l=e.parent;const c=e.proxy,u=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const a=l.ec;if(a){for(let d=0;d<a.length;d++)if(a[d](n,c,u)===!1)return}l=l.parent}if(i){se(),kt(i,null,10,[n,c,u]),re();return}}rc(n,t,r,s,o)}function rc(n,e,t,s=!0,r=!1){if(r)throw n;console.error(n)}const kn=[];let Yn=-1;const Ve=[];let be=null,He=0;const Wi=Promise.resolve();let Ft=null;function tr(n){const e=Ft||Wi;return n?e.then(this?n.bind(this):n):e}function ic(n){let e=Yn+1,t=kn.length;for(;e<t;){const s=e+t>>>1,r=kn[s],i=bt(r);i<n||i===n&&r.flags&2?e=s+1:t=s}return e}function sr(n){if(!(n.flags&1)){const e=bt(n),t=kn[kn.length-1];!t||!(n.flags&2)&&e>=bt(t)?kn.push(n):kn.splice(ic(e),0,n),n.flags|=1,Yi()}}function Yi(){Ft||(Ft=Wi.then(Qi))}function oc(n){F(n)?Ve.push(...n):be&&n.id===-1?be.splice(He+1,0,n):n.flags&1||(Ve.push(n),n.flags|=1),Yi()}function Tr(n,e,t=Yn+1){for(;t<kn.length;t++){const s=kn[t];if(s&&s.flags&2){if(n&&s.id!==n.uid)continue;kn.splice(t,1),t--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Zi(n){if(Ve.length){const e=[...new Set(Ve)].sort((t,s)=>bt(t)-bt(s));if(Ve.length=0,be){be.push(...e);return}for(be=e,He=0;He<be.length;He++){const t=be[He];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}be=null,He=0}}const bt=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Qi(n){try{for(Yn=0;Yn<kn.length;Yn++){const e=kn[Yn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),kt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Yn<kn.length;Yn++){const e=kn[Yn];e&&(e.flags&=-2)}Yn=-1,kn.length=0,Zi(),Ft=null,(kn.length||Ve.length)&&Qi()}}let Nn=null,Xi=null;function Bt(n){const e=Nn;return Nn=n,Xi=n&&n.type.__scopeId||null,e}function lc(n,e=Nn,t){if(!e||n._n)return n;const s=(...r)=>{s._d&&zt(-1);const i=Bt(e);let o;try{o=n(...r)}finally{Bt(i),s._d&&zt(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function cc(n,e){if(Nn===null)return n;const t=cs(Nn),s=n.dirs||(n.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,l,c=sn]=e[r];i&&(B(i)&&(i={mounted:i,updated:i}),i.deep&&fe(o),s.push({dir:i,instance:t,value:o,oldValue:void 0,arg:l,modifiers:c}))}return n}function ke(n,e,t,s){const r=n.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const l=r[o];i&&(l.oldValue=i[o].value);let c=l.dir[s];c&&(se(),Bn(c,t,8,[n.el,l,n,e]),re())}}function It(n,e){if(xn){let t=xn.provides;const s=xn.parent&&xn.parent.provides;s===t&&(t=xn.provides=Object.create(s)),t[n]=e}}function ee(n,e,t=!1){const s=da();if(s||ze){let r=ze?ze._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&n in r)return r[n];if(arguments.length>1)return t&&B(e)?e.call(s&&s.proxy):e}}const ac=Symbol.for("v-scx"),uc=()=>ee(ac);function fc(n,e){return rr(n,null,e)}function at(n,e,t){return rr(n,e,t)}function rr(n,e,t=sn){const{immediate:s,deep:r,flush:i,once:o}=t,l=_n({},t),c=e&&s||!e&&i!=="post";let u;if(vt){if(i==="sync"){const $=uc();u=$.__watcherHandles||($.__watcherHandles=[])}else if(!c){const $=()=>{};return $.stop=ne,$.resume=ne,$.pause=ne,$}}const a=xn;l.call=($,y,w)=>Bn($,a,y,w);let d=!1;i==="post"?l.scheduler=$=>{En($,a&&a.suspense)}:i!=="sync"&&(d=!0,l.scheduler=($,y)=>{y?$():sr($)}),l.augmentJob=$=>{e&&($.flags|=4),d&&($.flags|=2,a&&($.id=a.uid,$.i=a))};const p=sc(n,e,l);return vt&&(u?u.push(p):c&&p()),p}function dc(n,e,t){const s=this.proxy,r=un(n)?n.includes(".")?no(s,n):()=>s[n]:n.bind(s,s);let i;B(e)?i=e:(i=e.handler,t=e);const o=St(this),l=rr(r,i.bind(s),t);return o(),l}function no(n,e){const t=e.split(".");return()=>{let s=n;for(let r=0;r<t.length&&s;r++)s=s[t[r]];return s}}const hc=Symbol("_vte"),pc=n=>n.__isTeleport,$s=Symbol("_leaveCb");function ir(n,e){n.shapeFlag&6&&n.component?(n.transition=e,ir(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function eo(n,e){return B(n)?_n({name:n.name},e,{setup:n}):n}function to(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Er(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const jt=new WeakMap;function ut(n,e,t,s,r=!1){if(F(n)){n.forEach((w,C)=>ut(w,e&&(F(e)?e[C]:e),t,s,r));return}if(ft(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&ut(n,e,t,s.component.subTree);return}const i=s.shapeFlag&4?cs(s.component):s.el,o=r?null:i,{i:l,r:c}=n,u=e&&e.r,a=l.refs===sn?l.refs={}:l.refs,d=l.setupState,p=q(d),$=d===sn?wi:w=>Er(a,w)?!1:K(p,w),y=(w,C)=>!(C&&Er(a,C));if(u!=null&&u!==c){if(Ar(e),un(u))a[u]=null,$(u)&&(d[u]=null);else if(vn(u)){const w=e;y(u,w.k)&&(u.value=null),w.k&&(a[w.k]=null)}}if(B(c)){se();try{kt(c,l,12,[o,a])}finally{re()}}else{const w=un(c),C=vn(c);if(w||C){const L=()=>{if(n.f){const A=w?$(c)?d[c]:a[c]:y()||!n.k?c.value:a[n.k];if(r)F(A)&&zs(A,i);else if(F(A))A.includes(i)||A.push(i);else if(w)a[c]=[i],$(c)&&(d[c]=a[c]);else{const P=[i];y(c,n.k)&&(c.value=P),n.k&&(a[n.k]=P)}}else w?(a[c]=o,$(c)&&(d[c]=o)):C&&(y(c,n.k)&&(c.value=o),n.k&&(a[n.k]=o))};if(o){const A=()=>{L(),jt.delete(n)};A.id=-1,jt.set(n,A),En(A,t)}else Ar(n),L()}}}function Ar(n){const e=jt.get(n);e&&(e.flags|=8,jt.delete(n))}es().requestIdleCallback;es().cancelIdleCallback;const ft=n=>!!n.type.__asyncLoader,so=n=>n.type.__isKeepAlive;function gc(n,e){ro(n,"a",e)}function $c(n,e){ro(n,"da",e)}function ro(n,e,t=xn){const s=n.__wdc||(n.__wdc=()=>{let r=t;for(;r;){if(r.isDeactivated)return;r=r.parent}return n()});if(is(e,s,t),t){let r=t.parent;for(;r&&r.parent;)so(r.parent.vnode)&&mc(s,e,t,r),r=r.parent}}function mc(n,e,t,s){const r=is(e,n,s,!0);io(()=>{zs(s[e],r)},t)}function is(n,e,t=xn,s=!1){if(t){const r=t[n]||(t[n]=[]),i=e.__weh||(e.__weh=(...o)=>{se();const l=St(t),c=Bn(e,t,n,o);return l(),re(),c});return s?r.unshift(i):r.push(i),i}}const pe=n=>(e,t=xn)=>{(!vt||n==="sp")&&is(n,(...s)=>e(...s),t)},_c=pe("bm"),bc=pe("m"),xc=pe("bu"),vc=pe("u"),yc=pe("bum"),io=pe("um"),wc=pe("sp"),kc=pe("rtg"),Sc=pe("rtc");function Rc(n,e=xn){is("ec",n,e)}const Tc="components";function Ec(n,e){return Oc(Tc,n,!0,e)||n}const Ac=Symbol.for("v-ndc");function Oc(n,e,t=!0,s=!1){const r=Nn||xn;if(r){const i=r.type;{const l=ma(i,!1);if(l&&(l===e||l===Rn(e)||l===ns(Rn(e))))return i}const o=Or(r[n]||i[n],e)||Or(r.appContext[n],e);return!o&&s?i:o}}function Or(n,e){return n&&(n[e]||n[Rn(e)]||n[ns(Rn(e))])}function Ut(n,e,t,s){let r;const i=t,o=F(n);if(o||un(n)){const l=o&&Oe(n);let c=!1,u=!1;l&&(c=!Dn(n),u=he(n),n=ts(n)),r=new Array(n.length);for(let a=0,d=n.length;a<d;a++)r[a]=e(c?u?qe(Fn(n[a])):Fn(n[a]):n[a],a,void 0,i)}else if(typeof n=="number"){r=new Array(n);for(let l=0;l<n;l++)r[l]=e(l+1,l,void 0,i)}else if(Z(n))if(n[Symbol.iterator])r=Array.from(n,(l,c)=>e(l,c,void 0,i));else{const l=Object.keys(n);r=new Array(l.length);for(let c=0,u=l.length;c<u;c++){const a=l[c];r[c]=e(n[a],a,c,i)}}else r=[];return r}const Ns=n=>n?To(n)?cs(n):Ns(n.parent):null,dt=_n(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ns(n.parent),$root:n=>Ns(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>lo(n),$forceUpdate:n=>n.f||(n.f=()=>{sr(n.update)}),$nextTick:n=>n.n||(n.n=tr.bind(n.proxy)),$watch:n=>dc.bind(n)}),ms=(n,e)=>n!==sn&&!n.__isScriptSetup&&K(n,e),Nc={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:s,data:r,props:i,accessCache:o,type:l,appContext:c}=n;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return r[e];case 4:return t[e];case 3:return i[e]}else{if(ms(s,e))return o[e]=1,s[e];if(r!==sn&&K(r,e))return o[e]=2,r[e];if(K(i,e))return o[e]=3,i[e];if(t!==sn&&K(t,e))return o[e]=4,t[e];Ps&&(o[e]=0)}}const u=dt[e];let a,d;if(u)return e==="$attrs"&&bn(n.attrs,"get",""),u(n);if((a=l.__cssModules)&&(a=a[e]))return a;if(t!==sn&&K(t,e))return o[e]=4,t[e];if(d=c.config.globalProperties,K(d,e))return d[e]},set({_:n},e,t){const{data:s,setupState:r,ctx:i}=n;return ms(r,e)?(r[e]=t,!0):s!==sn&&K(s,e)?(s[e]=t,!0):K(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(i[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:s,appContext:r,props:i,type:o}},l){let c;return!!(t[l]||n!==sn&&l[0]!=="$"&&K(n,l)||ms(e,l)||K(i,l)||K(s,l)||K(dt,l)||K(r.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:K(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Nr(n){return F(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Ps=!0;function Pc(n){const e=lo(n),t=n.proxy,s=n.ctx;Ps=!1,e.beforeCreate&&Pr(e.beforeCreate,n,"bc");const{data:r,computed:i,methods:o,watch:l,provide:c,inject:u,created:a,beforeMount:d,mounted:p,beforeUpdate:$,updated:y,activated:w,deactivated:C,beforeDestroy:L,beforeUnmount:A,destroyed:P,unmounted:N,render:J,renderTracked:ln,renderTriggered:W,errorCaptured:Un,serverPrefetch:ge,expose:Vn,inheritAttrs:$e,components:ye,directives:zn,filters:Ze}=e;if(u&&Cc(u,s,null),o)for(const Q in o){const z=o[Q];B(z)&&(s[Q]=z.bind(t))}if(r){const Q=r.call(t,t);Z(Q)&&(n.data=ss(Q))}if(Ps=!0,i)for(const Q in i){const z=i[Q],ie=B(z)?z.bind(t,t):B(z.get)?z.get.bind(t,t):ne,me=!B(z)&&B(z.set)?z.set.bind(t):ne,Gn=In({get:ie,set:me});Object.defineProperty(s,Q,{enumerable:!0,configurable:!0,get:()=>Gn.value,set:Tn=>Gn.value=Tn})}if(l)for(const Q in l)oo(l[Q],s,t,Q);if(c){const Q=B(c)?c.call(t):c;Reflect.ownKeys(Q).forEach(z=>{It(z,Q[z])})}a&&Pr(a,n,"c");function pn(Q,z){F(z)?z.forEach(ie=>Q(ie.bind(t))):z&&Q(z.bind(t))}if(pn(_c,d),pn(bc,p),pn(xc,$),pn(vc,y),pn(gc,w),pn($c,C),pn(Rc,Un),pn(Sc,ln),pn(kc,W),pn(yc,A),pn(io,N),pn(wc,ge),F(Vn))if(Vn.length){const Q=n.exposed||(n.exposed={});Vn.forEach(z=>{Object.defineProperty(Q,z,{get:()=>t[z],set:ie=>t[z]=ie,enumerable:!0})})}else n.exposed||(n.exposed={});J&&n.render===ne&&(n.render=J),$e!=null&&(n.inheritAttrs=$e),ye&&(n.components=ye),zn&&(n.directives=zn),ge&&to(n)}function Cc(n,e,t=ne){F(n)&&(n=Cs(n));for(const s in n){const r=n[s];let i;Z(r)?"default"in r?i=ee(r.from||s,r.default,!0):i=ee(r.from||s):i=ee(r),vn(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Pr(n,e,t){Bn(F(n)?n.map(s=>s.bind(e.proxy)):n.bind(e.proxy),e,t)}function oo(n,e,t,s){let r=s.includes(".")?no(t,s):()=>t[s];if(un(n)){const i=e[n];B(i)&&at(r,i)}else if(B(n))at(r,n.bind(t));else if(Z(n))if(F(n))n.forEach(i=>oo(i,e,t,s));else{const i=B(n.handler)?n.handler.bind(t):e[n.handler];B(i)&&at(r,i,n)}}function lo(n){const e=n.type,{mixins:t,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=n.appContext,l=i.get(e);let c;return l?c=l:!r.length&&!t&&!s?c=e:(c={},r.length&&r.forEach(u=>Vt(c,u,o,!0)),Vt(c,e,o)),Z(e)&&i.set(e,c),c}function Vt(n,e,t,s=!1){const{mixins:r,extends:i}=e;i&&Vt(n,i,t,!0),r&&r.forEach(o=>Vt(n,o,t,!0));for(const o in e)if(!(s&&o==="expose")){const l=Ic[o]||t&&t[o];n[o]=l?l(n[o],e[o]):e[o]}return n}const Ic={data:Cr,props:Ir,emits:Ir,methods:rt,computed:rt,beforeCreate:yn,created:yn,beforeMount:yn,mounted:yn,beforeUpdate:yn,updated:yn,beforeDestroy:yn,beforeUnmount:yn,destroyed:yn,unmounted:yn,activated:yn,deactivated:yn,errorCaptured:yn,serverPrefetch:yn,components:rt,directives:rt,watch:Lc,provide:Cr,inject:Mc};function Cr(n,e){return e?n?function(){return _n(B(n)?n.call(this,this):n,B(e)?e.call(this,this):e)}:e:n}function Mc(n,e){return rt(Cs(n),Cs(e))}function Cs(n){if(F(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function yn(n,e){return n?[...new Set([].concat(n,e))]:e}function rt(n,e){return n?_n(Object.create(null),n,e):e}function Ir(n,e){return n?F(n)&&F(e)?[...new Set([...n,...e])]:_n(Object.create(null),Nr(n),Nr(e??{})):e}function Lc(n,e){if(!n)return e;if(!e)return n;const t=_n(Object.create(null),n);for(const s in e)t[s]=yn(n[s],e[s]);return t}function co(){return{app:null,config:{isNativeTag:wi,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Dc=0;function Hc(n,e){return function(s,r=null){B(s)||(s=_n({},s)),r!=null&&!Z(r)&&(r=null);const i=co(),o=new WeakSet,l=[];let c=!1;const u=i.app={_uid:Dc++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:ba,get config(){return i.config},set config(a){},use(a,...d){return o.has(a)||(a&&B(a.install)?(o.add(a),a.install(u,...d)):B(a)&&(o.add(a),a(u,...d))),u},mixin(a){return i.mixins.includes(a)||i.mixins.push(a),u},component(a,d){return d?(i.components[a]=d,u):i.components[a]},directive(a,d){return d?(i.directives[a]=d,u):i.directives[a]},mount(a,d,p){if(!c){const $=u._ceVNode||gn(s,r);return $.appContext=i,p===!0?p="svg":p===!1&&(p=void 0),n($,a,p),c=!0,u._container=a,a.__vue_app__=u,cs($.component)}},onUnmount(a){l.push(a)},unmount(){c&&(Bn(l,u._instance,16),n(null,u._container),delete u._container.__vue_app__)},provide(a,d){return i.provides[a]=d,u},runWithContext(a){const d=ze;ze=u;try{return a()}finally{ze=d}}};return u}}let ze=null;const Fc=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Rn(e)}Modifiers`]||n[`${Pe(e)}Modifiers`];function Bc(n,e,...t){if(n.isUnmounted)return;const s=n.vnode.props||sn;let r=t;const i=e.startsWith("update:"),o=i&&Fc(s,e.slice(7));o&&(o.trim&&(r=t.map(a=>un(a)?a.trim():a)),o.number&&(r=t.map(qs)));let l,c=s[l=fs(e)]||s[l=fs(Rn(e))];!c&&i&&(c=s[l=fs(Pe(e))]),c&&Bn(c,n,6,r);const u=s[l+"Once"];if(u){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,Bn(u,n,6,r)}}const jc=new WeakMap;function ao(n,e,t=!1){const s=t?jc:e.emitsCache,r=s.get(n);if(r!==void 0)return r;const i=n.emits;let o={},l=!1;if(!B(n)){const c=u=>{const a=ao(u,e,!0);a&&(l=!0,_n(o,a))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!i&&!l?(Z(n)&&s.set(n,null),null):(F(i)?i.forEach(c=>o[c]=null):_n(o,i),Z(n)&&s.set(n,o),o)}function os(n,e){return!n||!Zt(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),K(n,e[0].toLowerCase()+e.slice(1))||K(n,Pe(e))||K(n,e))}function Mr(n){const{type:e,vnode:t,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:l,emit:c,render:u,renderCache:a,props:d,data:p,setupState:$,ctx:y,inheritAttrs:w}=n,C=Bt(n);let L,A;try{if(t.shapeFlag&4){const N=r||s,J=N;L=Qn(u.call(J,N,a,d,$,p,y)),A=l}else{const N=e;L=Qn(N.length>1?N(d,{attrs:l,slots:o,emit:c}):N(d,null)),A=e.props?l:Uc(l)}}catch(N){ht.length=0,rs(N,n,1),L=gn(ve)}let P=L;if(A&&w!==!1){const N=Object.keys(A),{shapeFlag:J}=P;N.length&&J&7&&(i&&N.some(Qt)&&(A=Vc(A,i)),P=Ke(P,A,!1,!0))}return t.dirs&&(P=Ke(P,null,!1,!0),P.dirs=P.dirs?P.dirs.concat(t.dirs):t.dirs),t.transition&&ir(P,t.transition),L=P,Bt(C),L}const Uc=n=>{let e;for(const t in n)(t==="class"||t==="style"||Zt(t))&&((e||(e={}))[t]=n[t]);return e},Vc=(n,e)=>{const t={};for(const s in n)(!Qt(s)||!(s.slice(9)in e))&&(t[s]=n[s]);return t};function zc(n,e,t){const{props:s,children:r,component:i}=n,{props:o,children:l,patchFlag:c}=e,u=i.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return s?Lr(s,o,u):!!o;if(c&8){const a=e.dynamicProps;for(let d=0;d<a.length;d++){const p=a[d];if(uo(o,s,p)&&!os(u,p))return!0}}}else return(r||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Lr(s,o,u):!0:!!o;return!1}function Lr(n,e,t){const s=Object.keys(e);if(s.length!==Object.keys(n).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(uo(e,n,i)&&!os(t,i))return!0}return!1}function uo(n,e,t){const s=n[t],r=e[t];return t==="style"&&Z(s)&&Z(r)?!Js(s,r):s!==r}function Gc({vnode:n,parent:e,suspense:t},s){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.suspense.vnode.el=r.el=s,n=r),r===n)(n=e.vnode).el=s,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=s)}const fo={},ho=()=>Object.create(fo),po=n=>Object.getPrototypeOf(n)===fo;function qc(n,e,t,s=!1){const r={},i=ho();n.propsDefaults=Object.create(null),go(n,e,r,i);for(const o in n.propsOptions[0])o in r||(r[o]=void 0);t?n.props=s?r:qi(r):n.type.props?n.props=r:n.props=i,n.attrs=i}function Kc(n,e,t,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=n,l=q(r),[c]=n.propsOptions;let u=!1;if((s||o>0)&&!(o&16)){if(o&8){const a=n.vnode.dynamicProps;for(let d=0;d<a.length;d++){let p=a[d];if(os(n.emitsOptions,p))continue;const $=e[p];if(c)if(K(i,p))$!==i[p]&&(i[p]=$,u=!0);else{const y=Rn(p);r[y]=Is(c,l,y,$,n,!1)}else $!==i[p]&&(i[p]=$,u=!0)}}}else{go(n,e,r,i)&&(u=!0);let a;for(const d in l)(!e||!K(e,d)&&((a=Pe(d))===d||!K(e,a)))&&(c?t&&(t[d]!==void 0||t[a]!==void 0)&&(r[d]=Is(c,l,d,void 0,n,!0)):delete r[d]);if(i!==l)for(const d in i)(!e||!K(e,d))&&(delete i[d],u=!0)}u&&ue(n.attrs,"set","")}function go(n,e,t,s){const[r,i]=n.propsOptions;let o=!1,l;if(e)for(let c in e){if(ot(c))continue;const u=e[c];let a;r&&K(r,a=Rn(c))?!i||!i.includes(a)?t[a]=u:(l||(l={}))[a]=u:os(n.emitsOptions,c)||(!(c in s)||u!==s[c])&&(s[c]=u,o=!0)}if(i){const c=q(t),u=l||sn;for(let a=0;a<i.length;a++){const d=i[a];t[d]=Is(r,c,d,u[d],n,!K(u,d))}}return o}function Is(n,e,t,s,r,i){const o=n[t];if(o!=null){const l=K(o,"default");if(l&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&B(c)){const{propsDefaults:u}=r;if(t in u)s=u[t];else{const a=St(r);s=u[t]=c.call(null,e),a()}}else s=c;r.ce&&r.ce._setProp(t,s)}o[0]&&(i&&!l?s=!1:o[1]&&(s===""||s===Pe(t))&&(s=!0))}return s}const Jc=new WeakMap;function $o(n,e,t=!1){const s=t?Jc:e.propsCache,r=s.get(n);if(r)return r;const i=n.props,o={},l=[];let c=!1;if(!B(n)){const a=d=>{c=!0;const[p,$]=$o(d,e,!0);_n(o,p),$&&l.push(...$)};!t&&e.mixins.length&&e.mixins.forEach(a),n.extends&&a(n.extends),n.mixins&&n.mixins.forEach(a)}if(!i&&!c)return Z(n)&&s.set(n,je),je;if(F(i))for(let a=0;a<i.length;a++){const d=Rn(i[a]);Dr(d)&&(o[d]=sn)}else if(i)for(const a in i){const d=Rn(a);if(Dr(d)){const p=i[a],$=o[d]=F(p)||B(p)?{type:p}:_n({},p),y=$.type;let w=!1,C=!0;if(F(y))for(let L=0;L<y.length;++L){const A=y[L],P=B(A)&&A.name;if(P==="Boolean"){w=!0;break}else P==="String"&&(C=!1)}else w=B(y)&&y.name==="Boolean";$[0]=w,$[1]=C,(w||K($,"default"))&&l.push(d)}}const u=[o,l];return Z(n)&&s.set(n,u),u}function Dr(n){return n[0]!=="$"&&!ot(n)}const or=n=>n==="_"||n==="_ctx"||n==="$stable",lr=n=>F(n)?n.map(Qn):[Qn(n)],Wc=(n,e,t)=>{if(e._n)return e;const s=lc((...r)=>lr(e(...r)),t);return s._c=!1,s},mo=(n,e,t)=>{const s=n._ctx;for(const r in n){if(or(r))continue;const i=n[r];if(B(i))e[r]=Wc(r,i,s);else if(i!=null){const o=lr(i);e[r]=()=>o}}},_o=(n,e)=>{const t=lr(e);n.slots.default=()=>t},bo=(n,e,t)=>{for(const s in e)(t||!or(s))&&(n[s]=e[s])},Yc=(n,e,t)=>{const s=n.slots=ho();if(n.vnode.shapeFlag&32){const r=e._;r?(bo(s,e,t),t&&Ei(s,"_",r,!0)):mo(e,s)}else e&&_o(n,e)},Zc=(n,e,t)=>{const{vnode:s,slots:r}=n;let i=!0,o=sn;if(s.shapeFlag&32){const l=e._;l?t&&l===1?i=!1:bo(r,e,t):(i=!e.$stable,mo(e,r)),o=e}else e&&(_o(n,e),o={default:1});if(i)for(const l in r)!or(l)&&o[l]==null&&delete r[l]},En=ta;function Qc(n){return Xc(n)}function Xc(n,e){const t=es();t.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:l,createComment:c,setText:u,setElementText:a,parentNode:d,nextSibling:p,setScopeId:$=ne,insertStaticContent:y}=n,w=(f,h,g,_=null,x=null,m=null,R=void 0,S=null,k=!!h.dynamicChildren)=>{if(f===h)return;f&&!nt(f,h)&&(_=b(f),Tn(f,x,m,!0),f=null),h.patchFlag===-2&&(k=!1,h.dynamicChildren=null);const{type:v,ref:D,shapeFlag:E}=h;switch(v){case ls:C(f,h,g,_);break;case ve:L(f,h,g,_);break;case Mt:f==null&&A(h,g,_,R);break;case Sn:ye(f,h,g,_,x,m,R,S,k);break;default:E&1?J(f,h,g,_,x,m,R,S,k):E&6?zn(f,h,g,_,x,m,R,S,k):(E&64||E&128)&&v.process(f,h,g,_,x,m,R,S,k,I)}D!=null&&x?ut(D,f&&f.ref,m,h||f,!h):D==null&&f&&f.ref!=null&&ut(f.ref,null,m,f,!0)},C=(f,h,g,_)=>{if(f==null)s(h.el=l(h.children),g,_);else{const x=h.el=f.el;h.children!==f.children&&u(x,h.children)}},L=(f,h,g,_)=>{f==null?s(h.el=c(h.children||""),g,_):h.el=f.el},A=(f,h,g,_)=>{[f.el,f.anchor]=y(f.children,h,g,_,f.el,f.anchor)},P=({el:f,anchor:h},g,_)=>{let x;for(;f&&f!==h;)x=p(f),s(f,g,_),f=x;s(h,g,_)},N=({el:f,anchor:h})=>{let g;for(;f&&f!==h;)g=p(f),r(f),f=g;r(h)},J=(f,h,g,_,x,m,R,S,k)=>{if(h.type==="svg"?R="svg":h.type==="math"&&(R="mathml"),f==null)ln(h,g,_,x,m,R,S,k);else{const v=f.el&&f.el._isVueCE?f.el:null;try{v&&v._beginPatch(),ge(f,h,x,m,R,S,k)}finally{v&&v._endPatch()}}},ln=(f,h,g,_,x,m,R,S)=>{let k,v;const{props:D,shapeFlag:E,transition:M,dirs:H}=f;if(k=f.el=o(f.type,m,D&&D.is,D),E&8?a(k,f.children):E&16&&Un(f.children,k,null,_,x,_s(f,m),R,S),H&&ke(f,null,_,"created"),W(k,f,f.scopeId,R,_),D){for(const en in D)en!=="value"&&!ot(en)&&i(k,en,null,D[en],m,_);"value"in D&&i(k,"value",null,D.value,m),(v=D.onVnodeBeforeMount)&&Wn(v,_,f)}H&&ke(f,null,_,"beforeMount");const V=na(x,M);V&&M.beforeEnter(k),s(k,h,g),((v=D&&D.onVnodeMounted)||V||H)&&En(()=>{try{v&&Wn(v,_,f),V&&M.enter(k),H&&ke(f,null,_,"mounted")}finally{}},x)},W=(f,h,g,_,x)=>{if(g&&$(f,g),_)for(let m=0;m<_.length;m++)$(f,_[m]);if(x){let m=x.subTree;if(h===m||wo(m.type)&&(m.ssContent===h||m.ssFallback===h)){const R=x.vnode;W(f,R,R.scopeId,R.slotScopeIds,x.parent)}}},Un=(f,h,g,_,x,m,R,S,k=0)=>{for(let v=k;v<f.length;v++){const D=f[v]=S?ae(f[v]):Qn(f[v]);w(null,D,h,g,_,x,m,R,S)}},ge=(f,h,g,_,x,m,R)=>{const S=h.el=f.el;let{patchFlag:k,dynamicChildren:v,dirs:D}=h;k|=f.patchFlag&16;const E=f.props||sn,M=h.props||sn;let H;if(g&&Se(g,!1),(H=M.onVnodeBeforeUpdate)&&Wn(H,g,h,f),D&&ke(h,f,g,"beforeUpdate"),g&&Se(g,!0),v&&(!f.dynamicChildren||f.dynamicChildren.length!==v.length)&&(k=0,R=!1,v=null),(E.innerHTML&&M.innerHTML==null||E.textContent&&M.textContent==null)&&a(S,""),v?Vn(f.dynamicChildren,v,S,g,_,_s(h,x),m):R||z(f,h,S,null,g,_,_s(h,x),m,!1),k>0){if(k&16)$e(S,E,M,g,x);else if(k&2&&E.class!==M.class&&i(S,"class",null,M.class,x),k&4&&i(S,"style",E.style,M.style,x),k&8){const V=h.dynamicProps;for(let en=0;en<V.length;en++){const X=V[en],fn=E[X],$n=M[X];($n!==fn||X==="value")&&i(S,X,fn,$n,x,g)}}k&1&&f.children!==h.children&&a(S,h.children)}else!R&&v==null&&$e(S,E,M,g,x);((H=M.onVnodeUpdated)||D)&&En(()=>{H&&Wn(H,g,h,f),D&&ke(h,f,g,"updated")},_)},Vn=(f,h,g,_,x,m,R)=>{for(let S=0;S<h.length;S++){const k=f[S],v=h[S],D=k.el&&(k.type===Sn||!nt(k,v)||k.shapeFlag&198)?d(k.el):g;w(k,v,D,null,_,x,m,R,!0)}},$e=(f,h,g,_,x)=>{if(h!==g){if(h!==sn)for(const m in h)!ot(m)&&!(m in g)&&i(f,m,h[m],null,x,_);for(const m in g){if(ot(m))continue;const R=g[m],S=h[m];R!==S&&m!=="value"&&i(f,m,S,R,x,_)}"value"in g&&i(f,"value",h.value,g.value,x)}},ye=(f,h,g,_,x,m,R,S,k)=>{const v=h.el=f?f.el:l(""),D=h.anchor=f?f.anchor:l("");let{patchFlag:E,dynamicChildren:M,slotScopeIds:H}=h;H&&(S=S?S.concat(H):H),f==null?(s(v,g,_),s(D,g,_),Un(h.children||[],g,D,x,m,R,S,k)):E>0&&E&64&&M&&f.dynamicChildren&&f.dynamicChildren.length===M.length?(Vn(f.dynamicChildren,M,g,x,m,R,S),(h.key!=null||x&&h===x.subTree)&&xo(f,h,!0)):z(f,h,g,D,x,m,R,S,k)},zn=(f,h,g,_,x,m,R,S,k)=>{h.slotScopeIds=S,f==null?h.shapeFlag&512?x.ctx.activate(h,g,_,R,k):Ze(h,g,_,x,m,R,k):Ie(f,h,k)},Ze=(f,h,g,_,x,m,R)=>{const S=f.component=fa(f,_,x);if(so(f)&&(S.ctx.renderer=I),ha(S,!1,R),S.asyncDep){if(x&&x.registerDep(S,pn,R),!f.el){const k=S.subTree=gn(ve);L(null,k,h,g),f.placeholder=k.el}}else pn(S,f,h,g,x,m,R)},Ie=(f,h,g)=>{const _=h.component=f.component;if(zc(f,h,g))if(_.asyncDep&&!_.asyncResolved){Q(_,h,g);return}else _.next=h,_.update();else h.el=f.el,_.vnode=h},pn=(f,h,g,_,x,m,R)=>{const S=()=>{if(f.isMounted){let{next:E,bu:M,u:H,parent:V,vnode:en}=f;{const Kn=vo(f);if(Kn){E&&(E.el=en.el,Q(f,E,R)),Kn.asyncDep.then(()=>{En(()=>{f.isUnmounted||v()},x)});return}}let X=E,fn;Se(f,!1),E?(E.el=en.el,Q(f,E,R)):E=en,M&&Ct(M),(fn=E.props&&E.props.onVnodeBeforeUpdate)&&Wn(fn,V,E,en),Se(f,!0);const $n=Mr(f),qn=f.subTree;f.subTree=$n,w(qn,$n,d(qn.el),b(qn),f,x,m),E.el=$n.el,X===null&&Gc(f,$n.el),H&&En(H,x),(fn=E.props&&E.props.onVnodeUpdated)&&En(()=>Wn(fn,V,E,en),x)}else{let E;const{el:M,props:H}=h,{bm:V,m:en,parent:X,root:fn,type:$n}=f,qn=ft(h);Se(f,!1),V&&Ct(V),!qn&&(E=H&&H.onVnodeBeforeMount)&&Wn(E,X,h),Se(f,!0);{fn.ce&&fn.ce._hasShadowRoot()&&fn.ce._injectChildStyle($n,f.parent?f.parent.type:void 0);const Kn=f.subTree=Mr(f);w(null,Kn,g,_,f,x,m),h.el=Kn.el}if(en&&En(en,x),!qn&&(E=H&&H.onVnodeMounted)){const Kn=h;En(()=>Wn(E,X,Kn),x)}(h.shapeFlag&256||X&&ft(X.vnode)&&X.vnode.shapeFlag&256)&&f.a&&En(f.a,x),f.isMounted=!0,h=g=_=null}};f.scope.on();const k=f.effect=new Pi(S);f.scope.off();const v=f.update=k.run.bind(k),D=f.job=k.runIfDirty.bind(k);D.i=f,D.id=f.uid,k.scheduler=()=>sr(D),Se(f,!0),v()},Q=(f,h,g)=>{h.component=f;const _=f.vnode.props;f.vnode=h,f.next=null,Kc(f,h.props,_,g),Zc(f,h.children,g),se(),Tr(f),re()},z=(f,h,g,_,x,m,R,S,k=!1)=>{const v=f&&f.children,D=f?f.shapeFlag:0,E=h.children,{patchFlag:M,shapeFlag:H}=h;if(M>0){if(M&128){me(v,E,g,_,x,m,R,S,k);return}else if(M&256){ie(v,E,g,_,x,m,R,S,k);return}}H&8?(D&16&&Cn(v,x,m),E!==v&&a(g,E)):D&16?H&16?me(v,E,g,_,x,m,R,S,k):Cn(v,x,m,!0):(D&8&&a(g,""),H&16&&Un(E,g,_,x,m,R,S,k))},ie=(f,h,g,_,x,m,R,S,k)=>{f=f||je,h=h||je;const v=f.length,D=h.length,E=Math.min(v,D);let M;for(M=0;M<E;M++){const H=h[M]=k?ae(h[M]):Qn(h[M]);w(f[M],H,g,null,x,m,R,S,k)}v>D?Cn(f,x,m,!0,!1,E):Un(h,g,_,x,m,R,S,k,E)},me=(f,h,g,_,x,m,R,S,k)=>{let v=0;const D=h.length;let E=f.length-1,M=D-1;for(;v<=E&&v<=M;){const H=f[v],V=h[v]=k?ae(h[v]):Qn(h[v]);if(nt(H,V))w(H,V,g,null,x,m,R,S,k);else break;v++}for(;v<=E&&v<=M;){const H=f[E],V=h[M]=k?ae(h[M]):Qn(h[M]);if(nt(H,V))w(H,V,g,null,x,m,R,S,k);else break;E--,M--}if(v>E){if(v<=M){const H=M+1,V=H<D?h[H].el:_;for(;v<=M;)w(null,h[v]=k?ae(h[v]):Qn(h[v]),g,V,x,m,R,S,k),v++}}else if(v>M)for(;v<=E;)Tn(f[v],x,m,!0),v++;else{const H=v,V=v,en=new Map;for(v=V;v<=M;v++){const An=h[v]=k?ae(h[v]):Qn(h[v]);An.key!=null&&en.set(An.key,v)}let X,fn=0;const $n=M-V+1;let qn=!1,Kn=0;const Qe=new Array($n);for(v=0;v<$n;v++)Qe[v]=0;for(v=H;v<=E;v++){const An=f[v];if(fn>=$n){Tn(An,x,m,!0);continue}let Jn;if(An.key!=null)Jn=en.get(An.key);else for(X=V;X<=M;X++)if(Qe[X-V]===0&&nt(An,h[X])){Jn=X;break}Jn===void 0?Tn(An,x,m,!0):(Qe[Jn-V]=v+1,Jn>=Kn?Kn=Jn:qn=!0,w(An,h[Jn],g,null,x,m,R,S,k),fn++)}const xr=qn?ea(Qe):je;for(X=xr.length-1,v=$n-1;v>=0;v--){const An=V+v,Jn=h[An],vr=h[An+1],yr=An+1<D?vr.el||yo(vr):_;Qe[v]===0?w(null,Jn,g,yr,x,m,R,S,k):qn&&(X<0||v!==xr[X]?Gn(Jn,g,yr,2):X--)}}},Gn=(f,h,g,_,x=null)=>{const{el:m,type:R,transition:S,children:k,shapeFlag:v}=f;if(v&6){Gn(f.component.subTree,h,g,_);return}if(v&128){f.suspense.move(h,g,_);return}if(v&64){R.move(f,h,g,I);return}if(R===Sn){s(m,h,g);for(let E=0;E<k.length;E++)Gn(k[E],h,g,_);s(f.anchor,h,g);return}if(R===Mt){P(f,h,g);return}if(_!==2&&v&1&&S)if(_===0)S.persisted&&!m[$s]?s(m,h,g):(S.beforeEnter(m),s(m,h,g),En(()=>S.enter(m),x));else{const{leave:E,delayLeave:M,afterLeave:H}=S,V=()=>{f.ctx.isUnmounted?r(m):s(m,h,g)},en=()=>{const X=m._isLeaving||!!m[$s];m._isLeaving&&m[$s](!0),S.persisted&&!X?V():E(m,()=>{V(),H&&H()})};M?M(m,V,en):en()}else s(m,h,g)},Tn=(f,h,g,_=!1,x=!1)=>{const{type:m,props:R,ref:S,children:k,dynamicChildren:v,shapeFlag:D,patchFlag:E,dirs:M,cacheIndex:H,memo:V}=f;if(E===-2&&(x=!1),S!=null&&(se(),ut(S,null,g,f,!0),re()),H!=null&&(h.renderCache[H]=void 0),D&256){h.ctx.deactivate(f);return}const en=D&1&&M,X=!ft(f);let fn;if(X&&(fn=R&&R.onVnodeBeforeUnmount)&&Wn(fn,h,f),D&6)we(f.component,g,_);else{if(D&128){f.suspense.unmount(g,_);return}en&&ke(f,null,h,"beforeUnmount"),D&64?f.type.remove(f,h,g,I,_):v&&!v.hasOnce&&(m!==Sn||E>0&&E&64)?Cn(v,h,g,!1,!0):(m===Sn&&E&384||!x&&D&16)&&Cn(k,h,g),_&&Me(f)}const $n=V!=null&&H==null;(X&&(fn=R&&R.onVnodeUnmounted)||en||$n)&&En(()=>{fn&&Wn(fn,h,f),en&&ke(f,null,h,"unmounted"),$n&&(f.el=null)},g)},Me=f=>{const{type:h,el:g,anchor:_,transition:x}=f;if(h===Sn){Le(g,_);return}if(h===Mt){N(f);return}const m=()=>{r(g),x&&!x.persisted&&x.afterLeave&&x.afterLeave()};if(f.shapeFlag&1&&x&&!x.persisted){const{leave:R,delayLeave:S}=x,k=()=>R(g,m);S?S(f.el,m,k):k()}else m()},Le=(f,h)=>{let g;for(;f!==h;)g=p(f),r(f),f=g;r(h)},we=(f,h,g)=>{const{bum:_,scope:x,job:m,subTree:R,um:S,m:k,a:v}=f;Hr(k),Hr(v),_&&Ct(_),x.stop(),m&&(m.flags|=8,Tn(R,f,h,g)),S&&En(S,h),En(()=>{f.isUnmounted=!0},h)},Cn=(f,h,g,_=!1,x=!1,m=0)=>{for(let R=m;R<f.length;R++)Tn(f[R],h,g,_,x)},b=f=>{if(f.shapeFlag&6)return b(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const h=p(f.anchor||f.el),g=h&&h[hc];return g?p(g):h};let O=!1;const T=(f,h,g)=>{let _;f==null?h._vnode&&(Tn(h._vnode,null,null,!0),_=h._vnode.component):w(h._vnode||null,f,h,null,null,null,g),h._vnode=f,O||(O=!0,Tr(_),Zi(),O=!1)},I={p:w,um:Tn,m:Gn,r:Me,mt:Ze,mc:Un,pc:z,pbc:Vn,n:b,o:n};return{render:T,hydrate:void 0,createApp:Hc(T)}}function _s({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Se({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function na(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function xo(n,e,t=!1){const s=n.children,r=e.children;if(F(s)&&F(r))for(let i=0;i<s.length;i++){const o=s[i];let l=r[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=r[i]=ae(r[i]),l.el=o.el),!t&&l.patchFlag!==-2&&xo(o,l)),l.type===ls&&(l.patchFlag===-1&&(l=r[i]=ae(l)),l.el=o.el),l.type===ve&&!l.el&&(l.el=o.el)}}function ea(n){const e=n.slice(),t=[0];let s,r,i,o,l;const c=n.length;for(s=0;s<c;s++){const u=n[s];if(u!==0){if(r=t[t.length-1],n[r]<u){e[s]=r,t.push(s);continue}for(i=0,o=t.length-1;i<o;)l=i+o>>1,n[t[l]]<u?i=l+1:o=l;u<n[t[i]]&&(i>0&&(e[s]=t[i-1]),t[i]=s)}}for(i=t.length,o=t[i-1];i-- >0;)t[i]=o,o=e[o];return t}function vo(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:vo(e)}function Hr(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function yo(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?yo(e.subTree):null}const wo=n=>n.__isSuspense;function ta(n,e){e&&e.pendingBranch?F(n)?e.effects.push(...n):e.effects.push(n):oc(n)}const Sn=Symbol.for("v-fgt"),ls=Symbol.for("v-txt"),ve=Symbol.for("v-cmt"),Mt=Symbol.for("v-stc"),ht=[];let Pn=null;function on(n=!1){ht.push(Pn=n?null:[])}function sa(){ht.pop(),Pn=ht[ht.length-1]||null}let xt=1;function zt(n,e=!1){xt+=n,n<0&&Pn&&e&&(Pn.hasOnce=!0)}function ko(n){return n.dynamicChildren=xt>0?Pn||je:null,sa(),xt>0&&Pn&&Pn.push(n),n}function an(n,e,t,s,r,i){return ko(j(n,e,t,s,r,i,!0))}function So(n,e,t,s,r){return ko(gn(n,e,t,s,r,!0))}function Gt(n){return n?n.__v_isVNode===!0:!1}function nt(n,e){return n.type===e.type&&n.key===e.key}const Ro=({key:n})=>n??null,Lt=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?un(n)||vn(n)||B(n)?{i:Nn,r:n,k:e,f:!!t}:n:null);function j(n,e=null,t=null,s=0,r=null,i=n===Sn?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Ro(e),ref:e&&Lt(e),scopeId:Xi,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Nn};return l?(qt(c,t),i&128&&n.normalize(c)):t&&(c.shapeFlag|=un(t)?8:16),xt>0&&!o&&Pn&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&Pn.push(c),c}const gn=ra;function ra(n,e=null,t=null,s=0,r=null,i=!1){if((!n||n===Ac)&&(n=ve),Gt(n)){const l=Ke(n,e,!0);return t&&qt(l,t),xt>0&&!i&&Pn&&(l.shapeFlag&6?Pn[Pn.indexOf(n)]=l:Pn.push(l)),l.patchFlag=-2,l}if(_a(n)&&(n=n.__vccOpts),e){e=ia(e);let{class:l,style:c}=e;l&&!un(l)&&(e.class=Ge(l)),Z(c)&&(er(c)&&!F(c)&&(c=_n({},c)),e.style=Ks(c))}const o=un(n)?1:wo(n)?128:pc(n)?64:Z(n)?4:B(n)?2:0;return j(n,e,t,s,r,o,i,!0)}function ia(n){return n?er(n)||po(n)?_n({},n):n:null}function Ke(n,e,t=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:l,transition:c}=n,u=e?ca(r||{},e):r,a={__v_isVNode:!0,__v_skip:!0,type:n.type,props:u,key:u&&Ro(u),ref:e&&e.ref?t&&i?F(i)?i.concat(Lt(e)):[i,Lt(e)]:Lt(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==Sn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Ke(n.ssContent),ssFallback:n.ssFallback&&Ke(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&s&&ir(a,c.clone(a)),a}function oa(n=" ",e=0){return gn(ls,null,n,e)}function la(n,e){const t=gn(Mt,null,n);return t.staticCount=e,t}function cr(n="",e=!1){return e?(on(),So(ve,null,n)):gn(ve,null,n)}function Qn(n){return n==null||typeof n=="boolean"?gn(ve):F(n)?gn(Sn,null,n.slice()):Gt(n)?ae(n):gn(ls,null,String(n))}function ae(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Ke(n)}function qt(n,e){let t=0;const{shapeFlag:s}=n;if(e==null)e=null;else if(F(e))t=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),qt(n,r()),r._c&&(r._d=!0));return}else{t=32;const r=e._;!r&&!po(e)?e._ctx=Nn:r===3&&Nn&&(Nn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(B(e)){if(s&65){qt(n,{default:e});return}e={default:e,_ctx:Nn},t=32}else e=String(e),s&64?(t=16,e=[oa(e)]):t=8;n.children=e,n.shapeFlag|=t}function ca(...n){const e={};for(let t=0;t<n.length;t++){const s=n[t];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=Ge([e.class,s.class]));else if(r==="style")e.style=Ks([e.style,s.style]);else if(Zt(r)){const i=e[r],o=s[r];o&&i!==o&&!(F(i)&&i.includes(o))?e[r]=i?[].concat(i,o):o:o==null&&i==null&&!Qt(r)&&(e[r]=o)}else r!==""&&(e[r]=s[r])}return e}function Wn(n,e,t,s=null){Bn(n,e,7,[t,s])}const aa=co();let ua=0;function fa(n,e,t){const s=n.type,r=(e?e.appContext:n.appContext)||aa,i={uid:ua++,vnode:n,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Nl(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:$o(s,r),emitsOptions:ao(s,r),emit:null,emitted:null,propsDefaults:sn,inheritAttrs:s.inheritAttrs,ctx:sn,data:sn,props:sn,attrs:sn,slots:sn,refs:sn,setupState:sn,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=Bc.bind(null,i),n.ce&&n.ce(i),i}let xn=null;const da=()=>xn||Nn;let Kt,Ms;{const n=es(),e=(t,s)=>{let r;return(r=n[t])||(r=n[t]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};Kt=e("__VUE_INSTANCE_SETTERS__",t=>xn=t),Ms=e("__VUE_SSR_SETTERS__",t=>vt=t)}const St=n=>{const e=xn;return Kt(n),n.scope.on(),()=>{n.scope.off(),Kt(e)}},Fr=()=>{xn&&xn.scope.off(),Kt(null)};function To(n){return n.vnode.shapeFlag&4}let vt=!1;function ha(n,e=!1,t=!1){e&&Ms(e);const{props:s,children:r}=n.vnode,i=To(n);qc(n,s,i,e),Yc(n,r,t||e);const o=i?pa(n,e):void 0;return e&&Ms(!1),o}function pa(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Nc);const{setup:s}=t;if(s){se();const r=n.setupContext=s.length>1?$a(n):null,i=St(n),o=kt(s,n,0,[n.props,r]),l=Si(o);if(re(),i(),(l||n.sp)&&!ft(n)&&to(n),l){if(o.then(Fr,Fr),e)return o.then(c=>{Br(n,c)}).catch(c=>{rs(c,n,0)});n.asyncDep=o}else Br(n,o)}else Eo(n)}function Br(n,e,t){B(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Z(e)&&(n.setupState=Ji(e)),Eo(n)}function Eo(n,e,t){const s=n.type;n.render||(n.render=s.render||ne);{const r=St(n);se();try{Pc(n)}finally{re(),r()}}}const ga={get(n,e){return bn(n,"get",""),n[e]}};function $a(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,ga),slots:n.slots,emit:n.emit,expose:e}}function cs(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Ji(Yl(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in dt)return dt[t](n)},has(e,t){return t in e||t in dt}})):n.proxy}function ma(n,e=!0){return B(n)?n.displayName||n.name:n.name||e&&n.__name}function _a(n){return B(n)&&"__vccOpts"in n}const In=(n,e)=>ec(n,e,vt);function Ao(n,e,t){try{zt(-1);const s=arguments.length;return s===2?Z(e)&&!F(e)?Gt(e)?gn(n,null,[e]):gn(n,e):gn(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&Gt(t)&&(t=[t]),gn(n,e,t))}finally{zt(1)}}const ba="3.5.39";/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ls;const jr=typeof window<"u"&&window.trustedTypes;if(jr)try{Ls=jr.createPolicy("vue",{createHTML:n=>n})}catch{}const Oo=Ls?n=>Ls.createHTML(n):n=>n,xa="http://www.w3.org/2000/svg",va="http://www.w3.org/1998/Math/MathML",ce=typeof document<"u"?document:null,Ur=ce&&ce.createElement("template"),ya={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,s)=>{const r=e==="svg"?ce.createElementNS(xa,n):e==="mathml"?ce.createElementNS(va,n):t?ce.createElement(n,{is:t}):ce.createElement(n);return n==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:n=>ce.createTextNode(n),createComment:n=>ce.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ce.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,s,r,i){const o=t?t.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),t),!(r===i||!(r=r.nextSibling)););else{Ur.innerHTML=Oo(s==="svg"?`<svg>${n}</svg>`:s==="mathml"?`<math>${n}</math>`:n);const l=Ur.content;if(s==="svg"||s==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},wa=Symbol("_vtc");function ka(n,e,t){const s=n[wa];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Vr=Symbol("_vod"),Sa=Symbol("_vsh"),Ra=Symbol(""),Ta=/(?:^|;)\s*display\s*:/;function Ea(n,e,t){const s=n.style,r=un(t);let i=!1;if(t&&!r){if(e)if(un(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();t[l]==null&&it(s,l,"")}else for(const o in e)t[o]==null&&it(s,o,"");for(const o in t){o==="display"&&(i=!0);const l=t[o];l!=null?Oa(n,o,!un(e)&&e?e[o]:void 0,l)||it(s,o,l):it(s,o,"")}}else if(r){if(e!==t){const o=s[Ra];o&&(t+=";"+o),s.cssText=t,i=Ta.test(t)}}else e&&n.removeAttribute("style");Vr in n&&(n[Vr]=i?s.display:"",n[Sa]&&(s.display="none"))}const zr=/\s*!important$/;function it(n,e,t){if(F(t))t.forEach(s=>it(n,e,s));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const s=Aa(n,e);zr.test(t)?n.setProperty(Pe(s),t.replace(zr,""),"important"):n[s]=t}}const Gr=["Webkit","Moz","ms"],bs={};function Aa(n,e){const t=bs[e];if(t)return t;let s=Rn(e);if(s!=="filter"&&s in n)return bs[e]=s;s=ns(s);for(let r=0;r<Gr.length;r++){const i=Gr[r]+s;if(i in n)return bs[e]=i}return e}function Oa(n,e,t,s){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&un(s)&&t===s}const qr="http://www.w3.org/1999/xlink";function Kr(n,e,t,s,r,i=Al(e)){s&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(qr,e.slice(6,e.length)):n.setAttributeNS(qr,e,t):t==null||i&&!Ai(t)?n.removeAttribute(e):n.setAttribute(e,i?"":te(t)?String(t):t)}function Jr(n,e,t,s,r){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Oo(t):t);return}const i=n.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(l!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=Ai(t):t==null&&l==="string"?(t="",o=!0):l==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(r||e)}function Fe(n,e,t,s){n.addEventListener(e,t,s)}function Na(n,e,t,s){n.removeEventListener(e,t,s)}const Wr=Symbol("_vei");function Pa(n,e,t,s,r=null){const i=n[Wr]||(n[Wr]={}),o=i[e];if(s&&o)o.value=s;else{const[l,c]=Ma(e);if(s){const u=i[e]=Ha(s,r);Fe(n,l,u,c)}else o&&(Na(n,l,o,c),i[e]=void 0)}}const Ca=/(Once|Passive|Capture)$/,Ia=/^on:?(?:Once|Passive|Capture)$/;function Ma(n){let e,t;for(;(t=n.match(Ca))&&!Ia.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):Pe(n.slice(2)),e]}let xs=0;const La=Promise.resolve(),Da=()=>xs||(La.then(()=>xs=0),xs=Date.now());function Ha(n,e){const t=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=t.attached)return;const r=t.value;if(F(r)){const i=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{i.call(s),s._stopped=!0};const o=r.slice(),l=[s];for(let c=0;c<o.length&&!s._stopped;c++){const u=o[c];u&&Bn(u,e,5,l)}}else Bn(r,e,5,[s])};return t.value=n,t.attached=Da(),t}const Yr=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Fa=(n,e,t,s,r,i)=>{const o=r==="svg";e==="class"?ka(n,s,o):e==="style"?Ea(n,t,s):Zt(e)?Qt(e)||Pa(n,e,t,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Ba(n,e,s,o))?(Jr(n,e,s),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Kr(n,e,s,o,i,e!=="value")):n._isVueCE&&(ja(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!un(s)))?Jr(n,Rn(e),s,i,e):(e==="true-value"?n._trueValue=s:e==="false-value"&&(n._falseValue=s),Kr(n,e,s,o))};function Ba(n,e,t,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in n&&Yr(e)&&B(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=n.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Yr(e)&&un(t)?!1:e in n}function ja(n,e){const t=n._def.props;if(!t)return!1;const s=Rn(e);return Array.isArray(t)?t.some(r=>Rn(r)===s):Object.keys(t).some(r=>Rn(r)===s)}const Zr=n=>{const e=n.props["onUpdate:modelValue"]||!1;return F(e)?t=>Ct(e,t):e};function Ua(n){n.target.composing=!0}function Qr(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const vs=Symbol("_assign");function Xr(n,e,t){return e&&(n=n.trim()),t&&(n=qs(n)),n}const Va={created(n,{modifiers:{lazy:e,trim:t,number:s}},r){n[vs]=Zr(r);const i=s||r.props&&r.props.type==="number";Fe(n,e?"change":"input",o=>{o.target.composing||n[vs](Xr(n.value,t,i))}),(t||i)&&Fe(n,"change",()=>{n.value=Xr(n.value,t,i)}),e||(Fe(n,"compositionstart",Ua),Fe(n,"compositionend",Qr),Fe(n,"change",Qr))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:s,trim:r,number:i}},o){if(n[vs]=Zr(o),n.composing)return;const l=(i||n.type==="number")&&!/^0\d/.test(n.value)?qs(n.value):n.value,c=e??"";if(l===c)return;const u=n.getRootNode();(u instanceof Document||u instanceof ShadowRoot)&&u.activeElement===n&&n.type!=="range"&&(s&&e===t||r&&n.value.trim()===c)||(n.value=c)}},za=["ctrl","shift","alt","meta"],Ga={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>za.some(t=>n[`${t}Key`]&&!e.includes(t))},qa=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),s=e.join(".");return t[s]||(t[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const l=Ga[e[o]];if(l&&l(r,e))return}return n(r,...i)})},Ka=_n({patchProp:Fa},ya);let ni;function Ja(){return ni||(ni=Qc(Ka))}const Wa=(...n)=>{const e=Ja().createApp(...n),{mount:t}=e;return e.mount=s=>{const r=Za(s);if(!r)return;const i=e._component;!B(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=t(r,!1,Ya(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function Ya(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Za(n){return un(n)?document.querySelector(n):n}const Dt=Te(localStorage.getItem("theme")!=="light");fc(()=>{const n=Dt.value?"dark":"light";document.documentElement.setAttribute("data-theme",n),localStorage.setItem("theme",n)});function Qa(){function n(){Dt.value=!Dt.value}return{isDark:Dt,toggle:n}}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Be=typeof document<"u";function No(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function Xa(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&No(n.default)}const G=Object.assign;function ys(n,e){const t={};for(const s in e){const r=e[s];t[s]=jn(r)?r.map(n):n(r)}return t}const pt=()=>{},jn=Array.isArray;function ei(n,e){const t={};for(const s in n)t[s]=s in e?e[s]:n[s];return t}const Po=/#/g,nu=/&/g,eu=/\//g,tu=/=/g,su=/\?/g,Co=/\+/g,ru=/%5B/g,iu=/%5D/g,Io=/%5E/g,ou=/%60/g,Mo=/%7B/g,lu=/%7C/g,Lo=/%7D/g,cu=/%20/g;function ar(n){return n==null?"":encodeURI(""+n).replace(lu,"|").replace(ru,"[").replace(iu,"]")}function au(n){return ar(n).replace(Mo,"{").replace(Lo,"}").replace(Io,"^")}function Ds(n){return ar(n).replace(Co,"%2B").replace(cu,"+").replace(Po,"%23").replace(nu,"%26").replace(ou,"`").replace(Mo,"{").replace(Lo,"}").replace(Io,"^")}function uu(n){return Ds(n).replace(tu,"%3D")}function fu(n){return ar(n).replace(Po,"%23").replace(su,"%3F")}function du(n){return fu(n).replace(eu,"%2F")}function yt(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const hu=/\/$/,pu=n=>n.replace(hu,"");function ws(n,e,t="/"){let s,r={},i="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return c=l>=0&&c>l?-1:c,c>=0&&(s=e.slice(0,c),i=e.slice(c,l>0?l:e.length),r=n(i.slice(1))),l>=0&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=_u(s??e,t),{fullPath:s+i+o,path:s,query:r,hash:yt(o)}}function gu(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function ti(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function $u(n,e,t){const s=e.matched.length-1,r=t.matched.length-1;return s>-1&&s===r&&Je(e.matched[s],t.matched[r])&&Do(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function Je(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Do(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!mu(n[t],e[t]))return!1;return!0}function mu(n,e){return jn(n)?si(n,e):jn(e)?si(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function si(n,e){return jn(e)?n.length===e.length&&n.every((t,s)=>t===e[s]):n.length===1&&n[0]===e}function _u(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),s=n.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=t.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")i>1&&i--;else break;return t.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const _e={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Hs=function(n){return n.pop="pop",n.push="push",n}({}),ks=function(n){return n.back="back",n.forward="forward",n.unknown="",n}({});function bu(n){if(!n)if(Be){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),pu(n)}const xu=/^[^#]+#/;function vu(n,e){return n.replace(xu,"#")+e}function yu(n,e){const t=document.documentElement.getBoundingClientRect(),s=n.getBoundingClientRect();return{behavior:e.behavior,left:s.left-t.left-(e.left||0),top:s.top-t.top-(e.top||0)}}const as=()=>({left:window.scrollX,top:window.scrollY});function wu(n){let e;if("el"in n){const t=n.el,s=typeof t=="string"&&t.startsWith("#"),r=typeof t=="string"?s?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!r)return;e=yu(r,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function ri(n,e){return(history.state?history.state.position-e:-1)+n}const Fs=new Map;function ku(n,e){Fs.set(n,e)}function Su(n){const e=Fs.get(n);return Fs.delete(n),e}function Ru(n){return typeof n=="string"||n&&typeof n=="object"}function Ho(n){return typeof n=="string"||typeof n=="symbol"}let cn=function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n}({});const Fo=Symbol("");cn.MATCHER_NOT_FOUND+"",cn.NAVIGATION_GUARD_REDIRECT+"",cn.NAVIGATION_ABORTED+"",cn.NAVIGATION_CANCELLED+"",cn.NAVIGATION_DUPLICATED+"";function We(n,e){return G(new Error,{type:n,[Fo]:!0},e)}function le(n,e){return n instanceof Error&&Fo in n&&(e==null||!!(n.type&e))}const Tu=["params","query","hash"];function Eu(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of Tu)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function Au(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<t.length;++s){const r=t[s].replace(Co," "),i=r.indexOf("="),o=yt(i<0?r:r.slice(0,i)),l=i<0?null:yt(r.slice(i+1));if(o in e){let c=e[o];jn(c)||(c=e[o]=[c]),c.push(l)}else e[o]=l}return e}function ii(n){let e="";for(let t in n){const s=n[t];if(t=uu(t),s==null){s!==void 0&&(e+=(e.length?"&":"")+t);continue}(jn(s)?s.map(r=>r&&Ds(r)):[s&&Ds(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+t,r!=null&&(e+="="+r))})}return e}function Ou(n){const e={};for(const t in n){const s=n[t];s!==void 0&&(e[t]=jn(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const Nu=Symbol(""),oi=Symbol(""),ur=Symbol(""),fr=Symbol(""),Bs=Symbol("");function et(){let n=[];function e(s){return n.push(s),()=>{const r=n.indexOf(s);r>-1&&n.splice(r,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function xe(n,e,t,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((l,c)=>{const u=p=>{p===!1?c(We(cn.NAVIGATION_ABORTED,{from:t,to:e})):p instanceof Error?c(p):Ru(p)?c(We(cn.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(o&&s.enterCallbacks[r]===o&&typeof p=="function"&&o.push(p),l())},a=i(()=>n.call(s&&s.instances[r],e,t,u));let d=Promise.resolve(a);n.length<3&&(d=d.then(u)),d.catch(p=>c(p))})}function Ss(n,e,t,s,r=i=>i()){const i=[];for(const o of n)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(No(c)){const u=(c.__vccOpts||c)[e];u&&i.push(xe(u,t,s,o,l,r))}else{let u=c();i.push(()=>u.then(a=>{if(!a)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const d=Xa(a)?a.default:a;o.mods[l]=a,o.components[l]=d;const p=(d.__vccOpts||d)[e];return p&&xe(p,t,s,o,l,r)()}))}}return i}function Pu(n,e){const t=[],s=[],r=[],i=Math.max(e.matched.length,n.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(n.matched.find(u=>Je(u,l))?s.push(l):t.push(l));const c=n.matched[o];c&&(e.matched.find(u=>Je(u,c))||r.push(c))}return[t,s,r]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Cu=()=>location.protocol+"//"+location.host;function Bo(n,e){const{pathname:t,search:s,hash:r}=e,i=n.indexOf("#");if(i>-1){let o=r.includes(n.slice(i))?n.slice(i).length:1,l=r.slice(o);return l[0]!=="/"&&(l="/"+l),ti(l,"")}return ti(t,n)+s+r}function Iu(n,e,t,s){let r=[],i=[],o=null;const l=({state:p})=>{const $=Bo(n,location),y=t.value,w=e.value;let C=0;if(p){if(t.value=$,e.value=p,o&&o===y){o=null;return}C=w?p.position-w.position:0}else s($);r.forEach(L=>{L(t.value,y,{delta:C,type:Hs.pop,direction:C?C>0?ks.forward:ks.back:ks.unknown})})};function c(){o=t.value}function u(p){r.push(p);const $=()=>{const y=r.indexOf(p);y>-1&&r.splice(y,1)};return i.push($),$}function a(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(G({},p.state,{scroll:as()}),"")}}function d(){for(const p of i)p();i=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",a),document.removeEventListener("visibilitychange",a)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",a),document.addEventListener("visibilitychange",a),{pauseListeners:c,listen:u,destroy:d}}function li(n,e,t,s=!1,r=!1){return{back:n,current:e,forward:t,replaced:s,position:window.history.length,scroll:r?as():null}}function Mu(n){const{history:e,location:t}=window,s={value:Bo(n,t)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,u,a){const d=n.indexOf("#"),p=d>-1?(t.host&&document.querySelector("base")?n:n.slice(d))+c:Cu()+n+c;try{e[a?"replaceState":"pushState"](u,"",p),r.value=u}catch($){console.error($),t[a?"replace":"assign"](p)}}function o(c,u){i(c,G({},e.state,li(r.value.back,c,r.value.forward,!0),u,{position:r.value.position}),!0),s.value=c}function l(c,u){const a=G({},r.value,e.state,{forward:c,scroll:as()});i(a.current,a,!0),i(c,G({},li(s.value,c,null),{position:a.position+1},u),!1),s.value=c}return{location:s,state:r,push:l,replace:o}}function Lu(n){n=bu(n);const e=Mu(n),t=Iu(n,e.state,e.location,e.replace);function s(i,o=!0){o||t.pauseListeners(),history.go(i)}const r=G({location:"",base:n,go:s,createHref:vu.bind(null,n)},e,t);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}function Du(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),Lu(n)}let Ee=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n}({});var hn=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n}(hn||{});const Hu={type:Ee.Static,value:""},Fu=/[a-zA-Z0-9_]/;function Bu(n){if(!n)return[[]];if(n==="/")return[[Hu]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e($){throw new Error(`ERR (${t})/"${u}": ${$}`)}let t=hn.Static,s=t;const r=[];let i;function o(){i&&r.push(i),i=[]}let l=0,c,u="",a="";function d(){u&&(t===hn.Static?i.push({type:Ee.Static,value:u}):t===hn.Param||t===hn.ParamRegExp||t===hn.ParamRegExpEnd?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`),i.push({type:Ee.Param,value:u,regexp:a,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),u="")}function p(){u+=c}for(;l<n.length;){if(c=n[l++],c==="\\"&&t!==hn.ParamRegExp){s=t,t=hn.EscapeNext;continue}switch(t){case hn.Static:c==="/"?(u&&d(),o()):c===":"?(d(),t=hn.Param):p();break;case hn.EscapeNext:p(),t=s;break;case hn.Param:c==="("?t=hn.ParamRegExp:Fu.test(c)?p():(d(),t=hn.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case hn.ParamRegExp:c===")"?a[a.length-1]=="\\"?a=a.slice(0,-1)+c:t=hn.ParamRegExpEnd:a+=c;break;case hn.ParamRegExpEnd:d(),t=hn.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--,a="";break;default:e("Unknown state");break}}return t===hn.ParamRegExp&&e(`Unfinished custom RegExp for param "${u}"`),d(),o(),r}const ci="[^/]+?",ju={sensitive:!1,strict:!1,start:!0,end:!0};var wn=function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n}(wn||{});const Uu=/[.+*?^${}()[\]/\\]/g;function Vu(n,e){const t=G({},ju,e),s=[];let r=t.start?"^":"";const i=[];for(const u of n){const a=u.length?[]:[wn.Root];t.strict&&!u.length&&(r+="/");for(let d=0;d<u.length;d++){const p=u[d];let $=wn.Segment+(t.sensitive?wn.BonusCaseSensitive:0);if(p.type===Ee.Static)d||(r+="/"),r+=p.value.replace(Uu,"\\$&"),$+=wn.Static;else if(p.type===Ee.Param){const{value:y,repeatable:w,optional:C,regexp:L}=p;i.push({name:y,repeatable:w,optional:C});const A=L||ci;if(A!==ci){$+=wn.BonusCustomRegExp;try{`${A}`}catch(N){throw new Error(`Invalid custom RegExp for param "${y}" (${A}): `+N.message)}}let P=w?`((?:${A})(?:/(?:${A}))*)`:`(${A})`;d||(P=C&&u.length<2?`(?:/${P})`:"/"+P),C&&(P+="?"),r+=P,$+=wn.Dynamic,C&&($+=wn.BonusOptional),w&&($+=wn.BonusRepeatable),A===".*"&&($+=wn.BonusWildcard)}a.push($)}s.push(a)}if(t.strict&&t.end){const u=s.length-1;s[u][s[u].length-1]+=wn.BonusStrict}t.strict||(r+="/?"),t.end?r+="$":t.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,t.sensitive?"":"i");function l(u){const a=u.match(o),d={};if(!a)return null;for(let p=1;p<a.length;p++){const $=a[p]||"",y=i[p-1];d[y.name]=$&&y.repeatable?$.split("/"):$}return d}function c(u){let a="",d=!1;for(const p of n){(!d||!a.endsWith("/"))&&(a+="/"),d=!1;for(const $ of p)if($.type===Ee.Static)a+=$.value;else if($.type===Ee.Param){const{value:y,repeatable:w,optional:C}=$,L=y in u?u[y]:"";if(jn(L)&&!w)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const A=jn(L)?L.join("/"):L;if(!A)if(C)p.length<2&&(a.endsWith("/")?a=a.slice(0,-1):d=!0);else throw new Error(`Missing required param "${y}"`);a+=A}}return a||"/"}return{re:o,score:s,keys:i,parse:l,stringify:c}}function zu(n,e){let t=0;for(;t<n.length&&t<e.length;){const s=e[t]-n[t];if(s)return s;t++}return n.length<e.length?n.length===1&&n[0]===wn.Static+wn.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===wn.Static+wn.Segment?1:-1:0}function jo(n,e){let t=0;const s=n.score,r=e.score;for(;t<s.length&&t<r.length;){const i=zu(s[t],r[t]);if(i)return i;t++}if(Math.abs(r.length-s.length)===1){if(ai(s))return 1;if(ai(r))return-1}return r.length-s.length}function ai(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Gu={strict:!1,end:!0,sensitive:!1};function qu(n,e,t){const s=Vu(Bu(n.path),t),r=G(s,{record:n,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function Ku(n,e){const t=[],s=new Map;e=ei(Gu,e);function r(d){return s.get(d)}function i(d,p,$){const y=!$,w=fi(d);w.aliasOf=$&&$.record;const C=ei(e,d),L=[w];if("alias"in d){const N=typeof d.alias=="string"?[d.alias]:d.alias;for(const J of N)L.push(fi(G({},w,{components:$?$.record.components:w.components,path:J,aliasOf:$?$.record:w})))}let A,P;for(const N of L){const{path:J}=N;if(p&&J[0]!=="/"){const ln=p.record.path,W=ln[ln.length-1]==="/"?"":"/";N.path=p.record.path+(J&&W+J)}if(A=qu(N,p,C),$?$.alias.push(A):(P=P||A,P!==A&&P.alias.push(A),y&&d.name&&!di(A)&&o(d.name)),Uo(A)&&c(A),w.children){const ln=w.children;for(let W=0;W<ln.length;W++)i(ln[W],A,$&&$.children[W])}$=$||A}return P?()=>{o(P)}:pt}function o(d){if(Ho(d)){const p=s.get(d);p&&(s.delete(d),t.splice(t.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=t.indexOf(d);p>-1&&(t.splice(p,1),d.record.name&&s.delete(d.record.name),d.children.forEach(o),d.alias.forEach(o))}}function l(){return t}function c(d){const p=Yu(d,t);t.splice(p,0,d),d.record.name&&!di(d)&&s.set(d.record.name,d)}function u(d,p){let $,y={},w,C;if("name"in d&&d.name){if($=s.get(d.name),!$)throw We(cn.MATCHER_NOT_FOUND,{location:d});C=$.record.name,y=G(ui(p.params,$.keys.filter(P=>!P.optional).concat($.parent?$.parent.keys.filter(P=>P.optional):[]).map(P=>P.name)),d.params&&ui(d.params,$.keys.map(P=>P.name))),w=$.stringify(y)}else if(d.path!=null)w=d.path,$=t.find(P=>P.re.test(w)),$&&(y=$.parse(w),C=$.record.name);else{if($=p.name?s.get(p.name):t.find(P=>P.re.test(p.path)),!$)throw We(cn.MATCHER_NOT_FOUND,{location:d,currentLocation:p});C=$.record.name,y=G({},p.params,d.params),w=$.stringify(y)}const L=[];let A=$;for(;A;)L.unshift(A.record),A=A.parent;return{name:C,path:w,params:y,matched:L,meta:Wu(L)}}n.forEach(d=>i(d));function a(){t.length=0,s.clear()}return{addRoute:i,resolve:u,removeRoute:o,clearRoutes:a,getRoutes:l,getRecordMatcher:r}}function ui(n,e){const t={};for(const s of e)s in n&&(t[s]=n[s]);return t}function fi(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Ju(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Ju(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const s in n.components)e[s]=typeof t=="object"?t[s]:t;return e}function di(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function Wu(n){return n.reduce((e,t)=>G(e,t.meta),{})}function Yu(n,e){let t=0,s=e.length;for(;t!==s;){const i=t+s>>1;jo(n,e[i])<0?s=i:t=i+1}const r=Zu(n);return r&&(s=e.lastIndexOf(r,s-1)),s}function Zu(n){let e=n;for(;e=e.parent;)if(Uo(e)&&jo(n,e)===0)return e}function Uo({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function hi(n){const e=ee(ur),t=ee(fr),s=In(()=>{const c=dn(n.to);return e.resolve(c)}),r=In(()=>{const{matched:c}=s.value,{length:u}=c,a=c[u-1],d=t.matched;if(!a||!d.length)return-1;const p=d.findIndex(Je.bind(null,a));if(p>-1)return p;const $=pi(c[u-2]);return u>1&&pi(a)===$&&d[d.length-1].path!==$?d.findIndex(Je.bind(null,c[u-2])):p}),i=In(()=>r.value>-1&&tf(t.params,s.value.params)),o=In(()=>r.value>-1&&r.value===t.matched.length-1&&Do(t.params,s.value.params));function l(c={}){if(ef(c)){const u=e[dn(n.replace)?"replace":"push"](dn(n.to)).catch(pt);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>u),u}return Promise.resolve()}return{route:s,href:In(()=>s.value.href),isActive:i,isExactActive:o,navigate:l}}function Qu(n){return n.length===1?n[0]:n}const Xu=eo({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:hi,setup(n,{slots:e}){const t=ss(hi(n)),{options:s}=ee(ur),r=In(()=>({[gi(n.activeClass,s.linkActiveClass,"router-link-active")]:t.isActive,[gi(n.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const i=e.default&&Qu(e.default(t));return n.custom?i:Ao("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:r.value},i)}}}),nf=Xu;function ef(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function tf(n,e){for(const t in e){const s=e[t],r=n[t];if(typeof s=="string"){if(s!==r)return!1}else if(!jn(r)||r.length!==s.length||s.some((i,o)=>i.valueOf()!==r[o].valueOf()))return!1}return!0}function pi(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const gi=(n,e,t)=>n??e??t,sf=eo({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const s=ee(Bs),r=In(()=>n.route||s.value),i=ee(oi,0),o=In(()=>{let u=dn(i);const{matched:a}=r.value;let d;for(;(d=a[u])&&!d.components;)u++;return u}),l=In(()=>r.value.matched[o.value]);It(oi,In(()=>o.value+1)),It(Nu,l),It(Bs,r);const c=Te();return at(()=>[c.value,l.value,n.name],([u,a,d],[p,$,y])=>{a&&(a.instances[d]=u,$&&$!==a&&u&&u===p&&(a.leaveGuards.size||(a.leaveGuards=$.leaveGuards),a.updateGuards.size||(a.updateGuards=$.updateGuards))),u&&a&&(!$||!Je(a,$)||!p)&&(a.enterCallbacks[d]||[]).forEach(w=>w(u))},{flush:"post"}),()=>{const u=r.value,a=n.name,d=l.value,p=d&&d.components[a];if(!p)return $i(t.default,{Component:p,route:u});const $=d.props[a],y=$?$===!0?u.params:typeof $=="function"?$(u):$:null,C=Ao(p,G({},y,e,{onVnodeUnmounted:L=>{L.component.isUnmounted&&(d.instances[a]=null)},ref:c}));return $i(t.default,{Component:C,route:u})||C}}});function $i(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const rf=sf;function of(n){const e=Ku(n.routes,n),t=n.parseQuery||Au,s=n.stringifyQuery||ii,r=n.history,i=et(),o=et(),l=et(),c=Zl(_e);let u=_e;Be&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const a=ys.bind(null,b=>""+b),d=ys.bind(null,du),p=ys.bind(null,yt);function $(b,O){let T,I;return Ho(b)?(T=e.getRecordMatcher(b),I=O):I=b,e.addRoute(I,T)}function y(b){const O=e.getRecordMatcher(b);O&&e.removeRoute(O)}function w(){return e.getRoutes().map(b=>b.record)}function C(b){return!!e.getRecordMatcher(b)}function L(b,O){if(O=G({},O||c.value),typeof b=="string"){const g=ws(t,b,O.path),_=e.resolve({path:g.path},O),x=r.createHref(g.fullPath);return G(g,_,{params:p(_.params),hash:yt(g.hash),redirectedFrom:void 0,href:x})}let T;if(b.path!=null)T=G({},b,{path:ws(t,b.path,O.path).path});else{const g=G({},b.params);for(const _ in g)g[_]==null&&delete g[_];T=G({},b,{params:d(g)}),O.params=d(O.params)}const I=e.resolve(T,O),U=b.hash||"";I.params=a(p(I.params));const f=gu(s,G({},b,{hash:au(U),path:I.path})),h=r.createHref(f);return G({fullPath:f,hash:U,query:s===ii?Ou(b.query):b.query||{}},I,{redirectedFrom:void 0,href:h})}function A(b){return typeof b=="string"?ws(t,b,c.value.path):G({},b)}function P(b,O){if(u!==b)return We(cn.NAVIGATION_CANCELLED,{from:O,to:b})}function N(b){return W(b)}function J(b){return N(G(A(b),{replace:!0}))}function ln(b,O){const T=b.matched[b.matched.length-1];if(T&&T.redirect){const{redirect:I}=T;let U=typeof I=="function"?I(b,O):I;return typeof U=="string"&&(U=U.includes("?")||U.includes("#")?U=A(U):{path:U},U.params={}),G({query:b.query,hash:b.hash,params:U.path!=null?{}:b.params},U)}}function W(b,O){const T=u=L(b),I=c.value,U=b.state,f=b.force,h=b.replace===!0,g=ln(T,I);if(g)return W(G(A(g),{state:typeof g=="object"?G({},U,g.state):U,force:f,replace:h}),O||T);const _=T;_.redirectedFrom=O;let x;return!f&&$u(s,I,T)&&(x=We(cn.NAVIGATION_DUPLICATED,{to:_,from:I}),Gn(I,I,!0,!1)),(x?Promise.resolve(x):Vn(_,I)).catch(m=>le(m)?le(m,cn.NAVIGATION_GUARD_REDIRECT)?m:me(m):z(m,_,I)).then(m=>{if(m){if(le(m,cn.NAVIGATION_GUARD_REDIRECT))return W(G({replace:h},A(m.to),{state:typeof m.to=="object"?G({},U,m.to.state):U,force:f}),O||_)}else m=ye(_,I,!0,h,U);return $e(_,I,m),m})}function Un(b,O){const T=P(b,O);return T?Promise.reject(T):Promise.resolve()}function ge(b){const O=Le.values().next().value;return O&&typeof O.runWithContext=="function"?O.runWithContext(b):b()}function Vn(b,O){let T;const[I,U,f]=Pu(b,O);T=Ss(I.reverse(),"beforeRouteLeave",b,O);for(const g of I)g.leaveGuards.forEach(_=>{T.push(xe(_,b,O))});const h=Un.bind(null,b,O);return T.push(h),Cn(T).then(()=>{T=[];for(const g of i.list())T.push(xe(g,b,O));return T.push(h),Cn(T)}).then(()=>{T=Ss(U,"beforeRouteUpdate",b,O);for(const g of U)g.updateGuards.forEach(_=>{T.push(xe(_,b,O))});return T.push(h),Cn(T)}).then(()=>{T=[];for(const g of f)if(g.beforeEnter)if(jn(g.beforeEnter))for(const _ of g.beforeEnter)T.push(xe(_,b,O));else T.push(xe(g.beforeEnter,b,O));return T.push(h),Cn(T)}).then(()=>(b.matched.forEach(g=>g.enterCallbacks={}),T=Ss(f,"beforeRouteEnter",b,O,ge),T.push(h),Cn(T))).then(()=>{T=[];for(const g of o.list())T.push(xe(g,b,O));return T.push(h),Cn(T)}).catch(g=>le(g,cn.NAVIGATION_CANCELLED)?g:Promise.reject(g))}function $e(b,O,T){l.list().forEach(I=>ge(()=>I(b,O,T)))}function ye(b,O,T,I,U){const f=P(b,O);if(f)return f;const h=O===_e,g=Be?history.state:{};T&&(I||h?r.replace(b.fullPath,G({scroll:h&&g&&g.scroll},U)):r.push(b.fullPath,U)),c.value=b,Gn(b,O,T,h),me()}let zn;function Ze(){zn||(zn=r.listen((b,O,T)=>{if(!we.listening)return;const I=L(b),U=ln(I,we.currentRoute.value);if(U){W(G(U,{replace:!0,force:!0}),I).catch(pt);return}u=I;const f=c.value;Be&&ku(ri(f.fullPath,T.delta),as()),Vn(I,f).catch(h=>le(h,cn.NAVIGATION_ABORTED|cn.NAVIGATION_CANCELLED)?h:le(h,cn.NAVIGATION_GUARD_REDIRECT)?(W(G(A(h.to),{force:!0}),I).then(g=>{le(g,cn.NAVIGATION_ABORTED|cn.NAVIGATION_DUPLICATED)&&!T.delta&&T.type===Hs.pop&&r.go(-1,!1)}).catch(pt),Promise.reject()):(T.delta&&r.go(-T.delta,!1),z(h,I,f))).then(h=>{h=h||ye(I,f,!1),h&&(T.delta&&!le(h,cn.NAVIGATION_CANCELLED)?r.go(-T.delta,!1):T.type===Hs.pop&&le(h,cn.NAVIGATION_ABORTED|cn.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),$e(I,f,h)}).catch(pt)}))}let Ie=et(),pn=et(),Q;function z(b,O,T){me(b);const I=pn.list();return I.length?I.forEach(U=>U(b,O,T)):console.error(b),Promise.reject(b)}function ie(){return Q&&c.value!==_e?Promise.resolve():new Promise((b,O)=>{Ie.add([b,O])})}function me(b){return Q||(Q=!b,Ze(),Ie.list().forEach(([O,T])=>b?T(b):O()),Ie.reset()),b}function Gn(b,O,T,I){const{scrollBehavior:U}=n;if(!Be||!U)return Promise.resolve();const f=!T&&Su(ri(b.fullPath,0))||(I||!T)&&history.state&&history.state.scroll||null;return tr().then(()=>U(b,O,f)).then(h=>h&&wu(h)).catch(h=>z(h,b,O))}const Tn=b=>r.go(b);let Me;const Le=new Set,we={currentRoute:c,listening:!0,addRoute:$,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:C,getRoutes:w,resolve:L,options:n,push:N,replace:J,go:Tn,back:()=>Tn(-1),forward:()=>Tn(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:pn.add,isReady:ie,install(b){b.component("RouterLink",nf),b.component("RouterView",rf),b.config.globalProperties.$router=we,Object.defineProperty(b.config.globalProperties,"$route",{enumerable:!0,get:()=>dn(c)}),Be&&!Me&&c.value===_e&&(Me=!0,N(r.location).catch(I=>{}));const O={};for(const I in _e)Object.defineProperty(O,I,{get:()=>c.value[I],enumerable:!0});b.provide(ur,we),b.provide(fr,qi(O)),b.provide(Bs,c);const T=b.unmount;Le.add(b),b.unmount=function(){Le.delete(b),Le.size<1&&(u=_e,zn&&zn(),zn=null,c.value=_e,Me=!1,Q=!1),T()}}};function Cn(b){return b.reduce((O,T)=>O.then(()=>ge(T)),Promise.resolve())}return we}function dr(n){return ee(fr)}const js=[{text:"NR 语言参考手册",items:[{text:"概述",link:"/v1.0/"},{text:"1. 词法结构",link:"/v1.0/lexical"},{text:"2. 类型系统",link:"/v1.0/types"},{text:"3. 变量与赋值",link:"/v1.0/variables"},{text:"4. 表达式与运算符",link:"/v1.0/expressions"},{text:"5. 控制流",link:"/v1.0/control-flow"},{text:"6. 词条系统",link:"/v1.0/entries"},{text:"7. 函数",link:"/v1.0/functions"},{text:"8. JSON 数据处理",link:"/v1.0/json"},{text:"9. 面向对象编程",link:"/v1.0/oop"},{text:"10. 模块与引入",link:"/v1.0/modules"},{text:"11. 内置函数参考",link:"/v1.0/flow-output"}]},{text:"内置函数分类",items:[{text:"字符串操作",link:"/v1.0/string"},{text:"数学操作",link:"/v1.0/math"},{text:"网络操作",link:"/v1.0/network"},{text:"类型操作",link:"/v1.0/type"},{text:"画布操作",link:"/v1.0/canvas"},{text:"文件操作",link:"/v1.0/file"}]}],Nt=js.flatMap(n=>n.items);function lf(){const n=dr(),e=Nt.findIndex(r=>r.link===n.path),t=e>0?Nt[e-1]:null,s=e<Nt.length-1?Nt[e+1]:null;return{prev:t,next:s}}const Ye=(n,e)=>{const t=n.__vccOpts||n;for(const[s,r]of e)t[s]=r;return t},cf={class:"sidebar-nav"},af={class:"sidebar-group-title"},uf=["href"],ff={__name:"Sidebar",setup(n){const e=dr();function t(s){return e.path===s}return(s,r)=>(on(),an("nav",cf,[(on(!0),an(Sn,null,Ut(dn(js),(i,o)=>(on(),an("div",{key:i.text,class:Ge(["sidebar-group",{"has-divider":o<dn(js).length-1}])},[j("p",af,de(i.text),1),(on(!0),an(Sn,null,Ut(i.items,l=>(on(),an("a",{key:l.link,href:"#"+l.link,class:Ge(["sidebar-link",{active:t(l.link)}])},de(l.text),11,uf))),128))],2))),128))]))}},df=Ye(ff,[["__scopeId","data-v-ec3f3c15"]]),Vo=`# 11.10 @画布

引擎函数 | 共 29 个函数。画布模块提供像素级图像创建、绘制、特效处理。基于内存像素缓冲区，通过句柄（handle）管理多画布实例。\`$创建画布$\` 返回画布句柄，需自行赋值给变量（如 \`画:$创建画布 800 600$\`），后续操作通过该句柄引用画布。使用前需 \`#引入=@画布\`。

## 画布生命周期

画布的完整生命周期为三个阶段：

1. **创建（Create）**：通过 \`$创建画布$\` 分配内存像素缓冲区，返回句柄。此时可指定宽高和背景色。
2. **绘制（Draw）**：通过 \`$绘制.xxx$\` 系列函数在缓冲区上绘制图形、文本、图片。所有绘制操作即时生效，顺序决定层叠关系（后绘制覆盖先绘制）。
3. **获取（Get）**：通过 \`$画布.获取$\` 将像素缓冲区编码为 PNG 格式输出。获取后画布仍可继续修改，但通常此时即为最终结果。

画布句柄在脚本执行期间持续有效，脚本结束后自动释放。同一脚本可同时持有多个画布句柄。

## 11.10.1 画布生命周期

### \`$创建画布$\` — 创建画布

- **签名**：\`$创建画布 [width] [height] [bgColor]$\`
- **参数**：宽度、高度、可选的背景色（默认白色）
- **返回值**：画布句柄

分配内存像素缓冲区，返回画布句柄。背景色支持预定义颜色名、十六进制、RGB 格式。

\`\`\`
$创建画布 800 600$           → 白色背景
$创建画布 800 600 红色$         → 红色背景
$创建画布 300 200 #FFFFFF$     → 十六进制背景色
$创建画布 300 200 255,0,0$     → RGB 背景色
\`\`\`

### \`$画布.获取$\` — 获取画布输出

- **签名**：\`$画布.获取 [handle] [format]$\`
- **参数**：画布句柄、可选的输出格式（默认 PNG；支持 \`"png"\`、\`"jpeg"\`、\`"raw"\`）
- **返回值**：编码的像素数据（PNG、JPEG 或原始 RGBA 字节）

将像素缓冲区编码输出。\`"raw"\` 格式返回原始 RGBA 像素缓冲区字节。

\`\`\`
img:$画布.获取 %画%$
\`\`\`

## 11.10.2 画笔设置

### 颜色格式参考

画布模块支持以下颜色格式：

| 格式 | 示例 | 说明 |
| --- | --- | --- |
| 预定义颜色名 | \`红色\`、\`蓝色\`、\`绿色\`、\`黄色\`、\`黑色\`、\`白色\`、\`随机\` | 引擎内置颜色常量，"随机"每次生成不同颜色 |
| 十六进制 | \`#FF6600\`、\`#FFF\` | 标准 HTML 颜色格式，支持 6 位和 3 位缩写 |
| RGB | \`255,0,0\`、\`128,64,32\` | 三个 0-255 的整数，逗号分隔 |
| RGBA | \`255,0,0,128\` | RGB + Alpha（0-255），Alpha=0 完全透明 |

### \`$画笔.设置颜色$\` — 设置画笔颜色

- **签名**：\`$画笔.设置颜色 [handle] [color]$\`
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

- **签名**：\`$画笔.获取颜色 [handle]$\`
- **参数**：画布句柄
- **返回值**：当前颜色（RGBA 格式，如 "255,0,0,255"）

\`\`\`
c:$画笔.获取颜色 %_%$            → "255,0,0,255"
\`\`\`

### \`$画笔.大小$\` — 设置画笔大小

- **签名**：\`$画笔.大小 [handle] [size]$\`
- **参数**：画布句柄、画笔粗细
- **返回值**：无

设置画笔粗细，影响线条宽度和描边厚度。

\`\`\`
$画笔.大小 %_% 3$
\`\`\`

## 11.10.3 基本绘制

### \`$绘制.点$\` — 绘制像素点

- **签名**：\`$绘制.点 [handle] [x] [y] [color]$\`
- **参数**：画布句柄、x 坐标、y 坐标、可选的颜色
- **返回值**：无

算法：直接设置目标坐标 (x, y) 的像素颜色。若坐标超出画布范围则忽略。

### \`$绘制.线$\` — 绘制线段

- **签名**：\`$绘制.线 [handle] [x1] [y1] [x2] [y2] [color]$\`
- **参数**：画布句柄、起点坐标、终点坐标、可选的颜色
- **返回值**：无

算法：使用 Bresenham 直线算法绘制线段，画笔大小影响线宽。

\`\`\`
$绘制.线 %_% 0 0 200 200$
\`\`\`

### \`$绘制.方形$\` — 绘制填充矩形

- **签名**：\`$绘制.方形 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、左上角 x、左上角 y、宽度、高度、可选的颜色
- **返回值**：无

算法：以 (x, y) 为左上角，填充宽 w × 高 h 的矩形区域。

\`\`\`
$绘制.方形 %_% 50 50 100 80$
$绘制.方形 %_% 50 50 100 80 蓝色$
\`\`\`

### \`$绘制.方形描边$\` — 绘制矩形描边

- **签名**：\`$绘制.方形描边 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、左上角 x、左上角 y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制矩形轮廓线，不填充内部。画笔大小影响边框厚度。

\`\`\`
$绘制.方形描边 %_% 200 100 150 100$
\`\`\`

## 11.10.4 椭圆与圆形

### \`$绘制.椭圆$\` — 绘制填充椭圆

- **签名**：\`$绘制.椭圆 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

算法：使用中点椭圆算法（Midpoint Ellipse Algorithm）绘制填充椭圆。当 w = h 时为圆形。

\`\`\`
$绘制.椭圆 %_% 100 100 200 150$
$绘制.椭圆 %_% 100 100 100 100 红色$    → 圆形
\`\`\`

### \`$绘制.椭圆描边$\` — 椭圆描边

- **签名**：\`$绘制.椭圆描边 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制椭圆轮廓线，不填充内部。画笔大小影响边框厚度。

### \`$绘制.圆形$\` — 绘制填充圆形

- **签名**：\`$绘制.圆形 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

在指定外接矩形内绘制填充圆形。

### \`$绘制.圆形描边$\` — 圆形描边

- **签名**：\`$绘制.圆形描边 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

仅绘制圆形轮廓线，不填充内部。

### \`$绘制.圆弧$\` — 绘制圆弧

- **签名**：\`$绘制.圆弧 [handle] [cx] [cy] [radius] [startDeg] [endDeg] [color]$\`
- **参数**：画布句柄、圆心坐标 x、y、半径、起始角度、终止角度、可选的颜色
- **返回值**：无

角度制参数指定起止角度，从 3 点钟方向顺时针绘制。

\`\`\`
$绘制.圆弧 %_% 100 100 50 0 180$
$绘制.圆弧 %_% 100 100 50 0 180 蓝色$
\`\`\`

## 11.10.5 多边形

### \`$绘制.多边形$\` — 绘制填充多边形

- **签名**：\`$绘制.多边形 [handle] [x,y] [x,y] [...] [color]$\`
- **参数**：画布句柄、顶点坐标列表、可选的颜色
- **返回值**：无

算法：使用扫描线填充算法（Scanline Fill）。按顺序连接各顶点形成闭合多边形路径，内部区域均匀填充。

\`\`\`
$绘制.多边形 %_% 100,50 200,50 250,150 150,200 50,150$
$绘制.多边形 %_% 100,50 200,50 150,150 红色$     → 三角形
\`\`\`

### \`$绘制.多边形描边$\` — 绘制多边形描边

- **签名**：\`$绘制.多边形描边 [handle] [x,y] [x,y] [...] [color]$\`
- **参数**：画布句柄、顶点坐标列表、可选的颜色
- **返回值**：无

仅绘制多边形轮廓线，不填充内部。

## 11.10.6 特效绘制

### \`$绘制.喷漆$\` — 喷漆特效

- **签名**：\`$绘制.喷漆 [handle] [x1] [y1] [x2] [y2] [rangeRadius] [density] [color] [pointRadius]$\`
- **参数**：画布句柄、起点、终点、喷洒范围半径（默认 max(画布大小, 3)）、密度 1-100（默认 50）、颜色（默认当前画笔颜色）、点半径（默认 1）
- **返回值**：无

算法：在连接起点和终点的线段上，以指定的喷洒范围和密度，随机散布像素点。模拟喷漆罐的喷洒效果。

### \`$绘制.波浪$\` — 波浪线

- **签名**：\`$绘制.波浪 [handle] [x1] [y1] [x2] [y2] [amplitude] [frequency] [width]$\`
- **参数**：画布句柄、起点、终点、可选的振幅、频率、线宽
- **返回值**：无

算法：沿连接两点之间的线段绘制正弦波曲线，振幅和频率可调。

\`\`\`
$绘制.波浪 %_% 50 200 300 200$
$绘制.波浪 %_% 50 200 300 200 10 30 3$
\`\`\`

### \`$绘制.油漆桶$\` — 泛洪填充

- **签名**：\`$绘制.油漆桶 [handle] [x] [y] [color]$\`
- **参数**：画布句柄、起始坐标、填充颜色
- **返回值**：无

算法：基于广度优先搜索（BFS）的泛洪填充。从指定起点像素开始，将颜色相同且连通的相邻像素全部替换为目标颜色。

\`\`\`
$绘制.方形描边 %_% 100 100 50 50$
$绘制.油漆桶 %_% 120 120 红色$
\`\`\`

### \`$绘制.随机点$\` / \`$绘制.随机线条$\` — 随机点/线条

- **签名**：\`$绘制.随机点 [handle] [density] [color]$\` / \`$绘制.随机线条 [handle] [density] [color]$\`
- **参数**：画布句柄、密度、可选的颜色
- **返回值**：无

算法：在画布上随机位置生成点或线条，数量由密度参数控制。用于生成噪点、星空等随机纹理效果。

## 11.10.7 文本与图片

### \`$绘制.文本$\` — 绘制文本

- **签名**：\`$绘制.文本 [handle] [x] [y] [text] [color] [strokeColor]$\`
- **参数**：画布句柄、x 坐标、y 坐标、文本内容、可选的颜色、可选的描边颜色
- **返回值**：无

算法：使用引擎内置的位图字体将文本渲染为像素。支持可选的描边颜色参数。

\`\`\`
$绘制.文本 %_% 50 50 Hello 黑色$
$绘制.文本 %_% 100 100 Rotated 黑色 红色$
\`\`\`

### \`$绘制.图片$\` — 绘制图片

- **签名**：\`$绘制.图片 [handle] [srcCanvasOrData] [x] [y] [alpha]$\`
- **参数**：画布句柄、源画布句柄或 Base64 图片数据、左上角 x、y、可选的透明度
- **返回值**：无

算法：将源画布或 Base64 编码的图片数据逐像素复制到目标画布的指定区域。支持 alpha 混合。

\`\`\`
$绘制.图片 %_% %srcCanvas% 50 50$
$绘制.图片 %_% %srcCanvas% 50 50 128$
\`\`\`

## 11.10.8 特效处理

### \`$画布.旋转$\` — 旋转画布

- **签名**：\`$画布.旋转 [handle] [degrees] [bgColor]$\`
- **参数**：画布句柄、旋转角度、可选的背景色
- **返回值**：无

算法：按角度对整个画布像素矩阵做仿射变换，空白区域用背景色填充。

\`\`\`
$画布.旋转 %_% 90 白色$
\`\`\`

### \`$画布.圆形$\` — 圆角裁剪

- **签名**：\`$画布.圆形 [handle] [radius] [bgColor]$\`
- **参数**：画布句柄、圆角半径、可选的背景色
- **返回值**：无

将画布裁剪为圆角矩形。

### \`$画布.灰度$\` — 灰度化

- **签名**：\`$画布.灰度 [handle]$\`
- **参数**：画布句柄
- **返回值**：无

算法：取 RGB 加权平均值（亮度公式）将画布转为灰度。

\`\`\`
$画布.灰度 %_%$
\`\`\`

### \`$画布.马赛克$\` — 全图马赛克特效

- **签名**：\`$画布.马赛克 [handle] [blockSize]$\`
- **参数**：画布句柄、马赛克块大小
- **返回值**：无

算法：对整个画布按指定块大小对像素取均值，产生马赛克效果。

\`\`\`
$画布.马赛克 %_% 16$
\`\`\`

### \`$绘制.马赛克$\` — 区域马赛克特效

- **签名**：\`$绘制.马赛克 [handle] [x] [y] [w] [h] [blockSize]$\`
- **参数**：画布句柄、区域左上角 x、y、宽度、高度、马赛克块大小
- **返回值**：无

算法：对指定矩形区域按块大小对像素取均值，产生马赛克效果。

\`\`\`
$绘制.马赛克 %_% 50 50 200 150 16$
\`\`\`

### \`$绘制.高斯模糊$\` — 高斯模糊

- **签名**：\`$绘制.高斯模糊 [handle] [x] [y] [w] [h]$\`
- **参数**：画布句柄、模糊区域左上角 x、y、宽度、高度
- **返回值**：无

算法：对指定矩形区域使用高斯核卷积实现平滑模糊效果。

\`\`\`
$绘制.高斯模糊 %_% 50 50 200 150$
\`\`\`

## 11.10.9 完整示例

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
`,zo=`# 5. 控制流

控制流决定了 NR 代码的执行路径。本章涵盖条件分支（\`如果\`/\`if\`）、三种循环结构、中断跳转指令以及标签与 goto 机制。控制流语句依赖于 [表达式与运算符](./expressions) 中定义的比较和逻辑运算来做出决策。

## 5.1 条件分支

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

## 5.2 循环

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

## 5.3 中断与跳转指令

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

如需从内层循环中跳出外层循环，可以使用标签 + \`goto\` 指令（参见 [§ 5.4](#_5-4-标签与-goto)）。

## 5.4 标签与 goto

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
`,Go=`# 6. 词条系统

词条（Entry）是 NR 语言最核心的抽象概念。本章涵盖词条的定义、匹配机制、普通词条与内部词条的区别，以及与 OOP 类词条的配合方式。

- **词条（Entry）**：NR 文件词条区域中定义的一条 **触发词 → 响应内容** 映射规则。
- **词条区域**：\`.nr\` 文件头部空行之后的部分，由一系列词条组成。
- **匹配引擎**：当用户输入（或系统内部调用）命中触发词时执行对应词条内容并返回输出。

NR 的词条系统本质上是一个**模式匹配引擎**，支持三种词条类型：

- **普通词条**：直接参与主触发词匹配，是 NR 的核心交互机制
- **内部词条**（\`[内部]\` / \`[L]\`）：不参与主触发匹配，只能通过 \`$回调$\` 显式调用
- **类内部词条**（\`[L:类名]\`）：绑定到特定 OOP 类，在对应类上下文中优先匹配

## 6.1 词条匹配原理

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

## 6.2 普通词条

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

### 6.2.1 带正则的触发词

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

## 6.3 内部词条 \`[内部]\` / \`[L]\` / \`[L:类名]\`

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

### 6.3.1 普通词条 vs 内部词条 对比

| 特性 | 普通词条 | 内部词条 |
|------|----------|----------|
| 主触发匹配 | ✅ 参与 | ❌ 不参与 |
| 调用方式 | 用户输入 / \`$主回调$\` | \`$回调$\` |
| 执行上下文 | 当前上下文 | 新子上下文 |
| 定义语法 | 直接写触发词 | \`[内部]\` / \`[L]\` |
| 典型用途 | 响应用户输入 | 内部子流程复用 |

关于 \`$回调$\` 和 \`$主回调$\` 的详细用法，参见[第 11.1 节 流程控制](./flow-output)。
`,qo='# 4. 表达式与运算符\n\n表达式是 NR 中执行计算和逻辑判断的核心机制。本章涵盖数学表达式 `[...]`、比较运算符、逻辑运算符及其优先级规则。理解运算符的优先级、结合性和类型转换行为，对于编写正确的 [条件判断](./control-flow) 和[变量赋值](./variables)至关重要。\n\nNR 的运算符体系分为三个层级：**数学运算符**（在 `[...]` 内使用）、**比较运算符**和**逻辑运算符**。它们在表达式中按固定的优先级顺序求值。\n\n## 4.1 数学表达式 `[...]`\n\n```\nresult:[1+2*3]              → "7"\nscore:[%base%*2+10]\n```\n\n### 运算符优先级总表（从高到低）\n\n| 优先级 | 类别 | 运算符 | 结合性 | 说明 |\n|--------|------|--------|--------|------|\n| 1（最高） | 分组 | `()` | — | 括号分组 |\n| 2 | 一元 | `-` | 右→左 | 一元负号 |\n| 3 | 幂 | `^` | 右→左 | 幂运算（`2^3^2 = 2^9 = 512`） |\n| 4 | 乘除取余 | `*` `/` `%` | 左→右 | 乘、除、取余 |\n| 5 | 加减 | `+` `-` | 左→右 | 加、减 |\n| 6 | 位移 | `<<` `>>` | 左→右 | 左移、右移 |\n| 7 | 比较 | `>=` `<=` `>` `<` `==` `!=` `===` `!==` `~=` `in` | — | 比较运算（非数学表达式） |\n| 8 | 逻辑 AND | `&&` `&` | 左→右（短路） | 逻辑与 |\n| 9（最低） | 逻辑 OR | `\\|\\|` `\\|` | 左→右（短路） | 逻辑或 |\n\n**结合性说明**：\n\n- **左结合**（左→右）：`a / b / c` 解释为 `(a / b) / c`\n- **右结合**（右→左）：`- -x` 解释为 `-(-x)`；`2^3^2` 解释为 `2^(3^2)`\n\n注意：比较和逻辑运算符不在 `[...]` 数学表达式中使用——它们出现在条件语句（`如果:`、`循环>`）和 `$if$` 等结构中。数学表达式 `[...]` 内部仅使用优先级 1-6 的运算符。\n\n- 整数运算结果仍为整数，浮点数参与则为浮点\n- 位运算和幂运算强制转整数\n\n### 混合类型运算的边界情况\n\n当数学表达式中混合不同类型的操作数时，结果遵循以下规则：\n\n```\n// 类型提升示例\n[1+2.0]        → 3.0   （Int + Float → Float）\n[3/2]          → 1     （Int 除法，截断）\n[3/2.0]        → 1.5   （Float 除法）\n\n// 边界情况\n[1/0]          → 报错（整数除零）\n[1.0/0.0]      → inf   （浮点除零，返回无穷大）\n[-2147483648]    → 溢出 (i64 边界)\n[0.1+0.2]      → 0.30000000000000004  （IEEE 754 精度问题）\n```\n\n**注意事项：**\n\n- 整数除法 `a / b` 结果为整数（向零截断），不是四舍五入。\n- 幂运算 `a ^ b` 要求 b 为非负整数（包括 0）。\n- 位移运算 `a << b` 中 b 必须是非负整数，且结果类型为整数。\n\n## 4.2 比较运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `==` | 字符串相等（宽松，自动类型转换） |\n| `!=` | 字符串不等（宽松） |\n| `===` | 严格相等（比较值和类型） |\n| `!==` | 严格不等（比较值和类型） |\n| `>=` `<=` `>` `<` | 数值比较 |\n| `~=` | 正则匹配 |\n| `in` | 包含判断 |\n\n### 严格比较 `===` / `!==`\n\n- `===` 要求值和**类型**都相同：`1 === 1` 为真，`1 === 1.0`（Int vs Float）为假\n- `!==` 取反：类型不同或值不同时为真\n- 普通 `==` / `!=` 做字符串比较，不区分类型\n\n```\n如果:%a%===1       ← 严格检查整数 1\n整数 1\n如果尾\n\n如果:%a%===1.5     ← 严格检查浮点数 1.5\n浮点数 1.5\n如果尾\n```\n\n### 比较运算边界情况\n\n```\n// 数值比较中的类型问题\n[1>0.5]          → 在条件中为真（自动类型提升比较数值）\n1 == 1.0            → 条件判断中为真（宽松相等，都转为 "1"）\n1 === 1.0           → 条件判断中为假（严格相等，Int vs Float）\n```\n\n- 数值比较（`>` `<` `>=` `<=`）会自动尝试将双方转为数值再比较。一方无法转数值时报错。\n- `==` 宽松相等适合快速判断，但**在需要区分 Int/Float 时请用 `===`**。\n- `~=`（正则匹配）右侧必须是正则模式；`in` 左侧检查是否包含于右侧（字符串子串或数组元素）。\n\n## 4.3 逻辑运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `&&` / `&` | 逻辑 AND（短路） |\n| `\\|\\|` / `\\|` | 逻辑 OR（短路） |\n\n单操作数时做真值判断：非空、非 `"0"`、非 `"false"`、非 `"null"` 为真。\n',Ko=`# 11.11 文件操作

引擎内置 | 共 22 个函数。文件操作函数无需引入，可直接使用。包含文件读写、存在性判断、列表遍历、删除、重命名、复制、下载等功能。

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

### \`$写文件$\` — 写入文件

- **签名**：\`$写文件 [路径] [内容]$\`
- **参数**：文件路径、要写入的内容
- **返回值**：无

将内容写入指定路径的文件，若文件不存在则创建，若存在则覆盖。

\`\`\`
$写文件 logs/app.log 启动成功$
$写文件 data/config.json {"port":8080}$
\`\`\`

### \`$读文件$\` — 读取文件

- **签名**：\`$读文件 [路径] [默认值]$\`
- **参数**：文件路径、可选的默认值
- **返回值**：文件全部内容；文件不存在或失败时返回默认值（省略时返回空字符串）

读取文件的全部内容作为字符串返回。读取时自动将 \`\\r\\n\` 和 \`\\r\` 换行符归一化为 \`\\n\`。

\`\`\`
$读文件 data/config.json 默认配置$
\`\`\`

### \`$写$\` — 键值数据库写入

- **签名**：\`$写 [文件名] [键名] [值]$\`
- **参数**：数据库文件名、键名、值
- **返回值**：无

向键值数据库中写入一个键值对。同一键名多次写入会覆盖旧值。

\`\`\`
$写 cache 用户1 小明$
\`\`\`

### \`$读$\` — 键值数据库读取

- **签名**：\`$读 [文件名] [键名] [默认值]$\`
- **参数**：数据库文件名、可选的键名、可选的默认值
- **返回值**：不指定键名时返回所有键值对的 JSON 数组；指定键名时返回对应值，键不存在则返回默认值

从键值数据库中读取数据。

\`\`\`
$读 cache$                       → 所有键值对的 JSON 数组
$读 cache 用户1$                 → "小明"
$读 cache 用户3 无名氏$          → "无名氏"
\`\`\`

### \`$存在文件$\` — 判断文件是否存在

- **签名**：\`$存在文件 [路径]$\`
- **参数**：文件路径
- **返回值**："true"（存在）或 "false"（不存在）

判断指定路径的文件是否存在（不包含目录）。

\`\`\`
$存在文件 config.yaml$
\`\`\`

### \`$存在文件夹$\` — 判断目录是否存在

- **签名**：\`$存在文件夹 [路径]$\`
- **参数**：目录路径
- **返回值**："true"（存在）或 "false"（不存在）

\`\`\`
$存在文件夹 uploads$
\`\`\`

### \`$存在文件或文件夹$\` — 判断路径是否存在

- **签名**：\`$存在文件或文件夹 [路径]$\`
- **参数**：任意路径
- **返回值**："true"（存在）或 "false"（不存在）

判断指定路径是否存在（无论是文件还是目录）。

\`\`\`
$存在文件或文件夹 database/cache$
\`\`\`

### \`$文件后缀$\` — 获取文件扩展名

- **签名**：\`$文件后缀 [文件名]$\`
- **参数**：文件名
- **返回值**：扩展名（含点号）；无后缀则返回空字符串

\`\`\`
$文件后缀 photo.jpg$             → ".jpg"
\`\`\`

### \`$文件夹列表$\` — 列出子目录

- **签名**：\`$文件夹列表 [路径]$\`
- **参数**：目录路径
- **返回值**：子目录名称的 JSON 数组字符串；无子目录返回 "[]"

\`\`\`
$文件夹列表 data$                → "[\\"backup\\",\\"images\\"]"
\`\`\`

### \`$文件列表$\` — 列出文件

- **签名**：\`$文件列表 [路径]$\`
- **参数**：目录路径
- **返回值**：文件名称的 JSON 数组字符串（不含子目录）

\`\`\`
$文件列表 images$                → "[\\"logo.png\\",\\"banner.jpg\\"]"
\`\`\`

### \`$随机文件夹名$\` — 生成随机目录名

- **签名**：\`$随机文件夹名 [路径]$\`
- **参数**：父目录路径
- **返回值**：随机文件夹名称字符串（不实际创建目录）

生成一个随机的文件夹名称字符串，不实际创建目录。用于需要临时目录名的场景。

### \`$随机文件名$\` — 生成随机文件名

- **签名**：\`$随机文件名 [路径]$\`
- **参数**：父目录路径
- **返回值**：随机文件名称字符串（不实际创建文件）

生成一个随机的文件名称字符串，不实际创建文件。

### \`$读文件.随机一行$\` — 随机读取一行

- **签名**：\`$读文件.随机一行 [路径] [默认值]$\`
- **参数**：文件路径、可选的默认值
- **返回值**：随机选中的一行；文件不存在时返回默认值

从文本文件中随机读取一行。文件按行分割后随机选取，每行被选中的概率均等。

\`\`\`
$读文件.随机一行 quotes.txt 无内容$
\`\`\`

### \`$读文件.行数$\` — 统计文件行数

- **签名**：\`$读文件.行数 [路径] [默认值]$\`
- **参数**：文件路径、可选的默认值
- **返回值**：总行数

统计文本文件的总行数。空行也算一行。

\`\`\`
$读文件.行数 data.log$           → "150"
\`\`\`

### \`$读文件行$\` — 读取指定行范围

- **签名**：\`$读文件行 [路径] [起始行] [数量] [默认值]$\`
- **参数**：文件路径、起始行（从 1 开始）、行数、可选的默认值
- **返回值**：JSON 数组字符串；起始行超出范围返回默认值

从指定起始行读取若干行，以 JSON 数组字符串形式返回。

\`\`\`
$读文件行 data.log 10 5$          → JSON 数组
\`\`\`

### \`$文件大小$\` — 获取文件大小

- **签名**：\`$文件大小 [路径]$\`
- **参数**：文件路径
- **返回值**：文件字节大小；文件不存在返回 "0"

\`\`\`
$文件大小 video.mp4$             → "104857600"
\`\`\`

### \`$文件夹大小$\` — 获取目录大小

- **签名**：\`$文件夹大小 [路径]$\`
- **参数**：目录路径
- **返回值**：目录及其子目录中所有文件的总字节大小

递归计算目录及其所有子目录中文件的总字节大小。

### \`$删除文件$\` — 删除文件

- **签名**：\`$删除文件 [路径]$\`
- **参数**：文件路径
- **返回值**：无

删除指定文件。

\`\`\`
$删除文件 temp/cache.tmp$
\`\`\`

### \`$删除文件夹$\` — 递归删除目录

- **签名**：\`$删除文件夹 [路径]$\`
- **参数**：目录路径
- **返回值**：无

递归删除指定目录及其所有内容。谨慎使用，此操作不可逆。

### \`$重命名$\` — 重命名文件或目录

- **签名**：\`$重命名 [旧名] [新名]$\`
- **参数**：旧名称、新名称
- **返回值**："true"（成功）或 "false"（失败）

将文件或目录从旧名称改为新名称。目标已存在时可能失败。

\`\`\`
$重命名 old.txt new.txt$
\`\`\`

### \`$复制粘贴$\` — 复制文件

- **签名**：\`$复制粘贴 [源路径] [目标路径]$\`
- **参数**：源文件路径、目标文件路径
- **返回值**："true"（成功）或 "false"（失败）

复制源文件（或目录）到目标路径。若源为目录则递归复制整个目录。若目标已存在则覆盖。

\`\`\`
$复制粘贴 source.txt dest.txt$
\`\`\`

### \`$下载文件$\` — 下载文件

- **签名**：\`$下载文件 [下载地址] [保存路径]$\`
- **参数**：下载 URL、本地保存路径
- **返回值**："true"（成功）或空字符串（失败）

从指定 URL 下载文件并保存到本地路径。使用引擎内置的 HTTP 客户端，超时等行为与网络访问模块一致。

\`\`\`
$下载文件 https://example.com/logo.png assets/logo.png$
\`\`\`

> 所有文件操作函数失败时返回空字符串，建议在关键操作前使用 \`$存在文件$\` 或 \`$存在文件夹$\` 做前置检查。\`$写$\`/\`$读$\` 提供键值数据库抽象，适合缓存和持久化状态。网络下载请参见 [@访问](./network) 的超时说明。

[← @画布](./canvas)

[返回内置函数参考 →](./flow-output)
`,Jo=`# 11. 内置函数参考

本章涵盖 NR 语言全部内置函数与标准库函数的参考文档。内置函数分为两类：**引擎函数**（始终可用，无需导入）和**标准库函数**（需通过 \`#引入=@模块名\` 导入后生效）。

- **引擎函数**：始终可用，无需导入。
- **标准库函数**：需通过 \`#引入=@模块名\` 导入后生效。路径以 \`@\` 开头，由引擎内置，无需对应 \`.nr\` 文件。

\`\`\`
s:#引入=@字符串
m:#引入=@数学
t:#引入=@类型
net:#引入=@访问

[函数]main
$s.大写 hello$
$s.长度 Hello World$
$m.绝对值 -5$
\`\`\`

## 函数分类索引

| 分类 | 章节 | 函数数量 | 说明 |
| --- | --- | --- | --- |
| 流程控制 | [11.1](#sec-11-1) | 2 | \`$回调$\`、\`$主回调$\` |
| 输出 | [11.2](#sec-11-2) | 2 | \`$打印$\`、\`$打印返回$\` |
| 服务器 | [11.3](#sec-11-3) | 1 | \`$启动服务器$\` |
| 对象创建 | [11.4](#sec-11-4) | 1 | \`$new$\` |
| @字符串 | [11.5](./string) | 22 | 字符串操作标准库 |
| @数学 | [11.6](./math) | 8 | 数学运算标准库 |
| @访问 | [11.7](./network) | 12 | HTTP 客户端状态机 |
| 内置访问 | [11.8](./network) | 3 | 快捷 HTTP 请求（无需导入） |
| @类型 | [11.9](./type) | 4 | 类型转换标准库 |
| @画布 | [11.10](./canvas) | 29 | 像素级图像绘制（引擎函数） |
| 文件操作 | [11.11](./file) | 22 | 文件读写、存在判断、列表、删除等（引擎内置） |

## 标准库加载机制

标准库模块在首次 \`#引入\` 时由引擎动态加载。加载后的模块实例会被缓存，同一脚本中多次引入同一模块不会重复初始化，所有 \`#引入\` 引用共享同一个模块实例。模块中的函数通过 \`$包名.方法$\` 的形式调用，调用时引擎先查找当前作用域中的包名变量，再定位到对应模块的方法。

引擎函数（无需引入的函数）在引擎启动时即注册完毕，始终可用，无需任何导入声明。

## 11.1 流程控制

### 回调机制详解

NR 引擎的回调机制基于**词条匹配**：当调用 \`$回调$\` 时，引擎遍历当前脚本中所有标记为 \`[内部]\` 的词条，用指定的模式（正则表达式）逐一匹配词条的触发词。匹配成功后，引擎创建一个**新的子执行上下文**（变量作用域独立），将捕获的正则分组自动存入 \`%括号1%\`、\`%括号2%\`……变量中，然后执行匹配到的词条内容。若没有匹配到任何内部词条，则静默返回空字符串。

回调调度流程：\`$回调 pattern arg$\` → 引擎遍历 [内部] 词条列表 → 正则匹配触发词 → 创建子上下文 → 注入 %括号N% 变量 → 执行词条体 → 结果返回。

### \`$回调$\` — 正则匹配内部词条

<dl>
  <dt>签名</dt><dd><code>$回调 [pattern] [参数]$</code></dd>
  <dt>参数</dt><dd>正则匹配模式、可选的参数</dd>
  <dt>返回值</dt><dd>匹配到的内部词条的执行结果；无匹配返回空字符串</dd>
</dl>

在新子上下文中正则匹配 \`[内部]\` 词条并执行，捕获分组存入 \`%括号1%\`、\`%括号2%\` 等。

\`\`\`
[内部]say_(.*)
你好，%括号1%！

$回调 say_hello world$     ← 匹配 say_(.*)，%括号1%=hello，%参数1%=world
\`\`\`

- 新上下文执行，不污染调用者变量
- 参数传递给匹配到的内部词条

### \`$主回调$\` — 匹配主词条

<dl>
  <dt>签名</dt><dd><code>$主回调 [触发词]$</code></dd>
  <dt>参数</dt><dd>触发词</dd>
  <dt>返回值</dt><dd>匹配到的词条的执行结果</dd>
</dl>

以指定触发词匹配普通词条，在**当前变量上下文**中执行。

\`\`\`
$主回调 你好$          ← 匹配主词条"你好"
\`\`\`

与 \`$回调$\` 的区别：\`$回调$\` 匹配内部词条（新上下文），\`$主回调$\` 匹配普通词条（保留上下文）。

## 11.2 输出

**输出与打印的区别：**NR 中"输出"（\`$打印$\`）和"返回"是两个独立概念。\`$打印$\` 将内容追加到**结果流（output stream）**，该流最终会作为脚本的整体输出返回给调用者，但 \`$打印$\` 在表达式求值中**不产生值**（在 \`$...$\` 中替换为空字符串）。也就是说：

| 行为 | \`$打印$\` | \`$打印返回$\` |
| --- | --- | --- |
| 追加到结果流 | ✅ | ✅ |
| 作为表达式返回值 | ❌（空字符串） | ✅ |
| 适用场景 | 纯日志输出 | 输出日志并传递数据 |

示例：\`result:$打印 你好$\` — 此时 result 被赋值为空字符串，但"你好"已写入结果流。

### \`$打印$\` — 输出内容

<dl>
  <dt>签名</dt><dd><code>$打印 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>空字符串（不产生表达式返回值）</dd>
</dl>

输出到结果流，不产生返回值（在 \`$...$\` 中替换为空字符串）。

\`\`\`
$打印 你好，世界！$
$打印 当前值：%count%$
\`\`\`

### \`$打印返回$\` — 输出并返回

<dl>
  <dt>签名</dt><dd><code>$打印返回 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>内容本身（同时写入结果流）</dd>
</dl>

同时输出和返回值，适用于需要输出日志的同时传递数据。

\`\`\`
result:$打印返回 %msg%$
\`\`\`

## 11.3 服务器

### \`$启动服务器$\` — TCP/HTTP 服务器

<dl>
  <dt>签名</dt><dd><code>$启动服务器 [端口] [处理函数]$</code></dd>
  <dt>参数</dt><dd>监听端口、可选的处理函数</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

启动 TCP 服务器，监听 \`0.0.0.0:端口\`：

\`\`\`
$启动服务器 8080 handle$
\`\`\`

### HTTP 模式 vs TCP 模式

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

## 11.4 对象创建

\`$new$\` 是 NR 中创建自定义对象实例的核心函数。在 NR 的对象模型中，类本质上是一组使用了特定命名约定的词条集合。创建对象时，引擎通过词条匹配找到构造函数并执行。

### 构造函数查找机制

\`$new$\` 按下述优先级查找构造函数：

1. **\`类名.new\`** → 若存在词条 \`[内部]类名.new\`，优先使用
2. **\`类名.初始化\`** → 作为备选构造函数

若两者都不存在，\`$new$\` 返回空字符串（不赋值）。

### \`$new$\` — 创建对象实例

<dl>
  <dt>签名</dt><dd><code>$new [类名] [参数...]$</code></dd>
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

### 典型用法

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

> 引擎函数（11.1-11.4）无需导入，始终可用。标准库函数（11.5-11.11）需通过 \`#引入=@模块名\` 加载。回调机制基于正则匹配内部词条，在独立子上下文中执行。\`$new$\` 构造函数查找优先级：类名.new → 类名.初始化。

[← 模块与引入](./modules) [@字符串 →](./string)
`,Wo=`# 7. 函数

函数是 NR 语言中封装可复用逻辑的基本单元。本章涵盖函数定义语法、参数传递、可变参数、递归限制以及初始化函数。

- **函数调用表达式**：以 \`$函数名 参数$\` 形式主动调用，在所在位置被返回值替换。
- **声明即执行**：函数体中每行按顺序执行，最后一行的值（或 \`$打印返回$\` 的结果）即为返回值。
- **与词条的区别**：函数通过 \`$...$\` 主动调用，而词条由触发词匹配引擎驱动。

## 7.1 定义与语法

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

### 7.1.1 函数命名规范

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

## 7.2 参数

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

## 7.3 递归与调用限制

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

## 7.4 \`[f]初始化\`

- 每个 \`.nr\` 文件的头部区域可放置 \`[f]初始化\`
- 文件加载时自动执行一次
- 常用于设置默认变量值
`,Yo=`# NR 语言参考手册

NR 是 Nebula 词库引擎的领域特定语言（DSL），扩展名为 \`.nr\`，用于定义词条、函数、变量和自动化流程。适用于聊天机器人、互动小说、自动化文本生成等场景。

## 目录

| 章节 | 标题 | 内容概要 |
|------|------|----------|
| 1 | [词法结构](./lexical) | 源文件结构、注释、转义规则、多行字符串、代码块语法 |
| 2 | [类型系统](./types) | 整数/浮点/字符串/布尔/空/对象/函数类型、类型查询 |
| 3 | [变量与赋值](./variables) | 作用域、赋值操作符、条件赋值、内置变量、符号截取文本 |
| 4 | [表达式与运算符](./expressions) | 数学表达式、比较运算符、严格比较、逻辑运算符 |
| 5 | [控制流](./control-flow) | 条件分支、循环、中断与跳转、标签与 goto |
| 6 | [词条系统](./entries) | 普通词条、内部词条、类内部词条 |
| 7 | [函数](./functions) | 定义语法、命名/可变参数、默认参数值、初始化函数 |
| 8 | [JSON 数据处理](./json) | 内联 JSON、对象/数组 DSL、导航取值写入、数组追加 |
| 9 | [面向对象编程](./oop) | 类定义、实例变量、对象创建与方法调用、自我调用 |
| 10 | [模块与引入](./modules) | 文件/目录引入、跨包调用、热更新 |
| 11 | [内置函数参考](./flow-output) | 流程控制、输出、服务器、对象创建、标准库函数（@字符串/@数学/@访问/@类型/@画布）、文件操作 |

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
`,Zo=`# 8. JSON 数据处理

NR 内置强大的 JSON 处理能力，本章涵盖内联 JSON 赋值、JSON DSL 对象与数组语法、导航取值/写入、数组追加以及变量替换在 JSON 上下文中的使用。

<dl>
  <dt>JSON DSL</dt>
  <dd>NR 特有的 <code>{ }</code> 和 <code>[ ]</code> 块语法，以更可读的方式构建 JSON 数据，深度集成变量替换和函数调用。</dd>
  <dt>自适应解析</dt>
  <dd><code>key:value</code> 中 value 会被解析为 JSON 字面量（数字/布尔/null/对象/数组），否则作为字符串。</dd>
  <dt>核心用途</dt>
  <dd>复杂数据结构存储、与外部 API 的数据交换、可变参数和配置对象的载体。</dd>
</dl>

## 8.1 内联 JSON 赋值

\`\`\`
data:{"name":"Alice","age":25,"items":[1,2,3]}
\`\`\`

## 8.2 JSON 对象 DSL \`{ }\`

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

## 8.3 重复键自动合并

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

## 8.4 JSON 数组 DSL \`[ ]\`

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

## 8.5 导航取值 \`@\`

\`\`\`
@data[name]           → "Alice"
@data[items][0]       → "1"
@data[items][%i%]     → 动态索引（变量替换）
\`\`\`

\`\`\`
@a[0][name]           → 数组第 0 个元素的 name 字段
\`\`\`

## 8.6 导航写入

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

## 8.7 数组追加 \`[]\`

\`\`\`
list:[a,b]
@list[]:c              → list = ["a","b","c"]
@list[]:123            → list = ["a","b","c",123] (自适应 → Number)
@list[]::123           → list = ["a","b","c",123,"123"] (强制字符串)
\`\`\`

## 8.8 变量替换与函数调用

\`\`\`
prefix:Hello
msg:{
    text:%prefix% World
    ts:%时间戳%
}
// → {"text":"Hello World","ts":"1719500000"}
\`\`\`

## 8.9 深度导航最佳实践

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
`,Qo=`# 1. 词法结构

本章介绍 NR 语言的基础词法规则，涵盖源文件结构、注释、转义、字符串语法等核心概念。词法结构决定了你的代码如何被解析器"阅读"，理解这些规则是写出正确 NR 代码的第一步。后续章节中涉及的[类型系统](./types)、[变量赋值](./variables)等均在此基础上工作。

NR 源文件要求使用 **UTF-8 编码**。解析器在处理文件时会 trim 行首尾空白，但保留缩进结构。一个合法的 \`.nr\` 文件至少包含：头部区域的可选初始化代码、一个空行分隔符，以及至少一个词条或函数定义。

## 1.1 源文件结构

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

## 1.2 注释

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

## 1.3 转义规则

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

## 1.4 多行字符串

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

## 1.5 其他词法

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
`,Xo=`# 11.6 @数学

导入：\`m:#引入=@数学\` | 共 8 个函数。提供绝对值、最值、幂运算、求和、取整等基础数学运算。

### \`$m.绝对值$\` — 取绝对值

- **签名**：\`$m.绝对值 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：数字的绝对值

正数保持不变，负数取相反数。支持整数和浮点数。

\`\`\`
$m.绝对值 -5$          → "5"
$m.绝对值 3.14$        → "3.14"
\`\`\`

### \`$m.最大值$\` — 取最大值

- **签名**：\`$m.最大值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最大的数字

从一组数字中返回最大值。支持可变数量的参数。

\`\`\`
$m.最大值 3 7 2$       → "7"
\`\`\`

### \`$m.最小值$\` — 取最小值

- **签名**：\`$m.最小值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最小的数字

从一组数字中返回最小值。支持可变数量的参数。

\`\`\`
$m.最小值 3 7 2$       → "2"
\`\`\`

### \`$m.幂运算$\` — 幂运算

- **签名**：\`$m.幂运算 [底数] [指数]$\`
- **参数**：底数和指数（均为数字）
- **返回值**：底数的指数次幂

计算底数的指数次幂。支持分数指数（如 0.5 即开平方根）、负指数。

\`\`\`
$m.幂运算 2 3$          → "8"
$m.幂运算 2 10$         → "1024"
$m.幂运算 9 0.5$        → "3"
\`\`\`

### \`$m.求和$\` — 求和

- **签名**：\`$m.求和 [数字1] [数字2] [...]$\`
- **参数**：一组数字，支持可变数量
- **返回值**：所有数字的累加和

对一组数字进行累加求和。

\`\`\`
$m.求和 1 2 3 4 5$      → "15"
\`\`\`

### \`$m.向上取整$\` — 向上取整

- **签名**：\`$m.向上取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不小于输入值的最小整数

向正无穷方向取整。

\`\`\`
$m.向上取整 3.14$        → "4"
$m.向上取整 -3.14$       → "-3"
\`\`\`

### \`$m.向下取整$\` — 向下取整

- **签名**：\`$m.向下取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不大于输入值的最大整数

向负无穷方向取整。

\`\`\`
$m.向下取整 3.14$        → "3"
$m.向下取整 -3.14$       → "-4"
\`\`\`

### \`$m.取整$\` — 四舍五入取整

- **签名**：\`$m.取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：四舍五入到最接近的整数

按四舍五入规则将数值取整到最接近的整数。0.5 向上取整。

\`\`\`
$m.取整 3.6$           → "4"
$m.取整 3.2$           → "3"
\`\`\`

## 浮点精度说明

NR 的数学运算基于 IEEE 754 双精度浮点数（f64）。这意味着：

- 整数在 ±2<sup>53</sup> 范围内可精确表示，超出此范围的整数可能丢失精度
- 小数运算可能存在经典浮点误差（如 \`0.1 + 0.2\` 可能不是精确的 0.3）
- 对于需要精确小数计算的场景（如货币），建议先转换为整数（乘以 10<sup>n</sup>）计算后再除以 10<sup>n</sup>
- \`$m.幂运算$\` 采用标准浮点幂运算，极端值（极大底数 × 极大指数）可能溢出为 inf

> 所有数学函数均基于 f64 运算，传入非数字参数时行为未定义。建议与 [@类型](./type) 的转换函数配合使用，确保输入为有效数字。

[← @字符串](./string)

[@访问 →](./network)
`,nl=`# 10. 模块与引入

NR 的模块系统允许将一个 \`.nr\` 文件（或整个目录）作为**独立包**引入。本章涵盖引入语法、模块解析算法、热重载、跨包变量访问以及标准库结构。

<dl>
  <dt>包（Package）</dt>
  <dd>被引入的 <code>.nr</code> 文件，拥有独立的变量作用域和词条空间。</dd>
  <dt>跨包访问</dt>
  <dd>通过 <code class="nr-sig">$包名.成员$</code> 语法访问被引入包的函数、词条和变量。</dd>
  <dt>头部区域</dt>
  <dd>文件第一个空行之前的部分，引入语句和变量定义在此处。</dd>
</dl>

## 10.1 引入语法

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

## 10.2 模块解析算法

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

#引入=@字符串          // @ 前缀：直接查内置标准库
\`\`\`

## 10.3 热重载行为

NR 引擎内置了**热重载（Hot Reload）**机制，使开发调试更加高效：

- **检测方式**：引擎记录每个引入文件的 \`mtime\`（最后修改时间），每次跨包调用前对比当前 \`mtime\`
- **触发时机**：仅在**下一次调用时**检测并重载，不会主动轮询
- **重载范围**：仅重载被修改的文件；目录引入时，只重载 \`mtime\` 变化的子文件
- **状态保留**：重载后包内重新执行 \`[f]初始化\`，之前的状态（变量值）**不会保留**

> **注意事项**
> - 热重载是**开发特性**，生产环境中建议关闭或确保文件不会被意外修改
> - 频繁重载大文件可能影响性能
> - 重载不会影响已在执行的调用链——当前调用完成后才生效

## 10.4 跨包变量访问

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

## 10.5 标准库结构

标准库函数需通过 \`#引入=@模块名\` 导入后生效。路径以 \`@\` 开头，由引擎内置，无需对应 \`.nr\` 文件。

\`\`\`
s:#引入=@字符串
m:#引入=@数学
t:#引入=@类型
net:#引入=@访问

[函数]main
$s.大写 hello$
$s.长度 Hello World$
$m.绝对值 -5$
\`\`\`

标准库函数通过 \`$包名.方法$\` 调用。详见[第 11 章 内置函数参考](./flow-output)。

## 10.6 标准库一览

| 模块名 | 引入语法 | 典型方法 |
| --- | --- | --- |
| @字符串 | \`s:#引入=@字符串\` | \`$s.大写$\`、\`$s.长度$\`、\`$s.文本包含$\` |
| @数学 | \`m:#引入=@数学\` | \`$m.绝对值$\`、\`$m.最大值$\`、\`$m.取整$\` |
| @类型 | \`t:#引入=@类型\` | \`$t.转文本$\`、\`$t.转数字$\`、\`$t.转整数$\` |
| @访问 | \`net:#引入=@访问\` | HTTP 请求相关 |
| @画布 | \`c:#引入=@画布\` | 图形绘制相关 |

> **注意事项**
> - **循环依赖**：如果 A 引入 B、B 又引入 A，引擎会检测并报错。设计模块结构时避免双向引入
> - **包名冲突**：包别名（\`包名:#引入=...\`）在同一文件中必须唯一；后定义的同名引入会**覆盖**之前的
> - **初始化顺序**：多个引入的 \`[f]初始化\` 按头部的**定义顺序**依次执行
> - **包内词条隔离**：被引入包的词条不会参与当前文件的**主触发匹配**——只能通过 \`$包名.主回调$\` 显式调用
> - 关于词条系统和函数的基础概念，参见[第 6 章 词条系统](./entries)和[第 7 章 函数](./functions)

[← 面向对象编程](./oop) [内置函数参考 →](./flow-output)
`,el=`# 11.7-11.8 @访问 · 内置访问

NR 提供两种 HTTP 客户端调用方式：**@访问 状态机 API**（精细控制请求的每个阶段）和**内置快捷函数**（一行完成的简化调用）。

## 网络访问概述

两种调用方式对比：

- **@访问 状态机 API**（11.7）：精细控制请求的每个阶段——创建、切换方法、设置头部/超时、发送、读取结果。适合需要定制请求细节的复杂场景。
- **内置快捷函数**（11.8）：\`$访问$\`、\`$访问POST$\` 等一行完成的简化调用。适合简单场景。

## 11.7 @访问

导入：\`net:#引入=@访问\` | 共 12 个状态机函数。内置快捷函数（无需导入）：\`$访问$\`、\`$访问POST$\`（见 11.8 节）

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

### \`$net.新建$\` — 创建请求对象

- **签名**：\`$net.新建 [url]$\`
- **参数**：目标 URL
- **返回值**：请求句柄

初始化 HTTP 请求状态机，默认 GET 方法。

\`\`\`
req:$net.新建 https://httpbin.org/post$
\`\`\`

### \`$net.切换GET$\` — 切换到 GET 方法

- **签名**：\`$net.切换GET [handle]$\`
- **参数**：请求句柄
- **返回值**：无

将请求方法设置为 GET。

\`\`\`
$net.切换GET %req%$
\`\`\`

### \`$net.切换POST$\` — 切换到 POST 方法

- **签名**：\`$net.切换POST [handle] [body]$\`
- **参数**：请求句柄、请求体
- **返回值**：无

将请求方法设置为 POST 并传入请求体。

\`\`\`
$net.切换POST %req% {"key":"value"}$
\`\`\`

### \`$net.POST$\` — 设置 POST 请求体

- **签名**：\`$net.POST [handle] [body]$\`
- **参数**：请求句柄、请求体
- **返回值**：无

在已切换到 POST 的状态机上设置请求体。

\`\`\`
$net.POST %req% {"name":"Alice","age":25}$
\`\`\`

### \`$net.POST文件$\` — 设置文件上传

- **签名**：\`$net.POST文件 [handle] [field] [data] [filename]$\`
- **参数**：请求句柄、表单字段名、文件数据、文件名
- **返回值**：无

通过 multipart/form-data 上传文件。

\`\`\`
$net.POST文件 %req% file %file_content% upload.txt$
\`\`\`

### \`$net.启用跳转$\` / \`$net.禁用跳转$\` — 控制重定向

- **签名**：\`$net.启用跳转 [handle]$\` / \`$net.禁用跳转 [handle]$\`
- **参数**：请求句柄
- **返回值**：无

启用或禁用 HTTP 重定向跟随。

\`\`\`
$net.启用跳转 %req%$
$net.禁用跳转 %req%$
\`\`\`

### \`$net.设置头部$\` — 设置请求头

- **签名**：\`$net.设置头部 [handle] [json_headers]$\`
- **参数**：请求句柄、JSON 格式的请求头键值对
- **返回值**：无

以 JSON 对象格式设置 HTTP 请求头。

\`\`\`
$net.设置头部 %req% {"Authorization":"Bearer xxxx","Content-Type":"application/json"}$
\`\`\`

### \`$net.设置超时$\` — 设置超时

- **签名**：\`$net.设置超时 [handle] [seconds]$\`
- **参数**：请求句柄、超时秒数
- **返回值**：无

设置请求超时时间（秒）。默认无超时限制。

\`\`\`
$net.设置超时 %req% 30$
\`\`\`

### \`$net.发送$\` — 发送请求

- **签名**：\`$net.发送 [handle]$\`
- **参数**：请求句柄
- **返回值**：无

实际发起网络请求（阻塞）。发送后不可修改配置。

\`\`\`
$net.发送 %req%$
\`\`\`

### \`$net.全部内容$\` — 读取全部响应内容

- **签名**：\`$net.全部内容 [handle]$\`
- **参数**：请求句柄
- **返回值**：完整响应 JSON（含状态码、头部、data 字段）

> 注意：\`data\` 字段中的敏感数据（如 HTML 页面、二进制内容等）会被自动替换为 \`"已屏蔽"\`。需要原始响应体请使用 \`$net.内容$\`。

\`\`\`
$net.全部内容 %req%$
\`\`\`

### \`$net.内容$\` — 读取响应内容

- **签名**：\`$net.内容 [handle]$\`
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

## 11.8 内置访问

无需导入，始终可用 | 共 3 个函数

### User-Agent 说明

内置访问函数（\`$访问$\`、\`$访问POST$\`）默认发送 \`User-Agent: Nebula-Client/1.0\` 请求头。如果目标服务器要求特定 User-Agent，可通过 headers 参数覆盖：

\`\`\`
$访问 https://httpbin.org/headers {"User-Agent":"MyApp/2.0"}$
\`\`\`

状态机模式（\`@访问\`）不自动添加 User-Agent，需通过 \`$net.设置头部$\` 手动指定。

### 超时与错误处理

内置 \`$访问$\` 和 \`$访问POST$\` 默认超时为 15 秒，超时后返回空字符串。状态机模式默认无超时限制，需通过 \`$net.设置超时$\` 显式设置。

当网络请求因以下原因失败时，所有访问函数均返回**空字符串**：

- DNS 解析失败
- 连接被拒绝（目标端口未开放）
- 超时（仅当设置了超时限制）
- TLS/SSL 握手失败
- HTTP 状态码 4xx/5xx（响应体仍然返回，不会因状态码而报错）

### \`$访问$\` — GET 请求

- **签名**：\`$访问 [url] [headers_json]$\`
- **参数**：URL、可选的 JSON 格式请求头
- **返回值**：响应体文本；失败返回空字符串

发起 HTTP GET 请求。自动补全 \`http://\` 前缀，默认 User-Agent: \`Nebula-Client/1.0\`，超时 15 秒。

\`\`\`
$访问 https://httpbin.org/ip$
$访问 https://httpbin.org/headers {"Authorization":"Bearer xxx"}$
\`\`\`

### \`$访问POST$\` — POST 请求

- **签名**：\`$访问POST [url] [body] [headers_json]$\`
- **参数**：URL、请求体、可选的 JSON 格式请求头
- **返回值**：响应体文本；失败返回空字符串

发起 HTTP POST 请求，默认超时 15 秒。

\`\`\`
$访问POST https://httpbin.org/post {"key":"value"}$
$访问POST https://httpbin.org/post {"key":"value"} {"Authorization":"Bearer xxx"}$
\`\`\`

### \`$访问转发$\` — 转发请求

- **签名**：\`$访问转发 [url]$\`
- **参数**：目标 URL
- **返回值**：转发后的响应

仅在 \`$启动服务器$\` 的 HTTP 模式下可用，需读取 \`_DATA\` 变量获取原始请求数据。

\`\`\`
$访问转发 https://backend.internal/api$
\`\`\`

> 仅在 \`$启动服务器$\` 的 HTTP 模式下可用。

> 状态机模式提供完整控制，内置函数适合快速调用。所有请求失败时返回空字符串而非抛异常。网络操作是阻塞的，注意超时设置。配合 [启动服务器](./flow-output#sec-11-3) 可构建完整 Web 服务。

[← @数学](./math)

[@类型 →](./type)
`,tl='# 9. 面向对象编程\n\nNR 的 OOP 系统建立在词条引擎之上的上下文隔离与状态持久化机制。本章涵盖类定义、实例变量、对象创建与方法调用、自我调用、构造函数输出以及与传统 OOP 的对比。\n\n<dl>\n  <dt>类</dt>\n  <dd>一组绑定到特定命名空间的方法集合，使用 <code class="nr-sig">[函数:类名]</code> 语法定义。</dd>\n  <dt>实例变量</dt>\n  <dd>以 <code class="nr-sig">.字段</code> 前缀命名的变量，在对象方法调用间自动持久化。</dd>\n  <dt>对象</dt>\n  <dd>通过 <code class="nr-sig">$new ClassName$</code> 创建，每个实例维护独立的变量作用域。</dd>\n</dl>\n\n## 9.1 类定义\n\n使用 `[函数:类名]`、`[f:类名]` 或 `[F:类名]` 语法：\n\n```\n[函数:Counter]初始化\n$打印 初始化$\n.count:0\n\n[f:Counter]add num     ← [f:类名] 是 [函数:类名] 的简写\n.count+:%num%\n\n[函数:Counter]get\n当前计数：%.count%\n```\n\n- 内部触发词为 `类名.方法名`\n- 构造函数查找顺序：`类名.new` → `类名.初始化`\n\n### 9.1.1 类生命周期\n\n一个 NR 对象的完整生命周期如下：\n\n1. **创建**：通过 `$new ClassName args$` 创建对象实例，引擎查找并执行构造函数\n2. **初始化**：构造函数中设置初始实例变量（`.field:value`），构造函数返回类名字符串给调用者\n3. **使用**：通过 `$对象名.方法 参数$` 调用方法；每次方法调用前从存储中加载实例变量，执行后自动写回\n4. **消亡**：当对象变量被覆盖或超出作用域时，实例数据随之释放\n\n**存储机制**：实例变量存储在引擎内部的键值存储中，键的格式为 `对象名.字段名`。这意味着不同对象的 `.count` 完全独立。\n\n## 9.2 实例变量 `.字段`\n\n以 `.` 开头的变量是**实例变量**，在同一个对象的多次方法调用之间持久化：\n\n```\n[f:Counter]add num\n.count+:%num%           ← .count 跨调用保持\n```\n\n- 方法调用前从主上下文加载（`对象名.字段`），执行后自动写回\n- 不同对象的实例变量相互独立\n\n## 9.3 创建对象与调用方法\n\n```\nobj:$new Counter$\nobj:$new Counter 参数$\n\n$obj.add 5$             ← 调用方法\n$obj.get$               ← 无参调用\n```\n\n方法返回值通过 `$...$` 替换到调用处。\n\n## 9.4 自我调用 `$.method$`\n\n在类方法内部，使用 `$.方法名` 调用同一对象的其他方法：\n\n```\n[函数:Counter]get\n$.add 1$                ← 等价于 $Counter.add 1$\n当前计数：%.count%\n```\n\n- `$.method$` 通过 `_` 变量自动解析为 `ClassName.method`\n- 只能在类方法内部使用（`_` 变量不为空时生效）\n- 支持传参：`$.method arg1 arg2$`\n\n## 9.5 构造函数与输出\n\n```\n[函数:Counter]初始化\n.count:0\na                       ← 裸文本直接打印到终端\n$打印 初始化$            ← $打印$ 输出到终端\n```\n\n- 构造函数中的裸文本直接打印到终端，不走管道输出\n- `$打印$` 和 `$打印返回$` 同样输出到终端\n- 构造函数返回 `类名` 字符串（可赋给变量）\n\n## 9.6 NR OOP vs 传统 OOP 对比\n\n| 概念 | NR OOP | 传统 OOP（Java/Python） |\n| --- | --- | --- |\n| 类定义 | `[函数:类名]方法名` 分散定义 | `class { }` 集中定义 |\n| 继承 | 不支持类继承 | `extends` / 接口实现 |\n| 实例变量 | `.字段`，引擎自动持久化 | `this.field`，内存中维护 |\n| 构造函数 | `类名.new` 或 `类名.初始化` | `constructor()` / `__init__()` |\n| 方法调用 | `$对象.方法 args$` | `obj.method(args)` |\n| 自我调用 | `$.method$` 语法糖 | `this.method()` |\n| 访问控制 | 无 public/private，全公开 | public/protected/private |\n| 多态 | 不支持 | 虚函数/接口 |\n| 适用场景 | 对话状态、简单实体、计数器 | 通用软件工程 |\n\n> **注意事项**\n> - **无继承**：NR 不支持类继承。如需共享行为，使用[普通函数](./functions)或[模块引入](./modules)替代\n> - **实例变量命名**：`.字段` 命名空间与普通变量独立，`.count` 和 `count` 是两个不同的变量\n> - **构造函数返回值**：构造函数返回的是**类名字符串**（如 `"Counter"`），而非对象引用。真正的"对象标识"是赋值的变量名\n> - **方法中修改实例变量**：在类方法中修改 `.字段` 后，引擎**在执行完毕后自动写回**——不需要显式的 "save" 操作\n> - 关于对象创建 `$new$` 的更多用法，参见[第 11.4 节 对象创建](./flow-output)\n\n[← JSON 数据处理](./json) [模块与引入 →](./modules)\n',sl=`# 11.5 @字符串

导入：\`s:#引入=@字符串\` | 共 22 个函数。提供长度、分割、大小写转换、对齐、判断等全面的字符串操作。\`$截取$\`、\`$替换$\`、\`$删前缀$\`、\`$删后缀$\` 属于引擎函数，无需导入。

### \`$截取$\` — 截取子串 <span class="badge">引擎</span>

<dl>
  <dt>签名</dt><dd><code>$截取 [字符串] [开始] [长度]$</code></dd>
  <dt>参数</dt><dd>字符串、起始索引（从 0 开始）、可选的长度</dd>
  <dt>返回值</dt><dd>截取的子串</dd>
</dl>

索引从 0 开始。若省略长度参数，则截取从起点到末尾。Unicode 字符按字符边界截取，不会从多字节字符中间切断。

\`\`\`
$截取 hello 1 3$   → "ell"
$截取 你好世界 2$    → "世界"
\`\`\`

### \`$替换$\` — 替换子串 <span class="badge">引擎</span>

<dl>
  <dt>签名</dt><dd><code>$替换 [字符串] [旧] [新]$</code></dd>
  <dt>参数</dt><dd>源字符串、要替换的旧子串、新子串</dd>
  <dt>返回值</dt><dd>替换后的字符串</dd>
</dl>

将字符串中**所有**出现的旧子串替换为新子串（全局替换，非仅首个匹配）。

\`\`\`
$替换 hello world o x$   → "hellx wxrld"
\`\`\`

### \`$删前缀$\` — 删除前缀 <span class="badge">引擎</span>

<dl>
  <dt>签名</dt><dd><code>$删前缀 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的前缀</dd>
  <dt>返回值</dt><dd>删除前缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删前缀 https://example.com https://$   → "example.com"
\`\`\`

### \`$删后缀$\` — 删除后缀 <span class="badge">引擎</span>

<dl>
  <dt>签名</dt><dd><code>$删后缀 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的后缀</dd>
  <dt>返回值</dt><dd>删除后缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删后缀 file.txt .txt$   → "file"
\`\`\`

### \`$s.长度$\` — 获取字符串长度

<dl>
  <dt>签名</dt><dd><code>$s.长度 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>字符数（非字节数）</dd>
</dl>

对于 Unicode 字符串，返回的是**字符数**（而非字节数），一个中文字、一个 emoji 均计为 1。这与某些语言的 \`len()\` 返回字节数不同。

\`\`\`
$s.长度 hello$        → "5"
$s.长度 你好世界$      → "4"
\`\`\`

### \`$s.文本包含$\` — 判断是否包含子串

<dl>
  <dt>签名</dt><dd><code>$s.文本包含 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串</dd>
  <dt>返回值</dt><dd>"1"（包含）或 "0"（不包含）</dd>
</dl>

判断字符串中是否包含指定子串。区分大小写。

\`\`\`
$s.文本包含 hello ll$    → "1"
$s.文本包含 hello xy$    → "0"
\`\`\`

### \`$s.文本分割$\` — 按分隔符切分取索引

<dl>
  <dt>签名</dt><dd><code>$s.文本分割 [字符串] [分隔符] [索引]$</code></dd>
  <dt>参数</dt><dd>源字符串、分隔符、索引（从 0 开始）</dd>
  <dt>返回值</dt><dd>指定索引位置的元素；索引越界返回空字符串</dd>
</dl>

按分隔符将字符串切分为数组，返回指定索引位置的元素。

\`\`\`
$s.文本分割 a,b,c , 0$   → "a"
\`\`\`

### \`$s.头尾去空$\` — 去除首尾空白

<dl>
  <dt>签名</dt><dd><code>$s.头尾去空 [文本]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>去除首尾空白后的字符串</dd>
</dl>

去除字符串首尾的空白字符（空格、制表符、换行符等）。不会修改字符串中间的空白。

\`\`\`
$s.头尾去空 \\ \\ hello\\ \\ $   → "hello"
\`\`\`

### \`$s.判断数字$\` — 判断是否全为数字

<dl>
  <dt>签名</dt><dd><code>$s.判断数字 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为数字）或 "0"（否则）</dd>
</dl>

判断字符串是否全部由数字字符组成。注意：含小数点、负号的字符串（如 "-3.14"）返回 "0"。

\`\`\`
$s.判断数字 123$       → "1"
$s.判断数字 hello$     → "0"
\`\`\`

### \`$s.大写$\` — 转大写

<dl>
  <dt>签名</dt><dd><code>$s.大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有小写字母转为大写后的字符串</dd>
</dl>

将字符串中所有小写字母转为大写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$s.大写 hello$         → "HELLO"
\`\`\`

### \`$s.小写$\` — 转小写

<dl>
  <dt>签名</dt><dd><code>$s.小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有大写字母转为小写后的字符串</dd>
</dl>

将字符串中所有大写字母转为小写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$s.小写 HELLO$         → "hello"
\`\`\`

### \`$s.首字母大写$\` — 首字母大写

<dl>
  <dt>签名</dt><dd><code>$s.首字母大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>每个单词首字母大写后的字符串</dd>
</dl>

将每个单词的首字母转为大写，其余字母转为小写。单词以空白字符为分界。

\`\`\`
$s.首字母大写 hello world$   → "Hello World"
\`\`\`

### \`$s.大小写互换$\` — 大小写互换

<dl>
  <dt>签名</dt><dd><code>$s.大小写互换 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>大小写互换后的字符串</dd>
</dl>

将字符串中的大写字母转为小写，小写字母转为大写。非字母字符保持不变。

\`\`\`
$s.大小写互换 Hello$         → "hELLO"
\`\`\`

### \`$s.查找$\` — 查找子串位置

<dl>
  <dt>签名</dt><dd><code>$s.查找 [字符串] [子串] [起始位置]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串、可选的起始位置（默认 0）</dd>
  <dt>返回值</dt><dd>首次出现的索引（从 0 开始）；未找到返回 "-1"</dd>
</dl>

从指定起始位置查找子串首次出现的位置索引。

\`\`\`
$s.查找 hello e$       → "1"
$s.查找 hello l 3$     → "3"
\`\`\`

### \`$s.计数$\` — 统计子串出现次数

<dl>
  <dt>签名</dt><dd><code>$s.计数 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要统计的子串</dd>
  <dt>返回值</dt><dd>不重叠出现次数</dd>
</dl>

统计子串在字符串中出现的次数。不重叠计数。

\`\`\`
$s.计数 hello l$       → "2"
\`\`\`

### \`$s.开头判断$\` — 判断是否以某子串开头

<dl>
  <dt>签名</dt><dd><code>$s.开头判断 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的前缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$s.开头判断 https://example.com https$    → "1"
\`\`\`

### \`$s.结尾判断$\` — 判断是否以某子串结尾

<dl>
  <dt>签名</dt><dd><code>$s.结尾判断 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的后缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$s.结尾判断 file.txt .txt$    → "1"
\`\`\`

### \`$s.文本连接$\` — 用分隔符连接多个文本

<dl>
  <dt>签名</dt><dd><code>$s.文本连接 [分隔符] [文本1] [文本2] [...]$</code></dd>
  <dt>参数</dt><dd>分隔符、至少两个文本片段</dd>
  <dt>返回值</dt><dd>用分隔符连接后的字符串</dd>
</dl>

用指定的分隔符将多个文本片段连接成一个字符串。支持可变数量的参数。

\`\`\`
$s.文本连接 , a b c$           → "a,b,c"
\`\`\`

### \`$s.文本重复$\` — 重复文本

<dl>
  <dt>签名</dt><dd><code>$s.文本重复 [文本] [次数]$</code></dd>
  <dt>参数</dt><dd>要重复的文本、重复次数</dd>
  <dt>返回值</dt><dd>重复拼接后的字符串</dd>
</dl>

将文本重复指定次数后拼接。当重复次数很大时请注意性能影响。

\`\`\`
$s.文本重复 ab 3$      → "ababab"
\`\`\`

### \`$s.判断字母$\` — 判断是否全为字母

<dl>
  <dt>签名</dt><dd><code>$s.判断字母 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为 A-Z、a-z）或 "0"（否则）</dd>
</dl>

\`\`\`
$s.判断字母 Hello$        → "1"
\`\`\`

### \`$s.判断小写$\` — 判断是否全为小写

<dl>
  <dt>签名</dt><dd><code>$s.判断小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为小写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$s.判断小写 hello$         → "1"
\`\`\`

### \`$s.判断大写$\` — 判断是否全为大写

<dl>
  <dt>签名</dt><dd><code>$s.判断大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为大写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$s.判断大写 HELLO$         → "1"
\`\`\`

### \`$s.判断空白$\` — 判断是否全为空白

<dl>
  <dt>签名</dt><dd><code>$s.判断空白 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为空白字符）或 "0"（否则）</dd>
</dl>

空字符串也返回 "1"。

\`\`\`
$s.判断空白 \\ \\ $           → "1"
\`\`\`

### \`$s.左对齐$\` — 左对齐填充

<dl>
  <dt>签名</dt><dd><code>$s.左对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>左对齐并在右侧填充后的字符串</dd>
</dl>

将文本靠左对齐，右侧用填充字符补足到指定宽度。若文本已超过宽度则不做截断。

\`\`\`
$s.左对齐 hi 5$            → "hi   "
\`\`\`

### \`$s.右对齐$\` — 右对齐填充

<dl>
  <dt>签名</dt><dd><code>$s.右对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>右对齐并在左侧填充后的字符串</dd>
</dl>

\`\`\`
$s.右对齐 42 5 0$          → "00042"
\`\`\`

### \`$s.居中$\` — 居中对齐填充

<dl>
  <dt>签名</dt><dd><code>$s.居中 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>居中对齐并用填充字符两侧填充后的字符串</dd>
</dl>

将文本居中对齐，两侧用空格补足到指定宽度。若两侧填充数不相等，左侧少填一个。

\`\`\`
$s.居中 hi 6$              → "  hi  "
\`\`\`

## 性能提示

字符串在 NR 中是**不可变**的：每次字符串操作（拼接、截取等）都会产生新的字符串对象。在循环中对大量字符串进行拼接时，建议使用 \`$s.文本连接$\` 一次性拼接多个片段，而非多次拼接操作，以减少内存分配次数。

\`$s.文本重复$\` 在重复次数极大（万级以上）时内存占用会显著增加，请合理控制重复次数。

## Unicode 行为说明

\`$s.长度$\` 以 Unicode 字符（grapheme cluster）为最小单位操作，不会在多字节字符中间切断。大小写转换函数（\`$s.大写$\`、\`$s.小写$\`、\`$s.首字母大写$\`、\`$s.大小写互换$\`）目前仅处理 ASCII 范围内的英文字母，中文字符不受影响。判断类函数（\`$s.判断字母$\`、\`$s.判断数字$\` 等）也仅基于 ASCII 字符集进行判断。

> 所有字符串函数均基于字符（非字节）操作，Unicode 安全。判断类函数返回 "1"/"0"。需要数字判断和转换的场景，请结合 [@类型](./type) 模块使用。

[← 流程控制·输出](./flow-output) [@数学 →](./math)
`,rl=`# 11.9 @类型

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

### \`$t.转文本$\` — 将值转为文本

- **签名**：\`$t.转文本 [值]$\`
- **参数**：任意类型的值
- **返回值**：值的文本表示

将任意值转换为字符串形式。

\`\`\`
$t.转文本 123$         → "123"
$t.转文本 %count%$     → count 的文本形式
\`\`\`

### \`$t.转数字$\` — 文本转数字

- **签名**：\`$t.转数字 [文本]$\`
- **参数**：要转换的文本
- **返回值**：数字值（内部标记 __N）；失败时返回空字符串

将文本解析为 f64 浮点数。支持整数、小数、负数、科学计数法。

\`\`\`
$t.转数字 3.14$        → "__N3.14"
$t.转数字 hello$       → （空）
\`\`\`

### \`$t.转整数$\` — 文本转整数

- **签名**：\`$t.转整数 [文本]$\`
- **参数**：要转换的文本
- **返回值**：整数值（向零截断）；失败时返回空字符串

将文本解析为整数，支持浮点文本自动截断取整（向零方向）。

\`\`\`
$t.转整数 42$          → "__N42"
$t.转整数 3.99$        → "__N3"
\`\`\`

### \`$t.转浮点$\` — 文本转浮点

- **签名**：\`$t.转浮点 [文本]$\`
- **参数**：要转换的文本
- **返回值**：浮点数值；失败时返回空字符串

将文本解析为 f64 浮点数，与 \`$t.转数字$\` 行为一致。

\`\`\`
$t.转浮点 3.14$        → "__N3.14"
$t.转浮点 5$           → "__N5"
\`\`\`

> 类型转换失败时均返回空字符串（不赋值），建议在关键转换前配合判断函数做前置验证。详情参见 [@数学](./math) 的浮点精度说明。

[← @访问·内置访问](./network)

[@画布 →](./canvas)
`,il='# 2. 类型系统\n\nNR 的类型系统是**动态、弱类型**的——变量无需声明类型，运行时自动确定。值在大多数场景下会自动在文本和数字之间转换，`==` 运算符做宽松比较。本章涵盖 NR 中的原始数据类型（没有对象/数组，只有文本、数字和布尔值），以及类型检测、判断和转换操作。\n\nNR 的 `Value` 不是简单的"字符串或数字"二分法——它是一个完整的枚举类型，内部由 Rust 的 `enum` 实现，每个变体携带不同的数据表示。这意味着两个值即使"看起来一样"，也可能属于不同类型，进而影响相等性比较和运算行为。\n\n## 2.1 类型一览\n\nNR 变量存储的是**带类型的值**（`Value`），而非纯字符串。类型在赋值时自动推断。\n\n| 类型 | 示例 | 说明 |\n|------|------|------|\n| `整数` | `1`, `-5`, `100` | 64 位有符号整数 |\n| `浮点` | `1.5`, `-0.5`, `3.14` | 64 位浮点数 |\n| `字符串` | `"hello"`, `abc` | 字符串 |\n| `布尔` | `true`, `false` | 布尔值 |\n| `空` | `null` | 空值 |\n| `对象` | — | 对象引用（`$new$` 返回） |\n| `函数` | — | 函数指针（`%func@name%` 返回） |\n\n- `count:5` → Int，`name:Alice` → Str\n- 但 `[...]` 数学表达式运算结果保留数值类型\n- `$new$` 返回值为对象类型\n- `%func@key%` 返回值为函数类型\n\n## 2.2 各类型详解\n\n### 整数（Int）\n\n64 位有符号整数（`i64`），范围约为 `-9.2×10¹⁸` 到 `9.2×10¹⁸`。\n\n```\na:42\nb:-100\nc:0\n\n%TYPE@a%   → "整数"\n%TYPE@b%   → "整数"\n%TYPE@c%   → "整数"\n```\n\n整数字面量不能包含小数点、前导零（会被当作十进制解析）或科学计数法。\n\n### 浮点（Float）\n\n64 位浮点数（`f64`），符合 IEEE 754 标准。\n\n```\npi:3.14\nneg:-0.5\nbig:1.5e10\n\n%TYPE@pi%    → "浮点"\n%TYPE@neg%   → "浮点"\n%TYPE@big%   → "浮点"\n```\n\n浮点数和整数在比较（`==`）时**视为不同**：`1 == 1.0` 在严格比较下为假。浮点运算可能产生精度误差，这是 IEEE 754 浮点数的固有特性。\n\n### 字符串（Str）\n\nUTF-8 编码的字符串。不带特殊前缀的纯文本字面量自动判定为字符串。\n\n```\nname:Alice\ngreeting:Hello World\nempty:""              ← 显式空字符串\n\n%TYPE@name%       → "字符串"\n%TYPE@greeting%   → "字符串"\n```\n\n注意：`greeting:Hello World` 中空格不需要转义（赋值操作符 `:` 之后直到行尾均为值部分）。但在 `$...$` 参数传递中空格会分割参数，参见 [词法结构 § 转义规则](./lexical)。\n\n### 布尔（Bool）\n\n只有 `true` 和 `false` 两个字面量。\n\n```\nflag:true\ndone:false\n\n%TYPE@flag%   → "布尔"\n%TYPE@done%   → "布尔"\n```\n\n布尔值可直接用于条件表达式（[控制流](./control-flow)），也可参与逻辑运算（[表达式 § 逻辑运算符](./expressions)）。\n\n### 空值（Null）\n\n表示"无值"或"未设置"。仅有一种字面量：`null`。\n\n```\ndata:null\n\n%TYPE@data%   → "空"\n```\n\n`null` 与空字符串 `""` 不同：`null` 是一个独立的类型标记，而 `""` 是值为空的字符串。在条件判断中，`null` 被视为假值。\n\n### 对象（Object）\n\n由 `$new$` 创建，内部持有一个 JSON 对象引用。对象类型值不可直接输出为文本，需通过 `%TYPE@` 查询或使用 JSON 操作符访问其字段。\n\n```\nobj:$new$ {"key":"val"}\n\n%TYPE@obj%   → "对象"\n```\n\n`$new$` 不是赋值操作符——它是创建新对象的内置函数，参见 [词条系统](./entries)。\n\n### 函数（Func）\n\n由 `%func@name%` 获取，存储的是函数指针/引用，而非函数体文本。\n\n```\nptr:%func@greet%\n\n%TYPE@ptr%   → "函数"\n```\n\n函数类型值主要用途：作为回调传入其他函数，或在需要延迟调用时暂存。\n\n## 2.3 类型特性对照\n\n| 类型 | 可修改（`+:` 等） | 宽松相等 `==` | 严格相等 `===` | 数值排序 `>` `<` |\n|------|-------------------|--------------|---------------|------------------|\n| Int | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Float | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Str | ✅ 串接 | 内容比较（含类型转换） | 值和类型均相同 | ❌ 无意义 |\n| Bool | ❌ | 字符串化后比较 | 值和类型均相同 | ❌ |\n| Null | ❌ | — | — | ❌ |\n| Object | — | 引用相等 | 引用相等 | ❌ |\n| Func | ❌ | 引用相等 | 引用相等 | ❌ |\n\n## 2.4 类型强制转换与兼容性\n\n### 算术上下文中的类型转换\n\n在 `[...]` 数学表达式中，操作数的类型决定了运算结果的类型：\n\n```\n// 整数运算 → 整数\na:[1+2]          → Int(3)\n\n// 浮点数参与 → 浮点\nb:[1+2.0]        → Float(3.0)\nc:[3.14*2]       → Float(6.28)\n\n// 字符串自动转为数值参与运算\nd:["3"+2]        → Int(5)  或报错\n```\n\n- 整数 + 整数 → 整数\n- 任一操作数为浮点 → 结果提升为浮点\n- 字符串操作数：尝试按数值解析，失败则报错\n\n### 比较上下文中的类型转换\n\n`==`（宽松相等）会将两边值转为字符串后比较：\n\n```\n1 == "1"       → true（都转为 "1"）\n1 == 1.0       → true（都转为 "1"，但用 === 则为 false）\ntrue == "true" → true\nnull == ""     → false（"null" ≠ ""）\n```\n\n`===`（严格相等）要求**类型和值都相同**：\n\n```\n1 === 1       → true\n1 === 1.0     → false（Int vs Float）\n"1" === 1     → false（Str vs Int）\ntrue === true → true\n```\n\n**注意事项：**\n\n- 条件判断中（如 `如果:`），**推荐使用严格比较 `===`** 以避免意外的类型转换带来的误判。\n- 数值比较（`>`、`<`、`>=`、`<=`）要求两边均为数值类型（Int 或 Float），字符串会被尝试解析为数值。\n- `0`、`""`、`null`、`false` 在布尔上下文中均为"假"，但它们彼此之间**不相等**（除了 `0 == false` 会因为字符串化为 `"0" == "false"` 而返回假）。\n\n## 类型查询 `%TYPE@var%`\n\n```\ncount:5\nname:Alice\n\n%TYPE@count%   → "整数"\n%TYPE@name%    → "字符串"\n```\n\n未设置变量返回空字符串。\n',ol='# 3. 变量与赋值\n\n变量是 NR 中最基本的存储单元。本章涵盖变量的作用域规则、赋值操作符的语义差异、条件赋值、内置变量以及文本切片等核心机制。理解变量系统是正确组织数据流和控制状态的前提，与[类型系统](./types)和[表达式](./expressions)密切协作。\n\nNR 的赋值不是简单的"文本替换"——它会根据操作符和值的内容自动推断类型（[§ 类型一览](./types)），并在不同作用域间管理变量生命周期。\n\n## 3.1 作用域\n\n| 类型 | 作用域 | 说明 |\n|------|--------|------|\n| 局部变量 | 当前上下文 | 子上下文创建时重置 |\n| 全局变量 | 所有子上下文 | 子上下文创建时克隆共享 |\n\n### 作用域选择规则\n\nNR 根据**赋值位置**自动决定变量的作用域：\n\n- **头部区域（第一个空行之前）**中赋值的变量为**全局变量**。这些变量在词条触发、函数调用等子上下文中可被读取和修改。\n- **词条、函数、循环体内部**中首次赋值的变量为**局部变量**。局部变量仅在当前执行上下文中可见，进入子函数或子上下文时会创建独立的副本。\n\n```\n// 头部区域 → 全局变量，整个文件可见\ncounter:0\nbase_url:https://api.example.com\n\n// ← 空行分隔\n\n// 词条内部 → 局部变量\n开始\ntemp:%counter%             ← 可读全局变量\ncounter+:[%counter%+1]   ← 可修改全局变量\nlocal_var:临时值            ← 局部变量，外部不可见\n```\n\n### 作用域注意事项\n\n- 全局变量在**每次词条触发时保持其值**，不会重置。这使得 `counter+:1` 可以在多次触发间累加。\n- 子上下文（如 `$call$` 函数调用）中读取全局变量时，获取的是**当前快照值**；修改全局变量会影响父上下文。\n- 在同一作用域中，对已存在的变量再次使用 `:` 赋值会**覆盖**其值和类型。\n\n## 3.2 赋值操作符\n\n| 操作符 | 示例 | 语义 |\n|--------|------|------|\n| `:` | `name:Alice` | **自适应赋值**：值尝试解析为 JSON 字面量（数字/布尔/null/对象/数组），不成则当字符串 |\n| `::` | `greeting::Hello` | **纯文本赋值**：值始终作为字符串，不解析 JSON |\n| `+:` | `score+:5` | 自增 / JSON追加 / 字符串拼接 |\n| `-:` | `count-:1` | 自减 |\n| `*:` | `val*:2` | 乘法 / 字符串重复 |\n| `/:` | `val/:2` | 除法 |\n| `%:` | `val%:3` | 取余 |\n\n> 只有 ASCII 半角冒号 `:`（U+003A）被识别为赋值操作符。中文全角冒号 `：`（U+FF1A）**不是**操作符，在文本中直接原样输出。\n\n### `:`（自适应赋值）vs `::`（纯文本赋值）\n\n这是 NR 中最容易被忽视但最重要的语义差异：\n\n| 特性 | `:`（单冒号） | `::`（双冒号） |\n|------|-------------|---------------|\n| 值解析 | 尝试解析为 JSON 字面量 | 始终作为字符串 |\n| `1` | Int(1) | Str("1") |\n| `1.5` | Float(1.5) | Str("1.5") |\n| `true` | Bool(true) | Str("true") |\n| `null` | Null | Str("null") |\n| `{"a":1}` | JSON 对象 | Str("{\'a\':1}") |\n| `Alice` | Str("Alice") | Str("Alice") |\n\n```\n// : 自适应赋值——数字被识别为数值类型\ncount:100\n%TYPE@count%   → "整数"\n\n// :: 纯文本赋值——永远是字符串\nid::100\n%TYPE@id%      → "字符串"\n\n// 实际影响：数学运算\n[%count%+1]   → 101   （Int 运算）\n// [%id%+1]   → 报错 / 意外（字符串不能加）\n```\n\n### 何时使用 `::`\n\n- 存储**编号、ID、电话号**等不应被当作数字处理的值（如 `id::001` 不会丢掉前导零）\n- 存储可能是数字字面量的**字符串**（如文件名"123.json"）\n- 需要精确控制类型以避免意外数值运算的场景\n\n**注意事项：** 当你对 `::` 赋值的变量使用 `+:`（自增）时，由于值是字符串，`+:` 会执行**字符串拼接**而非数学加法。这可能不是你想要的行为。\n\n## 3.3 条件赋值 `?:`\n\n```\nkey:@a?:@b?:fallback\n```\n\n从左到右尝试读取 JSON 路径，第一个非空、非 null、非 false 的值被赋值。\n\n## 3.4 内置变量\n\n| 变量 | 说明 |\n|------|------|\n| `%空格%` | 空格 `" "` |\n| `%换行%` | 换行 `"\\n"` |\n| `%时间戳%` | Unix 时间戳（秒） |\n| `%毫秒时间戳%` | Unix 时间戳（毫秒） |\n| `%微秒时间戳%` | Unix 时间戳（微秒） |\n| `%纳秒时间戳%` | Unix 时间戳（纳秒） |\n| `%时间%` | 格式化本地时间 `YYYY-MM-DD HH:MM:SS`（UTC+8） |\n| `%随机数M-N%` | 随机整数 `[M, N]`（含两端） |\n| `%!key%` | 布尔取反：空/0/false/null → `"1"`，否则 → `"0"` |\n| `%?key%` | 可选变量：不存在返回空字符串 |\n| `%++var%` | 自增：先自增再返回递增后的值（变量不存在默认 0） |\n| `%--var%` | 自减：先自减再返回递减后的值（变量不存在默认 0） |\n| `%参数%` | 所有参数列表（JSON 数组） |\n| `%参数0%` | 函数名 / 完整触发名 |\n| `%参数N%` | 第 N 个参数 |\n| `%_%` | 当前对象名 / 函数名 |\n| `%触发%` | 当前触发词 |\n| `%行数%` | 当前行号（1-based） |\n| `%B64@key%` | Base64 解码 |\n| `%URL编码@key%` | URL 编码 |\n| `%len@key%` / `%长度@key%` | 返回变量值的字符长度 |\n| `%@var[切片]%` / `@var[切片]` | 符号截取文本（Python 风格切片，支持 `%` 快捷两种写法） |\n| `%func@key%` | 获取函数指针（类型为"函数"，display 为函数名） |\n| `%包名.变量%` | 跨包变量引用（如 `%mypkg.x%` 读取引入包的头部变量） |\n\n### 内置变量的生命周期\n\n内置变量（`%xxx%`）与用户定义的变量在生命周期上有本质区别：\n\n- **即时求值**：每次读取内置变量（如 `%时间戳%`）时，都会**重新计算**当前值。它不存储"快照"，而是每次调用运行时函数。\n- **不可赋值**：不能对内置变量使用 `:` 赋值——`%时间戳%:123` 是无效的。\n- **临时性**：内置变量的值仅在当前表达式求值瞬间有效。如需多次使用同一值，应将其赋值给用户变量：`ts:%时间戳%`。\n- **参数变量 `%参数N%`** 在函数体内是局部变量，函数返回后失效；在词条触发时反映的是触发参数。\n\n```\n// 推荐做法：缓存内置变量\nstart_time:%毫秒时间戳%\n// ... 多步操作 ...\nelapsed:[%毫秒时间戳%-%start_time%]   ← 两次读取产生不同值，差值有意义\n```\n\n## 3.5 符号截取文本 `%@var[切片]%` / `@var[切片]`\n\n内联文本切片语法，对变量值按字符（`.chars()`）进行 Python 风格切片。中文、emoji 等多字节字符均算一个字符。\n\n**两种写法等价**：\n\n- `%@var[切片]%` —— 标准写法，需 `%` 包裹\n- `@var[切片]` —— 快捷写法，无需 `%` 包裹，直接解析\n\n**基本语法**：`@变量名[start:end:step]`\n\n| 写法 | 含义 |\n|------|------|\n| `@a[1:]` | 从第 2 个字符到末尾 |\n| `@a[1:3]` | 第 2 ~ 3 个字符（index 1 和 2，不含 3） |\n| `@a[:3]` | 前 3 个字符 |\n| `@a[-3:]` | 末尾 3 个字符 |\n| `@a[1:6:2]` | index 1~5，步长 2（隔一个取一个） |\n| `@a[::2]` | 从头到尾，步长 2 |\n| `@a[::-1]` | 反转字符串 |\n\n```\nname:你好世界NR语言\n\n%name%             → "你好世界NR语言"\n%len@name%         → "8"\n\n// 标准写法\n%@name[1:]%        → "好世界NR语言"\n%@name[1:3]%       → "好世"\n%@name[:2]%        → "你好"\n%@name[-3:]%       → "R语言"\n%@name[::-1]%      → "言语RN界世好你"\n\n// 快捷写法（无需 % 包裹）\n@name[1:]          → "好世界NR语言"\n@name[1:3]         → "好世"\n@name[:2]          → "你好"\n@name[-3:]         → "R语言"\n@name[::-1]        → "言语RN界世好你"\n```\n\n> 快捷写法 `@var[切片]` 通过方括号内含 `:` 来与 JSON 路径导航（`@json[key]`）区分。不含 `:` 的方括号仍走 JSON 路径逻辑。\n',hf=Object.assign({"../../v1.0/canvas.md":Vo,"../../v1.0/control-flow.md":zo,"../../v1.0/entries.md":Go,"../../v1.0/expressions.md":qo,"../../v1.0/file.md":Ko,"../../v1.0/flow-output.md":Jo,"../../v1.0/functions.md":Wo,"../../v1.0/index.md":Yo,"../../v1.0/json.md":Zo,"../../v1.0/lexical.md":Qo,"../../v1.0/math.md":Xo,"../../v1.0/modules.md":nl,"../../v1.0/network.md":el,"../../v1.0/oop.md":tl,"../../v1.0/string.md":sl,"../../v1.0/type.md":rl,"../../v1.0/types.md":il,"../../v1.0/variables.md":ol}),ll=[];for(const[n,e]of Object.entries(hf)){const t=n.match(/v1\.0\/(.+)\.md$/);if(!t)continue;let s=t[1];const r=s==="index"?"/v1.0/":`/v1.0/${s}`,i=e.match(/^#\s+(.+)$/m),o=i?i[1]:r,l=[],c=/^#{2,3}\s+(.+)$/gm;let u;for(;(u=c.exec(e))!==null;)l.push(u[1]);ll.push({path:r,title:o,headings:l,content:e})}function pf(n){if(!n.trim())return[];const e=n.toLowerCase().split(/\s+/).filter(Boolean);return ll.filter(t=>{const s=(t.title+" "+t.headings.join(" ")+" "+t.content).toLowerCase();return e.every(r=>s.includes(r))}).map(t=>{const s=t.content.toLowerCase().indexOf(e[0]),r=Math.max(0,s-40),i=Math.min(t.content.length,s+120);let o=t.content.slice(r,i).replace(/\n+/g," ");return r>0&&(o="..."+o),i<t.content.length&&(o+="..."),{...t,snippet:o}}).slice(0,10)}const gf={class:"search-modal"},$f={class:"search-input-wrap"},mf={key:0,class:"search-results"},_f=["onClick","onMouseenter"],bf={class:"result-title"},xf={class:"result-path"},vf={class:"result-snippet"},yf={key:1,class:"search-empty"},wf={__name:"SearchModal",emits:["close"],setup(n,{emit:e}){const t=e,s=Te(""),r=Te([]),i=Te(0),o=Te(null);tr(()=>{var u;return(u=o.value)==null?void 0:u.focus()}),at(s,u=>{r.value=pf(u),i.value=0});function l(u){window.location.hash="#"+u,t("close")}function c(u){u.key==="Escape"?t("close"):u.key==="ArrowDown"?(u.preventDefault(),i.value=Math.min(i.value+1,r.value.length-1)):u.key==="ArrowUp"?(u.preventDefault(),i.value=Math.max(i.value-1,0)):u.key==="Enter"&&r.value[i.value]&&l(r.value[i.value].path)}return(u,a)=>(on(),an("div",{class:"search-overlay",onClick:a[2]||(a[2]=qa(d=>t("close"),["self"]))},[j("div",gf,[j("div",$f,[a[3]||(a[3]=j("svg",{class:"search-icon",viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor","stroke-width":"2"},[j("circle",{cx:"11",cy:"11",r:"8"}),j("path",{d:"m21 21-4.35-4.35"})],-1)),cc(j("input",{ref_key:"inputEl",ref:o,"onUpdate:modelValue":a[0]||(a[0]=d=>s.value=d),class:"search-input",placeholder:"搜索文档...",onKeydown:c},null,544),[[Va,s.value]]),j("button",{class:"search-close",onClick:a[1]||(a[1]=d=>t("close"))},"Esc")]),r.value.length?(on(),an("div",mf,[(on(!0),an(Sn,null,Ut(r.value,(d,p)=>(on(),an("div",{key:d.path,class:Ge(["search-result",{active:p===i.value}]),onClick:$=>l(d.path),onMouseenter:$=>i.value=p},[j("div",bf,de(d.title),1),j("div",xf,de(d.path),1),j("div",vf,de(d.snippet),1)],42,_f))),128))])):s.value?(on(),an("div",yf," 未找到相关结果 ")):cr("",!0)])]))}},kf=Ye(wf,[["__scopeId","data-v-66966829"]]),Sf=["value"],Rf="/v1.0/",Tf={__name:"VersionSwitcher",setup(n){const e=[{label:"v1.0",path:"/v1.0/"}];function t(s){window.location.hash="#"+s.target.value}return(s,r)=>(on(),an("select",{class:"version-select",value:Rf,onChange:t},[(on(),an(Sn,null,Ut(e,i=>j("option",{key:i.path,value:i.path},de(i.label),9,Sf)),64))],32))}},Ef=Ye(Tf,[["__scopeId","data-v-8cf198cc"]]),Af={class:"header"},Of=["title"],Nf={key:0,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},Pf={key:1,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},Cf={class:"main"},If={class:"sidebar"},Mf={class:"content"},Lf={__name:"App",setup(n){const{isDark:e,toggle:t}=Qa(),s=Te(!1);function r(i){(i.ctrlKey||i.metaKey)&&i.key==="k"&&(i.preventDefault(),s.value=!0)}return(i,o)=>{const l=Ec("router-view");return on(),an(Sn,null,[j("div",{class:"app",onKeydown:r},[j("header",Af,[o[6]||(o[6]=j("a",{class:"logo",href:"#/"},"NR 语言参考手册",-1)),gn(Ef),o[7]||(o[7]=j("div",{class:"header-spacer"},null,-1)),j("button",{class:"icon-btn",onClick:o[0]||(o[0]=c=>s.value=!0),title:"搜索 (Ctrl+K)"},[...o[3]||(o[3]=[j("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},[j("circle",{cx:"11",cy:"11",r:"8"}),j("path",{d:"m21 21-4.35-4.35"})],-1)])]),j("button",{class:"icon-btn",onClick:o[1]||(o[1]=(...c)=>dn(t)&&dn(t)(...c)),title:dn(e)?"浅色模式":"深色模式"},[dn(e)?(on(),an("svg",Nf,[...o[4]||(o[4]=[j("circle",{cx:"12",cy:"12",r:"5"},null,-1),j("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"},null,-1)])])):(on(),an("svg",Pf,[...o[5]||(o[5]=[j("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])]))],8,Of)]),j("div",Cf,[j("aside",If,[gn(df)]),j("main",Mf,[gn(l)])])],32),s.value?(on(),So(kf,{key:0,onClose:o[2]||(o[2]=c=>s.value=!1)})):cr("",!0)],64)}}},Df=Ye(Lf,[["__scopeId","data-v-892a6446"]]),Hf={},Ff={class:"home"};function Bf(n,e){return on(),an("div",Ff,[...e[0]||(e[0]=[la('<section class="hero" data-v-81833c9c><h1 class="hero-name" data-v-81833c9c>NR 语言</h1><p class="hero-text" data-v-81833c9c>参考手册</p><p class="hero-tagline" data-v-81833c9c>Nebula 词库引擎的领域特定语言</p><a class="hero-btn" href="#/v1.0/" data-v-81833c9c>开始阅读</a></section><section class="features" data-v-81833c9c><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>简洁语法</h3><p data-v-81833c9c>NR 采用直观的触发词-响应模式，头部空行分隔结构，让词库编写像写笔记一样自然。</p></div><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>动态类型</h3><p data-v-81833c9c>支持整数、浮点、字符串、布尔、对象、函数等类型，运行时自动推断，灵活高效。</p></div><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>模块化</h3><p data-v-81833c9c>支持文件/目录引入、跨包调用、热更新，轻松构建大型自动化文本生成系统。</p></div></section><section class="tools" data-v-81833c9c><h2 data-v-81833c9c>工具</h2><p data-v-81833c9c><a href="./vscode-nr/nr-language-1.0.0.vsix" data-v-81833c9c>下载 VS Code 语法高亮扩展 (.vsix)</a></p><p data-v-81833c9c>安装：VS Code → <code data-v-81833c9c>Ctrl+Shift+P</code> → &quot;Install from VSIX...&quot; → 选择下载的文件</p><p class="vsix-notice" data-v-81833c9c>注意：此插件仅提供最新版本，不保证历史版本兼容。</p></section><section class="info" data-v-81833c9c><h2 data-v-81833c9c>项目信息</h2><ul data-v-81833c9c><li data-v-81833c9c><strong data-v-81833c9c>引擎</strong>：Nebula 词库引擎</li><li data-v-81833c9c><strong data-v-81833c9c>实现语言</strong>：Rust</li><li data-v-81833c9c><strong data-v-81833c9c>许可证</strong>：Copyright (c) 2025 保留所有权利</li></ul></section>',4)])])}const jf=Ye(Hf,[["render",Bf],["__scopeId","data-v-81833c9c"]]);function hr(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let Ce=hr();function cl(n){Ce=n}const al=/[&<>"']/,Uf=new RegExp(al.source,"g"),ul=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Vf=new RegExp(ul.source,"g"),zf={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},mi=n=>zf[n];function On(n,e){if(e){if(al.test(n))return n.replace(Uf,mi)}else if(ul.test(n))return n.replace(Vf,mi);return n}const Gf=/(^|[^\[])\^/g;function nn(n,e){let t=typeof n=="string"?n:n.source;e=e||"";const s={replace:(r,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Gf,"$1"),t=t.replace(r,o),s},getRegex:()=>new RegExp(t,e)};return s}function _i(n){try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const gt={exec:()=>null};function bi(n,e){const t=n.replace(/\|/g,(i,o,l)=>{let c=!1,u=o;for(;--u>=0&&l[u]==="\\";)c=!c;return c?"|":" |"}),s=t.split(/ \|/);let r=0;if(s[0].trim()||s.shift(),s.length>0&&!s[s.length-1].trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;r<s.length;r++)s[r]=s[r].trim().replace(/\\\|/g,"|");return s}function tt(n,e,t){const s=n.length;if(s===0)return"";let r=0;for(;r<s&&n.charAt(s-r-1)===e;)r++;return n.slice(0,s-r)}function qf(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return-1}function xi(n,e,t,s){const r=e.href,i=e.title?On(e.title):null,o=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:r,title:i,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:r,title:i,text:On(o)}}function Kf(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const s=t[1];return e.split(`
`).map(r=>{const i=r.match(/^\s+/);if(i===null)return r;const[o]=i;return o.length>=s.length?r.slice(s.length):r}).join(`
`)}class Jt{constructor(e){tn(this,"options");tn(this,"rules");tn(this,"lexer");this.options=e||Ce}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(/^(?: {1,4}| {0,3}\t)/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:tt(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],r=Kf(s,t[3]||"");return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(/#$/.test(s)){const r=tt(s,"#");(this.options.pedantic||!r||/ $/.test(r))&&(s=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:tt(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=tt(t[0],`
`).split(`
`),r="",i="";const o=[];for(;s.length>0;){let l=!1;const c=[];let u;for(u=0;u<s.length;u++)if(/^ {0,3}>/.test(s[u]))c.push(s[u]),l=!0;else if(!l)c.push(s[u]);else break;s=s.slice(u);const a=c.join(`
`),d=a.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");r=r?`${r}
${a}`:a,i=i?`${i}
${d}`:d;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,s.length===0)break;const $=o[o.length-1];if(($==null?void 0:$.type)==="code")break;if(($==null?void 0:$.type)==="blockquote"){const y=$,w=y.raw+`
`+s.join(`
`),C=this.blockquote(w);o[o.length-1]=C,r=r.substring(0,r.length-y.raw.length)+C.raw,i=i.substring(0,i.length-y.text.length)+C.text;break}else if(($==null?void 0:$.type)==="list"){const y=$,w=y.raw+`
`+s.join(`
`),C=this.list(w);o[o.length-1]=C,r=r.substring(0,r.length-$.raw.length)+C.raw,i=i.substring(0,i.length-y.raw.length)+C.raw,s=w.substring(o[o.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const r=s.length>1,i={type:"list",raw:"",ordered:r,start:r?+s.slice(0,-1):"",loose:!1,items:[]};s=r?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=r?s:"[*+-]");const o=new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l=!1;for(;e;){let c=!1,u="",a="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let d=t[2].split(`
`,1)[0].replace(/^\t+/,L=>" ".repeat(3*L.length)),p=e.split(`
`,1)[0],$=!d.trim(),y=0;if(this.options.pedantic?(y=2,a=d.trimStart()):$?y=t[1].length+1:(y=t[2].search(/[^ ]/),y=y>4?1:y,a=d.slice(y),y+=t[1].length),$&&/^[ \t]*$/.test(p)&&(u+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const L=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),A=new RegExp(`^ {0,${Math.min(3,y-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),P=new RegExp(`^ {0,${Math.min(3,y-1)}}(?:\`\`\`|~~~)`),N=new RegExp(`^ {0,${Math.min(3,y-1)}}#`),J=new RegExp(`^ {0,${Math.min(3,y-1)}}<(?:[a-z].*>|!--)`,"i");for(;e;){const ln=e.split(`
`,1)[0];let W;if(p=ln,this.options.pedantic?(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  "),W=p):W=p.replace(/\t/g,"    "),P.test(p)||N.test(p)||J.test(p)||L.test(p)||A.test(p))break;if(W.search(/[^ ]/)>=y||!p.trim())a+=`
`+W.slice(y);else{if($||d.replace(/\t/g,"    ").search(/[^ ]/)>=4||P.test(d)||N.test(d)||A.test(d))break;a+=`
`+p}!$&&!p.trim()&&($=!0),u+=ln+`
`,e=e.substring(ln.length+1),d=W.slice(y)}}i.loose||(l?i.loose=!0:/\n[ \t]*\n[ \t]*$/.test(u)&&(l=!0));let w=null,C;this.options.gfm&&(w=/^\[[ xX]\] /.exec(a),w&&(C=w[0]!=="[ ] ",a=a.replace(/^\[[ xX]\] +/,""))),i.items.push({type:"list_item",raw:u,task:!!w,checked:C,loose:!1,text:a,tokens:[]}),i.raw+=u}i.items[i.items.length-1].raw=i.items[i.items.length-1].raw.trimEnd(),i.items[i.items.length-1].text=i.items[i.items.length-1].text.trimEnd(),i.raw=i.raw.trimEnd();for(let c=0;c<i.items.length;c++)if(this.lexer.state.top=!1,i.items[c].tokens=this.lexer.blockTokens(i.items[c].text,[]),!i.loose){const u=i.items[c].tokens.filter(d=>d.type==="space"),a=u.length>0&&u.some(d=>/\n.*\n/.test(d.raw));i.loose=a}if(i.loose)for(let c=0;c<i.items.length;c++)i.items[c].loose=!0;return i}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(/\s+/g," "),r=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:r,title:i}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const s=bi(t[1]),r=t[2].replace(/^\||\| *$/g,"").split("|"),i=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===r.length){for(const l of r)/^ *-+: *$/.test(l)?o.align.push("right"):/^ *:-+: *$/.test(l)?o.align.push("center"):/^ *:-+ *$/.test(l)?o.align.push("left"):o.align.push(null);for(let l=0;l<s.length;l++)o.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:o.align[l]});for(const l of i)o.rows.push(bi(l,o.header.length).map((c,u)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[u]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:On(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&/^</.test(s)){if(!/>$/.test(s))return;const o=tt(s.slice(0,-1),"\\");if((s.length-o.length)%2===0)return}else{const o=qf(t[2],"()");if(o>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let r=t[2],i="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);o&&(r=o[1],i=o[3])}else i=t[3]?t[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(s)?r=r.slice(1):r=r.slice(1,-1)),xi(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const r=(s[2]||s[1]).replace(/\s+/g," "),i=t[r.toLowerCase()];if(!i){const o=s[0].charAt(0);return{type:"text",raw:o,text:o}}return xi(s,i,s[0],this.lexer)}}emStrong(e,t,s=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&s.match(/[\p{L}\p{N}]/u))return;if(!(r[1]||r[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const o=[...r[0]].length-1;let l,c,u=o,a=0;const d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+o);(r=d.exec(t))!=null;){if(l=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!l)continue;if(c=[...l].length,r[3]||r[4]){u+=c;continue}else if((r[5]||r[6])&&o%3&&!((o+c)%3)){a+=c;continue}if(u-=c,u>0)continue;c=Math.min(c,c+u+a);const p=[...r[0]][0].length,$=e.slice(0,o+r.index+p+c);if(Math.min(o,c)%2){const w=$.slice(1,-1);return{type:"em",raw:$,text:w,tokens:this.lexer.inlineTokens(w)}}const y=$.slice(2,-2);return{type:"strong",raw:$,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(/\n/g," ");const r=/[^ ]/.test(s),i=/^ /.test(s)&&/ $/.test(s);return r&&i&&(s=s.substring(1,s.length-1)),s=On(s,!0),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,r;return t[2]==="@"?(s=On(t[1]),r="mailto:"+s):(s=On(t[1]),r=s),{type:"link",raw:t[0],text:s,href:r,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let r,i;if(t[2]==="@")r=On(t[0]),i="mailto:"+r;else{let o;do o=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(o!==t[0]);r=On(t[0]),t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let s;return this.lexer.state.inRawBlock?s=t[0]:s=On(t[0]),{type:"text",raw:t[0],text:s}}}}const Jf=/^(?:[ \t]*(?:\n|$))+/,Wf=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Yf=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Rt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zf=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,fl=/(?:[*+-]|\d{1,9}[.)])/,dl=nn(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,fl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),pr=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Qf=/^[^\n]+/,gr=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Xf=nn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",gr).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nd=nn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,fl).getRegex(),us="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",$r=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ed=nn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",$r).replace("tag",us).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),hl=nn(pr).replace("hr",Rt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",us).getRegex(),td=nn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",hl).getRegex(),mr={blockquote:td,code:Wf,def:Xf,fences:Yf,heading:Zf,hr:Rt,html:ed,lheading:dl,list:nd,newline:Jf,paragraph:hl,table:gt,text:Qf},vi=nn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Rt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",us).getRegex(),sd={...mr,table:vi,paragraph:nn(pr).replace("hr",Rt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",vi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",us).getRegex()},rd={...mr,html:nn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",$r).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:gt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:nn(pr).replace("hr",Rt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",dl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,id=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,gl=/^( {2,}|\\)\n(?!\s*$)/,od=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Tt="\\p{P}\\p{S}",ld=nn(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Tt).getRegex(),cd=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,ad=nn(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Tt).getRegex(),ud=nn("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Tt).getRegex(),fd=nn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Tt).getRegex(),dd=nn(/\\([punct])/,"gu").replace(/punct/g,Tt).getRegex(),hd=nn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pd=nn($r).replace("(?:-->|$)","-->").getRegex(),gd=nn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",pd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Wt=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,$d=nn(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Wt).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),$l=nn(/^!?\[(label)\]\[(ref)\]/).replace("label",Wt).replace("ref",gr).getRegex(),ml=nn(/^!?\[(ref)\](?:\[\])?/).replace("ref",gr).getRegex(),md=nn("reflink|nolink(?!\\()","g").replace("reflink",$l).replace("nolink",ml).getRegex(),_r={_backpedal:gt,anyPunctuation:dd,autolink:hd,blockSkip:cd,br:gl,code:id,del:gt,emStrongLDelim:ad,emStrongRDelimAst:ud,emStrongRDelimUnd:fd,escape:pl,link:$d,nolink:ml,punctuation:ld,reflink:$l,reflinkSearch:md,tag:gd,text:od,url:gt},_d={..._r,link:nn(/^!?\[(label)\]\((.*?)\)/).replace("label",Wt).getRegex(),reflink:nn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Wt).getRegex()},Us={..._r,escape:nn(pl).replace("])","~|])").getRegex(),url:nn(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},bd={...Us,br:nn(gl).replace("{2,}","*").getRegex(),text:nn(Us.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Pt={normal:mr,gfm:sd,pedantic:rd},st={normal:_r,gfm:Us,breaks:bd,pedantic:_d};class Mn{constructor(e){tn(this,"tokens");tn(this,"options");tn(this,"state");tn(this,"tokenizer");tn(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Ce,this.options.tokenizer=this.options.tokenizer||new Jt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Pt.normal,inline:st.normal};this.options.pedantic?(t.block=Pt.pedantic,t.inline=st.pedantic):this.options.gfm&&(t.block=Pt.gfm,this.options.breaks?t.inline=st.breaks:t.inline=st.gfm),this.tokenizer.rules=t}static get rules(){return{block:Pt,inline:st}}static lex(e,t){return new Mn(t).lex(e)}static lexInline(e,t){return new Mn(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.options.pedantic&&(e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""));let r,i,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(r=l.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),i=t[t.length-1],i&&(i.type==="paragraph"||i.type==="text")?(i.raw+=`
`+r.raw,i.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const c=e.slice(1);let u;this.options.extensions.startBlock.forEach(a=>{u=a.call({lexer:this},c),typeof u=="number"&&u>=0&&(l=Math.min(l,u))}),l<1/0&&l>=0&&(o=e.substring(0,l+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){i=t[t.length-1],s&&(i==null?void 0:i.type)==="paragraph"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(r),s=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),i=t[t.length-1],i&&i.type==="text"?(i.raw+=`
`+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):t.push(r);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let s,r,i,o=e,l,c,u;if(this.tokens.links){const a=Object.keys(this.tokens.links);if(a.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)a.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,l.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(c||(u=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(a=>(s=a.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))){if(s=this.tokenizer.escape(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.tag(e)){e=e.substring(s.raw.length),r=t[t.length-1],r&&s.type==="text"&&r.type==="text"?(r.raw+=s.raw,r.text+=s.text):t.push(s);continue}if(s=this.tokenizer.link(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(s.raw.length),r=t[t.length-1],r&&s.type==="text"&&r.type==="text"?(r.raw+=s.raw,r.text+=s.text):t.push(s);continue}if(s=this.tokenizer.emStrong(e,o,u)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.codespan(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.br(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.del(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.autolink(e)){e=e.substring(s.raw.length),t.push(s);continue}if(!this.state.inLink&&(s=this.tokenizer.url(e))){e=e.substring(s.raw.length),t.push(s);continue}if(i=e,this.options.extensions&&this.options.extensions.startInline){let a=1/0;const d=e.slice(1);let p;this.options.extensions.startInline.forEach($=>{p=$.call({lexer:this},d),typeof p=="number"&&p>=0&&(a=Math.min(a,p))}),a<1/0&&a>=0&&(i=e.substring(0,a+1))}if(s=this.tokenizer.inlineText(i)){e=e.substring(s.raw.length),s.raw.slice(-1)!=="_"&&(u=s.raw.slice(-1)),c=!0,r=t[t.length-1],r&&r.type==="text"?(r.raw+=s.raw,r.text+=s.text):t.push(s);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return t}}class Yt{constructor(e){tn(this,"options");tn(this,"parser");this.options=e||Ce}space(e){return""}code({text:e,lang:t,escaped:s}){var o;const r=(o=(t||"").match(/^\S*/))==null?void 0:o[0],i=e.replace(/\n$/,"")+`
`;return r?'<pre><code class="language-'+On(r)+'">'+(s?i:On(i,!0))+`</code></pre>
`:"<pre><code>"+(s?i:On(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,s=e.start;let r="";for(let l=0;l<e.items.length;l++){const c=e.items[l];r+=this.listitem(c)}const i=t?"ol":"ul",o=t&&s!==1?' start="'+s+'"':"";return"<"+i+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const r=this.parser.parseInline(s),i=_i(e);if(i===null)return r;e=i;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:s}){const r=_i(e);if(r===null)return s;e=r;let i=`<img src="${e}" alt="${s}"`;return t&&(i+=` title="${t}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class br{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class Ln{constructor(e){tn(this,"options");tn(this,"renderer");tn(this,"textRenderer");this.options=e||Ce,this.options.renderer=this.options.renderer||new Yt,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new br}static parse(e,t){return new Ln(t).parse(e)}static parseInline(e,t){return new Ln(t).parseInline(e)}parse(e,t=!0){let s="";for(let r=0;r<e.length;r++){const i=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const l=i,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=c||"";continue}}const o=i;switch(o.type){case"space":{s+=this.renderer.space(o);continue}case"hr":{s+=this.renderer.hr(o);continue}case"heading":{s+=this.renderer.heading(o);continue}case"code":{s+=this.renderer.code(o);continue}case"table":{s+=this.renderer.table(o);continue}case"blockquote":{s+=this.renderer.blockquote(o);continue}case"list":{s+=this.renderer.list(o);continue}case"html":{s+=this.renderer.html(o);continue}case"paragraph":{s+=this.renderer.paragraph(o);continue}case"text":{let l=o,c=this.renderer.text(l);for(;r+1<e.length&&e[r+1].type==="text";)l=e[++r],c+=`
`+this.renderer.text(l);t?s+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c}]}):s+=c;continue}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,t){t=t||this.renderer;let s="";for(let r=0;r<e.length;r++){const i=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]){const l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}const o=i;switch(o.type){case"escape":{s+=t.text(o);break}case"html":{s+=t.html(o);break}case"link":{s+=t.link(o);break}case"image":{s+=t.image(o);break}case"strong":{s+=t.strong(o);break}case"em":{s+=t.em(o);break}case"codespan":{s+=t.codespan(o);break}case"br":{s+=t.br(o);break}case"del":{s+=t.del(o);break}case"text":{s+=t.text(o);break}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}}class $t{constructor(e){tn(this,"options");tn(this,"block");this.options=e||Ce}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Mn.lex:Mn.lexInline}provideParser(){return this.block?Ln.parse:Ln.parseInline}}tn($t,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class xd{constructor(...e){tn(this,"defaults",hr());tn(this,"options",this.setOptions);tn(this,"parse",this.parseMarkdown(!0));tn(this,"parseInline",this.parseMarkdown(!1));tn(this,"Parser",Ln);tn(this,"Renderer",Yt);tn(this,"TextRenderer",br);tn(this,"Lexer",Mn);tn(this,"Tokenizer",Jt);tn(this,"Hooks",$t);this.use(...e)}walkTokens(e,t){var r,i;let s=[];for(const o of e)switch(s=s.concat(t.call(this,o)),o.type){case"table":{const l=o;for(const c of l.header)s=s.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const u of c)s=s.concat(this.walkTokens(u.tokens,t));break}case"list":{const l=o;s=s.concat(this.walkTokens(l.items,t));break}default:{const l=o;(i=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&i[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const u=l[c].flat(1/0);s=s.concat(this.walkTokens(u,t))}):l.tokens&&(s=s.concat(this.walkTokens(l.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const r={...s};if(r.async=this.defaults.async||r.async||!1,s.extensions&&(s.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){const o=t.renderers[i.name];o?t.renderers[i.name]=function(...l){let c=i.renderer.apply(this,l);return c===!1&&(c=o.apply(this,l)),c}:t.renderers[i.name]=i.renderer}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[i.level];o?o.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),r.extensions=t),s.renderer){const i=this.defaults.renderer||new Yt(this.defaults);for(const o in s.renderer){if(!(o in i))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const l=o,c=s.renderer[l],u=i[l];i[l]=(...a)=>{let d=c.apply(i,a);return d===!1&&(d=u.apply(i,a)),d||""}}r.renderer=i}if(s.tokenizer){const i=this.defaults.tokenizer||new Jt(this.defaults);for(const o in s.tokenizer){if(!(o in i))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const l=o,c=s.tokenizer[l],u=i[l];i[l]=(...a)=>{let d=c.apply(i,a);return d===!1&&(d=u.apply(i,a)),d}}r.tokenizer=i}if(s.hooks){const i=this.defaults.hooks||new $t;for(const o in s.hooks){if(!(o in i))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const l=o,c=s.hooks[l],u=i[l];$t.passThroughHooks.has(o)?i[l]=a=>{if(this.defaults.async)return Promise.resolve(c.call(i,a)).then(p=>u.call(i,p));const d=c.call(i,a);return u.call(i,d)}:i[l]=(...a)=>{let d=c.apply(i,a);return d===!1&&(d=u.apply(i,a)),d}}r.hooks=i}if(s.walkTokens){const i=this.defaults.walkTokens,o=s.walkTokens;r.walkTokens=function(l){let c=[];return c.push(o.call(this,l)),i&&(c=c.concat(i.call(this,l))),c}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Mn.lex(e,t??this.defaults)}parser(e,t){return Ln.parse(e,t??this.defaults)}parseMarkdown(e){return(s,r)=>{const i={...r},o={...this.defaults,...i},l=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&i.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof s>"u"||s===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const c=o.hooks?o.hooks.provideLexer():e?Mn.lex:Mn.lexInline,u=o.hooks?o.hooks.provideParser():e?Ln.parse:Ln.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(s):s).then(a=>c(a,o)).then(a=>o.hooks?o.hooks.processAllTokens(a):a).then(a=>o.walkTokens?Promise.all(this.walkTokens(a,o.walkTokens)).then(()=>a):a).then(a=>u(a,o)).then(a=>o.hooks?o.hooks.postprocess(a):a).catch(l);try{o.hooks&&(s=o.hooks.preprocess(s));let a=c(s,o);o.hooks&&(a=o.hooks.processAllTokens(a)),o.walkTokens&&this.walkTokens(a,o.walkTokens);let d=u(a,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(a){return l(a)}}}onError(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const r="<p>An error occurred:</p><pre>"+On(s.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(s);throw s}}}const Ne=new xd;function Y(n,e){return Ne.parse(n,e)}Y.options=Y.setOptions=function(n){return Ne.setOptions(n),Y.defaults=Ne.defaults,cl(Y.defaults),Y};Y.getDefaults=hr;Y.defaults=Ce;Y.use=function(...n){return Ne.use(...n),Y.defaults=Ne.defaults,cl(Y.defaults),Y};Y.walkTokens=function(n,e){return Ne.walkTokens(n,e)};Y.parseInline=Ne.parseInline;Y.Parser=Ln;Y.parser=Ln.parse;Y.Renderer=Yt;Y.TextRenderer=br;Y.Lexer=Mn;Y.lexer=Mn.lex;Y.Tokenizer=Jt;Y.Hooks=$t;Y.parse=Y;Y.options;Y.setOptions;Y.use;Y.walkTokens;Y.parseInline;Ln.parse;Mn.lex;const vd={key:0,class:"doc-footer"},yd={class:"doc-footer-inner"},wd=["href"],kd={class:"footer-text"},Sd={key:1,class:"footer-link prev placeholder"},Rd=["href"],Td={class:"footer-text"},Ed={key:3,class:"footer-link next placeholder"},Ad={__name:"DocFooter",setup(n){const{prev:e,next:t}=lf();return(s,r)=>dn(e)||dn(t)?(on(),an("nav",vd,[j("div",yd,[dn(e)?(on(),an("a",{key:0,href:"#"+dn(e).link,class:"footer-link prev"},[r[0]||(r[0]=j("span",{class:"footer-label"},"上一章",-1)),j("span",kd,de(dn(e).text),1)],8,wd)):(on(),an("div",Sd)),dn(t)?(on(),an("a",{key:2,href:"#"+dn(t).link,class:"footer-link next"},[r[1]||(r[1]=j("span",{class:"footer-label"},"下一章",-1)),j("span",Td,de(dn(t).text),1)],8,Rd)):(on(),an("div",Ed))])])):cr("",!0)}},Od=Ye(Ad,[["__scopeId","data-v-c9726e4b"]]),Nd=["innerHTML"],yi={__name:"MarkdownPage",setup(n){const e=dr(),t=Object.assign({"../../v1.0/canvas.md":Vo,"../../v1.0/control-flow.md":zo,"../../v1.0/entries.md":Go,"../../v1.0/expressions.md":qo,"../../v1.0/file.md":Ko,"../../v1.0/flow-output.md":Jo,"../../v1.0/functions.md":Wo,"../../v1.0/index.md":Yo,"../../v1.0/json.md":Zo,"../../v1.0/lexical.md":Qo,"../../v1.0/math.md":Xo,"../../v1.0/modules.md":nl,"../../v1.0/network.md":el,"../../v1.0/oop.md":tl,"../../v1.0/string.md":sl,"../../v1.0/type.md":rl,"../../v1.0/types.md":il,"../../v1.0/variables.md":ol});function s(i){return i.replace(/\]\(\.\/([^)]*?)\)/g,(o,l)=>/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(l)||l.startsWith("http")?o:`](#/v1.0/${l})`)}const r=In(()=>{let i;e.path==="/v1.0/"?i="../../v1.0/index.md":i=`../../v1.0/${e.params.page}.md`;const o=t[i];return o?Y.parse(s(o),{gfm:!0,breaks:!1}):"<p>页面未找到</p>"});return(i,o)=>(on(),an(Sn,null,[j("article",{class:"markdown-body",innerHTML:r.value},null,8,Nd),gn(Od)],64))}},Pd=of({history:Du(),routes:[{path:"/",component:jf},{path:"/v1.0",redirect:"/v1.0/"},{path:"/v1.0/",component:yi},{path:"/v1.0/:page",component:yi}]});Wa(Df).use(Pd).mount("#app");
