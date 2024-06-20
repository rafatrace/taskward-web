import { useRef, useState, KeyboardEvent } from 'react'
import styles from './styles.module.css'
import { useTasks } from '@/providers/TasksProvider'

type TNewTaskRowProps = {
  close: () => void
}

const NewTaskRow = ({ close }: TNewTaskRowProps) => {
  // Refs
  const inputRef = useRef<HTMLInputElement>()

  // Services
  const { addTask } = useTasks()

  // Local state
  const [text, setText] = useState<string>('')

  /**
   * Check if enter was pressed
   */
  const checkIfEnterWasPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    } else if (text.length === 0 && e.key === 'Escape') {
      inputRef.current?.blur()
    } else if (text.length === 0 && e.key === 'Backspace') {
      inputRef.current?.blur()
    }
  }

  /**
   * Save if text has content and hide the input row
   */
  const onBlur = () => {
    if (text.length > 0) {
      addTask(text)
      setText('')
      inputRef.current?.focus()
    } else {
      close()
    }
  }

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
          onKeyDown={checkIfEnterWasPressed}
        />
      </div>
      <div className={styles.status}></div>
    </div>
  )
}

export default NewTaskRow
