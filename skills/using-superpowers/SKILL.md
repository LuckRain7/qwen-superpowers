# Skill: Using Superpowers

## Overview

This skill provides an introduction to the Qwen Superpowers system and explains how to use the skill-based workflow framework.

## When to Use

- At the start of any new session
- When a user asks about available capabilities
- When loading skills for the first time

## Instructions

### What Are Skills?

Skills are Markdown files that define behavioral extensions for Qwen Code. They enforce specific workflows and ensure consistent engineering practices.

### How Skills Work

1. **Auto-Triggering**: Skills activate automatically based on the task context
2. **Mandatory Execution**: Once triggered, skills MUST be followed completely
3. **Sequential Flow**: Skills execute in a defined order
4. **Composable**: Skills can reference and build on each other

### Available Skills

#### Core Workflow Skills
- **brainstorming**: Requirements clarification and design
- **using-git-worktrees**: Isolated branch workspace management
- **writing-plans**: Detailed implementation planning
- **subagent-driven-development**: Parallel task execution
- **test-driven-development**: Enforces TDD cycle
- **requesting-code-review**: Automated quality checks
- **finishing-a-development-branch**: Clean branch finalization

#### Supporting Skills
- **systematic-debugging**: 4-phase root cause analysis
- **verification-before-completion**: Ensures fixes work
- **dispatching-parallel-agents**: Concurrent agent execution
- **receiving-code-review**: Handle review feedback
- **writing-skills**: Create new skills

### Skill Execution Flow

```
Task Request
    ↓
brainstorming (clarify requirements)
    ↓
using-git-worktrees (setup workspace)
    ↓
writing-plans (create implementation plan)
    ↓
subagent-driven-development (execute with TDD)
    ↓
requesting-code-review (quality check)
    ↓
finishing-a-development-branch (finalize)
```

### Manual Invocation

Users can manually invoke skills:

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

### Key Principles

1. **Test-Driven Development**: Tests always come first
2. **Systematic Over Ad-Hoc**: Process over guessing
3. **Complexity Reduction**: Simplicity is the primary goal
4. **Evidence Over Claims**: Verify before declaring success

### Next Steps

After understanding this skill, proceed to the appropriate skill based on the current task phase:
- Starting a new task → `brainstorming`
- Ready to plan → `writing-plans`
- Implementing → `subagent-driven-development`
- Debugging → `systematic-debugging`
