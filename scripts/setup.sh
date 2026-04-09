#!/bin/bash

# Qwen Superpowers Setup Script
# Installs superpowers into your project

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Qwen Superpowers Installation Script      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Detect current project
if [ -z "$1" ]; then
    echo -e "${YELLOW}No target directory specified. Installing to current directory...${NC}"
    TARGET_DIR="$(pwd)"
else
    TARGET_DIR="$1"
fi

# Verify target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}Error: Target directory does not exist: $TARGET_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}Installing to: ${GREEN}$TARGET_DIR${NC}"
echo ""

# Check if QWEN.md already exists
if [ -f "$TARGET_DIR/QWEN.md" ]; then
    echo -e "${YELLOW}Warning: QWEN.md already exists in target directory.${NC}"
    read -p "Do you want to overwrite it? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Skipping QWEN.md installation${NC}"
        SKIP_QWEN=true
    fi
fi

# Copy files
echo -e "${BLUE}Copying superpowers files...${NC}"

# Copy QWEN.md
if [ "$SKIP_QWEN" != true ]; then
    cp "$PROJECT_ROOT/QWEN.md" "$TARGET_DIR/QWEN.md"
    echo -e "${GREEN}✓${NC} Copied QWEN.md"
fi

# Copy skills directory
if [ -d "$TARGET_DIR/skills" ]; then
    echo -e "${YELLOW}Warning: skills/ directory already exists.${NC}"
    read -p "Overwrite skills directory? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$TARGET_DIR/skills"
        cp -r "$PROJECT_ROOT/skills" "$TARGET_DIR/skills"
        echo -e "${GREEN}✓${NC} Copied skills/"
    else
        echo -e "${YELLOW}Skipping skills/ directory${NC}"
    fi
else
    cp -r "$PROJECT_ROOT/skills" "$TARGET_DIR/skills"
    echo -e "${GREEN}✓${NC} Copied skills/"
fi

# Copy hooks
if [ -d "$TARGET_DIR/hooks" ]; then
    echo -e "${YELLOW}Warning: hooks/ directory already exists.${NC}"
else
    cp -r "$PROJECT_ROOT/hooks" "$TARGET_DIR/hooks"
    echo -e "${GREEN}✓${NC} Copied hooks/"
fi

# Copy commands
if [ -d "$TARGET_DIR/commands" ]; then
    echo -e "${YELLOW}Warning: commands/ directory already exists.${NC}"
else
    cp -r "$PROJECT_ROOT/commands" "$TARGET_DIR/commands"
    echo -e "${GREEN}✓${NC} Copied commands/"
fi

# Copy agents
if [ -d "$TARGET_DIR/agents" ]; then
    echo -e "${YELLOW}Warning: agents/ directory already exists.${NC}"
else
    cp -r "$PROJECT_ROOT/agents" "$TARGET_DIR/agents"
    echo -e "${GREEN}✓${NC} Copied agents/"
fi

# Copy plugin config
if [ -f "$TARGET_DIR/.qwen-plugin" ]; then
    echo -e "${YELLOW}Warning: .qwen-plugin already exists.${NC}"
else
    cp "$PROJECT_ROOT/.qwen-plugin" "$TARGET_DIR/.qwen-plugin"
    echo -e "${GREEN}✓${NC} Copied .qwen-plugin"
fi

echo ""
echo -e "${BLUE}Creating .gitignore entries...${NC}"

# Add to .gitignore if not present
if [ -f "$TARGET_DIR/.gitignore" ]; then
    if ! grep -q ".qwen/worktrees" "$TARGET_DIR/.gitignore"; then
        cat >> "$TARGET_DIR/.gitignore" << 'EOF'

# Qwen Superpowers
.qwen/worktrees/
.qwen/designs/
.qwen/plans/
EOF
        echo -e "${GREEN}✓${NC} Updated .gitignore"
    fi
else
    cat > "$TARGET_DIR/.gitignore" << 'EOF'
# Qwen Superpowers
.qwen/worktrees/
.qwen/designs/
.qwen/plans/
EOF
    echo -e "${GREEN}✓${NC} Created .gitignore"
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     Installation Complete! 🎉                 ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo ""
echo -e "1. Review the installed files:"
echo -e "   ${YELLOW}ls -la $TARGET_DIR/${NC}"
echo ""
echo -e "2. Start using superpowers in your Qwen Code sessions"
echo -e "   Skills will auto-trigger based on your tasks"
echo ""
echo -e "3. Manual invocation:"
echo -e "   ${YELLOW}/superpowers help${NC}"
echo ""
echo -e "${BLUE}Documentation:${NC}"
echo -e "   See README.md for usage guide"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
