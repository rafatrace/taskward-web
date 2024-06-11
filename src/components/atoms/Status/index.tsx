import { cn } from '@/utils/styles'
import styles from './styles.module.css'

type TStatusProps = {
  label: string
  color: string
  show?: boolean
}

const Status = ({ label, color, show }: TStatusProps) => {
  if (label === 'To do' && (show == null || !show)) return null
  return <div className={cn(styles.status, styles[color])}>{label}</div>
}

export default Status
