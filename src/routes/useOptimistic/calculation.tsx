import { createFileRoute } from '@tanstack/react-router'
import { useOptimistic, useState, useTransition } from 'react'

export const Route = createFileRoute('/useOptimistic/calculation')({
  component: RouteComponent,
})

function RouteComponent() {
  const [input, setInput] = useState(0)
  const [calculatedValue, setCalculatedValue] = useState(0)
  const [optimistic, setOptimistic] = useOptimistic<number, number>(
    calculatedValue,
    (_, newValue) => newValue * 2,
  )
  const [isPending, startTransition] = useTransition()

  return (
    <main>
      <h1>Calculation</h1>
      <input
        type="number"
        value={input}
        onChange={e => setInput(Number(e.target.value))}
      />
      <button
        onClick={() => {
          startTransition(async () => {
            setOptimistic(input)
            const newNumber = await calculate(input)
            setCalculatedValue(newNumber)
          })
        }}
      >
        {isPending ? 'Calculating...' : 'Calculate'}
      </button>
      <output>{optimistic}</output>
      <output>({calculatedValue})</output>
    </main>
  )
}

async function calculate(input: number) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return input * 2
}
