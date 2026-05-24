# EduPath

Plataforma de aprendizaje online inspirada en Udemy, desarrollada como proyecto universitario para el **Módulo 2 — Diseño de Páginas Web**. Permite a los usuarios explorar cursos, ver el detalle de cada uno, reproducir lecciones y gestionar su aprendizaje desde un dashboard personal.

## Vista previa

| Pantalla | Ruta |
|---|---|
| Landing page | `/` |
| Catálogo de cursos | `/cursos` |
| Detalle del curso | `/curso/:id` |
| Reproductor de lección | `/curso/:id/leccion/:lessonId` |
| Login / Registro | `/auth` |
| Dashboard del estudiante | `/dashboard` |

## Estructura del repositorio

```
EduPath/
├── frontend/        # Aplicación React (Vite + Tailwind CSS)
├── backend/         # Pendiente de implementación
├── index.html       # Placeholder raíz
└── README.md
```

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| React | 18 | Biblioteca de UI |
| Vite | 6 | Bundler y servidor de desarrollo |
| React Router DOM | 6 | Navegación SPA (client-side routing) |
| Tailwind CSS | 3 | Estilos utilitarios |
| JavaScript (ES2024) | — | Lenguaje principal |

## Instalación y ejecución

**Requisitos:** Node.js 18+ y npm 9+

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd EduPath

# 2. Instalar dependencias del frontend
cd frontend
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`

## Funcionalidades del MVP

- **Landing page** con hero, categorías, cursos populares, estadísticas y testimonios
- **Catálogo** con filtros por categoría, nivel, precio y valoración; ordenamiento y paginación
- **Detalle del curso** con acordeón de contenido, distribución de ratings y sidebar de compra
- **Reproductor de lección** con sidebar de progreso, tabs de descripción, recursos y notas
- **Autenticación** (mock) con login, registro y usuarios de prueba visibles
- **Dashboard del estudiante** con métricas, cursos en progreso y tabla de todos los cursos

## Usuarios de prueba

| Nombre | Correo | Contraseña | Rol |
|---|---|---|---|
| Carlos Rodríguez | carlos@edupath.com | estudiante123 | Estudiante |
| Ana García | ana@edupath.com | instructor456 | Instructora |

## Design system

| Token | Color | Uso |
|---|---|---|
| `brand-blue` | `#1a4a6b` | Navbar, hero, headers |
| `brand-orange` | `#e85d04` | Botones primarios, precios, CTAs |
| `brand-star` | `#f59e0b` | Estrellas de rating |
| `brand-green` | `#22c55e` | Lecciones completadas, certificados |
| `brand-purple` | `#7c3aed` | Lección activa en el reproductor |

## Estado del proyecto

| Módulo | Estado |
|---|---|
| Frontend (6 pantallas) | Completado |
| Datos mock | Completado |
| Backend / API REST | Pendiente |
| Base de datos | Pendiente |
| Autenticación real | Pendiente |

## Autor

**David Merchan** — Universidad, Quinto semestre, Diseño de Páginas Web  
Licencia: [MIT](LICENSE)
