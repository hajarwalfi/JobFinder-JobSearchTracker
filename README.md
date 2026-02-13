<div align="center">

<br />

<img src="https://api.iconify.design/mdi/briefcase-search-outline.svg?color=%23FF9653&width=42&height=42" alt="logo" />

<img src="https://readme-typing-svg.demolab.com?font=Quicksand&weight=700&size=38&duration=3000&pause=1000&color=FF9653&center=true&vCenter=true&width=320&height=50&lines=JobFinder" alt="JobFinder" />

<p>
  <img src="https://readme-typing-svg.demolab.com?font=Quicksand&weight=500&size=16&duration=4000&pause=2000&color=C4B5FD&center=true&vCenter=true&width=520&lines=Rechercher+%E2%80%A2+Sauvegarder+%E2%80%A2+Postuler+%E2%80%A2+R%C3%A9ussir" alt="Tagline" />
</p>

<br />

<img src="https://img.shields.io/badge/Angular-21-%23fda4af?style=flat-square&logo=angular&logoColor=white&labelColor=fda4af&color=fecdd3" />
&nbsp;
<img src="https://img.shields.io/badge/NgRx-21-%23c4b5fd?style=flat-square&logo=ngrx&logoColor=white&labelColor=c4b5fd&color=ddd6fe" />
&nbsp;
<img src="https://img.shields.io/badge/Tailwind-4-%2299f6e4?style=flat-square&logo=tailwindcss&logoColor=white&labelColor=99f6e4&color=a7f3d0" />
&nbsp;
<img src="https://img.shields.io/badge/TypeScript-5.9-%2393c5fd?style=flat-square&logo=typescript&logoColor=white&labelColor=93c5fd&color=bfdbfe" />
&nbsp;
<img src="https://img.shields.io/badge/Adzuna-%20API-%23fdba74?style=flat-square&logoColor=white&labelColor=fdba74&color=fed7aa" />

<br /><br />

<em>
Une application web élégante pour rechercher des offres d'emploi,<br />
sauvegarder ses favoris et suivre ses candidatures.
</em>

<br /><br />

<a href="#-démarrage-rapide">
<img src="https://img.shields.io/badge/D%C3%A9marrage-rapide-fecdd3?style=for-the-badge&labelColor=fff1f2" alt="start" />
</a>
&nbsp;
<a href="#-fonctionnalités">
<img src="https://img.shields.io/badge/Fonctionnalit%C3%A9s-apercu-ddd6fe?style=for-the-badge&labelColor=f5f3ff" alt="features" />
</a>
&nbsp;
<a href="#-architecture">
<img src="https://img.shields.io/badge/Architecture-projet-a7f3d0?style=for-the-badge&labelColor=f0fdf4" alt="archi" />
</a>

<br /><br />

---

</div>

<br />

## <img src="https://api.iconify.design/mdi/information-outline.svg?color=%23f9a8d4&width=28&height=28" alt="about" /> À propos

> **JobFinder** est une application **Angular** qui centralise la recherche d'emploi. Elle agrège les offres de l'**API Adzuna** en temps réel, permet de sauvegarder ses favoris grâce à **NgRx**, et offre un suivi complet des candidatures — le tout dans une interface douce et intuitive.

<br />

## <img src="https://api.iconify.design/mdi/puzzle-outline.svg?color=%23c4b5fd&width=28&height=28" alt="features" /> Fonctionnalités

<table>
<tr>
<td align="center" width="33%">

<br />

<img src="https://api.iconify.design/mdi/magnify.svg?color=%23f472b6&width=36&height=36" alt="search" />

**Recherche intelligente**

Recherchez par mot-clé et localisation.
Résultats en temps réel via l'API Adzuna
avec filtrage et pagination.

<br />

</td>
<td align="center" width="33%">

<br />

<img src="https://api.iconify.design/mdi/shield-lock-outline.svg?color=%23a78bfa&width=36&height=36" alt="auth" />

**Authentification**

Inscription & connexion sécurisées.
Protection des routes sensibles
avec Auth Guard.

<br />

</td>
<td align="center" width="33%">

<br />

<img src="https://api.iconify.design/mdi/heart-outline.svg?color=%23fb7185&width=36&height=36" alt="favorites" />

**Favoris**

Sauvegardez vos offres préférées
en un clic. Gestion d'état réactive
avec NgRx Store.

<br />

</td>
</tr>
<tr>
<td align="center" width="33%">

<br />

<img src="https://api.iconify.design/mdi/clipboard-text-outline.svg?color=%2393c5fd&width=36&height=36" alt="applications" />

**Suivi de candidatures**

