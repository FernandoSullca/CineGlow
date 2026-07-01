# Lista de Tareas (TODO) para CineGlow

## Prioridad ALTA (Bloqueante para Deploy)

1.  **Completar Flujo de Reserva y Checkout**
    -   **Qué hacer**: Reemplazar el `SeatMapPlaceholder` en `/reservar/[showtimeId]` por un mapa de asientos interactivo. El estado de los asientos seleccionados debe pasarse a la página de checkout.
    -   **Archivos a tocar**: `app/(booking)/reservar/[showtimeId]/page.tsx`, `components/booking/seat-map.tsx` (nuevo), `app/(booking)/checkout/page.tsx`.
    -   **Uso de Patterns**: **Sí, es crucial**.
        -   `TicketFactory` para crear los tickets base.
        -   `PricingStrategy` para aplicar descuentos (estudiante, etc.).
        -   `TicketDecorator` para añadir extras (ej. VIP).
        -   `CandyItemFactory` y `CandyDecorator` para procesar los ítems del carrito.

2.  **Integrar Carrito de Candy Bar con el Flujo de Reserva**
    -   **Qué hacer**: Permitir que el carrito de `CandyBarClient` se combine con una selección de película. El estado del carrito debe persistir al navegar desde `/candy-bar` a una página de película y luego al checkout.
    -   **Archivos a tocar**: `components/candy-bar/candybarclien.tsx`, `app/(booking)/checkout/page.tsx`, `app/(booking)/reservar/[showtimeId]/page.tsx`.
    -   **Uso de Patterns**: **Sí**. `CandyItemFactory` y `Decorators` se usarán en `booking.service` para calcular el precio final.

## Prioridad MEDIA (Recomendado para Evaluación)

1.  **Implementar Página "Mis Reservas"**
    -   **Qué hacer**: Crear la página `/mis-reservas` que consulte y muestre el historial de reservas del usuario autenticado.
    -   **Archivos a tocar**: `app/(dashboard)/mis-reservas/page.tsx`, `lib/supabase/queries/reservations.ts` (nueva query).
    -   **Uso de Patterns**: No aplica.

## ✅ Completado

-   **Implementar Flujo de Autenticación de Usuario**: Se crearon las páginas de login/registro, el `middleware` de protección de rutas y el `Header` dinámico.
-   **Crear Página de Confirmación de Reserva**: La página `/confirmacion` está implementada y se usa al final del flujo de checkout.
-   **Corregir Bug de Géneros en Detalle de Película**: La página de detalle ahora muestra el género correctamente.
