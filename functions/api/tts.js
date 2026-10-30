import {originOk,json} from '../_shared.js';
export async function onRequestPost({request,env}){
  if(!originOk(request))return json({error:'forbidden'},403);
  let b;try{b=await request.json();}catch{return json({error:'bad json'},400);}
  const text=String(b.text||'').slice(0,500).trim(); if(!text)return json({error:'empty'},400);
  const lang=/[\u0980-\u09FF]/.test(text)?'bn-IN':/[\u0900-\u097F]/.test(text)?'hi-IN':'en-IN';
  const r=await fetch('https://api.sarvam.ai/text-to-speech',{method:'POST',headers:{'api-subscription-key':env.SARVAM_API_KEY,'content-type':'application/json'},body:JSON.stringify({inputs:[text],target_language_code:lang,model:'bulbul:v3',speaker:'priya'})});
  if(!r.ok)return json({error:'upstream',status:r.status},502);
  const d=await r.json(); const a=d.audios?.[0]; if(!a)return json({error:'no audio'},502);
  const bin=Uint8Array.from(atob(a),c=>c.charCodeAt(0));
  return new Response(bin,{headers:{'content-type':'audio/wav','cache-control':'no-store'}});
}
