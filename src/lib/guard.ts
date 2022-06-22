import type { Load } from '@sveltejs/kit'
import { authState, initialAuthState } from '$lib/state'

export const authGuard: Load = ({ url }) => {
  let auth = { ...initialAuthState }
  authState.subscribe((state) => (auth = state))
  const isAuth = auth.isAuth

  console.log(url)

  if (isAuth && url.pathname === '/auth/signin') {
    return {
      status: 302,
      redirect: '/app/notes',
    }
  }

  if (isAuth || url.pathname === '/auth/signin') {
    return {}
  }

  return {
    status: 302,
    redirect: '/auth/signin',
  }
}
