import { writable } from 'svelte/store'
import type { LayoutStore } from '$lib/types'

const initialStore: LayoutStore = {
  navShrink: false,
}

const createLayoutStore = (initialStore: LayoutStore) => {
  const { subscribe, update } = writable(initialStore)

  return {
    subscribe,
    toggleNavShrink: () => update((store) => ({ ...store, navShrink: !store.navShrink })),
  }
}

const layoutStore = createLayoutStore(initialStore)

export default layoutStore
