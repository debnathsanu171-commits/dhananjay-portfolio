import {originOk,json} from '../_shared.js';
import {secMsGec,TOKEN} from '../_gec.js';
const VOICE={en:'en-IN-PrabhatNeural',hi:'hi-IN-MadhurNeural',bn:'bn-IN-BashkarNeural'};
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
const LEX=[[/\bBiesse\b/gi,'Bee-ess-ay'],[/\bEDGETEQ\b/gi,'Edge-tek'],[/\bSpazio\b/gi,'Spaatsio'],[/\bHDHMR\b/g,'H D H M R'],[/\bMDF\b/g,'M D F'],[/\bPUR\b/g,'P U R'],[/\bEVA\b/g,'E V A'],[/\bBOMs\b/g,'B O Ms'],[/\bBOM\b/g,'B O M'],[/\bPPC\b/g,'P P C'],[/\bQC\b/g,'Q C'],[/\bKDT\b/g,'K D T'],[/\bXML\b/g,'X M L'],[/\bWBBSE\b/g,'W B B S E'],[/\bCTC\b/g,'C T C'],
  [/\bB_?OPTI\b/gi,'B Opti'],[/\bMaxCut\b/g,'Max Cut'],[/\bModGo\b/g,'Mod Go'],[/\bNaadi\b/gi,'Naadi'],[/\bH(?:a|ä)fele\b/gi,'Haefele'],[/\bHettich\b/gi,'Hettikh'],[/\bEbco\b/gi,'Ebco'],[/\bHomag\b/gi,'Hoe-mag'],[/\bSelco\b/gi,'Sel-co'],[/\bAltendorf\b/gi,'Alten-dorf'],[/\bShrichakra\b/gi,'Shree-chakra'],[/\bKutchina\b/gi,'Kutcheena'],
  [/\bJ-(\d{4})\.in\b/gi,'J $1'],[/\bHi-(\d{3})\b/g,'H I $1'],[/\bOptiSaw\b/gi,'Opti Saw'],[/\bOptiEdge\b/gi,'Opti Edge'],[/\bDhananjay\b/gi,'Dhananjay'],[/\b(\d)D\b/g,'$1 D']];
const MODELS=[[/\b1232\b/g,'twelve thirty two'],[/\b3200\b/g,'thirty two hundred'],[/\b4550\b/g,'forty five fifty'],[/\b1440\b/g,'fourteen forty'],[/\bSK ?3\b/g,'S K three'],[/\bF ?45\b/g,'F forty five'],[/\bHi-?700\b/gi,'H I seven hundred'],[/\bHi-?202\b/gi,'H I two oh two'],[/\bHi-?320\b/gi,'H I three twenty'],[/\b3\.2\b/g,'three point two']];
export function normalize(t,lang){
  t=String(t);lang=lang||(/[\u0980-\u09FF]/.test(t)?'bn':/[\u0900-\u097F]/.test(t)?'hi':'en');
  t=t.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/<[^>]+>/g,'').replace(/[*#`~>|^]+/g,'').replace(/(^|\s)_+|_+(\s|$)/g,'$1$2');
  t=t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu,'');
  // pronunciation lexicon (respellings the Edge voices read naturally) before email/url/number handling
  LEX.forEach(([r,x])=>{t=t.replace(r,x)});if(lang==='en')MODELS.forEach(([r,x])=>{t=t.replace(r,x)});
  t=t.replace(/[\w.+-]+@[\w-]+(\.[\w-]+)+/g,e=>' '+spokenEmailish(e,lang)+' ');
  t=t.replace(/\b(?:https?:\/\/)?(?:www\.)?([a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|in|dev|org|net|io|app|co))(\/[^\s,)]*)?/gi,(m,h,p)=>' '+spokenEmailish(h+(p&&p!=='/'?p.replace(/\/$/,''):''),lang)+' ');
  t=t.replace(/(\+?\d[\d\s-]{8,}\d)/g,m=>phone(m,lang));
  // human number rules: 10+ / ranges / dimensions / units
  {const TO={en:' to ',hi:' से ',bn:' থেকে '}[lang],MORE={en:['more than ',''],hi:['',' से ज़्यादा'],bn:['',' এর বেশি']}[lang];
  t=t.replace(/(\d+)\s*\+(?=\s|$|[,.!?)])/g,(m,n)=>MORE[0]+n+MORE[1]);
  t=t.replace(/\b(\d+)\s*[x×]\s*(\d+)\s*(?:ft|feet|foot)\b/gi,(m,a,b)=>a+(lang==='en'?' by ':' x ')+b+(lang==='en'?' feet':lang==='hi'?' फ़ीट':' ফুট'));
  t=t.replace(/\b(\d+)\s*[x×]\s*(\d+)\b/g,(m,a,b)=>a+(lang==='en'?' by ':' x ')+b);
  t=t.replace(/\b(\d{1,3})\s*[-–]\s*(\d{1,3})\b(?!\s*\d)/g,(m,a,b)=>a+TO+b);
  const U={en:{mm:'millimetre',cm:'centimetre',ft:'feet',sqft:'square feet',kg:'kilo',hrs:'hours',hr:'hours'},hi:{mm:'मिलीमीटर',cm:'सेंटीमीटर',ft:'फ़ीट',sqft:'स्क्वेयर फ़ीट',kg:'किलो',hrs:'घंटे',hr:'घंटे'},bn:{mm:'মিলিমিটার',cm:'সেন্টিমিটার',ft:'ফুট',sqft:'স্কোয়ার ফুট',kg:'কেজি',hrs:'ঘণ্টা',hr:'ঘণ্টা'}}[lang];
  t=t.replace(/(\d+(?:\.\d+)?)\s*(mm|cm|ft|kg|hrs?)\b/gi,(m,n,u)=>n+' '+U[u.toLowerCase()]).replace(/(\d+(?:\.\d+)?)\s*(?:sq\.?\s*ft)\b/gi,(m,n)=>n+' '+U.sqft);}
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

