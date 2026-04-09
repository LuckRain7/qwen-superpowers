# Qwen Superpowers

**Sprachen:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

Ein umfassendes Skill-System für Qwen Code, das professionelle Software-Engineering-Praktiken durch obligatorische Workflows durchsetzt.

## Was ist das?

Qwen Superpowers verwandelt Qwen Code von einem allgemeinen Coding-Assistenten in einen disziplinierten Engineering-Agenten, der automatisch bewährte Workflows befolgt. Es stellt sicher:

- **Testgetriebene Entwicklung** - Tests kommen immer zuerst
- **Systematische Planung** - Kein ad-hoc Coding mehr
- **Evidenzbasiertes Debugging** - Ursachenanalyse statt Raten
- **Codequalität** - Automatisierte Reviews und Refactoring

## Installation

### Schnellinstallation

```bash
# Dieses Repository klonen
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# Setup-Skript ausführen
./scripts/setup.sh
```

### Manuelle Installation

1. Die `.qwen-plugin`-Datei in den Projektstamm kopieren
2. Die Verzeichnisse `skills/`, `hooks/`, `commands/`, und `agents/` in das Projekt kopieren
3. Folgendes zu den Qwen Code-Einstellungen oder `QWEN.md` hinzufügen:

```markdown
@load ./skills/using-superpowers.md
```

## So Funktioniert Es

### Obligatorischer Workflow-Pipeline

Wenn du Qwen Code bittest, ein Feature zu implementieren oder einen Bug zu beheben, folgt er automatisch dieser Sequenz:

1. **Brainstorming** → Klärt Anforderungen durch sokratischen Dialog
2. **Git Worktrees** → Erstellt isolierten Branch-Arbeitsbereich
3. **Planning（Planung）** → Zerlegt Arbeit in 2-5 Minuten-Aufgaben mit Verifikationsschritten
4. **Subagent-Driven Development（Subagenten-getriebene Entwicklung）** → Frischer Agent pro Aufgabe mit TDD
5. **Code Review** → Automatisierte Qualitätsprüfungen
6. **Branch Finalization（Branch-Finalisierung）** → Sauberer Merge oder PR-Erstellung

### Kernphilosophie

- **Testgetriebene Entwicklung**: Der Red-Green-Refactor-Zyklus ist obligatorisch
- **Systematisch Über Ad-Hoc**: Prozess über Raten
- **Komplexitätsreduzierung**: Einfachheit ist das Hauptziel
- **Evidenz Über Behauptungen**: Verifizieren bevor Erfolg gemeldet wird

## Verfügbare Skills

### Obligatorische Workflow-Skills（Automatisch Ausgelöst）

| Skill | Zweck |
|-------|---------|
| `brainstorming` | Anforderungsklärung und Erstellung des Designdokuments |
| `using-git-worktrees` | Einrichtung isolierter Branch-Arbeitsbereiche |
| `writing-plans` | Detaillierte Implementierungsplanung |
| `subagent-driven-development` | Parallele Aufgabenausführung mit frischen Agenten |
| `test-driven-development` | Erzwingt den TDD-Zyklus |
| `requesting-code-review` | Automatisierte Qualitätsprüfungen |
| `finishing-a-development-branch` | Saubere Branch-Finalisierung |

### Unterstützende Skills

| Skill | Zweck |
|-------|---------|
| `systematic-debugging` | 4-Phasen-Ursachenanalyse |
| `verification-before-completion` | Stellt sicher, dass Fixes tatsächlich funktionieren |
| `dispatching-parallel-agents` | Mehrere Agenten gleichzeitig ausführen |
| `receiving-code-review` | Review-Feedback verarbeiten |
| `writing-skills` | Neue Skills erstellen |

## Verwendung

### Eine Neue Aufgabe Starten

Beschreibe einfach, was du erreichen möchtest:

```
Ich möchte eine Benutzerauthentifizierung zu meiner App hinzufügen
```

Qwen Code wird automatisch:
1. Klärungsfragen stellen
2. Ein Designdokument erstellen
3. Einen isolierten Branch einrichten
4. Einen detaillierten Plan erstellen
5. Den Plan mit TDD ausführen

### Manuelle Skill-Aufruf

Du kannst Skills auch manuell aufrufen:

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## Architektur

```
qwen-superpowers/
├── .qwen-plugin          # Plugin-Metadaten
├── QWEN.md               # System-Prompt-Injektion
├── skills/               # Skill-Definitionen（Markdown）
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
├── hooks/                # Auto-Trigger-Konfigurationen
├── commands/             # Manuelle Aufrufbefehle
├── agents/               # Agenten-Verhaltensdefinitionen
├── scripts/              # Setup- und Utility-Skripte
└── docs/                 # Dokumentation
```

## Eigene Skills Erstellen

Siehe `skills/writing-skills.md` für eine Anleitung zum Erstellen eigener Skills.

## Lizenz

MIT
