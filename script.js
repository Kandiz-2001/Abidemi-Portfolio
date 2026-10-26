
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Automatically update the footer year.
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Add a subtle shadow to the navigation after scrolling.
  const navbar = document.querySelector(".site-navbar");

  const updateNavbar = () => {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Close the mobile navigation when a section is selected.
  const navbarMenu = document.getElementById("navbarMenu");
  const navigationLinks = document.querySelectorAll(
    '.site-navbar a[href^="#"]'
  );

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (
        navbarMenu &&
        navbarMenu.classList.contains("show") &&
        window.bootstrap
      ) {
        const collapse = window.bootstrap.Collapse.getOrCreateInstance(
          navbarMenu
        );

        collapse.hide();
      }
    });
  });

  // Reveal content gently as it enters the viewport.
  const revealElements = document.querySelectorAll(
    ".section-padding, .project-card, .skill-card, .timeline-item, .contact-panel"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !reducedMotion) {
    document.documentElement.classList.add("js-enabled");

    revealElements.forEach((element) => {
      element.classList.add("reveal-on-scroll");
    });

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  // Highlight the navigation link for the visible section.
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const navLinks = document.querySelectorAll(
    '.site-navbar .nav-link[href^="#"]'
  );

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const currentId = entry.target.id;

          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${currentId}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});
