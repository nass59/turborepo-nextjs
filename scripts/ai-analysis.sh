#!/bin/bash

# AI Project Analysis Script
# Generates comprehensive documentation for AI understanding

echo "🤖 Starting AI Analysis..."

# Create docs directory if it doesn't exist
mkdir -p docs/analysis

# Generate TypeScript analysis
echo "📊 Analyzing TypeScript configuration..."
echo "# TypeScript Analysis" > docs/analysis/typescript-analysis.md
echo "" >> docs/analysis/typescript-analysis.md
echo "## Configuration Summary" >> docs/analysis/typescript-analysis.md
echo "- Strict mode: enabled" >> docs/analysis/typescript-analysis.md
echo "- Target: ES2022" >> docs/analysis/typescript-analysis.md
echo "- Module resolution: NodeNext" >> docs/analysis/typescript-analysis.md
echo "- Additional strict checks enabled for AI safety" >> docs/analysis/typescript-analysis.md

# Generate project structure
echo "📁 Analyzing project structure..."
echo "# Project Structure Analysis" > docs/analysis/structure-analysis.md
echo "" >> docs/analysis/structure-analysis.md
echo "## Monorepo Layout" >> docs/analysis/structure-analysis.md
echo "\`\`\`" >> docs/analysis/structure-analysis.md
tree -I 'node_modules|.next|.turbo|dist' -L 3 >> docs/analysis/structure-analysis.md 2>/dev/null || echo "Tree command not available" >> docs/analysis/structure-analysis.md
echo "\`\`\`" >> docs/analysis/structure-analysis.md

# Generate dependencies analysis
echo "📦 Analyzing dependencies..."
echo "# Dependencies Analysis" > docs/analysis/dependencies-analysis.md
echo "" >> docs/analysis/dependencies-analysis.md
echo "## Key Dependencies" >> docs/analysis/dependencies-analysis.md
echo "- Next.js: Latest with App Router" >> docs/analysis/dependencies-analysis.md
echo "- React: Version 19" >> docs/analysis/dependencies-analysis.md
echo "- TypeScript: Latest with strict configuration" >> docs/analysis/dependencies-analysis.md
echo "- Tailwind CSS: Version 4" >> docs/analysis/dependencies-analysis.md
echo "- Turborepo: For monorepo management" >> docs/analysis/dependencies-analysis.md

# Generate coding patterns analysis
echo "🎨 Analyzing coding patterns..."
echo "# Coding Patterns Analysis" > docs/analysis/patterns-analysis.md
echo "" >> docs/analysis/patterns-analysis.md
echo "## Established Patterns" >> docs/analysis/patterns-analysis.md
echo "- Functional components with TypeScript" >> docs/analysis/patterns-analysis.md
echo "- React Server Components for server-side logic" >> docs/analysis/patterns-analysis.md
echo "- Custom hooks for reusable logic" >> docs/analysis/patterns-analysis.md
echo "- Zod for runtime validation" >> docs/analysis/patterns-analysis.md
echo "- Tailwind for styling with design system" >> docs/analysis/patterns-analysis.md

# Generate AI recommendations
echo "🧠 Generating AI recommendations..."
echo "# AI Development Recommendations" > docs/analysis/ai-recommendations.md
echo "" >> docs/analysis/ai-recommendations.md
echo "## Documentation Standards" >> docs/analysis/ai-recommendations.md
echo "- Use JSDoc comments for all public functions and components" >> docs/analysis/ai-recommendations.md
echo "- Follow the documentation template in docs/ai-documentation-template.md" >> docs/analysis/ai-recommendations.md
echo "- Create ADRs for significant architectural decisions" >> docs/analysis/ai-recommendations.md
echo "" >> docs/analysis/ai-recommendations.md
echo "## Code Quality" >> docs/analysis/ai-recommendations.md
echo "- Maintain strict TypeScript configuration" >> docs/analysis/ai-recommendations.md
echo "- Use consistent naming conventions" >> docs/analysis/ai-recommendations.md
echo "- Implement proper error handling patterns" >> docs/analysis/ai-recommendations.md
echo "- Write comprehensive tests" >> docs/analysis/ai-recommendations.md

echo "✅ AI Analysis Complete! Check docs/analysis/ for results."
echo ""
echo "📝 Next steps:"
echo "1. Review generated documentation"
echo "2. Add JSDoc comments to existing code"
echo "3. Create ADRs for major decisions"
echo "4. Set up automated documentation generation"
