document.addEventListener('DOMContentLoaded', () => {
  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Fade-in observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in, .section-observe .fade-in')
    .forEach(el => observer.observe(el));

  // Sticky nav styling
  const nav = document.getElementById('mainNav');
  const onScroll = () => {
    if (window.scrollY > 10) nav.classList.add('is-sticky');
    else nav.classList.remove('is-sticky');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Simple hash router (one "page" visible)
  const SECTION_IDS = ['home','about','products','contact'];
  const getTarget = name => SECTION_IDS.includes(name) ? name : 'home';

  const showSection = (name) => {
    const target = getTarget(name);
    // default: show all (fallback), then hide the non-target ones
    SECTION_IDS.forEach(id => {
      const sec = document.getElementById(id);
      if (!sec) return;
      sec.classList.toggle('page-hidden', id !== target);
    });

    // highlight nav
    document.querySelectorAll('.main-nav .nav-link').forEach(a => {
      const h = (a.getAttribute('href') || '').replace('#','');
      a.classList.toggle('active', h === target);
    });

    // scroll top (portable)
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // On load + on hash change
  const initial = (location.hash || '#home').replace('#','');
  showSection(initial);
  window.addEventListener('hashchange', () => {
    const h = (location.hash || '#home').replace('#','');
    showSection(h);
  });

  // Logo = home
  const logo = document.querySelector('.logo');
  if (logo) logo.addEventListener('click', (e) => {
    e.preventDefault();
    if (location.hash !== '#home') location.hash = '#home';
    else showSection('home');
  });
});
