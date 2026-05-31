import { Router } from 'express'
import { db } from '../db/database.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()

// POST /api/enrollments — inscribirse a un curso
router.post('/', requireAuth, async (req, res) => {
  const { courseId } = req.body
  if (!courseId) return res.status(400).json({ error: 'courseId requerido' })

  const course = db.data.courses.find((c) => c.id === courseId)
  if (!course) return res.status(404).json({ error: 'Curso no encontrado' })

  const existing = db.data.enrollments.find(
    (e) => e.userId === req.user.id && e.courseId === courseId
  )
  if (existing) return res.status(409).json({ error: 'Ya estás inscrito en este curso' })

  const enrollment = {
    id: `enr_${Date.now()}`,
    userId: req.user.id,
    courseId,
    progress: 0,
    lastLessonId: null,
    lastLessonTitle: '',
    completed: false,
    enrolledAt: new Date().toISOString(),
  }

  db.data.enrollments.push(enrollment)
  await db.write()
  res.status(201).json(enrollment)
})

// GET /api/enrollments — cursos inscritos del usuario con progreso
router.get('/', requireAuth, (req, res) => {
  const userEnrollments = db.data.enrollments.filter((e) => e.userId === req.user.id)

  const result = userEnrollments.map((e) => {
    const course = db.data.courses.find((c) => c.id === e.courseId) || {}

    const totalLessons = db.data.lessons.filter((l) => {
      const section = db.data.sections.find((s) => s.id === l.sectionId)
      return section?.courseId === e.courseId
    }).length

    const completedCount = db.data.lessonProgress.filter(
      (lp) => lp.userId === req.user.id && lp.courseId === e.courseId
    ).length

    const progress = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0
    const completed = progress === 100

    return {
      id:          e.id,
      courseId:    e.courseId,
      title:       course.title || '',
      instructor:  course.instructorName || '',
      progress,
      completed,
      lastLessonTitle: e.lastLessonTitle,
      enrolledAt:  e.enrolledAt,
    }
  })

  res.json(result)
})

// GET /api/enrollments/check/:courseId — ¿está inscrito?
router.get('/check/:courseId', requireAuth, (req, res) => {
  const enrolled = db.data.enrollments.some(
    (e) => e.userId === req.user.id && e.courseId === req.params.courseId
  )
  res.json({ enrolled })
})

// PUT /api/enrollments/:courseId/lesson/:lessonId — marcar lección completada
router.put('/:courseId/lesson/:lessonId', requireAuth, async (req, res) => {
  const { courseId, lessonId } = req.params
  const userId = req.user.id

  const enrollment = db.data.enrollments.find(
    (e) => e.userId === userId && e.courseId === courseId
  )
  if (!enrollment) return res.status(404).json({ error: 'No estás inscrito en este curso' })

  const lesson = db.data.lessons.find((l) => l.id === lessonId)
  if (!lesson) return res.status(404).json({ error: 'Lección no encontrada' })

  const alreadyDone = db.data.lessonProgress.some(
    (lp) => lp.userId === userId && lp.courseId === courseId && lp.lessonId === lessonId
  )
  if (!alreadyDone) {
    db.data.lessonProgress.push({
      id: `lp_${Date.now()}`,
      userId,
      courseId,
      lessonId,
      completedAt: new Date().toISOString(),
    })
  }

  enrollment.lastLessonId    = lessonId
  enrollment.lastLessonTitle = lesson.title

  const totalLessons = db.data.lessons.filter((l) => {
    const section = db.data.sections.find((s) => s.id === l.sectionId)
    return section?.courseId === courseId
  }).length

  const completedCount = db.data.lessonProgress.filter(
    (lp) => lp.userId === userId && lp.courseId === courseId
  ).length

  enrollment.progress  = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0
  enrollment.completed = enrollment.progress === 100

  await db.write()
  res.json({ completedLessonIds: db.data.lessonProgress
    .filter((lp) => lp.userId === userId && lp.courseId === courseId)
    .map((lp) => lp.lessonId),
    progress: enrollment.progress,
  })
})

// GET /api/enrollments/:courseId/progress — progreso del usuario en un curso
router.get('/:courseId/progress', requireAuth, (req, res) => {
  const { courseId } = req.params
  const userId = req.user.id

  const completedLessonIds = db.data.lessonProgress
    .filter((lp) => lp.userId === userId && lp.courseId === courseId)
    .map((lp) => lp.lessonId)

  const totalLessons = db.data.lessons.filter((l) => {
    const section = db.data.sections.find((s) => s.id === l.sectionId)
    return section?.courseId === courseId
  }).length

  const percentage = totalLessons
    ? Math.round((completedLessonIds.length / totalLessons) * 100)
    : 0

  res.json({ completedLessonIds, percentage })
})

// GET /api/enrollments/dashboard/stats — stats del dashboard del usuario
router.get('/dashboard/stats', requireAuth, (req, res) => {
  const userId = req.user.id
  const userEnrollments = db.data.enrollments.filter((e) => e.userId === userId)

  const completed   = userEnrollments.filter((e) => e.completed).length
  const inProgress  = userEnrollments.filter((e) => !e.completed).length
  const lessonsTotal = db.data.lessonProgress.filter((lp) => lp.userId === userId).length

  res.json({
    inProgress,
    completed,
    lessonsCompleted: lessonsTotal,
  })
})

export default router
