import type { Movie } from '@/types/movie';

/**
 * Datos estáticos temporales.
 * Reemplazar por getMovies() desde lib/supabase/queries/movies.ts
 */
export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Neon Horizon',
    slug: 'neon-horizon',
    genre: 'Ciencia Ficción',
    posterUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop',
    durationMinutes: 142,
    rating: 8.4,
    synopsis: 'En un futuro distópico, un piloto descubre una señal que podría salvar a la humanidad.',
  },
  {
    id: '2',
    title: 'Sombra de Acero',
    slug: 'sombra-de-acero',
    genre: 'Acción',
    posterUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop',
    durationMinutes: 118,
    rating: 7.9,
    synopsis: 'Un ex agente vuelve a la acción cuando su familia queda en la mira de una organización criminal.',
  },
  {
    id: '3',
    title: 'El Último Verano',
    slug: 'el-ultimo-verano',
    genre: 'Drama',
    posterUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b334e59?w=600&h=900&fit=crop',
    durationMinutes: 126,
    rating: 8.1,
    synopsis: 'Tres hermanos se reencuentran en la casa de la infancia durante un verano inolvidable.',
  },
  {
    id: '4',
    title: 'Quantum Drift',
    slug: 'quantum-drift',
    genre: 'Ciencia Ficción',
    posterUrl:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=900&fit=crop',
    durationMinutes: 135,
    rating: 8.7,
    synopsis: 'Una científica atraviesa dimensiones paralelas en busca de su desaparecida colega.',
  },
  {
    id: '5',
    title: 'Código Rojo',
    slug: 'codigo-rojo',
    genre: 'Acción',
    posterUrl:
      'https://images.unsplash.com/photo-1598899134739-24a46acbd1f5?w=600&h=900&fit=crop',
    durationMinutes: 109,
    rating: 7.5,
    synopsis: 'Operación de rescate en las alturas de un rascacielos tomado por mercenarios.',
  },
  {
    id: '6',
    title: 'Cartas al Océano',
    slug: 'cartas-al-oceano',
    genre: 'Drama',
    posterUrl:
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&h=900&fit=crop',
    durationMinutes: 112,
    rating: 8.3,
    synopsis: 'Una cartógrafa encuentra mensajes en botellas que cambian el rumbo de su vida.',
  },
  {
    id: '7',
    title: 'Velocidad Cero',
    slug: 'velocidad-cero',
    genre: 'Acción',
    posterUrl:
      'https://images.unsplash.com/photo-1574267432644-85a5fc58a951?w=600&h=900&fit=crop',
    durationMinutes: 124,
    rating: 7.8,
    synopsis: 'Carrera callejera clandestina que se convierte en la persecución del siglo.',
  },
  {
    id: '8',
    title: 'Ecos de Marte',
    slug: 'ecos-de-marte',
    genre: 'Ciencia Ficción',
    posterUrl:
      'https://images.unsplash.com/photo-1614728894747-a83421e2b124?w=600&h=900&fit=crop',
    durationMinutes: 148,
    rating: 8.6,
    synopsis: 'La primera colonia marciana enfrenta un misterio enterrado bajo el polvo rojo.',
  },
  {
    id: '9',
    title: 'La Casa del Silencio',
    slug: 'la-casa-del-silencio',
    genre: 'Drama',
    posterUrl:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=900&fit=crop',
    durationMinutes: 119,
    rating: 8.0,
    synopsis: 'Una directora de cine documenta los últimos días de un teatro centenario.',
  },
];
