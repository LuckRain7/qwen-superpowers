# Skill: Using Git Worktrees

## Overview

This skill manages isolated development workspaces using Git worktrees, ensuring clean branch management and avoiding conflicts with the main working directory.

## When to Use

- After design approval, before planning begins
- Automatically triggered on task start
- When starting work on any feature or bug fix

## Instructions

### Phase 1: Workspace Setup

1. **Check Current State**
   ```bash
   # Verify clean working directory
   git status
   git stash list
   ```

2. **Create Feature Branch**
   ```bash
   # Use descriptive branch names
   git branch <branch-name> main
   # Format: feature/<description>, fix/<description>, or refactor/<description>
   ```

3. **Create Worktree**
   ```bash
   # Create isolated workspace directory
   git worktree add ../worktrees/<branch-name> <branch-name>
   
   # Navigate to worktree
   cd ../worktrees/<branch-name>
   ```

### Phase 2: Environment Initialization

4. **Install Dependencies**
   ```bash
   # Run project setup commands
   npm install  # or appropriate package manager
   ```

5. **Verify Baseline**
   ```bash
   # Run test suite to ensure clean baseline
   npm test
   
   # If tests fail, stop and report
   # If tests pass, continue
   ```

6. **Create Design Directory**
   ```bash
   # Copy approved design to worktree
   mkdir -p .qwen
   cp <design-doc-path> .qwen/design.md
   ```

### Phase 3: Verification

7. **Confirm Setup**
   Verify the following:
   - [ ] Worktree created successfully
   - [ ] Branch is based on main/master
   - [ ] Dependencies installed
   - [ ] All baseline tests pass
   - [ ] Design doc is accessible

8. **Report Status**
   ```
   Workspace ready:
   - Branch: <branch-name>
   - Worktree: <path>
   - Tests: passing
   - Design: .qwen/design.md
   
   Ready to proceed to planning phase.
   ```

## Worktree Management Commands

### List Active Worktrees
```bash
git worktree list
```

### Remove a Worktree
```bash
# When finished with a feature
git worktree remove ../worktrees/<branch-name>
```

### Clean Up Merged Branches
```bash
git branch --merged | grep -v "main\|master" | xargs git branch -d
```

## Rules

- NEVER work directly on main/master
- ALWAYS create a new branch for each task
- ALWAYS verify baseline tests pass before starting
- ALWAYS use descriptive branch names
- ALWAYS clean up worktrees when done

## Branch Naming Convention

```
feature/user-authentication
fix/login-validation-bug
refactor/database-queries
chore/update-dependencies
docs/api-documentation
```

## Troubleshooting

### Worktree Creation Fails
```bash
# Remove stale worktree references
git worktree prune
git worktree add <path> <branch>
```

### Tests Fail on Baseline
1. Check if tests pass on main
2. If yes, rebase branch on main
3. If no, report issue to user

### Conflicts with Existing Worktrees
1. List worktrees: `git worktree list`
2. Remove unused: `git worktree remove <path>`
3. Retry creation

## Success Criteria

- [ ] Worktree created and accessible
- [ ] Branch created with correct name
- [ ] Dependencies installed successfully
- [ ] All baseline tests pass
- [ ] Design doc copied to worktree
- [ ] User notified of ready status

## Next Steps

Once workspace is ready, transition to:
```
Loading skill: writing-plans
```
