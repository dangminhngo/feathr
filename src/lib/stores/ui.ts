import { writable } from 'svelte/store'
import type { UIStore } from '$lib/types'
import type { ModalType } from '$lib/enums'

const initialValue: UIStore = {
  navGrow: false,
  modal: {
    note: false,
    task: false,
    brush: false,
    tags: false,
  },
}

const createLayoutStore = (initialValue: UIStore) => {
  const { subscribe, update } = writable(initialValue)

  return {
    subscribe,
    toggleNav: () => {
      update((s) => {
        s.navGrow = !s.navGrow
        return s
      })
    },
    openModal: (modalType: ModalType) => {
      update((s) => {
        s.modal[modalType as keyof typeof initialValue.modal] = true
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

export const uiStore = createLayoutStore(initialValue)
