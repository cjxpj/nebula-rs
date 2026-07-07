var Od=Object.defineProperty;var Pd=(n,e,t)=>e in n?Od(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var an=(n,e,t)=>Pd(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function si(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const un={},Xe=[],ae=()=>{},Gr=()=>!1,ds=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),as=n=>n.startsWith("onUpdate:"),yn=Object.assign,ii=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Cd=Object.prototype.hasOwnProperty,tn=(n,e)=>Cd.call(n,e),B=Array.isArray,nt=n=>Lt(n)==="[object Map]",zr=n=>Lt(n)==="[object Set]",Mi=n=>Lt(n)==="[object Date]",j=n=>typeof n=="function",$n=n=>typeof n=="string",fe=n=>typeof n=="symbol",sn=n=>n!==null&&typeof n=="object",Vr=n=>(sn(n)||j(n))&&j(n.then)&&j(n.catch),qr=Object.prototype.toString,Lt=n=>qr.call(n),Nd=n=>Lt(n).slice(8,-1),Jr=n=>Lt(n)==="[object Object]",ri=n=>$n(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,gt=si(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),us=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Id=/-\w/g,Mn=us(n=>n.replace(Id,e=>e.slice(1).toUpperCase())),Ld=/\B([A-Z])/g,Ve=us(n=>n.replace(Ld,"-$1").toLowerCase()),fs=us(n=>n.charAt(0).toUpperCase()+n.slice(1)),ks=us(n=>n?`on${fs(n)}`:""),de=(n,e)=>!Object.is(n,e),qt=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Kr=(n,e,t,s=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:s,value:t})},oi=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Md=n=>{const e=$n(n)?Number(n):NaN;return isNaN(e)?n:e};let Di;const hs=()=>Di||(Di=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function li(n){if(B(n)){const e={};for(let t=0;t<n.length;t++){const s=n[t],i=$n(s)?Fd(s):li(s);if(i)for(const r in i)e[r]=i[r]}return e}else if($n(n)||sn(n))return n}const Dd=/;(?![^(]*\))/g,Hd=/:([^]+)/,Bd=/\/\*[^]*?\*\//g;function Fd(n){const e={};return n.replace(Bd,"").split(Dd).forEach(t=>{if(t){const s=t.split(Hd);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Zn(n){let e="";if($n(n))e=n;else if(B(n))for(let t=0;t<n.length;t++){const s=Zn(n[t]);s&&(e+=s+" ")}else if(sn(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const jd="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Ud=si(jd);function Wr(n){return!!n||n===""}function Gd(n,e){if(n.length!==e.length)return!1;let t=!0;for(let s=0;t&&s<n.length;s++)t=ci(n[s],e[s]);return t}function ci(n,e){if(n===e)return!0;let t=Mi(n),s=Mi(e);if(t||s)return t&&s?n.getTime()===e.getTime():!1;if(t=fe(n),s=fe(e),t||s)return n===e;if(t=B(n),s=B(e),t||s)return t&&s?Gd(n,e):!1;if(t=sn(n),s=sn(e),t||s){if(!t||!s)return!1;const i=Object.keys(n).length,r=Object.keys(e).length;if(i!==r)return!1;for(const o in n){const l=n.hasOwnProperty(o),c=e.hasOwnProperty(o);if(l&&!c||!l&&c||!ci(n[o],e[o]))return!1}}return String(n)===String(e)}const Yr=n=>!!(n&&n.__v_isRef===!0),Sn=n=>$n(n)?n:n==null?"":B(n)||sn(n)&&(n.toString===qr||!j(n.toString))?Yr(n)?Sn(n.value):JSON.stringify(n,Zr,2):String(n),Zr=(n,e)=>Yr(e)?Zr(n,e.value):nt(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[s,i],r)=>(t[ws(s,r)+" =>"]=i,t),{})}:zr(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>ws(t))}:fe(e)?ws(e):sn(e)&&!B(e)&&!Jr(e)?String(e):e,ws=(n,e="")=>{var t;return fe(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Tn;class zd{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&Tn&&(Tn.active?(this.parent=Tn,this.index=(Tn.scopes||(Tn.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=Tn;try{return Tn=this,e()}finally{Tn=t}}}on(){++this._on===1&&(this.prevScope=Tn,Tn=this)}off(){if(this._on>0&&--this._on===0){if(Tn===this)Tn=this.prevScope;else{let e=Tn;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,s;for(t=0,s=this.effects.length;t<s;t++)this.effects[t].stop();for(this.effects.length=0,t=0,s=this.cleanups.length;t<s;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,s=this.scopes.length;t<s;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0}}}function Vd(){return Tn}let hn;const Ts=new WeakSet;class Qr{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Tn&&(Tn.active?Tn.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ts.has(this)&&(Ts.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||no(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Hi(this),eo(this);const e=hn,t=Qn;hn=this,Qn=!0;try{return this.fn()}finally{to(this),hn=e,Qn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)ui(e);this.deps=this.depsTail=void 0,Hi(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ts.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Bs(this)&&this.run()}get dirty(){return Bs(this)}}let Xr=0,mt,_t;function no(n,e=!1){if(n.flags|=8,e){n.next=_t,_t=n;return}n.next=mt,mt=n}function di(){Xr++}function ai(){if(--Xr>0)return;if(_t){let e=_t;for(_t=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;mt;){let e=mt;for(mt=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){n||(n=s)}e=t}}if(n)throw n}function eo(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function to(n){let e,t=n.depsTail,s=t;for(;s;){const i=s.prevDep;s.version===-1?(s===t&&(t=i),ui(s),qd(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=i}n.deps=e,n.depsTail=t}function Bs(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(so(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function so(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Et)||(n.globalVersion=Et,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Bs(n))))return;n.flags|=2;const e=n.dep,t=hn,s=Qn;hn=n,Qn=!0;try{eo(n);const i=n.fn(n._value);(e.version===0||de(i,n._value))&&(n.flags|=128,n._value=i,e.version++)}catch(i){throw e.version++,i}finally{hn=t,Qn=s,to(n),n.flags&=-3}}function ui(n,e=!1){const{dep:t,prevSub:s,nextSub:i}=n;if(s&&(s.nextSub=i,n.prevSub=void 0),i&&(i.prevSub=s,n.nextSub=void 0),t.subs===n&&(t.subs=s,!s&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)ui(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function qd(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Qn=!0;const io=[];function he(){io.push(Qn),Qn=!1}function pe(){const n=io.pop();Qn=n===void 0?!0:n}function Hi(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=hn;hn=void 0;try{e()}finally{hn=t}}}let Et=0;class Jd{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class fi{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!hn||!Qn||hn===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==hn)t=this.activeLink=new Jd(hn,this),hn.deps?(t.prevDep=hn.depsTail,hn.depsTail.nextDep=t,hn.depsTail=t):hn.deps=hn.depsTail=t,ro(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const s=t.nextDep;s.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=s),t.prevDep=hn.depsTail,t.nextDep=void 0,hn.depsTail.nextDep=t,hn.depsTail=t,hn.deps===t&&(hn.deps=s)}return t}trigger(e){this.version++,Et++,this.notify(e)}notify(e){di();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{ai()}}}function ro(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)ro(s)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Fs=new WeakMap,je=Symbol(""),js=Symbol(""),Rt=Symbol("");function Rn(n,e,t){if(Qn&&hn){let s=Fs.get(n);s||Fs.set(n,s=new Map);let i=s.get(t);i||(s.set(t,i=new fi),i.map=s,i.key=t),i.track()}}function xe(n,e,t,s,i,r){const o=Fs.get(n);if(!o){Et++;return}const l=c=>{c&&c.trigger()};if(di(),e==="clear")o.forEach(l);else{const c=B(n),a=c&&ri(t);if(c&&t==="length"){const d=Number(s);o.forEach((u,p)=>{(p==="length"||p===Rt||!fe(p)&&p>=d)&&l(u)})}else switch((t!==void 0||o.has(void 0))&&l(o.get(t)),a&&l(o.get(Rt)),e){case"add":c?a&&l(o.get("length")):(l(o.get(je)),nt(n)&&l(o.get(js)));break;case"delete":c||(l(o.get(je)),nt(n)&&l(o.get(js)));break;case"set":nt(n)&&l(o.get(je));break}}ai()}function We(n){const e=Q(n);return e===n?e:(Rn(e,"iterate",Rt),Wn(n)?e:e.map(Xn))}function ps(n){return Rn(n=Q(n),"iterate",Rt),n}function le(n,e){return ke(n)?st(Ue(n)?Xn(e):e):Xn(e)}const Kd={__proto__:null,[Symbol.iterator](){return Ss(this,Symbol.iterator,n=>le(this,n))},concat(...n){return We(this).concat(...n.map(e=>B(e)?We(e):e))},entries(){return Ss(this,"entries",n=>(n[1]=le(this,n[1]),n))},every(n,e){return ge(this,"every",n,e,void 0,arguments)},filter(n,e){return ge(this,"filter",n,e,t=>t.map(s=>le(this,s)),arguments)},find(n,e){return ge(this,"find",n,e,t=>le(this,t),arguments)},findIndex(n,e){return ge(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return ge(this,"findLast",n,e,t=>le(this,t),arguments)},findLastIndex(n,e){return ge(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return ge(this,"forEach",n,e,void 0,arguments)},includes(...n){return Es(this,"includes",n)},indexOf(...n){return Es(this,"indexOf",n)},join(n){return We(this).join(n)},lastIndexOf(...n){return Es(this,"lastIndexOf",n)},map(n,e){return ge(this,"map",n,e,void 0,arguments)},pop(){return ct(this,"pop")},push(...n){return ct(this,"push",n)},reduce(n,...e){return Bi(this,"reduce",n,e)},reduceRight(n,...e){return Bi(this,"reduceRight",n,e)},shift(){return ct(this,"shift")},some(n,e){return ge(this,"some",n,e,void 0,arguments)},splice(...n){return ct(this,"splice",n)},toReversed(){return We(this).toReversed()},toSorted(n){return We(this).toSorted(n)},toSpliced(...n){return We(this).toSpliced(...n)},unshift(...n){return ct(this,"unshift",n)},values(){return Ss(this,"values",n=>le(this,n))}};function Ss(n,e,t){const s=ps(n),i=s[e]();return s!==n&&!Wn(n)&&(i._next=i.next,i.next=()=>{const r=i._next();return r.done||(r.value=t(r.value)),r}),i}const Wd=Array.prototype;function ge(n,e,t,s,i,r){const o=ps(n),l=o!==n&&!Wn(n),c=o[e];if(c!==Wd[e]){const u=c.apply(n,r);return l?Xn(u):u}let a=t;o!==n&&(l?a=function(u,p){return t.call(this,le(n,u),p,n)}:t.length>2&&(a=function(u,p){return t.call(this,u,p,n)}));const d=c.call(o,a,s);return l&&i?i(d):d}function Bi(n,e,t,s){const i=ps(n),r=i!==n&&!Wn(n);let o=t,l=!1;i!==n&&(r?(l=s.length===0,o=function(a,d,u){return l&&(l=!1,a=le(n,a)),t.call(this,a,le(n,d),u,n)}):t.length>3&&(o=function(a,d,u){return t.call(this,a,d,u,n)}));const c=i[e](o,...s);return l?le(n,c):c}function Es(n,e,t){const s=Q(n);Rn(s,"iterate",Rt);const i=s[e](...t);return(i===-1||i===!1)&&$i(t[0])?(t[0]=Q(t[0]),s[e](...t)):i}function ct(n,e,t=[]){he(),di();const s=Q(n)[e].apply(n,t);return ai(),pe(),s}const Yd=si("__proto__,__v_isRef,__isVue"),oo=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(fe));function Zd(n){fe(n)||(n=String(n));const e=Q(this);return Rn(e,"has",n),e.hasOwnProperty(n)}class lo{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,s){if(t==="__v_skip")return e.__v_skip;const i=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return r;if(t==="__v_raw")return s===(i?r?la:fo:r?uo:ao).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=B(e);if(!i){let c;if(o&&(c=Kd[t]))return c;if(t==="hasOwnProperty")return Zd}const l=Reflect.get(e,t,On(e)?e:s);if((fe(t)?oo.has(t):Yd(t))||(i||Rn(e,"get",t),r))return l;if(On(l)){const c=o&&ri(t)?l:l.value;return i&&sn(c)?Gs(c):c}return sn(l)?i?Gs(l):Mt(l):l}}class co extends lo{constructor(e=!1){super(!1,e)}set(e,t,s,i){let r=e[t];const o=B(e)&&ri(t);if(!this._isShallow){const a=ke(r);if(!Wn(s)&&!ke(s)&&(r=Q(r),s=Q(s)),!o&&On(r)&&!On(s))return a||(r.value=s),!0}const l=o?Number(t)<e.length:tn(e,t),c=Reflect.set(e,t,s,On(e)?e:i);return e===Q(i)&&c&&(l?de(s,r)&&xe(e,"set",t,s):xe(e,"add",t,s)),c}deleteProperty(e,t){const s=tn(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&s&&xe(e,"delete",t,void 0),i}has(e,t){const s=Reflect.has(e,t);return(!fe(t)||!oo.has(t))&&Rn(e,"has",t),s}ownKeys(e){return Rn(e,"iterate",B(e)?"length":je),Reflect.ownKeys(e)}}class Qd extends lo{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const Xd=new co,na=new Qd,ea=new co(!0);const Us=n=>n,jt=n=>Reflect.getPrototypeOf(n);function ta(n,e,t){return function(...s){const i=this.__v_raw,r=Q(i),o=nt(r),l=n==="entries"||n===Symbol.iterator&&o,c=n==="keys"&&o,a=i[n](...s),d=t?Us:e?st:Xn;return!e&&Rn(r,"iterate",c?js:je),yn(Object.create(a),{next(){const{value:u,done:p}=a.next();return p?{value:u,done:p}:{value:l?[d(u[0]),d(u[1])]:d(u),done:p}}})}}function Ut(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function sa(n,e){const t={get(i){const r=this.__v_raw,o=Q(r),l=Q(i);n||(de(i,l)&&Rn(o,"get",i),Rn(o,"get",l));const{has:c}=jt(o),a=e?Us:n?st:Xn;if(c.call(o,i))return a(r.get(i));if(c.call(o,l))return a(r.get(l));r!==o&&r.get(i)},get size(){const i=this.__v_raw;return!n&&Rn(Q(i),"iterate",je),i.size},has(i){const r=this.__v_raw,o=Q(r),l=Q(i);return n||(de(i,l)&&Rn(o,"has",i),Rn(o,"has",l)),i===l?r.has(i):r.has(i)||r.has(l)},forEach(i,r){const o=this,l=o.__v_raw,c=Q(l),a=e?Us:n?st:Xn;return!n&&Rn(c,"iterate",je),l.forEach((d,u)=>i.call(r,a(d),a(u),o))}};return yn(t,n?{add:Ut("add"),set:Ut("set"),delete:Ut("delete"),clear:Ut("clear")}:{add(i){const r=Q(this),o=jt(r),l=Q(i),c=!e&&!Wn(i)&&!ke(i)?l:i;return o.has.call(r,c)||de(i,c)&&o.has.call(r,i)||de(l,c)&&o.has.call(r,l)||(r.add(c),xe(r,"add",c,c)),this},set(i,r){!e&&!Wn(r)&&!ke(r)&&(r=Q(r));const o=Q(this),{has:l,get:c}=jt(o);let a=l.call(o,i);a||(i=Q(i),a=l.call(o,i));const d=c.call(o,i);return o.set(i,r),a?de(r,d)&&xe(o,"set",i,r):xe(o,"add",i,r),this},delete(i){const r=Q(this),{has:o,get:l}=jt(r);let c=o.call(r,i);c||(i=Q(i),c=o.call(r,i)),l&&l.call(r,i);const a=r.delete(i);return c&&xe(r,"delete",i,void 0),a},clear(){const i=Q(this),r=i.size!==0,o=i.clear();return r&&xe(i,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(i=>{t[i]=ta(i,n,e)}),t}function hi(n,e){const t=sa(n,e);return(s,i,r)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?s:Reflect.get(tn(t,i)&&i in s?t:s,i,r)}const ia={get:hi(!1,!1)},ra={get:hi(!1,!0)},oa={get:hi(!0,!1)};const ao=new WeakMap,uo=new WeakMap,fo=new WeakMap,la=new WeakMap;function ca(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Mt(n){return ke(n)?n:pi(n,!1,Xd,ia,ao)}function ho(n){return pi(n,!1,ea,ra,uo)}function Gs(n){return pi(n,!0,na,oa,fo)}function pi(n,e,t,s,i){if(!sn(n)||n.__v_raw&&!(e&&n.__v_isReactive)||n.__v_skip||!Object.isExtensible(n))return n;const r=i.get(n);if(r)return r;const o=ca(Nd(n));if(o===0)return n;const l=new Proxy(n,o===2?s:t);return i.set(n,l),l}function Ue(n){return ke(n)?Ue(n.__v_raw):!!(n&&n.__v_isReactive)}function ke(n){return!!(n&&n.__v_isReadonly)}function Wn(n){return!!(n&&n.__v_isShallow)}function $i(n){return n?!!n.__v_raw:!1}function Q(n){const e=n&&n.__v_raw;return e?Q(e):n}function da(n){return!tn(n,"__v_skip")&&Object.isExtensible(n)&&Kr(n,"__v_skip",!0),n}const Xn=n=>sn(n)?Mt(n):n,st=n=>sn(n)?Gs(n):n;function On(n){return n?n.__v_isRef===!0:!1}function Be(n){return po(n,!1)}function aa(n){return po(n,!0)}function po(n,e){return On(n)?n:new ua(n,e)}class ua{constructor(e,t){this.dep=new fi,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:Q(e),this._value=t?e:Xn(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,s=this.__v_isShallow||Wn(e)||ke(e);e=s?e:Q(e),de(e,t)&&(this._rawValue=e,this._value=s?e:Xn(e),this.dep.trigger())}}function vn(n){return On(n)?n.value:n}const fa={get:(n,e,t)=>e==="__v_raw"?n:vn(Reflect.get(n,e,t)),set:(n,e,t,s)=>{const i=n[e];return On(i)&&!On(t)?(i.value=t,!0):Reflect.set(n,e,t,s)}};function $o(n){return Ue(n)?n:new Proxy(n,fa)}class ha{constructor(e,t,s){this.fn=e,this.setter=t,this._value=void 0,this.dep=new fi(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Et-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&hn!==this)return no(this,!0),!0}get value(){const e=this.dep.track();return so(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function pa(n,e,t=!1){let s,i;return j(n)?s=n:(s=n.get,i=n.set),new ha(s,i,t)}const Gt={},Zt=new WeakMap;let Me;function $a(n,e=!1,t=Me){if(t){let s=Zt.get(t);s||Zt.set(t,s=[]),s.push(n)}}function ga(n,e,t=un){const{immediate:s,deep:i,once:r,scheduler:o,augmentJob:l,call:c}=t,a=O=>i?O:Wn(O)||i===!1||i===0?ye(O,1):ye(O);let d,u,p,$,x=!1,k=!1;if(On(n)?(u=()=>n.value,x=Wn(n)):Ue(n)?(u=()=>a(n),x=!0):B(n)?(k=!0,x=n.some(O=>Ue(O)||Wn(O)),u=()=>n.map(O=>{if(On(O))return O.value;if(Ue(O))return a(O);if(j(O))return c?c(O,2):O()})):j(n)?e?u=c?()=>c(n,2):n:u=()=>{if(p){he();try{p()}finally{pe()}}const O=Me;Me=d;try{return c?c(n,3,[$]):n($)}finally{Me=O}}:u=ae,e&&i){const O=u,q=i===!0?1/0:i;u=()=>ye(O(),q)}const I=Vd(),L=()=>{d.stop(),I&&I.active&&ii(I.effects,d)};if(r&&e){const O=e;e=(...q)=>{const W=O(...q);return L(),W}}let E=k?new Array(n.length).fill(Gt):Gt;const N=O=>{if(!(!(d.flags&1)||!d.dirty&&!O))if(e){const q=d.run();if(O||i||x||(k?q.some((W,J)=>de(W,E[J])):de(q,E))){p&&p();const W=Me;Me=d;try{const J=[q,E===Gt?void 0:k&&E[0]===Gt?[]:E,$];E=q,c?c(e,3,J):e(...J)}finally{Me=W}}}else d.run()};return l&&l(N),d=new Qr(u),d.scheduler=o?()=>o(N,!1):N,$=O=>$a(O,!1,d),p=d.onStop=()=>{const O=Zt.get(d);if(O){if(c)c(O,4);else for(const q of O)q();Zt.delete(d)}},e?s?N(!0):E=d.run():o?o(N.bind(null,!0),!0):d.run(),L.pause=d.pause.bind(d),L.resume=d.resume.bind(d),L.stop=L,L}function ye(n,e=1/0,t){if(e<=0||!sn(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,On(n))ye(n.value,e,t);else if(B(n))for(let s=0;s<n.length;s++)ye(n[s],e,t);else if(zr(n)||nt(n))n.forEach(s=>{ye(s,e,t)});else if(Jr(n)){for(const s in n)ye(n[s],e,t);for(const s of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,s)&&ye(n[s],e,t)}return n}/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Dt(n,e,t,s){try{return s?n(...s):n()}catch(i){$s(i,e,t)}}function Yn(n,e,t,s){if(j(n)){const i=Dt(n,e,t,s);return i&&Vr(i)&&i.catch(r=>{$s(r,e,t)}),i}if(B(n)){const i=[];for(let r=0;r<n.length;r++)i.push(Yn(n[r],e,t,s));return i}}function $s(n,e,t,s=!0){const i=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||un;if(e){let l=e.parent;const c=e.proxy,a=`https://vuejs.org/error-reference/#runtime-${t}`;for(;l;){const d=l.ec;if(d){for(let u=0;u<d.length;u++)if(d[u](n,c,a)===!1)return}l=l.parent}if(r){he(),Dt(r,null,10,[n,c,a]),pe();return}}ma(n,t,i,s,o)}function ma(n,e,t,s=!0,i=!1){if(i)throw n;console.error(n)}const Nn=[];let oe=-1;const et=[];let Re=null,Ye=0;const go=Promise.resolve();let Qt=null;function gi(n){const e=Qt||go;return n?e.then(this?n.bind(this):n):e}function _a(n){let e=oe+1,t=Nn.length;for(;e<t;){const s=e+t>>>1,i=Nn[s],r=At(i);r<n||r===n&&i.flags&2?e=s+1:t=s}return e}function mi(n){if(!(n.flags&1)){const e=At(n),t=Nn[Nn.length-1];!t||!(n.flags&2)&&e>=At(t)?Nn.push(n):Nn.splice(_a(e),0,n),n.flags|=1,mo()}}function mo(){Qt||(Qt=go.then(vo))}function va(n){B(n)?et.push(...n):Re&&n.id===-1?Re.splice(Ye+1,0,n):n.flags&1||(et.push(n),n.flags|=1),mo()}function Fi(n,e,t=oe+1){for(;t<Nn.length;t++){const s=Nn[t];if(s&&s.flags&2){if(n&&s.id!==n.uid)continue;Nn.splice(t,1),t--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function _o(n){if(et.length){const e=[...new Set(et)].sort((t,s)=>At(t)-At(s));if(et.length=0,Re){Re.push(...e);return}for(Re=e,Ye=0;Ye<Re.length;Ye++){const t=Re[Ye];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Re=null,Ye=0}}const At=n=>n.id==null?n.flags&2?-1:1/0:n.id;function vo(n){try{for(oe=0;oe<Nn.length;oe++){const e=Nn[oe];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Dt(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;oe<Nn.length;oe++){const e=Nn[oe];e&&(e.flags&=-2)}oe=-1,Nn.length=0,_o(),Qt=null,(Nn.length||et.length)&&vo()}}let Un=null,bo=null;function Xt(n){const e=Un;return Un=n,bo=n&&n.type.__scopeId||null,e}function xo(n,e=Un,t){if(!e||n._n)return n;const s=(...i)=>{s._d&&ts(-1);const r=Xt(e);let o;try{o=n(...i)}finally{Xt(r),s._d&&ts(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function ba(n,e){if(Un===null)return n;const t=bs(Un),s=n.dirs||(n.dirs=[]);for(let i=0;i<e.length;i++){let[r,o,l,c=un]=e[i];r&&(j(r)&&(r={mounted:r,updated:r}),r.deep&&ye(o),s.push({dir:r,instance:t,value:o,oldValue:void 0,arg:l,modifiers:c}))}return n}function Ce(n,e,t,s){const i=n.dirs,r=e&&e.dirs;for(let o=0;o<i.length;o++){const l=i[o];r&&(l.oldValue=r[o].value);let c=l.dir[s];c&&(he(),Yn(c,t,8,[n.el,l,n,e]),pe())}}function Jt(n,e){if(An){let t=An.provides;const s=An.parent&&An.parent.provides;s===t&&(t=An.provides=Object.create(s)),t[n]=e}}function ue(n,e,t=!1){const s=el();if(s||tt){let i=tt?tt._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(i&&n in i)return i[n];if(arguments.length>1)return t&&j(e)?e.call(s&&s.proxy):e}}const xa=Symbol.for("v-scx"),ya=()=>ue(xa);function ka(n,e){return _i(n,null,e)}function vt(n,e,t){return _i(n,e,t)}function _i(n,e,t=un){const{immediate:s,deep:i,flush:r,once:o}=t,l=yn({},t),c=e&&s||!e&&r!=="post";let a;if(Ct){if(r==="sync"){const $=ya();a=$.__watcherHandles||($.__watcherHandles=[])}else if(!c){const $=()=>{};return $.stop=ae,$.resume=ae,$.pause=ae,$}}const d=An;l.call=($,x,k)=>Yn($,d,x,k);let u=!1;r==="post"?l.scheduler=$=>{Hn($,d&&d.suspense)}:r!=="sync"&&(u=!0,l.scheduler=($,x)=>{x?$():mi($)}),l.augmentJob=$=>{e&&($.flags|=4),u&&($.flags|=2,d&&($.id=d.uid,$.i=d))};const p=ga(n,e,l);return Ct&&(a?a.push(p):c&&p()),p}function wa(n,e,t){const s=this.proxy,i=$n(n)?n.includes(".")?yo(s,n):()=>s[n]:n.bind(s,s);let r;j(e)?r=e:(r=e.handler,t=e);const o=Ht(this),l=_i(i,r.bind(s),t);return o(),l}function yo(n,e){const t=e.split(".");return()=>{let s=n;for(let i=0;i<t.length&&s;i++)s=s[t[i]];return s}}const Ta=Symbol("_vte"),ko=n=>n.__isTeleport,qn=Symbol("_leaveCb"),dt=Symbol("_enterCb");function Sa(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Co(()=>{n.isMounted=!0}),No(()=>{n.isUnmounting=!0}),n}const Vn=[Function,Array],wo={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Vn,onEnter:Vn,onAfterEnter:Vn,onEnterCancelled:Vn,onBeforeLeave:Vn,onLeave:Vn,onAfterLeave:Vn,onLeaveCancelled:Vn,onBeforeAppear:Vn,onAppear:Vn,onAfterAppear:Vn,onAppearCancelled:Vn},To=n=>{const e=n.subTree;return e.component?To(e.component):e},Ea={name:"BaseTransition",props:wo,setup(n,{slots:e}){const t=el(),s=Sa();return()=>{const i=e.default&&Ro(e.default(),!0),r=i&&i.length?So(i):t.subTree?Ge():void 0;if(!r)return;const o=Q(n),{mode:l}=o;if(s.isLeaving)return Rs(r);const c=ji(r);if(!c)return Rs(r);let a=zs(c,o,s,t,u=>a=u);c.type!==In&&Ot(c,a);let d=t.subTree&&ji(t.subTree);if(d&&d.type!==In&&!He(d,c)&&To(t).type!==In){let u=zs(d,o,s,t);if(Ot(d,u),l==="out-in"&&c.type!==In)return s.isLeaving=!0,u.afterLeave=()=>{s.isLeaving=!1,t.job.flags&8||t.update(),delete u.afterLeave,d=void 0},Rs(r);l==="in-out"&&c.type!==In?u.delayLeave=(p,$,x)=>{const k=Eo(s,d);k[String(d.key)]=d,p[qn]=()=>{$(),p[qn]=void 0,delete a.delayedLeave,d=void 0},a.delayedLeave=()=>{x(),delete a.delayedLeave,d=void 0}}:d=void 0}else d&&(d=void 0);return r}}};function So(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==In){e=t;break}}return e}const Ra=Ea;function Eo(n,e){const{leavingVNodes:t}=n;let s=t.get(e.type);return s||(s=Object.create(null),t.set(e.type,s)),s}function zs(n,e,t,s,i){const{appear:r,mode:o,persisted:l=!1,onBeforeEnter:c,onEnter:a,onAfterEnter:d,onEnterCancelled:u,onBeforeLeave:p,onLeave:$,onAfterLeave:x,onLeaveCancelled:k,onBeforeAppear:I,onAppear:L,onAfterAppear:E,onAppearCancelled:N}=e,O=String(n.key),q=Eo(t,n),W=(U,Z)=>{U&&Yn(U,s,9,Z)},J=(U,Z)=>{const fn=Z[1];W(U,Z),B(U)?U.every(P=>P.length<=1)&&fn():U.length<=1&&fn()},En={mode:o,persisted:l,beforeEnter(U){let Z=c;if(!t.isMounted)if(r)Z=I||c;else return;U[qn]&&U[qn](!0);const fn=q[O];fn&&He(n,fn)&&fn.el[qn]&&fn.el[qn](),W(Z,[U])},enter(U){if(q[O]===n)return;let Z=a,fn=d,P=u;if(!t.isMounted)if(r)Z=L||a,fn=E||d,P=N||u;else return;let X=!1;U[dt]=Bn=>{X||(X=!0,Bn?W(P,[U]):W(fn,[U]),En.delayedLeave&&En.delayedLeave(),U[dt]=void 0)};const kn=U[dt].bind(null,!1);Z?J(Z,[U,kn]):kn()},leave(U,Z){const fn=String(n.key);if(U[dt]&&U[dt](!0),t.isUnmounting)return Z();W(p,[U]);let P=!1;U[qn]=kn=>{P||(P=!0,Z(),kn?W(k,[U]):W(x,[U]),U[qn]=void 0,q[fn]===n&&delete q[fn])};const X=U[qn].bind(null,!1);q[fn]=n,$?J($,[U,X]):X()},clone(U){const Z=zs(U,e,t,s,i);return i&&i(Z),Z}};return En}function Rs(n){if(gs(n))return n=Oe(n),n.children=null,n}function ji(n){if(!gs(n))return ko(n.type)&&n.children?So(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&j(t.default))return t.default()}}function Ot(n,e){n.shapeFlag&6&&n.component?(n.transition=e,Ot(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Ro(n,e=!1,t){let s=[],i=0;for(let r=0;r<n.length;r++){let o=n[r];const l=t==null?o.key:String(t)+String(o.key!=null?o.key:r);o.type===pn?(o.patchFlag&128&&i++,s=s.concat(Ro(o.children,e,l))):(e||o.type!==In)&&s.push(l!=null?Oe(o,{key:l}):o)}if(i>1)for(let r=0;r<s.length;r++)s[r].patchFlag=-2;return s}function Ao(n,e){return j(n)?yn({name:n.name},e,{setup:n}):n}function Oo(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Ui(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const ns=new WeakMap;function bt(n,e,t,s,i=!1){if(B(n)){n.forEach((k,I)=>bt(k,e&&(B(e)?e[I]:e),t,s,i));return}if(xt(s)&&!i){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&bt(n,e,t,s.component.subTree);return}const r=s.shapeFlag&4?bs(s.component):s.el,o=i?null:r,{i:l,r:c}=n,a=e&&e.r,d=l.refs===un?l.refs={}:l.refs,u=l.setupState,p=Q(u),$=u===un?Gr:k=>Ui(d,k)?!1:tn(p,k),x=(k,I)=>!(I&&Ui(d,I));if(a!=null&&a!==c){if(Gi(e),$n(a))d[a]=null,$(a)&&(u[a]=null);else if(On(a)){const k=e;x(a,k.k)&&(a.value=null),k.k&&(d[k.k]=null)}}if(j(c)){he();try{Dt(c,l,12,[o,d])}finally{pe()}}else{const k=$n(c),I=On(c);if(k||I){const L=()=>{if(n.f){const E=k?$(c)?u[c]:d[c]:x()||!n.k?c.value:d[n.k];if(i)B(E)&&ii(E,r);else if(B(E))E.includes(r)||E.push(r);else if(k)d[c]=[r],$(c)&&(u[c]=d[c]);else{const N=[r];x(c,n.k)&&(c.value=N),n.k&&(d[n.k]=N)}}else k?(d[c]=o,$(c)&&(u[c]=o)):I&&(x(c,n.k)&&(c.value=o),n.k&&(d[n.k]=o))};if(o){const E=()=>{L(),ns.delete(n)};E.id=-1,ns.set(n,E),Hn(E,t)}else Gi(n),L()}}}function Gi(n){const e=ns.get(n);e&&(e.flags|=8,ns.delete(n))}hs().requestIdleCallback;hs().cancelIdleCallback;const xt=n=>!!n.type.__asyncLoader,gs=n=>n.type.__isKeepAlive;function Aa(n,e){Po(n,"a",e)}function Oa(n,e){Po(n,"da",e)}function Po(n,e,t=An){const s=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(ms(e,s,t),t){let i=t.parent;for(;i&&i.parent;)gs(i.parent.vnode)&&Pa(s,e,t,i),i=i.parent}}function Pa(n,e,t,s){const i=ms(e,n,s,!0);Io(()=>{ii(s[e],i)},t)}function ms(n,e,t=An,s=!1){if(t){const i=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{he();const l=Ht(t),c=Yn(e,t,n,o);return l(),pe(),c});return s?i.unshift(r):i.push(r),r}}const we=n=>(e,t=An)=>{(!Ct||n==="sp")&&ms(n,(...s)=>e(...s),t)},Ca=we("bm"),Co=we("m"),Na=we("bu"),Ia=we("u"),No=we("bum"),Io=we("um"),La=we("sp"),Ma=we("rtg"),Da=we("rtc");function Ha(n,e=An){ms("ec",n,e)}const Ba="components";function Fa(n,e){return Ua(Ba,n,!0,e)||n}const ja=Symbol.for("v-ndc");function Ua(n,e,t=!0,s=!1){const i=Un||An;if(i){const r=i.type;{const l=Ru(r,!1);if(l&&(l===e||l===Mn(e)||l===fs(Mn(e))))return r}const o=zi(i[n]||r[n],e)||zi(i.appContext[n],e);return!o&&s?r:o}}function zi(n,e){return n&&(n[e]||n[Mn(e)]||n[fs(Mn(e))])}function De(n,e,t,s){let i;const r=t,o=B(n);if(o||$n(n)){const l=o&&Ue(n);let c=!1,a=!1;l&&(c=!Wn(n),a=ke(n),n=ps(n)),i=new Array(n.length);for(let d=0,u=n.length;d<u;d++)i[d]=e(c?a?st(Xn(n[d])):Xn(n[d]):n[d],d,void 0,r)}else if(typeof n=="number"){i=new Array(n);for(let l=0;l<n;l++)i[l]=e(l+1,l,void 0,r)}else if(sn(n))if(n[Symbol.iterator])i=Array.from(n,(l,c)=>e(l,c,void 0,r));else{const l=Object.keys(n);i=new Array(l.length);for(let c=0,a=l.length;c<a;c++){const d=l[c];i[c]=e(n[d],d,c,r)}}else i=[];return i}const Vs=n=>n?tl(n)?bs(n):Vs(n.parent):null,yt=yn(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Vs(n.parent),$root:n=>Vs(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Mo(n),$forceUpdate:n=>n.f||(n.f=()=>{mi(n.update)}),$nextTick:n=>n.n||(n.n=gi.bind(n.proxy)),$watch:n=>wa.bind(n)}),As=(n,e)=>n!==un&&!n.__isScriptSetup&&tn(n,e),Ga={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:s,data:i,props:r,accessCache:o,type:l,appContext:c}=n;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return i[e];case 4:return t[e];case 3:return r[e]}else{if(As(s,e))return o[e]=1,s[e];if(i!==un&&tn(i,e))return o[e]=2,i[e];if(tn(r,e))return o[e]=3,r[e];if(t!==un&&tn(t,e))return o[e]=4,t[e];qs&&(o[e]=0)}}const a=yt[e];let d,u;if(a)return e==="$attrs"&&Rn(n.attrs,"get",""),a(n);if((d=l.__cssModules)&&(d=d[e]))return d;if(t!==un&&tn(t,e))return o[e]=4,t[e];if(u=c.config.globalProperties,tn(u,e))return u[e]},set({_:n},e,t){const{data:s,setupState:i,ctx:r}=n;return As(i,e)?(i[e]=t,!0):s!==un&&tn(s,e)?(s[e]=t,!0):tn(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:s,appContext:i,props:r,type:o}},l){let c;return!!(t[l]||n!==un&&l[0]!=="$"&&tn(n,l)||As(e,l)||tn(r,l)||tn(s,l)||tn(yt,l)||tn(i.config.globalProperties,l)||(c=o.__cssModules)&&c[l])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:tn(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Vi(n){return B(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let qs=!0;function za(n){const e=Mo(n),t=n.proxy,s=n.ctx;qs=!1,e.beforeCreate&&qi(e.beforeCreate,n,"bc");const{data:i,computed:r,methods:o,watch:l,provide:c,inject:a,created:d,beforeMount:u,mounted:p,beforeUpdate:$,updated:x,activated:k,deactivated:I,beforeDestroy:L,beforeUnmount:E,destroyed:N,unmounted:O,render:q,renderTracked:W,renderTriggered:J,errorCaptured:En,serverPrefetch:U,expose:Z,inheritAttrs:fn,components:P,directives:X,filters:kn}=e;if(a&&Va(a,s,null),o)for(const on in o){const nn=o[on];j(nn)&&(s[on]=nn.bind(t))}if(i){const on=i.call(t,t);sn(on)&&(n.data=Mt(on))}if(qs=!0,r)for(const on in r){const nn=r[on],$e=j(nn)?nn.bind(t,t):j(nn.get)?nn.get.bind(t,t):ae,Te=!j(nn)&&j(nn.set)?nn.set.bind(t):ae,ee=Ln({get:$e,set:Te});Object.defineProperty(s,on,{enumerable:!0,configurable:!0,get:()=>ee.value,set:Dn=>ee.value=Dn})}if(l)for(const on in l)Lo(l[on],s,t,on);if(c){const on=j(c)?c.call(t):c;Reflect.ownKeys(on).forEach(nn=>{Jt(nn,on[nn])})}d&&qi(d,n,"c");function mn(on,nn){B(nn)?nn.forEach($e=>on($e.bind(t))):nn&&on(nn.bind(t))}if(mn(Ca,u),mn(Co,p),mn(Na,$),mn(Ia,x),mn(Aa,k),mn(Oa,I),mn(Ha,En),mn(Da,W),mn(Ma,J),mn(No,E),mn(Io,O),mn(La,U),B(Z))if(Z.length){const on=n.exposed||(n.exposed={});Z.forEach(nn=>{Object.defineProperty(on,nn,{get:()=>t[nn],set:$e=>t[nn]=$e,enumerable:!0})})}else n.exposed||(n.exposed={});q&&n.render===ae&&(n.render=q),fn!=null&&(n.inheritAttrs=fn),P&&(n.components=P),X&&(n.directives=X),U&&Oo(n)}function Va(n,e,t=ae){B(n)&&(n=Js(n));for(const s in n){const i=n[s];let r;sn(i)?"default"in i?r=ue(i.from||s,i.default,!0):r=ue(i.from||s):r=ue(i),On(r)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[s]=r}}function qi(n,e,t){Yn(B(n)?n.map(s=>s.bind(e.proxy)):n.bind(e.proxy),e,t)}function Lo(n,e,t,s){let i=s.includes(".")?yo(t,s):()=>t[s];if($n(n)){const r=e[n];j(r)&&vt(i,r)}else if(j(n))vt(i,n.bind(t));else if(sn(n))if(B(n))n.forEach(r=>Lo(r,e,t,s));else{const r=j(n.handler)?n.handler.bind(t):e[n.handler];j(r)&&vt(i,r,n)}}function Mo(n){const e=n.type,{mixins:t,extends:s}=e,{mixins:i,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,l=r.get(e);let c;return l?c=l:!i.length&&!t&&!s?c=e:(c={},i.length&&i.forEach(a=>es(c,a,o,!0)),es(c,e,o)),sn(e)&&r.set(e,c),c}function es(n,e,t,s=!1){const{mixins:i,extends:r}=e;r&&es(n,r,t,!0),i&&i.forEach(o=>es(n,o,t,!0));for(const o in e)if(!(s&&o==="expose")){const l=qa[o]||t&&t[o];n[o]=l?l(n[o],e[o]):e[o]}return n}const qa={data:Ji,props:Ki,emits:Ki,methods:pt,computed:pt,beforeCreate:Pn,created:Pn,beforeMount:Pn,mounted:Pn,beforeUpdate:Pn,updated:Pn,beforeDestroy:Pn,beforeUnmount:Pn,destroyed:Pn,unmounted:Pn,activated:Pn,deactivated:Pn,errorCaptured:Pn,serverPrefetch:Pn,components:pt,directives:pt,watch:Ka,provide:Ji,inject:Ja};function Ji(n,e){return e?n?function(){return yn(j(n)?n.call(this,this):n,j(e)?e.call(this,this):e)}:e:n}function Ja(n,e){return pt(Js(n),Js(e))}function Js(n){if(B(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Pn(n,e){return n?[...new Set([].concat(n,e))]:e}function pt(n,e){return n?yn(Object.create(null),n,e):e}function Ki(n,e){return n?B(n)&&B(e)?[...new Set([...n,...e])]:yn(Object.create(null),Vi(n),Vi(e??{})):e}function Ka(n,e){if(!n)return e;if(!e)return n;const t=yn(Object.create(null),n);for(const s in e)t[s]=Pn(n[s],e[s]);return t}function Do(){return{app:null,config:{isNativeTag:Gr,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Wa=0;function Ya(n,e){return function(s,i=null){j(s)||(s=yn({},s)),i!=null&&!sn(i)&&(i=null);const r=Do(),o=new WeakSet,l=[];let c=!1;const a=r.app={_uid:Wa++,_component:s,_props:i,_container:null,_context:r,_instance:null,version:Ou,get config(){return r.config},set config(d){},use(d,...u){return o.has(d)||(d&&j(d.install)?(o.add(d),d.install(a,...u)):j(d)&&(o.add(d),d(a,...u))),a},mixin(d){return r.mixins.includes(d)||r.mixins.push(d),a},component(d,u){return u?(r.components[d]=u,a):r.components[d]},directive(d,u){return u?(r.directives[d]=u,a):r.directives[d]},mount(d,u,p){if(!c){const $=a._ceVNode||xn(s,i);return $.appContext=r,p===!0?p="svg":p===!1&&(p=void 0),n($,d,p),c=!0,a._container=d,d.__vue_app__=a,bs($.component)}},onUnmount(d){l.push(d)},unmount(){c&&(Yn(l,a._instance,16),n(null,a._container),delete a._container.__vue_app__)},provide(d,u){return r.provides[d]=u,a},runWithContext(d){const u=tt;tt=a;try{return d()}finally{tt=u}}};return a}}let tt=null;const Za=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Mn(e)}Modifiers`]||n[`${Ve(e)}Modifiers`];function Qa(n,e,...t){if(n.isUnmounted)return;const s=n.vnode.props||un;let i=t;const r=e.startsWith("update:"),o=r&&Za(s,e.slice(7));o&&(o.trim&&(i=t.map(d=>$n(d)?d.trim():d)),o.number&&(i=t.map(oi)));let l,c=s[l=ks(e)]||s[l=ks(Mn(e))];!c&&r&&(c=s[l=ks(Ve(e))]),c&&Yn(c,n,6,i);const a=s[l+"Once"];if(a){if(!n.emitted)n.emitted={};else if(n.emitted[l])return;n.emitted[l]=!0,Yn(a,n,6,i)}}const Xa=new WeakMap;function Ho(n,e,t=!1){const s=t?Xa:e.emitsCache,i=s.get(n);if(i!==void 0)return i;const r=n.emits;let o={},l=!1;if(!j(n)){const c=a=>{const d=Ho(a,e,!0);d&&(l=!0,yn(o,d))};!t&&e.mixins.length&&e.mixins.forEach(c),n.extends&&c(n.extends),n.mixins&&n.mixins.forEach(c)}return!r&&!l?(sn(n)&&s.set(n,null),null):(B(r)?r.forEach(c=>o[c]=null):yn(o,r),sn(n)&&s.set(n,o),o)}function _s(n,e){return!n||!ds(e)?!1:(e=e.slice(2),e=e==="Once"?e:e.replace(/Once$/,""),tn(n,e[0].toLowerCase()+e.slice(1))||tn(n,Ve(e))||tn(n,e))}function Wi(n){const{type:e,vnode:t,proxy:s,withProxy:i,propsOptions:[r],slots:o,attrs:l,emit:c,render:a,renderCache:d,props:u,data:p,setupState:$,ctx:x,inheritAttrs:k}=n,I=Xt(n);let L,E;try{if(t.shapeFlag&4){const O=i||s,q=O;L=ce(a.call(q,O,d,u,$,p,x)),E=l}else{const O=e;L=ce(O.length>1?O(u,{attrs:l,slots:o,emit:c}):O(u,null)),E=e.props?l:nu(l)}}catch(O){kt.length=0,$s(O,n,1),L=xn(In)}let N=L;if(E&&k!==!1){const O=Object.keys(E),{shapeFlag:q}=N;O.length&&q&7&&(r&&O.some(as)&&(E=eu(E,r)),N=Oe(N,E,!1,!0))}return t.dirs&&(N=Oe(N,null,!1,!0),N.dirs=N.dirs?N.dirs.concat(t.dirs):t.dirs),t.transition&&Ot(N,t.transition),L=N,Xt(I),L}const nu=n=>{let e;for(const t in n)(t==="class"||t==="style"||ds(t))&&((e||(e={}))[t]=n[t]);return e},eu=(n,e)=>{const t={};for(const s in n)(!as(s)||!(s.slice(9)in e))&&(t[s]=n[s]);return t};function tu(n,e,t){const{props:s,children:i,component:r}=n,{props:o,children:l,patchFlag:c}=e,a=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&c>=0){if(c&1024)return!0;if(c&16)return s?Yi(s,o,a):!!o;if(c&8){const d=e.dynamicProps;for(let u=0;u<d.length;u++){const p=d[u];if(Bo(o,s,p)&&!_s(a,p))return!0}}}else return(i||l)&&(!l||!l.$stable)?!0:s===o?!1:s?o?Yi(s,o,a):!0:!!o;return!1}function Yi(n,e,t){const s=Object.keys(e);if(s.length!==Object.keys(n).length)return!0;for(let i=0;i<s.length;i++){const r=s[i];if(Bo(e,n,r)&&!_s(t,r))return!0}return!1}function Bo(n,e,t){const s=n[t],i=e[t];return t==="style"&&sn(s)&&sn(i)?!ci(s,i):s!==i}function su({vnode:n,parent:e,suspense:t},s){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.suspense.vnode.el=i.el=s,n=i),i===n)(n=e.vnode).el=s,e=e.parent;else break}t&&t.activeBranch===n&&(t.vnode.el=s)}const Fo={},jo=()=>Object.create(Fo),Uo=n=>Object.getPrototypeOf(n)===Fo;function iu(n,e,t,s=!1){const i={},r=jo();n.propsDefaults=Object.create(null),Go(n,e,i,r);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=s?i:ho(i):n.type.props?n.props=i:n.props=r,n.attrs=r}function ru(n,e,t,s){const{props:i,attrs:r,vnode:{patchFlag:o}}=n,l=Q(i),[c]=n.propsOptions;let a=!1;if((s||o>0)&&!(o&16)){if(o&8){const d=n.vnode.dynamicProps;for(let u=0;u<d.length;u++){let p=d[u];if(_s(n.emitsOptions,p))continue;const $=e[p];if(c)if(tn(r,p))$!==r[p]&&(r[p]=$,a=!0);else{const x=Mn(p);i[x]=Ks(c,l,x,$,n,!1)}else $!==r[p]&&(r[p]=$,a=!0)}}}else{Go(n,e,i,r)&&(a=!0);let d;for(const u in l)(!e||!tn(e,u)&&((d=Ve(u))===u||!tn(e,d)))&&(c?t&&(t[u]!==void 0||t[d]!==void 0)&&(i[u]=Ks(c,l,u,void 0,n,!0)):delete i[u]);if(r!==l)for(const u in r)(!e||!tn(e,u))&&(delete r[u],a=!0)}a&&xe(n.attrs,"set","")}function Go(n,e,t,s){const[i,r]=n.propsOptions;let o=!1,l;if(e)for(let c in e){if(gt(c))continue;const a=e[c];let d;i&&tn(i,d=Mn(c))?!r||!r.includes(d)?t[d]=a:(l||(l={}))[d]=a:_s(n.emitsOptions,c)||(!(c in s)||a!==s[c])&&(s[c]=a,o=!0)}if(r){const c=Q(t),a=l||un;for(let d=0;d<r.length;d++){const u=r[d];t[u]=Ks(i,c,u,a[u],n,!tn(a,u))}}return o}function Ks(n,e,t,s,i,r){const o=n[t];if(o!=null){const l=tn(o,"default");if(l&&s===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&j(c)){const{propsDefaults:a}=i;if(t in a)s=a[t];else{const d=Ht(i);s=a[t]=c.call(null,e),d()}}else s=c;i.ce&&i.ce._setProp(t,s)}o[0]&&(r&&!l?s=!1:o[1]&&(s===""||s===Ve(t))&&(s=!0))}return s}const ou=new WeakMap;function zo(n,e,t=!1){const s=t?ou:e.propsCache,i=s.get(n);if(i)return i;const r=n.props,o={},l=[];let c=!1;if(!j(n)){const d=u=>{c=!0;const[p,$]=zo(u,e,!0);yn(o,p),$&&l.push(...$)};!t&&e.mixins.length&&e.mixins.forEach(d),n.extends&&d(n.extends),n.mixins&&n.mixins.forEach(d)}if(!r&&!c)return sn(n)&&s.set(n,Xe),Xe;if(B(r))for(let d=0;d<r.length;d++){const u=Mn(r[d]);Zi(u)&&(o[u]=un)}else if(r)for(const d in r){const u=Mn(d);if(Zi(u)){const p=r[d],$=o[u]=B(p)||j(p)?{type:p}:yn({},p),x=$.type;let k=!1,I=!0;if(B(x))for(let L=0;L<x.length;++L){const E=x[L],N=j(E)&&E.name;if(N==="Boolean"){k=!0;break}else N==="String"&&(I=!1)}else k=j(x)&&x.name==="Boolean";$[0]=k,$[1]=I,(k||tn($,"default"))&&l.push(u)}}const a=[o,l];return sn(n)&&s.set(n,a),a}function Zi(n){return n[0]!=="$"&&!gt(n)}const vi=n=>n==="_"||n==="_ctx"||n==="$stable",bi=n=>B(n)?n.map(ce):[ce(n)],lu=(n,e,t)=>{if(e._n)return e;const s=xo((...i)=>bi(e(...i)),t);return s._c=!1,s},Vo=(n,e,t)=>{const s=n._ctx;for(const i in n){if(vi(i))continue;const r=n[i];if(j(r))e[i]=lu(i,r,s);else if(r!=null){const o=bi(r);e[i]=()=>o}}},qo=(n,e)=>{const t=bi(e);n.slots.default=()=>t},Jo=(n,e,t)=>{for(const s in e)(t||!vi(s))&&(n[s]=e[s])},cu=(n,e,t)=>{const s=n.slots=jo();if(n.vnode.shapeFlag&32){const i=e._;i?(Jo(s,e,t),t&&Kr(s,"_",i,!0)):Vo(e,s)}else e&&qo(n,e)},du=(n,e,t)=>{const{vnode:s,slots:i}=n;let r=!0,o=un;if(s.shapeFlag&32){const l=e._;l?t&&l===1?r=!1:Jo(i,e,t):(r=!e.$stable,Vo(e,i)),o=e}else e&&(qo(n,e),o={default:1});if(r)for(const l in i)!vi(l)&&o[l]==null&&delete i[l]},Hn=pu;function au(n){return uu(n)}function uu(n,e){const t=hs();t.__VUE__=!0;const{insert:s,remove:i,patchProp:r,createElement:o,createText:l,createComment:c,setText:a,setElementText:d,parentNode:u,nextSibling:p,setScopeId:$=ae,insertStaticContent:x}=n,k=(f,h,g,_=null,b=null,m=null,S=void 0,T=null,w=!!h.dynamicChildren)=>{if(f===h)return;f&&!He(f,h)&&(_=v(f),Dn(f,b,m,!0),f=null),h.patchFlag===-2&&(w=!1,h.dynamicChildren=null);const{type:y,ref:H,shapeFlag:A}=h;switch(y){case vs:I(f,h,g,_);break;case In:L(f,h,g,_);break;case Kt:f==null&&E(h,g,_,S);break;case pn:P(f,h,g,_,b,m,S,T,w);break;default:A&1?q(f,h,g,_,b,m,S,T,w):A&6?X(f,h,g,_,b,m,S,T,w):(A&64||A&128)&&y.process(f,h,g,_,b,m,S,T,w,M)}H!=null&&b?bt(H,f&&f.ref,m,h||f,!h):H==null&&f&&f.ref!=null&&bt(f.ref,null,m,f,!0)},I=(f,h,g,_)=>{if(f==null)s(h.el=l(h.children),g,_);else{const b=h.el=f.el;h.children!==f.children&&a(b,h.children)}},L=(f,h,g,_)=>{f==null?s(h.el=c(h.children||""),g,_):h.el=f.el},E=(f,h,g,_)=>{[f.el,f.anchor]=x(f.children,h,g,_,f.el,f.anchor)},N=({el:f,anchor:h},g,_)=>{let b;for(;f&&f!==h;)b=p(f),s(f,g,_),f=b;s(h,g,_)},O=({el:f,anchor:h})=>{let g;for(;f&&f!==h;)g=p(f),i(f),f=g;i(h)},q=(f,h,g,_,b,m,S,T,w)=>{if(h.type==="svg"?S="svg":h.type==="math"&&(S="mathml"),f==null)W(h,g,_,b,m,S,T,w);else{const y=f.el&&f.el._isVueCE?f.el:null;try{y&&y._beginPatch(),U(f,h,b,m,S,T,w)}finally{y&&y._endPatch()}}},W=(f,h,g,_,b,m,S,T)=>{let w,y;const{props:H,shapeFlag:A,transition:D,dirs:F}=f;if(w=f.el=o(f.type,m,H&&H.is,H),A&8?d(w,f.children):A&16&&En(f.children,w,null,_,b,Os(f,m),S,T),F&&Ce(f,null,_,"created"),J(w,f,f.scopeId,S,_),H){for(const dn in H)dn!=="value"&&!gt(dn)&&r(w,dn,null,H[dn],m,_);"value"in H&&r(w,"value",null,H.value,m),(y=H.onVnodeBeforeMount)&&re(y,_,f)}F&&Ce(f,null,_,"beforeMount");const Y=fu(b,D);Y&&D.beforeEnter(w),s(w,h,g),((y=H&&H.onVnodeMounted)||Y||F)&&Hn(()=>{try{y&&re(y,_,f),Y&&D.enter(w),F&&Ce(f,null,_,"mounted")}finally{}},b)},J=(f,h,g,_,b)=>{if(g&&$(f,g),_)for(let m=0;m<_.length;m++)$(f,_[m]);if(b){let m=b.subTree;if(h===m||Zo(m.type)&&(m.ssContent===h||m.ssFallback===h)){const S=b.vnode;J(f,S,S.scopeId,S.slotScopeIds,b.parent)}}},En=(f,h,g,_,b,m,S,T,w=0)=>{for(let y=w;y<f.length;y++){const H=f[y]=T?be(f[y]):ce(f[y]);k(null,H,h,g,_,b,m,S,T)}},U=(f,h,g,_,b,m,S)=>{const T=h.el=f.el;let{patchFlag:w,dynamicChildren:y,dirs:H}=h;w|=f.patchFlag&16;const A=f.props||un,D=h.props||un;let F;if(g&&Ne(g,!1),(F=D.onVnodeBeforeUpdate)&&re(F,g,h,f),H&&Ce(h,f,g,"beforeUpdate"),g&&Ne(g,!0),y&&(!f.dynamicChildren||f.dynamicChildren.length!==y.length)&&(w=0,S=!1,y=null),(A.innerHTML&&D.innerHTML==null||A.textContent&&D.textContent==null)&&d(T,""),y?Z(f.dynamicChildren,y,T,g,_,Os(h,b),m):S||nn(f,h,T,null,g,_,Os(h,b),m,!1),w>0){if(w&16)fn(T,A,D,g,b);else if(w&2&&A.class!==D.class&&r(T,"class",null,D.class,b),w&4&&r(T,"style",A.style,D.style,b),w&8){const Y=h.dynamicProps;for(let dn=0;dn<Y.length;dn++){const ln=Y[dn],_n=A[ln],wn=D[ln];(wn!==_n||ln==="value")&&r(T,ln,_n,wn,b,g)}}w&1&&f.children!==h.children&&d(T,h.children)}else!S&&y==null&&fn(T,A,D,g,b);((F=D.onVnodeUpdated)||H)&&Hn(()=>{F&&re(F,g,h,f),H&&Ce(h,f,g,"updated")},_)},Z=(f,h,g,_,b,m,S)=>{for(let T=0;T<h.length;T++){const w=f[T],y=h[T],H=w.el&&(w.type===pn||!He(w,y)||w.shapeFlag&198)?u(w.el):g;k(w,y,H,null,_,b,m,S,!0)}},fn=(f,h,g,_,b)=>{if(h!==g){if(h!==un)for(const m in h)!gt(m)&&!(m in g)&&r(f,m,h[m],null,b,_);for(const m in g){if(gt(m))continue;const S=g[m],T=h[m];S!==T&&m!=="value"&&r(f,m,T,S,b,_)}"value"in g&&r(f,"value",h.value,g.value,b)}},P=(f,h,g,_,b,m,S,T,w)=>{const y=h.el=f?f.el:l(""),H=h.anchor=f?f.anchor:l("");let{patchFlag:A,dynamicChildren:D,slotScopeIds:F}=h;F&&(T=T?T.concat(F):F),f==null?(s(y,g,_),s(H,g,_),En(h.children||[],g,H,b,m,S,T,w)):A>0&&A&64&&D&&f.dynamicChildren&&f.dynamicChildren.length===D.length?(Z(f.dynamicChildren,D,g,b,m,S,T),(h.key!=null||b&&h===b.subTree)&&Ko(f,h,!0)):nn(f,h,g,H,b,m,S,T,w)},X=(f,h,g,_,b,m,S,T,w)=>{h.slotScopeIds=T,f==null?h.shapeFlag&512?b.ctx.activate(h,g,_,S,w):kn(h,g,_,b,m,S,w):Bn(f,h,w)},kn=(f,h,g,_,b,m,S)=>{const T=f.component=ku(f,_,b);if(gs(f)&&(T.ctx.renderer=M),wu(T,!1,S),T.asyncDep){if(b&&b.registerDep(T,mn,S),!f.el){const w=T.subTree=xn(In);L(null,w,h,g),f.placeholder=w.el}}else mn(T,f,h,g,b,m,S)},Bn=(f,h,g)=>{const _=h.component=f.component;if(tu(f,h,g))if(_.asyncDep&&!_.asyncResolved){on(_,h,g);return}else _.next=h,_.update();else h.el=f.el,_.vnode=h},mn=(f,h,g,_,b,m,S)=>{const T=()=>{if(f.isMounted){let{next:A,bu:D,u:F,parent:Y,vnode:dn}=f;{const se=Wo(f);if(se){A&&(A.el=dn.el,on(f,A,S)),se.asyncDep.then(()=>{Hn(()=>{f.isUnmounted||y()},b)});return}}let ln=A,_n;Ne(f,!1),A?(A.el=dn.el,on(f,A,S)):A=dn,D&&qt(D),(_n=A.props&&A.props.onVnodeBeforeUpdate)&&re(_n,Y,A,dn),Ne(f,!0);const wn=Wi(f),te=f.subTree;f.subTree=wn,k(te,wn,u(te.el),v(te),f,b,m),A.el=wn.el,ln===null&&su(f,wn.el),F&&Hn(F,b),(_n=A.props&&A.props.onVnodeUpdated)&&Hn(()=>re(_n,Y,A,dn),b)}else{let A;const{el:D,props:F}=h,{bm:Y,m:dn,parent:ln,root:_n,type:wn}=f,te=xt(h);Ne(f,!1),Y&&qt(Y),!te&&(A=F&&F.onVnodeBeforeMount)&&re(A,ln,h),Ne(f,!0);{_n.ce&&_n.ce._hasShadowRoot()&&_n.ce._injectChildStyle(wn,f.parent?f.parent.type:void 0);const se=f.subTree=Wi(f);k(null,se,g,_,f,b,m),h.el=se.el}if(dn&&Hn(dn,b),!te&&(A=F&&F.onVnodeMounted)){const se=h;Hn(()=>re(A,ln,se),b)}(h.shapeFlag&256||ln&&xt(ln.vnode)&&ln.vnode.shapeFlag&256)&&f.a&&Hn(f.a,b),f.isMounted=!0,h=g=_=null}};f.scope.on();const w=f.effect=new Qr(T);f.scope.off();const y=f.update=w.run.bind(w),H=f.job=w.runIfDirty.bind(w);H.i=f,H.id=f.uid,w.scheduler=()=>mi(H),Ne(f,!0),y()},on=(f,h,g)=>{h.component=f;const _=f.vnode.props;f.vnode=h,f.next=null,ru(f,h.props,_,g),du(f,h.children,g),he(),Fi(f),pe()},nn=(f,h,g,_,b,m,S,T,w=!1)=>{const y=f&&f.children,H=f?f.shapeFlag:0,A=h.children,{patchFlag:D,shapeFlag:F}=h;if(D>0){if(D&128){Te(y,A,g,_,b,m,S,T,w);return}else if(D&256){$e(y,A,g,_,b,m,S,T,w);return}}F&8?(H&16&&zn(y,b,m),A!==y&&d(g,A)):H&16?F&16?Te(y,A,g,_,b,m,S,T,w):zn(y,b,m,!0):(H&8&&d(g,""),F&16&&En(A,g,_,b,m,S,T,w))},$e=(f,h,g,_,b,m,S,T,w)=>{f=f||Xe,h=h||Xe;const y=f.length,H=h.length,A=Math.min(y,H);let D;for(D=0;D<A;D++){const F=h[D]=w?be(h[D]):ce(h[D]);k(f[D],F,g,null,b,m,S,T,w)}y>H?zn(f,b,m,!0,!1,A):En(h,g,_,b,m,S,T,w,A)},Te=(f,h,g,_,b,m,S,T,w)=>{let y=0;const H=h.length;let A=f.length-1,D=H-1;for(;y<=A&&y<=D;){const F=f[y],Y=h[y]=w?be(h[y]):ce(h[y]);if(He(F,Y))k(F,Y,g,null,b,m,S,T,w);else break;y++}for(;y<=A&&y<=D;){const F=f[A],Y=h[D]=w?be(h[D]):ce(h[D]);if(He(F,Y))k(F,Y,g,null,b,m,S,T,w);else break;A--,D--}if(y>A){if(y<=D){const F=D+1,Y=F<H?h[F].el:_;for(;y<=D;)k(null,h[y]=w?be(h[y]):ce(h[y]),g,Y,b,m,S,T,w),y++}}else if(y>D)for(;y<=A;)Dn(f[y],b,m,!0),y++;else{const F=y,Y=y,dn=new Map;for(y=Y;y<=D;y++){const Fn=h[y]=w?be(h[y]):ce(h[y]);Fn.key!=null&&dn.set(Fn.key,y)}let ln,_n=0;const wn=D-Y+1;let te=!1,se=0;const lt=new Array(wn);for(y=0;y<wn;y++)lt[y]=0;for(y=F;y<=A;y++){const Fn=f[y];if(_n>=wn){Dn(Fn,b,m,!0);continue}let ie;if(Fn.key!=null)ie=dn.get(Fn.key);else for(ln=Y;ln<=D;ln++)if(lt[ln-Y]===0&&He(Fn,h[ln])){ie=ln;break}ie===void 0?Dn(Fn,b,m,!0):(lt[ie-Y]=y+1,ie>=se?se=ie:te=!0,k(Fn,h[ie],g,null,b,m,S,T,w),_n++)}const Ni=te?hu(lt):Xe;for(ln=Ni.length-1,y=wn-1;y>=0;y--){const Fn=Y+y,ie=h[Fn],Ii=h[Fn+1],Li=Fn+1<H?Ii.el||Yo(Ii):_;lt[y]===0?k(null,ie,g,Li,b,m,S,T,w):te&&(ln<0||y!==Ni[ln]?ee(ie,g,Li,2):ln--)}}},ee=(f,h,g,_,b=null)=>{const{el:m,type:S,transition:T,children:w,shapeFlag:y}=f;if(y&6){ee(f.component.subTree,h,g,_);return}if(y&128){f.suspense.move(h,g,_);return}if(y&64){S.move(f,h,g,M);return}if(S===pn){s(m,h,g);for(let A=0;A<w.length;A++)ee(w[A],h,g,_);s(f.anchor,h,g);return}if(S===Kt){N(f,h,g);return}if(_!==2&&y&1&&T)if(_===0)T.persisted&&!m[qn]?s(m,h,g):(T.beforeEnter(m),s(m,h,g),Hn(()=>T.enter(m),b));else{const{leave:A,delayLeave:D,afterLeave:F}=T,Y=()=>{f.ctx.isUnmounted?i(m):s(m,h,g)},dn=()=>{const ln=m._isLeaving||!!m[qn];m._isLeaving&&m[qn](!0),T.persisted&&!ln?Y():A(m,()=>{Y(),F&&F()})};D?D(m,Y,dn):dn()}else s(m,h,g)},Dn=(f,h,g,_=!1,b=!1)=>{const{type:m,props:S,ref:T,children:w,dynamicChildren:y,shapeFlag:H,patchFlag:A,dirs:D,cacheIndex:F,memo:Y}=f;if(A===-2&&(b=!1),T!=null&&(he(),bt(T,null,g,f,!0),pe()),F!=null&&(h.renderCache[F]=void 0),H&256){h.ctx.deactivate(f);return}const dn=H&1&&D,ln=!xt(f);let _n;if(ln&&(_n=S&&S.onVnodeBeforeUnmount)&&re(_n,h,f),H&6)Pe(f.component,g,_);else{if(H&128){f.suspense.unmount(g,_);return}dn&&Ce(f,null,h,"beforeUnmount"),H&64?f.type.remove(f,h,g,M,_):y&&!y.hasOnce&&(m!==pn||A>0&&A&64)?zn(y,h,g,!1,!0):(m===pn&&A&384||!b&&H&16)&&zn(w,h,g),_&&Je(f)}const wn=Y!=null&&F==null;(ln&&(_n=S&&S.onVnodeUnmounted)||dn||wn)&&Hn(()=>{_n&&re(_n,h,f),dn&&Ce(f,null,h,"unmounted"),wn&&(f.el=null)},g)},Je=f=>{const{type:h,el:g,anchor:_,transition:b}=f;if(h===pn){Ke(g,_);return}if(h===Kt){O(f);return}const m=()=>{i(g),b&&!b.persisted&&b.afterLeave&&b.afterLeave()};if(f.shapeFlag&1&&b&&!b.persisted){const{leave:S,delayLeave:T}=b,w=()=>S(g,m);T?T(f.el,m,w):w()}else m()},Ke=(f,h)=>{let g;for(;f!==h;)g=p(f),i(f),f=g;i(h)},Pe=(f,h,g)=>{const{bum:_,scope:b,job:m,subTree:S,um:T,m:w,a:y}=f;Qi(w),Qi(y),_&&qt(_),b.stop(),m&&(m.flags|=8,Dn(S,f,h,g)),T&&Hn(T,h),Hn(()=>{f.isUnmounted=!0},h)},zn=(f,h,g,_=!1,b=!1,m=0)=>{for(let S=m;S<f.length;S++)Dn(f[S],h,g,_,b)},v=f=>{if(f.shapeFlag&6)return v(f.component.subTree);if(f.shapeFlag&128)return f.suspense.next();const h=p(f.anchor||f.el),g=h&&h[Ta];return g?p(g):h};let C=!1;const R=(f,h,g)=>{let _;f==null?h._vnode&&(Dn(h._vnode,null,null,!0),_=h._vnode.component):k(h._vnode||null,f,h,null,null,null,g),h._vnode=f,C||(C=!0,Fi(_),_o(),C=!1)},M={p:k,um:Dn,m:ee,r:Je,mt:kn,mc:En,pc:nn,pbc:Z,n:v,o:n};return{render:R,hydrate:void 0,createApp:Ya(R)}}function Os({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function Ne({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function fu(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Ko(n,e,t=!1){const s=n.children,i=e.children;if(B(s)&&B(i))for(let r=0;r<s.length;r++){const o=s[r];let l=i[r];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=i[r]=be(i[r]),l.el=o.el),!t&&l.patchFlag!==-2&&Ko(o,l)),l.type===vs&&(l.patchFlag===-1&&(l=i[r]=be(l)),l.el=o.el),l.type===In&&!l.el&&(l.el=o.el)}}function hu(n){const e=n.slice(),t=[0];let s,i,r,o,l;const c=n.length;for(s=0;s<c;s++){const a=n[s];if(a!==0){if(i=t[t.length-1],n[i]<a){e[s]=i,t.push(s);continue}for(r=0,o=t.length-1;r<o;)l=r+o>>1,n[t[l]]<a?r=l+1:o=l;a<n[t[r]]&&(r>0&&(e[s]=t[r-1]),t[r]=s)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function Wo(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Wo(e)}function Qi(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Yo(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Yo(e.subTree):null}const Zo=n=>n.__isSuspense;function pu(n,e){e&&e.pendingBranch?B(n)?e.effects.push(...n):e.effects.push(n):va(n)}const pn=Symbol.for("v-fgt"),vs=Symbol.for("v-txt"),In=Symbol.for("v-cmt"),Kt=Symbol.for("v-stc"),kt=[];let Gn=null;function G(n=!1){kt.push(Gn=n?null:[])}function $u(){kt.pop(),Gn=kt[kt.length-1]||null}let Pt=1;function ts(n,e=!1){Pt+=n,n<0&&Gn&&e&&(Gn.hasOnce=!0)}function Qo(n){return n.dynamicChildren=Pt>0?Gn||Xe:null,$u(),Pt>0&&Gn&&Gn.push(n),n}function z(n,e,t,s,i,r){return Qo(V(n,e,t,s,i,r,!0))}function Xo(n,e,t,s,i){return Qo(xn(n,e,t,s,i,!0))}function ss(n){return n?n.__v_isVNode===!0:!1}function He(n,e){return n.type===e.type&&n.key===e.key}const nl=({key:n})=>n??null,Wt=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?$n(n)||On(n)||j(n)?{i:Un,r:n,k:e,f:!!t}:n:null);function V(n,e=null,t=null,s=0,i=null,r=n===pn?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&nl(e),ref:e&&Wt(e),scopeId:bo,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:s,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Un};return l?(is(c,t),r&128&&n.normalize(c)):t&&(c.shapeFlag|=$n(t)?8:16),Pt>0&&!o&&Gn&&(c.patchFlag>0||r&6)&&c.patchFlag!==32&&Gn.push(c),c}const xn=gu;function gu(n,e=null,t=null,s=0,i=null,r=!1){if((!n||n===ja)&&(n=In),ss(n)){const l=Oe(n,e,!0);return t&&is(l,t),Pt>0&&!r&&Gn&&(l.shapeFlag&6?Gn[Gn.indexOf(n)]=l:Gn.push(l)),l.patchFlag=-2,l}if(Au(n)&&(n=n.__vccOpts),e){e=mu(e);let{class:l,style:c}=e;l&&!$n(l)&&(e.class=Zn(l)),sn(c)&&($i(c)&&!B(c)&&(c=yn({},c)),e.style=li(c))}const o=$n(n)?1:Zo(n)?128:ko(n)?64:sn(n)?4:j(n)?2:0;return V(n,e,t,s,i,o,r,!0)}function mu(n){return n?$i(n)||Uo(n)?yn({},n):n:null}function Oe(n,e,t=!1,s=!1){const{props:i,ref:r,patchFlag:o,children:l,transition:c}=n,a=e?bu(i||{},e):i,d={__v_isVNode:!0,__v_skip:!0,type:n.type,props:a,key:a&&nl(a),ref:e&&e.ref?t&&r?B(r)?r.concat(Wt(e)):[r,Wt(e)]:Wt(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:l,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==pn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:c,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&Oe(n.ssContent),ssFallback:n.ssFallback&&Oe(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return c&&s&&Ot(d,c.clone(d)),d}function _u(n=" ",e=0){return xn(vs,null,n,e)}function vu(n,e){const t=xn(Kt,null,n);return t.staticCount=e,t}function Ge(n="",e=!1){return e?(G(),Xo(In,null,n)):xn(In,null,n)}function ce(n){return n==null||typeof n=="boolean"?xn(In):B(n)?xn(pn,null,n.slice()):ss(n)?be(n):xn(vs,null,String(n))}function be(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:Oe(n)}function is(n,e){let t=0;const{shapeFlag:s}=n;if(e==null)e=null;else if(B(e))t=16;else if(typeof e=="object")if(s&65){const i=e.default;i&&(i._c&&(i._d=!1),is(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!Uo(e)?e._ctx=Un:i===3&&Un&&(Un.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else if(j(e)){if(s&65){is(n,{default:e});return}e={default:e,_ctx:Un},t=32}else e=String(e),s&64?(t=16,e=[_u(e)]):t=8;n.children=e,n.shapeFlag|=t}function bu(...n){const e={};for(let t=0;t<n.length;t++){const s=n[t];for(const i in s)if(i==="class")e.class!==s.class&&(e.class=Zn([e.class,s.class]));else if(i==="style")e.style=li([e.style,s.style]);else if(ds(i)){const r=e[i],o=s[i];o&&r!==o&&!(B(r)&&r.includes(o))?e[i]=r?[].concat(r,o):o:o==null&&r==null&&!as(i)&&(e[i]=o)}else i!==""&&(e[i]=s[i])}return e}function re(n,e,t,s=null){Yn(n,e,7,[t,s])}const xu=Do();let yu=0;function ku(n,e,t){const s=n.type,i=(e?e.appContext:n.appContext)||xu,r={uid:yu++,vnode:n,type:s,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new zd(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:zo(s,i),emitsOptions:Ho(s,i),emit:null,emitted:null,propsDefaults:un,inheritAttrs:s.inheritAttrs,ctx:un,data:un,props:un,attrs:un,slots:un,refs:un,setupState:un,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Qa.bind(null,r),n.ce&&n.ce(r),r}let An=null;const el=()=>An||Un;let rs,Ws;{const n=hs(),e=(t,s)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(s),r=>{i.length>1?i.forEach(o=>o(r)):i[0](r)}};rs=e("__VUE_INSTANCE_SETTERS__",t=>An=t),Ws=e("__VUE_SSR_SETTERS__",t=>Ct=t)}const Ht=n=>{const e=An;return rs(n),n.scope.on(),()=>{n.scope.off(),rs(e)}},Xi=()=>{An&&An.scope.off(),rs(null)};function tl(n){return n.vnode.shapeFlag&4}let Ct=!1;function wu(n,e=!1,t=!1){e&&Ws(e);const{props:s,children:i}=n.vnode,r=tl(n);iu(n,s,r,e),cu(n,i,t||e);const o=r?Tu(n,e):void 0;return e&&Ws(!1),o}function Tu(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Ga);const{setup:s}=t;if(s){he();const i=n.setupContext=s.length>1?Eu(n):null,r=Ht(n),o=Dt(s,n,0,[n.props,i]),l=Vr(o);if(pe(),r(),(l||n.sp)&&!xt(n)&&Oo(n),l){if(o.then(Xi,Xi),e)return o.then(c=>{nr(n,c)}).catch(c=>{$s(c,n,0)});n.asyncDep=o}else nr(n,o)}else sl(n)}function nr(n,e,t){j(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:sn(e)&&(n.setupState=$o(e)),sl(n)}function sl(n,e,t){const s=n.type;n.render||(n.render=s.render||ae);{const i=Ht(n);he();try{za(n)}finally{pe(),i()}}}const Su={get(n,e){return Rn(n,"get",""),n[e]}};function Eu(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Su),slots:n.slots,emit:n.emit,expose:e}}function bs(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy($o(da(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in yt)return yt[t](n)},has(e,t){return t in e||t in yt}})):n.proxy}function Ru(n,e=!0){return j(n)?n.displayName||n.name:n.name||e&&n.__name}function Au(n){return j(n)&&"__vccOpts"in n}const Ln=(n,e)=>pa(n,e,Ct);function xi(n,e,t){try{ts(-1);const s=arguments.length;return s===2?sn(e)&&!B(e)?ss(e)?xn(n,null,[e]):xn(n,e):xn(n,null,e):(s>3?t=Array.prototype.slice.call(arguments,2):s===3&&ss(t)&&(t=[t]),xn(n,e,t))}finally{ts(1)}}const Ou="3.5.39";/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ys;const er=typeof window<"u"&&window.trustedTypes;if(er)try{Ys=er.createPolicy("vue",{createHTML:n=>n})}catch{}const il=Ys?n=>Ys.createHTML(n):n=>n,Pu="http://www.w3.org/2000/svg",Cu="http://www.w3.org/1998/Math/MathML",ve=typeof document<"u"?document:null,tr=ve&&ve.createElement("template"),Nu={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,s)=>{const i=e==="svg"?ve.createElementNS(Pu,n):e==="mathml"?ve.createElementNS(Cu,n):t?ve.createElement(n,{is:t}):ve.createElement(n);return n==="select"&&s&&s.multiple!=null&&i.setAttribute("multiple",s.multiple),i},createText:n=>ve.createTextNode(n),createComment:n=>ve.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>ve.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,s,i,r){const o=t?t.previousSibling:e.lastChild;if(i&&(i===r||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===r||!(i=i.nextSibling)););else{tr.innerHTML=il(s==="svg"?`<svg>${n}</svg>`:s==="mathml"?`<math>${n}</math>`:n);const l=tr.content;if(s==="svg"||s==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Se="transition",at="animation",Nt=Symbol("_vtc"),rl={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Iu=yn({},wo,rl),Lu=n=>(n.displayName="Transition",n.props=Iu,n),Mu=Lu((n,{slots:e})=>xi(Ra,Du(n),e)),Ie=(n,e=[])=>{B(n)?n.forEach(t=>t(...e)):n&&n(...e)},sr=n=>n?B(n)?n.some(e=>e.length>1):n.length>1:!1;function Du(n){const e={};for(const P in n)P in rl||(e[P]=n[P]);if(n.css===!1)return e;const{name:t="v",type:s,duration:i,enterFromClass:r=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:l=`${t}-enter-to`,appearFromClass:c=r,appearActiveClass:a=o,appearToClass:d=l,leaveFromClass:u=`${t}-leave-from`,leaveActiveClass:p=`${t}-leave-active`,leaveToClass:$=`${t}-leave-to`}=n,x=Hu(i),k=x&&x[0],I=x&&x[1],{onBeforeEnter:L,onEnter:E,onEnterCancelled:N,onLeave:O,onLeaveCancelled:q,onBeforeAppear:W=L,onAppear:J=E,onAppearCancelled:En=N}=e,U=(P,X,kn,Bn)=>{P._enterCancelled=Bn,Le(P,X?d:l),Le(P,X?a:o),kn&&kn()},Z=(P,X)=>{P._isLeaving=!1,Le(P,u),Le(P,$),Le(P,p),X&&X()},fn=P=>(X,kn)=>{const Bn=P?J:E,mn=()=>U(X,P,kn);Ie(Bn,[X,mn]),ir(()=>{Le(X,P?c:r),me(X,P?d:l),sr(Bn)||rr(X,s,k,mn)})};return yn(e,{onBeforeEnter(P){Ie(L,[P]),me(P,r),me(P,o)},onBeforeAppear(P){Ie(W,[P]),me(P,c),me(P,a)},onEnter:fn(!1),onAppear:fn(!0),onLeave(P,X){P._isLeaving=!0;const kn=()=>Z(P,X);me(P,u),P._enterCancelled?(me(P,p),cr(P)):(cr(P),me(P,p)),ir(()=>{P._isLeaving&&(Le(P,u),me(P,$),sr(O)||rr(P,s,I,kn))}),Ie(O,[P,kn])},onEnterCancelled(P){U(P,!1,void 0,!0),Ie(N,[P])},onAppearCancelled(P){U(P,!0,void 0,!0),Ie(En,[P])},onLeaveCancelled(P){Z(P),Ie(q,[P])}})}function Hu(n){if(n==null)return null;if(sn(n))return[Ps(n.enter),Ps(n.leave)];{const e=Ps(n);return[e,e]}}function Ps(n){return Md(n)}function me(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[Nt]||(n[Nt]=new Set)).add(e)}function Le(n,e){e.split(/\s+/).forEach(s=>s&&n.classList.remove(s));const t=n[Nt];t&&(t.delete(e),t.size||(n[Nt]=void 0))}function ir(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let Bu=0;function rr(n,e,t,s){const i=n._endId=++Bu,r=()=>{i===n._endId&&s()};if(t!=null)return setTimeout(r,t);const{type:o,timeout:l,propCount:c}=Fu(n,e);if(!o)return s();const a=o+"end";let d=0;const u=()=>{n.removeEventListener(a,p),r()},p=$=>{$.target===n&&++d>=c&&u()};setTimeout(()=>{d<c&&u()},l+1),n.addEventListener(a,p)}function Fu(n,e){const t=window.getComputedStyle(n),s=x=>(t[x]||"").split(", "),i=s(`${Se}Delay`),r=s(`${Se}Duration`),o=or(i,r),l=s(`${at}Delay`),c=s(`${at}Duration`),a=or(l,c);let d=null,u=0,p=0;e===Se?o>0&&(d=Se,u=o,p=r.length):e===at?a>0&&(d=at,u=a,p=c.length):(u=Math.max(o,a),d=u>0?o>a?Se:at:null,p=d?d===Se?r.length:c.length:0);const $=d===Se&&/\b(?:transform|all)(?:,|$)/.test(s(`${Se}Property`).toString());return{type:d,timeout:u,propCount:p,hasTransform:$}}function or(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,s)=>lr(t)+lr(n[s])))}function lr(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function cr(n){return(n?n.ownerDocument:document).body.offsetHeight}function ju(n,e,t){const s=n[Nt];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const dr=Symbol("_vod"),Uu=Symbol("_vsh"),Gu=Symbol(""),zu=/(?:^|;)\s*display\s*:/;function Vu(n,e,t){const s=n.style,i=$n(t);let r=!1;if(t&&!i){if(e)if($n(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();t[l]==null&&$t(s,l,"")}else for(const o in e)t[o]==null&&$t(s,o,"");for(const o in t){o==="display"&&(r=!0);const l=t[o];l!=null?Ju(n,o,!$n(e)&&e?e[o]:void 0,l)||$t(s,o,l):$t(s,o,"")}}else if(i){if(e!==t){const o=s[Gu];o&&(t+=";"+o),s.cssText=t,r=zu.test(t)}}else e&&n.removeAttribute("style");dr in n&&(n[dr]=r?s.display:"",n[Uu]&&(s.display="none"))}const ar=/\s*!important$/;function $t(n,e,t){if(B(t))t.forEach(s=>$t(n,e,s));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const s=qu(n,e);ar.test(t)?n.setProperty(Ve(s),t.replace(ar,""),"important"):n[s]=t}}const ur=["Webkit","Moz","ms"],Cs={};function qu(n,e){const t=Cs[e];if(t)return t;let s=Mn(e);if(s!=="filter"&&s in n)return Cs[e]=s;s=fs(s);for(let i=0;i<ur.length;i++){const r=ur[i]+s;if(r in n)return Cs[e]=r}return e}function Ju(n,e,t,s){return n.tagName==="TEXTAREA"&&(e==="width"||e==="height")&&$n(s)&&t===s}const fr="http://www.w3.org/1999/xlink";function hr(n,e,t,s,i,r=Ud(e)){s&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(fr,e.slice(6,e.length)):n.setAttributeNS(fr,e,t):t==null||r&&!Wr(t)?n.removeAttribute(e):n.setAttribute(e,r?"":fe(t)?String(t):t)}function pr(n,e,t,s,i){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?il(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const l=r==="OPTION"?n.getAttribute("value")||"":n.value,c=t==null?n.type==="checkbox"?"on":"":String(t);(l!==c||!("_value"in n))&&(n.value=c),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const l=typeof n[e];l==="boolean"?t=Wr(t):t==null&&l==="string"?(t="",o=!0):l==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(i||e)}function Ze(n,e,t,s){n.addEventListener(e,t,s)}function Ku(n,e,t,s){n.removeEventListener(e,t,s)}const $r=Symbol("_vei");function Wu(n,e,t,s,i=null){const r=n[$r]||(n[$r]={}),o=r[e];if(s&&o)o.value=s;else{const[l,c]=Qu(e);if(s){const a=r[e]=ef(s,i);Ze(n,l,a,c)}else o&&(Ku(n,l,o,c),r[e]=void 0)}}const Yu=/(Once|Passive|Capture)$/,Zu=/^on:?(?:Once|Passive|Capture)$/;function Qu(n){let e,t;for(;(t=n.match(Yu))&&!Zu.test(n);)e||(e={}),n=n.slice(0,n.length-t[1].length),e[t[1].toLowerCase()]=!0;return[n[2]===":"?n.slice(3):Ve(n.slice(2)),e]}let Ns=0;const Xu=Promise.resolve(),nf=()=>Ns||(Xu.then(()=>Ns=0),Ns=Date.now());function ef(n,e){const t=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=t.attached)return;const i=t.value;if(B(i)){const r=s.stopImmediatePropagation;s.stopImmediatePropagation=()=>{r.call(s),s._stopped=!0};const o=i.slice(),l=[s];for(let c=0;c<o.length&&!s._stopped;c++){const a=o[c];a&&Yn(a,e,5,l)}}else Yn(i,e,5,[s])};return t.value=n,t.attached=nf(),t}const gr=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,tf=(n,e,t,s,i,r)=>{const o=i==="svg";e==="class"?ju(n,s,o):e==="style"?Vu(n,t,s):ds(e)?as(e)||Wu(n,e,t,s,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):sf(n,e,s,o))?(pr(n,e,s),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&hr(n,e,s,o,r,e!=="value")):n._isVueCE&&(rf(n,e)||n._def.__asyncLoader&&(/[A-Z]/.test(e)||!$n(s)))?pr(n,Mn(e),s,r,e):(e==="true-value"?n._trueValue=s:e==="false-value"&&(n._falseValue=s),hr(n,e,s,o))};function sf(n,e,t,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in n&&gr(e)&&j(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return gr(e)&&$n(t)?!1:e in n}function rf(n,e){const t=n._def.props;if(!t)return!1;const s=Mn(e);return Array.isArray(t)?t.some(i=>Mn(i)===s):Object.keys(t).some(i=>Mn(i)===s)}const mr=n=>{const e=n.props["onUpdate:modelValue"]||!1;return B(e)?t=>qt(e,t):e};function of(n){n.target.composing=!0}function _r(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const Is=Symbol("_assign");function vr(n,e,t){return e&&(n=n.trim()),t&&(n=oi(n)),n}const lf={created(n,{modifiers:{lazy:e,trim:t,number:s}},i){n[Is]=mr(i);const r=s||i.props&&i.props.type==="number";Ze(n,e?"change":"input",o=>{o.target.composing||n[Is](vr(n.value,t,r))}),(t||r)&&Ze(n,"change",()=>{n.value=vr(n.value,t,r)}),e||(Ze(n,"compositionstart",of),Ze(n,"compositionend",_r),Ze(n,"change",_r))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:s,trim:i,number:r}},o){if(n[Is]=mr(o),n.composing)return;const l=(r||n.type==="number")&&!/^0\d/.test(n.value)?oi(n.value):n.value,c=e??"";if(l===c)return;const a=n.getRootNode();(a instanceof Document||a instanceof ShadowRoot)&&a.activeElement===n&&n.type!=="range"&&(s&&e===t||i&&n.value.trim()===c)||(n.value=c)}},cf=["ctrl","shift","alt","meta"],df={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>cf.some(t=>n[`${t}Key`]&&!e.includes(t))},af=(n,e)=>{if(!n)return n;const t=n._withMods||(n._withMods={}),s=e.join(".");return t[s]||(t[s]=(i,...r)=>{for(let o=0;o<e.length;o++){const l=df[e[o]];if(l&&l(i,e))return}return n(i,...r)})},uf=yn({patchProp:tf},Nu);let br;function ff(){return br||(br=au(uf))}const hf=(...n)=>{const e=ff().createApp(...n),{mount:t}=e;return e.mount=s=>{const i=$f(s);if(!i)return;const r=e._component;!j(r)&&!r.render&&!r.template&&(r.template=i.innerHTML),i.nodeType===1&&(i.textContent="");const o=t(i,!1,pf(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function pf(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function $f(n){return $n(n)?document.querySelector(n):n}const Yt=Be(localStorage.getItem("theme")!=="light");ka(()=>{const n=Yt.value?"dark":"light";document.documentElement.setAttribute("data-theme",n),localStorage.setItem("theme",n)});function gf(){function n(){Yt.value=!Yt.value}return{isDark:Yt,toggle:n}}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Qe=typeof document<"u";function ol(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function mf(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&ol(n.default)}const en=Object.assign;function Ls(n,e){const t={};for(const s in e){const i=e[s];t[s]=ne(i)?i.map(n):n(i)}return t}const wt=()=>{},ne=Array.isArray;function xr(n,e){const t={};for(const s in n)t[s]=s in e?e[s]:n[s];return t}const ll=/#/g,_f=/&/g,vf=/\//g,bf=/=/g,xf=/\?/g,cl=/\+/g,yf=/%5B/g,kf=/%5D/g,dl=/%5E/g,wf=/%60/g,al=/%7B/g,Tf=/%7C/g,ul=/%7D/g,Sf=/%20/g;function yi(n){return n==null?"":encodeURI(""+n).replace(Tf,"|").replace(yf,"[").replace(kf,"]")}function Ef(n){return yi(n).replace(al,"{").replace(ul,"}").replace(dl,"^")}function Zs(n){return yi(n).replace(cl,"%2B").replace(Sf,"+").replace(ll,"%23").replace(_f,"%26").replace(wf,"`").replace(al,"{").replace(ul,"}").replace(dl,"^")}function Rf(n){return Zs(n).replace(bf,"%3D")}function Af(n){return yi(n).replace(ll,"%23").replace(xf,"%3F")}function Of(n){return Af(n).replace(vf,"%2F")}function It(n){if(n==null)return null;try{return decodeURIComponent(""+n)}catch{}return""+n}const Pf=/\/$/,Cf=n=>n.replace(Pf,"");function Ms(n,e,t="/"){let s,i={},r="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return c=l>=0&&c>l?-1:c,c>=0&&(s=e.slice(0,c),r=e.slice(c,l>0?l:e.length),i=n(r.slice(1))),l>=0&&(s=s||e.slice(0,l),o=e.slice(l,e.length)),s=Mf(s??e,t),{fullPath:s+r+o,path:s,query:i,hash:It(o)}}function Nf(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function yr(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function If(n,e,t){const s=e.matched.length-1,i=t.matched.length-1;return s>-1&&s===i&&it(e.matched[s],t.matched[i])&&fl(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function it(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function fl(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(var t in n)if(!Lf(n[t],e[t]))return!1;return!0}function Lf(n,e){return ne(n)?kr(n,e):ne(e)?kr(e,n):(n==null?void 0:n.valueOf())===(e==null?void 0:e.valueOf())}function kr(n,e){return ne(e)?n.length===e.length&&n.every((t,s)=>t===e[s]):n.length===1&&n[0]===e}function Mf(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),s=n.split("/"),i=s[s.length-1];(i===".."||i===".")&&s.push("");let r=t.length-1,o,l;for(o=0;o<s.length;o++)if(l=s[o],l!==".")if(l==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+s.slice(o).join("/")}const Ee={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let Qs=function(n){return n.pop="pop",n.push="push",n}({}),Ds=function(n){return n.back="back",n.forward="forward",n.unknown="",n}({});function Df(n){if(!n)if(Qe){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Cf(n)}const Hf=/^[^#]+#/;function Bf(n,e){return n.replace(Hf,"#")+e}function Ff(n,e){const t=document.documentElement.getBoundingClientRect(),s=n.getBoundingClientRect();return{behavior:e.behavior,left:s.left-t.left-(e.left||0),top:s.top-t.top-(e.top||0)}}const xs=()=>({left:window.scrollX,top:window.scrollY});function jf(n){let e;if("el"in n){const t=n.el,s=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?s?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=Ff(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function wr(n,e){return(history.state?history.state.position-e:-1)+n}const Xs=new Map;function Uf(n,e){Xs.set(n,e)}function Gf(n){const e=Xs.get(n);return Xs.delete(n),e}function zf(n){return typeof n=="string"||n&&typeof n=="object"}function hl(n){return typeof n=="string"||typeof n=="symbol"}let gn=function(n){return n[n.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",n[n.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",n[n.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",n[n.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",n[n.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",n}({});const pl=Symbol("");gn.MATCHER_NOT_FOUND+"",gn.NAVIGATION_GUARD_REDIRECT+"",gn.NAVIGATION_ABORTED+"",gn.NAVIGATION_CANCELLED+"",gn.NAVIGATION_DUPLICATED+"";function rt(n,e){return en(new Error,{type:n,[pl]:!0},e)}function _e(n,e){return n instanceof Error&&pl in n&&(e==null||!!(n.type&e))}const Vf=["params","query","hash"];function qf(n){if(typeof n=="string")return n;if(n.path!=null)return n.path;const e={};for(const t of Vf)t in n&&(e[t]=n[t]);return JSON.stringify(e,null,2)}function Jf(n){const e={};if(n===""||n==="?")return e;const t=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<t.length;++s){const i=t[s].replace(cl," "),r=i.indexOf("="),o=It(r<0?i:i.slice(0,r)),l=r<0?null:It(i.slice(r+1));if(o in e){let c=e[o];ne(c)||(c=e[o]=[c]),c.push(l)}else e[o]=l}return e}function Tr(n){let e="";for(let t in n){const s=n[t];if(t=Rf(t),s==null){s!==void 0&&(e+=(e.length?"&":"")+t);continue}(ne(s)?s.map(i=>i&&Zs(i)):[s&&Zs(s)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+t,i!=null&&(e+="="+i))})}return e}function Kf(n){const e={};for(const t in n){const s=n[t];s!==void 0&&(e[t]=ne(s)?s.map(i=>i==null?null:""+i):s==null?s:""+s)}return e}const Wf=Symbol(""),Sr=Symbol(""),ki=Symbol(""),wi=Symbol(""),ni=Symbol("");function ut(){let n=[];function e(s){return n.push(s),()=>{const i=n.indexOf(s);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Ae(n,e,t,s,i,r=o=>o()){const o=s&&(s.enterCallbacks[i]=s.enterCallbacks[i]||[]);return()=>new Promise((l,c)=>{const a=p=>{p===!1?c(rt(gn.NAVIGATION_ABORTED,{from:t,to:e})):p instanceof Error?c(p):zf(p)?c(rt(gn.NAVIGATION_GUARD_REDIRECT,{from:e,to:p})):(o&&s.enterCallbacks[i]===o&&typeof p=="function"&&o.push(p),l())},d=r(()=>n.call(s&&s.instances[i],e,t,a));let u=Promise.resolve(d);n.length<3&&(u=u.then(a)),u.catch(p=>c(p))})}function Hs(n,e,t,s,i=r=>r()){const r=[];for(const o of n)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(ol(c)){const a=(c.__vccOpts||c)[e];a&&r.push(Ae(a,t,s,o,l,i))}else{let a=c();r.push(()=>a.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const u=mf(d)?d.default:d;o.mods[l]=d,o.components[l]=u;const p=(u.__vccOpts||u)[e];return p&&Ae(p,t,s,o,l,i)()}))}}return r}function Yf(n,e){const t=[],s=[],i=[],r=Math.max(e.matched.length,n.matched.length);for(let o=0;o<r;o++){const l=e.matched[o];l&&(n.matched.find(a=>it(a,l))?s.push(l):t.push(l));const c=n.matched[o];c&&(e.matched.find(a=>it(a,c))||i.push(c))}return[t,s,i]}/*!
 * vue-router v4.6.4
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Zf=()=>location.protocol+"//"+location.host;function $l(n,e){const{pathname:t,search:s,hash:i}=e,r=n.indexOf("#");if(r>-1){let o=i.includes(n.slice(r))?n.slice(r).length:1,l=i.slice(o);return l[0]!=="/"&&(l="/"+l),yr(l,"")}return yr(t,n)+s+i}function Qf(n,e,t,s){let i=[],r=[],o=null;const l=({state:p})=>{const $=$l(n,location),x=t.value,k=e.value;let I=0;if(p){if(t.value=$,e.value=p,o&&o===x){o=null;return}I=k?p.position-k.position:0}else s($);i.forEach(L=>{L(t.value,x,{delta:I,type:Qs.pop,direction:I?I>0?Ds.forward:Ds.back:Ds.unknown})})};function c(){o=t.value}function a(p){i.push(p);const $=()=>{const x=i.indexOf(p);x>-1&&i.splice(x,1)};return r.push($),$}function d(){if(document.visibilityState==="hidden"){const{history:p}=window;if(!p.state)return;p.replaceState(en({},p.state,{scroll:xs()}),"")}}function u(){for(const p of r)p();r=[],window.removeEventListener("popstate",l),window.removeEventListener("pagehide",d),document.removeEventListener("visibilitychange",d)}return window.addEventListener("popstate",l),window.addEventListener("pagehide",d),document.addEventListener("visibilitychange",d),{pauseListeners:c,listen:a,destroy:u}}function Er(n,e,t,s=!1,i=!1){return{back:n,current:e,forward:t,replaced:s,position:window.history.length,scroll:i?xs():null}}function Xf(n){const{history:e,location:t}=window,s={value:$l(n,t)},i={value:e.state};i.value||r(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(c,a,d){const u=n.indexOf("#"),p=u>-1?(t.host&&document.querySelector("base")?n:n.slice(u))+c:Zf()+n+c;try{e[d?"replaceState":"pushState"](a,"",p),i.value=a}catch($){console.error($),t[d?"replace":"assign"](p)}}function o(c,a){r(c,en({},e.state,Er(i.value.back,c,i.value.forward,!0),a,{position:i.value.position}),!0),s.value=c}function l(c,a){const d=en({},i.value,e.state,{forward:c,scroll:xs()});r(d.current,d,!0),r(c,en({},Er(s.value,c,null),{position:d.position+1},a),!1),s.value=c}return{location:s,state:i,push:l,replace:o}}function nh(n){n=Df(n);const e=Xf(n),t=Qf(n,e.state,e.location,e.replace);function s(r,o=!0){o||t.pauseListeners(),history.go(r)}const i=en({location:"",base:n,go:s,createHref:Bf.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function eh(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),nh(n)}let Fe=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.Group=2]="Group",n}({});var bn=function(n){return n[n.Static=0]="Static",n[n.Param=1]="Param",n[n.ParamRegExp=2]="ParamRegExp",n[n.ParamRegExpEnd=3]="ParamRegExpEnd",n[n.EscapeNext=4]="EscapeNext",n}(bn||{});const th={type:Fe.Static,value:""},sh=/[a-zA-Z0-9_]/;function ih(n){if(!n)return[[]];if(n==="/")return[[th]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e($){throw new Error(`ERR (${t})/"${a}": ${$}`)}let t=bn.Static,s=t;const i=[];let r;function o(){r&&i.push(r),r=[]}let l=0,c,a="",d="";function u(){a&&(t===bn.Static?r.push({type:Fe.Static,value:a}):t===bn.Param||t===bn.ParamRegExp||t===bn.ParamRegExpEnd?(r.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${a}) must be alone in its segment. eg: '/:ids+.`),r.push({type:Fe.Param,value:a,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),a="")}function p(){a+=c}for(;l<n.length;){if(c=n[l++],c==="\\"&&t!==bn.ParamRegExp){s=t,t=bn.EscapeNext;continue}switch(t){case bn.Static:c==="/"?(a&&u(),o()):c===":"?(u(),t=bn.Param):p();break;case bn.EscapeNext:p(),t=s;break;case bn.Param:c==="("?t=bn.ParamRegExp:sh.test(c)?p():(u(),t=bn.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case bn.ParamRegExp:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:t=bn.ParamRegExpEnd:d+=c;break;case bn.ParamRegExpEnd:u(),t=bn.Static,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return t===bn.ParamRegExp&&e(`Unfinished custom RegExp for param "${a}"`),u(),o(),i}const Rr="[^/]+?",rh={sensitive:!1,strict:!1,start:!0,end:!0};var Cn=function(n){return n[n._multiplier=10]="_multiplier",n[n.Root=90]="Root",n[n.Segment=40]="Segment",n[n.SubSegment=30]="SubSegment",n[n.Static=40]="Static",n[n.Dynamic=20]="Dynamic",n[n.BonusCustomRegExp=10]="BonusCustomRegExp",n[n.BonusWildcard=-50]="BonusWildcard",n[n.BonusRepeatable=-20]="BonusRepeatable",n[n.BonusOptional=-8]="BonusOptional",n[n.BonusStrict=.7000000000000001]="BonusStrict",n[n.BonusCaseSensitive=.25]="BonusCaseSensitive",n}(Cn||{});const oh=/[.+*?^${}()[\]/\\]/g;function lh(n,e){const t=en({},rh,e),s=[];let i=t.start?"^":"";const r=[];for(const a of n){const d=a.length?[]:[Cn.Root];t.strict&&!a.length&&(i+="/");for(let u=0;u<a.length;u++){const p=a[u];let $=Cn.Segment+(t.sensitive?Cn.BonusCaseSensitive:0);if(p.type===Fe.Static)u||(i+="/"),i+=p.value.replace(oh,"\\$&"),$+=Cn.Static;else if(p.type===Fe.Param){const{value:x,repeatable:k,optional:I,regexp:L}=p;r.push({name:x,repeatable:k,optional:I});const E=L||Rr;if(E!==Rr){$+=Cn.BonusCustomRegExp;try{`${E}`}catch(O){throw new Error(`Invalid custom RegExp for param "${x}" (${E}): `+O.message)}}let N=k?`((?:${E})(?:/(?:${E}))*)`:`(${E})`;u||(N=I&&a.length<2?`(?:/${N})`:"/"+N),I&&(N+="?"),i+=N,$+=Cn.Dynamic,I&&($+=Cn.BonusOptional),k&&($+=Cn.BonusRepeatable),E===".*"&&($+=Cn.BonusWildcard)}d.push($)}s.push(d)}if(t.strict&&t.end){const a=s.length-1;s[a][s[a].length-1]+=Cn.BonusStrict}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function l(a){const d=a.match(o),u={};if(!d)return null;for(let p=1;p<d.length;p++){const $=d[p]||"",x=r[p-1];u[x.name]=$&&x.repeatable?$.split("/"):$}return u}function c(a){let d="",u=!1;for(const p of n){(!u||!d.endsWith("/"))&&(d+="/"),u=!1;for(const $ of p)if($.type===Fe.Static)d+=$.value;else if($.type===Fe.Param){const{value:x,repeatable:k,optional:I}=$,L=x in a?a[x]:"";if(ne(L)&&!k)throw new Error(`Provided param "${x}" is an array but it is not repeatable (* or + modifiers)`);const E=ne(L)?L.join("/"):L;if(!E)if(I)p.length<2&&(d.endsWith("/")?d=d.slice(0,-1):u=!0);else throw new Error(`Missing required param "${x}"`);d+=E}}return d||"/"}return{re:o,score:s,keys:r,parse:l,stringify:c}}function ch(n,e){let t=0;for(;t<n.length&&t<e.length;){const s=e[t]-n[t];if(s)return s;t++}return n.length<e.length?n.length===1&&n[0]===Cn.Static+Cn.Segment?-1:1:n.length>e.length?e.length===1&&e[0]===Cn.Static+Cn.Segment?1:-1:0}function gl(n,e){let t=0;const s=n.score,i=e.score;for(;t<s.length&&t<i.length;){const r=ch(s[t],i[t]);if(r)return r;t++}if(Math.abs(i.length-s.length)===1){if(Ar(s))return 1;if(Ar(i))return-1}return i.length-s.length}function Ar(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const dh={strict:!1,end:!0,sensitive:!1};function ah(n,e,t){const s=lh(ih(n.path),t),i=en(s,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function uh(n,e){const t=[],s=new Map;e=xr(dh,e);function i(u){return s.get(u)}function r(u,p,$){const x=!$,k=Pr(u);k.aliasOf=$&&$.record;const I=xr(e,u),L=[k];if("alias"in u){const O=typeof u.alias=="string"?[u.alias]:u.alias;for(const q of O)L.push(Pr(en({},k,{components:$?$.record.components:k.components,path:q,aliasOf:$?$.record:k})))}let E,N;for(const O of L){const{path:q}=O;if(p&&q[0]!=="/"){const W=p.record.path,J=W[W.length-1]==="/"?"":"/";O.path=p.record.path+(q&&J+q)}if(E=ah(O,p,I),$?$.alias.push(E):(N=N||E,N!==E&&N.alias.push(E),x&&u.name&&!Cr(E)&&o(u.name)),ml(E)&&c(E),k.children){const W=k.children;for(let J=0;J<W.length;J++)r(W[J],E,$&&$.children[J])}$=$||E}return N?()=>{o(N)}:wt}function o(u){if(hl(u)){const p=s.get(u);p&&(s.delete(u),t.splice(t.indexOf(p),1),p.children.forEach(o),p.alias.forEach(o))}else{const p=t.indexOf(u);p>-1&&(t.splice(p,1),u.record.name&&s.delete(u.record.name),u.children.forEach(o),u.alias.forEach(o))}}function l(){return t}function c(u){const p=ph(u,t);t.splice(p,0,u),u.record.name&&!Cr(u)&&s.set(u.record.name,u)}function a(u,p){let $,x={},k,I;if("name"in u&&u.name){if($=s.get(u.name),!$)throw rt(gn.MATCHER_NOT_FOUND,{location:u});I=$.record.name,x=en(Or(p.params,$.keys.filter(N=>!N.optional).concat($.parent?$.parent.keys.filter(N=>N.optional):[]).map(N=>N.name)),u.params&&Or(u.params,$.keys.map(N=>N.name))),k=$.stringify(x)}else if(u.path!=null)k=u.path,$=t.find(N=>N.re.test(k)),$&&(x=$.parse(k),I=$.record.name);else{if($=p.name?s.get(p.name):t.find(N=>N.re.test(p.path)),!$)throw rt(gn.MATCHER_NOT_FOUND,{location:u,currentLocation:p});I=$.record.name,x=en({},p.params,u.params),k=$.stringify(x)}const L=[];let E=$;for(;E;)L.unshift(E.record),E=E.parent;return{name:I,path:k,params:x,matched:L,meta:hh(L)}}n.forEach(u=>r(u));function d(){t.length=0,s.clear()}return{addRoute:r,resolve:a,removeRoute:o,clearRoutes:d,getRoutes:l,getRecordMatcher:i}}function Or(n,e){const t={};for(const s of e)s in n&&(t[s]=n[s]);return t}function Pr(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:fh(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function fh(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const s in n.components)e[s]=typeof t=="object"?t[s]:t;return e}function Cr(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function hh(n){return n.reduce((e,t)=>en(e,t.meta),{})}function ph(n,e){let t=0,s=e.length;for(;t!==s;){const r=t+s>>1;gl(n,e[r])<0?s=r:t=r+1}const i=$h(n);return i&&(s=e.lastIndexOf(i,s-1)),s}function $h(n){let e=n;for(;e=e.parent;)if(ml(e)&&gl(n,e)===0)return e}function ml({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function Nr(n){const e=ue(ki),t=ue(wi),s=Ln(()=>{const c=vn(n.to);return e.resolve(c)}),i=Ln(()=>{const{matched:c}=s.value,{length:a}=c,d=c[a-1],u=t.matched;if(!d||!u.length)return-1;const p=u.findIndex(it.bind(null,d));if(p>-1)return p;const $=Ir(c[a-2]);return a>1&&Ir(d)===$&&u[u.length-1].path!==$?u.findIndex(it.bind(null,c[a-2])):p}),r=Ln(()=>i.value>-1&&bh(t.params,s.value.params)),o=Ln(()=>i.value>-1&&i.value===t.matched.length-1&&fl(t.params,s.value.params));function l(c={}){if(vh(c)){const a=e[vn(n.replace)?"replace":"push"](vn(n.to)).catch(wt);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>a),a}return Promise.resolve()}return{route:s,href:Ln(()=>s.value.href),isActive:r,isExactActive:o,navigate:l}}function gh(n){return n.length===1?n[0]:n}const mh=Ao({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Nr,setup(n,{slots:e}){const t=Mt(Nr(n)),{options:s}=ue(ki),i=Ln(()=>({[Lr(n.activeClass,s.linkActiveClass,"router-link-active")]:t.isActive,[Lr(n.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&gh(e.default(t));return n.custom?r:xi("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},r)}}}),_h=mh;function vh(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function bh(n,e){for(const t in e){const s=e[t],i=n[t];if(typeof s=="string"){if(s!==i)return!1}else if(!ne(i)||i.length!==s.length||s.some((r,o)=>r.valueOf()!==i[o].valueOf()))return!1}return!0}function Ir(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Lr=(n,e,t)=>n??e??t,xh=Ao({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const s=ue(ni),i=Ln(()=>n.route||s.value),r=ue(Sr,0),o=Ln(()=>{let a=vn(r);const{matched:d}=i.value;let u;for(;(u=d[a])&&!u.components;)a++;return a}),l=Ln(()=>i.value.matched[o.value]);Jt(Sr,Ln(()=>o.value+1)),Jt(Wf,l),Jt(ni,i);const c=Be();return vt(()=>[c.value,l.value,n.name],([a,d,u],[p,$,x])=>{d&&(d.instances[u]=a,$&&$!==d&&a&&a===p&&(d.leaveGuards.size||(d.leaveGuards=$.leaveGuards),d.updateGuards.size||(d.updateGuards=$.updateGuards))),a&&d&&(!$||!it(d,$)||!p)&&(d.enterCallbacks[u]||[]).forEach(k=>k(a))},{flush:"post"}),()=>{const a=i.value,d=n.name,u=l.value,p=u&&u.components[d];if(!p)return Mr(t.default,{Component:p,route:a});const $=u.props[d],x=$?$===!0?a.params:typeof $=="function"?$(a):$:null,I=xi(p,en({},x,e,{onVnodeUnmounted:L=>{L.component.isUnmounted&&(u.instances[d]=null)},ref:c}));return Mr(t.default,{Component:I,route:a})||I}}});function Mr(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const yh=xh;function kh(n){const e=uh(n.routes,n),t=n.parseQuery||Jf,s=n.stringifyQuery||Tr,i=n.history,r=ut(),o=ut(),l=ut(),c=aa(Ee);let a=Ee;Qe&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Ls.bind(null,v=>""+v),u=Ls.bind(null,Of),p=Ls.bind(null,It);function $(v,C){let R,M;return hl(v)?(R=e.getRecordMatcher(v),M=C):M=v,e.addRoute(M,R)}function x(v){const C=e.getRecordMatcher(v);C&&e.removeRoute(C)}function k(){return e.getRoutes().map(v=>v.record)}function I(v){return!!e.getRecordMatcher(v)}function L(v,C){if(C=en({},C||c.value),typeof v=="string"){const g=Ms(t,v,C.path),_=e.resolve({path:g.path},C),b=i.createHref(g.fullPath);return en(g,_,{params:p(_.params),hash:It(g.hash),redirectedFrom:void 0,href:b})}let R;if(v.path!=null)R=en({},v,{path:Ms(t,v.path,C.path).path});else{const g=en({},v.params);for(const _ in g)g[_]==null&&delete g[_];R=en({},v,{params:u(g)}),C.params=u(C.params)}const M=e.resolve(R,C),K=v.hash||"";M.params=d(p(M.params));const f=Nf(s,en({},v,{hash:Ef(K),path:M.path})),h=i.createHref(f);return en({fullPath:f,hash:K,query:s===Tr?Kf(v.query):v.query||{}},M,{redirectedFrom:void 0,href:h})}function E(v){return typeof v=="string"?Ms(t,v,c.value.path):en({},v)}function N(v,C){if(a!==v)return rt(gn.NAVIGATION_CANCELLED,{from:C,to:v})}function O(v){return J(v)}function q(v){return O(en(E(v),{replace:!0}))}function W(v,C){const R=v.matched[v.matched.length-1];if(R&&R.redirect){const{redirect:M}=R;let K=typeof M=="function"?M(v,C):M;return typeof K=="string"&&(K=K.includes("?")||K.includes("#")?K=E(K):{path:K},K.params={}),en({query:v.query,hash:v.hash,params:K.path!=null?{}:v.params},K)}}function J(v,C){const R=a=L(v),M=c.value,K=v.state,f=v.force,h=v.replace===!0,g=W(R,M);if(g)return J(en(E(g),{state:typeof g=="object"?en({},K,g.state):K,force:f,replace:h}),C||R);const _=R;_.redirectedFrom=C;let b;return!f&&If(s,M,R)&&(b=rt(gn.NAVIGATION_DUPLICATED,{to:_,from:M}),ee(M,M,!0,!1)),(b?Promise.resolve(b):Z(_,M)).catch(m=>_e(m)?_e(m,gn.NAVIGATION_GUARD_REDIRECT)?m:Te(m):nn(m,_,M)).then(m=>{if(m){if(_e(m,gn.NAVIGATION_GUARD_REDIRECT))return J(en({replace:h},E(m.to),{state:typeof m.to=="object"?en({},K,m.to.state):K,force:f}),C||_)}else m=P(_,M,!0,h,K);return fn(_,M,m),m})}function En(v,C){const R=N(v,C);return R?Promise.reject(R):Promise.resolve()}function U(v){const C=Ke.values().next().value;return C&&typeof C.runWithContext=="function"?C.runWithContext(v):v()}function Z(v,C){let R;const[M,K,f]=Yf(v,C);R=Hs(M.reverse(),"beforeRouteLeave",v,C);for(const g of M)g.leaveGuards.forEach(_=>{R.push(Ae(_,v,C))});const h=En.bind(null,v,C);return R.push(h),zn(R).then(()=>{R=[];for(const g of r.list())R.push(Ae(g,v,C));return R.push(h),zn(R)}).then(()=>{R=Hs(K,"beforeRouteUpdate",v,C);for(const g of K)g.updateGuards.forEach(_=>{R.push(Ae(_,v,C))});return R.push(h),zn(R)}).then(()=>{R=[];for(const g of f)if(g.beforeEnter)if(ne(g.beforeEnter))for(const _ of g.beforeEnter)R.push(Ae(_,v,C));else R.push(Ae(g.beforeEnter,v,C));return R.push(h),zn(R)}).then(()=>(v.matched.forEach(g=>g.enterCallbacks={}),R=Hs(f,"beforeRouteEnter",v,C,U),R.push(h),zn(R))).then(()=>{R=[];for(const g of o.list())R.push(Ae(g,v,C));return R.push(h),zn(R)}).catch(g=>_e(g,gn.NAVIGATION_CANCELLED)?g:Promise.reject(g))}function fn(v,C,R){l.list().forEach(M=>U(()=>M(v,C,R)))}function P(v,C,R,M,K){const f=N(v,C);if(f)return f;const h=C===Ee,g=Qe?history.state:{};R&&(M||h?i.replace(v.fullPath,en({scroll:h&&g&&g.scroll},K)):i.push(v.fullPath,K)),c.value=v,ee(v,C,R,h),Te()}let X;function kn(){X||(X=i.listen((v,C,R)=>{if(!Pe.listening)return;const M=L(v),K=W(M,Pe.currentRoute.value);if(K){J(en(K,{replace:!0,force:!0}),M).catch(wt);return}a=M;const f=c.value;Qe&&Uf(wr(f.fullPath,R.delta),xs()),Z(M,f).catch(h=>_e(h,gn.NAVIGATION_ABORTED|gn.NAVIGATION_CANCELLED)?h:_e(h,gn.NAVIGATION_GUARD_REDIRECT)?(J(en(E(h.to),{force:!0}),M).then(g=>{_e(g,gn.NAVIGATION_ABORTED|gn.NAVIGATION_DUPLICATED)&&!R.delta&&R.type===Qs.pop&&i.go(-1,!1)}).catch(wt),Promise.reject()):(R.delta&&i.go(-R.delta,!1),nn(h,M,f))).then(h=>{h=h||P(M,f,!1),h&&(R.delta&&!_e(h,gn.NAVIGATION_CANCELLED)?i.go(-R.delta,!1):R.type===Qs.pop&&_e(h,gn.NAVIGATION_ABORTED|gn.NAVIGATION_DUPLICATED)&&i.go(-1,!1)),fn(M,f,h)}).catch(wt)}))}let Bn=ut(),mn=ut(),on;function nn(v,C,R){Te(v);const M=mn.list();return M.length?M.forEach(K=>K(v,C,R)):console.error(v),Promise.reject(v)}function $e(){return on&&c.value!==Ee?Promise.resolve():new Promise((v,C)=>{Bn.add([v,C])})}function Te(v){return on||(on=!v,kn(),Bn.list().forEach(([C,R])=>v?R(v):C()),Bn.reset()),v}function ee(v,C,R,M){const{scrollBehavior:K}=n;if(!Qe||!K)return Promise.resolve();const f=!R&&Gf(wr(v.fullPath,0))||(M||!R)&&history.state&&history.state.scroll||null;return gi().then(()=>K(v,C,f)).then(h=>h&&jf(h)).catch(h=>nn(h,v,C))}const Dn=v=>i.go(v);let Je;const Ke=new Set,Pe={currentRoute:c,listening:!0,addRoute:$,removeRoute:x,clearRoutes:e.clearRoutes,hasRoute:I,getRoutes:k,resolve:L,options:n,push:O,replace:q,go:Dn,back:()=>Dn(-1),forward:()=>Dn(1),beforeEach:r.add,beforeResolve:o.add,afterEach:l.add,onError:mn.add,isReady:$e,install(v){v.component("RouterLink",_h),v.component("RouterView",yh),v.config.globalProperties.$router=Pe,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>vn(c)}),Qe&&!Je&&c.value===Ee&&(Je=!0,O(i.location).catch(M=>{}));const C={};for(const M in Ee)Object.defineProperty(C,M,{get:()=>c.value[M],enumerable:!0});v.provide(ki,Pe),v.provide(wi,ho(C)),v.provide(ni,c);const R=v.unmount;Ke.add(v),v.unmount=function(){Ke.delete(v),Ke.size<1&&(a=Ee,X&&X(),X=null,c.value=Ee,Je=!1,on=!1),R()}}};function zn(v){return v.reduce((C,R)=>C.then(()=>U(R)),Promise.resolve())}return Pe}function Ti(n){return ue(wi)}const ei=[{text:"入门",items:[{text:"概述",link:"/v1.0/"},{text:"词法结构",link:"/v1.0/lexical"},{text:"类型系统",link:"/v1.0/types"},{text:"变量与赋值",link:"/v1.0/variables"},{text:"表达式与运算符",link:"/v1.0/expressions"},{text:"控制流",link:"/v1.0/control-flow"},{text:"词条系统",link:"/v1.0/entries"},{text:"函数",link:"/v1.0/functions"},{text:"JSON 数据处理",link:"/v1.0/json"},{text:"面向对象编程",link:"/v1.0/oop"},{text:"模块与引入",link:"/v1.0/modules"},{text:"基础函数",link:"/v1.0/flow-output",children:[{text:"内置函数",children:[{text:"流程控制",link:"/v1.0/flow-control"},{text:"回调",link:"/v1.0/flow-callback"},{text:"主回调",link:"/v1.0/flow-main-callback"},{text:"输出",link:"/v1.0/output"},{text:"打印",link:"/v1.0/output-print"},{text:"打印返回",link:"/v1.0/output-print-return"},{text:"服务器",link:"/v1.0/server"},{text:"启动服务器",link:"/v1.0/server-start"},{text:"对象创建",link:"/v1.0/object"},{text:"new",link:"/v1.0/object-new"},{text:"快捷访问",link:"/v1.0/network"},{text:"访问",link:"/v1.0/net-quick-get"},{text:"访问POST",link:"/v1.0/net-quick-post"},{text:"访问转发",link:"/v1.0/net-quick-forward"}]},{text:"标准库",children:[{text:"字符串",link:"/v1.0/string",children:[{text:"截取",link:"/v1.0/string-substr"},{text:"替换",link:"/v1.0/string-replace"},{text:"删前缀",link:"/v1.0/string-trim-prefix"},{text:"删后缀",link:"/v1.0/string-trim-suffix"},{text:"长度",link:"/v1.0/string-len"},{text:"文本包含",link:"/v1.0/string-contains"},{text:"文本分割",link:"/v1.0/string-split"},{text:"头尾去空",link:"/v1.0/string-trim"},{text:"判断数字",link:"/v1.0/string-is-digit"},{text:"大写",link:"/v1.0/string-upper"},{text:"小写",link:"/v1.0/string-lower"},{text:"首字母大写",link:"/v1.0/string-title"},{text:"大小写互换",link:"/v1.0/string-swapcase"},{text:"查找",link:"/v1.0/string-find"},{text:"计数",link:"/v1.0/string-count"},{text:"开头判断",link:"/v1.0/string-starts-with"},{text:"结尾判断",link:"/v1.0/string-ends-with"},{text:"文本连接",link:"/v1.0/string-join"},{text:"文本重复",link:"/v1.0/string-repeat"},{text:"判断字母",link:"/v1.0/string-is-alpha"},{text:"判断小写",link:"/v1.0/string-is-lower"},{text:"判断大写",link:"/v1.0/string-is-upper"},{text:"判断空白",link:"/v1.0/string-is-whitespace"},{text:"左对齐",link:"/v1.0/string-pad-left"},{text:"右对齐",link:"/v1.0/string-pad-right"},{text:"居中",link:"/v1.0/string-pad-center"}]},{text:"数学",link:"/v1.0/math",children:[{text:"绝对值",link:"/v1.0/math-abs"},{text:"最大值",link:"/v1.0/math-max"},{text:"最小值",link:"/v1.0/math-min"},{text:"幂运算",link:"/v1.0/math-pow"},{text:"求和",link:"/v1.0/math-sum"},{text:"向上取整",link:"/v1.0/math-ceil"},{text:"向下取整",link:"/v1.0/math-floor"},{text:"取整",link:"/v1.0/math-round"}]},{text:"网络",link:"/v1.0/network",children:[{text:"net.新建",link:"/v1.0/net-create"},{text:"net.切换GET",link:"/v1.0/net-switch-get"},{text:"net.切换POST",link:"/v1.0/net-switch-post"},{text:"net.POST",link:"/v1.0/net-post"},{text:"net.POST文件",link:"/v1.0/net-post-file"},{text:"net.设置头部",link:"/v1.0/net-set-header"},{text:"net.设置超时",link:"/v1.0/net-set-timeout"},{text:"net.发送",link:"/v1.0/net-send"},{text:"net.全部内容",link:"/v1.0/net-content-all"},{text:"net.内容",link:"/v1.0/net-content"}]},{text:"类型",link:"/v1.0/type",children:[{text:"t.转文本",link:"/v1.0/type-to-string"},{text:"t.转数字",link:"/v1.0/type-to-number"},{text:"t.转整数",link:"/v1.0/type-to-int"},{text:"t.转浮点",link:"/v1.0/type-to-float"}]},{text:"文件",link:"/v1.0/file",children:[{text:"写文件",link:"/v1.0/file-write"},{text:"读文件",link:"/v1.0/file-read"},{text:"写",link:"/v1.0/file-kv-write"},{text:"读",link:"/v1.0/file-kv-read"},{text:"存在文件",link:"/v1.0/file-exists"},{text:"存在文件夹",link:"/v1.0/file-dir-exists"},{text:"存在文件或文件夹",link:"/v1.0/file-path-exists"},{text:"文件后缀",link:"/v1.0/file-ext"},{text:"文件夹列表",link:"/v1.0/file-list-dirs"},{text:"文件列表",link:"/v1.0/file-list-files"},{text:"随机文件夹名",link:"/v1.0/file-random-dir"},{text:"随机文件名",link:"/v1.0/file-random-file"},{text:"读文件行",link:"/v1.0/file-read-lines"},{text:"文件大小",link:"/v1.0/file-size"},{text:"文件夹大小",link:"/v1.0/file-dir-size"},{text:"删除文件",link:"/v1.0/file-delete"},{text:"删除文件夹",link:"/v1.0/file-delete-dir"},{text:"重命名",link:"/v1.0/file-rename"},{text:"复制粘贴",link:"/v1.0/file-copy"},{text:"下载文件",link:"/v1.0/file-download"}]},{text:"画布",link:"/v1.0/canvas",children:[{text:"创建画布",link:"/v1.0/canvas-create"},{text:"画布.获取",link:"/v1.0/canvas-get"},{text:"画笔.设置颜色",link:"/v1.0/canvas-set-color"},{text:"绘制.线",link:"/v1.0/canvas-line"},{text:"绘制.方形",link:"/v1.0/canvas-rect"},{text:"绘制.椭圆",link:"/v1.0/canvas-ellipse"},{text:"绘制.文本",link:"/v1.0/canvas-text"},{text:"绘制.图片",link:"/v1.0/canvas-image"}]}]}]}]}];function wh(n){const e=[];for(const t of n)if(t.link&&!t.children)e.push(t);else if(t.children){t.link&&e.push({text:t.text,link:t.link});for(const s of t.children)if(s.children){s.link&&e.push({text:s.text,link:s.link});for(const i of s.children)if(i.children){i.link&&e.push({text:i.text,link:i.link});for(const r of i.children)e.push(r)}else e.push(i)}else e.push(s)}return e}const zt=ei.flatMap(n=>wh(n.items));function Th(){const n=Ti(),e=Ln(()=>zt.findIndex(i=>i.link===n.path)),t=Ln(()=>e.value>0?zt[e.value-1]:null),s=Ln(()=>e.value<zt.length-1?zt[e.value+1]:null);return{prev:t,next:s}}const ot=(n,e)=>{const t=n.__vccOpts||n;for(const[s,i]of e)t[s]=i;return t},Sh={class:"sidebar-nav"},Eh={class:"sidebar-section-title"},Rh=["href"],Ah=["href"],Oh={key:1,class:"sidebar-section-title"},Ph=["href"],Ch={class:"sidebar-sub-title"},Nh={class:"sidebar-sub-group"},Ih=["href"],Lh={class:"sidebar-toggle"},Mh=["onClick"],Dh=["href"],Hh={key:1},Bh={key:0,class:"sidebar-sub-group-deep"},Fh=["href"],jh={__name:"Sidebar",setup(n){const e=Ti(),t=Mt({});function s(l){return l.includes("#")?l:"#"+l}function i(l){return e.path===l}function r(l){t[l]=!t[l]}function o(l){return t[l]===!0}return(l,c)=>(G(),z("nav",Sh,[(G(!0),z(pn,null,De(vn(ei),(a,d)=>(G(),z("div",{key:a.text,class:Zn(["sidebar-group",{"has-divider":d<vn(ei).length-1}])},[V("p",Eh,Sn(a.text),1),(G(!0),z(pn,null,De(a.items,u=>(G(),z(pn,{key:u.link||u.text},[u.link&&!u.children?(G(),z("a",{key:0,href:s(u.link),class:Zn(["sidebar-link","sidebar-link-sub",{active:i(u.link)}])},Sn(u.text),11,Rh)):(G(),z(pn,{key:1},[u.link?(G(),z("a",{key:0,href:s(u.link),class:"sidebar-section-title sidebar-section-link"},Sn(u.text),9,Ah)):(G(),z("p",Oh,Sn(u.text),1)),(G(!0),z(pn,null,De(u.children||[],p=>(G(),z(pn,{key:p.link||p.text},[p.link&&!p.children?(G(),z("a",{key:0,href:s(p.link),class:Zn(["sidebar-link","sidebar-link-sub",{active:i(p.link)}])},Sn(p.text),11,Ph)):p.children?(G(),z(pn,{key:1},[V("p",Ch,Sn(p.text),1),V("div",Nh,[(G(!0),z(pn,null,De(p.children,$=>(G(),z(pn,{key:$.link||$.text},[$.link&&!$.children?(G(),z("a",{key:0,href:s($.link),class:Zn(["sidebar-link","sidebar-link-fn",{active:i($.link)}])},Sn($.text),11,Ih)):$.children?(G(),z(pn,{key:1},[V("p",Lh,[V("span",{class:Zn(["toggle-arrow",{open:o($.text)}]),onClick:x=>r($.text)},"▶",10,Mh),$.link?(G(),z("a",{key:0,href:s($.link),class:Zn(["sidebar-toggle-link",{active:i($.link)}])},Sn($.text),11,Dh)):(G(),z("span",Hh,Sn($.text),1))]),xn(Mu,{name:"slide"},{default:xo(()=>[o($.text)?(G(),z("div",Bh,[(G(!0),z(pn,null,De($.children,x=>(G(),z("a",{key:x.link,href:s(x.link),class:Zn(["sidebar-link","sidebar-link-fn-deep",{active:i(x.link)}])},Sn(x.text),11,Fh))),128))])):Ge("",!0)]),_:2},1024)],64)):Ge("",!0)],64))),128))])],64)):Ge("",!0)],64))),128))],64))],64))),128))],2))),128))]))}},Uh=ot(jh,[["__scopeId","data-v-7c845216"]]),_l=`# $创建画布$ — 创建画布

导入：\`#引入=@画布\` | 标准库函数。

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

> 画布句柄在脚本期间持续有效，脚本结束后自动释放。`,vl=`# $绘制.椭圆$ — 绘制填充椭圆

导入：\`#引入=@画布\` | 标准库函数。

- **签名**：\`$绘制.椭圆 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、外接矩形左上角 x、y、宽度、高度、可选的颜色
- **返回值**：无

算法：使用中点椭圆算法（Midpoint Ellipse Algorithm）绘制填充椭圆。当 w = h 时为圆形。

\`\`\`
$绘制.椭圆 %_% 100 100 200 150$
$绘制.椭圆 %_% 100 100 100 100 红色$    → 圆形
\`\`\``,bl='# $画布.获取$ — 获取画布输出\n\n导入：`#引入=@画布` | 标准库函数。\n\n- **签名**：`$画布.获取 [handle] [format]$`\n- **参数**：画布句柄、可选的输出格式（默认 PNG；支持 `"png"`、`"jpeg"`、`"raw"`）\n- **返回值**：编码的像素数据（PNG、JPEG 或原始 RGBA 字节）\n\n将像素缓冲区编码输出。`"raw"` 格式返回原始 RGBA 像素缓冲区字节。\n\n```\nimg:$画布.获取 %画%$\n```',xl=`# $绘制.图片$ — 绘制图片

导入：\`#引入=@画布\` | 标准库函数。

- **签名**：\`$绘制.图片 [handle] [srcCanvasOrData] [x] [y] [alpha]$\`
- **参数**：画布句柄、源画布句柄或 Base64 图片数据、左上角 x、y、可选的透明度
- **返回值**：无

算法：将源画布或 Base64 编码的图片数据逐像素复制到目标画布的指定区域。支持 alpha 混合。

\`\`\`
$绘制.图片 %_% %srcCanvas% 50 50$
$绘制.图片 %_% %srcCanvas% 50 50 128$
\`\`\``,yl=`# $绘制.线$ — 绘制线段

导入：\`#引入=@画布\` | 标准库函数。

- **签名**：\`$绘制.线 [handle] [x1] [y1] [x2] [y2] [color]$\`
- **参数**：画布句柄、起点坐标、终点坐标、可选的颜色
- **返回值**：无

算法：使用 Bresenham 直线算法绘制线段，画笔大小影响线宽。

\`\`\`
$绘制.线 %_% 0 0 200 200$
\`\`\``,kl=`# $绘制.方形$ — 绘制填充矩形

导入：\`#引入=@画布\` | 标准库函数。

- **签名**：\`$绘制.方形 [handle] [x] [y] [w] [h] [color]$\`
- **参数**：画布句柄、左上角 x、左上角 y、宽度、高度、可选的颜色
- **返回值**：无

算法：以 (x, y) 为左上角，填充宽 w × 高 h 的矩形区域。

\`\`\`
$绘制.方形 %_% 50 50 100 80$
$绘制.方形 %_% 50 50 100 80 蓝色$
\`\`\``,wl=`# $画笔.设置颜色$ — 设置画笔颜色

导入：\`#引入=@画布\` | 标准库函数。

- **签名**：\`$画笔.设置颜色 [handle] [color]$\`
- **参数**：画布句柄、颜色
- **返回值**：无

设置当前画布的画笔颜色，后续绘制操作使用该颜色。支持预定义颜色名、十六进制、RGB、RGBA 格式。

\`\`\`
$画笔.设置颜色 %_% 红色$
$画笔.设置颜色 %_% #FF6600$
$画笔.设置颜色 %_% 128,64,32$
$画笔.设置颜色 %_% 随机$
\`\`\``,Tl=`# $绘制.文本$ — 绘制文本

导入：\`#引入=@画布\` | 标准库函数。

- **签名**：\`$绘制.文本 [handle] [x] [y] [text] [color] [strokeColor]$\`
- **参数**：画布句柄、x 坐标、y 坐标、文本内容、可选的颜色、可选的描边颜色
- **返回值**：无

算法：使用引擎内置的位图字体将文本渲染为像素。支持可选的描边颜色参数。

\`\`\`
$绘制.文本 %_% 50 50 Hello 黑色$
$绘制.文本 %_% 100 100 Rotated 黑色 红色$
\`\`\``,Sl=`# 11.11 @画布

标准库 | 共 29 个函数。画布模块提供像素级图像创建、绘制、特效处理。基于内存像素缓冲区，通过句柄（handle）管理多画布实例。\`$创建画布$\` 返回画布句柄，需自行赋值给变量（如 \`画:$创建画布 800 600$\`），后续操作通过该句柄引用画布。使用前需 \`#引入=@画布\`。

## 11.11.1 画布生命周期

画布的完整生命周期为三个阶段：

1. **创建（Create）**：通过 \`$创建画布$\` 分配内存像素缓冲区，返回句柄。此时可指定宽高和背景色。
2. **绘制（Draw）**：通过 \`$绘制.xxx$\` 系列函数在缓冲区上绘制图形、文本、图片。所有绘制操作即时生效，顺序决定层叠关系（后绘制覆盖先绘制）。
3. **获取（Get）**：通过 \`$画布.获取$\` 将像素缓冲区编码为 PNG 格式输出。获取后画布仍可继续修改，但通常此时即为最终结果。

画布句柄在脚本执行期间持续有效，脚本结束后自动释放。同一脚本可同时持有多个画布句柄。

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

## 11.11.2 画笔设置

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

## 11.11.3 基本绘制

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

## 11.11.4 椭圆与圆形

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

## 11.11.5 多边形

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

## 11.11.6 特效绘制

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

## 11.11.7 文本与图片

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

## 11.11.8 特效处理

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

## 11.11.9 完整示例

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
`,El=`# 5. 控制流

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
`,Rl=`# 6. 词条系统

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
`,Al='# 4. 表达式与运算符\n\n表达式是 NR 中执行计算和逻辑判断的核心机制。本章涵盖数学表达式 `[...]`、比较运算符、逻辑运算符及其优先级规则。理解运算符的优先级、结合性和类型转换行为，对于编写正确的 [条件判断](./control-flow) 和[变量赋值](./variables)至关重要。\n\nNR 的运算符体系分为三个层级：**数学运算符**（在 `[...]` 内使用）、**比较运算符**和**逻辑运算符**。它们在表达式中按固定的优先级顺序求值。\n\n## 4.1 数学表达式 `[...]`\n\n```\nresult:[1+2*3]              → "7"\nscore:[%base%*2+10]\n```\n\n### 运算符优先级总表（从高到低）\n\n| 优先级 | 类别 | 运算符 | 结合性 | 说明 |\n|--------|------|--------|--------|------|\n| 1（最高） | 分组 | `()` | — | 括号分组 |\n| 2 | 一元 | `-` | 右→左 | 一元负号 |\n| 3 | 幂 | `^` | 右→左 | 幂运算（`2^3^2 = 2^9 = 512`） |\n| 4 | 乘除取余 | `*` `/` `%` | 左→右 | 乘、除、取余 |\n| 5 | 加减 | `+` `-` | 左→右 | 加、减 |\n| 6 | 位移 | `<<` `>>` | 左→右 | 左移、右移 |\n| 7 | 比较 | `>=` `<=` `>` `<` `==` `!=` `===` `!==` `~=` `in` | — | 比较运算（非数学表达式） |\n| 8 | 逻辑 AND | `&&` `&` | 左→右（短路） | 逻辑与 |\n| 9（最低） | 逻辑 OR | `\\|\\|` `\\|` | 左→右（短路） | 逻辑或 |\n\n**结合性说明**：\n\n- **左结合**（左→右）：`a / b / c` 解释为 `(a / b) / c`\n- **右结合**（右→左）：`- -x` 解释为 `-(-x)`；`2^3^2` 解释为 `2^(3^2)`\n\n注意：比较和逻辑运算符不在 `[...]` 数学表达式中使用——它们出现在条件语句（`如果:`、`循环>`）和 `$if$` 等结构中。数学表达式 `[...]` 内部仅使用优先级 1-6 的运算符。\n\n- 整数运算结果仍为整数，浮点数参与则为浮点\n- 位运算和幂运算强制转整数\n\n### 混合类型运算的边界情况\n\n当数学表达式中混合不同类型的操作数时，结果遵循以下规则：\n\n```\n// 类型提升示例\n[1+2.0]        → 3.0   （Int + Float → Float）\n[3/2]          → 1     （Int 除法，截断）\n[3/2.0]        → 1.5   （Float 除法）\n\n// 边界情况\n[1/0]          → 报错（整数除零）\n[1.0/0.0]      → inf   （浮点除零，返回无穷大）\n[-2147483648]    → 溢出 (i64 边界)\n[0.1+0.2]      → 0.30000000000000004  （IEEE 754 精度问题）\n```\n\n**注意事项：**\n\n- 整数除法 `a / b` 结果为整数（向零截断），不是四舍五入。\n- 幂运算 `a ^ b` 要求 b 为非负整数（包括 0）。\n- 位移运算 `a << b` 中 b 必须是非负整数，且结果类型为整数。\n\n## 4.2 比较运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `==` | 字符串相等（宽松，自动类型转换） |\n| `!=` | 字符串不等（宽松） |\n| `===` | 严格相等（比较值和类型） |\n| `!==` | 严格不等（比较值和类型） |\n| `>=` `<=` `>` `<` | 数值比较 |\n| `~=` | 正则匹配 |\n| `in` | 包含判断 |\n\n### 严格比较 `===` / `!==`\n\n- `===` 要求值和**类型**都相同：`1 === 1` 为真，`1 === 1.0`（Int vs Float）为假\n- `!==` 取反：类型不同或值不同时为真\n- 普通 `==` / `!=` 做字符串比较，不区分类型\n\n```\n如果:%a%===1       ← 严格检查整数 1\n整数 1\n如果尾\n\n如果:%a%===1.5     ← 严格检查浮点数 1.5\n浮点数 1.5\n如果尾\n```\n\n### 比较运算边界情况\n\n```\n// 数值比较中的类型问题\n[1>0.5]          → 在条件中为真（自动类型提升比较数值）\n1 == 1.0            → 条件判断中为真（宽松相等，都转为 "1"）\n1 === 1.0           → 条件判断中为假（严格相等，Int vs Float）\n```\n\n- 数值比较（`>` `<` `>=` `<=`）会自动尝试将双方转为数值再比较。一方无法转数值时报错。\n- `==` 宽松相等适合快速判断，但**在需要区分 Int/Float 时请用 `===`**。\n- `~=`（正则匹配）右侧必须是正则模式；`in` 左侧检查是否包含于右侧（字符串子串或数组元素）。\n\n## 4.3 逻辑运算符\n\n| 操作符 | 含义 |\n|--------|------|\n| `&&` / `&` | 逻辑 AND（短路） |\n| `\\|\\|` / `\\|` | 逻辑 OR（短路） |\n\n单操作数时做真值判断：非空、非 `"0"`、非 `"false"`、非 `"null"` 为真。\n',Ol=`\uFEFF# $复制粘贴$ — 复制文件

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$复制粘贴 [源路径] [目标路径]$</code></dd>
  <dt>参数</dt><dd>源文件路径、目标文件路径</dd>
  <dt>返回值</dt><dd>"true"（成功）或 "false"（失败）</dd>
</dl>

复制源文件（或目录）到目标路径。若源为目录则递归复制整个目录。若目标已存在则覆盖。

\`\`\`
$复制粘贴 source.txt dest.txt$
\`\`\`
`,Pl=`\uFEFF# $删除文件夹$ — 递归删除目录

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$删除文件夹 [路径]$</code></dd>
  <dt>参数</dt><dd>目录路径</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

递归删除指定目录及其所有内容。谨慎使用，此操作不可逆。
`,Cl=`\uFEFF# $删除文件$ — 删除文件

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$删除文件 [路径]$</code></dd>
  <dt>参数</dt><dd>文件路径</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

删除指定文件。

\`\`\`
$删除文件 temp/cache.tmp$
\`\`\`
`,Nl=`\uFEFF# $存在文件夹$ — 判断目录是否存在

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$存在文件夹 [路径]$</code></dd>
  <dt>参数</dt><dd>目录路径</dd>
  <dt>返回值</dt><dd>"true"（存在）或 "false"（不存在）</dd>
</dl>

\`\`\`
$存在文件夹 uploads$
\`\`\`

> 建议在关键文件操作前使用此函数做前置检查。
`,Il=`\uFEFF# $文件夹大小$ — 获取目录大小

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$文件夹大小 [路径]$</code></dd>
  <dt>参数</dt><dd>目录路径</dd>
  <dt>返回值</dt><dd>目录及其子目录中所有文件的总字节大小</dd>
</dl>

递归计算目录及其所有子目录中文件的总字节大小。
`,Ll=`\uFEFF# $下载文件$ — 下载文件

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$下载文件 [下载地址] [保存路径]$</code></dd>
  <dt>参数</dt><dd>下载 URL、本地保存路径</dd>
  <dt>返回值</dt><dd>"true"（成功）或空字符串（失败）</dd>
</dl>

从指定 URL 下载文件并保存到本地路径。使用引擎内置的 HTTP 客户端，超时等行为与网络访问模块一致。

\`\`\`
$下载文件 https://example.com/logo.png assets/logo.png$
\`\`\`

> 所有文件操作函数失败时返回空字符串，建议在关键操作前使用 \`$存在文件$\` 或 \`$存在文件夹$\` 做前置检查。
`,Ml=`\uFEFF# $存在文件$ — 判断文件是否存在

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$存在文件 [路径]$</code></dd>
  <dt>参数</dt><dd>文件路径</dd>
  <dt>返回值</dt><dd>"true"（存在）或 "false"（不存在）</dd>
</dl>

判断指定路径的文件是否存在（不包含目录）。

\`\`\`
$存在文件 config.yaml$
\`\`\`

> 建议在关键文件操作前使用此函数做前置检查。
`,Dl=`\uFEFF# $文件后缀$ — 获取文件扩展名

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$文件后缀 [文件名]$</code></dd>
  <dt>参数</dt><dd>文件名</dd>
  <dt>返回值</dt><dd>扩展名（含点号）；无后缀则返回空字符串</dd>
</dl>

\`\`\`
$文件后缀 photo.jpg$             → ".jpg"
\`\`\`
`,Hl=`\uFEFF# $读$ — 键值数据库读取

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$读 [文件名] [键名] [默认值]$</code></dd>
  <dt>参数</dt><dd>数据库文件名、可选的键名、可选的默认值</dd>
  <dt>返回值</dt><dd>不指定键名时返回所有键值对的 JSON 数组；指定键名时返回对应值，键不存在则返回默认值</dd>
</dl>

从键值数据库中读取数据。

\`\`\`
$读 cache$                       → 所有键值对的 JSON 数组
$读 cache 用户1$                 → "小明"
$读 cache 用户3 无名氏$          → "无名氏"
\`\`\`

> \`$写$\`/\`$读$\` 提供键值数据库抽象，适合缓存和持久化状态。
`,Bl="\uFEFF# $写$ — 键值数据库写入\n\n基础函数 | `#引入=@文件`\n\n<dl>\n  <dt>签名</dt><dd><code>$写 [文件名] [键名] [值]$</code></dd>\n  <dt>参数</dt><dd>数据库文件名、键名、值</dd>\n  <dt>返回值</dt><dd>无</dd>\n</dl>\n\n向键值数据库中写入一个键值对。同一键名多次写入会覆盖旧值。与 `$写文件$` 的区别：`$写$`/`$读$` 提供键值对存取模型，引擎内部加锁保证并发安全。\n\n```\n$写 cache 用户1 小明$\n```\n\n> `$写$`/`$读$` 适合缓存和持久化状态场景。\n",Fl=`\uFEFF# $文件夹列表$ — 列出子目录

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$文件夹列表 [路径]$</code></dd>
  <dt>参数</dt><dd>目录路径</dd>
  <dt>返回值</dt><dd>子目录名称的 JSON 数组字符串；无子目录返回 "[]"</dd>
</dl>

\`\`\`
$文件夹列表 data$                → "["backup","images"]"
\`\`\`
`,jl=`\uFEFF# $文件列表$ — 列出文件

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$文件列表 [路径]$</code></dd>
  <dt>参数</dt><dd>目录路径</dd>
  <dt>返回值</dt><dd>文件名称的 JSON 数组字符串（不含子目录）</dd>
</dl>

\`\`\`
$文件列表 images$                → "["logo.png","banner.jpg"]"
\`\`\`
`,Ul=`\uFEFF# $存在文件或文件夹$ — 判断路径是否存在

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$存在文件或文件夹 [路径]$</code></dd>
  <dt>参数</dt><dd>任意路径</dd>
  <dt>返回值</dt><dd>"true"（存在）或 "false"（不存在）</dd>
</dl>

判断指定路径是否存在（无论是文件还是目录）。

\`\`\`
$存在文件或文件夹 database/cache$
\`\`\`
`,Gl=`\uFEFF# $随机文件夹名$ — 生成随机目录名

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$随机文件夹名 [路径]$</code></dd>
  <dt>参数</dt><dd>父目录路径</dd>
  <dt>返回值</dt><dd>随机文件夹名称字符串（不实际创建目录）</dd>
</dl>

生成一个随机的文件夹名称字符串，不实际创建目录。用于需要临时目录名的场景。
`,zl=`\uFEFF# $随机文件名$ — 生成随机文件名

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$随机文件名 [路径]$</code></dd>
  <dt>参数</dt><dd>父目录路径</dd>
  <dt>返回值</dt><dd>随机文件名称字符串（不实际创建文件）</dd>
</dl>

生成一个随机的文件名称字符串，不实际创建文件。
`,Vl=`\uFEFF# $读文件.行数$ — 统计文件行数

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$读文件.行数 [路径] [默认值]$</code></dd>
  <dt>参数</dt><dd>文件路径、可选的默认值</dd>
  <dt>返回值</dt><dd>总行数</dd>
</dl>

统计文本文件的总行数。空行也算一行。

\`\`\`
$读文件.行数 data.log$           → "150"
\`\`\`
`,ql=`\uFEFF# $读文件行$ — 读取指定行范围

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$读文件行 [路径] [起始行] [数量] [默认值]$</code></dd>
  <dt>参数</dt><dd>文件路径、起始行（从 1 开始）、行数、可选的默认值</dd>
  <dt>返回值</dt><dd>JSON 数组字符串；起始行超出范围返回默认值</dd>
</dl>

从指定起始行读取若干行，以 JSON 数组字符串形式返回。

\`\`\`
$读文件行 data.log 10 5$          → JSON 数组
\`\`\`
`,Jl=`\uFEFF# $读文件.随机一行$ — 随机读取一行

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$读文件.随机一行 [路径] [默认值]$</code></dd>
  <dt>参数</dt><dd>文件路径、可选的默认值</dd>
  <dt>返回值</dt><dd>随机选中的一行；文件不存在时返回默认值</dd>
</dl>

从文本文件中随机读取一行。文件按行分割后随机选取，每行被选中的概率均等。

\`\`\`
$读文件.随机一行 quotes.txt 无内容$
\`\`\`
`,Kl=`\uFEFF# $读文件$ — 读取文件

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$读文件 [路径] [默认值]$</code></dd>
  <dt>参数</dt><dd>文件路径、可选的默认值</dd>
  <dt>返回值</dt><dd>文件全部内容；文件不存在或失败时返回默认值（省略时返回空字符串）</dd>
</dl>

读取文件的全部内容作为字符串返回。读取时自动将 \`\\r\\n\` 和 \`\\r\` 换行符归一化为 \`\\n\`。

\`\`\`
$读文件 data/config.json 默认配置$
\`\`\`

> 建议在关键文件操作前使用 \`$存在文件$\` 做前置检查。
`,Wl=`\uFEFF# $重命名$ — 重命名文件或目录

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$重命名 [旧名] [新名]$</code></dd>
  <dt>参数</dt><dd>旧名称、新名称</dd>
  <dt>返回值</dt><dd>"true"（成功）或 "false"（失败）</dd>
</dl>

将文件或目录从旧名称改为新名称。目标已存在时可能失败。

\`\`\`
$重命名 old.txt new.txt$
\`\`\`
`,Yl=`\uFEFF# $文件大小$ — 获取文件大小

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$文件大小 [路径]$</code></dd>
  <dt>参数</dt><dd>文件路径</dd>
  <dt>返回值</dt><dd>文件字节大小；文件不存在返回 "0"</dd>
</dl>

\`\`\`
$文件大小 video.mp4$             → "104857600"
\`\`\`
`,Zl=`\uFEFF# $写文件$ — 写入文件

基础函数 | \`#引入=@文件\`

<dl>
  <dt>签名</dt><dd><code>$写文件 [路径] [内容]$</code></dd>
  <dt>参数</dt><dd>文件路径、要写入的内容</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

将内容写入指定路径的文件，若文件不存在则创建，若存在则覆盖。

\`\`\`
$写文件 logs/app.log 启动成功$
$写文件 data/config.json {"port":8080}$
\`\`\`

> 所有文件操作函数失败时返回空字符串（不赋值），不抛出异常。
`,Ql=`\uFEFF\uFEFF# 11.6 文件操作

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

[返回基础函数 →](./flow-output)
`,Xl=`# $回调$ — 正则匹配内部词条

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$回调 [pattern] [参数]$</code></dd>
  <dt>参数</dt><dd>正则匹配模式、可选的参数</dd>
  <dt>返回值</dt><dd>匹配到的内部词条的执行结果；无匹配返回空字符串</dd>
</dl>

在新子上下文中正则匹配 \`[内部]\` 词条并执行，捕获分组存入 \`%括号1%\`、\`%括号2%\` 等。新上下文执行，不污染调用者变量。参数传递给匹配到的内部词条。

\`\`\`
[内部]say_(.*)
你好，%括号1%！

$回调 say_hello world$     ← 匹配 say_(.*)，%括号1%=hello，%参数1%=world
\`\`\`

> 回调机制基于正则匹配内部词条，在独立子上下文中执行。`,nc=`# 11.1 流程控制

基础函数 | 共 2 个函数。\`$回调$\` 和 \`$主回调$\` 为 NR 的核心流程控制机制，无需导入。

## 回调机制详解

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

> 回调机制基于正则匹配内部词条，在独立子上下文中执行。\`$回调$\` 和 \`$主回调$\` 是 NR 实现逻辑分发和控制反转的核心。

[← 基础函数](./flow-output) [输出 →](./output)
`,ec=`# $主回调$ — 匹配主词条

基础函数 | 无需导入。

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

> \`$回调$\` 和 \`$主回调$\` 是 NR 实现逻辑分发和控制反转的核心。`,tc=`# 11. 基础函数

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
| 流程控制 | [11.1](./flow-control) | 2 | \`$回调$\`、\`$主回调$\` |
| 输出 | [11.2](./output) | 2 | \`$打印$\`、\`$打印返回$\` |
| 服务器 | [11.3](./server) | 1 | \`$启动服务器$\` |
| 对象创建 | [11.4](./object) | 1 | \`$new$\` |
| 访问 | [11.5](./network) | 3 | 快捷 HTTP 请求（无需导入） |
| 文件操作 | [11.6](./file) | 22 | 文件读写、存在判断、列表、删除等 |
| **标准库** | | | |
| @字符串 | [11.7](./string) | 22 | 字符串操作 |
| @数学 | [11.8](./math) | 8 | 数学运算 |
| @访问 | [11.9](./network) | 12 | HTTP 客户端状态机 |
| @类型 | [11.10](./type) | 4 | 类型转换 |
| @画布 | [11.11](./canvas) | 29 | 像素级图像绘制 |

## 基础函数

基础函数在引擎启动时即注册完毕，始终可用，无需任何导入声明。

> 基础函数（11.1-11.6）无需导入，始终可用。标准库函数（11.7-11.11）需通过 \`#引入=@模块名\` 加载。

[← 模块与引入](./modules) [流程控制 →](./flow-control)
`,sc=`# 7. 函数

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
- 避免使用与基础函数同名的函数名（如 \`打印\`、\`new\`），会导致覆盖

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
`,ic=`NR 是 Nebula 词库引擎的领域特定语言（DSL），扩展名为 \`.nr\`，用于定义词条、函数、变量和自动化流程。适用于聊天机器人、互动小说、自动化文本生成等场景。

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
| 11 | [基础函数](./flow-output) | 流程控制、输出、服务器、对象创建、标准库函数（@字符串/@数学/@访问/@类型/@画布）、文件操作 |

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
`,rc=`# 8. JSON 数据处理

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
`,oc=`# 1. 词法结构

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
`,lc=`# $绝对值$ — 取绝对值

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$绝对值 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：数字的绝对值

正数保持不变，负数取相反数。支持整数和浮点数。

\`\`\`
$绝对值 -5$          → "5"
$绝对值 3.14$        → "3.14"
\`\`\``,cc=`# $向上取整$ — 向上取整

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$向上取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不小于输入值的最小整数

向正无穷方向取整。

\`\`\`
$向上取整 3.14$        → "4"
$向上取整 -3.14$       → "-3"
\`\`\``,dc=`# $向下取整$ — 向下取整

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$向下取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不大于输入值的最大整数

向负无穷方向取整。

\`\`\`
$向下取整 3.14$        → "3"
$向下取整 -3.14$       → "-4"
\`\`\``,ac=`# $最大值$ — 取最大值

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$最大值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最大的数字

从一组数字中返回最大值。支持可变数量的参数。

\`\`\`
$最大值 3 7 2$       → "7"
\`\`\``,uc=`# $最小值$ — 取最小值

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$最小值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最小的数字

从一组数字中返回最小值。支持可变数量的参数。

\`\`\`
$最小值 3 7 2$       → "2"
\`\`\``,fc=`# $幂运算$ — 幂运算

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$幂运算 [底数] [指数]$\`
- **参数**：底数和指数（均为数字）
- **返回值**：底数的指数次幂

计算底数的指数次幂。支持分数指数（如 0.5 即开平方根）、负指数。

\`\`\`
$幂运算 2 3$          → "8"
$幂运算 2 10$         → "1024"
$幂运算 9 0.5$        → "3"
\`\`\``,hc=`# $取整$ — 四舍五入取整

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：四舍五入到最接近的整数

按四舍五入规则将数值取整到最接近的整数。0.5 向上取整。

\`\`\`
$取整 3.6$           → "4"
$取整 3.2$           → "3"
\`\`\``,pc=`# $求和$ — 求和

导入：\`#引入=@数学\` | 标准库函数。

- **签名**：\`$求和 [数字1] [数字2] [...]$\`
- **参数**：一组数字，支持可变数量
- **返回值**：所有数字的累加和

对一组数字进行累加求和。

\`\`\`
$求和 1 2 3 4 5$      → "15"
\`\`\``,$c=`# 11.8 @数学

导入：\`#引入=@数学\`（不赋变量名，函数全局可用）| 共 8 个函数。提供绝对值、最值、幂运算、求和、取整等基础数学运算。

### \`$绝对值$\` — 取绝对值

- **签名**：\`$绝对值 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：数字的绝对值

正数保持不变，负数取相反数。支持整数和浮点数。

\`\`\`
$绝对值 -5$          → "5"
$绝对值 3.14$        → "3.14"
\`\`\`

### \`$最大值$\` — 取最大值

- **签名**：\`$最大值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最大的数字

从一组数字中返回最大值。支持可变数量的参数。

\`\`\`
$最大值 3 7 2$       → "7"
\`\`\`

### \`$最小值$\` — 取最小值

- **签名**：\`$最小值 [数字1] [数字2] [...]$\`
- **参数**：至少两个数字，支持可变数量
- **返回值**：最小的数字

从一组数字中返回最小值。支持可变数量的参数。

\`\`\`
$最小值 3 7 2$       → "2"
\`\`\`

### \`$幂运算$\` — 幂运算

- **签名**：\`$幂运算 [底数] [指数]$\`
- **参数**：底数和指数（均为数字）
- **返回值**：底数的指数次幂

计算底数的指数次幂。支持分数指数（如 0.5 即开平方根）、负指数。

\`\`\`
$幂运算 2 3$          → "8"
$幂运算 2 10$         → "1024"
$幂运算 9 0.5$        → "3"
\`\`\`

### \`$求和$\` — 求和

- **签名**：\`$求和 [数字1] [数字2] [...]$\`
- **参数**：一组数字，支持可变数量
- **返回值**：所有数字的累加和

对一组数字进行累加求和。

\`\`\`
$求和 1 2 3 4 5$      → "15"
\`\`\`

### \`$向上取整$\` — 向上取整

- **签名**：\`$向上取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不小于输入值的最小整数

向正无穷方向取整。

\`\`\`
$向上取整 3.14$        → "4"
$向上取整 -3.14$       → "-3"
\`\`\`

### \`$向下取整$\` — 向下取整

- **签名**：\`$向下取整 [数字]$\`
- **参数**：一个数字（整数或浮点数）
- **返回值**：不大于输入值的最大整数

向负无穷方向取整。

\`\`\`
$向下取整 3.14$        → "3"
$向下取整 -3.14$       → "-4"
\`\`\`

### \`$取整$\` — 四舍五入取整

- **签名**：\`$取整 [数字]$\`
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
`,gc=`# 10. 模块与引入

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
\`\`\`
#引入=@字符串          // @ 前缀：直接查内置标准库，函数全局可用
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

## 10.6 标准库一览

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
`,mc='# $net.全部内容$ — 读取全部响应内容\n\n导入：`net:#引入=@访问` | 标准库函数。\n\n- **签名**：`$net.全部内容 [handle]$`\n- **参数**：请求句柄\n- **返回值**：完整响应 JSON（含状态码、头部、data 字段）\n\n> 注意：`data` 字段中的敏感数据（如 HTML 页面、二进制内容等）会被自动替换为 `"已屏蔽"`。需要原始响应体请使用 `$net.内容$`。\n\n```\n$net.全部内容 %req%$\n```',_c="# $net.内容$ — 读取响应内容\n\n导入：`net:#引入=@访问` | 标准库函数。\n\n- **签名**：`$net.内容 [handle]$`\n- **参数**：请求句柄\n- **返回值**：响应体内容\n\n```\nbody:$net.内容 %req%$\n```",vc=`# $net.新建$ — 创建请求对象

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.新建 [url]$\`
- **参数**：目标 URL
- **返回值**：请求句柄

初始化 HTTP 请求状态机，默认 GET 方法。每个请求句柄代表一个独立的 HTTP 请求状态机。

\`\`\`
req:$net.新建 https://httpbin.org/post$
\`\`\``,bc=`# $net.POST文件$ — 设置文件上传

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.POST文件 [handle] [field] [data] [filename]$\`
- **参数**：请求句柄、表单字段名、文件数据、文件名
- **返回值**：无

通过 multipart/form-data 上传文件。

\`\`\`
$net.POST文件 %req% file %file_content% upload.txt$
\`\`\``,xc=`# $net.POST$ — 设置 POST 请求体

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.POST [handle] [body]$\`
- **参数**：请求句柄、请求体
- **返回值**：无

在已切换到 POST 的状态机上设置请求体。

\`\`\`
$net.POST %req% {"name":"Alice","age":25}$
\`\`\``,yc=`# $访问转发$ — 转发请求

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$访问转发 [url]$</code></dd>
  <dt>参数</dt><dd>目标 URL</dd>
  <dt>返回值</dt><dd>转发后的响应</dd>
</dl>

仅在 \`$启动服务器$\` 的 HTTP 模式下可用，需读取 \`_DATA\` 变量获取原始请求数据。

\`\`\`
$访问转发 https://backend.internal/api$
\`\`\`

> 仅在 \`$启动服务器$\` 的 HTTP 模式下可用。`,kc=`# $访问$ — GET 请求

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$访问 [url] [headers_json]$</code></dd>
  <dt>参数</dt><dd>URL、可选的 JSON 格式请求头</dd>
  <dt>返回值</dt><dd>响应体文本；失败返回空字符串</dd>
</dl>

发起 HTTP GET 请求。自动补全 \`http://\` 前缀，默认 User-Agent: \`Nebula-Client/1.0\`，超时 15 秒。

\`\`\`
$访问 https://httpbin.org/ip$
$访问 https://httpbin.org/headers {"Authorization":"Bearer xxx"}$
\`\`\`

> 快捷函数适合快速调用，复杂场景请使用 @访问 状态机 API。`,wc=`# $访问POST$ — POST 请求

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$访问POST [url] [body] [headers_json]$</code></dd>
  <dt>参数</dt><dd>URL、请求体、可选的 JSON 格式请求头</dd>
  <dt>返回值</dt><dd>响应体文本；失败返回空字符串</dd>
</dl>

发起 HTTP POST 请求，默认超时 15 秒。

\`\`\`
$访问POST https://httpbin.org/post {"key":"value"}$
$访问POST https://httpbin.org/post {"key":"value"} {"Authorization":"Bearer xxx"}$
\`\`\`

> 快捷函数适合快速调用，复杂场景请使用 @访问 状态机 API。`,Tc=`# $net.发送$ — 发送请求

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.发送 [handle]$\`
- **参数**：请求句柄
- **返回值**：无

实际发起网络请求（阻塞）。发送后不可修改配置。

\`\`\`
$net.发送 %req%$
\`\`\``,Sc=`# $net.设置头部$ — 设置请求头

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.设置头部 [handle] [json_headers]$\`
- **参数**：请求句柄、JSON 格式的请求头键值对
- **返回值**：无

以 JSON 对象格式设置 HTTP 请求头。

\`\`\`
$net.设置头部 %req% {"Authorization":"Bearer xxxx","Content-Type":"application/json"}$
\`\`\``,Ec=`# $net.设置超时$ — 设置超时

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.设置超时 [handle] [seconds]$\`
- **参数**：请求句柄、超时秒数
- **返回值**：无

设置请求超时时间（秒）。默认无超时限制。

\`\`\`
$net.设置超时 %req% 30$
\`\`\``,Rc=`# $net.切换GET$ — 切换到 GET 方法

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.切换GET [handle]$\`
- **参数**：请求句柄
- **返回值**：无

将请求方法设置为 GET。

\`\`\`
$net.切换GET %req%$
\`\`\``,Ac=`# $net.切换POST$ — 切换到 POST 方法

导入：\`net:#引入=@访问\` | 标准库函数。

- **签名**：\`$net.切换POST [handle] [body]$\`
- **参数**：请求句柄、请求体
- **返回值**：无

将请求方法设置为 POST 并传入请求体。

\`\`\`
$net.切换POST %req% {"key":"value"}$
\`\`\``,Oc=`# 11.5 · 11.9 访问 · @访问

NR 提供两种 HTTP 客户端调用方式：**快捷函数**（基础函数，一行完成）和 **@访问 状态机 API**（标准库，精细控制请求的每个阶段）。

## 网络访问概述

两种调用方式对比：

- **快捷函数**（11.5）：\`$访问$\`、\`$访问POST$\`、\`$访问转发$\` — 基础函数，无需导入，一行完成的简化调用。适合简单场景。
- **@访问 状态机 API**（11.9）：精细控制请求的每个阶段——创建、切换方法、设置头部/超时、发送、读取结果。适合需要定制请求细节的复杂场景。

## 11.9 @访问

导入：\`net:#引入=@访问\` | 共 12 个状态机函数。快捷函数（无需导入）：\`$访问$\`、\`$访问POST$\`（见 11.5 节）

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

## 11.5 访问

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

> 状态机模式提供完整控制，快捷函数适合快速调用。所有请求失败时返回空字符串而非抛异常。网络操作是阻塞的，注意超时设置。配合 [启动服务器](./server) 可构建完整 Web 服务。

[← @数学](./math)

[@类型 →](./type)
`,Pc=`# $new$ — 创建对象实例

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$new [类名] [参数...]$</code></dd>
  <dt>参数</dt><dd>类名、可选的初始化参数（可变数量）</dd>
  <dt>返回值</dt><dd>对象句柄或标识符；构造函数不存在时返回空字符串</dd>
</dl>

按下述优先级查找构造函数：
1. **\`类名.new\`** → 若存在词条 \`[内部]类名.new\`，优先使用
2. **\`类名.初始化\`** → 作为备选构造函数

\`\`\`
obj:$new Counter$           → 无参数构造
obj:$new Counter 42$        → 传入初始值
obj:$new Person 张三 25$    → 传入多个参数
\`\`\`

> \`$new$\` 构造函数查找优先级：类名.new → 类名.初始化。详见面向对象编程章节。`,Cc=`# 11.4 对象创建

基础函数 | 共 1 个函数。\`$new$\` 创建自定义对象实例。

\`$new$\` 是 NR 中创建自定义对象实例的核心函数。在 NR 的对象模型中，类本质上是一组使用了特定命名约定的词条集合。创建对象时，引擎通过词条匹配找到构造函数并执行。

## 构造函数查找机制

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
`,Nc='# 9. 面向对象编程\n\nNR 的 OOP 系统建立在词条引擎之上的上下文隔离与状态持久化机制。本章涵盖类定义、实例变量、对象创建与方法调用、自我调用、构造函数输出以及与传统 OOP 的对比。\n\n<dl>\n  <dt>类</dt>\n  <dd>一组绑定到特定命名空间的方法集合，使用 <code class="nr-sig">[函数:类名]</code> 语法定义。</dd>\n  <dt>实例变量</dt>\n  <dd>以 <code class="nr-sig">.字段</code> 前缀命名的变量，在对象方法调用间自动持久化。</dd>\n  <dt>对象</dt>\n  <dd>通过 <code class="nr-sig">$new ClassName$</code> 创建，每个实例维护独立的变量作用域。</dd>\n</dl>\n\n## 9.1 类定义\n\n使用 `[函数:类名]`、`[f:类名]` 或 `[F:类名]` 语法：\n\n```\n[函数:Counter]初始化\n$打印 初始化$\n.count:0\n\n[f:Counter]add num     ← [f:类名] 是 [函数:类名] 的简写\n.count+:%num%\n\n[函数:Counter]get\n当前计数：%.count%\n```\n\n- 内部触发词为 `类名.方法名`\n- 构造函数查找顺序：`类名.new` → `类名.初始化`\n\n### 9.1.1 类生命周期\n\n一个 NR 对象的完整生命周期如下：\n\n1. **创建**：通过 `$new ClassName args$` 创建对象实例，引擎查找并执行构造函数\n2. **初始化**：构造函数中设置初始实例变量（`.field:value`），构造函数返回类名字符串给调用者\n3. **使用**：通过 `$对象名.方法 参数$` 调用方法；每次方法调用前从存储中加载实例变量，执行后自动写回\n4. **消亡**：当对象变量被覆盖或超出作用域时，实例数据随之释放\n\n**存储机制**：实例变量存储在引擎内部的键值存储中，键的格式为 `对象名.字段名`。这意味着不同对象的 `.count` 完全独立。\n\n## 9.2 实例变量 `.字段`\n\n以 `.` 开头的变量是**实例变量**，在同一个对象的多次方法调用之间持久化：\n\n```\n[f:Counter]add num\n.count+:%num%           ← .count 跨调用保持\n```\n\n- 方法调用前从主上下文加载（`对象名.字段`），执行后自动写回\n- 不同对象的实例变量相互独立\n\n## 9.3 创建对象与调用方法\n\n```\nobj:$new Counter$\nobj:$new Counter 参数$\n\n$obj.add 5$             ← 调用方法\n$obj.get$               ← 无参调用\n```\n\n方法返回值通过 `$...$` 替换到调用处。\n\n## 9.4 自我调用 `$.method$`\n\n在类方法内部，使用 `$.方法名` 调用同一对象的其他方法：\n\n```\n[函数:Counter]get\n$.add 1$                ← 等价于 $Counter.add 1$\n当前计数：%.count%\n```\n\n- `$.method$` 通过 `_` 变量自动解析为 `ClassName.method`\n- 只能在类方法内部使用（`_` 变量不为空时生效）\n- 支持传参：`$.method arg1 arg2$`\n\n## 9.5 构造函数与输出\n\n```\n[函数:Counter]初始化\n.count:0\na                       ← 裸文本直接打印到终端\n$打印 初始化$            ← $打印$ 输出到终端\n```\n\n- 构造函数中的裸文本直接打印到终端，不走管道输出\n- `$打印$` 和 `$打印返回$` 同样输出到终端\n- 构造函数返回 `类名` 字符串（可赋给变量）\n\n## 9.6 NR OOP vs 传统 OOP 对比\n\n| 概念 | NR OOP | 传统 OOP（Java/Python） |\n| --- | --- | --- |\n| 类定义 | `[函数:类名]方法名` 分散定义 | `class { }` 集中定义 |\n| 继承 | 不支持类继承 | `extends` / 接口实现 |\n| 实例变量 | `.字段`，引擎自动持久化 | `this.field`，内存中维护 |\n| 构造函数 | `类名.new` 或 `类名.初始化` | `constructor()` / `__init__()` |\n| 方法调用 | `$对象.方法 args$` | `obj.method(args)` |\n| 自我调用 | `$.method$` 语法糖 | `this.method()` |\n| 访问控制 | 无 public/private，全公开 | public/protected/private |\n| 多态 | 不支持 | 虚函数/接口 |\n| 适用场景 | 对话状态、简单实体、计数器 | 通用软件工程 |\n\n> **注意事项**\n> - **无继承**：NR 不支持类继承。如需共享行为，使用[普通函数](./functions)或[模块引入](./modules)替代\n> - **实例变量命名**：`.字段` 命名空间与普通变量独立，`.count` 和 `count` 是两个不同的变量\n> - **构造函数返回值**：构造函数返回的是**类名字符串**（如 `"Counter"`），而非对象引用。真正的"对象标识"是赋值的变量名\n> - **方法中修改实例变量**：在类方法中修改 `.字段` 后，引擎**在执行完毕后自动写回**——不需要显式的 "save" 操作\n> - 关于对象创建 `$new$` 的更多用法，参见[第 11.4 节 对象创建](./flow-output)\n\n[← JSON 数据处理](./json) [模块与引入 →](./modules)\n',Ic=`# $打印返回$ — 输出并返回

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$打印返回 [内容]$</code></dd>
  <dt>参数</dt><dd>要输出的内容</dd>
  <dt>返回值</dt><dd>内容本身（同时写入结果流）</dd>
</dl>

同时输出和返回值，适用于需要输出日志的同时传递数据。

\`\`\`
result:$打印返回 %msg%$
\`\`\`

> \`$打印返回$\` 追加到结果流同时作为表达式值返回。`,Lc=`# $打印$ — 输出内容

基础函数 | 无需导入。

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

> \`$打印$\` 追加到结果流但不产生表达式值，适用于纯日志输出。`,Mc=`# 11.2 输出

基础函数 | 共 2 个函数。\`$打印$\` 和 \`$打印返回$\` 控制脚本的结果流输出。

## 输出与打印的区别

NR 中"输出"（\`$打印$\`）和"返回"是两个独立概念。\`$打印$\` 将内容追加到**结果流（output stream）**，该流最终会作为脚本的整体输出返回给调用者，但 \`$打印$\` 在表达式求值中**不产生值**（在 \`$...$\` 中替换为空字符串）。也就是说：

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

> \`$打印$\` 追加到结果流但不产生表达式值；\`$打印返回$\` 追加到结果流同时作为表达式值返回。

[← 流程控制](./flow-control) [服务器 →](./server)
`,Dc=`# $启动服务器$ — TCP/HTTP 服务器

基础函数 | 无需导入。

<dl>
  <dt>签名</dt><dd><code>$启动服务器 [端口] [处理函数]$</code></dd>
  <dt>参数</dt><dd>监听端口、可选的处理函数</dd>
  <dt>返回值</dt><dd>无</dd>
</dl>

启动 TCP 服务器，监听 \`0.0.0.0:端口\`，自动检测 HTTP 请求（GET/POST/PUT/DELETE 等），返回标准 HTTP 响应。

- **HTTP 模式**：请求路径作为触发词，\`%触发%\` 为路径
- **TCP 模式**：首行作为触发词，后续行持续交互（长连接）
- 处理函数可选，不指定时直接按触发词匹配主词条

\`\`\`
$启动服务器 8080 handle$
\`\`\`

> 服务器自动检测 HTTP/TCP，HTTP 模式返回标准响应，TCP 模式支持长连接逐行交互。`,Hc=`# 11.3 服务器

基础函数 | 共 1 个函数。\`$启动服务器$\` 启动 TCP/HTTP 服务器，自动检测协议。

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
`,Bc=`# $文本包含$ — 判断是否包含子串

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$文本包含 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串</dd>
  <dt>返回值</dt><dd>"1"（包含）或 "0"（不包含）</dd>
</dl>

判断字符串中是否包含指定子串。区分大小写。

\`\`\`
$文本包含 hello ll$    → "1"
$文本包含 hello xy$    → "0"
\`\`\``,Fc=`# $计数$ — 统计子串出现次数

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$计数 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要统计的子串</dd>
  <dt>返回值</dt><dd>不重叠出现次数</dd>
</dl>

统计子串在字符串中出现的次数。不重叠计数。

\`\`\`
$计数 hello l$       → "2"
\`\`\``,jc=`# $结尾判断$ — 判断是否以某子串结尾

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$结尾判断 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的后缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$结尾判断 file.txt .txt$    → "1"
\`\`\``,Uc=`# $查找$ — 查找子串位置

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$查找 [字符串] [子串] [起始位置]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串、可选的起始位置（默认 0）</dd>
  <dt>返回值</dt><dd>首次出现的索引（从 0 开始）；未找到返回 "-1"</dd>
</dl>

从指定起始位置查找子串首次出现的位置索引。

\`\`\`
$查找 hello e$       → "1"
$查找 hello l 3$     → "3"
\`\`\``,Gc=`# $判断字母$ — 判断是否全为字母

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$判断字母 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为 A-Z、a-z）或 "0"（否则）</dd>
</dl>

\`\`\`
$判断字母 Hello$        → "1"
\`\`\``,zc=`# $判断数字$ — 判断是否全为数字

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$判断数字 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为数字）或 "0"（否则）</dd>
</dl>

判断字符串是否全部由数字字符组成。注意：含小数点、负号的字符串（如 "-3.14"）返回 "0"。

\`\`\`
$判断数字 123$       → "1"
$判断数字 hello$     → "0"
\`\`\``,Vc=`# $判断小写$ — 判断是否全为小写

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$判断小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为小写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$判断小写 hello$         → "1"
\`\`\``,qc=`# $判断大写$ — 判断是否全为大写

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$判断大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为大写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$判断大写 HELLO$         → "1"
\`\`\``,Jc=`# $判断空白$ — 判断是否全为空白

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$判断空白 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为空白字符）或 "0"（否则）</dd>
</dl>

空字符串也返回 "1"。

\`\`\`
$判断空白 \\ \\ $           → "1"
\`\`\``,Kc=`# $文本连接$ — 用分隔符连接多个文本

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$文本连接 [分隔符] [文本1] [文本2] [...]$</code></dd>
  <dt>参数</dt><dd>分隔符、至少两个文本片段</dd>
  <dt>返回值</dt><dd>用分隔符连接后的字符串</dd>
</dl>

用指定的分隔符将多个文本片段连接成一个字符串。支持可变数量的参数。

\`\`\`
$文本连接 , a b c$           → "a,b,c"
\`\`\``,Wc=`# $长度$ — 获取字符串长度

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$长度 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>字符数（非字节数）</dd>
</dl>

对于 Unicode 字符串，返回的是**字符数**（而非字节数），一个中文字、一个 emoji 均计为 1。

\`\`\`
$长度 hello$        → "5"
$长度 你好世界$      → "4"
\`\`\``,Yc=`# $小写$ — 转小写

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有大写字母转为小写后的字符串</dd>
</dl>

将字符串中所有大写字母转为小写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$小写 HELLO$         → "hello"
\`\`\``,Zc=`# $居中$ — 居中对齐填充

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$居中 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>居中对齐并用填充字符两侧填充后的字符串</dd>
</dl>

将文本居中对齐，两侧用空格补足到指定宽度。若两侧填充数不相等，左侧少填一个。

\`\`\`
$居中 hi 6$              → "  hi  "
\`\`\``,Qc=`# $左对齐$ — 左对齐填充

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$左对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>左对齐并在右侧填充后的字符串</dd>
</dl>

将文本靠左对齐，右侧用填充字符补足到指定宽度。若文本已超过宽度则不做截断。

\`\`\`
$左对齐 hi 5$            → "hi   "
\`\`\``,Xc=`# $右对齐$ — 右对齐填充

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$右对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>右对齐并在左侧填充后的字符串</dd>
</dl>

\`\`\`
$右对齐 42 5 0$          → "00042"
\`\`\``,nd=`# $文本重复$ — 重复文本

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$文本重复 [文本] [次数]$</code></dd>
  <dt>参数</dt><dd>要重复的文本、重复次数</dd>
  <dt>返回值</dt><dd>重复拼接后的字符串</dd>
</dl>

将文本重复指定次数后拼接。当重复次数很大时请注意性能影响。

\`\`\`
$文本重复 ab 3$      → "ababab"
\`\`\``,ed=`# $替换$ — 替换子串 <span class="badge">基础</span>

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$替换 [字符串] [旧] [新]$</code></dd>
  <dt>参数</dt><dd>源字符串、要替换的旧子串、新子串</dd>
  <dt>返回值</dt><dd>替换后的字符串</dd>
</dl>

将字符串中**所有**出现的旧子串替换为新子串（全局替换，非仅首个匹配）。

\`\`\`
$替换 hello world o x$   → "hellx wxrld"
\`\`\`

> 属于基础函数，无需导入即可使用。`,td=`# $文本分割$ — 按分隔符切分取索引

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$文本分割 [字符串] [分隔符] [索引]$</code></dd>
  <dt>参数</dt><dd>源字符串、分隔符、索引（从 0 开始）</dd>
  <dt>返回值</dt><dd>指定索引位置的元素；索引越界返回空字符串</dd>
</dl>

按分隔符将字符串切分为数组，返回指定索引位置的元素。

\`\`\`
$文本分割 a,b,c , 0$   → "a"
\`\`\``,sd=`# $开头判断$ — 判断是否以某子串开头

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$开头判断 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的前缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$开头判断 https://example.com https$    → "1"
\`\`\``,id=`# $截取$ — 截取子串 <span class="badge">基础</span>

导入：\`#引入=@字符串\` | 标准库函数。

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

> 属于基础函数，无需导入即可使用。`,rd=`# $大小写互换$ — 大小写互换

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$大小写互换 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>大小写互换后的字符串</dd>
</dl>

将字符串中的大写字母转为小写，小写字母转为大写。非字母字符保持不变。

\`\`\`
$大小写互换 Hello$         → "hELLO"
\`\`\``,od=`# $首字母大写$ — 首字母大写

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$首字母大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>每个单词首字母大写后的字符串</dd>
</dl>

将每个单词的首字母转为大写，其余字母转为小写。单词以空白字符为分界。

\`\`\`
$首字母大写 hello world$   → "Hello World"
\`\`\``,ld=`# $删前缀$ — 删除前缀 <span class="badge">基础</span>

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$删前缀 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的前缀</dd>
  <dt>返回值</dt><dd>删除前缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删前缀 https://example.com https://$   → "example.com"
\`\`\`

> 属于基础函数，无需导入即可使用。`,cd=`# $删后缀$ — 删除后缀 <span class="badge">基础</span>

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$删后缀 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的后缀</dd>
  <dt>返回值</dt><dd>删除后缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删后缀 file.txt .txt$   → "file"
\`\`\`

> 属于基础函数，无需导入即可使用。`,dd=`# $头尾去空$ — 去除首尾空白

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$头尾去空 [文本]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>去除首尾空白后的字符串</dd>
</dl>

去除字符串首尾的空白字符（空格、制表符、换行符等）。不会修改字符串中间的空白。

\`\`\`
$头尾去空 \\ \\ hello\\ \\ $   → "hello"
\`\`\``,ad=`# $大写$ — 转大写

导入：\`#引入=@字符串\` | 标准库函数。

<dl>
  <dt>签名</dt><dd><code>$大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有小写字母转为大写后的字符串</dd>
</dl>

将字符串中所有小写字母转为大写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$大写 hello$         → "HELLO"
\`\`\``,ud=`# 11.7 @字符串

导入：\`#引入=@字符串\`（不赋变量名，函数全局可用）| 共 22 个函数。提供长度、分割、大小写转换、对齐、判断等全面的字符串操作。\`$截取$\`、\`$替换$\`、\`$删前缀$\`、\`$删后缀$\` 属于基础函数，无需导入。

### \`$截取$\` — 截取子串 <span class="badge">基础</span>

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

### \`$替换$\` — 替换子串 <span class="badge">基础</span>

<dl>
  <dt>签名</dt><dd><code>$替换 [字符串] [旧] [新]$</code></dd>
  <dt>参数</dt><dd>源字符串、要替换的旧子串、新子串</dd>
  <dt>返回值</dt><dd>替换后的字符串</dd>
</dl>

将字符串中**所有**出现的旧子串替换为新子串（全局替换，非仅首个匹配）。

\`\`\`
$替换 hello world o x$   → "hellx wxrld"
\`\`\`

### \`$删前缀$\` — 删除前缀 <span class="badge">基础</span>

<dl>
  <dt>签名</dt><dd><code>$删前缀 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的前缀</dd>
  <dt>返回值</dt><dd>删除前缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删前缀 https://example.com https://$   → "example.com"
\`\`\`

### \`$删后缀$\` — 删除后缀 <span class="badge">基础</span>

<dl>
  <dt>签名</dt><dd><code>$删后缀 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要删除的后缀</dd>
  <dt>返回值</dt><dd>删除后缀后的字符串；不匹配则返回原字符串</dd>
</dl>

\`\`\`
$删后缀 file.txt .txt$   → "file"
\`\`\`

### \`$长度$\` — 获取字符串长度

<dl>
  <dt>签名</dt><dd><code>$长度 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>字符数（非字节数）</dd>
</dl>

对于 Unicode 字符串，返回的是**字符数**（而非字节数），一个中文字、一个 emoji 均计为 1。这与某些语言的 \`len()\` 返回字节数不同。

\`\`\`
$长度 hello$        → "5"
$长度 你好世界$      → "4"
\`\`\`

### \`$文本包含$\` — 判断是否包含子串

<dl>
  <dt>签名</dt><dd><code>$文本包含 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串</dd>
  <dt>返回值</dt><dd>"1"（包含）或 "0"（不包含）</dd>
</dl>

判断字符串中是否包含指定子串。区分大小写。

\`\`\`
$文本包含 hello ll$    → "1"
$文本包含 hello xy$    → "0"
\`\`\`

### \`$文本分割$\` — 按分隔符切分取索引

<dl>
  <dt>签名</dt><dd><code>$文本分割 [字符串] [分隔符] [索引]$</code></dd>
  <dt>参数</dt><dd>源字符串、分隔符、索引（从 0 开始）</dd>
  <dt>返回值</dt><dd>指定索引位置的元素；索引越界返回空字符串</dd>
</dl>

按分隔符将字符串切分为数组，返回指定索引位置的元素。

\`\`\`
$文本分割 a,b,c , 0$   → "a"
\`\`\`

### \`$头尾去空$\` — 去除首尾空白

<dl>
  <dt>签名</dt><dd><code>$头尾去空 [文本]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>去除首尾空白后的字符串</dd>
</dl>

去除字符串首尾的空白字符（空格、制表符、换行符等）。不会修改字符串中间的空白。

\`\`\`
$头尾去空 \\ \\ hello\\ \\ $   → "hello"
\`\`\`

### \`$判断数字$\` — 判断是否全为数字

<dl>
  <dt>签名</dt><dd><code>$判断数字 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为数字）或 "0"（否则）</dd>
</dl>

判断字符串是否全部由数字字符组成。注意：含小数点、负号的字符串（如 "-3.14"）返回 "0"。

\`\`\`
$判断数字 123$       → "1"
$判断数字 hello$     → "0"
\`\`\`

### \`$大写$\` — 转大写

<dl>
  <dt>签名</dt><dd><code>$大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有小写字母转为大写后的字符串</dd>
</dl>

将字符串中所有小写字母转为大写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$大写 hello$         → "HELLO"
\`\`\`

### \`$小写$\` — 转小写

<dl>
  <dt>签名</dt><dd><code>$小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>所有大写字母转为小写后的字符串</dd>
</dl>

将字符串中所有大写字母转为小写。非字母字符保持不变。对 Unicode 字符串仅处理 ASCII 字母。

\`\`\`
$小写 HELLO$         → "hello"
\`\`\`

### \`$首字母大写$\` — 首字母大写

<dl>
  <dt>签名</dt><dd><code>$首字母大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>每个单词首字母大写后的字符串</dd>
</dl>

将每个单词的首字母转为大写，其余字母转为小写。单词以空白字符为分界。

\`\`\`
$首字母大写 hello world$   → "Hello World"
\`\`\`

### \`$大小写互换$\` — 大小写互换

<dl>
  <dt>签名</dt><dd><code>$大小写互换 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>大小写互换后的字符串</dd>
</dl>

将字符串中的大写字母转为小写，小写字母转为大写。非字母字符保持不变。

\`\`\`
$大小写互换 Hello$         → "hELLO"
\`\`\`

### \`$查找$\` — 查找子串位置

<dl>
  <dt>签名</dt><dd><code>$查找 [字符串] [子串] [起始位置]$</code></dd>
  <dt>参数</dt><dd>源字符串、要查找的子串、可选的起始位置（默认 0）</dd>
  <dt>返回值</dt><dd>首次出现的索引（从 0 开始）；未找到返回 "-1"</dd>
</dl>

从指定起始位置查找子串首次出现的位置索引。

\`\`\`
$查找 hello e$       → "1"
$查找 hello l 3$     → "3"
\`\`\`

### \`$计数$\` — 统计子串出现次数

<dl>
  <dt>签名</dt><dd><code>$计数 [字符串] [子串]$</code></dd>
  <dt>参数</dt><dd>源字符串、要统计的子串</dd>
  <dt>返回值</dt><dd>不重叠出现次数</dd>
</dl>

统计子串在字符串中出现的次数。不重叠计数。

\`\`\`
$计数 hello l$       → "2"
\`\`\`

### \`$开头判断$\` — 判断是否以某子串开头

<dl>
  <dt>签名</dt><dd><code>$开头判断 [字符串] [前缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的前缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$开头判断 https://example.com https$    → "1"
\`\`\`

### \`$结尾判断$\` — 判断是否以某子串结尾

<dl>
  <dt>签名</dt><dd><code>$结尾判断 [字符串] [后缀]$</code></dd>
  <dt>参数</dt><dd>源字符串、要判断的后缀</dd>
  <dt>返回值</dt><dd>"1"（是）或 "0"（否）</dd>
</dl>

\`\`\`
$结尾判断 file.txt .txt$    → "1"
\`\`\`

### \`$文本连接$\` — 用分隔符连接多个文本

<dl>
  <dt>签名</dt><dd><code>$文本连接 [分隔符] [文本1] [文本2] [...]$</code></dd>
  <dt>参数</dt><dd>分隔符、至少两个文本片段</dd>
  <dt>返回值</dt><dd>用分隔符连接后的字符串</dd>
</dl>

用指定的分隔符将多个文本片段连接成一个字符串。支持可变数量的参数。

\`\`\`
$文本连接 , a b c$           → "a,b,c"
\`\`\`

### \`$文本重复$\` — 重复文本

<dl>
  <dt>签名</dt><dd><code>$文本重复 [文本] [次数]$</code></dd>
  <dt>参数</dt><dd>要重复的文本、重复次数</dd>
  <dt>返回值</dt><dd>重复拼接后的字符串</dd>
</dl>

将文本重复指定次数后拼接。当重复次数很大时请注意性能影响。

\`\`\`
$文本重复 ab 3$      → "ababab"
\`\`\`

### \`$判断字母$\` — 判断是否全为字母

<dl>
  <dt>签名</dt><dd><code>$判断字母 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为 A-Z、a-z）或 "0"（否则）</dd>
</dl>

\`\`\`
$判断字母 Hello$        → "1"
\`\`\`

### \`$判断小写$\` — 判断是否全为小写

<dl>
  <dt>签名</dt><dd><code>$判断小写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为小写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$判断小写 hello$         → "1"
\`\`\`

### \`$判断大写$\` — 判断是否全为大写

<dl>
  <dt>签名</dt><dd><code>$判断大写 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为大写字母）或空字符串（否则）</dd>
</dl>

空字符串或含数字/符号时返回空字符串。

\`\`\`
$判断大写 HELLO$         → "1"
\`\`\`

### \`$判断空白$\` — 判断是否全为空白

<dl>
  <dt>签名</dt><dd><code>$判断空白 [字符串]$</code></dd>
  <dt>参数</dt><dd>一个字符串</dd>
  <dt>返回值</dt><dd>"1"（全为空白字符）或 "0"（否则）</dd>
</dl>

空字符串也返回 "1"。

\`\`\`
$判断空白 \\ \\ $           → "1"
\`\`\`

### \`$左对齐$\` — 左对齐填充

<dl>
  <dt>签名</dt><dd><code>$左对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>左对齐并在右侧填充后的字符串</dd>
</dl>

将文本靠左对齐，右侧用填充字符补足到指定宽度。若文本已超过宽度则不做截断。

\`\`\`
$左对齐 hi 5$            → "hi   "
\`\`\`

### \`$右对齐$\` — 右对齐填充

<dl>
  <dt>签名</dt><dd><code>$右对齐 [文本] [宽度] [填充字符]$</code></dd>
  <dt>参数</dt><dd>文本、目标宽度、可选的填充字符（默认空格）</dd>
  <dt>返回值</dt><dd>右对齐并在左侧填充后的字符串</dd>
</dl>

\`\`\`
$右对齐 42 5 0$          → "00042"
\`\`\`

### \`$居中$\` — 居中对齐填充

<dl>
  <dt>签名</dt><dd><code>$居中 [文本] [宽度] [填充字符]$</code></dd>
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
`,fd=`# $t.转浮点$ — 文本转浮点

导入：\`t:#引入=@类型\` | 标准库函数。

- **签名**：\`$t.转浮点 [文本]$\`
- **参数**：要转换的文本
- **返回值**：浮点数值；失败时返回空字符串

将文本解析为 f64 浮点数，与 \`$t.转数字$\` 行为一致。

\`\`\`
$t.转浮点 3.14$        → "__N3.14"
$t.转浮点 5$           → "__N5"
\`\`\``,hd=`# $t.转整数$ — 文本转整数

导入：\`t:#引入=@类型\` | 标准库函数。

- **签名**：\`$t.转整数 [文本]$\`
- **参数**：要转换的文本
- **返回值**：整数值（向零截断）；失败时返回空字符串

将文本解析为整数，支持浮点文本自动截断取整（向零方向）。

\`\`\`
$t.转整数 42$          → "__N42"
$t.转整数 3.99$        → "__N3"
\`\`\``,pd=`# $t.转数字$ — 文本转数字

导入：\`t:#引入=@类型\` | 标准库函数。

- **签名**：\`$t.转数字 [文本]$\`
- **参数**：要转换的文本
- **返回值**：数字值（内部标记 __N）；失败时返回空字符串

将文本解析为 f64 浮点数。支持整数、小数、负数、科学计数法。

\`\`\`
$t.转数字 3.14$        → "__N3.14"
$t.转数字 hello$       → （空）
\`\`\``,$d=`# $t.转文本$ — 将值转为文本

导入：\`t:#引入=@类型\` | 标准库函数。

- **签名**：\`$t.转文本 [值]$\`
- **参数**：任意类型的值
- **返回值**：值的文本表示

将任意值转换为字符串形式。

\`\`\`
$t.转文本 123$         → "123"
$t.转文本 %count%$     → count 的文本形式
\`\`\``,gd=`# 11.10 @类型

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

[← @访问](./network)

[@画布 →](./canvas)
`,md='# 2. 类型系统\n\nNR 的类型系统是**动态、弱类型**的——变量无需声明类型，运行时自动确定。值在大多数场景下会自动在文本和数字之间转换，`==` 运算符做宽松比较。本章涵盖 NR 中的原始数据类型（没有对象/数组，只有文本、数字和布尔值），以及类型检测、判断和转换操作。\n\nNR 的 `Value` 不是简单的"字符串或数字"二分法——它是一个完整的枚举类型，内部由 Rust 的 `enum` 实现，每个变体携带不同的数据表示。这意味着两个值即使"看起来一样"，也可能属于不同类型，进而影响相等性比较和运算行为。\n\n## 2.1 类型一览\n\nNR 变量存储的是**带类型的值**（`Value`），而非纯字符串。类型在赋值时自动推断。\n\n| 类型 | 示例 | 说明 |\n|------|------|------|\n| `整数` | `1`, `-5`, `100` | 64 位有符号整数 |\n| `浮点` | `1.5`, `-0.5`, `3.14` | 64 位浮点数 |\n| `字符串` | `"hello"`, `abc` | 字符串 |\n| `布尔` | `true`, `false` | 布尔值 |\n| `空` | `null` | 空值 |\n| `对象` | — | 对象引用（`$new$` 返回） |\n| `函数` | — | 函数指针（`%func@name%` 返回） |\n\n- `count:5` → Int，`name:Alice` → Str\n- 但 `[...]` 数学表达式运算结果保留数值类型\n- `$new$` 返回值为对象类型\n- `%func@key%` 返回值为函数类型\n\n## 2.2 各类型详解\n\n### 整数（Int）\n\n64 位有符号整数（`i64`），范围约为 `-9.2×10¹⁸` 到 `9.2×10¹⁸`。\n\n```\na:42\nb:-100\nc:0\n\n%TYPE@a%   → "整数"\n%TYPE@b%   → "整数"\n%TYPE@c%   → "整数"\n```\n\n整数字面量不能包含小数点、前导零（会被当作十进制解析）或科学计数法。\n\n### 浮点（Float）\n\n64 位浮点数（`f64`），符合 IEEE 754 标准。\n\n```\npi:3.14\nneg:-0.5\nbig:1.5e10\n\n%TYPE@pi%    → "浮点"\n%TYPE@neg%   → "浮点"\n%TYPE@big%   → "浮点"\n```\n\n浮点数和整数在比较（`==`）时**视为不同**：`1 == 1.0` 在严格比较下为假。浮点运算可能产生精度误差，这是 IEEE 754 浮点数的固有特性。\n\n### 字符串（Str）\n\nUTF-8 编码的字符串。不带特殊前缀的纯文本字面量自动判定为字符串。\n\n```\nname:Alice\ngreeting:Hello World\nempty:""              ← 显式空字符串\n\n%TYPE@name%       → "字符串"\n%TYPE@greeting%   → "字符串"\n```\n\n注意：`greeting:Hello World` 中空格不需要转义（赋值操作符 `:` 之后直到行尾均为值部分）。但在 `$...$` 参数传递中空格会分割参数，参见 [词法结构 § 转义规则](./lexical)。\n\n### 布尔（Bool）\n\n只有 `true` 和 `false` 两个字面量。\n\n```\nflag:true\ndone:false\n\n%TYPE@flag%   → "布尔"\n%TYPE@done%   → "布尔"\n```\n\n布尔值可直接用于条件表达式（[控制流](./control-flow)），也可参与逻辑运算（[表达式 § 逻辑运算符](./expressions)）。\n\n### 空值（Null）\n\n表示"无值"或"未设置"。仅有一种字面量：`null`。\n\n```\ndata:null\n\n%TYPE@data%   → "空"\n```\n\n`null` 与空字符串 `""` 不同：`null` 是一个独立的类型标记，而 `""` 是值为空的字符串。在条件判断中，`null` 被视为假值。\n\n### 对象（Object）\n\n由 `$new$` 创建，内部持有一个 JSON 对象引用。对象类型值不可直接输出为文本，需通过 `%TYPE@` 查询或使用 JSON 操作符访问其字段。\n\n```\nobj:$new$ {"key":"val"}\n\n%TYPE@obj%   → "对象"\n```\n\n`$new$` 不是赋值操作符——它是创建新对象的内置函数，参见 [词条系统](./entries)。\n\n### 函数（Func）\n\n由 `%func@name%` 获取，存储的是函数指针/引用，而非函数体文本。\n\n```\nptr:%func@greet%\n\n%TYPE@ptr%   → "函数"\n```\n\n函数类型值主要用途：作为回调传入其他函数，或在需要延迟调用时暂存。\n\n## 2.3 类型特性对照\n\n| 类型 | 可修改（`+:` 等） | 宽松相等 `==` | 严格相等 `===` | 数值排序 `>` `<` |\n|------|-------------------|--------------|---------------|------------------|\n| Int | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Float | ✅ 算术运算 | 字符串化后比较 | 值和类型均相同 | ✅ 按数值 |\n| Str | ✅ 串接 | 内容比较（含类型转换） | 值和类型均相同 | ❌ 无意义 |\n| Bool | ❌ | 字符串化后比较 | 值和类型均相同 | ❌ |\n| Null | ❌ | — | — | ❌ |\n| Object | — | 引用相等 | 引用相等 | ❌ |\n| Func | ❌ | 引用相等 | 引用相等 | ❌ |\n\n## 2.4 类型强制转换与兼容性\n\n### 算术上下文中的类型转换\n\n在 `[...]` 数学表达式中，操作数的类型决定了运算结果的类型：\n\n```\n// 整数运算 → 整数\na:[1+2]          → Int(3)\n\n// 浮点数参与 → 浮点\nb:[1+2.0]        → Float(3.0)\nc:[3.14*2]       → Float(6.28)\n\n// 字符串自动转为数值参与运算\nd:["3"+2]        → Int(5)  或报错\n```\n\n- 整数 + 整数 → 整数\n- 任一操作数为浮点 → 结果提升为浮点\n- 字符串操作数：尝试按数值解析，失败则报错\n\n### 比较上下文中的类型转换\n\n`==`（宽松相等）会将两边值转为字符串后比较：\n\n```\n1 == "1"       → true（都转为 "1"）\n1 == 1.0       → true（都转为 "1"，但用 === 则为 false）\ntrue == "true" → true\nnull == ""     → false（"null" ≠ ""）\n```\n\n`===`（严格相等）要求**类型和值都相同**：\n\n```\n1 === 1       → true\n1 === 1.0     → false（Int vs Float）\n"1" === 1     → false（Str vs Int）\ntrue === true → true\n```\n\n**注意事项：**\n\n- 条件判断中（如 `如果:`），**推荐使用严格比较 `===`** 以避免意外的类型转换带来的误判。\n- 数值比较（`>`、`<`、`>=`、`<=`）要求两边均为数值类型（Int 或 Float），字符串会被尝试解析为数值。\n- `0`、`""`、`null`、`false` 在布尔上下文中均为"假"，但它们彼此之间**不相等**（除了 `0 == false` 会因为字符串化为 `"0" == "false"` 而返回假）。\n\n## 类型查询 `%TYPE@var%`\n\n```\ncount:5\nname:Alice\n\n%TYPE@count%   → "整数"\n%TYPE@name%    → "字符串"\n```\n\n未设置变量返回空字符串。\n',_d='# 3. 变量与赋值\n\n变量是 NR 中最基本的存储单元。本章涵盖变量的作用域规则、赋值操作符的语义差异、条件赋值、内置变量以及文本切片等核心机制。理解变量系统是正确组织数据流和控制状态的前提，与[类型系统](./types)和[表达式](./expressions)密切协作。\n\nNR 的赋值不是简单的"文本替换"——它会根据操作符和值的内容自动推断类型（[§ 类型一览](./types)），并在不同作用域间管理变量生命周期。\n\n## 3.1 作用域\n\n| 类型 | 作用域 | 说明 |\n|------|--------|------|\n| 局部变量 | 当前上下文 | 子上下文创建时重置 |\n| 全局变量 | 所有子上下文 | 子上下文创建时克隆共享 |\n\n### 作用域选择规则\n\nNR 根据**赋值位置**自动决定变量的作用域：\n\n- **头部区域（第一个空行之前）**中赋值的变量为**全局变量**。这些变量在词条触发、函数调用等子上下文中可被读取和修改。\n- **词条、函数、循环体内部**中首次赋值的变量为**局部变量**。局部变量仅在当前执行上下文中可见，进入子函数或子上下文时会创建独立的副本。\n\n```\n// 头部区域 → 全局变量，整个文件可见\ncounter:0\nbase_url:https://api.example.com\n\n// ← 空行分隔\n\n// 词条内部 → 局部变量\n开始\ntemp:%counter%             ← 可读全局变量\ncounter+:[%counter%+1]   ← 可修改全局变量\nlocal_var:临时值            ← 局部变量，外部不可见\n```\n\n### 作用域注意事项\n\n- 全局变量在**每次词条触发时保持其值**，不会重置。这使得 `counter+:1` 可以在多次触发间累加。\n- 子上下文（如 `$call$` 函数调用）中读取全局变量时，获取的是**当前快照值**；修改全局变量会影响父上下文。\n- 在同一作用域中，对已存在的变量再次使用 `:` 赋值会**覆盖**其值和类型。\n\n## 3.2 赋值操作符\n\n| 操作符 | 示例 | 语义 |\n|--------|------|------|\n| `:` | `name:Alice` | **自适应赋值**：值尝试解析为 JSON 字面量（数字/布尔/null/对象/数组），不成则当字符串 |\n| `::` | `greeting::Hello` | **纯文本赋值**：值始终作为字符串，不解析 JSON |\n| `+:` | `score+:5` | 自增 / JSON追加 / 字符串拼接 |\n| `-:` | `count-:1` | 自减 |\n| `*:` | `val*:2` | 乘法 / 字符串重复 |\n| `/:` | `val/:2` | 除法 |\n| `%:` | `val%:3` | 取余 |\n\n> 只有 ASCII 半角冒号 `:`（U+003A）被识别为赋值操作符。中文全角冒号 `：`（U+FF1A）**不是**操作符，在文本中直接原样输出。\n\n### `:`（自适应赋值）vs `::`（纯文本赋值）\n\n这是 NR 中最容易被忽视但最重要的语义差异：\n\n| 特性 | `:`（单冒号） | `::`（双冒号） |\n|------|-------------|---------------|\n| 值解析 | 尝试解析为 JSON 字面量 | 始终作为字符串 |\n| `1` | Int(1) | Str("1") |\n| `1.5` | Float(1.5) | Str("1.5") |\n| `true` | Bool(true) | Str("true") |\n| `null` | Null | Str("null") |\n| `{"a":1}` | JSON 对象 | Str("{\'a\':1}") |\n| `Alice` | Str("Alice") | Str("Alice") |\n\n```\n// : 自适应赋值——数字被识别为数值类型\ncount:100\n%TYPE@count%   → "整数"\n\n// :: 纯文本赋值——永远是字符串\nid::100\n%TYPE@id%      → "字符串"\n\n// 实际影响：数学运算\n[%count%+1]   → 101   （Int 运算）\n// [%id%+1]   → 报错 / 意外（字符串不能加）\n```\n\n### 何时使用 `::`\n\n- 存储**编号、ID、电话号**等不应被当作数字处理的值（如 `id::001` 不会丢掉前导零）\n- 存储可能是数字字面量的**字符串**（如文件名"123.json"）\n- 需要精确控制类型以避免意外数值运算的场景\n\n**注意事项：** 当你对 `::` 赋值的变量使用 `+:`（自增）时，由于值是字符串，`+:` 会执行**字符串拼接**而非数学加法。这可能不是你想要的行为。\n\n## 3.3 条件赋值 `?:`\n\n```\nkey:@a?:@b?:fallback\n```\n\n从左到右尝试读取 JSON 路径，第一个非空、非 null、非 false 的值被赋值。\n\n## 3.4 内置变量\n\n| 变量 | 说明 |\n|------|------|\n| `%空格%` | 空格 `" "` |\n| `%换行%` | 换行 `"\\n"` |\n| `%时间戳%` | Unix 时间戳（秒） |\n| `%毫秒时间戳%` | Unix 时间戳（毫秒） |\n| `%微秒时间戳%` | Unix 时间戳（微秒） |\n| `%纳秒时间戳%` | Unix 时间戳（纳秒） |\n| `%时间%` | 格式化本地时间 `YYYY-MM-DD HH:MM:SS`（UTC+8） |\n| `%随机数M-N%` | 随机整数 `[M, N]`（含两端） |\n| `%!key%` | 布尔取反：空/0/false/null → `"1"`，否则 → `"0"` |\n| `%?key%` | 可选变量：不存在返回空字符串 |\n| `%++var%` | 自增：先自增再返回递增后的值（变量不存在默认 0） |\n| `%--var%` | 自减：先自减再返回递减后的值（变量不存在默认 0） |\n| `%参数%` | 所有参数列表（JSON 数组） |\n| `%参数0%` | 函数名 / 完整触发名 |\n| `%参数N%` | 第 N 个参数 |\n| `%_%` | 当前对象名 / 函数名 |\n| `%触发%` | 当前触发词 |\n| `%行数%` | 当前行号（1-based） |\n| `%B64@key%` | Base64 解码 |\n| `%URL编码@key%` | URL 编码 |\n| `%len@key%` / `%长度@key%` | 返回变量值的字符长度 |\n| `%@var[切片]%` / `@var[切片]` | 符号截取文本（Python 风格切片，支持 `%` 快捷两种写法） |\n| `%func@key%` | 获取函数指针（类型为"函数"，display 为函数名） |\n| `%包名.变量%` | 跨包变量引用（如 `%mypkg.x%` 读取引入包的头部变量） |\n\n### 内置变量的生命周期\n\n内置变量（`%xxx%`）与用户定义的变量在生命周期上有本质区别：\n\n- **即时求值**：每次读取内置变量（如 `%时间戳%`）时，都会**重新计算**当前值。它不存储"快照"，而是每次调用运行时函数。\n- **不可赋值**：不能对内置变量使用 `:` 赋值——`%时间戳%:123` 是无效的。\n- **临时性**：内置变量的值仅在当前表达式求值瞬间有效。如需多次使用同一值，应将其赋值给用户变量：`ts:%时间戳%`。\n- **参数变量 `%参数N%`** 在函数体内是局部变量，函数返回后失效；在词条触发时反映的是触发参数。\n\n```\n// 推荐做法：缓存内置变量\nstart_time:%毫秒时间戳%\n// ... 多步操作 ...\nelapsed:[%毫秒时间戳%-%start_time%]   ← 两次读取产生不同值，差值有意义\n```\n\n## 3.5 符号截取文本 `%@var[切片]%` / `@var[切片]`\n\n内联文本切片语法，对变量值按字符（`.chars()`）进行 Python 风格切片。中文、emoji 等多字节字符均算一个字符。\n\n**两种写法等价**：\n\n- `%@var[切片]%` —— 标准写法，需 `%` 包裹\n- `@var[切片]` —— 快捷写法，无需 `%` 包裹，直接解析\n\n**基本语法**：`@变量名[start:end:step]`\n\n| 写法 | 含义 |\n|------|------|\n| `@a[1:]` | 从第 2 个字符到末尾 |\n| `@a[1:3]` | 第 2 ~ 3 个字符（index 1 和 2，不含 3） |\n| `@a[:3]` | 前 3 个字符 |\n| `@a[-3:]` | 末尾 3 个字符 |\n| `@a[1:6:2]` | index 1~5，步长 2（隔一个取一个） |\n| `@a[::2]` | 从头到尾，步长 2 |\n| `@a[::-1]` | 反转字符串 |\n\n```\nname:你好世界NR语言\n\n%name%             → "你好世界NR语言"\n%len@name%         → "8"\n\n// 标准写法\n%@name[1:]%        → "好世界NR语言"\n%@name[1:3]%       → "好世"\n%@name[:2]%        → "你好"\n%@name[-3:]%       → "R语言"\n%@name[::-1]%      → "言语RN界世好你"\n\n// 快捷写法（无需 % 包裹）\n@name[1:]          → "好世界NR语言"\n@name[1:3]         → "好世"\n@name[:2]          → "你好"\n@name[-3:]         → "R语言"\n@name[::-1]        → "言语RN界世好你"\n```\n\n> 快捷写法 `@var[切片]` 通过方括号内含 `:` 来与 JSON 路径导航（`@json[key]`）区分。不含 `:` 的方括号仍走 JSON 路径逻辑。\n',Gh=Object.assign({"../../v1.0/canvas-create.md":_l,"../../v1.0/canvas-ellipse.md":vl,"../../v1.0/canvas-get.md":bl,"../../v1.0/canvas-image.md":xl,"../../v1.0/canvas-line.md":yl,"../../v1.0/canvas-rect.md":kl,"../../v1.0/canvas-set-color.md":wl,"../../v1.0/canvas-text.md":Tl,"../../v1.0/canvas.md":Sl,"../../v1.0/control-flow.md":El,"../../v1.0/entries.md":Rl,"../../v1.0/expressions.md":Al,"../../v1.0/file-copy.md":Ol,"../../v1.0/file-delete-dir.md":Pl,"../../v1.0/file-delete.md":Cl,"../../v1.0/file-dir-exists.md":Nl,"../../v1.0/file-dir-size.md":Il,"../../v1.0/file-download.md":Ll,"../../v1.0/file-exists.md":Ml,"../../v1.0/file-ext.md":Dl,"../../v1.0/file-kv-read.md":Hl,"../../v1.0/file-kv-write.md":Bl,"../../v1.0/file-list-dirs.md":Fl,"../../v1.0/file-list-files.md":jl,"../../v1.0/file-path-exists.md":Ul,"../../v1.0/file-random-dir.md":Gl,"../../v1.0/file-random-file.md":zl,"../../v1.0/file-read-lines-count.md":Vl,"../../v1.0/file-read-lines.md":ql,"../../v1.0/file-read-random-line.md":Jl,"../../v1.0/file-read.md":Kl,"../../v1.0/file-rename.md":Wl,"../../v1.0/file-size.md":Yl,"../../v1.0/file-write.md":Zl,"../../v1.0/file.md":Ql,"../../v1.0/flow-callback.md":Xl,"../../v1.0/flow-control.md":nc,"../../v1.0/flow-main-callback.md":ec,"../../v1.0/flow-output.md":tc,"../../v1.0/functions.md":sc,"../../v1.0/index.md":ic,"../../v1.0/json.md":rc,"../../v1.0/lexical.md":oc,"../../v1.0/math-abs.md":lc,"../../v1.0/math-ceil.md":cc,"../../v1.0/math-floor.md":dc,"../../v1.0/math-max.md":ac,"../../v1.0/math-min.md":uc,"../../v1.0/math-pow.md":fc,"../../v1.0/math-round.md":hc,"../../v1.0/math-sum.md":pc,"../../v1.0/math.md":$c,"../../v1.0/modules.md":gc,"../../v1.0/net-content-all.md":mc,"../../v1.0/net-content.md":_c,"../../v1.0/net-create.md":vc,"../../v1.0/net-post-file.md":bc,"../../v1.0/net-post.md":xc,"../../v1.0/net-quick-forward.md":yc,"../../v1.0/net-quick-get.md":kc,"../../v1.0/net-quick-post.md":wc,"../../v1.0/net-send.md":Tc,"../../v1.0/net-set-header.md":Sc,"../../v1.0/net-set-timeout.md":Ec,"../../v1.0/net-switch-get.md":Rc,"../../v1.0/net-switch-post.md":Ac,"../../v1.0/network.md":Oc,"../../v1.0/object-new.md":Pc,"../../v1.0/object.md":Cc,"../../v1.0/oop.md":Nc,"../../v1.0/output-print-return.md":Ic,"../../v1.0/output-print.md":Lc,"../../v1.0/output.md":Mc,"../../v1.0/server-start.md":Dc,"../../v1.0/server.md":Hc,"../../v1.0/string-contains.md":Bc,"../../v1.0/string-count.md":Fc,"../../v1.0/string-ends-with.md":jc,"../../v1.0/string-find.md":Uc,"../../v1.0/string-is-alpha.md":Gc,"../../v1.0/string-is-digit.md":zc,"../../v1.0/string-is-lower.md":Vc,"../../v1.0/string-is-upper.md":qc,"../../v1.0/string-is-whitespace.md":Jc,"../../v1.0/string-join.md":Kc,"../../v1.0/string-len.md":Wc,"../../v1.0/string-lower.md":Yc,"../../v1.0/string-pad-center.md":Zc,"../../v1.0/string-pad-left.md":Qc,"../../v1.0/string-pad-right.md":Xc,"../../v1.0/string-repeat.md":nd,"../../v1.0/string-replace.md":ed,"../../v1.0/string-split.md":td,"../../v1.0/string-starts-with.md":sd,"../../v1.0/string-substr.md":id,"../../v1.0/string-swapcase.md":rd,"../../v1.0/string-title.md":od,"../../v1.0/string-trim-prefix.md":ld,"../../v1.0/string-trim-suffix.md":cd,"../../v1.0/string-trim.md":dd,"../../v1.0/string-upper.md":ad,"../../v1.0/string.md":ud,"../../v1.0/type-to-float.md":fd,"../../v1.0/type-to-int.md":hd,"../../v1.0/type-to-number.md":pd,"../../v1.0/type-to-string.md":$d,"../../v1.0/type.md":gd,"../../v1.0/types.md":md,"../../v1.0/variables.md":_d}),vd=[];for(const[n,e]of Object.entries(Gh)){const t=n.match(/v1\.0\/(.+)\.md$/);if(!t)continue;let s=t[1];const i=s==="index"?"/v1.0/":`/v1.0/${s}`,r=e.match(/^#\s+(.+)$/m),o=r?r[1]:i,l=[],c=/^#{2,3}\s+(.+)$/gm;let a;for(;(a=c.exec(e))!==null;)l.push(a[1]);vd.push({path:i,title:o,headings:l,content:e})}function zh(n){if(!n.trim())return[];const e=n.toLowerCase().split(/\s+/).filter(Boolean);return vd.filter(t=>{const s=(t.title+" "+t.headings.join(" ")+" "+t.content).toLowerCase();return e.every(i=>s.includes(i))}).map(t=>{const s=t.content.toLowerCase().indexOf(e[0]),i=Math.max(0,s-40),r=Math.min(t.content.length,s+120);let o=t.content.slice(i,r).replace(/\n+/g," ");return i>0&&(o="..."+o),r<t.content.length&&(o+="..."),{...t,snippet:o}}).slice(0,10)}const Vh={class:"search-modal"},qh={class:"search-input-wrap"},Jh={key:0,class:"search-results"},Kh=["onClick","onMouseenter"],Wh={class:"result-title"},Yh={class:"result-path"},Zh={class:"result-snippet"},Qh={key:1,class:"search-empty"},Xh={__name:"SearchModal",emits:["close"],setup(n,{emit:e}){const t=e,s=Be(""),i=Be([]),r=Be(0),o=Be(null);gi(()=>{var a;return(a=o.value)==null?void 0:a.focus()}),vt(s,a=>{i.value=zh(a),r.value=0});function l(a){window.location.hash="#"+a,t("close")}function c(a){a.key==="Escape"?t("close"):a.key==="ArrowDown"?(a.preventDefault(),r.value=Math.min(r.value+1,i.value.length-1)):a.key==="ArrowUp"?(a.preventDefault(),r.value=Math.max(r.value-1,0)):a.key==="Enter"&&i.value[r.value]&&l(i.value[r.value].path)}return(a,d)=>(G(),z("div",{class:"search-overlay",onClick:d[2]||(d[2]=af(u=>t("close"),["self"]))},[V("div",Vh,[V("div",qh,[d[3]||(d[3]=V("svg",{class:"search-icon",viewBox:"0 0 24 24",width:"20",height:"20",fill:"none",stroke:"currentColor","stroke-width":"2"},[V("circle",{cx:"11",cy:"11",r:"8"}),V("path",{d:"m21 21-4.35-4.35"})],-1)),ba(V("input",{ref_key:"inputEl",ref:o,"onUpdate:modelValue":d[0]||(d[0]=u=>s.value=u),class:"search-input",placeholder:"搜索文档...",onKeydown:c},null,544),[[lf,s.value]]),V("button",{class:"search-close",onClick:d[1]||(d[1]=u=>t("close"))},"Esc")]),i.value.length?(G(),z("div",Jh,[(G(!0),z(pn,null,De(i.value,(u,p)=>(G(),z("div",{key:u.path,class:Zn(["search-result",{active:p===r.value}]),onClick:$=>l(u.path),onMouseenter:$=>r.value=p},[V("div",Wh,Sn(u.title),1),V("div",Yh,Sn(u.path),1),V("div",Zh,Sn(u.snippet),1)],42,Kh))),128))])):s.value?(G(),z("div",Qh," 未找到相关结果 ")):Ge("",!0)])]))}},np=ot(Xh,[["__scopeId","data-v-66966829"]]),ep=["value"],tp="/v1.0/",sp={__name:"VersionSwitcher",setup(n){const e=[{label:"v1.0",path:"/v1.0/"}];function t(s){window.location.hash="#"+s.target.value}return(s,i)=>(G(),z("select",{class:"version-select",value:tp,onChange:t},[(G(),z(pn,null,De(e,r=>V("option",{key:r.path,value:r.path},Sn(r.label),9,ep)),64))],32))}},ip=ot(sp,[["__scopeId","data-v-8cf198cc"]]),rp={class:"header"},op=["title"],lp={key:0,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},cp={key:1,viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},dp={class:"main"},ap={class:"sidebar"},up={class:"content"},fp={__name:"App",setup(n){const{isDark:e,toggle:t}=gf(),s=Be(!1);function i(r){(r.ctrlKey||r.metaKey)&&r.key==="k"&&(r.preventDefault(),s.value=!0)}return(r,o)=>{const l=Fa("router-view");return G(),z(pn,null,[V("div",{class:"app",onKeydown:i},[V("header",rp,[o[6]||(o[6]=V("a",{class:"logo",href:"#/"},"NR 语言参考手册",-1)),xn(ip),o[7]||(o[7]=V("div",{class:"header-spacer"},null,-1)),V("button",{class:"icon-btn",onClick:o[0]||(o[0]=c=>s.value=!0),title:"搜索 (Ctrl+K)"},[...o[3]||(o[3]=[V("svg",{viewBox:"0 0 24 24",width:"18",height:"18",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"},[V("circle",{cx:"11",cy:"11",r:"8"}),V("path",{d:"m21 21-4.35-4.35"})],-1)])]),V("button",{class:"icon-btn",onClick:o[1]||(o[1]=(...c)=>vn(t)&&vn(t)(...c)),title:vn(e)?"浅色模式":"深色模式"},[vn(e)?(G(),z("svg",lp,[...o[4]||(o[4]=[V("circle",{cx:"12",cy:"12",r:"5"},null,-1),V("path",{d:"M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"},null,-1)])])):(G(),z("svg",cp,[...o[5]||(o[5]=[V("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"},null,-1)])]))],8,op)]),V("div",dp,[V("aside",ap,[xn(Uh)]),V("main",up,[xn(l)])])],32),s.value?(G(),Xo(np,{key:0,onClose:o[2]||(o[2]=c=>s.value=!1)})):Ge("",!0)],64)}}},hp=ot(fp,[["__scopeId","data-v-892a6446"]]),pp={},$p={class:"home"};function gp(n,e){return G(),z("div",$p,[...e[0]||(e[0]=[vu('<section class="hero" data-v-81833c9c><h1 class="hero-name" data-v-81833c9c>NR 语言</h1><p class="hero-text" data-v-81833c9c>参考手册</p><p class="hero-tagline" data-v-81833c9c>Nebula 词库引擎的领域特定语言</p><a class="hero-btn" href="#/v1.0/" data-v-81833c9c>开始阅读</a></section><section class="features" data-v-81833c9c><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>简洁语法</h3><p data-v-81833c9c>NR 采用直观的触发词-响应模式，头部空行分隔结构，让词库编写像写笔记一样自然。</p></div><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>动态类型</h3><p data-v-81833c9c>支持整数、浮点、字符串、布尔、对象、函数等类型，运行时自动推断，灵活高效。</p></div><div class="feature" data-v-81833c9c><h3 data-v-81833c9c>模块化</h3><p data-v-81833c9c>支持文件/目录引入、跨包调用、热更新，轻松构建大型自动化文本生成系统。</p></div></section><section class="tools" data-v-81833c9c><h2 data-v-81833c9c>工具</h2><p data-v-81833c9c><a href="./vscode-nr/nr-language-1.0.0.vsix" data-v-81833c9c>下载 VS Code 语法高亮扩展 (.vsix)</a></p><p data-v-81833c9c>安装：VS Code → <code data-v-81833c9c>Ctrl+Shift+P</code> → &quot;Install from VSIX...&quot; → 选择下载的文件</p><p class="vsix-notice" data-v-81833c9c>注意：此插件仅提供最新版本，不保证历史版本兼容。</p></section><section class="info" data-v-81833c9c><h2 data-v-81833c9c>项目信息</h2><ul data-v-81833c9c><li data-v-81833c9c><strong data-v-81833c9c>引擎</strong>：Nebula 词库引擎</li><li data-v-81833c9c><strong data-v-81833c9c>实现语言</strong>：Rust</li><li data-v-81833c9c><strong data-v-81833c9c>许可证</strong>：Copyright (c) 2025 保留所有权利</li></ul></section>',4)])])}const mp=ot(pp,[["render",gp],["__scopeId","data-v-81833c9c"]]);function Si(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let qe=Si();function bd(n){qe=n}const xd=/[&<>"']/,_p=new RegExp(xd.source,"g"),yd=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,vp=new RegExp(yd.source,"g"),bp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Dr=n=>bp[n];function jn(n,e){if(e){if(xd.test(n))return n.replace(_p,Dr)}else if(yd.test(n))return n.replace(vp,Dr);return n}const xp=/(^|[^\[])\^/g;function cn(n,e){let t=typeof n=="string"?n:n.source;e=e||"";const s={replace:(i,r)=>{let o=typeof r=="string"?r:r.source;return o=o.replace(xp,"$1"),t=t.replace(i,o),s},getRegex:()=>new RegExp(t,e)};return s}function Hr(n){try{n=encodeURI(n).replace(/%25/g,"%")}catch{return null}return n}const Tt={exec:()=>null};function Br(n,e){const t=n.replace(/\|/g,(r,o,l)=>{let c=!1,a=o;for(;--a>=0&&l[a]==="\\";)c=!c;return c?"|":" |"}),s=t.split(/ \|/);let i=0;if(s[0].trim()||s.shift(),s.length>0&&!s[s.length-1].trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;i<s.length;i++)s[i]=s[i].trim().replace(/\\\|/g,"|");return s}function ft(n,e,t){const s=n.length;if(s===0)return"";let i=0;for(;i<s&&n.charAt(s-i-1)===e;)i++;return n.slice(0,s-i)}function yp(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return-1}function Fr(n,e,t,s){const i=e.href,r=e.title?jn(e.title):null,o=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){s.state.inLink=!0;const l={type:"link",raw:t,href:i,title:r,text:o,tokens:s.inlineTokens(o)};return s.state.inLink=!1,l}return{type:"image",raw:t,href:i,title:r,text:jn(o)}}function kp(n,e){const t=n.match(/^(\s+)(?:```)/);if(t===null)return e;const s=t[1];return e.split(`
`).map(i=>{const r=i.match(/^\s+/);if(r===null)return i;const[o]=r;return o.length>=s.length?i.slice(s.length):i}).join(`
`)}class os{constructor(e){an(this,"options");an(this,"rules");an(this,"lexer");this.options=e||qe}space(e){const t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){const t=this.rules.block.code.exec(e);if(t){const s=t[0].replace(/^(?: {1,4}| {0,3}\t)/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?s:ft(s,`
`)}}}fences(e){const t=this.rules.block.fences.exec(e);if(t){const s=t[0],i=kp(s,t[3]||"");return{type:"code",raw:s,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){const t=this.rules.block.heading.exec(e);if(t){let s=t[2].trim();if(/#$/.test(s)){const i=ft(s,"#");(this.options.pedantic||!i||/ $/.test(i))&&(s=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:s,tokens:this.lexer.inline(s)}}}hr(e){const t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ft(t[0],`
`)}}blockquote(e){const t=this.rules.block.blockquote.exec(e);if(t){let s=ft(t[0],`
`).split(`
`),i="",r="";const o=[];for(;s.length>0;){let l=!1;const c=[];let a;for(a=0;a<s.length;a++)if(/^ {0,3}>/.test(s[a]))c.push(s[a]),l=!0;else if(!l)c.push(s[a]);else break;s=s.slice(a);const d=c.join(`
`),u=d.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");i=i?`${i}
${d}`:d,r=r?`${r}
${u}`:u;const p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,o,!0),this.lexer.state.top=p,s.length===0)break;const $=o[o.length-1];if(($==null?void 0:$.type)==="code")break;if(($==null?void 0:$.type)==="blockquote"){const x=$,k=x.raw+`
`+s.join(`
`),I=this.blockquote(k);o[o.length-1]=I,i=i.substring(0,i.length-x.raw.length)+I.raw,r=r.substring(0,r.length-x.text.length)+I.text;break}else if(($==null?void 0:$.type)==="list"){const x=$,k=x.raw+`
`+s.join(`
`),I=this.list(k);o[o.length-1]=I,i=i.substring(0,i.length-$.raw.length)+I.raw,r=r.substring(0,r.length-x.raw.length)+I.raw,s=k.substring(o[o.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:o,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let s=t[1].trim();const i=s.length>1,r={type:"list",raw:"",ordered:i,start:i?+s.slice(0,-1):"",loose:!1,items:[]};s=i?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=i?s:"[*+-]");const o=new RegExp(`^( {0,3}${s})((?:[	 ][^\\n]*)?(?:\\n|$))`);let l=!1;for(;e;){let c=!1,a="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;a=t[0],e=e.substring(a.length);let u=t[2].split(`
`,1)[0].replace(/^\t+/,L=>" ".repeat(3*L.length)),p=e.split(`
`,1)[0],$=!u.trim(),x=0;if(this.options.pedantic?(x=2,d=u.trimStart()):$?x=t[1].length+1:(x=t[2].search(/[^ ]/),x=x>4?1:x,d=u.slice(x),x+=t[1].length),$&&/^[ \t]*$/.test(p)&&(a+=p+`
`,e=e.substring(p.length+1),c=!0),!c){const L=new RegExp(`^ {0,${Math.min(3,x-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),E=new RegExp(`^ {0,${Math.min(3,x-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),N=new RegExp(`^ {0,${Math.min(3,x-1)}}(?:\`\`\`|~~~)`),O=new RegExp(`^ {0,${Math.min(3,x-1)}}#`),q=new RegExp(`^ {0,${Math.min(3,x-1)}}<(?:[a-z].*>|!--)`,"i");for(;e;){const W=e.split(`
`,1)[0];let J;if(p=W,this.options.pedantic?(p=p.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  "),J=p):J=p.replace(/\t/g,"    "),N.test(p)||O.test(p)||q.test(p)||L.test(p)||E.test(p))break;if(J.search(/[^ ]/)>=x||!p.trim())d+=`
`+J.slice(x);else{if($||u.replace(/\t/g,"    ").search(/[^ ]/)>=4||N.test(u)||O.test(u)||E.test(u))break;d+=`
`+p}!$&&!p.trim()&&($=!0),a+=W+`
`,e=e.substring(W.length+1),u=J.slice(x)}}r.loose||(l?r.loose=!0:/\n[ \t]*\n[ \t]*$/.test(a)&&(l=!0));let k=null,I;this.options.gfm&&(k=/^\[[ xX]\] /.exec(d),k&&(I=k[0]!=="[ ] ",d=d.replace(/^\[[ xX]\] +/,""))),r.items.push({type:"list_item",raw:a,task:!!k,checked:I,loose:!1,text:d,tokens:[]}),r.raw+=a}r.items[r.items.length-1].raw=r.items[r.items.length-1].raw.trimEnd(),r.items[r.items.length-1].text=r.items[r.items.length-1].text.trimEnd(),r.raw=r.raw.trimEnd();for(let c=0;c<r.items.length;c++)if(this.lexer.state.top=!1,r.items[c].tokens=this.lexer.blockTokens(r.items[c].text,[]),!r.loose){const a=r.items[c].tokens.filter(u=>u.type==="space"),d=a.length>0&&a.some(u=>/\n.*\n/.test(u.raw));r.loose=d}if(r.loose)for(let c=0;c<r.items.length;c++)r.items[c].loose=!0;return r}}html(e){const t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){const t=this.rules.block.def.exec(e);if(t){const s=t[1].toLowerCase().replace(/\s+/g," "),i=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:s,raw:t[0],href:i,title:r}}}table(e){const t=this.rules.block.table.exec(e);if(!t||!/[:|]/.test(t[2]))return;const s=Br(t[1]),i=t[2].replace(/^\||\| *$/g,"").split("|"),r=t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(s.length===i.length){for(const l of i)/^ *-+: *$/.test(l)?o.align.push("right"):/^ *:-+: *$/.test(l)?o.align.push("center"):/^ *:-+ *$/.test(l)?o.align.push("left"):o.align.push(null);for(let l=0;l<s.length;l++)o.header.push({text:s[l],tokens:this.lexer.inline(s[l]),header:!0,align:o.align[l]});for(const l of r)o.rows.push(Br(l,o.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[a]})));return o}}lheading(e){const t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){const t=this.rules.block.paragraph.exec(e);if(t){const s=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:s,tokens:this.lexer.inline(s)}}}text(e){const t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){const t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:jn(t[1])}}tag(e){const t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){const t=this.rules.inline.link.exec(e);if(t){const s=t[2].trim();if(!this.options.pedantic&&/^</.test(s)){if(!/>$/.test(s))return;const o=ft(s.slice(0,-1),"\\");if((s.length-o.length)%2===0)return}else{const o=yp(t[2],"()");if(o>-1){const c=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,c).trim(),t[3]=""}}let i=t[2],r="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);o&&(i=o[1],r=o[3])}else r=t[3]?t[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(this.options.pedantic&&!/>$/.test(s)?i=i.slice(1):i=i.slice(1,-1)),Fr(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer)}}reflink(e,t){let s;if((s=this.rules.inline.reflink.exec(e))||(s=this.rules.inline.nolink.exec(e))){const i=(s[2]||s[1]).replace(/\s+/g," "),r=t[i.toLowerCase()];if(!r){const o=s[0].charAt(0);return{type:"text",raw:o,text:o}}return Fr(s,r,s[0],this.lexer)}}emStrong(e,t,s=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!i||i[3]&&s.match(/[\p{L}\p{N}]/u))return;if(!(i[1]||i[2]||"")||!s||this.rules.inline.punctuation.exec(s)){const o=[...i[0]].length-1;let l,c,a=o,d=0;const u=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(i=u.exec(t))!=null;){if(l=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!l)continue;if(c=[...l].length,i[3]||i[4]){a+=c;continue}else if((i[5]||i[6])&&o%3&&!((o+c)%3)){d+=c;continue}if(a-=c,a>0)continue;c=Math.min(c,c+a+d);const p=[...i[0]][0].length,$=e.slice(0,o+i.index+p+c);if(Math.min(o,c)%2){const k=$.slice(1,-1);return{type:"em",raw:$,text:k,tokens:this.lexer.inlineTokens(k)}}const x=$.slice(2,-2);return{type:"strong",raw:$,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const t=this.rules.inline.code.exec(e);if(t){let s=t[2].replace(/\n/g," ");const i=/[^ ]/.test(s),r=/^ /.test(s)&&/ $/.test(s);return i&&r&&(s=s.substring(1,s.length-1)),s=jn(s,!0),{type:"codespan",raw:t[0],text:s}}}br(e){const t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){const t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){const t=this.rules.inline.autolink.exec(e);if(t){let s,i;return t[2]==="@"?(s=jn(t[1]),i="mailto:"+s):(s=jn(t[1]),i=s),{type:"link",raw:t[0],text:s,href:i,tokens:[{type:"text",raw:s,text:s}]}}}url(e){var s;let t;if(t=this.rules.inline.url.exec(e)){let i,r;if(t[2]==="@")i=jn(t[0]),r="mailto:"+i;else{let o;do o=t[0],t[0]=((s=this.rules.inline._backpedal.exec(t[0]))==null?void 0:s[0])??"";while(o!==t[0]);i=jn(t[0]),t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(e){const t=this.rules.inline.text.exec(e);if(t){let s;return this.lexer.state.inRawBlock?s=t[0]:s=jn(t[0]),{type:"text",raw:t[0],text:s}}}}const wp=/^(?:[ \t]*(?:\n|$))+/,Tp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Sp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Bt=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ep=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,kd=/(?:[*+-]|\d{1,9}[.)])/,wd=cn(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,kd).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),Ei=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Rp=/^[^\n]+/,Ri=/(?!\s*\])(?:\\.|[^\[\]\\])+/,Ap=cn(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ri).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Op=cn(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,kd).getRegex(),ys="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ai=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Pp=cn("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ai).replace("tag",ys).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Td=cn(Ei).replace("hr",Bt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex(),Cp=cn(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Td).getRegex(),Oi={blockquote:Cp,code:Tp,def:Ap,fences:Sp,heading:Ep,hr:Bt,html:Pp,lheading:wd,list:Op,newline:wp,paragraph:Td,table:Tt,text:Rp},jr=cn("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Bt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex(),Np={...Oi,table:jr,paragraph:cn(Ei).replace("hr",Bt).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",jr).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ys).getRegex()},Ip={...Oi,html:cn(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ai).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Tt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:cn(Ei).replace("hr",Bt).replace("heading",` *#{1,6} *[^
]`).replace("lheading",wd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Sd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Lp=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ed=/^( {2,}|\\)\n(?!\s*$)/,Mp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ft="\\p{P}\\p{S}",Dp=cn(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,Ft).getRegex(),Hp=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,Bp=cn(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,Ft).getRegex(),Fp=cn("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,Ft).getRegex(),jp=cn("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,Ft).getRegex(),Up=cn(/\\([punct])/,"gu").replace(/punct/g,Ft).getRegex(),Gp=cn(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),zp=cn(Ai).replace("(?:-->|$)","-->").getRegex(),Vp=cn("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",zp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ls=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,qp=cn(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",ls).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Rd=cn(/^!?\[(label)\]\[(ref)\]/).replace("label",ls).replace("ref",Ri).getRegex(),Ad=cn(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ri).getRegex(),Jp=cn("reflink|nolink(?!\\()","g").replace("reflink",Rd).replace("nolink",Ad).getRegex(),Pi={_backpedal:Tt,anyPunctuation:Up,autolink:Gp,blockSkip:Hp,br:Ed,code:Lp,del:Tt,emStrongLDelim:Bp,emStrongRDelimAst:Fp,emStrongRDelimUnd:jp,escape:Sd,link:qp,nolink:Ad,punctuation:Dp,reflink:Rd,reflinkSearch:Jp,tag:Vp,text:Mp,url:Tt},Kp={...Pi,link:cn(/^!?\[(label)\]\((.*?)\)/).replace("label",ls).getRegex(),reflink:cn(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ls).getRegex()},ti={...Pi,escape:cn(Sd).replace("])","~|])").getRegex(),url:cn(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},Wp={...ti,br:cn(Ed).replace("{2,}","*").getRegex(),text:cn(ti.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vt={normal:Oi,gfm:Np,pedantic:Ip},ht={normal:Pi,gfm:ti,breaks:Wp,pedantic:Kp};class Jn{constructor(e){an(this,"tokens");an(this,"options");an(this,"state");an(this,"tokenizer");an(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||qe,this.options.tokenizer=this.options.tokenizer||new os,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const t={block:Vt.normal,inline:ht.normal};this.options.pedantic?(t.block=Vt.pedantic,t.inline=ht.pedantic):this.options.gfm&&(t.block=Vt.gfm,this.options.breaks?t.inline=ht.breaks:t.inline=ht.gfm),this.tokenizer.rules=t}static get rules(){return{block:Vt,inline:ht}}static lex(e,t){return new Jn(t).lex(e)}static lexInline(e,t){return new Jn(t).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){const s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.options.pedantic&&(e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""));let i,r,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(l=>(i=l.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))){if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length),i.raw.length===1&&t.length>0?t[t.length-1].raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&(r.type==="paragraph"||r.type==="text")?(r.raw+=`
`+i.raw,r.text+=`
`+i.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title});continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let l=1/0;const c=e.slice(1);let a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},c),typeof a=="number"&&a>=0&&(l=Math.min(l,a))}),l<1/0&&l>=0&&(o=e.substring(0,l+1))}if(this.state.top&&(i=this.tokenizer.paragraph(o))){r=t[t.length-1],s&&(r==null?void 0:r.type)==="paragraph"?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i),s=o.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length),r=t[t.length-1],r&&r.type==="text"?(r.raw+=`
`+i.raw,r.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):t.push(i);continue}if(e){const l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let s,i,r,o=e,l,c,a;if(this.tokens.links){const d=Object.keys(this.tokens.links);if(d.length>0)for(;(l=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)d.includes(l[0].slice(l[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(l=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,l.index)+"["+"a".repeat(l[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(l=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,l.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(c||(a=""),c=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(d=>(s=d.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))){if(s=this.tokenizer.escape(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.tag(e)){e=e.substring(s.raw.length),i=t[t.length-1],i&&s.type==="text"&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(s=this.tokenizer.link(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(s.raw.length),i=t[t.length-1],i&&s.type==="text"&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(s=this.tokenizer.emStrong(e,o,a)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.codespan(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.br(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.del(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.autolink(e)){e=e.substring(s.raw.length),t.push(s);continue}if(!this.state.inLink&&(s=this.tokenizer.url(e))){e=e.substring(s.raw.length),t.push(s);continue}if(r=e,this.options.extensions&&this.options.extensions.startInline){let d=1/0;const u=e.slice(1);let p;this.options.extensions.startInline.forEach($=>{p=$.call({lexer:this},u),typeof p=="number"&&p>=0&&(d=Math.min(d,p))}),d<1/0&&d>=0&&(r=e.substring(0,d+1))}if(s=this.tokenizer.inlineText(r)){e=e.substring(s.raw.length),s.raw.slice(-1)!=="_"&&(a=s.raw.slice(-1)),c=!0,i=t[t.length-1],i&&i.type==="text"?(i.raw+=s.raw,i.text+=s.text):t.push(s);continue}if(e){const d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return t}}class cs{constructor(e){an(this,"options");an(this,"parser");this.options=e||qe}space(e){return""}code({text:e,lang:t,escaped:s}){var o;const i=(o=(t||"").match(/^\S*/))==null?void 0:o[0],r=e.replace(/\n$/,"")+`
`;return i?'<pre><code class="language-'+jn(i)+'">'+(s?r:jn(r,!0))+`</code></pre>
`:"<pre><code>"+(s?r:jn(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){const t=e.ordered,s=e.start;let i="";for(let l=0;l<e.items.length;l++){const c=e.items[l];i+=this.listitem(c)}const r=t?"ol":"ul",o=t&&s!==1?' start="'+s+'"':"";return"<"+r+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:s}){const i=this.parser.parseInline(s),r=Hr(e);if(r===null)return i;e=r;let o='<a href="'+e+'"';return t&&(o+=' title="'+t+'"'),o+=">"+i+"</a>",o}image({href:e,title:t,text:s}){const i=Hr(e);if(i===null)return s;e=i;let r=`<img src="${e}" alt="${s}"`;return t&&(r+=` title="${t}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class Ci{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class Kn{constructor(e){an(this,"options");an(this,"renderer");an(this,"textRenderer");this.options=e||qe,this.options.renderer=this.options.renderer||new cs,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ci}static parse(e,t){return new Kn(t).parse(e)}static parseInline(e,t){return new Kn(t).parseInline(e)}parse(e,t=!0){let s="";for(let i=0;i<e.length;i++){const r=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const l=r,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(l.type)){s+=c||"";continue}}const o=r;switch(o.type){case"space":{s+=this.renderer.space(o);continue}case"hr":{s+=this.renderer.hr(o);continue}case"heading":{s+=this.renderer.heading(o);continue}case"code":{s+=this.renderer.code(o);continue}case"table":{s+=this.renderer.table(o);continue}case"blockquote":{s+=this.renderer.blockquote(o);continue}case"list":{s+=this.renderer.list(o);continue}case"html":{s+=this.renderer.html(o);continue}case"paragraph":{s+=this.renderer.paragraph(o);continue}case"text":{let l=o,c=this.renderer.text(l);for(;i+1<e.length&&e[i+1].type==="text";)l=e[++i],c+=`
`+this.renderer.text(l);t?s+=this.renderer.paragraph({type:"paragraph",raw:c,text:c,tokens:[{type:"text",raw:c,text:c}]}):s+=c;continue}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}parseInline(e,t){t=t||this.renderer;let s="";for(let i=0;i<e.length;i++){const r=e[i];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[r.type]){const l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){s+=l||"";continue}}const o=r;switch(o.type){case"escape":{s+=t.text(o);break}case"html":{s+=t.html(o);break}case"link":{s+=t.link(o);break}case"image":{s+=t.image(o);break}case"strong":{s+=t.strong(o);break}case"em":{s+=t.em(o);break}case"codespan":{s+=t.codespan(o);break}case"br":{s+=t.br(o);break}case"del":{s+=t.del(o);break}case"text":{s+=t.text(o);break}default:{const l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}}class St{constructor(e){an(this,"options");an(this,"block");this.options=e||qe}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Jn.lex:Jn.lexInline}provideParser(){return this.block?Kn.parse:Kn.parseInline}}an(St,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class Yp{constructor(...e){an(this,"defaults",Si());an(this,"options",this.setOptions);an(this,"parse",this.parseMarkdown(!0));an(this,"parseInline",this.parseMarkdown(!1));an(this,"Parser",Kn);an(this,"Renderer",cs);an(this,"TextRenderer",Ci);an(this,"Lexer",Jn);an(this,"Tokenizer",os);an(this,"Hooks",St);this.use(...e)}walkTokens(e,t){var i,r;let s=[];for(const o of e)switch(s=s.concat(t.call(this,o)),o.type){case"table":{const l=o;for(const c of l.header)s=s.concat(this.walkTokens(c.tokens,t));for(const c of l.rows)for(const a of c)s=s.concat(this.walkTokens(a.tokens,t));break}case"list":{const l=o;s=s.concat(this.walkTokens(l.items,t));break}default:{const l=o;(r=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&r[l.type]?this.defaults.extensions.childTokens[l.type].forEach(c=>{const a=l[c].flat(1/0);s=s.concat(this.walkTokens(a,t))}):l.tokens&&(s=s.concat(this.walkTokens(l.tokens,t)))}}return s}use(...e){const t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(s=>{const i={...s};if(i.async=this.defaults.async||i.async||!1,s.extensions&&(s.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){const o=t.renderers[r.name];o?t.renderers[r.name]=function(...l){let c=r.renderer.apply(this,l);return c===!1&&(c=o.apply(this,l)),c}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=t[r.level];o?o.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),i.extensions=t),s.renderer){const r=this.defaults.renderer||new cs(this.defaults);for(const o in s.renderer){if(!(o in r))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const l=o,c=s.renderer[l],a=r[l];r[l]=(...d)=>{let u=c.apply(r,d);return u===!1&&(u=a.apply(r,d)),u||""}}i.renderer=r}if(s.tokenizer){const r=this.defaults.tokenizer||new os(this.defaults);for(const o in s.tokenizer){if(!(o in r))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const l=o,c=s.tokenizer[l],a=r[l];r[l]=(...d)=>{let u=c.apply(r,d);return u===!1&&(u=a.apply(r,d)),u}}i.tokenizer=r}if(s.hooks){const r=this.defaults.hooks||new St;for(const o in s.hooks){if(!(o in r))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const l=o,c=s.hooks[l],a=r[l];St.passThroughHooks.has(o)?r[l]=d=>{if(this.defaults.async)return Promise.resolve(c.call(r,d)).then(p=>a.call(r,p));const u=c.call(r,d);return a.call(r,u)}:r[l]=(...d)=>{let u=c.apply(r,d);return u===!1&&(u=a.apply(r,d)),u}}i.hooks=r}if(s.walkTokens){const r=this.defaults.walkTokens,o=s.walkTokens;i.walkTokens=function(l){let c=[];return c.push(o.call(this,l)),r&&(c=c.concat(r.call(this,l))),c}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Jn.lex(e,t??this.defaults)}parser(e,t){return Kn.parse(e,t??this.defaults)}parseMarkdown(e){return(s,i)=>{const r={...i},o={...this.defaults,...r},l=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return l(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof s>"u"||s===null)return l(new Error("marked(): input parameter is undefined or null"));if(typeof s!="string")return l(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(s)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const c=o.hooks?o.hooks.provideLexer():e?Jn.lex:Jn.lexInline,a=o.hooks?o.hooks.provideParser():e?Kn.parse:Kn.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(s):s).then(d=>c(d,o)).then(d=>o.hooks?o.hooks.processAllTokens(d):d).then(d=>o.walkTokens?Promise.all(this.walkTokens(d,o.walkTokens)).then(()=>d):d).then(d=>a(d,o)).then(d=>o.hooks?o.hooks.postprocess(d):d).catch(l);try{o.hooks&&(s=o.hooks.preprocess(s));let d=c(s,o);o.hooks&&(d=o.hooks.processAllTokens(d)),o.walkTokens&&this.walkTokens(d,o.walkTokens);let u=a(d,o);return o.hooks&&(u=o.hooks.postprocess(u)),u}catch(d){return l(d)}}}onError(e,t){return s=>{if(s.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const i="<p>An error occurred:</p><pre>"+jn(s.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(s);throw s}}}const ze=new Yp;function rn(n,e){return ze.parse(n,e)}rn.options=rn.setOptions=function(n){return ze.setOptions(n),rn.defaults=ze.defaults,bd(rn.defaults),rn};rn.getDefaults=Si;rn.defaults=qe;rn.use=function(...n){return ze.use(...n),rn.defaults=ze.defaults,bd(rn.defaults),rn};rn.walkTokens=function(n,e){return ze.walkTokens(n,e)};rn.parseInline=ze.parseInline;rn.Parser=Kn;rn.parser=Kn.parse;rn.Renderer=cs;rn.TextRenderer=Ci;rn.Lexer=Jn;rn.lexer=Jn.lex;rn.Tokenizer=os;rn.Hooks=St;rn.parse=rn;rn.options;rn.setOptions;rn.use;rn.walkTokens;rn.parseInline;Kn.parse;Jn.lex;const Zp={key:0,class:"doc-footer"},Qp={class:"doc-footer-inner"},Xp=["href"],n$={class:"footer-text"},e$={key:1,class:"footer-link prev placeholder"},t$=["href"],s$={class:"footer-text"},i$={key:3,class:"footer-link next placeholder"},r$={__name:"DocFooter",setup(n){const{prev:e,next:t}=Th();return(s,i)=>vn(e)||vn(t)?(G(),z("nav",Zp,[V("div",Qp,[vn(e)?(G(),z("a",{key:0,href:"#"+vn(e).link,class:"footer-link prev"},[i[0]||(i[0]=V("span",{class:"footer-label"},"上一章",-1)),V("span",n$,Sn(vn(e).text),1)],8,Xp)):(G(),z("div",e$)),vn(t)?(G(),z("a",{key:2,href:"#"+vn(t).link,class:"footer-link next"},[i[1]||(i[1]=V("span",{class:"footer-label"},"下一章",-1)),V("span",s$,Sn(vn(t).text),1)],8,t$)):(G(),z("div",i$))])])):Ge("",!0)}},o$=ot(r$,[["__scopeId","data-v-c9726e4b"]]),l$=["innerHTML"],Ur={__name:"MarkdownPage",setup(n){const e=Ti(),t=Object.assign({"../../v1.0/canvas-create.md":_l,"../../v1.0/canvas-ellipse.md":vl,"../../v1.0/canvas-get.md":bl,"../../v1.0/canvas-image.md":xl,"../../v1.0/canvas-line.md":yl,"../../v1.0/canvas-rect.md":kl,"../../v1.0/canvas-set-color.md":wl,"../../v1.0/canvas-text.md":Tl,"../../v1.0/canvas.md":Sl,"../../v1.0/control-flow.md":El,"../../v1.0/entries.md":Rl,"../../v1.0/expressions.md":Al,"../../v1.0/file-copy.md":Ol,"../../v1.0/file-delete-dir.md":Pl,"../../v1.0/file-delete.md":Cl,"../../v1.0/file-dir-exists.md":Nl,"../../v1.0/file-dir-size.md":Il,"../../v1.0/file-download.md":Ll,"../../v1.0/file-exists.md":Ml,"../../v1.0/file-ext.md":Dl,"../../v1.0/file-kv-read.md":Hl,"../../v1.0/file-kv-write.md":Bl,"../../v1.0/file-list-dirs.md":Fl,"../../v1.0/file-list-files.md":jl,"../../v1.0/file-path-exists.md":Ul,"../../v1.0/file-random-dir.md":Gl,"../../v1.0/file-random-file.md":zl,"../../v1.0/file-read-lines-count.md":Vl,"../../v1.0/file-read-lines.md":ql,"../../v1.0/file-read-random-line.md":Jl,"../../v1.0/file-read.md":Kl,"../../v1.0/file-rename.md":Wl,"../../v1.0/file-size.md":Yl,"../../v1.0/file-write.md":Zl,"../../v1.0/file.md":Ql,"../../v1.0/flow-callback.md":Xl,"../../v1.0/flow-control.md":nc,"../../v1.0/flow-main-callback.md":ec,"../../v1.0/flow-output.md":tc,"../../v1.0/functions.md":sc,"../../v1.0/index.md":ic,"../../v1.0/json.md":rc,"../../v1.0/lexical.md":oc,"../../v1.0/math-abs.md":lc,"../../v1.0/math-ceil.md":cc,"../../v1.0/math-floor.md":dc,"../../v1.0/math-max.md":ac,"../../v1.0/math-min.md":uc,"../../v1.0/math-pow.md":fc,"../../v1.0/math-round.md":hc,"../../v1.0/math-sum.md":pc,"../../v1.0/math.md":$c,"../../v1.0/modules.md":gc,"../../v1.0/net-content-all.md":mc,"../../v1.0/net-content.md":_c,"../../v1.0/net-create.md":vc,"../../v1.0/net-post-file.md":bc,"../../v1.0/net-post.md":xc,"../../v1.0/net-quick-forward.md":yc,"../../v1.0/net-quick-get.md":kc,"../../v1.0/net-quick-post.md":wc,"../../v1.0/net-send.md":Tc,"../../v1.0/net-set-header.md":Sc,"../../v1.0/net-set-timeout.md":Ec,"../../v1.0/net-switch-get.md":Rc,"../../v1.0/net-switch-post.md":Ac,"../../v1.0/network.md":Oc,"../../v1.0/object-new.md":Pc,"../../v1.0/object.md":Cc,"../../v1.0/oop.md":Nc,"../../v1.0/output-print-return.md":Ic,"../../v1.0/output-print.md":Lc,"../../v1.0/output.md":Mc,"../../v1.0/server-start.md":Dc,"../../v1.0/server.md":Hc,"../../v1.0/string-contains.md":Bc,"../../v1.0/string-count.md":Fc,"../../v1.0/string-ends-with.md":jc,"../../v1.0/string-find.md":Uc,"../../v1.0/string-is-alpha.md":Gc,"../../v1.0/string-is-digit.md":zc,"../../v1.0/string-is-lower.md":Vc,"../../v1.0/string-is-upper.md":qc,"../../v1.0/string-is-whitespace.md":Jc,"../../v1.0/string-join.md":Kc,"../../v1.0/string-len.md":Wc,"../../v1.0/string-lower.md":Yc,"../../v1.0/string-pad-center.md":Zc,"../../v1.0/string-pad-left.md":Qc,"../../v1.0/string-pad-right.md":Xc,"../../v1.0/string-repeat.md":nd,"../../v1.0/string-replace.md":ed,"../../v1.0/string-split.md":td,"../../v1.0/string-starts-with.md":sd,"../../v1.0/string-substr.md":id,"../../v1.0/string-swapcase.md":rd,"../../v1.0/string-title.md":od,"../../v1.0/string-trim-prefix.md":ld,"../../v1.0/string-trim-suffix.md":cd,"../../v1.0/string-trim.md":dd,"../../v1.0/string-upper.md":ad,"../../v1.0/string.md":ud,"../../v1.0/type-to-float.md":fd,"../../v1.0/type-to-int.md":hd,"../../v1.0/type-to-number.md":pd,"../../v1.0/type-to-string.md":$d,"../../v1.0/type.md":gd,"../../v1.0/types.md":md,"../../v1.0/variables.md":_d});function s(r){return r.replace(/\]\(\.\/([^)]*?)\)/g,(o,l)=>/\.(vsix|png|jpg|gif|svg|pdf)$/i.test(l)||l.startsWith("http")?o:`](#/v1.0/${l})`)}const i=Ln(()=>{let r;e.path==="/v1.0/"?r="../../v1.0/index.md":r=`../../v1.0/${e.params.page}.md`;const o=t[r];return o?rn.parse(s(o),{gfm:!0,breaks:!1}):"<p>页面未找到</p>"});return(r,o)=>(G(),z(pn,null,[V("article",{class:"markdown-body",innerHTML:i.value},null,8,l$),xn(o$)],64))}},c$=kh({history:eh(),routes:[{path:"/",component:mp},{path:"/v1.0",redirect:"/v1.0/"},{path:"/v1.0/",component:Ur},{path:"/v1.0/:page",component:Ur}],scrollBehavior(){return{top:0}}});hf(hp).use(c$).mount("#app");
