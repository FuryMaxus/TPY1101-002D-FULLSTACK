const BASE_URL = 'http://localhost:8080/api/users'

// Datos simulados mientras no existe el backend
let mockUsers = [
  { id: 1, name: 'Juan Pérez', email: 'juan@empresa.com', username: 'jperez', role: 'ADMIN' },
  { id: 2, name: 'María López', email: 'maria@empresa.com', username: 'mlopez', role: 'USER' },
  { id: 3, name: 'Carlos Soto', email: 'carlos@empresa.com', username: 'csoto', role: 'USER' },
]
let nextId = 4
const USE_MOCK = true  // Cambia a false cuando el backend esté listo

function getHeaders() {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
}

export async function getUsers() {
  if (USE_MOCK) return [...mockUsers]
  const response = await fetch(BASE_URL, { headers: getHeaders() })
  if (!response.ok) throw new Error('Error al obtener usuarios')
  return response.json()
}

export async function createUser(user) {
  if (USE_MOCK) {
    const newUser = { ...user, id: nextId++ }
    mockUsers.push(newUser)
    return newUser
  }
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user),
  })
  if (!response.ok) throw new Error('Error al crear usuario')
  return response.json()
}

export async function updateUser(id, user) {
  if (USE_MOCK) {
    mockUsers = mockUsers.map((u) => (u.id === id ? { ...u, ...user } : u))
    return { ...user, id }
  }
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(user),
  })
  if (!response.ok) throw new Error('Error al actualizar usuario')
  return response.json()
}

export async function deleteUser(id) {
  if (USE_MOCK) {
    mockUsers = mockUsers.filter((u) => u.id !== id)
    return
  }
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  if (!response.ok) throw new Error('Error al eliminar usuario')
}