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
hs=open('index.html').read()
caps=[];[caps.append(c) for c in (html.unescape(re.sub(r'<[^>]+>',' ',m)).strip() for m in re.findall(r'<figcaption[^>]*>(.*?)</figcaption>',hs,re.S)) if c and c not in caps]
kb+="\n\nMACHINE CARDS AND WORK PHOTO/VIDEO CAPTIONS (exact):\n"+'\n'.join('- '+re.sub(r'\s+',' ',c) for c in caps)
kb+="""

EMPLOYER <-> MACHINE LINKS (only these are confirmed; never attribute any other machine model to a specific employer):
- Designer Private Limited, Kolkata (2016-2018, Cutting Operator): panel saw, edge banding, hardware fitting, reading cutting plans and drawings.
- Kutchina Kitchen Appliances Pvt Ltd, Barrackpore, Kolkata (2018-Aug 2021, Cutting Machine & Multi Boring Operator, contract): Biesse panel saw and Biesse multi boring, edge banding, hot pressing, hardware fitting for modular kitchens. The site does NOT say which Biesse model was used at Kutchina.
- Kiran Furniture (Kanika Furniture), Bhubaneswar, Odisha (Oct 2021-Dec 2023, All-Rounder Operator, contract via Hunny Impex with own team): Excel cut lists from 2D drawings, MaxCut optimisation, multi boring, edge banding, panel saw, spindle grooving, floor management, QC, machine setup.
- Timber Tech (Wood Aura), Raipur, Chhattisgarh (Mar 2024-present, Production Manager): supervises Biesse CNC drilling, Altendorf panel saw (Altendorf F 45 is 'supervised in current role'), edge banding and multi boring; Spazio 3D cut lists, BOMs and CNC programs.
- The machine list (Rover Gold 1232, Selco SK 3, Jade 340, Akron 1440, Jai, Optimus, Hunny Impex, KDT, Homag EDGETEQ, Shrichakra hot press, spindle moulder) is machines I have run or supervised across my career; except where stated above, the site does not say at which company each one was used. If asked, say so honestly.
PROJECTS I BUILT (verified from the live app; say nothing beyond this):
- JD Ops Pro, built for my own product JINNY MOD GO. I developed this web app myself. Link: https://jdopspro.pages.dev
- What it is: a web app for modular furniture factories. Verified parts: an owner console, CRM, factory and operator portals, and a panel cut optimizer (JINY OPTI GO) with project, edge band, raw material and remnant screens.
- Access: logins are issued by the owner; there is no public signup. Each factory is isolated, and the owner can suspend a client's whole team.
- Unknown: user counts, number of factories, launch date, tech stack. Say I do not have that detail here.
UNKNOWN (not on the site): notice period, exact joining date, current salary, team size numbers, client names, project counts. Say I do not have that detail here and offer WhatsApp +91 77976 91585.
"""
import datetime
open('functions/_kb.json','w').write(json.dumps({'generated':datetime.datetime.now().isoformat(timespec='seconds'),'sources':['resume.html','index.html'],'resume':r,'site':'\n'.join(lines),'kb':kb},ensure_ascii=False))
open('functions/_kb.js','w').write('// generated from functions/_kb.json by tools/build_kb.py\nexport const KBD='+open('functions/_kb.json').read()+';\nexport const KB=KBD.kb;\n')
print(len(kb))
