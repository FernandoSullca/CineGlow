import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getReservationById } from '@/lib/supabase/queries/reservations';

interface ConfirmationPageProps {
  searchParams: Promise<{
    reservationId?: string;
  }>;
}

export default async function ConfirmationPage({ searchParams }: ConfirmationPageProps) {
  const { reservationId } = await searchParams;
  const reservation = reservationId ? await getReservationById(reservationId) : null;

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950 p-4">
      <Image
        src={reservation?.showtimes?.movies?.poster_url ?? "https://images.unsplash.com/photo-1616587993999-9f853482250a?w=1200&q=80"}
        alt="Cinema seats"
        fill
        className="object-cover opacity-10"
      />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-100 shadow-2xl backdrop-blur-sm">
        <CheckCircle className="h-16 w-16 text-green-400" />
        <h1 className="mt-6 text-3xl font-bold text-amber-400">
          ¡Reserva Confirmada!
        </h1>
        <p className="mt-4 text-slate-400">
          Hemos enviado un correo con los detalles de tu compra. ¡Gracias por
          elegir CineGlow!
        </p>

        {reservation && (
          <div className="mt-6 w-full rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-left text-sm">
            <h3 className="font-semibold text-white mb-3">Resumen de tu compra:</h3>
            <div className="space-y-2 text-slate-300">
              {reservation.showtimes && (
                <>
                  <p><span className="font-semibold">Película:</span> {reservation.showtimes.movies.title}</p>
                  <p><span className="font-semibold">Asientos:</span> {reservation.seats.join(', ')}</p>
                </>
              )}
              {reservation.candy_items && reservation.candy_items.length > 0 && (
                <div>
                  <p className="font-semibold">Candy Bar:</p>
                  <ul className="list-disc list-inside pl-2">
                    {reservation.candy_items.map((item: any) => (
                      <li key={item.product_id}>{item.name} x{item.quantity}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-600 pt-2 mt-2 font-bold">
                <span>Total Pagado:</span>
                <span className="text-amber-400">${(reservation.total_cents / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex w-full flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <Link
            href="/mis-reservas"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-amber-500 px-6 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
          >
            Ver mis reservas
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-700 bg-transparent px-6 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
          >
            Volver a la cartelera
          </Link>
        </div>
      </div>
    </main>
  );
}