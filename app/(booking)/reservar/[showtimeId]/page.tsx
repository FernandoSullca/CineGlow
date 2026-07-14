import { getShowtimeById } from '@/lib/supabase/queries/movies';
import { notFound } from 'next/navigation';
import ReservationClient from './reservation-client';

interface ReservationPageProps {
  params: { showtimeId: string };
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const { showtimeId } = params;

  // Ahora no necesitamos try...catch. Si getShowtimeById falla,
  // Next.js renderizará automáticamente el archivo app/error.tsx más cercano.
  const showtime = await getShowtimeById(showtimeId);

  if (!showtime) {
    notFound();
  }

  return <ReservationClient showtime={showtime} />;
}