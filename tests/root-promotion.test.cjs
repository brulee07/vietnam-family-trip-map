'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),http=require('node:http'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const prefix='/vietnam-family-trip-map/';
const origin='https://example.test';

test('approved photos, audit records, data and sync implementation survive promotion unchanged',()=>{
 const baseline=JSON.parse(read('tests/promotion-baseline.json'));
 for(const [file,hash] of Object.entries(baseline.files)){
  const bytes=fs.readFileSync(path.join(root,file));
  let text=bytes.toString('utf8').replaceAll('\r\n','\n');
  for(const link of baseline.archiveLinkRewrites?.[file]||[]){
   assert.ok(text.includes(']('+link.to+')'),file+' relocated link');
   assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),link.to)),link.to);
   text=text.replaceAll(']('+link.to+')',']('+link.from+')');
  }
  const canonical=/\.(jpg|png)$/.test(file)?bytes:Buffer.from(text);
  assert.equal(crypto.createHash('sha256').update(canonical).digest('hex'),hash,file);
 }
});

test('legacy city and preview URLs preserve invitations, query strings and project prefix',()=>{
 const files=['v11-preview/index.html','data/index.html',...['da_nang','quy_nhon','tuy_hoa','nha_trang'].flatMap(c=>[c+'.html',c+'_json_beta.html']),'nha_trang_json_alpha.html'];
 for(const file of files){
  let destination,cleared=false;const link={};
  const location=new URL(origin+prefix+file+'?keep=yes#family=SYNTHETIC&key=test-only');
  location.replace=url=>destination=new URL(url);
  vm.runInNewContext(read(file).match(/<script>([\s\S]*?)<\/script>/)[1],{URL,location,history:{replaceState(){cleared=true;}},document:{getElementById:()=>link}});
  assert.equal(destination.pathname,prefix+'index.html',file);assert.equal(destination.hash,'#family=SYNTHETIC&key=test-only');assert.equal(destination.searchParams.get('keep'),'yes');assert.ok(cleared);
  if(!file.includes('/'))assert.equal(destination.searchParams.get('city'),file.split('_json')[0].replace('.html',''));
 }
});

function worker(file='service-worker.js',seed={}){
 const handlers={},deleted=[],stored=new Map(Object.entries(seed).map(([k,urls])=>[k,new Map(urls.map(u=>[origin+u,new Response('cached')]))]));
 let offline=false,unregistered=0,claimed=0;
 const cacheFor=name=>{if(!stored.has(name))stored.set(name,new Map());const data=stored.get(name);return {keys:async()=>[...data.keys()].map(url=>new Request(url)),addAll:async files=>{for(const file of files)data.set(new URL(file,origin+prefix).href,new Response(file));},put:async(req,res)=>data.set(req.url,res),match:async(req)=>{const url=new URL(req.url);return [...data].find(([k])=>new URL(k).pathname===url.pathname)?.[1]?.clone();}};};
 const context={URL,Request,Response,caches:{keys:async()=>[...stored.keys()],open:async name=>cacheFor(name),delete:async name=>{deleted.push(name);return stored.delete(name);}},fetch:async()=>{if(offline)throw Error('offline');return new Response('network');},self:{location:new URL(origin+prefix+file),addEventListener:(name,fn)=>handlers[name]=fn,skipWaiting:async()=>{},clients:{claim:async()=>claimed++},registration:{unregister:async()=>unregistered++}}};
 vm.runInNewContext(read(file),context);
 return {deleted,stored,get unregistered(){return unregistered;},get claimed(){return claimed;},offline(){offline=true;},async event(name,request){let work;handlers[name]({request,waitUntil:p=>work=p,respondWith:p=>work=p});return work?await work:undefined;}};
}

