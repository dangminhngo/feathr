import { writable } from 'svelte/store'
import type { User, AuthState } from '$lib/types'

export const initialAuthState: AuthState = {
  isAuth: false,
  authUser: null,
}

const createAuthState = (initialState: AuthState) => {
  const { subscribe, update } = writable(initialState)

  return {
    subscribe,
    setAuth: (user: User) => {
      update((s) => {
        s.isAuth = true
        s.authUser = user
        return s
      })
    },
    resetAuth: () => {
      update((s) => {
        s.isAuth = false
        s.authUser = null
        return s
      })
    },
  }
}

export const authState = createAuthState(initialAuthState)
