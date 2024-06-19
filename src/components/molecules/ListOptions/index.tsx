import { useState } from 'react'
import styles from './styles.module.css'
import Icon from '@/components/atoms/Icon'
import { cn } from '@/utils/styles'
import useClickOutside from '@/hooks/useClickOutside'
import Option from '../Option'
import { useLists } from '@/providers/ListsProvider'

type TListOptionsProps = {
  listId: number
  hideCompleted: boolean
}

const ListOptions = ({ listId, hideCompleted }: TListOptionsProps) => {
  // Services
  const optionsModalRef = useClickOutside<HTMLDivElement>(() => {
    setOpen(false)
  })
  const { toggleHideCompleted, deleteList } = useLists()

  // Local state
  const [isOpen, setOpen] = useState<boolean>(false)

  /**
   * Control options modal
   */
  const toggleOptions = () => setOpen(!isOpen)

  /**
   * Close options and toggle completed
   */
  const closeAndToggle = () => {
    toggleOptions()
    toggleHideCompleted(listId)
  }

  /**
   * Delete a list
   */
  const confirmDeleteList = () => {
    toggleOptions()
    if (window.confirm('Do you really want to delete?')) {
      deleteList(listId)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.btn} data-ignore-click-outside onClick={toggleOptions}>
        <Icon type="more-horizontal" color="#636363" size={14} />
      </div>
      <div ref={optionsModalRef} className={cn(styles.optionsModal, { [styles.open]: isOpen })}>
        <Option
          icon="completed"
          message={hideCompleted ? 'Show completed' : 'Hide completed'}
          action={closeAndToggle}
        />
        <Option icon="trash" message="Delete list" action={confirmDeleteList} danger />
      </div>
    </div>
  )
}

export default ListOptions
