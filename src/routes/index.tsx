import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useEffect } from 'react'

const LandingPage = () => {
  // Services
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ to: '/login' })
  }, [])

  return <div>Index page</div>
}

export const Route = createFileRoute('/')({
  component: LandingPage
})
