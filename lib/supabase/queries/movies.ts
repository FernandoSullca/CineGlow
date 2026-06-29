import { createClient } from '@/lib/supabase/server';

export async function getMovies() {
  const supabase = await createClient();
  // Hacemos el select real apuntando a la tabla 'movies' de Postgres
  const { data, error } = await supabase.from('movies')
  .select('*')
  .order('title', { ascending: true });
  
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

/** 
 * Obtiene una película por su slug
 * @param slug - El slug de la película
 * @returns La película encontrada o null si no se encuentra
 */
export async function getMoviesBySlug(slugg: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('slug', slugg)
    .single();
  if (error) {
    console.error("Error fetching movie by slug:", error);
    return null;
  }
  return data;
}
/**
 * 
 * @param movieId 
 * @returns Las proyecciones de la película encontradas o null si no se encuentra
 */

export async function getShowtimesByMovieId(movieId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('showtimes')
    .select('*')
    .eq('movie_id', movieId)
    .order('starts_at', { ascending: true });
  if (error) {
    console.error("Error fetching showtimes by movie id:", error);
    return null;
  }
  return data;
}