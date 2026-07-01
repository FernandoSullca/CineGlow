import { processReservationAction } from './actions';
import { getCandyProductsByIds } from '@/lib/supabase/queries/candies';
import { getShowtimeById } from '@/lib/supabase/queries/movies';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface CheckoutPageProps {
  searchParams: Promise<{
    showtimeId?: string;
    candy_items?: string;
    seats?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const { showtimeId, candy_items, seats } = await searchParams;
  const MOCK_TICKET_PRICE_CENTS = 1200;

  if (!showtimeId && !candy_items) {
    return (
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 text-center">
        <div>
          <h1 className="text-2xl font-bold text-amber-400">Tu carrito está vacío</h1>
          <p className="text-slate-400 mt-2">Inicia una reserva desde una película o agrega productos del candy bar.</p>
        </div>
      </main>
    );
  }

  const showtime = showtimeId ? await getShowtimeById(showtimeId) : null;
  const parsedCandyItems: { id: string; q: number }[] = candy_items ? JSON.parse(candy_items) : [];
  const candyIds = parsedCandyItems.map(item => item.id);
  const candyProducts = candyIds.length > 0 ? await getCandyProductsByIds(candyIds) : [];

  // --- Cálculo de precios ---
  // Leemos los asientos desde la URL. Si no hay, usamos los mockeados como en la action.
  const selectedSeats = seats ? seats.split(',') : ['F5', 'F6'];
  const ticketTotal = selectedSeats.length * MOCK_TICKET_PRICE_CENTS;
  const totalCandyPrice = parsedCandyItems.reduce((total, item) => {
    const product = candyProducts.find(p => p.id === item.id);
    return total + (product ? product.price_cents * item.q : 0);
  }, 0);
  const grandTotal = ticketTotal + totalCandyPrice;

  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-950 p-4 py-12">
      <Image
        src={showtime?.movies.poster_url ?? "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&q=80"}
        alt="Checkout background"
        fill
        className="object-cover opacity-10"
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900/80 p-8 text-slate-100 shadow-2xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">Resumen de la Orden</h1>

        <div className="space-y-6">
          {/* Sección de Entradas */}
          {showtime && (
            <div>
              <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-3">Entradas</h2>
              <div className="text-sm text-slate-300 space-y-1">
                <p><span className="font-semibold">Película:</span> {showtime.movies.title}</p>
                <p><span className="font-semibold">Asientos:</span> {selectedSeats.join(', ')}</p>
                <p className="flex justify-between items-center">
                  <span>{selectedSeats.length} x Entrada General</span>
                  <span className="font-mono font-semibold text-white">${(ticketTotal / 100).toFixed(2)}</span>
                </p>
              </div>
            </div>
          )}

          {/* Sección de Candy Bar */}
          {parsedCandyItems.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-3">Candy Bar</h2>
              <div className="space-y-2 text-sm">
                {parsedCandyItems.map(item => {
                  const product = candyProducts.find(p => p.id === item.id);
                  if (!product) return null;
                  return (
                    <div key={item.id} className="flex justify-between items-center text-slate-300">
                      <span>{product.name} x{item.q}</span>
                      <span className="font-mono font-semibold text-white">${((product.price_cents * item.q) / 100).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="text-xl font-bold flex justify-between border-t border-slate-700 pt-4 mt-6">
          <span>TOTAL</span>
          <span className="font-mono text-amber-400">${(grandTotal / 100).toFixed(2)}</span>
        </div>

        <form action={processReservationAction} className="mt-8">
          <input type="hidden" name="showtimeId" value={showtimeId} />
          <input type="hidden" name="candyItems" value={JSON.stringify(parsedCandyItems)} />
          <input type="hidden" name="seats" value={seats} />
          <button className="w-full h-12 inline-flex items-center justify-center rounded-lg bg-amber-500 text-slate-950 text-base font-bold transition-transform hover:scale-105">
            Confirmar y Pagar
          </button>
        </form>
      </div>
    </main>
  );
}