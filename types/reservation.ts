export interface Reservation {
  id: string;
  userId: string;
  showtimeId: string;
  seats: string[];
  ticketTotalCents: number;
  candyTotalCents: number;
  totalCents: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface CartLineItem {
  type: 'ticket' | 'candy';
  referenceId: string;
  label: string;
  quantity: number;
  unitPriceCents: number;
}
