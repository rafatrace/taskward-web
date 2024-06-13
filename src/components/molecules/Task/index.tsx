import { TTask } from '@/queries/tasks'
import styles from './styles.module.css'
import Checkbox from '@/components/atoms/Checkbox'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { cn } from '@/utils/styles'
import TaskOptions from '../TaskOptions'
import StatusButton from '../StatusButton'
import { useTasks } from '@/providers/TasksProvider'

type TTaskProps = {
  task: TTask
}

const Task = ({ task }: TTaskProps) => {
  // Refs
  const inputRef = useRef<HTMLInputElement>()

  // Services
  const { toggleCompletedStatus, updateTaskText } = useTasks()

  // Local state
  const [localTask, setTask] = useState<TTask>(task)
  const [isEditing, setEditing] = useState<boolean>(false)
  const [text, setText] = useState<string>(task.text)

  // When task changes from parent
  useEffect(() => {
    if (task != null) {
      setTask(task)
      setText(task.text)
    }
  }, [task])

  // Editing mode controllers
  const activateEditingMode = () => setEditing(true)
  const turnOffEditingMode = () => setEditing(false)

  /**
   * Check if enter was pressed
   */
  const checkIfEnterWasPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur()
    } else if (e.key === 'Escape') {
      inputRef.current?.blur()
    } else if (text.length === 0 && e.key === 'Backspace') {
      inputRef.current?.blur()
    }
  }

  /**
   * Save changes and disable editing mode
   */
  const onBlur = () => {
    if (!text.length) {
      setText(localTask.text)
    } else if (text !== task.text) {
      updateTaskText(text, localTask.id)
    }

    turnOffEditingMode()
  }

  /**
   * Toggle status
   */
  const toggle = () => {
    toggleCompletedStatus(task.id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={cn(styles.text, { [styles.editing]: isEditing })}>
          <Checkbox checked={localTask.status.label === 'Done'} toggle={toggle} />
          {isEditing ? (
            <input
              ref={inputRef}
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={onBlur}
              onKeyDown={checkIfEnterWasPressed}
            />
          ) : (
            <span onClick={activateEditingMode}>{text}</span>
          )}
        </div>
        <div className={styles.status}>
          <StatusButton task={localTask} />
          <TaskOptions taskId={localTask.id} />
        </div>
      </div>
    </div>
  )
}

export default Task
