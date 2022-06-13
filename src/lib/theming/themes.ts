import type { Theme } from '$lib/types'

export const presets: Theme[] = [
  {
    name: 'Default',
    palette: {
      bg: '#18181b',
      fg: '#e4e4e7',
    },
  },
  {
    name: 'One Dark',
    palette: {
      bg: '#282c34',
      fg: '#abb2bf',
    },
  },
]

export const themeKey = Symbol()
