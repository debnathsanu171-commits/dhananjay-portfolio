(function(){
var g=(window.DD_CONFIG||{}).gallery||[];
if(g.length){var s=document.getElementById('gallery'),w=document.getElementById('galgrid');
g.forEach(function(it){var f=document.createElement('figure');var i=new Image();i.src=it.src;i.alt=it.caption||'Work photo';i.loading='lazy';i.width=400;i.height=300;f.appendChild(i);if(it.caption){var c=document.createElement('figcaption');c.textContent=it.caption;f.appendChild(c)}w.appendChild(f)});
s.hidden=false;var l=document.getElementById('navgal');if(l)l.hidden=false}
var els=[].slice.call(document.querySelectorAll('[data-rv]')),vh=innerHeight;
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
els.forEach(function(el){if(el.getBoundingClientRect().top>vh){el.classList.add('rv');io.observe(el)}})}
var tl=document.querySelector('.tl'),ln=document.querySelector('.tl .ln');
function dr(){if(!tl)return;var r=tl.getBoundingClientRect(),p=Math.min(Math.max((vh*.7-r.top)/r.height,0),1);ln.style.height=(p*(r.height-12))+'px'}
addEventListener('scroll',function(){requestAnimationFrame(dr)},{passive:true});addEventListener('resize',function(){vh=innerHeight;dr()});dr();
document.getElementById('yr').textContent=new Date().getFullYear();
})();
