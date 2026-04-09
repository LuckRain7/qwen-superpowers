# Skill: Brainstorming

## Overview

This skill facilitates requirements clarification and design documentation creation through Socratic dialogue before any implementation begins.

## When to Use

- At the start of any new feature or task
- When requirements are unclear or incomplete
- Before writing any implementation plan
- Automatically triggered on task start

## Instructions

### Phase 1: Initial Understanding

1. **Restate the Request**
   - Paraphrase what the user asked for
   - Identify key objectives
   - Note any ambiguities

2. **Ask Clarifying Questions**
   Present 3-5 focused questions to extract a spec:
   - What is the primary goal?
   - Who are the users of this feature?
   - What are the key constraints?
   - What success criteria should we use?
   - Are there any edge cases to consider?

### Phase 2: Design Exploration

3. **Present Design Options**
   For each major design decision:
   - List 2-3 viable approaches
   - Explain trade-offs for each
   - Recommend one with justification

4. **Chunk the Design**
   Break the design into logical components:
   - Data models
   - API endpoints
   - UI components (if applicable)
   - Business logic
   - Integration points

### Phase 3: Validation

5. **Present Design Document**
   Create a structured design doc with:
   ```markdown
   # Design: [Feature Name]
   
   ## Objective
   [What we're building and why]
   
   ## Scope
   [What's included and excluded]
   
   ## Architecture
   [High-level design with diagrams if helpful]
   
   ## Components
   - [Component 1]: [Purpose and interface]
   - [Component 2]: [Purpose and interface]
   
   ## Data Model
   [Entities and relationships]
   
   ## API Design
   [Endpoints and contracts]
   
   ## Testing Strategy
   [What and how we'll test]
   
   ## Open Questions
   [Any remaining uncertainties]
   ```

6. **Get User Approval**
   - Present the design in digestible chunks
   - Wait for explicit user validation
   - Address any concerns before proceeding

### Phase 4: Save Design Doc

7. **Create Design File**
   Save the approved design to:
   ```
   .qwen/designs/[feature-name].md
   ```

8. **Transition to Planning**
   Once approved, signal that planning can begin:
   ```
   Design approved. Ready to proceed to planning phase.
   Loading skill: writing-plans
   ```

## Rules

- NEVER skip brainstorming and go straight to implementation
- ALWAYS ask clarifying questions, even for seemingly simple tasks
- ALWAYS present design options with trade-offs
- ALWAYS wait for user approval before proceeding
- Keep design docs concise (aim for 1-2 pages)
- Focus on WHAT and WHY, not HOW (save details for planning)

## Anti-Patterns to Avoid

❌ Jumping to implementation without understanding requirements
❌ Assuming you know what the user wants
❌ Creating overly complex designs
❌ Skipping trade-off analysis
❌ Proceeding without explicit approval

## Examples

### Good Clarifying Question
```
I understand you want to add user authentication. To design this properly:

1. Should we use JWT tokens or session-based auth?
2. Do we need social login (Google, GitHub, etc.)?
3. Should we support multi-factor authentication?
4. Where should user credentials be stored?
```

### Good Design Chunk
```
## Authentication Component

**Purpose**: Handle user login/logout and token management

**Interface**:
- POST /auth/login → { token, user }
- POST /auth/logout → { success: true }
- GET /auth/verify → { valid: boolean, user? }

**Dependencies**: User model, password hashing library
```

## Success Criteria

- [ ] Requirements are clearly documented
- [ ] Design addresses all requirements
- [ ] Trade-offs have been considered
- [ ] User has explicitly approved the design
- [ ] Design doc is saved to .qwen/designs/
