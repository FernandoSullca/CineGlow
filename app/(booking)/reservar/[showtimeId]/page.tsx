import { getShowtimeById } from '@/lib/supabase/queries/movies';
import { notFound } from 'next/navigation';
import ReservationClient from './reservation-client';
import Link from 'next/link';

interface ReservationPageProps {
  params: {
    showtimeId: string;
  };
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const showtime = await getShowtimeById(params.showtimeId);

  if (!showtime) {
    notFound();
  }

  return (
    <ReservationClient showtime={showtime} />
  );
}