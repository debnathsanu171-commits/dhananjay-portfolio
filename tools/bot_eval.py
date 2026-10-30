import json,re,sys,urllib.request,concurrent.futures as cf
U='https://debnathofficial.pages.dev/api/chat';M=sys.argv[1] if len(sys.argv)>1 else None
E=json.load(open('tools/bot_eval.json'))
def run(e):
  body={'messages':[{'role':'user','content':e['q']}],'lang':e.get('lang','en')}
  if M:body['_m']=M
  for k in range(2):
    try:
      r=urllib.request.urlopen(urllib.request.Request(U,json.dumps(body).encode(),{'content-type':'application/json','user-agent':'eval'}),timeout=90);d=json.load(r);break
    except Exception as ex:d={'reply':'ERR '+str(ex)}
  t=d.get('reply','');bad=[p for p in e.get('must',[]) if not re.search(p,t,re.I)]+['NOT:'+p for p in e.get('not',[]) if re.search(p,t,re.I if not p.startswith('\\b(') else re.I)]
  return e['q'],not bad,bad,d.get('model'),t
import time,os
PACE=float(os.environ.get('PACE','0'))
if PACE:
  res=[]
  for e in E:res.append(run(e));time.sleep(PACE)
else:
  with cf.ThreadPoolExecutor(4) as ex:res=list(ex.map(run,E))
ok=sum(r[1] for r in res)
for q,g,bad,m,t in res:
  print(('PASS' if g else 'FAIL'),q,'' if g else bad,'' if g else '| '+t[:220].replace('\n',' '))
from collections import Counter
print('models',dict(Counter(r[3] for r in res)),'accuracy %d/%d'%(ok,len(res)))
