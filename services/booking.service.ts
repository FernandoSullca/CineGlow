import { buildTicket } from '@/services/ticket.service';
import { buildCandyItem } from '@/services/candy-bar.service';
import { resolveSeatSelectionStrategy } from '@/patterns/strategy';
import { createReservation } from '@/lib/supabase/queries/reservations';
import type { TicketCreateInput } from '@/types/ticket';
import type { CandyCreateInput } from '@/types/candy-bar';

export interface CheckoutPayload {
  userId: string;
  showtimeId: string;
  room: string;
  format: TicketCreateInput['format'];
  seats: string[];
  occupiedSeats: string[];
  tickets: Array<TicketCreateInput & { isStudent?: boolean; promoCode?: string }>;
  candyItems: CandyCreateInput[];
}

export async function processCheckout(payload: CheckoutPayload) {
  const seatStrategy = resolveSeatSelectionStrategy(payload.format);

  for (const seat of payload.seats) {
    if (!seatStrategy.validateSeat(seat, {
      room: payload.room,
      format: payload.format,
      occupiedSeats: payload.occupiedSeats,
    })) {
      throw new Error(`Asiento no disponible: ${seat}`);
    }
  }

  const ticketTotal = payload.tickets.reduce((sum, input) => {
    const { finalPriceCents } = buildTicket({ input, isStudent: input.isStudent, promoCode: input.promoCode });
    return sum + finalPriceCents;
  }, 0);

  const candyTotal = payload.candyItems.reduce((sum, input) => {
    const item = buildCandyItem({ input });
    return sum + item.getPriceCents();
  }, 0);

  const totalCents = ticketTotal + candyTotal;

  return createReservation({
    userId: payload.userId,
    showtimeId: payload.showtimeId,
    seats: payload.seats,
    totalCents,
  });
}
