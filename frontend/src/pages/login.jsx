import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!username || !password) {
            setError('Por favor ingresa usuario y contraseña.')
            return
        }

        setLoading(true)

        // Simulación — reemplazar cuando el backend esté listo
        const USE_MOCK = true
        if (USE_MOCK) {
            await new Promise((r) => setTimeout(r, 500))
            if (username === 'admin' && password === '1234') {
                localStorage.setItem('token', 'mock-token-123')
                navigate('/dashboard')
            } else {
                setError('Credenciales inválidas. Intenta con admin / 1234')
            }
            setLoading(false)
            return
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/auth/ingreso', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })
            if (!response.ok) {
                setError('Credenciales inválidas. Intenta nuevamente.')
                return
            }
            const data = await response.json()
            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        } catch (err) {
            setError('No se pudo conectar con el servidor.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Administración</h1>
                <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>

                {error && <div className={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login