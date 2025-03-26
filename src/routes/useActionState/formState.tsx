import { createFileRoute } from '@tanstack/react-router'
import { useActionState, startTransition } from 'react'

export const Route = createFileRoute('/useActionState/formState')({
  component: RouteComponent,
})

type State = {
  error: Error | null
  success: boolean
  data: string | null
}

const initialState: State = {
  error: null,
  success: false,
  data: null,
}

async function action(prev: State, formData: FormData) {
  console.log(prev, formData)

  const response = await new Promise<Response>(resolve => {
    setTimeout(() => {
      resolve({ ok: true, json: () => Promise.resolve({ id: 1 }) } as Response)
    }, 1000)
  })

  if (!response.ok) {
    return {
      ...prev,
      error: new Error('Failed to submit form'),
    }
  }

  return {
    ...prev,
    success: true,
    data: await response.json(),
  }
}

function RouteComponent() {
  const [state, formAction, isPending] = useActionState(action, initialState)
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        startTransition(() => {
          formAction(formData)
        })
      }}
    >
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </button>
      {!isPending && (
        <>
          {state.error && <p>{state.error.message}</p>}
          {state.success && <p>Success!</p>}
          {state.data && <p>{JSON.stringify(state.data)}</p>}
        </>
      )}
    </form>
  )
}
