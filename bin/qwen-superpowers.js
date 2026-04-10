#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const { version: VERSION } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);
const PACKAGE_NAME = 'Qwen Superpowers';

// Configuration
const COPY_QWEN_MD = false; // Set to false to skip QWEN.md copying

// Colors for terminal output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

function colorize(text, color) {
  return `${COLORS[color] || ''}${text}${COLORS.reset}`;
}

function printHeader() {
  console.log(colorize('╔══════════════════════════════════════════════════╗', 'blue'));
  console.log(colorize('║          Qwen Superpowers Installer              ║', 'blue'));
  console.log(colorize('╚══════════════════════════════════════════════════╝', 'blue'));
  console.log();
}

function printHelp() {
  console.log(colorize(`Version: ${VERSION}`, 'dim'));
  console.log();
  console.log(colorize('Usage:', 'bold'));
  console.log(`  ${colorize(PACKAGE_NAME, 'cyan')}                     # Interactive installation`);
  console.log(`  ${colorize(`${PACKAGE_NAME} install`, 'cyan')}             # Interactive installation`);
  console.log(`  ${colorize(`${PACKAGE_NAME} install --global`, 'cyan')}    # Install globally`);
  console.log(`  ${colorize(`${PACKAGE_NAME} install --local [dir]`, 'cyan')} # Install to project`);
  console.log();
  console.log(colorize('Commands:', 'bold'));
  console.log(`  ${colorize('install', 'cyan')}        Install superpowers (default command)`);
  console.log(`  ${colorize('list', 'cyan')}           List available skills`);
  console.log(`  ${colorize('create-skill <name>', 'cyan')}  Create a new skill`);
  console.log(`  ${colorize('help', 'cyan')}           Show this help message`);
  console.log();
  console.log(colorize('Options:', 'bold'));
  console.log(`  ${colorize('--global', 'yellow')}     Install globally to ~/.qwen`);
  console.log(`  ${colorize('--local', 'yellow')}      Install to project directory (default)`);
  console.log(`  ${colorize('--yes', 'yellow')}, ${colorize('-y', 'yellow')}       Skip prompts (non-interactive)`);
  console.log(`  ${colorize('--help', 'yellow')}, ${colorize('-h', 'yellow')}      Show help`);
  console.log();
}

function listSkills() {
  const packageRoot = path.join(__dirname, '..');
  const skillsDir = path.join(packageRoot, 'skills');

  if (!fs.existsSync(skillsDir)) {
    console.error(colorize('Error: skills directory not found', 'red'));
    process.exit(1);
  }

  const skills = fs.readdirSync(skillsDir).filter(dir => {
    return fs.statSync(path.join(skillsDir, dir)).isDirectory();
  });

  console.log(colorize('\nAvailable Skills:\n', 'bold'));
  skills.forEach((skill, index) => {
    const skillFile = path.join(skillsDir, skill, 'SKILL.md');
    let description = '';
    if (fs.existsSync(skillFile)) {
      const content = fs.readFileSync(skillFile, 'utf8');
      const match = content.match(/Overview:\s*\n\s*(.+?)(?:\n\n|\n##)/s);
      if (match) {
        description = match[1].trim().substring(0, 80);
      }
    }
    console.log(`  ${colorize(`${index + 1}.`, 'green')} ${colorize(skill, 'cyan')}${description ? colorize(` - ${description}`, 'dim') : ''}`);
  });
  console.log(`\n  Total: ${colorize(skills.length + ' skills', 'bold')}\n`);
}

function createSkill(skillName) {
  if (!skillName) {
    console.error(colorize('Error: skill name is required', 'red'));
    console.log(`Usage: ${colorize(`${PACKAGE_NAME} create-skill <name>`, 'cyan')}\n`);
    process.exit(1);
  }

  const packageRoot = path.join(__dirname, '..');
  const skillsDir = path.join(packageRoot, 'skills');
  const newSkillDir = path.join(skillsDir, skillName);

  if (fs.existsSync(newSkillDir)) {
    console.error(colorize(`Error: skill '${skillName}' already exists`, 'red'));
    process.exit(1);
  }

  fs.mkdirSync(newSkillDir, { recursive: true });

  const skillContent = `# ${skillName}

## Overview
[Describe what this skill does and when to use it]

## When to Use
[Describe the conditions that trigger this skill]

## Instructions

### Phase 1: [Phase Name]
1. [Step description]
2. [Step description]
3. [Step description]

### Phase 2: [Phase Name]
1. [Step description]
2. [Step description]

## Rules

### NEVER
- Never [anti-pattern]
- Never [anti-pattern]

### ALWAYS
- Always [best practice]
- Always [best practice]

## Anti-Patterns to Avoid
- [Common mistake]
- [Common mistake]

## Success Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Next Steps
- Transition to: [next skill name]
`;

  fs.writeFileSync(path.join(newSkillDir, 'SKILL.md'), skillContent);
  console.log(colorize(`✓`, 'green') + ` Created skill: ${colorize(skillName, 'cyan')}`);
  console.log(colorize(`  Location: ${newSkillDir}`, 'dim'));
  console.log(colorize(`  Edit SKILL.md to customize your skill\n`, 'dim'));
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
    console.log(colorize(`  📁 Created directory: ${dest}`, 'dim'));
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  let copiedCount = 0;
  let skippedCount = 0;

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      // Only copy files that don't already exist in destination
      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
        copiedCount++;
        console.log(colorize(`    📄 Copied file: ${entry.name}`, 'dim'));
      } else {
        skippedCount++;
        console.log(colorize(`    ⏭️  Skipped existing: ${entry.name}`, 'dim'));
      }
    }
  }

  if (copiedCount > 0 || skippedCount > 0) {
    console.log(colorize(`    ✓ Subtotal: ${copiedCount} new files, ${skippedCount} skipped`, 'cyan'));
  }
}

