import { CandyItemFactory } from '@/patterns/factory';
import {
  BaseCandyItem,
  ExtraButterDecorator,
  LargeSizeDecorator,
  PremiumToppingDecorator,
} from '@/patterns/decorator';
import type { CandyComponent, CandyCreateInput } from '@/types/candy-bar';

export interface BuildCandyOptions {
  input: CandyCreateInput;
  largeSize?: boolean;
  extraButter?: boolean;
  premiumTopping?: { name: string; extraCents: number };
}

export function buildCandyItem(options: BuildCandyOptions): CandyComponent {
  const item = CandyItemFactory.create(options.input);

  let component: CandyComponent = new BaseCandyItem(item.name, item.basePriceCents);

  if (options.largeSize) {
    component = new LargeSizeDecorator(component);
  }
  if (options.extraButter) {
    component = new ExtraButterDecorator(component);
  }
  if (options.premiumTopping) {
    component = new PremiumToppingDecorator(
      component,
      options.premiumTopping.name,
      options.premiumTopping.extraCents,
    );
  }

  return component;
}
