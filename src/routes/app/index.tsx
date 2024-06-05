import { useSession } from '@/providers/SessionProvider'
import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'

const App = () => {
  // Services
  const { user, signOut } = useSession()
  const navigate = useNavigate()

  /**
   * Redirect and sign out user
   */
  const signOutUser = () => {
    navigate({ to: '/' })
    signOut()
  }

  return (
    <div>
      {user?.name}
      <Outlet />
      <button onClick={signOutUser}>Sign out</button>
    </div>
  )
}

export const Route = createFileRoute('/app/')({
  component: App
})
