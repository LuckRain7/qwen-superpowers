#!/bin/bash

# List all available skills and their status

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

echo "Available Skills:"
echo "================"
echo ""

for skill_dir in "$PROJECT_ROOT"/skills/*/; do
    skill_name=$(basename "$skill_dir")
    skill_file="$skill_dir/SKILL.md"
    
    if [ -f "$skill_file" ]; then
        # Extract overview from skill file
        overview=$(grep -A 2 "## Overview" "$skill_file" | tail -1 | sed 's/^ *//')
        
        echo -e "\033[1;34m$skill_name\033[0m"
        if [ -n "$overview" ]; then
            echo -e "  \033[0;37m$overview\033[0m"
        fi
        echo ""
    fi
done

echo "Usage:"
echo "------"
echo "  /superpowers <skill-name>    Invoke a skill manually"
echo "  /superpowers help            Show this help"
echo ""