Suivez chaque candidature avec
des statuts clairs : en attente,
entretien, acceptée ou refusée.

<br />

</td>
<td align="center" width="33%">

<br />

<img src="https://api.iconify.design/mdi/account-circle-outline.svg?color=%2367e8f9&width=36&height=36" alt="profile" />

**Profil utilisateur**

Consultez et modifiez votre profil.
Gérez votre compte depuis
un espace personnalisé.

<br />

</td>
<td align="center" width="33%">

<br />

<img src="https://api.iconify.design/mdi/home-variant-outline.svg?color=%2386efac&width=36&height=36" alt="home" />

**Page d'accueil**

Hero section élégante, chiffres
clés animés, témoignages
et call-to-action.

<br />

</td>
</tr>
</table>

<br />

## <img src="https://api.iconify.design/mdi/folder-network-outline.svg?color=%2386efac&width=28&height=28" alt="architecture" /> Architecture

Le projet suit une architecture **modulaire** avec lazy loading et séparation des responsabilités :

```
src/app/
│
├── core/                              ← Services singleton & guards
│   ├── guards/
│   │   └── auth-guard.ts                Route protection
│   ├── interceptors/
│   │   └── error.interceptor.ts         HTTP error handling
│   └── services/
│       ├── auth.ts                      Login, Register, CRUD
│       ├── job-search.ts                Adzuna API integration
│       ├── application.ts               Applications management
│       └── favorites.ts                 Favorites management
│
├── features/                            ← Modules fonctionnels
│   ├── auth/                            Login & Signup pages
│   │   ├── auth-header/
│   │   ├── login-form/ + login-page/
│   │   └── signup-form/ + signup-page/
│   │
│   ├── home/                            Landing page
│   │   ├── hero-section/
│   │   ├── features-section/
│   │   └── home-page/
│   │
│   ├── search/                          Job search
│   │   ├── search-bar/
│   │   ├── job-card/
│   │   ├── job-list-page/
│   │   └── job-offers-section/
│   │
│   ├── favorites/                       Saved jobs
│   │   ├── favorite-card/
│   │   ├── favorites-page/
│   │   └── favorites-stats/
│   │
│   ├── applications/                    Application tracker
│   │   ├── application-card/
│   │   ├── applications-page/
│   │   └── applications-stats/
│   │
│   └── profile/                         User profile
│       ├── profile-page/
│       ├── profile-edit-form/
│       └── profile-actions/
│
├── shared/                              ← Composants réutilisables
│   └── components/
│       ├── navbar/
│       └── footer/
│
├── store/                               ← État global NgRx
│   └── favorites/
│       ├── favorites.actions.ts
│       ├── favorites.reducer.ts
│       ├── favorites.effects.ts
│       └── favorites.selectors.ts
│
├── app.ts                              Composant racine
├── app.html                            Template racine
├── app.routes.ts                       Routes (lazy-loaded)
└── app.config.ts                       Providers & config
```

<br />

## <img src="https://api.iconify.design/mdi/package-variant-closed.svg?color=%2393c5fd&width=28&height=28" alt="tech" /> Technologies

<div align="center">
<table>
<tr>
<td align="center" width="140">
<img src="https://img.shields.io/badge/Angular-21-fecdd3?style=for-the-badge&logo=angular&logoColor=e11d48&labelColor=fff1f2" /><br />
<sub>Framework SPA</sub>
</td>
<td align="center" width="140">
<img src="https://img.shields.io/badge/NgRx-21-e9d5ff?style=for-the-badge&logo=ngrx&logoColor=7c3aed&labelColor=faf5ff" /><br />
<sub>State Management</sub>
</td>
<td align="center" width="140">
<img src="https://img.shields.io/badge/Tailwind-4-a7f3d0?style=for-the-badge&logo=tailwindcss&logoColor=059669&labelColor=f0fdf4" /><br />
<sub>Utility-first CSS</sub>
</td>
<td align="center" width="140">
<img src="https://img.shields.io/badge/TypeScript-5.9-bfdbfe?style=for-the-badge&logo=typescript&logoColor=2563eb&labelColor=eff6ff" /><br />
<sub>Typage statique</sub>
</td>
</tr>
<tr>
<td align="center" width="140">
<img src="https://img.shields.io/badge/Adzuna-API-fed7aa?style=for-the-badge&logoColor=ea580c&labelColor=fff7ed" /><br />
<sub>Offres d'emploi</sub>
</td>
<td align="center" width="140">
<img src="https://img.shields.io/badge/JSON_Server-1.0-e2e8f0?style=for-the-badge&logo=json&logoColor=475569&labelColor=f8fafc" /><br />
<sub>Mock REST API</sub>
</td>
<td align="center" width="140">
<img src="https://img.shields.io/badge/RxJS-7.8-fbcfe8?style=for-the-badge&logo=reactivex&logoColor=db2777&labelColor=fdf2f8" /><br />
<sub>Programmation réactive</sub>
</td>
<td align="center" width="140">
<img src="https://img.shields.io/badge/Vitest-4.0-d9f99d?style=for-the-badge&logo=vitest&logoColor=65a30d&labelColor=f7fee7" /><br />
<sub>Framework de tests</sub>
</td>
</tr>
</table>
</div>

