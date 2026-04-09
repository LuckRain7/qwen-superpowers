# Skill: Finishing a Development Branch

## Overview

This skill handles clean branch finalization, verifying all tests pass and presenting merge/PR options before cleanup.

## When to Use

- After code review passes
- When implementation is complete
- Automatically triggered after review

## Instructions

### Phase 1: Final Verification

1. **Run Complete Test Suite**
   ```bash
   # All tests
   npm test
   
   # With coverage
   npm run coverage
   
   # Linting
   npm run lint
   
   # Type checking
   npm run type-check
   ```

2. **Verify Requirements Met**
   Review the original design doc:
   ```bash
   cat .qwen/design.md
   ```
   
   Check each requirement:
   - [ ] All design requirements implemented
   - [ ] All plan tasks completed
   - [ ] No scope creep (YAGNI)

3. **Check Commit History**
   ```bash
   git log --oneline main..HEAD
   ```
   
   Verify:
   - [ ] Commits are logical and atomic
   - [ ] Commit messages are descriptive
   - [ ] No "WIP" or "fixup" commits
   - [ ] Each commit has passing tests

### Phase 2: Present Options

4. **Show Branch Status**
   ```markdown
   ## Branch Status
   
   **Branch**: `<branch-name>`
   **Commits**: N commits ahead of main
   **Tests**: ✅ All passing
   **Coverage**: X%
   **Review**: ✅ Passed
   
   ### Changes Summary
   - Files created: N
   - Files modified: N
   - Lines added: +N
   - Lines removed: -N
   ```

5. **Present Merge Options**
   ```markdown
   ## Next Steps - Choose One:
   
   ### Option 1: Create Pull Request (Recommended)
   Creates a PR for team review
   ```bash
   git push origin <branch-name>
   gh pr create --title "..." --body "..."
   ```
   
   ### Option 2: Merge Directly
   Merge into main immediately
   ```bash
   git checkout main
   git merge --no-ff <branch-name> -m "..."
   git push origin main
   ```
   
   ### Option 3: Rebase and Squash
   Clean up commits before merge
   ```bash
   git rebase -i main
   # Squash commits, then merge
   ```
   
   ### Option 4: Discard Changes
   Abandon this work
   ```bash
   git checkout main
   git branch -D <branch-name>
   ```
   ```

### Phase 3: Execute Choice

6. **Wait for User Decision**
   Do NOT proceed without explicit user choice
   
7. **Execute Selected Option**
   
   **If PR Creation:**
   ```bash
   # Push branch
   git push origin <branch-name>
   
   # Create PR with summary
   gh pr create \
     --title "feat: [feature name]" \
     --body "$(cat <<EOF
   ## Summary
   [What was implemented]
   
   ## Changes
   - [Key change 1]
   - [Key change 2]
   
   ## Testing
   - [ ] All tests passing
   - [ ] Manual testing done
   
   ## Screenshots (if applicable)
   [Add screenshots for UI changes]
   EOF
   )"
   ```
   
   **If Direct Merge:**
   ```bash
   git checkout main
   git pull origin main
   git merge --no-ff <branch-name> -m "feat: [feature name]

[Detailed description of changes]"
   git push origin main
   ```
   
   **If Rebase and Squash:**
   ```bash
   git rebase -i main
   # Interactive rebase to squash commits
   git checkout main
   git merge <branch-name>
   git push origin main
   ```

### Phase 4: Cleanup

8. **Clean Up Worktree**
   ```bash
   # Remove worktree
   git worktree remove ../worktrees/<branch-name>
   
   # Delete branch if merged
   git branch -d <branch-name>
   
   # Clean up stale worktrees
   git worktree prune
   ```

9. **Clean Up Design Files**
   ```bash
   # Archive or remove design docs
   rm -rf .qwen/
   ```

10. **Verify Clean State**
    ```bash
    git status
    git worktree list
    
    # Should show:
    # - Clean working directory
    # - No active worktrees
    # - On main branch
    ```

### Phase 5: Completion Report

11. **Generate Summary**
    ```markdown
    ## ✅ Task Complete
    
    **Feature**: [Name]
    **Branch**: <branch-name> → main
    **Method**: [PR/Merge/Rebase]
    
    ### Results
    - Tests: ✅ Passing
    - Coverage: X%
    - Files changed: N
    - Lines added: +N
    
    ### Next Steps
    - [ ] Deploy to staging
    - [ ] Update documentation
    - [ ] Notify stakeholders
    
    ### Artifacts
    - Design doc: .qwen/archives/[feature].md
    - PR link: [URL]
    ```

## Rules

- NEVER merge without passing tests
- NEVER merge without user approval
- ALWAYS present all options
- ALWAYS clean up worktrees
- NEVER leave stale branches
- ALWAYS verify clean state after merge

## PR Template

When creating PRs, use this template:

```markdown
## Summary
Brief description of changes

## What Changed
- [Key change 1 with context]
- [Key change 2 with context]

## Testing
- [ ] All automated tests pass
- [ ] Manual testing completed
- [ ] Edge cases verified

## Screenshots
[For UI changes]

## Notes
[Any additional context for reviewers]
```

## Anti-Patterns

❌ Merging without running tests
❌ Leaving worktrees active
❌ Not presenting all options
❌ Merging without user approval
❌ Leaving stale branches
❌ Unclear commit messages
❌ Not verifying clean state

## Success Criteria

- [ ] All tests passing
- [ ] User chose merge option explicitly
- [ ] Changes merged to main
- [ ] Worktree cleaned up
- [ ] Branch deleted
- [ ] Working directory clean
- [ ] Completion report generated
