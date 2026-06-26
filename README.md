# CineGlow

Sistema de reserva de cine construido con **Next.js App Router**, **TypeScript**, **Tailwind CSS** y **Supabase**. Permite consultar cartelera, reservar asientos, aplicar descuentos y agregar productos del candy bar.

La arquitectura separa de forma explícita la UI, las rutas, la capa de datos y la lógica de negocio mediante patrones de diseño desacoplados (Factory, Strategy y Decorator).

## Stack

| Tecnología | Uso |
|------------|-----|
| [Next.js 15](https://nextjs.org/) | App Router, Server Components, API Routes |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático en todo el proyecto |
| [Tailwind CSS](https://tailwindcss.com/) | Estilos utilitarios |
| [Supabase](https://supabase.com/) | Base de datos, autenticación y persistencia |

## Características

- Cartelera de películas y detalle por película
- Flujo de reserva con selección de asientos
- Candy bar con combos, snacks y bebidas
- Descuentos configurables (estudiante, promos, happy hour)
- Extras acumulables en tickets y productos (VIP, 3D, tamaños, toppings)
- Panel de reservas del usuario

## Inicio rápido

### Requisitos

- Node.js 18+
- Cuenta en [Supabase](https://supabase.com/)

### Instalación

```bash
git clone <url-del-repo>
cd CineGlow
npm install
```

### Variables de entorno

Copiá el archivo de ejemplo y completá tus credenciales de Supabase:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### Desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

### Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | Linter de Next.js |

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Cartelera |
| `/peliculas/[slug]` | Detalle de película |
| `/candy-bar` | Catálogo candy bar |
| `/reservar/[showtimeId]` | Selección de asientos |
| `/checkout` | Pago y confirmación |
| `/confirmacion` | Reserva confirmada |
| `/mis-reservas` | Historial del usuario |
| `/login` · `/register` | Autenticación |

## Estructura del proyecto

```
CineGlow/
├── app/                    # Rutas y layouts (App Router)
│   ├── (public)/           # Cartelera y candy bar
│   ├── (booking)/          # Flujo de reserva
│   ├── (dashboard)/        # Área del usuario
│   ├── (auth)/             # Login y registro
│   └── api/                # Route Handlers (BFF)
│
├── components/             # UI por dominio
│   ├── ui/                 # Primitivos (Button, Input…)
│   ├── layout/             # Header, Footer
│   ├── cinema/             # MovieCard, ShowtimeList
│   ├── booking/            # SeatMap, CheckoutSummary
│   └── candy-bar/          # ProductCard, CartDrawer
│
├── lib/
│   ├── supabase/           # Clientes, tipos DB y queries
│   ├── utils/
│   └── constants/
│
├── patterns/               # Patrones de diseño (sin React ni Supabase)
│   ├── factory/            # Creación de tickets y productos
│   ├── strategy/           # Pricing y selección de asientos
│   └── decorator/          # Extras acumulables
│
├── services/               # Orquestación de negocio
├── types/                  # Contratos de dominio
├── hooks/
└── config/
```

## Arquitectura

El flujo de una reserva sigue esta cadena:

```
app/(booking)/reservar → services/booking → patterns/* → lib/supabase
                              ↑
                    components/booking (UI)
```

| Capa | Responsabilidad |
|------|-----------------|
| `app/` | Rutas, layouts, Server Components |
| `components/` | UI presentacional |
| `lib/supabase/` | Clientes, tipos y queries |
| `patterns/` | Lógica pura de tickets y candy bar |
| `services/` | Une patterns + Supabase + reglas de negocio |
| `types/` | Interfaces compartidas |

Para más detalle, consultá [ARCHITECTURE.md](./ARCHITECTURE.md).

## Patrones de diseño

Los patrones viven en `patterns/` y **no dependen de React ni Supabase**, lo que permite testearlos de forma aislada.

### Factory — creación de entidades

- `TicketFactory`: genera entradas según formato (2D, 3D, IMAX, VIP)
- `CandyItemFactory`: genera ítems del candy bar (combo, snack, bebida)

### Strategy — algoritmos intercambiables

- **Pricing**: estándar, estudiante (-20 %), códigos promo, happy hour (lun–jue -15 %)
- **Seat selection**: grilla estándar vs. filas VIP

### Decorator — extras acumulables

- **Ticket**: base → +VIP Lounge → +3D → +Combo candy
- **Candy**: base → +Tamaño grande → +Mantequilla extra → +Topping premium

Ejemplo de composición de un ticket:

```typescript
import { buildTicket } from '@/services/ticket.service';

const { component, finalPriceCents, appliedRules } = buildTicket({
  input: { format: '2D', showtimeId: 'abc', seat: 'F5' },
  addVipLounge: true,
  isStudent: true,
});
```

## Supabase

Los clientes están en `lib/supabase/`:

- `client.ts` — uso en Client Components (browser)
- `server.ts` — uso en Server Components y Route Handlers (cookies)
- `queries/` — funciones reutilizables (`getMovies`, `createReservation`, etc.)
- `types.ts` — tipos de las tablas (`movies`, `showtimes`, `reservations`)

## Convenciones

1. Las páginas no importan `patterns/` directamente; usan `services/`.
2. `components/` no contiene reglas de negocio, solo props y eventos.
3. Los route groups `(public)`, `(booking)`, `(auth)` y `(dashboard)` organizan layouts sin afectar la URL.
4. El alias `@/*` apunta a la raíz del proyecto (configurado en `tsconfig.json`).


## Orquestación de Inteligencia Artificial y Velocidad

Para el desarrollo de **CineGlow**, el uso de asistentes de Inteligencia Artificial fue un requisito estratégico integrado desde el primer minuto. Se utilizó **Cursor** como entorno de desarrollo potenciado con **Claude 3.5 Sonnet** para maximizar la velocidad de entrega, actuando bajo un rol de **Arquitecto/Auditor**.

### Estrategia de Copiloto y Prompts Clave

La IA no se utilizó para generar código a ciegas mediante copy-paste, sino como un acelerador de boilerplate, maquetado de UI y tipado estructural. 

El desarrollo se inició orquestando la estructura base mediante el siguiente prompt inicial:

> *"Actuá como un Arquitecto de Software experto en Next.js, TypeScript y Tailwind CSS. Necesito estructurar un sistema de reserva de cine llamado 'CineGlow'. Generame la estructura de carpetas ideal bajo la 'App Router' de Next.js que separe claramente los componentes de la UI, las páginas, la conexión con Supabase y una carpeta 'patterns' donde pueda implementar los patrones Factory, Strategy y Decorator de forma desacoplada para la lógica de tickets y candy bar"*

### Criterio Técnico

La mayor ventaja de la IA radicó en acelerar tareas de alta fidelidad visual (como la grilla interactiva de selección de asientos con Tailwind CSS) y la generación automática de contratos de TypeScript a partir del esquema de la base de datos de Supabase. 

### Resoluciones

#### Error: `"next" no se reconoce como un comando interno o externo`

Este error aparece cuando **`npm install` no terminó correctamente** o nunca se ejecutó. Sin `node_modules`, el script `next dev` no encuentra el ejecutable de Next.js.

<details>
<summary><strong>Ver error original en consola</strong></summary>

```text
C:\Users\willian\Documents\CineGlow> npm run dev

> cineglow@0.1.0 dev
> next dev

"next" no se reconoce como un comando interno o externo,
programa o archivo por lotes ejecutable.
```

</details>

---

#### Paso a paso para solucionarlo

> **Plataforma:** Windows · **Terminal:** CMD o PowerShell  
> Ejecutá los comandos desde la carpeta raíz del proyecto (`CineGlow`).

**1. Limpiar cualquier rastro corrupto**

A veces la instalación se corta a la mitad. Borrá `node_modules` y `package-lock.json` si existen:

```cmd
rmdir /s /q node_modules
del package-lock.json
```

En **PowerShell** (alternativa):

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
```

**2. Forzar una instalación limpia**

Volvé a instalar todas las dependencias desde cero:

```bash
npm install
```

Verificá en consola que termine **sin errores críticos** y muestre un mensaje similar a:

```text
added 142 packages, and audited 143 packages in 12s
```

**3. Confirmar que `node_modules` existe**

```cmd
dir
```

Deberías ver la carpeta `node_modules` en el listado. También podés comprobar que Next.js quedó instalado:

```cmd
dir node_modules\.bin\next*
```

**4. Levantar el servidor de desarrollo**

```bash
npm run dev
```

Si todo salió bien, verás algo como:

```text
▲ Next.js 15.x.x
- Local:   http://localhost:3000
✓ Ready in 2.7s
```

Abrí [http://localhost:3000](http://localhost:3000) en el navegador.

---

#### Checklist rápido

| Paso | Comando | ¿OK? |
|------|---------|------|
| Limpiar instalación previa | `rmdir /s /q node_modules` + `del package-lock.json` | ☐ |
| Reinstalar dependencias | `npm install` | ☐ |
| Verificar carpeta | `dir node_modules` | ☐ |
| Iniciar servidor | `npm run dev` | ☐ |

#### Si el error persiste

- Confirmá que tenés **Node.js 18+** instalado: `node -v`
- Confirmá que tenés **npm** disponible: `npm -v`
- Cerrá y volvé a abrir la terminal después de instalar Node.js
- Probá borrar la caché de npm: `npm cache clean --force` y repetí desde el paso 1
