(function(){
var as=[].slice.call(document.querySelectorAll('#galgrid a')),cur=0,lb;
function sh(i){cur=(i+as.length)%as.length;var a=as[cur],f=a.dataset.full;lb.querySelector('picture').innerHTML='<source type="image/avif" srcset="'+f+'.avif"><source type="image/webp" srcset="'+f+'.webp"><img src="'+f+'.jpg" alt="'+a.dataset.cap+'" width="'+a.dataset.w+'" height="'+a.dataset.h+'">';lb.querySelector('p').textContent=a.dataset.cap+' · '+(cur+1)+' / '+as.length}
function cl(){lb.hidden=true;document.body.style.overflow=''}
as.forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();if(!lb){lb=document.createElement('div');lb.id='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');lb.innerHTML='<picture></picture><p></p><button id="lbx" aria-label="Close">×</button><button id="lbp" aria-label="Previous">‹</button><button id="lbn" aria-label="Next">›</button>';document.body.appendChild(lb);
lb.querySelector('#lbx').onclick=cl;lb.querySelector('#lbp').onclick=function(){sh(cur-1)};lb.querySelector('#lbn').onclick=function(){sh(cur+1)};lb.addEventListener('click',function(e){if(e.target===lb)cl()});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)sh(cur+(d<0?1:-1))},{passive:true});
addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')cl();if(e.key==='ArrowRight')sh(cur+1);if(e.key==='ArrowLeft')sh(cur-1)})}
sh(i);lb.hidden=false;document.body.style.overflow='hidden';lb.querySelector('#lbx').focus()})});
if('IntersectionObserver' in window){var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){v.muted=true;var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.6});[].forEach.call(document.querySelectorAll('.wkv'),function(v){vo.observe(v)})}
var els=[].slice.call(document.querySelectorAll('[data-rv]')),vh=innerHeight;
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
els.forEach(function(el){if(el.getBoundingClientRect().top>vh){el.classList.add('rv');io.observe(el)}})}
var tl=document.querySelector('.tl'),ln=document.querySelector('.tl .ln');
function dr(){if(!tl)return;var r=tl.getBoundingClientRect(),p=Math.min(Math.max((vh*.7-r.top)/r.height,0),1);ln.style.height=(p*(r.height-12))+'px'}
addEventListener('scroll',function(){requestAnimationFrame(dr)},{passive:true});addEventListener('resize',function(){vh=innerHeight;dr()});dr();
document.getElementById('yr').textContent=new Date().getFullYear();
})();
