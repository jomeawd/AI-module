# TimeTravel Agency — Webapp Interactive

> Webapp pour une agence de voyage temporel fictive de luxe, créée avec IA générative.

## Stack Technique

- **React 19** + **Vite 7** — Framework & Build tool
- **Tailwind CSS 4** — Styling utility-first
- **Framer Motion** — Animations fluides et scroll-triggered
- **Lucide React** — Icônes modernes
- **Groq API** (optionnel) — LLM pour le chatbot IA avancé

## Features

### Page d'accueil immersive
- Hero section avec particules animées et fond étoilé
- Titre avec effet shimmer doré
- Statistiques de l'agence
- Navigation sticky avec effet glass-morphism

### Galerie des 3 Destinations Temporelles
- **Paris 1889** — Belle Époque, Tour Eiffel, Exposition Universelle
- **Crétacé -65M** — Dinosaures, nature préhistorique
- **Florence 1504** — Renaissance, Michel-Ange, Léonard de Vinci
- Cards interactives avec hover effects
- Modal détaillée avec prix, durée, points forts

### Agent Conversationnel IA
- Chatbot intégré en widget flottant (bas droite)
- Réponses intelligentes sur les destinations, prix, sécurité, réservations
- Personnalité : guide temporel professionnel et chaleureux
- **Mode local** : fonctionne sans API (keyword matching intelligent)
- **Mode avancé** : connexion optionnelle à l'API Groq (LLama 3.1) pour des réponses IA

### Quiz de Recommandation Personnalisé
- 4 questions interactives
- Algorithme de scoring par destination
- Résultat personnalisé avec description et suggestion
- Animations fluides entre les étapes

### Animations & UX
- Fade-in progressif des sections au scroll (Framer Motion)
- Hover effects sur les cards de destinations
- Micro-interactions sur les boutons
- Transitions douces dans le quiz et le chatbot
- Design responsive mobile-first
- Thème sombre premium avec accents dorés

## IA Utilisées

| Outil | Usage |
|-------|-------|
| **Claude Code (Claude Opus 4.6)** | Génération du code complet de la webapp |
| **Groq API (LLama 3.1)** | Chatbot conversationnel avancé (optionnel) |
| **Système local (keyword matching)** | Chatbot fallback sans API |

## Prompts Documentés

### Prompt principal (Claude Code)
> "Développer une webapp TimeTravel Agency avec React + Vite + Tailwind, thème sombre luxueux avec accents dorés, hero section animée, 3 destinations (Paris 1889, Crétacé -65M, Florence 1504) en cards interactives, chatbot IA intégré, quiz de recommandation, animations Framer Motion, responsive."

### Prompt système du Chatbot
> Le chatbot a un rôle de "guide temporel de luxe", avec un ton professionnel et chaleureux, passionné d'histoire, expert des 3 destinations avec connaissance des prix, durées, points forts et FAQ (sécurité, bagages, annulation).

## Installation

```bash
# Cloner le projet
git clone <repo-url>
cd timetravel-agency

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build
```

## Configuration (optionnel)

Pour activer le chatbot IA avancé avec Groq :
1. Créer un compte sur [console.groq.com](https://console.groq.com)
2. Générer une clé API
3. Cliquer sur l'icône ⚙️ dans le chatbot et entrer la clé

> Sans clé API, le chatbot fonctionne en mode local avec des réponses prédéfinies.

## Déploiement

```bash
npm run build
# Le dossier `dist/` est prêt à être déployé sur Vercel, Netlify, etc.
```

### Vercel (recommandé)
```bash
npx vercel
```

### Netlify
Glisser-déposer le dossier `dist/` sur app.netlify.com

## Crédits

- **Images** : Unsplash (libre de droits)
- **Icônes** : Lucide React (MIT)
- **Animations** : Framer Motion (MIT)
- **IA Générative** : Claude Code par Anthropic
- **Polices** : Playfair Display & Inter (Google Fonts)

## Réflexion sur le processus

Ce projet a été développé en utilisant le "vibe coding" avec Claude Code comme outil principal de génération. L'approche a consisté à :

1. **Définir l'architecture** : React + Tailwind + Framer Motion pour un stack moderne
2. **Générer composant par composant** : Hero, Destinations, Quiz, Chatbot, About, Footer
3. **Itérer sur le design** : thème sombre luxueux, accents dorés, animations subtiles
4. **Intégrer l'IA** : chatbot avec double mode (local + API), quiz de recommandation

L'IA a permis de gagner un temps considérable sur le scaffolding, le design system et l'intégration des animations, tout en maintenant une architecture propre et maintenable.

## Licence

Projet pédagogique — M1/M2 Digital & IA
