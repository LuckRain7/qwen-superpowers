# Qwen Superpowers Quick Reference

## Installation

```bash
# Clone repository
git clone https://github.com/your-org/qwen-superpowers.git

# Install to project
./scripts/setup.sh /path/to/your/project
```

## Automatic Workflow

Just describe what you want - skills trigger automatically:

```
User: "Add user login feature"
  ↓
brainstorming → clarify requirements
  ↓
using-git-worktrees → setup isolated branch
  ↓
writing-plans → create detailed task list
  ↓
subagent-driven-development → implement with TDD
  ↓
requesting-code-review → quality check
  ↓
finishing-a-development-branch → clean merge
```

## Manual Commands

```bash
/superpowers brainstorming          # Clarify requirements
/superpowers writing-plans          # Create implementation plan
/superpowers systematic-debugging   # Debug an issue
/superpowers code-review            # Request code review
/superpowers status                 # Show workflow status
/superpowers help                   # List all skills
```

## Skill Scripts

```bash
./scripts/setup.sh /path/to/project     # Install to project
./scripts/list-skills.sh                # List all skills
./scripts/create-skill.sh my-skill      # Create new skill
```

## Core Skills

| Skill | When to Use | Output |
|-------|-------------|--------|
| **brainstorming** | Start of any task | Design doc |
| **using-git-worktrees** | After design approval | Isolated branch |
| **writing-plans** | Before implementation | Task breakdown |
| **subagent-driven-development** | During implementation | Implemented features |
| **test-driven-development** | Every code change | Test-first code |
| **requesting-code-review** | After implementation | Review report |
| **finishing-a-development-branch** | When done | Merged code |
| **systematic-debugging** | When bugs appear | Bug fix with tests |
| **verification-before-completion** | Before claiming done | Verification proof |

## Key Principles

✅ **Tests FIRST** - Always write tests before implementation
✅ **RED-GREEN-REFACTOR** - Fail, pass, improve
✅ **Evidence over guessing** - Debug with data
✅ **Isolation** - Work in separate branches
✅ **Quality gates** - Review before merge

## File Structure

```
qwen-superpowers/
├── QWEN.md                    # System prompt (loads automatically)
├── .qwen-plugin                # Plugin configuration
├── skills/                     # All skill definitions
│   ├── brainstorming/
│   ├── writing-plans/
│   ├── test-driven-development/
│   └── ... (13 skills total)
├── hooks/                      # Auto-trigger config
├── commands/                   # Manual commands config
├── agents/                     # Agent definitions
└── scripts/                    # Utility scripts
```

## Creating Custom Skills

```bash
# Generate template
./scripts/create-skill.sh my-skill

# Edit the skill
vim skills/my-skill/SKILL.md

# Register in .qwen-plugin
# Add to "skills" array
```

## Troubleshooting

**Skills not triggering?**
- Check `.qwen-plugin` has skill listed
- Verify `QWEN.md` is loaded
- Check `hooks/hooks.json` configuration

**Worktree issues?**
```bash
git worktree list          # List worktrees
git worktree prune         # Clean stale refs
git worktree remove <path> # Remove worktree
```

**Need help debugging?**
```
/superpowers systematic-debugging
```

## Git Workflow

```bash
# Never work on main directly
# Always use branches via worktrees

# Current branch status
git status

# See commits ahead
git log --oneline main..HEAD

# Clean up after merge
git worktree remove ../worktrees/feature-name
git branch -d feature-name
```

## TDD Cycle Reminder

```
RED: Write failing test
  ↓
GREEN: Write minimal code to pass
  ↓
REFACTOR: Improve code quality
  ↓
Repeat
```

## Common Patterns

### Starting a Feature
```
User: "Add password reset"
→ Skills auto-trigger in sequence
→ Review design when prompted
→ Approve plan when shown
→ Implementation proceeds with TDD
```

### Fixing a Bug
```
User: "Login fails with special chars"
→ /superpowers systematic-debugging
→ Or just describe the issue
→ Debugging skills trigger automatically
```

### Code Review
```
After implementation completes:
→ Automatic review runs
→ Issues classified by severity
→ Critical issues block progress
→ Review summary presented
```

## Tips

1. **Be specific in requests** - Better input → better output
2. **Review designs carefully** - Catch issues early
3. **Approve plans thoroughly** - Ensure all requirements covered
4. **Trust the process** - Skills enforce best practices
5. **Use manual commands** - When you need specific skills
6. **Create custom skills** - For project-specific workflows

## Support

- Documentation: `docs/README.md`
- Skill details: `skills/{skill-name}/SKILL.md`
- Changelog: `CHANGELOG.md`
- License: MIT (see `LICENSE`)
