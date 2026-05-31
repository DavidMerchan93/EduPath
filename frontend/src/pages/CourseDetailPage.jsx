import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AccordionSection from '../components/AccordionSection'
import RatingBar from '../components/RatingBar'
import { ratingDistribution } from '../data/mockData'
import { apiGetCourse, apiGetSections, apiGetReviews, apiEnroll, apiCheckEnrolled } from '../services/api'
import { useAuth } from '../context/AuthContext'

function StarRating({ rating }) {
  return (
    <span className="text-brand-star">
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
    </span>
  )
}

export default function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [course,   setCourse]   = useState(null)
  const [sections, setSections] = useState([])
  const [reviews,  setReviews]  = useState([])
  const [enrolled, setEnrolled] = useState(false)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [c, s, r] = await Promise.all([
          apiGetCourse(id),
          apiGetSections(id),
          apiGetReviews(id),
        ])
        setCourse(c)
        setSections(s)
        setReviews(r)
        if (user) {
          const { enrolled: isEnrolled } = await apiCheckEnrolled(id)
          setEnrolled(isEnrolled)
        }
      } catch {
        // Si falla la API, no hay datos — la UI mostrará el estado vacío
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, user])

  async function handleEnroll() {
    if (!user) { navigate('/auth'); return }
    if (enrolled) {
      const firstLessonId = sections[0]?.lessons[0]?.id ?? 'l1'
      navigate(`/curso/${id}/leccion/${firstLessonId}`)
      return
    }
    try {
      await apiEnroll(id)
      setEnrolled(true)
      const firstLessonId = sections[0]?.lessons[0]?.id ?? 'l1'
      navigate(`/curso/${id}/leccion/${firstLessonId}`)
    } catch (err) {
      if (err.message.includes('inscrito')) {
        setEnrolled(true)
        const firstLessonId = sections[0]?.lessons[0]?.id ?? 'l1'
        navigate(`/curso/${id}/leccion/${firstLessonId}`)
      }
    }
  }

  if (loading) return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-gray-400">Cargando...</div>
    </div>
  )

  if (!course) return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-gray-400">Curso no encontrado</div>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto w-full px-6 py-3 text-sm text-gray-500">
        <Link to="/" className="hover:text-brand-orange">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="hover:text-brand-orange cursor-pointer">{course.category}</span>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{course.title.split(':')[0]}</span>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 pb-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">

          {/* Contenido principal */}
          <main className="lg:col-span-2">
            {/* Header azul */}
            <div className="bg-brand-blue text-white rounded-lg p-8 mb-8">
              <h1 className="text-3xl font-bold mb-3 leading-tight">{course.title}</h1>
              <p className="text-blue-200 mb-4">{course.shortDescription}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100 mb-3">
                <div className="flex items-center gap-1">
                  <span className="text-brand-star font-bold text-base">★</span>
                  <span className="font-bold text-white">{course.rating}</span>
                  <span className="text-blue-300">({course.reviews.toLocaleString()} reseñas)</span>
                </div>
                <span>{course.students.toLocaleString()} estudiantes</span>
                <span>Nivel: {course.level}</span>
              </div>
              <p className="text-blue-200 text-sm mb-1">
                Por: <span className="text-white font-medium">{course.instructorName}</span>{' '}
                — {course.instructorRole}
              </p>
              <p className="text-blue-300 text-xs">
                Actualizado: {course.lastUpdated} &nbsp;|&nbsp; {course.language} &nbsp;|&nbsp; {course.hours} horas
              </p>
            </div>

            {/* Lo que aprenderás */}
            <div className="border border-orange-100 bg-orange-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Lo que aprenderás</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {course.whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-brand-orange mt-0.5 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contenido del curso */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Contenido del curso</h2>
              <p className="text-gray-500 text-sm mb-4">
                {course.sectionsCount} secciones &bull; {course.lessonsCount} clases &bull; {course.hours} horas
              </p>
              <div className="space-y-2">
                {sections.map((section) => (
                  <AccordionSection key={section.id} section={section} />
                ))}
              </div>
            </div>

            {/* Valoraciones */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Valoraciones del curso</h2>
              <div className="flex items-start gap-8 mb-6">
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-orange">{course.rating}</p>
                  <StarRating rating={course.rating} />
                  <p className="text-gray-500 text-xs mt-1">{course.reviews.toLocaleString()} reseñas</p>
                </div>
                <div className="flex-1 space-y-2">
                  {ratingDistribution.map((r) => (
                    <RatingBar key={r.stars} stars={r.stars} percentage={r.percentage} />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-xs">
                        {review.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{review.author}</p>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="sticky top-20 self-start mt-0 lg:mt-0 order-first lg:order-last mb-8 lg:mb-0">
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/FkQ-4m6toDQ?rel=0&modestbranding=1"
                  title="Vista previa del curso"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <div className="mb-3">
                  <span className="text-3xl font-bold text-gray-900">${course.price} USD</span>
                  <span className="text-gray-400 line-through text-sm ml-2">${course.originalPrice}</span>
                </div>
                <p className="text-brand-orange text-xs font-medium mb-4">
                  {course.discount}% dto. — Oferta termina pronto
                </p>
                <button
                  onClick={handleEnroll}
                  className="w-full bg-brand-orange text-white py-3 rounded font-semibold text-sm hover:bg-orange-700 transition-colors mb-3"
                >
                  {enrolled ? 'Continuar curso →' : `Comprar ahora — $${course.price} USD`}
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded font-medium text-sm hover:bg-gray-50 transition-colors mb-4">
                  ♡ Añadir a lista de deseos
                </button>
                <div className="flex justify-around text-xs text-gray-500">
                  <span>✓ Garantía 30 días</span>
                  <span>✓ Acceso de por vida</span>
                  <span>✓ Certificado</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
