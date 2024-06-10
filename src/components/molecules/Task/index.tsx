import { TTask, useToggleTaskStatus, useUpdateTask } from '@/queries/tasks'
import styles from './styles.module.css'
import Checkbox from '@/components/atoms/Checkbox'
import { useEffect, useRef, useState, KeyboardEvent } from 'react'
import { competeTaskChime } from '@/utils/audio'
import { cn } from '@/utils/styles'
import TaskOptions from '../TaskOptions'
import Status from '@/components/atoms/Status'

type TTaskProps = {
  task: TTask
  deleteTask: (id: number) => void
}

const Task = ({ task, deleteTask }: TTaskProps) => {
  // Refs
  const inputRef = useRef<HTMLInputElement>()

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

  /**
   * Toggle as completed/uncompleted
   */
  const toggle = () => {
    const t = { ...localTask }
    t.isCompleted = !t.isCompleted
    setTask(t)

    if (t.isCompleted) {
      competeTaskChime()
    }

    toggleTaskStatus()
  }

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
      updateTask(text)
    }

    turnOffEditingMode()
  }

  // Mutation
  const { mutate: toggleTaskStatus } = useToggleTaskStatus(task.id.toString())
  const { mutate: updateTask } = useUpdateTask(task.id.toString())

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={cn(styles.text, { [styles.editing]: isEditing })}>
          <Checkbox checked={localTask.isCompleted} toggle={toggle} />
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
          <div>
            <Status label={localTask.status.label} color={localTask.status.color} />
          </div>
          <TaskOptions taskId={localTask.id} deleteTask={deleteTask} />
        </div>
      </div>
    </div>
  )
}

export default Task
