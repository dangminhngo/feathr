<script lang="ts">
  import ThemeContext from '$lib/theming/ThemeContext.svelte'
  import Header from '$layouts/Header.svelte'
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<ThemeContext>
  <Header />
  <slot />
</ThemeContext>

<style lang="scss">
  :global(:root) {
    --button-height: 2.25rem;
    --input-height: 2.25rem;

    --rounded: 4px;
    --rounded-lg: 8px;
  }

  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    color: var(--theme-primary-200);
    background-color: var(--theme-primary-900);
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
  }

  :global(button, input) {
    border: none;
    outline: none;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }
</style>
