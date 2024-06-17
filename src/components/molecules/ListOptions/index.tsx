import { useState } from 'react'
import styles from './styles.module.css'
import Icon from '@/components/atoms/Icon'
import { cn } from '@/utils/styles'
import useClickOutside from '@/hooks/useClickOutside'
import Option from '../Option'
import { useTasks } from '@/providers/TasksProvider'
import { useToggleHideCompleted } from '@/queries/lists'

type TListOptionsProps = {
  listId: number
  hideCompleted: boolean
}

const ListOptions = ({ listId, hideCompleted }: TListOptionsProps) => {
  // Services
  const optionsModalRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false)
  })
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
    deleteTask(listId)
  }

  /**
   * Close options and toggle completed
   */
  const toggleHideCompleted = () => {
    toggleOptions()
    toggleHideCompletedMutation(listId)
  }

  // Mutations
  const { mutate: toggleHideCompletedMutation } = useToggleHideCompleted()

  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={toggleOptions}>
        <Icon type="more-horizontal" color="#636363" size={14} />
      </div>
      <div ref={optionsModalRef} className={cn(styles.optionsModal, { [styles.open]: isOpen })}>
        <Option
          icon="completed"
          message={hideCompleted ? 'Show completed' : 'Hide completed'}
          action={toggleHideCompleted}
        />
        <Option icon="trash" message="Delete list" action={confirmDeleteTask} danger />
      </div>
    </div>
  )
}

export default ListOptions
