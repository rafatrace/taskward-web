import { useGetLists } from '@/queries/lists'
import styles from './styles.module.css'
import Menu from '@/components/molecules/Menu'
import { useNavigate } from '@tanstack/react-router'
import { useSession } from '@/providers/SessionProvider'

type TSideBarProps = {
  listId: string
}

const SideBar = ({ listId }: TSideBarProps) => {
  // Services
  const { user, signOut } = useSession()
  const navigate = useNavigate()

  // Queries
  const { data: lists } = useGetLists()

  /**
   * Redirect and sign out user
   */
  const signOutUser = () => {
    navigate({ to: '/' })
    signOut()
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {lists != null &&
          lists.map((list) => (
            <li key={list.id}>
              <Menu list={list} active={list.id.toString() === listId} />
            </li>
          ))}
      </ul>
      {user?.name}
      <button onClick={signOutUser}>Sign out</button>
    </div>
  )
}

export default SideBar
