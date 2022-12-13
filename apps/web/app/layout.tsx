import { Inter } from "@next/font/google";

import "tailwindcss/tailwind.css";

import { cn } from "@lib/utils";

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
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
