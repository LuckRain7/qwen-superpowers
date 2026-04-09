# Skill: Systematic Debugging

## Overview

This skill provides a structured 4-phase approach to debugging: reproduce, identify, fix, and verify.

## When to Use

- When encountering bugs or failures
- When tests fail unexpectedly
- When behavior doesn't match expectations
- Manually or automatically triggered on failures

## Instructions

### Phase 1: Reproduce (Understand the Problem)

1. **Gather Information**
   - What is the expected behavior?
   - What is the actual behavior?
   - When did it start happening?
   - What changed recently?

2. **Create Minimal Reproduction**
   ```markdown
   ## Bug Reproduction
   
   **Expected**: [What should happen]
   **Actual**: [What actually happens]
   
   **Steps to Reproduce**:
   1. [Step 1]
   2. [Step 2]
   3. [Observe failure]
   
   **Environment**:
   - OS: [operating system]
   - Version: [app version]
   - Dependencies: [relevant versions]
   ```

3. **Write a Failing Test**
   ```javascript
   // Create test that demonstrates the bug
   it('should [expected behavior] but currently fails', () => {
     // Reproduce the exact conditions
     const result = functionUnderTest(input);
     
     // This will FAIL initially
     expect(result).toBe(expectedValue);
   });
   ```

4. **Verify Test Fails**
   ```bash
   npm test -- debug.test.js
   
   # MUST fail - if it passes, the test is wrong
   ```

### Phase 2: Root Cause Analysis

5. **Form Hypotheses**
   List possible causes:
   - What could cause this symptom?
   - What assumptions might be wrong?
   - What changed in these areas?

6. **Test Hypotheses Systematically**
   
   For each hypothesis:
   a. Make a specific prediction
   b. Add logging or inspection
   c. Run the test
   d. Confirm or reject
   
   ```javascript
   // Add strategic logging
   function suspectFunction(input) {
     console.log('DEBUG: input =', input);
     const result = complexLogic(input);
     console.log('DEBUG: result =', result);
     return result;
   }
   ```

7. **Narrow Down**
   - Binary search through code
   - Check intermediate values
   - Trace execution flow
   - Inspect state at each step

8. **Identify Root Cause**
   Document the exact cause:
   ```markdown
   ## Root Cause
   
   **Cause**: [What's actually wrong]
   **Location**: file:line
   **Why it happens**: [Explanation]
   **Why it wasn't caught**: [Missing test? Edge case?]
   ```

### Phase 3: Implement Fix

9. **Design the Fix**
   Consider approaches:
   - Simplest possible fix
   - More comprehensive refactor
   - Architectural improvement
   
   Choose based on:
   - Urgency (quick fix vs proper fix)
   - Impact (local vs systemic)
   - Risk (surgical vs broad changes)

10. **Write Tests for the Fix**
    ```javascript
    // Test the specific bug scenario
    it('handles [edge case] correctly', () => {
      expect(() => buggyFunction(edgeCaseInput))
        .not.toThrow();
    });
    
    // Test related scenarios
    it('handles similar edge cases', () => {
      expect(function(input1)).toBe(expected1);
      expect(function(input2)).toBe(expected2);
    });
    ```

11. **Implement Minimal Fix**
    ```javascript
    // Fix ONLY the root cause
    // Don't refactor unrelated code
    // Keep changes surgical
    ```

12. **Verify Tests Pass**
    ```bash
    npm test -- debug.test.js
    
    # New tests MUST pass
    ```

### Phase 4: Verify the Fix

13. **Run Full Test Suite**
    ```bash
    npm test
    
    # ALL tests must pass
    # No regressions allowed
    ```

14. **Manual Verification**
    - Reproduce original steps
    - Verify bug is gone
    - Check for side effects
    - Test related functionality

15. **Defense in Depth**
    Add safeguards:
    ```javascript
    // Input validation
    if (!isValid(input)) {
      throw new Error('Invalid input');
    }
    
    // Assertions for invariants
    assert(state !== null, 'State should never be null');
    
    // Error boundaries
    try {
      riskyOperation();
    } catch (error) {
      handleGracefully(error);
    }
    ```

16. **Document the Fix**
    ```markdown
    ## Bug Fix: [Description]
    
    **Root Cause**: [What was wrong]
    **Fix**: [What was changed]
    **Tests**: [How we prevent regression]
    **Safeguards**: [How we catch similar issues]
    ```

## Debugging Strategies

### Binary Search Debugging
```javascript
// Comment out half the code
// Does bug still occur?
// Yes → bug in remaining half
// No → bug in commented half
// Repeat until found
```

### State Inspection
```javascript
// Log state at key points
console.log('State before:', JSON.stringify(state, null, 2));
// ... operation ...
console.log('State after:', JSON.stringify(state, null, 2));
```

### Condition-Based Waiting
```javascript
// Instead of arbitrary timeouts
// Wait for specific conditions
async function waitForCondition(predicate, timeout = 5000) {
  const start = Date.now();
  while (!predicate()) {
    if (Date.now() - start > timeout) {
      throw new Error('Timeout waiting for condition');
    }
    await sleep(100);
  }
}
```

## Anti-Patterns

❌ Guessing without evidence
❌ Fixing symptoms not causes
❌ Not writing regression tests
❌ "Shotgun debugging" (random changes)
❌ Not understanding why fix works
❌ Removing failing tests instead of fixing

## Success Criteria

- [ ] Bug reproduced with failing test
- [ ] Root cause identified with evidence
- [ ] Fix is minimal and targeted
- [ ] New tests prevent regression
- [ ] Full test suite passes
- [ ] Manual verification complete
- [ ] Safeguards added
