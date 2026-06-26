import { createClient } from '@/lib/supabase/server';

export async function getMovies() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('movies').select('*');
  if (error) throw error;
  return data;
}

export async function getShowtimeById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('showtimes')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}
