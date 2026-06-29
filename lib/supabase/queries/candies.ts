import { createClient } from '@/lib/supabase/server';
import { CandyProductRow, DbCandyCategory } from '@/types/candy-bar';
 
export async function getCandyProducts(): Promise<CandyProductRow[]> {
  const supabase = await createClient();
 
  const { data, error } = await supabase
    .from('candy_products')
    .select('*')
    .gt('stock', 0)
    .order('category')
    .order('name');
 
  if (error) throw new Error(`getCandyProducts: ${error.message}`);
  return (data ?? []) as CandyProductRow[];
}
 
export async function getCandyProductsByCategory(
  category: DbCandyCategory
): Promise<CandyProductRow[]> {
  const supabase = await createClient();
 
  const { data, error } = await supabase
    .from('candy_products')
    .select('*')
    .eq('category', category)
    .gt('stock', 0)
    .order('name');
 
  if (error) throw new Error(`getCandyProductsByCategory: ${error.message}`);
  return (data ?? []) as CandyProductRow[];
}
 