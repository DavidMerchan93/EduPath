const ENROLLMENTS_KEY = 'edupath_enrollments'
const PROGRESS_KEY    = 'edupath_progress'

export function getEnrollments() {
  return JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || '[]')
}

export function isEnrolled(courseId) {
  return getEnrollments().some((e) => e.courseId === courseId)
}

export function enroll(courseId, title, instructor) {
  const list = getEnrollments()
  if (!list.find((e) => e.courseId === courseId)) {
    list.push({ courseId, title, instructor, enrolledAt: Date.now() })
    localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(list))
  }
}

export function getProgress(courseId) {
  const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
  return all[courseId] || { completedLessonIds: [], lastLessonTitle: '' }
}

export function completeLesson(courseId, lessonId, lessonTitle) {
  const all = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}')
  if (!all[courseId]) all[courseId] = { completedLessonIds: [], lastLessonTitle: '' }
  if (!all[courseId].completedLessonIds.includes(lessonId)) {
    all[courseId].completedLessonIds.push(lessonId)
  }
  all[courseId].lastLessonTitle = lessonTitle
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(all))
}
