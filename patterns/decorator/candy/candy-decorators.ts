import type { CandyComponent } from '@/types/candy-bar';

export class BaseCandyItem implements CandyComponent {
  constructor(
    private readonly name: string,
    private readonly priceCents: number,
  ) {}

  getName(): string {
    return this.name;
  }

  getPriceCents(): number {
    return this.priceCents;
  }

  getDescription(): string {
    return this.name;
  }
}

export abstract class CandyDecorator implements CandyComponent {
  constructor(protected readonly wrapped: CandyComponent) {}

  getName(): string {
    return this.wrapped.getName();
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents();
  }

  getDescription(): string {
    return this.wrapped.getDescription();
  }
}

export class LargeSizeDecorator extends CandyDecorator {
  getDescription(): string {
    return `${this.wrapped.getDescription()} (Grande)`;
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents() + 300;
  }
}

export class ExtraButterDecorator extends CandyDecorator {
  getDescription(): string {
    return `${this.wrapped.getDescription()} + Mantequilla extra`;
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents() + 150;
  }
}

export class PremiumToppingDecorator extends CandyDecorator {
  constructor(
    wrapped: CandyComponent,
    private readonly topping: string,
    private readonly extraCents: number,
  ) {
    super(wrapped);
  }

  getDescription(): string {
    return `${this.wrapped.getDescription()} + ${this.topping}`;
  }

  getPriceCents(): number {
    return this.wrapped.getPriceCents() + this.extraCents;
  }
}
