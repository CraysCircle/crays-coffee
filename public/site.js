const craysLocations = [
  ["Old Town", "Palma", "Palma", "assets/optimized/location-place-01.jpg", "Sign Up", "contact.html"],
  ["Beachfront", "Playa de Palma", "Playa de Palma", "assets/optimized/location-place-02.jpg", "Order", "preorder.html"],
  ["Calvia", "Magaluf", "Magaluf", "assets/optimized/location-place-03.jpg", "Order", "preorder.html"],
  ["Southwest", "Santa Ponsa", "Santa Ponsa", "assets/optimized/location-place-04.jpg", "Order", "preorder.html"],
  ["Marina", "Puerto Portals", "Puerto Portals", "assets/optimized/location-place-05.jpg", "Order", "preorder.html"],
  ["West Coast", "Paguera", "Paguera", "assets/optimized/location-place-06.jpg", "Order", "preorder.html"],
  ["Tramuntana", "Soller", "Soller", "assets/optimized/location-place-07.jpg", "Order", "preorder.html"],
  ["North", "Pollensa", "Pollensa", "assets/optimized/location-place-08.jpg", "Order", "preorder.html"],
  ["Bay", "Port de Pollensa", "Port de Pollensa", "assets/optimized/location-place-09.jpg", "Order", "preorder.html"],
  ["North East", "Alcudia", "Alcudia", "assets/optimized/location-place-10.jpg", "Order", "preorder.html"],
  ["Harbour", "Port de Alcudia", "Port de Alcudia", "assets/optimized/location-place-11.jpg", "Order", "preorder.html"],
  ["South East", "Santanyi", "Santanyi", "assets/optimized/location-place-12.jpg", "Order", "preorder.html"],
  ["East", "Manacor", "Manacor", "assets/optimized/location-place-13.jpg", "Order", "preorder.html"],
  ["Centre", "Inca", "Inca", "assets/optimized/location-place-14.jpg", "Order", "preorder.html"]
];

function createCookieBanner(force = false) {
  document.querySelector(".cookie-panel")?.remove();
  if (!force && localStorage.getItem("craysCookieConsent")) return;

  const banner = document.createElement("section");
  banner.className = "cookie-panel";
  banner.setAttribute("aria-labelledby", "cookie-title");
  banner.innerHTML = `
    <div class="cookie-card">
      <h2 id="cookie-title">Cookie Settings</h2>
      <p>
        We use cookies to provide you with the best possible experience. They also allow us to analyze user
        behavior in order to constantly improve the website for you.
      </p>
      <a href="privacy-policy.html">See our Privacy Policy</a>
      <div class="cookie-options" hidden>
        <label><input type="checkbox" checked disabled> Functionality</label>
        <label><input type="checkbox"> Analytics Storage</label>
        <label><input type="checkbox"> Ad Storage</label>
        <label><input type="checkbox"> Ad User Data</label>
        <label><input type="checkbox"> Ad Personalisation</label>
        <label><input type="checkbox"> Personalization Storage</label>
        <label><input type="checkbox" checked> Security Storage</label>
      </div>
      <div class="cookie-actions">
        <button type="button" data-cookie="reject">Reject all</button>
        <button type="button" data-cookie="choose">I want to choose</button>
        <button type="button" class="cookie-primary" data-cookie="accept">Accept All</button>
        <button type="button" data-cookie="selection" hidden>Accept selection</button>
      </div>
    </div>
  `;

  const closeBanner = (value) => {
    localStorage.setItem("craysCookieConsent", value);
    banner.remove();
  };

  banner.addEventListener("click", (event) => {
    const button = event.target.closest("[data-cookie]");
    if (!button) return;

    const action = button.dataset.cookie;
    const options = banner.querySelector(".cookie-options");
    const selection = banner.querySelector("[data-cookie='selection']");

    if (action === "choose") {
      options.hidden = false;
      selection.hidden = false;
      return;
    }

    closeBanner(action);
  });

  document.body.append(banner);
}

function wireCookieSettingsLinks() {
  document.querySelectorAll("[data-open-cookie-settings]").forEach((button) => {
    button.addEventListener("click", () => createCookieBanner(true));
  });
}

