import type { Load } from '@sveltejs/kit'
import publicRoutes from '$lib/data/publicRoutes.json'

const isClient = typeof window !== 'undefined'

const guard: Load = ({ url }) => {
  if (!isClient) {
    return {}
  }

  let isAuth = false
  const json = localStorage.getItem('authState')

  if (json) {
    isAuth = JSON.parse(json).isAuth
  }

  const pathname = url.pathname

  if (isAuth && publicRoutes.includes(pathname)) {
    return {
      status: 301,
      redirect: '/app/notes',
    }
  }

  if (!isAuth && !publicRoutes.includes(pathname)) {
    return {
      status: 301,
      redirect: '/auth/signin',
    }
  }

  return {}
}

export default guard
