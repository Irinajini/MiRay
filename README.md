# FALY MiRay — GitHub Ready V4

Cette version est préparée pour être déposée **directement à la racine du dépôt GitHub**.

## IMPORTANT

Après upload sur GitHub, vous devez voir directement :

- `package.json`
- `firebase.json`
- `.firebaserc`
- `src/`
- `public/`
- `.github/`

à la racine du dépôt.

## Architecture

- Firebase Hosting : hébergement
- Firebase Authentication : Google + éventuellement Anonymous
- Firestore : données
- Cloudinary : images
- GitHub Actions : build et déploiement automatique

## Cloudinary déjà configuré

- Cloud name : `alfrtkxe`
- Upload preset : `faly_miray_uploads`
- Mode : Unsigned
- Vérification côté application : JPG / PNG / WEBP, 5 Mo maximum

Aucun API Secret Cloudinary n'est inclus.

## Firebase

Projet : `faly-miray`

Activez dans Firebase Console :

### Authentication
- Google
- Anonymous (facultatif ; si désactivé, le bouton découverte bascule vers le mode aperçu)

### Firestore
Les règles et index sont fournis.

## GitHub Actions — configuration manuelle obligatoire

Créer le secret GitHub :

`FIREBASE_SERVICE_ACCOUNT_FALY_MIRAY`

Chemin :
`Repository > Settings > Secrets and variables > Actions > New repository secret`

Le workflow vérifie automatiquement :
- présence de `package.json`
- présence de `firebase.json`
- présence de `src/main.jsx`
- installation npm
- build Vite
- création de `dist/index.html`
- présence du secret Firebase
- déploiement Hosting

## Vérification locale

```bash
npm install
npm run check
npm run build
```

## Corrections apportées

1. Projet placé à la racine du ZIP : plus de problème de `working-directory`.
2. Pas de cache npm : aucun `package-lock.json` n'est requis au démarrage.
3. `npm install` utilisé au lieu de `npm ci`.
4. Vérification automatique de la structure avant build.
5. Vérification explicite du secret Firebase avant déploiement.
6. `.firebaserc` pointe vers `faly-miray`.
7. Cloudinary ne dépend pas de Firebase Storage.
8. Connexion anonyme avec fallback vers le mode aperçu.
