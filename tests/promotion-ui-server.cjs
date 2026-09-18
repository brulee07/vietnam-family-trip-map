// Local-only migration fixture. It serves historical files from Git, then the
// working tree after the explicit UI switch. Never deploy this test server.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),prefix='/vietnam-family-trip-map/';
const git=process.env.TEST_GIT||'git',baseline='3eff0936a1d61932e24d7614713177e9e36a6fd7';
let legacy=true;
const fixture=`<!doctype html><html lang="ko"><meta charset="utf-8"><title>로컬 루트 전환 검증</title><h1>로컬 루트 전환 검증</h1><p>합성 데이터만 사용하는 localhost 검사입니다.</p>
<button id="seed">이전 버전 설치 및 합성 데이터 준비</button> <button id="promote">로컬 서버를 새 루트로 전환</button> <button id="inspect">상태 확인</button>
<p><a href="${prefix}index.html">새 루트 앱 열기</a> · <a href="${prefix}v11-preview/index.html#family=SYNTHETIC&key=test-only">이전 초대 주소 열기</a></p><pre id="out"></pre><script>
const out=document.getElementById('out');
async function active(r){if(r.active&&!r.installing)return;const w=r.installing||r.waiting;if(!w)return;await new Promise(resolve=>{if(w.state==='activated')resolve();else w.addEventListener('statechange',()=>{if(w.state==='activated')resolve();});});}
document.getElementById('seed').onclick=async()=>{
const state={routes:{'da_nang:2027-01-12':['da_nang:hotel']},notes:{},saved:['da_nang:hotel'],custom:[],memoCards:{},todayProgress:{},checklists:{},aiUndo:{},meta:{}};
localStorage.setItem('familyTravelV11',JSON.stringify(state));localStorage.setItem('familyTravelFamilySyncV12',JSON.stringify({enabled:false,deviceId:'root-promotion-synthetic-device'}));localStorage.setItem('danangCustomPlaces','[{"name":"legacy keep"}]');

await active(await navigator.serviceWorker.register('${prefix}service-worker.js',{scope:'${prefix}',updateViaCache:'none'}));
await active(await navigator.serviceWorker.register('${prefix}v11-preview/service-worker.js',{scope:'${prefix}v11-preview/',updateViaCache:'none'}));const other=await caches.open('unrelated-qa-cache');await other.put('/other-qa/item',new Response('keep'));out.textContent='이전 worker 2개 설치 완료. 합성 일정과 기기 ID 저장 완료.';};
document.getElementById('promote').onclick=async()=>{await fetch('/__promote',{method:'POST'});out.textContent='새 루트 파일 제공 중. 새 루트 앱 열기로 이동하세요.';};
document.getElementById('inspect').onclick=async()=>{const state=JSON.parse(localStorage.getItem('familyTravelV11')||'{}'),cfg=JSON.parse(localStorage.getItem('familyTravelFamilySyncV12')||'{}');out.textContent=JSON.stringify({saved:state.saved,route:state.routes?.['da_nang:2027-01-12'],deviceId:cfg.deviceId,legacyCustomPreserved:localStorage.getItem('danangCustomPlaces')==='[{"name":"legacy keep"}]',caches:await caches.keys(),registrations:(await navigator.serviceWorker.getRegistrations()).map(r=>({scope:r.scope,script:r.active?.scriptURL}))},null,2);};
</script></html>`;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.png':'image/png'};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(url.pathname==='/__promote'&&req.method==='POST'){legacy=false;res.end('ok');return;}
 if(url.pathname==='/__qa.html'){res.setHeader('Content-Type',mime['.html']);res.end(fixture);return;}
 if(!url.pathname.startsWith(prefix)){res.writeHead(404).end();return;}
 let relative=decodeURIComponent(url.pathname.slice(prefix.length));if(!relative||relative.endsWith('/'))relative+='index.html';
 const file=path.resolve(root,relative);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 try{const bytes=legacy?cp.execFileSync(git,['show',baseline+':'+relative],{maxBuffer:5e6,stdio:['ignore','pipe','ignore']}):fs.readFileSync(file);res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');res.end(bytes);}catch{res.writeHead(404).end();}
}).listen(Number(process.env.PORT||8137),'127.0.0.1',()=>console.log('Migration QA: http://127.0.0.1:8137/__qa.html'));
