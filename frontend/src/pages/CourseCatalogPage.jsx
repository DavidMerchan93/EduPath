import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { catalogCourses, catalogFilters } from '../data/mockData'

function FilterGroup({ title, options }) {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 text-sm mb-3">{title}</h3>
      <ul className="space-y-2">
        {options.map((opt) => (
          <li key={opt.label} className="flex items-center gap-2">
            <input type="checkbox" id={opt.label} className="accent-brand-orange w-4 h-4 cursor-pointer" />
            <label htmlFor={opt.label} className="text-sm text-gray-700 cursor-pointer flex-1">
              {opt.label}
            </label>
            {opt.count !== undefined && (
              <span className="text-xs text-gray-400">({opt.count.toLocaleString()})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CourseCatalogPage() {
  const [sortBy, setSortBy] = useState('Más populares')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 py-6 flex-1">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-brand-orange">Inicio</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">Cursos</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-1">Todos los cursos</h1>
        <p className="text-gray-500 text-sm mb-6">1,248 resultados</p>

        <div className="flex gap-8 items-start">
          {/* Sidebar de filtros */}
          <aside className="w-60 flex-shrink-0 hidden md:block">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Filtros</h2>
              <button className="text-brand-orange text-sm hover:underline">Limpiar todo</button>
            </div>

            <FilterGroup title="Categoría" options={catalogFilters.categories} />
            <FilterGroup title="Nivel"     options={catalogFilters.levels} />
            <FilterGroup title="Precio"    options={catalogFilters.prices} />
            <FilterGroup title="Valoración" options={catalogFilters.ratings} />
          </aside>

          {/* Área principal */}
          <div className="flex-1 min-w-0">
            {/* Ordenar por */}
            <div className="bg-gray-50 rounded-lg px-4 py-3 flex items-center gap-2 mb-6">
              <span className="text-sm text-gray-700 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
              >
                <option>Más populares</option>
                <option>Mejor valorados</option>
                <option>Más recientes</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
              </select>
            </div>

            {/* Grid de cursos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {catalogCourses.map((course, i) => (
                <div key={`${course.id}-${i}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                    [Imagen]
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 text-xs mb-2">{course.instructor}</p>
                    <div className="flex items-center gap-1 text-xs mb-3">
                      <span className="text-brand-star">⭐</span>
                      <span className="font-bold text-gray-800">{course.rating}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-500">{course.students.toLocaleString()}k estudiantes</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className={`font-bold text-sm ${course.isFree ? 'text-brand-orange' : 'text-brand-orange'}`}>
                        {course.isFree ? 'GRATIS' : `$${course.price} USD`}
                      </span>
                      <Link
                        to={`/curso/${course.id}`}
                        className="bg-brand-orange text-white text-xs font-semibold px-3 py-2 rounded hover:bg-orange-700 transition-colors"
                      >
                        Ver curso →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            <div className="flex items-center justify-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-brand-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded transition-colors ${
                    currentPage === page
                      ? 'bg-brand-orange text-white font-semibold'
                      : 'text-gray-600 hover:text-brand-orange'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-brand-orange disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
