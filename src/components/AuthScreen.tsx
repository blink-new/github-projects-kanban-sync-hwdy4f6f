import { Github, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { blink } from '../blink/client'

export function AuthScreen() {
  const handleSignIn = () => {
    blink.auth.login()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8">
        <div className="text-center mb-8">
          <div className="p-4 bg-primary rounded-full inline-block mb-4">
            <Github className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            GitHub Projects Kanban Sync Board
          </h1>
          <p className="text-muted-foreground">
            Connect your GitHub account to start managing your projects with our intuitive kanban board
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">Real-time bidirectional sync</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">Drag & drop issue management</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">GitHub OAuth integration</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground">Visual sync status indicators</span>
          </div>
        </div>

        <Button 
          onClick={handleSignIn}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Github className="w-5 h-5 mr-2" />
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}