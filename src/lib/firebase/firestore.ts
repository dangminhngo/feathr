import { get } from 'svelte/store'
import {
  arrayRemove,
  writeBatch,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'
import app from './app'
import { authState } from '$lib/state'
import type { Note, List, Tag } from '$lib/types'

const db = getFirestore(app)

const batch = writeBatch(db)
export const userDoc = (id: string) => doc(db, 'users', id)
const noteDoc = (userId: string, id: string) => doc(db, 'users', userId, 'notes', id)
const listDoc = (userId: string, id: string) => doc(db, 'users', userId, 'lists', id)
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

  return {
    notes: notesQuerySnapshot.docs.map((doc) => doc.data() as Note),
    lists: listsQuerySnapshot.docs.map((doc) => doc.data() as List),
    tags: tagsQuerySnapshot.docs.map((doc) => doc.data() as Tag),
  }
}

const addNote = async (payload: Note) => {
  const userId = getUserIdFromAuthState()
  const noteRef = noteDoc(userId, payload.id)
  await setDoc(noteRef, payload)
}

const updateNote = async (id: string, payload: Partial<Note>) => {
  const userId = getUserIdFromAuthState()
  const noteRef = noteDoc(userId, id)
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

const updateList = async (id: string, payload: Partial<List>) => {
  const userId = getUserIdFromAuthState()
  const listRef = listDoc(userId, id)
  await updateDoc(listRef, { ...payload })
}

const deleteList = async (payload: string) => {
  const userId = getUserIdFromAuthState()
  const listRef = listDoc(userId, payload)
  await deleteDoc(listRef)
}

const addTag = async (payload: Tag) => {
  const userId = getUserIdFromAuthState()
  const tagRef = tagDoc(userId, payload.id)
  await setDoc(tagRef, payload)
}

const updateTag = async (id: string, payload: Partial<Tag>) => {
  const userId = getUserIdFromAuthState()
  const tagRef = tagDoc(userId, id)
  await updateDoc(tagRef, { ...payload })
}

const deleteTag = async (payload: string) => {
  const userId = getUserIdFromAuthState()
  const tagRef = tagDoc(userId, payload)
  const tagSnap = await getDoc(tagRef)
  const removeId = tagSnap.data()?.id
  const notesQuery = query(
    collection(db, 'users', userId, 'notes'),
    where('tagIds', 'array-contains', removeId)
  )
  const listsQuery = query(
    collection(db, 'users', userId, 'lists'),
    where('tagIds', 'array-contains', removeId)
  )
  const notesQuerySnap = await getDocs(notesQuery)
  const listsQuerySnap = await getDocs(listsQuery)
  notesQuerySnap.forEach((doc) =>
    batch.update(doc.ref, {
      tagIds: arrayRemove(removeId),
    })
  )
  listsQuerySnap.forEach((doc) =>
    batch.update(doc.ref, {
      tagIds: arrayRemove(removeId),
    })
  )
  await batch.commit()
  await deleteDoc(tagRef)
}

const emptyTrash = async () => {
  const userId = getUserIdFromAuthState()
  const trashNotesQuery = query(
    collection(db, 'users', userId, 'notes'),
    where('trash', '==', true)
  )
  const trashListsQuery = query(
    collection(db, 'users', userId, 'lists'),
    where('trash', '==', true)
  )
  const trashNotesQuerySnapshot = await getDocs(trashNotesQuery)
  const trashListsQuerySnapshot = await getDocs(trashListsQuery)
  trashNotesQuerySnapshot.forEach((doc) => batch.delete(doc.ref))
  trashListsQuerySnapshot.forEach((doc) => batch.delete(doc.ref))
  await batch.commit()
}

export default {
  addNote,
  updateNote,
  deleteNote,
  addList,
  updateList,
  deleteList,
  addTag,
  updateTag,
  deleteTag,
  emptyTrash,
}
