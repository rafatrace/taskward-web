import styles from './styles.module.css'
import Icon from '@/components/atoms/Icon'

type TNewTaskButtonProps = {
  createTask: () => void
}

const NewTaskButton = ({ createTask }: TNewTaskButtonProps) => {
  return (
    <div className={styles.container} onClick={createTask}>
      <Icon size={16} type="plus-square" color="#636363" />
      <span>New task</span>
    </div>
  )
}

export default NewTaskButton
