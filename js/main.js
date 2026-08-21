const HDS_CONFIG = {
  phoneDisplay: "+91 98851 79772",
  phoneRaw: "919885179772",
  whatsapp: "919885179772",
  email: "bookings@hariharanstudio.in"
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const onScroll = () => header && header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  const overlay = document.getElementById("drawerOverlay");

  const closeNav = () => {
    if (!nav) return;
    nav.classList.remove("open");
    overlay && overlay.classList.remove("show");
    toggle && toggle.classList.remove("open");
    toggle && toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  };
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const opening = !nav.classList.contains("open");
      nav.classList.toggle("open", opening);
      overlay && overlay.classList.toggle("show", opening);
      toggle.classList.toggle("open", opening);
      toggle.setAttribute("aria-expanded", String(opening));
      document.body.classList.toggle("no-scroll", opening);
    });
    overlay && overlay.addEventListener("click", closeNav);
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", closeNav));
    window.addEventListener("keydown", e => { if (e.key === "Escape") closeNav(); });
  }

  document.querySelectorAll(".js-tel").forEach(el => el.href = "tel:+" + HDS_CONFIG.phoneRaw);
  document.querySelectorAll(".js-wa").forEach(el => el.href = `https://wa.me/${HDS_CONFIG.whatsapp}?text=${encodeURIComponent("Hello Hariharan Digital Studio & Events! I would like to inquire about your services.")}`);
  document.querySelectorAll(".js-mail").forEach(el => el.href = "mailto:" + HDS_CONFIG.email);
  document.querySelectorAll("[data-phone]").forEach(el => el.textContent = HDS_CONFIG.phoneDisplay);

  document.querySelectorAll("img").forEach(img => {
    const fail = () => {
      const f = img.closest("figure, .ph, div");
      img.style.display = "none";
      f && f.classList.add("no-img");
    };
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener("error", fail);
  });

  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("in"); revealIO.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => revealIO.observe(el));

  const countIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      countIO.unobserve(en.target);
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const dur = 1700;
      const start = performance.now();
      const fmt = n => n >= 1000 ? Math.round(n).toLocaleString("en-IN") : Math.round(n);
      const step = now => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach(el => countIO.observe(el));

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
