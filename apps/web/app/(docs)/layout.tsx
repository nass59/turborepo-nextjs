import { DocsHeader } from "@components/DocsHeader";
import { Footer } from "@components/Footer";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <DocsHeader />
      <div className="container flex-1">{children}</div>
      <Footer />
    </div>
  );
}
