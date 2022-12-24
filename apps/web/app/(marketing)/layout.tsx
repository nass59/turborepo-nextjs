import { Footer } from "@components/Footer";
import { Header } from "@components/Header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
