import { Github, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { blink } from '../blink/client'

interface User {
  id: string
  email: string
  displayName?: string
  profilePicture?: string
}

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  const handleSignOut = () => {
    blink.auth.logout()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Github className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                GitHub Projects Kanban
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Sync Board
              </p>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.profilePicture} alt={user.displayName || user.email} />
                <AvatarFallback>
                  {(user.displayName || user.email).charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {user.displayName || user.email}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}