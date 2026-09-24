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
    closeChat();
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

const chatWidget = document.querySelector("[data-chat-widget]");
const chatToggle = document.querySelector("[data-chat-toggle]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatClose = document.querySelector("[data-chat-close]");
const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatMessages = document.querySelector("[data-chat-messages]");
const chatSuggestions = document.querySelector("[data-chat-suggestions]");
const faqEntries = Array.isArray(window.TASTE_FAQ) ? window.TASTE_FAQ : [];
const restaurantPhone = "05 58 46 19 48";
const restaurantPhoneLink = "tel:+33558461948";

const faqTopics = [
  { label: "Horaires", categories: ["Horaires"] },
  { label: "Tarifs", categories: ["Prix du buffet"] },
  { label: "Le buffet", categories: ["Buffet et cuisine", "Fonctionnement du buffet"] },
  { label: "Réserver", categories: ["Réservation et groupes"] },
  { label: "Allergènes", categories: ["Régimes et allergènes"] },
  { label: "En famille", categories: ["Enfants et familles"] },
  { label: "Accès et services", categories: ["Accès et confort", "Informations générales"] },
  { label: "Paiement", categories: ["Paiement"] },
  { label: "À emporter", categories: ["À emporter et livraison"] },
  { label: "Anniversaire", categories: ["Anniversaires et événements"] },
];

const ignoredWords = new Set([
  "avec",
  "avez",
  "dans",
  "des",
  "est",
  "etes",
  "fait",
  "faites",
  "pour",
  "peut",
  "peut-on",
  "peux",
  "puis",
  "quel",
  "quelle",
  "quels",
  "quelles",
  "restaurant",
  "sont",
  "une",
  "vous",
  "votre",
]);

const wordAliases = {
  appeler: "contact",
  appel: "contact",
  numero: "contact",
  telephone: "contact",
  cout: "prix",
  coute: "prix",
  tarif: "prix",
  tarifs: "prix",
  fermeture: "horaire",
  heure: "horaire",
  heures: "horaire",
  ouvert: "horaire",
  ouverte: "horaire",
  ouverts: "horaire",
  ouverture: "horaire",
  reservation: "reserver",
  reserve: "reserver",
  table: "reserver",
  localisation: "adresse",
  situe: "adresse",
  trouver: "adresse",
  garer: "parking",
  stationnement: "parking",
  paiement: "payer",
  paye: "payer",
  payer: "payer",
  anniversaire: "anniversaire",
  birthday: "anniversaire",
  wifi: "wifi",
};

function normalizeChatText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/œ/g, "oe")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokenizeChatText(value) {
  return normalizeChatText(value)
    .split(" ")
    .filter((word) => word.length > 2 && !ignoredWords.has(word))
    .map((word) => wordAliases[word] || word.replace(/s$/, ""));
}

const searchableFaq = faqEntries.map((entry) => ({
  ...entry,
  normalizedQuestion: normalizeChatText(entry.question),
  questionTokens: new Set(tokenizeChatText(entry.question)),
  answerTokens: new Set(tokenizeChatText(entry.answer)),
  categoryTokens: new Set(tokenizeChatText(entry.category)),
}));

function setChatState(isOpen) {
  if (!chatWidget || !chatToggle || !chatPanel) return;

  chatWidget.classList.toggle("is-open", isOpen);
  chatToggle.setAttribute("aria-expanded", String(isOpen));
  chatToggle.setAttribute("aria-label", isOpen ? "Fermer le chat" : "Ouvrir le chat");
  chatPanel.setAttribute("aria-hidden", String(!isOpen));
  chatPanel.toggleAttribute("inert", !isOpen);
  document.body.classList.toggle("chat-open", isOpen);

  if (isOpen) {
    window.setTimeout(() => chatInput?.focus(), 180);
  }
}

function closeChat() {
  setChatState(false);
}

