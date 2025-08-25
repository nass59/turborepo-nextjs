#!/bin/bash

# AI Debug Helper Script
# Provides quick debugging commands and analysis

show_help() {
    echo "🚀 AI Debug Helper"
    echo ""
    echo "Usage: ./debug-helper.sh [command]"
    echo ""
    echo "Commands:"
    echo "  status      Show project health status"
    echo "  types       Check TypeScript errors across project"
    echo "  deps        Analyze dependency issues"
    echo "  lint        Run linting with detailed output"
    echo "  perf        Analyze bundle size and performance"
    echo "  test        Run tests with coverage"
    echo "  clean       Clean all generated files"
    echo "  help        Show this help message"
}

check_status() {
    echo "🏥 Project Health Check"
    echo "======================"
    echo ""

    echo "📦 Checking dependencies..."
    if pnpm sherif > /dev/null 2>&1; then
        echo "✅ Dependencies are consistent"
    else
        echo "❌ Dependency issues found - run 'pnpm check-dependencies'"
    fi

    echo ""
    echo "🔍 Checking TypeScript..."
    if pnpm typecheck > /dev/null 2>&1; then
        echo "✅ TypeScript compilation successful"
    else
        echo "❌ TypeScript errors found - run 'pnpm typecheck'"
    fi

    echo ""
    echo "🧹 Checking linting..."
    if pnpm lint > /dev/null 2>&1; then
        echo "✅ Linting passed"
    else
        echo "❌ Linting issues found - run 'pnpm lint'"
    fi
}

check_types() {
    echo "🔍 TypeScript Analysis"
    echo "====================="
    echo ""
    echo "Running comprehensive type checking..."
    pnpm typecheck
}

check_deps() {
    echo "📦 Dependency Analysis"
    echo "====================="
    echo ""
    echo "Checking for dependency issues..."
    pnpm check-dependencies
    echo ""
    echo "Checking for outdated packages..."
    pnpm dlx npm-check-updates --deep
}

run_lint() {
    echo "🧹 Linting Analysis"
    echo "=================="
    echo ""
    echo "Running Biome linting..."
    pnpm lint
}

analyze_perf() {
    echo "⚡ Performance Analysis"
    echo "====================="
    echo ""
    echo "Building for production analysis..."
    cd apps/web
    pnpm build
    echo ""
    echo "Bundle analysis complete. Check .next/analyze for details."
}

run_tests() {
    echo "🧪 Test Analysis"
    echo "==============="
    echo ""
    echo "Running tests with coverage..."
    # Add test commands when available
    echo "Tests would run here (configure test runner first)"
}

clean_project() {
    echo "🧹 Cleaning Project"
    echo "=================="
    echo ""
    echo "Removing generated files..."
    pnpm clean
    echo "Cleaning complete!"
}

case "$1" in
    "status")
        check_status
        ;;
    "types")
        check_types
        ;;
    "deps")
        check_deps
        ;;
    "lint")
        run_lint
        ;;
    "perf")
        analyze_perf
        ;;
    "test")
        run_tests
        ;;
    "clean")
        clean_project
        ;;
    "help"|"")
        show_help
        ;;
    *)
        echo "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac
