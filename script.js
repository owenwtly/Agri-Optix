// Smoothly highlight active menu item (scrollspy) + fade-ins
(function () {
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  // IntersectionObserver for fade-in elements
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section-observe .fade-in').forEach(el => revealObserver.observe(el));

  // Scrollspy
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.main-nav a[href="#${id}"]`);
      if (entry.isIntersecting && link) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(sec => sec && spyObserver.observe(sec));

  // Current year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
