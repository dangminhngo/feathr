<script lang="ts">
  import ListCard from '$lib/components/items/ListCard.svelte'
  import firestore from '$lib/firebase/firestore'
  import { uiState, listsState } from '$lib/state'
  import { filterItems } from '$lib/helpers'
  import type { List } from '$lib/types'
  import { ModalType } from '$lib/enums'

  export let lists: List[] = []
  $: filteredLists = filterItems(lists)

  const { setCurrentList, togglePinnedList, assignTrashToList } = listsState
  const { openModal, notify } = uiState

  const _openEditListForm = (id: string) => {
    setCurrentList(id)
    openModal(ModalType.List)
  }

  const _togglePinnedList = async (id: string, pinned: boolean) => {
    await firestore.updateList(id, { pinned: !pinned })
    togglePinnedList(id)
    notify(pinned ? 'A list is unpinned' : 'A list is pinned')
  }

  const _assignTrashToList = async (id: string) => {
    await firestore.updateList(id, { trash: true })
    assignTrashToList(id)
    notify('A list has been moved to trash')
  }
</script>

<div class="wrapper" class:grid={!$uiState.listView} class:list={$uiState.listView}>
  {#each filteredLists as list (list.id)}
    <ListCard
      bind:list
      active={$listsState.currentListId === list.id}
      on:click={() => _openEditListForm(list.id)}
      handlePinned={() => _togglePinnedList(list.id, list.pinned)}
      handleTrash={() => _assignTrashToList(list.id)}
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
