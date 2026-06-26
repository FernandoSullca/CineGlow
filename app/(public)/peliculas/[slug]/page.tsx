interface MoviePageProps {
  params: Promise<{ slug: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;
  return (
    <main>
      <h1>Película: {slug}</h1>
    </main>
  );
}
