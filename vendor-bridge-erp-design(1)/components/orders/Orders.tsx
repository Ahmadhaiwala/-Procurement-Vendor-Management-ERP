'use client'

import { mockPOs, mockInvoices } from '@/lib/mock-data'
import { Download, Eye, Share2 } from 'lucide-react'
import { useState } from 'react'

export function Orders() {
  const [activeTab, setActiveTab] = useState<'po' | 'invoice'>('po')
  const [selectedPO] = useState(mockPOs[0])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'badge-active'
      case 'completed':
        return 'badge-approved'
      case 'sent':
        return 'badge-pending'
      default:
        return 'badge-active'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Purchase Orders & Invoices</h1>
        <p className="text-muted-foreground mt-1">Manage your orders and track invoices</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'po', label: 'Purchase Orders' },
          { id: 'invoice', label: 'Invoices' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PO List */}
      {activeTab === 'po' && (
        <div className="space-y-4">
          {mockPOs.map((po) => (
            <div key={po.id} className="card-base p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">PO Number</p>
                  <p className="font-bold text-foreground">{po.poNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vendor</p>
                  <p className="font-semibold text-foreground">{po.vendorName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="font-bold text-primary">₹{po.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span className={getStatusBadge(po.status)}>
                    {po.status.charAt(0).toUpperCase() + po.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Delivery</p>
                  <p className="font-semibold text-foreground">{po.deliveryDate}</p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="bg-surface-layer-1 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-foreground mb-2">Items ({po.items.length})</p>
                <div className="space-y-1">
                  {po.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {item.description} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors">
                  <Eye size={16} />
                  View Details
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors">
                  <Download size={16} />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-layer-2 text-foreground rounded-lg font-medium text-sm hover:bg-surface-layer-3 transition-colors">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice List */}
      {activeTab === 'invoice' && (
        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="card-base p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Invoice #</p>
                  <p className="font-bold text-foreground">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vendor</p>
                  <p className="font-semibold text-foreground">{invoice.vendorName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Amount</p>
                  <p className="font-bold text-primary">₹{invoice.total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span className={getStatusBadge(invoice.status)}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                  <p className="font-semibold text-foreground">{invoice.dueDate}</p>
                </div>
              </div>

              {/* Invoice Summary */}
              <div className="bg-surface-layer-1 rounded-lg p-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{invoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">₹{invoice.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{invoice.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors">
                  <Eye size={16} />
                  View Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-opacity-90 transition-colors">
                  <Download size={16} />
                  Download PDF
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-layer-2 text-foreground rounded-lg font-medium text-sm hover:bg-surface-layer-3 transition-colors">
                  <Share2 size={16} />
                  Email
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
