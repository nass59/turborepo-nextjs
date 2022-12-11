import Link from "next/link";
import { Button } from "ui";

export default function Page() {
  return (
    <div>
      <h1 className="text-3xl">Hello NextJS!</h1>
      <Button />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
