import ListTitle from '@/components/molecules/ListTitle'
import Tasks from '@/components/organisms/Tasks'
import { useGetLists } from '@/queries/lists'
import { createFileRoute } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'

const List = () => {
  // Router params
  const { id: listId } = Route.useParams<{ id?: string }>()

  // Queries
  const { data: lists } = useGetLists()

  const list = lists?.find((l) => l.id.toString() === listId)

  return (
    <div>
      {list != null && (
        <>
          <Helmet>
            <title>{list.title} — Taskward</title>
          </Helmet>
          <ListTitle list={list} />
          <Tasks list={list} />
        </>
      )}
    </div>
  )
}

export const Route = createFileRoute('/_app/app/$id')({
  component: List
})
