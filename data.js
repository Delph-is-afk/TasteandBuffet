// Modifie ce fichier pour changer la carte.
// Pour ajouter une photo, place l'image dans le dossier "images",
// puis indique son chemin comme ceci : photo: "images/mon-image.jpg"
// Si toute une categorie a le meme prix, ajoute une ligne comme ceci :
// prix: "7,90 €",

const boissons = [
  {
    categorie: "Cocktails avec alcool",
    prix: "7,90 €",
    produits: [
      {
        nom: "Golden Spritz",
        description:
          "Crémant ou champagne, eau gazeuse, épices et orange.",
        photo: "images/golden-spritz.png",
      },
      {
        nom: "Mai Tai",
        description:
          "Rhum de Guadeloupe, jus d'orange, jus d'ananas, cerise, citron et amande.",
        photo: "images/mai-tai.png",
      },
      {
        nom: "Moscow Mule",
        description:
          "Vodka française, citron, gingembre et concombre.",
        photo: "images/moscow-mule.png",
      },
      {
        nom: "Perlina",
        description:
          "Vodka française, framboise, pitaya, pêche, goyave, baies roses et eau gazeuse. Allergène : protéines de lait.",
        photo: "images/perlina.png",
      },
      {
        nom: "Sex On The Beach",
        description:
          "Vodka française, jus d'orange, jus d'ananas, melon, fruit de la passion et pêche.",
        photo: "images/sex-on-the-beach.png",
      },
      {
        nom: "Swimming Pool",
        description:
          "Rhum de Guadeloupe, jus d'ananas, curaçao et piña colada. Allergène : protéines de lait.",
        photo: "images/swimming-pool.png",
      },
      {
        nom: "Mojito",
        description:
          "Rhum de Guadeloupe, sucre de canne, eau gazeuse, menthe fraîche et citron vert.",
        photo: "images/mojito.png",
      },
      {
        nom: "Piña Colada",
        description:
          "Rhum de Guadeloupe, jus d'ananas, crème et coco. Allergène : protéines de lait.",
        photo: "images/pina-colada.png",
      },
    ],
  },
  {
    categorie: "Cocktails sans alcool",
    prix: "6,90 €",
    produits: [
      {
        nom: "Caribbean Sun",
        description:
          "Tourbillon exotique, jus d'orange, mangue, kiwi et orange.",
        photo: "images/caribbean-sun.png",
      },
      {
        nom: "Koyo",
        description:
          "Jus de pomme, jus d'ananas, fraise, melon, banane, citron et vanille.",
        photo: "images/koyo.png",
      },
      {
        nom: "Peace & Love",
        description:
          "Jus d'orange, notes de tequila, jasmin, violette et hibiscus.",
        photo: "images/peace-and-love.png",
      },
      {
        nom: "Coco Matcha",
        description:
          "Jus d'ananas, crème, thé japonais matcha et arôme coco.",
        photo: "images/coco-matcha.png",
      },
      {
        nom: "Paradise Dream",
        description:
          "Jus d'ananas, fraise, framboise et pêche blanche.",
        photo: "images/paradise-dream.png",
      },
      {
        nom: "VIP",
        description:
          "Jus d'orange, litchi, rose et framboise.",
        photo: "images/vip.png",
      },
      {
        nom: "Coconut King",
        description:
          "Jus d'ananas et crème coco. Allergène : protéines de lait.",
        photo: "images/coconut-king.png",
      },
      {
        nom: "Purple",
        description:
          "Framboise, fraise, citron, violette, myrtille, mûre et eau gazeuse.",
        photo: "images/purple.png",
      },
      {
        nom: "Virgin Mojito",
        description:
          "Sucre de canne, menthe fraîche, citron vert, eau gazeuse et saveur rhum.",
        photo: "images/virgin-mojito.png",
      },
    ],
  },
  {
    categorie: "Apéritifs",
    produits: [
      {
        nom: "Cocktail maison",
        description: "12 cl - Apéritif maison.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Kir",
        description: "12 cl - Cassis, mûre ou pêche.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Martini",
        description: "6 cl - Rouge ou blanc.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Ricard",
        description: "2 cl.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Porto",
        description: "6 cl.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Suze",
        description: "6 cl.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Americano",
        description: "6 cl.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Vodka",
        description: "4 cl.",
        prix: "5,20 €",
        photo: "",
      },
      {
        nom: "Whisky J&B",
        description: "4 cl.",
        prix: "5,20 €",
        photo: "",
      },
      {
        nom: "Whisky Johnnie Walker",
        description: "4 cl.",
        prix: "5,20 €",
        photo: "",
      },
      {
        nom: "Whisky Jack Daniel's",
        description: "4 cl.",
        prix: "5,80 €",
        photo: "",
      },
      {
        nom: "Coupe de champagne",
        description: "12 cl.",
        prix: "7,80 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Bières pression",
    prix: "25 cl 4,50 € / 50 cl 8,00 €",
    produits: [
      {
        nom: "Heineken",
        description: "25 cl ou 50 cl.",
        photo: "",
      },
      {
        nom: "1664 blanche",
        description: "25 cl ou 50 cl.",
        photo: "",
      },
      {
        nom: "Grimbergen",
        description: "25 cl ou 50 cl.",
        photo: "",
      },
    ],
  },
  {
    categorie: "Bières bouteille",
    prix: "4,80 €",
    produits: [
      {
        nom: "Tsingtao",
        description: "33 cl - Bière chinoise.",
        photo: "",
      },
      {
        nom: "Asahi",
        description: "33 cl - Bière japonaise.",
        photo: "",
      },
      {
        nom: "Singha",
        description: "33 cl - Bière thaïlandaise.",
        photo: "",
      },
      {
        nom: "Desperados",
        description: "33 cl.",
        photo: "",
      },
    ],
  },
  {
    categorie: "Eaux minérales",
    produits: [
      {
        nom: "Abatilles",
        description: "Eau minérale.",
        prix: "50 cl 3,90 € / 1 L 6,00 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Boissons fraîches",
    produits: [
      {
        nom: "Coca-Cola",
        description: "33 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Coca-Cola zéro",
        description: "33 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Coca-Cola Cherry",
        description: "33 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Fanta orange",
        description: "25 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Sprite",
        description: "25 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Fuze Tea",
        description: "25 cl - Thé glacé pêche intense.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Orangina",
        description: "25 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Perrier",
        description: "33 cl.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Schweppes",
        description: "25 cl - Tonic ou agrumes.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Jus de fruit",
        description: "25 cl - Orange, ananas, abricot ou litchi.",
        prix: "3,90 €",
        photo: "",
      },
      {
        nom: "Sirop à l'eau",
        description: "Grenadine, fraise, menthe, pêche ou citron.",
        prix: "2,00 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Digestifs",
    produits: [
      {
        nom: "Saké",
        description: "4 cl - Alcool de riz.",
        prix: "6,00 €",
        photo: "",
      },
      {
        nom: "Baileys",
        description: "6 cl.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Get 27",
        description: "4 cl.",
        prix: "4,80 €",
        photo: "",
      },
      {
        nom: "Cognac",
        description: "4 cl.",
        prix: "8,00 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Vins blancs",
    produits: [
      {
        nom: "Domaine Marquestau",
        description: "IGP Côtes-de-Gascogne Moelleux.",
        prix: "75 cl 17,50 €",
        photo: "",
      },
      {
        nom: "Tursan l'Impératrice",
        description: "AOP Tursan.",
        prix: "37,5 cl 11,00 € / 75 cl 18,00 €",
        photo: "",
      },
      {
        nom: "Château Loumelat",
        description: "AOP Bordeaux.",
        prix: "75 cl 18,00 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Vins rosés",
    produits: [
      {
        nom: "Domaine Marquestau",
        description: "IGP Côtes-de-Gascogne.",
        prix: "75 cl 17,50 €",
        photo: "",
      },
      {
        nom: "Tursan l'Impératrice",
        description: "AOP Tursan.",
        prix: "37,5 cl 11,00 € / 75 cl 18,00 €",
        photo: "",
      },
      {
        nom: "Domaine Petite Roche",
        description: "AOP Cabernet d'Anjou.",
        prix: "75 cl 18,00 €",
        photo: "",
      },
      {
        nom: "Domaine Masterel",
        description: "AOP Côtes-de-Provence.",
        prix: "37,5 cl 11,50 € / 75 cl 18,50 €",
        photo: "",
      },
      {
        nom: "M de Minuty",
        description: "Côtes-de-Provence.",
        prix: "75 cl 25,50 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Vins rouges",
    produits: [
      {
        nom: "Domaine Marquestau",
        description: "IGP Côtes-de-Gascogne.",
        prix: "75 cl 17,50 €",
        photo: "",
      },
      {
        nom: "Tursan l'Impératrice",
        description: "AOP Tursan.",
        prix: "37,5 cl 11,00 € / 75 cl 18,00 €",
        photo: "",
      },
      {
        nom: "Les Fouquières",
        description: "Côtes-du-Rhône.",
        prix: "37,5 cl 11,00 € / 75 cl 17,50 €",
        photo: "",
      },
      {
        nom: "Château La Bouyère",
        description: "AOP Bordeaux Graves.",
        prix: "37,5 cl 12,00 € / 75 cl 19,00 €",
        photo: "",
      },
      {
        nom: "Château Archambeau",
        description: "AOP Bordeaux Graves.",
        prix: "37,5 cl 13,00 € / 75 cl 20,00 €",
        photo: "",
      },
      {
        nom: "Bec en Sabot",
        description: "AOP Pessac Léognan.",
        prix: "75 cl 28,00 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Vins au verre",
    produits: [
      {
        nom: "Château Loumelat",
        description: "16 cl - AOP Bordeaux blanc.",
        prix: "4,20 €",
        photo: "",
      },
      {
        nom: "Domaine Marquestau",
        description: "16 cl - IGP Côtes-de-Gascogne rosé.",
        prix: "4,20 €",
        photo: "",
      },
      {
        nom: "Château La Bouyère",
        description: "16 cl - AOP Bordeaux Graves rouge.",
        prix: "4,20 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Vins au pichet",
    produits: [
      {
        nom: "IGP Landes",
        description: "Blanc, rouge ou rosé.",
        prix: "25 cl 4,00 € / 50 cl 6,80 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Champagnes",
    produits: [
      {
        nom: "Champagne brut",
        description: "12 cl - La coupe.",
        prix: "7,80 €",
        photo: "",
      },
      {
        nom: "Champagne brut",
        description: "75 cl - La bouteille AOP Veuve Renard de Beaumont.",
        prix: "45,00 €",
        photo: "",
      },
    ],
  },
  {
    categorie: "Boissons chaudes",
    produits: [
      {
        nom: "Café",
        description: "",
        prix: "1,90 €",
        photo: "",
      },
      {
        nom: "Décaféiné",
        description: "",
        prix: "1,90 €",
        photo: "",
      },
      {
        nom: "Thé",
        description: "Thé jasmin ou menthe.",
        prix: "2,90 €",
        photo: "",
      },
      {
        nom: "Irish Coffee",
        description: "",
        prix: "6,80 €",
        photo: "",
      },
    ],
  },
];
