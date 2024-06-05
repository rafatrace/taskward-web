import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Form from '@/components/pages/Login/Form'
import { useSession } from '@/providers/SessionProvider'
import { useEffect } from 'react'

const LoginPage = () => {
  // Services
  const { checkAuth, isAuthenticated } = useSession()
  const navigate = useNavigate()

  // Check authentication and redirect to app if existing
  useEffect(() => {
    if (checkAuth && isAuthenticated) {
      navigate({ to: '/app' })
    }
  }, [checkAuth, isAuthenticated])

  return (
    <>
      <main>
        <Form />
      </main>
    </>
  )
}

export const Route = createFileRoute('/login/')({
  component: LoginPage
})
