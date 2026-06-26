import { createClient } from '@/lib/supabase/server';

export async function createReservation(payload: {
  userId: string;
  showtimeId: string;
  seats: string[];
  totalCents: number;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reservations')
    .insert({
      user_id: payload.userId,
      showtime_id: payload.showtimeId,
      seats: payload.seats,
      total_cents: payload.totalCents,
      status: 'pending',
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}
