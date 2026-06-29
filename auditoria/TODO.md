# Lista de Tareas (TODO) para CineGlow

##  priorité ALTA (Bloqueante para Deploy)

1.  **Implementar Flujo de Autenticación de Usuario**
    -   **Qué hacer**: Crear las páginas y componentes para `/login` y `/register` usando Supabase Auth. Proteger las rutas de reserva y perfil de usuario.
    -   **Archivos a tocar**: `app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`, `components/auth/*`, `lib/supabase/server.ts` (para proteger rutas), `middleware.ts`.
    -   **Uso de Patterns**: No aplica directamente.

2.  **Implementar Flujo de Reserva y Checkout**
    -   **Qué hacer**: Crear la página `/reservar/[showtimeId]` con un mapa de asientos interactivo. Crear el servicio `booking.service.ts` que use los `patterns` para calcular el precio final (tickets + candy) y persista la reserva en la tabla `reservations` de Supabase a través de una API Route o Server Action.
    -   **Archivos a tocar**: `app/(booking)/reservar/[showtimeId]/page.tsx`, `app/api/checkout/route.ts` (o Server Action), `services/booking.service.ts`, `components/booking/seat-map.tsx`.
    -   **Uso de Patterns**: **Sí, es crucial**.
        -   `TicketFactory` para crear los tickets base.
        -   `PricingStrategy` para aplicar descuentos (estudiante, etc.).
        -   `TicketDecorator` para añadir extras (ej. VIP).
        -   `CandyItemFactory` y `CandyDecorator` para procesar los ítems del carrito.

3.  **Corregir Bug de Géneros en Detalle de Película**
    -   **Qué hacer**: Modificar el renderizado en la página de detalle para que muestre el `genre` como un `string` único, en lugar de intentar iterar un array.
    -   **Archivos a tocar**: `app/(public)/peliculas/[slug]/page.tsx`.
    -   **Uso de Patterns**: No aplica.

## priorité MEDIA (Recomendado para Evaluación)

1.  **Implementar Página "Mis Reservas"**
    -   **Qué hacer**: Crear la página `/mis-reservas` que consulte y muestre el historial de reservas del usuario autenticado.
    -   **Archivos a tocar**: `app/(dashboard)/mis-reservas/page.tsx`, `lib/supabase/queries/reservations.ts` (nueva query).
    -   **Uso de Patterns**: No aplica.

2.  **Integrar Carrito de Candy Bar con el Checkout**
    -   **Qué hacer**: Conectar el estado del carrito de `CandyBarClient` con el flujo de checkout, para que los productos se añadan a la reserva final en la columna `candy_items` (JSONB).
    -   **Archivos a tocar**: `components/candy-bar/candybarclien.tsx`, `services/booking.service.ts`, `app/api/checkout/route.ts`.
    -   **Uso de Patterns**: **Sí**. `CandyItemFactory` y los `Decorators` se usarían en el `booking.service` para calcular el precio final de los productos del candy bar.

## priorité BASSE (Nice to Have)

1.  **Crear Página de Confirmación de Reserva**
    -   **Qué hacer**: Crear una página estática `/confirmacion` a la que se redirija al usuario tras un checkout exitoso, mostrando un resumen de su compra.
    -   **Archivos a tocar**: `app/(booking)/confirmacion/page.tsx`.
    -   **Uso de Patterns**: No aplica.

