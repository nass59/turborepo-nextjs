# 0011: Adoption of `data-a11y` Attributes

- Status: Accepted
- Date: 2025-08-29
- Authors: @nass59
- Supersedes: None
- Related: 0003 (Biome Linting & Formatting), 0007 (Error Handling Strategy), 0009 (Performance Monitoring), 0010 (API Design Standards)

## Context

We require stable, semantic DOM hooks that serve multiple cross-cutting concerns:

1. Accessibility auditing (landmarks, navigation patterns, live region presence)
2. Automated & manual UI testing (Playwright / RTL selectors that survive refactors)
3. Lightweight analytics and Real User Monitoring (outbound link tracking, feature usage)
4. Debugging and DOM introspection during development (clear structural markers)
5. Progressive enhancement / future feature gating without overloading roles/classes

Historically, teams rely on `data-testid`, class names, or textual content for selection and instrumentation:
- `data-testid` is test-scoped and semantically opaque.
- Classes churn for styling refactors (Tailwind utility reordering, design changes).
- Visible text is unstable (localization, copy iteration) and role attributes can be duplicated across unrelated elements.

## Decision

Introduce a controlled namespace of semantic attributes using the pattern:
```
[data-a11y="<kebab-case-token>"]
```
Applied only to structural landmarks, grouped interactive regions, and singleton utility elements (e.g. live region container).

A central registry is maintained in `docs/a11y-data-attributes.md` that documents:
- Current canonical tokens
- Purpose and usage examples
- Guidelines for adding/removing values
- Anti-patterns and migration strategy

## Rationale

| Goal | How `data-a11y` Helps |
|------|-----------------------|
| Stability across refactors | Semantics decoupled from styling & copy |
| Accessibility verification | Enables DOM presence checks for critical landmarks |
| Test resilience | Reduces brittle selectors tied to style or content |
| Analytics clarity | Human-readable labels (`data-link-label`) aid event payloads |
| Developer ergonomics | Faster DOM scanning during debugging |

## Alternatives Considered

1. Reuse `data-testid`: Rejected — semantically narrow, implies test-only usage; discourages production analytics coupling.
2. Leverage ARIA roles & landmarks exclusively: Insufficient — roles repeat (multiple `nav` / `button`); lack fine-grained grouping labels.
3. Enumerate CSS classes: Too volatile; styling decisions should not leak into instrumentation.
4. Add a generic `data-qa` namespace: Less explicit—`data-a11y` signals inclusive intent and multi-purpose use (a11y + QA + analytics).

## Scope & initial registry

Initial tokens: `skip-link`, `site-header`, `primary-nav`, `home-link`, `header-links-wrapper`, `external-links`, `external-link-item`, `external-link-anchor`, `main`, `live-region`.

Supplemental attributes: `data-link`, `data-link-label` for analytics-friendly outbound link instrumentation.

## Maintenance Policy

- Additions require updating `docs/a11y-data-attributes.md` in the registry table.
- Removal requires deprecation cycle: mark in doc, update tests to accept both, remove after one minor release.
- Renames follow a dual-tag grace period (old + new) with test acceptance for both until migration completes.
- A future CI script may assert the presence of mandatory core attributes (`main`, `site-header`, `primary-nav`, `skip-link`, `live-region`).

## Deprecation Strategy

1. Mark attribute as Deprecated in the registry (with replacement and rationale).
2. Emit optional dev-only console warning or custom event when encountered (if runtime detection is trivial).
3. After one release cycle, remove attribute from templates/components.
4. Clean up analytics dashboards & test selectors referencing the deprecated value.

## Risks

| Risk | Mitigation |
|------|------------|
| Attribute proliferation (noise) | Enforce minimal addition checklist in doc |
| Developer misuse for styling | Explicit anti-pattern section in doc |
| Drift between code & registry | Periodic audit script / CI check planned |
| Overlapping semantics | Encourage reuse; require rationale for new token |

## Impact

- Test code becomes clearer and less fragile.
- Analytics payloads gain consistent structural context.
- Accessibility audits can assert durable structural markers beyond roles.
- Slight additional markup weight (trivial).

## Examples

Selector usage (Playwright):
```ts
await expect(page.locator('[data-a11y="main"]')).toBeVisible();
await page.click('[data-a11y="external-link-anchor"][data-link-label="GitHub"]');
```

Outbound analytics hook pattern:
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

## Future Work

- Add CI assertion script verifying presence of core attributes in built HTML.
- Provide a dev overlay listing registered `data-a11y` tokens found on the page.
- Integrate with performance marks (e.g. `performance.mark('main-dom-ready')`).
- Explore generation of a machine-readable schema for token registry.

## Decision Outcome

Adopted. All future structural additions should evaluate whether a new `data-a11y` token is warranted and update the registry accordingly.
