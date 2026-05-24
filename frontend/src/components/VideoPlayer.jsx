const YOUTUBE_ID = 'FkQ-4m6toDQ'

export default function VideoPlayer({ lessonTitle, duration }) {
  return (
    <div className="bg-black">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1`}
          title={lessonTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="px-4 py-3 text-gray-400 text-sm border-t border-gray-800">
        {lessonTitle} — {duration} min
      </div>
    </div>
  )
}
