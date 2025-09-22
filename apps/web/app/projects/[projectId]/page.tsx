type Props = {
  params: Promise<{ projectId: string }>;
};

export default async function Page({ params }: Props) {
  const { projectId } = await params;

  return (
    <section className="relative flex min-h-screen flex-col bg-[#030303]">
      Project ID: {projectId}
    </section>
  );
}
