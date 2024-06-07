import { TTask, useToggleTaskStatus } from '@/queries/tasks'
import styles from './styles.module.css'
import Checkbox from '@/components/atoms/Checkbox'

type TTaskProps = {
  task: TTask
}

const Task = ({ task }: TTaskProps) => {
  /**
   * Toggle as completed/uncompleted
   */
  const toggle = () => {
    toggleTaskStatus()
  }

  // Mutation
  const { mutate: toggleTaskStatus } = useToggleTaskStatus(task.id.toString())

  return (
    <div className={styles.row}>
      <div className={styles.text}>
        <Checkbox checked={task.isCompleted} toggle={toggle} />
        <span>{task.text}</span>
      </div>
      <div className={styles.status}>-</div>
    </div>
  )
}

export default Task
