import { createFileRoute } from '@tanstack/react-router'
import { useState, use, Suspense, useDeferredValue } from 'react'
import { fetchData } from './-utils/data'
export const Route = createFileRoute('/useDeferredValue/filterList')({
  component: FilterList,
})

function FilterList() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query, '')
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <List query={deferredQuery} />
      </Suspense>
    </div>
  )
}

function List({ query }: { query: string }) {
  const list = use(fetchData(query))

  console.log('LISTLISTLIST', list)

  if (!list || !Array.isArray(list) || list.length === 0)
    return <div>No results found</div>

  return (
    <ul>
      {list.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
