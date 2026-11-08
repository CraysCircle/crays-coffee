const eventImages = [
  "assets/optimized/culture-event-01.jpg",
  "assets/optimized/culture-event-02.jpg",
  "assets/optimized/culture-event-03.jpg",
  "assets/optimized/culture-event-04.jpg",
  "assets/optimized/culture-event-05.jpg",
  "assets/optimized/culture-event-06.jpg",
  "assets/optimized/culture-balearic-resort-moment-06.webp",
  "assets/optimized/culture-balearic-pool-terrace-01.webp",
  "assets/optimized/culture-balearic-sea-loungers-02.webp",
  "assets/optimized/culture-balearic-terrace-lounge-04.webp",
  "assets/optimized/culture-balearic-marina-pool-03.webp",
  "assets/optimized/culture-balearic-coast-pool-05.webp",
  "assets/optimized/culture-event-13.jpg",
  "assets/optimized/culture-event-14.jpg",
  "assets/optimized/culture-event-15.jpg",
  "assets/optimized/culture-event-16.jpg",
  "assets/optimized/culture-event-17.jpg",
  "assets/optimized/culture-event-18.jpg",
  "assets/optimized/culture-event-19.jpg",
  "assets/optimized/culture-event-20.jpg",
  "assets/optimized/culture-event-21.jpg",
  "assets/optimized/culture-event-22.jpg"
];

const events = [
  ["Art Event", "Balearics", "JENA"],
  ["Event", "Balearics", "Launch Party"],
  ["Collabo Event", "Balearics", "Hinge"],
  ["Collabo Event", "Balearics", "Crays x Solebox"],
  ["Music", "Balearics", "Crays Tracks"],
  ["Collabo Event", "Balearics", "Puma x Solebox"],
  ["Collabo Event", "Balearics", "Bumble x Crays"],
  ["Running", "Balearics", "lululemon"],
  ["Collabo Event", "Balearics", "Nude Project"],
  ["Party Collabo", "Balearics", "Afterglow"],
  ["Creative Event", "Balearics", "HY.AM"],
  ["Collaboration", "Balearics", "Crays at Uniqlo"],
  ["Collection Drop", "Balearics", "Ante x Highsnobiety"],
  ["People Event", "Balearics", "Panel Talks"],
  ["Yoga", "Balearics", "Crays x open studios"],
  ["Running", "Balearics", "Crays Coastal Run"],
  ["Pop Up Event", "Balearics", "Joseph Atelier"],
  ["Padel", "Balearics", "Crays at Tio Tio"],
  ["Collabo Event", "Balearics", "Crays x adidas"],
  ["Collabo Event", "Balearics", "Highsnobiety"],
  ["Fashion Event", "Balearics", "kess"],
  ["Collabo Event", "Balearics", "Crays x isla"]
];

