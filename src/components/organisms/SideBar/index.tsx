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
      <div className={styles.logo}>
        <svg width="272" height="44" viewBox="0 0 272 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.75 35.25H0V0.25H8.75V9H17.5V17.75H8.75V35.25ZM8.75 44V35.25H17.5V44H8.75Z" fill="black" />
          <path d="M35 44V35.25H26.25V17.75H35V35.25H43.75V17.75H35V9H52.5V44H35Z" fill="black" />
          <path
            d="M70 17.75V9H87.5V17.75H78.75V26.5H61.25V17.75H70ZM87.5 35.25H78.75V26.5H87.5V35.25ZM78.75 35.25V44H61.25V35.25H78.75Z"
            fill="black"
          />
          <path
            d="M105 44H96.25V0.25H105V17.75H113.75V26.5H105V44ZM113.75 17.75V9H122.5V17.75H113.75ZM122.5 44H113.75V26.5H122.5V44Z"
            fill="black"
          />
          <path
            d="M140 26.5H131.25V9H140V26.5ZM148.75 26.5V9H157.5V26.5H148.75ZM166.25 26.5V9H175V26.5H166.25ZM148.75 44H140V26.5H148.75V44ZM166.25 44H157.5V26.5H166.25V44Z"
            fill="black"
          />
          <path d="M192.5 44V35.25H183.75V17.75H192.5V35.25H201.25V17.75H192.5V9H210V44H192.5Z" fill="black" />
          <path d="M227.5 44H218.75V9H236.25V17.75H227.5V44Z" fill="black" />
          <path
            d="M253.75 44V35.25H245V17.75H253.75V35.25H262.5V17.75H253.75V9H262.5V0.25H271.25V44H253.75Z"
            fill="black"
          />
        </svg>
      </div>
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
