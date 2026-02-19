# Hero Web Part CÉSOC

## Description
Web Part SPFx pour afficher les actualités SharePoint en format hero carousel sur l'intranet du CÉSOC.

## Fonctionnalités
- 🎠 Carrousel automatique des actualités
- 📰 Connexion au Web Part News de SharePoint
- 🌐 Support bilingue (FR/EN)
- 📱 Design responsive
- 🎨 Style personnalisé CÉSOC

## Installation

### Prérequis
- Node.js v16.x
- npm
- Yeoman et SharePoint Generator

### Installation locale
```bash
npm install
```

### Développement
```bash
gulp serve
```

### Build pour production
```bash
gulp bundle --ship
gulp package-solution --ship
```

Le fichier `.sppkg` sera généré dans le dossier `sharepoint/solution/`.

## Déploiement
1. Téléversez le fichier `.sppkg` dans le catalogue d'applications SharePoint
2. Ajoutez le Web Part à votre page d'accueil
3. Configurez les propriétés (nombre d'actualités, intervalle du carrousel, etc.)

## Configuration
Dans le volet de propriétés du Web Part :
- **Nombre d'actualités** : 3-5 recommandé
- **Intervalle automatique** : 5000ms (5 secondes)
- **Source des actualités** : Choisir le site source