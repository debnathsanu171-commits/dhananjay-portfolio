# Builds functions/_rag.json from the Knowledge Vault exports in /workspace/vault (scrubbed: no phones, emails, urls, prices, personal lines)
import csv,re,json,glob,os
csv.field_size_limit(10**8);V='/workspace/vault'
def dropprice(t):
  o=[];cols=None
  for ln in t.split('\n'):
    if ln.strip().startswith('|'):
      c=ln.strip().strip('|').split('|')
      if cols is None: cols=[i for i,x in enumerate(c) if re.search(r'(?i)₹|mrp|price|rate|cost|rs\b|inr',x)]
      ln='|'+'|'.join(x for i,x in enumerate(c) if i not in cols)+'|'
    else: cols=None
    o.append(ln)
  return '\n'.join(o)
def scrub(t):
  t=dropprice(t)
  t=re.sub(r'(?im)^.*(prepared for|sanu|dhananjay|debnath).*$','',t)
  t=re.sub(r'https?://\S+|www\.\S+','',t)
  t=re.sub(r'[\w.+-]+@[\w-]+\.[\w.]+','',t)
  t=re.sub(r'(\+?91[\s-]?)?\b[6-9]\d{4}[\s-]?\d{5}\b','',t)
  t=re.sub(r'\b\d{3,4}[\s-]\d{6,8}\b','',t)
  t=re.sub(r'(₹|Rs\.?|INR)\s?[\d,.]+(\s?[-–]\s?[\d,.]+)?(\s?(/|per)\s?[\w.]+)?(\s?(lakh|crore|k))?','[price]',t,flags=re.I)
  t=re.sub(r'\b[\d,.]+\s?(₹|rupees|/-)','[price]',t,flags=re.I)
  t=re.sub(r'(?i)\b(client|customer)\s*:\s*[A-Z][\w .]+','client',t)
  return re.sub(r'[ \t]+',' ',re.sub(r'\n{3,}','\n\n',t)).strip()
out=[]
def add(title,text):
  text=scrub(text);w=text.split()
  for i in range(0,len(w),220):
    seg=' '.join(w[max(0,i-30):i+220])
    if len(seg)>200: out.append({'s':title,'t':seg})
for r in csv.DictReader(open(V+'/rag_chunks.csv')):
  add(r['source_title'],(r['topic']+'\n'+r['text']))
for f in sorted(glob.glob(V+'/*.md'))+sorted(glob.glob(os.path.dirname(os.path.abspath(__file__))+'/rag_extra/*.md')):
  add(os.path.basename(f)[:-3].replace('_',' '),open(f).read())
P=os.path.dirname(os.path.abspath(__file__))+'/../functions/_rag.js'
open(P,'w').write('export default '+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n')
print(len(out),'chunks',os.path.getsize(P))
