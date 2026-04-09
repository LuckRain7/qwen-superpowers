# Skill: Test-Driven Development

## Overview

This skill enforces the RED-GREEN-REFACTOR cycle for all implementation work. Tests MUST be written before implementation code.

## When to Use

- During implementation phase
- Automatically triggered by subagent-driven-development
- For every feature, fix, or refactor

## Instructions

### The TDD Cycle

```
RED → Write a failing test
  ↓
GREEN → Write minimal code to pass
  ↓
REFACTOR → Improve code, keep tests passing
  ↓
Repeat for next behavior
```

### Phase 1: RED (Write Tests First)

1. **Identify Behavior**
   What specific behavior needs to be tested?
   - Be precise about inputs and outputs
   - Include edge cases
   - Test one thing per test

2. **Write the Test**
   ```javascript
   describe('UserModel', () => {
     it('should reject invalid email addresses', () => {
       // Test invalid email
       expect(() => new User({ email: 'invalid' }))
         .toThrow('Invalid email format');
     });
   });
   ```

3. **Run Test → MUST FAIL**
   ```bash
   npm test -- file.test.js
   
   # Verify test fails with expected error
   # If test passes, the test is wrong
   ```

### Phase 2: GREEN (Make It Pass)

4. **Write Minimal Implementation**
   ```javascript
   // Only what's needed to pass the test
   class User {
     constructor({ email }) {
       if (!this.isValidEmail(email)) {
         throw new Error('Invalid email format');
       }
       this.email = email;
     }
     
     isValidEmail(email) {
       return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
     }
   }
   ```

5. **Run Test → MUST PASS**
   ```bash
   npm test -- file.test.js
   
   # All tests should pass
   # If not, fix implementation
   ```

### Phase 3: REFACTOR (Improve Code Quality)

6. **Improve Without Breaking Tests**
   - Extract methods
   - Remove duplication
   - Improve naming
   - Add error handling
   - Optimize if needed

7. **Run Tests → MUST STILL PASS**
   ```bash
   npm test
   
   # Full test suite must pass
   # If not, revert refactor
   ```

8. **Repeat Cycle**
   Move to next behavior and repeat

## Strict Rules

### NEVER

❌ Write implementation before tests
❌ Skip the RED phase
❌ Commit without passing tests
❌ Write tests after implementation
❌ Ignore failing tests
❌ Refactor without running tests

### ALWAYS

✅ Write tests FIRST, every time
✅ Run tests after every change
✅ Keep tests fast (<100ms each)
✅ Test behavior, not implementation
✅ Use descriptive test names
✅ One assertion per test when possible
✅ Run full test suite before commits

## Test Structure (Arrange-Act-Assert)

```javascript
it('should do [expected behavior] when [condition]', () => {
  // Arrange: Setup test data
  const input = { /* ... */ };
  
  // Act: Call the code under test
  const result = functionUnderTest(input);
  
  // Assert: Verify the result
  expect(result).toBe(expectedValue);
});
```

## Test Categories

### Unit Tests
- Test single functions/methods
- Fast execution
- No external dependencies
- Mock external calls

### Integration Tests
- Test component interactions
- May use real dependencies
- Slower but necessary

### Edge Cases to Test
- Empty inputs
- Null/undefined values
- Boundary conditions
- Error scenarios
- Invalid data

## Example TDD Session

```
=== TDD Session: Email Validation ===

Task: Validate email format

1. [RED] Write test for invalid email:
   it('rejects invalid email', () => {
     expect(() => new User({ email: 'bad' })).toThrow();
   });
   → Test FAILS ✓

2. [GREEN] Implement validation:
   if (!email.includes('@')) throw new Error('Invalid');
   → Test PASSES ✓

3. [REFACTOR] Extract validation:
   validateEmail(email) { /* ... */ }
   → Tests still PASS ✓

4. [RED] Add test for valid email:
   it('accepts valid email', () => {
     const user = new User({ email: 'test@example.com' });
     expect(user.email).toBe('test@example.com');
   });
   → Test FAILS ✓

5. [GREEN] Update implementation:
   if (!this.isValidEmail(email)) throw new Error('Invalid');
   → Test PASSES ✓

6. [REFACTOR] Improve validation regex:
   const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   → All tests PASS ✓

✓ TDD cycle complete for email validation
```

## Common Mistakes

### Testing Implementation
```javascript
// ❌ BAD: Tests internal implementation
it('should call validateEmail method', () => {
  jest.spyOn(User.prototype, 'validateEmail');
  // ...
});

// ✅ GOOD: Tests behavior
it('should reject invalid emails', () => {
  expect(() => new User({ email: 'bad' })).toThrow();
});
```

### Not Testing Edge Cases
```javascript
// ❌ INCOMPLETE: Only happy path
it('creates user with valid email', () => { /* ... */ });

// ✅ COMPLETE: Includes edge cases
it('creates user with valid email', () => { /* ... */ });
it('rejects email without @', () => { /* ... */ });
it('rejects email without domain', () => { /* ... */ });
it('rejects empty email', () => { /* ... */ });
it('rejects null email', () => { /* ... */ });
```

## Verification Checklist

Before declaring TDD complete for a task:

- [ ] All tests written BEFORE implementation
- [ ] RED-GREEN-REFACTOR cycle followed
- [ ] All tests passing
- [ ] Full test suite passing
- [ ] Edge cases covered
- [ ] No commented-out test code
- [ ] Tests are fast and reliable
- [ ] Test names are descriptive

## Integration with Subagent-Driven-Development

When used with subagent-driven-development:

1. Subagent MUST write tests first
2. Subagent MUST run tests after each change
3. Subagent CANNOT commit until tests pass
4. Review MUST verify test-first approach
5. Full test suite runs after each task

## Success Criteria

- [ ] Tests written before implementation code
- [ ] RED-GREEN-REFACTOR cycle followed
- [ ] All new tests pass
- [ ] All existing tests still pass
- [ ] Edge cases covered
- [ ] No implementation without tests
- [ ] Code is refactored and clean
