# Portfolio artiste

Site statique HTML/CSS/JavaScript destiné à Cloudflare Pages. Aucun outil de compilation requis.

## Personnaliser
- Modifier `VOTRE NOM` et les textes dans les fichiers `.html`.
- Modifier l'adresse `bonjour@exemple.fr` dans `contact.html` (attribut `data-email` et lien visible).
- Remplacer les URLs `images.unsplash.com` par vos propres images, par exemple `images/oeuvre-01.jpg`. Pour cela, ajouter les photographies au dossier `images`.
- Les images actuelles sont des exemples hébergés sur Unsplash : ne les présentez pas comme vos créations.
- Mettre à jour les titres, alt, catégories et dates des projets.

## Publication Cloudflare Pages
1. Décompresser l'archive.
2. Créer un dépôt GitHub et y importer **le contenu** du dossier `portfolio-artiste`, pas le dossier parent.
3. Cloudflare > Workers & Pages > Create application > Pages > Connect to Git.
4. Sélectionner le dépôt et la branche `main`.
5. Framework preset : None ; build command : `exit 0` (ou vide si autorisé) ; output directory : `.`.
6. Déployer. `index.html` doit se trouver à la racine du dépôt.

## Contact
Le formulaire ouvre le logiciel de messagerie du visiteur avec un email prérempli : il n'envoie rien directement depuis le site. Pour un envoi autonome, prévoir un traitement sécurisé côté serveur (Worker) ou un prestataire de formulaire.

## Animations incluses
- Grand titre d’accueil dévoilé mot par mot, titre contour, symbole rotatif.
- Défilement typographique horizontal.
- Apparition des blocs au scroll.
- Effet zoom sur les projets et galerie agrandissable.
- Réduction des animations si le visiteur l’a demandée dans son système.

## Mise en ligne sans GitHub (alternative)
Décompresser puis importer le dossier contenant `index.html` avec Cloudflare Pages > Direct Upload. Pour une publication depuis GitHub, importer directement les fichiers à la racine d’un dépôt (sans dossier parent).

Les exemples de projets, les années, l’adresse email, le nom du studio et les textes sont fictifs et doivent être remplacés avant de promouvoir le portfolio publiquement. Les images externes nécessitent une connexion Internet, et leur disponibilité dépend de leur hébergeur ; le mieux est de remplacer les liens par vos images dans `images/`.
