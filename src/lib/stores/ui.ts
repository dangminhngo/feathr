import { writable } from 'svelte/store'
import type { UIStore } from '$lib/types'

const initialStore: UIStore = {
  navGrow: false,
  modal: {
    note: false,
    task: false,
    brush: false,
    tags: false,
  },
}

const createLayoutStore = (initialStore: UIStore) => {
  const { subscribe, update } = writable(initialStore)

  return {
    subscribe,
    toggleNav: () => {
      update((s) => {
        s.navGrow = !s.navGrow
        return s
      })
    },
    openModal: (modalType: 'note' | 'task' | 'brush' | 'tags') => {
      update((s) => {
        s.modal[modalType] = true
        return s
      })
    },
    closeAllModals: () => {
      update((s) => {
        s.modal = {
          note: false,
          task: false,
          brush: false,
          tags: false,
        }
        return s
      })
    },
  }
}

export const uiStore = createLayoutStore(initialStore)