function addChatMessage(text, type, options = {}) {
  if (!chatMessages || !text.trim()) return;

  const message = document.createElement("article");
  message.className = `chat-message chat-message-${type}`;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(paragraph);

  if (options.showPhone) {
    const phoneLink = document.createElement("a");
    phoneLink.className = "chat-phone-link";
    phoneLink.href = restaurantPhoneLink;
    phoneLink.textContent = `Appeler le ${restaurantPhone}`;
    message.append(phoneLink);
  }

  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingReply(callback) {
  if (!chatMessages) return;

  const typing = document.createElement("article");
  typing.className = "chat-message chat-message-bot chat-message-typing";
  typing.setAttribute("aria-label", "Réponse en cours");
  typing.innerHTML = "<span></span><span></span><span></span>";
  chatMessages.append(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  window.setTimeout(() => {
    typing.remove();
    callback();
  }, 340);
}

function createSuggestionButton(label, dataName, dataValue) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.dataset[dataName] = dataValue;
  return button;
}

function renderTopics() {
  if (!chatSuggestions) return;

  chatSuggestions.classList.remove("is-question-list");
  chatSuggestions.replaceChildren(
    ...faqTopics.slice(0, 8).map((topic) =>
      createSuggestionButton(topic.label, "chatTopic", topic.label),
    ),
  );
}

function renderTopicQuestions(topic) {
  if (!chatSuggestions) return;

  const questions = faqEntries
    .filter((entry) => topic.categories.includes(entry.category))
    .slice(0, 5);
  const buttons = questions.map((entry) =>
    createSuggestionButton(entry.question, "chatQuestion", entry.question),
  );
  buttons.push(createSuggestionButton("Voir les autres sujets", "chatHome", "true"));
  chatSuggestions.classList.add("is-question-list");
  chatSuggestions.replaceChildren(...buttons);
}

function renderRelatedQuestions(entry) {
  if (!chatSuggestions) return;

  const related = faqEntries
    .filter((candidate) => candidate.category === entry.category && candidate.question !== entry.question)
    .slice(0, 3);
  const buttons = related.map((candidate) =>
    createSuggestionButton(candidate.question, "chatQuestion", candidate.question),
  );
  buttons.push(createSuggestionButton("Autres sujets", "chatHome", "true"));
  chatSuggestions.classList.add("is-question-list");
  chatSuggestions.replaceChildren(...buttons);
}

function findFaqAnswer(question) {
  const normalizedQuery = normalizeChatText(question);
  const directQuestion = [
    {
      matches: normalizedQuery === "adresse" || /^(quelle est )?(votre |l )?adresse$/.test(normalizedQuery),
      question: "Où se trouve le restaurant ?",
    },
    {
      matches: normalizedQuery === "telephone" || normalizedQuery === "numero de telephone",
      question: "Quel est le numéro de téléphone ?",
    },
    {
      matches: normalizedQuery === "reservation" || normalizedQuery === "reserver",
      question: "Comment réserver une table ?",
    },
  ].find((shortcut) => shortcut.matches);

  if (directQuestion) {
    return searchableFaq.find((entry) => entry.question === directQuestion.question) || null;
  }

  const queryTokens = [...new Set(tokenizeChatText(question))];

  if (!normalizedQuery || queryTokens.length === 0) return null;

  const ranked = searchableFaq
    .map((entry) => {
      let score = 0;
      let matchedTokens = 0;

      if (entry.normalizedQuestion === normalizedQuery) score += 40;
      if (normalizedQuery.length > 4 && entry.normalizedQuestion.includes(normalizedQuery)) score += 12;

      queryTokens.forEach((token) => {
        let matched = false;
        if (entry.questionTokens.has(token)) {
          score += 6;
          matched = true;
        } else if (entry.normalizedQuestion.includes(token)) {
          score += 3;
          matched = true;
        }

        if (entry.categoryTokens.has(token)) {
          score += 2.5;
          matched = true;
        }
        if (entry.answerTokens.has(token)) score += 1;
        if (matched) matchedTokens += 1;
      });

      return { entry, score, coverage: matchedTokens / queryTokens.length };
    })
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score < 5 || best.coverage < 0.34) return null;
  return best.entry;
}

function answerChatQuestion(question) {
  const cleanedQuestion = question.trim();
  if (!cleanedQuestion) return;

  addChatMessage(cleanedQuestion, "user");
  if (chatInput) chatInput.value = "";

  showTypingReply(() => {
    const result = findFaqAnswer(cleanedQuestion);
    if (!result) {
      addChatMessage(
        "Je n'ai pas trouvé cette information dans la FAQ. Le restaurant pourra vous répondre directement par téléphone.",
        "bot",
        { showPhone: true },
      );
      renderTopics();
      return;
    }

    addChatMessage(result.answer, "bot", { showPhone: result.needsCall });
    renderRelatedQuestions(result);
  });
}

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-chat-toggle]")) {
    setChatState(!chatWidget?.classList.contains("is-open"));
  }

  if (event.target.closest("[data-chat-close]")) {
    closeChat();
  }
});

chatSuggestions?.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.chatHome) {
    renderTopics();
    addChatMessage("Choisissez un autre sujet, ou écrivez votre question.", "bot");
    return;
  }

  if (button.dataset.chatTopic) {
    const topic = faqTopics.find((candidate) => candidate.label === button.dataset.chatTopic);
    if (!topic) return;
    addChatMessage(topic.label, "user");
    addChatMessage("Voici les questions les plus fréquentes sur ce sujet.", "bot");
    renderTopicQuestions(topic);
    return;
  }

  if (button.dataset.chatQuestion) {
    answerChatQuestion(button.dataset.chatQuestion);
  }
});

chatForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = chatInput?.value.trim() || "";
  if (!question) return;

  answerChatQuestion(question);
});

chatInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatForm?.requestSubmit();
  }
});

renderTopics();
