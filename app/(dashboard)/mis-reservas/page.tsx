import { createClient } from '@/lib/supabase/server';
import { getReservationsByUserId } from '@/lib/supabase/queries/reservations';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Ticket, ShoppingCart } from 'lucide-react';

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default async function MisReservasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const reservations = await getReservationsByUserId(user.id);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-white tracking-tight mb-8">Mis Reservas</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-700 rounded-xl">
          <Ticket className="mx-auto h-12 w-12 text-slate-500" />
          <h2 className="mt-4 text-xl font-semibold text-white">No tenés reservas todavía</h2>
          <p className="mt-2 text-slate-400">¡Tu próxima gran película te está esperando!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex flex-col md:flex-row gap-6 rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-purple-400/50 hover:bg-slate-800/50">
              {reservation.showtimes?.movies?.poster_url && (
                <Image
                  src={reservation.showtimes.movies.poster_url}
                  alt={reservation.showtimes.movies.title}
                  width={150}
                  height={225}
                  className="rounded-lg object-cover mx-auto md:mx-0"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-amber-400">{reservation.showtimes?.movies?.title ?? 'Compra de Candy Bar'}</h2>
                <p className="text-sm text-slate-400 mb-4">Comprado el: {formatDate(reservation.created_at)}</p>

                {reservation.showtimes && (
                  <div className="mb-4 text-sm space-y-1 text-slate-300">
                    <p><span className="font-semibold">Función:</span> {formatDate(reservation.showtimes.starts_at)}</p>
                    <p><span className="font-semibold">Asientos:</span> {reservation.seats.join(', ')}</p>
                  </div>
                )}

                {reservation.candy_items && reservation.candy_items.length > 0 && (
                  <div className="mb-4 text-sm space-y-1 text-slate-300">
                    <p className="font-semibold flex items-center gap-2"><ShoppingCart className="w-4 h-4" /> Productos del Candy Bar:</p>
                    <ul className="list-disc list-inside pl-4">
                      {(reservation.candy_items as any[]).map(item => <li key={item.product_id}>{item.name} x{item.quantity}</li>)}
                    </ul>
                  </div>
                )}
                <p className="text-lg font-bold text-white border-t border-slate-700 pt-3 mt-3">Total: ${(reservation.total_cents / 100).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}