import { cn } from '@/utils/styles'
import styles from './styles.module.css'

type TCheckboxProps = {
  checked: boolean
  toggle: () => void
}

const Checkbox = ({ checked, toggle }: TCheckboxProps) => {
  return (
    <div onClick={toggle} className={cn(styles.container, { [styles.checked]: checked })}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.6905 3.27665C24.09 3.65799 24.1047 4.29098 23.7234 4.69048L9.40518 19.6905C9.21648 19.8882 8.9551 20 8.68182 20C8.40854 20 8.14716 19.8882 7.95846 19.6905L1.27665 12.6905C0.895307 12.291 0.910028 11.658 1.30953 11.2766C1.70902 10.8953 2.34202 10.91 2.72336 11.3095L8.68182 17.5517L22.2766 3.30953C22.658 2.91003 23.291 2.89531 23.6905 3.27665Z"
          fill="white"
        />
      </svg>
    </div>
  )
}

export default Checkbox
