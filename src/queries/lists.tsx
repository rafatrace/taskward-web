import { useAxios } from '@/providers/AxiosProvider'
import { useSession } from '@/providers/SessionProvider'
import { ErrorResp } from '@/utils/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
    enabled: isAuthenticated === true
  })
}

/**
 * Optimistically create a new list
 */
export function useCreateList(onSuccess: (data: TNewListResponse) => void) {
  const axios = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: TNewListBody) => {
      return await axios.post<TNewListResponse>(`/lists/new`, body)
    },
    onSuccess: (response) => {
      onSuccess(response.data)
      queryClient.invalidateQueries({ queryKey: ['get-lists'] })
    }
  })
}

/**
 * Change list title
 */
export function useChangeListTitle(id: string) {
  const axios = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (title: string) => {
      return await axios.put<TNewListResponse>(`/lists/${id}`, { title, hideComplete: true })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-lists'] })
    }
  })
}

/**
 * Optimistically toggle hideCompleted flag of a list
 */
export function useToggleHideCompleted() {
  const axios = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      return await axios.patch(`/lists/${id}/toggle-completed`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-lists'] })
    }
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

export type TNewListBody = {
  title: string
}

export type TNewListResponse = {
  status: boolean
  message: string
  payload: TListSimplified
}
