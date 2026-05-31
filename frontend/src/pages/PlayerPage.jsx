import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import LessonSidebar from '../components/LessonSidebar'
import { courses, courseSections, lessonResources } from '../data/mockData'
import { getProgress, completeLesson } from '../utils/storage'

export default function PlayerPage() {
  const { id, lessonId } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('descripcion')
  const [progressData, setProgressData] = useState(() => getProgress(id))

  const course = courses.find((c) => c.id === id) || courses[0]

  const allLessons = courseSections.flatMap((s) => s.lessons)
  const currentLesson = allLessons.find((l) => l.id === lessonId) || allLessons[0]
  const currentSectionIndex = courseSections.findIndex((s) =>
    s.lessons.some((l) => l.id === currentLesson.id)
  )
  const currentSection = courseSections[currentSectionIndex] || courseSections[0]

  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLesson.id)
  const nextLesson = allLessons[currentLessonIndex + 1]

  const completedPercentage = allLessons.length
    ? Math.round((progressData.completedLessonIds.length / allLessons.length) * 100)
    : 0

  const progress = {
    completedLessons: progressData.completedLessonIds,
    percentage: completedPercentage,
  }

  function handleComplete() {
    completeLesson(id, currentLesson.id, currentLesson.title)
    setProgressData(getProgress(id))
    if (nextLesson) navigate(`/curso/${id}/leccion/${nextLesson.id}`)
  }

  const tabs = [
    { id: 'descripcion', label: 'Descripción' },
    { id: 'recursos',    label: `Recursos (${lessonResources.length})` },
    { id: 'notas',       label: 'Notas' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Top bar del player */}
      <header className="bg-brand-blue text-white h-14 flex items-center px-4 gap-4 flex-shrink-0">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-200 hover:text-white transition-colors flex items-center gap-1"
        >
          ← Volver al catálogo
        </button>
        <div className="flex-1 text-center text-sm font-medium truncate hidden md:block">
          {course.title} — {currentSection.title}: {currentLesson.title}
        </div>
        <button
          onClick={handleComplete}
          disabled={!nextLesson && progressData.completedLessonIds.includes(currentLesson.id)}
          className="bg-brand-orange text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {progressData.completedLessonIds.includes(currentLesson.id) && !nextLesson
            ? 'Curso completado ✓'
            : 'Completar lección →'}
        </button>
      </header>

      {/* Contenido principal */}
      <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
        {/* Área de video + tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <VideoPlayer
            lessonTitle={currentLesson.title}
            duration={currentLesson.duration}
          />

          {/* Tabs */}
          <div className="bg-brand-blue border-b border-blue-800">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-brand-orange text-white'
                      : 'text-blue-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenido de tabs */}
          <div className="bg-brand-blue text-white p-6 flex-1">
            {activeTab === 'descripcion' && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Descripción de la lección</h3>
                <p className="text-blue-200 text-sm leading-relaxed mb-4">
                  En esta lección aprenderemos el patrón Factory Method, uno de los patrones creacionales más utilizados. Veremos cuándo y cómo implementarlo con ejemplos prácticos en JavaScript.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-300">Recursos:</span>
                  {lessonResources.map((r) => (
                    <span key={r.id} className="flex items-center gap-1 text-blue-200 hover:text-white cursor-pointer">
                      <span>{r.type === 'pdf' ? '📄' : '🗜'}</span>
                      <span className="underline">{r.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recursos' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Recursos de la lección</h3>
                <ul className="space-y-3">
                  {lessonResources.map((r) => (
                    <li key={r.id} className="flex items-center gap-3 p-3 bg-blue-900 bg-opacity-50 rounded">
                      <span className="text-xl">{r.type === 'pdf' ? '📄' : '🗜'}</span>
                      <span className="text-sm text-blue-100">{r.name}</span>
                      <button className="ml-auto text-brand-orange text-sm hover:underline">Descargar</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'notas' && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Mis notas</h3>
                <textarea
                  className="w-full h-40 bg-blue-900 bg-opacity-50 text-blue-100 text-sm p-3 rounded border border-blue-700 outline-none focus:border-brand-orange resize-none placeholder-blue-400"
                  placeholder="Escribe tus notas de esta lección aquí..."
                />
                <button className="mt-3 bg-brand-orange text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 transition-colors">
                  Guardar nota
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar de lecciones */}
        <div className="lg:w-80 flex-shrink-0 border-l border-blue-900 h-auto lg:h-full overflow-hidden">
          <LessonSidebar sections={courseSections} progress={progress} />
        </div>
      </div>
    </div>
  )
}