function createSiteMenuPanel() {
  if (document.querySelector("#site-menu")) return document.querySelector("#site-menu");

  const nav = document.querySelector(".floating-nav");
  if (!nav) return null;

  const panel = document.createElement("aside");
  panel.className = "site-menu-panel";
  panel.id = "site-menu";
  panel.hidden = true;
  panel.setAttribute("aria-label", "Crays site menu");
  panel.innerHTML = `
    <nav class="site-menu-main" aria-label="Crays pages">
      <a href="gift-cards.html">Gift Cards</a>
      <a href="sustainability.html">Sustainability</a>
      <a href="contact.html">Join Us</a>
      <a href="contact.html">Contact Us</a>
    </nav>
    <nav class="site-menu-legal" aria-label="Crays legal pages">
      <a href="imprint.html">Imprint</a>
      <a href="privacy-policy.html">Privacy Policy</a>
      <a href="terms-and-conditions.html">Terms and Conditions</a>
      <a href="data-protection.html">Data Protection</a>
    </nav>
    <nav class="site-menu-social" aria-label="Crays social media">
      <a href="https://www.instagram.com/crays_circle/" target="_blank" rel="noopener" aria-label="Instagram"><img src="assets/footer-icons/instagram.svg" alt=""></a>
      <a href="https://www.tiktok.com/@thorbenbiesenbac1" target="_blank" rel="noopener" aria-label="TikTok"><img src="assets/footer-icons/tiktok.svg" alt=""></a>
      <a href="https://www.youtube.com/@CraysCircle" target="_blank" rel="noopener" aria-label="YouTube"><img src="assets/footer-icons/youtube.svg" alt=""></a>
      <a href="https://www.linkedin.com/company/crays/" target="_blank" rel="noopener" aria-label="LinkedIn"><img src="assets/footer-icons/linkedin.svg" alt=""></a>
    </nav>
  `;

  nav.insertAdjacentElement("beforebegin", panel);
  return panel;
}

function wireLocalForms() {
  document.querySelectorAll("[data-local-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const success = form.dataset.success || "Thank you! Your submission has been received.";
      if (status) status.textContent = success;
      form.reset();
      form.querySelectorAll(".is-active").forEach((item) => item.classList.remove("is-active"));
    });
  });
}

function wireGiftCards() {
  const tabs = document.querySelectorAll("[data-gift-tab]");
  const panels = document.querySelectorAll("[data-gift-panel]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.giftPanel !== tab.dataset.giftTab;
      });
    });
  });

  document.querySelectorAll(".amount-grid").forEach((grid) => {
    grid.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-amount]");
      if (!button) return;
      grid.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const input = grid.parentElement.querySelector("input[name='amount']");
      if (input) input.value = button.dataset.amount;
    });
  });
}

