const menuElement = document.querySelector("#menu");
const navElement = document.querySelector("#categoryNav");

function creerSlug(texte) {
  return texte
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function creerNavigation() {
  boissons.forEach((categorie) => {
    const lien = document.createElement("a");
    lien.className = "nav-link";
    lien.href = `#${creerSlug(categorie.categorie)}`;
    lien.textContent = categorie.categorie;
    navElement.appendChild(lien);
  });
}

function creerCarteProduit(produit, prixCategorie) {
  const carte = document.createElement("article");
  carte.className = "drink-card";

  if (produit.photo) {
    const image = document.createElement("img");
    image.className = "drink-photo";
    image.src = produit.photo;
    image.alt = produit.nom;
    image.loading = "lazy";
    image.addEventListener("error", () => {
      image.remove();
      carte.classList.add("no-photo");
    });
    carte.appendChild(image);
  } else {
    carte.classList.add("no-photo");
  }

  const contenu = document.createElement("div");
  contenu.className = "drink-content";

  const ligneTitre = document.createElement("div");
  ligneTitre.className = "drink-top";

  const nom = document.createElement("h3");
  nom.className = "drink-name";
  nom.textContent = produit.nom;

  ligneTitre.appendChild(nom);

  if (!prixCategorie && produit.prix) {
    const prix = document.createElement("div");
    prix.className = "drink-price";
    prix.textContent = produit.prix;
    ligneTitre.appendChild(prix);
  }

  contenu.appendChild(ligneTitre);

  if (produit.description) {
    const description = document.createElement("p");
    description.className = "drink-description";
    description.textContent = produit.description;
    contenu.appendChild(description);
  }

  carte.appendChild(contenu);
  return carte;
}

function creerMenu() {
  boissons.forEach((categorie) => {
    const section = document.createElement("section");
    section.className = "category-section";
    section.id = creerSlug(categorie.categorie);

    const entete = document.createElement("div");
    entete.className = "category-heading";

    const titre = document.createElement("h2");

    const nomCategorie = document.createElement("span");
    nomCategorie.className = "category-name";
    nomCategorie.textContent = categorie.categorie;
    titre.appendChild(nomCategorie);

    if (categorie.prix) {
      const prixCategorie = document.createElement("span");
      prixCategorie.className = "category-price";
      prixCategorie.textContent = ` — ${categorie.prix}`;
      titre.appendChild(prixCategorie);
    }

    entete.appendChild(titre);

    const grille = document.createElement("div");
    grille.className = "drink-grid";

    categorie.produits.forEach((produit) => {
      grille.appendChild(creerCarteProduit(produit, categorie.prix));
    });

    section.append(entete, grille);
    menuElement.appendChild(section);
  });
}

creerNavigation();
creerMenu();
