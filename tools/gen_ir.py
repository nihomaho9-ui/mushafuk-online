# I'rab (ir) and Gharib (wb) sections: surah list + 604 reader pages opening the in-Mushaf panel
import json,html,os,re
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__)));os.chdir(R)
B="https://mushafuk.online";E=html.escape
g=open('tools/gen_tr.py').read();ns={"__file__":os.path.abspath("tools/gen_tr.py")}
exec(g.split('urls=[]')[0].replace("os.chdir(R)","os.chdir(R)"),ns)
AR,AZ,EN,START,CNT,CSS,FS=[ns[x] for x in 'AR AZ EN START CNT CSS FS'.split()]
NAMES={'ar':AR,'az':AZ,'tr':EN,'en':EN,'ru':EN}
KIND={'ir':('irab_muyassar',{'ar':('irab','الإعراب','إعراب القرآن الكريم','إعراب الآيات صفحةً صفحة: الإعراب الميسر، النحاس، الدرويش، الجدول.'),
 'az':('erab','Erab','Quranın erabı (الإعراب)','Quran ayələrinin ərəb qrammatikası ilə erabı, səhifə-səhifə.'),
 'tr':('irab','İrab',"Kur'an i'rabı (الإعراب)","Kur'an ayetlerinin i'rabı, sayfa sayfa."),
 'en':('irab',"I'rab","Quran i'rab (الإعراب)","Grammatical analysis (i'rab) of Quran verses, page by page."),
 'ru':('irab','Иараб','Иараб Корана (الإعراب)','Грамматический разбор (иараб) аятов Корана, по страницам.')}),
'wb':('seraj',{'ar':('gharib','غريب القرآن','غريب القرآن','معاني الكلمات الغريبة في القرآن: السراج، ابن قتيبة.'),
 'az':('qerib','Qəribul-Quran','Qəribul-Quran (غريب القرآن)','Quranda çətin sözlərin mənaları, səhifə-səhifə.'),
 'tr':('garib','Garîbu’l-Kur’ân',"Garîbu'l-Kur'ân (غريب القرآن)","Kur'an'daki garip kelimelerin anlamları, sayfa sayfa."),
 'en':('gharib','Gharib al-Quran','Gharib al-Quran (غريب القرآن)','Meanings of rare Quranic words, page by page.'),
 'ru':('gharib','Гариб аль-Куран','Гариб аль-Куран (غريب القرآن)','Значения редких слов Корана, по страницам.')})}
UI={'ar':('آية','صفحة','المصحف','rtl'),'az':('ayə','Səhifə','Mushaf','ltr'),'tr':('ayet','Sayfa','Mushaf','ltr'),'en':('verses','Page','Mushaf','ltr'),'ru':('аятов','Страница','Мусхаф','ltr')}
urls=[]
for kind,(bid,LL) in KIND.items():
  for lg,(slug,title,h1,desc) in LL.items():
    pre='' if lg=='ar' else lg+'/';base=pre+slug;ay,pg,mu,d=UI[lg];N=NAMES[lg]
    up='../' if lg=='ar' else '../../';url=f"{B}/{base}/";urls.append(url)
    items=''.join(f'<a href="page/{START[s]}/#{s}-1"><span class="k">{s}</span><span class="nm">{E(N[s-1])}<small>{CNT[s]} {ay} · {pg} {START[s]}</small></span>'+('' if lg=='ar' else f'<span class="a" dir="rtl">{E(AR[s-1])}</span>')+'</a>' for s in range(1,115))
    h=(f'<!doctype html><html lang="{lg}" dir="{d}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{E(h1)} | Mushafuk.online</title><meta name="description" content="{E(desc)}"><link rel="canonical" href="{url}"><meta property="og:title" content="{E(h1)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{B}/icon.png"><link rel="icon" href="{up}icon.png"><link rel="stylesheet" href="{up}site.css?v=7">{FS}<style>{CSS}</style></head><body>'
      f'<header class="nav"><div class="in"><a class="logo" href="{up}{pre}" dir="ltr"><img src="{up}icon.png" alt="">Mushafuk<span>.online</span></a><nav><a href="{up}{pre}quran/">{mu}</a><a href="{up}{base}/" class=on>{E(title)}</a></nav></div></header>'
      f'<main class="tw"><h1>{E(h1)}</h1><p style="text-align:center">{E(desc)}</p><div class="sl">{items}</div></main><footer>© 2026 Mushafuk.online</footer><script src="{up}site.js?v=7"></script></body></html>')
    os.makedirs(base,exist_ok=True);open(base+'/index.html','w',encoding='utf8').write(h)
    for p in range(1,605):
      url=f"{B}/{base}/page/{p}/";urls.append(url)
      h=open(f"{pre}page/{p}/index.html",encoding='utf8').read()
      h=re.sub(r'<link rel="canonical" href="[^"]*">',f'<link rel="canonical" href="{url}">',h)
      h=re.sub(r'<link rel="alternate" hreflang[^>]*>','',h)
      h=h.replace('<base href="/">','<base href="/">'+f'<script>try{{var q=JSON.parse(localStorage.getItem("qm.prefs")||"{{}}");if(!q.{kind})q.{kind}="{bid}";q.tab="{kind}";localStorage.setItem("qm.prefs",JSON.stringify(q));}}catch(e){{}}</script>',1)
      h=h.replace('</body>',f'<script>(function w(i){{if(window.QM&&window.QM_PAGE&&window.QM_PAGE({p})){{QM.openFull("{kind}",null,{p});return}}if(i<200)setTimeout(function(){{w(i+1)}},100)}})(0)</script></body>',1)
      o=f"{base}/page/{p}";os.makedirs(o,exist_ok=True);open(o+'/index.html','w',encoding='utf8').write(h)
open('sitemap-ir.xml','w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'<url><loc>{u}</loc></url>\n' for u in urls)+'</urlset>\n')
sm=open('sitemap.xml').read()
if 'sitemap-ir.xml' not in sm: open('sitemap.xml','w').write(sm.replace('</sitemapindex>',f'<sitemap><loc>{B}/sitemap-ir.xml</loc></sitemap>\n</sitemapindex>'))
print(len(urls))
