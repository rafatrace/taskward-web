import { TListSimplified, TNewListResponse, useCreateList, useGetLists } from '@/queries/lists'
import styles from './styles.module.css'
import Menu from '@/components/molecules/Menu'
import { useNavigate } from '@tanstack/react-router'
import { useSession } from '@/providers/SessionProvider'
import { useEffect, useState } from 'react'

type TSideBarProps = {
  listId: string
}

const SideBar = ({ listId }: TSideBarProps) => {
  // Services
  const { user, signOut } = useSession()
  const navigate = useNavigate()

  // Local state
  const [lists, setLists] = useState<TListSimplified[]>([])

  // Queries
  const { data: queryLists } = useGetLists()

  // When lists are fetched
  useEffect(() => {
    if (queryLists != null) setLists(queryLists)
  }, [queryLists])

  /**
   * Redirect and sign out user
   */
  const signOutUser = () => {
    navigate({ to: '/' })
    signOut()
  }

  /**
   * Create a new list with untitle name and redirect to it
   */
  const createNewAndRedirect = () => {
    createList({ title: 'Untitled' })
  }

  /**
   * Add newly created list to the local
   */
  const optimisticallyAddList = (data: TNewListResponse) => {
    setLists([...lists, data.payload])
    navigate({ to: `/app/${data.payload.id}` })
  }

  // Mutations
  const { mutate: createList } = useCreateList(optimisticallyAddList)

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {lists != null &&
          lists.map((list) => (
            <li key={list.id}>
              <Menu list={list} active={list.id.toString() === listId} />
            </li>
          ))}
        <li className={styles.new} onClick={createNewAndRedirect}>
          + New
        </li>
      </ul>
      {user?.name}
      <button onClick={signOutUser}>Sign out</button>
    </div>
  )
}

export default SideBar
