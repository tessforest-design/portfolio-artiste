# Portfolio artiste — GitHub + Cloudflare Workers

Dépôt à connecter à Cloudflare > Workers & Pages > snowy-fog-51d1 > Settings > Builds > Connect.

- Branche : main
- Root directory : / (racine)
- Build command : vide (aucune compilation)
- Deploy command : npx wrangler deploy

Le fichier `wrangler.jsonc` conserve exactement le nom du Worker actuel.
Le dossier `public/` contient les pages du site.
Les adresses /projets, /parcours, /contact sont servies par `assets.html_handling`.

ATTENTION : Vérifier le Worker existant avant le premier déploiement. Cette archive déploie seulement les fichiers statiques ; elle ne conserve pas un éventuel Worker JavaScript, des routes API, bindings ou variables déjà configurés ailleurs.

Les photographies et contenus sont des démonstrations. Ne pas publier sans personnalisation.
