import { cleanStorage, isLoggedin } from '@/utils/auth'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context }) => {
    const { session } = context
    const isAuthenticated = await isLoggedin()

    if (!isAuthenticated) {
      cleanStorage()
      session?.setAuthenticated(false)
      session?.setCheckedAuth(true)

      throw redirect({ to: '/login' })
    }
  },
  component: () => {
    return <Outlet />
  }
})
