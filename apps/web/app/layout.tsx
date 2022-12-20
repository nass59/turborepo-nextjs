import { Inter } from "@next/font/google";

import "tailwindcss/tailwind.css";

import { cn } from "@lib/utils";
import { Help } from "@components/Help";
import { TailwindIndicator } from "@components/tailwind-indicator";
import { Analytics } from "@components/analytics";
import { Toaster } from "@components/toast";

const fontSans = Inter({
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased scroll-smooth",
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">
        {children}
        <Help />
        <Toaster position="bottom-right" />
        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  );
}
