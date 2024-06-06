import { TListSimplified } from '@/queries/lists'
import styles from './styles.module.css'
import { Link } from '@tanstack/react-router'
import { cn } from '@/utils/styles'

type TMenuProps = {
  list: TListSimplified
  active: boolean
}

const Menu = ({ list, active }: TMenuProps) => {
  return (
    <Link to="/app/$id" params={{ id: list.id.toString() }} className={cn(styles.menu, { [styles.active]: active })}>
      {list.title}
    </Link>
  )
}

export default Menu
