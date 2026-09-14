'use strict';
const $=s=>document.querySelector(s), esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='familyTravelV11';
let db, city='da_nang', date='2027-01-11', tab='home', edit=false, map=null, filter='전체', selected=null, chat=[], busy=false;
let local={routes:{},notes:{},saved:[],custom:[],aiUndo:{}};
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&Array.isArray(v.custom)&&Array.isArray(v.saved)&&v.routes&&v.notes)local=v;}catch{}
if(!local.aiUndo||typeof local.aiUndo!=='object'||Array.isArray(local.aiUndo))local.aiUndo={};
const key=p=>p.city+':'+p.id, place=k=>[...db.places,...local.custom].find(p=>key(p)===k), cityInfo=()=>db.cities.find(c=>c.id===city), routeKey=()=>city+':'+date;
function save(){try{localStorage.setItem(KEY,JSON.stringify(local));return true;}catch{toast('이 기기에 저장할 수 없습니다. 여행 도구에서 파일로 백업해 주세요.');return false;}}
let toastTimer;function toast(t){$('#toast').textContent=t;$('#toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').style.display='none',3500);}
function plans(){return db.itineraries.filter(i=>i.city===city&&i.label.startsWith('1/'+Number(date.slice(-2))+' '));}
function route(){return local.routes[routeKey()]??(plans()[0]?.placeIds||[]).map(id=>city+':'+id);}
function dateLabel(d){return new Date(d+'T12:00:00Z').toLocaleDateString('ko-KR',{month:'long',day:'numeric',weekday:'long',timeZone:'UTC'});}
function citySelect(){return `<label class="field mobile-city"><span class="sr">도시 선택</span><select id="city-select">${db.cities.map(c=>`<option value="${c.id}" ${city===c.id?'selected':''}>${c.nameKo}</option>`).join('')}</select></label>`;}
function changeCity(id){city=id;if(!cityInfo().dates.includes(date))date=cityInfo().dates[0];edit=false;filter='전체';render();}
function go(t){tab=t;edit=false;render();window.scrollTo(0,0);}
function render(){if(map){map.remove();map=null;}document.body.dataset.city=city;$('#main').className=tab==='ai'?'ai-main':'';$('#cities').innerHTML=db.cities.map(c=>`<button class="city ${c.id===city?'active':''}" data-city="${c.id}">${c.nameKo}<small>${c.dates[0].slice(5).replace('-','.')} — ${c.dates.at(-1).slice(5).replace('-','.')}</small></button>`).join('');$('#cities').querySelectorAll('button').forEach(b=>b.onclick=()=>changeCity(b.dataset.city));
const tabs=[['home','⌂','홈'],['schedule','▤','일정'],['map','◇','지도'],['saved','♡','저장'],['tools','☰','도구']];
$('#nav').innerHTML=tabs.map(([t,i,n])=>`<button data-tab="${t}" class="${tab===t?'active':''}" ${tab===t?'aria-current="page"':''}><span class="navicon" aria-hidden="true">${i}</span>${n}</button>`).join('');$('#nav').querySelectorAll('button').forEach(b=>b.onclick=()=>go(b.dataset.tab));
if(tab==='home')homeView();if(tab==='schedule')schedule();if(tab==='places'||tab==='saved')placesView();if(tab==='map')mapView();if(tab==='tools')toolsView();if(tab==='ai')aiView();
if($('#city-select'))$('#city-select').onchange=e=>changeCity(e.target.value);}
function homeView(){
  const days=Array.from({length:15},(_,i)=>`2027-01-${String(i+11).padStart(2,'0')}`);
  const transfers=Object.fromEntries(db.trip.route.map(r=>[r.date,r]));
  const routeAt=(cid,d)=>{const saved=local.routes[`${cid}:${d}`];if(saved)return saved.map(place).filter(Boolean);const ps=db.itineraries.filter(i=>i.city===cid&&i.label.startsWith('1/'+Number(d.slice(-2))+' '));return (ps[0]?.placeIds||[]).map(id=>place(cid+':'+id)).filter(Boolean);};
  const cityForDay=d=>db.cities.filter(c=>c.dates.includes(d));
  const rows=days.map((d,i)=>{const cs=cityForDay(d),transfer=transfers[d];let target=cs.at(-1)||db.cities[0];const points=cs.flatMap(c=>routeAt(c.id,d));const unique=points.filter((p,n,a)=>a.findIndex(x=>x.name===p.name)===n);const title=transfer?`${placeName(transfer.from)} → ${placeName(transfer.to)} 이동`:(db.itineraries.find(x=>x.city===target.id&&x.label.startsWith('1/'+Number(d.slice(-2))+' '))?.label.split('·').slice(1).join('·').trim()||target.role);return `<section class="trip-day"><div class="trip-day-head"><div><span>Day ${i+1}</span><h2>${dateLabel(d)}</h2></div><button class="textbtn" data-open-day="${d}" data-open-city="${target.id}">일정 보기</button></div><button class="trip-day-card" data-open-day="${d}" data-open-city="${target.id}"><span class="trip-city">${cs.map(c=>c.nameKo).join(' → ')}</span><b>${esc(title)}</b><small>${unique.slice(0,3).map(p=>p.name).join(' · ')}${unique.length>3?` 외 ${unique.length-3}곳`:''}</small></button></section>`;}).join('');
  $('#main').innerHTML=`<div class="trip-hero"><span class="eyebrow">2027. 1. 11 — 1. 25</span><h1>베트남 가족여행</h1><p>다낭에서 나트랑까지 · 14박 15일</p><div class="trip-stats"><span><b>4</b>도시</span><span><b>7→9</b>가족</span><span><b>105</b>장소</span></div></div><nav class="city-jump" aria-label="도시 일정 바로가기">${db.cities.map(c=>`<button data-jump-city="${c.id}"><b>${c.nameKo}</b><small>${c.dates[0].slice(5).replace('-','.')}—${c.dates.at(-1).slice(5).replace('-','.')}</small></button>`).join('')}</nav><div class="all-days"><h2>15일 전체 일정</h2>${rows}</div>`;
  document.querySelectorAll('[data-open-day]').forEach(b=>b.onclick=()=>{city=b.dataset.openCity;date=b.dataset.openDay;go('schedule');});
  document.querySelectorAll('[data-jump-city]').forEach(b=>b.onclick=()=>{changeCity(b.dataset.jumpCity);tab='schedule';render();window.scrollTo(0,0);});
}
function placeName(v){return({Incheon:'인천',Da_Nang:'다낭','Da Nang':'다낭','Diêu Trì / Quy Nhon':'꾸이년',Quy_Nhon:'꾸이년','Quy Nhon':'꾸이년',Tuy_Hoa:'뚜이호아','Tuy Hoa':'뚜이호아',Nha_Trang:'나트랑','Nha Trang':'나트랑'})[v]||v;}
function schedule(){const rows=route(), ps=plans();$('#main').innerHTML=`<div class="heading"><div><span class="eyebrow">2027. 1. 11 — 1. 25</span><h1>베트남 가족여행</h1><span class="muted">${cityInfo().nameKo} · ${city==='nha_trang'?'가족 9명':'가족 7명'}</span></div><button class="iconbtn" id="open-map" aria-label="일정 지도 보기">◇</button></div>${citySelect()}<div class="date-strip" aria-label="날짜 선택">${cityInfo().dates.map(d=>`<button class="date ${d===date?'active':''}" data-date="${d}" aria-label="${dateLabel(d)}" aria-pressed="${d===date}">${new Date(d+'T12:00Z').toLocaleDateString('ko',{weekday:'short',timeZone:'UTC'})}<b>${Number(d.slice(-2))}</b></button>`).join('')}</div><div class="day-head"><h2>Day ${Number(date.slice(-2))-10} <small>${date.slice(5).replace('-','.')} · ${cityInfo().nameKo}</small></h2><button class="textbtn" id="edit">${edit?'완료':'편집'}</button></div>${aiUndoScheduleBanner()}${ps.length>1?`<label class="field plan-select"><span>일정안 선택</span><select id="plan">${ps.map(p=>`<option value="${p.id}">${esc(p.label)}</option>`).join('')}<option value="custom" ${local.routes[routeKey()]?'selected':''}>내가 편집한 일정</option></select></label>`:''}<div class="timeline">${rows.map((k,i)=>{const p=place(k);return p?`<div class="stop"><span class="dot">${i+1}</span><button class="card card-media" data-place="${esc(k)}">${cardPhoto(p)}<span class="card-copy"><b>${esc(p.name)}</b><small>${esc(p.cat)}${p.stay?' · '+esc(p.stay):''}</small></span></button>${edit?`<div class="edit-row"><button data-move="${i}" data-delta="-1" ${i===0?'disabled':''} aria-label="${esc(p.name)} 위로">↑ 위로</button><button data-move="${i}" data-delta="1" ${i===rows.length-1?'disabled':''}>↓ 아래로</button><button class="danger" data-remove="${i}">일정에서 빼기</button></div>`:''}</div>`:'';}).join('')}</div>${!rows.length?'<div class="empty">아직 등록된 일정이 없습니다.<br>장소를 추가해 하루를 구성해 보세요.</div>':''}${local.notes[routeKey()]?`<div class="memo">${esc(local.notes[routeKey()])}</div>`:''}<div class="actions"><button class="btn" id="add">＋ 장소 추가</button><button class="btn" id="memo">메모 ${local.notes[routeKey()]?'편집':'추가'}</button></div>${ps[0]?.note?`<details class="section"><summary>기존 일정 메모</summary><p class="notice">${esc(ps[0].note)}</p></details>`:''}<p class="notice">기존에 정리한 일정안입니다. 방문 확정을 뜻하지 않으며, 가족 상황에 맞게 편집할 수 있습니다.</p>`;
$('#open-map').onclick=()=>go('map');$('#edit').onclick=()=>{edit=!edit;render();};$('#add').onclick=addPlace;$('#memo').onclick=editMemo;if($('#ai-undo-current'))$('#ai-undo-current').onclick=()=>restoreAiRoute(routeKey());document.querySelectorAll('[data-date]').forEach(b=>b.onclick=()=>{date=b.dataset.date;edit=false;render();});bindPlaces();document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const a=[...route()];a.splice(+b.dataset.remove,1);local.routes[routeKey()]=a;save();render();});document.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>{const a=[...route()],i=+b.dataset.move,j=i+(+b.dataset.delta);[a[i],a[j]]=[a[j],a[i]];local.routes[routeKey()]=a;save();render();});if($('#plan'))$('#plan').onchange=e=>{if(e.target.value==='custom')return;const apply=()=>{local.routes[routeKey()]=db.itineraries.find(p=>p.id===e.target.value).placeIds.map(id=>city+':'+id);save();closeSheet();render();};openSheet('일정안 변경',`<p>선택한 일정안으로 이 날짜의 장소 순서를 교체할까요? 메모와 저장한 장소는 유지됩니다.</p>`,`<button class="btn" id="cancel-plan">취소</button><button class="btn primary" id="apply-plan">교체</button>`);$('#cancel-plan').onclick=()=>{closeSheet();render();};$('#apply-plan').onclick=apply;};}
function bindPlaces(){document.querySelectorAll('[data-place]').forEach(b=>b.onclick=()=>quick(b.dataset.place));}
function openSheet(title,body,foot=''){const d=$('#sheet');d.innerHTML=`<div class="sheet-head"><h2 id="sheet-title">${esc(title)}</h2><button class="iconbtn" id="close-sheet" aria-label="닫기">×</button></div><div class="sheet-body">${body}</div>${foot?`<div class="sheet-foot">${foot}</div>`:''}`;$('#close-sheet').onclick=closeSheet;if(!d.open)d.showModal();d.scrollTop=0;}
function closeSheet(){$('#sheet').close();selected=null;}
function mapsURL(p){return 'https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(p.lat+','+p.lng);}
function safeLink(url,label){return `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;}
function localPhotoPath(p){return p?.photoFile||(`photos/${p.city}/${p.id}.jpg`);}
function photoFigure(p){if(!p)return '';const ph=p.photo||{},localSrc=localPhotoPath(p),fallback=ph.url||'';return `<figure class="place-photo"><img src="${esc(localSrc)}" data-fallback="${esc(fallback)}" alt="${esc(p.name)} 사진" loading="lazy" onload="const c=this.closest('figure').querySelector('figcaption');if(c)c.style.display=this.dataset.tried==='1'?'block':'none'" onerror="if(this.dataset.fallback&&this.dataset.tried!=='1'){this.dataset.tried='1';this.src=this.dataset.fallback}else{this.closest('figure').classList.add('photo-error')}"><figcaption ${fallback?'':'style="display:none"'}>사진: ${esc(ph.credit||ph.provider||'Wikimedia Commons')} · ${esc(ph.license||'라이선스 확인')} ${ph.source?`· <a href="${esc(ph.source)}" target="_blank" rel="noopener noreferrer">출처</a>`:''}</figcaption></figure>`;}
function cardPhoto(p){if(!p)return '';const localSrc=localPhotoPath(p),fallback=p?.photo?.url||'';return `<img class="card-thumb" src="${esc(localSrc)}" data-fallback="${esc(fallback)}" alt="" loading="lazy" onerror="if(this.dataset.fallback&&this.dataset.tried!=='1'){this.dataset.tried='1';this.src=this.dataset.fallback}else{this.remove()}">`;}
function quick(k){const p=place(k);if(!p)return;openSheet('장소 간편 보기',`${photoFigure(p)}<span class="eyebrow">${db.cities.find(c=>c.id===p.city)?.nameKo||''} · ${esc(p.cat)}</span><h3 class="detail-title">${esc(p.name)}</h3><p class="muted">${esc(p.role||p.en)}</p><button class="btn" id="details" style="width:100%">장소 상세 정보 보기 ›</button>`,`<button class="btn" id="save-place">${local.saved.includes(k)?'♥ 저장됨':'♡ 저장'}</button>${safeLink(mapsURL(p),'길찾기')}`);$('#details').onclick=()=>details(k);$('#save-place').onclick=()=>{local.saved=local.saved.includes(k)?local.saved.filter(x=>x!==k):[...local.saved,k];save();quick(k);if(tab==='saved')render();};}
function details(k){const p=place(k);openSheet('장소 상세',`${photoFigure(p)}<span class="eyebrow">${esc(p.cat)}</span><h3 class="detail-title">${esc(p.name)}</h3><p class="muted">${esc(p.en)}</p>${[['장소 소개',p.desc],['가족 여행 메모',p.tip],['주소',p.address],['이용 정보 · 기존 기록',[p.hours,p.stay].filter(Boolean).join(' · ')]].filter(([,v])=>v).map(([t,v])=>`<div class="info"><b>${t}</b><p>${esc(v)}</p></div>`).join('')}<p class="notice section">기존 자료의 정보를 그대로 옮겼습니다. 영업시간·가격의 최신 여부를 확인한 것은 아닙니다.</p><button class="btn" id="copy-address">주소 복사</button>`,`<button class="btn" id="back-quick">간편 보기</button>${safeLink(mapsURL(p),'길찾기')}`);$('#back-quick').onclick=()=>quick(k);$('#copy-address').onclick=async()=>{try{await navigator.clipboard.writeText(p.address||p.name);toast('주소를 복사했습니다.');}catch{toast('복사가 제한되어 있습니다. 주소 텍스트를 길게 눌러 복사해 주세요.');}};}
function editMemo(){openSheet('하루 메모',`<label class="field"><span>${dateLabel(date)}</span><textarea id="day-memo" maxlength="2000">${esc(local.notes[routeKey()]||'')}</textarea></label>`,`<button class="btn primary" id="save-memo">저장</button>`);$('#save-memo').onclick=()=>{local.notes[routeKey()]=$('#day-memo').value.trim();save();closeSheet();render();};}
function placesView(){const saved=tab==='saved';$('#main').innerHTML=`<div class="heading"><div><span class="eyebrow">${cityInfo().nameKo}</span><h1>${saved?'저장한 장소':'어디로 가볼까요?'}</h1></div></div>${citySelect()}<label class="field"><span class="sr">장소 검색</span><input id="place-search" type="search" placeholder="장소 이름이나 음식으로 찾기"></label><div class="filter-row">${['전체','가볼 곳','식사·카페','생활'].map(f=>`<button class="pill ${f===filter?'active':''}" data-filter="${f}">${f}</button>`).join('')}</div><div class="place-list" id="place-list"></div>`;const update=()=>{const q=$('#place-search').value.trim().toLowerCase();const result=[...db.places,...local.custom].filter(p=>p.city===city&&(!saved||local.saved.includes(key(p)))&&JSON.stringify([p.name,p.en,p.desc,p.cat]).toLowerCase().includes(q)&&(filter==='전체'||(filter==='식사·카페'?['음식','로컬','카페'].includes(p.cat):filter==='생활'?['숙소','교통','마사지','세탁','쇼핑'].includes(p.cat):!['음식','로컬','카페','숙소','교통','마사지','세탁','쇼핑'].includes(p.cat))));$('#place-list').innerHTML=result.map(p=>`<button class="card card-media" data-place="${esc(key(p))}">${cardPhoto(p)}<span class="card-copy"><b>${esc(p.name)}</b><small>${esc(p.cat)} · ${esc(p.role||p.en)}</small></span></button>`).join('')||'<div class="empty">조건에 맞는 장소가 없습니다.</div>';bindPlaces();};$('#place-search').oninput=update;document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));update();});update();}
function addPlace(){selected=null;const cityName=cityInfo().nameKo;openSheet(`${cityName} 일정에 장소 추가`,`<span class="eyebrow">${dateLabel(date)}</span><label class="field"><span>${cityName} 장소 검색</span><input id="add-search" type="search" placeholder="기존 장소 이름 검색"></label><div id="add-results"></div><p class="notice section">기존 장소 105곳에서 먼저 찾습니다. 없는 장소는 온라인으로 검색할 수 있습니다.</p><button class="btn" id="external-search">새 장소 온라인 검색</button>`,`<button class="btn primary" id="confirm-add" disabled>장소를 선택해 주세요</button>`);const update=()=>{const q=$('#add-search').value.trim().toLowerCase();const rows=[...db.places,...local.custom].filter(p=>p.city===city&&(p.name+' '+p.en).toLowerCase().includes(q));$('#add-results').innerHTML=rows.map(p=>`<button class="result" data-select="${esc(key(p))}"><b>${esc(p.name)}</b><small>${esc(p.cat)}</small></button>`).join('')||'<p>검색 결과가 없습니다.</p>';document.querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>{selected=b.dataset.select;document.querySelectorAll('[data-select]').forEach(x=>x.classList.toggle('selected',x===b));$('#confirm-add').disabled=false;$('#confirm-add').textContent='이 일정에 추가';});};$('#add-search').oninput=update;$('#external-search').onclick=externalSearch;$('#confirm-add').onclick=()=>{if(!selected)return;if(route().includes(selected)){toast('이미 이 일정에 있는 장소입니다.');return;}local.routes[routeKey()]=[...route(),selected];save();closeSheet();render();toast('일정에 장소를 추가했습니다.');};update();}
function externalSearch(){const cid=city,c=cityInfo();let found=[];selected=null;openSheet('새 장소 찾기',`<label class="field"><span>${c.nameKo} 장소 검색</span><input id="online-query" placeholder="장소명 입력" maxlength="150"></label><button class="btn" id="search-online">검색</button><div id="online-results" aria-live="polite"></div><label class="field section"><span>분류</span><select id="online-cat">${['관광','음식','카페','숙소','쇼핑','세탁','마사지','교통'].map(v=>`<option>${v}</option>`).join('')}</select></label><label class="field"><span>간단한 메모</span><textarea id="online-memo" maxlength="1000"></textarea></label><p class="notice">OpenStreetMap 검색 결과입니다. 주소가 방문하려는 지역과 맞는지 확인해 주세요.</p>`,`<button class="btn primary" id="online-save" disabled>장소를 선택해 주세요</button>`);$('#search-online').onclick=async()=>{const q=$('#online-query').value.trim();if(!q)return;const button=$('#search-online');button.disabled=true;$('#online-results').textContent='검색 중…';selected=null;$('#online-save').disabled=true;try{const u=new URL('https://nominatim.openstreetmap.org/search');u.search=new URLSearchParams({format:'jsonv2',q:q+', '+c.name+', Vietnam',countrycodes:'vn',limit:'5','accept-language':'ko,en'});const r=await fetch(u,{signal:AbortSignal.timeout(12000)});if(!r.ok)throw Error();found=await r.json();if(!$('#online-results'))return;$('#online-results').innerHTML=found.map((p,i)=>`<button class="result" data-online="${i}"><b>${esc(p.name||q)}</b><small>${esc(p.display_name)}</small></button>`).join('')||'<p>검색 결과가 없습니다. 다른 이름으로 검색해 주세요.</p>';document.querySelectorAll('[data-online]').forEach(b=>b.onclick=()=>{selected=+b.dataset.online;document.querySelectorAll('[data-online]').forEach(x=>x.classList.toggle('selected',x===b));$('#online-save').disabled=false;$('#online-save').textContent='장소 저장하고 일정에 추가';});}catch{if($('#online-results'))$('#online-results').textContent='온라인 검색에 연결하지 못했습니다. 기존 장소 검색은 계속 이용할 수 있습니다.';}finally{button.disabled=false;}};$('#online-save').onclick=()=>{if(selected===null)return;const x=found[selected];const p={id:'custom-'+crypto.randomUUID(),city:cid,name:x.name||$('#online-query').value.trim(),en:x.name||'',lat:Number(x.lat),lng:Number(x.lon),address:x.display_name,cat:$('#online-cat').value,tip:$('#online-memo').value.trim(),desc:'사용자가 온라인 검색으로 추가한 장소',custom:true};local.custom.push(p);local.routes[routeKey()]=[...route(),key(p)];save();closeSheet();render();toast('새 장소를 저장했습니다.');};}
function mapView(){$('#main').innerHTML=`<div class="heading"><div><span class="eyebrow">${dateLabel(date)}</span><h1>${cityInfo().nameKo} 동선</h1></div><button class="textbtn" id="back-schedule">일정 보기</button></div>${citySelect()}<p class="map-warning">번호는 일정 순서입니다. 선은 실제 도로 경로가 아니며, 이동 안내는 장소의 길찾기를 이용해 주세요.</p><div class="map" id="map"></div><div class="actions"><button class="btn" id="all-points">도시의 모든 장소</button><button class="btn" id="route-points">일정 장소만</button></div><div id="map-order"></div>`;$('#back-schedule').onclick=()=>go('schedule');const draw=all=>{if(map){map.remove();map=null;}if(!window.L){$('#map').innerHTML='<div class="empty">지도를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요. 일정과 장소 정보는 계속 볼 수 있습니다.</div>';return;}const rows=all?[...db.places,...local.custom].filter(p=>p.city===city):route().map(place).filter(Boolean);$('#map-order').innerHTML=all?'':`<h2 class="map-order-title">방문 순서</h2><div class="map-order-list">${rows.map((p,i)=>`<button data-place="${esc(key(p))}"><span>${i+1}</span><b>${esc(p.name)}</b></button>`).join('')}</div>`;bindPlaces();map=L.map('map');L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(map);const coords=[];rows.forEach((p,i)=>{if(!Number.isFinite(p.lat)||!Number.isFinite(p.lng))return;coords.push([p.lat,p.lng]);const marker=L.marker([p.lat,p.lng],{icon:L.divIcon({className:'map-marker',html:String(i+1),iconSize:[32,32]})}).addTo(map);marker.bindTooltip(esc(p.name),{permanent:false,direction:'top'}).on('click',()=>quick(key(p)));});if(coords.length){map.fitBounds(coords,{paddingTopLeft:[55,75],paddingBottomRight:[55,55],maxZoom:14});if(!all)L.polyline(coords,{color:'#2579ef',weight:3,dashArray:'8 9'}).addTo(map);}else{const p=db.places.find(p=>p.city===city);map.setView([p.lat,p.lng],12);}};$('#all-points').onclick=()=>draw(true);$('#route-points').onclick=()=>draw(false);draw(false);}
function toolsView(){$('#main').innerHTML=`<div class="heading"><div><span class="eyebrow">필요할 때 꺼내 보는</span><h1>여행 도구</h1></div></div>${citySelect()}<div class="place-list"><button class="card" id="ai-open"><b>✦ AI 여행 비서</b><small>선택한 도시와 날짜의 동선 상담</small></button><button class="card" id="weather"><b>현재 날씨</b><small>${cityInfo().nameKo} · 여행 날짜의 예보와 구분해 표시</small></button></div><div id="weather-result" class="weather-result" aria-live="polite"></div><details class="section"><summary>숙소·긴급 연락처 · 기존 기록</summary>${db.safety.accommodations.filter(p=>p.city===city).map(p=>`<div class="info"><b>${esc(p.name)}</b><p>${esc(p.address)}</p></div>`).join('')}${db.safety.emergencyNumbers.map(p=>`<div class="info"><b>${esc(p.label)}</b><a href="tel:${esc(p.number)}">${esc(p.number)}</a></div>`).join('')}<p class="notice">기존 파일의 연락처입니다. 이번 제작에서 최신 여부를 재확인하지 않았습니다.</p></details><details class="section"><summary>내 일정 백업·복원</summary><p class="notice">편집한 일정·메모·저장 장소는 이 기기에 저장됩니다. 가족 휴대폰과 자동 동기화되지 않습니다. 백업 파일을 전달한 뒤 다른 기기에서 복원할 수 있습니다.</p><div class="actions"><button class="btn" id="export">백업 내려받기</button><button class="btn" id="import">백업 복원</button></div><input type="file" id="import-file" accept=".json" hidden></details><p class="notice">v11.7.1 시범판 · 기존 장소 ${db.places.length}곳 · 로컬 사진 슬롯 ${db.places.length}곳 · 외부 대체사진 13곳<br>기존 앱의 기기별 추가 장소·편집 일정은 아직 자동 이전하지 않습니다.</p>`;$('#ai-open').onclick=()=>go('ai');$('#weather').onclick=weather;$('#export').onclick=()=>{const blob=new Blob([JSON.stringify({version:11,data:local},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='family-trip-v11-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};$('#import').onclick=()=>$('#import-file').click();$('#import-file').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>5e6)throw Error();const v=JSON.parse(await file.text());if(v.version!==11||!v.data||!Array.isArray(v.data.custom)||!Array.isArray(v.data.saved)||!v.data.routes||!v.data.notes)throw Error();if(!v.data.custom.every(p=>db.cities.some(c=>c.id===p.city)&&typeof p.id==='string'&&typeof p.name==='string'&&Number.isFinite(p.lat)&&Number.isFinite(p.lng))||!Object.values(v.data.routes).every(a=>Array.isArray(a)&&a.every(k=>typeof k==='string'))||!Object.values(v.data.notes).every(n=>typeof n==='string')||!v.data.saved.every(k=>typeof k==='string'))throw Error();openSheet('백업 복원','<p>이 기기의 v11 편집 내용을 백업 파일로 교체할까요? 기존 v10 데이터는 변경하지 않습니다.</p>','<button class="btn primary" id="restore">교체하고 복원</button>');$('#restore').onclick=()=>{local=v.data;if(!local.aiUndo||typeof local.aiUndo!=='object'||Array.isArray(local.aiUndo))local.aiUndo={};save();closeSheet();render();toast('복원했습니다.');};}catch{toast('올바른 v11 백업 파일이 아닙니다.');}};}
let liveWeather=null;
function weatherCodeLabel(code){
  if(code===0)return '맑음';
  if([1,2,3].includes(code))return '구름 조금';
  if([45,48].includes(code))return '안개';
  if([51,53,55,56,57].includes(code))return '이슬비';
  if([61,63,65,66,67].includes(code))return '비';
  if([71,73,75,77].includes(code))return '눈';
  if([80,81,82].includes(code))return '소나기';
  if([85,86].includes(code))return '눈 소나기';
  if([95,96,99].includes(code))return '뇌우';
  return '날씨 정보';
}
async function fetchWeatherForCity(cid=city){
  const p=db.places.find(p=>p.city===cid);
  if(!p)throw Error();
  const u='https://api.open-meteo.com/v1/forecast?'+new URLSearchParams({latitude:p.lat,longitude:p.lng,current:'temperature_2m,precipitation,weather_code',timezone:'Asia/Ho_Chi_Minh'});
  const r=await fetch(u,{signal:AbortSignal.timeout(10000)});
  if(!r.ok)throw Error();
  const d=await r.json();
  liveWeather={cityId:cid,fetchedAt:new Date().toISOString(),current:d.current};
  return liveWeather;
}
async function weather(){
  const target=$('#weather-result');
  if(!target)return;
  target.textContent='현재 날씨 확인 중…';
  try{
    const w=await fetchWeatherForCity(city),c=w.current;
    target.innerHTML=`<div class="memo">${esc(c.time.replace('T',' '))} · 베트남 현지 시각<br>${esc(weatherCodeLabel(c.weather_code))} · 기온 ${esc(c.temperature_2m)}℃ · 강수 ${esc(c.precipitation)}mm<br><small>Open-Meteo 현재 관측·모델 정보입니다. 2027년 여행일 예보가 아닙니다.</small></div>`;
  }catch{target.textContent='현재 날씨를 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.';}
}
function aiFamilyLabel(){return city==='nha_trang'?db.trip.travelers.nhaTrangSegment:db.trip.travelers.defaultSegment;}
function aiFamilySummary(){return city==='nha_trang'?'가족 9명':'가족 7명';}
function aiFamilyContext(){
  if(city==='nha_trang')return `${db.trip.travelers.nhaTrangSegment} · 아이 나이 ${db.trip.travelers.childrenAges.join('·')}세`;
  return `${db.trip.travelers.defaultSegment} · 세부 연령 구성은 현재 데이터에 없는 내용은 추정하지 않음`;
}
function weatherDateMatches(day=date,w=liveWeather){return !!(w?.current?.time&&w.current.time.slice(0,10)===day);}
function weatherFreshForCity(cid=city,maxMinutes=30){if(liveWeather?.cityId!==cid||!liveWeather.fetchedAt)return false;const age=Date.now()-new Date(liveWeather.fetchedAt).getTime();return Number.isFinite(age)&&age>=0&&age<=maxMinutes*60000;}
function aiQuickActions(){return [
  {label:'일정 강도',question:'이 일정이 가족에게 무리 없는지 이동량과 휴식 기준으로 점검해줘.'},
  {label:'동선 최적화',question:'현재 방문 순서에서 이동 동선을 더 줄일 수 있는지 봐줘.',routeOptimization:true},
  {label:'맞춤 조정',question:'현재 가족 구성과 날씨, 장소 특성을 함께 고려해서 오늘 일정 순서를 가장 편안하게 조정해줘.',adaptiveOptimization:true},
  {label:'식사·휴식',question:'아이들과 함께 움직일 때 식사와 휴식 타이밍을 제안해줘.'},
  {label:'날씨 대안',question:'비가 오거나 너무 더울 때 바꾸기 좋은 대안을 제안해줘.'},
  {label:'준비물',question:'오늘 일정에서 꼭 확인해야 할 준비물과 주의사항을 정리해줘.'}
];}
function aiQuickPrompts(){return aiQuickActions().map(a=>a.question);}
function aiPlaceSummary(p){
  if(!p)return null;
  return {id:p.id,name:p.name,en:p.en||'',cat:p.cat||'',stay:p.stay||'',role:p.role||'',tip:p.tip||'',lat:p.lat,lng:p.lng,address:p.address||''};
}
function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
async function requestAI(endpoint,payload,{timeoutMs=30000,retryOnce=true}={}){
  let lastError;
  const attempts=retryOnce?2:1;
  for(let attempt=0;attempt<attempts;attempt++){
    try{
      const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(timeoutMs),body:JSON.stringify(payload)});
      if(!r.ok){const e=new Error('HTTP '+r.status);e.status=r.status;throw e;}
      return await r.json();
    }catch(e){
      lastError=e;
      const retryable=!e?.status||e.status===429||e.status>=500||e.name==='AbortError'||e.name==='TimeoutError';
      if(attempt+1<attempts&&retryable){
        toast('AI 연결이 지연되어 한 번 더 시도합니다.');
        await sleep(1200);
        continue;
      }
      throw e;
    }
  }
  throw lastError;
}
function buildAIContext({cid,day,rows,transfer,snapshot,weatherForRequest,adaptive}){
  const base={
    appVersion:'11.7.1-preview',currentCity:cid,currentDate:day,travelDayNumber:Number(day.slice(-2))-10,
    currentCityName:cityInfo().nameKo,familyLabel:aiFamilyLabel(),familyContext:aiFamilyContext(),
    trip:db.trip,family:db.trip.travelers,weatherMatchesSelectedDate:weatherDateMatches(day,weatherForRequest),
    cities:db.cities,currentCityInfo:cityInfo(),currentRoute:rows,currentRouteNote:local.notes[snapshot.routeKey]||'',
    currentTransfer:transfer||null,plannedItineraries:plans(),cityPlaces:[...db.places,...local.custom].filter(p=>p.city===cid),
    savedPlaces:local.saved.map(place).filter(p=>p?.city===cid),safety:db.safety,liveWeather:liveWeather?.cityId===cid?liveWeather:null
  };
  if(!adaptive)return base;
  // 맞춤 조정은 현재 일정에 필요한 정보만 전달해 요청 크기와 응답 지연을 줄입니다.
  return {...base,
    trip:{title:db.trip.title,dates:db.trip.dates,travelers:db.trip.travelers,route:db.trip.route.filter(r=>r.date===day)},
    cities:[cityInfo()],
    currentRoute:rows.map(aiPlaceSummary).filter(Boolean),
    plannedItineraries:plans().map(x=>({id:x.id,label:x.label,note:x.note||'',placeIds:x.placeIds||[]})),
    cityPlaces:rows.map(aiPlaceSummary).filter(Boolean),
    savedPlaces:[],
    safety:{accommodations:db.safety.accommodations.filter(x=>x.city===cid),emergencyNumbers:[]}
  };
}
function sameOrder(a,b){return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every((v,i)=>v===b[i]);}
function sameRouteMembers(a,b){
  if(!Array.isArray(a)||!Array.isArray(b)||a.length!==b.length)return false;
  const counts=new Map();
  a.forEach(k=>counts.set(k,(counts.get(k)||0)+1));
  for(const k of b){const n=counts.get(k)||0;if(!n)return false;counts.set(k,n-1);}
  return [...counts.values()].every(n=>n===0);
}
function routeNamesFromKeys(keys){return keys.map(k=>place(k)?.name||k).join(' → ');}
function aiUndoRecord(rk=routeKey()){
  const u=local.aiUndo?.[rk];
  if(!u||!Array.isArray(u.before)||!Array.isArray(u.after)||!sameRouteMembers(u.before,u.after))return null;
  return u;
}
function aiUndoScheduleBanner(){
  const u=aiUndoRecord();if(!u)return '';
  const current=[...route()];
  if(sameOrder(current,u.after))return `<div class="ai-undo-banner"><div><b>AI 추천 순서 적용됨</b><small>원래 일정 순서를 이 기기에 보관하고 있습니다.</small></div><button class="btn" id="ai-undo-current">이전 순서로 복원</button></div>`;
  if(sameOrder(current,u.before))return `<div class="ai-undo-banner restored"><div><b>AI 적용 전 순서로 복원됨</b><small>다시 AI 추천을 실행하면 새 순서를 받을 수 있습니다.</small></div></div>`;
  return '';
}
function restoreAiRoute(rk=routeKey()){
  const u=aiUndoRecord(rk);if(!u){toast('복원할 AI 변경 기록이 없습니다.');return;}
  const current=[...route()];
  if(sameOrder(current,u.before)){toast('이미 이전 순서로 복원되어 있습니다.');return;}
  if(!sameOrder(current,u.after)){toast('AI 적용 후 일정이 직접 수정되어 자동 복원할 수 없습니다.');return;}
  local.routes[rk]=[...u.before];
  if(save()){render();toast('AI 적용 전 순서로 복원했습니다.');}
}
function buildRouteOptimizationPrompt(q,keys){
  const mapping=keys.map((k,i)=>`${i+1}. ${place(k)?.name||k}`).join('\n');
  const sample=keys.map((_,i)=>i+1).join('|');
  return `${q}\n\n[앱 연동용 지시 — 아래 규칙을 반드시 지켜줘]\n현재 일정에 있는 장소만 순서를 바꿔 제안해줘. 새로운 장소를 추가하거나 기존 장소를 빼거나 같은 장소를 중복하지 마. 각 장소는 정확히 한 번씩 포함하고 장소 수는 현재 일정과 같아야 해. 일정이 무리해 보여도 설명에서는 별도 일정 운영을 제안할 수 있지만, 앱 적용용 순서는 반드시 현재 장소 전부를 한 번씩 포함한 순열이어야 해. 자연스러운 설명을 먼저 작성한 뒤 답변의 맨 마지막 줄에 현재 목록의 번호만 사용해 APP_ORDER= 형식으로 적어줘. 이 마지막 줄에는 다른 설명을 넣지 마. 예: APP_ORDER=${sample}\n현재 일정 번호와 장소는 다음과 같아.\n${mapping}`;
}
function buildAdaptiveSchedulePrompt(q,keys,w){
  const mapping=keys.map((k,i)=>{const p=place(k)||{};return `${i+1}. ${p.name||k} | 분류 ${p.cat||'미분류'} | 체류 ${p.stay||'미정'} | 역할 ${p.role||'없음'} | 참고 ${p.tip||p.desc||'없음'}`;}).join('\n');
  const sample=keys.map((_,i)=>i+1).join('|');
  const c=w?.current;
  const weatherText=c?`${weatherCodeLabel(c.weather_code)}, ${c.temperature_2m}℃, 강수 ${c.precipitation}mm, 관측시각 ${c.time} (베트남 현지)`:'현재 날씨를 불러오지 못함';
  const sameDay=weatherDateMatches(date,w);
  const relevance=c?(sameDay?'선택한 여행 날짜와 같은 날짜의 현재 날씨이므로 현장 판단에 직접 참고해도 됨':'선택한 여행 날짜와 다른 날의 현재 날씨이므로 여행일 예보로 간주하지 말고, 날씨 상황별 배치 원칙을 설명하기 위한 참고값으로만 사용'):'날씨 수치 없이 가족 구성과 장소 특성 중심으로 조정';
  return `${q}\n\n[가족·날씨 맞춤 일정 조정 규칙]\n가족 구성: ${aiFamilyContext()}\n선택한 여행 날짜: ${date}\n날씨 정보: ${weatherText}\n날씨 사용 원칙: ${relevance}\n\n아래 장소의 분류·체류시간·역할·팁을 참고해 가족의 피로, 식사와 휴식, 야외 노출, 이동 부담을 줄이는 순서로 조정해줘. 비·소나기·뇌우가 강하면 실내·식사·휴식 성격 장소를 우선 고려하고 장시간 야외 장소를 뒤로 미루는 원칙을 설명해줘. 더운 날은 한낮 장시간 야외 활동을 연속 배치하지 말고, 맑고 온화한 날은 야외 핵심 장소를 무리 없는 시간대에 배치하는 방향을 설명해줘. 숙소·공항·역·예약처럼 고정 성격이 강한 장소는 의미를 훼손하지 않도록 신중하게 다뤄줘. 데이터에 없는 가족의 건강 상태나 나이는 추정하지 마.\n\n앱에 적용되는 순서는 현재 일정에 있는 장소만 사용해야 해. 새로운 장소를 추가하거나 기존 장소를 빼거나 같은 장소를 중복하지 마. 각 장소를 정확히 한 번씩 포함해. 별도 대안이나 생략 제안은 설명에서만 할 수 있고 앱 적용용 순서에는 현재 장소 전부를 넣어야 해. 자연스러운 설명을 먼저 작성한 뒤 답변 맨 마지막 줄에 현재 목록의 번호만 사용해 APP_ORDER= 형식으로 적어줘. 이 마지막 줄에는 다른 설명을 넣지 마. 예: APP_ORDER=${sample}\n\n현재 일정 번호와 장소 정보:\n${mapping}`;
}
function parseRouteIndexOrder(raw,keys){
  const text=String(raw||'');
  const valid=nums=>{
    if(nums.length!==keys.length||new Set(nums).size!==keys.length)return null;
    if(nums.some(n=>!Number.isInteger(n)||n<1||n>keys.length))return null;
    return nums.map(n=>keys[n-1]);
  };
  const app=[...text.matchAll(/APP_ORDER\s*=\s*([0-9\s|,>\-→➡]+)/gi)].at(-1);
  if(app){const got=valid((app[1].match(/\d+/g)||[]).map(Number));if(got)return got;}
  const idx=[...text.matchAll(/\[\[ROUTE_INDEX:([^\]]+)\]\]/gi)].at(-1);
  if(idx){const got=valid((idx[1].match(/\d+/g)||[]).map(Number));if(got)return got;}
  const json=[...text.matchAll(/\[\s*(\d+(?:\s*,\s*\d+)+)\s*\]/g)].at(-1);
  if(json){const got=valid((json[1].match(/\d+/g)||[]).map(Number));if(got)return got;}
  const pipe=[...text.matchAll(/(?:^|\n)\s*(\d+(?:\s*\|\s*\d+)+)\s*(?=\n|$)/g)].at(-1);
  if(pipe){const got=valid((pipe[1].match(/\d+/g)||[]).map(Number));if(got)return got;}
  return null;
}
function stripRouteMachineLines(text){
  return String(text||'')
    .replace(/^\s*APP_ORDER\s*=.*$/gmi,'')
    .replace(/\n?\[\[ROUTE_INDEX:[^\]]+\]\]\s*/gi,'')
    .replace(/\n?\[\[ROUTE_ORDER:[^\]]+\]\]\s*/gi,'')
    .replace(/\n{3,}/g,'\n\n').trim();
}
function normalizeRouteText(v){
  return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').normalize('NFC').toLowerCase().replace(/[“”‘’'"`]/g,'').replace(/[^a-z0-9가-힣đ]+/g,' ').replace(/\s+/g,' ').trim();
}
function matchRouteTokenToKey(token,keys){
  const n=normalizeRouteText(token);if(!n)return null;
  const exact=keys.filter(k=>{
    const p=place(k),names=[k,p?.name,p?.en].map(normalizeRouteText).filter(Boolean);
    return names.some(name=>n===name||n.includes(name)||name.includes(n));
  });
  if(exact.length===1)return exact[0];
  if(/^(호텔|숙소|리조트|hotel|accommodation)$/.test(n)||/(^| )(호텔|숙소|리조트|hotel)( |$)/.test(n)){
    const stays=keys.filter(k=>place(k)?.cat==='숙소');
    if(stays.length===1)return stays[0];
  }
  return null;
}
function normalizeSuggestedMembers(matched,keys){
  if(!Array.isArray(matched))return null;
  let out=matched.filter(Boolean);
  if(out.length===keys.length+1&&out[0]===out[out.length-1])out=out.slice(0,-1);
  if(out.length>keys.length){
    const counts=new Map();
    keys.forEach(k=>counts.set(k,(counts.get(k)||0)+1));
    const trimmed=[];
    for(const k of out){
      const allowed=counts.get(k)||0,used=trimmed.filter(v=>v===k).length;
      if(used<allowed)trimmed.push(k);
    }
    out=trimmed;
  }
  return sameRouteMembers(keys,out)?out:null;
}
function routeTextBlocks(text){
  const blocks=[];
  const label=/(?:추천|권장)\s*(?:방문\s*)?(?:순서|동선)\s*[:：]?/gi;let m;
  while((m=label.exec(text)))blocks.push(text.slice(m.index+m[0].length));
  blocks.push(...String(text||'').split(/\n{1,}/).filter(v=>/[→➡]|->/.test(v)));
  return blocks;
}
function extractNaturalRouteOrder(content,keys){
  const text=String(content||'');
  for(const block of routeTextBlocks(text)){
    const first=block.trim().split(/\n{2,}/)[0];
    const tokens=first.split(/\s*(?:→|➡|->)\s*/).map(v=>v.replace(/^[-•*\d.\s]+/,'').replace(/[.!。]+$/,'').trim()).filter(Boolean);
    if(tokens.length<2)continue;
    const matched=tokens.map(token=>matchRouteTokenToKey(token,keys));
    const normalized=normalizeSuggestedMembers(matched,keys);
    if(normalized)return normalized;
  }
  // 화살표 파싱이 실패하면 '추천 순서' 이후의 장소명 등장 순서를 사용한다.
  const lm=[...text.matchAll(/(?:추천|권장)\s*(?:방문\s*)?(?:순서|동선)\s*[:：]?/gi)].at(-1);
  const section=normalizeRouteText(lm?text.slice((lm.index||0)+lm[0].length):text);
  if(section){
    const hits=[];
    const stayKeys=keys.filter(k=>place(k)?.cat==='숙소');
    for(const k of keys){
      const p=place(k),candidates=[p?.name,p?.en,k].map(normalizeRouteText).filter(Boolean);
      let pos=-1;
      for(const name of candidates){const i=section.indexOf(name);if(i>=0&&(pos<0||i<pos))pos=i;}
      if(pos<0&&stayKeys.length===1&&stayKeys[0]===k){
        for(const alias of ['호텔','숙소','리조트','hotel']){const i=section.indexOf(alias);if(i>=0&&(pos<0||i<pos))pos=i;}
      }
      if(pos>=0)hits.push([pos,k]);
    }
    if(hits.length===keys.length){
      hits.sort((a,b)=>a[0]-b[0]);
      const normalized=normalizeSuggestedMembers(hits.map(v=>v[1]),keys);
      if(normalized)return normalized;
    }
  }
  return null;
}
function parseRouteSuggestion(answer,snapshot){
  const rawContent=String(answer||'').trim();
  let suggested=parseRouteIndexOrder(rawContent,snapshot.original);
  const matches=[...rawContent.matchAll(/\[\[ROUTE_ORDER:([^\]]+)\]\]/g)];
  if(!suggested&&matches.length){
    const raw=matches.at(-1)[1];
    const parsed=normalizeSuggestedMembers(raw.split('|').map(v=>v.trim()).filter(Boolean),snapshot.original);
    if(parsed&&!parsed.some(k=>!place(k)))suggested=parsed;
  }
  const content=stripRouteMachineLines(rawContent);
  if(!suggested)suggested=extractNaturalRouteOrder(content,snapshot.original);
  return {content:content||'추천 순서를 준비했습니다.',suggestion:{city:snapshot.city,date:snapshot.date,routeKey:snapshot.routeKey,original:[...snapshot.original],suggested:suggested?[...suggested]:null,parseFailed:!suggested,recovered:false,mode:snapshot.mode||'route',weatherUsed:!!snapshot.weatherUsed,weatherMatchesDate:!!snapshot.weatherMatchesDate}};
}
async function recoverRouteSuggestion(endpoint,answer,snapshot){
  const mapping=snapshot.original.map((k,i)=>`${i+1}. ${place(k)?.name||k}`).join('\n');
  const prompt=`아래 여행 조언에서 실제로 제안한 방문 순서를 현재 일정 번호로 변환해줘. 현재 일정의 모든 장소를 정확히 한 번씩 포함해야 하며, 새 장소를 만들거나 빼면 안 돼. 답변은 설명 없이 번호만 | 로 연결한 한 줄이어야 해. 예: 2|1|3\n\n현재 일정:\n${mapping}\n\n분석할 여행 조언:\n${String(answer||'')}`;
  const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(20000),body:JSON.stringify({message:prompt,history:[],context:{appVersion:'11.7.1-route-recovery',currentCity:snapshot.city,currentDate:snapshot.date,currentRoute:snapshot.original.map(place).filter(Boolean)}})});
  if(!r.ok)return null;
  const d=await r.json();
  return parseRouteIndexOrder(d.answer||'',snapshot.original);
}
function aiRouteProposal(m,i){
  const s=m.routeSuggestion;if(!s)return '';
  const target=city===s.city&&date===s.date,adaptive=s.mode==='adaptive';
  const proposalTitle=adaptive?'AI 가족·날씨 맞춤 일정':'AI 추천 동선';
  const proposalMeta=adaptive?`${dateLabel(s.date)} · 맞춤 조정`:dateLabel(s.date);
  const proposalClass=adaptive?'ai-route-proposal adaptive':'ai-route-proposal',retryLabel=adaptive?'맞춤 다시 분석':'동선 다시 분석';
  if(s.parseFailed||!Array.isArray(s.suggested)){
    return `<div class="${proposalClass}"><div class="ai-route-proposal-head"><b>${proposalTitle}</b><small>${esc(proposalMeta)}</small></div><div class="ai-route-compare"><div><small>현재 순서</small><p>${esc(routeNamesFromKeys(s.original))}</p></div><div class="recommended"><small>추천 순서</small><p>AI 답변의 순서를 자동으로 읽지 못했습니다.</p></div></div><p class="ai-route-status">일정은 변경되지 않았습니다. 다시 분석하면 새 형식으로 요청합니다.</p><div class="ai-route-actions"><button class="btn primary" data-ai-retry="${i}" ${target?'':'disabled'}>${retryLabel}</button></div></div>`;
  }
  const current=target?[...route()]:[];
  const unchanged=sameOrder(s.original,s.suggested);
  const applied=target&&!unchanged&&sameOrder(current,s.suggested);
  const canApply=target&&!unchanged&&!applied&&sameOrder(current,s.original);
  let status='';
  if(!target)status='이 추천은 '+s.date.slice(5).replace('-','.')+' 일정용입니다.';
  else if(applied)status=adaptive?'가족·날씨 맞춤 순서가 현재 일정에 반영되었습니다.':'추천 순서가 현재 일정에 반영되었습니다.';
  else if(unchanged)status=adaptive?'가족 구성과 날씨를 고려해도 현재 순서를 유지하는 편을 추천했습니다.':'AI가 현재 순서를 그대로 유지하는 편을 추천했습니다.';
  else if(!sameOrder(current,s.original))status='추천 이후 일정이 변경되었습니다. 다시 분석해 주세요.';
  else if(adaptive&&s.weatherUsed&&!s.weatherMatchesDate)status='현재 날씨는 여행일 예보가 아니므로 참고값으로만 사용했습니다. 장소 추가·삭제 없이 순서만 변경합니다.';
  else if(adaptive&&s.weatherUsed)status='현재 날씨와 가족 구성을 고려한 순서입니다. 장소 추가·삭제 없이 순서만 변경합니다.';
  else if(adaptive)status='가족 구성과 장소 특성을 고려한 순서입니다. 장소 추가·삭제 없이 순서만 변경합니다.';
  else status='장소 추가·삭제 없이 순서만 변경합니다.';
  const undo=target?aiUndoRecord(s.routeKey):null;
  const canUndo=applied&&undo&&sameOrder(undo.after,s.suggested)&&sameOrder(current,undo.after);
  return `<div class="${proposalClass}"><div class="ai-route-proposal-head"><b>${proposalTitle}</b><small>${esc(proposalMeta)}</small></div><div class="ai-route-compare"><div><small>현재 순서</small><p>${esc(routeNamesFromKeys(s.original))}</p></div><div class="recommended"><small>추천 순서</small><p>${esc(routeNamesFromKeys(s.suggested))}</p></div></div><p class="ai-route-status">${esc(status)}</p><div class="ai-route-actions">${applied?`${canUndo?`<button class="btn" data-ai-undo="${i}">이전 순서로 복원</button>`:''}<button class="btn" data-ai-open-schedule="${i}">일정에서 확인</button>`:`<button class="btn primary" data-ai-apply="${i}" ${canApply?'':'disabled'}>${unchanged?'현재 순서 유지':'추천 순서 적용'}</button>`}</div></div>`;
}
function applyAiRoute(index){
  const s=chat[index]?.routeSuggestion;if(!s)return;
  if(city!==s.city||date!==s.date){toast('추천을 받은 날짜의 AI 화면에서 적용해 주세요.');return;}
  const current=[...route()];
  if(sameOrder(current,s.suggested)){toast('이미 추천 순서가 적용되어 있습니다.');return;}
  if(!sameOrder(current,s.original)){toast('현재 일정이 바뀌었습니다. AI 추천을 다시 실행해 주세요.');return;}
  if(!sameRouteMembers(current,s.suggested)){toast('장소 구성이 달라 추천 순서를 적용할 수 없습니다.');return;}
  local.aiUndo[s.routeKey]={before:[...current],after:[...s.suggested],city:s.city,date:s.date,savedAt:new Date().toISOString()};
  local.routes[s.routeKey]=[...s.suggested];
  if(save()){renderChat();toast('AI 추천 순서를 일정에 반영했습니다. 이전 순서도 보관했습니다.');}
}
function aiView(){
  const rows=route().map(place).filter(Boolean),transfer=db.trip.route.find(r=>r.date===date),w=liveWeather?.cityId===city?liveWeather.current:null;
  const routeNames=rows.length?rows.map((p,i)=>`${i+1}. ${esc(p.name)}`).join(' → '):'등록된 일정 없음';
  $('#main').innerHTML=`<div class="heading ai-heading"><div><span class="eyebrow">${cityInfo().nameKo} · ${dateLabel(date)}</span><h1>AI 여행 비서</h1></div><button class="textbtn" id="ai-back">도구로</button></div>
  <div class="ai-context"><div class="ai-context-head"><div><span class="eyebrow">AI가 참고하는 오늘의 정보</span><b>Day ${Number(date.slice(-2))-10} · ${cityInfo().nameKo}</b></div><button class="textbtn ai-weather-btn" id="ai-weather">${w?'날씨 새로고침':'현재 날씨 추가'}</button></div><div class="ai-context-grid"><span><small>가족</small><b>${esc(aiFamilySummary())}</b></span><span><small>일정</small><b>${rows.length}곳</b></span><span class="weather-summary"><small>날씨</small><b>${w?`${esc(weatherCodeLabel(w.weather_code))} · ${esc(w.temperature_2m)}℃`:'미확인'}</b></span></div><p class="ai-route"><b>오늘 동선</b> ${routeNames}</p>${transfer?`<p class="ai-transfer">이동일 · ${esc(placeName(transfer.from))} → ${esc(placeName(transfer.to))}${transfer.note?' · '+esc(transfer.note):''}</p>`:''}</div>
  <div class="ai-quick"><div class="ai-quick-head"><h2>빠르게 물어보기</h2><button class="textbtn" id="ai-clear" ${chat.length?'':'disabled'}>대화 지우기</button></div><div class="ai-chips">${aiQuickActions().map((a,i)=>`<button class="ai-chip ${a.adaptiveOptimization?'adaptive':''}" data-ai-prompt="${i}" ${busy?'disabled':''}>${a.label}</button>`).join('')}</div></div>
  <p class="notice ai-notice">현재 일정·가족 구성·저장 장소를 함께 전달합니다. <b>맞춤 조정</b>은 현재 날씨도 자동 확인하며, 여행일과 날짜가 다르면 예보가 아닌 참고값으로만 사용합니다. 적용 가능한 결과는 비교 카드에서 확인 후 일정에 반영할 수 있습니다.</p>
  <div class="chat" id="chat" aria-live="polite"></div><form class="chat-form" id="chat-form"><input id="question" placeholder="이 동선이 가족에게 무리 없을까?" aria-label="AI 질문" maxlength="700" required><button class="btn primary" id="send" ${busy?'disabled':''}>전송</button></form>
  <details class="section ai-settings"><summary>AI 연결 설정</summary><label class="field"><span>기존 Worker 연결 주소</span><input id="endpoint" type="url"></label><button class="btn" id="endpoint-save">이 기기에 저장</button></details>`;
  $('#ai-back').onclick=()=>go('tools');
  $('#endpoint').value=localStorage.getItem('travelAiEndpoint')||window.TRAVEL_AI_CONFIG?.endpoint||'';
  $('#endpoint-save').onclick=()=>{const v=$('#endpoint').value.trim();try{if(new URL(v).protocol!=='https:')throw Error();localStorage.setItem('travelAiEndpoint',v);toast('연결 주소를 저장했습니다.');}catch{toast('https:// 주소를 확인해 주세요.');}};
  $('#ai-weather').onclick=async()=>{const b=$('#ai-weather');b.disabled=true;b.textContent='확인 중…';try{await fetchWeatherForCity(city);toast('현재 날씨를 AI에 전달할 준비가 됐습니다.');}catch{toast('현재 날씨를 불러오지 못했습니다.');}aiView();};
  $('#ai-clear').onclick=()=>{if(!chat.length)return;chat=[];aiView();toast('AI 대화를 지웠습니다.');};
  document.querySelectorAll('[data-ai-prompt]').forEach(b=>b.onclick=async()=>{const a=aiQuickActions()[+b.dataset.aiPrompt];if(!a)return;if(a.adaptiveOptimization)await sendAdaptiveSchedule(a.question);else sendAIQuestion(a.question,{routeOptimization:!!a.routeOptimization});});
  renderChat();
  $('#chat-form').onsubmit=e=>{e.preventDefault();sendAIQuestion($('#question').value.trim());};
}
async function sendAdaptiveSchedule(q){
  if(busy||!q)return;
  let loaded=weatherFreshForCity(city);
  if(!loaded){
    document.querySelectorAll('#send,[data-ai-prompt]').forEach(b=>b.disabled=true);
    try{await fetchWeatherForCity(city);loaded=true;toast('현재 날씨를 확인해 맞춤 조정에 함께 반영합니다.');}
    catch{toast('현재 날씨를 불러오지 못해 가족 구성과 장소 특성 중심으로 조정합니다.');}
    finally{document.querySelectorAll('#send,[data-ai-prompt]').forEach(b=>b.disabled=false);}
    if($('#main')?.classList.contains('ai-main'))aiView();
  }
  return sendAIQuestion(q,{adaptiveOptimization:true});
}
async function sendAIQuestion(q,options={}){
  if(busy||!q)return;
  const endpoint=localStorage.getItem('travelAiEndpoint')||window.TRAVEL_AI_CONFIG?.endpoint;
  if(!endpoint){toast('AI 연결 주소를 먼저 설정해 주세요.');return;}
  const cid=city,day=date,original=[...route()],rows=original.map(place).filter(Boolean),transfer=db.trip.route.find(r=>r.date===day);
  const adaptive=!!options.adaptiveOptimization,reorder=(!!options.routeOptimization||adaptive)&&original.length>1;
  const weatherForRequest=liveWeather?.cityId===cid?liveWeather:null;
  const snapshot={city:cid,date:day,routeKey:routeKey(),original,mode:adaptive?'adaptive':'route',weatherUsed:!!weatherForRequest,weatherMatchesDate:weatherDateMatches(day,weatherForRequest)};
  const history=chat.slice(-8).map(({role,content})=>({role,content}));
  const wireQuestion=adaptive&&original.length>1?buildAdaptiveSchedulePrompt(q,original,weatherForRequest):(options.routeOptimization&&original.length>1?buildRouteOptimizationPrompt(q,original):q);
  chat.push({role:'user',content:q});
  if($('#question'))$('#question').value='';
  busy=true;
  document.querySelectorAll('#send,[data-ai-prompt]').forEach(b=>b.disabled=true);
  renderChat();
  try{
    const context=buildAIContext({cid,day,rows,transfer,snapshot,weatherForRequest,adaptive});
    const d=await requestAI(endpoint,{message:wireQuestion,history,context},{timeoutMs:adaptive?35000:30000,retryOnce:true});
    if(reorder){
      const parsed=parseRouteSuggestion(d.answer||'',snapshot);
      if(parsed.suggestion.parseFailed){
        try{
          const recovered=await recoverRouteSuggestion(endpoint,d.answer||'',snapshot);
          if(recovered){parsed.suggestion.suggested=[...recovered];parsed.suggestion.parseFailed=false;parsed.suggestion.recovered=true;}
        }catch{}
      }
      chat.push({role:'assistant',content:parsed.content||'표시할 답변이 없습니다.',routeSuggestion:parsed.suggestion});
    }else chat.push({role:'assistant',content:d.answer||'표시할 답변이 없습니다.'});
  }catch(e){
    const detail=e?.status?` (HTTP ${e.status})`:(e?.name==='AbortError'||e?.name==='TimeoutError'?' (응답 시간 초과)':'');
    chat.push({role:'assistant',content:`AI 연결이 일시적으로 실패했습니다${detail}. 자동 재시도도 완료했습니다. 잠시 후 다시 시도해 주세요.`});
  }
  finally{
    busy=false;
    document.querySelectorAll('#send,[data-ai-prompt]').forEach(b=>b.disabled=false);
    renderChat();
  }
}
function renderChat(){
  if(!$('#chat'))return;
  const chatForm=$('#chat-form');
  if(chatForm)chatForm.classList.toggle('has-chat',chat.length>0||busy);
  $('#chat').innerHTML=chat.map((m,i)=>`<div class="chat-message ${m.role==='user'?'user':''}"><div class="bubble ${m.role==='user'?'user':''}">${esc(m.content)}</div>${m.routeSuggestion?aiRouteProposal(m,i):''}${m.role==='assistant'?`<button class="chat-copy" data-chat-copy="${i}">답변 복사</button>`:''}</div>`).join('')+(busy?'<div class="chat-message"><div class="bubble">여행 일정을 살펴보고 있습니다…</div></div>':'');
  document.querySelectorAll('[data-chat-copy]').forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(chat[+b.dataset.chatCopy]?.content||'');toast('AI 답변을 복사했습니다.');}catch{toast('복사가 제한되어 있습니다.');}});
  document.querySelectorAll('[data-ai-apply]').forEach(b=>b.onclick=()=>applyAiRoute(+b.dataset.aiApply));
  document.querySelectorAll('[data-ai-undo]').forEach(b=>b.onclick=()=>{const s=chat[+b.dataset.aiUndo]?.routeSuggestion;if(s)restoreAiRoute(s.routeKey);});
  document.querySelectorAll('[data-ai-retry]').forEach(b=>b.onclick=()=>{const s=chat[+b.dataset.aiRetry]?.routeSuggestion;if(s?.mode==='adaptive')sendAdaptiveSchedule(aiQuickActions().find(a=>a.adaptiveOptimization).question);else sendAIQuestion(aiQuickActions().find(a=>a.routeOptimization).question,{routeOptimization:true});});
  document.querySelectorAll('[data-ai-open-schedule]').forEach(b=>b.onclick=()=>go('schedule'));
}
async function init(){try{const names=['trip','cities','places','itineraries','safety'];const values=await Promise.all(names.map(async n=>{const r=await fetch('data/'+n+'.json');if(!r.ok)throw Error();return r.json();}));db=Object.fromEntries(names.map((n,i)=>[n,values[i]]));const requested=new URLSearchParams(location.search).get('city');if(db.cities.some(c=>c.id===requested))city=requested;date=cityInfo().dates[0];render();if('serviceWorker'in navigator)navigator.serviceWorker.register('./service-worker.js').catch(()=>{});}catch{$('#main').innerHTML='<h1>일정을 불러오지 못했습니다</h1><p>인터넷 연결을 확인하고 다시 열어 주세요. 파일을 직접 열었다면 GitHub Pages 또는 웹 서버에서 실행해 주세요.</p><button class="btn" onclick="location.reload()">다시 시도</button>';}}
init();
