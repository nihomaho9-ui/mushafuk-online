/**
 * Mushafuk AI search core (v2).
 * Index contract (ai/ix/{prefix}.json):
 *   { "foldedStemOrSurface": [[sourceId, globalAyahIndex], ...] }
 * globalAyahIndex is 0..6235 (surah/ayah flattened with meta.counts).
 * Latin keys are fold()'d: ə→e, ı→i, ö→o, ü→u, ş→s, ç→c, ğ→g.
 * This file is a classic script (window.MushafukEngine) and a CommonJS module.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root) root.MushafukEngine = api;
})(typeof window !== "undefined" ? window : globalThis, function () {
  const TOTAL = 6236;
  const AR_DIAC = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;

  const STOP = {
    az: "ve və bir bu da de də haqqinda haqqında haqda barede barədə aye ayə ayet ayeler ayələr sura surə sure nece necə ne nə nedir nədir hansi hansı hansilar hansılar her hər niye niyə harada harda ku ki hani neden nədən ucun üçün kimi gore görə bele belə etmek etmək eden edən edenler edənlər edenlerin edənlərin eder edər etdi etmis etmiş olmaq olan olanlar olanların olar oldu olmus olmuş vermek vermək veren verən deyen deyən deyenler deyənlər demek demək demekdir deməkdir onlar onlarin onların bize bizə size sizə men mən sen sən o bunlar hemin həmin eger əgər amma lakin yoxsa veya ile ilə oku oxu",
    tr: "ve bir bu da de hakkında hakkinda ayet ayetler nedir nerede nasıl neden niçin sure suresi için gibi olan olanlar eden edenler etmek olmak ile oku",
    en: "the a an of and to in for on with by from is are was were be been being have has had do does did verse verses about what where how why who which surah sura ayah is",
    ar: "في من عن على الى الي إلى مع ما ماذا كيف أين لماذا هو هي هم هن هذا هذه ذلك تلك التي الذي الذين آية آيات سورة معنى تفسير اشرح فسر بين كلمه قل لي لو سمحت",
    ru: "о и в на что аят аяты сура это как где почему зачем для кто которые который был была были быть",
  };

  // Applied to fold()'d strings. Index keys use the same alphabet.
  const AZ_STEM = {
    sebr: "sebir",
    sabir: "sebir",
    hokm: "hokum",
    emr: "emir",
    nefs: "nefis",
    zulm: "zulum",
    zulum: "zulum",
    valideynler: "valideyn",
    bagislama: "bagisla",
    bagislanma: "bagisla",
    bagislayan: "bagisla",
    merhemet: "merhemet",
    mukafat: "mukafat",
  };

  // One topic per query: the longest matching rule wins (specific rules first).
  const TOPIC_VERSES = [
    { match: ["namaz", "vaxt"], verses: [[4, 103], [17, 78], [11, 114], [2, 238], [20, 130], [30, 17], [30, 18]] },
    { match: ["valideyn", "yaxsi"], verses: [[17, 23], [17, 24], [2, 83], [4, 36], [31, 14], [46, 15], [29, 8]] },
    { match: ["valideyn"], verses: [[17, 23], [17, 24], [31, 14], [46, 15], [2, 83], [14, 41]] },
    { match: ["sebir", "mukafat"], verses: [[39, 10], [16, 96], [2, 155], [2, 156], [2, 157], [3, 200], [28, 54], [11, 115]] },
    { match: ["sebir"], verses: [[2, 153], [2, 155], [39, 10], [16, 127], [3, 200], [103, 3], [8, 46]] },
    { match: ["selem"], verses: [[2, 275], [2, 276], [2, 278], [2, 279], [3, 130], [30, 39]] },
    { match: ["faiz"], verses: [[2, 275], [2, 276], [2, 278], [2, 279], [3, 130], [30, 39]] },
    { match: ["miras"], verses: [[4, 11], [4, 12], [4, 176], [4, 7], [2, 180]] },
    { match: ["oruc"], verses: [[2, 183], [2, 184], [2, 185], [2, 187]] },
    { match: ["tovbe"], verses: [[39, 53], [66, 8], [4, 17], [4, 18], [25, 70], [24, 31]] },
    { match: ["zekat"], verses: [[9, 60], [2, 43], [2, 110], [2, 177], [2, 277], [23, 4]] },
  ];

  // Deep-mode expansions. Keys and values are fold()'d, except Arabic.
  const SYNONYMS = {
    namaz: ["salat", "صلاه"],
    vaxt: ["موقوت"],
    sebir: ["صبر"],
    mukafat: ["اجر"],
    valideyn: ["ata", "ana", "والدين"],
    yaxsi: ["yaxsiliq", "xeyir", "احسان"],
    yaxsiliq: ["yaxsi", "xeyir"],
    selem: ["faiz", "riba", "ربا"],
    faiz: ["selem", "riba", "ربا"],
    riba: ["faiz", "selem", "ربا"],
    miras: ["verese", "ميراث"],
    oruc: ["ramazan", "صوم"],
    zekat: ["sedeqe", "زكاه"],
    tovbe: ["bagisla", "magfiret", "توبه"],
    merhemet: ["rehmet", "رحمه"],
  };

  const fold = (s) =>
    (s || "")
      .replace(/İ/g, "i")
      .replace(/I/g, "ı")
      .toLowerCase()
      .replace(/ə/g, "e")
      .replace(/ı/g, "i")
      .replace(/[öó]/g, "o")
      .replace(/[üú]/g, "u")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/â/g, "a")
      .replace(/î/g, "i")
      .replace(/û/g, "u");

  const isAr = (s) => /[\u0600-\u06FF]/.test(s || "");

  function arNorm(s) {
    if (!s) return "";
    return s
      .replace(AR_DIAC, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/صلوة/g, "صلاة")
      .replace(/زكوة/g, "زكاة")
      .replace(/حيوة/g, "حياة")
      .replace(/غدوة/g, "غداة")
      .replace(/ربوا/g, "ربا")
      .replace(/مشكوة/g, "مشكاة")
      .replace(/نجوة/g, "نجاة")
      .replace(/ى/g, "ي")
      .replace(/ة/g, "ه")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/\u0621/g, "")
      .replace(/\u0640/g, "");
  }

  // Index keys are already diacritic-stripped. Map leftover Osmanic skeletons.
  function canonAr(s) {
    if (!s) return "";
    return s
      .replace(/صلوه/g, "صلاه")
      .replace(/زكوه/g, "زكاه")
      .replace(/حيوه/g, "حياه")
      .replace(/ربوا/g, "ربا")
      .replace(/غدوه/g, "غداه")
      .replace(/مشكوه/g, "مشكاه")
      .replace(/نجوه/g, "نجاه");
  }

  const keyOf = (t) => (t.startsWith("ال") && t.length > 4 ? t.slice(2) : t);

  // Long, unambiguous chains first. Short locative/instrumental suffixes are
  // applied separately so "qiblə" / "valideynə" are not eaten by "le" / "ne".
  const SUFFIX_LONG =
    /(larindan|lerinden|larina|lerine|larini|lerini|lardan|lerden|larda|lerde|larin|lerin|lara|lere|lari|leri|mizdan|mizden|nizdan|nizden|mizin|nizin|daki|deki|acaq|ecek|maq|mek|dan|den|nin|nun|lar|ler)$/;
  const SUFFIX_SHORT = /(miz|muz|niz|nuz|mis|mus|da|de|le|la|ye|ya|in|un|si|su)$/;

  function peelWord(w) {
    if (!w || isAr(w)) return w;
    let s = fold(w).trim();
    if (!s) return s;
    if (AZ_STEM[s]) return AZ_STEM[s];
    if (s.length <= 3) return s;
    for (let step = 0; step < 3; step++) {
      if (AZ_STEM[s]) return AZ_STEM[s];
      let stripped = s.replace(SUFFIX_LONG, "");
      if (!(stripped.length >= 3 && stripped !== s) && s.length >= 5) {
        const short = s.replace(SUFFIX_SHORT, "");
        if (short.length >= 4 && short !== s) stripped = short;
      }
      if (stripped.length >= 3 && stripped !== s) s = stripped;
      else break;
    }
    // Case vowel only when the stem stays readable (valideyne → valideyn, qible stays).
    if (s.length >= 6) {
      const one = s.replace(/[aeiu]$/, "");
      if (one.length >= 5 && one !== s) s = one;
    }
    return AZ_STEM[s] || s;
  }

  function stopSet(lang, arabic) {
    const raw = arabic ? STOP.ar : STOP[lang] || STOP.az;
    return new Set(raw.split(/\s+/).filter(Boolean).map((w) => keyOf(arabic ? arNorm(w) : fold(w))));
  }

  function tokens(raw, lang) {
    const arabic = isAr(raw);
    const src = arabic ? arNorm(raw) : fold(arNorm(raw));
    const stop = stopSet(lang || "az", arabic);
    const rawParts = src.split(/[^\p{L}\p{N}]+/u).map(keyOf).filter((w) => w && w.length > 1);
    const filtered = [];
    for (const w of rawParts) {
      if (stop.has(w)) continue;
      const stemmed = arabic ? w : peelWord(w);
      if (!stemmed || stemmed.length < 2 || stop.has(stemmed)) continue;
      filtered.push(stemmed);
    }
    const base = filtered.length ? filtered : rawParts.filter((w) => w.length > 1);
    return [...new Set(base)];
  }

  function arStems(part) {
    const norm = canonAr(arNorm(part));
    const out = new Set([norm]);
    for (const p of ["وال", "فال", "بال", "كال", "لل", "ال", "و", "ف", "ب", "ك", "ل", "س"]) {
      if (norm.startsWith(p) && norm.length - p.length >= 3) out.add(norm.slice(p.length));
    }
    for (const s of [...out]) {
      for (const x of ["ون", "ين", "ات", "ان", "وا", "تم", "تن", "ها", "هم", "هن", "كم", "كن", "نا", "تما", "ه", "ت"]) {
        if (s.endsWith(x) && s.length - x.length >= 3) out.add(s.slice(0, -x.length));
      }
    }
    const forms = new Set();
    for (const s of out) {
      const c = canonAr(s);
      forms.add(c);
      if (c.endsWith("ه")) forms.add(c.slice(0, -1) + "ت");
      if (c.endsWith("ت")) forms.add(c.slice(0, -1) + "ه");
    }
    return [...forms].filter((s) => s.length >= 2);
  }

  function indexOfCounts(counts, s, a) {
    let i = 0;
    for (let n = 1; n < s; n++) i += counts[n - 1];
    return i + a - 1;
  }

  function topicFor(parts) {
    let best = null;
    for (const topic of TOPIC_VERSES) {
      const ok = topic.match.every((m) => parts.some((p) => p === m || (p.length >= 3 && (p.startsWith(m) || m.startsWith(p)))));
      if (!ok) continue;
      if (!best || topic.match.length > best.match.length) best = topic;
    }
    return best;
  }

  function matchQuality(indexKey, term) {
    const key = isAr(indexKey) ? canonAr(indexKey) : indexKey;
    const t = isAr(term) ? canonAr(term) : term;
    if (!key || !t) return 0;
    if (key === t) return 1;
    if (t.length >= 3 && key.startsWith(t)) return 0.75;
    if (key.length >= 4 && t.startsWith(key)) return 0.65;
    return 0;
  }

  /**
   * @param {string[]} parts tokens()
   * @param {(prefix:string)=>Promise<object>} fetchBucket
   * @param {{scope?:string, counts:number[]}} ctx
   */
  async function rank(parts, fetchBucket, ctx) {
    const counts = ctx.counts;
    const scope = ctx.scope === "deep" ? "deep" : "fast";
    const ayah = new Map();
    const pairSet = new Set();
    const pairs = [];

    function addAyah(i, points, tIdx, topicIdx) {
      if (i < 0 || i >= TOTAL) return;
      let rec = ayah.get(i);
      if (!rec) ayah.set(i, (rec = { score: 0, terms: new Set(), topic: false, topicIdx: null }));
      rec.score += points;
      if (tIdx != null) rec.terms.add(tIdx);
      if (topicIdx != null) {
        rec.topic = true;
        if (rec.topicIdx == null || topicIdx < rec.topicIdx) rec.topicIdx = topicIdx;
      }
    }
    function addPair(src, i) {
      const k = src + ":" + i;
      if (pairSet.has(k)) return;
      pairSet.add(k);
      pairs.push([src, i]);
    }

    const topic = topicFor(parts);
    if (topic) {
      topic.verses.forEach(([s, a], idx) => {
        const i = indexOfCounts(counts, s, a);
        const boost = 80 - idx * 0.05;
        parts.forEach((_, tIdx) => addAyah(i, boost / Math.max(1, parts.length), tIdx, idx));
      });
    }

    for (let tIdx = 0; tIdx < parts.length; tIdx++) {
      const part = parts[tIdx];
      const arabic = isAr(part);
      const candidates = new Map();
      candidates.set(arabic ? canonAr(part) : part, 1.5);
      if (arabic) {
        for (const st of arStems(part)) if (!candidates.has(st)) candidates.set(st, 1.15);
      } else if (scope === "deep" && SYNONYMS[part]) {
        for (const syn of SYNONYMS[part]) {
          const norm = isAr(syn) ? canonAr(arNorm(syn)) : peelWord(syn);
          if (norm && !candidates.has(norm)) candidates.set(norm, 1.1);
        }
      } else if (SYNONYMS[part]) {
        // Fast mode: only same-script near synonyms (yaxsiliq ↔ yaxsi, faiz ↔ selem).
        for (const syn of SYNONYMS[part]) {
          if (isAr(syn)) continue;
          const norm = peelWord(syn);
          if (norm && norm !== part && !candidates.has(norm)) candidates.set(norm, 1.05);
        }
      }

      const prefixes = new Map();
      for (const term of candidates.keys()) {
        if (term.length < 2) continue;
        const pre = term.slice(0, 2);
        if (!prefixes.has(pre)) prefixes.set(pre, []);
        prefixes.get(pre).push(term);
      }

      for (const [pre, terms] of prefixes) {
        const bag = await fetchBucket(pre);
        if (!bag) continue;
        const keys = Object.keys(bag);
        for (const term of terms) {
          const weight = candidates.get(term);
          const grouped = new Map();
          for (const indexKey of keys) {
            const q = matchQuality(indexKey, term);
            if (q <= 0) continue;
            const list = bag[indexKey];
            if (!Array.isArray(list)) continue;
            for (const pair of list) {
              const src = pair[0];
              const i = pair[1];
              const prev = grouped.get(i);
              if (!prev || q > prev.q) grouped.set(i, { q, src });
              if (q >= 0.75) addPair(src, i);
            }
          }
          const df = grouped.size || 1;
          if (df > 4000) continue;
          const idf = Math.log(1 + TOTAL / df);
          for (const [i, info] of grouped) {
            addAyah(i, idf * weight * info.q, tIdx, null);
            addPair(info.src, i);
          }
        }
      }
    }

    const total = Math.max(1, parts.length);
    const ayahs = [];
    for (const [i, rec] of ayah) {
      const matched = rec.terms.size || (rec.topic ? total : 1);
      const coverage = matched / total;
      const final = rec.score * Math.pow(coverage, 1.8) * (matched === total ? 1.5 : 1);
      const direct = (rec.topic && matched === total && final >= 12) || (matched === total && total >= 2 && final >= 8);
      ayahs.push({
        i,
        score: Number(final.toFixed(3)),
        matched,
        total,
        direct,
        topic: rec.topic,
        topicIdx: rec.topicIdx,
      });
    }
    ayahs.sort((a, b) => {
      const ai = a.topicIdx == null ? 1000 : a.topicIdx;
      const bi = b.topicIdx == null ? 1000 : b.topicIdx;
      if (ai !== bi) return ai - bi;
      return b.score - a.score || a.i - b.i;
    });
    return { ayahs, pairs, topic: topic ? topic.match.join("+") : "" };
  }

  function relevantSnippet(text, parts, maxSentences) {
    if (!text) return "";
    const max = maxSentences || 3;
    const sentences = text.split(/(?<=[.!?؟])\s+/u).map((s) => s.trim()).filter(Boolean);
    if (sentences.length <= max) return text.replace(/\s+/g, " ").trim();
    const scored = sentences.map((sent, idx) => {
      const norm = isAr(sent) ? arNorm(sent) : fold(sent);
      let hits = 0;
      for (const p of parts || []) {
        const needle = isAr(p) ? canonAr(arNorm(p)) : fold(p);
        if (needle && norm.includes(needle)) hits += 2;
      }
      return { idx, hits };
    });
    scored.sort((a, b) => b.hits - a.hits || a.idx - b.idx);
    const idxs = scored.slice(0, max).map((x) => x.idx).sort((a, b) => a - b);
    return idxs.map((i) => sentences[i]).join(" … ");
  }

  return {
    TOTAL,
    STOP,
    TOPIC_VERSES,
    SYNONYMS,
    fold,
    isAr,
    arNorm,
    canonAr,
    keyOf,
    peelWord,
    tokens,
    arStems,
    rank,
    relevantSnippet,
    indexOfCounts,
  };
});
