import type { Action } from 'svelte/types/runtime/action'
import { v4 as uuid } from 'uuid'
import type { Note } from '$lib/types'

export const getNoteById = (notes: Note[], id: string): Note | undefined => {
  return notes.find((n) => n.id === id)
}

export const createEmptyNote = (): Note => ({
  id: uuid(),
  title: '',
  body: '',
  images: [],
  tagIds: [],
  pinned: false,
  trash: false,
})

export const isEmptyNote = (note: Note): boolean => {
  if (note.title === '' && note.body === '' && !note.images.length && !note.tagIds.length) {
    return true
  }

  return false
}

export const filterNotes = (notes: Note[]): Note[] => {
  return notes.filter((n) => !n.trash).sort((a, b) => Number(b.pinned) - Number(a.pinned))
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
