<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fade, scale } from 'svelte/transition'
  import Portal from 'svelte-portal/src/Portal.svelte'
  import IconButton from '$lib/components/IconButton.svelte'

  export let width = 30,
    title = 'Modal',
    handleClose: () => void = () => {
      /**/
    }
</script>

<Portal target="body">
  <div class="backdrop" transition:fade={{ duration: 150 }} on:click={handleClose}>&nbsp;</div>
  <div
    class="wrapper"
    transition:scale={{ duration: 350, easing: quintOut }}
    style="width: {width}rem;"
  >
    <div class="titlebar">
      <span>{title}</span>
      <IconButton size="sm" variant="none" name="close" on:click={handleClose} />
    </div>
    <div class="container">
      <slot />
    </div>
  </div>
</Portal>

<style lang="scss">
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--theme-backdrop);
  }

  .wrapper {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: var(--rounded);
    background-color: var(--theme-bg);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .titlebar {
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--theme-accent);
    color: var(--theme-fg);
    font-size: var(--text-sm);
    font-weight: 500;
  }

  .container {
    max-height: 50vh;
    overflow: auto;
  }
</style>
