# Skill: Writing Plans

## Overview

This skill breaks down approved designs into detailed, actionable tasks with exact paths, code snippets, and verification steps.

## When to Use

- After design approval and workspace setup
- Before any implementation begins
- Automatically triggered after git worktree setup

## Instructions

### Phase 1: Task Decomposition

1. **Analyze the Design**
   Read the approved design doc from `.qwen/design.md`
   
2. **Break Into Tasks**
   Split work into 2-5 minute tasks:
   - Each task should be independently testable
   - Order tasks by dependency
   - Include setup and teardown tasks

3. **Apply Engineering Principles**
   - **YAGNI**: Only plan what's needed now
   - **DRY**: Identify reusable components
   - **KISS**: Choose simplest viable solution

### Phase 2: Task Specification

For each task, create a detailed specification:

```markdown
## Task N: [Task Name]

**Objective**: [What this task accomplishes]

**Files to Create/Modify**:
- `path/to/file.js` - [Purpose]

**Test File**:
- `path/to/file.test.js` - [What to test]

**Implementation Steps**:
1. Write test for [specific behavior]
2. Run test → should FAIL (RED)
3. Implement [specific code]
4. Run test → should PASS (GREEN)
5. Refactor if needed (REFACTOR)

**Verification**:
```bash
npm test -- file.test.js
```

**Expected Outcome**: [What success looks like]
```

### Phase 3: Plan Review

4. **Self-Critique the Plan**
   Check for:
   - [ ] Each task is 2-5 minutes of work
   - [ ] Tests are specified before implementation
   - [ ] Tasks are in dependency order
   - [ ] File paths are exact
   - [ ] Verification steps are included
   - [ ] No task depends on unstated assumptions

5. **Identify Risks**
   List potential blockers:
   - Unknown APIs or libraries
   - Complex integrations
   - Performance concerns
   - Edge cases

### Phase 4: Present Plan

6. **Format the Plan**
   ```markdown
   # Implementation Plan: [Feature]
   
   ## Overview
   [2-3 sentence summary]
   
   ## Tasks
   
   ### Task 1: [Name]
   [Details as specified above]
   
   ### Task 2: [Name]
   [Details]
   
   ...
   
   ## Risks & Mitigations
   - [Risk]: [Mitigation strategy]
   
   ## Success Criteria
   - [ ] All tests pass
   - [ ] Feature works as designed
   - [ ] Code follows project conventions
   ```

7. **Get User Approval**
   - Present the complete plan
   - Explain task ordering rationale
   - Wait for explicit approval
   - Address any concerns

### Phase 5: Save Plan

8. **Save to Worktree**
   ```bash
   cp plan.md ../worktrees/<branch-name>/.qwen/plan.md
   ```

9. **Transition to Implementation**
   ```
   Plan approved. Ready to begin implementation.
   Loading skill: subagent-driven-development
   ```

## Plan Quality Checklist

A good plan has:

✅ Tasks that are:
- Atomic (do one thing)
- Testable (can verify success)
- Independent (minimal dependencies)
- Sized correctly (2-5 minutes each)

✅ Coverage that is:
- Complete (all design requirements addressed)
- Test-first (every feature has tests)
- Incremental (builds progressively)

✅ Verification that is:
- Automated (testable via commands)
- Specific (exact commands listed)
- Repeatable (works every time)

## Anti-Patterns

❌ Tasks that are too large (>5 minutes)
❌ Implementation before tests
❌ Vague descriptions ("add logic")
❌ Missing file paths
❌ No verification steps
❌ Dependencies not ordered correctly
❌ Features not in the design doc (YAGNI violation)

## Example Task

```markdown
## Task 1: User Model Creation

**Objective**: Create User model with email and password fields

**Files to Create/Modify**:
- `src/models/User.js` - User model with validation
- `src/models/User.test.js` - Model validation tests

**Test File**:
- `src/models/User.test.js`
  - Test email validation
  - Test password hashing
  - Test duplicate email rejection

**Implementation Steps**:
1. Write test for User creation with valid data
2. Run test → should FAIL (no User model)
3. Create User model with email/password fields
4. Add email validation
5. Add password hashing with bcrypt
6. Run tests → should PASS
7. Refactor validation logic to separate function

**Verification**:
```bash
npm test -- src/models/User.test.js
```

**Expected Outcome**: All 5 tests pass, User model functional
```

## Success Criteria

- [ ] Plan breaks work into 2-5 minute tasks
- [ ] Each task has tests specified first
- [ ] File paths are exact and realistic
- [ ] Verification steps are included
- [ ] Tasks are in dependency order
- [ ] Plan follows YAGNI and DRY
- [ ] User has explicitly approved the plan
- [ ] Plan is saved to .qwen/plan.md

## Next Steps

Once plan is approved, transition to:
```
Loading skill: subagent-driven-development
```
