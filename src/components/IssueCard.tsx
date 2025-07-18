import { useDraggable } from '@dnd-kit/core'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { ExternalLink, MessageSquare, User } from 'lucide-react'
import { Issue } from './KanbanBoard'

interface IssueCardProps {
  issue: Issue
  onClick: () => void
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`p-3 cursor-pointer transition-all hover:shadow-md ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
      onClick={onClick}
      {...listeners}
      {...attributes}
    >
      <div className="space-y-2">
        {/* Issue title */}
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm text-foreground line-clamp-2">
            {issue.title}
          </h4>
          {issue.url && (
            <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 ml-2" />
          )}
        </div>

        {/* Issue description */}
        {issue.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {issue.description}
          </p>
        )}

        {/* Labels */}
        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {issue.labels.slice(0, 3).map((label, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {label}
              </Badge>
            ))}
            {issue.labels.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{issue.labels.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Bottom row with assignees and metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            {issue.assignees.length > 0 && (
              <div className="flex items-center space-x-1">
                <User className="w-3 h-3" />
                <span>{issue.assignees.length}</span>
              </div>
            )}
            {issue.number && (
              <span className="bg-muted px-1 py-0.5 rounded text-xs">
                #{issue.number}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 5)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}