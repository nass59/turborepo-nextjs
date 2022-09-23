import useSWR, { Fetcher } from "swr";

interface User {
  name: string;
  email: string;
}

const fetcher: Fetcher<User, string> = (...args: any) =>
  fetch(...args).then(res => res.json());

export default function Profile() {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/users/4",
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <h1>{data.email}</h1>
    </div>
  );
}
