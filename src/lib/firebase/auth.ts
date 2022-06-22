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
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    const { user } = credential

    if (!auth.currentUser) {
      throw new Error('Cannot authenticate this user')
    }

    const userRef = userDoc(auth.currentUser.uid)
    await setDoc(userRef, {
      email: user.email,
      photoURL: getDefaultUserPhotoURL(user.email),
    })
    const authUserSnapshot = await getDoc(userRef)
    const authUser = authUserSnapshot.data()

    setAuth({
      uid: authUser?.uid,
      email: authUser?.email,
      photoURL: authUser?.photoURL,
    })
  } catch (err) {
    console.log(err)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)

    if (!auth.currentUser) {
      throw new Error('Cannot authenticate this user')
    }

    const userRef = userDoc(auth.currentUser.uid)
    const authUserSnapshot = await getDoc(userRef)
    const authUser = authUserSnapshot.data()

    setAuth({
      uid: authUser?.uid,
      email: authUser?.email,
      photoURL: authUser?.photoURL,
    })
  } catch (err) {
    console.log(err)
  }
}

export const logOut = async () => {
  try {
    await signOut(auth)
    resetAuth()
  } catch (err) {
    console.log(err)
  }
}
