import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import '../globals.css'
import { HelmetProvider } from 'react-helmet-async'
import QueryProvider from '@/providers/QueryProvider'
import AxiosProvider from '@/providers/AxiosProvider'
import { TSessionProvider } from '@/providers/SessionProvider'
import TasksProvider from '@/providers/TasksProvider'
import SidebarProvider from '@/providers/SidebarProvider'
import ListsProvider from '@/providers/ListsProvider'

interface MyRouterContext {
  session: TSessionProvider
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <AxiosProvider>
        <QueryProvider>
          <HelmetProvider>
            <ListsProvider>
              <TasksProvider>
                <SidebarProvider>
                  <Outlet />
                </SidebarProvider>
              </TasksProvider>
            </ListsProvider>
          </HelmetProvider>
        </QueryProvider>
      </AxiosProvider>
    </>
  )
})
