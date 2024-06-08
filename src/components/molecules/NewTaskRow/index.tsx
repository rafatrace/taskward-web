import { useRef, useState, KeyboardEvent } from 'react'
import styles from './styles.module.css'
import { useCreateNewTask } from '@/queries/tasks'

type TNewTaskRowProps = {
  close: () => void
  listId: number
  instantaneouslyAddNewTask: (text: string) => void
}

const NewTaskRow = ({ close, listId, instantaneouslyAddNewTask }: TNewTaskRowProps) => {
  // Refs
  const inputRef = useRef<HTMLInputElement>()

  // Local state
  const [text, setText] = useState<string>('')

  /**
   * Check if enter was pressed
   */
  const checkIfEnterWasPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    }
  }

  /**
   * Save if text has content and hide the input row
   */
  const onBlur = () => {
    if (text.length > 0) {
      instantaneouslyAddNewTask(text)
      saveNewTask(text)
    }

    close()
  }

  // Mutations
  const { mutate: saveNewTask } = useCreateNewTask(listId.toString())

  return (
    <div className={styles.row}>
      <div className={styles.text}>
        <input
          ref={inputRef}
          autoFocus
          value={text}
          type="text"
          className={styles.input}
          placeholder="Write a name for the task and press Enter to save"
          onChange={(e) => setText(e.target.value)}
          onBlur={onBlur}
          onKeyUp={checkIfEnterWasPressed}
        />
      </div>
      <div className={styles.status}>-</div>
    </div>
  )
}

export default NewTaskRow
