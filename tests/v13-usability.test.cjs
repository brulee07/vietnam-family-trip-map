'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const db=Object.fromEntries(['trip','cities','places','itineraries','safety'].map(n=>[n,JSON.parse(fs.readFileSync(`data/${n}.json`,'utf8'))]));
const clone=x=>JSON.parse(JSON.stringify(x));
const blank=()=>({routes:{},notes:{},saved:[],custom:[],memoCards:{},todayProgress:{},checklists:{},aiUndo:{},meta:{}});
const retired=['quy_nhon:gold','tuy_hoa:giatuituyhoa','tuy_hoa:giatsayphuyen','nha_trang:laundry2h','nha_trang:washgo'];
function client({state=blank(),remote=blank(),config={},hash='',storage=new Map(),max=false,fail=false}={}){
 const nodes={},calls=[],timers=[],screens=[];let html='';
 storage.set('familyTravelV11',JSON.stringify(state));
 if(!storage.has('familyTravelFamilySyncV12'))storage.set('familyTravelFamilySyncV12',JSON.stringify(config));
 const c={fixtureDb:clone(db),window:{TRAVEL_SYNC_CONFIG:{endpoint:'https://mock.invalid'},addEventListener(){}},crypto:require('node:crypto').webcrypto,Date,AbortSignal,URL,URLSearchParams,console,navigator:{onLine:true,clipboard:{writeText:async s=>{c.copied=s;}}},location:{href:'https://preview.invalid/',hash,pathname:'/',search:''},history:{replaceState(){c.location.hash='';}},document:{visibilityState:'visible',addEventListener(){},querySelector:s=>nodes[s]||null,querySelectorAll:()=>[],body:{dataset:{}}},setTimeout:f=>(timers.push(f),timers.length),clearTimeout(){},setInterval:()=>1,clearInterval(){},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}};
 c.fetch=async(url,options)=>{const p=JSON.parse(options.body);calls.push({path:new URL(url).pathname,p});if(fail)throw Error('offline');if(max)return {ok:false,status:403,json:async()=>({error:'max_devices',maxDevices:9})};return {ok:true,status:200,json:async()=>({state:clone(remote),revision:2,deviceCount:2,maxDevices:9,devices:[]})};};
 c.sheet=(title,body,footer)=>{html=title+body+footer;screens.push(html);for(const k of Object.keys(nodes))delete nodes[k];for(const match of html.matchAll(/id="([^"]+)"/g))nodes['#'+match[1]]={value:'',disabled:false};};
 vm.createContext(c);
 vm.runInContext(fs.readFileSync('memo-cards.js','utf8'),c);
 vm.runInContext(fs.readFileSync('app.js','utf8').replace(/\ninit\(\);\s*$/,''),c);
 vm.runInContext(`db=fixtureDb;render=()=>{};toast=s=>globalThis.message=s;openSheet=sheet;closeSheet=()=>{};globalThis.appTest={state:()=>local,clean:cleanRetiredPlaces,validate:validateBackup,route,backup:backupPackage};`,c);
 vm.runInContext(fs.readFileSync('family-sync.js','utf8').replace('waitForApp();','globalThis.syncTest={parseInvite,pendingInvite,openJoinSheet,previewJoin,commitJoin,waitForApp,copyInvite,openInviteSheet,sharedState,get cfg(){return cfg;}};'),c);
 return {c,nodes,calls,storage,timers,screens,html:()=>html};
}
test('exactly 100 non-laundry places and all itinerary references resolve',()=>{
 assert.equal(db.places.length,100);assert.equal(db.places.filter(p=>p.cat==='세탁').length,0);
 const keys=new Set(db.places.map(p=>p.city+':'+p.id));for(const k of retired)assert.ok(!keys.has(k));
 for(const i of db.itineraries)for(const id of i.placeIds)assert.ok(keys.has(i.city+':'+id),i.city+':'+id);
});
test('old local routes, saved, Today and AI undo retire only five IDs and preserve memo gap',()=>{
 const s=blank(),rk='nha_trang:2027-01-23';s.routes[rk]=['nha_trang:costa',retired[3],'nha_trang:ponagar'];s.saved=[retired[3],'nha_trang:costa'];s.todayProgress[rk]={done:[retired[3],'nha_trang:costa']};s.aiUndo[rk]={before:s.routes[rk],after:s.routes[rk]};s.memoCards.m={id:'m',routeKey:rk,text:'keep',position:2,order:0,photo:null,deleted:false,updatedAt:'2026-09-18T00:00:00Z'};
 const f=client({state:s}),out=f.c.appTest.state();assert.deepEqual(clone(out.routes[rk]),['nha_trang:costa','nha_trang:ponagar']);assert.equal(out.memoCards.m.position,1);assert.equal(out.memoCards.m.text,'keep');assert.deepEqual(clone(out.todayProgress[rk].done),['nha_trang:costa']);assert.equal(out.saved.length,1);assert.equal(out.aiUndo[rk].before.length,2);
 f.c.appTest.clean(out);assert.equal(out.memoCards.m.position,1);
 const checked=f.c.appTest.validate({version:11,data:clone(s)});assert.equal(checked.data.routes[rk].length,2);
});
test('invite is captured without exposing credentials in join UI; one click joins',async()=>{
 const remote=blank();remote.routes['da_nang:2027-01-12']=['da_nang:hotel'];const f=client({remote,hash:'#family=TEST&key=test-only'});const id=f.c.syncTest.cfg.deviceId;
 assert.equal(f.c.location.hash,'');assert.ok(f.storage.has('familyTravelPendingInviteV13'));
 f.c.syncTest.openJoinSheet(f.c.syncTest.pendingInvite);assert.match(f.html(),/가족 여행에 참여하시겠습니까/);assert.ok(!f.nodes['#sync-code']);assert.ok(!f.nodes['#sync-token']);assert.ok(!f.html().includes('test-only'));
 f.nodes['#sync-join-device'].value='엄마';await f.nodes['#sync-join-check'].onclick();
 assert.equal(f.c.syncTest.cfg.enabled,true);assert.equal(f.c.syncTest.cfg.deviceName,'엄마');assert.equal(f.c.syncTest.cfg.deviceId,id);assert.ok(!f.storage.has('familyTravelPendingInviteV13'));assert.equal(f.calls.filter(x=>x.path==='/sync/pull'&&!x.p.preview).length,1);assert.equal(f.c.appTest.state().routes['da_nang:2027-01-12'][0],'da_nang:hotel');
 await f.c.syncTest.copyInvite();assert.match(f.c.copied,/#family=TEST&key=test-only$/);
});
test('existing device reload preserves identity and automatically connects without invite',async()=>{
 const config={enabled:true,endpoint:'https://mock.invalid',roomCode:'TEST',token:'test-only',deviceId:'stable-device'};const f=client({config});await f.c.syncTest.waitForApp();assert.equal(f.c.syncTest.cfg.deviceId,'stable-device');assert.equal(f.screens.length,0);assert.ok(f.timers.length>0);
 await f.timers.shift()();assert.equal(f.calls[0].p.deviceId,'stable-device');assert.equal(f.calls[0].p.code,'TEST');
});
test('conflicting local records require a choice and preserve pre-join backup',async()=>{
 const local=blank(),remote=blank();local.routes['da_nang:2027-01-12']=['da_nang:hotel'];remote.routes['da_nang:2027-01-12']=['da_nang:airport'];const f=client({state:local,remote});
 await f.c.syncTest.previewJoin('TEST','test-only','아빠');assert.match(f.html(),/이 기기의 기록도 있습니다/);assert.ok(!f.c.syncTest.cfg.enabled);assert.equal(f.calls.filter(x=>!x.p.preview).length,0);
 await f.nodes['#sync-join-replace'].onclick();const backup=JSON.parse(f.storage.get('familyTravelV11PreRestore'));assert.equal(backup.data.routes['da_nang:2027-01-12'][0],'da_nang:hotel');assert.equal(f.c.appTest.state().routes['da_nang:2027-01-12'][0],'da_nang:airport');
});
test('cancelled different-room invite leaves active credentials untouched',async()=>{
 const s=blank();s.saved=['da_nang:hotel'];const f=client({state:s,remote:s,config:{enabled:true,roomCode:'OLD',token:'old-test',deviceId:'stable'}});await f.c.syncTest.previewJoin('NEW','new-test','아빠');f.nodes['#sync-join-back'].onclick();assert.equal(f.c.syncTest.cfg.roomCode,'OLD');assert.equal(f.c.syncTest.cfg.token,'old-test');
});
test('nine-device refusal and network errors do not change connection or local data',async()=>{
 for(const options of [{max:true},{fail:true}]){const f=client(options);await f.c.syncTest.previewJoin('TEST','test-only','가족');assert.ok(!f.c.syncTest.cfg.enabled);assert.equal(f.c.syncTest.cfg.roomCode,'');assert.ok(f.c.message);}
});
test('manual recovery keeps password input and the same one-step join handler',async()=>{
 const f=client();f.c.syncTest.openJoinSheet();assert.match(f.html(),/type="password"/);f.nodes['#sync-code'].value='TEST';f.nodes['#sync-token'].value='test-only';f.nodes['#sync-join-device'].value='할머니';await f.nodes['#sync-join-check'].onclick();assert.ok(f.c.syncTest.cfg.enabled);
});
test('empty remote room retains local records automatically',async()=>{
 const state=blank();state.saved=['da_nang:hotel'];const f=client({state});await f.c.syncTest.previewJoin('TEST','test-only','가족');assert.ok(f.c.syncTest.cfg.enabled);assert.deepEqual(clone(f.c.appTest.state().saved),['da_nang:hotel']);assert.ok(f.storage.has('familyTravelV11PreRestore'));
});
test('pending invite survives reload without fragment and preserves pre-join device ID',()=>{
 const first=client({hash:'#family=TEST&key=test-only'}),second=client({storage:first.storage});
 assert.equal(second.c.syncTest.pendingInvite.code,'TEST');assert.equal(second.c.syncTest.cfg.deviceId,first.c.syncTest.cfg.deviceId);
});
test('unrelated invalid backup IDs are still rejected',()=>{
 const f=client(),s=blank();s.routes['da_nang:2027-01-12']=['da_nang:unknown'];assert.throws(()=>f.c.appTest.validate({version:11,data:s}));
});
test('actual Worker admits existing device at nine but rejects a tenth',async()=>{
 const c={TextEncoder,Date};vm.createContext(c);const source=fs.readFileSync('sync-worker/worker.js','utf8');vm.runInContext(source.slice(0,source.indexOf('export default'))+';globalThis.touch=touchDevice;',c);
 const env={DB:{prepare(sql){return {bind(...args){return {async first(){return sql.includes('COUNT')?{n:9}:args[1]==='existing'?{device_id:'existing'}:null;},async run(){if(sql.startsWith('INSERT'))throw Error('max_devices');return {};}};}};}}};
 assert.equal((await c.touch(env,'TEST',{deviceId:'existing'})).count,9);
 await assert.rejects(c.touch(env,'TEST',{deviceId:'new'},{preview:true}),e=>e.code==='max_devices');
 await assert.rejects(c.touch(env,'TEST',{deviceId:'new'}),e=>e.code==='max_devices');
});
