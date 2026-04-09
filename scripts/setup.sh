#!/bin/bash

# Qwen Superpowers Setup Script
# Installs superpowers into your project or globally

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     Qwen Superpowers Installation Script       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Parse arguments
INSTALL_MODE="local"
TARGET_DIR=""
SHOW_HELP=false

for arg in "$@"; do
    case $arg in
        --global)
            INSTALL_MODE="global"
            shift
            ;;
        --local)
            INSTALL_MODE="local"
            shift
            ;;
        --help|-h)
            SHOW_HELP=true
            shift
            ;;
        -*)
            echo -e "${RED}Unknown option: $arg${NC}"
            echo "Usage: $0 [--global|--local] [target_directory]"
            exit 1
            ;;
        *)
            if [ -z "$TARGET_DIR" ]; then
                TARGET_DIR="$arg"
            fi
            shift
            ;;
    esac
done

# Show help if requested
if [ "$SHOW_HELP" = true ]; then
    echo -e "${BLUE}Usage:${NC}"
    echo "  $0                          # Install to current directory (local mode)"
    echo "  $0 /path/to/project         # Install to specified directory (local mode)"
    echo "  $0 --global                 # Install globally to ~/.qwen/superpowers"
    echo "  $0 --local /path/to/project # Explicit local mode"
    echo ""
    echo -e "${BLUE}Options:${NC}"
    echo "  --global    Install globally to ~/.qwen/superpowers"
    echo "  --local     Install to project directory (default)"
    echo "  --help, -h  Show this help message"
    echo ""
    echo -e "${BLUE}Modes:${NC}"
    echo "  Local mode (default):  Installs QWEN.md, skills/, hooks/, commands/, agents/ to project"
    echo "  Global mode:           Installs skills/ to ~/.qwen/superpowers (share across projects)"
    exit 0
fi

# Determine target directory based on mode
if [ "$INSTALL_MODE" = "global" ]; then
    if [ -n "$TARGET_DIR" ]; then
        echo -e "${YELLOW}Warning: --global mode ignores target directory argument${NC}"
    fi
    TARGET_DIR="$HOME/.qwen/superpowers"
    echo -e "${BLUE}Installation mode: ${GREEN}Global ($HOME/.qwen/superpowers)${NC}"
else
    if [ -z "$TARGET_DIR" ]; then
        echo -e "${YELLOW}No target directory specified. Installing to current directory...${NC}"
        TARGET_DIR="$(pwd)"
    else
        echo -e "${BLUE}Installation mode: ${GREEN}Local ($TARGET_DIR)${NC}"
    fi
fi
echo ""

# Verify target directory exists (for local mode)
if [ "$INSTALL_MODE" = "local" ] && [ ! -d "$TARGET_DIR" ]; then
    echo -e "${RED}Error: Target directory does not exist: $TARGET_DIR${NC}"
    exit 1
fi

# Create target directory for global mode if needed
if [ "$INSTALL_MODE" = "global" ]; then
    if [ ! -d "$TARGET_DIR" ]; then
        echo -e "${BLUE}Creating global installation directory: ${GREEN}$TARGET_DIR${NC}"
        mkdir -p "$TARGET_DIR"
    fi
fi

echo -e "${BLUE}Installing to: ${GREEN}$TARGET_DIR${NC}"
echo ""

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Check if QWEN.md already exists (only for local mode)
if [ "$INSTALL_MODE" = "local" ] && [ -f "$TARGET_DIR/QWEN.md" ]; then
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

# Copy QWEN.md (only for local mode)
if [ "$INSTALL_MODE" = "local" ]; then
    if [ "$SKIP_QWEN" != true ]; then
        cp "$PROJECT_ROOT/QWEN.md" "$TARGET_DIR/QWEN.md"
        echo -e "${GREEN}✓${NC} Copied QWEN.md"
    fi
else
    echo -e "${YELLOW}Skipping QWEN.md (global mode - add to project manually if needed)${NC}"
fi

# Copy skills directory
if [ "$INSTALL_MODE" = "global" ]; then
    cp -r "$PROJECT_ROOT/skills" "$TARGET_DIR/skills"
    echo -e "${GREEN}✓${NC} Copied skills/"
else
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
if [ "$INSTALL_MODE" = "local" ]; then
    if [ -f "$TARGET_DIR/.qwen-plugin" ]; then
        echo -e "${YELLOW}Warning: .qwen-plugin already exists.${NC}"
    else
        cp "$PROJECT_ROOT/.qwen-plugin" "$TARGET_DIR/.qwen-plugin"
        echo -e "${GREEN}✓${NC} Copied .qwen-plugin"
    fi
else
    echo -e "${YELLOW}Skipping .qwen-plugin (global mode)${NC}"
fi

# Add to .gitignore (only for local mode)
if [ "$INSTALL_MODE" = "local" ]; then
    echo ""
    echo -e "${BLUE}Creating .gitignore entries...${NC}"
    
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
fi

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     Installation Complete! 🎉                 ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
echo ""

if [ "$INSTALL_MODE" = "global" ]; then
    echo -e "${BLUE}Next steps for global installation:${NC}"
    echo ""
    echo -e "1. Review the installed files:"
    echo -e "   ${YELLOW}ls -la $TARGET_DIR/${NC}"
    echo ""
    echo -e "2. Add to your QWEN.md in each project:"
    echo -e "   ${YELLOW}@load ~/.qwen/superpowers/skills/using-superpowers.md${NC}"
    echo ""
    echo -e "3. Or use in Qwen Code sessions:"
    echo -e "   ${YELLOW}/load ~/.qwen/superpowers/skills/using-superpowers.md${NC}"
    echo ""
else
    echo -e "${BLUE}Next steps for local installation:${NC}"
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
fi

echo -e "${BLUE}Documentation:${NC}"
echo -e "   See README.md for usage guide"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