async function installToLocal(targetDir, skipPrompt = false) {
  const packageRoot = path.join(__dirname, '..');
  const qwenDir = path.join(targetDir, '.qwen');

  console.log(colorize('\nInstallation mode:', 'blue') + colorize(' Local (Project)', 'green'));
  console.log(colorize('Target directory:', 'blue') + colorize(` ${qwenDir}`, 'cyan'));
  console.log(colorize('Package root:', 'blue') + colorize(` ${packageRoot}`, 'cyan'));
  console.log();

  // Create .qwen directory if it doesn't exist
  console.log(colorize('Step 1/5:', 'bold') + ' Create .qwen directory');
  if (!fs.existsSync(qwenDir)) {
    fs.mkdirSync(qwenDir, { recursive: true });
    console.log(colorize('  ✓ Created: .qwen/ directory', 'green'));
  } else {
    console.log(colorize('  ✓ Already exists: .qwen/ directory', 'yellow'));
  }

  // Check if QWEN.md already exists in .qwen
  if (COPY_QWEN_MD) {
    console.log(colorize('\nStep 2/5:', 'bold') + ' Process QWEN.md');
    if (fs.existsSync(path.join(qwenDir, 'QWEN.md'))) {
      console.log(colorize('  ⚠️  Warning: QWEN.md already exists in .qwen/ directory', 'yellow'));
      if (!skipPrompt) {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        return new Promise((resolve) => {
          rl.question(colorize('  Overwrite? (y/N) ', 'yellow'), (answer) => {
            rl.close();
            if (!answer.toLowerCase().startsWith('y')) {
              console.log(colorize('  ⏭️  Skipped QWEN.md', 'yellow'));
              resolve(false);
            } else {
              fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
              console.log(colorize('  ✓ Copied: QWEN.md', 'green'));
              resolve(true);
            }
          });
        });
      } else {
        console.log(colorize('  ⏭️  Skipped QWEN.md (non-interactive mode)', 'yellow'));
      }
    } else {
      fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
      console.log(colorize('  ✓ Copied: QWEN.md', 'green'));
    }
  } else {
    console.log(colorize('\nStep 2/5:', 'bold') + ' Process QWEN.md');
    console.log(colorize('  ⏭️  Skipped QWEN.md (COPY_QWEN_MD is disabled)', 'yellow'));
  }

  // Copy skills, hooks, commands, agents directories to .qwen
  const dirsToCopy = ['skills', 'hooks', 'commands', 'agents'];

  console.log(colorize('\nStep 3/5:', 'bold') + ' Copy skills, hooks, commands, and agents directories');
  for (const dir of dirsToCopy) {
    const srcDir = path.join(packageRoot, dir);
    const destDir = path.join(qwenDir, dir);

    console.log(colorize(`  → Processing ${dir}/:`, 'cyan'));

    if (!fs.existsSync(srcDir)) {
      console.log(colorize(`    ⏭️  Skipped ${dir}/ (not found in package)`, 'yellow'));
      continue;
    }

    if (fs.existsSync(destDir)) {
      console.log(colorize(`    ℹ️  Info: ${dir}/ directory already exists in .qwen/`, 'cyan'));
      console.log(colorize(`    → Merging new files into existing directory`, 'dim'));
      copyDirectory(srcDir, destDir);
      console.log(colorize(`  ✓ Merged: ${dir}/ (preserved existing files)`, 'green'));
    } else {
      copyDirectory(srcDir, destDir);
      console.log(colorize(`  ✓ Copied: ${dir}/`, 'green'));
    }
  }

  // Copy .qwen-plugin to project root (not .qwen)
  console.log(colorize('\nStep 4/5:', 'bold') + ' Copy plugin file');
  const pluginDest = path.join(targetDir, '.qwen-plugin');
  if (!fs.existsSync(pluginDest)) {
    fs.copyFileSync(path.join(packageRoot, '.qwen-plugin'), pluginDest);
    console.log(colorize('  ✓ Copied: .qwen-plugin', 'green'));
  } else {
    console.log(colorize('  ⏭️  Skipped .qwen-plugin (already exists)', 'yellow'));
  }

  // Update .gitignore
  console.log(colorize('\nStep 5/5:', 'bold') + ' Update .gitignore');
  const gitignorePath = path.join(targetDir, '.gitignore');
  let gitignoreContent = '';

  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    console.log(colorize('  ℹ️  Read existing .gitignore file', 'dim'));
  } else {
    console.log(colorize('  ℹ️  .gitignore not found, will create new file', 'dim'));
  }

  if (!gitignoreContent.includes('.qwen/worktrees')) {
    gitignoreContent += '\n\n# Qwen Superpowers\n.qwen/worktrees/\n.qwen/designs/\n.qwen/plans/\n';
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log(colorize('  ✓ Updated: .gitignore (added Qwen ignore rules)', 'green'));
  } else {
    console.log(colorize('  ⏭️  Skipped .gitignore (already contains Qwen rules)', 'yellow'));
  }

  return Promise.resolve();
}

