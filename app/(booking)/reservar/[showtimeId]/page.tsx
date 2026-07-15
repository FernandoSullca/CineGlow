import { getShowtimeById } from '@/lib/supabase/queries/movies';
import { notFound } from 'next/navigation';
import ReservationClient from './reservation-client';

interface ReservationPageProps {
  params: Promise<{ showtimeId: string }>;
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  // En Next.js 15, 'params' es una promesa. La resolvemos con await.
  const { showtimeId } = await params;

  // Ahora no necesitamos try...catch. Si getShowtimeById falla, Next.js
  // renderizará automáticamente el archivo app/error.tsx más cercano.
  const showtime = await getShowtimeById(showtimeId);

  if (!showtime) {
    notFound();
  }

  return <ReservationClient showtime={showtime} />;
}