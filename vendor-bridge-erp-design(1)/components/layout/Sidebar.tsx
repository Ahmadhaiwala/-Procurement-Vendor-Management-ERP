'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { ChevronDown, Home, Package, FileText, CheckSquare, ShoppingCart, Activity, BarChart3, Users, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  roles: string[]
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <Home size={20} />, roles: ['procurement_officer', 'vendor', 'manager', 'admin'] },
  { label: 'Vendors', href: '/vendors', icon: <Users size={20} />, roles: ['procurement_officer', 'manager', 'admin'] },
  { label: 'RFQs', href: '/rfq/create', icon: <FileText size={20} />, roles: ['procurement_officer', 'vendor', 'manager', 'admin'] },
  { label: 'Quotations', href: '/quotations', icon: <Package size={20} />, roles: ['procurement_officer', 'manager', 'admin'] },
  { label: 'Approvals', href: '/approvals', icon: <CheckSquare size={20} />, badge: 5, roles: ['manager', 'admin'] },
  { label: 'Purchase Orders', href: '/orders', icon: <ShoppingCart size={20} />, roles: ['procurement_officer', 'vendor', 'manager', 'admin'] },
  { label: 'Activity', href: '/activity', icon: <Activity size={20} />, roles: ['procurement_officer', 'manager', 'admin'] },
  { label: 'Reports', href: '/reports', icon: <BarChart3 size={20} />, roles: ['manager', 'admin'] },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(true)

  const visibleItems = navItems.filter((item) => user && item.roles.includes(user.role))

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 ${
        isExpanded ? 'w-64' : 'w-20'
      } hidden md:flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {isExpanded && <h1 className="text-xl font-bold text-sidebar-foreground">VendorBridge</h1>}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 hover:bg-sidebar-accent rounded-md transition-colors"
        >
          {isExpanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50'
              }`}
            >
              {item.icon}
              {isExpanded && (
                <>
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        {user && (
          <>
            <div className={`flex items-center gap-3 mb-4 px-2 ${!isExpanded && 'justify-center'}`}>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              {isExpanded && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground text-opacity-60 truncate">{user.email}</p>
                </div>
              )}
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500 bg-opacity-10 text-red-500 hover:bg-opacity-20 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              {isExpanded && 'Logout'}
            </button>
          </>
        )}
      </div>
    </aside>
  )
}
