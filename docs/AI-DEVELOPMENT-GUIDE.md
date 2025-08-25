# 🤖 AI Development Guide

This guide helps developers and AI systems understand, navigate, and contribute to this project effectively.

## 📋 Quick Start for AI

### Project Overview
- **Type**: Next.js 15 Turborepo monorepo
- **Language**: TypeScript with strict mode
- **Framework**: React 19 with Server Components
- **Styling**: Tailwind CSS 4 with design system
- **Architecture**: Modular, type-safe, AI-optimized

### Key Commands
```bash
# Development
pnpm dev                    # Start development servers
pnpm build                  # Build for production
pnpm typecheck             # Check TypeScript
pnpm lint                   # Run linting
pnpm format                 # Format code

# AI-Specific
pnpm ai:analyze             # Run AI analysis
./scripts/debug-helper.sh   # Debug assistance
./scripts/ai-analysis.sh    # Generate documentation
```

## 🏗️ Architecture

### Monorepo Structure
```
turborepo-nextjs/
├── apps/
│   ├── web/               # Main Next.js application
│   └── storybook/         # Component documentation
├── packages/
│   ├── design-system/     # Shared UI components
│   └── typescript-config/ # Shared TypeScript configs
├── docs/                  # Project documentation
│   ├── adr/              # Architecture Decision Records
│   └── analysis/         # AI-generated analysis
└── scripts/              # Utility scripts
```

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI, Framer Motion
- **Build**: Turborepo, pnpm, Biome
- **Documentation**: Storybook, MDX, JSDoc
- **Quality**: Strict TypeScript, ESLint, Prettier

## 🎯 AI Development Patterns

### 1. Type-Driven Development
```typescript
// Always define types first
interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences?: UserPreferences;
}

// Use type guards for runtime safety
const isValidUser = (user: unknown): user is UserProfile => {
  return typeof user === 'object' &&
         user !== null &&
         'id' in user &&
         'name' in user;
};
```

### 2. Component Documentation
```typescript
/**
 * User profile card component
 *
 * @component
 * @param props - Component props
 * @param props.user - User data to display
 * @param props.onEdit - Callback when edit is clicked
 *
 * @example
 * ```tsx
 * <UserCard
 *   user={userData}
 *   onEdit={(user) => console.log('Edit', user)}
 * />
 * ```
 */
export const UserCard = ({ user, onEdit }: UserCardProps) => {
  // Implementation
};
```

### 3. Server Component Patterns
```typescript
// Server Component - no 'use client'
export default async function UserPage({ params }: PageProps) {
  const user = await fetchUser(params.id);

  return (
    <div>
      <UserProfile user={user} />
      <InteractiveSection userId={user.id} />
    </div>
  );
}

// Client Component - when needed
'use client';
export const InteractiveSection = ({ userId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  // Client-side logic
};
```

## 🔍 Debugging Guide

### Common Issues & Solutions

#### TypeScript Errors
```bash
# Check specific file
pnpm typecheck --noEmit apps/web/app/page.tsx

# Fix common issues
- Missing type imports
- Incorrect prop types
- Server/Client component mixups
```

#### Build Issues
```bash
# Clean build
pnpm clean && pnpm install && pnpm build

# Debug specific app
cd apps/web && pnpm build --debug
```

#### Styling Issues
```bash
# Check Tailwind compilation
pnpm dev # Watch for CSS errors in console

# Verify design system imports
# Use components from @workspace/design-system
```

### Debug Configurations
Use VSCode debug configurations:
- **Debug Next.js App**: Full app debugging
- **Debug Next.js Client**: Browser debugging
- **Debug Storybook**: Component debugging
- **Debug Jest Tests**: Test debugging

## 📝 Documentation Standards

### Code Documentation
- Use JSDoc for all public functions
- Document component props and usage
- Include examples in documentation
- Explain complex business logic

### Architecture Decisions
- Create ADRs for significant decisions
- Document why, not just what
- Include implementation details
- Consider AI understanding

### File Organization
```typescript
// File structure pattern
export-name/
├── index.ts           # Main export
├── component.tsx      # Component implementation
├── types.ts          # Type definitions
├── utils.ts          # Helper functions
├── hooks.ts          # Custom hooks
└── component.test.tsx # Tests
```

## 🚀 Performance Optimization

### React Performance
- Use Server Components by default
- Client Components only for interactivity
- Implement proper loading states
- Use React.memo() judiciously

### Next.js Optimization
```typescript
// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});

// Image optimization
import Image from 'next/image';
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For above-fold images
/>
```

### Bundle Analysis
```bash
# Analyze bundle size
cd apps/web
pnpm build
# Check .next/analyze/ for reports
```

## 🧪 Testing Strategy

### Component Testing
```typescript
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('displays user information', () => {
    const user = { id: '1', name: 'John', email: 'john@example.com' };
    render(<UserCard user={user} onEdit={jest.fn()} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

### Integration Testing
```typescript
// API route testing
import { createMocks } from 'node-mocks-http';
import handler from '../api/users';

describe('/api/users', () => {
  it('returns user list', async () => {
    const { req, res } = createMocks({ method: 'GET' });
    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(String) })
      ])
    );
  });
});
```

## 🛠️ Development Workflow

### Getting Started
1. Clone repository
2. Run `pnpm install`
3. Copy `.env.example` to `.env.local`
4. Run `pnpm dev`
5. Open http://localhost:3000

### Making Changes
1. Create feature branch
2. Make changes following patterns
3. Add/update tests
4. Update documentation
5. Run quality checks
6. Submit pull request

### Quality Checks
```bash
# Before committing
pnpm typecheck  # TypeScript validation
pnpm lint       # Code quality
pnpm test       # Run tests
pnpm build      # Production build
```

## 📊 AI Analysis Tools

### Automated Analysis
```bash
# Generate comprehensive analysis
./scripts/ai-analysis.sh

# Debug assistance
./scripts/debug-helper.sh status
./scripts/debug-helper.sh types
./scripts/debug-helper.sh deps
```

### Manual Analysis
- Review TypeScript errors for type safety
- Check bundle size for performance
- Validate accessibility with tools
- Test cross-browser compatibility

## 🔗 Related Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## 🎯 AI-Specific Notes

When working with AI tools:
- Provide context about the monorepo structure
- Mention TypeScript strict mode requirements
- Reference the design system for UI components
- Follow established patterns and conventions
- Consider performance implications
- Update documentation with changes

This project is designed to be AI-friendly with clear patterns, comprehensive types, and detailed documentation.
