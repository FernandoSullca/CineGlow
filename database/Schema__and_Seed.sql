-- 1. Limpieza de tablas previas para evitar conflictos de columnas
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS showtimes CASCADE;
DROP TABLE IF EXISTS movies CASCADE;
DROP TYPE IF EXISTS showtime_format CASCADE;
DROP TYPE IF EXISTS reservation_status CASCADE;

-- 2. Crear tipos ENUM
CREATE TYPE showtime_format AS ENUM ('2D', '3D', 'IMAX', 'VIP');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- 3. Crear tabla: movies (Con todas las columnas de tu mock)
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    genre TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    rating NUMERIC(3,1) DEFAULT 0.0,
    synopsis TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Crear tabla: showtimes
CREATE TABLE showtimes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    starts_at TIMESTAMPTZ NOT NULL,
    room TEXT NOT NULL,
    format showtime_format NOT NULL
);

-- 5. Crear tabla: reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    showtime_id UUID NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
    seats TEXT[] NOT NULL,
    total_cents INTEGER NOT NULL,
    status reservation_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Desactivar RLS para desarrollo ágil
ALTER TABLE movies DISABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;

-- 7. Insertar tus 9 películas reales del Mock
INSERT INTO movies (title, slug, genre, poster_url, duration_minutes, rating, synopsis) VALUES
('Neon Horizon', 'neon-horizon', 'Ciencia Ficción', 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&h=900&fit=crop', 142, 8.4, 'En un futuro distópico, un piloto descubre una señal que podría salvar a la humanidad.'),
('Sombra de Acero', 'sombra-de-acero', 'Acción', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=900&fit=crop', 118, 7.9, 'Un ex agente vuelve a la acción cuando su familia queda en la mira de una organización criminal.'),
('El Último Verano', 'el-ultimo-verano', 'Drama', 'https://images.unsplash.com/photo-1478720568477-152d9b334e59?w=600&h=900&fit=crop', 126, 8.1, 'Tres hermanos se reencuentran en la casa de la infancia durante un verano inolvidable.'),
('Quantum Drift', 'quantum-drift', 'Ciencia Ficción', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=900&fit=crop', 135, 8.7, 'Una científica atraviesa dimensiones paralelas en busca de su desaparecida colega.'),
('Código Rojo', 'codigo-rojo', 'Acción', 'https://images.unsplash.com/photo-1598899134739-24a46acbd1f5?w=600&h=900&fit=crop', 109, 7.5, 'Operación de rescate en las alturas de un rascacielos tomado por mercenarios.'),
('Cartas al Océano', 'cartas-al-oceano', 'Drama', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&h=900&fit=crop', 112, 8.3, 'Una cartógrafa encuentra mensajes en botellas que cambian el rumbo de su vida.'),
('Velocidad Cero', 'velocidad-cero', 'Acción', 'https://images.unsplash.com/photo-1574267432644-85a5fc58a951?w=600&h=900&fit=crop', 124, 7.8, 'Carrera callejera clandestina que se convierte en la persecución del siglo.'),
('Ecos de Marte', 'ecos-de-marte', 'Ciencia Ficción', 'https://images.unsplash.com/photo-1614728894747-a83421e2b124?w=600&h=900&fit=crop', 148, 8.6, 'La primera colonia marciana enfrenta un misterio enterrado bajo el polvo rojo.'),
('La Casa del Silencio', 'la-casa-del-silencio', 'Drama', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=900&fit=crop', 119, 8.0, 'Una directora de cine documenta los últimos días de un teatro centenario.');

-- 8. Insertar un par de showtimes de prueba vinculados dinámicamente
INSERT INTO showtimes (movie_id, starts_at, room, format)
SELECT id, NOW() + INTERVAL '3 hours', 'Sala Estelar 1', 'IMAX' FROM movies WHERE slug = 'neon-horizon';

INSERT INTO showtimes (movie_id, starts_at, room, format)
SELECT id, NOW() + INTERVAL '5 hours', 'Sala Glow 3', '2D' FROM movies WHERE slug = 'sombra-de-acero';

-- 9. Crear tabla: candy_products
CREATE TABLE candy_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL,
    image_url TEXT,
    category TEXT NOT NULL, -- 'Combos', 'Bebidas', 'Snacks', 'Dulces'
    stock INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Desactivar RLS para candy_products
ALTER TABLE candy_products DISABLE ROW LEVEL SECURITY;

-- 11. Insertar productos de ejemplo para el Candy Bar
INSERT INTO candy_products (name, description, price_cents, image_url, category) VALUES
('Combo Pareja', '2 Refrescos grandes y 1 Palomitas grandes', 1500, 'https://images.unsplash.com/photo-1620189507195-68309c04c4d5?w=600&h=400&fit=crop', 'Combos'),
('Palomitas Grandes', 'Palomitas de maíz recién hechas, sabor mantequilla.', 650, 'https://images.unsplash.com/photo-1575429328392-c4a453982c77?w=600&h=400&fit=crop', 'Snacks'),
('Refresco Grande', 'Refresco de tu elección, tamaño grande.', 400, 'https://images.unsplash.com/photo-1600783441235-6037a4c73335?w=600&h=400&fit=crop', 'Bebidas'),
('Nachos con Queso', 'Nachos crujientes bañados en queso caliente.', 550, 'https://images.unsplash.com/photo-1598813273444-4361b369622a?w=600&h=400&fit=crop', 'Snacks'),
('Hot Dog Clásico', 'Salchicha premium en pan suave con tus aderezos favoritos.', 500, 'https://images.unsplash.com/photo-1619019363148-1b03b30619a0?w=600&h=400&fit=crop', 'Snacks'),
('M&Ms de Chocolate', 'Bolsa de chocolates M&Ms, perfecta para el cine.', 350, 'https://images.unsplash.com/photo-1610487132924-1a7375a34208?w=600&h=400&fit=crop', 'Dulces');

-- 12. Limpieza adicional para candy_products
DROP TYPE IF EXISTS candy_category;
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS candy_items JSONB;