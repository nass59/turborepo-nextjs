import useSWR, { Fetcher } from "swr";
import { Button } from "ui";

interface User {
  name: string;
  email: string;
}

const fetcher: Fetcher<any> = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export default function Profile() {
  const { data, error } = useSWR<User>(
    "https://jsonplaceholder.typicode.com/users/1",
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.email}</h1>
      <Button />
    </div>
  );
}
