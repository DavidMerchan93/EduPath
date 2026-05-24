import { useState } from 'react'

export default function AccordionSection({ section }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs">{isOpen ? '▼' : '▶'}</span>
          <span className="font-semibold text-gray-900 text-sm">{section.title}</span>
        </div>
        <span className="text-gray-500 text-xs flex-shrink-0">
          {section.lessonsCount} clases • {section.hours}h
        </span>
      </button>

      {isOpen && (
        <ul className="divide-y divide-gray-100">
          {section.lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">▶</span>
                <span className="text-sm text-gray-700">{lesson.title}</span>
              </div>
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
