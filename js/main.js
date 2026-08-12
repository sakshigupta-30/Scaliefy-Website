/* =========================================================
   main.js
   Page-specific behaviour. Runs after header/footer are mounted.
   ========================================================= */

document.addEventListener("components:ready", function () {
  initScrollReveal();
  initPortfolioFilter();
  initTestimonialCarousel();
  initContactForm();
  initNewsletterForm();
});

/* ---------- Scroll reveal ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Portfolio filter (portfolio.html) ---------- */
function initPortfolioFilter() {
  const buttons = document.querySelectorAll("[data-filter]");
  const rows = document.querySelectorAll("[data-category]");
  if (!buttons.length || !rows.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      rows.forEach((row) => {
        const match = filter === "all" || row.dataset.category === filter;
        row.hidden = !match;
      });
    });
  });
}

/* ---------- Testimonial carousel (index.html) ---------- */
function initTestimonialCarousel() {
  const track = document.querySelector("[data-testimonial-track]");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll("[data-slide]"));
  const dots = Array.from(document.querySelectorAll("[data-dot]"));
  const prevBtn = document.querySelector("[data-testimonial-prev]");
  const nextBtn = document.querySelector("[data-testimonial-next]");
  let index = 0;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.toggleAttribute("hidden", n !== index));
    dots.forEach((dot, n) => dot.classList.toggle("is-active", n === index));
  }

  prevBtn && prevBtn.addEventListener("click", () => show(index - 1));
  nextBtn && nextBtn.addEventListener("click", () => show(index + 1));
  dots.forEach((dot, n) => dot.addEventListener("click", () => show(n)));

  show(0);
}

/* ---------- Contact form (contact.html) ---------- */
function initContactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const successMsg = document.querySelector("[data-form-success]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // No backend is wired up yet — swap this block for a real fetch()
    // call to your form endpoint (e.g. Formspree, a serverless function, etc).
    form.reset();
    if (successMsg) {
      successMsg.classList.add("is-visible");
      setTimeout(() => successMsg.classList.remove("is-visible"), 5000);
    }
  });
}

/* ---------- Newsletter form (footer) ---------- */
function initNewsletterForm() {
  const form = document.querySelector("[data-newsletter-form]");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type='email']");
    if (input && input.value) {
      input.value = "";
      input.placeholder = "Thanks — you're subscribed!";
      setTimeout(() => (input.placeholder = "Enter your email"), 3500);
    }
  });
}
