import "ui/global.css";
import ThemeProvider from "./theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ border: "1px solid #df5e2f", padding: "5px" }}>
        <span className="text-3xl underline">Root Layout</span>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
