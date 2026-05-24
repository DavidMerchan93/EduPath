import { Link } from 'react-router-dom'
import { dashboardUser } from '../data/mockData'

export default function NavbarUser() {
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
          <Link to="/dashboard" className="hover:text-brand-orange transition-colors">Mi aprendizaje</Link>
          <Link to="/cursos"    className="hover:text-brand-orange transition-colors">Categorías</Link>
        </div>

        <Link
          to="/dashboard"
          className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-sm flex-shrink-0 hover:bg-orange-700 transition-colors ml-auto"
        >
          {dashboardUser.initials}
        </Link>
      </div>
    </nav>
  )
}
