import os,re,json,html
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));os.chdir(R)
exec(open('tools/gen_pages.py').read().split("urls=[]")[0])  # reuse L, AY, TXT, names
B="https://mushafuk.online";E=html.escape
QP='+new URLSearchParams(location.search).get("page")'
urls=[]
for lg,c in L.items():
  pre=c['pre'];src=f"{pre}quran.html"
  s=open(src,encoding="utf8").read()
  if "location.replace" in s: s=open(f"{pre}quran/index.html",encoding="utf8").read()
  s=re.sub(r'<base [^>]*>','<base href="/">',s,1)
  if '<base ' not in s: s=s.replace('<head>','<head><base href="/">',1)
  s=s.replace(QP,'+(window.__PAGE||new URLSearchParams(location.search).get("page"))')
  s=s.replace('quran.html','quran/')
  os.makedirs(f"{pre}quran",exist_ok=True)
  open(f"{pre}quran/index.html",'w',encoding='utf8').write(s)
  # quran.html -> redirect to clean URL
  open(src,'w').write(f'<!doctype html><meta charset="utf-8"><link rel="canonical" href="{B}/{pre}quran/"><script>var p=+new URLSearchParams(location.search).get("page");location.replace("/{pre}"+(p>=1&&p<=604?"page/"+p+"/":"quran/"))</script>')
  for p in range(1,605):
    keys=[tuple(map(int,k.split(':'))) for k,_ in AY[str(p)]]
    ss=[];[ss.append(x) for x,_ in keys if x not in ss]
    sn=' / '.join(c['n'][x-1] for x in ss)
    f=dict(p=p,s=sn,r=f"{keys[0][0]}:{keys[0][1]}–{keys[-1][0]}:{keys[-1][1]}")
    url=f"{B}/{pre}page/{p}/";urls.append(url)
    t=E(c['t'].format(**f))+' | Mushafuk.online';d=E(c['d'].format(**f))
    alts=''.join(f'<link rel="alternate" hreflang="{l2}" href="{B}/{L[l2]["pre"]}page/{p}/">' for l2 in L)+f'<link rel="alternate" hreflang="x-default" href="{B}/page/{p}/">'
    head=f'<title>{t}</title><meta name="description" content="{d}"><link rel="canonical" href="{url}">{alts}<meta property="og:title" content="{t}"><meta property="og:description" content="{d}"><meta property="og:url" content="{url}"><meta property="og:image" content="{B}/icon.png"><script>window.__PAGE={p}</script>'
    h=re.sub(r'<title>.*?</title>','',s,1,flags=re.S)
    h=re.sub(r'<meta name="description"[^>]*>','',h)
    h=h.replace('<base href="/">','<base href="/">'+head,1)
    txt=''.join(f'<p>{E(TXT.get(k,""))} ﴿{k[1]}﴾</p>' for k in keys)
    h=h.replace('</body>',f'<noscript><div lang="ar" dir="rtl">{txt}</div></noscript></body>',1)
    o=f"{pre}page/{p}";os.makedirs(o,exist_ok=True);open(o+'/index.html','w',encoding='utf8').write(h)
for lg,c in L.items():
  open(f"sitemap-pages-{lg}.xml",'w').write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join(f'<url><loc>{u}</loc></url>' for u in urls if u.startswith(f"{B}/{c['pre']}page/"))+'</urlset>')
