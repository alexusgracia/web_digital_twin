const navToggleButton = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
  const isOpen = siteNav.classList.toggle('open');
  navToggleButton.setAttribute('aria-expanded', String(isOpen));
}

if (navToggleButton) {
  navToggleButton.addEventListener('click', toggleMenu);
}

// Close menu on navigation
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggleButton.setAttribute('aria-expanded', 'false');
  });
});

// Update year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Active link on scroll
const sections = Array.from(document.querySelectorAll('main section[id]'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.site-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
    }
  });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0.01 });

sections.forEach(sec => observer.observe(sec));


