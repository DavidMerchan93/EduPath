# EduPath — Frontend

Plataforma de aprendizaje online (estilo Udemy) construida con React, Vite y Tailwind CSS. Este repositorio contiene el MVP del frontend con datos mock y navegación completa entre 4 pantallas.

## Tech Stack

| Herramienta | Versión | Uso |
|---|---|---|
| React | 18 | UI y estado de componentes |
| Vite | 6 | Bundler y servidor de desarrollo |
| React Router DOM | 6 | Navegación client-side (SPA) |
| Tailwind CSS | 3 | Estilos utilitarios |

## Instalación y ejecución

```bash
# Desde la raíz del monorepo
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La app queda disponible en `http://localhost:5173`

## Pantallas y rutas

| Ruta | Pantalla | Descripción |
|---|---|---|
| `/` | Home | Landing page con hero, categorías, cursos populares, stats y testimonios |
| `/curso/:id` | Detalle del curso | Info completa del curso, acordeón de contenido, valoraciones y sidebar de compra |
| `/auth` | Login / Registro | Split-screen con formulario de inicio de sesión y registro (tabs) |
| `/curso/:id/leccion/:lessonId` | Player | Reproductor de video, contenido del curso en sidebar, tabs de descripción/recursos/notas |

## Estructura del proyecto

```
src/
├── App.jsx                 # Definición de rutas
├── main.jsx                # Entry point con BrowserRouter
├── index.css               # Tailwind base + fuente Inter
├── data/
│   └── mockData.js         # Todos los datos de prueba (cursos, lecciones, reviews, etc.)
├── components/
│   ├── Navbar.jsx          # Barra de navegación principal
│   ├── Footer.jsx          # Pie de página
│   ├── CourseCard.jsx      # Tarjeta de curso para el grid
│   ├── CategoryChip.jsx    # Pill de categoría
│   ├── AccordionSection.jsx # Sección colapsable del contenido del curso
│   ├── RatingBar.jsx       # Barra de distribución de ratings
│   ├── VideoPlayer.jsx     # Reproductor de video (mock)
│   └── LessonSidebar.jsx   # Sidebar de lecciones en el player
└── pages/
    ├── HomePage.jsx
    ├── CourseDetailPage.jsx
    ├── AuthPage.jsx
    └── PlayerPage.jsx
```

## Design System

| Token | Color | Uso |
|---|---|---|
| `brand-blue` | `#1a4a6b` | Navbar, hero, headers |
| `brand-orange` | `#e85d04` | Botones primarios, precios, CTAs |
| `brand-star` | `#f59e0b` | Estrellas de rating |
| `brand-green` | `#22c55e` | Lecciones completadas |
| `brand-purple` | `#7c3aed` | Lección activa en player |

## Flujo de navegación

```
Home → click CourseCard → CourseDetail → click "Comprar ahora" → Player
Home → click "Iniciar sesión" / "Registrarse" → Auth
Player → click "Volver al catálogo" → Home
Player → click lección en sidebar → misma pantalla con nueva lección
Player → click "Completar lección" → avanza a la siguiente lección
```

## Notas de desarrollo

- Los datos se encuentran en `src/data/mockData.js` — edita ahí para cambiar el contenido.
- No hay backend ni llamadas a APIs; todo es estático para este MVP.
- El reproductor de video es visual/mock — no reproduce video real.
- Los formularios de auth están controlados pero no hacen fetch.
