const SYSTEM_PROMPT = `당신은 '2027 베트남 가족여행' 전용 AI 여행 비서다.
전달된 Travel Context를 우리 가족 여행의 기준 데이터로 사용한다.

판단 우선순위:
1. 사용자의 현재 질문과 최근 대화
2. currentRoute: 사용자가 지도에서 실제 편집한 최신 경로
3. plannedItineraries: 저장된 날짜별 원래 계획
4. trip, family, currentCityInfo, cities, cityPlaces, safety

currentRoute와 plannedItineraries가 다르면 currentRoute를 최신 선택으로 본다.
사용자가 승인하지 않은 변경을 이미 변경된 일정처럼 표현하지 말고 제안으로만 말한다.

가족 인원과 아이들의 실제 나이를 적극적으로 고려해 이동 피로, 체류시간, 식사·휴식 간격, 물놀이 뒤 일정 강도를 현실적으로 판단한다.
아이 관련 질문에서는 Travel Context에 연령 정보가 있으면 필요한 경우 '7·8세 아이까지 함께 움직이므로'처럼 실제 연령 근거를 답변에 자연스럽게 드러낸다.
단, 매 답변마다 나이를 기계적으로 반복하지 않는다.
나트랑처럼 여행 구간에 따라 인원이 달라지는 정보도 반드시 반영한다.

confirmed는 확정 정보로 취급한다.
planned_confirmed_structure, 후보, needs_review, recheck_before_trip 등은 확정 사실처럼 단정하지 않는다.
liveWeather가 있으면 그 데이터만 현재·단기 날씨의 근거로 사용한다. fetchedAt, timezone, daily의 날짜를 확인하고 예보 범위를 벗어난 여행 날짜의 실제 날씨를 예측했다고 말하지 않는다. liveWeather가 없으면 현재 날씨를 아는 척하지 않는다. 실시간 영업시간, 실시간 교통, 최신 가격은 조회하지 않는다.
날씨 질문에서는 기온·강수확률·날씨 상태를 가족 구성과 현재 동선에 연결해 실용적으로 판단한다. 비가 온다는 이유만으로 무조건 일정을 취소하지 말고 강수확률과 일정 성격을 함께 본다.

장소 추천은 cityPlaces 안의 후보를 우선한다.
DB 밖의 장소는 '추가 확인이 필요한 일반 제안'이라고 표시한다.
동선 최적화나 한 곳 빼기 요청에는 이유와 추천 순서를 제시하되 지도를 직접 변경했다고 말하지 않는다.
전체 여행 질문이면 여러 도시의 일정과 이동일을 함께 비교한다.

답변은 한국어로, 스마트폰에서 읽기 쉽게 간결하고 실용적으로 작성한다.
Markdown 굵게 표시(**), 제목(#), 코드 표시 문법을 사용하지 말고 일반 텍스트로 작성한다.
핵심 결론을 먼저 말하고 보통 3~6문장 또는 짧은 항목으로 답한다.`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return corsResponse(request, env, null, 204);
    if (request.method !== 'POST' || url.pathname !== '/chat') return corsResponse(request, env, {error:'Not found'}, 404);

    const originCheck = checkOrigin(request, env);
    if (!originCheck.ok) return json({error:'Origin not allowed'}, 403, originCheck.headers);
    if (!env.OPENAI_API_KEY) return json({error:'OPENAI_API_KEY secret is not configured'}, 500, originCheck.headers);

    let body;
    try { body = await request.json(); } catch { return json({error:'Invalid JSON'}, 400, originCheck.headers); }
    const message = String(body?.message || '').trim();
    if (!message) return json({error:'message is required'}, 400, originCheck.headers);
    if (message.length > 700) return json({error:'message is too long'}, 400, originCheck.headers);

    const safeContext = compactContext(body?.context || {});
    const safeHistory = Array.isArray(body?.history) ? body.history.slice(-8).map(x=>({role:x?.role==='assistant'?'assistant':'user',content:String(x?.content||'').slice(0,1200)})) : [];
    const input = `사용자 질문:\n${message}\n\n최근 대화:\n${JSON.stringify(safeHistory, null, 2)}\n\n현재 Travel Context:\n${JSON.stringify(safeContext, null, 2)}`;

    const payload = {
      model: env.OPENAI_MODEL || 'gpt-5.6-luna',
      instructions: SYSTEM_PROMPT,
      input,
      max_output_tokens: 900,
      reasoning: { effort: 'low' }
    };

    let upstream;
    try {
      upstream = await fetch('https://api.openai.com/v1/responses', {
        method:'POST',
        headers:{'Authorization':`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
    } catch (e) {
      return json({error:'OpenAI network error'}, 502, originCheck.headers);
    }

    const data = await upstream.json().catch(()=>({}));
    if (!upstream.ok) {
      console.log('OpenAI error', upstream.status, JSON.stringify(data).slice(0,1200));
      return json({error:`OpenAI API error (${upstream.status})`}, 502, originCheck.headers);
    }
    const answer = extractText(data);
    if (!answer) return json({error:'No text returned from OpenAI'}, 502, originCheck.headers);
    return json({answer,model:data.model||payload.model}, 200, originCheck.headers);
  }
};

function compactContext(c){
  const places = Array.isArray(c.cityPlaces) ? c.cityPlaces.slice(0,60).map(p=>({id:p.id,name:p.name,en:p.en,cat:p.cat||p.category,plan:p.plan,address:p.address,role:p.role,hours:p.hours,stay:p.stay,rating:p.rating,tip:p.tip,desc:p.desc,verificationStatus:p.verificationStatus,verified:p.verified})) : [];
  const route = Array.isArray(c.currentRoute) ? c.currentRoute.slice(0,30).map((r,i)=>({order:i+1,id:r.id,name:r.name,cat:r.cat||r.category,address:r.address,lat:r.lat,lng:r.lng})) : [];
  const plans = Array.isArray(c.plannedItineraries) ? c.plannedItineraries.slice(0,30).map(x=>({
    id:x.id,city:x.city,key:x.key,label:x.label,placeIds:x.placeIds,note:x.note
  })) : [];
  return {
    appVersion:c.appVersion,currentCity:c.currentCity,currentCityName:c.currentCityName,
    trip:c.trip,family:c.family,currentCityInfo:c.currentCityInfo,cities:c.cities,
    currentRoute:route,plannedItineraries:plans,cityPlaces:places,safety:c.safety,liveWeather:c.liveWeather||null
  };
}
function extractText(data){
  if (typeof data?.output_text === 'string' && data.output_text.trim()) return data.output_text.trim();
  const chunks=[];
  for(const item of (data?.output||[])) for(const part of (item?.content||[])) if(part?.type==='output_text' && typeof part.text==='string') chunks.push(part.text);
  return chunks.join('\n').trim();
}
function checkOrigin(request,env){
  const reqOrigin=request.headers.get('Origin')||'';
  const allowed=String(env.ALLOWED_ORIGIN||'').trim().replace(/\/$/,'');
  const headers={'Access-Control-Allow-Origin':allowed||reqOrigin||'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Vary':'Origin'};
  if(allowed && reqOrigin && reqOrigin.replace(/\/$/,'')!==allowed) return {ok:false,headers};
  return {ok:true,headers};
}
function corsResponse(request,env,obj,status){const c=checkOrigin(request,env);return obj===null?new Response(null,{status,headers:c.headers}):json(obj,status,c.headers)}
function json(obj,status=200,extra={}){return new Response(JSON.stringify(obj),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...extra}})}
