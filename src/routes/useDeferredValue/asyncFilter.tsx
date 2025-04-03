import { createFileRoute } from '@tanstack/react-router'
import { memo, Suspense, use, useDeferredValue, useState } from 'react'
import { fetchData } from './-utils/fetchData'

export const Route = createFileRoute('/useDeferredValue/asyncFilter')({
  component: RouteComponent,
})

function RouteComponent() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)

  return (
    <div>
      <h1>Async Filter</h1>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Suspense fallback={<div>Loading...</div>}>
        <DataList query={deferredText} />
      </Suspense>
    </div>
  )
}

function DataListComponent({ query }: { query: string }) {
  if (!query) {
    return null
  }

  const list = use(fetchData(query))

  if (list.length === 0) {
    return <div>No results found</div>
  }

  return (
    <div>
      {list.map(item => (
        <div key={item}>{item}</div>
      ))}
    </div>
  )
}

const DataList = memo(DataListComponent)
