import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import '../globals.css'
import { HelmetProvider } from 'react-helmet-async'
import QueryProvider from '@/providers/QueryProvider'
import AxiosProvider from '@/providers/AxiosProvider'
import { TSessionProvider } from '@/providers/SessionProvider'

interface MyRouterContext {
  session: TSessionProvider
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <AxiosProvider>
        <QueryProvider>
          <HelmetProvider>
            <Outlet />
          </HelmetProvider>
        </QueryProvider>
      </AxiosProvider>
    </>
  )
})
