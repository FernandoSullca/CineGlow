import { getCandyProducts } from '@/lib/supabase/queries/candies';
import { DbCandyCategory, CandyProductRow } from '@/types/candy-bar';
import CandyBarClient from '@/components/candy-bar/candybarclien';
 
export const metadata = { title: 'Candy Bar — CineGlow' };
 
const CATEGORIES: DbCandyCategory[] = ['Combos', 'Snacks', 'Bebidas', 'Dulces'];
 
const CATEGORY_EMOJI: Record<DbCandyCategory, string> = {
  Combos: '🎬',
  Snacks: '🍿',
  Bebidas: '🥤',
  Dulces: '🍫',
};
 
export default async function CandyBarPage() {
  const products = await getCandyProducts();
 
  const grouped = CATEGORIES.reduce<Record<DbCandyCategory, CandyProductRow[]>>(
    (acc, cat) => {
      acc[cat] = products.filter((p) => p.category === cat);
      return acc;
    },
    { Combos: [], Snacks: [], Bebidas: [], Dulces: [] }
  );
 
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-yellow-500/10 to-transparent py-14 px-4 text-center">
        <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Antes de tu función
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Candy Bar</h1>
        <p className="text-gray-400 max-w-md mx-auto">
          Combos, snacks, bebidas y dulces. Agregá lo que quieras a tu reserva.
        </p>
      </section>
 
      {/* Contenido con carrito */}
      <CandyBarClient grouped={grouped} categories={CATEGORIES} categoryEmoji={CATEGORY_EMOJI} />
    </main>
  );
}