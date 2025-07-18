import { Github } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="p-4 bg-primary rounded-full inline-block mb-4 animate-pulse">
          <Github className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Loading GitHub Projects Kanban
        </h2>
        <p className="text-muted-foreground">
          Connecting to your workspace...
        </p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  )
}