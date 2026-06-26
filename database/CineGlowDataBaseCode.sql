-- 1. Crear tipos ENUM específicos para mantener consistencia con TypeScript
CREATE TYPE showtime_format AS ENUM ('2D', '3D', 'IMAX', 'VIP');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- 2. Crear tabla: movies
CREATE TABLE movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    duration_minutes INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Crear tabla: showtimes
CREATE TABLE showtimes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    movie_id UUID NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    starts_at TIMESTAMPTZ NOT NULL,
    room TEXT NOT NULL,
    format showtime_format NOT NULL -- Mapea exactamente tu '2D' | '3D' | 'IMAX' | 'VIP'
);

-- 4. Crear tabla: reservations
CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Si usás auth de Supabase, idealmente apuntaría a auth.users(id)
    showtime_id UUID NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
    seats TEXT[] NOT NULL, -- Mapea exactamente tu array de strings (string[])
    total_cents INTEGER NOT NULL,
    status reservation_status NOT NULL DEFAULT 'pending', -- Mapea tu enum de estados
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Desactivar RLS automáticamente para velocidad en el Challenge
ALTER TABLE movies DISABLE ROW LEVEL SECURITY;
ALTER TABLE showtimes DISABLE ROW LEVEL SECURITY;
ALTER TABLE reservations DISABLE ROW LEVEL SECURITY;