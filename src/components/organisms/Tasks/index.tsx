import { TListSimplified } from '@/queries/lists'
import styles from './styles.module.css'
import { TTask, useGetTasksFromList } from '@/queries/tasks'
import { useEffect, useState } from 'react'
import Task from '@/components/molecules/Task'
import NewTaskButton from '@/components/molecules/NewTaskButton'
import NewTaskRow from '@/components/molecules/NewTaskRow'

type TTasksProps = {
  list: TListSimplified
}

const Tasks = ({ list }: TTasksProps) => {
  // Local state
  const [tasks, setTasks] = useState<TTask[]>([])
  const [isCreatingNewTask, setCreateNewTask] = useState<boolean>(false)

  // Queriess
  const { data: queryTasks } = useGetTasksFromList(list.id.toString())

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

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.taskHeader}>Tasks</div>
        <div className={styles.statusHeader}>Status</div>
      </div>
      <div className={styles.rows}>{tasks?.map((task) => <Task key={task.id} task={task} />)}</div>
      {isCreatingNewTask && (
        <NewTaskRow close={closeNewTaskRow} listId={list.id} instantaneouslyAddNewTask={instantaneouslyAddNewTask} />
      )}
      <NewTaskButton createTask={openNewTaskRow} />
    </div>
  )
}

export default Tasks
