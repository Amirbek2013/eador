const header = document.querySelector('.header');
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(20px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 600, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
      );
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.feature-card, .stream-card, .social-card, .gallery-item, .world-card')
  .forEach(el => reveal.observe(el));


const toTopBtn = document.getElementById('toTopBtn');

if (toTopBtn) {
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
