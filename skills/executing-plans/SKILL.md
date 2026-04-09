# Skill: Executing Plans

## Overview

This skill handles the batch execution of approved plans with human checkpoints at each stage.

## When to Use

- When subagent-driven-development is not available
- For simpler tasks that don't need full orchestration
- Manual execution mode

## Instructions

### Phase 1: Plan Loading

1. **Load the Approved Plan**
   Read `.qwen/plan.md`
   
2. **Verify Prerequisites**
   - [ ] Design doc exists and approved
   - [ ] Workspace setup complete
   - [ ] Branch created
   - [ ] Tests baseline passing

### Phase 2: Task Execution

3. **Execute Tasks Sequentially**
   For each task in the plan:
   
   a. **Read Task Specification**
      Understand the complete requirements
   
   b. **Write Tests First**
      ```bash
      # Create test file
      # Write all test cases
      # Run tests → MUST FAIL
      npm test -- task.test.js
      ```
   
   c. **Implement Solution**
      ```bash
      # Write minimal code to pass tests
      # Follow RED-GREEN-REFACTOR
      ```
   
   d. **Verify Tests Pass**
      ```bash
      npm test -- task.test.js
      ```
   
   e. **Run Full Test Suite**
      ```bash
      npm test
      # Must still pass
      ```

4. **Human Checkpoint**
   After every 3-5 tasks:
   ```
   Checkpoint: Completed tasks 1-N
   
   Status:
   - Tests: passing
   - Files modified: [list]
   - Next: Task N+1
   
   Continue? (yes/no/adjust)
   ```
   
   Wait for explicit approval before continuing

### Phase 3: Completion

5. **Final Verification**
   ```bash
   # All tests
   npm test
   
   # Coverage
   npm run coverage
   
   # Lint
   npm run lint
   ```

6. **Commit Work**
   ```bash
   git add -A
   git commit -m "feat: implement [feature]
   
   - [Summary of changes]
   - All tests passing"
   ```

## Rules

- ALWAYS write tests first
- ALWAYS run full test suite after each task
- ALWAYS get human approval at checkpoints
- NEVER skip tasks
- NEVER deviate from plan

## Anti-Patterns

❌ Executing tasks out of order
❌ Skipping tests
❌ Not running full test suite
❌ Ignoring checkpoint approvals
❌ Implementing unplanned features

## Success Criteria

- [ ] All plan tasks completed
- [ ] All tests passing
- [ ] No plan deviations
- [ ] Human approved all checkpoints
- [ ] Code committed cleanly
