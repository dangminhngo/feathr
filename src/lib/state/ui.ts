import { writable } from 'svelte/store'
import type { UiState, Position } from '$lib/types'
import type { ModalType, ContextMenuType } from '$lib/enums'

export const initialUiState: UiState = {
  navGrow: false,
  listView: false,
  modal: {
    note: false,
    list: false,
    themes: false,
    shortcuts: false,
    about: false,
    account: false,
  },
  contextMenu: {
    tags: false,
    background: false,
    settings: false,
    account: false,
  },
  position: {
    x: 0,
    y: 0,
  },
}

const createLayoutStore = (initialState: UiState) => {
  const { subscribe, update } = writable(initialState)

  return {
    subscribe,
    toggleNav: () => {
      update((s) => {
        s.navGrow = !s.navGrow
        return s
      })
    },
    toggleListView: () => {
      update((s) => {
        s.listView = !s.listView
        return s
      })
    },
    openModal: (type: ModalType) => {
      update((s) => {
        s.modal[type] = true
        return s
      })
    },
    closeAllModals: () => {
      update((s) => {
        s.modal = {
          note: false,
          list: false,
          themes: false,
          shortcuts: false,
          about: false,
          account: false,
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
          background: false,
          settings: false,
          account: false,
        }
        s.position = { x: 0, y: 0 }
        return s
      })
    },
  }
}

export const uiState = createLayoutStore(initialUiState)
