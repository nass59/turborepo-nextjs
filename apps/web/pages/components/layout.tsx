import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicHeader = dynamic(() => import("../components/header"), {
  suspense: true,
});

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Suspense fallback={`Loading...`}>
        <DynamicHeader />
      </Suspense>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  );
}
