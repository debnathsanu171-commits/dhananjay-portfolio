# Builds functions/_kb.json (+ _kb.js wrapper) from resume.html + index.html so the chat bot knows every site fact.
import re,html,json
def txt(f):
  s=open(f).read();s=re.sub(r'(?s)<(script|style|svg|head|nav|button)[^>]*>.*?</\1>',' ',s);s=re.sub(r'<br\s*/?>|</(p|li|h\d|div|tr|section|figcaption)>','\n',s);s=re.sub(r'<[^>]+>',' ',s);s=html.unescape(s)
  s=re.sub(r'[ \t]+',' ',s);s=re.sub(r'\n\s*\n+','\n',s);return s.strip()
r=txt('resume.html').replace('Download PDF','')
i=txt('index.html')
i=re.sub(r'^.*?Precision & production','Precision & production',i,flags=re.S)
lines=[];seen=set()
for l in i.split('\n'):
  k=l.strip()
  if len(k)<3 or k in seen or k in('Download CV','WhatsApp','WhatsApp me'):continue
  seen.add(k);lines.append(k)
kb="RESUME:\n"+r+"\n\nPORTFOLIO WEBSITE TEXT:\n"+'\n'.join(lines)
import datetime
open('functions/_kb.json','w').write(json.dumps({'generated':datetime.datetime.now().isoformat(timespec='seconds'),'sources':['resume.html','index.html'],'resume':r,'site':'\n'.join(lines),'kb':kb},ensure_ascii=False))
open('functions/_kb.js','w').write('// generated from functions/_kb.json by tools/build_kb.py\nexport const KBD='+open('functions/_kb.json').read()+';\nexport const KB=KBD.kb;\n')
print(len(kb))
