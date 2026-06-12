'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Sign in to your VendorBridge account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-layer-1 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-surface-layer-1 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a 
            href="#" 
            className="text-sm text-primary hover:text-primary-foreground hover:underline transition-colors"
          >
            Forgot your password?
          </a>
        </div>

        {error && (
          <div className="p-3 bg-red-500 bg-opacity-10 border border-red-400 rounded-lg text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !email || !password}
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-card text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-layer-1 border border-border rounded-lg hover:bg-surface-layer-2 transition-colors opacity-50 cursor-not-allowed"
          >
            <span className="text-lg">🔵</span>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button
            type="button"
            disabled
            className="flex items-center justify-center gap-2 py-2.5 px-4 bg-surface-layer-1 border border-border rounded-lg hover:bg-surface-layer-2 transition-colors opacity-50 cursor-not-allowed"
          >
            <span className="text-lg">💼</span>
            <span className="text-sm font-medium">Microsoft</span>
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-primary font-semibold hover:underline transition-colors">
          Sign up here
        </a>
      </p>
    </div>
  )
}
