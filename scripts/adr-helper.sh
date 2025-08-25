#!/bin/bash

# ADR (Architecture Decision Records) Helper Script
# Simplifies creating and managing ADRs

show_help() {
    echo "🏗️  ADR Helper"
    echo ""
    echo "Usage: ./adr-helper.sh [command] [options]"
    echo ""
    echo "Commands:"
    echo "  new <title>     Create a new ADR with the given title"
    echo "  list            List all ADRs with their status"
    echo "  status <num>    Update the status of an ADR"
    echo "  link <from> <to> Create a link between ADRs"
    echo "  help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./adr-helper.sh new \"Choose Database Technology\""
    echo "  ./adr-helper.sh list"
    echo "  ./adr-helper.sh status 0004 accepted"
}

create_new_adr() {
    local title="$1"
    if [ -z "$title" ]; then
        echo "❌ Error: Title is required"
        echo "Usage: ./adr-helper.sh new \"Your ADR Title\""
        exit 1
    fi

    # Find next ADR number
    local last_num=$(ls docs/adr/[0-9]*.md 2>/dev/null | sed 's/.*\/\([0-9]*\)-.*/\1/' | sort -n | tail -1)
    if [ -z "$last_num" ]; then
        last_num=0
    fi
    # Remove leading zeros for arithmetic
    last_num=$(echo "$last_num" | sed 's/^0*//')
    if [ -z "$last_num" ]; then
        last_num=0
    fi
    local next_num=$(printf "%04d" $((last_num + 1)))

    # Create filename from title
    local filename=$(echo "$title" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')
    local filepath="docs/adr/${next_num}-${filename}.md"

    # Create ADR from template
    cp docs/adr/template.md "$filepath"

    # Replace template placeholders
    local current_date=$(date +%Y-%m-%d)
    sed -i.bak "s/# ADR Template/# ${next_num}: ${title}/" "$filepath"
    sed -i.bak "s/YYYY-MM-DD/${current_date}/" "$filepath"
    sed -i.bak "s/\[Proposed | Accepted | Deprecated | Superseded\]/Proposed/" "$filepath"
    rm "${filepath}.bak"

    echo "✅ Created new ADR: $filepath"
    echo "📝 Next steps:"
    echo "   1. Edit the ADR file to add your content"
    echo "   2. Update docs/adr/README.md with the new ADR"
    echo "   3. Commit your changes"

    # Open in default editor if available
    if command -v code >/dev/null 2>&1; then
        code "$filepath"
    elif [ -n "$EDITOR" ]; then
        $EDITOR "$filepath"
    fi
}

list_adrs() {
    echo "📋 Architecture Decision Records"
    echo "================================"
    echo ""

    if [ ! -d "docs/adr" ]; then
        echo "❌ No ADR directory found. Run from project root."
        exit 1
    fi

    local found_adrs=false
    for adr in docs/adr/[0-9]*.md; do
        if [ -f "$adr" ]; then
            found_adrs=true
            local num=$(basename "$adr" | cut -d'-' -f1)
            local title=$(grep "^# " "$adr" | head -1 | sed 's/^# [0-9]*: //')
            local status=$(grep "^\*\*Status:\*\*" "$adr" | sed 's/.*Status:\*\* *//' | sed 's/ *$//')
            local date=$(grep "^\*\*Date:\*\*" "$adr" | sed 's/.*Date:\*\* *//' | sed 's/ *$//')

            # Status emoji
            local status_emoji=""
            case "$status" in
                "Accepted") status_emoji="✅" ;;
                "Proposed") status_emoji="🔄" ;;
                "Deprecated") status_emoji="🚫" ;;
                "Superseded") status_emoji="🔄" ;;
                *) status_emoji="❓" ;;
            esac

            printf "%-4s %s %-12s %s %s\n" "$num" "$status_emoji" "$status" "$date" "$title"
        fi
    done

    if [ "$found_adrs" = false ]; then
        echo "📝 No ADRs found. Create your first ADR with:"
        echo "   ./adr-helper.sh new \"Your First Decision\""
    fi
}

update_status() {
    local adr_num="$1"
    local new_status="$2"

    if [ -z "$adr_num" ] || [ -z "$new_status" ]; then
        echo "❌ Error: ADR number and status are required"
        echo "Usage: ./adr-helper.sh status 0001 accepted"
        echo "Valid statuses: proposed, accepted, deprecated, superseded"
        exit 1
    fi

    # Find ADR file
    local adr_file=$(ls docs/adr/${adr_num}-*.md 2>/dev/null | head -1)
    if [ ! -f "$adr_file" ]; then
        echo "❌ Error: ADR $adr_num not found"
        exit 1
    fi

    # Validate status
    case "$new_status" in
        "proposed"|"accepted"|"deprecated"|"superseded")
            local capitalized_status=$(echo "$new_status" | sed 's/^./\U&/')
            ;;
        *)
            echo "❌ Error: Invalid status '$new_status'"
            echo "Valid statuses: proposed, accepted, deprecated, superseded"
            exit 1
            ;;
    esac

    # Update status in file
    sed -i.bak "s/^\*\*Status:\*\* .*/\*\*Status:\*\* $capitalized_status/" "$adr_file"
    rm "${adr_file}.bak"

    echo "✅ Updated ADR $adr_num status to: $capitalized_status"
    echo "📝 Don't forget to update docs/adr/README.md if needed"
}

link_adrs() {
    local from_adr="$1"
    local to_adr="$2"

    if [ -z "$from_adr" ] || [ -z "$to_adr" ]; then
        echo "❌ Error: Both ADR numbers are required"
        echo "Usage: ./adr-helper.sh link 0001 0002"
        exit 1
    fi

    echo "🔗 ADR linking feature coming soon!"
    echo "For now, manually add links in the 'Links' section of your ADRs"
}

# Main script logic
case "$1" in
    "new")
        create_new_adr "$2"
        ;;
    "list")
        list_adrs
        ;;
    "status")
        update_status "$2" "$3"
        ;;
    "link")
        link_adrs "$2" "$3"
        ;;
    "help"|"")
        show_help
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
