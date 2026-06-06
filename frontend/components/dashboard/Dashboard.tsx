'use client'

import { useAuth } from '@/hooks/useAuth'
import { mockKPIs, mockPOs, mockActivities } from '@/lib/mock-data'
import { TrendingUp, Plus, BarChart3, Clock } from 'lucide-react'
import Link from 'next/link'

export function Dashboard() {
  const { user } = useAuth()

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          {getWelcomeMessage()}, {user?.name}!
        </h1>
        <p className="text-muted-foreground mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      {/* Quick Actions */}
      {(user?.role === 'procurement_officer' || user?.role === 'manager' || user?.role === 'admin') && (
        <div className="flex flex-wrap gap-3">
          <Link
            href="/rfq/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            <Plus size={18} />
            Create RFQ
          </Link>
          <Link
            href="/vendors"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            <Plus size={18} />
            Add Vendor
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
          >
            <BarChart3 size={18} />
            View Reports
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockKPIs.map((kpi, index) => (
          <div key={index} className="card-base p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">{kpi.label}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-sm text-status-active mt-2">{kpi.trend}</p>
              </div>
              <div className="p-3 bg-surface-layer-2 rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent POs Table */}
      <div className="card-base">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Recent Purchase Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-layer-1">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">PO #</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Vendor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockPOs.map((po) => (
                <tr key={po.id} className="border-b border-border hover:bg-surface-layer-1 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{po.poNumber}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{po.vendorName}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">₹{po.total.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`badge-${po.status === 'completed' ? 'approved' : po.status === 'confirmed' ? 'active' : 'pending'}`}>
                      {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Link href={`/orders`} className="text-primary hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-base p-6">
          <h2 className="text-xl font-bold text-foreground mb-6">Activity Feed</h2>
          <div className="space-y-4">
            {mockActivities.slice(0, 5).map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary bg-opacity-20 flex items-center justify-center text-primary flex-shrink-0">
                    <Clock size={16} />
                  </div>
                  {index < mockActivities.length - 1 && <div className="w-0.5 h-12 bg-border my-2" />}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-semibold text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground mt-1">by {activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        {(user?.role === 'manager' || user?.role === 'admin') && (
          <div className="card-base p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Pending Approvals</h2>
            <div className="space-y-3">
              <div className="p-3 bg-surface-layer-1 rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground">Industrial Parts Co.</p>
                <p className="text-xs text-muted-foreground mt-1">₹765,000 - Manager Review</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 py-1.5 px-2 bg-status-active bg-opacity-20 text-status-active rounded text-xs font-medium hover:bg-opacity-30 transition-colors">
                    Approve
                  </button>
                  <button className="flex-1 py-1.5 px-2 bg-status-blocked bg-opacity-20 text-status-blocked rounded text-xs font-medium hover:bg-opacity-30 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
