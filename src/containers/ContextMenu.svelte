<script lang="ts">
  import Portal from 'svelte-portal/src/Portal.svelte'
  import { uiStore } from '$lib/stores'
</script>

<Portal target="body">
  <div class="context-menu" style="top: {$uiStore.position.y}px; left: {$uiStore.position.x}px;">
    <slot />
  </div>
</Portal>

<style lang="scss">
  .context-menu {
    position: fixed;
    z-index: 1000;
    padding: 0.25rem 0;
    border-radius: var(--rounded);
    background-color: var(--theme-primary-800);
    box-shadow: var(--shadow);
  }
</style>
