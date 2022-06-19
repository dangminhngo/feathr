<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'
  import ListCard from '$lib/components/items/ListCard.svelte'
  import { notesStore, listsStore } from '$lib/stores'
  import { filterTrashItems } from '$lib/helpers'

  const { deleteNote, unassignTrashToNote } = notesStore
  const { deleteList, unassignTrashToList } = listsStore

  const _deleteNote = (id: string) => {
    deleteNote(id)
  }

  const _deleteList = (id: string) => {
    deleteList(id)
  }

  const _unassignTrashToNote = (id: string) => {
    unassignTrashToNote(id)
  }

  const _unassignTrashToList = (id: string) => {
    unassignTrashToList(id)
  }

  $: trashItems = filterTrashItems($notesStore.notes, $listsStore.lists)
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
