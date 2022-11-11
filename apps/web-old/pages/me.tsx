import { useSession } from "next-auth/react";

export default function MePage() {
  const { data } = useSession();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
