# Skill: Verification Before Completion

## Overview

This skill ensures that fixes and implementations actually work before declaring success, preventing premature completion claims.

## When to Use

- Before declaring any task complete
- After implementing fixes
- Before committing code
- As a final checkpoint

## Instructions

### Phase 1: Automated Verification

1. **Run Complete Test Suite**
   ```bash
   # All tests
   npm test
   
   # With coverage report
   npm run coverage
   
   # Watch for:
   # - Zero failures
   # - Zero errors
   # - Acceptable coverage (>80%)
   ```

2. **Run Quality Checks**
   ```bash
   # Linting
   npm run lint
   
   # Type checking
   npm run type-check
   
   # Build (if applicable)
   npm run build
   ```

3. **Verify Specific Fix**
   ```bash
   # Run the specific test that was failing
   npm test -- path/to/specific.test.js
   
   # MUST pass - no exceptions
   ```

### Phase 2: Manual Verification

4. **Reproduce Original Issue**
   Follow the exact steps that originally triggered the bug:
   ```markdown
   Original Steps:
   1. [Step 1]
   2. [Step 2]
   3. [Expected result]
   
   Current Result: [Verify it matches expected]
   ```

5. **Check Edge Cases**
   Test related scenarios:
   - Empty inputs
   - Boundary values
   - Invalid data
   - Concurrent operations
   - Network failures (if applicable)

6. **Verify No Regressions**
   - Check related features still work
   - Review error logs
   - Test integration points
   - Verify API contracts

### Phase 3: Evidence Collection

7. **Gather Proof of Success**
   ```markdown
   ## Verification Evidence
   
   **Test Results**:
   ```
   ✓ 45 passing
   ✓ 0 failing
   ✓ Coverage: 87%
   ```
   
   **Manual Testing**:
   - [✓] Original bug scenario: works correctly
   - [✓] Edge case 1: handled properly
   - [✓] Edge case 2: handled properly
   - [✓] Related features: no regressions
   
   **Code Quality**:
   ```
   ✓ Lint: no issues
   ✓ Types: no errors
   ✓ Build: successful
   ```
   ```

8. **Cross-Check Requirements**
   Review original requirements:
   - [ ] All acceptance criteria met
   - [ ] Design doc requirements satisfied
   - [ ] Plan tasks completed
   - [ ] No scope creep

### Phase 4: Final Decision

9. **Make Go/No-Go Decision**
   
   **GO** - All verifications pass:
   ```
   ✅ VERIFICATION PASSED
   
   Evidence:
   - Tests: 45/45 passing
   - Coverage: 87%
   - Manual testing: complete
   - No regressions found
   
   Ready to proceed.
   ```
   
   **NO-GO** - Any verification fails:
   ```
   ⛔ VERIFICATION FAILED
   
   Issue: [Specific problem]
   Evidence: [Test output or observation]
   
   Must fix before proceeding.
   ```

## Verification Checklist

Complete this checklist before ANY completion claim:

### Code Quality
- [ ] All tests pass (0 failures)
- [ ] Linting passes (0 errors)
- [ ] Type checking passes (0 errors)
- [ ] Build succeeds (if applicable)
- [ ] Coverage threshold met

### Functionality
- [ ] Original issue resolved
- [ ] Edge cases handled
- [ ] Error cases covered
- [ ] No regressions found
- [ ] Performance acceptable

### Requirements
- [ ] All acceptance criteria met
- [ ] Design requirements satisfied
- [ ] Plan tasks completed
- [ ] No unauthorized scope changes

### Documentation
- [ ] Complex logic commented
- [ ] API docs updated (if changed)
- [ ] README updated (if needed)
- [ ] CHANGELOG entry added

## Anti-Patterns

❌ Declaring success without running tests
❌ Only running new tests (miss regressions)
❌ Not testing edge cases
❌ Assuming it works because code looks right
❌ Skipping manual verification
❌ Ignoring lint/type errors
❌ Not checking original requirements

## Common Failure Modes

### False Positives
```javascript
// ❌ Test passes but doesn't verify behavior
it('calls the function', () => {
  const spy = jest.spyOn(obj, 'method');
  obj.method();
  expect(spy).toHaveBeenCalled();
});

// ✅ Test verifies actual behavior
it('processes data correctly', () => {
  const result = obj.method(input);
  expect(result).toEqual(expectedOutput);
});
```

### Incomplete Testing
```javascript
// ❌ Only tests happy path
it('handles valid input', () => { /* ... */ });

// ✅ Tests edge cases too
it('handles valid input', () => { /* ... */ });
it('rejects null input', () => { /* ... */ });
it('handles empty string', () => { /* ... */ });
it('throws on invalid format', () => { /* ... */ });
```

## Success Criteria

- [ ] Full test suite passes
- [ ] All quality checks pass
- [ ] Manual verification complete
- [ ] No regressions found
- [ ] Original requirements met
- [ ] Evidence documented
- [ ] Go decision made explicitly
