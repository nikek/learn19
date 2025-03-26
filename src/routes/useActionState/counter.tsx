import { createFileRoute } from '@tanstack/react-router'
import { useActionState } from 'react'

export const Route = createFileRoute('/useActionState/counter')({
  component: RouteComponent,
})

const initialState = 0

function action(prev: number, formData: FormData) {
  console.log(prev, formData)

  return prev + 1
}

function RouteComponent() {
  const [state, formAction] = useActionState(action, initialState)
  return (
    <form action={formAction}>
      <button type="submit">Increment</button> <output>{state}</output>
    </form>
  )
}
