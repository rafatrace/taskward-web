import { useAxios } from '@/providers/AxiosProvider'
import { useSession } from '@/providers/SessionProvider'
import { ErrorResp } from '@/utils/types'
import { useQuery } from '@tanstack/react-query'

/**
 * Fetch user lists
 */
export function useGetLists() {
  // Services
  const axios = useAxios()
  const { isAuthenticated } = useSession()

  // Query
  return useQuery<TListSimplified[], ErrorResp>({
    queryKey: ['get-lists'],
    queryFn: async () => {
      const { status, data } = await axios.get<TGetListsResponse>(`/lists`)

      if (status === 200 && data.status) {
        return data.payload
      }

      throw new Error('error.useGetLists')
    },
    enabled: isAuthenticated
  })
}

/**
 * Types
 */
type TGetListsResponse = {
  status: boolean
  message: string | null
  payload: TListSimplified[]
}

export type TListSimplified = {
  id: number
  title: string
  hideComplete: boolean
  users: TUserFromList[]
}

type TUserFromList = {
  id: string
  name: string
}
