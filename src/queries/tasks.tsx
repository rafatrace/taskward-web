import { useAxios } from '@/providers/AxiosProvider'
import { useSession } from '@/providers/SessionProvider'
import { ErrorResp } from '@/utils/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/**
 * Fetch tasks from a specific list
 */
export function useGetTasksFromList(id: string) {
  // Services
  const axios = useAxios()
  const { isAuthenticated } = useSession()

  // Query
  return useQuery<TTask[], ErrorResp>({
    queryKey: ['get-tasks', id],
    queryFn: async () => {
      const { status, data } = await axios.get<TGetTasksFromListResponse>(`/lists/${id}/tasks`)

      if (status === 200 && data.status) {
        return data.payload
      }

      throw new Error('error.useGetTasksFromList')
    },
    enabled: isAuthenticated === true
  })
}

/**
 * Mark task as completed/uncompleted
 */
export function useToggleTaskStatus(id: string) {
  // Services
  const axios = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      return await axios.patch(`/tasks/${id}/completed`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks'] })
    }
  })
}

/**
 * Mark task as completed/uncompleted
 */
export function useCreateNewTask(listId: string) {
  // Services
  const axios = useAxios()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (text: string) => {
      return await axios.post(`/tasks/new`, { text, listId, tagIds: [] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-tasks', listId] })
    }
  })
}

/**
 * Types
 */
type TGetTasksFromListResponse = {
  status: boolean
  message: string | null
  payload: TTask[]
}

export type TTask = {
  id: number
  text: string
  isCompleted: boolean
  completedAt: string
  completedBy: string
}
