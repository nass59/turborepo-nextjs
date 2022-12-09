import "ui/global.css";
import ThemeProvider from "./theme-provider";
import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body style={{ border: "1px solid #df5e2f", padding: "5px" }}>
        <span className="text-3xl underline">Root Layout</span>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
