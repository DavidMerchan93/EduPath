const BASE = 'http://localhost:3001/api'

function getToken() {
  const user = localStorage.getItem('edupath_user')
  if (!user) return null
  return JSON.parse(user).token ?? null
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Error en la petición')
  return data
}

// Auth
export const apiLogin    = (email, password) => request('/auth/login',    { method: 'POST', body: JSON.stringify({ email, password }) })
export const apiRegister = (name, email, password) => request('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
export const apiMe       = () => request('/auth/me')

// Cursos
export const apiGetCourses  = (params = {}) => request('/courses?' + new URLSearchParams(params))
export const apiGetCourse   = (id)          => request(`/courses/${id}`)
export const apiGetSections = (id)          => request(`/courses/${id}/sections`)
export const apiGetReviews  = (id)          => request(`/courses/${id}/reviews`)

// Categorías
export const apiGetCategories = () => request('/categories')

// Inscripciones
export const apiEnroll         = (courseId)             => request('/enrollments',                         { method: 'POST', body: JSON.stringify({ courseId }) })
export const apiGetEnrollments = ()                     => request('/enrollments')
export const apiCheckEnrolled  = (courseId)             => request(`/enrollments/check/${courseId}`)
export const apiCompleteLesson = (courseId, lessonId)   => request(`/enrollments/${courseId}/lesson/${lessonId}`, { method: 'PUT' })
export const apiGetProgress    = (courseId)             => request(`/enrollments/${courseId}/progress`)
export const apiGetDashStats   = ()                     => request('/enrollments/dashboard/stats')
