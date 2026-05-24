import { useState } from 'react'

export default function VideoPlayer({ lessonTitle, duration }) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="bg-black">
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all"
          >
            {isPlaying ? (
              <span className="text-white text-2xl">⏸</span>
            ) : (
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="px-4 pb-2">
        <div className="relative h-1 bg-gray-700 rounded-full cursor-pointer mb-3">
          <div className="h-1 bg-brand-orange rounded-full" style={{ width: '43%' }} />
        </div>

        <div className="flex items-center gap-4 text-gray-300 text-sm">
          <button className="hover:text-white">⏮</button>
          <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="hover:text-white">⏭</button>
          <span className="text-xs">06:22 / 14:32</span>
          <span className="ml-auto text-xs hover:text-white cursor-pointer">1x</span>
          <span className="text-xs hover:text-white cursor-pointer">⛶</span>
        </div>
      </div>

      <div className="px-4 py-3 text-gray-400 text-sm border-t border-gray-800">
        {lessonTitle} — {duration} min
      </div>
    </div>
  )
}
