/* Shared memo-card model: no network or browser storage side effects. */
'use strict';
const MemoCards=(()=>{
  const copy=v=>JSON.parse(JSON.stringify(v));
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o||{},k);
  const time=v=>Number.isFinite(Date.parse(v))?Date.parse(v):0;
  const canonical=v=>JSON.stringify(v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,JSON.parse(canonical(v[k]))])):v);
  function migrate(state){
    let changed=false;
    if(!state.memoCards){state.memoCards={};changed=true;}
    state.syncMeta=state.syncMeta||{};state.syncMeta.memoCards=state.syncMeta.memoCards||{};
    const keys=new Set([...Object.keys(state.notes||{}),...Object.keys(state.memoPhotos||{})]);
    for(const rk of keys){
      const id='legacy:'+rk;
      if(own(state.memoCards,id))continue; // Includes deletion tombstones.
      const text=state.notes?.[rk]||'',photo=state.memoPhotos?.[rk]||null;
      if(!text&&!photo)continue;
      const updatedAt=new Date(Math.max(1,...['notes','notePositions','memoPhotos'].map(k=>time(state.syncMeta[k]?.[rk])),time(photo?.updatedAt))).toISOString();
      state.memoCards[id]={id,routeKey:rk,text,position:Number.isInteger(state.notePositions?.[rk])?state.notePositions[rk]:null,order:0,photo:photo?copy(photo):null,deleted:false,updatedAt};
      if(photo&&!photo.remoteId)state.memoCards[id].photo.pendingId=id+':photo';
      state.syncMeta.memoCards[id]=updatedAt;changed=true;
    }
    return changed;
  }
  function list(state,rk){migrate(state);return Object.values(state.memoCards).filter(m=>!m.deleted&&(!rk||m.routeKey===rk)).sort((a,b)=>(a.position??Infinity)-(b.position??Infinity)||a.order-b.order||(a.id<b.id?-1:a.id>b.id?1:0));}
  function patch(state,id,changes){
    migrate(state);const old=state.memoCards[id];
    const updatedAt=new Date(Math.max(Date.now(),time(old?.updatedAt)+1,time(state.syncMeta.memoCards[id])+1)).toISOString();
    state.memoCards[id]={...old,...changes,id,updatedAt};return state.memoCards[id];
  }
  function shared(state){
    migrate(state);const out={};
    for(const [id,m] of Object.entries(state.memoCards)){
      const card=copy(m);
      if(card.photo){delete card.photo.dataUrl;if(!card.photo.remoteId&&!card.photo.pendingId)card.photo.pendingId=id+':photo';}
      out[id]=card;
    }
    return out;
  }
  function merge(a,b){
    const out={};
    for(const id of new Set([...Object.keys(a||{}),...Object.keys(b||{})])){
      const l=a?.[id],r=b?.[id];
      // Total ordering makes equal-clock conflicts converge on both devices.
      const pick=!l?r:!r?l:time(l.updatedAt)!==time(r.updatedAt)?(time(l.updatedAt)>time(r.updatedAt)?l:r):l.deleted!==r.deleted?(l.deleted?l:r):(canonical(l)>=canonical(r)?l:r);
      out[id]=copy(pick);
    }
    return out;
  }
  function hydrate(incoming,previous){
    const out=copy(incoming||{});
    for(const [id,m] of Object.entries(out)){
      const p=previous?.[id]?.photo,q=m.photo;
      if(!m.deleted&&q&&p?.dataUrl&&((q.remoteId&&q.remoteId===p.remoteId)||(!q.remoteId&&q.pendingId&&q.pendingId===p.pendingId)))q.dataUrl=p.dataUrl;
    }
    return out;
  }
  function valid(cards,validRoute){
    if(!cards||typeof cards!=='object'||Array.isArray(cards))return false;
    return Object.entries(cards).every(([id,m])=>{
      if(!m||m.id!==id||!id||id.length>200||['__proto__','constructor','prototype'].includes(id)||!validRoute(m.routeKey)||typeof m.text!=='string'||typeof m.deleted!=='boolean'||!time(m.updatedAt)||!(m.position===null||Number.isInteger(m.position)&&m.position>=0)||!Number.isFinite(m.order))return false;
      const p=m.photo;if(!p)return true;
      const url=p.remoteUrl||p.url;
      return typeof p==='object'&&((typeof p.dataUrl==='string'&&p.dataUrl.startsWith('data:image/jpeg;base64,')&&p.dataUrl.length<500000)||(typeof p.remoteId==='string'&&p.remoteId.length>=20&&typeof url==='string'&&/^https:\/\//.test(url))||(typeof p.pendingId==='string'&&p.pendingId.length<=250));
    });
  }
  return {migrate,list,patch,shared,merge,hydrate,valid};
})();
