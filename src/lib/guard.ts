import type { Load } from '@sveltejs/kit'
import { authState, initialAuthState } from '$lib/state'

export const authGuard: Load = ({ url }) => {
  let auth = { ...initialAuthState }
  authState.subscribe((state) => (auth = state))
  const isAuth = auth.isAuth
  const pathname = url.pathname

  const routes = [
    {
      pathname: '/',
      private: false,
    },
    {
      pathname: '/auth/signup',
      private: false,
    },
    {
      pathname: '/auth/signin',
      private: false,
    },
    {
      pathname: '/app/notes',
      private: true,
    },
    {
      pathname: '/app/lists',
      private: true,
    },
    {
      pathname: '/app/tags',
      private: true,
    },
    {
      pathname: '/app/trash',
      private: true,
    },
  ]

  if (!isAuth && routes.find((route) => route.pathname === pathname && route.private)) {
    return {
      status: 302,
      redirect: '/auth/signin',
    }
  }

  return {}
}
