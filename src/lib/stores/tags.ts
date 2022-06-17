import { writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'
import type { TagsStore, Tag } from '../types'

const initialValue: TagsStore = {
  tags: [
    {
      id: uuid(),
      label: 'A tag',
    },
    {
      id: uuid(),
      label: 'B tag',
    },
    {
      id: uuid(),
      label: 'C tag',
    },
    {
      id: uuid(),
      label: 'D tag',
    },
    {
      id: uuid(),
      label: 'A tag 2',
    },
  ],
  currentTagId: '',
}

const createTagsStore = (initialValue: TagsStore) => {
  const { subscribe, update } = writable(initialValue)

  return {
    subscribe,
    addTag: (tag: Tag) => {
      update((s) => {
        s.tags.push(tag)
        return s
      })
    },
    updateTag: (id: string, updateTag: Tag) => {
      update((s) => {
        s.tags = s.tags.map((t) => (t.id === id ? { ...t, ...updateTag } : t))
        return s
      })
    },
    deleteTag: (id: string) => {
      update((s) => {
        s.tags = s.tags.filter((t) => t.id !== id)
        return s
      })
    },
  }
}

export const tagsStore = createTagsStore(initialValue)
