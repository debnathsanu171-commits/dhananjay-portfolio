import {originOk,json} from '../_shared.js';
const PACE=1.0, QC=true, SPEAKER='shubh';
const DG={en:['zero','one','two','three','four','five','six','seven','eight','nine'],
hi:['शून्य','एक','दो','तीन','चार','पाँच','छह','सात','आठ','नौ'],
bn:['শূন্য','এক','দুই','তিন','চার','পাঁচ','ছয়','সাত','আট','নয়']};
const EW={hi:{debnath:'देबनाथ',official:'ऑफिशियल',at:'एट',gmail:'जीमेल',dot:'डॉट',com:'कॉम',in:'इन',dash:'डैश',underscore:'अंडरस्कोर',slash:'स्लैश',debnathofficial:'देबनाथ ऑफिशियल',pages:'पेजेस',dev:'डेव'},
bn:{debnath:'দেবনাথ',official:'অফিশিয়াল',at:'অ্যাট',gmail:'জিমেইল',dot:'ডট',com:'কম',in:'ইন',dash:'ড্যাশ',underscore:'আন্ডারস্কোর',slash:'স্ল্যাশ',pages:'পেজেস',dev:'ডেভ'}};
const ED={en:DG.en,hi:['ज़ीरो','वन','टू','थ्री','फ़ोर','फ़ाइव','सिक्स','सेवन','एट','नाइन'],bn:['জিরো','ওয়ান','টু','থ্রি','ফোর','ফাইভ','সিক্স','সেভেন','এইট','নাইন']};
const KNOWN=['debnath','official','dhananjay','sanu','pages','gmail','yahoo','outlook','hotmail','mail','info','contact'];
const ONES=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const TENS=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
function w99(n){return n<20?ONES[n]:TENS[Math.floor(n/10)]+(n%10?' '+ONES[n%10]:'')}
function w999(n){const h=Math.floor(n/100),r=n%100;return (h?ONES[h]+' hundred'+(r?' ':''):'')+(r||!h?w99(r):'')}
export function enNum(n){n=Math.round(n);if(n===0)return 'zero';const p=[];
  const cr=Math.floor(n/1e7);n%=1e7;const lk=Math.floor(n/1e5);n%=1e5;const th=Math.floor(n/1e3);n%=1e3;
  if(cr)p.push(enNum(cr)+' crore');if(lk)p.push(w99(lk)+' lakh');if(th)p.push(w99(th)+' thousand');if(n)p.push(w999(n));return p.join(' ')}
function enYear(y){if(y>=2000&&y<2010)return 'two thousand'+(y%100?' '+ONES[y%100]:'');return w99(Math.floor(y/100))+' '+(y%100===0?'hundred':y%100<10?'oh '+ONES[y%100]:w99(y%100))}
function splitWord(s){ // greedy known-word split of a joined lowercase word
  const out=[];let i=0;while(i<s.length){let m=KNOWN.filter(k=>s.startsWith(k,i)).sort((a,b)=>b.length-a.length)[0];
    if(m){out.push(m);i+=m.length;}else{let j=i+1;while(j<s.length&&!KNOWN.some(k=>s.startsWith(k,j)))j++;out.push(s.slice(i,j));i=j;}}
  return out}
function spokenEmailish(s,lang){ // s like debnathofficial07@gmail.com or site.pages.dev
  const toks=[];s.toLowerCase().split(/([@._\/-])/).forEach(p=>{if(!p)return;
    if(p==='@')toks.push('at');else if(p==='.')toks.push('dot');else if(p==='_')toks.push('underscore');else if(p==='-')toks.push('dash');else if(p==='/')toks.push('slash');
    else p.split(/(\d+)/).forEach(q=>{if(!q)return;if(/^\d+$/.test(q))q.split('').forEach(d=>toks.push(ED[lang][d]));else splitWord(q).forEach(x=>toks.push(x));});});
  return toks.map(t=>(EW[lang]&&EW[lang][t])||t).join(' ')}
