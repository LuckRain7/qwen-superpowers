# Qwen Superpowers

**Langues:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

Un système complet de compétences pour Qwen Code qui impose des pratiques d'ingénierie logicielle professionnelles via des flux de travail obligatoires.

## Qu'est-ce que c'est ?

Qwen Superpowers transforme Qwen Code d'un assistant de codage polyvalent en un agent d'ingénierie discipliné qui suit automatiquement des flux de travail éprouvés. Il garantit :

- **Développement Piloté par les Tests** - Les tests passent toujours en premier
- **Planification Systématique** - Fini le codage improvisé
- **Débogage Basé sur des Preuves** - Analyse des causes profondes plutôt que deviner
- **Qualité du Code** - Révisions automatisées et refactorisation

## Installation

### Installation Rapide

```bash
# Cloner ce dépôt
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# Exécuter le script d'installation
./scripts/setup.sh
```

### Installation Manuelle

1. Copier le fichier `.qwen-plugin` à la racine de votre projet
2. Copier les répertoires `skills/`, `hooks/`, `commands/`, et `agents/` dans votre projet
3. Ajouter ce qui suit à vos paramètres Qwen Code ou `QWEN.md` :

```markdown
@load ./skills/using-superpowers.md
```

## Comment ça Fonctionne

### Flux de Travail Obligatoire

Lorsque vous demandez à Qwen Code d'implémenter une fonctionnalité ou de corriger un bug, il suit automatiquement cette séquence :

1. **Brainstorming（Remue-Méninges）** → Clarifie les exigences via un dialogue socratique
2. **Git Worktrees（Arbres de Travail Git）** → Crée un espace de travail isolé sur branche
3. **Planning（Planification）** → Divise le travail en tâches de 2-5 minutes avec étapes de vérification
4. **Subagent-Driven Development（Développement Piloté par Sous-Agents）** → Nouvel agent par tâche avec TDD
5. **Code Review（Révision de Code）** → Contrôles qualité automatisés
6. **Branch Finalization（Finalisation de Branche）** → Fusion propre ou création de PR

### Philosophie Centrale

- **Développement Piloté par les Tests** : Le cycle Red-Green-Refactor est obligatoire
- **Systématique Plutôt Qu'Ad-Hoc** : Le processus plutôt que deviner
- **Réduction de la Complexité** : La simplicité est l'objectif principal
- **Preuves Plutôt Qu'Affirmations** : Vérifier avant de déclarer le succès

## Compétences Disponibles

### Compétences de Flux de Travail Obligatoire（Déclenchement Automatique）

| Compétence | Objectif |
|-------|---------|
| `brainstorming` | Clarification des exigences et création de document de conception |
| `using-git-worktrees` | Configuration d'espace de travail isolé sur branche |
| `writing-plans` | Planification détaillée de l'implémentation |
| `subagent-driven-development` | Exécution parallèle de tâches avec de nouveaux agents |
| `test-driven-development` | Impose le cycle TDD |
| `requesting-code-review` | Contrôles qualité automatisés |
| `finishing-a-development-branch` | Finalisation propre de branche |

### Compétences de Support

| Compétence | Objectif |
|-------|---------|
| `systematic-debugging` | Analyse des causes profondes en 4 phases |
| `verification-before-completion` | Garantit que les correctifs fonctionnent réellement |
| `dispatching-parallel-agents` | Exécuter plusieurs agents simultanément |
| `receiving-code-review` | Gérer les retours de révision |
| `writing-skills` | Créer de nouvelles compétences |

## Utilisation

### Démarrer une Nouvelle Tâche

Décrivez simplement ce que vous voulez accomplir :

```
Je veux ajouter l'authentification des utilisateurs à mon application
```

Qwen Code automatiquement :
1. Posera des questions de clarification
2. Créera un document de conception
3. Configurer une branche isolée
4. Créera un plan détaillé
5. Exécutera le plan avec TDD

### Invocation Manuelle de Compétences

Vous pouvez aussi invoquer manuellement les compétences :

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## Architecture

```
qwen-superpowers/
├── .qwen-plugin          # Métadonnées du plugin
├── QWEN.md               # Injection de message système
├── skills/               # Définitions de compétences（Markdown）
│   ├── brainstorming/
│   ├── using-git-worktrees/
│   ├── writing-plans/
│   ├── subagent-driven-development/
│   ├── test-driven-development/
│   ├── requesting-code-review/
│   ├── finishing-a-development-branch/
│   ├── systematic-debugging/
│   ├── verification-before-completion/
│   ├── dispatching-parallel-agents/
│   ├── receiving-code-review/
│   ├── writing-skills/
│   └── using-superpowers/
├── hooks/                # Configurations de déclenchement automatique
├── commands/             # Commandes d'invocation manuelle
├── agents/               # Définitions de comportement des agents
├── scripts/              # Scripts d'installation et utilitaires
└── docs/                 # Documentation
```

## Créer des Compétences Personnalisées

Consultez `skills/writing-skills.md` pour un guide sur la création de vos propres compétences.

## Licence

MIT
