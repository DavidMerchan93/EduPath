import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import authRouter        from './routes/auth.js'
import coursesRouter     from './routes/courses.js'
import categoriesRouter  from './routes/categories.js'
import enrollmentsRouter from './routes/enrollments.js'

const app  = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth',        authRouter)
app.use('/api/courses',     coursesRouter)
app.use('/api/categories',  categoriesRouter)
app.use('/api/enrollments', enrollmentsRouter)

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => {
  console.log(`🚀 EduPath API corriendo en http://localhost:${PORT}`)
})
