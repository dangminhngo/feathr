import { writable } from 'svelte/store'
import type { User, AuthStore } from '$lib/types'

const initialValue: AuthStore = {
  isAuth: false,
  authUser: null,
}

const createAuthStore = (initialValue: AuthStore) => {
  const { subscribe, update } = writable(initialValue)

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

export const authStore = createAuthStore(initialValue)
