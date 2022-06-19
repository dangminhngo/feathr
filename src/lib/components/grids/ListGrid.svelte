<script lang="ts">
  import ListCard from '$lib/components/items/ListCard.svelte'
  import { uiStore, listsStore } from '$lib/stores'
  import { filterItems } from '$lib/helpers'
  import type { List } from '$lib/types'
  import { ModalType } from '$lib/enums'

  export let lists: List[] = []
  $: filteredLists = filterItems(lists)

  const { setCurrentList, togglePinnedList, assignTrashToList } = listsStore
  const { openModal } = uiStore

  const openEditListForm = (id: string) => {
    setCurrentList(id)
    openModal(ModalType.List)
  }
</script>

<div class="grid">
  {#each filteredLists as list (list.id)}
    <ListCard
      bind:list
      active={$listsStore.currentListId === list.id}
      on:click={() => openEditListForm(list.id)}
      handlePinned={() => togglePinnedList(list.id)}
      handleTrash={() => assignTrashToList(list.id)}
    />
  {/each}
</div>

<style lang="scss">
  .grid {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }
</style>
