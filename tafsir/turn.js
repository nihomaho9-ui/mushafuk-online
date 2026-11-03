(function () {
  var s = document.currentScript;
  var next = s.getAttribute("data-next") || "";
  var prev = s.getAttribute("data-prev") || "";
  var el = document.getElementById("tf") || document.body;
  var x = null, y = null, lock = null, lastDx = 0;

  function go(dir) {
    var u = dir > 0 ? next : prev;
    if (!u) { snap(); return; }
    try { sessionStorage.setItem("qm.tfdir", String(dir)); } catch (e) {}
    el.style.transition = "transform .32s cubic-bezier(.22,.75,.2,1)";
    el.style.transform = "translate3d(" + (dir * window.innerWidth) + "px,0,0)";
    setTimeout(function () { location.assign(u); }, 300);
  }
  function snap() {
    el.style.transition = "transform .2s ease";
    el.style.transform = "";
  }
  function down(cx, cy, target) {
    if (target && target.closest && target.closest("a,button,input,textarea")) { x = null; return; }
    x = cx; y = cy; lock = null; lastDx = 0;
    el.style.transition = "none";
  }
  function move(cx, cy, ev) {
    if (x == null) return;
    var dx = cx - x, dy = cy - y;
    lastDx = dx;
    if (!lock) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      lock = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (lock !== "x") return;
    if (ev && ev.cancelable) ev.preventDefault();
    var ok = dx > 0 ? next : prev;
    el.style.transform = "translate3d(" + (ok ? dx : dx * 0.2) + "px,0,0)";
  }
  function up() {
    if (x == null) return;
    var dx = lastDx, was = lock;
    x = null; lock = null;
    if (was === "x" && Math.abs(dx) > 32) go(dx > 0 ? 1 : -1);
    else if (was === "x") snap();
  }

  try {
    var d = +sessionStorage.getItem("qm.tfdir") || 0;
    if (d) {
      sessionStorage.removeItem("qm.tfdir");
      el.style.transition = "none";
      el.style.transform = "translate3d(" + (-d * Math.min(window.innerWidth, 480)) + "px,0,0)";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.documentElement.classList.remove("qm-turning");
          el.style.transition = "transform .32s cubic-bezier(.16,1,.3,1)";
          el.style.transform = "";
        });
      });
    }
  } catch (e) {}

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    down(e.touches[0].clientX, e.touches[0].clientY, e.target);
  }, { capture: true, passive: true });
  document.addEventListener("touchmove", function (e) {
    if (!e.touches.length) return;
    move(e.touches[0].clientX, e.touches[0].clientY, e);
  }, { capture: true, passive: false });
  document.addEventListener("touchend", function () { up(); }, true);
  document.addEventListener("touchcancel", function () { if (lock === "x") snap(); x = null; lock = null; }, true);

  document.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;
    down(e.clientX, e.clientY, e.target);
  }, true);
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch" || x == null) return;
    move(e.clientX, e.clientY, e);
  }, true);
  document.addEventListener("pointerup", function (e) {
    if (e.pointerType === "touch") return;
    up();
  }, true);
})();
