import { createFileRoute } from '@tanstack/react-router'

const App = () => {
  return <h1>App Index</h1>
}

export const Route = createFileRoute('/_app/app/')({
  component: App
})
