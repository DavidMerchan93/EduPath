import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CourseCard from '../components/CourseCard'
import CategoryChip from '../components/CategoryChip'
import { courses, categories, stats, testimonials } from '../data/mockData'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-brand-blue text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-xl mb-6">
            Aprende sin límites. El conocimiento que necesitas, cuando lo necesitas.
          </h1>
          <p className="text-blue-200 max-w-sm mb-8 text-base leading-relaxed">
            Accede a miles de cursos creados por expertos. Desde tecnología hasta diseño, encuentra el curso que impulse tu carrera profesional.
          </p>
          <Link
            to="/curso/1"
            className="inline-block bg-brand-orange text-white px-6 py-3 rounded font-semibold text-sm hover:bg-orange-700 transition-colors"
          >
            Explorar cursos →
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <section className="bg-gray-50 border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto pb-1">
          <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Explorar por categoría:</span>
          {categories.map((cat) => (
            <CategoryChip key={cat.id} icon={cat.icon} name={cat.name} />
          ))}
        </div>
      </section>

      {/* Cursos más populares */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Cursos más populares</h2>
            <Link to="/" className="text-brand-orange text-sm font-medium hover:underline">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-brand-orange py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
          {stats.map((s) => (
            <div key={s.id}>
              <p className="text-4xl font-bold mb-1">{s.value}</p>
              <p className="text-orange-100 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Lo que dicen nuestros estudiantes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <div className="flex text-brand-star text-xs">
                      {'★'.repeat(t.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
