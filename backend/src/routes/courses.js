import { Router } from 'express'
import { db } from '../db/database.js'

const router = Router()

// GET /api/courses?category=&level=&price=free|paid&rating=4|3&sort=popular|rating|price_asc|price_desc&page=1&limit=6
router.get('/', (req, res) => {
  const { category, level, price, rating, sort = 'popular', page = '1', limit = '6' } = req.query

  let result = [...db.data.courses]

  if (category) result = result.filter((c) => c.category === category)
  if (level)    result = result.filter((c) => c.level    === level)

  if (price === 'free') result = result.filter((c) => c.isFree)
  if (price === 'paid') result = result.filter((c) => !c.isFree)

  if (rating) result = result.filter((c) => c.rating >= Number(rating))

  switch (sort) {
    case 'rating':     result.sort((a, b) => b.rating   - a.rating);   break
    case 'price_asc':  result.sort((a, b) => a.price    - b.price);    break
    case 'price_desc': result.sort((a, b) => b.price    - a.price);    break
    default:           result.sort((a, b) => b.students - a.students); break
  }

  const total  = result.length
  const pageN  = Math.max(1, Number(page))
  const limitN = Math.max(1, Number(limit))
  const data   = result.slice((pageN - 1) * limitN, pageN * limitN)

  res.json({ total, page: pageN, totalPages: Math.ceil(total / limitN), data })
})

// GET /api/courses/:id
router.get('/:id', (req, res) => {
  const course = db.data.courses.find((c) => c.id === req.params.id)
  if (!course) return res.status(404).json({ error: 'Curso no encontrado' })
  res.json({ ...course, whatYouLearn: JSON.parse(course.whatYouLearn) })
})

// GET /api/courses/:id/sections
router.get('/:id/sections', (req, res) => {
  const sections = db.data.sections
    .filter((s) => s.courseId === req.params.id)
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((s) => ({
      ...s,
      lessons: db.data.lessons
        .filter((l) => l.sectionId === s.id)
        .sort((a, b) => a.orderIndex - b.orderIndex),
    }))
  res.json(sections)
})

// GET /api/courses/:id/reviews
router.get('/:id/reviews', (req, res) => {
  res.json(db.data.reviews.filter((r) => r.courseId === req.params.id))
})

export default router
