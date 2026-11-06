
      const NAMES = "Fatihə,Bəqərə,Ali-İmran,Nisa,Maidə,Ənam,Əraf,Ənfal,Tövbə,Yunus,Hud,Yusuf,Rəd,İbrahim,Hicr,Nəhl,İsra,Kəhf,Məryəm,Taha,Ənbiya,Həcc,Muminun,Nur,Furqan,Şuəra,Nəml,Qəsəs,Ankəbut,Rum,Loğman,Səcdə,Əhzab,Səba,Fatir,Yasin,Saffat,Sad,Zumər,Ğafir,Fussilət,Şura,Zuxruf,Duxan,Casiyə,Əhqaf,Muhəmməd,Fəth,Hucurat,Qaf,Zariyat,Tur,Nəcm,Qəmər,Rəhman,Vaqiə,Hədid,Mucadələ,Həşr,Mumtəhinə,Saff,Cumə,Munafiqun,Təğabun,Talaq,Təhrim,Mulk,Qələm,Haqqə,Məaric,Nuh,Cin,Muzzəmmil,Muddəssir,Qiyamə,İnsan,Mursəlat,Nəbə,Naziat,Əbəsə,Təkvir,İnfitar,Mutəffifin,İnşiqaq,Buruc,Tariq,Əla,Ğaşiyə,Fəcr,Bələd,Şəms,Leyl,Duha,İnşirah,Tin,Ələq,Qədr,Bəyyinə,Zəlzələ,Adiyat,Qariə,Təkasur,Əsr,Huməzə,Fil,Qureyş,Maun,Kövsər,Kafirun,Nəsr,Məsəd,İxlas,Fələq,Nas".split(",");
      const ARNAMES = "الفاتحة,البقرة,آل عمران,النساء,المائدة,الأنعام,الأعراف,الأنفال,التوبة,يونس,هود,يوسف,الرعد,إبراهيم,الحجر,النحل,الإسراء,الكهف,مريم,طه,الأنبياء,الحج,المؤمنون,النور,الفرقان,الشعراء,النمل,القصص,العنكبوت,الروم,لقمان,السجدة,الأحزاب,سبأ,فاطر,يس,الصافات,ص,الزمر,غافر,فصلت,الشورى,الزخرف,الدخان,الجاثية,الأحقاف,محمد,الفتح,الحجرات,ق,الذاريات,الطور,النجم,القمر,الرحمن,الواقعة,الحديد,المجادلة,الحشر,الممتحنة,الصف,الجمعة,المنافقون,التغابن,الطلاق,التحريم,الملك,القلم,الحاقة,المعارج,نوح,الجن,المزمل,المدثر,القيامة,الإنسان,المرسلات,النبأ,النازعات,عبس,التكوير,الانفطار,المطففين,الانشقاق,البروج,الطارق,الأعلى,الغاشية,الفجر,البلد,الشمس,الليل,الضحى,الشرح,التين,العلق,القدر,البينة,الزلزلة,العاديات,القارعة,التكاثر,العصر,الهمزة,الفيل,قريش,الماعون,الكوثر,الكافرون,النصر,المسد,الإخلاص,الفلق,الناس".split(",");
      const sure = document.getElementById("sure");
      function surahTitle(page) {
        const starts = STARTS.split(",").map((item) => item.split(":").map(Number));
        const lines = pages[String(page)] || [];
        let prev = 1;
        for (const [sid, sp, line] of starts) {
          if (sp < page) { prev = sid; continue; }
          if (sp > page) break;
          let before = false;
          for (let i = 0; i < line - 1; i++) if (lines[i]) before = true;
          return "سورة " + NAMES[(before ? prev : sid) - 1];
        }
        return "سورة " + NAMES[prev - 1];
      }
      const LAST = 604;
      const STARTS = "1:1:2,2:2:3,3:50:3,4:77:2,5:106:8,6:128:3,7:151:3,8:177:3,9:187:2,10:208:2,11:221:9,12:235:11,13:249:3,14:255:5,15:262:3,16:267:9,17:282:3,18:293:12,19:305:3,20:312:7,21:322:3,22:332:2,23:342:2,24:350:2,25:359:13,26:367:2,27:377:2,28:385:10,29:396:10,30:404:12,31:411:3,32:415:2,33:418:2,34:428:3,35:434:10,36:440:6,37:446:2,38:453:2,39:458:6,40:467:5,41:477:3,42:483:3,43:489:7,44:496:3,45:499:2,46:502:9,47:507:2,48:511:3,49:515:9,50:518:3,51:520:14,52:523:10,53:526:2,54:528:12,55:531:7,56:534:9,57:537:13,58:542:3,59:545:9,60:549:2,61:551:9,62:553:3,63:554:9,64:556:2,65:558:2,66:560:3,67:562:3,68:564:8,69:566:12,70:568:11,71:570:7,72:572:3,73:574:3,74:575:10,75:577:8,76:578:12,77:580:9,78:582:3,79:583:10,80:585:2,81:586:4,82:587:3,83:587:14,84:589:5,85:590:4,86:591:3,87:591:12,88:592:7,89:593:5,90:594:8,91:595:4,92:595:13,93:596:8,94:596:15,95:597:5,96:597:11,97:598:6,98:598:11,99:599:8,100:599:14,101:600:6,102:600:13,103:601:3,104:601:7,105:601:13,106:602:3,107:602:8,108:602:14,109:603:3,110:603:8,111:603:13,112:604:3,113:604:7,114:604:12";
      const heads = {};
      const bisLines = {};
      const stackLines = {};
      for (const item of STARTS.split(",")) {
        const [id, page, line] = item.split(":").map(Number);
        if (id === 1 || id === 9) {
          (heads[page] ||= {})[Math.max(0, line - 2)] = id;
        } else if (line >= 3) {
          (heads[page] ||= {})[line - 3] = id;
          (bisLines[page] ||= {})[line - 2] = true;
        } else {
          (heads[page] ||= {})[0] = id;
          (stackLines[page] ||= {})[0] = true;
        }
      }
      const BISM = "\uFC41\uFC42\uFC43\uFC44";
      let namesReady = null;
      function loadNames() {
        if (!namesReady) {
          namesReady = Promise.all([
            new FontFace("surahnames", "url(./yazi-fonts/sura_names.woff2)").load(),
            new FontFace("QCF1", "url(./yazi-fonts/qcf/p1.woff2)").load(),
          ]).then((faces) => {
            faces.forEach((face) => document.fonts.add(face));
            loaded.add(1);
          });
        }
        return namesReady;
      }
      let pageNo = 1;
      let pages = null;
      let words = null; // Quran.com word lengths (chars) per page line: yazi-words.json
      const loaded = new Set();
      const board = document.getElementById("page");
      const pos = document.getElementById("pos");

      function textWidth(line) {
        const range = document.createRange();
        range.selectNodeContents(line);
        return range.getBoundingClientRect().width;
      }
      function fit() {
        for (const line of board.querySelectorAll(".line")) line.style.removeProperty("--g");
        const phoneLand = matchMedia("(orientation: landscape) and (max-height: 520px)").matches;
        const h = board.clientHeight;
        if (!phoneLand) {
          const w = board.clientWidth - 16;
          let size = h / 15;
          for (let i = 0; i < 3; i++) {
            board.style.fontSize = size + "px";
            let widest = 0;
            for (const line of board.querySelectorAll(".line:not(.surah):not(.basmala)")) widest = Math.max(widest, line.scrollWidth);
            if (widest <= w || widest === 0) break;
            size *= (w / widest) * 0.94;
          }
          const phonePort = matchMedia("(orientation: portrait) and (max-width: 520px)").matches;
          board.style.fontSize = size * (phonePort ? 1 : 0.9) + "px";
        } else {
          const w = board.clientWidth - 22;
          let size = w / 8;
          for (let i = 0; i < 5; i++) {
            board.style.fontSize = size + "px";
            let widest = 0;
            for (const line of board.querySelectorAll(".line:not(.surah):not(.basmala)")) widest = Math.max(widest, textWidth(line));
            if (widest <= w || widest === 0) break;
            size *= (w / widest) * 0.98;
          }
          board.style.fontSize = size + "px";
        }
        let ink = 0;
        for (const line of board.querySelectorAll(".line:not(.surah):not(.basmala)")) ink = Math.max(ink, textWidth(line));
        const card = Math.min(Math.max(ink, 0), board.clientWidth * 0.92);
        for (const head of board.querySelectorAll(".shead")) if (card > 0) head.style.width = card + "px";
        // justify full lines to the common width with the extra space between words, like the printed page
        if (card > 0) for (const line of board.querySelectorAll(".line:not(.surah):not(.basmala)")) {
          const ws = line.querySelectorAll(".w"); if (ws.length < 2) continue;
          const min = parseFloat(getComputedStyle(line).getPropertyValue("--g")) || 0;
          const gap0 = parseFloat(getComputedStyle(ws[1]).marginInlineStart) || 0;
          const nat = textWidth(line) - gap0 * (ws.length - 1);
          const g = (card - nat) / (ws.length - 1);
          if (nat >= card * 0.8 && g >= gap0) line.style.setProperty("--g", g.toFixed(2) + "px");
        }
        for (const row of board.querySelectorAll(".snames")) fitName(row);
      }

      // Inner oval of surah-banner.png (1020x116): x 181..839, y 21..94.
      const OVAL = { x0: 181 / 1020, x1: 839 / 1020, y0: 21 / 116, y1: 94 / 116 };
      const glyphInk = new Map();
      function inkOf(ch) {
        if (glyphInk.has(ch)) return glyphInk.get(ch);
        if (!document.fonts.check("100px surahnames", ch)) return null;
        const S = 100, ox = 320, oy = 240;
        const cnv = document.createElement("canvas");
        cnv.width = 640; cnv.height = 480;
        const c = cnv.getContext("2d", { willReadFrequently: true });
        c.font = S + "px surahnames";
        c.fillStyle = "#000";
        c.textBaseline = "alphabetic";
        c.fillText(ch, ox, oy);
        const data = c.getImageData(0, 0, cnv.width, cnv.height).data;
        let minX = cnv.width, minY = cnv.height, maxX = -1, maxY = -1;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 16) continue;
          const p = (i - 3) >> 2, x = p % cnv.width, y = (p / cnv.width) | 0;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
        if (maxX < 0) return null;
        const box = { w: maxX - minX + 1, a: oy - minY, d: Math.max(0, maxY - oy), l: ox - minX, r: maxX - ox };
        if (box.w < 4 || box.a + box.d < 4) return null;
        glyphInk.set(ch, box);
        return box;
      }
      function fitName(row) {
        const head = row.parentElement;
        const spans = [...row.querySelectorAll(".sname")];
        const ovW = head.clientWidth * (OVAL.x1 - OVAL.x0), ovH = head.clientHeight * (OVAL.y1 - OVAL.y0);
        const g = spans.map((s) => inkOf(s.textContent));
        if (!ovW || !ovH || g.some((x) => !x)) { row.style.visibility = "hidden"; return; }
        const asc = Math.max(...g.map((x) => x.a)), desc = Math.max(...g.map((x) => x.d));
        const wid = g.reduce((t, x) => t + x.w, 0) + 28 * (g.length - 1);
        const size = Math.max(6, Math.min((ovH * 0.62 * 100) / (asc + desc), (ovW * 0.78 * 100) / wid, ovH));
        row.style.fontSize = size + "px";
        row.style.visibility = "visible";
        let mark = row.querySelector(".sbase");
        if (!mark) {
          mark = document.createElement("i");
          mark.className = "sbase";
          mark.style.cssText = "display:inline-block;width:0;height:0;";
          spans[spans.length - 1].appendChild(mark);
        }
        const hr = head.getBoundingClientRect();
        if (!hr.height) return;
        const base = mark.getBoundingClientRect().top - hr.top;
        const inkMid = base - (size * (asc - desc)) / 200;
        const ovMid = (head.clientHeight * (OVAL.y0 + OVAL.y1)) / 2;
        let lo = Infinity, hi = -Infinity, x = 0;
        for (let i = g.length - 1; i >= 0; i--) {
          lo = Math.min(lo, x - g[i].l);
          hi = Math.max(hi, x + g[i].r);
          x += g[i].w + 28;
        }
        const dx = ((wid / 2 - (lo + hi) / 2) * size) / 100;
        row.style.transform = "translate(" + dx.toFixed(2) + "px," + (ovMid - inkMid).toFixed(2) + "px)";
      }

      let job = 0;
      async function show(n) {
        window.QM_SHOW = show; window.__qmPainting = n;
        if (window.QM_TURN && QM_TURN(n)) return;
        window.QM && QM.closeWordPop && QM.closeWordPop();
        const id = ++job;
        pageNo = Math.max(1, Math.min(LAST, n));
        setTimeout(() => { if (id !== job) return; try { const h = JSON.parse(localStorage.getItem("qm-recent") || "[]").filter((x) => x.p !== pageNo); h.unshift({ p: pageNo, t: (document.getElementById("sure") || {}).textContent || "" }); localStorage.setItem("qm-recent", JSON.stringify(h.slice(0, 5))); } catch (e) {} }, 400);
        const name = "QCF" + pageNo;
        if (!loaded.has(pageNo)) {
          try {
            const face = new FontFace(name, "url(./yazi-fonts/qcf/p" + pageNo + ".woff2)");
            await face.load();
            if (id !== job) return;
            document.fonts.add(face);
            loaded.add(pageNo);
          } catch (err) {
            if (id !== job) return;
          }
        }
        if (id !== job) return;
        board.style.fontFamily = name + ", serif";
        const marks = { ...(heads[pageNo] || {}) };
        const bis = { ...(bisLines[pageNo] || {}) };
        const stack = { ...(stackLines[pageNo] || {}) };
        const pageLines = pages[String(pageNo)];
        // Madinah layout: when a surah starts on line 2 of a page and the previous page's last line is empty,
        // the surah banner sits on that last line and this page's first line is only the basmala
        const lastEmpty = (n) => { const l = pages[String(n)]; return !!l && !l[14]; };
        if (stack[0] && lastEmpty(pageNo - 1)) { delete marks[0]; delete stack[0]; bis[0] = true; }
        const nextStack = stackLines[pageNo + 1] || {};
        if (nextStack[0] && !pageLines[14] && !marks[14]) marks[14] = heads[pageNo + 1][0];
        board.classList.toggle("mid", pageNo === 1 || pageNo === 2);
        board.replaceChildren();
        let last = pageLines.length - 1;
        if (pageNo === 1 || pageNo === 2) {
          while (last > 0 && !pageLines[last] && !marks[last] && !bis[last]) last--;
        }
        const addBasmala = (parent) => {
          const b = document.createElement("span");
          b.className = "basmala";
          b.textContent = BISM;
          parent.appendChild(b);
        };
        // ayah of every glyph on this page (QCF V2 codes matched to Quran.com words: yazi-ayahs.json)
        const runs = (ayahMap && ayahMap[String(pageNo)]) || [];
        // assign keys over ALL stored lines in order (some stored lines are drawn as a surah banner), so the
        // glyph counter never drifts when a line is skipped
        let ri = 0, left = runs[0] ? runs[0][1] : 0;
        const lineKeys = pageLines.map((text) => [...text].map((ch) => {
          if (ch !== " ") { while (left === 0 && ri < runs.length - 1) { ri++; left = runs[ri][1]; } left--; }
          return runs[ri] ? runs[ri][0] : "";
        }));
        // every Quran.com word gets its own .w box so the line can keep a gap between words (QCF V2 glyphs carry no
        // word spacing; drawn back to back the first word of a line ran into the next one)
        const wlens = (words && words[String(pageNo)]) || [];
        const addAyahs = (row, text, i) => {
          let span = null, word = null; const ks = lineKeys[i];
          const lens = wlens[i] || [];
          let wi = 0, left = lens[0] || Infinity, first = true;
          [...text].forEach((ch, j) => {
            const key = ks[j] || "";
            if (!span || span.dataset.k !== key) { span = document.createElement("span"); span.className = "ay"; span.dataset.k = key; row.appendChild(span); word = null; }
            if (left === 0) { wi++; left = lens[wi] || Infinity; word = null; }
            if (!word) { word = document.createElement("span"); word.className = first ? "w w0" : "w"; first = false; span.appendChild(word); }
            word.textContent += ch;
            left--;
          });
        };
        pageLines.forEach((text, i) => {
          if (i > last) return;
          if ((pageNo === 1 || pageNo === 2) && !text && !marks[i] && !bis[i]) return;
          const row = document.createElement("div");
          row.className = marks[i] ? "line surah" + (stack[i] ? " stack" : "") : bis[i] ? "line basmala" : "line";
          if (marks[i]) {
            const head = document.createElement("div");
            head.className = "shead";
            const frame = document.createElement("img");
            frame.src = "./surah-banner.png";
            frame.alt = "";
            const names = document.createElement("span");
            names.className = "snames";
            const word = document.createElement("span");
            word.className = "sname";
            word.textContent = "\uE000";
            const name = document.createElement("span");
            name.className = "sname";
            name.textContent = String.fromCharCode(0xe000 + parseInt(String(marks[i]), 16)); // font codes: E000 + decimal id read as hex (E114 = surah 114)
            names.append(word, name);
            head.append(frame, names);
            row.appendChild(head);
            if (stack[i]) addBasmala(row);
          } else if (bis[i]) addBasmala(row);
          else addAyahs(row, text, i);
          board.appendChild(row);
        });
        pos.textContent = String(pageNo);
        sure.textContent = surahTitle(pageNo);
        if (pageNo === 1 || pageNo === 2) {
          const n = board.querySelectorAll(".line:not(.surah)").length;
          const box = board.getBoundingClientRect();
          const shift = box.top + box.height / 2 - window.innerHeight / 2;
          board.style.setProperty("--half", String(n / 2));
          board.style.setProperty("--up", shift + "px");
        }
        fit();
        if (hlKey) paintHl(hlKey);
        window.QM_MARKS && window.QM_MARKS();
        window.QM_SEEN && window.QM_SEEN(pageNo);
        const ahead = pageNo + 1;
        if (ahead <= LAST && !loaded.has(ahead)) {
          const nextFace = new FontFace("QCF" + ahead, "url(./yazi-fonts/qcf/p" + ahead + ".woff2)");
          nextFace.load().then(() => { document.fonts.add(nextFace); loaded.add(ahead); }).catch(() => {});
        }
      }

      // Geometric hit-test (does not rely on elementFromPoint, which differs between mobile browsers and
      // misses the gaps between the thin QCF text boxes): the nearest text line wins, then the nearest glyph run on it.
      function pickAyah(x, y) {
        const lines = [];
        for (const line of board.querySelectorAll(".line")) {
          const spans = [...line.querySelectorAll(".ay")].filter((sp) => sp.dataset.k);
          if (!spans.length) continue;
          const rects = spans.map((sp) => [...sp.getClientRects()].filter((r) => r.width > 0));
          const all = rects.flat(); if (!all.length) continue;
          const top = Math.min(...all.map((r) => r.top)), bottom = Math.max(...all.map((r) => r.bottom));
          lines.push({ spans, rects, top, bottom, cy: (top + bottom) / 2 });
        }
        if (!lines.length) return null;
        let ln = null, best = Infinity;
        for (const l of lines) { const d = y < l.top ? l.top - y : y > l.bottom ? y - l.bottom : 0; if (d < best) { best = d; ln = l; } }
        const h = ln.bottom - ln.top;
        if (best > Math.max(h * 1.5, 40)) return null; // far from any text (margins, surah frame)
        let pick = null, bd = Infinity;
        ln.spans.forEach((sp, i) => { for (const r of ln.rects[i]) { const d = x < r.left ? r.left - x : x > r.right ? x - r.right : 0; if (d < bd) { bd = d; pick = sp; } } });
        if (bd > Math.max(h * 2, 48)) return null;
        return pick;
      }
      window.QM_PICK = pickAyah;
      // ayahs of a mushaf page in order (default: the open page)
      window.QM_PAGE = (n) => {
        n = n || pageNo; if (!ayahMap) return null;
        const keys = []; for (const r of ayahMap[String(n)] || []) if (!keys.includes(r[0])) keys.push(r[0]);
        return keys.length ? { n, keys } : null;
      };

      let startX = null;
      // long-press (~450 ms) on an ayah opens its tafsir / translation; moving the finger cancels it
      let holdT = 0, holdXY = null, held = false;
      const cancelHold = () => { clearTimeout(holdT); holdT = 0; };
      board.addEventListener("contextmenu", (e) => e.preventDefault());
      board.addEventListener("pointerdown", (e) => {
        held = false; holdXY = [e.clientX, e.clientY]; cancelHold();
        holdT = setTimeout(() => {
          holdT = 0;
          const ay = pickAyah(holdXY[0], holdXY[1]);
          if (!ay) return;
          held = true; startX = null;
          if (navigator.vibrate) try { navigator.vibrate(15); } catch (err) {}
          if (QM.selecting()) { QM.tapAyah(ay.dataset.k); return; }
          const [s, a] = ay.dataset.k.split(":").map(Number);
          paintHl(ay.dataset.k);
          if (navigator.vibrate) try { navigator.vibrate(15); } catch (err) {}
          QM.openAyah(s, a);
        }, 450);
        startX = e.clientX;
        try { board.setPointerCapture(e.pointerId); } catch (err) {}
      });
      board.addEventListener("pointermove", (e) => {
        if (holdT && holdXY && Math.hypot(e.clientX - holdXY[0], e.clientY - holdXY[1]) > 12) cancelHold();
      });
      // double-tap (two taps within 300 ms, close together) on a word: its root / Sirac note in a balloon
      let lastTap = null, downT = 0;
      board.addEventListener("pointerdown", () => { downT = performance.now(); }, true);
      function pickWord(x, y) {
        let best = null, bd = Infinity;
        for (const w of board.querySelectorAll(".ay[data-k] .w")) {
          for (const r of w.getClientRects()) {
            const dx = x < r.left ? r.left - x : x > r.right ? x - r.right : 0, dy = y < r.top ? r.top - y : y > r.bottom ? y - r.bottom : 0;
            const d = dy * 3 + dx; if (d < bd) { bd = d; best = w; }
          }
        }
        return bd < 40 ? best : null;
      }
      function wordTap(e) {
        const now = performance.now();
        if (now - downT > 300) { lastTap = null; return; }
        if (lastTap && now - lastTap.t < 300 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
          lastTap = null;
          const w = pickWord(e.clientX, e.clientY); if (!w) return;
          const key = w.parentElement.dataset.k;
          const pos = [...board.querySelectorAll('.ay[data-k="' + key + '"] .w')].indexOf(w) + 1;
          QM.wordPop && QM.wordPop(key, pos, w);
        } else lastTap = { t: now, x: e.clientX, y: e.clientY };
      }
      board.addEventListener("pointerup", (e) => {
        cancelHold();
        if (!held && startX != null && Math.abs(e.clientX - startX) < 12 && !QM.selecting()) wordTap(e);
        if (held || startX == null) { startX = null; return; }
        if (Math.abs(e.clientX - startX) < 12 && QM.selecting()) {
          const ay = pickAyah(e.clientX, e.clientY);
          startX = null;
          if (ay) QM.tapAyah(ay.dataset.k);
          return;
        }
        const dx = e.clientX - startX;
        startX = null;
        if (dx > 36) show(pageNo + 1);
        else if (dx < -36) show(pageNo - 1);
      });
      board.addEventListener("pointercancel", () => { startX = null; cancelHold(); });
      window.addEventListener("resize", fit);
      const AYAHS = "7,286,200,176,120,165,206,75,129,109,123,111,43,52,99,128,111,110,98,135,112,78,118,64,77,227,93,88,69,60,34,30,73,54,45,83,182,88,75,85,54,53,89,59,37,35,38,29,18,45,60,49,62,55,78,96,29,22,24,13,14,11,11,18,12,12,30,52,52,44,28,28,20,56,40,31,50,40,46,42,29,19,36,25,22,17,19,26,30,20,15,21,11,8,8,19,5,8,8,11,11,8,3,9,5,4,7,3,6,3,5,4,5,6".split(",").map(Number);
      const MADANI = new Set([2, 3, 4, 5, 8, 9, 13, 22, 24, 33, 47, 48, 49, 55, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 76, 98, 99, 110]);
      const JUZ = [1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];
      function surahPage(n) {
        for (const item of STARTS.split(",")) {
          const [id, page] = item.split(":").map(Number);
          if (id === n) return page;
        }
        return 1;
      }
      const gate = document.getElementById("gate");
      const rows = document.getElementById("rows");
      function openAt(n) {
        gate.hidden = true;
        show(n);
      }
      document.getElementById("back").addEventListener("click", (e) => {
        e.preventDefault();
        gate.hidden = false;
      });
      (function buildIndex() {
        const items = [];
        for (let i = 0; i < 30; i++) items.push({ k: "j", n: i + 1, page: JUZ[i] });
        NAMES.forEach((name, i) => items.push({ k: "s", n: i + 1, name, page: surahPage(i + 1), ayahs: AYAHS[i] }));
        items.sort((a, b) => a.page - b.page || (a.k === "j" ? -1 : 1));
        for (const item of items) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.dataset.kind = item.k;
          btn.dataset.n = String(item.n);
          btn.dataset.page = String(item.page);
          if (item.k === "j") {
            btn.className = "jrow";
            btn.innerHTML = "<span>Cüz " + item.n + "</span><span class='pg'>" + item.page + "</span>";
          } else {
            btn.className = "srow";
            btn.dataset.name = item.name;
            btn.dataset.ar = ARNAMES[item.n - 1];
            btn.dataset.ayahs = String(item.ayahs);
            btn.dataset.where = MADANI.has(item.n) ? "mad" : "mak";
            const where = MADANI.has(item.n) ? "Mədinə" : "Məkkə";
            btn.innerHTML = "<span class='no'>" + item.n + "</span><span><b>" + item.name + "</b><small>" + where + " — " + item.ayahs + " ayə</small></span><span class='pg'>" + item.page + "</span>";
          }
          btn.addEventListener("click", () => openAt(item.page));
          rows.appendChild(btn);
        }
      })();
      const RUB = [[1,1,1,"بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ"],[2,26,5,"إِنَّ ٱللَّهَ لَا يَسْتَحْىِۦٓ"],[2,44,7,"أَتَأْمُرُونَ ٱلنَّاسَ بِٱلْبِرِّ وَتَنسَوْنَ"],[2,60,9,"وَإِذِ ٱسْتَسْقَىٰ مُوسَىٰ لِقَوْمِهِۦ"],[2,75,11,"أَفَتَطْمَعُونَ أَن يُؤْمِنُوا۠ لَكُمْ"],[2,92,14,"وَلَقَدْ جَآءَكُم مُّوسَىٰ بِٱلْبَيِّنَـٰتِ"],[2,106,17,"مَا نَنسَخْ مِنْ ءَايَةٍ"],[2,124,19,"وَإِذِ ٱبْتَلَىٰٓ إِبْرَٰهِـۧمَ رَبُّهُۥ"],[2,142,22,"سَيَقُولُ ٱلسُّفَهَآءُ مِنَ ٱلنَّاسِ"],[2,158,24,"إِنَّ ٱلصَّفَا وَٱلْمَرْوَةَ مِن"],[2,177,27,"لَّيْسَ ٱلْبِرَّ أَن تُوَلُّوا۠"],[2,189,29,"يَسْـَٔلُونَكَ عَنِ ٱلْأَهِلَّةِ ۖ"],[2,203,32,"وَٱذْكُرُوا۠ ٱللَّهَ فِىٓ أَيَّامٍ"],[2,219,34,"يَسْـَٔلُونَكَ عَنِ ٱلْخَمْرِ وَٱلْمَيْسِرِ"],[2,233,37,"وَٱلْوَٰلِدَٰتُ يُرْضِعْنَ أَوْلَـٰدَهُنَّ حَوْلَيْنِ"],[2,243,39,"أَلَمْ تَرَ إِلَى ٱلَّذِينَ"],[2,253,42,"تِلْكَ ٱلرُّسُلُ فَضَّلْنَا بَعْضَهُمْ"],[2,263,44,"قَوْلٌ مَّعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ"],[2,272,46,"لَّيْسَ عَلَيْكَ هُدَىٰهُمْ وَلَـٰكِنَّ"],[2,283,49,"وَإِن كُنتُمْ عَلَىٰ سَفَرٍ"],[3,15,51,"قُلْ أَؤُنَبِّئُكُم بِخَيْرٍ مِّن"],[3,33,54,"إِنَّ ٱللَّهَ ٱصْطَفَىٰٓ ءَادَمَ"],[3,52,56,"فَلَمَّآ أَحَسَّ عِيسَىٰ مِنْهُمُ"],[3,75,59,"وَمِنْ أَهْلِ ٱلْكِتَـٰبِ مَنْ"],[3,93,62,"كُلُّ ٱلطَّعَامِ كَانَ حِلًّا"],[3,113,64,"لَيْسُوا۠ سَوَآءً ۗ مِّنْ"],[3,133,67,"وَسَارِعُوٓا۠ إِلَىٰ مَغْفِرَةٍ مِّن"],[3,153,69,"إِذْ تُصْعِدُونَ وَلَا تَلْوُۥنَ"],[3,171,72,"يَسْتَبْشِرُونَ بِنِعْمَةٍ مِّنَ ٱللَّهِ"],[3,186,74,"لَتُبْلَوُنَّ فِىٓ أَمْوَٰلِكُمْ وَأَنفُسِكُمْ"],[4,1,77," يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۠"],[4,12,79,"وَلَكُمْ نِصْفُ مَا تَرَكَ"],[4,24,82,"وَٱلْمُحْصَنَـٰتُ مِنَ ٱلنِّسَآءِ إِلَّا"],[4,36,84,"وَٱعْبُدُوا۠ ٱللَّهَ وَلَا تُشْرِكُوا۠"],[4,58,87,"إِنَّ ٱللَّهَ يَأْمُرُكُمْ أَن"],[4,74,89,"فَلْيُقَـٰتِلْ فِى سَبِيلِ ٱللَّهِ"],[4,88,92,"فَمَا لَكُمْ فِى ٱلْمُنَـٰفِقِينَ"],[4,100,94,"وَمَن يُهَاجِرْ فِى سَبِيلِ"],[4,114,97,"لَّا خَيْرَ فِى كَثِيرٍ"],[4,135,100,"يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۠ كُونُوا۠"],[4,148,102,"لَّا يُحِبُّ ٱللَّهُ ٱلْجَهْرَ"],[4,163,104,"إِنَّآ أَوْحَيْنَآ إِلَيْكَ كَمَآ"],[5,1,106," يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۠"],[5,12,109,"وَلَقَدْ أَخَذَ ٱللَّهُ مِيثَـٰقَ"],[5,27,112,"وَٱتْلُ عَلَيْهِمْ نَبَأَ ٱبْنَىْ"],[5,41,114,"يَـٰٓأَيُّهَا ٱلرَّسُولُ لَا يَحْزُنكَ"],[5,51,117,"يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۠ لَا"],[5,67,119,"يَـٰٓأَيُّهَا ٱلرَّسُولُ بَلِّغْ مَآ"],[5,82,121,"لَتَجِدَنَّ أَشَدَّ ٱلنَّاسِ عَدَٰوَةً"],[5,97,124,"جَعَلَ ٱللَّهُ ٱلْكَعْبَةَ ٱلْبَيْتَ"],[5,109,126,"يَوْمَ يَجْمَعُ ٱللَّهُ ٱلرُّسُلَ"],[6,13,129,"وَلَهُۥ مَا سَكَنَ فِى"],[6,36,132,"إِنَّمَا يَسْتَجِيبُ ٱلَّذِينَ يَسْمَعُونَ"],[6,59,134,"وَعِندَهُۥ مَفَاتِحُ ٱلْغَيْبِ لَا"],[6,74,137,"وَإِذْ قَالَ إِبْرَٰهِيمُ لِأَبِيهِ"],[6,95,140,"إِنَّ ٱللَّهَ فَالِقُ ٱلْحَبِّ"],[6,111,142,"وَلَوْ أَنَّنَا نَزَّلْنَآ إِلَيْهِمُ"],[6,127,144,"لَهُمْ دَارُ ٱلسَّلَـٰمِ عِندَ"],[6,141,146,"وَهُوَ ٱلَّذِىٓ أَنشَأَ جَنَّـٰتٍ"],[6,151,148,"قُلْ تَعَالَوْا۠ أَتْلُ مَا"],[7,1,151," الٓمٓصٓ"],[7,31,154,"يَـٰبَنِىٓ ءَادَمَ خُذُوا۠ زِينَتَكُمْ"],[7,47,156,"وَإِذَا صُرِفَتْ أَبْصَـٰرُهُمْ تِلْقَآءَ"],[7,65,158,"وَإِلَىٰ عَادٍ أَخَاهُمْ هُودًا"],[7,88,162,"قَالَ ٱلْمَلَأُ ٱلَّذِينَ ٱسْتَكْبَرُوا۠"],[7,117,164,"وَأَوْحَيْنَآ إِلَىٰ مُوسَىٰٓ أَنْ"],[7,142,167,"وَوَٰعَدْنَا مُوسَىٰ ثَلَـٰثِينَ لَيْلَةً"],[7,156,170,"وَٱكْتُبْ لَنَا فِى هَـٰذِهِ"],[7,171,173,"وَإِذْ نَتَقْنَا ٱلْجَبَلَ فَوْقَهُمْ"],[7,189,175,"هُوَ ٱلَّذِى خَلَقَكُم مِّن"],[8,1,177," يَسْـَٔلُونَكَ عَنِ ٱلْأَنفَالِ"],[8,22,179,"إِنَّ شَرَّ ٱلدَّوَآبِّ عِندَ"],[8,41,182,"وَٱعْلَمُوٓا۠ أَنَّمَا غَنِمْتُم مِّن"],[8,61,184,"وَإِن جَنَحُوا۠ لِلسَّلْمِ فَٱجْنَحْ"],[9,1,187,"بَرَآءَةٌ مِّنَ ٱللَّهِ وَرَسُولِهِۦٓ"],[9,19,189,"أَجَعَلْتُمْ سِقَايَةَ ٱلْحَآجِّ وَعِمَارَةَ"],[9,34,192,"يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۠ إِنَّ"],[9,46,194,"وَلَوْ أَرَادُوا۠ ٱلْخُرُوجَ لَأَعَدُّوا۠"],[9,60,196,"إِنَّمَا ٱلصَّدَقَـٰتُ لِلْفُقَرَآءِ وَٱلْمَسَـٰكِينِ"],[9,75,199,"وَمِنْهُم مَّنْ عَـٰهَدَ ٱللَّهَ"],[9,93,201,"إِنَّمَا ٱلسَّبِيلُ عَلَى ٱلَّذِينَ"],[9,111,204,"إِنَّ ٱللَّهَ ٱشْتَرَىٰ مِنَ"],[9,122,206,"وَمَا كَانَ ٱلْمُؤْمِنُونَ لِيَنفِرُوا۠"],[10,11,209,"وَلَوْ يُعَجِّلُ ٱللَّهُ لِلنَّاسِ"],[10,26,212,"لِّلَّذِينَ أَحْسَنُوا۠ ٱلْحُسْنَىٰ وَزِيَادَةٌ"],[10,53,214,"وَيَسْتَنۢبِـُٔونَكَ أَحَقٌّ هُوَ ۖ"],[10,71,217,"وَٱتْلُ عَلَيْهِمْ نَبَأَ نُوحٍ"],[10,90,219,"وَجَـٰوَزْنَا بِبَنِىٓ إِسْرَٰٓءِيلَ ٱلْبَحْرَ"],[11,6,222,"وَمَا مِن دَآبَّةٍ فِى"],[11,24,224,"مَثَلُ ٱلْفَرِيقَيْنِ كَٱلْأَعْمَىٰ وَٱلْأَصَمِّ"],[11,41,226,"وَقَالَ ٱرْكَبُوا۠ فِيهَا بِسْمِ"],[11,61,228,"وَإِلَىٰ ثَمُودَ أَخَاهُمْ صَـٰلِحًا"],[11,84,231,"وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا"],[11,108,233,"وَأَمَّا ٱلَّذِينَ سُعِدُوا۠ فَفِى"],[12,7,236,"لَّقَدْ كَانَ فِى يُوسُفَ"],[12,30,238,"وَقَالَ نِسْوَةٌ فِى ٱلْمَدِينَةِ"],[12,53,242,"وَمَآ أُبَرِّئُ نَفْسِىٓ ۚ"],[12,77,244,"قَالُوٓا۠ إِن يَسْرِقْ فَقَدْ"],[12,101,247,"رَبِّ قَدْ ءَاتَيْتَنِى مِنَ"],[13,5,249,"وَإِن تَعْجَبْ فَعَجَبٌ قَوْلُهُمْ"],[13,19,252,"أَفَمَن يَعْلَمُ أَنَّمَآ أُنزِلَ"],[13,35,254,"مَّثَلُ ٱلْجَنَّةِ ٱلَّتِى وُعِدَ"],[14,10,256,"قَالَتْ رُسُلُهُمْ أَفِى ٱللَّهِ"],[14,28,259,"أَلَمْ تَرَ إِلَى ٱلَّذِينَ"],[15,1,262," الٓر ۚ تِلْكَ"],[15,49,264,"نَبِّئْ عِبَادِىٓ أَنِّىٓ أَنَا"],[16,1,267," أَتَىٰٓ أَمْرُ ٱللَّهِ"],[16,30,270,"وَقِيلَ لِلَّذِينَ ٱتَّقَوْا۠ مَاذَآ"],[16,51,272,"وَقَالَ ٱللَّهُ لَا تَتَّخِذُوٓا۠"],[16,75,275,"ضَرَبَ ٱللَّهُ مَثَلًا عَبْدًا"],[16,90,277,"إِنَّ ٱللَّهَ يَأْمُرُ بِٱلْعَدْلِ"],[16,111,280,"يَوْمَ تَأْتِى كُلُّ نَفْسٍ"],[17,1,282," سُبْحَـٰنَ ٱلَّذِىٓ أَسْرَىٰ"],[17,23,284,"وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوٓا۠"],[17,50,287,"قُلْ كُونُوا۠ حِجَارَةً أَوْ"],[17,70,289,"وَلَقَدْ كَرَّمْنَا بَنِىٓ ءَادَمَ"],[17,99,292,"أَوَلَمْ يَرَوْا۠ أَنَّ ٱللَّهَ"],[18,17,295,"وَتَرَى ٱلشَّمْسَ إِذَا طَلَعَت"],[18,32,297,"وَٱضْرِبْ لَهُم مَّثَلًا رَّجُلَيْنِ"],[18,51,299,"مَّآ أَشْهَدتُّهُمْ خَلْقَ ٱلسَّمَـٰوَٰتِ"],[18,75,302,"قَالَ أَلَمْ أَقُل لَّكَ"],[18,99,304,"وَتَرَكْنَا بَعْضَهُمْ يَوْمَئِذٍ يَمُوجُ"],[19,22,306,"فَحَمَلَتْهُ فَٱنتَبَذَتْ بِهِۦ مَكَانًا"],[19,59,309,"فَخَلَفَ مِنۢ بَعْدِهِمْ خَلْفٌ"],[20,1,312," طه"],[20,55,315,"مِنْهَا خَلَقْنَـٰكُمْ وَفِيهَا نُعِيدُكُمْ"],[20,83,317,"وَمَآ أَعْجَلَكَ عَن قَوْمِكَ"],[20,111,319,"وَعَنَتِ ٱلْوُجُوهُ لِلْحَىِّ ٱلْقَيُّومِ"],[21,1,322," ٱقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ"],[21,29,324,"وَمَن يَقُلْ مِنْهُمْ إِنِّىٓ"],[21,51,326,"وَلَقَدْ ءَاتَيْنَآ إِبْرَٰهِيمَ رُشْدَهُۥ"],[21,83,329,"وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُۥٓ"],[22,1,332," يَـٰٓأَيُّهَا ٱلنَّاسُ ٱتَّقُوا۠"],[22,19,334,"هَـٰذَانِ خَصْمَانِ ٱخْتَصَمُوا۠ فِى"],[22,38,336,"إِنَّ ٱللَّهَ يُدَٰفِعُ عَنِ"],[22,60,339,"ذَٰلِكَ وَمَنْ عَاقَبَ بِمِثْلِ"],[23,1,342," قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ"],[23,36,344,"هَيْهَاتَ هَيْهَاتَ لِمَا تُوعَدُونَ"],[23,75,347,"وَلَوْ رَحِمْنَـٰهُمْ وَكَشَفْنَا مَا"],[24,1,350," سُورَةٌ أَنزَلْنَـٰهَا وَفَرَضْنَـٰهَا"],[24,21,352,"يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۠ لَا"],[24,35,354,"ٱللَّهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ"],[24,53,356,"وَأَقْسَمُوا۠ بِٱللَّهِ جَهْدَ أَيْمَـٰنِهِمْ"],[25,1,359," تَبَارَكَ ٱلَّذِى نَزَّلَ"],[25,21,362,"وَقَالَ ٱلَّذِينَ لَا يَرْجُونَ"],[25,53,364,"وَهُوَ ٱلَّذِى مَرَجَ ٱلْبَحْرَيْنِ"],[26,1,367," طسٓمٓ"],[26,52,369,"وَأَوْحَيْنَآ إِلَىٰ مُوسَىٰٓ أَنْ"],[26,111,371,"قَالُوٓا۠ أَنُؤْمِنُ لَكَ وَٱتَّبَعَكَ"],[26,181,374,"أَوْفُوا۠ ٱلْكَيْلَ وَلَا تَكُونُوا۠"],[27,1,377," طسٓ ۚ تِلْكَ"],[27,27,379,"قَالَ سَنَنظُرُ أَصَدَقْتَ أَمْ"],[27,56,382,"فَمَا كَانَ جَوَابَ قَوْمِهِۦٓ"],[27,82,384,"وَإِذَا وَقَعَ ٱلْقَوْلُ عَلَيْهِمْ"],[28,12,386,"وَحَرَّمْنَا عَلَيْهِ ٱلْمَرَاضِعَ مِن"],[28,29,389,"فَلَمَّا قَضَىٰ مُوسَى ٱلْأَجَلَ"],[28,51,392,"وَلَقَدْ وَصَّلْنَا لَهُمُ ٱلْقَوْلَ"],[28,76,394,"إِنَّ قَـٰرُونَ كَانَ مِن"],[29,1,396," الٓمٓ"],[29,26,399,"فَـَٔامَنَ لَهُۥ لُوطٌ ۘ"],[29,46,402,"وَلَا تُجَـٰدِلُوٓا۠ أَهْلَ ٱلْكِتَـٰبِ"],[30,1,404," الٓمٓ"],[30,31,407,"مُنِيبِينَ إِلَيْهِ وَٱتَّقُوهُ وَأَقِيمُوا۠"],[30,54,410,"ٱللَّهُ ٱلَّذِى خَلَقَكُم مِّن"],[31,22,413,"وَمَن يُسْلِمْ وَجْهَهُۥٓ إِلَى"],[32,11,415,"قُلْ يَتَوَفَّىٰكُم مَّلَكُ ٱلْمَوْتِ"],[33,1,418," يَـٰٓأَيُّهَا ٱلنَّبِىُّ ٱتَّقِ"],[33,18,420,"قَدْ يَعْلَمُ ٱللَّهُ ٱلْمُعَوِّقِينَ"],[33,31,422,"وَمَن يَقْنُتْ مِنكُنَّ لِلَّهِ"],[33,51,425,"تُرْجِى مَن تَشَآءُ مِنْهُنَّ"],[33,60,426,"لَّئِن لَّمْ يَنتَهِ ٱلْمُنَـٰفِقُونَ"],[34,10,429,"وَلَقَدْ ءَاتَيْنَا دَاوُۥدَ مِنَّا"],[34,24,431,"قُلْ مَن يَرْزُقُكُم مِّنَ"],[34,46,433,"قُلْ إِنَّمَآ أَعِظُكُم بِوَٰحِدَةٍ"],[35,15,436,"يَـٰٓأَيُّهَا ٱلنَّاسُ أَنتُمُ ٱلْفُقَرَآءُ"],[35,41,439,"إِنَّ ٱللَّهَ يُمْسِكُ ٱلسَّمَـٰوَٰتِ"],[36,28,442,"وَمَآ أَنزَلْنَا عَلَىٰ قَوْمِهِۦ"],[36,60,444,"أَلَمْ أَعْهَدْ إِلَيْكُمْ يَـٰبَنِىٓ"],[37,22,446,"ٱحْشُرُوا۠ ٱلَّذِينَ ظَلَمُوا۠ وَأَزْوَٰجَهُمْ"],[37,83,449,"وَإِنَّ مِن شِيعَتِهِۦ لَإِبْرَٰهِيمَ"],[37,145,451,"فَنَبَذْنَـٰهُ بِٱلْعَرَآءِ وَهُوَ سَقِيمٌ"],[38,21,454,"وَهَلْ أَتَىٰكَ نَبَؤُا۠ ٱلْخَصْمِ"],[38,52,456,"وَعِندَهُمْ قَـٰصِرَٰتُ ٱلطَّرْفِ أَتْرَابٌ"],[39,8,459,"وَإِذَا مَسَّ ٱلْإِنسَـٰنَ ضُرٌّ"],[39,32,462,"فَمَنْ أَظْلَمُ مِمَّن كَذَبَ"],[39,53,464,"قُلْ يَـٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۠"],[40,1,467," حمٓ"],[40,21,469,"أَوَلَمْ يَسِيرُوا۠ فِى ٱلْأَرْضِ"],[40,41,472,"وَيَـٰقَوْمِ مَا لِىٓ أَدْعُوكُمْ"],[40,66,474,"قُلْ إِنِّى نُهِيتُ أَنْ"],[41,9,477,"قُلْ أَئِنَّكُمْ لَتَكْفُرُونَ بِٱلَّذِى"],[41,25,479,"وَقَيَّضْنَا لَهُمْ قُرَنَآءَ فَزَيَّنُوا۠"],[41,47,482,"إِلَيْهِ يُرَدُّ عِلْمُ ٱلسَّاعَةِ"],[42,13,484,"شَرَعَ لَكُم مِّنَ ٱلدِّينِ"],[42,27,486,"وَلَوْ بَسَطَ ٱللَّهُ ٱلرِّزْقَ"],[42,51,488,"وَمَا كَانَ لِبَشَرٍ أَن"],[43,24,491,"قَـٰلَ أَوَلَوْ جِئْتُكُم بِأَهْدَىٰ"],[43,57,493,"وَلَمَّا ضُرِبَ ٱبْنُ مَرْيَمَ"],[44,17,496,"وَلَقَدْ فَتَنَّا قَبْلَهُمْ قَوْمَ"],[45,12,499,"ٱللَّهُ ٱلَّذِى سَخَّرَ لَكُمُ"],[46,1,502," حمٓ"],[46,21,505,"وَٱذْكُرْ أَخَا عَادٍ إِذْ"],[47,10,507,"أَفَلَمْ يَسِيرُوا۠ فِى ٱلْأَرْضِ"],[47,33,510,"يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوٓا۠ أَطِيعُوا۠"],[48,18,513,"لَّقَدْ رَضِىَ ٱللَّهُ عَنِ"],[49,1,515," يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۠"],[49,14,517,"قَالَتِ ٱلْأَعْرَابُ ءَامَنَّا ۖ"],[50,27,519,"قَالَ قَرِينُهُۥ رَبَّنَا مَآ"],[51,31,522,"قَالَ فَمَا خَطْبُكُمْ أَيُّهَا"],[52,24,524,"وَيَطُوفُ عَلَيْهِمْ غِلْمَانٌ لَّهُمْ"],[53,26,526,"وَكَم مِّن مَّلَكٍ فِى"],[54,9,529,"كَذَّبَتْ قَبْلَهُمْ قَوْمُ نُوحٍ"],[55,1,531," ٱلرَّحْمَـٰنُ"],[56,1,534," إِذَا وَقَعَتِ ٱلْوَاقِعَةُ"],[56,75,536,"فَلَآ أُقْسِمُ بِمَوَٰقِعِ ٱلنُّجُومِ"],[57,16,539,"أَلَمْ يَأْنِ لِلَّذِينَ ءَامَنُوٓا۠"],[58,1,542," قَدْ سَمِعَ ٱللَّهُ"],[58,14,544,"أَلَمْ تَرَ إِلَى ٱلَّذِينَ"],[59,11,547,"أَلَمْ تَرَ إِلَى ٱلَّذِينَ"],[60,7,550,"عَسَى ٱللَّهُ أَن يَجْعَلَ"],[62,1,553," يُسَبِّحُ لِلَّهِ مَا"],[63,4,554,"وَإِذَا رَأَيْتَهُمْ تُعْجِبُكَ أَجْسَامُهُمْ"],[65,1,558," يَـٰٓأَيُّهَا ٱلنَّبِىُّ إِذَا"],[66,1,560," يَـٰٓأَيُّهَا ٱلنَّبِىُّ لِمَ"],[67,1,562," تَبَـٰرَكَ ٱلَّذِى بِيَدِهِ"],[68,1,564," نٓ ۚ وَٱلْقَلَمِ"],[69,1,566," ٱلْحَآقَّةُ"],[70,19,569,"إِنَّ ٱلْإِنسَـٰنَ خُلِقَ هَلُوعًا"],[72,1,572," قُلْ أُوحِىَ إِلَىَّ"],[73,20,575,"إِنَّ رَبَّكَ يَعْلَمُ أَنَّكَ"],[75,1,577," لَآ أُقْسِمُ بِيَوْمِ"],[76,19,579,"وَيَطُوفُ عَلَيْهِمْ وِلْدَٰنٌ مُّخَلَّدُونَ"],[78,1,582," عَمَّ يَتَسَآءَلُونَ"],[80,1,585," عَبَسَ وَتَوَلَّىٰٓ"],[82,1,587," إِذَا ٱلسَّمَآءُ ٱنفَطَرَتْ"],[84,1,589," إِذَا ٱلسَّمَآءُ ٱنشَقَّتْ"],[87,1,591," سَبِّحِ ٱسْمَ رَبِّكَ"],[90,1,594," لَآ أُقْسِمُ بِهَـٰذَا"],[94,1,596," أَلَمْ نَشْرَحْ لَكَ"],[100,9,599,"أَفَلَا يَعْلَمُ إِذَا بُعْثِرَ"]];
      const jrows = document.getElementById("jrows");
      const htabs = document.getElementById("htabs");
      let hTab = "s";
      function setTab(t) { hTab = t; for (const b of htabs.children) b.classList.toggle("on", b.dataset.t === t); rows.hidden = t !== "s"; jrows.hidden = t !== "j"; if (t === "j") ahits.hidden = true; }
      for (const b of htabs.children) b.addEventListener("click", () => setTab(b.dataset.t));
      function paintJuz() {
        const tt = (k) => (window.QM && window.QM.t ? window.QM.t(k) : k);
        jrows.replaceChildren();
        RUB.forEach(([s, a, pg, w], i) => {
          if (i % 8 === 0) { const hd = document.createElement("button"); hd.type = "button"; hd.className = "jhd"; hd.innerHTML = "<span>" + tt("Cüz") + " " + (i / 8 + 1) + "</span><span>" + JUZ[i / 8] + "</span>"; hd.onclick = () => openAt(JUZ[i / 8]); jrows.appendChild(hd); }
          const r = document.createElement("button"); r.type = "button"; r.className = "qrow";
          const d = document.createElement("div"); const p = document.createElement("p"); p.dir = "rtl"; p.lang = "ar"; p.textContent = w + "…"; const sm = document.createElement("small"); sm.textContent = tt("Surə") + " " + NAMES[s - 1] + ", " + tt("ayə") + " " + a; d.append(p, sm);
          const g = document.createElement("span"); g.className = "pg"; g.textContent = pg; r.append(d, g);
          r.onclick = () => openAt(pg); jrows.appendChild(r);
        });
      }
      paintJuz();
      const qInput = document.getElementById("q");
      const searchWrap = document.getElementById("search-wrap");
      const searchBtn = document.getElementById("search-btn");
      const emptyEl = document.getElementById("empty");
      const ahits = document.getElementById("ahits");
      // hərfkəsiz / hərəkəsiz: ə=a=e, ş=s, ç=c, ğ=g, ö=o, ü=u, q=k, x=h, ərəb hərəkələri atılır
      function fold(s) {
        const ar = /[\u0600-\u06FF]/.test(s);
        if (ar) {
          return s.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
            .replace(/[أإآٱ]/g, "ا").replace(/ؤ/g, "و").replace(/[ئىیي]/g, "ي").replace(/[ةەه]/g, "ه").replace(/ك/g, "ك").replace(/ک/g, "ك")
            .replace(/[^\u0600-\u06FF]/g, "").replace(/^ال/, "");
        }
        return s.toLocaleLowerCase("tr")
          .replace(/sh/g, "s").replace(/ch/g, "c").replace(/kh/g, "h").replace(/gh/g, "g")
          .replace(/ə/g, "a").replace(/[âà]/g, "a").replace(/[ıî]/g, "i").replace(/i̇/g, "i")
          .replace(/[öô]/g, "o").replace(/[üû]/g, "u").replace(/ş/g, "s").replace(/ç/g, "c")
          .replace(/ğ/g, "g").replace(/q/g, "k").replace(/x/g, "h").replace(/w/g, "v")
          .replace(/e/g, "a").replace(/[^a-z0-9]/g, "");
      }
      function arPlain(s, alif) {
        let t = s.replace(/\u06E5/g, "و").replace(/[\u06E6\u06E7]/g, "ي");
        t = t.replace(/[\u0610-\u061A\u064B-\u0655\u0657-\u065F\u06D6-\u06ED\u08D4-\u08FF\u0640]/g, "");
        t = t.replace(/[\u0656\u0670]/g, alif ? "ا" : "");
        return t.replace(/[أإآٱٲ]/g, "ا").replace(/ؤ/g, "و").replace(/[ئىی]/g, "ي").replace(/ة/g, "ه")
          .replace(/[^\u0621-\u064A\s]/g, " ").replace(/\s+/g, " ").trim();
      }
      // search normaliser: harakat, Uthmani spellings (dagger alif, wāw/yā with alif), tatweel, alif and hamza seats
      function arN(t, alif) {
        t = t.replace(/\u06E5/g, "و").replace(/[\u06E6\u06E7]/g, "ي");
        t = alif ? t.replace(/\u0648\u0670/g, "ا").replace(/\u0649\u0670/g, "ى").replace(/\u0670/g, "ا") : t.replace(/\u0670/g, "");
        t = t.replace(/[\u0624\u0626\u0654\u0655]/g, "ء").replace(/آ/g, "ءا");
        return t.replace(/[\u0610-\u061A\u064B-\u0653\u0656-\u065F\u06D6-\u06ED\u08D4-\u08FF\u0640]/g, "")
          .replace(/[أإٱٲ]/g, "ا").replace(/[ىی]/g, "ي").replace(/ة/g, "ه").replace(/ک/g, "ك")
          .replace(/[^\u0621-\u064A\s]/g, " ").replace(/\s+/g, " ").trim();
      }
      window.QM_ARN = arN;
      function normWord(w) {
        return w.replace(/[أإآٱٲ]/g, "ا").replace(/ؤ/g, "و").replace(/[ئىی]/g, "ي").replace(/ة/g, "ه").replace(/[^\u0621-\u064A]/g, "");
      }
      function wordForms(raw, alif) {
        let t = raw.replace(/\u06E5/g, "و").replace(/[\u06E6\u06E7]/g, "ي");
        t = t.replace(/[\u0610-\u061A\u064B-\u0655\u0657-\u065F\u06D6-\u06ED\u08D4-\u08FF\u0640]/g, "");
        t = t.replace(/[\u0656\u0670]/g, alif ? "ا" : "");
        const out = [];
        for (const w of t.split(/\s+/)) {
          if (!w) continue;
          const full = normWord(w);
          if (!full) continue;
          out.push(full);
          const head = [...w][0];
          if ((head === "ا" || head === "ٱ") && [...w][1] === "ل" && [...w].length > 3) {
            const rest = normWord([...w].slice(2).join(""));
            if (rest) out.push(rest);
          }
        }
        return out;
      }
      let quranP = null, searchGen = 0;
      function loadQuran() {
        if (quranP) return quranP;
        quranP = (async () => {
          const [txt, map] = await Promise.all([
            fetch("./quran-uthmani.txt").then((r) => r.text()),
            ayahMap ? Promise.resolve(ayahMap) : fetch("./yazi-ayahs.json").then((r) => r.json()).then((j) => (ayahMap = j)),
          ]);
          const pageBy = {};
          for (const [p, list] of Object.entries(map)) for (const row of list) pageBy[row[0]] = Number(p);
          const out = [];
          for (const line of txt.split("\n")) {
            if (!line) continue;
            const i = line.indexOf("|"), j = line.indexOf("|", i + 1);
            if (j < 0) continue;
            const s = +line.slice(0, i), a = +line.slice(i + 1, j);
            let raw = line.slice(j + 1).trim();
            if (a === 1 && s !== 1 && s !== 9) raw = raw.split(/\s+/).slice(4).join(" ");
            const plain = arPlain(raw, true);
            if (!plain) continue;
            const words = [...new Set(wordForms(raw, true).concat(wordForms(raw, false)))];
            out.push({ s, a, raw, plain, words, nA: arN(raw, true), nB: arN(raw, false), hA: arN(raw, true).replace(/ء/g, ""), hB: arN(raw, false).replace(/ء/g, ""), page: pageBy[s + ":" + a] || surahPage(s) });
          }
          return out;
        })();
        return quranP;
      }
      function wordHit(item, qs) {
        return qs.every((q) => item.words.includes(q));
      }
      function showSurahs(raw) {
        ahits.hidden = true;
        ahits.replaceChildren();
        if (raw && hTab !== "s") setTab("s");
        rows.hidden = hTab !== "s";
        const nq = fold(raw);
        const alt = nq.length > 4 && nq.startsWith("al") ? nq.slice(2) : "";
        let shown = 0;
        for (const btn of rows.children) {
          if (!nq) { btn.hidden = false; shown++; continue; }
          if (btn.dataset.kind === "j") { btn.hidden = true; continue; }
          const name = fold(btn.dataset.name || "");
          const ar = fold(btn.dataset.ar || "");
          const num = btn.dataset.n || "";
          const ok = name.includes(nq) || ar.includes(nq) || (alt && (name.includes(alt) || ar.includes(alt))) || num === raw;
          btn.hidden = !ok;
          if (ok) shown++;
        }
        emptyEl.hidden = shown !== 0;
      }
      // ---- search: tabs Ərəbcə / Tərcümə / Təfsir, results, ‹ n / total › bar ----
      const T_ = (k) => (window.QM && window.QM.t ? window.QM.t(k) : k);
      let sTab = "ar", sTimer = 0, sHits = [], sShown = 0, sQ = null;
      const stabs = document.createElement("div"); stabs.className = "s-tabs"; stabs.id = "stabs";
      const ssrc = document.createElement("select"); ssrc.className = "s-src"; ssrc.hidden = true;
      const sInfo = document.createElement("p"); sInfo.className = "s-info"; sInfo.hidden = true;
      searchWrap.append(stabs, ssrc, sInfo);
      function paintTabs() {
        stabs.replaceChildren();
        for (const [k, l] of [["ar", "Ərəbcə"], ["tr", "Tərcümə"], ["tf", "Təfsir"]]) {
          const b = document.createElement("button"); b.type = "button"; b.dataset.k = k; b.className = "s-tab" + (sTab === k ? " on" : "");
          b.textContent = T_(l) + (sTab === k && sQ && sHits.length ? " · " + sHits.length : "");
          b.onclick = () => { sTab = k; sHits = []; applyFilter(); }; stabs.append(b);
        }
      }
      const isAr = (x) => /[\u0600-\u06FF]/.test(x);
      // Latin/Cyrillic folding that keeps character positions (for highlighting)
      const lowC = (c) => { let n = c.toLowerCase().replace(/\u0307/g, ""); n = n.replace(/ı/g, "i").replace(/ё/g, "е"); return n.length === 1 ? n : c; };
      const lowS = (t) => { let o = ""; for (const c of t) o += c.length === 1 ? lowC(c) : c; return o; };
      function hlArabic(el, raw, toks, fontFix) {
        const ws = raw.split(/(\s+)/);
        for (const w of ws) {
          if (/^\s+$/.test(w) || !w) { el.append(w); continue; }
          const a = arN(w, true), b = arN(w, false);
          if (toks.some((t) => a.includes(t) || b.includes(t) || (!t.includes("ء") && (a.replace(/ء/g, "").includes(t) || b.replace(/ء/g, "").includes(t))))) { const m = document.createElement("mark"); m.textContent = fontFix(w); el.append(m); }
          else el.append(fontFix(w));
        }
      }
      function snipLatin(el, text, toks) {
        const low = lowS(text); let first = -1;
        for (const t of toks) { const i = low.indexOf(t); if (i >= 0 && (first < 0 || i < first)) first = i; }
        let a = 0, b = text.length;
        if (text.length > 220) { a = Math.max(0, first - 80); b = Math.min(text.length, a + 220); while (a > 0 && !/\s/.test(text[a - 1])) a++; }
        const seg = text.slice(a, b), lseg = low.slice(a, b);
        const marks = []; for (const t of toks) { let i = 0; while ((i = lseg.indexOf(t, i)) >= 0) { marks.push([i, i + t.length]); i += t.length; } }
        marks.sort((x, y) => x[0] - y[0]);
        if (a > 0) el.append("… ");
        let p = 0; for (const [x, y] of marks) { if (x < p) continue; el.append(seg.slice(p, x)); const m = document.createElement("mark"); m.textContent = seg.slice(x, y); el.append(m); p = y; }
        el.append(seg.slice(p)); if (b < text.length) el.append(" …");
      }
      function snipArabicText(el, text, toks) {
        const ws = text.split(/\s+/); let i0 = ws.findIndex((w) => { const n = arN(w, true); return toks.some((t) => n.includes(t) || n.replace(/ء/g, "").includes(t)); });
        if (i0 < 0) i0 = 0; const a = Math.max(0, i0 - 12), b = Math.min(ws.length, i0 + 18);
        if (a > 0) el.append("… "); hlArabic(el, ws.slice(a, b).join(" "), toks, (x) => x); if (b < ws.length) el.append(" …");
      }
      function renderHits() {
        ahits.querySelectorAll(".ahit-more").forEach((x) => x.remove());
        const end = Math.min(sHits.length, sShown + 50);
        for (let i = sShown; i < end; i++) {
          const h = sHits[i]; const b = document.createElement("button"); b.type = "button"; b.className = "ahit s-hit"; b.dataset.i = i; b.dataset.k = h.s + ":" + h.a;
          const head = document.createElement("b"); head.textContent = NAMES[h.s - 1] + " " + h.a + (h.to && h.to > h.a ? "–" + h.to : ""); const ref = document.createElement("small"); ref.textContent = h.s + ":" + h.a; head.append(ref);
          const p = document.createElement("p");
          if (h.raw != null) { p.className = "s-ar"; p.dir = "rtl"; hlArabic(p, h.raw, sQ.toks, (x) => (window.QM_SRC ? window.QM_SRC.forFont(x) : x)); }
          else if (sQ.ar) { p.className = "s-tx"; p.dir = "rtl"; snipArabicText(p, h.t, sQ.toks); }
          else { p.className = "s-tx"; p.dir = "auto"; snipLatin(p, h.t, sQ.toks); }
          b.append(head, p); b.onclick = () => goHit(i); ahits.append(b);
        }
        sShown = end;
        if (sShown < sHits.length) { const m = document.createElement("button"); m.type = "button"; m.className = "ahit-more"; m.textContent = T_("Daha çox") + " · " + sShown + " / " + sHits.length; m.onclick = renderHits; ahits.append(m); }
      }
      function showInfo(t, btn) { sInfo.hidden = false; sInfo.replaceChildren(t); if (btn) { const b = document.createElement("button"); b.type = "button"; b.className = "s-go"; b.textContent = T_("Ayarlarda endir"); b.onclick = () => QM.openSettings(sTab); sInfo.append(" ", b); } }
      async function runSearch() {
        const raw = qInput.value.trim(); const gen = ++searchGen;
        sInfo.hidden = true; ssrc.hidden = true;
        if (sTab === "ar" && !isAr(raw)) { sHits = []; sQ = null; paintTabs(); showSurahs(raw); return; }
        rows.hidden = true; ahits.hidden = false; ahits.replaceChildren(); emptyEl.hidden = true; sHits = []; sShown = 0;
        if (sTab === "ar") {
          const toks = arN(raw, true).split(" ").filter(Boolean); sQ = { toks, ar: true };
          if (!toks.length) { paintTabs(); return; }
          const list = await loadQuran(); if (gen !== searchGen) return;
          if (window.QM_SRC) window.QM_SRC.font();
          sHits = list.filter((it) => toks.every((t) => it.nA.includes(t) || it.nB.includes(t) || (!t.includes("ء") && (it.hA.includes(t) || it.hB.includes(t)))));
        } else {
          const srcs = window.QM_SRC ? await window.QM_SRC.list(sTab) : []; if (gen !== searchGen) return;
          if (!srcs.length) { paintTabs(); rows.hidden = true; showInfo(sTab === "tr" ? T_("Hələ tərcümə endirilməyib.") : T_("Hələ təfsir endirilməyib."), true); return; }
          let id = window.QM_SRC.pref(sTab); if (!srcs.some((x) => x.id === id)) id = srcs[0].id;
          ssrc.replaceChildren(); for (const x of srcs) { const o = document.createElement("option"); o.value = x.id; o.textContent = x.name; ssrc.append(o); } ssrc.value = id; ssrc.hidden = srcs.length < 2;
          if (srcs.length === 1) showInfo(srcs[0].name);
          if (!raw) { sQ = null; paintTabs(); return; }
          const ar = isAr(raw); const toks = (ar ? arN(raw, true) : lowS(raw)).split(/\s+/).filter((t) => t.length > (ar ? 0 : 1) || /\d/.test(t)); sQ = { toks, ar };
          if (!toks.length) { paintTabs(); return; }
          ahits.replaceChildren(Object.assign(document.createElement("p"), { className: "ahit-more", textContent: "…" }));
          const rowsD = await window.QM_SRC.rows(id); if (gen !== searchGen) return;
          await loadQuran(); if (gen !== searchGen) return;
          for (const r of rowsD) { r._n ||= ar ? null : lowS(r.t); if (ar) { r._a ||= arN(r.t, true); r._h ||= r._a.replace(/ء/g, ""); } if (toks.every((t) => (ar ? r._a.includes(t) || (!t.includes("ء") && r._h.includes(t)) : r._n.includes(t)))) sHits.push(r); }
          ahits.replaceChildren();
        }
        paintTabs(); renderHits(); emptyEl.hidden = sHits.length !== 0;
      }
      ssrc.onchange = () => { window.QM_SRC.setPref(sTab, ssrc.value); runSearch(); };
      function applyFilter() { clearTimeout(sTimer); const raw = qInput.value.trim(); if (sTab === "ar" && !isAr(raw)) { runSearch(); return; } sTimer = setTimeout(runSearch, 180); }
      // result bar on the mushaf page
      const snav = document.createElement("div"); snav.className = "s-nav"; snav.hidden = true; document.body.append(snav);
      let sIdx = -1;
      function goHit(i) {
        if (i < 0 || i >= sHits.length) return; sIdx = i; const h = sHits[i];
        const keys = []; for (let a = h.a; a <= (h.to || h.a); a++) keys.push(h.s + ":" + a);
        hlKey = keys.length > 1 ? keys : keys[0]; gate.hidden = true; const n = pageOf(keys[0]); show(n);
        paintNav();
      }
      function paintNav() {
        snav.replaceChildren(); snav.hidden = false; snav.dir = document.documentElement.dir || "ltr";
        const rtl = (localStorage.getItem("qm.lang") || "az") === "ar"; snav.dir = rtl ? "rtl" : "ltr";
        const mk = (t, f, lab, dis) => { const b = document.createElement("button"); b.type = "button"; b.className = "s-nb"; b.textContent = t; b.setAttribute("aria-label", lab); b.disabled = !!dis; b.onclick = f; return b; };
        const h = sHits[sIdx];
        const mid = document.createElement("span"); mid.className = "s-nt"; mid.textContent = (sIdx + 1) + " / " + sHits.length + " · " + NAMES[h.s - 1] + " " + h.a;
        snav.append(mk(rtl ? "›" : "‹", () => goHit(sIdx - 1), T_("Əvvəlki"), sIdx === 0), mid, mk(rtl ? "‹" : "›", () => goHit(sIdx + 1), T_("Növbəti"), sIdx >= sHits.length - 1), mk("✕", closeNav, T_("Bağla")));
      }
      function closeNav() { snav.hidden = true; sIdx = -1; hlKey = null; paintHl(null); }
      window.QM_SNAV = { close: closeNav };
      document.getElementById("back").addEventListener("click", () => { snav.hidden = true; });
      paintTabs();
      searchBtn.addEventListener("click", () => {
        const open = searchWrap.hidden;
        searchWrap.hidden = !open;
        searchBtn.classList.toggle("on", open);
        if (open) qInput.focus();
        else { qInput.value = ""; sTab = "ar"; applyFilter(); }
      });
      qInput.addEventListener("input", applyFilter);
      window.addEventListener("qm-ui", () => {
        const t = (k) => (window.QM && window.QM.t ? window.QM.t(k) : k);
        qInput.placeholder = t("Surə və ya ərəbcə söz…");
        searchBtn.setAttribute("aria-label", t("Axtarış"));
        document.getElementById("hifz-btn").setAttribute("aria-label", t("Hifz"));
        document.getElementById("notes-btn").setAttribute("aria-label", t("Qeydlər və əlfəcinlər"));
        emptyEl.textContent = t("Tapılmadı");
        paintTabs(); if (!snav.hidden && sIdx >= 0) paintNav(); paintJuz(); htabs.children[0].textContent = t("Surələr"); htabs.children[1].textContent = t("Cüzlər");
        for (const btn of rows.children) {
          if (btn.dataset.kind === "j") btn.querySelector("span").textContent = t("Cüz") + " " + btn.dataset.n;
          else {
            const where = btn.dataset.where === "mad" ? t("Mədinə") : t("Məkkə");
            btn.querySelector("small").textContent = where + " — " + btn.dataset.ayahs + " " + t("ayə");
          }
        }
      });
      let ayahMap = null, hlKey = null;
      function paintHl(k) {
        hlKey = k;
        const keys = !k ? [] : Array.isArray(k) ? k : [k];
        board.querySelectorAll(".ay.hl").forEach((x) => x.classList.remove("hl"));
        for (const key of keys) board.querySelectorAll('.ay[data-k="' + key + '"]').forEach((x) => x.classList.add("hl"));
      }
      // page of an ayah (from yazi-ayahs.json); turns the mushaf page when the ayah is elsewhere
      function pageOf(key) {
        if (!ayahMap) return pageNo;
        const cur = ayahMap[String(pageNo)] || [];
        if (cur.some((r) => r[0] === key)) return pageNo;
        for (let n = 1; n <= LAST; n++) if ((ayahMap[String(n)] || []).some((r) => r[0] === key)) return n;
        return pageNo;
      }
      window.QM_GOTO = (key, keys) => { const n = pageOf(key); hlKey = keys || key; if (n !== pageNo) show(n); else paintHl(hlKey); };
      window.QM_HL = paintHl;
      window.QM_RECENT = () => { const pop = document.getElementById("recent-pop"); if (!pop.hidden) { pop.hidden = true; return; } let h = []; try { h = JSON.parse(localStorage.getItem("qm-recent") || "[]"); } catch (e) {} pop.replaceChildren(); if (!h.length) { const p = document.createElement("p"); p.textContent = "Hələ oxunan səhifə yoxdur"; pop.append(p); } for (const x of h) { const b = document.createElement("button"); b.type = "button"; b.append(x.t || "Səhifə"); const sp = document.createElement("span"); sp.textContent = "Səhifə " + x.p; b.append(sp); b.onclick = () => { pop.hidden = true; QM_OPENPAGE(x.p); }; pop.append(b); } pop.hidden = false; };
      window.QM_OPENPAGE = (n) => { hlKey = null; paintHl(null); gate.hidden = true; show(n); };
      window.QM_JUMP = (key) => { hlKey = key; gate.hidden = true; const n = pageOf(key); show(n); };
      // ---- 4A: sürətli keçid sheet (sürə / sürə:ayə / səhifə) + son axtarışlar ----
      (() => {
        const qj = document.getElementById("qj"), inp = document.getElementById("qj-in"), res = document.getElementById("qj-res"), rec = document.getElementById("qj-rec"), rh = document.getElementById("qj-rh");
        const RK = "qm-jump-recent";
        const getR = () => { try { return JSON.parse(localStorage.getItem(RK) || "[]"); } catch (e) { return []; } };
        const pushR = (t) => { const r = getR().filter((x) => x !== t); r.unshift(t); try { localStorage.setItem(RK, JSON.stringify(r.slice(0, 8))); } catch (e) {} };
        function find(q) {
          q = q.trim(); if (!q) return [];
          let m = q.match(/^(?:səh(?:ifə)?\.?|s|p)\s*(\d{1,3})$/i);
          if (m) { const n = +m[1]; return n >= 1 && n <= LAST ? [{ t: "Səhifə " + n, p: n, label: "Səh. " + n }] : []; }
          m = q.match(/^(\d{1,3})\s*[:.\s]\s*(\d{1,3})$/);
          if (m) { const s = +m[1], a = +m[2]; if (s < 1 || s > 114 || a < 1 || a > AYAHS[s - 1]) return []; const k = s + ":" + a; return [{ t: NAMES[s - 1] + " " + k, key: k, label: k }]; }
          m = q.match(/^(\d{1,3})$/);
          const out = [];
          if (m && +m[1] >= 1 && +m[1] <= 114) { const s = +m[1]; out.push({ t: s + ". " + NAMES[s - 1], p: surahPage(s), label: NAMES[s - 1] }); }
          const nq = fold(q); if (!nq || m) return out;
          for (let i = 0; i < 114 && out.length < 6; i++) { const a = fold(NAMES[i]), b = fold(ARNAMES[i]); if (a.includes(nq) || b.includes(nq) || (nq.startsWith("al") && nq.length > 4 && a.includes(nq.slice(2)))) out.push({ t: (i + 1) + ". " + NAMES[i] + " · " + ARNAMES[i], p: surahPage(i + 1), label: NAMES[i] }); }
          return out;
        }
        const pageFor = (it) => it.p || (ayahMap ? (() => { for (const [p, l] of Object.entries(ayahMap)) if (l.some((r) => r[0] === it.key)) return +p; return 0; })() : 0);
        function go(it) { pushR(it.label); qj.hidden = true; if (it.key) QM_JUMP(it.key); else QM_OPENPAGE(it.p); }
        function row(main, side, fn) { const b = document.createElement("button"); b.type = "button"; b.className = "qj-row"; const a = document.createElement("span"); a.textContent = main; const c = document.createElement("span"); c.className = side.cls; c.textContent = side.t; b.append(a, c); b.onclick = fn; return b; }
        function paint() {
          const its = find(inp.value); res.replaceChildren();
          if (inp.value.trim()) { const h = document.createElement("div"); h.className = "qj-h"; h.textContent = its.length ? "Nəticə" : "Nəticə yoxdur"; res.append(h); }
          for (const it of its) { const pg = pageFor(it); res.append(row(it.t, { cls: "qj-b", t: pg ? "Səh. " + pg : "→" }, () => go(it))); }
          const r = getR(); rec.replaceChildren(); rh.hidden = !r.length;
          for (const t of r) rec.append(row(t, { cls: "qj-d", t: "↗" }, () => { const f = find(t)[0]; if (f) go(f); else { inp.value = t; paint(); } }));
        }
        inp.addEventListener("input", paint);
        inp.addEventListener("keydown", (e) => { if (e.key === "Enter") { const f = find(inp.value)[0]; if (f) go(f); } else if (e.key === "Escape") qj.hidden = true; });
        qj.addEventListener("click", (e) => { if (e.target === qj) qj.hidden = true; });
        window.QM_JUMPSHEET = () => { inp.value = ""; paint(); qj.hidden = false; setTimeout(() => inp.focus(), 30); };
      })();
      window.QM_AYAHS = AYAHS;
      window.QM_NAMES = NAMES;
      fetch("./yazi-ayahs.json").then((r) => r.json()).then((j) => { ayahMap = j; if (pages && !gate.hidden === false) show(pageNo); });
      Promise.all([fetch("./yazi-pages.json").then((r) => r.json()), fetch("./yazi-words.json").then((r) => r.json()).catch(() => null)]).then(([json, wb]) => { words = wb; pages = json; loadNames().then(function(){ glyphInk.clear(); try { fit(); } catch (e) {} }); const qp = +(window.__PAGE||new URLSearchParams(location.search).get("page")); if (qp >= 1 && qp <= 604) openAt(qp); });
    