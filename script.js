// ===========================
// Navigation
// ===========================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navAnchors = navLinks.querySelectorAll('a');

// Scroll: add 'scrolled' class to navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightActiveLink();
});

// Hamburger toggle (mobile)
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navAnchors.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link based on scroll position
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

// ===========================
// Typing Effect (Hero)
// ===========================

const typedEl = document.getElementById('typed-text');
const roles = [
  'Web Developer',
  'Frontend Engineer',
  'UI/UX Enthusiast',
  'Creative Coder',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 60;
const pauseBetween = 1800;

function typeRole() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; typeRole(); }, pauseBetween);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
}

typeRole();

// ===========================
// Animated Counters (About)
// ===========================

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current === target) clearInterval(timer);
  }, 16);
}

// ===========================
// Scroll Reveal
// ===========================

const revealElements = document.querySelectorAll(
  '#about, #skills, #projects, #contact, ' +
  '.stat-card, .project-card, .skill-category, .tech-icon'
);

revealElements.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Trigger counter animation when about section is visible
        if (entry.target.id === 'about') {
          document.querySelectorAll('.stat-number').forEach(animateCounter);
        }

        // Trigger skill bars when skills section is visible
        if (entry.target.id === 'skills') {
          document.querySelectorAll('.skill-fill').forEach((bar) => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => observer.observe(el));

// ===========================
// Contact Form Validation
// ===========================

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

function validateField(id, errorId, validator, message) {
  const field = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (!validator(field.value.trim())) {
    field.classList.add('invalid');
    error.textContent = message;
    return false;
  }
  field.classList.remove('invalid');
  error.textContent = '';
  return true;
}

function isNotEmpty(val) {
  return val.length > 0;
}

function isValidEmail(val) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nameOk = validateField('name', 'name-error', isNotEmpty, 'Name is required.');
  const emailOk = validateField('email', 'email-error', isValidEmail, 'Enter a valid email.');
  const subjectOk = validateField('subject', 'subject-error', isNotEmpty, 'Subject is required.');
  const messageOk = validateField('message', 'message-error', isNotEmpty, 'Message is required.');

  if (nameOk && emailOk && subjectOk && messageOk) {
    formSuccess.hidden = false;
    contactForm.reset();
    setTimeout(() => { formSuccess.hidden = true; }, 5000);
  }
});

// Clear error on input
['name', 'email', 'subject', 'message'].forEach((id) => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('invalid');
    document.getElementById(`${id}-error`).textContent = '';
  });
});

// ===========================
// Footer Year
// ===========================

document.getElementById('year').textContent = new Date().getFullYear();
