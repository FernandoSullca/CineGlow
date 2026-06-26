-- ==========================================
-- SEED DATA: PELÍCULAS (MOVIES)
-- ==========================================
INSERT INTO movies (id, title, slug, duration_minutes, created_at) VALUES
('b1a0c7ed-6b1a-4d24-bd34-935dfa8726c1', 'Inception', 'inception', 148, NOW()),
('c2b1d8fe-7c2b-5e35-ce45-046e0b9837d2', 'The Dark Knight', 'the-dark-knight', 152, NOW()),
('d3c2e9ff-8d3c-6f46-df56-157f1ca948e3', 'Interstellar', 'interstellar', 169, NOW());

-- ==========================================
-- SEED DATA: FUNCIONES (SHOWTIMES)
-- ==========================================
-- Vinculamos funciones específicas a cada película usando IDs fijos para consistencia
INSERT INTO showtimes (id, movie_id, starts_at, room, format) VALUES
-- Funciones para Inception
('e4d3f0aa-9e4d-7f57-ea67-26802db059f4', 'b1a0c7ed-6b1a-4d24-bd34-935dfa8726c1', NOW() + INTERVAL '2 hours', 'Sala 1 - General', '2D'),
('f5e4f1bb-0f5e-8f68-fb78-37913ec16af5', 'b1a0c7ed-6b1a-4d24-bd34-935dfa8726c1', NOW() + INTERVAL '5 hours', 'Sala 3 - IMAX', 'IMAX'),

-- Funciones para The Dark Knight
('a1b2c3d4-1234-5678-abcd-ef1234567890', 'c2b1d8fe-7c2b-5e35-ce45-046e0b9837d2', NOW() + INTERVAL '1 day', 'Sala 2 - VIP', 'VIP'),
('b2c3d4e5-2345-6789-bcde-f23456789012', 'c2b1d8fe-7c2b-5e35-ce45-046e0b9837d2', NOW() + INTERVAL '1 day 3 hours', 'Sala 1 - General', '3D'),

-- Funciones para Interstellar
('c3d4e5f6-3456-7890-cdef-012345678901', 'd3c2e9ff-8d3c-6f46-df56-157f1ca948e3', NOW() + INTERVAL '3 hours', 'Sala 3 - IMAX', 'IMAX');

-- ==========================================
-- SEED DATA: RESERVAS INICIALES (OCUPACIÓN DE ASIENTOS)
-- ==========================================
-- Simulamos algunos asientos ya comprados para probar el estado "ocupado/gris" en tu SeatMap.tsx
INSERT INTO reservations (id, user_id, showtime_id, seats, total_cents, status, created_at) VALUES
-- Asientos A1, A2 y B5 ocupados para la función IMAX de Inception
('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000000', 'f5e4f1bb-0f5e-8f68-fb78-37913ec16af5', ARRAY['A1', 'A2', 'B5'], 12000, 'confirmed', NOW()),
-- Asiento F5 ocupado para la función VIP de The Dark Knight
('88888888-8888-8888-8888-888888888888', '00000000-0000-0000-0000-000000000000', 'a1b2c3d4-1234-5678-abcd-ef1234567890', ARRAY['F5'], 4500, 'confirmed', NOW());