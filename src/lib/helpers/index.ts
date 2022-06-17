import type { Action } from 'svelte/types/runtime/action'
import { v4 as uuid } from 'uuid'
import type { Note, TaskList, Task } from '$lib/types'

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

export const isEmptyNote = (note: Note): boolean => {
  if (note.title === '' && note.body === '' && !note.images.length && !note.tagIds.length) {
    return true
  }

  return false
}

export const isEmptyTaskList = (taskList: TaskList): boolean => {
  if (taskList.title === '' && taskList.tasks.length === 0 && !taskList.tagIds.length) {
    return true
  }

  return false
}

export const isEmptyTask = (task: Task): boolean => {
  if (task.title === '' && !task.done) {
    return true
  }

  return false
}

export const lastTaskInTaskListIsEmptyTask = (taskList: TaskList): boolean => {
  if (taskList.tasks.length > 0) {
    const lastTask = taskList.tasks[taskList.tasks.length - 1]
    if (isEmptyTask(lastTask)) {
      return true
    }
  }
  return false
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
