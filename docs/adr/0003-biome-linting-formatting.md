# 0003: Use Biome for Linting and Formatting

**Status:** Accepted
**Date:** 2025-01-25
**Deciders:** Development Team

## Context and Problem Statement

The project needs consistent code formatting and linting across all packages and applications with fast performance and modern JavaScript/TypeScript support.

## Decision Drivers

* Performance requirements (faster than ESLint + Prettier)
* Unified tooling (linting + formatting in one tool)
* Modern JavaScript/TypeScript feature support
* Minimal configuration overhead
* Team productivity and consistency

## Considered Options

* Biome - Modern unified linter and formatter
* ESLint + Prettier - Traditional separate tools
* Rome (predecessor to Biome)
* Deno fmt + Deno lint
* SWC-based tools

## Decision Outcome

Chosen option: "Biome", because it provides excellent performance, unified tooling, and modern feature support with minimal configuration.

### Positive Consequences

* Significantly faster than ESLint + Prettier combination
* Single tool for both linting and formatting
* Excellent TypeScript and modern JavaScript support
* Minimal configuration required
* Good integration with VSCode and other editors

### Negative Consequences

* Newer tool with smaller ecosystem
* Some ESLint plugins not available
* Learning curve for team members familiar with ESLint

## Implementation

### Code Changes Required
- [x] Configure biome.json with project-specific rules
- [x] Set up VSCode integration
- [x] Configure package.json scripts
- [x] Remove old ESLint/Prettier configurations

### Migration Strategy
- [x] Gradual migration from existing linting setup
- [x] Maintained code quality standards
- [x] Updated CI/CD pipelines

## AI Context

### Complexity Assessment
- **Technical Complexity**: Low
- **Business Impact**: Medium
- **Maintenance Burden**: Low

### Related Patterns
- Code quality automation
- Development workflow optimization
- Tool consolidation pattern

### Future Considerations
- Monitor Biome ecosystem growth
- Evaluate new rules and features as they're released
- Consider custom rule development if needed

## Links

* [Biome Documentation](https://biomejs.dev/)
* [Migration from ESLint](https://biomejs.dev/guides/migrate-eslint/)

## Notes

This decision modernizes our code quality tooling while improving developer experience through faster feedback loops.
