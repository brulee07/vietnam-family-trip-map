const MAX_STATE_BYTES = 350_000;
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
function validState(state){if(!state||typeof state!=='object'||Array.isArray(state))return false;const raw=JSON.stringify(state);return textBytes(raw)<=MAX_STATE_BYTES;}
async function readBody(req){try{return await req.json();}catch{return null;}}
async function room(env,code){return env.DB.prepare('SELECT code, token_hash, state_json, revision, created_at, updated_at FROM rooms WHERE code=?').bind(code).first();}
async function auth(env,code,token){if(!code||!token)return null;const r=await room(env,String(code).toUpperCase());if(!r)return null;const h=await sha256(token);return h===r.token_hash?r:null;}
export default {
  async fetch(req,env){
    if(req.method==='OPTIONS')return new Response(null,{status:204,headers:CORS});
    const url=new URL(req.url);
    if(req.method==='GET'&&url.pathname==='/health')return json({ok:true,service:'vietnam-family-trip-sync',version:'12.0'});
    if(req.method!=='POST')return json({error:'method_not_allowed'},405);
    const body=await readBody(req);if(!body)return json({error:'invalid_json'},400);
    try{
      if(url.pathname==='/sync/create'){
        if(!validState(body.state))return json({error:'invalid_or_too_large_state'},400);
        let code='';for(let i=0;i<8;i++){const c=randomCode();if(!(await room(env,c))){code=c;break;}}if(!code)return json({error:'code_generation_failed'},500);
        const token=randomToken(),hash=await sha256(token),now=new Date().toISOString(),state=JSON.stringify(body.state);
        await env.DB.prepare('INSERT INTO rooms(code,token_hash,state_json,revision,created_at,updated_at) VALUES(?,?,?,?,?,?)').bind(code,hash,state,1,now,now).run();
        return json({ok:true,code,token,revision:1,updatedAt:now});
      }
      if(url.pathname==='/sync/pull'){
        const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
        if(Number(body.revision||0)===Number(r.revision))return json({ok:true,notModified:true,revision:r.revision,updatedAt:r.updated_at});
        return json({ok:true,revision:r.revision,updatedAt:r.updated_at,state:JSON.parse(r.state_json)});
      }
      if(url.pathname==='/sync/push'){
        if(!validState(body.state))return json({error:'invalid_or_too_large_state'},400);
        const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
        const base=Number(body.baseRevision||0);if(base!==Number(r.revision))return json({error:'revision_conflict',revision:r.revision,updatedAt:r.updated_at,state:JSON.parse(r.state_json)},409);
        const now=new Date().toISOString(),next=base+1,state=JSON.stringify(body.state);
        const result=await env.DB.prepare('UPDATE rooms SET state_json=?, revision=?, updated_at=? WHERE code=? AND token_hash=? AND revision=?').bind(state,next,now,r.code,r.token_hash,base).run();
        if(!result.meta?.changes){const latest=await room(env,r.code);return json({error:'revision_conflict',revision:latest?.revision||base,updatedAt:latest?.updated_at,state:latest?JSON.parse(latest.state_json):null},409);}
        return json({ok:true,revision:next,updatedAt:now});
      }
      if(url.pathname==='/sync/delete'){
        const r=await auth(env,body.code,body.token);if(!r)return json({error:'room_or_key_invalid'},403);
        await env.DB.prepare('DELETE FROM rooms WHERE code=? AND token_hash=?').bind(r.code,r.token_hash).run();return json({ok:true});
      }
      return json({error:'not_found'},404);
    }catch(e){return json({error:'server_error',detail:String(e?.message||e).slice(0,180)},500);}
  }
};
