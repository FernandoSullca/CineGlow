interface BookingPageProps {
  params: Promise<{ showtimeId: string }>;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { showtimeId } = await params;
  return (
    <main>
      <h1>Reservar — función {showtimeId}</h1>
    </main>
  );
}
