import { useState } from 'react'
import styles from './styles.module.css'
import Icon from '@/components/atoms/Icon'
import { cn } from '@/utils/styles'
import useClickOutside from '@/hooks/useClickOutside'
import Option from '../Option'
import { useTasks } from '@/providers/TasksProvider'

type TTaskOptionsProps = {
  taskId: number
}

const TaskOptions = ({ taskId }: TTaskOptionsProps) => {
  // Services
  const optionsModalRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false)
  })

  // Services
  const { deleteTask } = useTasks()

  // Local state
  const [isOpen, setOpen] = useState<boolean>(false)

  /**
   * Control options modal
   */
  const toggleOptions = () => setOpen(!isOpen)

  /**
   * Delete a task
   */
  const confirmDeleteTask = () => {
    toggleOptions()
    deleteTask(taskId)
  }

  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={toggleOptions}>
        <Icon type="more-horizontal" color="#636363" size={14} />
      </div>
      <div ref={optionsModalRef} className={cn(styles.optionsModal, { [styles.open]: isOpen })}>
        <Option icon="trash" message="Delete task" action={confirmDeleteTask} />
      </div>
    </div>
  )
}

export default TaskOptions
