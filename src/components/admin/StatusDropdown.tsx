'use client'

import { useState, useTransition } from 'react'
import { ApplicationStatus } from '@prisma/client'
import { updateApplicationStatus } from '@/lib/actions/application.actions'
import { ChevronDown, Check } from 'lucide-react'
import { clsx } from 'clsx'

interface StatusDropdownProps {
  applicationId: string
  currentStatus: ApplicationStatus
}

const statusOptions: { value: ApplicationStatus; label: string; color: string }[] = [
  { value: 'PENDING', label: 'Beklemede', color: 'text-amber-700' },
  { value: 'APPROVED', label: 'Onaylandı', color: 'text-green-700' },
  { value: 'REJECTED', label: 'Reddedildi', color: 'text-red-700' }
]

function getStatusBadge(status: ApplicationStatus) {
  const statusConfig = {
    PENDING: {
      label: 'Beklemede',
      className: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    APPROVED: {
      label: 'Onaylandı',
      className: 'bg-green-100 text-green-700 border-green-200'
    },
    REJECTED: {
      label: 'Reddedildi',
      className: 'bg-red-100 text-red-700 border-red-200'
    }
  }

  const config = statusConfig[status] || statusConfig.PENDING
  return config
}

export function StatusDropdown({ applicationId, currentStatus }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<ApplicationStatus>(currentStatus)
  const [isPending, startTransition] = useTransition()

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    if (newStatus === status) {
      setIsOpen(false)
      return
    }

    startTransition(async () => {
      const result = await updateApplicationStatus(applicationId, newStatus)
      if (result.success) {
        setStatus(newStatus)
        setIsOpen(false)
      } else {
        alert(result.error || 'Durum güncellenirken bir hata oluştu')
      }
    })
  }

  const currentStatusConfig = getStatusBadge(status)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={clsx(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all',
          currentStatusConfig.className,
          isPending && 'opacity-50 cursor-not-allowed',
          !isPending && 'hover:shadow-sm'
        )}
      >
        <span>{currentStatusConfig.label}</span>
        <ChevronDown
          className={clsx(
            'w-3 h-3 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-20">
            <div className="py-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleStatusChange(option.value)}
                  disabled={isPending}
                  className={clsx(
                    'w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors',
                    status === option.value
                      ? 'bg-slate-50 text-slate-900'
                      : 'text-slate-700 hover:bg-slate-50',
                    isPending && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span className={option.color}>{option.label}</span>
                  {status === option.value && (
                    <Check className="w-4 h-4 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}









