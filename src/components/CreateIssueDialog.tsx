import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Issue } from './KanbanBoard'

interface CreateIssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateIssue: (issue: Omit<Issue, 'id' | 'created_at' | 'updated_at'>) => void
}

export function CreateIssueDialog({ open, onOpenChange, onCreateIssue }: CreateIssueDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Issue['status']>('todo')
  const [labels, setLabels] = useState('')
  const [assignees, setAssignees] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    const newIssue: Omit<Issue, 'id' | 'created_at' | 'updated_at'> = {
      title: title.trim(),
      description: description.trim() || undefined,
      status,
      labels: labels.split(',').map(l => l.trim()).filter(Boolean),
      assignees: assignees.split(',').map(a => a.trim()).filter(Boolean),
    }

    onCreateIssue(newIssue)
    
    // Reset form
    setTitle('')
    setDescription('')
    setStatus('todo')
    setLabels('')
    setAssignees('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Issue</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter issue title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as Issue['status'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="labels">Labels</Label>
            <Input
              id="labels"
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              placeholder="bug, enhancement, feature (comma separated)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignees">Assignees</Label>
            <Input
              id="assignees"
              value={assignees}
              onChange={(e) => setAssignees(e.target.value)}
              placeholder="username1, username2 (comma separated)"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Create Issue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}