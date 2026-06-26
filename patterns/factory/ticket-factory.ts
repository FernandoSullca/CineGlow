import type { Ticket, TicketCreateInput, TicketFormat } from '@/types/ticket';

const BASE_PRICES: Record<TicketFormat, number> = {
  '2D': 1200,
  '3D': 1500,
  IMAX: 2000,
  VIP: 3500,
};

const LABELS: Record<TicketFormat, string> = {
  '2D': 'Entrada 2D',
  '3D': 'Entrada 3D',
  IMAX: 'Entrada IMAX',
  VIP: 'Entrada VIP',
};

const FEATURES: Record<TicketFormat, string[]> = {
  '2D': ['Proyección estándar'],
  '3D': ['Lentes 3D incluidos'],
  IMAX: ['Pantalla IMAX', 'Sonido envolvente'],
  VIP: ['Butaca reclinable', 'Servicio en butaca'],
};

export class TicketFactory {
  static create(input: TicketCreateInput): Ticket {
    const { format, showtimeId, seat } = input;

    return {
      id: `${showtimeId}-${seat}`,
      format,
      basePriceCents: BASE_PRICES[format],
      label: `${LABELS[format]} — Asiento ${seat}`,
      features: FEATURES[format],
    };
  }

  static supports(format: string): format is TicketFormat {
    return format in BASE_PRICES;
  }
}
