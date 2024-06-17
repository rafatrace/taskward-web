import { cn } from '@/utils/styles'
import styles from './styles.module.css'

type TStatusProps = {
  label: string
  color: string
  show?: boolean
}

const Status = ({ label, color, show }: TStatusProps) => {
  const hideIt = label === 'To do' && !show
  return <div className={cn(styles.status, styles[color], { [styles.hideIt]: hideIt })}>{label}</div>
}

export default Status
