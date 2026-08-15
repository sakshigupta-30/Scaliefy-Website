/* =========================================================
   components.js
   Injects the shared header and footer markup into every page.
   This is the ONLY place header/footer HTML lives — edit here
   and the change applies site-wide.
   ========================================================= */

(function () {
  const NAV_LINKS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "service.html", label: "Services", key: "service" },
    { href: "portfolio.html", label: "Portfolio", key: "portfolio" },
    { href: "about.html", label: "About", key: "about" },
    { href: "contact.html", label: "Contact", key: "contact" },
  ];

  function buildHeader(activePage) {
    const links = NAV_LINKS.map(
      (link) =>
        `<a href="${link.href}"${link.key === activePage ? ' class="active"' : ""}>${link.label}</a>`
    ).join("");

    return `
      <div class="container">
        <a href="index.html" class="logo">NEX<span>O</span>RA</a>

        <nav class="main-nav" id="main-nav">
          ${links}
        </nav>

        <div class="header-actions">
          <a href="contact.html" class="btn btn-dark">
            <span class="btn-text">Start a Project</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
          </a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="main-nav">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
  }

  function buildFooter() {
    return `
      <div class="footer-main container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="logo">NEX<span>O</span>RA</a>
            <p class="footer-tag">Digital Studio</p>
            <p>We design and develop digital experiences that are beautiful, functional and built to drive growth.</p>
            <div class="footer-social">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>             
              <a href="#" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg></a>
            </div>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <div class="rule"></div>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="service.html">Services</a></li>
              <li><a href="portfolio.html">Portfolio</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Services</h4>
            <div class="rule"></div>
            <ul>
              <li><a href="service.html">Shopify Development</a></li>
              <li><a href="service.html">Web Development</a></li>
              <li><a href="service.html">UI/UX Design</a></li>
              <li><a href="service.html">Graphic Design</a></li>
              <li><a href="service.html">Branding</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Company</h4>
            <div class="rule"></div>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="about.html">Our Process</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-col footer-newsletter">
            <h4>Let's stay in touch</h4>
            <div class="rule"></div>
            <p>Subscribe to get digital insights and ideas straight to your inbox.</p>
            <form class="newsletter-form" data-newsletter-form>
              <input type="email" placeholder="Enter your email" required aria-label="Email address" />
              <button type="submit" aria-label="Subscribe">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H8M17 7V16"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="footer-bottom container">
        <p>&copy; ${new Date().getFullYear()} Nexora Digital Studio. All rights reserved.</p>
        <p>Built with passion <span class="heart">&#9829;</span> for brands that dare to grow.</p>
      </div>
    `;
  }

  function initMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function mount() {
    const headerTarget = document.getElementById("site-header");
    const footerTarget = document.getElementById("site-footer");
    const activePage = document.body.dataset.page || "";

    if (headerTarget) {
      headerTarget.innerHTML = buildHeader(activePage);
    }
    if (footerTarget) {
      footerTarget.innerHTML = buildFooter();
    }

    initMobileNav();

    document.dispatchEvent(new CustomEvent("components:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
