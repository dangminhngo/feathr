import type { Action } from 'svelte/types/runtime/action'
import { v4 as uuid } from 'uuid'
import type { Note } from '$lib/types'

export const createEmptyNote = (): Note => ({
  id: uuid(),
  title: '',
  body: '',
  images: [],
  tagIds: [],
  pinned: false,
  trash: false,
})

export const checkEmptyNote = (note: Note): boolean => {
  const emptyNote = createEmptyNote()

  if (
    note.id === emptyNote.id &&
    note.title === '' &&
    note.body === '' &&
    !note.images.length &&
    !note.tagIds.length
  ) {
    return true
  }

  return false
}

export const clickOutside: Action<HTMLElement, undefined> = (node: HTMLElement) => {
  const handleClick = (e: MouseEvent) => {
    if (node && !node.contains(e.target as HTMLElement)) {
      node.dispatchEvent(
        new CustomEvent<HTMLElement>('outsideclick', node as CustomEventInit<HTMLElement>)
      )
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}
