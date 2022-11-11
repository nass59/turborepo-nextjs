import { useRouter } from "next/router";

export default function Post() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Post</h1>
      <h4>{slug}</h4>
    </div>
  );
}
