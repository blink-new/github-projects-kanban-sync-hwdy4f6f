import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { KanbanColumn } from './KanbanColumn'
import { ProjectSelector } from './ProjectSelector'
import { SyncStatus } from './SyncStatus'
import { CreateIssueDialog } from './CreateIssueDialog'
import { IssueDetailsSheet } from './IssueDetailsSheet'
import { Button } from './ui/button'
import { Plus, RefreshCw } from 'lucide-react'

export interface Issue {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  labels: string[]
  assignees: string[]
  url?: string
  number?: number
  created_at: string
  updated_at: string
  github_id?: string
}

interface Project {
  id: string
  name: string
  description?: string
  owner: string
  repo: string
}

// Sample data for demonstration
const sampleProjects: Project[] = [
  {
    id: 'project_1',
    name: 'React UI Components',
    description: 'A collection of reusable React components',
    owner: 'myorg',
    repo: 'ui-components'
  },
  {
    id: 'project_2',
    name: 'API Backend',
    description: 'Node.js backend API',
    owner: 'myorg',
    repo: 'api-backend'
  }
]

const sampleIssues: Issue[] = [
  {
    id: 'issue_1',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality with JWT tokens',
    status: 'todo',
    labels: ['feature', 'authentication'],
    assignees: ['john.doe'],
    number: 123,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
    url: 'https://github.com/myorg/ui-components/issues/123'
  },
  {
    id: 'issue_2',
    title: 'Fix responsive design issues',
    description: 'Mobile layout breaks on certain screen sizes',
    status: 'in_progress',
    labels: ['bug', 'css'],
    assignees: ['jane.smith'],
    number: 124,
    created_at: '2024-01-16T09:30:00Z',
    updated_at: '2024-01-16T14:45:00Z',
    url: 'https://github.com/myorg/ui-components/issues/124'
  },
  {
    id: 'issue_3',
    title: 'Add dark mode support',
    description: 'Implement theme switching between light and dark modes',
    status: 'in_progress',
    labels: ['feature', 'ui'],
    assignees: ['alex.dev', 'sarah.ui'],
    number: 125,
    created_at: '2024-01-17T11:15:00Z',
    updated_at: '2024-01-17T16:20:00Z',
    url: 'https://github.com/myorg/ui-components/issues/125'
  },
  {
    id: 'issue_4',
    title: 'Update documentation',
    description: 'Add comprehensive API documentation and examples',
    status: 'done',
    labels: ['documentation'],
    assignees: ['mike.docs'],
    number: 126,
    created_at: '2024-01-18T08:00:00Z',
    updated_at: '2024-01-18T17:30:00Z',
    url: 'https://github.com/myorg/ui-components/issues/126'
  },
  {
    id: 'issue_5',
    title: 'Optimize bundle size',
    description: 'Reduce JavaScript bundle size by removing unused dependencies',
    status: 'done',
    labels: ['performance', 'optimization'],
    assignees: ['performance.team'],
    number: 127,
    created_at: '2024-01-19T13:45:00Z',
    updated_at: '2024-01-19T18:00:00Z',
    url: 'https://github.com/myorg/ui-components/issues/127'
  }
]

export function KanbanBoard() {
  const [issues, setIssues] = useState<Issue[]>(sampleIssues)
  const [projects] = useState<Project[]>(sampleProjects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(sampleProjects[0])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    
    if (!over) return

    const issueId = active.id as string
    const newStatus = over.id as Issue['status']
    
    const issue = issues.find(i => i.id === issueId)
    if (!issue || issue.status === newStatus) return

    // Optimistic update
    setIssues(prev => 
      prev.map(i => 
        i.id === issueId 
          ? { ...i, status: newStatus, updated_at: new Date().toISOString() }
          : i
      )
    )

    try {
      setSyncing(true)
      // Simulate GitHub API sync
      await syncWithGitHub(issueId, newStatus)
    } catch (error) {
      console.error('Failed to update issue:', error)
      // Revert optimistic update
      setIssues(prev => 
        prev.map(i => 
          i.id === issueId 
            ? { ...i, status: issue.status }
            : i
        )
      )
    } finally {
      setSyncing(false)
    }
  }

  const syncWithGitHub = async (issueId: string, newStatus: Issue['status']) => {
    // This would integrate with GitHub Projects API
    // For now, we'll simulate the sync
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log(`Synced issue ${issueId} to ${newStatus} on GitHub`)
  }

  const handleCreateIssue = async (issueData: Omit<Issue, 'id' | 'created_at' | 'updated_at'>) => {
    const newIssue: Issue = {
      ...issueData,
      id: `issue_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      number: Math.floor(Math.random() * 1000) + 128
    }

    try {
      setSyncing(true)
      setIssues(prev => [newIssue, ...prev])
      setShowCreateDialog(false)
      
      // Simulate GitHub API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Created issue on GitHub:', newIssue)
    } catch (error) {
      console.error('Failed to create issue:', error)
    } finally {
      setSyncing(false)
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const todoIssues = issues.filter(issue => issue.status === 'todo')
  const inProgressIssues = issues.filter(issue => issue.status === 'in_progress')
  const doneIssues = issues.filter(issue => issue.status === 'done')

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <ProjectSelector 
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={setSelectedProject}
          />
          <SyncStatus syncing={syncing} />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <KanbanColumn
            id="todo"
            title="To Do"
            issues={todoIssues}
            loading={loading}
            onIssueClick={setSelectedIssue}
          />
          <KanbanColumn
            id="in_progress"
            title="In Progress"
            issues={inProgressIssues}
            loading={loading}
            onIssueClick={setSelectedIssue}
          />
          <KanbanColumn
            id="done"
            title="Done"
            issues={doneIssues}
            loading={loading}
            onIssueClick={setSelectedIssue}
          />
        </div>
      </DndContext>

      {/* Dialogs */}
      <CreateIssueDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreateIssue={handleCreateIssue}
      />
      
      <IssueDetailsSheet 
        issue={selectedIssue}
        open={!!selectedIssue}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
      />
    </div>
  )
}