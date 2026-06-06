'use client'

import { useState } from 'react'
import { TrendingUp, Calendar, Download, BarChart3, Users, CheckCircle } from 'lucide-react'
import { mockVendors } from '@/lib/mock-data'

export function Reports() {
  const [dateRange, setDateRange] = useState('7days')

  const statsCards = [
    {
      label: 'Total Spend (YTD)',
      value: '₹4,250,000',
      change: '+12.5%',
      icon: TrendingUp,
    },
    {
      label: 'Average PO Value',
      value: '₹245,000',
      change: '+5.2%',
      icon: BarChart3,
    },
    {
      label: 'Total Vendors',
      value: '24',
      change: '+3',
      icon: Users,
    },
    {
      label: 'Pending Approvals',
      value: '5',
      change: '-2',
      icon: CheckCircle,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Procurement insights and performance metrics</p>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {[
            { id: '7days', label: 'Last 7 days' },
            { id: '30days', label: 'Last 30 days' },
            { id: 'quarter', label: 'This Quarter' },
            { id: 'custom', label: 'Custom Range' },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setDateRange(range.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                dateRange === range.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-layer-1 text-foreground border border-border hover:border-primary'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors">
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="card-base p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className="p-3 bg-surface-layer-2 rounded-lg">
                <stat.icon className="text-primary" size={24} />
              </div>
            </div>
            <p className="text-sm text-status-active font-medium">{stat.change} from last period</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="card-base p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Monthly Spend Trends</h3>
          <div className="h-64 bg-surface-layer-1 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart: Monthly procurement spend trends</p>
              <p className="text-xs text-muted-foreground mt-1">Jan-Jun 2026 Data</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="card-base p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Spend by Category</h3>
          <div className="h-64 bg-surface-layer-1 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Chart: Category distribution pie chart</p>
              <div className="flex gap-4 justify-center mt-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Electronics</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-muted-foreground">Materials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Performance */}
      <div className="card-base p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Vendor Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-layer-1">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Vendor Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Total Spend</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">On-Time Delivery</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Quality Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {mockVendors.slice(0, 4).map((vendor) => (
                <tr key={vendor.id} className="border-b border-border hover:bg-surface-layer-1 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{vendor.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">12</td>
                  <td className="px-6 py-4 text-sm font-semibold text-primary">₹{vendor.totalSpend.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-surface-layer-2 rounded-full overflow-hidden">
                        <div className="h-full bg-status-approved" style={{ width: '92%' }} />
                      </div>
                      <span className="text-sm font-medium text-foreground">92%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(vendor.rating) ? '⭐' : '☆'} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="badge-active">Excellent</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
