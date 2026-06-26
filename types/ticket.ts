export type TicketFormat = '2D' | '3D' | 'IMAX' | 'VIP';

export interface Ticket {
  id: string;
  format: TicketFormat;
  basePriceCents: number;
  label: string;
  features: string[];
}

export interface TicketCreateInput {
  format: TicketFormat;
  showtimeId: string;
  seat: string;
}

export interface TicketComponent {
  getDescription(): string;
  getPriceCents(): number;
  getFeatures(): string[];
}

export interface PricingContext {
  basePriceCents: number;
  format: TicketFormat;
  isStudent?: boolean;
  promoCode?: string;
  dayOfWeek?: number;
}

export interface PricingResult {
  finalPriceCents: number;
  appliedRules: string[];
}

export interface PricingStrategy {
  calculate(context: PricingContext): PricingResult;
}

export interface SeatSelectionContext {
  room: string;
  format: TicketFormat;
  occupiedSeats: string[];
}

export interface SeatSelectionStrategy {
  getAvailableSeats(context: SeatSelectionContext): string[];
  validateSeat(seat: string, context: SeatSelectionContext): boolean;
}
