const OK=/^https:\/\/([a-z0-9-]+\.)?debnathofficial\.pages\.dev$/;
export function originOk(req){const o=req.headers.get('origin');if(!o)return true;return OK.test(o)||/^http:\/\/localhost(:\d+)?$/.test(o);}
export const json=(d,s=200)=>new Response(JSON.stringify(d),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
