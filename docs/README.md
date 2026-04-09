# Qwen Superpowers Documentation

## Quick Start Guide

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers
```

2. Run the setup script in your project:
```bash
./scripts/setup.sh /path/to/your/project
```

3. Start using Qwen Code with superpowers enabled!

### Basic Usage

Simply describe what you want to accomplish:

```
I want to add user authentication to my app
```

Qwen Code will automatically:
1. Ask clarifying questions (brainstorming)
2. Set up an isolated branch (git worktrees)
3. Create a detailed plan (writing-plans)
4. Execute with TDD (subagent-driven-development)
5. Review the code (requesting-code-review)
6. Finalize the branch (finishing-a-development-branch)

### Manual Commands

```bash
# List available skills
./scripts/list-skills.sh

# Create a new custom skill
./scripts/create-skill.sh my-new-skill

# Install to a project
./scripts/setup.sh /path/to/project
```

## Skill Reference

### Core Workflow Skills

#### brainstorming
**Purpose**: Clarify requirements before implementation
**Trigger**: Automatic on task start
**Output**: Design document in `.qwen/designs/`

#### using-git-worktrees
**Purpose**: Manage isolated development workspaces
**Trigger**: Automatic after brainstorming
**Output**: Clean branch in worktree directory

#### writing-plans
**Purpose**: Break work into 2-5 minute tasks
**Trigger**: Automatic after workspace setup
**Output**: Detailed plan in `.qwen/plan.md`

#### subagent-driven-development
**Purpose**: Execute tasks with fresh agents
**Trigger**: Automatic after plan approval
**Output**: Implemented features with tests

#### test-driven-development
**Purpose**: Enforce RED-GREEN-REFACTOR cycle
**Trigger**: Automatic during implementation
**Output**: Test-first implementation

#### requesting-code-review
**Purpose**: Automated quality checks
**Trigger**: Automatic after implementation
**Output**: Review report with issues

#### finishing-a-development-branch
**Purpose**: Clean branch finalization
**Trigger**: Automatic after review
**Output**: Merged code with cleanup

### Supporting Skills

#### systematic-debugging
**Purpose**: 4-phase root cause analysis
**Trigger**: Manual or on test failure
**Output**: Bug fix with regression tests

#### verification-before-completion
**Purpose**: Ensure fixes actually work
**Trigger**: Before any completion claim
**Output**: Verification evidence

#### dispatching-parallel-agents
**Purpose**: Concurrent task execution
**Trigger**: Manual when independent tasks exist
**Output**: Faster implementation

#### receiving-code-review
**Purpose**: Handle review feedback
**Trigger**: Manual after review
**Output**: Addressed feedback

#### writing-skills
**Purpose**: Create new custom skills
**Trigger**: Manual
**Output**: New skill in `skills/` directory

## Configuration

### .qwen-plugin

Main configuration file:
```json
{
  "name": "qwen-superpowers",
  "version": "1.0.0",
  "skills": ["skill1", "skill2"],
  "triggers": {
    "onTaskStart": ["brainstorming"]
  }
}
```

### QWEN.md

System prompt that enforces workflows. Customize this file to:
- Add project-specific conventions
- Modify skill ordering
- Add custom rules

### Hooks

Auto-trigger configuration in `hooks/hooks.json`:
```json
{
  "hooks": [
    {
      "event": "taskStart",
      "skills": ["brainstorming"]
    }
  ]
}
```

## Customization

### Creating Custom Skills

```bash
./scripts/create-skill.sh my-skill
```

Edit the generated `skills/my-skill/SKILL.md` with your workflow.

### Modifying Existing Skills

Edit any `skills/{name}/SKILL.md` file. Changes take effect immediately.

### Adding Custom Agents

Add agent definitions to `agents/agents.json` and reference in skills.

## Troubleshooting

### Skills Not Triggering

1. Check `.qwen-plugin` has skill listed
2. Verify `hooks/hooks.json` has correct event
3. Ensure `QWEN.md` is loaded

### Worktree Issues

```bash
# List worktrees
git worktree list

# Clean stale references
git worktree prune

# Remove a worktree
git worktree remove <path>
```

### Test Failures

Use systematic debugging:
```
/superpowers systematic-debugging
```

## Best Practices

1. **Always start with brainstorming** - Understand before building
2. **Never skip planning** - Detailed plans prevent rework
3. **Write tests first** - TDD catches design issues early
4. **Review all code** - Catch issues before they reach production
5. **Use isolation** - Worktrees prevent conflicts
6. **Verify everything** - Don't trust, verify

## Contributing

Contributions welcome! To add a new skill:

1. Create the skill: `./scripts/create-skill.sh name`
2. Implement the workflow in `SKILL.md`
3. Test it manually
4. Submit a pull request

## License

MIT License - See LICENSE file for details
