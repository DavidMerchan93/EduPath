import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CourseCatalogPage from './pages/CourseCatalogPage'
import CourseDetailPage from './pages/CourseDetailPage'
import AuthPage from './pages/AuthPage'
import PlayerPage from './pages/PlayerPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"                              element={<HomePage />} />
      <Route path="/cursos"                        element={<CourseCatalogPage />} />
      <Route path="/curso/:id"                     element={<CourseDetailPage />} />
      <Route path="/auth"                          element={<AuthPage />} />
      <Route path="/curso/:id/leccion/:lessonId"   element={<PlayerPage />} />
      <Route path="/dashboard"                     element={<DashboardPage />} />
    </Routes>
  )
}
