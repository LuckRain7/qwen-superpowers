# Skill: Subagent-Driven Development

## Overview

This skill orchestrates implementation by dispatching fresh subagents for each planned task, ensuring isolation, focus, and quality through two-stage review.

## When to Use

- After plan approval
- During implementation phase
- Automatically triggered after writing-plans

## Instructions

### Phase 1: Task Dispatch

1. **Load the Plan**
   Read the approved plan from `.qwen/plan.md`

2. **Dispatch Tasks Sequentially**
   For each task in the plan:
   
   a. **Create Fresh Subagent**
      - New subagent with no prior context
      - Provide complete task specification
      - Include design doc context
      - Specify TDD requirements
   
   b. **Provide Context**
      ```
      You are implementing Task N: [Name]
      
      Design Context:
      [Relevant design doc sections]
      
      Task Specification:
      [Complete task details from plan]
      
      Requirements:
      1. Write tests FIRST
      2. Follow RED-GREEN-REFACTOR cycle
      3. All tests must pass before completion
      4. Code must follow project conventions
      
      Files to modify:
      [Exact file paths from plan]
      
      Verification:
      [Exact test commands to run]
      ```

### Phase 2: Subagent Execution

3. **Monitor Subagent Progress**
   - Ensure subagent writes tests first
   - Verify RED-GREEN-REFACTOR cycle
   - Check that tests pass before completion

4. **Two-Stage Review**
   After subagent completes each task:
   
   **Stage 1: Spec Compliance Review**
   - [ ] Task objective achieved
   - [ ] All specified files created/modified
   - [ ] Tests cover specified behaviors
   - [ ] Verification commands pass
   - [ ] No deviation from plan
   
   **Stage 2: Code Quality Review**
   - [ ] Code is readable and well-named
   - [ ] No duplicated logic
   - [ ] Error handling included
   - [ ] No commented-out code
   - [ ] Complex logic has comments
   - [ ] Follows project conventions

### Phase 3: Integration

5. **Commit Task Results**
   If both review stages pass:
   ```bash
   git add -A
   git commit -m "Task N: [brief description]
   
   - [What was implemented]
   - [Tests added]
   - [Verification: all tests passing]"
   ```

6. **Handle Review Failures**
   If issues found:
   - Document specific problems
   - Provide actionable feedback
   - Dispatch subagent for fixes
   - Re-run review after fixes

7. **Verify Integration**
   After each task commit:
   ```bash
   # Run full test suite
   npm test
   
   # If tests fail, fix before next task
   ```

### Phase 4: Progress Tracking

8. **Update Plan Status**
   Mark completed tasks in `.qwen/plan.md`:
   ```markdown
   - [x] Task 1: User Model Creation
   - [x] Task 2: Authentication API
   - [ ] Task 3: Login UI
   ```

9. **Report Progress**
   After each task:
   ```
   ✅ Task N complete
   - Tests: passing
   - Review: passed
   - Committed: [commit hash]
   
   Proceeding to Task N+1...
   ```

## Subagent Management Rules

### Context Isolation
- Each subagent starts FRESH
- No carry-over from previous tasks
- Full context provided upfront
- Clear success criteria specified

### Quality Gates
- Tests MUST pass before commit
- Two-stage review MUST succeed
- No exceptions to quality gates
- Block progress on critical issues

### Error Handling
If a subagent fails:
1. Identify what went wrong
2. Provide specific feedback
3. Retry with clearer instructions
4. If still failing, handle task directly

## Parallel Task Execution

For independent tasks:

1. **Identify Independent Tasks**
   Tasks that don't share state or dependencies

2. **Dispatch in Parallel**
   ```
   Dispatching Task 2A and Task 2B in parallel
   (They are independent and can run concurrently)
   ```

3. **Merge Results**
   - Review each independently
   - Commit in dependency order
   - Run full test suite after all complete

## Anti-Patterns

❌ Reusing subagents across tasks (stale context)
❌ Skipping review stages
❌ Committing without passing tests
❌ Allowing plan deviations
❌ Not running full test suite after integration
❌ Merging parallel results without verification

## Example Dispatch

```
=== SUBAGENT DISPATCH ===

Task: 3 - Login Form Component

Objective: Create login form with validation

Context from Design:
- Login form collects email and password
- Validates email format
- Shows error messages
- Submits to POST /auth/login

Files to Create:
- src/components/LoginForm.jsx
- src/components/LoginForm.test.jsx

Test Requirements:
- Test email validation
- Test password required
- Test successful login flow
- Test error display

Implementation:
Follow RED-GREEN-REFACTOR cycle. Write all tests first, then implement.

Verification:
npm test -- src/components/LoginForm.test.jsx

CRITICAL: Tests MUST pass before you declare complete.
========================
```

## Success Criteria

- [ ] Each task handled by fresh subagent
- [ ] All tasks follow TDD
- [ ] Two-stage review passes for each task
- [ ] Full test suite passes after each task
- [ ] No plan deviations
- [ ] Progress tracked in plan file
- [ ] All commits have descriptive messages

## Next Steps

When all tasks complete, transition to:
```
Loading skill: requesting-code-review
```
