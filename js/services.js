document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const items = document.querySelectorAll(".svc-item");
  tabs.forEach(tab => {
    const key = tab.dataset.filter;
    const count = [...items].filter(i =>
      key === "all" || i.dataset.cat.split(" ").includes(key)
    ).length;
    const em = tab.querySelector("em");
    if (em) em.textContent = count;
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      items.forEach(item => {
        const show = key === "all" || item.dataset.cat.split(" ").includes(key);
        item.classList.toggle("hide", !show);
        item.classList.remove("pop");
        if (show) {
          void item.offsetWidth;
          item.classList.add("pop");
        }
      });
    });
  });
});