test('root service worker upgrades owned caches, protects other apps and supports offline shell',async()=>{
 const own='vietnam-family-root:'+prefix+':old';
 const w=worker(undefined,{[own]:[prefix+'index.html'],'vietnam-family-trip-v10-1-1':[prefix+'index.html'],'vietnam-family-trip-v9-other':['/other/index.html'],'family-travel-v13-final-preview-1':[prefix+'v11-preview/index.html'],'unrelated-cache':[prefix+'index.html']});
 await w.event('install');await w.event('activate');
 assert.deepEqual(w.deleted.sort(),[own,'vietnam-family-trip-v10-1-1'].sort());assert.equal(w.claimed,1);
 assert.equal(await (await w.event('fetch',new Request(origin+prefix+'index.html'))).text(),'network');
 w.offline();assert.equal(await (await w.event('fetch',new Request(origin+prefix+'index.html'))).text(),'network');
 assert.equal(await (await w.event('fetch',new Request(origin+prefix+'data/places.json?v=13.2'))).text(),'./data/places.json?v=13.2');
 assert.equal(await w.event('fetch',new Request('https://sync.invalid/sync/pull')),undefined);
 assert.equal(await w.event('fetch',new Request(origin+'/other/index.html')),undefined);
 const missing=await w.event('fetch',new Request(origin+prefix+'photos/missing.jpg'));assert.equal(missing.type,'error');
});

test('nested worker retires without deleting caches or forcibly navigating editors',async()=>{
 const w=worker('v11-preview/service-worker.js',{'family-travel-old':[prefix+'v11-preview/index.html']});
 await w.event('install');await w.event('activate');assert.equal(w.unregistered,1);assert.equal(w.claimed,1);assert.deepEqual(w.deleted,[]);
});

test('manifests retain installed identities and use project-relative scopes',()=>{
 const m=JSON.parse(read('manifest.json')),old=JSON.parse(read('v11-preview/manifest.json'));
 assert.equal(m.id,'./index.html');assert.equal(m.start_url,'./index.html');assert.equal(m.scope,'./');
 assert.equal(old.id,'./index.html');assert.equal(old.start_url,'./index.html');assert.equal(old.scope,'../');
 for(const i of old.icons)assert.ok(fs.existsSync(path.resolve(root,'v11-preview',i.src)));
});

test('first upgrade bypasses the legacy cache-first unversioned JSON',()=>{
 assert.ok(read('app.js').includes("fetch('data/'+n+'.json?v=13.2')"));
 assert.ok(read('service-worker.js').includes('./data/places.json?v=13.2'));
});

test('project-prefix HTTP serves every local app asset and all 81 frozen representative JPEGs',async()=>{
 const server=http.createServer((req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(!pathname.startsWith(prefix)){res.writeHead(404).end();return;}
  const file=path.resolve(root,decodeURIComponent(pathname.slice(prefix.length))||'index.html');
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404).end();return;}
  res.setHeader('Content-Type',file.endsWith('.jpg')?'image/jpeg':'application/octet-stream');res.end(fs.readFileSync(file));
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{
  const base=`http://127.0.0.1:${server.address().port}${prefix}`;
  const assets=[...read('index.html').matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(u=>!u.startsWith('https:'));
  for(const asset of assets)assert.equal((await fetch(new URL(asset,base))).status,200,asset);
  let count=0,missing=0;
  for(const p of JSON.parse(read('data/places.json'))){
   const file=p.photoFile||`photos/${p.city}/${p.id}.jpg`,res=await fetch(new URL(file,base));
   if(!fs.existsSync(path.join(root,file))){assert.equal(res.status,404);missing++;continue;}
   assert.equal(res.status,200);assert.equal(res.headers.get('content-type'),'image/jpeg');
   const image=Buffer.from(await res.arrayBuffer());assert.equal(image.readUInt16BE(0),0xffd8);assert.deepEqual(image,fs.readFileSync(path.join(root,file)));count++;
  }
  assert.equal(count,81);assert.equal(missing,19);
 }finally{await new Promise(r=>server.close(r));}
});
