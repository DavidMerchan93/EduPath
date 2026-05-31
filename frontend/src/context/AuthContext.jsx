import { createContext, useContext, useState } from 'react'
import { apiLogin, apiRegister } from '../services/api'

const AuthContext = createContext(null)

function loadUser() {
  const saved = localStorage.getItem('edupath_user')
  return saved ? JSON.parse(saved) : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser)

  async function login(email, password) {
    const { user: userData, token } = await apiLogin(email, password)
    const stored = { ...userData, token }
    localStorage.setItem('edupath_user', JSON.stringify(stored))
    setUser(stored)
    return stored
  }

  async function register(name, email, password) {
    const { user: userData, token } = await apiRegister(name, email, password)
    const stored = { ...userData, token }
    localStorage.setItem('edupath_user', JSON.stringify(stored))
    setUser(stored)
    return stored
  }

  function logout() {
    localStorage.removeItem('edupath_user')
    localStorage.removeItem('edupath_enrollments')
    localStorage.removeItem('edupath_progress')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
