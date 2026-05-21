// Navbar: add .scrolled class on scroll (only on pages with a hero)
const navbar = document.getElementById('navbar');
const hasHero = !!document.querySelector('.hero');
if (navbar && hasHero) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Contact form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name',    errorId: 'nameError',    check: v => v.trim().length >= 2 },
      { id: 'phone',   errorId: 'phoneError',   check: v => v.trim().length >= 7 },
      { id: 'project', errorId: 'projectError', check: v => v !== '' },
    ];

    // optional email: only validate if filled
    const email = document.getElementById('email');
    const emailGroup = email.closest('.form-group');
    if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      emailGroup.classList.add('error');
      valid = false;
    } else {
      emailGroup.classList.remove('error');
    }

    fields.forEach(({ id, errorId, check }) => {
      const input = document.getElementById(id);
      const group = input.closest('.form-group');
      if (!check(input.value)) {
        group.classList.add('error');
        valid = false;
      } else {
        group.classList.remove('error');
      }
    });

    if (valid) {
      form.reset();
      const success = document.getElementById('formSuccess');
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 5000);
    }
  });

  // Remove error state on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => el.closest('.form-group').classList.remove('error'));
  });
}
