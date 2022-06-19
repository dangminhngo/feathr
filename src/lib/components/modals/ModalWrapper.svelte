<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import Portal from 'svelte-portal/src/Portal.svelte'

  export let width = 30,
    handleBackdropClick: () => void = () => {
      /**/
    }
</script>

<Portal target="body">
  <div class="backdrop" transition:fade={{ duration: 150 }} on:click={handleBackdropClick}>
    &nbsp;
  </div>
  <div class="wrapper" transition:scale={{ duration: 250 }} style="width: {width}rem;">
    <slot />
  </div>
</Portal>

<style lang="scss">
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--theme-primary-800);
    opacity: 0.75;
  }

  .wrapper {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: var(--rounded);
    background-color: var(--theme-primary-900);
    box-shadow: var(--shadow);
  }
</style>
