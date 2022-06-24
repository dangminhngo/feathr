import { writable } from 'svelte/store'
import type { TagsState, Tag } from '../types'

export const initialTagsState: TagsState = {
  tags: [],
  currentTagId: '',
}

const createTagsState = (initialState: TagsState) => {
  const { subscribe, update, set } = writable(initialState)

  return {
    subscribe,
    set,
    setCurrentTag: (id: string) => {
      update((s) => {
        s.currentTagId = id
        return s
      })
    },
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

export const tagsState = createTagsState(initialTagsState)
