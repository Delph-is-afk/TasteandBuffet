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

function analyserPrix(textePrix) {
  if (!textePrix) {
    return [];
  }

  return textePrix.split("/").map((morceau) => {
    const texte = morceau.trim();
    const prixSeul = texte.match(/^(\d+(?:,\d{2})?)\s*€$/);

    if (prixSeul) {
      return { contenance: "", prix: `${prixSeul[1]} €` };
    }

    const avecContenance = texte.match(/^(.+?)\s+(\d+(?:,\d{2})?\s*€)$/);

    if (avecContenance) {
      return {
        contenance: avecContenance[1].trim(),
        prix: avecContenance[2].trim(),
      };
    }

    return { contenance: "", prix: texte };
  });
}

function nettoyerDescription(description, lignesPrix) {
  if (!description) {
    return { description: "", contenance: "" };
  }

  const texte = description.trim();
  const contenanceSeule = texte.match(/^(\d+(?:,\d+)?\s*(?:cl|l))\.?$/i);
  const contenanceAvecDescription = texte.match(
    /^(\d+(?:,\d+)?\s*(?:cl|l))\s*-\s*(.+)$/i,
  );
  const choixDeContenances = texte.match(
    /^\d+(?:,\d+)?\s*(?:cl|l)\s+ou\s+\d+(?:,\d+)?\s*(?:cl|l)\.?$/i,
  );

  if (contenanceAvecDescription) {
    return {
      contenance: contenanceAvecDescription[1],
      description: contenanceAvecDescription[2],
    };
  }

  if (contenanceSeule) {
    return { contenance: contenanceSeule[1], description: "" };
  }

  if (choixDeContenances && lignesPrix.some((ligne) => ligne.contenance)) {
    return { contenance: "", description: "" };
  }

  return { contenance: "", description: texte };
}

function estCategorieCocktail(categorie) {
  return categorie.categorie.toLowerCase().startsWith("cocktails ");
}

function creerCarteCocktail(produit) {
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

  const informations = document.createElement("div");
  informations.className = "drink-info";

  const nom = document.createElement("h3");
  nom.className = "drink-name";
  nom.textContent = produit.nom;
  informations.appendChild(nom);

  if (produit.description) {
    const description = document.createElement("p");
    description.className = "drink-description";
    description.textContent = produit.description;
    informations.appendChild(description);
  }

  carte.appendChild(informations);
  return carte;
}

function creerLigneProduit(produit, prixCategorie) {
  const ligneProduit = document.createElement("article");
  ligneProduit.className = "drink-row";

  const lignesPrix = analyserPrix(produit.prix || prixCategorie);
  const detailsDescription = nettoyerDescription(
    produit.description,
    lignesPrix,
  );

  if (
    lignesPrix.length === 1 &&
    !lignesPrix[0].contenance &&
    detailsDescription.contenance
  ) {
    lignesPrix[0].contenance = detailsDescription.contenance;
  }

  const informations = document.createElement("div");
  informations.className = "drink-info";

  const nom = document.createElement("h3");
  nom.className = "drink-name";
  nom.textContent = produit.nom;
  informations.appendChild(nom);

  if (detailsDescription.description) {
    const description = document.createElement("p");
    description.className = "drink-description";
    description.textContent = detailsDescription.description;
    informations.appendChild(description);
  }

  const prix = document.createElement("div");
  prix.className = "drink-pricing";

  lignesPrix.forEach((lignePrix) => {
    const ligne = document.createElement("div");
    ligne.className = "drink-price-line";

    if (lignePrix.contenance) {
      const contenance = document.createElement("span");
      contenance.className = "drink-volume";
      contenance.textContent = lignePrix.contenance;
      ligne.appendChild(contenance);
    }

    const montant = document.createElement("span");
    montant.className = "drink-price";
    montant.textContent = lignePrix.prix;
    ligne.appendChild(montant);

    prix.appendChild(ligne);
  });

  ligneProduit.append(informations, prix);
  return ligneProduit;
}

function creerMenu() {
  boissons.forEach((categorie) => {
    const categorieCocktail = estCategorieCocktail(categorie);
    const section = document.createElement("section");
    section.className = categorieCocktail
      ? "category-section category-section--cocktails"
      : "category-section category-section--list";
    section.id = creerSlug(categorie.categorie);

    const entete = document.createElement("div");
    entete.className = "category-heading";

    const titre = document.createElement("h2");
    const nomCategorie = document.createElement("span");
    nomCategorie.textContent = categorie.categorie;
    titre.appendChild(nomCategorie);

    if (categorieCocktail && categorie.prix) {
      const prixCategorie = document.createElement("span");
      prixCategorie.className = "category-price";
      prixCategorie.textContent = categorie.prix;
      titre.appendChild(prixCategorie);
    }

    entete.appendChild(titre);

    const liste = document.createElement("div");
    liste.className = categorieCocktail ? "drink-photo-grid" : "drink-list";

    categorie.produits.forEach((produit) => {
      liste.appendChild(
        categorieCocktail
          ? creerCarteCocktail(produit)
          : creerLigneProduit(produit, categorie.prix),
      );
    });

    section.append(entete, liste);
    menuElement.appendChild(section);
  });
}

creerNavigation();
creerMenu();
