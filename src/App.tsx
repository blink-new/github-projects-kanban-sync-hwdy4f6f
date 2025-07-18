import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { KanbanBoard } from './components/KanbanBoard'
import { Header } from './components/Header'
import { LoadingScreen } from './components/LoadingScreen'
import { AuthScreen } from './components/AuthScreen'

interface User {
  id: string
  email: string
  displayName?: string
  profilePicture?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return <AuthScreen />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      <main className="pt-16">
        <KanbanBoard />
      </main>
    </div>
  )
}

export default App