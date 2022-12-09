import Link from "next/link";
import { Button } from "ui";
import { cookies } from "next/headers";

export default function Page() {
  const nextCookies = cookies();

  return (
    <div>
      <h1 className="text-3xl">Hello NextJS!</h1>
      <Button />
      <Link href="/dashboard">Dashboard</Link>
      {nextCookies.getAll().map(cookie => (
        <div key={cookie.name}>
          <p>Name: {cookie.name}</p>
          <p>Value: {cookie.value}</p>
        </div>
      ))}
    </div>
  );
}
