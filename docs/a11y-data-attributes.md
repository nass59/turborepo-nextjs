## Accessibility Data Attributes (`data-a11y`)

Purpose: provide stable, semantic, framework‑agnostic hooks for:
1. Automated & manual accessibility audits
2. E2E / component test selectors (Playwright, Cypress, RTL)
3. Lightweight analytics & RUM instrumentation
4. Debugging / DOM introspection during development
5. Future feature gating or progressive enhancement

Why not rely on classes / text / roles?
- Classes change for styling refactors; text changes for localization; roles sometimes repeated. `data-a11y` stays stable and intentionally minimal.
- `data-testid` is test-only; `data-a11y` is safe in production and meaningful to multiple subsystems.

### Naming Conventions

- Format: kebab-case semantic label (e.g. `site-header`, `primary-nav`, `main`, `live-region`).
- Scope: Only structural landmarks, grouped interactive regions, or singleton utility elements.
- Do not encode presentation (no colors, spacing) or business data that could be sensitive.
- Avoid over-tagging: prefer clarity over volume.

### Current Registry

| Attribute Value      | Element                         | Purpose |
|----------------------|----------------------------------|---------|
| `skip-link`          | Skip navigation anchor          | Quick focus jump target; accessibility audit hook |
| `site-header`        | `<header>` root                  | Landmark identification |
| `primary-nav`        | Main nav `<nav>`                 | Navigation structure verification |
| `home-link`          | Brand/home anchor                | Identify logo/home action |
| `header-links-wrapper` | Container for external links  | Group for iterating link items |
| `external-links`     | `<ul>` of external links         | Batch auditing links |
| `external-link-item` | `<li>` each external link item   | Precise selection in tests |
| `external-link-anchor` | Anchor inside list            | Instrument outbound click |
| `main`               | `<main>` landmark                | Landmark & focus target after skip link |
| `live-region`        | Polite `aria-live` container     | Announcements, screen reader messaging |

Supplemental attributes:
| Attribute          | Description                          |
|--------------------|--------------------------------------|
| `data-link`        | Outbound URL (non-sensitive)          |
| `data-link-label`  | Human-readable label for analytics    |

### Adding a New `data-a11y`

Checklist before adding:
1. Is the element a structural landmark or reusable interactive grouping? If not, skip.
2. Can an existing value cover the use case? Prefer reuse.
3. Will this remain stable if UI wording changes? If not, reconsider.
4. Document it here in the registry table.

### Example: Test Selectors

Playwright:
```ts
// Select main region
const main = page.locator('[data-a11y="main"]');
await expect(main).toBeVisible();

// Assert external links rendered
await expect(page.locator('[data-a11y="external-link-item"]')).toHaveCount(1);

// Click GitHub link
await page.click('[data-a11y="external-link-anchor"][data-link-label="GitHub"]');
```

React Testing Library:
```tsx
const main = screen.getByRole('main'); // Prefer role when possible
// Fallback or structural check
const liveRegion = screen.getByTestId('skip-link').closest('body')?.querySelector('[data-a11y="live-region"]');
expect(liveRegion).not.toBeNull();
```

### Example: Analytics Hook

```ts
document.addEventListener('click', (e) => {
  const anchor = (e.target as HTMLElement).closest('[data-a11y="external-link-anchor"]') as HTMLAnchorElement | null;
  if (!anchor) return;
  window.dispatchEvent(new CustomEvent('analytics:outbound-click', {
    detail: {
      href: anchor.getAttribute('data-link'),
      label: anchor.getAttribute('data-link-label'),
      ts: Date.now(),
    },
  }));
});
```

### Example: Performance Timing

```ts
const main = document.querySelector('[data-a11y="main"]');
if (main) performance.mark('main-dom-ready');
```

### Live Region Usage

Inject messages:
```ts
export function announce(message: string, politeness: 'polite' | 'assertive' = 'polite') {
  const region = document.querySelector('[data-a11y="live-region"]');
  if (!region) return;
  const el = document.createElement('div');
  if (politeness === 'assertive') region.setAttribute('aria-live', 'assertive');
  el.textContent = message;
  region.appendChild(el);
  setTimeout(() => {
    el.remove();
    if (politeness === 'assertive') region.setAttribute('aria-live', 'polite');
  }, 3000);
}
```

### Maintenance

- Keep this document updated with each addition/removal.
- Run a periodic (e.g. CI) audit: script scans DOM in a built page ensuring required core attributes exist (`main`, `site-header`, `primary-nav`, `skip-link`).
- Avoid repurposing a value; create a new one if semantics differ.
- If removing an attribute, deprecate by announcing in CHANGELOG and updating tests first.

### Anti-Patterns

- Tagging every button or decorative element (noise > signal)
- Embedding user data or PII (privacy risk)
- Using `data-a11y` to drive styling (defeats separation of concerns)
- Duplicating the same value on unrelated elements

### Migration Strategy (If Needed)

If we ever need to rename a core value:
1. Introduce the new value in parallel.
2. Update tests/analytics to accept both.
3. Remove the old one after one release cycle.

### Future Extensions

- `data-a11y="footer"` when a footer is introduced.
- `data-a11y="modal-root"` for accessible dialog portals.
- `data-a11y="toast-region"` if toasts need structured auditing beyond existing provider.

---
Revision: 1.0  • Last updated: {{DATE}}
