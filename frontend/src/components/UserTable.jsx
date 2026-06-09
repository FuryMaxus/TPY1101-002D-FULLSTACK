import styles from './UserTable.module.css'

function UserTable({ users, loading, onEdit, onDelete }) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className={styles.loading}>Cargando usuarios...</td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={6} className={styles.empty}>No hay usuarios registrados.</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.btnEdit} onClick={() => onEdit(user)}>
                      Editar
                    </button>
                    <button className={styles.btnDelete} onClick={() => onDelete(user.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable