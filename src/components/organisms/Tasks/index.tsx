import { TListSimplified } from '@/queries/lists'
import styles from './styles.module.css'
import { TTask, useGetTasksFromList } from '@/queries/tasks'
import { useEffect, useState } from 'react'
import Task from '@/components/molecules/Task'
import NewTaskButton from '@/components/molecules/NewTaskButton'
import NewTaskRow from '@/components/molecules/NewTaskRow'
import { useHotkeys } from 'react-hotkeys-hook'

type TTasksProps = {
  list: TListSimplified
}

const Tasks = ({ list }: TTasksProps) => {
  // Local state
  const [tasks, setTasks] = useState<TTask[]>([])
  const [isCreatingNewTask, setCreateNewTask] = useState<boolean>(false)

  // Queries
  const { data: queryTasks } = useGetTasksFromList(list.id.toString())

  // Hotkeys
  useHotkeys('n', () => (!isCreatingNewTask ? setTimeout(openNewTaskRow, 1) : null))

  // When query tasks are fetched
  useEffect(() => {
    if (queryTasks != null) setTasks(queryTasks)
  }, [queryTasks])

  /**
   * New task row controllers
   */
  const openNewTaskRow = () => setCreateNewTask(true)
  const closeNewTaskRow = () => setCreateNewTask(false)

  /**
   * Instantaneously add new task
   */
  const instantaneouslyAddNewTask = (text: string) => {
    const ts = tasks.slice()
    setTasks([
      ...ts,
      {
        id: 0,
        text,
        isCompleted: false,
        completedAt: null,
        completedBy: ''
      }
    ])
  }

  /**
   * Delete task
   */
  const deleteTask = (id: number) => {
    const index = tasks.findIndex((t) => t.id === id)
    const tasksClone = tasks.slice()
    tasksClone.splice(index, 1)
    setTasks(tasksClone)
  }

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.taskHeader}>Tasks</div>
        <div className={styles.statusHeader}>Status</div>
      </div>
      <div className={styles.rows}>
        {tasks?.map((task) => <Task key={task.id} task={task} deleteTask={deleteTask} />)}
      </div>
      {isCreatingNewTask && (
        <NewTaskRow close={closeNewTaskRow} listId={list.id} instantaneouslyAddNewTask={instantaneouslyAddNewTask} />
      )}
      <NewTaskButton createTask={openNewTaskRow} />
    </div>
  )
}

export default Tasks
