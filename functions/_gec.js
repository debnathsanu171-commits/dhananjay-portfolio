const C={"_CS64_ADJUSTMENT0": 4076407578, "_CS64_ADJUSTMENT1": 186253312, "_CS64_COEFFICIENTS": [[3895366065, 3005677776], [1155409094, 2296378653], [1005282748, 693190712], [3365689651, 3005795295], [2367603217, 3557143765], [827258325, 652566332], [3911487921, 1618477510], [4037392853, 2192753147], [101076211, 4199654362], [3665427040, 545047652], [3201434976, 1010595059], [2314848760, 3536931681], [905590982, 3137643201], [3410617286, 3311559015]], "_CS64_FACTOR": 2190031155, "_SHA256_ADJUSTMENT": 3386640039, "_SHA256_BLOCK_CONSTANTS": [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 3386640039, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], "_SHA256_INITIAL": [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], "_SHA256_ROUND_CONSTANTS": [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], "_SHA256_SCHEDULE": [3945054110, 358115615, 2696978146, 217723578, 2787307148, 3520959633, 3235718560, 4192668342, 4039316851, 1884868174, 1904797190, 15051571, 3529027680, 1920361828], "_SHA256_SIGMA0_ADJUSTMENT": 94112640, "_SHA256_SIGMA1_ADJUSTMENT": 758464, "_SHA256_STATE": [4255104674, 2435071207, 3192492180, 3442351626, 1811967817, 79508907, 4272990180, 66059218]};
const M=0xFFFFFFFFn,B=BigInt;
const K=o=>Array.isArray(o)?o.map(K):B(o);
const IV=K(C._SHA256_INITIAL),ST=K(C._SHA256_STATE),SCH=K(C._SHA256_SCHEDULE),RC=K(C._SHA256_ROUND_CONSTANTS),BC=K(C._SHA256_BLOCK_CONSTANTS),CO=K(C._CS64_COEFFICIENTS);
const rol16=v=>{v&=M;return ((v<<16n)|(v>>16n))&M};
const s0=v=>((v>>7n)^(v<<25n)^(v>>18n)^(v<<14n)^(v>>3n))&M;
const s1=v=>((v>>17n)^(v<<15n)^(v>>19n)^(v<<13n)^(v>>10n))&M;
function rounds(st,w,fr=0){let [a,b,c,d,e,f,g,h]=st;const k=fr===14?BC:RC;
  for(let i=fr;i<64;i++){const re=e*0x100000001n,ra=a*0x100000001n;
    const t1=h+((re>>6n)^(re>>11n)^(re>>25n))+(g^(e&(f^g)))+k[i]+w[i];
    const t2=((ra>>2n)^(ra>>13n)^(ra>>22n))+((a&b)|(c&(a|b)));
    [a,b,c,d,e,f,g,h]=[(t1+t2)&M,a,b,c,(d+t1)&M,e,f,g];}
  return [a,b,c,d,e,f,g,h]}
function expand(w,fw=16){for(let i=fw;i<64;i++){const x=w[i-2],y=w[i-15];
  const S1=(x>>17n)^(x<<15n)^(x>>19n)^(x<<13n)^(x>>10n),S0=(y>>7n)^(y<<25n)^(y>>18n)^(y<<14n)^(y>>3n);w.push((S1+w[i-7]+S0+w[i-16])&M)}}
const be=a=>a.reduce((x,y)=>(x<<8n)|B(y),0n);
function init(d){const w=Array(14).fill(0n);w.push(be(d.slice(0,3)));w.push(be(d.slice(3,7)));
  for(let i=16;i<30;i++){let v=SCH[i-16];
    if(i-2>=14)v+=i===16?(s1(w[i-2])^B(C._SHA256_SIGMA1_ADJUSTMENT)):s1(w[i-2]);
    if(i-7>=14)v+=w[i-7];
    if(i-15>=14)v+=i===29?(s0(w[i-15])^B(C._SHA256_SIGMA0_ADJUSTMENT)):s0(w[i-15]);
    w.push(v&M)}
  w.push((s1(w[28])+w[23]+s0(w[15])+w[14]+B(C._SHA256_ADJUSTMENT)-RC[14])&M);
  expand(w,31);const wk=rounds(ST,w,14);return IV.map((x,i)=>(x+wk[i])&M)}
