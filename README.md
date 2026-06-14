# LinkTable

Carte de boissons statique pour restaurant.

## Fichiers principaux

- `index.html` : page principale
- `style.css` : styles du site
- `script.js` : generation de la carte
- `data.js` : donnees des boissons
- `images/` : images des cocktails
- `Logo Rouge.png` : logo affiche dans le header

## Lancer le site en local

Depuis le dossier du projet :

```powershell
python -m http.server 8000 --bind 0.0.0.0
```

Puis ouvrir :

```text
http://localhost:8000/
```

## Publier avec GitHub Pages

1. Creer un depot GitHub.
2. Envoyer les fichiers du site dans le depot.
3. Aller dans `Settings` > `Pages`.
4. Choisir `Deploy from a branch`.
5. Selectionner la branche `main` et le dossier `/root`.
6. Enregistrer, puis attendre que GitHub donne l'URL publique.
