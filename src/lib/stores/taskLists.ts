import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { TaskListsStore, TaskList } from '$lib/types'

const initialValue: TaskListsStore = {
  taskLists: [
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
      trash: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      trashedAt: new Date(),
    },
  ],
  currentTaskListId: '',
}

const createTaskListsStore = (initialValue: TaskListsStore) => {
  const { subscribe, update } = writable(initialValue)

  return {
    subscribe,
    setCurrentTaskList: (id: string) => {
      update((s) => {
        s.currentTaskListId = id
        return s
      })
    },
    addTaskList: (taskList: TaskList) => {
      update((s) => {
        s.taskLists.push(taskList)
        return s
      })
    },
    updateTaskList: (id: string, updateTaskList: TaskList) => {
      update((s) => {
        s.taskLists = s.taskLists.map((tl) => (tl.id === id ? { ...tl, ...updateTaskList } : tl))
        return s
      })
    },
    deleteTaskList: (id: string) => {
      update((s) => {
        s.taskLists = s.taskLists.filter((t) => t.id !== id)
        return s
      })
    },
    assignTaskListToTrash: (id: string) => {
      update((s) => {
        s.taskLists = s.taskLists.map((tl) =>
          tl.id === id ? { ...tl, trash: true, trashedAt: new Date() } : tl
        )
        return s
      })
    },
    unassignTaskListToTrash: (id: string) => {
      update((s) => {
        s.taskLists = s.taskLists.map((tl) =>
          tl.id === id ? { ...tl, trash: false, trashedAt: undefined } : tl
        )
        return s
      })
    },
    togglePinnedTaskList: (id: string) => {
      update((s) => {
        const task = s.taskLists.find((t) => t.id === id)
        if (task) task.pinned = !task.pinned
        return s
      })
    },
  }
}

export const taskListsStore = createTaskListsStore(initialValue)
