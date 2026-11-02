// Theme toggle: dark by default, remembers the visitor's choice
(function () {
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    root.setAttribute("data-theme", saved || "dark");
  } catch (e) {}

  document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.querySelector(".theme-toggle");
    const isDark = () =>
      root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    const setIcon = () => { if (themeBtn) themeBtn.textContent = isDark() ? "☀" : "☾"; };
    setIcon();
    themeBtn?.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      setIcon();
    });

    // Mobile menu
    const menuBtn = document.querySelector(".menu-toggle");
    const links = document.querySelector(".nav-links");
    menuBtn?.addEventListener("click", () => links.classList.toggle("open"));

    // Figure lightbox
    const box = document.querySelector(".lightbox");
    if (box) {
      const boxImg = box.querySelector("img");
      document.querySelectorAll(".pub-figs img").forEach((img) => {
        img.addEventListener("click", () => {
          boxImg.src = img.src;
          boxImg.alt = img.alt;
          box.classList.add("open");
        });
      });
      box.addEventListener("click", () => box.classList.remove("open"));
      document.addEventListener("keydown", (e) => { if (e.key === "Escape") box.classList.remove("open"); });
    }

    // Footer year
    document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
  });
})();
