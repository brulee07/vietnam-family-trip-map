'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('v11-preview/family-sync.js','utf8').replace('waitForApp();','globalThis.apiTest={syncNow,sharedState,mergeShared,cfg,startPolling};');
const clone=x=>JSON.parse(JSON.stringify(x));
const blank=()=>({routes:{},notes:{},notePositions:{},memoPhotos:{},saved:[],custom:[],todayProgress:{},checklists:{},syncMeta:{routes:{},notes:{},notePositions:{},memoPhotos:{},todayProgress:{},checklists:{},saved:'',custom:''}});
const rk='da_nang:2027-01-12';
let clock=Date.now();
class Clock extends Date{constructor(...a){super(...(a.length?a:[++clock]));}static now(){return ++clock;}}
function fixture(){
 const server={state:blank(),revision:1,fail:false,photoFail:false,hook:null,calls:[]};
 function client(id){
  const timers=new Map(),storage=new Map();let timerId=0;
  const c={local:blank(),window:{},crypto:require('node:crypto').webcrypto,Date:Clock,AbortSignal,URL,URLSearchParams,navigator:{onLine:true},tab:'schedule',document:{querySelector:()=>null},toolsView(){},todayView(){},render(){},toast(){},validateBackup(v){assert.ok(v.data.notes)},setInterval:()=>0,clearInterval(){},setTimeout(f,ms){if(ms<400){queueMicrotask(f);return 0;}timers.set(++timerId,f);return timerId;},clearTimeout(id){timers.delete(id)},localStorage:{getItem:()=>JSON.stringify({enabled:true,endpoint:'https://mock.invalid',roomCode:'TEST',token:'TEST',revision:1,deviceId:id}),setItem:(k,v)=>storage.set(k,v)}};
  c.save=()=>{storage.set('familyTravelV11',JSON.stringify(c.local));return true;};
  c.fetch=async(url,opts)=>{
   const path=new URL(url).pathname,p=JSON.parse(opts.body);server.calls.push({id,path,p});
   if(server.hook)await server.hook(id,path,p);
   if(server.fail)throw Error('offline');
   let d,status=200;
   if(path==='/sync/pull')d=p.revision===server.revision?{notModified:true,revision:server.revision}:{state:clone(server.state),revision:server.revision};
   else if(path==='/sync/push'){
    if(p.baseRevision!==server.revision){status=409;d={error:'revision_conflict',revision:server.revision,state:clone(server.state)};}
    else{server.state=clone(p.state);d={revision:++server.revision};}
   }else if(path==='/photo/upload'){
    if(server.photoFail){status=503;d={error:'photo_storage_not_configured'};}
    else d={remoteId:'abcdefghijklmnopqrstuv',url:'https://mock.invalid/photo.jpg'};
   }else d={ok:true};
   return {ok:status===200,status,json:async()=>d};
  };
  vm.createContext(c);vm.runInContext(source,c);
  return {c,storage,timers,edit(section,key,value){c.local[section][key]=value;c.save();},sync:mode=>c.apiTest.syncNow(mode||'poll'),async scheduled(){const jobs=[...timers.values()];timers.clear();await Promise.all(jobs.map(f=>f()));}};
 }
 const A=client('A'),B=client('B');
 async function converge(){for(let i=0;i<4;i++){await A.scheduled();await B.scheduled();await A.sync();await B.sync();}assert.deepEqual(clone(A.c.apiTest.sharedState()),server.state);assert.deepEqual(clone(B.c.apiTest.sharedState()),server.state);}
 function gate(id,path){let release,enter;const entered=new Promise(r=>enter=r),wait=new Promise(r=>release=r);let used=false;server.hook=async(i,p)=>{if(!used&&i===id&&p===path){used=true;enter();await wait;}};return {entered,release};}
 return {A,B,server,converge,gate};
}
test('ordinary memo A to B',async()=>{const f=fixture();f.A.edit('notes',rk,'hello');await f.converge();assert.equal(f.server.state.notes[rk],'hello');});
test('memo while route push busy survives consumed timer',async()=>{const f=fixture();f.A.edit('routes',rk,['hotel']);const g=f.gate('A','/sync/push'),job=f.A.sync();await g.entered;f.A.edit('notes',rk,'during push');await f.A.scheduled();g.release();await job;assert.equal(f.A.c.apiTest.cfg.dirty,true);await f.converge();assert.equal(f.server.state.notes[rk],'during push');});
test('consecutive memo edits',async()=>{const f=fixture();f.A.edit('notes',rk,'one');const g=f.gate('A','/sync/push'),job=f.A.sync();await g.entered;for(const x of ['two','three','four'])f.A.edit('notes',rk,x);g.release();await job;await f.converge();assert.equal(f.server.state.notes[rk],'four');});
test('simultaneous A B edits and conflict with new local edit',async()=>{const f=fixture();f.A.edit('notes',rk,'A first');const g=f.gate('A','/sync/push'),job=f.A.sync();await g.entered;f.B.edit('notes','da_nang:2027-01-13','B');await f.B.sync();f.A.edit('notes',rk,'A newest');g.release();await job;await f.converge();assert.equal(f.server.state.notes[rk],'A newest');assert.equal(f.server.state.notes['da_nang:2027-01-13'],'B');});
test('offline then recovery',async()=>{const f=fixture();f.A.c.navigator.onLine=false;f.A.edit('notes',rk,'offline');await f.A.scheduled();assert.equal(f.A.c.apiTest.cfg.dirty,true);f.A.c.navigator.onLine=true;await f.converge();assert.equal(f.server.state.notes[rk],'offline');});
test('push failure retries',async()=>{const f=fixture();f.A.edit('notes',rk,'retry');f.server.hook=async(id,path)=>{if(path==='/sync/push')throw Error('failed push')};await f.A.sync();assert.equal(f.A.c.apiTest.cfg.dirty,true);assert.ok(f.A.timers.size);f.server.hook=null;await f.converge();assert.equal(f.server.state.notes[rk],'retry');});
test('local edit during polling',async()=>{const f=fixture();const g=f.gate('A','/sync/pull'),job=f.A.sync();await g.entered;f.A.edit('notes',rk,'during poll');g.release();await job;await f.converge();assert.equal(f.server.state.notes[rk],'during poll');});
test('photo failure does not block text; retry converges',async()=>{const f=fixture();f.server.photoFail=true;f.A.edit('memoPhotos',rk,{dataUrl:'data:image/jpeg;base64,/9j/',width:1,height:1});f.A.edit('notes',rk,'text before photo');await f.A.sync();await f.B.sync();assert.equal(f.B.c.local.notes[rk],'text before photo');assert.ok(f.A.c.apiTest.cfg.lastError);assert.ok(f.A.c.local.memoPhotos[rk].dataUrl);assert.equal(f.server.state.memoPhotos[rk],undefined);const paths=f.server.calls.filter(x=>x.id==='A').map(x=>x.path);assert.ok(paths.indexOf('/sync/push')<paths.indexOf('/photo/upload'));f.server.photoFail=false;await f.converge();assert.ok(f.server.state.memoPhotos[rk].remoteId);assert.equal(f.A.c.apiTest.cfg.lastError,null);});
test('deleted pending photo is not resurrected by upload result',async()=>{const f=fixture();f.A.edit('memoPhotos',rk,{dataUrl:'data:image/jpeg;base64,/9j/'});const g=f.gate('A','/photo/upload'),job=f.A.sync();await g.entered;delete f.A.c.local.memoPhotos[rk];f.A.c.save();g.release();await job;await f.converge();assert.equal(f.server.state.memoPhotos[rk],undefined);});
test('legacy unstamped remote value accepted only without local value or tombstone',()=>{const f=fixture(),a=blank(),b=blank();b.notes[rk]='legacy';assert.equal(f.A.c.apiTest.mergeShared(a,b).notes[rk],'legacy');a.syncMeta={notes:{[rk]:'2026-01-01T00:00:00Z'}};assert.equal(f.A.c.apiTest.mergeShared(a,b).notes[rk],undefined);a.notes[rk]='local';a.syncMeta={};assert.equal(f.A.c.apiTest.mergeShared(a,b).notes[rk],'local');});

