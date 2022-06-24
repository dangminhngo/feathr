import { get } from 'svelte/store'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import app from './app'
import { authState } from '$lib/state'
import type { Note, List, Task, Tag } from '$lib/types'

const db = getFirestore(app)

export const userDoc = (id: string) => doc(db, 'users', id)
const noteDoc = (userId: string, id: string) => doc(db, 'users', userId, 'notes', id)
const listDoc = (userId: string, id: string) => doc(db, 'users', userId, 'lists', id)
const taskDoc = (userId: string, listId: string, id: string) =>
  doc(db, 'users', userId, 'lists', listId, 'tasks', id)
const tagDoc = (userId: string, id: string) => doc(db, 'users', userId, 'tags', id)

const getUserIdFromAuthState = () => {
  const _authState = get(authState)

  if (!_authState.authUser) throw new Error('No authenticate')

  return _authState.authUser.id
}

export const fetchInitialData = async () => {
  const userId = getUserIdFromAuthState()
  const notesQuerySnapshot = await getDocs(collection(db, 'users', userId, 'notes'))
  const listsQuerySnapshot = await getDocs(collection(db, 'users', userId, 'lists'))
  const tagsQuerySnapshot = await getDocs(collection(db, 'users', userId, 'tags'))

  const notes: Note[] = notesQuerySnapshot.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data as Note
  })

  const lists: List[] = listsQuerySnapshot.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data as List
  })

  const tags: Tag[] = tagsQuerySnapshot.docs.map((doc) => {
    const data = doc.data()
    data.id = doc.id
    return data as Tag
  })

  return { notes, lists, tags }
}

const addNote = async (payload: Note) => {
  const userId = getUserIdFromAuthState()
  const noteRef = noteDoc(userId, payload.id)
  await setDoc(noteRef, payload)
}

const updateNote = async (payload: Note) => {
  const userId = getUserIdFromAuthState()
  const noteRef = noteDoc(userId, payload.id)
  await updateDoc(noteRef, { ...payload })
}

const deleteNote = async (payload: string) => {
  const userId = getUserIdFromAuthState()
  const noteRef = noteDoc(userId, payload)
  await deleteDoc(noteRef)
}

const addList = async (payload: List) => {
  const userId = getUserIdFromAuthState()
  const listRef = listDoc(userId, payload.id)
  await setDoc(listRef, payload)
}

const updateList = async (payload: List) => {
  const userId = getUserIdFromAuthState()
  const listRef = listDoc(userId, payload.id)
  await updateDoc(listRef, { ...payload })
}

const deleteList = async (payload: string) => {
  const userId = getUserIdFromAuthState()
  const listRef = listDoc(userId, payload)
  await deleteDoc(listRef)
}

const addTask = async (listId: string, payload: Task) => {
  const userId = getUserIdFromAuthState()
  const taskRef = taskDoc(userId, listId, payload.id)
  await setDoc(taskRef, payload)
}

const updateTask = async (listId: string, payload: Task) => {
  const userId = getUserIdFromAuthState()
  const taskRef = taskDoc(userId, listId, payload.id)
  await updateDoc(taskRef, { ...payload })
}

const deleteTask = async (listId: string, payload: string) => {
  const userId = getUserIdFromAuthState()
  const taskRef = taskDoc(userId, listId, payload)
  await deleteDoc(taskRef)
}

const addTag = async (payload: Tag) => {
  const userId = getUserIdFromAuthState()
  const tagRef = tagDoc(userId, payload.id)
  await setDoc(tagRef, payload)
}

const updateTag = async (payload: Tag) => {
  const userId = getUserIdFromAuthState()
  const tagRef = tagDoc(userId, payload.id)
  await updateDoc(tagRef, { ...payload })
}

const deleteTag = async (payload: string) => {
  const userId = getUserIdFromAuthState()
  const tagRef = tagDoc(userId, payload)
  await deleteDoc(tagRef)
}

export default {
  addNote,
  updateNote,
  deleteNote,
  addList,
  updateList,
  deleteList,
  addTask,
  updateTask,
  deleteTask,
  addTag,
  updateTag,
  deleteTag,
}
