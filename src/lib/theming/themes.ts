import type { Theme } from '$lib/types'

export const presets: Theme[] = [
  {
    name: 'Default',
    palette: {
      bg: '#18181b',
      fg: '#e4e4e7',
      searchBoxBg: '#27272a',
      searchBoxFg: '#e4e4e7',
      searchBoxPlaceholderFg: '#71717a',
    },
  },
  {
    name: 'One Dark',
    palette: {
      bg: '#282c34',
      fg: '#abb2bf',
      searchBoxBg: '#373d48',
      searchBoxFg: '#abb2bf',
      searchBoxPlaceholderFg: '#7d879b',
    },
  },
]

export const themeKey = Symbol()
