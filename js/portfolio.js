document.addEventListener("DOMContentLoaded", () => {
  const chips = document.querySelectorAll(".chip");
  const items = [...document.querySelectorAll(".m-item")];
  let visible = items.slice();

  chips.forEach(chip => {
    const key = chip.dataset.filter;
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      visible = items.filter(item =>
        key === "all" || item.dataset.cat === key
      );
      items.forEach((item, i) => {
        const show = visible.includes(item);
        item.classList.toggle("hide", !show);
        if (show) {
          item.style.animation = "none";
          void item.offsetWidth;
          item.style.animation = `pop .5s ${i * 0.04}s var(--ease) both`;
        }
      });
    });
  });

  const lb = document.getElementById("lightbox");
  if (!lb) return;
  const stage = lb.querySelector(".lb-stage");
  const cap = lb.querySelector(".lb-cap");
  let current = -1;

  function render(i) {
    current = (i + visible.length) % visible.length;
    const item = visible[current];
    stage.querySelectorAll("img,video").forEach(n => n.remove());
    const isVideo = item.dataset.video !== undefined;
    cap.innerHTML = `<b>${item.dataset.title}</b> · ${item.dataset.label}`;
    if (isVideo) {
      const v = document.createElement("video");
      v.src = item.dataset.video;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      stage.insertBefore(v, cap);
    } else {
      const im = document.createElement("img");
      im.src = item.querySelector("img").src;
      im.alt = item.dataset.title || "";
      stage.insertBefore(im, cap);
    }
  }
  function open(i) { render(i); lb.classList.add("open"); document.body.classList.add("no-scroll"); }
  function close() {
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
    stage.querySelectorAll("video").forEach(v => v.pause());
  }

  items.forEach(item => {
    item.addEventListener("click", () => {
      const list = visible.length ? visible : items;
      open(list.indexOf(item));
    });
  });

  lb.querySelector(".lb-x").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", e => { e.stopPropagation(); render(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", e => { e.stopPropagation(); render(current + 1); });
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  window.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") render(current - 1);
    if (e.key === "ArrowRight") render(current + 1);
  });

  window.closeLightbox = () => {};
});
