import { TTask, useChangeTaskStatus, useCreateNewTask, useDeleteTask, useGetTasksFromList } from '@/queries/tasks'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

export type TLoggedUser = {
  id: string
  username: string
  name: string
}

export type TTasksProvider = {
  tasks: TTask[]
  loadTasks: (id: number) => void
  addTask: (text: string) => void
  deleteTask: (id: number) => void
  changeTaskStatus: (taskId: number, statusId: string) => void
}

/**
 * Create context
 */
export const TasksContext = createContext<TTasksProvider>({
  tasks: null,
  loadTasks: null,
  addTask: null,
  deleteTask: null,
  changeTaskStatus: null
})

/**
 * Create provider
 */
export default function TasksProvider({ children }: PropsWithChildren<unknown>) {
  // Local state
  const [tasks, setTasks] = useState<TTask[]>([])
  const [listId, setListId] = useState<number>(null)

  // Queries
  const { data: queryTasks } = useGetTasksFromList(listId)

  // Everytime tasks update from backend
  useEffect(() => {
    if (queryTasks != null) setTasks(queryTasks)
  }, [queryTasks])

  /**
   * Load tasks
   */
  const loadTasks = (id: number) => {
    setListId(id)
  }

  /**
   * Add task
   */
  const addTask = (text: string) => {
    const ts = tasks.slice()
    setTasks([
      ...ts,
      {
        id: 0,
        text,
        isCompleted: false,
        completedAt: null,
        completedBy: '',
        status: {
          id: '1',
          label: 'To do',
          color: 'white'
        }
      }
    ])

    saveNewTask(text)
  }

  /**
   * Delete task
   */
  const deleteTask = (id: number) => {
    const index = tasks.findIndex((t) => t.id === id)
    const tasksClone = tasks.slice()
    tasksClone.splice(index, 1)
    setTasks(tasksClone)
    deleteTaskMutate(id)
  }

  /**
   * Change task status
   */
  const changeTaskStatus = (taskId: number, statusId: string) => {
    const tasksClone = tasks.slice()
    const index = tasksClone.findIndex((t) => t.id === taskId)

    const statuses = {
      1: { label: 'To do', color: 'white' },
      2: { label: 'In progress', color: 'orange' },
      4: { label: 'Done', color: 'green' }
    }

    tasksClone[index].status = {
      id: statusId,
      label: statuses[statusId].label,
      color: statuses[statusId].color
    }

    if (statusId == '4') {
      tasksClone[index].isCompleted = true
    } else {
      tasksClone[index].isCompleted = false
    }

    changeStatus({ taskId, statusId })
  }

  // Mutations
  const { mutate: saveNewTask } = useCreateNewTask(listId)
  const { mutate: deleteTaskMutate } = useDeleteTask()
  const { mutate: changeStatus } = useChangeTaskStatus()

  return (
    <TasksContext.Provider value={{ tasks, loadTasks, addTask, deleteTask, changeTaskStatus }}>
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  return useContext(TasksContext)
}
