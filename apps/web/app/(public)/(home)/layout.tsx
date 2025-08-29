import type { LayoutProps } from '@/types/common';

/**
 * Home page layout component providing the structure for the landing page.
 *
 * @param children - The page content to be rendered within the main section
 */
export default function HomeLayout({ children }: LayoutProps) {
  return (
    <main aria-label="Main content" className="flex-1" id="main-content">
      {children}
    </main>
  );
}
