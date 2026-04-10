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
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function installToLocal(targetDir, skipPrompt = false) {
  const packageRoot = path.join(__dirname, '..');
  const qwenDir = path.join(targetDir, '.qwen');

  console.log(colorize('\nInstallation mode:', 'blue') + colorize(' Local (Project)', 'green'));
  console.log(colorize('Target directory:', 'blue') + colorize(` ${qwenDir}`, 'cyan'));
  console.log();

  // Create .qwen directory if it doesn't exist
  if (!fs.existsSync(qwenDir)) {
    fs.mkdirSync(qwenDir, { recursive: true });
    console.log(colorize('✓', 'green') + ' Created .qwen/ directory');
  } else {
    console.log(colorize('✓', 'yellow') + ' .qwen/ directory already exists');
  }

  // Check if QWEN.md already exists in .qwen
  if (fs.existsSync(path.join(qwenDir, 'QWEN.md'))) {
    console.log(colorize('Warning:', 'yellow') + ' QWEN.md already exists in .qwen/ directory.');
    if (!skipPrompt) {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      return new Promise((resolve) => {
        rl.question(colorize('Do you want to overwrite it? (y/N) ', 'yellow'), (answer) => {
          rl.close();
          if (!answer.toLowerCase().startsWith('y')) {
            console.log(colorize('Skipping QWEN.md', 'yellow'));
            resolve(false);
          } else {
            fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
            console.log(colorize('✓', 'green') + ' Copied QWEN.md');
            resolve(true);
          }
        });
      });
    } else {
      console.log(colorize('Skipping QWEN.md (non-interactive mode)', 'yellow'));
    }
  } else {
    fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
    console.log(colorize('✓', 'green') + ' Copied QWEN.md');
  }

  // Copy skills, hooks, commands, agents directories to .qwen
  ['skills', 'hooks', 'commands', 'agents'].forEach(dir => {
    const srcDir = path.join(packageRoot, dir);
    const destDir = path.join(qwenDir, dir);

    if (!fs.existsSync(srcDir)) {
      console.log(colorize('✓', 'yellow') + ` Skipped ${dir}/ (not found in package)`);
      return;
    }

    if (fs.existsSync(destDir)) {
      console.log(colorize('Warning:', 'yellow') + ` ${dir}/ directory already exists in .qwen/`);
      if (!skipPrompt) {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        return new Promise((resolve) => {
          rl.question(colorize(`Overwrite ${dir}/ directory? (y/N) `, 'yellow'), (answer) => {
            rl.close();
            if (answer.toLowerCase().startsWith('y')) {
              fs.rmSync(destDir, { recursive: true, force: true });
              copyDirectory(srcDir, destDir);
              console.log(colorize('✓', 'green') + ` Copied ${dir}/`);
            } else {
              console.log(colorize(`Skipping ${dir}/ directory`, 'yellow'));
            }
            resolve();
          });
        });
      } else {
        console.log(colorize(`Skipping ${dir}/ directory (non-interactive mode)`, 'yellow'));
      }
    } else {
      copyDirectory(srcDir, destDir);
      console.log(colorize('✓', 'green') + ` Copied ${dir}/`);
    }
  });

  // Copy .qwen-plugin to project root (not .qwen)
  const pluginDest = path.join(targetDir, '.qwen-plugin');
  if (!fs.existsSync(pluginDest)) {
    fs.copyFileSync(path.join(packageRoot, '.qwen-plugin'), pluginDest);
    console.log(colorize('✓', 'green') + ' Copied .qwen-plugin');
  } else {
    console.log(colorize('✓', 'yellow') + ' Skipped .qwen-plugin (already exists)');
  }

  // Update .gitignore
  const gitignorePath = path.join(targetDir, '.gitignore');
  let gitignoreContent = '';

  if (fs.existsSync(gitignorePath)) {
    gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  }

  if (!gitignoreContent.includes('.qwen/worktrees')) {
    gitignoreContent += '\n\n# Qwen Superpowers\n.qwen/worktrees/\n.qwen/designs/\n.qwen/plans/\n';
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log(colorize('✓', 'green') + ' Updated .gitignore');
  } else {
    console.log(colorize('✓', 'yellow') + ' .gitignore already contains Qwen entries');
  }

  return Promise.resolve();
}

