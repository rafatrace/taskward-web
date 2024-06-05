import { createContext, ReactNode, useContext, useRef } from 'react'
import axios, { AxiosInstance } from 'axios'
import { apiUrl } from '@/constants/api'
import { headers } from '@/constants/headers'
import { useSession } from '@/providers/SessionProvider'

export const AxiosContext = createContext<AxiosInstance>(axios)

type AxiosProviderProps = {
  children?: ReactNode
}

export default function AxiosProvider({ children }: AxiosProviderProps) {
  // Refs
  const instance = axios.create({ baseURL: `${apiUrl}/`, headers })
  const http = useRef(instance)

  // Service hooks
  const { accessToken, isAuthenticated, signOut } = useSession()

  if (isAuthenticated) {
    // Needs to clear existing interceptors otherwise it will break at some point
    // because it will keep old accessTokens and mix things
    http.current.interceptors.request.clear()

    // Add authorization token to request
    http.current.interceptors.request.use(async (config) => {
      if (accessToken != null && config?.headers != null) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    })

    // Intercept errors
    http.current.interceptors.response.use(
      (response) => {
        return response
      },
      async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          signOut()
        }

        return Promise.reject(err)
      }
    )
  }

  return <AxiosContext.Provider value={http.current}>{children}</AxiosContext.Provider>
}

export function useAxios() {
  return useContext(AxiosContext)
}
