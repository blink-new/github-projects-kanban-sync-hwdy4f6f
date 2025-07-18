import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { ExternalLink, Calendar, User, Tag } from 'lucide-react'
import { Issue } from './KanbanBoard'

interface IssueDetailsSheetProps {
  issue: Issue | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IssueDetailsSheet({ issue, open, onOpenChange }: IssueDetailsSheetProps) {
  if (!issue) return null

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800'
      case 'in_progress':
        return 'bg-accent/20 text-accent'
      case 'done':
        return 'bg-primary/20 text-primary'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: Issue['status']) => {
    switch (status) {
      case 'todo':
        return 'To Do'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return status
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="truncate">{issue.title}</span>
            {issue.url && (
              <Button variant="outline" size="sm" asChild>
                <a href={issue.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Status */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground">Status</h4>
            <Badge className={getStatusColor(issue.status)}>
              {getStatusLabel(issue.status)}
            </Badge>
          </div>

          {/* Description */}
          {issue.description && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">Description</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {issue.description}
              </p>
            </div>
          )}

          {/* Labels */}
          {issue.labels.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                Labels
              </h4>
              <div className="flex flex-wrap gap-1">
                {issue.labels.map((label, index) => (
                  <Badge key={index} variant="secondary">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Assignees */}
          {issue.assignees.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground flex items-center">
                <User className="w-4 h-4 mr-1" />
                Assignees
              </h4>
              <div className="space-y-1">
                {issue.assignees.map((assignee, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {assignee.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{assignee}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GitHub Info */}
          {issue.number && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-foreground">GitHub</h4>
              <div className="text-sm text-muted-foreground">
                Issue #{issue.number}
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-foreground flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Timeline
            </h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div>
                Created: {new Date(issue.created_at).toLocaleDateString()}
              </div>
              <div>
                Updated: {new Date(issue.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}