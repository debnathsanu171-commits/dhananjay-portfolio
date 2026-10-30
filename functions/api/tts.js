import {originOk,json} from '../_shared.js';
const D=['zero','one','two','three','four','five','six','seven','eight','nine'];
const speakSym=s=>s.replace(/\./g,' dot ').replace(/@/g,' at ').replace(/[-_]/g,m=>m==='-'?' dash ':' underscore ').replace(/\//g,' slash ');
export function normalize(t){
  t=String(t);
  t=t.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/[*#`~>|]+/g,'').replace(/(^|\s)_+|_+(\s|$)/g,'$1$2');
  t=t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu,'');
  // emails
  t=t.replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g,e=>speakSym(e.toLowerCase()));
  // urls
  t=t.replace(/\b(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|in|dev|org|net|io|app|co))(\/[^\s,)]*)?/gi,(m,h,p)=>speakSym(h.toLowerCase()+(p&&p!=='/'?p.replace(/\/$/,''):'')));
  // phone numbers: +91 77976 91585 style
  t=t.replace(/(\+?\d[\d\s-]{8,}\d)/g,m=>{const d=m.replace(/\D/g,'');if(d.length<10)return m;let cc='';let n=d;if(m.trim().startsWith('+')&&d.length>10){cc='plus '+d.slice(0,d.length-10).split('').map(x=>D[x]).join(' ')+', ';n=d.slice(-10);}return cc+n.slice(0,5).split('').map(x=>D[x]).join(' ')+', '+n.slice(5).split('').map(x=>D[x]).join(' ');});
  // currency
  t=t.replace(/(?:₹|\bRs\.?|\bINR)\s*([\d,]+(?:\.\d+)?)(?:\s*(lakh|lakhs|thousand)\b)?/gi,(m,n,u)=>n+(u?' '+u:'')+' rupees');
  // ALL CAPS words (4+ letters) -> Title case, keep known acronyms
  const keep=new Set(['CNC','BOM','BOMS','PPC','HR','CTC','PUR','QC','CV','AI','2D','3D','XML','WBBSE']);
  t=t.replace(/\b[A-Z]{4,}\b/g,w=>keep.has(w)?w:w[0]+w.slice(1).toLowerCase());
  return t.replace(/\s{2,}/g,' ').replace(/\s+([,.])/g,'$1').trim();
}
const b64=a=>Uint8Array.from(atob(a),c=>c.charCodeAt(0));
const wav=bin=>new Response(bin,{headers:{'content-type':'audio/wav','cache-control':'no-store'}});
export async function onRequestPost({request,env}){
  if(!originOk(request))return json({error:'forbidden'},403);
  let b;try{b=await request.json();}catch{return json({error:'bad json'},400);}
  const text=normalize(String(b.text||'').slice(0,500)); if(!text)return json({error:'empty'},400);
  const lang=/[\u0980-\u09FF]/.test(text)?'bn-IN':/[\u0900-\u097F]/.test(text)?'hi-IN':'en-IN';
  if(env.SARVAM_VOICE_ID){
    try{
      const f=new FormData();f.append('text',text);f.append('voice_id',env.SARVAM_VOICE_ID);f.append('language_code',lang);
      const r=await fetch('https://api.sarvam.ai/voices/clone',{method:'POST',headers:{'api-subscription-key':env.SARVAM_API_KEY},body:f});
      if(r.ok){const d=await r.json();if(d.audio_b64){const res=wav(b64(d.audio_b64));res.headers.set('x-voice','clone');return res;}}
    }catch(e){}
  }
  const r=await fetch('https://api.sarvam.ai/text-to-speech',{method:'POST',headers:{'api-subscription-key':env.SARVAM_API_KEY,'content-type':'application/json'},body:JSON.stringify({inputs:[text],target_language_code:lang,model:'bulbul:v3',speaker:'priya'})});
  if(!r.ok)return json({error:'upstream',status:r.status},502);
  const d=await r.json(); const a=d.audios?.[0]; if(!a)return json({error:'no audio'},502);
  const res=wav(b64(a));res.headers.set('x-voice','priya');return res;
}
