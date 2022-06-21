import type { Theme } from '$lib/types'

export const presets: Theme[] = [
  {
    name: 'Default',
    dark: true,
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
    dark: true,
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

export const brushPalettes: { [key: string]: { [key: string]: string } } = {
  light: {
    red: '#fecaca',
    orange: '#fed7aa',
    yellow: '#fef9c3',
    green: '#bbf7d0',
    teal: '#99f6e4',
    cyan: '#a5f3fc',
    blue: '#bfdbfe',
    purple: '#ddd6fe',
    magenta: '#fbcfe8',
    brown: '#fac985',
    grey: '#9ca3af',
  },
  dark: {
    red: '#f87171',
    orange: '#fb923c',
    yellow: '#eab308',
    green: '#15803d',
    teal: '#0f766e',
    cyan: '#0e7490',
    blue: '#1e40af',
    purple: '#5b21b6',
    magenta: '#86198f',
    brown: '#623b04',
    grey: '#374151',
  },
}

export const colorKeys: string[] = Object.keys(brushPalettes.light)
