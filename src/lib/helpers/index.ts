import type { Action } from 'svelte/types/runtime/action'
import { v4 as uuid } from 'uuid'
import type { Note, Task, TaskItem } from '$lib/types'

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
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const createEmptyTask = (): Task => ({
  id: uuid(),
  title: '',
  tasks: [],
  images: [],
  tagIds: [],
  pinned: false,
  trash: false,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const isEmptyNote = (note: Note): boolean => {
  if (note.title === '' && note.body === '' && !note.images.length && !note.tagIds.length) {
    return true
  }

  return false
}

export const isEmptyTask = (task: Task): boolean => {
  if (task.title === '' && task.tasks.length === 0 && !task.tagIds.length) {
    return true
  }

  return false
}

export function filterItems<T extends Note | Task>(items: T[]): T[] {
  return items.filter((item) => !item.trash).sort((a, b) => Number(b.pinned) - Number(a.pinned))
}

export const getFilteredTaskItems = (
  task: Task
): { undoneTaskItems: TaskItem[]; doneTaskItems: TaskItem[] } => {
  return {
    undoneTaskItems: task.tasks.filter((t) => !t.done),
    doneTaskItems: task.tasks.filter((t) => t.done),
  }
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
