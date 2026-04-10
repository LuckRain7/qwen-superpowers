# Qwen Superpowers

**Languages:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

A comprehensive skill system for Qwen Code that enforces professional software engineering practices through mandatory workflows.

## What is this?

Qwen Superpowers transforms Qwen Code from a general-purpose coding assistant into a disciplined engineering agent that follows proven workflows automatically. It ensures:

- **Test-Driven Development** - Tests always come first
- **Systematic Planning** - No more ad-hoc coding
- **Evidence-Based Debugging** - Root cause analysis over guessing
- **Code Quality** - Automated reviews and refactoring

## Installation

### npx Installation (Recommended)

No installation required! Use `npx` to run commands directly:

```bash
# Run interactive installer
npx qwen-superpowers-r install

# Install to current project without prompts
npx qwen-superpowers-r install --local --yes

# Install globally without prompts
npx qwen-superpowers-r install --global --yes

# List available skills
npx qwen-superpowers-r list

# Create a new skill
npx qwen-superpowers-r create-skill my-custom-skill

# Show help
npx qwen-superpowers-r help
```

The interactive installer will prompt you to choose:
- **Current Project** - Install to `./.qwen/` directory
- **Global** - Install to `~/.qwen/` (share across projects)

### Git Installation

```bash
# Clone this repository
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# Run using npx
npx qwen-superpowers-r install --local
```

### Manual Installation

1. Copy the `.qwen-plugin` file to your project root
2. Run the installer to copy skills to your project:
   ```bash
   npx qwen-superpowers-r install --local --yes
   ```
3. The installer will create a `.qwen/` directory with all necessary files

## How It Works

### Mandatory Workflow Pipeline

When you ask Qwen Code to implement a feature or fix a bug, it automatically follows this sequence:

1. **Brainstorming** → Clarifies requirements through Socratic dialogue
2. **Git Worktrees** → Creates isolated branch workspace
3. **Planning** → Breaks work into 2-5 minute tasks with verification steps
4. **Subagent-Driven Development** → Fresh agent per task with TDD
5. **Code Review** → Automated quality checks
6. **Branch Finalization** → Clean merge or PR creation

### Core Philosophy

- **Test-Driven Development**: Red-Green-Refactor cycle is mandatory
- **Systematic Over Ad-Hoc**: Process over guessing
- **Complexity Reduction**: Simplicity is the primary goal
- **Evidence Over Claims**: Verify before declaring success

## Available Skills

### Mandatory Workflow Skills (Auto-Triggered)

| Skill | Purpose |
|-------|---------|
| `brainstorming` | Requirements clarification and design doc creation |
| `using-git-worktrees` | Isolated branch workspace setup |
| `writing-plans` | Detailed implementation planning |
| `subagent-driven-development` | Parallel task execution with fresh agents |
| `test-driven-development` | Enforces TDD cycle |
| `requesting-code-review` | Automated quality checks |
| `finishing-a-development-branch` | Clean branch finalization |

### Supporting Skills

| Skill | Purpose |
|-------|---------|
| `systematic-debugging` | 4-phase root cause analysis |
| `verification-before-completion` | Ensures fixes actually work |
| `dispatching-parallel-agents` | Run multiple agents concurrently |
| `receiving-code-review` | Handle review feedback |
| `writing-skills` | Create new skills |

## Usage

### Starting a New Task

Simply describe what you want to accomplish:

```
I want to add user authentication to my app
```

Qwen Code will automatically:
1. Ask clarifying questions
2. Create a design document
3. Set up an isolated branch
4. Create a detailed plan
5. Execute the plan with TDD

### Manual Skill Invocation

You can also invoke skills manually:

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## Architecture

```
qwen-superpowers/
├── .qwen-plugin          # Plugin metadata
├── QWEN.md               # System prompt injection
├── skills/               # Skill definitions (Markdown)
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
├── hooks/                # Auto-trigger configurations
├── commands/             # Manual invocation commands
├── agents/               # Agent behavior definitions
├── scripts/              # Setup and utility scripts
└── docs/                 # Documentation
```

## Creating Custom Skills

See `skills/writing-skills.md` for a guide on creating your own skills.

## Publishing to npm (For Maintainers)

```bash
# Prepare and validate the package
./scripts/prepare-npm.sh

# Login to npm (first time only)
npm login

# Publish
npm publish
```

## License

MIT
