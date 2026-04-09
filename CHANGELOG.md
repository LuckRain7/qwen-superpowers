# CHANGELOG

All notable changes to Qwen Superpowers will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-09

### Added

#### Core Workflow Skills
- `brainstorming` - Requirements clarification and design documentation
- `using-git-worktrees` - Isolated branch workspace management
- `writing-plans` - Detailed implementation planning with task breakdown
- `subagent-driven-development` - Parallel task execution with fresh agents
- `test-driven-development` - Enforces RED-GREEN-REFACTOR cycle
- `requesting-code-review` - Automated quality checks
- `finishing-a-development-branch` - Clean branch finalization

#### Supporting Skills
- `systematic-debugging` - 4-phase root cause analysis
- `verification-before-completion` - Ensures fixes actually work
- `dispatching-parallel-agents` - Concurrent agent execution
- `receiving-code-review` - Handle review feedback
- `writing-skills` - Create new custom skills
- `executing-plans` - Batch plan execution with checkpoints
- `using-superpowers` - Introduction to the skill system

#### Infrastructure
- `.qwen-plugin` configuration file
- `QWEN.md` system prompt injection
- Auto-triggering hooks system
- Manual command system
- Agent configurations (default, subagent, reviewer, debugger)
- Setup scripts for easy installation

#### Documentation
- Comprehensive README with usage guide
- Detailed skill documentation
- Agent system prompts
- Setup and installation guide

### Features

- **Mandatory Workflow Pipeline**: Automatic enforcement of engineering practices
- **Test-Driven Development**: Tests always written before implementation
- **Systematic Debugging**: Evidence-based root cause analysis
- **Code Quality**: Automated reviews blocking on critical issues
- **Isolation**: Git worktrees for clean branch management
- **Extensibility**: Easy creation of custom skills
