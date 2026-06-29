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

-   **Patrones de Diseño (`patterns/`) No Integrados**:
    -   **Descripción**: Se ha implementado una base sólida y reutilizable de lógica de negocio con los patrones Factory, Strategy y Decorator. Sin embargo, actualmente este código no es invocado por ninguna parte de la aplicación.
    -   **Justificación**: Esta implementación se realizó "diseño-arriba" (`design-up-front`) para establecer una arquitectura robusta y testeable para la lógica de negocio más compleja (cálculo de precios, creación de tickets). Se priorizó la creación de esta base antes de conectarla con la UI.
    -   **Plan de Acción**: Esta "deuda" se saldará al implementar el flujo de reserva y checkout (tarea de prioridad ALTA en `TODO.md`). El `booking.service` actuará como puente, orquestando la creación de entidades con las `Factories`, el cálculo de precios con las `Strategies` y la adición de extras con los `Decorators`, demostrando así el valor de esta arquitectura desacoplada.

