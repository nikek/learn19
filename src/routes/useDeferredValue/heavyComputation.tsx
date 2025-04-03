import { createFileRoute } from '@tanstack/react-router'
import { useState, useDeferredValue, memo } from 'react'
import styles from './heavyComputation.module.css'

export const Route = createFileRoute('/useDeferredValue/heavyComputation')({
  component: HeavyComputation,
})

function HeavyComputation() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)
  const [slowness, setSlowness] = useState(1000)
  const deferredSlowness = useDeferredValue(slowness)
  const [useDeferred, setUseDeferred] = useState(true)

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          className={styles.input}
          placeholder="Type to filter..."
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={useDeferred}
            onChange={e => setUseDeferred(e.target.checked)}
          />
          Use useDeferredValue
        </label>
        <div className={styles.sliderWrapper}>
          <label>
            Slowness: {slowness}
            <input
              type="range"
              min="0"
              max="500"
              value={slowness}
              onChange={e => setSlowness(Number(e.target.value))}
              className={styles.slider}
            />
          </label>
        </div>
      </div>

      <div className={styles.status}>
        {useDeferred && text !== deferredText && (
          <div className={styles.deferredStatus}>
            Currently showing results for: "{deferredText}"
          </div>
        )}
      </div>

      <SlowComponent
        value={useDeferred ? deferredText : text}
        slowness={useDeferred ? deferredSlowness : slowness}
      />
    </div>
  )
}

// Slow component

const SlowComponent = memo(
  ({ value, slowness = 200 }: { value: string; slowness: number }) => {
    const startTime = performance.now()

    // Create items and filter them
    const results = Array.from({ length: 1000000 }, (_, index) => {
      const item = `Item ${index}`
      // Simple delay - just waste some CPU cycles
      let temp = 0
      for (let i = 0; i < slowness; i++) {
        temp += i
      }
      return item
    }).filter(item => item.includes(value))

    const endTime = performance.now()
    console.log(`Computation took ${endTime - startTime}ms`)

    return (
      <>
        <div className={styles.status}>{Math.round(endTime - startTime)}ms</div>
        <div className={styles.status}>Found {results.length} results</div>
        <div className={styles.resultsList}>
          {results.slice(0, 100).map((item, index) => (
            <div key={index} className={styles.resultItem}>
              {item}
            </div>
          ))}
        </div>
      </>
    )
  },
)
