import type { SeatSelectionContext, SeatSelectionStrategy } from '@/types/ticket';
import { SEAT_ROWS } from '@/lib/constants/cinema';

const SEATS_PER_ROW = 12;

function generateGrid(): string[] {
  return SEAT_ROWS.flatMap((row) =>
    Array.from({ length: SEATS_PER_ROW }, (_, i) => `${row}${i + 1}`),
  );
}

export class StandardSeatSelectionStrategy implements SeatSelectionStrategy {
  getAvailableSeats(context: SeatSelectionContext): string[] {
    const all = generateGrid();
    return all.filter((seat) => !context.occupiedSeats.includes(seat));
  }

  validateSeat(seat: string, context: SeatSelectionContext): boolean {
    return this.getAvailableSeats(context).includes(seat);
  }
}

export class VipSeatSelectionStrategy implements SeatSelectionStrategy {
  private readonly vipRows = ['F', 'G', 'H'];

  getAvailableSeats(context: SeatSelectionContext): string[] {
    const vipSeats = generateGrid().filter((seat) =>
      this.vipRows.some((row) => seat.startsWith(row)),
    );
    return vipSeats.filter((seat) => !context.occupiedSeats.includes(seat));
  }

  validateSeat(seat: string, context: SeatSelectionContext): boolean {
    return this.getAvailableSeats(context).includes(seat);
  }
}

export function resolveSeatSelectionStrategy(
  format: SeatSelectionContext['format'],
): SeatSelectionStrategy {
  return format === 'VIP'
    ? new VipSeatSelectionStrategy()
    : new StandardSeatSelectionStrategy();
}