const locations = [
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

const eventGrid = document.querySelector("#eventGrid");
const locationGrid = document.querySelector("#locationGrid");
const locationFilters = document.querySelectorAll(".location-filter");
const culturePrev = document.querySelector("[data-slider='prev']");
const cultureNext = document.querySelector("[data-slider='next']");
const locationPrev = document.querySelector("[data-location-slider='prev']");
const locationNext = document.querySelector("[data-location-slider='next']");
const newsletterForm = document.querySelector("#newsletterForm");
const formNote = document.querySelector("#formNote");
const hero = document.querySelector(".hero");
const ghostMark = document.querySelector(".ghost-mark");
const menuButton = document.querySelector(".menu-button");
const mapToggle = document.querySelector("[data-map-toggle]");
const mapSection = document.querySelector("#map");
const mapFrame = mapSection ? mapSection.querySelector("iframe[data-src]") : null;

function renderEvents() {
  eventGrid.innerHTML = events
    .map(([type, city, title], index) => {
      const image = eventImages[index % eventImages.length];
      return `
        <article class="culture-card">
          <a class="culture-card-media" href="#culture" aria-label="${title}">
            <img src="${image}" alt="${title}" loading="lazy" decoding="async" width="900" height="900">
          </a>
          <div class="culture-card-body">
            <div class="culture-card-meta">
              <span>${type}</span>
              <span>|</span>
              <span>${city}</span>
            </div>
            <a class="culture-card-title" href="#culture">${title}</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function scrollCultureSlider(direction) {
  const distance = Math.min(eventGrid.clientWidth * 0.74, 940);
  eventGrid.scrollBy({ left: direction * distance, behavior: "smooth" });
}

function scrollLocationSlider(direction) {
  const distance = Math.min(locationGrid.clientWidth * 0.82, 1180);
  locationGrid.scrollBy({ left: direction * distance, behavior: "smooth" });
}

function openStoreMap() {
  if (!mapSection) return;

  mapSection.hidden = false;
  mapSection.classList.add("is-open");
  if (mapFrame && !mapFrame.src) mapFrame.src = mapFrame.dataset.src;
  if (mapToggle) mapToggle.setAttribute("aria-expanded", "true");
  mapSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderLocations(city = "All") {
  const visibleLocations = locations.filter((location) => city === "All" || location[1] === city);
  locationGrid.innerHTML = visibleLocations
    .map(([neighborhood, place, title, image, action, actionHref]) => {
      const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place} Mallorca`)}`;
      const signUpClass = action === "Sign Up" ? " is-signup" : "";
      return `
      <article class="crays-location-card">
        <div class="crays-location-image">
          <img src="${image}" alt="${title}" loading="lazy" decoding="async" width="500" height="620">
        </div>
        <div class="crays-location-info">
          <div class="crays-location-meta">
            <span>${neighborhood}</span>
            <span>|</span>
            <span>${place}</span>
          </div>
          <h3>${title}</h3>
          <div class="crays-location-actions">
            <a class="location-primary${signUpClass}" href="${actionHref}">${action}</a>
            <a class="location-directions" href="${directionsHref}" target="_blank" rel="noreferrer">Directions</a>
          </div>
        </div>
      </article>
      `;
    })
    .join("");
  locationGrid.scrollLeft = 0;
}

locationFilters.forEach((button) => {
  button.addEventListener("click", () => {
    locationFilters.forEach((filter) => filter.classList.remove("is-active"));
    button.classList.add("is-active");
    renderLocations(button.dataset.city);
  });
});

culturePrev.addEventListener("click", () => scrollCultureSlider(-1));
cultureNext.addEventListener("click", () => scrollCultureSlider(1));
locationPrev.addEventListener("click", () => scrollLocationSlider(-1));
locationNext.addEventListener("click", () => scrollLocationSlider(1));

if (mapToggle) {
  mapToggle.addEventListener("click", (event) => {
    event.preventDefault();
    openStoreMap();
  });
}

menuButton.addEventListener("click", () => {
  if (document.querySelector("#site-menu")) return;
  window.location.href = "menu.html";
});

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newsletterForm.reset();
  formNote.textContent = "Smart move. Welcome to Crays. You belong.";
});

if (hero && ghostMark) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ghostMark.style.setProperty("--crays-x", `${x * 36}px`);
    ghostMark.style.setProperty("--crays-y", `${y * 24}px`);
    ghostMark.style.setProperty("--crays-r", `${x * 2 - 1.5}deg`);
    hero.style.setProperty("--hero-img-x", `${x * -16}px`);
    hero.style.setProperty("--hero-img-y", `${y * -12}px`);
    hero.style.setProperty("--hero-overlay-x", `${50 + x * 8}%`);
    hero.style.setProperty("--hero-overlay-y", `${50 + y * 8}%`);
  });

  hero.addEventListener("pointerleave", () => {
    ghostMark.style.setProperty("--crays-x", "0px");
    ghostMark.style.setProperty("--crays-y", "0px");
    ghostMark.style.setProperty("--crays-r", "-1.5deg");
    hero.style.setProperty("--hero-img-x", "0px");
    hero.style.setProperty("--hero-img-y", "0px");
    hero.style.setProperty("--hero-overlay-x", "50%");
    hero.style.setProperty("--hero-overlay-y", "50%");
  });
}

renderEvents();
renderLocations();
