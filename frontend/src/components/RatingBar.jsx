export default function RatingBar({ stars, percentage }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
        <div
          className="bg-brand-star h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-gray-500 w-6">{stars}★</span>
      <span className="text-gray-600">{percentage}%</span>
    </div>
  )
}
