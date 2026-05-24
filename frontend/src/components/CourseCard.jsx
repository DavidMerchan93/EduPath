import { Link } from 'react-router-dom'

export default function CourseCard({ course }) {
  return (
    <Link to={`/curso/${course.id}`} className="block bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
        [Imagen curso]
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-500 text-xs mb-2">{course.instructor}</p>
        <div className="flex items-center gap-1 text-xs mb-2">
          <span className="text-brand-star font-bold">★</span>
          <span className="font-bold text-gray-800">{course.rating}</span>
          <span className="text-gray-400">({course.reviews.toLocaleString()})</span>
        </div>
        <p className={`font-bold text-sm ${course.isFree ? 'text-brand-orange' : 'text-brand-orange'}`}>
          {course.isFree ? 'GRATIS' : `$${course.price} USD`}
        </p>
      </div>
    </Link>
  )
}
