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
  'accent-light': string
  'accent-dark': string
}

export interface Theme {
  name: string
  dark: boolean
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
  color: string
  pinned: boolean
  trash: boolean
  createdAt: Date
  updatedAt: Date
  trashedAt?: Date
}

export interface Task {
  id: string
  title: string
  done: boolean
}

export interface List {
  id: string
  title: string
  tasks: Task[]
  images: string[]
  tagIds: string[]
  color: string
  pinned: boolean
  trash: boolean
  createdAt: Date
  updatedAt: Date
  trashedAt?: Date
}

export interface User {
  id: string
  email: string
  photoURL: string
}

export interface AuthState {
  isAuth: boolean
  authUser: User | null
}

export interface UiState {
  navGrow: boolean
  listView: boolean
  modal: {
    note: boolean
    list: boolean
    tag: boolean
    themes: boolean
    shortcuts: boolean
    about: boolean
    account: boolean
  }
  contextMenu: {
    tags: boolean
    background: boolean
    settings: boolean
    account: boolean
  }
  position: Position
  notification: {
    error: boolean
    message: string
  } | null
}

export interface NotesState {
  notes: Note[]
  currentNoteId: string
}

export interface ListsState {
  lists: List[]
  currentListId: string
}

export interface TagsState {
  tags: Tag[]
  currentTagId: string
}

export interface Position {
  x: number
  y: number
}

type ValidateErrorsObject<T> = {
  [field in keyof T]?: string
}

export type ValidateErrors<T> = ValidateErrorsObject<T> | null

export interface ValidateReturn<T> {
  data: T
  errors: ValidateErrors<T>
}

export type AuthData = { email: string; password: string }
