'use client'

import { mockApprovals } from '@/lib/mock-data'
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export function ApprovalWorkflow() {
  const [selectedApproval] = useState(mockApprovals[0])
  const [remarks, setRemarks] = useState('')
  const [action, setAction] = useState<'approve' | 'reject' | null>(null)

  const stageIcons = {
    completed: <CheckCircle2 size={20} className="text-status-approved" />,
    'in-progress': <Clock size={20} className="text-status-pending" />,
    pending: <AlertCircle size={20} className="text-muted-foreground" />,
  }

  const getStageColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-status-approved'
      case 'in-progress':
        return 'bg-status-pending'
      default:
        return 'bg-muted'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Approval Workflow</h1>
        <p className="text-muted-foreground mt-1">Review and approve purchase orders</p>
      </div>

      {/* Horizontal Stepper */}
      <div className="card-base p-8">
        <div className="flex justify-between items-start mb-8">
          {selectedApproval.stages.map((stage, index) => (
            <div key={index} className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${getStageColor(stage.status)}`}>
                  {stage.status === 'completed' ? '✓' : index + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{stage.name}</p>
                  <p className="text-xs text-muted-foreground">{stage.assignee}</p>
                </div>
              </div>

              {index < selectedApproval.stages.length - 1 && (
                <div className={`h-0.5 -mt-8 ml-6 mb-6 ${stage.status === 'completed' ? 'bg-status-approved' : 'bg-border'}`} style={{ width: '90%' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Stage Details */}
          <div className="card-base p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Current Stage: {selectedApproval.stages[selectedApproval.stages.findIndex(s => s.status === 'in_progress')].name}</h2>

            {/* PO Details */}
            <div className="bg-surface-layer-1 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Vendor Name</p>
                  <p className="font-semibold text-foreground">{selectedApproval.vendorName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className="font-semibold text-foreground">₹{selectedApproval.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span className="badge-pending">Manager Review</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">RFQ ID</p>
                  <p className="font-semibold text-foreground">{selectedApproval.rfqId}</p>
                </div>
              </div>
            </div>

            {/* Justification */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Justification</p>
              <p className="text-foreground text-sm bg-surface-layer-1 rounded-lg p-4">
                {selectedApproval.justification}
              </p>
            </div>
          </div>

          {/* Action Section */}
          {selectedApproval.stages[1].status === 'in-progress' && (
            <div className="card-base p-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Manager Review</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Remarks (Required for Rejection)</label>
                  <textarea
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter your remarks or feedback..."
                    className="w-full px-4 py-3 rounded-lg bg-surface-layer-1 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setAction('approve')}
                    className="flex-1 px-6 py-3 bg-status-approved text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setAction('reject')}
                    className="flex-1 px-6 py-3 bg-status-blocked text-white rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {action && (
                <div className={`mt-4 p-4 rounded-lg ${action === 'approve' ? 'bg-status-approved bg-opacity-10 border border-status-approved' : 'bg-status-blocked bg-opacity-10 border border-status-blocked'}`}>
                  <p className={`text-sm font-medium ${action === 'approve' ? 'text-status-approved' : 'text-status-blocked'}`}>
                    {action === 'approve' ? 'Ready to Approve' : 'Ready to Reject'}
                  </p>
                  {action === 'reject' && remarks.length === 0 && (
                    <p className="text-xs text-status-blocked mt-2">Please provide remarks before rejecting</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timeline Sidebar */}
        <div className="card-base p-8">
          <h3 className="text-lg font-bold text-foreground mb-6">Activity Timeline</h3>
          <div className="space-y-4">
            {selectedApproval.timeline.map((entry, index) => (
              <div key={index} className="relative">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-primary mt-2" />
                    {index < selectedApproval.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-border my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-sm text-foreground">{entry.stage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{entry.action}</p>
                    <p className="text-xs text-muted-foreground mt-2">by {entry.user}</p>
                    <p className="text-xs text-muted-foreground">{entry.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