function renderPreorderLocations(city = "All") {
  const grid = document.querySelector("#preorderGrid");
  if (!grid) return;

  const locations = craysLocations.filter((location) => city === "All" || location[1] === city);
  grid.innerHTML = locations
    .map(([neighborhood, place, title, image, action, actionHref]) => {
      const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place} Mallorca`)}`;
      return `
        <article class="preorder-card">
          <img src="${image}" alt="${title}" loading="lazy" decoding="async">
          <div class="preorder-card-body">
            <div class="preorder-meta">
              <span>${neighborhood}</span>
              <span>|</span>
              <span>${place}</span>
            </div>
            <h2>${title}</h2>
            <div class="preorder-actions">
              <a class="location-primary${action === "Sign Up" ? " is-signup" : ""}" href="${actionHref}">${action}</a>
              <a class="location-directions" href="${directionsHref}" target="_blank" rel="noreferrer">Directions</a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function wirePreorderFilters() {
  const filters = document.querySelectorAll(".preorder-filter");
  if (!filters.length) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((filter) => filter.classList.remove("is-active"));
      button.classList.add("is-active");
      renderPreorderLocations(button.dataset.city);
    });
  });

  renderPreorderLocations();
}

function wirePageMenuButtons() {
  const panel = createSiteMenuPanel();

  document.querySelectorAll("[data-menu-target]").forEach((button) => {
    button.removeAttribute("data-menu-target");
  });

  document.querySelectorAll(".menu-button").forEach((button) => {
    button.setAttribute("aria-controls", "site-menu");
    button.setAttribute("aria-expanded", "false");

    button.addEventListener("click", () => {
      if (!panel) {
        window.location.href = "menu.html";
        return;
      }

      const shouldOpen = panel.hidden;
      panel.hidden = false;
      panel.classList.toggle("is-open", shouldOpen);
      document.body.classList.toggle("site-menu-open", shouldOpen);
      button.classList.toggle("is-open", shouldOpen);
      button.setAttribute("aria-expanded", String(shouldOpen));

      if (!shouldOpen) {
        window.setTimeout(() => {
          if (!panel.classList.contains("is-open")) panel.hidden = true;
        }, 180);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !panel || panel.hidden) return;
    panel.classList.remove("is-open");
    panel.hidden = true;
    document.body.classList.remove("site-menu-open");
    document.querySelectorAll(".menu-button").forEach((button) => {
      button.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function tuneImages(root = document) {
  root.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("decoding")) img.setAttribute("decoding", "async");
    const isCritical = img.classList.contains("hero-img") || img.closest(".nav-logo, .legal-logo, .utility-top");
    if (!isCritical && !img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });
}

function splitHeroLetters() {
  document.querySelectorAll(".pop-word").forEach((word, wordIndex) => {
    if (word.dataset.lettersReady) return;

    const text = word.textContent.trim();
    word.setAttribute("aria-label", text);
    word.innerHTML = Array.from(text)
      .map((letter, index) => {
        const letterIndex = index + wordIndex * 10;
        return `<span class="hero-letter" aria-hidden="true" style="--letter-pop-delay: ${letterIndex * 38}ms; --letter-drift-delay: ${980 + letterIndex * 72}ms; --letter-hover-delay: ${letterIndex * 22}ms;">${letter}</span>`;
      })
      .join("");
    word.dataset.lettersReady = "true";
  });
}

function setupMotion() {
  document.documentElement.classList.add("has-motion");
  requestAnimationFrame(() => document.body.classList.add("is-ready"));

  const cardSelector = [
    ".culture-card",
    ".crays-location-card",
    ".drink-card",
    ".preorder-card",
    ".proud-grid article",
    ".cup-grid article",
    ".wallet-badge",
    ".gift-panel",
    ".crays-form"
  ].join(",");

  const magneticSelector = [
    ".nav-link",
    ".menu-button",
    ".nav-logo",
    ".crays-action-button",
    ".newsletter-submit",
    ".location-primary",
    ".location-directions",
    ".preorder-filter",
    ".gift-tabs button",
    ".amount-grid button",
    ".cookie-actions button",
    ".crays-form button[type='submit']"
  ].join(",");

  const revealSelector = [
    ".culture-copy",
    ".culture-card",
    ".coffee-copy",
    ".coffee-photo",
    ".digital-copy",
    ".wallet-badge",
    ".wallet-phone",
    ".barrio-copy",
    ".crays-location-card",
    ".newsletter-inner",
    ".footer-title",
    ".footer-mark",
    ".subpage-hero h1",
    ".subpage-intro",
    ".drink-section",
    ".drink-card",
    ".preorder-card",
    ".gift-shell",
    ".wallet-form-section",
    ".contact-shell",
    ".proud-grid article",
    ".cup-grid article",
    ".ideas-callout",
    ".legal-shell section"
  ].join(",");

  let activeCard = null;
  let activeMagnet = null;

  function applyPointerVars(element, event, intensity = 1) {
    const rect = element.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width - 0.5;
    const relY = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--mx", `${relX * 14 * intensity}px`);
    element.style.setProperty("--my", `${relY * 10 * intensity}px`);
    element.style.setProperty("--rx", `${relY * -4 * intensity}deg`);
    element.style.setProperty("--ry", `${relX * 5 * intensity}deg`);
    element.style.setProperty("--img-x", `${relX * -18 * intensity}px`);
    element.style.setProperty("--img-y", `${relY * -14 * intensity}px`);
  }

  function resetPointerVars(element) {
    element.style.setProperty("--mx", "0px");
    element.style.setProperty("--my", "0px");
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
    element.style.setProperty("--img-x", "0px");
    element.style.setProperty("--img-y", "0px");
  }

  let lastPointerEvent = null;
  let pointerFrame = 0;

  const processPointerMove = () => {
    pointerFrame = 0;
    const event = lastPointerEvent;
    if (!event) return;

    const nextCard = event.target.closest(cardSelector);
    if (nextCard !== activeCard) {
      if (activeCard) {
        activeCard.classList.remove("is-hovered");
        resetPointerVars(activeCard);
      }
      activeCard = nextCard;
      if (activeCard) activeCard.classList.add("is-hovered");
    }
    if (activeCard) applyPointerVars(activeCard, event);

    const nextMagnet = event.target.closest(magneticSelector);
    if (nextMagnet !== activeMagnet) {
      if (activeMagnet) {
        activeMagnet.classList.remove("is-magnetic");
        resetPointerVars(activeMagnet);
      }
      activeMagnet = nextMagnet;
      if (activeMagnet) activeMagnet.classList.add("is-magnetic");
    }
    if (activeMagnet) applyPointerVars(activeMagnet, event, 0.72);
  };

  document.addEventListener("pointermove", (event) => {
    lastPointerEvent = event;
    if (!pointerFrame) pointerFrame = requestAnimationFrame(processPointerMove);
  });

  document.addEventListener("pointerleave", () => {
    lastPointerEvent = null;
    if (pointerFrame) {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
    }
    if (activeCard) {
      activeCard.classList.remove("is-hovered");
      resetPointerVars(activeCard);
      activeCard = null;
    }
    if (activeMagnet) {
      activeMagnet.classList.remove("is-magnetic");
      resetPointerVars(activeMagnet);
      activeMagnet = null;
    }
  });

  document.addEventListener("pointerover", (event) => {
    const title = event.target.closest(".culture-card-title, .drink-card h3, .preorder-card h2");
    if (title) title.classList.add("is-text-hovered");
  });

  document.addEventListener("pointerout", (event) => {
    const title = event.target.closest(".culture-card-title, .drink-card h3, .preorder-card h2");
    if (title) title.classList.remove("is-text-hovered");
  });

  if ("IntersectionObserver" in window) {
    const observed = new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    const observeReveals = (root = document) => {
      tuneImages(root);
      root.querySelectorAll(revealSelector).forEach((element, index) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.classList.add("motion-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 55}ms`);
        observer.observe(element);
      });
    };

    observeReveals();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) observeReveals(node);
        });
      });
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
}

createCookieBanner();
wireCookieSettingsLinks();
tuneImages();
wireLocalForms();
wireGiftCards();
wirePreorderFilters();
wirePageMenuButtons();
splitHeroLetters();
setupMotion();
