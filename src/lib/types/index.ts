export interface Palette {
  bg: string
  fg: string
  searchBoxBg: string
  searchBoxFg: string
  searchBoxPlaceholderFg: string
}

export interface Theme {
  name: string
  palette: Palette
}
