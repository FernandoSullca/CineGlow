# Auditoría Técnica de CineGlow

## ✅ Funcionalidades Implementadas y Funcionando

-   **Cartelera (`/`)**: La página principal muestra correctamente el listado de películas obtenidas desde Supabase. El componente `MovieCatalog` permite filtrar por género en el lado del cliente.
-   **Detalle de Película (`/peliculas/[slug]`)**: La página de detalle carga dinámicamente los datos de una película y sus funciones (`showtimes`) disponibles desde Supabase, basándose en el `slug` de la URL.
-   **Catálogo de Candy Bar (`/candy-bar`)**: La página muestra los productos del candy bar agrupados por categoría, obtenidos desde Supabase. La UI es manejada por un Client Component (`CandyBarClient`) que presumiblemente gestiona un carrito local.

## 🔶 Implementadas Parcialmente (Funcionalidad Incompleta)

-   **Detalle de Película (`/peliculas/[slug]`)**:
    -   **Qué falta**: La página intenta renderizar una lista de géneros (`movie.genres.map(...)`), pero la base de datos (`movies.genre`) y el tipado (`Movie.genre`) definen el género como un único `string`. Esto causa un error en tiempo de ejecución y no muestra el género en la página de detalle.

## ❌ Planificadas pero No Implementadas

-   **Flujo de Reserva (`/reservar/[showtimeId]`)**: No hay código para la selección de asientos, la lógica de precios, ni la interacción con el mapa de la sala.
-   **Checkout (`/checkout`)**: No existe la página ni el servicio para procesar la reserva final, aplicar descuentos, combinar tickets con productos del candy bar y persistir la reserva en Supabase.
-   **Confirmación de Reserva (`/confirmacion`)**: Página no implementada.
-   **Mis Reservas (`/mis-reservas`)**: No hay una sección para que el usuario vea su historial de reservas.
-   **Autenticación (`/login`, `/register`)**: No se han implementado las rutas ni los componentes para el registro e inicio de sesión de usuarios con Supabase Auth.

## ⚠️ Código Existente No Utilizado

El proyecto tiene una base sólida de patrones de diseño en la carpeta `patterns/`, pero actualmente no son invocados desde ninguna parte de la aplicación.

-   **`TicketFactory` y `CandyItemFactory` (`patterns/factory/`)**: Diseñados para crear entidades de dominio (`Ticket`, `CandyItem`), pero la lógica de reserva y checkout aún no los utiliza.
-   **Estrategias de Pricing y SeatSelection (`patterns/strategy/`)**: Creadas para manejar cálculos de precios (descuentos, promos) y lógicas de selección de asientos. No se aplican en ningún flujo.
-   **Decorators de Tickets y Candy (`patterns/decorator/`)**: Preparados para añadir extras acumulables (VIP, 3D, tamaño grande, etc.). No se usan, ya que el flujo de checkout no está implementado.
-   **Servicios (`services/`)**: La capa de orquestación que debería conectar la UI con los `patterns` y Supabase existe conceptualmente, pero no se está utilizando en la práctica.

