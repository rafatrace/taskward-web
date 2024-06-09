import styles from './styles.module.css'
import Icon, { TIconType } from '@/components/atoms/Icon'

type TOptionProps = {
  icon: TIconType
  message: string
  action: () => void
}

const Option = ({ icon, message, action }: TOptionProps) => {
  return (
    <div className={styles.container} onClick={action}>
      <Icon type={icon} size={16} color="#262626" />
      <div>{message}</div>
    </div>
  )
}

export default Option
