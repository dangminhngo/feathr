import { v4 as uuid } from 'uuid'

import { writable } from 'svelte/store'
import type { NotesState, Note } from '$lib/types'

export const initialNotesState: NotesState = {
  notes: [
    {
      id: uuid(),
      title: 'This is the first note',
      body: 'This is the first note body',
      images: [],
      tagIds: [],
      pinned: false,
      trash: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: uuid(),
      title: 'This is the second note',
      body: 'This is the second note body',
      images: [],
      tagIds: [],
      pinned: true,
      trash: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      trashedAt: new Date(),
    },
  ],
  currentNoteId: '',
}

const createNotesState = (initialState: NotesState) => {
  const { subscribe, update } = writable(initialState)

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
    updateNote: (id: string, updateNote: Note) => {
      update((s) => {
        s.notes = s.notes.map((n) =>
          n.id === id ? { ...n, ...updateNote, updatedAt: new Date() } : n
        )
        return s
      })
    },
    deleteNote: (id: string) => {
      update((s) => {
        s.notes = s.notes.filter((n) => n.id !== id)
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
        s.notes = s.notes.map((n) =>
          n.id === id ? { ...n, trash: true, trashedAt: new Date() } : n
        )
        return s
      })
    },
    unassignTrashToNote: (id: string) => {
      update((s) => {
        s.notes = s.notes.map((n) =>
          n.id === id ? { ...n, trash: false, trashedAt: undefined } : n
        )
        return s
      })
    },
    emptyTrashNotes: () => {
      update((s) => {
        s.notes = s.notes.filter((n) => !n.trash)
        return s
      })
    },
  }
}

export const notesState = createNotesState(initialNotesState)
