export interface Palette {
  'primary-50': string
  'primary-100': string
  'primary-200': string
  'primary-300': string
  'primary-400': string
  'primary-500': string
  'primary-600': string
  'primary-700': string
  'primary-800': string
  'primary-900': string
  accent: string
}

export interface Theme {
  name: string
  palette: Palette
}

export interface Tag {
  id: string
  label: string
}

export interface Note {
  id: string
  title: string
  body: string
  images: string[]
  tagIds: string[]
  color?: string
  pinned: boolean
  trash: boolean
}

export interface TaskItem {
  id: string
  title: string
  done: boolean
}

export interface Task {
  id: string
  title: string
  tasks: TaskItem[]
  tagIds: string[]
  color?: string
  pinned: boolean
  trash: boolean
}

export interface UIStore {
  navGrow: boolean
}

export interface NotesStore {
  notes: Note[]
  currentNoteId: string
}

export interface TasksStore {
  tasks: Task[]
  currentTaskId: string
}

export interface TagsStore {
  tags: Tag[]
  currentTagId: string
}
