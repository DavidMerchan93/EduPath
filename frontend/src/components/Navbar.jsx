import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link to="/" className="bg-brand-orange text-white font-bold px-3 py-1.5 rounded text-sm flex-shrink-0">
          EduPath
        </Link>

        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
            <span className="text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buscar cursos..."
              className="flex-1 text-sm outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-700 font-medium">
          <Link to="/" className="hover:text-brand-orange transition-colors">Categorías</Link>
          <Link to="/" className="hover:text-brand-orange transition-colors">Sé instructor</Link>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Link
            to="/auth"
            className="border border-brand-orange text-brand-orange px-4 py-1.5 rounded text-sm font-medium hover:bg-orange-50 transition-colors"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/auth"
            className="bg-brand-orange text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-orange-700 transition-colors"
          >
            Registrarse
          </Link>
        </div>
      </div>
    </nav>
  )
}
