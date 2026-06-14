document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initContactForm();
  initProjectButtons();
  initFooterYear();
});

// MOBILE NAV TOGGLE
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  });

  /* Close menu after clicking a link (mobile) */
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = "&#9776;";
    });
  });
}

// SCROLL SPY (highlight active nav link)
function initScrollSpy() {
  const sections = document.querySelectorAll("main .section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if (!sections.length || !navLinks.length) return;

  const linkMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    linkMap.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkMap.get(entry.target.id);
        if (!link) return;

        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}
//  SCROLL REVEAL ANIMATIONS
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".trait-card, .project-card, .skill-chip, .contact-info, .contact-form, .hero-text, .hero-image-wrap",
  );

  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  targets.forEach((el) => observer.observe(el));
}

// CONTACT FORM (Formspree)
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#email");
  const messageField = form.querySelector("#message");
  const submitBtn = form.querySelector('button[type="submit"]');

  const fields = [nameField, emailField, messageField].filter(Boolean);

  /* Live validation */
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => clearFieldError(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      showFormMessage(form, "Please fix the highlighted fields.", "error");
      return;
    }

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          showFormMessage(
            form,
            `Thanks, ${nameField.value.trim()}! Your message has been sent.`,
            "success",
          );
          form.reset();
        } else {
          showFormMessage(
            form,
            "Something went wrong. Please try again or email me directly.",
            "error",
          );
        }
      })
      .catch(() => {
        showFormMessage(
          form,
          "Network error. Please try again or email me directly.",
          "error",
        );
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
  });
}

function validateField(field) {
  const value = field.value.trim();
  let message = "";

  if (!value) {
    message = "This field is required.";
  } else if (field.type === "email" && !isValidEmail(value)) {
    message = "Please enter a valid email address.";
  } else if (field.id === "message" && value.length < 10) {
    message = "Message should be at least 10 characters.";
  }

  if (message) {
    showFieldError(field, message);
    return false;
  }

  clearFieldError(field);
  return true;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showFieldError(field, message) {
  field.classList.add("is-invalid");

  let errorEl = field.parentElement.querySelector(".form-error");
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.className = "form-error";
    field.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearFieldError(field) {
  field.classList.remove("is-invalid");
  const errorEl = field.parentElement.querySelector(".form-error");
  if (errorEl) errorEl.remove();
}

function showFormMessage(form, message, type) {
  let messageEl = form.querySelector(".form-status");
  if (!messageEl) {
    messageEl = document.createElement("p");
    messageEl.className = "form-status";
    form.appendChild(messageEl);
  }
  messageEl.textContent = message;
  messageEl.classList.remove("form-status--success", "form-status--error");
  messageEl.classList.add(
    type === "success" ? "form-status--success" : "form-status--error",
  );

  if (type === "success") {
    setTimeout(() => messageEl.remove(), 4000);
  }
}

// PROJECT "VIEW PROJECT" BUTTONS
function initProjectButtons() {
  const buttons = document.querySelectorAll(".project-card .btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-card");
      const title = card?.querySelector(".project-title")?.textContent.trim();
      /* Placeholder behaviour — replace with real links/modals when ready */
      alert(`"${title}" project page coming soon.`);
    });
  });
}

// FOOTER YEAR (auto-update copyright)
function initFooterYear() {
  const copyEl = document.querySelector(".footer-copy");
  if (!copyEl) return;

  const year = new Date().getFullYear();
  copyEl.textContent = copyEl.textContent.replace(/\d{4}/, year);
}
