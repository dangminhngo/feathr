<script lang="ts">
  import NoteCard from '$lib/components/NoteCard.svelte'

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

<div class="grid">
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
  .grid {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }
</style>
