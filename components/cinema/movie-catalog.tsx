'use client';

import { useMemo, useState } from 'react';
import { GenreFilters, type GenreFilterValue } from '@/components/cinema/genre-filters';
import { MovieCard } from '@/components/cinema/movie-card';
import type { Movie } from '@/types/movie';

interface MovieCatalogProps {
  movies: Movie[];
}

export function MovieCatalog({ movies }: MovieCatalogProps) {
  const [selectedGenre, setSelectedGenre] = useState<GenreFilterValue>('Todos');

  const filteredMovies = useMemo(() => {
    if (selectedGenre === 'Todos') return movies;
    return movies.filter((movie) => movie.genre === selectedGenre);
    
  }, [movies, selectedGenre]);

  return (
    <section aria-label="Catálogo de películas">
      <div className="mb-8 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">Filtros Rápidos</h2>
          <p className="mt-1 text-sm text-slate-500">
            Explorá la cartelera por género
          </p>
        </div>
        <GenreFilters selected={selectedGenre} onChange={setSelectedGenre} />
      </div>

      {filteredMovies.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-800 py-16 text-center text-slate-500">
          No hay películas en este género por ahora.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMovies.map((movie) => (
            <li key={movie.id}>
              <MovieCard
                title={movie.title}
                slug={movie.slug}
                posterUrl={movie.poster_url}
                genre={movie.genre}
                durationMinutes={movie.duration_minutes}
                rating={Number((movie.rating ?? 5.0).toFixed(1))}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
