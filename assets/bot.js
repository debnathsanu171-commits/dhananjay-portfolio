(function(){
if(window.__ddb)return;window.__ddb=1;
var C='#455CE9',D='#1C1D20',W='917797691585',EM='debnathofficial07@gmail.com',CV='resume.pdf';
var SRC=(document.currentScript&&document.currentScript.src)||location.origin+'/assets/bot.js',BASE=SRC.replace(/[^\/]*$/,''),POSTER=BASE+'img/avatar3d-poster.png?v=3';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches,MOB=function(){return innerWidth<600};
var css='#ddb{font:14px/1.45 Inter,system-ui,-apple-system,Segoe UI,sans-serif;color:'+D+'}'
+'#ddb button{font:inherit}#ddb em{font-style:normal}#ddb :focus-visible{outline:2px solid '+C+';outline-offset:2px}'
+'#ddb .host{position:relative}#ddb .host img.pst,#ddb .host canvas{position:absolute;inset:0;width:100%!important;height:100%!important;object-fit:contain;display:block;transition:opacity .25s}#ddb .host canvas{opacity:0}#ddb .host.live canvas{opacity:1}#ddb .host.live img.pst{opacity:0}'
+'#ddb .comp{position:fixed;right:10px;bottom:8px;z-index:9000;width:104px;height:196px;transition:opacity .3s,transform .3s}#ddb.o .comp{opacity:0;visibility:hidden;transform:translateY(20px)}'
+'#ddb .stage{position:absolute;inset:0;border:0;background:none;padding:0;cursor:pointer;-webkit-tap-highlight-color:transparent}#ddb .stage .host{position:absolute;inset:0}'
+'#ddb .stage:after{content:"";position:absolute;left:18%;right:18%;bottom:2px;height:10px;border-radius:50%;background:radial-gradient(rgba(0,0,0,.28),transparent 70%);z-index:-1}'
+'#ddb .mb{position:absolute;right:2px;top:38%;width:30px;height:30px;border-radius:50%;background:'+C+';color:#fff;display:grid;place-items:center;box-shadow:0 3px 10px rgba(28,29,32,.3);pointer-events:none}#ddb .comp.lsn .mb{background:#E5484D;animation:ddpu 1s infinite}'
+'#ddb .bb{position:absolute;left:-30px;bottom:6px;width:38px;height:38px;border-radius:50%;background:#fff;border:1.5px solid '+C+';color:'+C+';cursor:pointer;box-shadow:0 4px 12px rgba(28,29,32,.22);padding:0;display:grid;place-items:center}'
+'#ddb .dot{position:absolute;top:-2px;right:-2px;width:11px;height:11px;border-radius:50%;background:#E5484D;border:2px solid #fff;display:none}#ddb.un .dot{display:block}'
+'#ddb .bub{position:absolute;right:6px;bottom:100%;margin-bottom:4px;width:max-content;max-width:min(240px,calc(100vw - 30px));background:#fff;border:1px solid #E3E6F8;border-radius:14px 14px 4px 14px;padding:7px 11px;font-size:13px;box-shadow:0 8px 24px rgba(28,29,32,.18);opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s;pointer-events:none}#ddb .bub.on{opacity:1;transform:none;pointer-events:auto}'
+'#ddb .cd{position:fixed;right:18px;bottom:18px;z-index:9001;width:360px;max-width:calc(100vw - 20px);background:#fff;border:1px solid #E3E3E3;border-radius:18px;box-shadow:0 14px 40px rgba(28,29,32,.2);display:flex;flex-direction:column;overflow:hidden;transform-origin:100% 100%;transform:scale(.6) translateY(20px);opacity:0;visibility:hidden;transition:transform .32s cubic-bezier(.2,.9,.3,1.2),opacity .2s,visibility 0s .32s}'
+'#ddb.o .cd{transform:none;opacity:1;visibility:visible;transition:transform .32s cubic-bezier(.2,.9,.3,1.2),opacity .2s}'
+'#ddb .hd{position:relative;display:flex;align-items:flex-end;gap:8px;padding:6px 12px 0;background:linear-gradient(180deg,#E9ECFD,#F6F7FE);border-bottom:1px solid #E3E6F8}'
+'#ddb .hd .host{width:118px;height:200px;flex:none}'
+'#ddb .ti{flex:1;padding-bottom:14px}#ddb .ti b{display:block;font-size:15px}#ddb .ti small{color:#5B5E66;font-style:normal;display:flex;align-items:center;gap:5px}#ddb .ti small i{width:8px;height:8px;border-radius:50%;background:#2BB673;display:inline-block}'
+'#ddb .ait{display:inline-block;vertical-align:2px;margin-left:4px;font-size:9.5px;font-weight:700;letter-spacing:.04em;color:#fff;background:'+C+';border-radius:5px;padding:1px 5px}'
+'#ddb .tb{position:absolute;top:8px;right:8px;display:flex;gap:2px}#ddb .tb button{background:none;border:0;cursor:pointer;color:'+D+';font-size:15px;padding:4px 7px;border-radius:8px}#ddb .tb button:hover{background:#fff}'
+'#ddb .dlg{display:flex;gap:4px;margin-top:6px}#ddb .dlg button{border:1px solid #C9CDEF;background:#fff;border-radius:999px;padding:1px 8px;font-size:12px;cursor:pointer}#ddb .dlg button[aria-pressed=true]{background:'+C+';border-color:'+C+';color:#fff}'
+'#ddb .ms{height:230px;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;scroll-behavior:smooth}'
+'#ddb .m{padding:8px 11px;border-radius:14px;max-width:88%;white-space:pre-wrap;animation:ddin .25s ease-out}@keyframes ddin{from{opacity:0;transform:translateY(6px)}}'
+'#ddb .m.b{background:#F2F3F7;align-self:flex-start;border-bottom-left-radius:4px}#ddb .m.u{background:'+C+';color:#fff;align-self:flex-end;border-bottom-right-radius:4px}'
+'#ddb .ty span{display:inline-block;width:7px;height:7px;margin:0 2px;border-radius:50%;background:#8A8D96;animation:ddty 1s infinite}#ddb .ty span:nth-child(2){animation-delay:.15s}#ddb .ty span:nth-child(3){animation-delay:.3s}@keyframes ddty{30%{transform:translateY(-5px);opacity:.5}}'
+'#ddb .dcd{align-self:stretch;border:1px solid #E3E6F8;border-radius:12px;padding:10px;background:#fff;animation:ddin .3s ease-out;font-size:13px}#ddb .dcd h4{margin:0 0 6px;font-size:13px;color:'+C+'}'
+'#ddb .tl{list-style:none;margin:0;padding:0 0 0 12px;border-left:2px solid #DDE1FB}#ddb .tl li{position:relative;margin:0 0 6px}#ddb .tl li:before{content:"";position:absolute;left:-17px;top:5px;width:8px;height:8px;border-radius:50%;background:'+C+'}#ddb .tl small{color:#5B5E66;display:block}'
+'#ddb .pl{display:flex;flex-wrap:wrap;gap:4px}#ddb .pl span{background:#EEF0FD;color:#2E3A9C;border-radius:999px;padding:2px 8px;font-size:12px}'
+'#ddb .ac{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}#ddb .ac a,#ddb .ac button{display:inline-flex;align-items:center;gap:4px;text-decoration:none;border-radius:999px;padding:5px 11px;font-size:12.5px;cursor:pointer;border:1px solid '+C+';background:'+C+';color:#fff}#ddb .ac .g{background:#fff;color:'+C+'}#ddb .ac .wa{background:#1FA855;border-color:#1FA855}'
+'#ddb .sp{align-self:flex-start;font-size:12px;border:0;background:none;color:'+C+';cursor:pointer;padding:0 4px;text-decoration:underline}'
+'#ddb .dch{display:flex;gap:6px;padding:0 12px 8px;overflow-x:auto;scrollbar-width:none}#ddb .dch button{flex:none;border:1px solid '+C+';color:'+C+';background:#fff;border-radius:999px;padding:5px 11px;font-size:12.5px;cursor:pointer;transition:background .2s,color .2s}#ddb .dch button:hover{background:'+C+';color:#fff}'
+'#ddb form{display:flex;align-items:center;border-top:1px solid #E3E3E3;padding:4px}#ddb input{flex:1;border:0;padding:9px 8px;font:inherit;outline:0;min-width:0;background:none}'
+'#ddb form button{border:0;background:'+C+';color:#fff;width:38px;height:38px;border-radius:50%;cursor:pointer;display:grid;place-items:center;margin-left:4px}#ddb form .mic{background:#EEF0FD;color:'+C+'}#ddb form .mic.on{background:#E5484D;color:#fff;animation:ddpu 1s infinite}@keyframes ddpu{50%{box-shadow:0 0 0 7px rgba(229,72,77,.2)}}'
+'#ddb .bk2{position:fixed;left:12px;bottom:14px;z-index:9000;background:'+D+';color:#fff;border:0;border-radius:999px;padding:7px 13px;font-size:13px;cursor:pointer;display:none;box-shadow:0 6px 18px rgba(0,0,0,.25)}#ddb.bkv .bk2{display:block}'
+'.ddhl{animation:ddhl 1.6s ease-out;border-radius:14px}@keyframes ddhl{0%,60%{box-shadow:0 0 0 3px '+C+',0 0 0 10px rgba(69,92,233,.18)}100%{box-shadow:0 0 0 0 rgba(69,92,233,0)}}'
+'@media(prefers-reduced-motion:reduce){#ddb *{animation:none!important;transition:none!important}}'
+'@media(max-width:600px){#ddb .comp{right:2px;bottom:4px;width:66px;height:124px}#ddb.scr .comp{opacity:.35}#ddb .mb{width:24px;height:24px;right:-2px}#ddb .mb svg{width:13px;height:13px}#ddb .bb{left:-26px;width:32px;height:32px;bottom:2px}#ddb .bub{font-size:12.5px}#ddb .cd{right:10px;bottom:10px}#ddb .ms{height:auto;max-height:32vh;min-height:110px}#ddb .hd .host{width:80px;height:136px}#ddb .bk2{bottom:10px;left:10px;padding:6px 11px;font-size:12px}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var L={en:{g:"Hi, I'm Dhananjay Debnath, a Production Manager with ten years in modular furniture production. What would you like to know about my work?",ph:'Ask about my experience…',st:'Online · AI version',chips:{start:['Experience','Machines','Software','Management skills','Salary & availability','Why hire me?','Contact'],experience:['Machines','Management skills','Why hire me?','Schedule interview'],machines:['Software','Experience','Schedule interview'],software:['Machines','Management skills','Contact'],management:['Experience','Salary & availability','Schedule interview'],salary:['Schedule interview','Contact','Why hire me?'],contact:['Experience','Why hire me?']},si:'Hi Dhananjay, I saw your portfolio and would like to schedule an interview for a Production Manager role. When are you available?',hint:'',show:'Show on page ↗',back:'Back to chat'},
hi:{g:'नमस्ते, मैं धनंजय देबनाथ हूँ। मॉड्यूलर फर्नीचर प्रोडक्शन में मेरे पास दस साल का अनुभव है। आप मेरे काम के बारे में क्या जानना चाहेंगे?',ph:'मेरे अनुभव के बारे में पूछें…',st:'ऑनलाइन · AI वर्ज़न',chips:{start:['अनुभव','मशीनें','सॉफ्टवेयर','मैनेजमेंट स्किल्स','सैलरी और उपलब्धता','मुझे क्यों चुनें?','संपर्क']},si:'नमस्ते धनंजय, मैंने आपका पोर्टफोलियो देखा। प्रोडक्शन मैनेजर रोल के लिए इंटरव्यू शेड्यूल करना चाहते हैं। आप कब उपलब्ध हैं?',hint:' (Please reply in Hindi, Devanagari script.)',show:'पेज पर दिखाएँ ↗',back:'चैट पर वापस'},
bn:{g:'নমস্কার, আমি ধনঞ্জয় দেবনাথ। মডুলার ফার্নিচার প্রোডাকশনে আমার দশ বছরের অভিজ্ঞতা আছে। আমার কাজ সম্পর্কে কী জানতে চান?',ph:'আমার অভিজ্ঞতা সম্পর্কে জিজ্ঞাসা করুন…',st:'অনলাইন · AI ভার্সন',chips:{start:['অভিজ্ঞতা','মেশিন','সফটওয়্যার','ম্যানেজমেন্ট স্কিল','বেতন ও প্রাপ্যতা','কেন আমাকে নেবেন?','যোগাযোগ']},si:'নমস্কার ধনঞ্জয়, আপনার পোর্টফোলিও দেখেছি। প্রোডাকশন ম্যানেজার পদের জন্য ইন্টারভিউ নিতে চাই। কখন সময় হবে?',hint:' (Please reply in Bengali, Bangla script.)',show:'পেজে দেখুন ↗',back:'চ্যাটে ফিরুন'}};
var P={en:"Why hire me? I have ten years in modular furniture manufacturing, growing from cutting operator to Production Manager across four companies. I run the factory end to end: planning, cut lists and BOM, production, quality control, dispatch and installation. I am hands-on with Biesse, Homag, Jai, Hunny Impex and KDT machines, I program CNC in Spazio 3D, and I train my team fast. I am ready to deliver from day one.",
hi:"मुझे क्यों चुनें? मॉड्यूलर फर्नीचर मैन्युफैक्चरिंग में मेरे पास दस साल का अनुभव है, कटिंग ऑपरेटर से प्रोडक्शन मैनेजर तक, चार कंपनियों में। प्लानिंग, कट लिस्ट और BOM, प्रोडक्शन, क्वालिटी कंट्रोल, डिस्पैच और इंस्टॉलेशन, सब कुछ मैं खुद संभालता हूँ। Biesse, Homag, Jai, Hunny Impex और KDT मशीनों पर मेरा हैंड्स-ऑन अनुभव है, मैं Spazio 3D में CNC प्रोग्राम करता हूँ और टीम को जल्दी ट्रेन करता हूँ।",
bn:"কেন আমাকে নেবেন? মডুলার ফার্নিচার ম্যানুফ্যাকচারিংয়ে আমার দশ বছরের অভিজ্ঞতা, কাটিং অপারেটর থেকে প্রোডাকশন ম্যানেজার, চারটি কোম্পানিতে। প্ল্যানিং, কাট লিস্ট ও BOM, প্রোডাকশন, কোয়ালিটি কন্ট্রোল, ডিসপ্যাচ ও ইনস্টলেশন সবকিছু আমি নিজে সামলাই। Biesse, Homag, Jai, Hunny Impex ও KDT মেশিনে আমি হাতে-কলমে দক্ষ, Spazio 3D-তে CNC প্রোগ্রাম করি এবং দ্রুত টিমকে ট্রেনিং দিই।"};
var TL=[['Mar 2024 – Present','Production Manager','Timber Tech (Wood Aura), Raipur'],['Oct 2021 – Dec 2023','All-Rounder Operator','Kiran Furniture, via Hunny Impex'],['2018 – Aug 2021','Cutting Machine & Multi Boring Operator (Biesse)','Kutchina Kitchen Appliances'],['2016 – 2018','Cutting Operator','Designer Private Limited']];
var MC=['Biesse Rover Gold 1232 CNC','Biesse Selco SK 3 beam saw','Biesse Jade 340 & Akron 1440 edge banders','Jai J-3200.in / OptiSaw 3.2 panel saws','Jai OptiEdge edge banders','Hunny Impex Hi-700 PUR edge bander','Hunny Impex Hi-202 multi boring','KDT 38-spindle multi boring','Homag EDGETEQ edge bander','Altendorf F 45 panel saw','Srichakra hot press','Spindle grooving'];
var SW=['Spazio 3D (design, cut list, CNC)','XML programs for beam saw','Naadi 3D','AutoCAD 2D (Advanced)','B_OPTI · MaxCut · Jinny ModGo','Own production software','AI tools (ChatGPT etc.)','Excel & Google Sheets (Advanced)'];
var MG=['Site measurement','Design & production drawings','Cut list & BOM','Production planning & control (PPC)','Team & shop-floor management','Quality control & dispatch','Installation management'];
var K=[['experience',/experi|career|journey|job|compan|years?|work hist|anubhav|अनुभव|करियर|कंपनी|saal|অভিজ্ঞতা|ক্যারিয়ার|কোম্পানি/i,'#growth'],
['machines',/machin|cnc|biesse|homag|saw|edge ?band|boring|kdt|altendorf|मशीन|মেশিন/i,'.sgm'],
['software',/software|spazio|autocad|cad|naadi|maxcut|excel|opti|\bai\b|सॉफ्टवेयर|সফটওয়্যার/i,'.sgs2'],
['management',/manag|team|ppc|planning|bom|cut ?list|quality|dispatch|install|leader|प्रबंधन|मैनेजमेंट|टीम|ম্যানেজ|টিম/i,'.sgw'],
['salary',/salary|ctc|pay|package|availab|notice|join|relocat|vetan|tankhwah|वेतन|सैलरी|उपलब्ध|বেতন|প্রাপ্য/i,'#contact'],
['credentials',/certif|credential|training|trained|course|प्रमाण|ट्रेनिंग|সার্টিফিকেট|প্রশিক্ষণ/i,'#credentials'],
['gallery',/galler|photo|picture|video|project|portfolio work|तस्वीर|फोटो|ছবি|ভিডিও/i,'#gallery'],
['contact',/contact|whats ?app|e-?mail|phone|call|number|reach|\bcv\b|resume|संपर्क|नंबर|যোগাযোগ|নম্বর/i,'#contact'],
['about',/about|who is|kaun|introduc|profile|परिचय|कौन|পরিচয়|কে /i,'#about']];
function intent(t){for(var i=0;i<K.length;i++)if(K[i][1].test(t))return K[i];return null}
var lang=sessionStorage.ddbL||'en',hist=[],muted=localStorage.ddbMute==='1',busy=false,actx=null,unlocked=false,pend=null;
try{hist=JSON.parse(sessionStorage.ddbH||'[]')}catch(e){}
var w=document.createElement('div');w.id='ddb';
var PST='<img class="pst" alt="" src="'+POSTER+'" decoding="async">';
w.innerHTML='<div class="cd" role="dialog" aria-label="Chat with Dhananjay (AI)"><div class="hd"><div class="host ddhc">'+PST+'</div><div class="ti"><b>Dhananjay Debnath <span class="ait">AI</span></b><small><i></i><em class="stx"></em></small><div class="dlg" role="group" aria-label="Language"><button data-l="en">EN</button><button data-l="hi">हिं</button><button data-l="bn">বাং</button></div></div><div class="tb"><button class="mu" aria-label="Mute voice"></button><button class="mn" aria-label="Minimise chat">–</button></div></div><div class="ms" aria-live="polite"></div><div class="dch" role="group" aria-label="Suggested questions"></div><form><input maxlength="500" aria-label="Message"><button type="button" class="mic" aria-label="Speak your question" hidden><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button><button aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20l18-8L3 4v6l12 2-12 2z"/></svg></button></form></div>'
+'<div class="comp"><div class="bub" role="status" aria-live="polite"></div><button class="stage" aria-label="Talk to Dhananjay (AI)"><div class="host ddhs">'+PST+'</div><span class="mb" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></span></button><button class="bb" aria-label="Open chat" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg><span class="dot"></span></button></div><button class="bk2"></button>';
document.body.appendChild(w);
var q=function(s){return w.querySelector(s)},ms=q('.ms'),inp=q('input'),comp=q('.comp'),bub=q('.bub');
// ---------- 3D avatar ----------
var AV=null,avState='idle';
function host(){return isO()?q('.ddhc'):q('.ddhs')}
function avMode(m){avState=m;if(AV)AV.setMode(m)}
function avAttach(){if(!AV)return;var h=host();AV.attach(h);requestAnimationFrame(function(){h.classList.add('live');(h===q('.ddhc')?q('.ddhs'):q('.ddhc')).classList.remove('live')})}
function loadAV(){if(RM||AV)return;try{var c=document.createElement('canvas');if(!(c.getContext('webgl2')||c.getContext('webgl')))return}catch(e){return}
import(BASE+'avatar3d.js?v=3').then(function(m){AV=m.create({level:level});avAttach();AV.setMode(avState);AV.start();window.__ddbAV=AV}).catch(function(){})}
function idle(f){(window.requestIdleCallback||function(cb){setTimeout(cb,300)})(f,{timeout:2500})}
if(document.readyState==='complete')idle(loadAV);else addEventListener('load',function(){idle(loadAV)});
// ---------- single audio controller ----------
var A={tok:0,ctl:null,srcs:[],end:0,an:null,buf:null,talking:false};
function ctx(){if(!actx){try{actx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return null}}if(!A.an){A.an=actx.createAnalyser();A.an.fftSize=512;A.an.connect(actx.destination);A.buf=new Uint8Array(512)}return actx}
function level(){if(!A.talking||!A.an)return 0;A.an.getByteTimeDomainData(A.buf);var s=0;for(var i=0;i<A.buf.length;i++){var x=(A.buf[i]-128)/128;s+=x*x}return Math.min(1,Math.sqrt(s/A.buf.length)*5)}
function setTalk(on){A.talking=on;if(on)avMode('talk');else if(avState==='talk')avMode('idle')}
function stopSpeech(){A.tok++;if(A.ctl){try{A.ctl.abort()}catch(e){}A.ctl=null}A.srcs.forEach(function(s){try{s.onended=null;var t=actx.currentTime;s.__g.gain.cancelScheduledValues(t);s.__g.gain.setValueAtTime(s.__g.gain.value,t);s.__g.gain.linearRampToValueAtTime(0,t+.015);s.stop(t+.02)}catch(e){}});A.srcs=[];A.end=0;setTalk(false)}
function splitS(t){return (String(t).replace(/\s+/g,' ').match(/(?:[^.!?।\n]|[.!?।](?=\S))+(?:[.!?।]+|$)/g)||[]).map(function(s){return s.trim()}).filter(function(s){return /[\w\u0900-\u09FF]/.test(s)}).reduce(function(a,s){if(a.length&&a[a.length-1].length<25)a[a.length-1]+=' '+s;else a.push(s);return a},[])}
function say(t){stopSpeech();if(muted)return;var c=ctx();if(!c)return;
  if(c.state!=='running'&&!unlocked){pend=t;return}
  if(c.state==='suspended')c.resume();
  var tok=A.tok,ctl=new AbortController();A.ctl=ctl;
  var parts=splitS(t),jobs=parts.map(function(s){return fetch('/api/tts',{method:'POST',signal:ctl.signal,headers:{'content-type':'application/json'},body:JSON.stringify({text:s,lang:lang})}).then(function(r){return r.ok?r.arrayBuffer():null}).then(function(b){return b&&tok===A.tok?new Promise(function(res){c.decodeAudioData(b,res,function(){res(null)})}):null}).catch(function(){return null})});
  var i=0;(function next(){if(i>=jobs.length||tok!==A.tok)return;var last=i===jobs.length-1;jobs[i++].then(function(buf){if(tok!==A.tok)return;if(buf){var s=c.createBufferSource(),gn=c.createGain();s.buffer=buf;s.connect(gn);gn.connect(A.an);var at=Math.max(c.currentTime+.04,A.end+.06),d=buf.duration,F=.012;gn.gain.setValueAtTime(0,at);gn.gain.linearRampToValueAtTime(1,at+F);gn.gain.setValueAtTime(1,at+d-F);gn.gain.linearRampToValueAtTime(0,at+d);s.start(at);s.stop(at+d);A.end=at+d;s.__g=gn;A.srcs.push(s);setTalk(true);
    s.onended=function(){A.srcs=A.srcs.filter(function(x){return x!==s});if(tok===A.tok&&!A.srcs.length&&last)setTalk(false)}}else if(last&&!A.srcs.length)setTalk(false);next()})})()}
window.__ddbAudio={playing:function(){return A.srcs.filter(function(s){return actx&&s.buffer&&actx.currentTime<A.end}).length},sources:function(){return A.srcs.length},token:function(){return A.tok},htmlAudioPlaying:function(){return [].filter.call(document.querySelectorAll('audio'),function(a){return !a.paused}).length}};
// ---------- UI ----------
function isO(){return w.classList.contains('o')}
function open(o){if(o===isO())return;w.classList.toggle('o',o);q('.bb').setAttribute('aria-expanded',o);if(o){w.classList.remove('un','bkv');hideBub();ms.scrollTop=1e5}avAttach()}
function ui(){var l=L[lang];inp.placeholder=l.ph;q('.stx').textContent=l.st;q('.bk2').textContent='💬 '+l.back;w.querySelectorAll('.dlg button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.l===lang)});q('.mu').textContent=muted?'🔇':'🔊'}
function save(){try{sessionStorage.ddbH=JSON.stringify(hist.slice(-20));sessionStorage.ddbL=lang}catch(e){}}
function el(t,c,h){var d=document.createElement(t);if(c)d.className=c;if(h!=null)d.innerHTML=h;return d}
function add(t,c){var d=el('div','m '+c);d.textContent=t;ms.appendChild(d);ms.scrollTop=1e5;return d}
function chips(k){var l=L[lang],s=(l.chips[k]||L.en.chips[k]||l.chips.start),b=q('.dch');b.innerHTML='';if(lang!=='en'&&k!=='start')s=L.en.chips[k];s.forEach(function(c){var x=el('button');x.type='button';x.textContent=c;x.onclick=function(){chip(c)};b.appendChild(x)})}
function chip(c){if(/why hire|क्यों|কেন/i.test(c))return pitch();if(/schedule/i.test(c))return sched();ask(c)}
var bubT=0;function showBub(t,ms_){clearTimeout(bubT);if(isO())return;bub.textContent=t.length>130?t.slice(0,127).replace(/\s\S*$/,'')+'…':t;bub.classList.add('on');if(ms_)bubT=setTimeout(hideBub,ms_)}
function hideBub(){clearTimeout(bubT);bub.classList.remove('on')}
function wave(){if(AV)AV.wave()}
function type(d,t,cb){if(RM){d.textContent=t;cb&&cb();return}var i=0,n=Math.max(1,Math.round(t.length/90));(function f(){i+=n;d.textContent=t.slice(0,i);ms.scrollTop=1e5;if(i<t.length)setTimeout(f,22);else cb&&cb()})()}
function card(k){var h='';if(k==='experience')h='<h4>Career timeline · 10 years</h4><ul class="tl">'+TL.map(function(r){return '<li><b>'+r[1]+'</b><small>'+r[2]+' · '+r[0]+'</small></li>'}).join('')+'</ul>';
else if(k==='machines')h='<h4>Machines operated & supervised</h4><div class="pl">'+MC.map(function(m){return '<span>'+m+'</span>'}).join('')+'</div>';
else if(k==='software')h='<h4>Software</h4><div class="pl">'+SW.map(function(m){return '<span>'+m+'</span>'}).join('')+'</div>';
else if(k==='management')h='<h4>End-to-end workflow</h4><ul class="tl">'+MG.map(function(m){return '<li>'+m+'</li>'}).join('')+'</ul>';
else if(k==='contact'||k==='salary')return acts();
if(!h)return;var c=el('div','dcd',h);ms.appendChild(c)}
function acts(){var c=el('div','dcd','<h4>Contact Dhananjay</h4><div class="ac"><a href="'+CV+'" download>⬇ Download CV</a><a class="wa" href="https://wa.me/'+W+'" target="_blank" rel="noopener">WhatsApp</a><a class="g" href="mailto:'+EM+'">✉ Email</a><button type="button" class="g cp">Copy email</button><button type="button" class="g si">📅 Schedule interview</button></div>');c.querySelector('.cp').onclick=function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(EM):Promise.reject()).then(function(){b.textContent='Copied ✓'},function(){b.textContent=EM})};c.querySelector('.si').onclick=sched;ms.appendChild(c)}
function sched(){open(true);window.open('https://wa.me/'+W+'?text='+encodeURIComponent(L[lang].si),'_blank','noopener')}
var bkT=0;function showSec(sel){var e=document.querySelector(sel);if(!e)return;if(MOB()&&isO()){open(false);w.classList.add('bkv');clearTimeout(bkT);bkT=setTimeout(function(){w.classList.remove('bkv')},9000)}e.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'});e.classList.remove('ddhl');void e.offsetWidth;e.classList.add('ddhl');setTimeout(function(){e.classList.remove('ddhl')},1700)}
function spBtn(sel){var b=el('button','sp');b.type='button';b.textContent=L[lang].show;b.onclick=function(){showSec(sel)};ms.appendChild(b)}
function typing(){var d=el('div','m b ty','<span></span><span></span><span></span>');d.setAttribute('aria-label','typing');ms.appendChild(d);ms.scrollTop=1e5;return d}
function cap1(a){var s=splitS(a);return s.slice(0,2).join(' ')}
function botMsg(a,k,speak){var d=add('','b');type(d,a,function(){if(k){card(k[0]);if(k[2])spBtn(k[2]);chips(k[0])}else chips('start');ms.scrollTop=1e5;if(!isO()&&!A.talking)w.classList.add('un')});if(!isO())showBub(cap1(a),Math.max(6000,a.length*75));if(speak!==false)say(a)}
function ask(t){t=String(t).trim().slice(0,500);if(!t||busy)return;pend=null;stopSpeech();busy=true;q('.dch').innerHTML='';add(t,'u');hist.push({role:'user',content:t});save();var p=typing();avMode('think');if(!isO())showBub('…');var ki=intent(t);
var msgs=hist.slice(-8).map(function(m){return{role:m.role,content:m.content}});msgs[msgs.length-1].content+=L[lang].hint;
fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({messages:msgs,lang:lang})}).then(function(r){return r.json()}).then(function(d){return d.reply||"Sorry, something went wrong. Please WhatsApp me at +91 77976 91585."},function(){return 'Network error, please try again.'}).then(function(a){p.remove();avMode('idle');var k=ki||intent(a);hist.push({role:'assistant',content:a,k:k&&k[0]});save();botMsg(a,k);if(k&&k[2]&&ki)setTimeout(function(){showSec(k[2])},900);busy=false})}
function pitch(){q('.dch').innerHTML='';var t=P[lang];pend=null;add(t.split('?')[0]+'?','u');botMsg(t,K[0]);wave()}
function greet(){var g=L[lang].g;ms.innerHTML='';hist=[];save();botMsg(g,null);wave()}
function restore(){hist.forEach(function(m){add(m.content,m.role==='user'?'u':'b')});chips('start')}
ui();if(hist.length)restore();
q('form').onsubmit=function(e){e.preventDefault();ask(inp.value);inp.value=''};
q('.bb').onclick=function(){open(!isO());if(isO()){wave();inp.focus({preventScroll:true})}};
q('.mn').onclick=function(){open(false);q('.bb').focus()};
q('.bk2').onclick=function(){w.classList.remove('bkv');open(true);inp.focus()};
q('.mu').onclick=function(){muted=!muted;localStorage.ddbMute=muted?'1':'0';ui();if(muted)stopSpeech()};
w.querySelectorAll('.dlg button').forEach(function(b){b.onclick=function(){if(lang===b.dataset.l)return;lang=b.dataset.l;ui();stopSpeech();greet()}});
w.addEventListener('keydown',function(e){if(e.key==='Escape'&&isO()){open(false);q('.bb').focus()}});
// ---------- voice input (chat mic + tap-to-talk on avatar) ----------
var SR=window.SpeechRecognition||window.webkitSpeechRecognition,rec=null;
function listen(fromStage){if(rec){rec.stop();return}stopSpeech();pend=null;rec=new SR();rec.lang={en:'en-IN',hi:'hi-IN',bn:'bn-IN'}[lang];rec.interimResults=true;var mic=q('.mic');mic.classList.add('on');comp.classList.add('lsn');avMode('listen');if(fromStage)showBub({en:'Listening… ask me anything',hi:'सुन रहा हूँ… कुछ भी पूछिए',bn:'শুনছি… যা খুশি জিজ্ঞেস করুন'}[lang]);var got=false;
rec.onresult=function(e){var r=e.results[e.results.length-1],tx=r[0].transcript;if(fromStage)showBub('“'+tx+'”');else inp.value=tx;if(r.isFinal&&!got){got=true;inp.value='';ask(tx)}};
rec.onend=rec.onerror=function(){mic.classList.remove('on');comp.classList.remove('lsn');if(avState==='listen')avMode('idle');if(!got&&fromStage)hideBub();rec=null};try{rec.start()}catch(e){rec.onend()}}
if(SR)q('.mic').hidden=false;q('.mic').onclick=function(){listen(false)};
q('.stage').onclick=function(){unlock();if(SR)listen(true);else{open(true);inp.focus()}};
if(!SR)q('.mb').style.display='none';
// ---------- unobtrusive on mobile while scrolling ----------
var sT=0;addEventListener('scroll',function(){if(!MOB())return;w.classList.add('scr');clearTimeout(sT);sT=setTimeout(function(){w.classList.remove('scr')},700)},{passive:true});
function unlock(){if(unlocked)return;unlocked=true;['pointerdown','keydown','touchstart'].forEach(function(n){removeEventListener(n,unlock,true)});var c=ctx();if(c&&c.state==='suspended')c.resume();if(pend){var t=pend;pend=null;setTimeout(function(){if(!busy&&!rec)say(t)},60)}}
['pointerdown','keydown','touchstart'].forEach(function(n){addEventListener(n,unlock,true)});
var started=false;function start(){if(started)return;started=true;if(!hist.length){greet()}else chips('start');if(!MOB())open(true);else wave()}
var pre=document.querySelector('.pre'),seen=document.documentElement.classList.contains('seen');
if(!pre||seen||RM||getComputedStyle(pre).display==='none'||window.__ddPre)setTimeout(start,window.__ddPre?Math.max(0,window.__ddPre+400-performance.now()):400);
else{pre.addEventListener('animationend',function(e){if(e.animationName==='pup')setTimeout(start,400)});setTimeout(start,5000)}
})();