const HING=/\b(kya|hai|hain|ka|ki|ke|ko|se|mein|main|mera|meri|mere|aur|nahi|kaise|kitna|unka|unke|woh|wo|yeh|ye|saal|karta|karte|kar|tha|thi|hoon|hun|aap|apna|sab|bhi|toh|par|liye|chahenge|ami|amar|amake|tumi|apni|apnar|ache|achhe|kore|kori|korte|bochor|ebong|kintu|theke|ar|er|e|te|ke|nije|jonno|niye|ki|na|hobe)\b/i;
const TECH=new Set('rover gold optimus edgeteq selco jade akron optisaw optiedge mdf hdhmr eva hettich hafele blum ebco rs inr ctc expectation accommodation month cnc bom ppc qc cv ai 2d 3d xml pur biesse homag jai hunny impex kdt altendorf spazio autocad naadi maxcut excel google sheets chatgpt whatsapp email production manager machine machines software team planning quality control dispatch installation design experience modular furniture factory cut list cutting operator edge banding boring panel saw program programs training interview role roles salary availability contact page details site portfolio operator manufacturing hands-on handle'.split(' '));
export function detect(t,hint){if(/[\u0980-\u09FF]/.test(t))return 'bn';if(/[\u0900-\u097F]/.test(t))return 'hi';if((hint==='hi'||hint==='bn')&&HING.test(t))return hint+'-rom';return 'en'}
// free Google Input Tools transliteration (Roman -> native script), no key
async function tl1(t,lang){const seg=t.split(/([^A-Za-z']+)/);if(seg.length>1)return (await Promise.all(seg.map(x=>/[A-Za-z]/.test(x)?tl0(x,lang):x))).join('');return tl0(t,lang)}
async function tl0(t,lang){try{const r=await fetch('https://inputtools.google.com/request?itc='+lang+'-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8&text='+encodeURIComponent(t));if(r.ok){const d=await r.json();if(d[0]==='SUCCESS'&&d[1]?.[0]?.[1]?.[0])return d[1][0][1][0]}}catch(e){}return t}
// Roman Hinglish/Banglish -> native script, keeping English technical words (and Capitalised names of tools/brands) in Latin
async function translit(t,lang,env){
  const parts=t.split(/(\s+)/),runs=[];let cur=null;
  for(const p of parts){const w=p.replace(/[^A-Za-z0-9-]/g,'').toLowerCase();const keep=!/\S/.test(p)?null:(!/[A-Za-z]/.test(p)||TECH.has(w)||/^[A-Z0-9]{2,}$/.test(p.replace(/[^A-Za-z0-9]/g,'')));
    if(keep===null){(cur||(cur={k:true,s:'',ws:true})).s+=p;continue}
    if(!cur||cur.k!==keep||cur.ws&&cur.k!==keep){if(cur&&cur.ws&&!runs.includes(cur)){cur.k=keep;cur.ws=false;cur.s+=p;runs.push(cur);continue}cur={k:keep,s:p};runs.push(cur)}else cur.s+=p}
  const out=await Promise.all(runs.map(r=>r.k||!/[A-Za-z]/.test(r.s)?r.s:tl1(r.s.trim(),lang).then(x=>(r.s.match(/^\s*/)[0])+x+(r.s.match(/\s*$/)[0]))));
  return out.join('').replace(/\s{2,}/g,' ').trim();
}
const out=(bin,ct,v)=>new Response(bin,{headers:{'content-type':ct,'cache-control':'no-store','x-voice':v}});
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const uid=()=>crypto.randomUUID().replace(/-/g,'');
const ts=()=>new Date().toUTCString().replace('GMT','GMT+0000 (Coordinated Universal Time)');
async function edgeTTS(text,voice,rate,fmt){
  const url='https://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken='+TOKEN+'&ConnectionId='+uid()+'&Sec-MS-GEC='+secMsGec(Date.now()/1000)+'&Sec-MS-GEC-Version=2-143.0.3650.75';
  const r=await fetch(url,{headers:{Upgrade:'websocket',Origin:'chrome-extension://jdiccldimpdaibmpdkjnbmckianbfold','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0',Pragma:'no-cache','Cache-Control':'no-cache',Cookie:'muid='+uid().toUpperCase()+';'}});
  const ws=r.webSocket;if(!ws)throw new Error('ws '+r.status);ws.accept();
  const chunks=[];
  const done=new Promise((res,rej)=>{const to=setTimeout(()=>rej(new Error('timeout')),20000);
    ws.addEventListener('message',e=>{const m=e.data;
      if(typeof m==='string'){if(m.includes('Path:turn.end')){clearTimeout(to);res()}}
      else chunks.push((m instanceof ArrayBuffer?Promise.resolve(m):m.arrayBuffer()).then(ab=>{const u=new Uint8Array(ab);const hl=(u[0]<<8)|u[1];const h=new TextDecoder().decode(u.subarray(2,2+hl));return h.includes('Path:audio')?u.subarray(2+hl):new Uint8Array(0)}))});
    ws.addEventListener('close',()=>{clearTimeout(to);chunks.length?res():rej(new Error('closed'))});ws.addEventListener('error',()=>{clearTimeout(to);rej(new Error('wserr'))});});
  ws.send('X-Timestamp:'+ts()+'\r\nContent-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n{"context":{"synthesis":{"audio":{"metadataoptions":{"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},"outputFormat":"'+fmt+'"}}}}\r\n');
  const ssml="<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='"+voice+"'><prosody pitch='+0Hz' rate='"+rate+"' volume='+0%'>"+esc(text)+"</prosody></voice></speak>";
  ws.send('X-RequestId:'+uid()+'\r\nContent-Type:application/ssml+xml\r\nX-Timestamp:'+ts()+'Z\r\nPath:ssml\r\n\r\n'+ssml);
  await done;try{ws.close()}catch(e){}
  const parts=await Promise.all(chunks);
  const n=parts.reduce((a,c)=>a+c.length,0);if(!n)throw new Error('no audio');const o=new Uint8Array(n);let i=0;for(const c of parts){o.set(c,i);i+=c.length}return o;
}
export async function onRequestPost({request,env}){
  if(!originOk(request))return json({error:'forbidden'},403);
  let b;try{b=await request.json();}catch{return json({error:'bad json'},400);}
  let raw=String(b.text||'').slice(0,600).trim();if(!raw)return json({error:'empty'},400);
  const hint=['en','hi','bn'].includes(b.lang)?b.lang:'en';
  let lang=detect(raw,hint);
  if(lang.endsWith('-rom')){lang=lang.slice(0,2);raw=await translit(raw,lang,env);}
  const text=normalize(raw,lang).slice(0,900);if(!text)return json({error:'empty'},400);
  const voice=VOICE[lang];let err;
  const rate=(/^[+-]\d{1,2}%$/.test(b.rate||'')?b.rate:null)||env.TTS_RATE||'+0%';
  for(const fmt of ['audio-24khz-96kbitrate-mono-mp3','audio-24khz-48kbitrate-mono-mp3','audio-24khz-48kbitrate-mono-mp3']){try{return out(await edgeTTS(text,voice,rate,fmt),'audio/mpeg',voice+';'+fmt)}catch(e){err=String(e.message||e)}}
  return json({error:'tts failed',detail:err,fallback:'speechSynthesis'},502);
}
