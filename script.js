// Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', () => mobileMenu.classList.remove('open')));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Contact form
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      formStatus.textContent = 'Sent · We read everything personally and reply within 48 hours.';
      form.reset();
    } else { throw new Error(); }
  } catch {
    formStatus.textContent = 'Something went wrong — please email us directly.';
  }
  btn.textContent = 'Send →';
  btn.disabled = false;
});

// Scroll fade-in
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
}, { threshold: 0.08 });

document.querySelectorAll('.case-card, .quote-fig, .service-row, .process-step, .hero-stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.in-view { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);
