// AgriOptix site script
// Handles fade-in animations, footer year, and active nav highlighting for multi-page setup

(function () {
  // --- Fade-in animation when elements enter the viewport ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section-observe .fade-in').forEach(el => revealObserver.observe(el));

  // --- Highlight active nav link based on current page ---
  const path = window.location.pathname.split("/").pop() || "index.html";
  const currentPage = path.replace(".html", "") || "index";

  document.querySelectorAll(".main-nav a.nav-link").forEach(a => {
    const key = a.getAttribute("data-page");
    if ((currentPage === "" && key === "index") || key === currentPage) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });

  // --- Current year in footer ---
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();
