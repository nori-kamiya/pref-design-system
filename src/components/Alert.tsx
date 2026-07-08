import type { HTMLAttributes, ReactNode } from 'react'

export type AlertStatus = 'success' | 'warning' | 'danger' | 'info'

const statusStyle: Record<AlertStatus, string> = {
  success: 'bg-status-success-bg text-status-success-fg border-status-success-border',
  warning: 'bg-status-warning-bg text-status-warning-fg border-status-warning-border',
  danger: 'bg-status-danger-bg text-status-danger-fg border-status-danger-border',
  info: 'bg-status-info-bg text-status-info-fg border-status-info-border',
}

const statusIcon: Record<AlertStatus, string> = {
  success: '✓',
  warning: '⚠',
  danger: '✕',
  info: 'ℹ',
}

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status: AlertStatus
  title: string
  children?: ReactNode
}

export function Alert({ status, title, children, className = '', ...props }: AlertProps) {
  return (
    <div
      role={status === 'danger' ? 'alert' : 'status'}
      className={`flex gap-3 rounded-lg border px-4 py-3 text-sm ${statusStyle[status]} ${className}`}
      {...props}
    >
      <span aria-hidden="true" className="mt-0.5 font-bold">
        {statusIcon[status]}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-0.5 opacity-90">{children}</div>}
      </div>
    </div>
  )
}
