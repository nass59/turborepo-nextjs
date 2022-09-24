import useSWR, { Fetcher } from "swr";
import Layout from "./components/layout";
import { Button } from "ui";
import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";

interface User {
  name: string;
  email: string;
}

const fetcher: Fetcher<any> = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const Profile: NextPageWithLayout = () => {
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
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <section>Profile Section</section>
      {page}
    </Layout>
  );
};

export default Profile;
