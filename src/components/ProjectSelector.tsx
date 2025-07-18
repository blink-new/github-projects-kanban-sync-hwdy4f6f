import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { FolderOpen } from 'lucide-react'

interface Project {
  id: string
  name: string
  description?: string
  owner: string
  repo: string
}

interface ProjectSelectorProps {
  projects: Project[]
  selectedProject: Project | null
  onProjectSelect: (project: Project) => void
}

export function ProjectSelector({ projects, selectedProject, onProjectSelect }: ProjectSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <FolderOpen className="w-5 h-5 text-muted-foreground" />
      <Select 
        value={selectedProject?.id || ''}
        onValueChange={(value) => {
          const project = projects.find(p => p.id === value)
          if (project) onProjectSelect(project)
        }}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select a project" />
        </SelectTrigger>
        <SelectContent>
          {projects.map(project => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex flex-col items-start">
                <span className="font-medium">{project.name}</span>
                <span className="text-xs text-muted-foreground">
                  {project.owner}/{project.repo}
                </span>
              </div>
            </SelectItem>
          ))}
          {projects.length === 0 && (
            <SelectItem value="no-projects" disabled>
              No projects available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}