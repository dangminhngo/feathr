<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'
  import ListCard from '$lib/components/items/ListCard.svelte'
  import firestore from '$lib/firebase/firestore'
  import { notesState, listsState } from '$lib/state'
  import { filterTrashItems } from '$lib/helpers'

  const { deleteNote, unassignTrashToNote } = notesState
  const { deleteList, unassignTrashToList } = listsState

  const _deleteNote = async (id: string) => {
    await firestore.deleteNote(id)
    deleteNote(id)
  }

  const _deleteList = async (id: string) => {
    await firestore.deleteList(id)
    deleteList(id)
  }

  const _unassignTrashToNote = async (id: string) => {
    await firestore.updateNote(id, { trash: false })
    unassignTrashToNote(id)
  }

  const _unassignTrashToList = async (id: string) => {
    await firestore.updateList(id, { trash: false })
    unassignTrashToList(id)
  }

  $: trashItems = filterTrashItems($notesState.notes, $listsState.lists)
</script>

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

<style lang="scss">
  .grid {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }
</style>
