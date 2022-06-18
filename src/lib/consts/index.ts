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