function phone(m,lang){const d=m.replace(/\D/g,'');if(d.length<10||d.length>13)return m;const D=DG[lang];
  const sp=x=>x.split('').map(c=>D[c]).join(' ');let cc='';let n=d;if(d.length>10){cc=(lang==='en'?'plus ':'प्लस ')+sp(d.slice(0,d.length-10))+', ';if(lang==='bn')cc=cc.replace('प्लस','প্লাস');n=d.slice(-10)}
  return ' '+cc+sp(n.slice(0,5))+', '+sp(n.slice(5))+', '}
const AB={en:[[/\bPvt\.?\s*Ltd\.?/gi,'Private Limited'],[/\bPvt\.?/gi,'Private'],[/\bLtd\.?/gi,'Limited'],[/\be\.g\.?/gi,'for example'],[/\bi\.e\.?/gi,'that is'],[/\betc\.?/gi,'etcetera'],[/\bJan\b\.?/g,'January'],[/\bFeb\b\.?/g,'February'],[/\bMar\b\.?/g,'March'],[/\bApr\b\.?/g,'April'],[/\bAug\b\.?/g,'August'],[/\bSept?\b\.?/g,'September'],[/\bOct\b\.?/g,'October'],[/\bNov\b\.?/g,'November'],[/\bDec\b\.?/g,'December'],[/\bvs\.?/gi,'versus'],[/\bapprox\.?/gi,'approximately'],[/\bno\.\s*(?=\d)/gi,'number '],[/\byrs?\b\.?/gi,'years']]};
export function normalize(t,lang){
  t=String(t);lang=lang||(/[\u0980-\u09FF]/.test(t)?'bn':/[\u0900-\u097F]/.test(t)?'hi':'en');
  t=t.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/<[^>]+>/g,'').replace(/[*#`~>|^]+/g,'').replace(/(^|\s)_+|_+(\s|$)/g,'$1$2');
  t=t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu,'');
  t=t.replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g,e=>' '+spokenEmailish(e,lang)+' ');
  t=t.replace(/\b(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|in|dev|org|net|io|app|co))(\/[^\s,)]*)?/gi,(m,h,p)=>' '+spokenEmailish(h+(p&&p!=='/'?p.replace(/\/$/,''):''),lang)+' ');
  t=t.replace(/(\+?\d[\d\s-]{8,}\d)/g,m=>phone(m,lang));
  // year ranges and dash ranges
  t=t.replace(/\b((?:19|20)\d\d)\s*[-–—]\s*((?:19|20)\d\d|present|now)\b/gi,(m,a,b)=>a+(lang==='en'?' to ':lang==='hi'?' से ':' থেকে ')+b);
  t=t.replace(/\s[-–—]\s/g,', ').replace(/[–—]/g,', ');
  (AB[lang]||[]).concat(lang==='en'?[]:AB.en.slice(0,3)).forEach(([r,s])=>t=t.replace(r,s));
  // currency
  const RU={en:'rupees',hi:'रुपये',bn:'টাকা'}[lang];
  t=t.replace(/(?:₹|\bRs\.?|\bINR)\s*([\d,]+(?:\.\d+)?)(?:\s*(lakhs?|thousand|k)\b)?/gi,(m,n,u)=>n+(u?' '+(u.toLowerCase()==='k'?'thousand':u):'')+' '+RU);
  t=t.replace(/(\d)\s*%/g,'$1'+({en:' percent',hi:' प्रतिशत',bn:' শতাংশ'}[lang]));
  t=t.replace(/&/g,{en:' and ',hi:' और ',bn:' ও '}[lang]).replace(/\+/g,{en:' plus ',hi:' प्लस ',bn:' প্লাস '}[lang]).replace(/@/g,' at ');
  // numbers
  t=t.replace(/\b\d{1,3}(?:,\d{2,3})+\b|\b\d+(?:\.\d+)?\b/g,m=>{const n=parseFloat(m.replace(/,/g,''));
    if(lang!=='en')return String(n);
    if(/^(1[89]|20)\d\d$/.test(m))return enYear(n);
    if(m.includes('.')){const [a,b]=m.split('.');return enNum(+a)+' point '+b.split('').map(d=>ONES[d]).join(' ')}
    return enNum(n)});
  t=t.replace(/\b(\d+)D\b/g,'$1 D');
  const keep=new Set(['CNC','BOM','BOMS','PPC','HR','CTC','PUR','QC','CV','AI','XML','WBBSE','KDT']);
  t=t.replace(/\b[A-Z]{4,}\b/g,w=>keep.has(w)?w:w[0]+w.slice(1).toLowerCase());
  t=t.replace(/[(){}\[\]"“”'‘’]/g,' ').replace(/\s*\/\s*/g,lang==='en'?' or ':' / ').replace(/[;:]/g,',').replace(/\.{2,}|…/g,'.');
  return t.replace(/\s{2,}/g,' ').replace(/\s+([,.।?!])/g,'$1').replace(/,\s*([,.।?!])/g,'$1').replace(/^[,\s]+/,'').trim();
}
const b64=a=>Uint8Array.from(atob(a),c=>c.charCodeAt(0));
const HING=/\b(kya|hai|hain|ka|ki|ke|ko|se|mein|aur|nahi|kaise|kitna|unka|unke|woh|yeh|saal|karte|kar|tha|thi|hoon|hun|aap|ami|amar|tumi|apni|ache|achhe|kore|korte|bochor|ebong|kintu|theke)\b/i;
export function detect(t,hint){if(/[\u0980-\u09FF]/.test(t))return 'bn';if(/[\u0900-\u097F]/.test(t))return 'hi';if((hint==='hi'||hint==='bn')&&HING.test(t))return hint+'-rom';return 'en'}
async function translit(t,lang,env){try{const r=await fetch('https://api.sarvam.ai/transliterate',{method:'POST',headers:{'api-subscription-key':env.SARVAM_API_KEY,'content-type':'application/json'},body:JSON.stringify({input:t,source_language_code:'en-IN',target_language_code:lang+'-IN'})});if(r.ok){const d=await r.json();if(d.transliterated_text)return d.transliterated_text}}catch(e){}return t}
const out=(bin,ct,v)=>new Response(bin,{headers:{'content-type':ct,'cache-control':'no-store','x-voice':v}});
export async function onRequestPost({request,env}){
  if(!originOk(request))return json({error:'forbidden'},403);
  let b;try{b=await request.json();}catch{return json({error:'bad json'},400);}
  let raw=String(b.text||'').slice(0,600).trim();if(!raw)return json({error:'empty'},400);
  const hint=['en','hi','bn'].includes(b.lang)?b.lang:'en';
  let lang=detect(raw,hint);
  if(lang.endsWith('-rom')){lang=lang.slice(0,2);raw=await translit(raw,lang,env);}
  const text=normalize(raw,lang).slice(0,900);if(!text)return json({error:'empty'},400);
  const lc=lang+'-IN';
  if(env.USE_CLONE==='1'&&env.SARVAM_VOICE_ID){ // clone path disabled by default
    try{
      const f=new FormData();f.append('text',text);f.append('voice_id',env.SARVAM_VOICE_ID);f.append('language_code',lc);f.append('pace',String(env.TTS_PACE||PACE));
      f.append('output_audio_codec','wav');f.append('speech_sample_rate','24000');f.append('enable_text_normalization','true');if(QC)f.append('enable_qc','true');
      const r=await fetch('https://api.sarvam.ai/voices/clone',{method:'POST',headers:{'api-subscription-key':env.SARVAM_API_KEY},body:f});
      if(r.ok){const d=await r.json();if(d.audio_b64)return out(b64(d.audio_b64),'audio/wav','clone');}
    }catch(e){}
  }
  const r=await fetch('https://api.sarvam.ai/text-to-speech',{method:'POST',headers:{'api-subscription-key':env.SARVAM_API_KEY,'content-type':'application/json'},body:JSON.stringify({inputs:[text],target_language_code:lc,model:'bulbul:v3',speaker:env.TTS_SPEAKER||SPEAKER,pace:Number(env.TTS_PACE||PACE),temperature:0.5,speech_sample_rate:24000,output_audio_codec:'wav'})});
  if(!r.ok)return json({error:'upstream',status:r.status},502);
  const d=await r.json(); const a=d.audios?.[0]; if(!a)return json({error:'no audio'},502);
  return out(b64(a),'audio/wav',env.TTS_SPEAKER||SPEAKER);
}