<br />

## <img src="https://api.iconify.design/mdi/rocket-launch-outline.svg?color=%23fda4af&width=28&height=28" alt="start" /> Démarrage rapide

#### Prérequis

```
Node.js  ≥ 18       npm  ≥ 9       Angular CLI  ≥ 21
```

#### Installation

```bash
# Cloner le repo
git clone https://github.com/hajarwalfi/JobFinder-JobSearchTracker.git

# Aller dans le dossier
cd JobFinder-JobSearchTracker/JobFinder

# Installer les dépendances
npm install
```

#### Lancer l'application

```bash
# Terminal 1 — Mock API
npm run jsonServer

# Terminal 2 — App Angular
npm start
```

<div align="center">

| | Service | URL |
|:-:|:-:|:-:|
| <img src="https://api.iconify.design/mdi/monitor.svg?color=%23f9a8d4&width=18&height=18" alt="app" /> | Application | [`localhost:4200`](http://localhost:4200) |
| <img src="https://api.iconify.design/mdi/database-outline.svg?color=%23c4b5fd&width=18&height=18" alt="db" /> | JSON Server | [`localhost:3000`](http://localhost:3000) |

</div>

<br />

## <img src="https://api.iconify.design/mdi/map-marker-path.svg?color=%23fdba74&width=28&height=28" alt="routes" /> Routes

<div align="center">

| Route | Page | Protégée |
|:-:|:-:|:-:|
| `/home` | <img src="https://api.iconify.design/mdi/home-variant-outline.svg?color=%2386efac&width=18&height=18" alt="home" /> Accueil | |
| `/login` | <img src="https://api.iconify.design/mdi/key-outline.svg?color=%23fdba74&width=18&height=18" alt="login" /> Connexion | |
| `/signup` | <img src="https://api.iconify.design/mdi/account-plus-outline.svg?color=%23c4b5fd&width=18&height=18" alt="signup" /> Inscription | |
| `/search` | <img src="https://api.iconify.design/mdi/magnify.svg?color=%23f472b6&width=18&height=18" alt="search" /> Recherche | |
| `/favorites` | <img src="https://api.iconify.design/mdi/heart-outline.svg?color=%23fb7185&width=18&height=18" alt="fav" /> Favoris | <img src="https://api.iconify.design/mdi/lock-outline.svg?color=%23fda4af&width=16&height=16" alt="lock" /> |
| `/applications` | <img src="https://api.iconify.design/mdi/clipboard-text-outline.svg?color=%2393c5fd&width=18&height=18" alt="apps" /> Candidatures | <img src="https://api.iconify.design/mdi/lock-outline.svg?color=%23fda4af&width=16&height=16" alt="lock" /> |
| `/profile` | <img src="https://api.iconify.design/mdi/account-circle-outline.svg?color=%2367e8f9&width=18&height=18" alt="profile" /> Profil | <img src="https://api.iconify.design/mdi/lock-outline.svg?color=%23fda4af&width=16&height=16" alt="lock" /> |

</div>

<br />

## <img src="https://api.iconify.design/mdi/api.svg?color=%23a5b4fc&width=28&height=28" alt="api" /> API

<div align="center">

| Paramètre | Description |
|:-:|:--|
| `what` | Mot-clé de recherche |
| `where` | Localisation |
| `results_per_page` | Nombre de résultats |
| `sort_by` | Tri (par date) |

</div>

> **Endpoint** : `https://api.adzuna.com/v1/api/jobs/gb/search/{page}`

<br />

---

<div align="center">

<br />

<img src="https://readme-typing-svg.demolab.com?font=Quicksand&weight=600&size=14&duration=4000&pause=3000&color=C4B5FD&center=true&vCenter=true&width=350&lines=Made+with+%F0%9F%A9%B7+by+Hajar+Walfi" alt="Made with love" />

<br />

[![GitHub](https://img.shields.io/badge/hajarwalfi-%23fecdd3?style=flat-square&logo=github&logoColor=374151)](https://github.com/hajarwalfi)

<br /><br />

</div>
