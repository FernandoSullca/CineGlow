export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          id: string;
          title: string;
          slug: string;
          duration_minutes: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['movies']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['movies']['Insert']>;
      };
      showtimes: {
        Row: {
          id: string;
          movie_id: string;
          starts_at: string;
          room: string;
          format: '2D' | '3D' | 'IMAX' | 'VIP';
        };
        Insert: Omit<Database['public']['Tables']['showtimes']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['showtimes']['Insert']>;
      };
      reservations: {
        Row: {
          id: string;
          user_id: string;
          showtime_id: string;
          seats: string[];
          total_cents: number;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reservations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reservations']['Insert']>;
      };
    };
  };
}
