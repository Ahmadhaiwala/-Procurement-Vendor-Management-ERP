'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { ROLE_LABELS, ROLE_DESCRIPTIONS, type UserRole } from '@/lib/auth-types'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('buyer@acme.com')
  const [password, setPassword] = useState('password123')
  const [selectedRole, setSelectedRole] = useState<UserRole>('procurement_officer')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const router = useRouter()

  const roles: UserRole[] = ['procurement_officer', 'vendor', 'manager', 'admin']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password, selectedRole)
      router.push('/dashboard')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to VendorBridge</h1>
        <p className="text-muted-foreground">Manage your procurement effortlessly</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">Select Role</label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`p-3 rounded-lg border-2 text-left transition-colors ${
                  selectedRole === role
                    ? 'border-primary bg-primary bg-opacity-10'
                    : 'border-border bg-surface-layer-1 hover:border-primary hover:border-opacity-50'
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{ROLE_LABELS[role]}</p>
                <p className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</p>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-destructive bg-opacity-10 border border-destructive rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Social Auth */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { name: 'Google', emoji: '🔵' },
            { name: 'GitHub', emoji: '🐙' },
            { name: 'LinkedIn', emoji: '🔗' },
            { name: 'Microsoft', emoji: '⊞' },
          ].map((provider) => (
            <button
              key={provider.name}
              type="button"
              className="py-2 px-3 bg-surface-layer-1 border border-border rounded-lg hover:bg-surface-layer-2 transition-colors text-center"
            >
              <span className="text-lg">{provider.emoji}</span>
            </button>
          ))}
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account? <a href="/signup" className="text-primary font-semibold hover:underline">Sign up</a>
      </p>
    </div>
  )
}
