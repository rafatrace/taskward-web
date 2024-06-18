import { TListSimplified } from '@/queries/lists'
import styles from './styles.module.css'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useSidebar } from '@/providers/SidebarProvider'
import Icon from '@/components/atoms/Icon'
import ListOptions from '../ListOptions'
import { useLists } from '@/providers/ListsProvider'

type TListTitleProps = {
  list: TListSimplified
}

const ListTitle = ({ list }: TListTitleProps) => {
  // Refs
  const inputRef = useRef<HTMLInputElement>()

  // Services
  const { isOpen, openSidebar } = useSidebar()
  const { updateListTitle } = useLists()

  // Local state
  const [title, setTitle] = useState<string>(list.title)
  const [editing, setEditing] = useState<boolean>(false)

  // When list title updates, update the local state
  useEffect(() => {
    setTitle(list.title)
  }, [list.title])

  /**
   * Change to edit mode
   */
  const startEditing = () => {
    setEditing(true)
  }

  /**
   * Save new title and stop editing
   */
  const saveAndStopEditing = () => {
    setEditing(false)
    if (title !== list.title) {
      updateListTitle(list.id, title)
    }
  }

  /**
   * Check if enter was pressed
   */
  const checkIfEnterWasPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebarAndTitle}>
        {!isOpen && (
          <div className={styles.showSidebar} onClick={openSidebar}>
            <Icon type="show-sidebar" size={20} color="#636363" />
          </div>
        )}
        {editing ? (
          <input
            ref={inputRef}
            autoFocus
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveAndStopEditing}
            onKeyUp={checkIfEnterWasPressed}
          />
        ) : (
          <div className={styles.label} onClick={startEditing}>
            {title}
          </div>
        )}
      </div>
      <ListOptions listId={list.id} hideCompleted={list.hideComplete} />
    </div>
  )
}

export default ListTitle
