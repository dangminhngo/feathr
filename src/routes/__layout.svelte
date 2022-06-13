<script lang="ts">
  import ThemeContext from '$lib/theming/ThemeContext.svelte'
  import Header from '$layouts/Header.svelte'
</script>

<ThemeContext>
  <Header />
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

  :global(button, input) {
    border: none;
    outline: none;
    background-color: inherit;
    color: inherit;
  }
</style>
