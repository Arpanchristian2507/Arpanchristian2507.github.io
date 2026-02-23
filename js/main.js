/* =============================================
   PORTFOLIO – main.js
   ============================================= */

// ---- Navbar: scroll effect & active link ----
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");

function onScroll() {
  // Scrolled style
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active link based on current section
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", onScroll, { passive: true });

// ---- Mobile hamburger menu ----
const hamburger = document.getElementById("hamburger");
const navLinksContainer = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("open");
});

// Close menu when a link is clicked
navLinksContainer.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("open");
  });
});

// ---- Typed text animation ----
const roles = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Open Source Contributor",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentRole.length) {
    delay = 1800; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();

// ---- Scroll reveal animation ----
const revealElements = document.querySelectorAll(
  ".stat-card, .skill-category, .project-card, .about-text, .about-stats, .contact-info, .contact-form"
);

revealElements.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => observer.observe(el));

// ---- Animated stat counters ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) {
      clearInterval(interval);
      el.textContent = target;
    }
  }, 16);
}

const statNumbers = document.querySelectorAll(".stat-number");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => statObserver.observe(el));

// ---- Contact form (client-side demo) ----
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const subject = form.subject.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !subject || !message) {
    formStatus.textContent = "Please fill in all fields.";
    formStatus.className = "form-status error";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.className = "form-status error";
    return;
  }

  // Simulate sending (replace with real integration as needed)
  const submitBtn = form.querySelector("button[type='submit']");
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";

  setTimeout(() => {
    formStatus.textContent =
      "Thank you! Your message has been received. I'll get back to you soon.";
    formStatus.className = "form-status success";
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }, 1200);
});

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
