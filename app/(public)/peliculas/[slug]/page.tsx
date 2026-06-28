import { getMoviesBySlug, getShowtimesByMovieId } from "@/lib/supabase/queries/movies";
import { notFound } from "next/navigation";

interface MoviePageProps {
  params: Promise<{ slug: string }>;
}

const formatShowtime = (showtime: string) => {
  return new Date(showtime).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;
  const movie = await getMoviesBySlug(slug);
  
  if (!movie) {
    notFound();
  }

  const showtimes = await getShowtimesByMovieId(movie.id);
 

  return (
    <main>
      <h1>Película: {slug}</h1>

      {showtimes && showtimes.length > 0 ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-primary pl-3">Proyecciones</h2>
          {showtimes.map((showtime) => (
            <div key={showtime.id}>
              <h3>{formatShowtime(showtime.starts_at)}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-muted-foreground bg-secondary/50 rounded-lg p-4">No hay proyecciones para esta película</p>
        </div>
      )}
    </main>
  );
}
