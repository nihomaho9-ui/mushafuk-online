(function () {
  const UI = {
    az: { title: "Axtarış", lead: "Quran, təfsir, tərcümə, erab və söz mənalarında axtarır. Nəticə sayı və ünvanı göstərilir.", ph: "", go: "Axtar", empty: "Heç nə tapılmadı. Başqa söz yoxlayın.", page: "Səhifə", surah: "Surə", loading: "Hazırlanır…", more: "Daha çox", n: "nəticə", chips: [["2:255", "Ayətül-Kürsi"], ["Fatihə", "Fatihə"], ["mərhəmət", "mərhəmət"], ["كرسي", "كرسي"]], an: "Analiz", anTf: "Sədi və qısa təfsirlərdə axtarıram.", anTr: "Bu dildəki tərcümədə axtarıram.", anDeep: "Bütün saytda axtarıram." },
    tr: { title: "Arama", lead: "Kur'an, tefsir, meal, irab ve kelime anlamlarında arar. Sonuç sayısı ve adres çıkar.", ph: "", go: "Ara", empty: "Bir şey bulunamadı. Başka bir söz deneyin.", page: "Sayfa", surah: "Sure", loading: "Hazırlanıyor…", more: "Daha fazla", n: "sonuç", chips: [["2:255", "Ayetel Kürsi"], ["Fatiha", "Fatiha"], ["rahmet", "rahmet"], ["كرسي", "كرسي"]], an: "Analiz", anTf: "Sa'dî ve kısa tefsirlerde arıyorum.", anTr: "Bu dilin mealinde arıyorum.", anDeep: "Tüm sitede arıyorum." },
    en: { title: "Search", lead: "Searches the Quran, tafsir, translations, i'rab and word meanings. Shows the count and the address.", ph: "", go: "Search", empty: "Nothing matched. Try another word.", page: "Page", surah: "Surah", loading: "Getting ready…", more: "More", n: "results", chips: [["2:255", "Ayat al-Kursi"], ["Al-Fatihah", "Al-Fatihah"], ["mercy", "mercy"], ["كرسي", "كرسي"]], an: "Reading", anTf: "Searching Saadi and the short tafsirs.", anTr: "Searching the translation in this language.", anDeep: "Searching the whole site." },
    ar: { title: "بحث", lead: "يبحث في المصحف والتفسير والترجمة والإعراب وغريب القرآن. يظهر عدد النتائج والعنوان.", ph: "", go: "بحث", empty: "لا نتيجة. جرّب كلمة أخرى.", page: "صفحة", surah: "سورة", loading: "جارٍ التحضير…", more: "المزيد", n: "نتيجة", chips: [["2:255", "آية الكرسي"], ["الفاتحة", "الفاتحة"], ["رحمة", "رحمة"], ["كرسي", "كرسي"]], an: "تحليل", anTf: "أبحث في السعدي والتفاسير المختصرة.", anTr: "أبحث في ترجمة هذه اللغة.", anDeep: "أبحث في الموقع كله." },
    ru: { title: "Поиск", lead: "Ищет в Коране, тафсире, переводах, иарабе и значениях слов. Показывает число и адрес.", ph: "", go: "Найти", empty: "Ничего не найдено. Попробуйте другое слово.", page: "Страница", surah: "Сура", loading: "Готовлю…", more: "Ещё", n: "результат", chips: [["2:255", "Аят аль-Курси"], ["Аль-Фатиха", "Аль-Фатиха"], ["милость", "милость"], ["كرسي", "كرسي"]], an: "Разбор", anTf: "Ищу у ас-Саади и в кратких тафсирах.", anTr: "Ищу в переводе этого языка.", anDeep: "Ищу по всему сайту." },
  };
  const KIND = {
    az: { q: "Quran", tr: "Tərcümə", tf: "Təfsir", ir: "Erab", wb: "Söz mənası" },
    tr: { q: "Kur'an", tr: "Meal", tf: "Tefsir", ir: "İrab", wb: "Kelime" },
    en: { q: "Quran", tr: "Translation", tf: "Tafsir", ir: "I'rab", wb: "Word" },
    ar: { q: "المصحف", tr: "ترجمة", tf: "تفسير", ir: "إعراب", wb: "غريب" },
    ru: { q: "Коран", tr: "Перевод", tf: "Тафсир", ir: "Иараб", wb: "Слово" },
  };
  const SCOPE = {
    az: { fast: "Sürətli", deep: "Dərin" },
    tr: { fast: "Hızlı", deep: "Derin" },
    en: { fast: "Fast", deep: "Deep" },
    ar: { fast: "سريع", deep: "عميق" },
    ru: { fast: "Быстрый", deep: "Глубокий" },
  };
  const SHORT = new Set(["السعدي", "التفسير الميسر", "المختصر", "أيسر التفاسير"]);
  const ANS = {
    az: { ans: "Cavab", saadi: "Təfsir · əs-Sədi", ayahs: "ayədir", places: "Digər yerlər" },
    tr: { ans: "Cevap", saadi: "Tefsir · es-Sa'dî", ayahs: "ayettir", places: "Diğer yerler" },
    en: { ans: "Answer", saadi: "Tafsir · al-Saadi", ayahs: "verses", places: "Other places" },
    ar: { ans: "الجواب", saadi: "التفسير · السعدي", ayahs: "آية", places: "مواضع أخرى" },
    ru: { ans: "Ответ", saadi: "Тафсир · ас-Саади", ayahs: "аятов", places: "Другие места" },
  };
  const CONCEPTS = [
    ["merhemet merhamet rahmet mercy милость", "رحمه"],
    ["namaz salat salah prayer намаз", "صلاه"],
    ["oruc savm fasting пост", "صوم"],
    ["zekat zakat закят", "زكاه"],
    ["hecc hac hajj хадж", "حج"],
    ["tovhid tevhid tawhid таухид", "توحيد"],
    ["iman faith иман", "ايمان"],
    ["cennet paradise рай", "جنه"],
    ["cehennem hell جهنم", "جهنم"],
    ["peygember peygamber prophet пророк", "رسول"],
    ["bagislanma magfiret forgiveness прощение", "مغفره"],
    ["sukur gratitude", "شكر"],
    ["sebir sabir patience терпение", "صبر"],
    ["teqva takva taqwa", "تقوي"],
    ["ilim knowledge знание", "علم"],
    ["dua мольба", "دعا"],
    ["cihad jihad джихад", "جهاد"],
    ["halal helal халяль", "حلال"],
    ["haram харам", "حرام"],
    ["sirk shirk ширк", "شرك"],
    ["melekler melek angels ангелы", "ملائكه"],
    ["qiyamet kiyamet", "قيامه"],
    ["valideyn родители", "والدين"],
    ["yetim сирота", "يتيم"],
    ["riba faiz риба", "ربا"],
    ["serab вино", "خمر"],
    ["hicab hijab хиджаб", "حجاب"],
    ["nikah никах", "نكاح"],
    ["bosanma развод", "طلاق"],
    ["miras наследство", "ميراث"],
    ["secde суджуд", "سجده"],
    ["qible кибла", "قبله"],
    ["ramazan ramadan рамадан", "رمضان"],
    ["qedr kadir qadr", "قدر"],
    ["ixlas ihlas ихлас", "اخلاص"],
    ["tevekkul", "توكل"],
    ["zikir dhikr", "ذكر"],
    ["quran kuran коран", "قران"],
  ];
  const NAV = {
    az: [["../quran/", "Quran"], ["../tafsir.html", "Təfsir"], ["../translations/", "Tərcümələr"], ["../about.html", "Haqqında"]],
    tr: [["../quran/", "Kur'an"], ["../tafsir.html", "Tefsir"], ["../translations/", "Mealler"], ["../about.html", "Hakkında"]],
    en: [["../quran/", "Quran"], ["../tafsir.html", "Tafsir"], ["../translations/", "Translations"], ["../about.html", "About"]],
    ar: [["../quran/", "القرآن"], ["../tafsir.html", "التفاسير"], ["../translations/", "الترجمات"], ["../about.html", "من نحن"]],
    ru: [["../quran/", "Коран"], ["../tafsir.html", "Тафсир"], ["../translations/", "Переводы"], ["../about.html", "О нас"]],
  };
  const STOP = {
    az: "ve və bir bu da de haqqinda haqqında aye ayə ayeler ayələr olan ucun üçün nedir nədir hansı ile ilə oku oxu",
    tr: "ve bir bu da hakkında hakkinda ayet ayetler nedir olan ile oku",
    en: "the a an of and to in for verse verses about what is ayah surah",
    ar: "في من عن على الى الي ما هو هي هذا هذه ذلك التي الذي آية آيات سورة معنى تفسير اشرح فسر بين كلمه قل لي لو سمحت",
    ru: "о и в на что аят аяты сура это",
  };
  const AR_DIAC = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
  const fold = (s) => s.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase().replace(/ə/g, "e").replace(/ı/g, "i").replace(/[öó]/g, "o").replace(/[üú]/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
  const arNorm = (s) => s.replace(AR_DIAC, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي").replace(/\u0640/g, "");
  const isAr = (s) => /[\u0600-\u06FF]/.test(s);
  const digits = (s) => s.replace(/[٠-٩۰-۹]/g, (ch) => "0123456789"["٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹".indexOf(ch) % 10]);
  const keyOf = (t) => (t.startsWith("ال") && t.length > 4 ? t.slice(2) : t);

  let lang = "az";
  let scope = localStorage.getItem("qm.ai.scope") === "deep" ? "deep" : "fast";
  let meta = null;
  let sources = null;
  const buckets = {};
  const q = new URLSearchParams(location.search).get("lang");
  const saved = localStorage.getItem("qm.lang");
  lang = UI[q] ? q : (UI[saved] ? saved : "az");
  const t = () => UI[lang];

  function at(i) {
    let s = 1, left = i;
    while (s <= 114 && left >= meta.counts[s - 1]) { left -= meta.counts[s - 1]; s++; }
    return { i, s, a: left + 1, page: meta.page[i] };
  }
  function indexOf(s, a) {
    let i = 0;
    for (let n = 1; n < s; n++) i += meta.counts[n - 1];
    return i + a - 1;
  }
  function tokens(raw) {
    const arabic = isAr(raw);
    const src = arabic ? arNorm(raw) : fold(arNorm(raw));
    const stop = new Set((arabic ? STOP.ar : STOP[lang]).split(" ").map((w) => keyOf(arabic ? arNorm(w) : fold(w))));
    let parts = src.split(/[^\p{L}\p{N}]+/u).map(keyOf).filter((w) => w && w.length > 1 && !stop.has(w));
    if (!parts.length) parts = src.split(/[^\p{L}\p{N}]+/u).map(keyOf).filter((w) => w.length > 1);
    return parts;
  }
  function surahHit(raw) {
    const f = fold(arNorm(raw)).replace(/\s+/g, " ").trim();
    if (f.length < 3) return 0;
    const qn = f.replace(/[^a-z0-9\u0600-\u06ff]+/gi, "");
    if (!qn || qn.length < 3) return 0;
    for (let s = 1; s <= 114; s++) {
      for (const code of ["az", "tr", "en", "ru", "ar"]) {
        const n = fold(arNorm(meta.names[code][s - 1])).replace(/[^a-z0-9\u0600-\u06ff]+/gi, "");
        if (!n || n.length < 3 || /^\d+$/.test(qn)) continue;
        if (n === qn || n.startsWith(qn) || (qn.length >= 4 && qn.startsWith(n))) return s;
      }
    }
    return 0;
  }
  function pageQuery(raw) {
    const m = raw.trim().match(/^(?:səhifə|sehife|sayfa|page|стр(?:аница)?|صفحة)\s*(\d{1,3})$/i);
    if (m) return +m[1];
    if (/^\d{1,3}$/.test(raw.trim())) { const n = +raw.trim(); if (n >= 115 && n <= 604) return n; }
    return 0;
  }
  function ayahQuery(raw) {
    const m = raw.trim().match(/^(\d{1,3})\s*[:./-]\s*(\d{1,3})$/);
    if (!m) return null;
    const s = +m[1], a = +m[2];
    if (s < 1 || s > 114 || a < 1 || a > meta.counts[s - 1]) return null;
    return { s, a };
  }
  function peelWord(w) {
    return w.replace(/(nin|nın|nun|nün|dan|dən|den|də|da|si|sı|su|sü|in|ın|un|ün)$/i, "");
  }
  function surahInText(raw) {
    const words = fold(arNorm(raw)).replace(/[^a-z0-9\u0600-\u06ff]+/gi, " ").split(" ").filter(Boolean).map(peelWord);
    const f = " " + words.join(" ") + " ";
    let best = 0, len = 0;
    for (let s = 1; s <= 114; s++) {
      for (const code of ["az", "tr", "en", "ar"]) {
        const n = fold(arNorm(meta.names[code][s - 1])).replace(/[^a-z0-9\u0600-\u06ff]+/gi, "");
        if (n.length < 4) continue;
        if (f.includes(" " + n + " ") && n.length > len) { best = s; len = n.length; }
      }
    }
    return best;
  }
  function stripQ(raw) {
    let s = raw;
    const cut = [/nə\s+deməkdir/gi, /ne\s+demektir/gi, /ne\s+demek/gi, /what\s+does/gi, /what\s+is/gi, /meaning\s+of/gi, /nədir/gi, /nedir/gi, /mənası/gi, /manasi/gi, /anlamı/gi, /anlami/gi, /haqqında/gi, /haqqinda/gi, /hakkında/gi, /hakkinda/gi, /izah\s+et/gi, /açıqla/gi, /aciqla/gi, /explain/gi, /что\s+такое/gi, /что\s+означает/gi, /ما\s+معنى/g, /ما\s+هو/g, /[?؟!.,]/g];
    for (const r of cut) s = s.replace(r, " ");
    return s.replace(/\s+/g, " ").trim();
  }
  function stripArabic(raw) {
    let s = arNorm(digits(raw));
    const cut = [/ما\s*معنى/g, /ما\s*المراد/g, /ما\s*المقصود/g, /ماذا\s*يعني/g, /ماذا\s*تقصد/g, /ما\s*هو/g, /ما\s*هي/g, /اشرح(?:\s*لي)?/g, /فسر(?:\s*لي)?/g, /بين(?:\s*لي)?/g, /تفسير/g, /معنى/g, /كلمه/g, /من\s*فضلك/g, /لو\s*سمحت/g, /كم\s*عدد/g, /كم\s*ايه/g, /في\s*اي\s*سوره/g, /اين\s*ذكرت/g];
    for (const r of cut) s = s.replace(r, " ");
    return s.replace(/[^\u0600-\u06FF\s\d:./-]/g, " ").replace(/\s+/g, " ").trim();
  }
  function conceptOf(raw) {
    const cleaned = arNorm(stripQ(digits(raw)));
    if (isAr(raw)) {
      const parts = stripArabic(raw).split(/\s+/).map(keyOf).filter((w) => w.length > 2);
      for (const [, ar] of CONCEPTS) {
        if (parts.some((w) => w === ar || w.startsWith(ar) || (ar.startsWith(w) && w.length >= 3))) return ar;
      }
      return parts[0] && parts.length === 1 ? parts[0] : "";
    }
    const words = fold(cleaned).split(/[^a-z0-9\u0400-\u04ff]+/i).filter((w) => w.length > 2).map(peelWord);
    for (const [keys, ar] of CONCEPTS) {
      for (const k of keys.split(" ")) {
        if (words.some((w) => w === k || (k.length >= 5 && w.length >= 5 && (w.startsWith(k) || k.startsWith(w))))) return ar;
      }
    }
    return "";
  }
  function countQuestion(raw) {
    const f = fold(arNorm(raw));
    const asks = /nece|kac ayet|how many|сколько/.test(f) || /كم/.test(raw);
    const about = /aye|ayet|verse|аят/.test(f) || /آي/.test(raw);
    if (!asks || !about) return "";
    const sur = surahInText(raw) || surahHit(raw);
    if (!sur) return "";
    return meta.names[lang][sur - 1] + " " + meta.counts[sur - 1] + " " + ANS[lang].ayahs;
  }
  function bestShort(set) {
    const tally = new Map();
    for (const x of set) {
      const src = Math.floor(x / 10000), i = x % 10000;
      if (!sources[src] || !SHORT.has(sources[src].n)) continue;
      const rec = tally.get(i) || { n: 0, saadi: 0 };
      rec.n++;
      if (sources[src].n === "السعدي") rec.saadi = 1;
      tally.set(i, rec);
    }
    let best = -1, score = -1;
    for (const [i, rec] of tally) {
      const s = rec.saadi * 10 + rec.n;
      if (s > score) { score = s; best = i; }
    }
    return best;
  }
  function findAyah(raw) {
    raw = digits(raw);
    const direct = raw.match(/(\d{1,3})\s*[:./-]\s*(\d{1,3})/);
    if (direct) {
      const s = +direct[1], a = +direct[2];
      if (s >= 1 && s <= 114 && a >= 1 && a <= meta.counts[s - 1]) return { s, a };
    }
    const norm = arNorm(raw);
    const flat = fold(norm);
    if (/آيه\s*الكرسي/.test(norm) || /ayat al kursi|ayatul kursi|ayetul kursi|аят аль курси/.test(flat)) return { s: 2, a: 255 };
    if (/آيه\s*النور/.test(norm)) return { s: 24, a: 35 };
    if (/آيه\s*الدين|المداينه/.test(norm)) return { s: 2, a: 282 };
    if (/امن الرسول|خواتيم البقره/.test(norm)) return { s: 2, a: 285 };
    const named = norm.match(/(?:الآيه|آيه|الايه)\s*(\d{1,3})\s*(?:من\s*)?(?:سوره\s*)?([\u0600-\u06FF]{3,})/);
    if (named) {
      const sur = surahInText(named[2]);
      const a = +named[1];
      if (sur && a >= 1 && a <= meta.counts[sur - 1]) return { s: sur, a };
    }
    const pair = raw.match(/(?:sur[əea]|sura|sure|surah|сура|سورة|سوره)\s*(\d{1,3})\D{0,24}(\d{1,3})/i);
    if (pair) {
      const s = +pair[1], a = +pair[2];
      if (s >= 1 && s <= 114 && a >= 1 && a <= meta.counts[s - 1]) return { s, a };
    }
    const sur = surahInText(raw);
    if (sur) {
      const nums = [...raw.matchAll(/\d{1,3}/g)].map((x) => +x[0]);
      const a = nums.find((n) => n >= 1 && n <= meta.counts[sur - 1] && n !== sur);
      if (a) return { s: sur, a };
    }
    return null;
  }
  function analyze(raw) {
    const u = t();
    const ayah = findAyah(raw);
    if (ayah) {
      const name = meta.names[lang][ayah.s - 1];
      const where = scope === "deep" ? u.anDeep : u.anTf;
      return { search: ayah.s + ":" + ayah.a, note: u.an + ": " + name + " " + ayah.s + ":" + ayah.a + ". " + where };
    }
    const cleaned = isAr(raw) ? stripArabic(raw) : stripQ(raw);
    const use = cleaned || raw.trim();
    const where = scope === "deep" ? u.anDeep : (conceptOf(raw) || writtenLang(use) === "ar" ? u.anTf : u.anTr);
    return { search: use, note: u.an + ": «" + use + "». " + where };
  }
  function urlOf(src, ref) {
    let path = sources[src].p.split("{p}").join(ref.page).split("{s}").join(ref.s).split("{a}").join(ref.a);
    if (sources[src].k === "q" && lang !== "ar") path = lang + "/" + path;
    return "/" + path;
  }
  async function bucket(key) {
    const b = key.slice(0, 2);
    if (buckets[b]) return buckets[b];
    const r = await fetch("ix/" + encodeURIComponent(b) + ".json");
    buckets[b] = r.ok ? await r.json() : {};
    return buckets[b];
  }
  function arStems(part) {
    const out = new Set([part]);
    for (const p of ["وال", "فال", "بال", "كال", "لل", "و", "ف", "ب", "ك", "ل", "س", "ي"]) {
      if (part.startsWith(p) && part.length - p.length >= 3) out.add(part.slice(p.length));
    }
    for (const s of [...out]) {
      for (const x of ["ون", "ين", "ات", "ان", "وا", "تم", "تن", "ها", "هم", "هن", "كم", "كن", "نا", "تما"]) {
        if (s.endsWith(x) && s.length - x.length >= 3) out.add(s.slice(0, -x.length));
      }
    }
    const forms = new Set(out);
    for (const s of out) {
      if (s.endsWith("ه")) forms.add(s.slice(0, -1) + "ت");
      if (s.endsWith("ت")) forms.add(s.slice(0, -1) + "ه");
    }
    return [...forms].filter((s) => s.length >= 2);
  }
  function arHit(word, stems) {
    for (const s of stems) {
      if (s.length < 3) { if (word === s) return true; continue; }
      if (word === s || word.startsWith(s)) return true;
    }
    return false;
  }
  async function wordHits(parts) {
    const sets = [];
    for (const part of parts) {
      const arabic = /[\u0600-\u06FF]/.test(part);
      const stems = arabic ? arStems(part) : [part];
      const bags = [];
      const seen = new Set();
      for (const s of stems) {
        const b = s.slice(0, 2);
        if (seen.has(b)) continue;
        seen.add(b);
        bags.push(await bucket(b));
      }
      const u = new Set();
      for (const bag of bags) {
        for (const w in bag) {
          const ok = arabic ? arHit(w, stems) : (w === part || w.startsWith(part));
          if (!ok) continue;
          for (const pair of bag[w]) u.add(pair[0] * 10000 + pair[1]);
        }
      }
      if (!u.size) return new Set();
      sets.push(u);
    }
    sets.sort((a, b) => a.size - b.size);
    let acc = sets[0];
    for (let i = 1; i < sets.length; i++) {
      const next = new Set();
      for (const x of acc) if (sets[i].has(x)) next.add(x);
      acc = next;
    }
    return acc;
  }
  function writtenLang(raw) {
    if (isAr(raw)) return "ar";
    if (/[\u0400-\u04FF]/.test(raw)) return "ru";
    if (/ə/i.test(raw)) return "az";
    if (/[ığşöüçİĞŞÖÜÇ]/.test(raw)) return "tr";
    return ["az", "tr", "en", "ru"].includes(lang) ? lang : "az";
  }
  function fastOk(src, raw) {
    const s = sources[src];
    if (writtenLang(raw) === "ar") return SHORT.has(s.n);
    return s.k === "tr" && s.l === writtenLang(raw);
  }
  function directHits(raw) {
    const out = [];
    const pg = pageQuery(raw);
    if (pg >= 1 && pg <= 604) {
      const i = meta.page.indexOf(pg);
      const ref = i >= 0 ? at(i) : { s: 1, a: 1, page: pg };
      out.push({ kind: "page", s: ref.s, a: ref.a, page: pg, src: 0 });
    }
    const ay = ayahQuery(raw);
    if (ay) out.push({ kind: "ayah", s: ay.s, a: ay.a, page: meta.page[indexOf(ay.s, ay.a)], src: 0 });
    const bare = raw.trim().match(/^(\d{1,3})$/);
    if (bare && +bare[1] >= 1 && +bare[1] <= 114) {
      const s = +bare[1];
      out.push({ kind: "surah", s, a: 1, page: meta.page[indexOf(s, 1)], src: 0 });
    }
    const sh = surahHit(raw);
    if (sh) out.push({ kind: "surah", s: sh, a: 1, page: meta.page[indexOf(sh, 1)], src: 0 });
    return out;
  }

  const nav = document.getElementById("nav");
  const title = document.getElementById("title");
  const lead = document.getElementById("lead");
  const input = document.getElementById("q");
  const go = document.getElementById("go");
  const chips = document.getElementById("chips");
  const out = document.getElementById("out");
  const note = document.getElementById("note");
  const lbtn = document.getElementById("lbtn");
  const scopeBtn = document.getElementById("scopeBtn");
  const scopeMenu = document.getElementById("scopeMenu");

  function paintScope() {
    const labels = SCOPE[lang];
    scopeBtn.textContent = labels[scope];
    scopeMenu.replaceChildren();
    for (const key of ["fast", "deep"]) {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.s = key;
      b.textContent = labels[key];
      if (key === scope) b.className = "on";
      b.onclick = () => {
        scope = key;
        localStorage.setItem("qm.ai.scope", scope);
        scopeMenu.hidden = true;
        scopeBtn.setAttribute("aria-expanded", "false");
        paintScope();
        if (input.value.trim()) run();
      };
      scopeMenu.append(b);
    }
  }
  scopeBtn.onclick = () => {
    scopeMenu.hidden = !scopeMenu.hidden;
    scopeBtn.setAttribute("aria-expanded", scopeMenu.hidden ? "false" : "true");
  };
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#scope")) {
      scopeMenu.hidden = true;
      scopeBtn.setAttribute("aria-expanded", "false");
    }
  });

  function paintChrome() {
    const u = t();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = "Mushafuk AI";
    if (title) title.textContent = u.title;
    lead.textContent = u.lead;
    input.placeholder = u.ph;
    go.setAttribute("aria-label", u.go);
    paintScope();
    if (lbtn) lbtn.textContent = "🌐 " + lang.toUpperCase() + " ▾";
    if (nav) {
      nav.replaceChildren();
      for (const [href, label] of NAV[lang]) {
        const a = document.createElement("a");
        a.href = href; a.textContent = label; nav.append(a);
      }
    }
    chips.replaceChildren();
    for (const [query, label] of u.chips) {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label;
      b.onclick = () => { input.value = query; run(); };
      chips.append(b);
    }
    note.textContent = "";
  }

  const TFID = { "السعدي": "saadi", "التفسير الميسر": "muyassar", "المختصر": "mukhtasar", "ابن كثير": "ibnkathir", "البغوي": "baghawi", "السمعاني": "samani", "أيسر التفاسير": "aysar", "الطبري": "tabari" };
  const tfCache = {};
  const verse = {};
  let partsNow = [];
  let arabicQ = false;
  async function tafsirAyah(name, s, a) {
    const id = TFID[name];
    if (!id) return "";
    const key = id + "/" + s;
    if (!tfCache[key]) {
      const r = await fetch("../tf/" + id + "/" + s + ".json");
      tfCache[key] = r.ok ? await r.json() : [];
    }
    return tfCache[key][a - 1] || "";
  }
  function clip(text) {
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= (arabicQ ? 520 : 280)) return clean;
    const norm = arNorm(clean);
    let at = -1;
    for (const p of partsNow) {
      at = norm.indexOf(p);
      if (at < 0 && p.endsWith("ه")) at = norm.indexOf(p.slice(0, -1) + "ت");
      if (at >= 0) break;
    }
    if (at < 0) return clean.slice(0, arabicQ ? 480 : 260) + "…";
    let ni = 0, rawAt = clean.length;
    for (let i = 0; i < clean.length; i++) {
      const ch = arNorm(clean[i]);
      if (!ch) continue;
      if (ni >= at) { rawAt = i; break; }
      ni += ch.length;
    }
    const start = Math.max(0, rawAt - (arabicQ ? 80 : 50));
    const len = arabicQ ? 460 : 240;
    const bit = clean.slice(start, start + len);
    return (start ? "…" : "") + bit + (start + len < clean.length ? "…" : "");
  }
  async function loadVerses() {
    const need = ["ar"];
    if (lang !== "ar") need.push(lang);
    await Promise.all(need.map(async (c) => {
      if (!verse[c]) verse[c] = await (await fetch(c + ".json")).json();
    }));
  }
  async function card(hit) {
    const u = t();
    const ref = hit.i != null ? at(hit.i) : { s: hit.s, a: hit.a, page: hit.page };
    const i = hit.i != null ? hit.i : indexOf(ref.s, ref.a);
    const src = sources[hit.src] || sources[0];
    const href = urlOf(hit.src || 0, ref);
    const box = document.createElement("article");
    box.className = "hit";
    const ar = document.createElement("p");
    ar.className = "ay";
    ar.dir = "rtl";
    ar.lang = "ar";
    let main = (verse.ar && verse.ar[i]) || "";
    if (src.k === "tf") {
      const tx = await tafsirAyah(src.n, ref.s, ref.a);
      if (tx) { main = clip(tx); ar.classList.add("tf"); }
    }
    ar.textContent = main;
    box.append(ar);
    if (src.k !== "tf" && lang !== "ar" && verse[lang] && verse[lang][i]) {
      const tr = document.createElement("p");
      tr.className = "tr";
      tr.textContent = verse[lang][i];
      box.append(tr);
    }
    const addr = document.createElement("a");
    addr.className = "addr";
    addr.href = href;
    const name = meta.names[lang][ref.s - 1];
    let where = name + " " + ref.s + ":" + ref.a;
    if (src.k === "q") where += " · " + u.page + " " + ref.page;
    else if (src.k === "tr" || src.k === "ir" || src.k === "wb") where = src.n + " · " + u.page + " " + ref.page;
    else where = src.n + " · " + ref.s + ":" + ref.a;
    addr.textContent = where;
    box.append(addr);
    return box;
  }

  let job = 0;
  let shown = [];
  let analNote = "";
  let answerPlan = null;
  async function buildAnswer() {
    if (!answerPlan) return null;
    const a = ANS[lang];
    const box = document.createElement("article");
    box.className = "answer";
    const k = document.createElement("p");
    k.className = "kicker";
    k.textContent = a.ans;
    box.append(k);
    if (answerPlan.kind === "count") {
      const said = document.createElement("p");
      said.className = "said";
      said.textContent = answerPlan.text;
      box.append(said);
      return box;
    }
    const i = answerPlan.i;
    const ref = at(i);
    if (lang !== "ar" && verse[lang] && verse[lang][i]) {
      const said = document.createElement("p");
      said.className = "said";
      said.textContent = verse[lang][i];
      box.append(said);
    }
    const ar = document.createElement("p");
    ar.className = "ay";
    ar.dir = "rtl";
    ar.lang = "ar";
    ar.textContent = (verse.ar && verse.ar[i]) || "";
    box.append(ar);
    const saadi = await tafsirAyah("السعدي", ref.s, ref.a);
    if (saadi) {
      const who = document.createElement("p");
      who.className = "who";
      who.textContent = a.saadi;
      box.append(who);
      const tx = document.createElement("p");
      tx.className = "ay tf";
      tx.dir = "rtl";
      tx.lang = "ar";
      tx.textContent = clip(saadi);
      box.append(tx);
    }
    const addr = document.createElement("a");
    addr.className = "addr";
    addr.href = "/tafsir/saadi/" + ref.s + "/" + ref.a + "/";
    addr.textContent = meta.names[lang][ref.s - 1] + " " + ref.s + ":" + ref.a;
    box.append(addr);
    return box;
  }
  async function paint(from) {
    const id = job;
    const u = t();
    if (from === 0) {
      out.replaceChildren();
      if (analNote) {
        const a = document.createElement("p");
        a.className = "anal";
        a.textContent = analNote;
        out.append(a);
      }
      const ans = await buildAnswer();
      if (id !== job) return;
      if (ans) out.append(ans);
    }
    if (!shown.length && !answerPlan) {
      const p = document.createElement("p");
      p.className = "wait"; p.textContent = u.empty; out.append(p); return;
    }
    if (from === 0 && shown.length) {
      const c = document.createElement("p");
      c.className = "count";
      c.textContent = (answerPlan ? ANS[lang].places + " · " : "") + shown.length + " " + u.n;
      out.append(c);
    }
    const end = Math.min(shown.length, from + 30);
    const nodes = await Promise.all(shown.slice(from, end).map(card));
    if (id !== job) return;
    for (const n of nodes) out.append(n);
    const old = out.querySelector(".more");
    if (old) old.remove();
    if (end < shown.length) {
      const m = document.createElement("button");
      m.type = "button"; m.className = "more";
      m.textContent = u.more + " · " + end + " / " + shown.length;
      m.onclick = () => paint(end);
      out.append(m);
    }
  }
  async function run() {
    const raw = digits(input.value.trim());
    const id = ++job;
    answerPlan = null;
    out.replaceChildren();
    if (!raw) return;
    const wait = document.createElement("p");
    wait.className = "wait"; wait.textContent = t().loading; out.append(wait);
    if (!sources) sources = await (await fetch("src.json")).json();
    const thought = analyze(raw);
    const q = thought.search;
    analNote = thought.note;
    const parts = (!pageQuery(q) && !ayahQuery(q)) ? tokens(q) : [];
    partsNow = parts;
    arabicQ = isAr(q);
    const found = parts.length ? await wordHits(parts) : new Set();
    if (id !== job) return;
    const direct = directHits(q);
    const seen = new Set(direct.map((h) => (h.src || 0) + ":" + (h.i != null ? h.i : indexOf(h.s, h.a))));
    const rest = [];
    const ay = ayahQuery(q);
    if (ay && scope === "fast") {
      const i = indexOf(ay.s, ay.a);
      for (let s = 0; s < sources.length; s++) if (SHORT.has(sources[s].n)) rest.push({ src: s, i });
    }
    if (ay && scope === "deep") {
      const i = indexOf(ay.s, ay.a);
      for (let s = 1; s < sources.length; s++) rest.push({ src: s, i });
    }
    for (const x of found) {
      const src = Math.floor(x / 10000), i = x % 10000;
      if (scope === "fast" && !fastOk(src, q)) continue;
      const k = src + ":" + i;
      if (seen.has(k)) continue;
      seen.add(k);
      rest.push({ src, i });
    }
    rest.sort((a, b) => {
      const ra = sources[a.src], rb = sources[b.src];
      const score = (r) => arabicQ
        ? (r.k === "tf" ? 0 : r.k === "q" ? 1 : r.k === "wb" ? 2 : r.k === "ir" ? 3 : 4)
        : (r.k === "q" ? 0 : r.k === "tr" && r.l === lang ? 1 : r.k === "tr" ? 2 : r.k === "tf" ? 3 : 4);
      return score(ra) - score(rb) || a.src - b.src || a.i - b.i;
    });
    const counted = countQuestion(raw);
    const arConcept = ay ? "" : conceptOf(raw);
    let topic = new Set();
    if (arConcept) topic = await wordHits(tokens(arConcept));
    if (id !== job) return;
    if (counted) answerPlan = { kind: "count", text: counted };
    else if (ay) answerPlan = { kind: "ayah", i: indexOf(ay.s, ay.a) };
    else {
      const idx = bestShort(topic.size ? topic : found);
      answerPlan = idx >= 0 ? { kind: "topic", i: idx } : null;
    }
    shown = direct.concat(rest);
    if (shown.length || (answerPlan && answerPlan.i != null)) await loadVerses();
    if (id !== job) return;
    paint(0);
  }

  document.getElementById("form").addEventListener("submit", (e) => { e.preventDefault(); run(); });
  document.querySelectorAll("#langs a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      lang = a.dataset.l;
      localStorage.setItem("qm.lang", lang);
      history.replaceState(null, "", "?lang=" + lang);
      paintChrome();
      if (input.value.trim()) run();
    });
  });
  fetch("meta.json").then((r) => r.json()).then((m) => {
    meta = m; paintChrome();
    const start = new URLSearchParams(location.search).get("q");
    if (start) { input.value = start; run(); }
  });
})();
