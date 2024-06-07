import { TListSimplified } from '@/queries/lists'
import styles from './styles.module.css'
import { TTask, useGetTasksFromList } from '@/queries/tasks'
import { useEffect, useState } from 'react'
import Task from '@/components/molecules/Task'

type TTasksProps = {
  list: TListSimplified
}

const Tasks = ({ list }: TTasksProps) => {
  // Local state
  const [tasks, setTasks] = useState<TTask[]>([])

  // Queries
  const { data: queryTasks } = useGetTasksFromList(list.id.toString())

  // When query tasks are fetched
  useEffect(() => {
    if (queryTasks != null) setTasks(queryTasks)
  }, [queryTasks])

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.taskHeader}>Tasks</div>
        <div className={styles.statusHeader}>Status</div>
      </div>
      <div className={styles.rows}>{tasks?.map((task) => <Task key={task.id} task={task} />)}</div>
    </div>
  )
}

export default Tasks
