<script lang="ts">
  import ListCard from '$lib/components/items/ListCard.svelte'
  import { uiState, listsState } from '$lib/state'
  import { filterItems } from '$lib/helpers'
  import type { List } from '$lib/types'
  import { ModalType } from '$lib/enums'

  export let lists: List[] = []
  $: filteredLists = filterItems(lists)

  const { setCurrentList, togglePinnedList, assignTrashToList } = listsState
  const { openModal } = uiState

  const openEditListForm = (id: string) => {
    setCurrentList(id)
    openModal(ModalType.List)
  }
</script>

<div class="wrapper" class:grid={!$uiState.listView} class:list={$uiState.listView}>
  {#each filteredLists as list (list.id)}
    <ListCard
      bind:list
      active={$listsState.currentListId === list.id}
      on:click={() => openEditListForm(list.id)}
      handlePinned={() => togglePinnedList(list.id)}
      handleTrash={() => assignTrashToList(list.id)}
    />
  {/each}
</div>

<style lang="scss">
  .wrapper {
    padding: 2rem 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }

  .list {
    margin: 0 auto;
    width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
