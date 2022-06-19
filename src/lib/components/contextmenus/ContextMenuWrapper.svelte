<script lang="ts">
  import Portal from 'svelte-portal/src/Portal.svelte'
  import { uiStore, notesStore, listsStore } from '$lib/stores'
  import { clickOutside } from '$lib/helpers'

  const { setCurrentNote } = notesStore
  const { setCurrentList } = listsStore
  const { closeAllContextMenus } = uiStore

  const handleCloseContextMenu = () => {
    setCurrentNote('')
    setCurrentList('')
    closeAllContextMenus()
  }
</script>

<Portal target="body">
  <div
    class="context-menu"
    style="top: {$uiStore.position.y}px; left: {$uiStore.position.x}px;"
    use:clickOutside
    on:outsideclick={handleCloseContextMenu}
  >
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
