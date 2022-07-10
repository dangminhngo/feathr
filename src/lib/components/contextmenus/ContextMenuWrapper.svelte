<script lang="ts">
  import Portal from 'svelte-portal/src/Portal.svelte'
  import { uiState, notesState, listsState } from '$lib/state'
  import { clickOutside } from '$lib/helpers'

  const { setCurrentNote } = notesState
  const { setCurrentList } = listsState
  const { closeAllContextMenus } = uiState

  const handleCloseContextMenu = () => {
    setCurrentNote('')
    setCurrentList('')
    closeAllContextMenus()
  }
</script>

<Portal target="body">
  <div
    class="context-menu"
    style="top: {$uiState.position.y}px; left: {$uiState.position.x}px;"
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
    background-color: var(--theme-context-menu-bg);
    color: var(--theme-context-menu-fg);
    box-shadow: var(--shadow);
  }
</style>