test('simultaneous edits of the same memo converge to newer edit',async()=>{const f=fixture();f.A.edit('notes',rk,'older');const g=f.gate('A','/sync/push'),job=f.A.sync();await g.entered;f.B.edit('notes',rk,'newer');await f.B.sync();g.release();await job;await f.converge();assert.equal(f.server.state.notes[rk],'newer');});
test('pending replacement survives incoming old remote photo',async()=>{const f=fixture();const old={remoteId:'abcdefghijklmnopqrstuv',remoteUrl:'https://mock.invalid/old.jpg'};f.B.edit('memoPhotos',rk,old);await f.B.sync();f.server.photoFail=true;f.A.edit('memoPhotos',rk,{dataUrl:'data:image/jpeg;base64,/9j/',width:1,height:1});await f.A.sync();assert.ok(f.A.c.local.memoPhotos[rk].dataUrl);assert.equal(f.A.c.local.memoPhotos[rk].remoteId,undefined);f.server.photoFail=false;await f.converge();assert.equal(f.server.state.memoPhotos[rk].remoteUrl,'https://mock.invalid/photo.jpg');});

test('memo editor saves text locally without waiting for photo upload',async()=>{
 const app=fs.readFileSync('v11-preview/app.js','utf8');
 const start=app.indexOf('function editMemo(){'),end=app.indexOf('\nfunction ',start+1);
 const nodes={'#save-memo':{},'#day-memo':{value:'local text'},'#memo-position':{value:'bottom'},'#memo-photo-preview':{},'#memo-photo-add':{},'#memo-photo-input':{}};
 let saved=false;
 const c={local:{notes:{},notePositions:{},memoPhotos:{}},route:()=>[],routeKey:()=>rk,memoPhoto:()=>({dataUrl:'data:image/jpeg;base64,/9j/'}),hasRouteMemo:()=>false,date:'2027-01-12',dateLabel:x=>x,esc:x=>x,openSheet(){},closeSheet(){},render(){},toast(){},notePlacementOptions:()=>'',memoPhotoSrc:p=>p.dataUrl,$:k=>nodes[k],window:{familyMemoPhotoUpload:()=>{throw Error('editor must not await upload')}},save(){saved=true;return true;}};
 vm.createContext(c);vm.runInContext(app.slice(start,end)+';editMemo();',c);
 await nodes['#save-memo'].onclick();assert.equal(saved,true);assert.equal(c.local.notes[rk],'local text');assert.ok(c.local.memoPhotos[rk].dataUrl);
});
