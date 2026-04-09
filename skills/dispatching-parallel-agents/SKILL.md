# Skill: Dispatching Parallel Agents

## Overview

This skill enables concurrent execution of multiple subagents for independent tasks to maximize throughput.

## When to Use

- Multiple independent tasks identified
- Tasks have no shared state or dependencies
- When speed is important
- Manual invocation recommended

## Instructions

### Phase 1: Identify Parallelizable Work

1. **Analyze Task Dependencies**
   ```markdown
   Task Dependency Graph:
   
   Task 1 ──→ Task 2 ──→ Task 3
                  ↓
   Task 4 ────────┘
   
   Task 5 (independent)
   Task 6 (independent)
   
   ✅ Can run in parallel: Task 5, Task 6
   ❌ Must run sequentially: Task 1, 2, 3, 4
   ```

2. **Independence Criteria**
   A task is independent if:
   - [ ] Doesn't modify same files as other tasks
   - [ ] Doesn't depend on other task's output
   - [ ] No shared mutable state
   - [ ] No ordering requirements

### Phase 2: Dispatch

3. **Prepare Dispatch Messages**
   For each parallel task:
   ```
   === PARALLEL AGENT DISPATCH ===
   
   Task: [Name and number]
   
   Context:
   [Complete background information]
   
   Objective:
   [What this agent should accomplish]
   
   Files to Create/Modify:
   - path/to/file.js - [Purpose]
   
   Constraints:
   - [Any limitations or requirements]
   
   Tests Required:
   - [Specific test scenarios]
   
   Verification:
   npm test -- specific.test.js
   
   IMPORTANT: Work in isolation. Do not modify files 
   outside your scope.
   ================================
   ```

4. **Launch Agents Concurrently**
   ```
   Dispatching N agents in parallel:
   - Agent 1: Task [name]
   - Agent 2: Task [name]
   - Agent 3: Task [name]
   
   These tasks are independent and can run concurrently.
   ```

### Phase 3: Monitor and Collect

5. **Monitor Progress**
   Track each agent's progress:
   - Agent 1: [status]
   - Agent 2: [status]
   - Agent 3: [status]

6. **Handle Failures**
   If any agent fails:
   - Don't block other agents
   - Collect failure information
   - Retry failed agent separately

### Phase 4: Integration

7. **Sequential Review**
   Review each agent's output sequentially:
   ```
   Reviewing Agent 1 (Task X):
   - Spec compliance: [pass/fail]
   - Code quality: [pass/fail]
   - Tests: [pass/fail]
   ```

8. **Merge Results**
   Apply changes in dependency order:
   ```bash
   # Apply independent changes
   # Run full test suite
   npm test
   
   # Verify no conflicts
   git status
   ```

9. **Handle Conflicts**
   If conflicts detected:
   - Identify overlapping file modifications
   - Resolve manually
   - Re-run tests

## Example Scenario

```
Plan: Create REST API with multiple endpoints

Independent tasks:
- Task 2: User CRUD endpoints
- Task 3: Product CRUD endpoints  
- Task 4: Order CRUD endpoints

These can run in parallel since they:
✓ Modify different route files
✓ Create different model files
✓ Create different test files
✓ Have no interdependencies

Dispatch 3 agents concurrently.
```

## Anti-Patterns

❌ Running dependent tasks in parallel (race conditions)
❌ Not verifying independence before dispatch
❌ Ignoring conflicts during merge
❌ Reviewing all agents at once (overwhelming)
❌ Not running full test suite after merge

## Success Criteria

- [ ] Tasks verified as independent
- [ ] All agents dispatched successfully
- [ ] Each agent reviewed individually
- [ ] Changes merged without conflicts
- [ ] Full test suite passes after merge
- [ ] No regressions introduced
