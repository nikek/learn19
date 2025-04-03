const cache = new Map<string, Promise<string[]>>()
const items = Array.from({ length: 1000000 }, (_, index) => `Item ${index}`)

export const fetchData = async (query: string): Promise<string[]> => {
  if (!cache.has(query)) {
    cache.set(query, getData(query))
  }
  return cache.get(query) as Promise<string[]>
}

const getData = async (query: string) => {
  await new Promise(r => setTimeout(r, 400)) // Simulate network delay

  return items.filter(item => item.includes(query)).slice(0, 100)
}
