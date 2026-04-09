#!/bin/bash

# Create a new skill template

set -e

if [ -z "$1" ]; then
    echo "Usage: $0 <skill-name>"
    echo ""
    echo "Creates a new skill template in skills/<skill-name>/"
    exit 1
fi

SKILL_NAME="$1"
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
SKILL_DIR="$PROJECT_ROOT/skills/$SKILL_NAME"

# Check if skill already exists
if [ -d "$SKILL_DIR" ]; then
    echo "Error: Skill '$SKILL_NAME' already exists at $SKILL_DIR"
    exit 1
fi

# Create skill directory
mkdir -p "$SKILL_DIR"

# Create SKILL.md from template
cat > "$SKILL_DIR/SKILL.md" << EOF
# Skill: $SKILL_NAME

## Overview

[2-3 sentences describing what this skill does and why it exists]

## When to Use

- When [condition 1]
- When [condition 2]
- [Automatic/manual] trigger description

## Instructions

### Phase 1: [Phase Name]

1. **[Step Name]**
   Description of what to do
   
   \`\`\`bash
   # Example commands if applicable
   command --flag value
   \`\`\`

2. **[Step Name]**
   Next step description

### Phase 2: [Phase Name]

3. **[Step Name]**
   Continue with next phase

## Rules

### NEVER
❌ [Anti-pattern 1]
❌ [Anti-pattern 2]

### ALWAYS
✅ [Best practice 1]
✅ [Best practice 2]

## Anti-Patterns

❌ [Common mistake 1]
❌ [Common mistake 2]

## Success Criteria

- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion 3]

## Next Steps

When complete, transition to:
\`\`\`
Loading skill: [next-skill-name]
\`\`\`
EOF

echo "✓ Created skill: $SKILL_NAME"
echo "  Location: $SKILL_DIR/SKILL.md"
echo ""
echo "Next steps:"
echo "1. Edit $SKILL_DIR/SKILL.md to customize the skill"
echo "2. Add the skill to .qwen-plugin.json"
echo "3. Test the skill with: /superpowers $SKILL_NAME"
