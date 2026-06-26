import { MovieCatalog } from '@/components/cinema/movie-catalog';
import { MOCK_MOVIES } from '@/lib/data/mock-movies';
import { getMovies } from '@/lib/supabase/queries/movies';

async function getMoviesMock() {
  // Simula latencia de red — reemplazar por:
  // return getMoviesFromSupabase();
  await new Promise((resolve) => setTimeout(resolve, 0));
  return MOCK_MOVIES;
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-purple-950/20 via-slate-950 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-purple-400/80">
            Cartelera
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl">
            CineGlow
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-400">
            Descubrí las mejores películas en cartelera. Reservá tu butaca y
            disfrutá la experiencia con el brillo del cine.
          </p>
        </header>

        <MovieCatalog movies={movies} />
      </div>
    </main>
  );
}
