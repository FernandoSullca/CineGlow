import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import type { MovieGenre } from '@/types/movie';
import { useState } from 'react';
import MovieHero from './movie-hero';

export interface MovieCardProps {
  title: string;
  slug: string;
  posterUrl: string;
  genre: MovieGenre;
  durationMinutes: number;
  rating: number;
  className?: string;
}

const GENRE_STYLES: Record<MovieGenre, string> = {
  Acción: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  'Ciencia Ficción': 'text-cyan-300 bg-cyan-500/10 border-cyan-500/20',
  Drama: 'text-violet-300 bg-violet-500/10 border-violet-500/20',
};



export function MovieCard({
  title,
  slug,
  posterUrl,
  genre,
  durationMinutes,
  rating,
  className,
}: MovieCardProps) {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const durationLabel = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  const [imgError, setImgError] = useState(false);
  return (
    <Link
      href={`/peliculas/${slug}`}
      className={cn(
        'group block overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60',
        'shadow-lg shadow-black/20 transition-all duration-300',
        'hover:-translate-y-1 hover:border-purple-500/40',
        'hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60',
        className,
      )}
    >
      <div className="relative aspect-[2/3] overflow-hidden">


        {!imgError ? (
          <Image
            src={posterUrl}
            alt={`Póster de ${title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500">
            <span className="text-5xl">🎬</span>
            <span className="text-xs">{title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        <span className="absolute right-3 top-3 rounded-full border border-amber-400/30 bg-slate-950/80 px-2.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-sm">
          ★ {rating.toFixed(1)}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-100 transition-colors group-hover:text-purple-200">
          {title}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'rounded-full border px-2.5 py-0.5 text-xs font-medium',
              GENRE_STYLES[genre],
            )}
          >
            {genre}
          </span>
          <span className="text-xs text-slate-500">{durationLabel}</span>
        </div>
      </div>
    </Link>
  );
}
