import { writable } from 'svelte/store'
import type { LayoutStore } from '$lib/types'

const initialStore: LayoutStore = {
  navOpen: false,
}

const createLayoutStore = (initialStore: LayoutStore) => {
  const { subscribe, update } = writable(initialStore)

  return {
    subscribe,
    toggleNav: () => update((store) => ({ ...store, navOpen: !store.navOpen })),
  }
}

const layoutStore = createLayoutStore(initialStore)

export default layoutStore
