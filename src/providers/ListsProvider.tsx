import {
  TListSimplified,
  TNewListResponse,
  useChangeListTitle,
  useCreateList,
  useDeleteList,
  useGetLists,
  useToggleHideCompleted
} from '@/queries/lists'
import { useNavigate } from '@tanstack/react-router'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

export type TListsProvider = {
  lists: TListSimplified[]
  addList: () => void
  updateListTitle: (id: number, title: string) => void
  toggleHideCompleted: (id: number) => void
  deleteList: (id: number) => void
}

/**
 * Create context
 */
export const ListsContext = createContext<TListsProvider>({
  lists: null,
  addList: null,
  updateListTitle: null,
  toggleHideCompleted: null,
  deleteList: null
})

/**
 * Create provider
 */
export default function ListsProvider({ children }: PropsWithChildren<unknown>) {
  // Services
  const navigate = useNavigate()

  // Local state
  const [lists, setLists] = useState<TListSimplified[]>([])

  // Queries
  const { data: queryLists } = useGetLists()

  // Everytime lists update from backend
  useEffect(() => {
    if (queryLists != null) setLists(queryLists)
  }, [queryLists])

  /**
   * Add list
   */
  const addList = () => {
    createList({ title: 'Untitled' })
  }

  /**
   * Add newly created list to the local
   */
  const optimisticallyAddList = (data: TNewListResponse) => {
    setLists([...lists, data.payload])
    navigate({ to: `/app/${data.payload.id}` })
  }

  /**
   * Update list title
   */
  const updateListTitle = (id: number, title: string) => {
    const listsClone = lists.slice()
    const index = listsClone.findIndex((l) => l.id === id)

    listsClone[index].title = title

    setLists(listsClone)

    changeListTitle({ id, title })
  }

  /**
   * Toggle hide completed
   */
  const toggleHideCompleted = (id: number) => {
    const listsClone = lists.slice()
    const index = listsClone.findIndex((l) => l.id === id)

    listsClone[index].hideComplete = !listsClone[index].hideComplete

    setLists(listsClone)

    toggleHideCompletedMutation(id)
  }

  /**
   * Delete list
   */
  const deleteList = (id: number) => {
    const index = lists.findIndex((l) => l.id === id)
    const listsClone = lists.slice()
    listsClone.splice(index, 1)
    setLists(listsClone)
    deleteListMutate(id)
  }

  // Mutations
  const { mutate: createList } = useCreateList(optimisticallyAddList)
  const { mutate: changeListTitle } = useChangeListTitle()
  const { mutate: toggleHideCompletedMutation } = useToggleHideCompleted()
  const { mutate: deleteListMutate } = useDeleteList()

  return (
    <ListsContext.Provider value={{ lists, addList, updateListTitle, toggleHideCompleted, deleteList }}>
      {children}
    </ListsContext.Provider>
  )
}

export function useLists() {
  return useContext(ListsContext)
}
