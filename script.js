(() => {
  'use strict';

  const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
  const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
  const sectionIds = navLinks
    .map((link) => link.getAttribute('href'))
    .filter((href) => href && href.startsWith('#'))
    .map((href) => href.slice(1));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((node) => revealObserver.observe(node));
  } else {
    revealTargets.forEach((node) => node.classList.add('is-visible'));
  }

  if ('IntersectionObserver' in window && sectionIds.length) {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 }
    );

    sections.forEach((section) => activeObserver.observe(section));
  }
})();
