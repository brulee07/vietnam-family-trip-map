(()=>{
const CITY={
  da_nang:{name:'다낭',lat:16.0544,lon:108.2022},
  quy_nhon:{name:'꾸이년',lat:13.7820,lon:109.2190},
  tuy_hoa:{name:'뚜이호아',lat:13.0955,lon:109.3209},
  nha_trang:{name:'나트랑',lat:12.2388,lon:109.1967}
};
const codeText=c=>({0:'맑음',1:'대체로 맑음',2:'구름 조금',3:'흐림',45:'안개',48:'안개',51:'이슬비',53:'이슬비',55:'강한 이슬비',61:'약한 비',63:'비',65:'강한 비',71:'약한 눈',73:'눈',75:'강한 눈',80:'소나기',81:'소나기',82:'강한 소나기',95:'뇌우',96:'우박 동반 뇌우',99:'강한 뇌우'}[c]||'날씨');
const memo=new Map();
function cityId(){const f=(location.pathname.split('/').pop()||'').replace('.html','');return CITY[f]?f:(document.body.dataset.city||'hub');}
async function fetchCity(id,force=false){
 const c=CITY[id]; if(!c)return null; const old=memo.get(id);
 if(!force&&old&&Date.now()-old.at<10*60*1000)return old.data;
 const p=new URLSearchParams({latitude:c.lat,longitude:c.lon,timezone:'Asia/Ho_Chi_Minh',current:'temperature_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m',hourly:'temperature_2m,precipitation_probability,weather_code',daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',forecast_days:'7'});
 try{
  const r=await fetch('https://api.open-meteo.com/v1/forecast?'+p.toString(),{cache:'no-store'}); if(!r.ok)throw new Error('weather '+r.status); const d=await r.json();
  const data={provider:'Open-Meteo',fetchedAt:new Date().toISOString(),timezone:d.timezone,cityId:id,cityName:c.name,coordinates:{lat:c.lat,lon:c.lon},current:d.current?{...d.current,weatherText:codeText(d.current.weather_code)}:null,daily:(d.daily?.time||[]).map((date,i)=>({date,weatherCode:d.daily.weather_code?.[i],weatherText:codeText(d.daily.weather_code?.[i]),tempMax:d.daily.temperature_2m_max?.[i],tempMin:d.daily.temperature_2m_min?.[i],precipitationProbabilityMax:d.daily.precipitation_probability_max?.[i]})),hourly:(d.hourly?.time||[]).map((time,i)=>({time,temp:d.hourly.temperature_2m?.[i],precipitationProbability:d.hourly.precipitation_probability?.[i],weatherCode:d.hourly.weather_code?.[i]})).slice(0,72)};
  memo.set(id,{at:Date.now(),data}); return data;
 }catch(e){console.warn('Weather load failed',id,e);return null;}
}
async function load(force=false){
 const id=cityId();
 if(CITY[id])return fetchCity(id,force);
 const rows=await Promise.all(Object.keys(CITY).map(k=>fetchCity(k,force)));
 const cities={}; rows.filter(Boolean).forEach(w=>cities[w.cityId]=w);
 if(!Object.keys(cities).length)return null;
 return {provider:'Open-Meteo',scope:'all_trip_cities',fetchedAt:new Date().toISOString(),cities};
}
window.getTravelWeather=load;
function mount(){
 const id=cityId(); if(!CITY[id])return;
 const box=document.createElement('button'); box.id='travelWeatherChip'; box.type='button'; box.textContent='🌤️ 날씨 불러오는 중'; box.title='Open-Meteo 현재 날씨 · 눌러서 새로고침';
 box.onclick=()=>refresh(true); document.body.appendChild(box);
 async function refresh(force=false){const w=await load(force); if(!w?.current){box.textContent='🌤️ 날씨 확인 불가';return;} const x=w.current; box.textContent=`${x.weatherText} · ${Math.round(x.temperature_2m)}℃ · 강수 ${x.precipitation??0}mm`;}
 refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