function digest(d){const len=57+d.length;const pad=[...d.slice(7),0x80,...Array((((55-len)%64)+64)%64).fill(0)];
  const L=B(len*8);for(let i=7;i>=0;i--)pad.push(Number((L>>B(8*i))&0xFFn));
  let st=init(d);for(let o=0;o<pad.length;o+=64){const w=[];for(let j=0;j<16;j++)w.push(be(pad.slice(o+4*j,o+4*j+4)));expand(w);const wk=rounds(st,w);st=st.map((x,i)=>(x+wk[i])&M)}
  return st}
function cs64(d,dg){const le=w=>((w&0xFFn)<<24n)|(((w>>8n)&0xFFn)<<16n)|(((w>>16n)&0xFFn)<<8n)|(w>>24n);
  let ka=le(dg[0])|1n,kb=le(dg[1])|1n;const FA=B(C._CS64_FACTOR);const fac=[(ka*FA)&M,(kb*FA)&M];
  const terms=CO.map((c,i)=>(c[0]*fac[i%2])&M),offs=CO.map(c=>c[1]);
  const data=[0,...d];while(data.length%4)data.push(0);const ws=[];for(let i=0;i<data.length;i+=4)ws.push(B(data[i])|(B(data[i+1])<<8n)|(B(data[i+2])<<16n)|(B(data[i+3])<<24n));if(ws.length%2)ws.push(0n);
  ws.forEach((w,i)=>{let t=w*(i%2===0?ka:kb),of=rol16(w)*(i%2===0?0xEF0569FBn:0xC31713DBn);if(i===0){t+=B(C._CS64_ADJUSTMENT0)*fac[0];of+=B(C._CS64_ADJUSTMENT1)}terms.push(t&M);offs.push(of&M)});
  let sa=0n,sl=0n,st=0n,acc=0n;
  for(let i=0;i<terms.length;i+=2){const x=terms[i],y=terms[i+1];
    let t=rol16((offs[i]+x)&M),q=(t*0x76F50F34n)&M;sa+=(rol16(q)*0xC3EFEA97n+q)&M;
    t=rol16((offs[i+1]+y)&M);q=(t*0x1881CE3Cn)&M;sl=(rol16(q)*0x35BD1EC9n+q)&M;sa=(sa+sl)&M;
    st=(st*ka+x)&M;st=(rol16(st)*0xCF98B111n)&M;st=(rol16(st)*0x87085B9Fn)&M;st=(rol16(st)*0x12CEB96Dn)&M;st=(rol16(st)*0x257E1D83n)&M;acc+=st;
    t=(st*kb+y)&M;t=(rol16(t)*0xA27416F5n)&M;t=(rol16(t)*0xD38396FFn)&M;st=(rol16((rol16(t)*0x7C932B89n)&M)*0xBFA49F69n)&M;acc=(acc+st)&M}
  return [sl^st,sa^acc]}
const hx=(v,le)=>{let s=v.toString(16).padStart(8,'0');if(le)s=s.match(/../g).reverse().join('');return s.toUpperCase()};
export const TOKEN='6A5AA1D4EAFF4E9FB37E23D68491D6F4';
export function secMsGec(unix){let t=Math.floor(unix)+11644473600;t-=t%300;const s=String(B(t)*10000000n)+TOKEN;
  const d=[...new TextEncoder().encode(s)];const dg=digest(d);const c=cs64(d,dg);return hx(c[0],1)+hx(c[1],1)+'-'+dg.map(x=>hx(x)).join('')}
