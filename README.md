# Portfolio artiste

Site statique pour le Worker existant portfolio-artiste.
Voir GUIDE-MODIFIER-MON-SITE.md pour les textes, images et pages de projets.

Cloudflare Builds : branche main, racine /, pas de compilation, déploiement npx wrangler deploy.
Conserver public/ et wrangler.jsonc à la racine du dépôt.
Les routes /projets, /parcours, /contact et les six pages de projet utilisent les fichiers HTML de public/.
Cette livraison ne publie rien. Vérifier les paramètres et sauvegarder la version actuelle avant déploiement.
Les textes et photographies sont des démonstrations à remplacer par vos contenus.
