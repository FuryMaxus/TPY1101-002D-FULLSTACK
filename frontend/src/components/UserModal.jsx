import { useState, useEffect } from 'react'
import styles from './UserModal.module.css'

function UserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    role: 'USER',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
        role: user.role || 'USER',
        password: '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.username) {
      setError('Nombre, email y usuario son obligatorios.')
      return
    }
    if (!user && !form.password) {
      setError('La contraseña es obligatoria al crear un usuario.')
      return
    }

    setLoading(true)
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      setError(err.message || 'Error al guardar usuario.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>
          {user ? 'Editar Usuario' : 'Nuevo Usuario'}
        </h2>

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
            <label>Rol</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="USER">Usuario</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>{user ? 'Nueva contraseña (opcional)' : 'Contraseña'}</label>
            <input
              name="password"
              type="password"
              placeholder="Ingresa contraseña"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.modalActions}>
            <button type="button" className={styles.btnCancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.btnSave} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserModal