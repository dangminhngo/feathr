<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'

  import { filterItems } from '$lib/helpers'
  import { uiStore, notesStore } from '$lib/stores'
  import type { Note } from '$lib/types'
  import { ModalType } from '$lib/enums'

  const { setCurrentNote, togglePinnedNote, assignTrashToNote } = notesStore
  const { openModal } = uiStore

  export let notes: Note[] = []
  $: filteredNotes = filterItems(notes)

  const openEditNoteForm = (id: string) => {
    setCurrentNote(id)
    openModal(ModalType.Note)
  }
</script>

<div class="wrapper" class:grid={!$uiStore.listView} class:list={$uiStore.listView}>
  {#each filteredNotes as note (note.id)}
    <NoteCard
      {note}
      active={$notesStore.currentNoteId === note.id}
      on:click={() => openEditNoteForm(note.id)}
      handlePinned={() => togglePinnedNote(note.id)}
      handleTrash={() => assignTrashToNote(note.id)}
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
