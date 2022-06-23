import type { User, AuthState } from '$lib/types'
import savable from '$lib/savable'

export const initialAuthState: AuthState = {
  isAuth: false,
  authUser: null,
}

const createAuthState = (initialState: AuthState) => {
  const { update, ...props } = savable<AuthState>('authState', initialState)

  return {
    ...props,
    update,
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
