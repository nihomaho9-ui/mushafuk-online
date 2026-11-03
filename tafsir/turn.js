(function () {
  var s = document.currentScript;
  var next = s.getAttribute("data-next") || "";
  var prev = s.getAttribute("data-prev") || "";
  var el = document.getElementById("tf") || document.body;
  function go(dir) {
    var u = dir > 0 ? next : prev;
    if (!u) return;
    try { sessionStorage.setItem("qm.tfdir", String(dir)); } catch (e) {}
    el.style.transformOrigin = dir > 0 ? "right center" : "left center";
    el.style.transition = "transform .38s cubic-bezier(.22,.75,.2,1)";
    el.style.transform = "perspective(1600px) rotateY(" + (dir > 0 ? 72 : -72) + "deg)";
    setTimeout(function () { location.assign(u); }, 360);
  }
  try {
    var d = +sessionStorage.getItem("qm.tfdir") || 0;
    if (d) {
      sessionStorage.removeItem("qm.tfdir");
      el.style.transition = "none";
      el.style.transformOrigin = d > 0 ? "left center" : "right center";
      el.style.transform = "perspective(1600px) rotateY(" + (d > 0 ? -70 : 70) + "deg)";
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          document.documentElement.classList.remove("qm-turning");
          el.style.transition = "transform .42s cubic-bezier(.16,1,.3,1)";
          el.style.transform = "";
        });
      });
    }
  } catch (e) {}
  var x = null, y = null, blocked = false;
  document.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "touch") return;
    blocked = !!(e.target.closest && e.target.closest("a,button,input,textarea"));
    if (blocked) { x = null; return; }
    x = e.clientX; y = e.clientY;
  }, true);
  document.addEventListener("pointerup", function (e) {
    if (e.pointerType === "touch" || x == null) return;
    var dx = e.clientX - x, dy = e.clientY - y;
    x = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx > 0 ? 1 : -1);
  }, true);
  document.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) return;
    if (e.target.closest && e.target.closest("a,button,input,textarea")) { x = null; return; }
    x = e.touches[0].clientX; y = e.touches[0].clientY;
  }, { capture: true, passive: true });
  document.addEventListener("touchend", function (e) {
    if (x == null || !e.changedTouches.length) return;
    var dx = e.changedTouches[0].clientX - x, dy = e.changedTouches[0].clientY - y;
    x = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    go(dx > 0 ? 1 : -1);
  }, { capture: true, passive: true });
})();
