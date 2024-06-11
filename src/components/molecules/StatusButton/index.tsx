import { TTask } from '@/queries/tasks'
import styles from './styles.module.css'
import Status from '@/components/atoms/Status'
import useClickOutside from '@/hooks/useClickOutside'
import { useState } from 'react'
import { cn } from '@/utils/styles'
import { useTasks } from '@/providers/TasksProvider'

type TStatusButtonProps = {
  task: TTask
}

const StatusButton = ({ task }: TStatusButtonProps) => {
  // Services
  const optionsModalRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false)
  })
  const { changeTaskStatus } = useTasks()

  // Local state
  const [isOpen, setOpen] = useState<boolean>(false)

  /**
   * Control options modal
   */
  const toggleOptions = () => setOpen(!isOpen)

  /**
   * Change status
   */
  const changeTo = (statusId: string) => {
    return () => {
      changeTaskStatus(task.id, statusId)
    }
  }

  return (
    <div className={styles.statusButton} onClick={toggleOptions}>
      <Status label={task.status.label} color={task.status.color} />
      <div ref={optionsModalRef} className={cn(styles.optionsModal, { [styles.open]: isOpen })}>
        <button onClick={changeTo('1')}>
          <Status label="To do" color="white" show />
        </button>
        <button onClick={changeTo('2')}>
          <Status label="In progress" color="orange" />
        </button>
        <button onClick={changeTo('4')}>
          <Status label="Done" color="green" />
        </button>
      </div>
    </div>
  )
}

export default StatusButton
