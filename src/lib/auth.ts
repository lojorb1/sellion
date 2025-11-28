// Sistema de autenticação simples com localStorage
// Para MVP - em produção, usar backend real

export interface User {
  id: string
  name: string
  email: string
  cpf?: string
  createdAt: string
}

export const AUTH_STORAGE_KEY = 'sellion_auth_user'

export function saveUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  }
}

export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem(AUTH_STORAGE_KEY)
    if (userData) {
      try {
        return JSON.parse(userData)
      } catch {
        return null
      }
    }
  }
  return null
}

export function removeUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null
}

// Simula registro de usuário
export function registerUser(data: {
  name: string
  email: string
  password: string
  cpf?: string
}): User {
  const user: User = {
    id: Math.random().toString(36).substring(7),
    name: data.name,
    email: data.email,
    cpf: data.cpf,
    createdAt: new Date().toISOString()
  }
  
  saveUser(user)
  return user
}

// Simula login de usuário
export function loginUser(email: string, password: string): User | null {
  // Em produção, validar com backend
  // Por enquanto, aceita qualquer credencial e cria usuário
  const user: User = {
    id: Math.random().toString(36).substring(7),
    name: email.split('@')[0],
    email: email,
    createdAt: new Date().toISOString()
  }
  
  saveUser(user)
  return user
}
