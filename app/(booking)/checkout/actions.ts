'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { processCheckout } from '@/services/booking.service';
import { getCandyProductsByIds } from '@/lib/supabase/queries/candies';

export async function processReservationAction(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    const showtimeId = formData.get('showtimeId') as string;
    if (!showtimeId) {
        throw new Error('ID de la función no encontrado. No se puede crear la reserva.');
    }

    const candyItemsRaw = formData.get('candyItems') as string;
    const parsedCandyItems: { id: string; q: number }[] = candyItemsRaw ? JSON.parse(candyItemsRaw) : [];

    // Si no hay showtimeId Y no hay candy items, no hay nada que procesar.
    if (!showtimeId && parsedCandyItems.length === 0) {
        throw new Error('No hay items en la orden para procesar.');
    }

    // Obtenemos los detalles completos de los productos del candy desde la DB
    const candyProductIds = parsedCandyItems.map(item => item.id);
    const candyProducts = await getCandyProductsByIds(candyProductIds);

    // En un flujo real, los asientos vendrían del estado de la página de reserva
    // Si no hay showtime, los asientos son un array vacío.
    const selectedSeats = showtimeId ? ['F5', 'F6'] : []; // Asientos mockeados

    const reservation = await processCheckout({
        userId: user.id,
        showtimeId: showtimeId,
        seats: selectedSeats,
        // El resto de los datos se mockean o se calculan
        room: 'Sala Mock',
        format: '2D',
        occupiedSeats: [],
        tickets: showtimeId
            ? selectedSeats.map(seat => ({
                format: '2D', seat, showtimeId: showtimeId, basePriceCents: 1200,
            }))
            : [],
        candyItems: parsedCandyItems.map(item => {
            const product = candyProducts.find(p => p.id === item.id);
            if (!product) throw new Error(`Producto con ID ${item.id} no encontrado en la base de datos.`);
            return {
                product_id: product.id,
                name: product.name,
                quantity: item.q,
                unit_price_cents: product.price_cents,
            };
        }),
    });

    redirect(`/confirmacion?reservationId=${reservation.id}`);
}