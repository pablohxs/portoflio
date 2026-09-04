/* =========================================
   Navigation
   ========================================= */
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const allNavLinks = navLinks.querySelectorAll('.nav__link');

function updateNav() {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Mobile menu
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
});

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});


/* =========================================
   Scroll Animations (Intersection Observer)
   ========================================= */
function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('animated'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay || '0', 10);
          setTimeout(() => el.classList.add('animated'), delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  animatedElements.forEach(el => observer.observe(el));
}

initAnimations();


/* =========================================
   Smooth scroll for anchor links (fallback)
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
