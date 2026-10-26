
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element) => {
    observer.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// Automatically update the footer year.
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Close the mobile menu after clicking a navigation link.
const navbarMenu = document.getElementById("navbarMenu");

document.querySelectorAll("#navbarMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    if (
      navbarMenu &&
      navbarMenu.classList.contains("show") &&
      window.bootstrap
    ) {
      bootstrap.Collapse
        .getOrCreateInstance(navbarMenu)
        .hide();
    }
  });
});
