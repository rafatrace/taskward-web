import { apiUrl } from '@/constants/api'
import { cleanStorage } from '@/utils/auth'

import axios from 'axios'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react'

export type TLoggedUser = {
  id: string
  username: string
  name: string
}

export type TSessionProvider = {
  accessToken: string | null
  setAccessToken: Dispatch<SetStateAction<string | null>>
  checkAuth: boolean
  isAuthenticated: boolean
  user: TLoggedUser
  signIn: (username: string, password: string) => Promise<any>
  signOut: () => void
  setAuthenticated: Dispatch<SetStateAction<boolean | null>>
  setCheckedAuth: Dispatch<SetStateAction<boolean | null>>
}

/**
 * Create context
 */
export const SessionContext = createContext<TSessionProvider>({
  accessToken: null,
  setAccessToken: null,
  checkAuth: false,
  isAuthenticated: false,
  user: null,
  signIn: null,
  signOut: null,
  setAuthenticated: null,
  setCheckedAuth: null
})

/**
 * Create provider
 */
export default function SessionProvider({ children }: PropsWithChildren<unknown>) {
  // Local state
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isAuthenticated, setAuthenticated] = useState<boolean>(null)
  const [user, setUser] = useState<TLoggedUser>(null)
  const [checkAuth, setCheckedAuth] = useState<boolean>(false)

  // Check for user
  useEffect(() => {
    if (user != null) {
      setAuthenticated(true)
      setCheckedAuth(true)
    } else {
      loadFromLocalStorage()
    }
  }, [user])

  /**
   * Load data from local storage
   */
  const loadFromLocalStorage = () => {
    const at = localStorage.getItem('@browser_accessToken')
    const u = localStorage.getItem('@browser_user')

    if (at != null) {
      setAccessToken(at)
    }

    if (u != null) {
      setUser(JSON.parse(u))
    } else {
      setCheckedAuth(true)
      setAuthenticated(false)
    }
  }

  /**
   * Sign in the user and handle localstorage data
   */
  const signIn = async (username: string, password: string): Promise<any> => {
    const body = { username, password }

    setCheckedAuth(false)

    try {
      const response = await axios.post(`${apiUrl}/auth/login`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 200 && response?.data?.status === true) {
        // Save access token in context
        const at = response.data.payload.accessToken
        setAccessToken(at)
        localStorage.setItem('@browser_accessToken', at)

        // Set user
        const u: TLoggedUser = response.data.payload.user
        localStorage.setItem('@browser_user', JSON.stringify(u))
        setUser(u)

        return { success: true }
      } else {
        setCheckedAuth(true)
        return { success: false, message: response.data.message }
      }
    } catch (e) {
      setCheckedAuth(true)
      return { success: false, message: e.response.data.message }
    }
  }

  /**
   * Remove user data from session and specific local storage keys
   */
  const signOut = () => {
    cleanStorage()

    setAccessToken(null)
    setAuthenticated(false)
    setUser(null)
  }

  return (
    <SessionContext.Provider
      value={{
        accessToken,
        setAccessToken,
        checkAuth,
        isAuthenticated,
        user,
        signIn,
        signOut,
        setAuthenticated,
        setCheckedAuth
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}
