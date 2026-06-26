export type CandyCategory = 'combo' | 'snack' | 'drink' | 'dessert';

export interface CandyItem {
  id: string;
  category: CandyCategory;
  name: string;
  basePriceCents: number;
  size: 'S' | 'M' | 'L';
}

export interface CandyCreateInput {
  category: CandyCategory;
  productId: string;
  size?: 'S' | 'M' | 'L';
}

export interface CandyComponent {
  getName(): string;
  getPriceCents(): number;
  getDescription(): string;
}
