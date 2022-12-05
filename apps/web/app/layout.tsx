export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body style={{ border: "1px solid #df5e2f", padding: "5px" }}>
        <span
          style={{
            backgroundColor: "#df5e2f",
            padding: "0 5px",
            marginBottom: "5px",
            display: "inline-block",
          }}
        >
          Root Layout
        </span>
        <div>{children}</div>
      </body>
    </html>
  );
}
