import type { TicketComponent } from '@/types/ticket';

export class BaseTicket implements TicketComponent {
  constructor(
    private readonly label: string,
    private readonly priceCents: number,
    private readonly features: string[] = [],
  ) {}

  getDescription(): string {
    return this.label;
  }

  getPriceCents(): number {
    return this.priceCents;
  }

  getFeatures(): string[] {
    return [...this.features];
  }
}

export abstract class TicketDecorator implements TicketComponent {
  constructor(protected readonly wrapped: TicketComponent) {}

  getDescription(): string {
    return this.wrapped.getDescription();
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents();
  }

  getFeatures(): string[] {
    return this.wrapped.getFeatures();
  }
}

export class VipLoungeDecorator extends TicketDecorator {
  getDescription(): string {
    return `${this.wrapped.getDescription()} + Lounge VIP`;
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents() + 800;
  }

  getFeatures(): string[] {
    return [...this.wrapped.getFeatures(), 'Acceso lounge pre-función'];
  }
}

export class ThreeDUpgradeDecorator extends TicketDecorator {
  getDescription(): string {
    return `${this.wrapped.getDescription()} + Upgrade 3D`;
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents() + 400;
  }

  getFeatures(): string[] {
    return [...this.wrapped.getFeatures(), 'Lentes 3D premium'];
  }
}

export class CandyComboBundleDecorator extends TicketDecorator {
  constructor(
    wrapped: TicketComponent,
    private readonly comboLabel: string,
    private readonly comboPriceCents: number,
  ) {
    super(wrapped);
  }

  getDescription(): string {
    return `${this.wrapped.getDescription()} + ${this.comboLabel}`;
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents() + this.comboPriceCents;
  }

  getFeatures(): string[] {
    return [...this.wrapped.getFeatures(), 'Combo candy incluido'];
  }
}
