import { writable } from 'svelte/store'
import type { Writable, StartStopNotifier, Unsubscriber } from 'svelte/types/runtime/store'

interface Savable<T> extends Writable<T> {
  mount(): void
  unmount(): JSON
  unsub: Unsubscriber
}

export default function savable<T>(
  key: string,
  initialState: T,
  start?: StartStopNotifier<T>
): Savable<T> {
  const base = writable(initialState, start)

  return {
    ...base,
    mount() {
      const json = localStorage.getItem(key)

      if (json) {
        base.set(JSON.parse(json))
      }

      this.unsub = base.subscribe((currentState) => {
        localStorage.setItem(key, JSON.stringify(currentState))
      })
    },
    unmount() {
      const json = JSON.parse(localStorage.getItem(key)!)

      if (!json) {
        throw new Error('Cannot unmount')
      }

      this.unsub()
      localStorage.removeItem(key)
      return json
    },
    unsub() {
      throw new Error('Cannot unsubscribe')
    },
  }
}
