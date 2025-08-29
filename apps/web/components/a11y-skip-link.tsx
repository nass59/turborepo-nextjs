/**
 * Skip navigation link for accessibility
 */
export const A11ySkipLink = () => (
  <a
    className="focus-outline sr-only focus:not-sr-only focus:absolute focus:top-2.5 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg"
    data-a11y="skip-link"
    data-testid="skip-link"
    href="#main-content"
  >
    Skip to main content
  </a>
);
