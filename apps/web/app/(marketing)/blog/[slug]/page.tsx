// @see https://beta.nextjs.org/docs/routing/defining-routes#typescript

type PageProps = {
  params: { slug: string };
};

export default function Page({ params }: PageProps) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}
