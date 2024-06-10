import { cn } from '@/utils/styles'
import styles from './styles.module.css'

type TStatusProps = {
  label: string
  color: string
}

const Status = ({ label, color }: TStatusProps) => {
  if (label === 'To do') return null
  return <div className={cn(styles.status, styles[color])}>{label}</div>
}

export default Status
