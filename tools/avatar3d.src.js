import {CanvasTexture,MeshBasicMaterial,WebGLRenderer,Scene,PerspectiveCamera,HemisphereLight,DirectionalLight,Group,Mesh,MeshStandardMaterial,SphereGeometry,CapsuleGeometry,BoxGeometry,CylinderGeometry,ConeGeometry,ShapeGeometry,Shape,SRGBColorSpace,DoubleSide} from 'three';
const M=c=>new MeshStandardMaterial({color:c,roughness:.75,metalness:0,flatShading:true});
const SKIN=M(0xB27A55),SKIND=M(0x8C5634),HAIR=M(0x14151B),SUIT=M(0x1E2A52),PANT=M(0x18213F),SHIRT=M(0xBFD6F0),SHOE=M(0x0E0E10),WHITE=M(0xF4F1EC),PUP=M(0x23140D),LIP=M(0x6B2E25),MOUTH=M(0x2A0E0B),BELT=M(0x111114);
SHIRT.side=DoubleSide;
function mk(geo,mat,parent,p=[0,0,0],r=[0,0,0],s=[1,1,1]){const m=new Mesh(geo,mat);m.position.set(...p);m.rotation.set(...r);m.scale.set(...s);parent.add(m);return m}
function G(parent,p=[0,0,0]){const g=new Group();g.position.set(...p);parent.add(g);return g}
const cap=(r,l)=>new CapsuleGeometry(r,l,3,8);

const FC={x:128,y:48,w:232,h:362,mouth:[240,338],eyes:[[206,236],[292,236]]};
function faceTex(img){
  const S=256,c=document.createElement('canvas');c.width=S;c.height=Math.round(S*FC.h/FC.w);const g=c.getContext('2d'),H=c.height,k=S/FC.w;
  const base=document.createElement('canvas');base.width=S;base.height=H;const b=base.getContext('2d');
  b.drawImage(img,FC.x,FC.y,FC.w,FC.h,0,0,S,H);
  // feather edges
  b.globalCompositeOperation='destination-in';const gr=b.createRadialGradient(S/2,S/2,S*.44,S/2,S/2,S*.56);gr.addColorStop(0,'#000');gr.addColorStop(1,'rgba(0,0,0,0)');b.save();b.scale(1,H/S);b.fillStyle=gr;b.fillRect(0,0,S,S);b.restore();b.globalCompositeOperation='source-over';
  const P=(pt)=>[(pt[0]-FC.x)*k,(pt[1]-FC.y)*k];const m=P(FC.mouth),e=FC.eyes.map(P);
  const lidC=(()=>{const d=b.getImageData(e[0][0]|0,(e[0][1]-9*k)|0,1,1).data;return `rgb(${d[0]},${d[1]},${d[2]})`})();
  const tex=new CanvasTexture(c);tex.colorSpace=SRGBColorSpace;tex.premultiplyAlpha=true;
  let lv=-1,lb=-1;
  function draw(open,blink){open=Math.round(open*20)/20;blink=Math.round(blink*10)/10;if(open===lv&&blink===lb)return;lv=open;lb=blink;
    g.clearRect(0,0,S,H);g.drawImage(base,0,0);
    if(open>0.02){const mw=34*k,dy=open*9*k,top=m[1]-1*k;
      g.save();g.beginPath();g.ellipse(m[0],top+dy*.5,mw*.62,dy*.55+1,0,0,Math.PI*2);g.fillStyle='#2a0f0c';g.fill();g.restore();
      // shift lower lip + chin down
      g.save();g.beginPath();g.ellipse(m[0],top+40*k,mw*1.1,40*k,0,0,Math.PI);g.clip();g.drawImage(base,0,top,S,H-top,0,top+dy,S,H-top);g.restore();
      g.save();g.beginPath();g.ellipse(m[0],top+dy*.45,mw*.55,dy*.5,0,0,Math.PI*2);g.clip();g.fillStyle='#2a0f0c';g.fillRect(0,0,S,H);g.fillStyle='rgba(235,230,225,.85)';g.fillRect(m[0]-mw*.4,top-1,mw*.8,Math.min(3*k,dy*.3));g.restore();}
    if(blink>0.05){g.save();g.globalAlpha=Math.min(1,blink*1.2);g.fillStyle=lidC;e.forEach(p=>{g.beginPath();g.ellipse(p[0],p[1]-1*k,13*k,7*k*blink+1,0,0,Math.PI*2);g.fill()});g.globalAlpha=1;g.strokeStyle='rgba(40,25,20,.6)';g.lineWidth=1.2;e.forEach(p=>{g.beginPath();g.moveTo(p[0]-12*k,p[1]+5*k*blink-2);g.quadraticCurveTo(p[0],p[1]+7*k*blink,p[0]+12*k,p[1]+5*k*blink-2);g.stroke()});g.restore();}
    tex.needsUpdate=true}
  draw(0,0);return {tex,draw,aspect:H/S};
}
function faceMesh(head,F){
  const R=.128,geo=new SphereGeometry(R,40,32,Math.PI/2-1.1,2.2,Math.PI*.12,Math.PI*.8);const pos=geo.attributes.position,uv=geo.attributes.uv;
  let x0=1,x1=-1,y0=1,y1=-1;for(let i=0;i<pos.count;i++){x0=Math.min(x0,pos.getX(i));x1=Math.max(x1,pos.getX(i));y0=Math.min(y0,pos.getY(i));y1=Math.max(y1,pos.getY(i))}
  for(let i=0;i<pos.count;i++){uv.setXY(i,(pos.getX(i)-x0)/(x1-x0),(pos.getY(i)-y0)/(y1-y0))}
  const m=new Mesh(geo,new MeshBasicMaterial({map:F.tex,transparent:true,depthWrite:false,premultipliedAlpha:true}));m.position.set(0,.13,.008);m.scale.set(.96,(.96*F.aspect*(x1-x0)/(y1-y0)),1.0);m.renderOrder=2;head.add(m);return m}
