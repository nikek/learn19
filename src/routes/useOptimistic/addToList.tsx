import { createFileRoute } from '@tanstack/react-router'
import { useOptimistic, useState, useTransition } from 'react'

export const Route = createFileRoute('/useOptimistic/addToList')({
  component: RouteComponent,
})
let count = 0
function RouteComponent() {
  const [list, setList] = useState<string[]>([])
  const [optimistic, setOptimistic] = useOptimistic<string[], string>(
    list,
    (state, newItem) => {
      return [...state, newItem]
    },
  )
  const [isPending, startTransition] = useTransition()
  return (
    <main>
      <h1>Add to List</h1>
      <form
        action=""
        onSubmit={e => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const newItem = formData.get('newItem')
          if (newItem) {
            startTransition(async () => {
              setOptimistic(newItem as string)

              const newList = await addToList(newItem as string, list)
              // If the count is 2, we test that the optimistic update is not persisted
              if (count === 2) {
                return
              }
              setList(newList)
            })
          }
        }}
      >
        <input type="text" name="newItem" />
        <button disabled={isPending}>{isPending ? 'Adding...' : 'Add'}</button>
      </form>
      <ul>
        {optimistic.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </main>
  )
}

async function addToList(item: string, list: string[]) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const realItem = `🏝️ ${item}`
  count++
  return [...list, realItem]
}
