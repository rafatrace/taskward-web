import { TTask, useToggleTaskStatus } from '@/queries/tasks'
import styles from './styles.module.css'
import Checkbox from '@/components/atoms/Checkbox'
import { useEffect, useState } from 'react'
import { competeTaskChime } from '@/utils/audio'

type TTaskProps = {
  task: TTask
}

const Task = ({ task }: TTaskProps) => {
  // Local state
  const [localTask, setTask] = useState<TTask>(task)

  // When task changes from parent
  useEffect(() => {
    if (task != null) setTask(task)
  }, [task])

  /**
   * Toggle as completed/uncompleted
   */
  const toggle = () => {
    const t = { ...localTask }
    t.isCompleted = !t.isCompleted
    setTask(t)

    if (t.isCompleted) {
      competeTaskChime()
    }

    toggleTaskStatus()
  }

  // Mutation
  const { mutate: toggleTaskStatus } = useToggleTaskStatus(task.id.toString())

  return (
    <div className={styles.row}>
      <div className={styles.text}>
        <Checkbox checked={localTask.isCompleted} toggle={toggle} />
        <span>{localTask.text}</span>
      </div>
      <div className={styles.status}>-</div>
    </div>
  )
}

export default Task
