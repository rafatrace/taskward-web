import { useState } from 'react'
import styles from './styles.module.css'
import Icon from '@/components/atoms/Icon'
import { cn } from '@/utils/styles'
import useClickOutside from '@/hooks/useClickOutside'
import Option from '../Option'
import { useDeleteTask } from '@/queries/tasks'

type TTaskOptionsProps = {
  taskId: number
  deleteTask: (id: number) => void
}

const TaskOptions = ({ taskId, deleteTask }: TTaskOptionsProps) => {
  // Services
  const optionsModalRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false)
  })

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
    mutate()
  }

  // Mutations
  const { mutate } = useDeleteTask(taskId.toString())

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
