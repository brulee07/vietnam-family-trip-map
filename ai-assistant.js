(()=>{
const GLOBAL_CFG=window.TRAVEL_AI_CONFIG||{};
const CFG={
  endpoint:(localStorage.getItem('travelAiEndpoint')||GLOBAL_CFG.endpoint||'').replace(/\/$/,''),
  city:document.body.dataset.city||inferCity(),
  appVersion:GLOBAL_CFG.appVersion||'10.0'
};
const history=[];
function inferCity(){const f=(location.pathname.split('/').pop()||'').replace('.html','');return ['da_nang','quy_nhon','tuy_hoa','nha_trang'].includes(f)?f:'hub'}
const cityNames={da_nang:'다낭',quy_nhon:'꾸이년',tuy_hoa:'뚜이호아',nha_trang:'나트랑',hub:'전체 여행'};
async function j(path){try{const r=await fetch(path,{cache:'no-store'});return r.ok?await r.json():null}catch(e){return null}}
async function context(){
  const [trip,cities,places,itineraries,safety]=await Promise.all([
    j('./data/trip.json'),j('./data/cities.json'),j('./data/places.json'),
    j('./data/itineraries.json'),j('./data/safety.json')
  ]);
  const cid=CFG.city;let route=[];
  try{if(typeof window.getTravelAiRoute==='function')route=window.getTravelAiRoute()||[]}catch(e){}
  return {
    appVersion:CFG.appVersion,
    currentCity:cid,
    currentCityName:cityNames[cid],
    trip,
    family:trip?.travelers||null,
    cities,
    currentCityInfo:Array.isArray(cities)?cities.find(x=>x.id===cid)||null:null,
    currentRoute:route,
    plannedItineraries:Array.isArray(itineraries)?itineraries.filter(x=>cid==='hub'||x.city===cid):[],
    cityPlaces:Array.isArray(places)?places.filter(p=>cid==='hub'||p.city===cid):[],
    safety
  };
}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function mount(){
  document.body.insertAdjacentHTML('beforeend',`
  <button id="travelAiFab" aria-label="AI 여행 비서 열기">✨ AI 여행 비서</button>
  <aside id="travelAiPanel" aria-label="AI 여행 비서">
    <div class="tai-head"><div><b>✨ AI 여행 비서 <span class="tai-badge">v10.0</span></b><small>우리 가족 여행 데이터 + 현재 지도 경로</small></div><div class="tai-head-actions"><button class="tai-settings" aria-label="AI 서버 설정">⚙️</button><button class="tai-close" aria-label="닫기">×</button></div></div>
    <div class="tai-context">컨텍스트 준비 중…</div>
    <div class="tai-server"></div>
    <div class="tai-messages"><div class="tai-msg ai">안녕하세요. 우리 가족의 2027 베트남 여행 전체 일정, 가족 구성, 도시별 계획과 현재 지도 경로를 함께 읽어 답변합니다.</div></div>
    <div class="tai-quick"><button>현재 동선 점검</button><button>오늘 일정</button><button>동선 최적화</button><button>아이들과 괜찮아?</button><button>한 곳 빼기</button></div>
    <form class="tai-form"><input maxlength="700" placeholder="예: 이 동선 너무 빡빡해?" aria-label="질문"><button>전송</button></form>
    <div class="tai-settings-panel" hidden>
      <b>AI 서버 연결</b><p>Cloudflare Worker의 <code>/chat</code> 주소를 입력하세요. 이 값은 이 기기의 브라우저에만 저장됩니다.</p>
      <input class="tai-endpoint" type="url" placeholder="https://...workers.dev/chat">
      <div class="tai-settings-row"><button type="button" class="tai-save">저장</button><button type="button" class="tai-clear">연결 해제</button></div>
      <small>공용 설정은 <code>ai-config.js</code>의 endpoint에 입력하면 모든 기기에 적용됩니다.</small>
    </div>
  </aside>`);
  const fab=document.querySelector('#travelAiFab'),panel=document.querySelector('#travelAiPanel'),msgs=panel.querySelector('.tai-messages'),input=panel.querySelector('.tai-form input'),ctxEl=panel.querySelector('.tai-context'),serverEl=panel.querySelector('.tai-server'),settingsPanel=panel.querySelector('.tai-settings-panel'),endpointInput=panel.querySelector('.tai-endpoint');
  function serverStatus(){serverEl.innerHTML=CFG.endpoint?`<span class="ok">● AI 서버 연결 설정됨</span>`:`<span class="warn">● AI 서버 미설정 · ⚙️에서 Worker 주소 입력</span>`}
  async function refresh(){const c=await context();ctxEl.textContent=`현재: ${c.currentCityName} · 경로 ${c.currentRoute.length}곳 · 장소 DB ${c.cityPlaces.length}곳`;serverStatus()}
  fab.onclick=()=>{panel.classList.toggle('open');if(panel.classList.contains('open')){input.focus();refresh()}};
  panel.querySelector('.tai-close').onclick=()=>panel.classList.remove('open');
  panel.querySelector('.tai-settings').onclick=()=>{settingsPanel.hidden=!settingsPanel.hidden;endpointInput.value=CFG.endpoint||''};
  panel.querySelector('.tai-save').onclick=()=>{const v=endpointInput.value.trim().replace(/\/$/,'');if(!/^https:\/\//i.test(v)){alert('https:// 로 시작하는 Worker /chat 주소를 입력해 주세요.');return}localStorage.setItem('travelAiEndpoint',v);CFG.endpoint=v;settingsPanel.hidden=true;serverStatus();add('AI 서버 주소를 저장했습니다. 이제 실제 AI 질문을 보낼 수 있습니다.','ai')};
  panel.querySelector('.tai-clear').onclick=()=>{localStorage.removeItem('travelAiEndpoint');CFG.endpoint=(GLOBAL_CFG.endpoint||'').replace(/\/$/,'');endpointInput.value=CFG.endpoint;serverStatus();add('이 기기의 AI 서버 설정을 초기화했습니다.','ai')};
  panel.querySelectorAll('.tai-quick button').forEach(b=>b.onclick=()=>ask(b.textContent));
  panel.querySelector('form').onsubmit=e=>{e.preventDefault();const q=input.value.trim();if(q){input.value='';ask(q)}};
  refresh();
  async function ask(q){
    add(q,'user'); history.push({role:'user',content:q}); trimHistory();
    const wait=add(CFG.endpoint?'AI가 여행 데이터를 분석하고 있습니다…':'AI 서버가 아직 연결되지 않았습니다.','ai');
    const c=await context();ctxEl.textContent=`현재: ${c.currentCityName} · 경로 ${c.currentRoute.length}곳 · 장소 DB ${c.cityPlaces.length}곳`;
    let answer;
    if(CFG.endpoint){
      try{
        const controller=new AbortController(); const timer=setTimeout(()=>controller.abort(),30000);
        const r=await fetch(CFG.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,context:c,history:history.slice(-8)}),signal:controller.signal});
        clearTimeout(timer);
        const d=await r.json().catch(()=>({}));
        if(!r.ok)throw new Error(d.error||`HTTP ${r.status}`);
        answer=d.answer||'AI 응답을 받았지만 표시할 문장이 없습니다.';
      }catch(e){
        answer=e.name==='AbortError'?'AI 응답 시간이 길어 연결을 종료했습니다. 잠시 후 다시 시도해 주세요.':`AI 서버 연결 오류: ${e.message||'알 수 없는 오류'}\n\n⚙️ 설정의 Worker 주소와 Cloudflare 배포 상태를 확인해 주세요.`;
      }
    }else answer=localAnswer(q,c);
    wait.textContent=answer; history.push({role:'assistant',content:answer}); trimHistory(); msgs.scrollTop=msgs.scrollHeight;
  }
  function add(t,who){const d=document.createElement('div');d.className='tai-msg '+who;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d}
}
function trimHistory(){while(history.length>10)history.shift()}
function localAnswer(q,c){
  const names=c.currentRoute.map(x=>x.name).join(' → ');
  if(/동선|경로|빡빡|일정/.test(q))return names?`현재 ${c.currentCityName} 경로는 ${c.currentRoute.length}곳입니다.\n${names}\n\n경로 인식은 정상입니다. 실제 AI 분석을 사용하려면 ⚙️에서 Cloudflare Worker의 /chat 주소를 연결해 주세요.`:`현재 ${c.currentCityName} 지도에 경로 정보가 없습니다. 지도에서 장소를 추가하면 AI가 그 순서를 함께 읽습니다.`;
  return `현재 ${c.currentCityName}의 여행 데이터, 장소 DB ${c.cityPlaces.length}곳, 현재 경로 ${c.currentRoute.length}곳을 읽었습니다.\n\n실제 생성형 AI 답변을 사용하려면 ⚙️에서 Cloudflare Worker의 /chat 주소를 연결해 주세요.`;
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
