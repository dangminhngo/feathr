import { writable } from 'svelte/store'
import type { UIStore } from '$lib/types'

const initialStore: UIStore = {
  navShrink: false,
}

const createLayoutStore = (initialStore: UIStore) => {
  const { subscribe, update } = writable(initialStore)

  return {
    subscribe,
    toggleNavShrink: () => update((store) => ({ ...store, navShrink: !store.navShrink })),
  }
}

export const uiStore = createLayoutStore(initialStore)
