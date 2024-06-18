import styles from './styles.module.css'
import Menu from '@/components/molecules/Menu'
import UserOptions from '@/components/organisms/UserOptions'
import { useSidebar } from '@/providers/SidebarProvider'
import { cn } from '@/utils/styles'
import { useLists } from '@/providers/ListsProvider'

type TSideBarProps = {
  listId: string
}

const SideBar = ({ listId }: TSideBarProps) => {
  // Services
  const { isOpen } = useSidebar()
  const { lists, addList } = useLists()

  return (
    <div className={cn(styles.container, { [styles.open]: isOpen })}>
      <UserOptions />
      <ul className={styles.list}>
        {lists != null &&
          lists.map((list) => (
            <li key={list.id}>
              <Menu list={list} active={list.id.toString() === listId} />
            </li>
          ))}
        <li className={styles.new} onClick={addList}>
          + New
        </li>
      </ul>
    </div>
  )
}

export default SideBar
