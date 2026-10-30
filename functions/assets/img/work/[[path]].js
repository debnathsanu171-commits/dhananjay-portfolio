// Serve work videos with proper HTTP Range (206) support for mobile browsers
export async function onRequestGet({request,env,next}){
  const u=new URL(request.url);if(!u.pathname.endsWith('.mp4'))return next();
  const r=await env.ASSETS.fetch(new Request(u.toString()));
  if(r.status!==200)return r;
  const buf=await r.arrayBuffer(),n=buf.byteLength;
  const h=new Headers({'content-type':'video/mp4','accept-ranges':'bytes','cache-control':'public, max-age=86400'});
  const m=/bytes=(\d*)-(\d*)/.exec(request.headers.get('range')||'');
  if(!m){h.set('content-length',String(n));return new Response(buf,{status:200,headers:h})}
  let s=m[1]===''?Math.max(0,n-Number(m[2])):Number(m[1]),e=m[1]!==''&&m[2]!==''?Math.min(Number(m[2]),n-1):n-1;
  if(s>=n||s>e){h.set('content-range','bytes */'+n);return new Response(null,{status:416,headers:h})}
  h.set('content-range',`bytes ${s}-${e}/${n}`);h.set('content-length',String(e-s+1));
  return new Response(buf.slice(s,e+1),{status:206,headers:h});
}
export const onRequestHead=onRequestGet;
