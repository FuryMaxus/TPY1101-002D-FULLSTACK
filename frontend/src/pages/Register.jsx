import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './Login.module.css'

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.username || !form.password) {
      setError('Todos los campos son obligatorios.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        setError('Error al registrar. Intenta nuevamente.')
        return
      }

      navigate('/login')
    } catch (err) {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Registro</h1>
        <p className={styles.subtitle}>Crea tu cuenta para continuar</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Nombre completo</label>
            <input
              name="name"
              placeholder="Ej: Juan Pérez"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Ej: juan@empresa.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Usuario</label>
            <input
              name="username"
              placeholder="Ej: jperez"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <input
              name="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#888' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#1e3a5f', fontWeight: '600' }}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Register