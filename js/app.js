document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  qsa("[data-theme-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  });

  const menuButton = qs("[data-menu-toggle]");
  const navLinks = qs(".nav-links");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => navLinks.classList.toggle("open"));
  }

  qsa(".accordion button").forEach(button => {
    button.addEventListener("click", () => {
      button.closest(".accordion-item").classList.toggle("open");
    });
  });

  qsa("[data-counter]").forEach(counter => {
    const target = Number(counter.dataset.counter);
    let current = 0;
    const step = Math.max(Math.ceil(target / 40), 1);
    const tick = () => {
      current = Math.min(current + step, target);
      counter.textContent = counter.dataset.prefix ? `${counter.dataset.prefix}${current}` : current;
      if (counter.dataset.suffix) counter.textContent += counter.dataset.suffix;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
});
