import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

import type { ListsStore, List } from '$lib/types'

const initialValue: ListsStore = {
  lists: [
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
  currentListId: '',
}

const createListsStore = (initialValue: ListsStore) => {
  const { subscribe, update } = writable(initialValue)

  return {
    subscribe,
    setCurrentList: (id: string) => {
      update((s) => {
        s.currentListId = id
        return s
      })
    },
    addList: (list: List) => {
      update((s) => {
        s.lists.push(list)
        return s
      })
    },
    updateList: (id: string, updateList: List) => {
      update((s) => {
        s.lists = s.lists.map((l) => (l.id === id ? { ...l, ...updateList } : l))
        return s
      })
    },
    deleteList: (id: string) => {
      update((s) => {
        s.lists = s.lists.filter((l) => l.id !== id)
        return s
      })
    },
    togglePinnedList: (id: string) => {
      update((s) => {
        const list = s.lists.find((l) => l.id === id)
        if (list) list.pinned = !list.pinned
        return s
      })
    },
    assignTrashToList: (id: string) => {
      update((s) => {
        s.lists = s.lists.map((l) =>
          l.id === id ? { ...l, trash: true, trashedAt: new Date() } : l
        )
        return s
      })
    },
    unassignTrashToList: (id: string) => {
      update((s) => {
        s.lists = s.lists.map((l) =>
          l.id === id ? { ...l, trash: false, trashedAt: undefined } : l
        )
        return s
      })
    },
    emptyTrashLists: () => {
      update((s) => {
        s.lists = s.lists.filter((l) => !l.trash)
        return s
      })
    },
  }
}

export const listsStore = createListsStore(initialValue)
