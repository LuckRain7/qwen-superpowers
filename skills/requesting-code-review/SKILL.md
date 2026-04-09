# Skill: Requesting Code Review

## Overview

This skill performs automated code quality checks before branch completion, blocking progress on critical issues.

## When to Use

- After all implementation tasks complete
- Before finishing a development branch
- Automatically triggered after implementation

## Instructions

### Phase 1: Pre-Review Checklist

1. **Self-Review Checklist**
   Before requesting review, verify:
   
   - [ ] All tests pass
   - [ ] Code follows project conventions
   - [ ] No dead code or commented-out blocks
   - [ ] Complex logic has explanatory comments
   - [ ] No secrets or credentials in code
   - [ ] Error handling is comprehensive
   - [ ] Edge cases are handled
   - [ ] File names are descriptive
   - [ ] Functions are small and focused
   - [ ] No code duplication

2. **Run Automated Checks**
   ```bash
   # Linting
   npm run lint
   
   # Type checking (if applicable)
   npm run type-check
   
   # Full test suite
   npm test
   
   # Test coverage
   npm run coverage
   ```

### Phase 2: Code Review

3. **Review by Category**
   
   **Correctness**
   - [ ] Logic is correct
   - [ ] Edge cases handled
   - [ ] No off-by-one errors
   - [ ] Proper error handling
   - [ ] No race conditions
   
   **Security**
   - [ ] No SQL injection vulnerabilities
   - [ ] No XSS vulnerabilities
   - [ ] Input validation present
   - [ ] Authentication/authorization correct
   - [ ] No exposed secrets
   
   **Performance**
   - [ ] No N+1 queries
   - [ ] Efficient algorithms
   - [ ] No memory leaks
   - [ ] Proper caching if needed
   - [ ] Database indexes present
   
   **Maintainability**
   - [ ] Clear function/variable names
   - [ ] No duplicated code
   - [ ] Single responsibility per function
   - [ ] Appropriate abstractions
   - [ ] Good test coverage
   
   **Architecture**
   - [ ] Follows project patterns
   - [ ] Proper layering
   - [ ] Dependencies are appropriate
   - [ ] No circular dependencies
   - [ ] Matches design doc

### Phase 3: Issue Classification

4. **Classify Findings**
   
   **Critical** (BLOCKS progress)
   - Security vulnerabilities
   - Data loss risks
   - Incorrect core logic
   - Missing authentication
   
   **Major** (Should fix before merge)
   - Performance issues
   - Missing error handling
   - Poor test coverage
   - Violates project conventions
   
   **Minor** (Nice to have)
   - Naming improvements
   - Minor refactoring opportunities
   - Documentation gaps

5. **Report Issues**
   ```markdown
   ## Code Review Results
   
   ### Critical Issues (MUST FIX)
   1. [Issue description]
      - Location: file:line
      - Risk: [Why it's critical]
      - Fix: [Suggested approach]
   
   ### Major Issues (SHOULD FIX)
   1. [Issue description]
      - Location: file:line
      - Impact: [Why it matters]
      - Suggestion: [How to improve]
   
   ### Minor Issues (CONSIDER)
   1. [Issue description]
      - Location: file:line
      - Benefit: [Why consider]
   ```

### Phase 4: Resolution

6. **Block on Critical Issues**
   If ANY critical issues found:
   ```
   ⛔ CRITICAL ISSUES FOUND
   
   Progress blocked until resolved:
   [List critical issues]
   
   Please fix these issues before proceeding.
   ```

7. **Proceed with Warnings**
   If only major/minor issues:
   ```
   ⚠️  ISSUES FOUND (non-blocking)
   
   Major issues (should fix):
   [List]
   
   Minor issues (consider):
   [List]
   
   Proceeding to next phase, but please address major issues.
   ```

8. **All Clear**
   If no issues:
   ```
   ✅ CODE REVIEW PASSED
   
   No issues found. Code quality is good.
   
   Proceeding to branch finalization.
   ```

### Phase 5: User Summary

9. **Present Review Summary**
   ```markdown
   ## Review Summary
   
   **Automated Checks**: ✅ Passing
   - Lint: no issues
   - Types: no errors  
   - Tests: 100% passing
   - Coverage: 85%
   
   **Manual Review**:
   - Correctness: ✅ Good
   - Security: ✅ Good
   - Performance: ⚠️ 1 minor issue
   - Maintainability: ✅ Good
   - Architecture: ✅ Good
   
   **Issues**:
   - Critical: 0
   - Major: 0
   - Minor: 1
   
   **Verdict**: Ready for finalization
   ```

## Review Patterns

### Security Review Pattern
```markdown
Check for:
- Input validation on all user inputs
- Parameterized queries (no string concatenation)
- Authentication on protected routes
- Authorization checks before actions
- No secrets in code or logs
- HTTPS for external calls
- CSRF protection on forms
```

### Performance Review Pattern
```markdown
Check for:
- Database queries in loops
- Missing indexes on frequent queries
- Unnecessary object creation
- Missing caching opportunities
- Large payload transfers
- Synchronous operations in hot paths
```

## Anti-Patterns

❌ Skipping automated checks
❌ Ignoring critical issues
❌ Rubber-stamping reviews
❌ Not classifying issue severity
❌ Reviewing only new code (miss integration issues)
❌ Not running full test suite

## Success Criteria

- [ ] All automated checks pass
- [ ] Review completed for all categories
- [ ] Issues properly classified by severity
- [ ] Critical issues block progress
- [ ] Review summary presented clearly
- [ ] User informed of review results

## Next Steps

Based on review results:
- If critical issues: Fix before proceeding
- If clear or minor issues: 
  ```
  Loading skill: finishing-a-development-branch
  ```
