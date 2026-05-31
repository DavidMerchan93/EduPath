import { JSONFilePreset } from 'lowdb/node'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, '../../db.json')

const defaultData = {
  users: [],
  categories: [],
  courses: [],
  sections: [],
  lessons: [],
  enrollments: [],
  lessonProgress: [],
  reviews: [],
  lessonResources: [],
}

export const db = await JSONFilePreset(dbPath, defaultData)
