import Breadcrumb from "./blog/Breadcrumb";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: "1px solid #99df2f", padding: "5px" }}>
      <span
        style={{
          backgroundColor: "#99df2f",
          padding: "0 5px",
          marginBottom: "5px",
          display: "inline-block",
        }}
      >
        Marketing Layout
      </span>
      <Breadcrumb />
      <div>{children}</div>
    </div>
  );
}