async function installToGlobal(skipPrompt = false) {
  const packageRoot = path.join(__dirname, '..');

  // Determine global .qwen directory
  // macOS/Linux: ~/.qwen
  // Windows: %USERPROFILE%\.qwen
  const qwenDir = path.join(os.homedir(), '.qwen');

  console.log(colorize('\nInstallation mode:', 'blue') + colorize(' Global', 'green'));
  console.log(colorize('Target directory:', 'blue') + colorize(` ${qwenDir}`, 'cyan'));
  console.log(colorize('Package root:', 'blue') + colorize(` ${packageRoot}`, 'cyan'));
  console.log();

  // Create global .qwen directory if it doesn't exist
  console.log(colorize('Step 1/4:', 'bold') + ' Create global .qwen directory');
  if (!fs.existsSync(qwenDir)) {
    fs.mkdirSync(qwenDir, { recursive: true });
    console.log(colorize('  ✓ Created: .qwen/ directory', 'green'));
  } else {
    console.log(colorize('  ✓ Already exists: .qwen/ directory', 'yellow'));
  }

  // Check if QWEN.md already exists
  if (COPY_QWEN_MD) {
    console.log(colorize('\nStep 2/4:', 'bold') + ' Process QWEN.md');
    if (fs.existsSync(path.join(qwenDir, 'QWEN.md'))) {
      console.log(colorize('  ⚠️  Warning: QWEN.md already exists in .qwen/ directory', 'yellow'));
      if (!skipPrompt) {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        return new Promise((resolve) => {
          rl.question(colorize('  Overwrite? (y/N) ', 'yellow'), (answer) => {
            rl.close();
            if (!answer.toLowerCase().startsWith('y')) {
              console.log(colorize('  ⏭️  Skipped QWEN.md', 'yellow'));
              resolve(false);
            } else {
              fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
              console.log(colorize('  ✓ Copied: QWEN.md', 'green'));
              resolve(true);
            }
          });
        });
      } else {
        console.log(colorize('  ⏭️  Skipped QWEN.md (non-interactive mode)', 'yellow'));
      }
    } else {
      fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
      console.log(colorize('  ✓ Copied: QWEN.md', 'green'));
    }
  } else {
    console.log(colorize('\nStep 2/4:', 'bold') + ' Process QWEN.md');
    console.log(colorize('  ⏭️  Skipped QWEN.md (COPY_QWEN_MD is disabled)', 'yellow'));
  }

  // Copy skills, hooks, commands, agents directories to .qwen
  const dirsToCopy = ['skills', 'hooks', 'commands', 'agents'];

  console.log(colorize('\nStep 3/4:', 'bold') + ' Copy skills, hooks, commands, and agents directories');
  for (const dir of dirsToCopy) {
    const srcDir = path.join(packageRoot, dir);
    const destDir = path.join(qwenDir, dir);

    console.log(colorize(`  → Processing ${dir}/:`, 'cyan'));

    if (!fs.existsSync(srcDir)) {
      console.log(colorize(`    ⏭️  Skipped ${dir}/ (not found in package)`, 'yellow'));
      continue;
    }

    if (fs.existsSync(destDir)) {
      console.log(colorize(`    ℹ️  Info: ${dir}/ directory already exists in .qwen/`, 'cyan'));
      console.log(colorize(`    → Merging new files into existing directory`, 'dim'));
      copyDirectory(srcDir, destDir);
      console.log(colorize(`  ✓ Merged: ${dir}/ (preserved existing files)`, 'green'));
    } else {
      copyDirectory(srcDir, destDir);
      console.log(colorize(`  ✓ Copied: ${dir}/`, 'green'));
    }
  }

  // Copy .qwen-plugin to .qwen directory
  console.log(colorize('\nStep 4/4:', 'bold') + ' Copy plugin file');
  const pluginDest = path.join(qwenDir, '.qwen-plugin');
  if (!fs.existsSync(pluginDest)) {
    fs.copyFileSync(path.join(packageRoot, '.qwen-plugin'), pluginDest);
    console.log(colorize('  ✓ Copied: .qwen-plugin', 'green'));
  } else {
    console.log(colorize('  ⏭️  Skipped .qwen-plugin (already exists)', 'yellow'));
  }

  console.log(colorize('\nNext steps:', 'bold'));
  console.log('');
  console.log('1. Review installed files:');
  console.log(`   ${colorize(`ls -la ${qwenDir}`, 'yellow')}`);
  console.log('');
  console.log('2. Add to your QWEN.md in each project:');
  console.log(`   ${colorize('@load ~/.qwen/skills/using-superpowers.md', 'yellow')}`);
  console.log('');
  console.log('3. Or use in Qwen Code sessions:');
  console.log(`   ${colorize('/load ~/.qwen/skills/using-superpowers.md', 'yellow')}`);
  console.log('');
}

