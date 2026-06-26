import type { CandyCategory, CandyCreateInput, CandyItem } from '@/types/candy-bar';

interface ProductCatalogEntry {
  name: string;
  basePriceCents: number;
  defaultSize: 'S' | 'M' | 'L';
}

const CATALOG: Record<CandyCategory, Record<string, ProductCatalogEntry>> = {
  combo: {
    'combo-clasico': { name: 'Combo Clásico', basePriceCents: 1800, defaultSize: 'M' },
    'combo-familiar': { name: 'Combo Familiar', basePriceCents: 3200, defaultSize: 'L' },
  },
  snack: {
    'palomitas': { name: 'Palomitas', basePriceCents: 900, defaultSize: 'M' },
    'nachos': { name: 'Nachos', basePriceCents: 1100, defaultSize: 'M' },
  },
  drink: {
    'gaseosa': { name: 'Gaseosa', basePriceCents: 700, defaultSize: 'M' },
    'agua': { name: 'Agua', basePriceCents: 500, defaultSize: 'S' },
  },
  dessert: {
    'helado': { name: 'Helado', basePriceCents: 800, defaultSize: 'S' },
  },
};

const SIZE_MULTIPLIER: Record<'S' | 'M' | 'L', number> = {
  S: 0.85,
  M: 1,
  L: 1.35,
};

export class CandyItemFactory {
  static create(input: CandyCreateInput): CandyItem {
    const entry = CATALOG[input.category]?.[input.productId];
    if (!entry) {
      throw new Error(`Producto candy no encontrado: ${input.category}/${input.productId}`);
    }

    const size = input.size ?? entry.defaultSize;
    const basePriceCents = Math.round(entry.basePriceCents * SIZE_MULTIPLIER[size]);

    return {
      id: `${input.category}-${input.productId}-${size}`,
      category: input.category,
      name: entry.name,
      basePriceCents,
      size,
    };
  }
}
