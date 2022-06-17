import type { Action } from 'svelte/types/runtime/action'
import { v4 as uuid } from 'uuid'
import type { Note, TaskList, Task, Tag } from '$lib/types'

export function getItemById<T extends Note | TaskList>(items: T[], id: string): T | undefined {
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

export const createEmptyTaskList = (): TaskList => ({
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
  return note.title === '' && note.body === '' && !note.images.length && !note.tagIds.length
}

export const isEmptyTaskList = (taskList: TaskList): boolean => {
  return taskList.title === '' && taskList.tasks.length === 0 && !taskList.tagIds.length
}

export const isEmptyTask = (task: Task): boolean => {
  return task.title === ''
}

export const lastTaskInTaskListIsEmptyTask = (taskList: TaskList): boolean => {
  return taskList.tasks.length > 0 && isEmptyTask(taskList.tasks[taskList.tasks.length - 1])
}

export function filterItems<T extends Note | TaskList>(items: T[]): T[] {
  return items.filter((item) => !item.trash).sort((a, b) => Number(b.pinned) - Number(a.pinned))
}

export const getFilteredTasks = (
  taskList: TaskList
): { undoneTasks: Task[]; doneTasks: Task[] } => {
  return {
    undoneTasks: taskList.tasks.filter((t) => !t.done),
    doneTasks: taskList.tasks.filter((t) => t.done),
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
