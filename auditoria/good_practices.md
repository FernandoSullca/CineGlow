# Buenas Prácticas y Deuda Técnica en CineGlow

## ✅ Buenas Prácticas Aplicadas

1.  **Arquitectura Limpia y Desacoplada**: El proyecto tiene una excelente separación de responsabilidades:
    -   `app/`: Rutas y lógica de servidor (Server Components).
    -   `components/`: Componentes de UI presentacionales.
    -   `lib/supabase/`: Abstracción de la capa de datos.
    -   `services/`: Orquestadores de lógica de negocio.
    -   `patterns/`: Lógica de dominio pura, aislada de frameworks y BBDD.

2.  **Uso Estratégico de Next.js App Router**:
    -   **Server Components por Defecto**: Las páginas (`page.tsx`) son Server Components que obtienen datos directamente (`async/await`), mejorando el rendimiento y la seguridad.
    -   **Route Groups (`(public)`, `(booking)`)**: Se utilizan para organizar rutas y layouts sin afectar las URLs, manteniendo el proyecto ordenado.

3.  **Tipado Estricto con TypeScript**:
    -   El uso de `types/` para contratos de dominio compartidos y la generación de tipos a partir del esquema de Supabase garantizan la seguridad de tipos en todo el proyecto.
    -   La distinción en `types/candy-bar.ts` entre `DbCandyCategory` (base de datos) y `CandyCategory` (dominio) es un ejemplo de diseño defensivo y claro.

4.  **Gestión de Base de Datos Versionada**:
    -   El esquema completo y los datos de prueba (`seed`) están versionados en `database/Schema__and_Seed.sql`. Esto asegura la reproducibilidad del entorno de desarrollo y producción.

## ⚠️ Inconsistencias a Corregir

1.  **Manejo de Géneros de Películas**:
    -   **Problema**: La página de detalle (`/peliculas/[slug]`) espera que `movie.genres` sea un array, pero la base de datos, los datos de prueba y el componente de filtrado (`MovieCatalog`) lo tratan como un `string` único.
    -   **Solución**: Estandarizar el tratamiento de `genre` como un `string` en `app/(public)/peliculas/[slug]/page.tsx` para que coincida con el resto de la aplicación.

## 🧐 Deuda Técnica Documentada

-   **Uso Parcial de Patrones de Diseño (`patterns/`)**:
    -   **Descripción**: El `booking.service` ya utiliza el patrón `Strategy` a través de `buildTicket`, pero de forma limitada. El precio base de las entradas es fijo y no se aplican descuentos dinámicos (estudiante, promos). Además, los patrones `Factory` y `Decorator` para el Candy Bar no se están utilizando.
    -   **Justificación**: Se priorizó la implementación de un flujo de checkout funcional de extremo a extremo, dejando el cálculo de precios dinámico como un paso de refinamiento posterior.
    -   **Plan de Acción**: La deuda se saldará al refactorizar el `booking.service` y el `checkout action` para que utilicen plenamente las `Pricing Strategies` y los `Decorators`, permitiendo así la aplicación de descuentos y extras. Esto demostrará el valor completo de la arquitectura desacoplada.
