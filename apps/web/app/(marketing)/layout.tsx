import { Header } from "ui";
import Breadcrumb from "./blog/Breadcrumb";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
