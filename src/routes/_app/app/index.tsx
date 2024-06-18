import { useLists } from '@/providers/ListsProvider'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const App = () => {
  // Services
  const navigate = useNavigate()
  const { lists } = useLists()

  useEffect(() => {
    if (lists != null) navigate({ to: `/app/${lists[0].id}` })
  }, [lists])

  return null
}

export const Route = createFileRoute('/_app/app/')({
  component: App
})
