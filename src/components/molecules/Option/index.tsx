import styles from './styles.module.css'
import Icon, { TIconType } from '@/components/atoms/Icon'

type TOptionProps = {
  icon: TIconType
  message: string
  action: () => void
  danger?: boolean
}

const Option = ({ icon, message, action, danger }: TOptionProps) => {
  return (
    <div className={styles.container} onClick={action}>
      <Icon type={icon} size={16} color="var(--n70)" />
      <div>{message}</div>
    </div>
  )
}

export default Option
