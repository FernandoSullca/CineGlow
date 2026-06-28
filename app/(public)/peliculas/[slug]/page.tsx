import { getMoviesBySlug, getShowtimesByMovieId } from "@/lib/supabase/queries/movies";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";

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
      <div className="bg-background text-foreground">

        {/**Hero con imagen de fondo */}
        <div className="relative h-[30vh] md:h-[40vh] w-full">
          <Image
            src={movie.poster_url}
            alt={movie.title}
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          {/**efecto gradiente trasparente superior del fondo */}
          <div className="absolute inset-0 bg-gradient-to-t from-blackground via-transparent"></div>

        </div>


        <div className="container mx-auto px-4 -mt-24 md:-mt-32 relative pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {/**Poster de la pelicula incrustada */}
            <div className="md:col-span-1 lg:col-span-1">

              <Image
                src={movie.poster_url}
                alt={"Poster de la película" + movie.title}
                width={500}
                height={750}
                className="rounded-lg shadow-2x1 object-cover w-full"
                priority
              />

            </div>
            {/**Detalles */}
            <div className="md:col-span-2 lg:col-span-3 pt-4">
              <h1 className="text-4xl font-bold mb-2 md:text-5xl">{movie.title}</h1>
              <div className="flex items-center gap-4 mb-4 text-muted-foreground font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{movie.duration_minutes} minutos</span>
                </div>
                <span>.</span>
                <span>{movie.rating}</span>
                            
              </div>
              {/**Listado generos de pelicula*/}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map((genre: any) => (
                  <span key={genre} className="px-3 py-1 text-sm font-medium rounded-full bg-secondary">
                    {genre}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-semibold mb-3 border-l-4 border-primary pl-3">Sinopsis</h2>
              <p className="text-muted-foreground text-lg mb-8">{movie.synopsis}</p>

              {/**Funcioes disponibles */}
              <h2 className="text-2xl font-semibold mb-4 border-l-4 border-primary pl-3">Proyecciones disponibles</h2>
              {showtimes && showtimes.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {showtimes.map((showtime) => (
                    <div className="flex flex-col items-center leading-tight" key={showtime.id}>
                      <span className="text-lg font-bold" >{formatShowtime(showtime.starts_at)}</span>
                      <span className="text-sx font-normal">{showtime.room}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-muted-foreground bg-secondary/50 rounded-lg p-4">
                    No hay proyecciones para esta película.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
