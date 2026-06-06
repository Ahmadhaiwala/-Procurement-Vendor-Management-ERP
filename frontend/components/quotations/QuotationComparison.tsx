'use client'

import { mockQuotations, mockRFQs } from '@/lib/mock-data'
import { Check, X } from 'lucide-react'

export function QuotationComparison() {
  const rfqId = 'rfq1'
  const rfq = mockRFQs.find((r) => r.id === rfqId)
  const quotations = mockQuotations.filter((q) => q.rfqId === rfqId)

  // Find best price and fastest delivery
  const bestPriceVendor = quotations.reduce((min, q) =>
    q.totalPrice < min.totalPrice ? q : min
  )
  const fastestDelivery = quotations.reduce((min, q) => {
    const avgDelivery = q.lineItems.reduce((sum, item) => sum + item.deliveryDays, 0) / q.lineItems.length
    const minAvg = min.lineItems.reduce((sum, item) => sum + item.deliveryDays, 0) / min.lineItems.length
    return avgDelivery < minAvg ? q : min
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Quotation Comparison</h1>
        <p className="text-muted-foreground mt-1">RFQ: {rfq?.title}</p>
      </div>

      {/* RFQ Summary */}
      <div className="card-base p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">RFQ Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Category</p>
            <p className="font-semibold text-foreground">{rfq?.category}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Deadline</p>
            <p className="font-semibold text-foreground">{rfq?.deadline}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Items</p>
            <p className="font-semibold text-foreground">{rfq?.items.length} items</p>
          </div>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-layer-1">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground sticky left-0 bg-surface-layer-1 z-10">Parameter</th>
                {quotations.map((q) => (
                  <th key={q.id} className="px-6 py-4 text-left min-w-64">
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-foreground">{q.vendorName}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < q.rating ? '⭐' : '☆'} />
                        ))}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-6 py-4 text-sm font-semibold text-foreground sticky left-0 bg-card z-10">Total Price</td>
                {quotations.map((q) => (
                  <td key={q.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">₹{q.totalPrice.toLocaleString()}</p>
                      {q.vendorId === bestPriceVendor.vendorId && (
                        <span className="badge-active text-xs">Best Price</span>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {rfq?.items.map((item, idx) => (
                <tr key={item.id} className="border-b border-border hover:bg-surface-layer-1 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground sticky left-0 bg-card z-10">
                    <p className="font-medium">{item.description}</p>
                    <p className="text-xs text-muted-foreground">{item.quantity} units</p>
                  </td>
                  {quotations.map((q) => (
                    <td key={q.id} className="px-6 py-4">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Unit Price</p>
                          <p className="font-semibold text-foreground">₹{q.lineItems[idx]?.unitPrice || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Delivery</p>
                          <p className="font-semibold text-foreground">{q.lineItems[idx]?.deliveryDays} days</p>
                        </div>
                        {q.lineItems[idx]?.notes && (
                          <p className="text-xs text-muted-foreground italic">{q.lineItems[idx].notes}</p>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}

              <tr className="border-b border-border bg-surface-layer-1">
                <td className="px-6 py-4 text-sm font-semibold text-foreground sticky left-0 bg-surface-layer-1 z-10">Payment Terms</td>
                {quotations.map((q) => (
                  <td key={q.id} className="px-6 py-4 text-sm font-medium text-foreground">
                    {q.paymentTerms}
                  </td>
                ))}
              </tr>

              <tr className="border-b border-border bg-surface-layer-1">
                <td className="px-6 py-4 text-sm font-semibold text-foreground sticky left-0 bg-surface-layer-1 z-10">Avg Delivery Time</td>
                {quotations.map((q) => {
                  const avgDelivery = q.lineItems.reduce((sum, item) => sum + item.deliveryDays, 0) / q.lineItems.length
                  return (
                    <td key={q.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{avgDelivery.toFixed(1)} days</p>
                        {q.vendorId === fastestDelivery.vendorId && (
                          <span className="badge-approved text-xs">Fastest</span>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          Select Vendor & Proceed
        </button>
        <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-opacity-90 transition-colors">
          Request Clarification
        </button>
      </div>
    </div>
  )
}
