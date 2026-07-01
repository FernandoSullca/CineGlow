import { getShowtimeById } from '@/lib/supabase/queries/movies';
import { notFound } from 'next/navigation';
import ReservationClient from './reservation-client';
import Link from 'next/link';

interface ReservationPageProps {
  params: Promise<{
    showtimeId: string;
  }>;
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const { showtimeId } = await params;
  const showtime = await getShowtimeById(showtimeId);

  if (!showtime) {
    notFound();
  }

  return (
    <ReservationClient showtime={showtime} />
  );
}