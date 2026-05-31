import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { dashboardStats, enrolledCourses, courseSections } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { getProgress } from '../utils/storage'

const navLinks = [
  { label: 'Dashboard',           icon: '📊', to: '/dashboard' },
  { label: 'Mi aprendizaje',      icon: '📚', to: '/dashboard' },
  { label: 'Mis certificados',    icon: '🎓', to: '/dashboard' },
  { label: 'Historial de compras',icon: '🧾', to: '/dashboard' },
  { label: 'Perfil',              icon: '👤', to: '/dashboard' },
  { label: 'Soporte',             icon: '💬', to: '/dashboard' },
]

const today = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date())

function ProgressBar({ value, completed }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-2 rounded-full ${completed ? 'bg-brand-green' : 'bg-brand-orange'}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right">{value}%</span>
    </div>
  )
}

const totalLessons = courseSections.flatMap((s) => s.lessons).length

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeNav, setActiveNav] = useState('Dashboard')

  const coursesWithProgress = useMemo(() =>
    enrolledCourses.map((c) => {
      const p = getProgress(c.courseId)
      const completed = p.completedLessonIds.length
      const progress = totalLessons ? Math.round((completed / totalLessons) * 100) : c.progress
      return {
        ...c,
        progress,
        completed: progress === 100,
        lastLesson: p.lastLessonTitle || c.lastLesson,
      }
    }),
    []
  )

  const inProgressCourses = coursesWithProgress.filter((c) => !c.completed).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-4 py-6 flex gap-6 flex-1">
        {/* Sidebar izquierdo */}
        <aside className="w-56 flex-shrink-0 hidden md:block">
          {/* Info del usuario */}
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-base flex-shrink-0">
              {user?.initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{user?.name}</p>
              <p className="text-gray-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>

          {/* Navegación */}
          <nav>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setActiveNav(link.label)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-colors mb-1 ${
                  activeNav === link.label
                    ? 'bg-orange-50 text-brand-orange font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className="flex-1 min-w-0">
          {/* Saludo */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              👋 ¡Hola, {user?.name?.split(' ')[0]}! Continúa aprendiendo.
            </h1>
            <p className="text-gray-400 text-sm capitalize mt-1">{today}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {dashboardStats.map((s) => (
              <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <p className={`text-3xl font-bold mb-1 ${s.color}`}>{s.value}</p>
                <p className="text-gray-500 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Continúa aprendiendo */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Continúa aprendiendo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {inProgressCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                    [Imagen]
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 leading-snug">
                      {course.title}
                    </p>
                    <ProgressBar value={course.progress} completed={course.completed} />
                    <button
                      onClick={() => navigate(`/curso/${course.courseId}/leccion/l5`)}
                      className="mt-3 w-full bg-brand-orange text-white text-xs font-semibold py-2 rounded hover:bg-orange-700 transition-colors"
                    >
                      Continuar →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Todos mis cursos */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Todos mis cursos</h2>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Encabezado de tabla */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <div className="col-span-5">Curso</div>
                <div className="col-span-3">Progreso</div>
                <div className="col-span-2">Última lección</div>
                <div className="col-span-2 text-right">Acción</div>
              </div>

              {coursesWithProgress.map((course, i) => (
                <div
                  key={course.id}
                  className={`flex flex-col md:grid md:grid-cols-12 md:gap-4 items-start md:items-center px-4 py-4 ${
                    i < coursesWithProgress.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {/* Curso */}
                  <div className="col-span-5 flex items-center gap-3 mb-3 md:mb-0 w-full">
                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-1">{course.title}</p>
                      <p className="text-xs text-gray-400">por {course.instructor}</p>
                    </div>
                  </div>

                  {/* Progreso */}
                  <div className="col-span-3 w-full md:w-auto mb-2 md:mb-0 pr-4 md:pr-0">
                    <ProgressBar value={course.progress} completed={course.completed} />
                  </div>

                  {/* Última lección */}
                  <div className="col-span-2 hidden md:block">
                    <p className="text-xs text-gray-500 line-clamp-2">{course.lastLesson}</p>
                  </div>

                  {/* Acción */}
                  <div className="col-span-2 flex justify-end w-full md:w-auto">
                    {course.completed ? (
                      <button className="bg-brand-green text-white text-xs font-semibold px-3 py-2 rounded hover:opacity-90 transition-opacity whitespace-nowrap">
                        Ver cert. ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/curso/${course.courseId}/leccion/l5`)}
                        className="bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded hover:bg-orange-700 transition-colors"
                      >
                        Continuar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
