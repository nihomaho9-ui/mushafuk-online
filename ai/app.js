(function () {
  const UI = {
    az: { title: "Axtarış", lead: "Surə, ayə, səhifə və ya söz yazın. Uyğun ayə birbaşa açılır.", ph: "2:255, Fatihə, mərhəmət, səhifə 42", go: "Axtar", empty: "Heç nə tapılmadı. Başqa söz yoxlayın.", page: "Səhifə", tafsir: "Təfsir", surah: "Surə", ayah: "ayə", loading: "Hazırlanır…", src: "Əlixan Musayev", chips: [["2:255", "Ayətül-Kürsi"], ["Fatihə", "Fatihə"], ["İxlas", "İxlas"], ["səhifə 1", "Səhifə 1"]] },
    tr: { title: "Arama", lead: "Sure, ayet, sayfa veya bir kelime yazın. Uygun ayet doğrudan açılır.", ph: "2:255, Fatiha, rahmet, sayfa 42", go: "Ara", empty: "Bir şey bulunamadı. Başka bir söz deneyin.", page: "Sayfa", tafsir: "Tefsir", surah: "Sure", ayah: "ayet", loading: "Hazırlanıyor…", src: "Şahin", chips: [["2:255", "Ayetel Kürsi"], ["Fatiha", "Fatiha"], ["İhlas", "İhlas"], ["sayfa 1", "Sayfa 1"]] },
    en: { title: "Search", lead: "Type a surah, ayah, page, or a word. The matching ayah opens directly.", ph: "2:255, Fatihah, mercy, page 42", go: "Search", empty: "Nothing matched. Try another word.", page: "Page", tafsir: "Tafsir", surah: "Surah", ayah: "ayah", loading: "Getting ready…", src: "Saheeh International", chips: [["2:255", "Ayat al-Kursi"], ["Al-Fatihah", "Al-Fatihah"], ["Al-Ikhlas", "Al-Ikhlas"], ["page 1", "Page 1"]] },
    ar: { title: "بحث", lead: "اكتب سورة أو آية أو صفحة أو كلمة. تُفتح الآية المناسبة مباشرة.", ph: "٢:٢٥٥، الفاتحة، رحمة، صفحة ٤٢", go: "بحث", empty: "لا نتيجة. جرّب كلمة أخرى.", page: "صفحة", tafsir: "تفسير", surah: "سورة", ayah: "آية", loading: "جارٍ التحضير…", src: "رسم عثماني", chips: [["2:255", "آية الكرسي"], ["الفاتحة", "الفاتحة"], ["الإخلاص", "الإخلاص"], ["صفحة 1", "الصفحة ١"]] },
    ru: { title: "Поиск", lead: "Напишите суру, аят, страницу или слово. Нужный аят откроется сразу.", ph: "2:255, Фатиха, милость, страница 42", go: "Найти", empty: "Ничего не найдено. Попробуйте другое слово.", page: "Страница", tafsir: "Тафсир", surah: "Сура", ayah: "аят", loading: "Готовлю…", src: "Кулиев", chips: [["2:255", "Аят аль-Курси"], ["Аль-Фатиха", "Аль-Фатиха"], ["Аль-Ихлас", "Аль-Ихлас"], ["страница 1", "Страница 1"]] },
  };
  const NAV = {
    az: [["../quran/", "Quran"], ["../tafsir.html", "Təfsir"], ["../translations/", "Tərcümələr"], ["../about.html", "Haqqında"]],
    tr: [["../quran/", "Kur'an"], ["../tafsir.html", "Tefsir"], ["../translations/", "Mealler"], ["../about.html", "Hakkında"]],
    en: [["../quran/", "Quran"], ["../tafsir.html", "Tafsir"], ["../translations/", "Translations"], ["../about.html", "About"]],
    ar: [["../quran/", "القرآن"], ["../tafsir.html", "التفاسير"], ["../translations/", "الترجمات"], ["../about.html", "من نحن"]],
    ru: [["../quran/", "Коран"], ["../tafsir.html", "Тафсир"], ["../translations/", "Переводы"], ["../about.html", "О нас"]],
  };
  const STOP = {
    az: "ve və bir bu da de haqqinda haqqında aye aye ayə ayeler ayələr olan ucun üçün nedir nədir hansı ile ilə oku oxu",
    tr: "ve bir bu da hakkında hakkinda ayet ayetler nedir olan ile oku",
    en: "the a an of and to in for verse verses about what is ayah surah",
    ar: "في من عن على ما آية آيات سورة",
    ru: "о и в на что аят аяты сура это",
  };
  const AR_DIAC = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;
  const fold = (s) => s.replace(/İ/g, "i").replace(/I/g, "ı").toLowerCase().replace(/ə/g, "e").replace(/ı/g, "i").replace(/[öó]/g, "o").replace(/[üú]/g, "u").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/â/g, "a").replace(/î/g, "i").replace(/û/g, "u");
  const arNorm = (s) => s.replace(AR_DIAC, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي").replace(/\u0640/g, "");
  const isAr = (s) => /[\u0600-\u06FF]/.test(s);

  let lang = "az";
  let meta = null;
  const texts = {};
  const folded = {};

  const q = new URLSearchParams(location.search).get("lang");
  const saved = localStorage.getItem("qm.lang");
  lang = UI[q] ? q : (UI[saved] ? saved : "az");

  const t = () => UI[lang];
  const base = () => (lang === "ar" ? "/" : "/" + lang + "/");

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
    const src = arabic ? arNorm(raw) : fold(raw);
    const stop = new Set((arabic ? STOP.ar : STOP[lang]).split(" ").map((w) => arabic ? arNorm(w) : fold(w)));
    let parts = src.split(/[^\p{L}\p{N}]+/u).filter((w) => w && w.length > 1 && !stop.has(w));
    if (!parts.length) parts = src.split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1);
    return { arabic, parts };
  }

  function surahHit(raw) {
    const f = fold(arNorm(raw)).replace(/\s+/g, " ").trim();
    if (f.length < 3) return 0;
    const names = meta.names;
    for (let s = 1; s <= 114; s++) {
      for (const code of ["az", "tr", "en", "ru", "ar"]) {
        const n = fold(arNorm(names[code][s - 1])).replace(/[^a-z0-9\u0600-\u06ff]+/gi, "");
        const qn = f.replace(/[^a-z0-9\u0600-\u06ff]+/gi, "");
        if (!qn || qn.length < 3) continue;
        if (n === qn || (qn.length >= 4 && (n.includes(qn) || qn.includes(n)))) return s;
      }
    }
    return 0;
  }

  function pageQuery(raw) {
    const m = raw.trim().match(/^(?:səhifə|sehife|sayfa|page|стр(?:аница)?|صفحة)\s*(\d{1,3})$/i);
    if (m) return +m[1];
    if (/^\d{1,3}$/.test(raw.trim())) {
      const n = +raw.trim();
      if (n >= 115 && n <= 604) return n;
    }
    return 0;
  }
  function ayahQuery(raw) {
    const m = raw.trim().match(/^(\d{1,3})\s*[:/]\s*(\d{1,3})$/);
    if (!m) return null;
    const s = +m[1], a = +m[2];
    if (s < 1 || s > 114 || a < 1 || a > meta.counts[s - 1]) return null;
    return { s, a };
  }

  function search(raw) {
    const out = [];
    const seen = new Set();
    const push = (item) => { const k = item.kind + ":" + item.s + ":" + item.a + ":" + (item.page || ""); if (seen.has(k)) return; seen.add(k); out.push(item); };
    const pg = pageQuery(raw);
    if (pg >= 1 && pg <= 604) {
      const i = meta.page.indexOf(pg);
      const ref = i >= 0 ? at(i) : { s: 1, a: 1 };
      push({ kind: "page", s: ref.s, a: ref.a, page: pg });
    }
    const ay = ayahQuery(raw);
    if (ay) push({ kind: "ayah", s: ay.s, a: ay.a, page: meta.page[indexOf(ay.s, ay.a)], i: indexOf(ay.s, ay.a) });
    const bare = raw.trim().match(/^(\d{1,3})$/);
    if (bare && +bare[1] >= 1 && +bare[1] <= 114) {
      const s = +bare[1];
      push({ kind: "surah", s, a: 1, page: meta.page[indexOf(s, 1)] });
    }
    const sh = surahHit(raw);
    if (sh) push({ kind: "surah", s: sh, a: 1, page: meta.page[indexOf(sh, 1)] });
    const { arabic, parts } = tokens(raw);
    if (!pageQuery(raw) && !ayahQuery(raw) && parts.length) {
      const bag = arabic ? "ar" : lang;
      const list = folded[bag];
      const phrase = parts.join(" ");
      const scored = [];
      for (let i = 0; i < list.length; i++) {
        const hay = list[i];
        let ok = true, score = 0, pos = hay.length;
        if (hay.includes(phrase)) { score += 80; pos = hay.indexOf(phrase); }
        for (const p of parts) {
          const atp = hay.indexOf(p);
          if (atp < 0) { ok = false; break; }
          score += 12;
          if (atp < pos) pos = atp;
        }
        if (ok) scored.push({ i, score: score + Math.max(0, 20 - pos / 20) });
      }
      scored.sort((a, b) => b.score - a.score);
      for (const hit of scored.slice(0, 24)) {
        const ref = at(hit.i);
        push({ kind: "text", s: ref.s, a: ref.a, page: ref.page, i: hit.i, bag });
      }
    }
    return out.slice(0, 24);
  }

  function paintText(el, text, parts, arabic) {
    el.replaceChildren();
    if (!parts.length) { el.textContent = text.length > 280 ? text.slice(0, 280) + " …" : text; return; }
    const words = text.split(/(\s+)/);
    let used = 0;
    const max = 46;
    let start = 0;
    if (words.length > max) {
      const hit = words.findIndex((w) => w.trim() && parts.some((p) => (arabic ? arNorm(w) : fold(w)).includes(p)));
      start = Math.max(0, (hit < 0 ? 0 : hit) - 12);
    }
    if (start > 0) el.append("… ");
    for (let i = start; i < words.length && used < max; i++) {
      const w = words[i];
      if (w.trim()) used++;
      const n = arabic ? arNorm(w) : fold(w);
      if (w.trim() && parts.some((p) => n.includes(p))) {
        const m = document.createElement("mark");
        m.textContent = w;
        el.append(m);
      } else el.append(w);
    }
    if (start + used < words.filter((w) => w.trim()).length) el.append(" …");
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

  function paintChrome() {
    const u = t();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = u.title + " — Mushafuk";
    title.textContent = u.title;
    lead.textContent = u.lead;
    input.placeholder = u.ph;
    go.textContent = u.go;
    lbtn.textContent = "🌐 " + lang.toUpperCase() + " ▾";
    nav.replaceChildren();
    for (const [href, label] of NAV[lang]) {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      nav.append(a);
    }
    chips.replaceChildren();
    for (const [query, label] of u.chips) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.onclick = () => { input.value = query; run(); };
      chips.append(b);
    }
    note.textContent = u.src;
  }

  async function ensure(code) {
    if (texts[code]) return;
    texts[code] = await (await fetch(code + ".json")).json();
    folded[code] = texts[code].map((s) => code === "ar" ? arNorm(s) : fold(s));
  }

  function card(hit, parts) {
    const u = t();
    const a = document.createElement("a");
    a.className = "hit";
    a.href = base() + "page/" + hit.page + "/";
    const h = document.createElement("div");
    h.className = "hit-h";
    const name = meta.names[lang][hit.s - 1];
    const b = document.createElement("b");
    b.textContent = hit.kind === "page" ? u.page + " " + hit.page : (hit.kind === "surah" ? u.surah + " " + name : name + "  " + hit.s + ":" + hit.a);
    const small = document.createElement("small");
    small.textContent = hit.kind === "page" ? name : u.page + " " + hit.page;
    h.append(b, small);
    a.append(h);
    if (hit.kind === "text" || hit.kind === "ayah") {
      const p = document.createElement("p");
      const bag = hit.bag || (isAr(input.value) ? "ar" : lang);
      const text = texts[bag][hit.i != null ? hit.i : indexOf(hit.s, hit.a)];
      p.dir = bag === "ar" ? "rtl" : "auto";
      paintText(p, text, hit.kind === "text" ? parts : [], bag === "ar");
      a.append(p);
    }
    const row = document.createElement("div");
    row.className = "hit-links";
    const tf = document.createElement("span");
    tf.textContent = u.tafsir;
    tf.className = "tf";
    row.append(tf);
    a.append(row);
    a.addEventListener("click", (e) => {
      if (e.target.classList.contains("tf")) {
        e.preventDefault();
        location.href = "/tafsir/all/" + hit.s + "/" + hit.a + "/";
      }
    });
    return a;
  }

  let job = 0;
  async function run() {
    const raw = input.value.trim();
    const id = ++job;
    out.replaceChildren();
    if (!raw) return;
    const wait = document.createElement("p");
    wait.className = "wait";
    wait.textContent = t().loading;
    out.append(wait);
    const arabic = isAr(raw);
    await ensure(arabic ? "ar" : lang);
    if (id !== job) return;
    const { parts } = tokens(raw);
    const hits = search(raw);
    out.replaceChildren();
    if (!hits.length) {
      const p = document.createElement("p");
      p.className = "wait";
      p.textContent = t().empty;
      out.append(p);
      return;
    }
    for (const hit of hits) out.append(card(hit, parts));
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
  fetch("meta.json").then((r) => r.json()).then((m) => { meta = m; paintChrome(); const start = new URLSearchParams(location.search).get("q"); if (start) { input.value = start; run(); } });
})();
