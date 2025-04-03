// Note: the way you would do data fetching depends on
// the framework that you use together with Suspense.
// Normally, the caching logic would be inside a framework.

let cache = new Map()

export function fetchData(query: string) {
  if (!cache.has(query)) {
    cache.set(query, getData(query))
  }
  return cache.get(query)
}

const data = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)

async function getData(query: string) {
  // Add a fake delay to make waiting noticeable.
  await new Promise(resolve => setTimeout(resolve, 3000))
  return query === '' ? data : data.filter(item => item.includes(query))
}
