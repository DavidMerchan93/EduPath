import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../db/database.js'

const router = Router()

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function safeUser(user) {
  const { passwordHash, ...rest } = user
  return rest
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña requeridos' })

  const user = db.data.users.find((u) => u.email === email)
  if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' })

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' })

  res.json({ user: safeUser(user), token: signToken(user) })
})

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Nombre, email y contraseña requeridos' })

  if (db.data.users.find((u) => u.email === email))
    return res.status(409).json({ error: 'El correo ya está registrado' })

  const initials = name.trim().split(' ').slice(0, 2).map((w) => w[0].toUpperCase()).join('')
  const newUser = {
    id: `u${Date.now()}`,
    name,
    email,
    initials,
    passwordHash: await bcrypt.hash(password, 10),
    role: 'Estudiante',
  }

  db.data.users.push(newUser)
  await db.write()

  res.status(201).json({ user: safeUser(newUser), token: signToken(newUser) })
})

// GET /api/auth/me
router.get('/me', (req, res) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No autenticado' })
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    const user = db.data.users.find((u) => u.id === payload.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(safeUser(user))
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
})

export default router
