(function () {
  'use strict';

  // Scroll reveal (minimal, accessible, respects reduced motion via CSS)
  var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!nodes.length) return;

  var yearBadge = document.getElementById('yearBadge');

  function reveal(el) {
    if (!el.classList.contains('revealed')) el.classList.add('revealed');
  }

  // If IntersectionObserver isn't available, reveal all.
  if (!('IntersectionObserver' in window)) {
    nodes.forEach(reveal);
    if (yearBadge) yearBadge.classList.add('is-active');
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);

          // Subtle interactivity: glow the 2026 badge when it appears.
          if (yearBadge && entry.target.contains(yearBadge)) {
            yearBadge.classList.add('is-active');
          }

          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  nodes.forEach(function (n) { io.observe(n); });
})();
