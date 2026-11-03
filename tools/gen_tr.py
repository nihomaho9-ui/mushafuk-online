import json,html,os,re
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));os.chdir(R)
B="https://mushafuk.online";E=html.escape
src=open('tools/gen_pages.py').read()
AR=re.search(r'const ARNAMES = "([^"]*)"',open('quran/index.html').read()).group(1).split(',')
AZ=re.search(r'NAMES = "([^"]*)"',open('az/quran/index.html').read()).group(1).split(',')
EN=re.search(r'EN="([^"]*)"',src).group(1).split(',')
TXT={}
for l in open('quran-uthmani.txt',encoding='utf8'):
  p=l.rstrip('\n').split('|')
  if len(p)==3:TXT[(int(p[0]),int(p[1]))]=p[2]
AY=json.load(open('yazi-ayahs.json'))
def flat(f): return json.load(open(f))['v']
def dirj(d): return [json.load(open(f'tr/{d}/{s}.json'))['t'] for s in range(1,115)]
START={};SP={}
for p in range(1,605):
  for k,_ in AY[str(p)]:
    s,a=map(int,k.split(':'));SP[(s,a)]=p
    if a==1 and s not in START:START[s]=p
L={
'az':dict(slug='tercume',n=AZ,tn='Əlixan Musayev',T=lambda:flat('tr/az.musayev.json'),title='Tərcümə',h='Quran tərcüməsi — Azərbaycanca',pg='Səhifə',su='surəsi',ay='ayə',pv='Əvvəlki',nx='Sonrakı',all='Bütün surələr',mu='Mushafda aç',d='Quranın Azərbaycan dilinə tərcüməsi (Musayev), səhifə {p}: {s}. Ərəbcə mətn və tərcümə ayə-ayə.'),
'tr':dict(slug='meal',n=EN,tn='Ali Özek ve diğerleri',T=lambda:dirj('turkish_shahin'),title='Meal',h="Kur'an meali — Türkçe",pg='Sayfa',su='Suresi',ay='ayet',pv='Önceki',nx='Sonraki',all='Tüm sureler',mu="Mushafta aç",d="Kur'an-ı Kerim Türkçe meali, sayfa {p}: {s}. Arapça metin ve meal ayet ayet."),
'en':dict(slug='translation',n=EN,tn='Saheeh International',T=lambda:dirj('english_saheeh'),title='Translation',h='Quran translation — English',pg='Page',su='',ay='verses',pv='Previous',nx='Next',all='All surahs',mu='Open in Mushaf',d='Quran English translation (Saheeh International), page {p}: {s}. Arabic text and translation verse by verse.'),
'ru':dict(slug='perevod',n=EN,tn='Эльмир Кулиев',T=lambda:flat('tr/ru.kuliev.json'),title='Перевод',h='Перевод Корана — Русский',pg='Страница',su='',ay='аятов',pv='Назад',nx='Далее',all='Все суры',mu='Открыть в мусхафе',d='Перевод смыслов Корана (Кулиев), страница {p}: {s}. Арабский текст и перевод по аятам.'),
}
CNT={s:max(a for (x,a) in TXT if x==s) for s in range(1,115)}
CSS='''.tw{max-width:860px;margin:1.5rem auto;padding:0 1rem 4rem}.tw h1{text-align:center}.sl{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:.6rem}.sl a{display:flex;align-items:center;gap:.7rem;padding:.7rem .9rem;border:1px solid rgba(0,0,0,.08);border-radius:12px;background:#fff;text-decoration:none;color:inherit}.sl .k{width:2.2rem;height:2.2rem;border-radius:50%;display:grid;place-items:center;background:var(--em,#0b6b4f);color:#fff;font-size:.85rem;flex:none}.sl .nm{flex:1}.sl .nm small{display:block;opacity:.6}.sl .a{font-family:"Amiri","Scheherazade New",serif;font-size:1.3rem}.sh{text-align:center;margin:2rem 0 1rem;padding:.8rem;border-radius:12px;background:rgba(11,107,79,.07)}.sh .a{font-size:1.6rem;font-family:"Amiri",serif}.v{padding:1rem 0;border-bottom:1px solid rgba(0,0,0,.08)}.v .r{font-family:"Amiri","Scheherazade New",serif;font-size:1.7rem;line-height:2.3;text-align:right}.v .t{margin-top:.5rem;line-height:1.7}.v .k{display:inline-block;min-width:2.6rem;text-align:center;font-size:.8rem;padding:.1rem .4rem;border-radius:8px;background:var(--em,#0b6b4f);color:#fff;margin-inline-end:.5rem}.pn{display:flex;justify-content:space-between;gap:1rem;margin:2rem 0}.top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;margin:.5rem 0 1rem}'''
FS='<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Amiri&display=swap" rel="stylesheet">'
def head(lg,t,d,url,up,extra=''):
  return f'<!doctype html><html lang="{lg}" dir="ltr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{E(t)} | Mushafuk.online</title><meta name="description" content="{E(d)}"><link rel="canonical" href="{url}">{extra}<meta property="og:title" content="{E(t)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{B}/icon.png"><link rel="icon" href="{up}icon.png"><link rel="stylesheet" href="{up}site.css?v=7">{FS}<style>{CSS}</style></head><body>'
