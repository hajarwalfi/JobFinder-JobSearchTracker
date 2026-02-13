<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Righteous&size=45&pause=1000&color=6366F1&center=true&vCenter=true&width=600&height=70&lines=💼+JobFinder;Trouvez+le+job+de+vos+rêves+✨" alt="Typing SVG" />

<br/>

<img src="https://img.shields.io/badge/Angular-21.1-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
<img src="https://img.shields.io/badge/NgRx-21-BA2BD2?style=for-the-badge&logo=ngrx&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/JSON_Server-1.0-000000?style=for-the-badge&logo=json&logoColor=white"/>
<img src="https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white"/>

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=Inter&size=18&pause=1000&color=64748B&center=true&vCenter=true&width=700&height=30&lines=🔍+Recherche+d'emplois+en+temps+réel+via+API+Adzuna;⭐+Sauvegardez+vos+offres+favorites+avec+NgRx;📋+Suivez+vos+candidatures+avec+statuts+et+notes;🔐+Authentification+sécurisée+avec+localStorage" alt="Features" />

<br/>

---

**[✨ Fonctionnalites](#-fonctionnalites)** · **[🚀 Installation](#-installation)** · **[🏗️ Architecture](#️-architecture)** · **[💡 Technologies](#-technologies)** · **[🗺️ Routes](#️-routes)**

---

</div>

<br/>

## ✨ Fonctionnalites

<table>
<tr>
<td width="50%">

### 🔐 Authentification
> Inscription, connexion et deconnexion securisees avec stockage **localStorage**. Verification d'email unique et validation des formulaires.

### 🔍 Recherche d'emplois
> Recherche par **mots-cles** et **localisation** via l'API Adzuna. Resultats filtres par titre et tries par date de publication.

### ⭐ Favoris (NgRx)
> Ajout et suppression de favoris avec gestion d'etat globale **NgRx Store**. Persistance dans JSON Server.

</td>
<td width="50%">

### 📋 Suivi des candidatures
> Suivez vos candidatures avec statuts (**en attente**, **accepte**, **refuse**), notes personnelles et suppression.

### 👤 Profil utilisateur
> Modification des informations personnelles (nom, prenom, email, mot de passe) et suppression du compte.

### 📱 Responsive design
> Interface parfaitement adaptee aux ecrans **mobile**, **tablette** et **desktop** grace a Tailwind CSS.

</td>
</tr>
</table>

<br/>

## 🚀 Installation

<div align="center">

| Etape | Commande | Description |
|:---:|---|---|
| **1** | `git clone https://github.com/votre-utilisateur/JobFinder.git` | 📥 Cloner le depot |
| **2** | `cd JobFinder` | 📂 Acceder au projet |
| **3** | `npm install` | 📦 Installer les dependances |
| **4** | `npx json-server db.json` | 🗄️ Lancer le backend simule |
| **5** | `ng serve` *(autre terminal)* | 🌐 Lancer l'application |

</div>

<br/>

> [!NOTE]
> 🗄️ **JSON Server** → `http://localhost:3000`
>
> 🌐 **Angular** → `http://localhost:4200`

> [!IMPORTANT]
> Assurez-vous d'avoir **Node.js** >= 18.x et **npm** >= 9.x installes sur votre machine.

<br/>

## 🏗️ Architecture

```
📁 src/app/
│
├── 🛡️ core/                          # Services, guards, intercepteurs
│   ├── guards/
│   │   └── auth-guard.ts             # Protection des routes (canActivate)
│   ├── interceptors/
│   └── services/
│       ├── auth.ts                   # 🔐 Authentification (register, login, logout)
│       ├── job-search.ts             # 🔍 Integration API Adzuna
│       ├── favorites.ts              # ⭐ CRUD favoris (JSON Server)
│       └── application.ts            # 📋 CRUD candidatures (JSON Server)
│
├── 📄 features/                       # Pages de l'application
│   ├── 🏠 home/
│   │   ├── home-page/                # Composant parent
│   │   ├── hero-section/             # Section hero avec CTA
│   │   └── features-section/         # Grille des fonctionnalites
│   ├── 🔐 auth/
│   │   ├── signup-page/              # Page inscription (parent)
│   │   ├── signup-form/              # Formulaire inscription (Reactive Forms)
│   │   ├── login-page/               # Page connexion (parent)
│   │   └── login-form/               # Formulaire connexion
│   ├── 🔍 search/
│   │   ├── job-list-page/            # Liste paginee (parent)
│   │   ├── search-bar/               # Barre de recherche
│   │   └── job-card/                 # Carte d'une offre
│   ├── ⭐ favorites/
│   │   ├── favorites-page/           # Page favoris (NgRx Store)
│   │   └── favorite-card/            # Carte d'un favori
│   ├── 📋 applications/
│   │   ├── applications-page/        # Page candidatures (parent)
│   │   └── application-card/         # Carte avec statut + notes
│   └── 👤 profile/
│       ├── profile-page/             # Page profil (parent)
│       └── profile-edit-form/        # Formulaire de modification
│
├── 🧩 shared/                         # Composants partages
│   └── components/
│       ├── navbar/                    # Barre de navigation responsive
│       └── footer/                    # Pied de page
│
├── 🗃️ store/                          # NgRx State Management
│   └── favorites/
│       ├── favorites.actions.ts       # Actions (load, add, remove)
│       ├── favorites.reducer.ts       # Reducer + etat initial
│       ├── favorites.effects.ts       # Effects (appels HTTP)
│       └── favorites.selectors.ts     # Selectors
│
├── app.ts                             # Composant racine
├── app.html                           # Template (navbar + router + footer)
├── app.config.ts                      # Configuration globale
└── app.routes.ts                      # Routes lazy loading + AuthGuard
```

<br/>

## 💡 Technologies

<div align="center">
<table>
<tr>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=angular" width="48" height="48" alt="Angular" />
<br/><b>Angular 21</b>
<br/><sub>Framework</sub>
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript" />
<br/><b>TypeScript</b>
<br/><sub>Typage statique</sub>
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
<br/><b>Tailwind 4</b>
<br/><sub>CSS utilitaire</sub>
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=redux" width="48" height="48" alt="NgRx" />
<br/><b>NgRx 21</b>
<br/><sub>State management</sub>
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node" />
<br/><b>JSON Server</b>
<br/><sub>Backend simule</sub>
</td>
</tr>
</table>
</div>

<br/>

## 🗺️ Routes

<div align="center">

| | Route | Page | Acces |
|:---:|---|---|:---:|
| 🏠 | `/home` | Page d'accueil | 🌍 Publique |
| 🔍 | `/search` | Recherche d'emplois | 🌍 Publique |
| 📝 | `/signup` | Inscription | 🌍 Publique |
| 🔑 | `/login` | Connexion | 🌍 Publique |
| ⭐ | `/favorites` | Mes favoris | 🔒 AuthGuard |
| 📋 | `/applications` | Mes candidatures | 🔒 AuthGuard |
| 👤 | `/profile` | Mon profil | 🔒 AuthGuard |

</div>

<br/>

## 🗄️ Base de donnees

Le fichier `db.json` simule un backend REST API avec **3 tables** :

```json
{
  "users": [],
  "favoritesOffers": [],
  "applications": []
}
```

<div align="center">

| Table | Contenu | Champs principaux |
|:---:|---|---|
| 🧑‍💻 `users` | Utilisateurs inscrits | id, firstName, lastName, email, password |
| ⭐ `favoritesOffers` | Offres sauvegardees | id, userId, offerId, title, company, location |
| 📋 `applications` | Candidatures suivies | id, userId, offerId, title, status, notes, dateAdded |

</div>

<br/>

## 🔄 NgRx — Gestion d'etat

> La gestion des **favoris** utilise NgRx pour un flux de donnees unidirectionnel et predictible.

```
   ┌──────────────┐         dispatch          ┌────────────┐
   │              │ ────────────────────────► │            │
   │  Components  │                           │  Actions   │
   │    (UI)      │                           │            │
   └──────┬───────┘                           └─────┬──────┘
          │                                         │
          │  select                                 │  trigger
          │                                         ▼
   ┌──────┴───────┐                           ┌────────────┐
   │              │                           │            │
   │  Selectors   │                           │  Effects   │
   │              │                           │ (HTTP API) │
   └──────┬───────┘                           └─────┬──────┘
          │                                         │
          │  read                                   │  success / failure
          │                                         ▼
          │                                   ┌────────────┐
          │                                   │            │
          └────────────────────────────────── │  Reducer   │
                                              │  (Store)   │
                                              └────────────┘
```

<div align="center">

| Action | Description |
|---|---|
| `loadFavorites` | 📥 Charger les favoris depuis JSON Server |
| `addFavorite` | ⭐ Ajouter une offre aux favoris |
| `removeFavorite` | ❌ Supprimer un favori |

</div>

<br/>

## ⚡ Fonctionnalites techniques

<div align="center">

| | Fonctionnalite | Description |
|:---:|---|---|
| 🧩 | **Standalone Components** | Architecture sans NgModules |
| 📡 | **Signals** | `input()`, `output()` pour la communication parent/enfant |
| 📝 | **Reactive Forms** | Validation des formulaires avec messages d'erreur |
| 🚀 | **Lazy Loading** | Toutes les routes chargees a la demande |
| 🛡️ | **AuthGuard** | Protection des routes avec `canActivate` fonctionnel |
| 🔄 | **New Control Flow** | Syntaxe `@if`, `@for`, `@else` (Angular 17+) |
| 🔧 | **Redux DevTools** | Debogage de l'etat NgRx en temps reel |

</div>

<br/>

---

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Righteous&size=25&pause=1000&color=6366F1&center=true&vCenter=true&width=500&height=40&lines=Développé+avec+💜+par+Hajar+Walfi" alt="Author" />

<br/>

*Projet realise dans le cadre d'une formation en developpement web*

<br/>

<img src="https://img.shields.io/badge/Made_with-Angular_21-DD0031?style=flat-square&logo=angular&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled_with-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/State-NgRx_Store-BA2BD2?style=flat-square&logo=ngrx&logoColor=white"/>

</div>
