# Skill: Receiving Code Review

## Overview

This skill handles incorporating feedback from code reviews, whether from human reviewers or automated checks.

## When to Use

- After receiving PR comments
- When review issues are identified
- During the review-feedback cycle

## Instructions

### Phase 1: Understand Feedback

1. **Collect All Feedback**
   Gather review comments and categorize:
   ```markdown
   ## Review Feedback
   
   ### Critical (Must Address)
   1. [Comment] - Reviewer: [name]
      - File: line
      - Severity: critical
   
   ### Suggestions (Consider)
   1. [Comment] - Reviewer: [name]
      - File: line
      - Severity: suggestion
   ```

2. **Clarify Ambiguities**
   For unclear comments:
   - Ask reviewer for clarification
   - Don't assume intent
   - Confirm understanding before implementing

### Phase 2: Address Feedback

3. **Triage Comments**
   For each comment:
   
   **Accept** (majority of cases):
   - Reviewer has valid point
   - Change improves code quality
   - Fix is straightforward
   
   **Decline** (with justification):
   - Comment is incorrect
   - Change would degrade code
   - Already considered and rejected
   - Out of scope
   
   **Defer** (rarely):
   - Valid but large refactor
   - Better suited for follow-up
   - Get agreement first

4. **Implement Accepted Changes**
   For each accepted comment:
   ```bash
   # Make the change
   # Run affected tests
   npm test -- affected.test.js
   
   # Commit with reference to review
   git add -A
   git commit -m "fix(review): [description]
   
   Addresses review comment: [reference]"
   ```

5. **Respond to Declined Comments**
   Politely explain reasoning:
   ```markdown
   Regarding [comment]:
   
   I've considered this, but I'm going to keep the current implementation because:
   
   [Specific technical reasoning]
   
   Alternative considered:
   [What was evaluated]
   
   Why not:
   [Why alternative wasn't chosen]
   
   Happy to discuss further!
   ```

### Phase 3: Verification

6. **Run Full Test Suite**
   ```bash
   npm test
   
   # All tests must still pass
   # No regressions allowed
   ```

7. **Verify All Feedback Addressed**
   ```markdown
   ## Feedback Resolution
   
   - [✓] Comment 1: Fixed in commit [hash]
   - [✓] Comment 2: Fixed in commit [hash]
   - [✓] Comment 3: Declined with justification
   - [✓] Comment 4: Deferred to issue #123
   
   All feedback addressed.
   ```

### Phase 4: Resubmit

8. **Update PR/Request Re-Review**
   ```markdown
   @reviewer I've addressed your feedback:
   
   ✅ Fixed: [list what was fixed]
   💬 Discussed: [list what was discussed]
   
   All tests passing. Ready for another look!
   ```

## Anti-Patterns

❌ Ignoring review comments
❌ Making changes without understanding
❌ Not running tests after changes
❌ Being defensive about feedback
❌ Not responding to all comments
❌ Silently declining suggestions

## Success Criteria

- [ ] All feedback reviewed and triaged
- [ ] Valid feedback implemented
- [ ] Declined feedback justified
- [ ] Tests still passing
- [ ] All comments responded to
- [ ] Reviewer notified of changes