function build(face){
  const root=new Group(),J={};
  const hips=J.hips=G(root,[0,.95,0]);
  mk(cap(.11,.16),PANT,hips,[0,.03,0],[0,0,Math.PI/2],[1,1,.8]);
  mk(new CylinderGeometry(.165,.165,.04,12),BELT,hips,[0,.09,0],[0,0,0],[1,1,.72]);
  const sp=J.spine=G(hips,[0,.08,0]);
  const chest=J.chest=G(sp,[0,0,0]);
  mk(cap(.17,.3),SUIT,chest,[0,.27,0],[0,0,0],[1.22,1,.72]);
  // shirt V + lapels
  const v=new Shape();v.moveTo(-.075,.2);v.lineTo(.075,.2);v.lineTo(0,-.02);v.lineTo(-.075,.2);
  mk(new ShapeGeometry(v),SHIRT,chest,[0,.33,.128],[-.12,0,0]);
  mk(new BoxGeometry(.035,.2,.02),SUIT,chest,[-.05,.43,.13],[-.1,0,.42]).material=M(0x172146);
  mk(new BoxGeometry(.035,.2,.02),M(0x172146),chest,[.05,.43,.13],[-.1,0,-.42]);
  mk(new SphereGeometry(.011,6,4),M(0x0B0F22),chest,[0,.27,.125]);mk(new SphereGeometry(.011,6,4),M(0x0B0F22),chest,[0,.19,.124]);
  mk(new CylinderGeometry(.06,.065,.05,10),SHIRT,chest,[0,.53,0]);// collar
  // neck/head
  const neck=J.neck=G(chest,[0,.56,0]);
  mk(new CylinderGeometry(.052,.058,.1,10),SKIN,neck,[0,.03,0]);
  const head=J.head=G(neck,[0,.06,0]);head.scale.setScalar(1.32);
  mk(new SphereGeometry(.118,18,14),SKIN,head,[0,.12,0],[0,0,0],[.95,1.13,1.02]);
  // ears
  if(!face)mk(new SphereGeometry(.028,8,6),SKIND,head,[-.112,.12,0],[0,0,0],[.5,1,.8]);if(!face)mk(new SphereGeometry(.028,8,6),SKIND,head,[.112,.12,0],[0,0,0],[.5,1,.8]);
  if(face){J.F=face;faceMesh(head,face);J.lids=[];J.pups=[];J.brows=[];}
  // hair: top cap, back, swept-up quiff
  if(!face)mk(new SphereGeometry(.124,18,10,0,Math.PI*2,0,Math.PI*.42),HAIR,head,face?[0,.15,-.02]:[0,.135,-.005],face?[-.45,0,0]:[-.15,0,0],face?[.99,1.12,1.0]:[.98,1.15,1.05]);
  mk(new SphereGeometry(.123,16,10,Math.PI,Math.PI,0,Math.PI*.62),HAIR,head,[0,.125,-.006],[0,0,0],[.98,1.12,1.04]);
  if(!face)mk(new SphereGeometry(.095,14,10),HAIR,head,[0,.225,.045],[-.55,0,0],[1.1,.5,1.0]);
  if(!face)mk(new SphereGeometry(.065,12,8),HAIR,head,[.01,.25,.085],[-.9,0,.1],[1.2,.42,.8]);
  if(!face){
  // side hair
  mk(new BoxGeometry(.02,.07,.07),HAIR,head,[-.11,.17,-.01]);mk(new BoxGeometry(.02,.07,.07),HAIR,head,[.11,.17,-.01]);
  // beard (lower front cap) + moustache
  mk(new SphereGeometry(.1205,16,10,-.15,Math.PI+.3,Math.PI*.68,Math.PI*.32),HAIR,head,[0,.12,.001],[0,0,0],[.962,1.13,1.028]).material=M(0x4A3529);
  const mo=J.mous=G(head,[0,.07,.112]);
  mk(cap(.0095,.05),HAIR,mo,[-.024,0,0],[0,0,Math.PI/2+.35]);mk(cap(.0095,.05),HAIR,mo,[.024,0,0],[0,0,Math.PI/2-.35]);
  // mouth
  const mouth=J.mouth=G(head,[0,.048,.113]);
  J.mIn=mk(new SphereGeometry(.026,10,6),MOUTH,mouth,[0,0,0],[0,0,0],[1,.15,.4]);
  J.lip=mk(cap(.007,.03),LIP,mouth,[0,-.006,.004],[0,0,Math.PI/2]);
  // nose
  mk(new ConeGeometry(.02,.05,6),SKIND,head,[0,.115,.122],[.35,0,0]);mk(new SphereGeometry(.018,8,6),SKIND,head,[0,.093,.128]);
  // eyes
  J.lids=[];J.pups=[];J.brows=[];
  for(const s of [-1,1]){
    const e=G(head,[s*.042,.135,.1]);
    mk(new SphereGeometry(.019,10,8),WHITE,e,[0,0,0],[0,0,0],[1.2,.8,.6]);
    J.pups.push(mk(new SphereGeometry(.0115,8,6),PUP,e,[0,0,.009]));
    const lid=mk(new SphereGeometry(.0235,10,8),SKIN,e,[0,.016,.002],[0,0,0],[1.15,.08,.75]);J.lids.push(lid);
    J.brows.push(mk(new BoxGeometry(.05,.015,.016),HAIR,head,[s*.045,.172,.112],[0,0,s*-.12]));
  }
  }
  // arms
  J.sh=[];J.el=[];J.ha=[];
  for(const s of [1,-1]){ // 1 = character left (+x)
    const sh=G(chest,[s*.215,.47,0]);
    mk(new SphereGeometry(.062,10,8),SUIT,sh,[0,0,0],[0,0,0],[1,.85,.9]);
    mk(cap(.058,.2),SUIT,sh,[0,-.14,0]);
    const el=G(sh,[0,-.28,0]);
    mk(cap(.05,.19),SUIT,el,[0,-.11,0]);
    mk(new CylinderGeometry(.046,.046,.035,10),SHIRT,el,[0,-.235,0]);
    const ha=G(el,[0,-.255,0]);
    mk(new SphereGeometry(.042,8,6),SKIN,ha,[0,-.045,0],[0,0,0],[.85,1.15,.5]);
    mk(new SphereGeometry(.036,8,6),SKIN,ha,[0,-.095,.006],[.2,0,0],[.85,1,.45]);
    mk(cap(.013,.035),SKIN,ha,[s*.038,-.04,.012],[0,0,s*.6]);
    J.sh.push(sh);J.el.push(el);J.ha.push(ha);
  }
  // legs
  J.hip=[];J.kn=[];J.ft=[];
  for(const s of [1,-1]){
    const hp=G(hips,[s*.085,0,0]);
    mk(cap(.07,.3),PANT,hp,[0,-.22,0]);
    const kn=G(hp,[0,-.44,0]);
    mk(cap(.06,.32),PANT,kn,[0,-.2,0]);
    const ft=G(kn,[0,-.44,0]);
    mk(new BoxGeometry(.095,.06,.22),SHOE,ft,[0,-.01,.045]);
    J.hip.push(hp);J.kn.push(kn);J.ft.push(ft);
  }
  return {root,J};
}
// pose: per joint target euler values
const BASE={sx:[0,0],sz:[.08,-.08],sy:[0,0],ex:[-.15,-.15],ez:[0,0],hx:[0,0],hz:[0,0],hy:[0,0],spY:0,spZ:0,spX:0,hdX:0,hdY:0,hdZ:0,hipX:0,hipZ:0,kn:[0,0],lg:[0,0],lgz:[0,0],brow:0,shUp:0,bob:0};
const P={
  idle:{},
  explain:{sx:[-.45,-.45],sz:[.25,-.25],ex:[-1.25,-1.25],ez:[-.3,.3],hy:[.5,-.5],brow:.3},
  pointR:{sx:[0,-1.35],sz:[.1,-.25],ex:[-.15,-.1],hdY:-.2,brow:.5,spY:-.15},
  shrug:{sx:[-.2,-.2],sz:[.55,-.55],ex:[-1.4,-1.4],ez:[-.6,.6],hy:[1.2,-1.2],shUp:.04,hdZ:.18,brow:1},
  chest:{sx:[0,-.6],sz:[.08,.35],ex:[-.15,-1.9],ez:[0,.6],hdX:.05,brow:.2},
  count:{sx:[-.3,-.9],sz:[.15,-.35],ex:[-.9,-1.6],hdZ:-.1,brow:.6},
  wave:{sx:[0,-.2],sz:[.08,-2.5],ex:[-.15,-.6],ez:[0,.3],hdZ:.12,brow:.8},
  dance:{sx:[-.3,-.3],sz:[.9,-.9],ex:[-1.6,-1.6],ez:[0,0],brow:.5},
  thumbs:{sx:[-.7,-.7],sz:[.2,-.2],ex:[-1.3,-1.3],brow:.8,hdX:-.08},
  think:{sx:[-.2,-.5],sz:[.25,.15],ex:[-1.6,-2.3],ez:[.3,.4],hdZ:.12,hdX:-.08,hdY:.15,brow:.7},
  listen:{sx:[0,0],sz:[.1,-.1],ex:[-.3,-.3],hdZ:-.15,hdX:.05,brow:.4},
  hipHand:{sx:[.1,0],sz:[.55,-.08],ex:[-1.6,-.2],ez:[.9,0],hdZ:-.1,spZ:-.05,brow:.3}
};
const TALK=['explain','pointR','shrug','chest','count','explain','dance','thumbs','hipHand','explain','wave'];
export function create(opts){
  const level=opts.level||(()=>0),dpr=Math.min(devicePixelRatio||1,2);
  const r=new WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power',preserveDrawingBuffer:!!opts.poster});
  r.setPixelRatio(dpr);r.outputColorSpace=SRGBColorSpace;r.setClearColor(0,0);
  const scene=new Scene(),cam=new PerspectiveCamera(20,.5,.1,20);
  scene.add(new HemisphereLight(0xEEF2FF,0x3A3530,1.6));
  const k=new DirectionalLight(0xFFF2E0,2.2);k.position.set(1.5,2.5,3);scene.add(k);
  const rim=new DirectionalLight(0x9DB4FF,1.2);rim.position.set(-2,2,-2);scene.add(rim);
  const {root,J}=build(opts.faceImg?faceTex(opts.faceImg):null);scene.add(root);
  const cur=JSON.parse(JSON.stringify(BASE));let tgt=JSON.parse(JSON.stringify(BASE));
  let mode='idle',gest='idle',gT=0,t=0,blinkT=1.5,blink=0,shiftT=3,shift=0,mouthV=0,hop=0,host=null,frame=.92,raf=0,last=0,visible=true,wavingT=0;
  function setPose(name){gest=name;const p=P[name]||{};tgt=JSON.parse(JSON.stringify(BASE));for(const k in p)tgt[k]=Array.isArray(p[k])?p[k].slice():p[k];}
  function lerp(a,b,f){return a+(b-a)*f}
  function step(dt){
    t+=dt;const f=1-Math.exp(-dt*4.2);
    // gesture scheduler
    gT-=dt;
    if(wavingT>0){wavingT-=dt;if(gest!=='wave')setPose('wave');if(wavingT<=0)gT=0;}
    else if(gT<=0){
      if(mode==='talk'){let n;do{n=TALK[Math.random()*TALK.length|0]}while(n===gest);setPose(n);gT=1.3+Math.random()*1.4;if(n==='dance'||Math.random()<.12)hop=1;}
      else if(mode==='think'){setPose('think');gT=2}
      else if(mode==='listen'){setPose('listen');gT=2}
      else{const x=Math.random();setPose(x<.12?'hipHand':x<.18?'wave':'idle');gT=x<.18?2.2:3+Math.random()*3}
    }
    // weight shift
    shiftT-=dt;if(shiftT<=0){shift=(Math.random()<.5?-1:1)*(mode==='talk'?1:.7);shiftT=2+Math.random()*3}
    tgt.hipX=shift*.025;tgt.hipZ=shift*.035;tgt.kn=[shift<0?.14*Math.abs(shift):0,shift>0?.14*Math.abs(shift):0];
    for(const key in cur){if(Array.isArray(cur[key]))for(let i=0;i<2;i++)cur[key][i]=lerp(cur[key][i],tgt[key][i],f);else cur[key]=lerp(cur[key],tgt[key],f)}
    const L=mode==='talk'?Math.min(1,level()):0;mouthV=lerp(mouthV,L,1-Math.exp(-dt*25));
    const br=Math.sin(t*1.6),talkAmp=mode==='talk'?1:0;
    // apply
    hop=Math.max(0,hop-dt*2.2);const hopY=Math.sin(hop*Math.PI)*.05;
    const dance=gest==='dance'?Math.sin(t*9):0;
    J.hips.position.set(cur.hipX+dance*.03,.95+hopY-Math.abs(dance)*.015+br*.002,0);
    J.hips.rotation.set(0,dance*.15,cur.hipZ+dance*.06);
    J.spine.rotation.set(cur.spX+br*.01,cur.spY+Math.sin(t*1.1)*.04*talkAmp,cur.spZ-cur.hipZ*.8-dance*.08);
    J.chest.scale.set(1+br*.008,1+br*.012,1+br*.01);
    for(let i=0;i<2;i++){const s=i?-1:1;
      let sz=cur.sz[i],sx=cur.sx[i],ex=cur.ex[i],ez=cur.ez[i];
      if(talkAmp){sx+=Math.sin(t*3.1+i*1.7)*.12*(.4+mouthV);ex+=Math.sin(t*4.3+i)*.15*(.4+mouthV)}
      if(gest==='wave'&&i===1){ez+=Math.sin(t*10)*.45}
      if(gest==='dance'){sz+=s*Math.sin(t*9+i*Math.PI)*.25;ex+=Math.sin(t*9)*.3}
      if(gest==='thumbs'||gest==='count'){ex+=Math.sin(t*7)*.12}
      if(gest==='shrug'){J.sh[i].position.y=.47+cur.shUp*(.5+.5*Math.sin(t*5))}else J.sh[i].position.y=lerp(J.sh[i].position.y,.47,f);
      J.sh[i].rotation.set(sx,cur.sy[i],sz+s*br*.01);
      J.el[i].rotation.set(ex,0,ez);
      J.ha[i].rotation.set(cur.hx[i],cur.hy[i],cur.hz[i]);
      const kn=cur.kn[i]+(gest==='dance'?Math.max(0,Math.sin(t*9+i*Math.PI))*.35:0);
      J.hip[i].rotation.set(-kn*.5,0,-cur.hipZ+s*.03);J.kn[i].rotation.set(kn,0,0);J.ft[i].rotation.set(-kn*.5,0,cur.hipZ*.5);
    }
    J.neck.rotation.set(cur.hdX*.4,cur.hdY*.4,cur.hdZ*.4);
    J.head.rotation.set(cur.hdX+Math.sin(t*.7)*.03+(talkAmp?Math.sin(t*5.3)*.04*mouthV:0),cur.hdY+Math.sin(t*.45)*.08,cur.hdZ+Math.sin(t*.9)*.02+(gest==='dance'?Math.sin(t*9)*.1:0));
    // face
    blinkT-=dt;if(blinkT<=0){blink=1;blinkT=2.2+Math.random()*3.5;if(Math.random()<.15)blinkT=.25}
    blink=Math.max(0,blink-dt*7);const b=Math.sin(blink*Math.PI);
    J.lids.forEach(l=>{l.scale.y=.08+b*.92;l.position.y=.016-b*.016});
    const bu=cur.brow*.008+(talkAmp?mouthV*.004:0);J.brows.forEach((x,i)=>{x.position.y=.172+bu});
    if(J.mIn){J.mIn.scale.set(1-mouthV*.15,.15+mouthV*1.3,.4);J.mIn.position.y=-mouthV*.006;J.lip.position.y=-.006-mouthV*.012;
    const lx=Math.sin(t*.37)*.003;J.pups.forEach(p=>{p.position.x=lx});
    J.mous.position.y=.07+mouthV*.002;}
    if(J.F)J.F.draw(mouthV,b);
  }
  function render(){r.render(scene,cam)}
  function loop(now){raf=requestAnimationFrame(loop);if(!visible||!host||document.hidden){last=now;return}
    const dt=Math.min(.05,(now-(last||now))/1000);last=now;step(dt);render()}
  function size(){if(!host)return;const w=host.clientWidth||1,h=host.clientHeight||1;r.setSize(w,h,false);cam.aspect=w/h;
    const vis=frame,d=(vis/2)/Math.tan(cam.fov*Math.PI/360);cam.position.set(0,1.0,d);cam.lookAt(0,1.0,0);
    if(w/h>.75){cam.position.y=.95;cam.lookAt(0,.95,0)}cam.updateProjectionMatrix();}
  const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(size):null;
  const api={
    canvas:r.domElement,
    attach(el,fr){host=el;frame=fr||2.2;el.appendChild(r.domElement);ro&&(ro.disconnect(),ro.observe(el));size();step(0);render()},
    setMode(m){if(m===mode)return;mode=m;gT=0},
    wave(){wavingT=2.4},
    hop(){hop=1},
    start(){if(!raf)raf=requestAnimationFrame(loop)},
    stop(){cancelAnimationFrame(raf);raf=0},
    setVisible(v){visible=v},
    renderStill(){step(0);render()},
    _step:step
  };
  return api;
}
