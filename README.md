# Cuisine moi un mouton

Archive complète du blog de recettes **Cuisine moi un mouton** (2014–2019), transformée en site statique consultable.

## Le projet

Ce dépôt contient un site statique généré à partir des 440 recettes publiées sur le blog *cuisinemoiunmouton.com* entre 2014 et 2019. Le blog original ayant été archivé, ce projet le préserve sous forme de site HTML léger, rapide et consultable.

Chaque recette inclut :
- Les ingrédients, étapes et temps de préparation/cuisson
- Les photos originales du blog
- Les **avis de la communauté** : un résumé des 9 787 commentaires d'origine, analysés et synthétisés par IA (astuces, variantes, corrections, verdict global)

## Contenu

| Élément | Quantité |
|---------|----------|
| Recettes | 440 |
| Catégories | 33 |
| Commentaires analysés | 9 787 |
| Photos | ~2 850 |

### Catégories principales

Salé, Sucré, Brunch, Recettes Végétariennes, Gâteaux et Layer cakes, Repas Light, Repas du monde, Apéritif, Noël, Desserts du monde, Salade, et bien d'autres.

## Structure du site

```
├── index.html              # Page d'accueil avec recherche
├── categories.html         # Liste des 33 catégories
├── toutes-les-recettes.html # Index complet des 440 recettes
├── style.css               # Feuille de style
├── search.js               # Recherche instantanée côté client
├── recettes/               # Pages individuelles des recettes
│   └── [slug].html
├── categorie/              # Pages par catégorie
│   └── [slug].html
└── images/                 # Photos organisées par année
    ├── 2014/
    ├── 2015/
    ├── 2016/
    ├── 2017/
    ├── 2018/
    └── 2019/
```

## Fonctionnalités

- **Recherche instantanée** : recherche en temps réel parmi toutes les recettes (titre, ingrédients, catégories)
- **Navigation par catégorie** : 33 catégories pour explorer les recettes
- **Avis communautaires enrichis par IA** : chaque recette affiche un résumé des retours de la communauté, avec astuces, variantes suggérées et corrections
- **100 % statique** : aucun serveur requis, hébergeable sur GitHub Pages ou tout hébergement statique
- **Responsive** : adapté mobile et desktop

## Consulter le site

Le site peut être consulté directement en ouvrant `index.html` dans un navigateur, ou déployé sur n'importe quel hébergement de fichiers statiques (GitHub Pages, Netlify, Vercel, etc.).

## Stack technique

- HTML / CSS / JavaScript (vanilla)
- Polices : Playfair Display & Source Sans 3 (Google Fonts)
- Généré via des scripts Node.js à partir de données extraites du blog WordPress original

## Licence

Les recettes et photos sont la propriété de leurs auteurs originaux. Ce projet a pour seul but la préservation et l'archivage du contenu du blog.
