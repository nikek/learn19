import { createFileRoute } from '@tanstack/react-router'
import { useTransition } from 'react'

export const Route = createFileRoute('/useTransition/pendingButton')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isPending, startTransition] = useTransition()
  return (
    <div>
      <button
        onClick={() =>
          startTransition(async () => {
            await action()
          })
        }
      >
        {isPending ? 'Pending...' : 'Click me'}
      </button>
    </div>
  )
}

async function action() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return 'Hello from the server!'
}
