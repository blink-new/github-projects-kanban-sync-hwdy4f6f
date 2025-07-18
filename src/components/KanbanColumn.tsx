import { useDroppable } from '@dnd-kit/core'
import { IssueCard } from './IssueCard'
import { Card } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { Issue } from './KanbanBoard'

interface KanbanColumnProps {
  id: string
  title: string
  issues: Issue[]
  loading: boolean
  onIssueClick: (issue: Issue) => void
}

export function KanbanColumn({ id, title, issues, loading, onIssueClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'border-l-gray-400'
      case 'in_progress':
        return 'border-l-accent'
      case 'done':
        return 'border-l-primary'
      default:
        return 'border-l-gray-400'
    }
  }

  return (
    <Card className={`p-4 ${getStatusColor(id)} border-l-4 ${isOver ? 'bg-muted/50' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
          {issues.length}
        </span>
      </div>
      
      <div 
        ref={setNodeRef}
        className={`min-h-[200px] space-y-3 ${isOver ? 'bg-muted/20 rounded-lg p-2' : ''}`}
      >
        {loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))
        ) : (
          // Issue cards
          issues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onClick={() => onIssueClick(issue)}
            />
          ))
        )}
        
        {!loading && issues.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No issues in {title.toLowerCase()}</p>
          </div>
        )}
      </div>
    </Card>
  )
}