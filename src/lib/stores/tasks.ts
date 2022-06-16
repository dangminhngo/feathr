import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { TasksStore, Task } from '$lib/types'

const initialValue: TasksStore = {
  tasks: [
    {
      id: uuid(),
      title: 'This is the first task',
      tasks: [
        {
          id: uuid(),
          title: 'Task A',
          done: true,
        },
        {
          id: uuid(),
          title: 'Task A',
          done: false,
        },
      ],
      images: [],
      tagIds: [],
      pinned: false,
      trash: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      title: 'This is the second task',
      tasks: [
        {
          id: uuid(),
          title: 'Task A',
          done: true,
        },
        {
          id: uuid(),
          title: 'Task B',
          done: false,
        },
      ],
      images: [],
      tagIds: [],
      pinned: true,
      trash: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  currentTaskId: '',
}

const createTasksStore = (initialValue: TasksStore) => {
  const { subscribe, update } = writable(initialValue)

  return {
    subscribe,
    setCurrentTask: (id: string) => {
      update((s) => {
        s.currentTaskId = id
        return s
      })
    },
    addTask: (task: Task) => {
      update((s) => {
        s.tasks.push(task)
        return s
      })
    },
    deleteTask: (id: string) => {
      update((s) => {
        s.tasks = s.tasks.filter((t) => t.id !== id)
        return s
      })
    },
    assignTaskToTrash: (id: string) => {
      update((s) => {
        const task = s.tasks.find((t) => t.id === id)
        if (task) task.trash = true
        return s
      })
    },
    togglePinnedTask: (id: string) => {
      update((s) => {
        const task = s.tasks.find((t) => t.id === id)
        if (task) task.pinned = !task.pinned
        return s
      })
    },
  }
}

export const tasksStore = createTasksStore(initialValue)
