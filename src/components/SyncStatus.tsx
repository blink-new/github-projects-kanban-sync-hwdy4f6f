import { CheckCircle, RefreshCw, AlertCircle } from 'lucide-react'
import { Badge } from './ui/badge'

interface SyncStatusProps {
  syncing: boolean
  lastSync?: Date
  error?: string
}

export function SyncStatus({ syncing, lastSync, error }: SyncStatusProps) {
  if (error) {
    return (
      <Badge variant="destructive" className="flex items-center space-x-1">
        <AlertCircle className="w-3 h-3" />
        <span>Sync Error</span>
      </Badge>
    )
  }

  if (syncing) {
    return (
      <Badge variant="secondary" className="flex items-center space-x-1">
        <RefreshCw className="w-3 h-3 animate-spin" />
        <span>Syncing...</span>
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="flex items-center space-x-1">
      <CheckCircle className="w-3 h-3 text-primary" />
      <span>Synced</span>
      {lastSync && (
        <span className="text-xs text-muted-foreground">
          {lastSync.toLocaleTimeString()}
        </span>
      )}
    </Badge>
  )
}