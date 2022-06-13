<script lang="ts">
  import ThemeContext from '$lib/theming/ThemeContext.svelte'
</script>

<ThemeContext>
  <slot />
</ThemeContext>

<style lang="scss">
  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    color: var(--theme-fg);
    background-color: var(--theme-bg);
  }
</style>
