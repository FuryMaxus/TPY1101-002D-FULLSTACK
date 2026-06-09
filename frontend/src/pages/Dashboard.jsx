import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import UserTable from '../components/UserTable'
import UserModal from '../components/UserModal'
import { getUsers, createUser, updateUser, deleteUser } from '../services/userService'

function Dashboard() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const data = await getUsers()
            setUsers(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreate = () => {
        setSelectedUser(null)
        setShowModal(true)
    }

    const handleEdit = (user) => {
        setSelectedUser(user)
        setShowModal(true)
    }

    const handleDelete = async (username) => {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return
        try {
            await deleteUser(username)
            setUsers(users.filter((u) => u.username !== username))
        } catch (err) {
            alert('Error al eliminar usuario.')
        }
    }

    const handleSave = async (form) => {
        if (selectedUser) {
            const updated = await updateUser(selectedUser.username, form)
            setUsers(users.map((u) => (u.username === updated.username ? updated : u)))
        } else {
            const created = await createUser(form)
            setUsers([...users, created])
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarTitle}>⚙ Admin Panel</div>
                <div className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}>
                    Usuarios
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </aside>

            <main className={styles.main}>
                <div className={styles.pageTitle}>Gestión de Usuarios</div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                    <button
                        style={{
                            padding: '0.6rem 1.2rem',
                            backgroundColor: '#1e3a5f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                        onClick={handleCreate}
                    >
                        + Nuevo Usuario
                    </button>
                </div>

                <UserTable
                    users={users}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {showModal && (
                    <UserModal
                        user={selectedUser}
                        onClose={() => setShowModal(false)}
                        onSave={handleSave}
                    />
                )}
            </main>
        </div>
    )
}

export default Dashboard