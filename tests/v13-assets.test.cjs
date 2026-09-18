const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const root=path.resolve(__dirname,'../v11-preview');
test('Da Nang frozen 16 photos are served intact over HTTP',async()=>{
 const places=JSON.parse(fs.readFileSync(path.join(root,'data/places.json'))).filter(p=>p.city==='da_nang');
 assert.equal(places.length,16);
 assert.equal(new Set(places.map(p=>p.photoFile)).size,16);
 const server=http.createServer((req,res)=>{
  const file=path.join(root,decodeURIComponent(req.url));
  if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404).end();return;}
  res.setHeader('Content-Type','image/jpeg');res.end(fs.readFileSync(file));
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 try{for(const p of places){
  const original=fs.readFileSync(path.join(root,p.photoFile));
  assert.equal(original.readUInt16BE(0),0xffd8,p.id);
  const res=await fetch(`http://127.0.0.1:${server.address().port}/${p.photoFile}`);
  assert.equal(res.status,200,p.id);
  assert.deepEqual(Buffer.from(await res.arrayBuffer()),original,p.id);
 }}finally{await new Promise(r=>server.close(r));}
});
