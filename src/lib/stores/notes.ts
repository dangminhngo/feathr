import { writable } from 'svelte/store'
import type { NotesStore, Note } from '$lib/types'

const initialValue: NotesStore = {
  notes: [
    {
      id: '1',
      title: 'This is the first note',
      body: 'This is the first note body',
      images: [],
      tagIds: [],
      pinned: false,
      trash: false,
    },
    {
      id: '2',
      title: 'This is the second note',
      body: 'This is the second note body',
      images: [],
      tagIds: [],
      pinned: true,
      trash: false,
    },
  ],
  currentNoteId: '',
}

const createNotesStore = (initialValue: NotesStore) => {
  const { subscribe, update } = writable(initialValue)

  return {
    subscribe,
    setCurrentNote: (id: string) => {
      update((s) => {
        s.currentNoteId = id
        return s
      })
    },
    addNote: (note: Note) => {
      update((s) => {
        s.notes.push(note)
        return s
      })
    },
    togglePinnedNote: (id: string) => {
      update((s) => {
        s.notes = s.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
        return s
      })
    },
    assignTrashToNote: (id: string) => {
      update((s) => {
        s.notes = s.notes.map((n) => (n.id === id ? { ...n, trash: true } : n))
        return s
      })
    },
  }
}

export const notesStore = createNotesStore(initialValue)
