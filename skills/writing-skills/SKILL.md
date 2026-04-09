# Skill: Writing Skills

## Overview

This skill provides guidance on creating new skills for the Qwen Superpowers system.

## When to Use

- When creating a new custom skill
- When extending the skill system
- When documenting workflow patterns

## Instructions

### Skill Structure

Every skill is a directory containing a `SKILL.md` file:

```
skills/{skill-name}/
└── SKILL.md
```

### SKILL.md Template

```markdown
# Skill: [Skill Name]

## Overview

[2-3 sentences describing what this skill does and why it exists]

## When to Use

- When [condition 1]
- When [condition 2]
- [Automatic/manual] trigger description

## Instructions

### Phase 1: [Phase Name]

1. **[Step Name]**
   Description of what to do
   
   ```bash
   # Example commands if applicable
   command --flag value
   ```

2. **[Step Name]**
   Next step description

### Phase 2: [Phase Name]

3. **[Step Name]**
   Continue with next phase

[Continue with as many phases as needed]

## Rules

### NEVER
❌ [Anti-pattern 1]
❌ [Anti-pattern 2]

### ALWAYS
✅ [Best practice 1]
✅ [Best practice 2]

## Anti-Patterns

❌ [Common mistake 1]
❌ [Common mistake 2]
❌ [Common mistake 3]

## Examples

### Good Example
```
[Show correct usage/implementation]
```

### Bad Example
```
[Show what NOT to do]
```

## Success Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]
- [ ] [Criterion N]

## Next Steps

When complete, transition to:
```
Loading skill: [next-skill-name]
```
```

### Skill Design Principles

1. **Single Responsibility**
   - One skill = one workflow
   - Don't combine unrelated concerns
   - Split large skills into smaller ones

2. **Actionable Steps**
   - Each step should be executable
   - Use imperative mood ("Do X" not "X should be done")
   - Include examples where helpful

3. **Clear Triggers**
   - When should this skill activate?
   - What conditions must be met?
   - How does it know when to run?

4. **Explicit Transitions**
   - What comes before this skill?
   - What comes after?
   - How to signal completion?

5. **Testable Outcomes**
   - How do we know the skill succeeded?
   - What verification steps are needed?
   - What are failure modes?

### Skill Categories

#### Workflow Skills
Enforce sequential processes:
- brainstorming
- writing-plans
- subagent-driven-development
- finishing-a-development-branch

#### Quality Skills
Enforce standards:
- test-driven-development
- requesting-code-review
- verification-before-completion

#### Tool Skills
Manage infrastructure:
- using-git-worktrees
- dispatching-parallel-agents

#### Meta Skills
System maintenance:
- writing-skills (this one)
- using-superpowers

### Testing a New Skill

1. **Create the Skill**
   ```bash
   mkdir -p skills/my-new-skill
   touch skills/my-new-skill/SKILL.md
   ```

2. **Write the Content**
   Use the template above

3. **Test Manual Invocation**
   ```
   /superpowers my-new-skill
   ```

4. **Verify Execution**
   - Does it work as intended?
   - Are steps clear and actionable?
   - Does it transition properly?

5. **Get Feedback**
   - Have others try the skill
   - Identify unclear steps
   - Refine based on usage

### Registering a Skill

Add to `.qwen-plugin`:
```json
{
  "skills": [
    "existing-skill",
    "my-new-skill"
  ],
  "triggers": {
    "onEvent": ["my-new-skill"]
  }
}
```

### Skill Versioning

When updating a skill:
- Document changes in a CHANGELOG
- Test backward compatibility
- Update dependent skills if needed
- Communicate changes to users

## Anti-Patterns

❌ Skills that are too long (>50 lines)
❌ Mixing multiple workflows in one skill
❌ Vague or ambiguous steps
❌ No clear success criteria
❌ Missing transition instructions
❌ Not testing before deployment

## Example: Creating a Debug Skill

```markdown
# Skill: Quick Debug

## Overview
Rapid debugging for common issues.

## When to Use
- When a simple bug needs quick investigation
- Manual trigger

## Instructions

1. **Identify Symptom**
   What's the observable problem?

2. **Check Recent Changes**
   ```bash
   git log --oneline -10
   ```

3. **Add Strategic Logging**
   ```javascript
   console.log('DEBUG:', variable);
   ```

4. **Reproduce and Isolate**
   Find minimal reproduction

5. **Fix and Verify**
   Apply fix, run tests

## Success Criteria
- [ ] Root cause identified
- [ ] Fix applied
- [ ] Tests passing
```

## Success Criteria

- [ ] Skill follows template
- [ ] Steps are actionable
- [ ] Triggers are clear
- [ ] Success criteria defined
- [ ] Transitions specified
- [ ] Skill tested manually
- [ ] Skill registered in config
