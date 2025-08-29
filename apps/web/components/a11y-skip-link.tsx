/**
 * Skip navigation link for accessibility
 */
export const Ay11SkipLink = () => (
  <a
    className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring"
    data-a11y="skip-link"
    data-testid="skip-link"
    href="#main-content"
  >
    Skip to main content
  </a>
);
