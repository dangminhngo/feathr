<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit'
  import guard from '$lib/guard'

  export const load: Load = (params) => {
    return guard(params)
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { authState } from '$lib/state'

  onMount(() => {
    authState.mount()
  })
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<slot />

<style lang="scss">
  :global(:root) {
    --clr-primary-50: #fafafa;
    --clr-primary-100: #f4f4f5;
    --clr-primary-200: #e4e4e7;
    --clr-primary-300: #d4d4d8;
    --clr-primary-400: #a1a1aa;
    --clr-primary-500: #71717a;
    --clr-primary-600: #52525b;
    --clr-primary-700: #3f3f46;
    --clr-primary-800: #27272a;
    --clr-primary-900: #18181b;
    --clr-accent: #6366f1;
    --clr-accent-light: #818cf8;
    --clr-accent-dark: #4f46e5;
    --clr-white: #ffffff;
    --clr-danger: #f87171;
    --clr-danger-light: #f98d8d;

    --text-lg: 1.25rem;
    --text-base: 1rem;
    --text-sm: 0.875rem;
    --text-xs: 0.75rem;

    --sidenav-width: 5.25rem;
    --sidenav-grow-width: 16rem;
    --button-size: 2.25rem;
    --input-height: 2.25rem;

    --rounded: 4px;
    --rounded-lg: 8px;
    --rounded-full: 100px;

    --shadow: 0 0 0.5rem hsla(0, 0%, 0%, 0.4);
  }

  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    color: var(--clr-primary-200);
    background-color: var(--clr-primary-900);
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  :global(button, input) {
    border: none;
    outline: none;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  :global(a) {
    text-decoration: none;
    color: inherit;
  }
</style>
