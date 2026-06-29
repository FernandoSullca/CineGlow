export type CandyCategory = 'combo' | 'snack' | 'drink' | 'dessert';

// ─── Categorías que existen realmente en la DB ───────────────────────────────
export type DbCandyCategory = 'Combos' | 'Bebidas' | 'Snacks' | 'Dulces';
 
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

// ─── Fila tal como la devuelve Supabase ──────────────────────────────────────
export interface CandyProductRow {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  category: DbCandyCategory;
  stock: number;
  created_at: string;
}


 
// ─── Ítem en el carrito (client-side) ────────────────────────────────────────
export interface CartItem {
  product: CandyProductRow;
  quantity: number;
}
 
// ─── Lo que se guarda en reservations.candy_items (JSONB) ────────────────────
export interface CandyOrderItem {
  product_id: string;
  name: string;
  quantity: number;
  unit_price_cents: number;
}