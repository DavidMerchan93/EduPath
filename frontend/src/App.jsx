import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CourseDetailPage from './pages/CourseDetailPage'
import AuthPage from './pages/AuthPage'
import PlayerPage from './pages/PlayerPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/curso/:id" element={<CourseDetailPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/curso/:id/leccion/:lessonId" element={<PlayerPage />} />
    </Routes>
  )
}