function interactiveInstall() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }

  return question(colorize('\nWhere would you like to install Qwen Superpowers?\n', 'bold') +
    `${colorize('1)', 'cyan')} ${colorize('Current Project', 'green')} - Install to this directory\n` +
    `${colorize('2)', 'cyan')} ${colorize('Global', 'magenta')} - Install to ~/.qwen (share across projects)\n\n` +
    colorize('Choose (1 or 2): ', 'yellow'))
    .then(async (answer) => {
      rl.close();

      const choice = answer.trim();

      if (choice === '1') {
        const targetDir = process.cwd();
        console.log(colorize(`\nInstalling to current project: ${targetDir}`, 'cyan'));
        await installToLocal(targetDir, false);

        console.log(colorize('\n╔══════════════════════════════════════════════════╗', 'green'));
        console.log(colorize('║     Installation Complete! 🎉                     ║', 'green'));
        console.log(colorize('╚══════════════════════════════════════════════════╝', 'green'));
        console.log();
        console.log(colorize('Next steps:', 'bold'));
        console.log('');
        console.log('1. Review installed files:');
        console.log(`   ${colorize('ls -la', 'yellow')}`);
        console.log('');
        console.log('2. Start using superpowers in your Qwen Code sessions');
        console.log('   Skills will auto-trigger based on your tasks');
        console.log('');
        console.log('3. Manual invocation:');
        console.log(`   ${colorize('/superpowers help', 'yellow')}`);
        console.log('');
        console.log(colorize('Happy coding! 🚀', 'green'));
        console.log('');
      } else if (choice === '2') {
        await installToGlobal(false);

        console.log(colorize('╔══════════════════════════════════════════════════╗', 'green'));
        console.log(colorize('║     Global Installation Complete! 🎉            ║', 'green'));
        console.log(colorize('╚══════════════════════════════════════════════════╝', 'green'));
        console.log();
      } else {
        console.log(colorize('\nInvalid choice. Installation cancelled.', 'red'));
        process.exit(1);
      }
    });
}

