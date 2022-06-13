<script lang="ts">
  import { setContext, onMount } from 'svelte'
  import { writable } from 'svelte/store'

  import { presets, themeKey } from '$lib/theming/themes'
  import type { Theme } from '$lib/types'

  export let themes = [...presets]
  let _current = themes[0].name

  const getCurrentTheme = (name: string): Theme => themes.find((t) => t.name === name) ?? themes[0]
  const theme = writable(getCurrentTheme(_current))

  setContext(themeKey, {
    theme,
    setTheme: (name: string) => {
      _current = name
      const currentTheme = getCurrentTheme(name)
      theme.set(currentTheme)
      setRootColors(currentTheme)
    },
  })

  const setRootColors = (theme: Theme) => {
    document.documentElement.style.setProperty('--theme-name', theme.name)
    for (let [prop, color] of Object.entries(theme.palette)) {
      let cssVarName = `--theme-${prop}`
      document.documentElement.style.setProperty(cssVarName, color)
    }
  }

  onMount(() => setRootColors(getCurrentTheme(_current)))
</script>

<slot />
