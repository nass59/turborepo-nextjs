"use client";

import { useSelectedLayoutSegments } from "next/navigation";

export default function Breadcrumb() {
  const segments = useSelectedLayoutSegments();

  return (
    <ul className="flex gap-2 border rounded-lg px-2 bg-slate-100">
      {segments.map((segment, index) => (
        <li key={index}>
          {segment} {index < segments.length - 1 ? "/" : ""}
        </li>
      ))}
    </ul>
  );
}