def nav(c,up,pre):
  return f'<header class="nav"><div class="in"><a class="logo" href="{up}{pre}" dir="ltr"><img src="{up}icon.png" alt="">Mushafuk<span>.online</span></a><nav><a href="{up}{pre}quran/">Mushaf</a><a href="{up}{pre}{c["slug"]}/" class=on>{c["title"]}</a><a href="{up}{pre}translations.html">⋯</a></nav></div></header>'
urls=[]
for lg,c in L.items():
  pre=lg+'/';T=c['T']();base=f"{pre}{c['slug']}"
  # index
  up='../../';url=f"{B}/{base}/";urls.append(url)
  items=''.join(f'<a href="page/{START[s]}/#{s}-1"><span class="k">{s}</span><span class="nm">{E(c["n"][s-1])}<small>{CNT[s]} {c["ay"]} · {c["pg"]} {START[s]}</small></span><span class="a" dir="rtl">{E(AR[s-1])}</span></a>' for s in range(1,115))
  h=head(lg,c['h'],c['d'].format(p=1,s=c['all']),url,up)+nav(c,up,pre)+f'<main class="tw"><h1>{E(c["h"])}</h1><p style="text-align:center">{E(c["tn"])}</p><div class="sl">{items}</div></main><footer>© 2026 Mushafuk.online</footer><script src="{up}site.js?v=7"></script></body></html>'
  os.makedirs(base,exist_ok=True);open(base+'/index.html','w',encoding='utf8').write(h)
  up='../../../../'
  for p in range(1,605):
    keys=[tuple(map(int,k.split(':'))) for k,_ in AY[str(p)]]
    ss=[];[ss.append(s) for s,_ in keys if s not in ss]
    sn=' / '.join(c['n'][s-1] for s in ss)
    url=f"{B}/{base}/page/{p}/";urls.append(url)
    body='';last=None
    for s,a in keys:
      if s!=last:
        body+=f'<div class="sh" id="s{s}"><div class="a" dir="rtl">سورة {E(AR[s-1])}</div><div>{E(c["n"][s-1])} {c["su"]}</div></div>';last=s
      tt=T[s-1][a-1] if a-1<len(T[s-1]) else ''
      body+=f'<div class="v" id="{s}-{a}"><div class="r" dir="rtl" lang="ar">{E(TXT.get((s,a),""))} ﴿{a}﴾</div><div class="t"><span class="k">{s}:{a}</span>{E(tt)}</div></div>'
    pn=(f'<a class="btn" rel="prev" href="../{p-1}/">← {c["pv"]}</a>' if p>1 else '<span></span>')+(f'<a class="btn" rel="next" href="../{p+1}/">{c["nx"]} →</a>' if p<604 else '<span></span>')
    t=f'{sn} — {c["title"]}, {c["pg"]} {p}'
    ex=(f'<link rel="prev" href="../{p-1}/">' if p>1 else '')+(f'<link rel="next" href="../{p+1}/">' if p<604 else '')
    h=head(lg,t,c['d'].format(p=p,s=sn),url,up,ex)+nav(c,up,pre)+f'<main class="tw"><div class="top"><a href="../../">☰ {c["all"]}</a><strong>{E(sn)} · {c["pg"]} {p}</strong><a href="{up}{pre}page/{p}/">{c["mu"]}</a></div>{body}<nav class="pn">{pn}</nav></main><footer>© 2026 Mushafuk.online</footer><script src="{up}site.js?v=7"></script></body></html>'
    o=f"{base}/page/{p}";os.makedirs(o,exist_ok=True);open(o+'/index.html','w',encoding='utf8').write(h)
  # link from translations page
  f=f'{lg}/translations.html';x=open(f,encoding='utf8').read()
  x=re.sub(r'<p class="trl">.*?</p>','',x)
  x=x.replace('</h1>',f'</h1><p class="trl"><a class="btn" href="{c["slug"]}/">{E(c["h"])} →</a></p>',1)
  x=re.sub(r'(<div class="b">'+{'az':'Azərbaycanca','tr':'Türkçe','en':'English','ru':'Русский'}[lg]+r'</div>)',r'\1',x)
  open(f,'w',encoding='utf8').write(x)
open('sitemap-tr.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'<url><loc>{u}</loc></url>\n' for u in urls)+'</urlset>\n')
sm=open('sitemap.xml').read()
if 'sitemap-tr.xml' not in sm: open('sitemap.xml','w').write(sm.replace('</sitemapindex>',f'<sitemap><loc>{B}/sitemap-tr.xml</loc></sitemap>\n</sitemapindex>'))
print(len(urls))
