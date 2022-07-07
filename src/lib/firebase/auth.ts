import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { getDoc, setDoc } from 'firebase/firestore'
import { userDoc } from './firestore'
import { authState } from '$lib/state'
import { getDefaultUserPhotoURL } from '$lib/helpers'

const { setAuth, resetAuth } = authState
const auth = getAuth()

export const signUp = async (email: string, password: string) => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const { user } = credential

  if (!auth.currentUser) {
    throw new Error('Cannot authenticate this user')
  }

  const userRef = userDoc(user.uid)
  await setDoc(userRef, {
    id: userRef.id,
    email: user.email,
    photoURL: getDefaultUserPhotoURL(user.email),
  })

  const authUserSnap = await getDoc(userRef)
  const authUser = authUserSnap.data()

  if (!authUser) {
    throw new Error('Cannot authenticate this user')
  }

  setAuth({
    id: authUserSnap.id,
    email: authUser.email,
    photoURL: authUser.photoURL,
  })
}

export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)

  if (!auth.currentUser) {
    throw new Error('Cannot authenticate this user')
  }

  const userRef = userDoc(auth.currentUser.uid)
  const authUserSnap = await getDoc(userRef)
  const authUser = authUserSnap.data()

  if (!authUser) {
    throw new Error('Something went wrong')
  }

  setAuth({
    id: authUserSnap.id,
    email: authUser?.email,
    photoURL: authUser?.photoURL,
  })
}

export const logOut = async () => {
  await signOut(auth)
  resetAuth()
}
