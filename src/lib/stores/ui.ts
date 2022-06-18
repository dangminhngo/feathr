import { writable } from 'svelte/store'
import type { UIStore, Position } from '$lib/types'
import { ModalType, ContextMenuType, FormType } from '$lib/enums'

const initialValue: UIStore = {
  navGrow: false,
  form: FormType.None,
  modal: {
    note: false,
    taskList: false,
  },
  contextMenu: {
    brush: false,
    tags: false,
  },
  position: {
    x: 0,
    y: 0,
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
    openForm: (type: FormType) => {
      update((s) => {
        s.form = type
        return s
      })
    },
    closeForm: () => {
      update((s) => {
        s.form = FormType.None
        return s
      })
    },
    openModal: (type: ModalType) => {
      update((s) => {
        s.form = FormType.None
        s.modal[type] = true
        return s
      })
    },
    closeAllModals: () => {
      update((s) => {
        s.modal = {
          note: false,
          taskList: false,
        }
        return s
      })
    },
    toggleContextMenu: (type: ContextMenuType, position: Position, open = false) => {
      update((s) => {
        s.contextMenu[type] = open ? true : !s.contextMenu[type]
        s.position = position
        return s
      })
    },
    closeAllContextMenus: () => {
      update((s) => {
        s.contextMenu = {
          tags: false,
          brush: false,
        }
        s.position = { x: 0, y: 0 }
        return s
      })
    },
  }
}

export const uiStore = createLayoutStore(initialValue)
