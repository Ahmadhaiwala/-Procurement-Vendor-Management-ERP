'use client'

import { useState } from 'react'
import { mockVendors } from '@/lib/mock-data'
import { Plus, Search, MoreVertical, Star } from 'lucide-react'

export function Vendors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'blocked'>('all')

  const filteredVendors = mockVendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || vendor.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-active'
      case 'pending':
        return 'badge-pending'
      case 'blocked':
        return 'badge-blocked'
      default:
        return 'badge-active'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">Manage your vendor network</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors">
          <Plus size={18} />
          Add Vendor
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'pending', 'blocked'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as any)}
              className={`px-4 py-2.5 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-layer-1 text-foreground border border-border hover:border-primary'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-layer-1">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Vendor Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">GSTIN</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="border-b border-border hover:bg-surface-layer-1 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{vendor.name}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{vendor.category}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{vendor.gstin}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{vendor.contact}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={getStatusBadgeColor(vendor.status)}>
                      {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(vendor.rating) ? 'fill-status-pending text-status-pending' : 'text-muted'}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="p-2 hover:bg-surface-layer-2 rounded-lg transition-colors">
                      <MoreVertical size={16} className="text-muted-foreground" />
                    </button>
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
