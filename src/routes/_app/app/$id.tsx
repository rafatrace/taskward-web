import { createFileRoute } from '@tanstack/react-router'

const List = () => {
  return <h1>list</h1>
}

export const Route = createFileRoute('/_app/app/$id')({
  component: List
})
