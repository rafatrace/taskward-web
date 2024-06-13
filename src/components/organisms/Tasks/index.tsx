import { TListSimplified } from '@/queries/lists'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import Task from '@/components/molecules/Task'
import NewTaskButton from '@/components/molecules/NewTaskButton'
import NewTaskRow from '@/components/molecules/NewTaskRow'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTasks } from '@/providers/TasksProvider'

type TTasksProps = {
  list: TListSimplified
}

const Tasks = ({ list }: TTasksProps) => {
  // Services
  const { tasks, loadTasks } = useTasks()

  // Local state
  const [isCreatingNewTask, setCreateNewTask] = useState<boolean>(false)

  // Load tasks from server into session
  useEffect(() => {
    loadTasks(list.id)
  }, [list])

  // Hotkeys
  useHotkeys('n', () => (!isCreatingNewTask ? setTimeout(openNewTaskRow, 1) : null))

  /**
   * New task row controllers
   */
  const openNewTaskRow = () => setCreateNewTask(true)
  const closeNewTaskRow = () => setCreateNewTask(false)

  const filteredTasks = list.hideComplete ? tasks?.filter((t) => !t.isCompleted) : tasks

  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <div className={styles.taskHeader}>Tasks</div>
        <div className={styles.statusHeader}>Status</div>
      </div>
      <div className={styles.rows}>{filteredTasks?.map((task) => <Task key={task.id} task={task} />)}</div>
      {isCreatingNewTask && <NewTaskRow close={closeNewTaskRow} />}
      <NewTaskButton createTask={openNewTaskRow} />
    </div>
  )
}

export default Tasks
