// GLB avatar: "Businessman" by Grab3D (CC0) driven procedurally; same API as the old procedural rig.
import {WebGLRenderer,Scene,PerspectiveCamera,HemisphereLight,DirectionalLight,Group,Mesh,MeshBasicMaterial,CircleGeometry,SRGBColorSpace,Quaternion,Euler,Vector3,Box3,AnimationMixer,LoopRepeat,Raycaster} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/examples/jsm/libs/meshopt_decoder.module.js';
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
  pointSide:{sx:[0,-.15],sz:[.1,-1.45],ex:[-.1,-.12],hy:[0,-1.2],hdY:-.4,hdZ:.05,brow:.7,spY:-.12},
  hipHand:{sx:[.1,0],sz:[.55,-.08],ex:[-1.6,-.2],ez:[.9,0],hdZ:-.1,spZ:-.05,brow:.3}
};
const TALK=['explain','pointR','shrug','chest','count','explain','dance','thumbs','hipHand','explain','wave'];
// second-order dynamics (f: natural freq Hz, z: damping, r: initial response) - frame-rate independent
function SOD(f,z,r,x0){const w=2*Math.PI*f;return{k1:z/(Math.PI*f),k2:1/(w*w),k3:r*z/w,y:x0||0,v:0,xp:x0||0,up(x,dt){if(dt<=0)return this.y;const xd=(x-this.xp)/dt;this.xp=x;const k2=Math.max(this.k2,dt*dt/2+dt*this.k1/2,dt*this.k1);this.y+=dt*this.v;this.v+=dt*(x+this.k3*xd-this.y-this.k1*this.v)/k2;return this.y}}}
const clamp=(x,a,b)=>x<a?a:x>b?b:x,sstep=(a,b,x)=>{x=clamp((x-a)/(b-a),0,1);return x*x*(3-2*x)};
const noise1=t=>(Math.sin(t*1.13)+Math.sin(t*2.71+1.3)*.5+Math.sin(t*4.37+2.1)*.25)/1.75;
const RMQ=typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const HEIGHT=1.74,_e=new Euler(),_q=new Quaternion(),_q2=new Quaternion();
function E(x,y,z,o){return o.setFromEuler(_e.set(x,y,z,'XYZ'))}
export function create(opts){
  const level=opts.level||(()=>0),dpr=Math.min(devicePixelRatio||1,2);
  const r=new WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power',preserveDrawingBuffer:!!opts.poster});
  r.setPixelRatio(dpr);r.outputColorSpace=SRGBColorSpace;r.setClearColor(0,0);
  const scene=new Scene(),cam=new PerspectiveCamera(20,.5,.1,20);
  scene.add(new HemisphereLight(0xF2F4FF,0x3A3530,2.0));
  const k=new DirectionalLight(0xFFF2E0,2.0);k.position.set(1.2,2.5,3);scene.add(k);
  const rim=new DirectionalLight(0x9DB4FF,1.0);rim.position.set(-2,2,-2);scene.add(rim);
  const root=new Group();scene.add(root);
  let B=null,mixer=null,walkAct=null,mouth=null,ready=false,onReady=[];
  const url=opts.url||new URL('avatar/businessman.glb?v=1',import.meta.url).href;
  new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(url,g=>{
    const m=g.scene;m.updateMatrixWorld(true);
    const bb=new Box3().setFromObject(m),sz=bb.getSize(new Vector3()),s=HEIGHT/sz.y;
    m.scale.multiplyScalar(s);m.updateMatrixWorld(true);const b2=new Box3().setFromObject(m),c=b2.getCenter(new Vector3());m.position.set(-c.x,-b2.min.y,-c.z);
    m.traverse(o=>{if(o.isMesh){o.frustumCulled=false;if(o.material){o.material.side=0}}});
    root.add(m);root.updateMatrixWorld(true);
    const get=n=>m.getObjectByName(n);
    const names=['Hips','Spine02','Spine01','Spine','neck','Head','LeftShoulder','LeftArm','LeftForeArm','LeftHand','RightShoulder','RightArm','RightForeArm','RightHand','LeftUpLeg','LeftLeg','LeftFoot','RightUpLeg','RightLeg','RightFoot'];
    B={};for(const n of names){const o=get(n);if(!o)continue;const pw=new Quaternion();o.parent.getWorldQuaternion(pw);B[n]={o,rest:o.quaternion.clone(),pw,pwi:pw.clone().invert(),W:new Quaternion(),pos:o.position.clone()}}
    // which side is +x (index 0)
    const wp=n=>B[n].o.getWorldPosition(new Vector3());
    const L0=wp('LeftArm').x>wp('RightArm').x;
    B.side=L0?['Left','Right']:['Right','Left'];
    // D0: bring A-pose upper arms to hanging straight down with a slight outward angle
    B.D0=[0,1].map(i=>{const p=B.side[i];const a=wp(p+'Arm'),f=wp(p+'ForeArm');const dir=f.sub(a).normalize();const want=new Vector3(i?-0.03:0.03,-1,0).normalize();return new Quaternion().setFromUnitVectors(dir,want)});
    B.D0i=B.D0.map(q=>q.clone().invert());
    // mouth: small dark ellipse on the face, child of Head
    const head=B.Head.o,hp=head.getWorldPosition(new Vector3());
    const ray=new Raycaster(),y=HEIGHT*0.892;ray.set(new Vector3(0,y,2),new Vector3(0,0,-1));
    const hit=ray.intersectObject(m,true)[0];
    const mz=hit?hit.point.z+0.004:hp.z+0.1;
    mouth=new Mesh(new CircleGeometry(.0105,20),new MeshBasicMaterial({color:0x2A0E0B,transparent:true,opacity:.92}));
    const mp=new Vector3(0,y,mz);scene.add(mouth);head.attach(mouth);mouth.scale.set(1.15,.05,1);B.mouthY=mouth.position.clone();
    if(g.animations&&g.animations.length){mixer=new AnimationMixer(m);const w=g.animations.find(a=>/walk/i.test(a.name));if(w){w.tracks=w.tracks.filter(t=>!/\.position$/.test(t.name)||/Hips/.test(t.name));walkAct=mixer.clipAction(w);walkAct.setLoop(LoopRepeat);walkAct.play();walkAct.setEffectiveWeight(1)}}
    ready=true;step(0);render();onReady.splice(0).forEach(f=>f());
  },undefined,e=>{api.failed=true;onReady.splice(0).forEach(f=>f(e))});
  const cur=JSON.parse(JSON.stringify(BASE));let tgt=JSON.parse(JSON.stringify(BASE));
  const SD={};function sd(k,f,z,r){return SD[k]||(SD[k]=SOD(f,z,r,0))}
  const MS={vx:0,ax:0,sp:0};let phase=0,yawSign=1,pointFn=null,lookY=0,_T=new Vector3(),_S=new Vector3(),_E=new Vector3(),_H=new Vector3(),_d=new Vector3(),_n=new Vector3(),_tq=new Quaternion(),_wq=new Quaternion(),_pq=new Quaternion(),_ray=new Raycaster();
  function aim(o,from,to,dir,w){_d.copy(to).sub(from).normalize();_tq.setFromUnitVectors(_d,dir);o.getWorldQuaternion(_wq);o.parent.getWorldQuaternion(_pq);_wq.premultiply(_tq);_pq.invert().multiply(_wq);o.quaternion.slerp(_pq,w);o.updateMatrixWorld(true)}
  function ik(dt){const w=sd('ptw',1.1,1,0).up(pointFn&&mode!=='walk'&&MS.sp<.05&&(actT<=0||actN==='pointSide')?1:0,dt);if(w<.01||!pointFn||!host)return;
    const p=pointFn();if(!p)return;const rc=r.domElement.getBoundingClientRect();if(!rc.width)return;
    root.updateMatrixWorld(true);_ray.setFromCamera({x:(p.x-rc.left)/rc.width*2-1,y:-(p.y-rc.top)/rc.height*2+1},cam);
    const i=0;const side=B.side;let k=0;{const a=B[side[0]+'Arm'].o.getWorldPosition(_S),o=_ray.ray.origin,d=_ray.ray.direction;const t=(a.z-o.z)/d.z;_T.copy(d).multiplyScalar(t).add(o);k=_T.x>=0?0:1}
    const pr=side[k],U=B[pr+'Arm'].o,F=B[pr+'ForeArm'].o,Hd=B[pr+'Hand'].o;
    U.getWorldPosition(_S);F.getWorldPosition(_E);Hd.getWorldPosition(_H);const L1=_E.distanceTo(_S),L2=_H.distanceTo(_E);
    const o=_ray.ray.origin,d=_ray.ray.direction,t=(_S.z-o.z)/d.z;_T.copy(d).multiplyScalar(t).add(o);
    const D=_T.clone().sub(_S),dl=D.length(),dist=Math.min(dl,(L1+L2)*.995);D.divideScalar(dl||1);
    const a1=Math.acos(clamp((L1*L1+dist*dist-L2*L2)/(2*L1*dist),-1,1));
    _n.set(0,-1,.35);_n.addScaledVector(D,-_n.dot(D)).normalize();
    const Ed=_S.clone().addScaledVector(D,Math.cos(a1)*L1).addScaledVector(_n,Math.sin(a1)*L1);
    aim(U,_S,_E,Ed.sub(_S).normalize(),w);F.getWorldPosition(_E);Hd.getWorldPosition(_H);
    const Tg=_S.clone().addScaledVector(D,dist);aim(F,_E,_H,Tg.sub(_E).normalize(),w);
    lookY=w*clamp(Math.atan2(_T.x,4)*1.2,-.45,.45)}
  let A_talk=false,actN=null,actT=0,walkA=0,mode='idle',gest='idle',gT=0,t=0,shiftT=3,shift=0,mouthV=0,hop=0,host=null,frame=.92,raf=0,last=0,visible=true,wavingT=0;
  function setPose(name){gest=name;const p=P[name]||{};tgt=JSON.parse(JSON.stringify(BASE));for(const k in p)tgt[k]=Array.isArray(p[k])?p[k].slice():p[k];}
  function lerp(a,b,f){return a+(b-a)*f}
  const QI=new Quaternion(),tmp=new Quaternion(),clipQ={};
  // set bone so its world delta equals W (relative to rest), given parent world delta Wp
  function setB(n,Wp,W){const b=B[n];if(!b)return;b.W.copy(W);tmp.copy(Wp).invert().multiply(W);b.o.quaternion.copy(b.pwi).multiply(tmp).multiply(b.pw).multiply(b.rest)}
  function step(dt){
    t+=dt;const f=1-Math.exp(-dt*4.2);gT-=dt;
    if(actT>0){actT-=dt;if(gest!==actN)setPose(actN);if(actN==='dance'&&Math.random()<dt*1.2)hop=1;if(actT<=0){actN=null;gT=0}}
    else if(wavingT>0){wavingT-=dt;if(gest!=='wave')setPose('wave');if(wavingT<=0)gT=0;}
    else if(gT<=0){
      if(mode==='talk'){let n;do{n=TALK[Math.random()*TALK.length|0]}while(n===gest);setPose(n);gT=1.3+Math.random()*1.4;if(n==='dance'||Math.random()<.12)hop=1;}
      else if(mode==='think'){setPose('think');gT=2}
      else if(mode==='listen'){setPose('listen');gT=2}
      else{const x=Math.random();setPose('idle');gT=3+Math.random()*3}
    }
    shiftT-=dt;if(shiftT<=0){shift=(Math.random()<.5?-1:1)*(mode==='talk'?1:.7);shiftT=2+Math.random()*3}
    tgt.hipX=shift*.025;tgt.hipZ=shift*.035;tgt.kn=[shift<0?.14*Math.abs(shift):0,shift>0?.14*Math.abs(shift):0];
    for(const key in cur){if(Array.isArray(cur[key]))for(let i=0;i<2;i++){const S=SD['p'+key+i]||(SD['p'+key+i]=SOD(1.25,.9,.25,cur[key][i]));cur[key][i]=S.up(tgt[key][i],dt)}else{const S=SD['p'+key]||(SD['p'+key]=SOD(1.25,.9,.25,cur[key]));cur[key]=S.up(tgt[key],dt)}}
    if(dt===0)for(const key in cur)cur[key]=Array.isArray(tgt[key])?tgt[key].slice():tgt[key];
    walkA=clamp(sd('wa',1.8,1,0).up(sstep(.02,.22,MS.sp)*(mode==='walk'?1:.6),dt),0,1);
    phase+=(MS.sp/.75)*2*Math.PI*dt; // full gait cycle per 0.75 body-heights travelled: feet planted, no sliding
    if(Math.abs(MS.vx)>.03)yawSign=MS.vx>0?1:-1;
    const yaw=sd('yaw',1.0,1,0).up(walkA*yawSign*.85,dt),yawLag=sd('yawl',.8,.85,0).up(yaw,dt);
    const lean=sd('lean',1.4,.85,0).up(clamp(Math.abs(MS.ax)*.05,0,.22)*Math.sign(MS.ax*yawSign)+walkA*.07,dt);
    const armLag=sd('arml',1.2,.7,0).up(clamp(MS.ax*.12,-.4,.4),dt);root.rotation.y=yaw;
    const L=(mode==='talk'||A_talk)?Math.min(1,level()):0;mouthV=lerp(mouthV,L,1-Math.exp(-dt*25));
    if(!B)return;
    const br=Math.sin(t*1.6)+.3*noise1(t*.6),talkAmp=(mode==='talk'?1:0)*(RMQ?.4:1);if(RMQ)hop=0;
    hop=Math.max(0,hop-dt*2.2);const hopY=Math.sin(hop*Math.PI)*.05;
    const dance=gest==='dance'?Math.sin(t*9):0;
    root.position.set(cur.hipX+dance*.03+Math.sin(phase)*.012*walkA,hopY-Math.abs(dance)*.015-(Math.cos(2*phase)*.012+.004)*walkA,0);
    const Wh=E(0,dance*.15+Math.sin(phase)*.08*walkA,cur.hipZ+dance*.06+Math.sin(phase)*.04*walkA,new Quaternion());setB('Hips',QI,Wh);
    const sp=E(cur.spX+br*.01+lean,cur.spY+Math.sin(t*1.1)*.04*talkAmp,cur.spZ-cur.hipZ*.8-dance*.08,new Quaternion());
    const s1=Wh.clone().multiply(_q.identity().slerp(sp,.34));setB('Spine02',Wh,s1);const s2=s1.clone().multiply(_q.identity().slerp(sp,.33));setB('Spine01',s1,s2);const s3=s2.clone().multiply(_q.identity().slerp(sp,.33));setB('Spine',s2,s3);
    const nk=s3.clone().multiply(E(cur.hdX*.4,cur.hdY*.4,cur.hdZ*.4,new Quaternion()));setB('neck',s3,nk);
    const hd=nk.clone().multiply(E(cur.hdX*.6+Math.sin(t*.7)*.03+(mouthV*.06)+(talkAmp?Math.sin(t*5.3)*.04*mouthV:0),cur.hdY*.6+Math.sin(t*.45)*.08*(1-walkA)+(yawLag-yaw)*.7+lookY,cur.hdZ*.6+Math.sin(t*.9)*.02+(gest==='dance'?Math.sin(t*9)*.1:0),new Quaternion()));setB('Head',nk,hd);
    for(let i=0;i<2;i++){const s=i?-1:1,p=B.side[i];
      let sz=cur.sz[i],sx=cur.sx[i],ex=cur.ex[i],ez=cur.ez[i];
      if(talkAmp){sx+=Math.sin(t*3.1+i*1.7)*.12*(.4+mouthV);ex+=Math.sin(t*4.3+i)*.15*(.4+mouthV)}
      if(gest==='wave'&&i===1){ez+=Math.sin(t*10)*.45}
      if(gest==='dance'){sz+=s*Math.sin(t*9+i*Math.PI)*.25;ex+=Math.sin(t*9)*.3}
      if(gest==='thumbs'||gest==='count'){ex+=Math.sin(t*7)*.12}
      const shUp=gest==='shrug'?cur.shUp*(.5+.5*Math.sin(t*5))*4:0;
      const Wsh=s3.clone().multiply(E(0,0,s*shUp,new Quaternion()));setB(p+'Shoulder',s3,Wsh);
      sx+=walkA*Math.sin(phase)*(i?-1:1)*.42-armLag*.5;const Es=E(sx,cur.sy[i],sz+s*br*.01,new Quaternion());
      const Wa=Wsh.clone().multiply(Es).multiply(B.D0[i]);setB(p+'Arm',Wsh,Wa);
      const Wf=Wa.clone().multiply(B.D0i[i]).multiply(E(ex,0,ez,new Quaternion())).multiply(B.D0[i]);setB(p+'ForeArm',Wa,Wf);
      const Wd=Wf.clone().multiply(B.D0i[i]).multiply(E(cur.hx[i],cur.hy[i],cur.hz[i],new Quaternion())).multiply(B.D0[i]);setB(p+'Hand',Wf,Wd);
      const kn=cur.kn[i]+(gest==='dance'?Math.max(0,Math.sin(t*9+i*Math.PI))*.35:0);
      const Wu=Wh.clone().multiply(E(-kn*.5,0,-cur.hipZ+s*.03,new Quaternion()));setB(p+'UpLeg',Wh,Wu);
      const Wl=Wu.clone().multiply(E(kn,0,0,new Quaternion()));setB(p+'Leg',Wu,Wl);
      setB(p+'Foot',Wl,Wl.clone().multiply(E(-kn*.5,0,cur.hipZ*.5,new Quaternion())));
    }
    if(mixer&&walkA>.01){const keep={};for(const n in B)if(B[n]&&B[n].o)keep[n]=B[n].o.quaternion.clone();const hp=B.Hips.o.position.clone();
      walkAct.time=((phase/(2*Math.PI))%1+1)%1*walkAct.getClip().duration;mixer.update(0);for(const n in keep){const o=B[n].o;if(!/Leg|Foot|Hips/.test(n)){o.quaternion.copy(keep[n]);continue}o.quaternion.copy(keep[n].slerp(o.quaternion,walkA))}
      B.Hips.o.position.set(hp.x,lerp(hp.y,B.Hips.o.position.y,walkA*.5),hp.z)}
    else if(B.Hips)B.Hips.o.position.copy(B.Hips.pos);
    ik(dt);
    if(mouth){mouth.scale.y=.05+mouthV*1.1;mouth.visible=mouthV>.03}
  }
  function render(){if(ready)r.render(scene,cam)}
  function loop(now){raf=requestAnimationFrame(loop);if(!visible||!host||document.hidden){last=now;return}
    const dt=Math.min(.05,(now-(last||now))/1000);last=now;step(dt);render()}
  function size(){if(!host)return;const cv=r.domElement,hw=host.clientWidth||1,hh=host.clientHeight||1,w=cv.clientWidth||hw,h=cv.clientHeight||hh;r.setSize(w,h,false);cam.aspect=w/h;
    const vis=frame*(h/hh),bottom=1.0-frame/2,cy=bottom+vis/2,d=(vis/2)/Math.tan(cam.fov*Math.PI/360);cam.position.set(0,cy,d);cam.lookAt(0,cy,0);cam.updateProjectionMatrix();}
  const ro=typeof ResizeObserver!=='undefined'?new ResizeObserver(size):null;
  const api={
    canvas:r.domElement,
    whenReady(f){if(ready||api.failed)f(api.failed);else onReady.push(f)},
    attach(el,fr){host=el;frame=fr||2.2;el.appendChild(r.domElement);ro&&(ro.disconnect(),ro.observe(el),ro.observe(r.domElement));size();step(0);render()},
    setMode(m){if(m===mode)return;mode=m;gT=0},
    act(n,d){actN=n;actT=d||2;if(n==='hop'){actN='thumbs';hop=1}},
    setTalking(v){A_talk=v},
    setMotion(vx,ax,sp){MS.vx=vx||0;MS.ax=ax||0;MS.sp=sp||0},
    pointAt(fn){pointFn=fn||null},
    setDPR(v){r.setPixelRatio(Math.min(v,3));size()},
    wave(){wavingT=2.4},hop(){hop=1},
    start(){if(!raf)raf=requestAnimationFrame(loop)},
    stop(){cancelAnimationFrame(raf);raf=0},
    setVisible(v){visible=v},
    renderStill(){step(0);render()},
    _step:step,_pose(n){setPose(n);actN=n;actT=999}
  };
  return api;
}
