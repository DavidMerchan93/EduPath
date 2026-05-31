import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ilustracion from '../assets/white77-boys-286245.jpg'
import { useAuth } from '../context/AuthContext'

const mockUsers = [
  { name: 'Carlos Rodríguez', email: 'carlos@edupath.com', password: 'estudiante123', role: 'Estudiante' },
  { name: 'Ana García',       email: 'ana@edupath.com',    password: 'instructor456', role: 'Instructora' },
]

export default function AuthPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const fillUser = (user) => {
    setForm({ ...form, email: user.email, password: user.password })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (activeTab === 'login') {
        await login(form.email, form.password)
        navigate('/dashboard')
      } else {
        if (!form.name || !form.email || !form.password) {
          setError('Completa todos los campos.')
          return
        }
        await register(form.name, form.email, form.password)
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
      <div className="hidden md:flex md:w-1/2 bg-brand-blue flex-col items-center justify-center p-12 text-white">
        <Link to="/" className="text-4xl font-bold mb-4">EduPath</Link>
        <p className="text-xl text-center text-blue-200 mb-12 leading-relaxed">
          Aprende de los mejores.<br />Crece sin límites.
        </p>
        <img
          src={ilustracion}
          alt="Estudiantes aprendiendo"
          className="w-72 rounded-xl object-cover"
        />
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <Link to="/" className="md:hidden block text-center mb-8">
            <span className="bg-brand-orange text-white font-bold px-4 py-2 rounded text-lg">EduPath</span>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">Bienvenido a EduPath</h1>
          <p className="text-gray-500 text-center text-sm mb-6">Tu plataforma de aprendizaje en español</p>

          {/* Usuarios de prueba — solo visible en tab login */}
          {activeTab === 'login' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5">
              <p className="text-xs font-semibold text-blue-700 mb-3 uppercase tracking-wide">
                🧪 Usuarios de prueba
              </p>
              <div className="space-y-2">
                {mockUsers.map((user) => (
                  <div key={user.email} className="flex items-center justify-between bg-white rounded border border-blue-100 px-3 py-2">
                    <div className="text-xs text-gray-600">
                      <span className="font-medium text-gray-800">{user.name}</span>
                      <span className="ml-2 text-blue-500 text-[11px]">{user.role}</span>
                      <div className="text-gray-400 mt-0.5">
                        {user.email} · <span className="font-mono">{user.password}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => fillUser(user)}
                      className="text-xs text-brand-orange font-medium hover:underline ml-3 flex-shrink-0"
                    >
                      Usar →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => { setActiveTab('login'); setError('') }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'login'
                  ? 'border-b-2 border-brand-orange text-brand-orange'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError('') }}
              className={`flex-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === 'register'
                  ? 'border-b-2 border-brand-orange text-brand-orange'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="usuario@ejemplo.com"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••••"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm outline-none focus:border-brand-orange transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs mb-3">{error}</p>
            )}

            {activeTab === 'login' && (
              <div className="text-right mb-4">
                <button type="button" className="text-sm text-brand-orange hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-orange text-white py-3 rounded font-semibold text-sm hover:bg-orange-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading
                ? 'Cargando...'
                : activeTab === 'login' ? 'Iniciar sesión' : 'Crear cuenta gratis'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {activeTab === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => { setActiveTab(activeTab === 'login' ? 'register' : 'login'); setError('') }}
              className="text-brand-orange font-medium hover:underline"
            >
              {activeTab === 'login' ? 'Registrarse gratis →' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
