import { TListSimplified, useChangeListTitle } from '@/queries/lists'
import styles from './styles.module.css'
import { KeyboardEvent, useEffect, useRef, useState } from 'react'

type TListTitleProps = {
  list: TListSimplified
}

const ListTitle = ({ list }: TListTitleProps) => {
  // Refs
  const inputRef = useRef<HTMLInputElement>()

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
      changeListTitle(title)
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

  // Mutations
  const { mutate: changeListTitle } = useChangeListTitle(list.id.toString())

  return (
    <div className={styles.title}>
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
  )
}

export default ListTitle
