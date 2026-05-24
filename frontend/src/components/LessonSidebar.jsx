import { Link, useParams } from 'react-router-dom'

export default function LessonSidebar({ sections, progress }) {
  const { id, lessonId } = useParams()

  return (
    <div className="bg-brand-blue text-white h-full overflow-y-auto">
      <div className="p-4 border-b border-blue-800">
        <p className="text-sm text-gray-300 mb-2">Contenido del curso</p>
        <p className="text-xs text-gray-400 mb-1">{progress.percentage}% completado</p>
        <div className="h-1.5 bg-blue-900 rounded-full">
          <div
            className="h-1.5 bg-brand-orange rounded-full"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.id}>
          <div className="px-4 py-3 bg-blue-900 bg-opacity-50">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
              {section.title} ({section.lessons.filter(l => progress.completedLessons.includes(l.id)).length}/{section.lessons.length})
            </p>
          </div>
          <ul>
            {section.lessons.map((lesson) => {
              const isCompleted = progress.completedLessons.includes(lesson.id)
              const isActive = lesson.id === lessonId

              return (
                <li key={lesson.id}>
                  <Link
                    to={`/curso/${id}/leccion/${lesson.id}`}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-brand-purple text-white'
                        : 'hover:bg-blue-800 text-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <span className="w-5 h-5 rounded-full bg-brand-green flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border-2 border-gray-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="leading-snug truncate">{lesson.title}</p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
