'use client';

import { cn } from '@/lib/utils/cn';
import { MOVIE_GENRES, type MovieGenre } from '@/types/movie';

export type GenreFilterValue = MovieGenre | 'Todos';

interface GenreFiltersProps {
  selected: GenreFilterValue;
  onChange: (genre: GenreFilterValue) => void;
}

const FILTER_OPTIONS: GenreFilterValue[] = ['Todos', ...MOVIE_GENRES];

export function GenreFilters({ selected, onChange }: GenreFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((genre) => {
        const isActive = selected === genre;

        return (
          <button
            key={genre}
            type="button"
            onClick={() => onChange(genre)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
              isActive
                ? 'border-purple-500/60 bg-purple-500/20 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                : 'border-slate-700/80 bg-slate-900/60 text-slate-400 hover:border-cyan-500/40 hover:text-cyan-200 hover:shadow-[0_0_12px_rgba(34,211,238,0.12)]',
            )}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}
