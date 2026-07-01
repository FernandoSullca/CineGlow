import { createClient } from '@/lib/supabase/server';
import type { CandyOrderItem } from '@/types/candy-bar';

export async function createReservation(payload: {
  userId: string;
  showtimeId: string;
  seats: string[];
  totalCents: number;
  candyItems?: CandyOrderItem[];
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      user_id: payload.userId,
      showtime_id: payload.showtimeId,
      seats: payload.seats,
      total_cents: payload.totalCents,
      candy_items: payload.candyItems,
      status: 'pending',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getReservationById(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      showtimes (
        room,
        movies ( title, poster_url )
      )
    `)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function getReservationsByUserId(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      *,
      showtimes (
        room,
        starts_at,
        movies ( title, poster_url )
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
