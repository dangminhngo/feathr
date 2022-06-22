import type { Action } from 'svelte/types/runtime/action'
import { v4 as uuid } from 'uuid'
import type { Note, List, Task, Tag } from '$lib/types'

export function getItemById<T extends Note | List>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id)
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

export const createEmptyList = (): List => ({
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

export const createEmptyTask = (): Task => ({
  id: uuid(),
  title: '',
  done: false,
})

export const createEmptyTag = (): Tag => ({
  id: uuid(),
  label: '',
})

export const isEmptyNote = (note: Note): boolean => {
  return note.title === '' && note.body === '' && !note.images.length
}

export const isEmptyList = (list: List): boolean => {
  return list.title === '' && list.tasks.length === 0
}

export const isEmptyTask = (task: Task): boolean => {
  return task.title === ''
}

export const lastTaskInListIsEmptyTask = (list: List): boolean => {
  return list.tasks.length > 0 && isEmptyTask(list.tasks[list.tasks.length - 1])
}

export function filterItems<T extends Note | List>(items: T[]): T[] {
  return items.filter((item) => !item.trash).sort((a, b) => Number(b.pinned) - Number(a.pinned))
}

export const getFilteredTasks = (list: List): { undoneTasks: Task[]; doneTasks: Task[] } => {
  return {
    undoneTasks: list.tasks.filter((t) => !t.done),
    doneTasks: list.tasks.filter((t) => t.done),
  }
}

export const filterTags = (tags: Tag[]): { [key: string]: Tag[] } => {
  return tags.reduce((filtered: { [key: string]: Tag[] }, t: Tag) => {
    const label = t.label.toLowerCase()
    const key = label[0].toUpperCase()
    if (!Object.prototype.hasOwnProperty.call(filtered, key)) {
      filtered[key] = []
    }
    filtered[key].push(t)

    return filtered
  }, {})
}

export const filterTrashItems = (notes: Note[], lists: List[]): (Note | List)[] => {
  const trashNotes = notes.filter((n) => n.trash)
  const trashLists = lists.filter((l) => l.trash)

  return [...trashNotes, ...trashLists].sort((a, b) => Number(a?.trashedAt) - Number(b?.trashedAt))
}

export function searchItems<T extends Note | List>(items: T[], keyword: string): T[] {
  return items.filter(
    (item) => !item.trash && item.title.toLowerCase().includes(keyword.toLowerCase())
  )
}

export const getSearchResults = (
  notes: Note[],
  lists: List[],
  keyword: string
): (Note | List)[] => {
  const resultNotes = searchItems(notes, keyword)
  const resultLists = searchItems(lists, keyword)
  return [...resultNotes, ...resultLists].sort((a, b) => {
    if (a.title > b.title) return 1
    if (a.title < b.title) return -1
    return 0
  })
}

export const searchTags = (tags: Tag[], keyword: string): Tag[] => {
  return tags.filter((t) => t.label.toLowerCase().includes(keyword.toLowerCase()))
}

export const getTags = (tags: Tag[], ids: string[]): Tag[] => {
  return tags.filter((t) => ids.includes(t.id))
}

export const isEmptyTrash = (notes: Note[], lists: List[]) => {
  return !notes.filter((n) => n.trash).length && !lists.filter((tl) => tl.trash).length
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

export const getDefaultUserPhotoURL = (email: string | null): string => {
  let username: string | undefined

  if (!email) {
    username = 'Default'
  }

  username = email?.split('@')[0]
  return `https://ui-avatars.com/api/?name=${username}&background=random&color=random&size=128&length=2&bold=true`
}
