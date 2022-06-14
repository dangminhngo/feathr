import { writable } from 'svelte/store'
import type { UIStore } from '$lib/types'

const initialStore: UIStore = {
  navGrow: false,
}

const createLayoutStore = (initialStore: UIStore) => {
  const { subscribe, update } = writable(initialStore)

  return {
    subscribe,
    toggleNav: () =>
      update((s) => {
        s.navGrow = !s.navGrow
        return s
      }),
  }
}

export const uiStore = createLayoutStore(initialStore)
