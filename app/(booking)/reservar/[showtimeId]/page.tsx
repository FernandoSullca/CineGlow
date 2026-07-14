import { getShowtimeById } from '@/lib/supabase/queries/movies';
import { notFound } from 'next/navigation';
import ReservationClient from './reservation-client';

interface ReservationPageProps {
  params: { showtimeId: string };
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const { showtimeId } = params;

  try {
    const showtime = await getShowtimeById(showtimeId);

    if (!showtime) {
      notFound();
    }

    return <ReservationClient showtime={showtime} />;

  } catch (error) {
    // Logueamos el error completo en la consola del servidor para depuración
    console.error('[ReservationPage] Error fetching showtime:', error);

    // Mostramos un mensaje amigable al usuario
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Ocurrió un problema
        </h1>
        <p className="text-slate-400">
          No pudimos cargar los datos de la función en este momento. Por favor, intentá de nuevo más tarde.
        </p>
      </div>
    );
  }
}