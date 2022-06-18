<script lang="ts">
  import ContextMenu from '$containers/ContextMenu.svelte'
  import CheckGroup from '$lib/components/CheckGroup.svelte'
  import { uiStore, notesStore, tagsStore } from '$lib/stores'
  import { clickOutside } from '$lib/helpers'

  const { closeAllContextMenus } = uiStore
  const { setCurrentNote } = notesStore

  const handleCloseContextMenu = () => {
    setCurrentNote('')
    closeAllContextMenus()
  }
</script>

<ContextMenu>
  <div class="list" use:clickOutside on:outsideclick={handleCloseContextMenu}>
    {#each $tagsStore.tags as tag (tag.id)}
      <CheckGroup>{tag.label}</CheckGroup>
    {/each}
  </div>
</ContextMenu>
