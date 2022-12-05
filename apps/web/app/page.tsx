// `app/page.js` is the UI for the root `/` URL

import { Button } from "ui";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Hello NextJS!</h1>
      <Button />
      <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
