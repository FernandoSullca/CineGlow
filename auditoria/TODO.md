# Lista de Tareas (TODO) para CineGlow

## Prioridad ALTA (Bloqueante para Deploy)

1.  **Completar Flujo de Reserva y Checkout**
    -   **Qué hacer**: Implementar el cálculo de precios dinámico para las entradas utilizando los patrones de diseño existentes.
    -   **Uso de Patterns**: **Sí, es crucial**.
        -   `TicketFactory` para crear los tickets base.
        -   `PricingStrategy` para aplicar descuentos (estudiante, etc.).
        -   `TicketDecorator` para añadir extras (ej. VIP).

2.  **Hacer el Mapa de Asientos Dinámico**
    -   **Qué hacer**: Obtener la lista de asientos ya ocupados para una función específica desde la base de datos y pasarla al componente `SeatMap`.
    -   **Archivos a tocar**: `lib/supabase/queries/reservations.ts` (nueva query), `app/(booking)/reservar/[showtimeId]/page.tsx`, `components/booking/seat-map.tsx`.
    -   **Uso de Patterns**: No aplica directamente.

## Prioridad MEDIA (Recomendado para Evaluación)

## ✅ Completado

-   **Implementar Flujo de Autenticación de Usuario**: Se crearon las páginas de login/registro, el `middleware` de protección de rutas y el `Header` dinámico.
-   **Crear Página de Confirmación de Reserva**: La página `/confirmacion` está implementada y se usa al final del flujo de checkout.
-   **Corregir Bug de Géneros en Detalle de Película**: La página de detalle ahora muestra el género correctamente.
-   **Implementar Página "Mis Reservas"**: La página `/mis-reservas` muestra el historial de compras del usuario autenticado.
-   **Flujo de Reserva con Asientos (Mock)**: El flujo desde la selección de película hasta la confirmación es funcional, usando un mapa de asientos interactivo pero con precios y ocupación fijos.
