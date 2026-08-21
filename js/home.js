document.querySelectorAll("[data-reel]").forEach(block => {
  const track = block.querySelector(".reel-track");
  const prev = block.querySelector(".rn-prev");
  const next = block.querySelector(".rn-next");
  if (!track) return;
  const step = dir => track.scrollBy({ left: dir * track.clientWidth * 0.85, behavior: "smooth" });
  prev && prev.addEventListener("click", () => step(-1));
  next && next.addEventListener("click", () => step(1));

  let down = false, startX = 0, startScroll = 0;
  track.addEventListener("pointerdown", e => { down = true; startX = e.clientX; startScroll = track.scrollLeft; });
  window.addEventListener("pointerup", () => down = false);
  track.addEventListener("pointermove", e => {
    if (!down) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });

  let auto = setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else step(1);
  }, 4500);
  block.addEventListener("mouseenter", () => clearInterval(auto));
});

(() => {
  const track = document.querySelector(".t-track");
  if (!track) return;
  const slides = track.children.length;
  const dotsWrap = document.querySelector(".t-dots");
  let idx = 0, timer;
  for (let i = 0; i < slides; i++) {
    const d = document.createElement("button");
    d.className = "dot" + (i === 0 ? " active" : "");
    d.setAttribute("aria-label", "Review " + (i + 1));
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);
  }
  const dots = dotsWrap.querySelectorAll(".dot");
  function go(i) {
    idx = (i + slides) % slides;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle("active", j === idx));
    restart();
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 5500);
  }
  restart();
})();
