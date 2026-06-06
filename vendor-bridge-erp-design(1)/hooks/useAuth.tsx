'use client'

import { useContext, createContext, ReactNode, useState, useEffect } from 'react'
import type { User, UserRole, AuthContextType } from '@/lib/auth-types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('vendorbridge_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem('vendorbridge_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: email.split('@')[0],
        email,
        role,
        organization: 'ACME Corp',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(newUser)
      localStorage.setItem('vendorbridge_user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        organization: 'ACME Corp',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      }

      setUser(newUser)
      localStorage.setItem('vendorbridge_user', JSON.stringify(newUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vendorbridge_user')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
