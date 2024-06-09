import { FormEventHandler, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useSession } from '@/providers/SessionProvider'
import { useQueryClient } from '@tanstack/react-query'

const Form = () => {
  // Services
  const { signIn, checkAuth, isAuthenticated } = useSession()
  const queryClient = useQueryClient()

  // Local state
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setUserInfo({ username: '', password: '' })
  }, [])

  /**
   * Attempt to login
   */
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!userInfo.username.length || !userInfo.password.length) {
      setErrorMessage('Enter your username and password')
      return
    }

    setErrorMessage(null)

    const { username, password } = userInfo
    const response = await signIn(username, password)

    if (response.success) {
      await queryClient.resetQueries()
    } else {
      setErrorMessage(response.message)
    }
  }

  if (checkAuth === true && isAuthenticated === false) {
    return (
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <div className={styles.introText}>
            <p>log in</p>
            <p>Use password and username to login</p>
          </div>

          <div className={styles.mobile}>
            <input
              height={44}
              value={userInfo.username}
              onChange={({ target }) => {
                setUserInfo({ ...userInfo, username: target.value })
              }}
            />
          </div>

          <div>
            <input
              height={44}
              type="password"
              value={userInfo.password}
              onChange={({ target }) => {
                setUserInfo({ ...userInfo, password: target.value })
              }}
            />
          </div>

          {errorMessage != null && <div className={styles.errorMessage}>{errorMessage}</div>}

          <button type="submit">Log in</button>
        </form>

        <div className={styles.copy}>
          <p>Copyright © taskward {new Date().getFullYear().toString()}</p>
        </div>
      </div>
    )
  }

  return <div className={styles.container}>loading</div>
}

export default Form
