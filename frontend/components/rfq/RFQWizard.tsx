'use client'

import { useState } from 'react'
import { Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react'

export function RFQWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: 'Procurement of Electronic Components',
    category: 'Electronics',
    description: 'Required: CPU, Memory modules, Power supplies',
    deadline: '2026-06-20',
    items: [
      { id: '1', description: 'CPU Units', quantity: 50, unitPrice: 0 },
      { id: '2', description: 'RAM Modules (16GB)', quantity: 100, unitPrice: 0 },
      { id: '3', description: 'Power Supply (500W)', quantity: 50, unitPrice: 0 },
    ],
    selectedVendors: [],
  })

  const [attachments, setAttachments] = useState<string[]>([])

  const vendorOptions = [
    { id: 'v1', name: 'TechSupply Co.', rating: 4.5 },
    { id: 'v2', name: 'Premium Materials Ltd.', rating: 4.2 },
    { id: 'v4', name: 'Industrial Parts Co.', rating: 4.7 },
  ]

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 0,
      unitPrice: 0,
    }
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    })
  }

  const handleDeleteItem = (id: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter((item) => item.id !== id),
    })
  }

  const handleItemChange = (id: string, field: string, value: any) => {
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    })
  }

  const handleVendorToggle = (vendorId: string) => {
    setFormData({
      ...formData,
      selectedVendors: formData.selectedVendors.includes(vendorId)
        ? formData.selectedVendors.filter((v) => v !== vendorId)
        : [...formData.selectedVendors, vendorId],
    })
  }

  const totalAmount = formData.items.reduce(
    (sum, item) => sum + (item.quantity * item.unitPrice || 0),
    0
  )

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create RFQ</h1>
        <p className="text-muted-foreground mt-1">Request for Quotation Wizard</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between">
        {[
          { num: 1, label: 'RFQ Details' },
          { num: 2, label: 'Line Items' },
          { num: 3, label: 'Vendor Selection' },
        ].map((s, index) => (
          <div key={s.num} className="flex items-center flex-1">
            <button
              onClick={() => setStep(s.num)}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold transition-all ${
                step >= s.num
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface-layer-2 text-muted-foreground'
              }`}
            >
              {step > s.num ? '✓' : s.num}
            </button>
            <p className="ml-3 text-sm font-medium text-foreground">{s.label}</p>
            {index < 2 && (
              <div
                className={`flex-1 h-0.5 mx-4 ${
                  step > s.num ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="card-base p-8">
        {/* Step 1: RFQ Details */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Step 1: RFQ Details</h2>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">RFQ Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Procurement of Electronic Components"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Electronics</option>
                  <option>Raw Materials</option>
                  <option>Components</option>
                  <option>Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter RFQ description..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Attachments</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-surface-layer-1 transition-colors">
                <p className="text-foreground font-medium">Drag files here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-1">Supported: PDF, Word, Excel</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Line Items */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Step 2: Line Items</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-layer-1">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Item Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Unit Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.items.map((item) => (
                    <tr key={item.id} className="border-b border-border">
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          className="w-full px-2 py-1 rounded bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Item description"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-24 px-2 py-1 rounded bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="0"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          className="w-32 px-2 py-1 rounded bg-surface-layer-1 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">
                        ₹{(item.quantity * item.unitPrice).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 hover:bg-red-500 hover:bg-opacity-10 rounded transition-colors text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleAddItem}
              className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              <Plus size={18} />
              Add Item
            </button>

            <div className="bg-surface-layer-1 p-4 rounded-lg flex justify-between items-center">
              <p className="text-foreground font-semibold">Total Amount:</p>
              <p className="text-2xl font-bold text-primary">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* Step 3: Vendor Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Step 3: Select Vendors</h2>

            <div className="space-y-3">
              {vendorOptions.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => handleVendorToggle(vendor.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.selectedVendors.includes(vendor.id)
                      ? 'border-primary bg-primary bg-opacity-5'
                      : 'border-border hover:border-primary hover:border-opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={formData.selectedVendors.includes(vendor.id)}
                        onChange={() => {}}
                        className="w-5 h-5 rounded cursor-pointer"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{vendor.name}</p>
                        <p className="text-sm text-muted-foreground">Rating: {vendor.rating}⭐</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Selected</div>
                  </div>
                </div>
              ))}
            </div>

            {formData.selectedVendors.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Select at least one vendor to send the RFQ
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-2.5 bg-surface-layer-2 text-foreground rounded-lg font-medium hover:bg-surface-layer-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-surface-layer-2 text-foreground rounded-lg font-medium hover:bg-surface-layer-3 transition-colors">
            Save as Draft
          </button>
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              disabled={formData.selectedVendors.length === 0}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send RFQ to Vendors
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
