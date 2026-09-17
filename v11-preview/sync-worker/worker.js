const MAX_STATE_BYTES = 350_000;
const MAX_DEVICES = 9;
const MAX_PHOTO_BYTES = 260_000;
const PHOTO_BUCKET = 'memo-photos';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-store'
};

const ALPHABET='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{...CORS,'Content-Type':'application/json; charset=utf-8'}});
const textBytes=s=>new TextEncoder().encode(s).byteLength;
function randomCode(n=6){const b=new Uint8Array(n);crypto.getRandomValues(b);return Array.from(b,x=>ALPHABET[x%ALPHABET.length]).join('');}
function randomToken(){const b=new Uint8Array(24);crypto.getRandomValues(b);return btoa(String.fromCharCode(...b)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
async function sha256(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return Array.from(new Uint8Array(b),x=>x.toString(16).padStart(2,'0')).join('');}
function validState(state){return !!state&&typeof state==='object'&&!Array.isArray(state)&&textBytes(JSON.stringify(state))<=MAX_STATE_BYTES;}
async function readBody(req){try{return await req.json();}catch{return null;}}
async function room(env,code){return env.DB.prepare('SELECT code, token_hash, state_json, revision, created_at, updated_at FROM rooms WHERE code=?').bind(String(code||'').toUpperCase()).first();}
async function auth(env,code,token){if(!code||!token)return null;const r=await room(env,code);if(!r)return null;return (await sha256(token))===r.token_hash?r:null;}
async function deviceCount(env,code){const r=await env.DB.prepare('SELECT COUNT(*) AS n FROM devices WHERE room_code=?').bind(code).first();return Number(r?.n||0);}
async function touchDevice(env,code,body,{sync=true,preview=false}={}){const id=String(body?.deviceId||'').trim().slice(0,120);if(!id)return {count:await deviceCount(env,code)};const name=String(body?.deviceName||'가족 휴대폰').trim().slice(0,40)||'가족 휴대폰';const existing=await env.DB.prepare('SELECT device_id FROM devices WHERE room_code=? AND device_id=?').bind(code,id).first();if(preview&&!existing){const count=await deviceCount(env,code);if(count>=MAX_DEVICES){const e=new Error('max_devices');e.code='max_devices';throw e;}return {count};}const now=new Date().toISOString();if(existing){await env.DB.prepare('UPDATE devices SET device_name=?, last_seen_at=?, last_sync_at=CASE WHEN ?=1 THEN ? ELSE last_sync_at END WHERE room_code=? AND device_id=?').bind(name,now,sync?1:0,now,code,id).run();}else{try{await env.DB.prepare('INSERT INTO devices(room_code,device_id,device_name,joined_at,last_seen_at,last_sync_at) VALUES(?,?,?,?,?,?)').bind(code,id,name,now,now,sync?now:null).run();}catch(e){if(String(e?.message||e).includes('max_devices')){const x=new Error('max_devices');x.code='max_devices';throw x;}throw e;}}return {count:await deviceCount(env,code)};}
async function listDevices(env,code){const r=await env.DB.prepare('SELECT device_id,device_name,joined_at,last_seen_at,last_sync_at FROM devices WHERE room_code=? ORDER BY last_seen_at DESC').bind(code).all();return r.results||[];}
function b64url(bytes){return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function randomPhotoId(){const b=new Uint8Array(24);crypto.getRandomValues(b);return b64url(b);}
function parseJpegDataUrl(v){const m=/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(String(v||''));if(!m)return null;try{const bin=atob(m[1]);if(bin.length>MAX_PHOTO_BYTES)return null;const out=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)out[i]=bin.charCodeAt(i);return out;}catch{return null;}}
function photoObjectKey(code,id){return `rooms/${code}/memo/${id}.jpg`;}
function photoStorageReady(env){return !!(env.SUPABASE_URL&&env.SUPABASE_SECRET_KEY);}
function sbBase(env){return String(env.SUPABASE_URL||'').replace(/\/+$/,'');}
function sbHeaders(env,extra={}){return {'apikey':env.SUPABASE_SECRET_KEY,'Authorization':`Bearer ${env.SUPABASE_SECRET_KEY}`,...extra};}
function encodedKey(key){return key.split('/').map(encodeURIComponent).join('/');}
function publicPhotoUrl(env,key){return `${sbBase(env)}/storage/v1/object/public/${PHOTO_BUCKET}/${encodedKey(key)}`;}
async function supabaseUpload(env,key,bytes){const res=await fetch(`${sbBase(env)}/storage/v1/object/${PHOTO_BUCKET}/${encodedKey(key)}`,{method:'POST',headers:sbHeaders(env,{'Content-Type':'image/jpeg','x-upsert':'false','Cache-Control':'3600'}),body:bytes});if(!res.ok){const t=(await res.text()).slice(0,300);throw new Error(`supabase_upload_${res.status}:${t}`);}}
async function supabaseDelete(env,key){const res=await fetch(`${sbBase(env)}/storage/v1/object/${PHOTO_BUCKET}`,{method:'DELETE',headers:sbHeaders(env,{'Content-Type':'application/json'}),body:JSON.stringify({prefixes:[key]})});if(!res.ok){const t=(await res.text()).slice(0,300);throw new Error(`supabase_delete_${res.status}:${t}`);}}
async function deleteRoomPhotos(env,r){if(!photoStorageReady(env)||!r?.state_json)return;let state={};try{state=JSON.parse(r.state_json)||{};}catch{}const ids=new Set();for(const p of Object.values(state.memoPhotos||{})){const id=String(p?.remoteId||'');if(/^[A-Za-z0-9_-]{20,80}$/.test(id))ids.add(id);}for(const id of ids){try{await supabaseDelete(env,photoObjectKey(r.code,id));}catch{}}}

export default {async fetch(req,env){
  if(req.method==='OPTIONS')return new Response(null,{status:204,headers:CORS});
  const url=new URL(req.url);
  if(req.method==='GET'&&url.pathname==='/health')return json({ok:true,service:'vietnam-family-trip-sync',version:'12.8-supabase',maxDevices:MAX_DEVICES,photoSync:photoStorageReady(env),photoStorage:'supabase'});
  if(req.method!=='POST')return json({error:'method_not_allowed'},405);
  const body=await readBody(req);if(!body)return json({error:'invalid_json'},400);
  try{
    if(url.pathname==='/photo/upload'){
      if(!photoStorageReady(env))return json({error:'photo_storage_not_configured'},503);
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const bytes=parseJpegDataUrl(body.photo?.dataUrl);if(!bytes)return json({error:'invalid_or_too_large_photo'},400);
      const id=randomPhotoId(),key=photoObjectKey(r.code,id),now=new Date().toISOString();await supabaseUpload(env,key,bytes);
      return json({ok:true,remoteId:id,url:publicPhotoUrl(env,key),size:bytes.byteLength,width:Number(body.photo?.width)||0,height:Number(body.photo?.height)||0,updatedAt:now});
    }
    if(url.pathname==='/photo/delete'){
      if(!photoStorageReady(env))return json({error:'photo_storage_not_configured'},503);
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const id=String(body.remoteId||'');if(!/^[A-Za-z0-9_-]{20,80}$/.test(id))return json({error:'invalid_photo_id'},400);
      await supabaseDelete(env,photoObjectKey(r.code,id));return json({ok:true});
    }
    if(url.pathname==='/sync/create'){
      if(!validState(body.state))return json({error:'invalid_or_too_large_state'},400);
      let code='';for(let i=0;i<8;i++){const c=randomCode();if(!(await room(env,c))){code=c;break;}}if(!code)return json({error:'code_generation_failed'},500);
      const token=randomToken(),hash=await sha256(token),now=new Date().toISOString(),state=JSON.stringify(body.state);
      await env.DB.prepare('INSERT INTO rooms(code,token_hash,state_json,revision,created_at,updated_at) VALUES(?,?,?,?,?,?)').bind(code,hash,state,1,now,now).run();
      const presence=await touchDevice(env,code,body,{sync:true});return json({ok:true,code,token,revision:1,updatedAt:now,deviceCount:presence.count,maxDevices:MAX_DEVICES});
    }
    if(url.pathname==='/sync/pull'){
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const presence=await touchDevice(env,r.code,body,{sync:!body.preview,preview:!!body.preview});
      if(Number(body.revision||0)===Number(r.revision))return json({ok:true,notModified:true,revision:r.revision,updatedAt:r.updated_at,deviceCount:presence.count,maxDevices:MAX_DEVICES});
      return json({ok:true,revision:r.revision,updatedAt:r.updated_at,state:JSON.parse(r.state_json),deviceCount:presence.count,maxDevices:MAX_DEVICES});
    }
    if(url.pathname==='/sync/push'){
      if(!validState(body.state))return json({error:'invalid_or_too_large_state'},400);
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const presence=await touchDevice(env,r.code,body,{sync:true}),base=Number(body.baseRevision||0);
      if(base!==Number(r.revision))return json({error:'revision_conflict',revision:r.revision,updatedAt:r.updated_at,state:JSON.parse(r.state_json),deviceCount:presence.count,maxDevices:MAX_DEVICES},409);
      const now=new Date().toISOString(),next=base+1,state=JSON.stringify(body.state);
      const result=await env.DB.prepare('UPDATE rooms SET state_json=?, revision=?, updated_at=? WHERE code=? AND token_hash=? AND revision=?').bind(state,next,now,r.code,r.token_hash,base).run();
      if(!result.meta?.changes){const latest=await room(env,r.code);return json({error:'revision_conflict',revision:latest?.revision||base,updatedAt:latest?.updated_at,state:latest?JSON.parse(latest.state_json):null,deviceCount:presence.count,maxDevices:MAX_DEVICES},409);}
      return json({ok:true,revision:next,updatedAt:now,deviceCount:presence.count,maxDevices:MAX_DEVICES});
    }
    if(url.pathname==='/sync/devices'){
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const presence=await touchDevice(env,r.code,body,{sync:false});return json({ok:true,devices:await listDevices(env,r.code),deviceCount:presence.count,maxDevices:MAX_DEVICES});
    }
    if(url.pathname==='/sync/device/leave'){
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const id=String(body.deviceId||'').trim();if(id)await env.DB.prepare('DELETE FROM devices WHERE room_code=? AND device_id=?').bind(r.code,id).run();
      return json({ok:true,deviceCount:await deviceCount(env,r.code),maxDevices:MAX_DEVICES});
    }
    if(url.pathname==='/sync/device/remove'){
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      const id=String(body.targetDeviceId||'').trim();if(!id)return json({error:'device_id_required'},400);
      await env.DB.prepare('DELETE FROM devices WHERE room_code=? AND device_id=?').bind(r.code,id).run();return json({ok:true,deviceCount:await deviceCount(env,r.code),maxDevices:MAX_DEVICES});
    }
    if(url.pathname==='/sync/delete'){
      const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
      await env.DB.prepare('DELETE FROM devices WHERE room_code=?').bind(r.code).run();await deleteRoomPhotos(env,r);await env.DB.prepare('DELETE FROM rooms WHERE code=? AND token_hash=?').bind(r.code,r.token_hash).run();return json({ok:true});
    }
    return json({error:'not_found'},404);
  }catch(e){if(e?.code==='max_devices'||String(e?.message||e).includes('max_devices'))return json({error:'max_devices',maxDevices:MAX_DEVICES},409);return json({error:'server_error',detail:String(e?.message||e).slice(0,220)},500);}
}};
