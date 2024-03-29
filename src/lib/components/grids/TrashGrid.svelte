<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'
  import ListCard from '$lib/components/items/ListCard.svelte'
  import EmptyGrid from './EmptyGrid.svelte'
  import firestore from '$lib/firebase/firestore'
  import { uiState, notesState, listsState } from '$lib/state'
  import { filterTrashItems } from '$lib/helpers'

  const { deleteNote, unassignTrashToNote } = notesState
  const { deleteList, unassignTrashToList } = listsState
  const { notify } = uiState

  const _deleteNote = async (id: string) => {
    await firestore.deleteNote(id)
    deleteNote(id)
    notify('A note has been permanenly deleted')
  }

  const _deleteList = async (id: string) => {
    await firestore.deleteList(id)
    deleteList(id)
    notify('A list has been permanenly deleted')
  }

  const _unassignTrashToNote = async (id: string) => {
    await firestore.updateNote(id, { trash: false })
    unassignTrashToNote(id)
    notify('A note has been restored from trash')
  }

  const _unassignTrashToList = async (id: string) => {
    await firestore.updateList(id, { trash: false })
    unassignTrashToList(id)
    notify('A list has been restored from trash')
  }

  $: trashItems = filterTrashItems($notesState.notes, $listsState.lists)
</script>

{#if trashItems.length > 0}
  <div class="grid">
    {#each trashItems as item (item.id)}
      {#if 'tasks' in item}
        <ListCard
          list={item}
          handleRestore={() => _unassignTrashToList(item.id)}
          handleDelete={() => _deleteList(item.id)}
        />
      {:else}
        <NoteCard
          note={item}
          handleRestore={() => _unassignTrashToNote(item.id)}
          handleDelete={() => _deleteNote(item.id)}
        />
      {/if}
    {/each}
  </div>
{:else}
  <EmptyGrid type="trash">
    <span slot="message"> You have no items in your trash </span>
  </EmptyGrid>
{/if}

<style lang="scss">
  .grid {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }
</style>
