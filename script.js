gsap.registerPlugin(ScrollTrigger);

// ===========================
// Navigation
// ===========================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navAnchors = navLinks.querySelectorAll('a');
// HINT: The key is encoded in base64 somewhere on this page...
console.log("%c🔐 Developer Challenge Activated", "color: #3b82f6; font-size: 16px;");
console.log("Hint: The key is encoded in base64 somewhere on this page...");


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
  'Cybersecurity Enthusiast',
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
// Functional Observer (counters + skill bars)
// ===========================

const functionalObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'about') {
          document.querySelectorAll('.stat-number').forEach(animateCounter);
        }
        if (entry.target.id === 'skills') {
          document.querySelectorAll('.skill-fill').forEach((bar) => {
            bar.style.width = bar.getAttribute('data-width') + '%';
          });
        }
        functionalObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('#about, #skills').forEach((el) => functionalObserver.observe(el));

// ===========================
// Three.js Hero Background
// ===========================

(function initThree() {
  const canvas = document.getElementById('hero-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera.position.z = 30;

  // Particle field
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0x6c63ff, size: 0.35, transparent: true, opacity: 0.75 });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Subtle wireframe torus
  const torusGeo = new THREE.TorusGeometry(10, 3, 16, 60);
  const torusMat = new THREE.MeshBasicMaterial({ color: 0x6c63ff, wireframe: true, transparent: true, opacity: 0.08 });
  const torus = new THREE.Mesh(torusGeo, torusMat);
  torus.position.set(18, -5, -10);
  scene.add(torus);

  // Mouse parallax
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 4;
  });
  window.addEventListener("load", function () {
    initThree();
});

  function tick() {
    requestAnimationFrame(tick);
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;
    torus.rotation.x += 0.003;
    torus.rotation.y += 0.002;
    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (mouseY - camera.position.y) * 0.03;
    renderer.render(scene, camera);
  }
  tick();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}());

//DEVLOPER ACCESS ONLY:
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
    document.getElementById("dev-unlock").classList.add("active");
  }
});
document.getElementById("unlock-btn").addEventListener("click", function () {
  const input = document.getElementById("dev-key-input").value.trim();

 const correctKey = atob("ZGV2LWNvZmZlZS1rZXk=");
if (input === correctKey) {
    sessionStorage.setItem("devAccess", "true");
    window.location.href = "c0ff33.html";
  } else {
    document.getElementById("unlock-error").style.display = "block";
  }
});

// ===========================
// GSAP Animations
// ===========================

// Hero entrance timeline
gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.75 } })
  .from('.hero-greeting',    { opacity: 0, y: 30 },        0.2)
  .from('.hero-name',        { opacity: 0, y: 35 },        0.45)
  .from('.hero-title',       { opacity: 0, y: 25 },        0.65)
  .from('.hero-description', { opacity: 0, y: 25 },        0.82)
  .from('.hero-buttons',     { opacity: 0, y: 20 },        1.0)
  .from('.social-links',     { opacity: 0, y: 20 },        1.15)
  .from('.hero-visual',      { opacity: 0, scale: 0.8, duration: 0.9 }, 0.5);

// Section titles
gsap.utils.toArray('.section-title').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%' },
    opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
  });
});

// About text
gsap.from('.about-text', {
  scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
  opacity: 0, x: -50, duration: 0.8, ease: 'power3.out',
});

// Stat cards stagger
gsap.from('.stat-card', {
  scrollTrigger: { trigger: '.about-stats', start: 'top 80%' },
  opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power3.out',
});

// Skill categories
gsap.from('.skill-category', {
  scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
  opacity: 0, x: -40, duration: 0.7, stagger: 0.2, ease: 'power3.out',
});

// Tech icons stagger with bounce
gsap.from('.tech-icon', {
  scrollTrigger: { trigger: '.tech-icons', start: 'top 85%' },
  opacity: 0, scale: 0.4, duration: 0.5, stagger: 0.07, ease: 'back.out(1.7)',
});

// Project cards stagger
gsap.from('.project-card', {
  scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
  opacity: 0, y: 60, duration: 0.7, stagger: 0.15, ease: 'power3.out',
});

// Contact section
gsap.from('.contact-info', {
  scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
  opacity: 0, x: -50, duration: 0.8, ease: 'power3.out',
});
gsap.from('.contact-form', {
  scrollTrigger: { trigger: '.contact-grid', start: 'top 80%' },
  opacity: 0, x: 50, duration: 0.8, ease: 'power3.out',
});

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

const message = `🔐 Hidden Challenge – For the Curious Minds

Some developers build projects.
Others build systems.
The curious ones look deeper.

Welcome to a small embedded challenge inside my portfolio.

If you’re reading this, you’ve already noticed that something feels… intentional.

This is a lightweight Capture The Flag (CTF) style puzzle designed for:

\u2022 Developers

\u2022 Security enthusiasts

\u2022 Recruiters who like digging into systems

\u2022 And anyone who enjoys solving problems

Your mission is simple:

\u2022 Inspect carefully.

\u2022 Decode thoughtfully.

\u2022 Follow the breadcrumbs.

Somewhere within this site is a hidden path.
If you reach the final stage, you’ll unlock:

🏆 A digital badge (Under Construction)
or
🚀 A hidden “Support the Development” page

No brute force.
No guessing.
Just logic.`;
console.log(message);
