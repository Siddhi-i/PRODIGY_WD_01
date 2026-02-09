// Pink Alert — Women Safety Web App
// Interactivity: scroll effects, hamburger menu, SOS demo, reveal animations

const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const sosModal = document.getElementById("sos-modal");
const sosBtn = document.querySelector(".sos-btn");

// ——— Navbar scroll effect ———
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ——— Hamburger menu (toggle + X animation) ———
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

// ——— SOS Button demo (shows modal) ———
if (sosBtn) {
  sosBtn.addEventListener("click", () => {
    if (sosModal) {
      sosModal.classList.add("active");
      sosModal.setAttribute("aria-hidden", "false");
    }
  });
}

// ——— Modal close ———
const modalBackdrop = document.querySelector(".modal-backdrop");
const modalClose = document.querySelector(".modal-close");

function closeSosModal() {
  if (sosModal) {
    sosModal.classList.remove("active");
    sosModal.setAttribute("aria-hidden", "true");
  }
}

if (modalBackdrop) modalBackdrop.addEventListener("click", closeSosModal);
if (modalClose) modalClose.addEventListener("click", closeSosModal);

// ——— Reveal on scroll ———
document.addEventListener("DOMContentLoaded", () => {
  const revealSelectors = [
    ".feature-card",
    ".card",
    ".section-header",
    ".resource",
    ".contact-item",
  ];
  revealSelectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.classList.add("reveal"));
  });

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("reveal-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  // ——— Active nav link on scroll ———
  const sections = ["home", "features", "tips", "resources", "contact"].map((id) => ({
    id,
    el: document.getElementById(id),
  }));

  const linkMap = {};
  navLinks.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const hash = href.split("#")[1];
    if (hash) linkMap[hash] = a;
  });

  const setActive = () => {
    let current = "home";
    const scrollPos = window.scrollY + 120;
    sections.forEach((s) => {
      if (s.el && s.el.offsetTop <= scrollPos) current = s.id;
    });
    navLinks.querySelectorAll("a").forEach((a) => a.classList.remove("active"));
    if (linkMap[current]) linkMap[current].classList.add("active");
  };

  setActive();
  window.addEventListener("scroll", setActive);
});
