const SYSTEM_PROMPT = `당신은 2027년 베트남 가족여행 전용 AI 여행 비서다.
사용자가 제공한 여행 데이터와 현재 지도 경로를 최우선 사실로 사용한다.
답변은 한국어로 간결하고 실용적으로 작성한다.
가족 구성, 아이들의 나이, 이동 피로, 숙소 기준점, 현재 경로 순서를 고려한다.
확정 정보와 후보 정보를 구분한다. 데이터에 '여행 전 재확인', 'needs_review' 등의 표시가 있으면 확정 사실처럼 말하지 않는다.
현재 날씨, 실시간 영업시간, 실시간 교통, 가격 등 외부 최신 정보는 이 버전에서 조회할 수 없으므로, 사용자 데이터에 없는 최신 사실을 아는 척하지 않는다.
현재 경로가 있으면 사용자가 묻는 동선 평가에 반드시 반영한다.
장소 추천은 전달된 장소 DB 안의 후보를 우선 사용하고, DB 밖의 장소를 제안할 때는 '추가 확인이 필요한 일반 제안'임을 명시한다.
답변은 보통 3~7문장 또는 짧은 항목으로 작성하고, 불필요하게 장황하게 쓰지 않는다.`;

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
  return {appVersion:c.appVersion,currentCity:c.currentCity,currentCityName:c.currentCityName,trip:c.trip,cities:c.cities,currentRoute:route,cityPlaces:places,safety:c.safety};
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
