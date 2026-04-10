#!/bin/bash

# NPM Package Preparation Script
# Validates and prepares qwen-superpowers for npm publish

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     NPM Package Preparation                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

ERRORS=0

# Check 1: package.json exists
echo -e "${BLUE}Checking package.json...${NC}"
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ package.json not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ package.json found${NC}"
fi

# Check 2: Validate package.json structure
echo -e "${BLUE}Validating package.json structure...${NC}"
if command -v node &> /dev/null; then
    # Check bin field
    BIN_FIELD=$(node -p "try { JSON.parse(require('fs').readFileSync('package.json', 'utf8')).bin['qwen-superpowers'] } catch(e) { '' }")
    if [ "$BIN_FIELD" = "./bin/qwen-superpowers.js" ]; then
        echo -e "${GREEN}✓ bin field correctly set${NC}"
    else
        echo -e "${RED}✗ bin field missing or incorrect${NC}"
        ERRORS=$((ERRORS + 1))
    fi

    # Check version
    VERSION=$(node -p "try { JSON.parse(require('fs').readFileSync('package.json', 'utf8')).version } catch(e) { 'unknown' }")
    echo -e "${GREEN}✓ version: ${VERSION}${NC}"

    # Check name
    NAME=$(node -p "try { JSON.parse(require('fs').readFileSync('package.json', 'utf8')).name } catch(e) { 'unknown' }")
    echo -e "${GREEN}✓ name: ${NAME}${NC}"
else
    echo -e "${YELLOW}⚠ node not available, skipping JSON validation${NC}"
fi

# Check 3: CLI script exists and is executable
echo -e "${BLUE}Checking CLI script...${NC}"
if [ -f "bin/qwen-superpowers.js" ]; then
    if [ -x "bin/qwen-superpowers.js" ]; then
        echo -e "${GREEN}✓ bin/qwen-superpowers.js is executable${NC}"
    else
        echo -e "${YELLOW}⚠ bin/qwen-superpowers.js not executable, fixing...${NC}"
        chmod +x bin/qwen-superpowers.js
        echo -e "${GREEN}✓ Made bin/qwen-superpowers.js executable${NC}"
    fi
else
    echo -e "${RED}✗ bin/qwen-superpowers.js not found${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Check 4: Required directories exist
echo -e "${BLUE}Checking required directories...${NC}"
for dir in skills hooks commands agents scripts; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓ ${dir}/${NC}"
    else
        echo -e "${RED}✗ ${dir}/ not found${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check 5: Required files exist
echo -e "${BLUE}Checking required files...${NC}"
for file in QWEN.md .qwen-plugin README.md LICENSE; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ ${file}${NC}"
    else
        echo -e "${RED}✗ ${file} not found${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check 6: Skills have SKILL.md files
echo -e "${BLUE}Validating skills...${NC}"
SKILL_COUNT=0
for skill_dir in skills/*/; do
    if [ -f "${skill_dir}SKILL.md" ]; then
        SKILL_COUNT=$((SKILL_COUNT + 1))
    else
        echo -e "${RED}✗ ${skill_dir} missing SKILL.md${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo -e "${GREEN}✓ ${SKILL_COUNT} skills validated${NC}"

# Check 7: No sensitive files
echo -e "${BLUE}Checking for sensitive files...${NC}"
if [ -f ".env" ]; then
    echo -e "${RED}✗ .env file found (should not be packaged)${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ No .env files${NC}"
fi

# Check 8: npm pack dry run
echo -e "${BLUE}Running npm pack dry-run...${NC}"
if command -v npm &> /dev/null; then
    echo -e "${YELLOW}This will show what would be packaged:${NC}"
    npm pack --dry-run 2>&1 | head -50
    echo ""
else
    echo -e "${YELLOW}⚠ npm not available, skipping pack check${NC}"
fi

echo ""
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}╔════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║     Package is ready for publishing! 🎉       ║${NC}"
    echo -e "${GREEN}╚════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo ""
    echo "  1. Login to npm (if not already):"
    echo -e "     ${YELLOW}npm login${NC}"
    echo ""
    echo "  2. Publish the package:"
    echo -e "     ${YELLOW}npm publish${NC}"
    echo ""
    echo "  3. Test installation:"
    echo -e "     ${YELLOW}npm install -g qwen-superpowers${NC}"
    echo -e "     ${YELLOW}qwen-superpowers${NC}"
    echo ""
    exit 0
else
    echo -e "${RED}╔════════════════════════════════════════════════╗${NC}"
    echo -e "${RED}║     Package has ${ERRORS} error(s) - fix before publishing  ║${NC}"
    echo -e "${RED}╚════════════════════════════════════════════════╝${NC}"
    exit 1
fi
