import { Router } from 'express'
import { db } from '../db/database.js'

const router = Router()

// GET /api/categories
router.get('/', (_req, res) => {
  res.json(db.data.categories)
})

export default router