function installToGlobal(skipPrompt = false) {
  const packageRoot = path.join(__dirname, '..');
  
  // 确定全局 .qwen 目录
  // macOS/Linux: ~/.qwen
  // Windows: %USERPROFILE%\.qwen
  const qwenDir = path.join(os.homedir(), '.qwen');

  console.log(colorize('\nInstallation mode:', 'blue') + colorize(' Global', 'green'));
  console.log(colorize('Target directory:', 'blue') + colorize(` ${qwenDir}`, 'cyan'));
  console.log();

  // 创建全局 .qwen 目录（如果不存在）
  if (!fs.existsSync(qwenDir)) {
    fs.mkdirSync(qwenDir, { recursive: true });
    console.log(colorize('✓', 'green') + ' Created .qwen/ directory');
  } else {
    console.log(colorize('✓', 'yellow') + ' .qwen/ directory already exists');
  }

  // 检查 QWEN.md 是否已存在
  if (fs.existsSync(path.join(qwenDir, 'QWEN.md'))) {
    console.log(colorize('Warning:', 'yellow') + ' QWEN.md already exists in .qwen/ directory.');
    if (!skipPrompt) {
      const readline = require('readline');
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      return new Promise((resolve) => {
        rl.question(colorize('Do you want to overwrite it? (y/N) ', 'yellow'), (answer) => {
          rl.close();
          if (!answer.toLowerCase().startsWith('y')) {
            console.log(colorize('Skipping QWEN.md', 'yellow'));
            resolve(false);
          } else {
            fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
            console.log(colorize('✓', 'green') + ' Copied QWEN.md');
            resolve(true);
          }
        });
      });
    } else {
      console.log(colorize('Skipping QWEN.md (non-interactive mode)', 'yellow'));
    }
  } else {
    fs.copyFileSync(path.join(packageRoot, 'QWEN.md'), path.join(qwenDir, 'QWEN.md'));
    console.log(colorize('✓', 'green') + ' Copied QWEN.md');
  }

  // 复制 skills, hooks, commands, agents 目录到 .qwen
  ['skills', 'hooks', 'commands', 'agents'].forEach(dir => {
    const srcDir = path.join(packageRoot, dir);
    const destDir = path.join(qwenDir, dir);
    
    if (!fs.existsSync(srcDir)) {
      console.log(colorize('✓', 'yellow') + ` Skipped ${dir}/ (not found in package)`);
      return;
    }
    
    if (fs.existsSync(destDir)) {
      console.log(colorize('Warning:', 'yellow') + ` ${dir}/ directory already exists in .qwen/`);
      if (!skipPrompt) {
        const readline = require('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        return new Promise((resolve) => {
          rl.question(colorize(`Overwrite ${dir}/ directory? (y/N) `, 'yellow'), (answer) => {
            rl.close();
            if (answer.toLowerCase().startsWith('y')) {
              fs.rmSync(destDir, { recursive: true, force: true });
              copyDirectory(srcDir, destDir);
              console.log(colorize('✓', 'green') + ` Copied ${dir}/`);
            } else {
              console.log(colorize(`Skipping ${dir}/ directory`, 'yellow'));
            }
            resolve();
          });
        });
      } else {
        console.log(colorize(`Skipping ${dir}/ directory (non-interactive mode)`, 'yellow'));
      }
    } else {
      copyDirectory(srcDir, destDir);
      console.log(colorize('✓', 'green') + ` Copied ${dir}/`);
    }
  });

  // 复制 .qwen-plugin 到 .qwen 目录
  const pluginDest = path.join(qwenDir, '.qwen-plugin');
  if (!fs.existsSync(pluginDest)) {
    fs.copyFileSync(path.join(packageRoot, '.qwen-plugin'), pluginDest);
    console.log(colorize('✓', 'green') + ' Copied .qwen-plugin');
  } else {
    console.log(colorize('✓', 'yellow') + ' Skipped .qwen-plugin (already exists)');
  }

  console.log(colorize('\nNext steps:', 'bold'));
  console.log('');
  console.log('1. Review the installed files:');
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
        console.log('1. Review the installed files:');
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

  printHeader();

  switch (command) {
    case 'install':
    case 'i':
      if (isGlobal) {
        await installToGlobal(skipPrompt);
      } else {
        const targetDir = isLocal ? (options.find(arg => !arg.startsWith('-')) || process.cwd()) : process.cwd();

        if (!isGlobal && !isLocal && !skipPrompt) {
          // Interactive mode
          await interactiveInstall();
        } else {
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
      listSkills();
      break;

    case 'create-skill':
    case 'create':
      const skillName = options[0];
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
      console.error(colorize(`Unknown command: ${command}`, 'red'));
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
    console.error(colorize('\nError:', 'red'), err.message);
    process.exit(1);
  });
}
