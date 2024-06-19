import SideBar from '@/components/organisms/SideBar'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import styles from './styles.module.css'
import { cleanStorage, isLoggedin } from '@/utils/auth'
import { useSidebar } from '@/providers/SidebarProvider'
import { cn } from '@/utils/styles'

const AppLayout = () => {
  // Router params
  const { id: listId } = Route.useParams<{ id?: string }>()

  // Services
  const { isOpen } = useSidebar()

  return (
    <div className={styles.container}>
      <SideBar listId={listId} />
      <main className={cn(styles.main, { [styles.full]: !isOpen })}>
        <Outlet />
      </main>
    </div>
  )
}

export const Route = createFileRoute('/_app')({
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
  component: AppLayout
})
