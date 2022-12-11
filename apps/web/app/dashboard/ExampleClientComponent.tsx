"use client";

import { useSelectedLayoutSegment } from "next/navigation";

export default function ExampleClientComponent() {
  const segment = useSelectedLayoutSegment();

  return <>Active segment : {segment}</>;
}
