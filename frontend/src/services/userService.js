const BASE_URL = 'http://localhost:8080/api/v1/usuarios'
const AUTH_URL = 'http://localhost:8080/api/v1/auth'
const USE_MOCK = false

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
  const response = await fetch(`${AUTH_URL}/registro`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(user),
  })
  if (!response.ok) throw new Error('Error al crear usuario')
  
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch {
    return { ...user }
  }
}

export async function updateUser(username, user) {
  if (USE_MOCK) {
    mockUsers = mockUsers.map((u) => (u.username === username ? { ...u, ...user } : u))
    return { ...user, username }
  }
  const response = await fetch(`${BASE_URL}/${username}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(user),
  })
  if (!response.ok) throw new Error('Error al actualizar usuario')
  return response.json()
}

export async function deleteUser(username) {
  if (USE_MOCK) {
    mockUsers = mockUsers.filter((u) => u.username !== username)
    return
  }
  const response = await fetch(`${BASE_URL}/${username}`, {
    method: 'DELETE',
    headers: getHeaders(),
  })
  if (!response.ok) throw new Error('Error al eliminar usuario')
}