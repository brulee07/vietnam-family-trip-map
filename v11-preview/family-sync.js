(()=>{
'use strict';
const CONFIG_KEY='familyTravelFamilySyncV12';
const SHARED_KEYS=['routes','notes','saved','custom','todayProgress','checklists'];
let baseSave=save, baseToolsView=toolsView, baseTodayView=todayView;
let syncApplying=false,syncBusy=false,syncPushTimer=null,syncPollTimer=null;
let syncShadow=null,syncDevices=[],devicesFetchedAt=0,deviceFetchBusy=false;
const MAX_FAMILY_DEVICES=9;
const DEVICE_NAME_MAX=20;
const clone=v=>JSON.parse(JSON.stringify(v));
const nowIso=()=>new Date().toISOString();
const endpointDefault=()=>String(window.TRAVEL_SYNC_CONFIG?.endpoint||'').trim().replace(/\/$/,'');
const makeId=()=>crypto.randomUUID?crypto.randomUUID():'dev-'+Date.now()+'-'+Math.random().toString(36).slice(2);
const cleanDeviceName=v=>String(v||'').trim().replace(/\s+/g,' ').slice(0,DEVICE_NAME_MAX)||'가족 휴대폰';
const nameKey=v=>cleanDeviceName(v).toLocaleLowerCase('ko-KR');
function loadConfig(){
  let v=null;try{v=JSON.parse(localStorage.getItem(CONFIG_KEY)||'null');}catch{}
  if(!v||typeof v!=='object')v={};
  return {enabled:!!v.enabled,endpoint:String(v.endpoint||endpointDefault()),roomCode:String(v.roomCode||''),token:String(v.token||''),revision:Number(v.revision||0),deviceId:String(v.deviceId||makeId()),deviceName:cleanDeviceName(v.deviceName||'가족 휴대폰'),lastSyncAt:v.lastSyncAt||null,lastError:v.lastError||null,dirty:!!v.dirty,deviceCount:Number(v.deviceCount||0),maxDevices:Number(v.maxDevices||MAX_FAMILY_DEVICES)};
}
let cfg=loadConfig();
function saveCfg(){try{localStorage.setItem(CONFIG_KEY,JSON.stringify(cfg));}catch{}}
function ensureMeta(){
  if(!local.syncMeta||typeof local.syncMeta!=='object'||Array.isArray(local.syncMeta))local.syncMeta={};
  for(const k of ['routes','notes','todayProgress','checklists'])if(!local.syncMeta[k]||typeof local.syncMeta[k]!=='object'||Array.isArray(local.syncMeta[k]))local.syncMeta[k]={};
  if(typeof local.syncMeta.saved!=='string')local.syncMeta.saved='';
  if(typeof local.syncMeta.custom!=='string')local.syncMeta.custom='';
}
function sharedState(src=local){ensureMeta();return {routes:clone(src.routes||{}),notes:clone(src.notes||{}),saved:clone(src.saved||[]),custom:clone(src.custom||[]),todayProgress:clone(src.todayProgress||{}),checklists:clone(src.checklists||{}),syncMeta:clone(src.syncMeta||{})};}
function stable(v){return JSON.stringify(v);}
function markObjectDiff(section,before={},after={}){
  const keys=new Set([...Object.keys(before||{}),...Object.keys(after||{})]);const stamp=nowIso();let changed=false;
  for(const k of keys)if(stable(before?.[k])!==stable(after?.[k])){local.syncMeta[section][k]=stamp;changed=true;}
  return changed;
}
function markDiff(before,after){
  ensureMeta();let changed=false;
  for(const s of ['routes','notes','todayProgress','checklists'])changed=markObjectDiff(s,before?.[s]||{},after?.[s]||{})||changed;
  const stamp=nowIso();
  if(stable(before?.saved||[])!==stable(after?.saved||[])){local.syncMeta.saved=stamp;changed=true;}
  if(stable(before?.custom||[])!==stable(after?.custom||[])){local.syncMeta.custom=stamp;changed=true;}
  return changed;
}
function hasCreds(){return !!(cfg.enabled&&cfg.endpoint&&cfg.roomCode&&cfg.token);}
function schedulePush(){if(!hasCreds()||syncApplying)return;cfg.dirty=true;saveCfg();clearTimeout(syncPushTimer);syncPushTimer=setTimeout(()=>syncNow('push'),900);}
ensureMeta();syncShadow=sharedState();
save=function(){
  const sharedChanged=!syncApplying&&markDiff(syncShadow,sharedState());
  const ok=baseSave();
  if(ok){syncShadow=sharedState();if(sharedChanged)schedulePush();}
  return ok;
};
function stamp(v){const n=Date.parse(v||'');return Number.isFinite(n)?n:0;}
function newer(lt,rt){return stamp(rt)>stamp(lt);}
function mergeMap(section,a,b,am,bm){
  const out={},meta={},keys=new Set([...Object.keys(a||{}),...Object.keys(b||{}),...Object.keys(am||{}),...Object.keys(bm||{})]);
  for(const k of keys){const useRemote=newer(am?.[k],bm?.[k]);const source=useRemote?b:a;if(Object.prototype.hasOwnProperty.call(source||{},k))out[k]=clone(source[k]);meta[k]=useRemote?(bm?.[k]||''):(am?.[k]||bm?.[k]||'');}
  return [out,meta];
}
function mergeShared(a,b){
  a=a||sharedState();b=b||{};const am=a.syncMeta||{},bm=b.syncMeta||{},out={syncMeta:{routes:{},notes:{},todayProgress:{},checklists:{},saved:'',custom:''}};
  for(const s of ['routes','notes','todayProgress','checklists']){const [data,meta]=mergeMap(s,a[s]||{},b[s]||{},am[s]||{},bm[s]||{});out[s]=data;out.syncMeta[s]=meta;}
  for(const s of ['saved','custom']){const useRemote=newer(am[s],bm[s]);out[s]=clone((useRemote?b[s]:a[s])||[]);out.syncMeta[s]=useRemote?(bm[s]||''):(am[s]||bm[s]||'');}
  return out;
}
function seedMeta(state){
  const s=clone(state),m=s.syncMeta||{routes:{},notes:{},todayProgress:{},checklists:{},saved:'',custom:''},t=nowIso();
  for(const sec of ['routes','notes','todayProgress','checklists']){m[sec]=m[sec]||{};for(const k of Object.keys(s[sec]||{}))if(!m[sec][k])m[sec][k]=t;}
  if(!m.saved)m.saved=t;if(!m.custom)m.custom=t;s.syncMeta=m;return s;
}
function validateRemoteState(state){
  if(!state||typeof state!=='object')throw Error('sync_data');
  const candidate={...local,...state,aiUndo:{},meta:local.meta||{}};
  validateBackup({version:11,data:candidate});
  return state;
}
function applyShared(state,{renderNow=true,clearUndo=true}={}){
  validateRemoteState(state);syncApplying=true;
  for(const k of SHARED_KEYS)local[k]=clone(state[k]??(Array.isArray(local[k])?[]:{}));
  local.syncMeta=clone(state.syncMeta||{});ensureMeta();if(clearUndo)local.aiUndo={};
  const ok=baseSave();syncApplying=false;syncShadow=sharedState();if(renderNow)render();return ok;
}
async function api(path,payload,timeout=15000){
  if(!cfg.endpoint)throw Object.assign(Error('sync_endpoint'),{kind:'endpoint'});
  const r=await fetch(cfg.endpoint.replace(/\/$/,'')+path,{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(timeout),body:JSON.stringify(payload)});
  let d={};try{d=await r.json();}catch{}
  if(!r.ok){const e=Error(d.error||'sync_http');e.status=r.status;e.data=d;throw e;}return d;
}
function roomPayload(){return {code:cfg.roomCode,token:cfg.token,deviceId:cfg.deviceId,deviceName:cfg.deviceName};}
function syncErrorText(e){if(e?.data?.error==='max_devices')return `가족 공유는 최대 ${e.data.maxDevices||MAX_FAMILY_DEVICES}대의 휴대폰까지 참여할 수 있습니다.`;if(e?.status===401||e?.status===403)return '공유방 인증정보가 맞지 않습니다.';if(e?.status===404)return '공유방을 찾지 못했습니다.';if(e?.status===409)return '가족의 최신 변경사항과 합치는 중 충돌이 발생했습니다.';if(e?.name==='TimeoutError')return '동기화 서버 응답이 늦습니다.';if(navigator.onLine===false)return '현재 오프라인입니다.';return '가족 동기화 서버에 연결하지 못했습니다.';}
function updateDeviceCounts(d){if(!d)return;cfg.deviceCount=Number(d.deviceCount??cfg.deviceCount??0);cfg.maxDevices=Number(d.maxDevices||cfg.maxDevices||MAX_FAMILY_DEVICES);saveCfg();}
async function pullRemote(){
  const d=await api('/sync/pull',{...roomPayload(),revision:cfg.revision});updateDeviceCounts(d);if(d.notModified)return null;validateRemoteState(d.state);cfg.revision=Number(d.revision||0);saveCfg();return d;
}
async function pushState(state,baseRevision=cfg.revision){
  let current=clone(state),base=Number(baseRevision||0),last=null;
  for(let attempt=0;attempt<4;attempt++){
    try{const d=await api('/sync/push',{...roomPayload(),baseRevision:base,state:current});updateDeviceCounts(d);return d;}
    catch(e){last=e;if(!(e.status===409&&e.data?.state))throw e;validateRemoteState(e.data.state);current=mergeShared(current,e.data.state);applyShared(current,{renderNow:false});base=Number(e.data.revision||base);updateDeviceCounts(e.data);await new Promise(r=>setTimeout(r,120+Math.floor(Math.random()*240)));}
  }
  throw last||Error('sync_conflict');
}
async function syncNow(mode='manual'){
  if(!hasCreds()||syncBusy||navigator.onLine===false)return false;syncBusy=true;cfg.lastError=null;saveCfg();renderSyncBits();let remoteChanged=false;
  try{
    const remote=await pullRemote();if(remote?.state){const merged=mergeShared(sharedState(),remote.state);if(stable(merged)!==stable(sharedState())){applyShared(merged,{renderNow:false});remoteChanged=true;}}
    if(cfg.dirty||mode==='push'){
      const d=await pushState(sharedState(),cfg.revision);cfg.revision=Number(d.revision||cfg.revision);cfg.dirty=false;
    }
    cfg.lastSyncAt=nowIso();cfg.lastError=null;saveCfg();if(tab==='tools'&&(Date.now()-devicesFetchedAt>15000))refreshDevices(true);if(remoteChanged||tab==='tools'||tab==='today')render();return true;
  }catch(e){cfg.lastError=syncErrorText(e);saveCfg();if(mode==='manual')toast(cfg.lastError);renderSyncBits();return false;}
  finally{syncBusy=false;renderSyncBits();}
}
function previewStats(state){return {days:Object.keys(state.routes||{}).length,notes:Object.keys(state.notes||{}).length,saved:(state.saved||[]).length,custom:(state.custom||[]).length,today:Object.keys(state.todayProgress||{}).length,checks:Object.keys(state.checklists||{}).length};}
function statsHtml(s){return `<div class="sync-preview"><span><small>편집 일정</small><b>${s.days}일</b></span><span><small>메모</small><b>${s.notes}개</b></span><span><small>저장 장소</small><b>${s.saved}곳</b></span><span><small>추가 장소</small><b>${s.custom}곳</b></span><span><small>Today 진행</small><b>${s.today}일</b></span><span><small>체크리스트</small><b>${s.checks}일</b></span></div>`;}
function normalizeEndpoint(v){v=String(v||'').trim().replace(/\/$/,'');if(!v)return '';const u=new URL(v);if(u.protocol!=='https:')throw Error();return v;}
function endpointReady(){if(cfg.endpoint)return true;openSyncServerSheet();return false;}
function openSyncServerSheet(){openSheet('가족 동기화 서버',`<p>가족 공유용 Cloudflare Sync Worker 주소를 입력하세요.</p><label class="field"><span>Sync Worker 주소</span><input id="sync-endpoint" inputmode="url" value="${esc(cfg.endpoint||endpointDefault())}" placeholder="https://...workers.dev"></label><label class="field"><span>이 기기 이름</span><input id="sync-device-name" maxlength="${DEVICE_NAME_MAX}" value="${esc(cfg.deviceName)}"></label><p class="notice">AI Worker와 별도의 주소입니다. 가족 일정 데이터만 저장합니다.</p>`,`<button class="btn" id="sync-server-cancel">취소</button><button class="btn primary" id="sync-server-save">저장</button>`);$('#sync-server-cancel').onclick=closeSheet;$('#sync-server-save').onclick=()=>{try{cfg.endpoint=normalizeEndpoint($('#sync-endpoint').value);cfg.deviceName=cleanDeviceName($('#sync-device-name').value);saveCfg();closeSheet();render();toast('동기화 서버 설정을 저장했습니다.');if(hasCreds())syncNow('manual').then(()=>refreshDevices(true));}catch{toast('https:// Worker 주소를 확인해 주세요.');}};}
async function createRoom(){
  if(!endpointReady())return;const ok=confirm('현재 이 기기의 일정으로 새 가족 공유방을 만들까요?');if(!ok)return;
  syncBusy=true;renderSyncBits();try{
    const initial=seedMeta(sharedState());applyShared(initial,{renderNow:false,clearUndo:false});
    const d=await api('/sync/create',{state:initial,deviceId:cfg.deviceId,deviceName:cfg.deviceName},20000);
    cfg.enabled=true;cfg.roomCode=String(d.code||'');cfg.token=String(d.token||'');cfg.revision=Number(d.revision||1);cfg.dirty=false;cfg.lastSyncAt=nowIso();cfg.lastError=null;updateDeviceCounts(d);saveCfg();startPolling();render();refreshDevices(true);openInviteSheet();
  }catch(e){cfg.lastError=syncErrorText(e);saveCfg();toast(cfg.lastError);}finally{syncBusy=false;renderSyncBits();}
}
function inviteUrl(){const u=new URL(location.href);u.search='';u.hash='family='+encodeURIComponent(cfg.roomCode)+'&key='+encodeURIComponent(cfg.token);return u.toString();}
async function copyInvite(){try{await navigator.clipboard.writeText(inviteUrl());toast('가족 초대 링크를 복사했습니다.');}catch{openInviteSheet();}}
function openInviteSheet(){openSheet('가족 초대 링크',`<p>가족 휴대폰에서 아래 링크를 열면 같은 여행 일정에 참여할 수 있습니다.</p><label class="field"><span>공유방 코드</span><input readonly value="${esc(cfg.roomCode)}" class="sync-code"></label><label class="field"><span>초대 링크</span><textarea id="sync-invite" readonly>${esc(inviteUrl())}</textarea></label><p class="notice">초대 링크에는 공유방 접근키가 포함되어 있으므로 가족에게만 전달해 주세요.</p>`,`<button class="btn" id="sync-invite-close">닫기</button><button class="btn primary" id="sync-invite-copy">링크 복사</button>`);$('#sync-invite-close').onclick=closeSheet;$('#sync-invite-copy').onclick=async()=>{try{await navigator.clipboard.writeText($('#sync-invite').value);toast('초대 링크를 복사했습니다.');}catch{toast('링크를 길게 눌러 복사해 주세요.');}};}
function openJoinSheet(prefill={}){if(!endpointReady())return;openSheet('가족 공유 참여',`<p>가족에게 받은 공유방 코드와 공유키를 입력하세요.</p><label class="field"><span>공유방 코드</span><input id="sync-code" maxlength="8" autocomplete="off" value="${esc(prefill.code||'')}"></label><label class="field"><span>공유키</span><input id="sync-token" autocomplete="off" value="${esc(prefill.token||'')}"></label><label class="field"><span>이 기기 이름</span><input id="sync-join-device" maxlength="${DEVICE_NAME_MAX}" value="${esc(cfg.deviceName)}"></label>`,`<button class="btn" id="sync-join-cancel">취소</button><button class="btn primary" id="sync-join-check">가족 일정 확인</button>`);$('#sync-join-cancel').onclick=closeSheet;$('#sync-join-check').onclick=()=>previewJoin($('#sync-code').value,$('#sync-token').value,$('#sync-join-device').value);}
async function previewJoin(code,token,deviceName){
  code=String(code||'').trim().toUpperCase();token=String(token||'').trim();if(!code||!token){toast('공유방 코드와 공유키를 입력해 주세요.');return;}
  const old={roomCode:cfg.roomCode,token:cfg.token,revision:cfg.revision};cfg.roomCode=code;cfg.token=token;cfg.revision=0;
  try{cfg.deviceName=cleanDeviceName(deviceName||cfg.deviceName);const d=await api('/sync/pull',{...roomPayload(),code,token,revision:0,preview:true},15000);validateRemoteState(d.state);updateDeviceCounts(d);const s=previewStats(d.state),localStats=previewStats(sharedState());openSheet('가족 일정 연결 확인',`<p><b>${esc(code)}</b> 공유방의 일정입니다.</p>${statsHtml(s)}<p class="notice">현재 이 기기: 편집 일정 ${localStats.days}일 · 메모 ${localStats.notes}개 · 저장 장소 ${localStats.saved}곳<br><b>가족 일정으로 맞추기</b>는 이 기기의 공유 대상 데이터를 교체합니다. <b>병합</b>은 양쪽의 최신 변경을 항목별로 합칩니다.</p>`,`<button class="btn" id="sync-join-back">뒤로</button><button class="btn" id="sync-join-merge">병합</button><button class="btn primary" id="sync-join-replace">가족 일정으로 맞추기</button>`);$('#sync-join-back').onclick=()=>openJoinSheet({code,token});$('#sync-join-replace').onclick=()=>finishJoin(d,'replace');$('#sync-join-merge').onclick=()=>finishJoin(d,'merge');}
  catch(e){cfg.roomCode=old.roomCode;cfg.token=old.token;cfg.revision=old.revision;toast(syncErrorText(e));}
}
function finishJoin(d,mode){const state=mode==='merge'?mergeShared(sharedState(),d.state):d.state;applyShared(state);cfg.enabled=true;cfg.revision=Number(d.revision||0);cfg.dirty=mode==='merge';cfg.lastSyncAt=nowIso();cfg.lastError=null;updateDeviceCounts(d);saveCfg();closeSheet();history.replaceState(null,'',location.pathname+location.search);startPolling();render();toast('가족 공유방에 연결했습니다.');syncNow(cfg.dirty?'push':'manual').then(()=>refreshDevices(true));}
async function disconnect(skipConfirm=false){if(!skipConfirm&&!confirm('이 기기만 가족 동기화에서 연결 해제할까요? 기기에 저장된 일정은 그대로 남습니다.'))return;if(hasCreds()){try{await api('/sync/device/leave',roomPayload(),8000);}catch{}}cfg={...cfg,enabled:false,roomCode:'',token:'',revision:0,dirty:false,lastError:null,lastSyncAt:null,deviceCount:0};syncDevices=[];devicesFetchedAt=0;saveCfg();clearInterval(syncPollTimer);render();toast('이 기기의 가족 동기화를 해제했습니다.');}
async function deleteRoom(){if(!hasCreds())return;if(!confirm('가족 공유방을 서버에서 삭제할까요? 다른 가족 기기도 더 이상 동기화할 수 없습니다.'))return;try{await api('/sync/delete',roomPayload());await disconnect(true);}catch(e){toast(syncErrorText(e));}}
function fmt(v){if(!v)return '아직 없음';try{return new Date(v).toLocaleString('ko-KR',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return String(v);}}
function relativeTime(v){const n=Date.parse(v||'');if(!Number.isFinite(n))return '기록 없음';const sec=Math.max(0,Math.floor((Date.now()-n)/1000));if(sec<45)return '방금';if(sec<90)return '1분 전';if(sec<3600)return `${Math.floor(sec/60)}분 전`;if(sec<86400)return `${Math.floor(sec/3600)}시간 전`;return `${Math.floor(sec/86400)}일 전`;}
function deviceStatus(v){const n=Date.parse(v||'');const age=Number.isFinite(n)?Date.now()-n:1e12;if(age<=45000)return ['online','온라인'];if(age<=300000)return ['recent','최근 연결'];return ['offline','오프라인'];}
async function refreshDevices(silent=false){if(!hasCreds()||deviceFetchBusy)return;deviceFetchBusy=true;try{const d=await api('/sync/devices',roomPayload(),10000);syncDevices=Array.isArray(d.devices)?d.devices:[];devicesFetchedAt=Date.now();updateDeviceCounts(d);if(tab==='tools')renderSyncPanel();}catch(e){if(!silent)toast(syncErrorText(e));}finally{deviceFetchBusy=false;}}
async function removeDevice(id,name){if(!hasCreds()||id===cfg.deviceId)return;if(!confirm(`${name||'이 기기'}를 참여 기기 목록에서 제거할까요? 앱이 계속 열려 있으면 다시 연결될 수 있습니다.`))return;try{const d=await api('/sync/device/remove',{...roomPayload(),targetDeviceId:id});updateDeviceCounts(d);await refreshDevices(true);toast('기기 목록에서 제거했습니다.');}catch(e){toast(syncErrorText(e));}}
function duplicateNameCount(name,excludeId=cfg.deviceId){const key=nameKey(name);return syncDevices.filter(d=>d.device_id!==excludeId&&nameKey(d.device_name)===key).length;}
function duplicateNames(){const counts=new Map();for(const d of syncDevices){const k=nameKey(d.device_name);counts.set(k,(counts.get(k)||0)+1);}return counts;}
function openRenameDeviceSheet(){
  if(!hasCreds())return;
  const content=`<p>가족 9대가 함께 사용할 때 서로 구분하기 쉬운 이름을 정해 주세요.</p><label class="field"><span>이 기기 이름</span><input id="sync-rename-device" maxlength="${DEVICE_NAME_MAX}" value="${esc(cfg.deviceName)}" autocomplete="off"></label><p class="sync-name-help" id="sync-name-help">최대 ${DEVICE_NAME_MAX}자 · 예: 아빠, 엄마, 할머니, 민준 iPhone</p>`;
  openSheet('이 기기 이름 변경',content,`<button class="btn" id="sync-rename-cancel">취소</button><button class="btn primary" id="sync-rename-save">이름 저장</button>`);
  const input=$('#sync-rename-device'),help=$('#sync-name-help');
  const check=()=>{const raw=String(input.value||'').trim();if(!raw){help.textContent='기기 이름을 입력해 주세요.';help.className='sync-name-help error';return;}const dup=duplicateNameCount(raw);help.textContent=dup?`같은 이름의 다른 기기가 ${dup}대 있습니다. 구분되는 이름을 권장합니다.`:`최대 ${DEVICE_NAME_MAX}자 · 현재 중복 이름 없음`;help.className='sync-name-help'+(dup?' warn':' ok');};
  input.addEventListener('input',check);check();
  $('#sync-rename-cancel').onclick=closeSheet;
  $('#sync-rename-save').onclick=async()=>{const raw=String(input.value||'').trim();if(!raw){toast('기기 이름을 입력해 주세요.');return;}const name=cleanDeviceName(raw);const dup=duplicateNameCount(name);if(dup&&!confirm(`가족 공유방에 같은 이름의 기기가 ${dup}대 있습니다. 그래도 “${name}” 이름을 사용할까요?`))return;cfg.deviceName=name;saveCfg();closeSheet();render();toast('기기 이름을 저장했습니다.');await syncNow('manual');await refreshDevices(true);};
}
function devicesHtml(){
  if(!hasCreds())return '';
  if(!syncDevices.length)return `<div class="sync-devices"><div class="sync-devices-title"><b>참여 기기</b><span>${cfg.deviceCount||1}/${cfg.maxDevices||MAX_FAMILY_DEVICES}</span></div><p class="family-sync-note">기기 목록을 불러오는 중입니다.</p></div>`;
  const counts=duplicateNames();
  const rows=[...syncDevices].sort((a,b)=>(a.device_id===cfg.deviceId?-1:b.device_id===cfg.deviceId?1:Date.parse(b.last_seen_at||0)-Date.parse(a.last_seen_at||0))).map(d=>{
    const st=deviceStatus(d.last_seen_at),me=d.device_id===cfg.deviceId,dup=(counts.get(nameKey(d.device_name))||0)>1;
    const badge=`${me?' <em>이 기기</em>':''}${dup?' <em class="duplicate">중복 이름</em>':''}`;
    const action=me?`<button class="device-rename-inline" data-rename="1">이름 변경</button>`:(!me&&st[0]==='offline'?`<button class="device-remove" data-device="${esc(d.device_id)}" data-name="${esc(d.device_name||'가족 휴대폰')}">제거</button>`:'');
    return `<div class="sync-device-row"><span class="device-dot ${st[0]}"></span><div><b>${esc(d.device_name||'가족 휴대폰')}${badge}</b><small>${st[1]} · ${esc(relativeTime(d.last_seen_at))}${d.last_sync_at?' · 동기화 '+esc(relativeTime(d.last_sync_at)):''}</small></div>${action}</div>`;
  }).join('');
  return `<div class="sync-devices"><div class="sync-devices-title"><b>참여 기기</b><span>${cfg.deviceCount||syncDevices.length}/${cfg.maxDevices||MAX_FAMILY_DEVICES}</span></div>${rows}<button class="sync-device-refresh" id="sync-device-refresh">기기 목록 새로고침</button></div>`;
}
function renderSyncPanel(){
  const anchor=document.querySelector('.stability-card');if(!anchor)return;document.querySelector('.family-sync-card')?.remove();
  const connected=hasCreds(),status=syncBusy?['busy','동기화 중']:cfg.lastError?['error','확인 필요']:connected?['connected','공유 중']:['','꺼짐'];
  const count=cfg.deviceCount||syncDevices.length||(connected?1:0),max=cfg.maxDevices||MAX_FAMILY_DEVICES;
  const dupCount=connected?duplicateNameCount(cfg.deviceName):0;
  const html=`<section class="family-sync-card"><div class="family-sync-head"><div><span class="eyebrow">가족 공유</span><b>가족 일정 동기화</b><small>${connected?`최대 ${max}대의 휴대폰이 같은 일정·메모·체크리스트를 함께 사용합니다.`:'공유방을 만들거나 가족 초대 링크로 참여할 수 있습니다.'}</small></div><span class="sync-status ${status[0]}">${status[1]}</span></div>${connected?`<div class="family-sync-room"><span><small>공유방</small><b class="sync-code">${esc(cfg.roomCode)}</b></span><span><small>참여 기기</small><b>${count}/${max}대</b></span><span class="sync-device-name-cell"><small>이 기기</small><b>${esc(cfg.deviceName)}</b><button id="sync-rename" class="sync-rename-mini">이름 변경</button></span><span><small>마지막 동기화</small><b>${esc(fmt(cfg.lastSyncAt))}</b></span></div>${dupCount?`<p class="sync-name-warning">같은 이름의 기기가 ${dupCount+1}대 있습니다. 여행 전에 각 휴대폰 이름을 구분해 주세요.</p>`:''}${cfg.lastError?`<p class="family-sync-note">${esc(cfg.lastError)}</p>`:''}<div class="family-sync-actions"><button class="btn primary" id="sync-now">지금 동기화</button><button class="btn" id="sync-copy" ${count>=max?'disabled':''}>${count>=max?'9대 참여 중':'초대 링크 복사'}</button><button class="btn" id="sync-disconnect">이 기기 연결 해제</button></div>${devicesHtml()}`:`<div class="family-sync-actions"><button class="btn primary" id="sync-create">가족 공유 시작</button><button class="btn" id="sync-join">가족 공유 참여</button></div>`}<details class="sync-advanced"><summary>동기화 설정</summary><p class="family-sync-note">서버: ${esc(cfg.endpoint||'설정 안 됨')}<br>기기 이름: ${esc(cfg.deviceName)}</p><div class="family-sync-actions"><button class="btn" id="sync-server">서버·기기 설정</button>${connected?'<button class="btn danger" id="sync-delete-room">공유방 삭제</button>':''}</div></details><p class="family-sync-note">공유 대상: 일정 순서 · 하루 메모 · 저장/추가 장소 · Today 진행 · 체크리스트<br>AI 대화와 AI 복원 기록, 백업 기록, 기기별 설정은 공유하지 않습니다.</p></section>`;
  anchor.insertAdjacentHTML('afterend',html);
  if($('#sync-create'))$('#sync-create').onclick=createRoom;if($('#sync-rename'))$('#sync-rename').onclick=openRenameDeviceSheet;if($('#sync-join'))$('#sync-join').onclick=()=>openJoinSheet();if($('#sync-now'))$('#sync-now').onclick=()=>syncNow('manual').then(()=>refreshDevices(true));if($('#sync-copy'))$('#sync-copy').onclick=copyInvite;if($('#sync-disconnect'))$('#sync-disconnect').onclick=disconnect;if($('#sync-server'))$('#sync-server').onclick=openSyncServerSheet;if($('#sync-delete-room'))$('#sync-delete-room').onclick=deleteRoom;if($('#sync-device-refresh'))$('#sync-device-refresh').onclick=()=>refreshDevices(false);document.querySelectorAll('.device-remove').forEach(b=>b.onclick=()=>removeDevice(b.dataset.device,b.dataset.name));document.querySelectorAll('.device-rename-inline').forEach(b=>b.onclick=openRenameDeviceSheet);
  if(connected&&Date.now()-devicesFetchedAt>30000&&!deviceFetchBusy)setTimeout(()=>refreshDevices(true),0);
}
function renderSyncBits(){if(tab==='tools')renderSyncPanel();const s=document.querySelector('.family-sync-mini span');if(s)s.textContent=syncBusy?'가족 일정 동기화 중…':cfg.lastError?'가족 동기화 확인 필요':hasCreds()?`가족 ${cfg.deviceCount||1}/${cfg.maxDevices||MAX_FAMILY_DEVICES} · ${fmt(cfg.lastSyncAt)}`:'가족 동기화 꺼짐';}
toolsView=function(){baseToolsView();renderSyncPanel();};
todayView=function(){baseTodayView();if(!hasCreds())return;const heading=document.querySelector('.today-picker');if(heading&&!document.querySelector('.family-sync-mini'))heading.insertAdjacentHTML('afterend',`<div class="family-sync-mini"><span>${syncBusy?'가족 일정 동기화 중…':cfg.lastError?'가족 동기화 확인 필요':`가족 ${cfg.deviceCount||1}/${cfg.maxDevices||MAX_FAMILY_DEVICES} · ${esc(fmt(cfg.lastSyncAt))}`}</span><button id="sync-mini-open">설정</button></div>`);if($('#sync-mini-open'))$('#sync-mini-open').onclick=()=>go('tools');};
function startPolling(){clearInterval(syncPollTimer);if(!hasCreds())return;syncPollTimer=setInterval(()=>{if(document.visibilityState==='visible')syncNow('poll');},15000);}
function parseInvite(){const h=new URLSearchParams(location.hash.replace(/^#/,''));const code=h.get('family'),token=h.get('key');return code&&token?{code,token}:null;}
async function waitForApp(){for(let i=0;i<80&&!db;i++)await new Promise(r=>setTimeout(r,100));if(!db)return;startPolling();window.addEventListener('focus',()=>{if(hasCreds())syncNow('poll');});window.addEventListener('online',()=>{if(hasCreds())syncNow('poll');});document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&hasCreds())syncNow('poll');});const invite=parseInvite();if(invite)setTimeout(()=>openJoinSheet(invite),250);else if(hasCreds())setTimeout(()=>syncNow('poll').then(()=>refreshDevices(true)),500);}
waitForApp();
})();
