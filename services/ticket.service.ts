import { TicketFactory } from '@/patterns/factory';
import {
  BaseTicket,
  CandyComboBundleDecorator,
  ThreeDUpgradeDecorator,
  VipLoungeDecorator,
} from '@/patterns/decorator';
import { resolvePricingStrategy } from '@/patterns/strategy';
import type { TicketComponent, TicketCreateInput } from '@/types/ticket';

export interface BuildTicketOptions {
  input: TicketCreateInput;
  addVipLounge?: boolean;
  add3DUpgrade?: boolean;
  candyCombo?: { label: string; priceCents: number };
  isStudent?: boolean;
  promoCode?: string;
}

export function buildTicket(options: BuildTicketOptions): {
  component: TicketComponent;
  finalPriceCents: number;
  appliedRules: string[];
} {
  const ticket = TicketFactory.create(options.input);

  let component: TicketComponent = new BaseTicket(
    ticket.label,
    ticket.basePriceCents,
    ticket.features,
  );

  if (options.addVipLounge) {
    component = new VipLoungeDecorator(component);
  }
  if (options.add3DUpgrade) {
    component = new ThreeDUpgradeDecorator(component);
  }
  if (options.candyCombo) {
    component = new CandyComboBundleDecorator(
      component,
      options.candyCombo.label,
      options.candyCombo.priceCents,
    );
  }

  const pricingContext = {
    basePriceCents: component.getPriceCents(),
    format: options.input.format,
    isStudent: options.isStudent,
    promoCode: options.promoCode,
    dayOfWeek: new Date().getDay(),
  };

  const pricing = resolvePricingStrategy(pricingContext).calculate(pricingContext);

  return {
    component,
    finalPriceCents: pricing.finalPriceCents,
    appliedRules: pricing.appliedRules,
  };
}
