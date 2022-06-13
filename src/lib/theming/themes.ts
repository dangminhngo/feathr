import type { Theme } from '$lib/types'

export const presets: Theme[] = [
  {
    name: 'Default',
    palette: {
      'primary-50': '#fafafa',
      'primary-100': '#f4f4f5',
      'primary-200': '#e4e4e7',
      'primary-300': '#d4d4d8',
      'primary-400': '#a1a1aa',
      'primary-500': '#71717a',
      'primary-600': '#52525b',
      'primary-700': '#3f3f46',
      'primary-800': '#27272a',
      'primary-900': '#18181b',
      accent: '#6366f1',
    },
  },
  {
    name: 'Slate',
    palette: {
      'primary-50': '#f8fafc',
      'primary-100': '#f1f5f9',
      'primary-200': '#e2e8f0',
      'primary-300': '#cbd5e1',
      'primary-400': '#94a3b8',
      'primary-500': '#64748b',
      'primary-600': '#475569',
      'primary-700': '#334155',
      'primary-800': '#1e293b',
      'primary-900': '#0f172a',
      accent: '#3b82f6',
    },
  },
]

export const themeKey = Symbol()
