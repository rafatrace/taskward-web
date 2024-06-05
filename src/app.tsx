import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import SessionProvider, { useSession } from './providers/SessionProvider'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    session: undefined
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const session = useSession()
  return (
    <>
      <RouterProvider router={router} context={{ session }} />
      {/* <TanStackRouterDevtools {...{ router }} /> */}
    </>
  )
}

function App() {
  return (
    <StrictMode>
      <SessionProvider>
        <InnerApp />
      </SessionProvider>
    </StrictMode>
  )
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
