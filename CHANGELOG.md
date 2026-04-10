# CHANGELOG

All notable changes to Qwen Superpowers will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.2] - 2026-04-10

### Fixed

#### Global Installation Bug
- Fixed all files not being copied during global installation (`--global` flag)
- Changed `forEach` to `for...of` loop to properly handle async Promise operations
- Made `installToLocal` and `installToGlobal` functions properly async
- All directories (skills, hooks, commands, agents) and files now correctly installed to `~/.qwen/`

## [1.1.1] - 2026-04-10

### Fixed

#### CLI Improvements
- Added version display in help output (`--version`, `-v`, `version` command)
- Replaced hardcoded command name with dynamic `PACKAGE_NAME` constant
- Added `VERSION` export for programmatic access
- Improved consistency in usage examples and error messages

## [1.1.0] - 2026-04-10

### Added

#### Installation System
- `npx` based installation - no global installation required
- `install` command with `--local` and `--global` flags
- `--yes` / `-y` flag for non-interactive installation
- `list` command to show available skills
- `create-skill` command to create custom skills
- `help` command for usage information

#### Improved Installation Paths
- **Local installation**: Files copied to `./.qwen/` directory
- **Global installation**: Files copied to `~/.qwen/` (macOS/Linux) or `%USERPROFILE%\.qwen/` (Windows)
- Cross-platform support for Windows users
- Automatic `.qwen/` directory creation if not exists
- Smart skip for already installed directories with overwrite prompts

### Changed

- Updated all README files to use `npx` commands instead of global npm installation
- Simplified installation process - no more setup scripts required
- Better user experience with clear installation prompts
- Consistent directory structure for local and global installations

### Deprecated

- `./scripts/setup.sh` - replaced by `npx qwen-superpowers-r install`

### Documentation

- Updated README.md (English)
- Updated README.zh.md (Chinese)
- Updated README.ja.md (Japanese)
- Updated README.ko.md (Korean)
- Updated README.es.md (Spanish)
- Updated README.fr.md (French)
- Updated README.de.md (German)

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
