import type { PricingContext, PricingResult, PricingStrategy } from '@/types/ticket';

export class StandardPricingStrategy implements PricingStrategy {
  calculate(context: PricingContext): PricingResult {
    return {
      finalPriceCents: context.basePriceCents,
      appliedRules: ['precio-estandar'],
    };
  }
}

export class StudentPricingStrategy implements PricingStrategy {
  calculate(context: PricingContext): PricingResult {
    const discount = Math.round(context.basePriceCents * 0.2);
    return {
      finalPriceCents: context.basePriceCents - discount,
      appliedRules: ['descuento-estudiante-20%'],
    };
  }
}

export class PromoPricingStrategy implements PricingStrategy {
  constructor(private readonly promoDiscountPercent: number) {}

  calculate(context: PricingContext): PricingResult {
    const discount = Math.round(
      context.basePriceCents * (this.promoDiscountPercent / 100),
    );
    return {
      finalPriceCents: context.basePriceCents - discount,
      appliedRules: [`promo-${this.promoDiscountPercent}%`],
    };
  }
}

export class HappyHourPricingStrategy implements PricingStrategy {
  calculate(context: PricingContext): PricingResult {
    const isHappyHour = context.dayOfWeek !== undefined && context.dayOfWeek <= 4;
    if (!isHappyHour) {
      return { finalPriceCents: context.basePriceCents, appliedRules: [] };
    }
    const discount = Math.round(context.basePriceCents * 0.15);
    return {
      finalPriceCents: context.basePriceCents - discount,
      appliedRules: ['happy-hour-lun-jue-15%'],
    };
  }
}

export function resolvePricingStrategy(context: PricingContext): PricingStrategy {
  if (context.isStudent) return new StudentPricingStrategy();
  if (context.promoCode === 'CINEGLOW10') return new PromoPricingStrategy(10);
  if (context.promoCode === 'CINEGLOW20') return new PromoPricingStrategy(20);
  return new HappyHourPricingStrategy();
}
