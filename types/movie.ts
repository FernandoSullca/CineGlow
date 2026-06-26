export const MOVIE_GENRES = ['Acción', 'Ciencia Ficción', 'Drama'] as const;

export type MovieGenre = (typeof MOVIE_GENRES)[number];

export interface Movie {
  id: string;
  title: string;
  slug: string;
  genre: MovieGenre;
  posterUrl: string;
  durationMinutes: number;
  rating: number;
  synopsis: string;
}
