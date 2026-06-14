const header = document.querySelector("[data-site-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const navLinks = Array.from(
  document.querySelectorAll(".desktop-nav a[href^='#'], .mobile-menu a[href^='#']"),
);
const revealItems = Array.from(document.querySelectorAll(".reveal"));

function updateHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setMenuState(isOpen) {
  if (!menuToggle || !mobileMenu || !header) return;

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  mobileMenu.classList.toggle("is-open", isOpen);
  mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  mobileMenu.toggleAttribute("inert", !isOpen);
  header.classList.toggle("menu-is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    setMenuState(!menuToggle.classList.contains("is-open"));
  });
}

if (mobileMenu) {
  mobileMenu.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      setMenuState(false);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuState(false);
    closeLightbox();
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-42% 0px -48% 0px",
      threshold: 0,
    },
  );

  ["actualite", "restaurant", "menu", "carte-boissons", "galerie", "avis", "contact"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const galleryButtons = Array.from(document.querySelectorAll("[data-gallery-index]"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
let galleryIndex = 0;
let lastFocusedElement = null;
let lightboxTouchStart = null;

const galleryImages = galleryButtons.map((button) => {
  const image = button.querySelector("img");
  return {
    src: image ? image.getAttribute("src") : "",
    alt: image ? image.getAttribute("alt") : "",
  };
});

function showGalleryImage(index) {
  if (!lightboxImage || !lightboxCaption || galleryImages.length === 0) return;

  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const current = galleryImages[galleryIndex];
  lightboxImage.src = current.src;
  lightboxImage.alt = current.alt;
  lightboxCaption.textContent = current.alt;
}

function openLightbox(index) {
  if (!lightbox) return;

  lastFocusedElement = document.activeElement;
  showGalleryImage(index);
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.removeAttribute("inert");
  document.body.classList.add("menu-open");
  lightboxClose?.focus();
}

function closeLightbox() {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("inert", "");
  document.body.classList.remove("menu-open");

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
}

function nextGalleryImage() {
  showGalleryImage(galleryIndex + 1);
}

function previousGalleryImage() {
  showGalleryImage(galleryIndex - 1);
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", previousGalleryImage);
lightboxNext?.addEventListener("click", nextGalleryImage);

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener(
    "touchstart",
    (event) => {
      lightboxTouchStart = event.changedTouches[0].clientX;
    },
    { passive: true },
  );

  lightbox.addEventListener(
    "touchend",
    (event) => {
      if (lightboxTouchStart === null) return;
      const delta = event.changedTouches[0].clientX - lightboxTouchStart;
      if (Math.abs(delta) > 45) {
        delta < 0 ? nextGalleryImage() : previousGalleryImage();
      }
      lightboxTouchStart = null;
    },
    { passive: true },
  );
}

document.addEventListener("keydown", (event) => {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;

  if (event.key === "ArrowRight") {
    nextGalleryImage();
  }

  if (event.key === "ArrowLeft") {
    previousGalleryImage();
  }
});

const reviewCards = Array.from(document.querySelectorAll(".review-card"));
const reviewViewport = document.querySelector(".reviews-viewport");
const reviewPrev = document.querySelector("[data-review-prev]");
const reviewNext = document.querySelector("[data-review-next]");
let reviewIndex = 0;
let reviewTouchStart = null;

function showReview(index) {
  if (reviewCards.length === 0) return;
  reviewIndex = (index + reviewCards.length) % reviewCards.length;
  reviewCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === reviewIndex);
  });
}

function previousReview() {
  showReview(reviewIndex - 1);
}

function nextReview() {
  showReview(reviewIndex + 1);
}

reviewPrev?.addEventListener("click", previousReview);
reviewNext?.addEventListener("click", nextReview);

reviewViewport?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextReview();
  if (event.key === "ArrowLeft") previousReview();
});

reviewViewport?.addEventListener(
  "touchstart",
  (event) => {
    reviewTouchStart = event.changedTouches[0].clientX;
  },
  { passive: true },
);

reviewViewport?.addEventListener(
  "touchend",
  (event) => {
    if (reviewTouchStart === null) return;
    const delta = event.changedTouches[0].clientX - reviewTouchStart;
    if (Math.abs(delta) > 45) {
      delta < 0 ? nextReview() : previousReview();
    }
    reviewTouchStart = null;
  },
  { passive: true },
);