function postInstall() {
  // This runs after npm install completes
  // Only run interactive prompt if this is a global install
  if (process.env.npm_config_global || process.env.npm_config_prefix) {
    console.log(colorize('\n🎉 Thank you for installing Qwen Superpowers!', 'green'));
    console.log(colorize('Run', 'dim') + colorize(` ${PACKAGE_NAME}`, 'cyan') + colorize(' to set up in your project\n', 'dim'));
  }
}

// Main CLI logic
async function main() {
  const args = process.argv.slice(2);

  console.log(colorize(`\n🚀 Qwen Superpowers Installer v${VERSION}`, 'cyan'));
  console.log(colorize('═══════════════════════════════════════════════════', 'dim'));

  // Handle --help, -h, --version, -v anywhere
  if (args.includes('--help') || args.includes('-h')) {
    printHeader();
    printHelp();
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(colorize(`${PACKAGE_NAME} v${VERSION}`, 'cyan'));
    process.exit(0);
  }

  const command = args[0] || 'install';
  const options = args.slice(1);

  const isGlobal = options.includes('--global');
  const isLocal = options.includes('--local');
  const skipPrompt = options.includes('--yes') || options.includes('-y');

  console.log(colorize(`Command: ${command}`, 'dim'));
  console.log(colorize(`Options: ${options.join(', ') || 'none'}`, 'dim'));
  console.log();

  switch (command) {
    case 'install':
    case 'i':
      console.log(colorize('Starting installation...', 'cyan'));
      if (isGlobal) {
        await installToGlobal(skipPrompt);
      } else {
        const targetDir = isLocal ? (options.find(arg => !arg.startsWith('-')) || process.cwd()) : process.cwd();

        if (!isGlobal && !isLocal && !skipPrompt) {
          // Interactive mode
          console.log(colorize('Entering interactive mode...', 'dim'));
          await interactiveInstall();
        } else {
          console.log(colorize(`Target directory: ${targetDir}`, 'cyan'));
          await installToLocal(targetDir, skipPrompt);

          console.log(colorize('\n╔══════════════════════════════════════════════════╗', 'green'));
          console.log(colorize('║     Installation Complete! 🎉                     ║', 'green'));
          console.log(colorize('╚══════════════════════════════════════════════════╝', 'green'));
          console.log();
        }
      }
      break;

    case 'list':
    case 'ls':
      console.log(colorize('📋 Fetching available skills...', 'cyan'));
      listSkills();
      break;

    case 'create-skill':
    case 'create':
      const skillName = options[0];
      console.log(colorize(`✨ Creating new skill: ${skillName || '(unnamed)'}`, 'cyan'));
      createSkill(skillName);
      break;

    case 'help':
      printHelp();
      break;

    case 'version':
    case 'v':
      console.log(colorize(`${PACKAGE_NAME} v${VERSION}`, 'cyan'));
      process.exit(0);
      break;

    default:
      console.error(colorize(`\n❌ Unknown command: ${command}`, 'red'));
      console.log(`Run ${colorize(`${PACKAGE_NAME} help`, 'cyan')} for usage information\n`);
      process.exit(1);
  }
}

// Export for use by other modules
module.exports = {
  VERSION,
  postInstall,
  installToLocal,
  installToGlobal,
  listSkills,
  createSkill
};

// Run main if called directly
if (require.main === module) {
  main().catch(err => {
    console.error(colorize('\n❌ Error occurred:', 'red'), err.message);
    console.error(colorize('Stack trace:', 'dim'));
    console.error(colorize(err.stack, 'dim'));
    process.exit(1);
  });
}
