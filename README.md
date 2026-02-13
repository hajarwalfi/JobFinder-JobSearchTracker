<div align="center">

# 🔥 JobFinder — Job Search Tracker

<img src="https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
<img src="https://img.shields.io/badge/NgRx-21-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Adzuna_API-FF6B00?style=for-the-badge&logo=api&logoColor=white" />

<br />

**✨ Une application web moderne pour rechercher des offres d'emploi, sauvegarder ses favoris et suivre ses candidatures — le tout en un seul endroit.**

<br />

[🚀 Démarrage rapide](#-démarrage-rapide) • [📸 Aperçu](#-aperçu) • [🧩 Fonctionnalités](#-fonctionnalités) • [🏗️ Architecture](#️-architecture) • [📦 Technologies](#-technologies)

---

</div>

## 📸 Aperçu

| Page d'accueil | Recherche d'emploi | Suivi des candidatures |
|:-:|:-:|:-:|
| 🏠 Hero section animée avec statistiques clés | 🔍 Recherche par mot-clé et localisation | 📋 Dashboard avec statuts de candidatures |

<br />

## 🧩 Fonctionnalités

<table>
<tr>
<td width="50%">

### 🔍 Recherche d'emploi
- Recherche par **mot-clé** et **localisation**
- Données en temps réel via l'**API Adzuna**
- Filtrage intelligent côté front-end
- Pagination des résultats
- Affichage des salaires et dates de publication

</td>
<td width="50%">

### 🔐 Authentification
- Inscription et connexion sécurisées
- Gestion de session via **localStorage**
- Protection des routes avec **Auth Guard**
- Interception des erreurs HTTP globale
- Suppression de compte avec nettoyage des données

</td>
</tr>
<tr>
<td width="50%">

### ❤️ Gestion des Favoris
- Ajout/suppression d'offres en **un clic**
- État géré par **NgRx Store** (actions, reducers, effects)
- Persistance via **JSON Server**
- Page dédiée avec statistiques visuelles

</td>
<td width="50%">

### 📊 Suivi de Candidatures
- Création et suivi de candidatures
- Statuts : `En attente` `Entretien` `Acceptée` `Refusée`
- Cards détaillées par candidature
- Statistiques globales en temps réel

</td>
</tr>
<tr>
<td width="50%">

### 👤 Profil Utilisateur
- Consultation et modification du profil
- Formulaire d'édition avec validation
- Actions rapides (modifier, supprimer le compte)

</td>
<td width="50%">

### 🏠 Page d'Accueil
- **Hero section** avec illustration SVG
- Section **chiffres clés** animée
- **6 avantages** détaillés avec icônes
- **Témoignages** d'utilisateurs
- CTA avec dégradés et hover effects

</td>
</tr>
</table>

<br />

## 🏗️ Architecture

Le projet suit une **architecture modulaire Angular** avec une séparation claire des responsabilités :

```
JobFinder/src/app/
│
├── 📁 core/                        # Couche noyau (singleton services)
│   ├── 📁 guards/
│   │   └── auth-guard.ts           # Protection des routes authentifiées
│   ├── 📁 interceptors/
│   │   └── error.interceptor.ts    # Interception globale des erreurs HTTP
│   └── 📁 services/
│       ├── auth.ts                 # Service d'authentification (login, register, CRUD)
│       ├── job-search.ts           # Service de recherche d'emploi (API Adzuna)
│       ├── application.ts          # Service de gestion des candidatures
│       └── favorites.ts            # Service de gestion des favoris
│
├── 📁 features/                    # Modules fonctionnels (lazy-loaded)
│   ├── 📁 auth/                    # 🔐 Authentification
│   │   ├── auth-header/            #    En-tête personnalisé auth
│   │   ├── login-form/             #    Formulaire de connexion
│   │   ├── login-page/             #    Page de connexion
│   │   ├── signup-form/            #    Formulaire d'inscription
│   │   └── signup-page/            #    Page d'inscription
│   │
│   ├── 📁 home/                    # 🏠 Page d'accueil
│   │   ├── hero-section/           #    Section héro avec CTA
│   │   ├── features-section/       #    Présentation des fonctionnalités
│   │   └── home-page/              #    Page principale (composition)
│   │
│   ├── 📁 search/                  # 🔍 Recherche d'emploi
│   │   ├── search-bar/             #    Barre de recherche (keyword + location)
│   │   ├── job-card/               #    Carte d'offre d'emploi
│   │   ├── job-list-page/          #    Page de listing des offres
│   │   └── job-offers-section/     #    Section résultats
│   │
│   ├── 📁 favorites/               # ❤️ Favoris
│   │   ├── favorite-card/          #    Carte de favori
│   │   ├── favorites-page/         #    Page des favoris
│   │   └── favorites-stats/        #    Statistiques des favoris
│   │
│   ├── 📁 applications/            # 📊 Candidatures
│   │   ├── application-card/       #    Carte de candidature
│   │   ├── applications-page/      #    Page des candidatures
│   │   └── applications-stats/     #    Statistiques des candidatures
│   │
│   └── 📁 profile/                 # 👤 Profil
│       ├── profile-page/           #    Page du profil
│       ├── profile-edit-form/      #    Formulaire d'édition
│       └── profile-actions/        #    Actions du profil
│
├── 📁 shared/                      # Composants réutilisables
│   └── 📁 components/
│       ├── navbar/                 #    Barre de navigation
│       └── footer/                 #    Pied de page
│
├── 📁 store/                       # 🗃️ État global (NgRx)
│   └── 📁 favorites/
│       ├── favorites.actions.ts    #    Actions NgRx
│       ├── favorites.reducer.ts    #    Reducer NgRx
│       ├── favorites.effects.ts    #    Effects NgRx (side effects)
│       └── favorites.selectors.ts  #    Selectors NgRx
│
├── app.ts                          # Composant racine
├── app.html                        # Template racine
├── app.routes.ts                   # Configuration du routing
└── app.config.ts                   # Configuration de l'application
```

<br />

## 📦 Technologies

<div align="center">

| Catégorie | Technologie | Version | Rôle |
|:-:|:-:|:-:|:-:|
| 🅰️ **Framework** | Angular | `21.1.0` | Framework SPA principal |
| 🎨 **Styling** | Tailwind CSS | `4.1.18` | Framework CSS utility-first |
| 🗃️ **State** | NgRx Store | `21.0.1` | Gestion d'état réactive |
| ⚡ **Side Effects** | NgRx Effects | `21.0.1` | Gestion des effets de bord |
| 🔧 **Dev Tools** | NgRx DevTools | `21.0.1` | Debugging du store |
| 📡 **API** | Adzuna API | `v1` | Source d'offres d'emploi |
| 🗄️ **Mock Backend** | JSON Server | `1.0.0-beta` | API REST locale pour le dev |
| 🔀 **Reactive** | RxJS | `7.8.0` | Programmation réactive |
| 📝 **Language** | TypeScript | `5.9.2` | Typage statique |
| 🧪 **Testing** | Vitest | `4.0.8` | Framework de tests |

</div>

<br />

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** `v18+` — [Télécharger](https://nodejs.org/)
- **npm** `v9+`
- **Angular CLI** `v21+`

### Installation

```bash
# 1️⃣ Cloner le repository
git clone https://github.com/hajarwalfi/JobFinder-JobSearchTracker.git
cd JobFinder-JobSearchTracker/JobFinder

# 2️⃣ Installer les dépendances
npm install

# 3️⃣ Lancer le mock backend (JSON Server)
npm run jsonServer

# 4️⃣ Lancer l'application Angular (dans un autre terminal)
npm start
```

### 🌐 Accès

| Service | URL |
|:-:|:-:|
| 🖥️ Application | [`http://localhost:4200`](http://localhost:4200) |
| 🗄️ JSON Server API | [`http://localhost:3000`](http://localhost:3000) |

<br />

## 🗺️ Routes de l'application

| Route | Page | Auth requise |
|:-:|:-:|:-:|
| `/home` | 🏠 Page d'accueil | ❌ |
| `/login` | 🔑 Connexion | ❌ |
| `/signup` | 📝 Inscription | ❌ |
| `/search` | 🔍 Recherche d'emploi | ❌ |
| `/favorites` | ❤️ Favoris | ✅ |
| `/applications` | 📊 Candidatures | ✅ |
| `/profile` | 👤 Profil | ✅ |

<br />

## 🔌 API Adzuna

L'application utilise l'**API Adzuna** pour récupérer les offres d'emploi en temps réel.

```
🌍 Base URL : https://api.adzuna.com/v1/api/jobs
📍 Pays par défaut : gb (United Kingdom)
🔎 Endpoint : /gb/search/{page}
```

**Paramètres supportés :**
- `what` — Mot-clé de recherche
- `where` — Localisation
- `results_per_page` — Nombre de résultats par page
- `sort_by` — Tri par date

<br />

## 🗄️ Structure des données (JSON Server)

```json
{
  "users": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "password": "string"
    }
  ],
  "favoritesOffers": [
    {
      "id": "string",
      "userId": "string",
      "jobId": "string",
      "title": "string",
      "company": "string",
      "location": "string"
    }
  ],
  "applications": [
    {
      "id": "string",
      "userId": "string",
      "jobTitle": "string",
      "company": "string",
      "status": "pending | interview | accepted | rejected"
    }
  ]
}
```

<br />

## 📐 Design System

L'interface utilise un design system moderne avec :

- 🎨 **Couleur principale** : `#FF9653` → `#FFBC7D` (dégradé orange chaleureux)
- 🌑 **Fond sombre** : `slate-900` → `slate-800`
- 📐 **Bordures** : `rounded-2xl` avec hover effects
- ✨ **Animations** : Transitions fluides `300ms`, hover scale, shadow effects
- 🖋️ **Typographie** : Système, avec hiérarchie `font-bold` / `font-semibold`

<br />

---

<div align="center">

### 🧑‍💻 Développé par

**Hajar Walfi**

<br />

<img src="https://img.shields.io/badge/GitHub-hajarwalfi-181717?style=for-the-badge&logo=github" />

<br /><br />

⭐ *Si ce projet vous a plu, n'hésitez pas à lui donner une étoile !* ⭐

</div>
