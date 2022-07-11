<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'
  import EmptyGrid from './EmptyGrid.svelte'
  import firestore from '$lib/firebase/firestore'
  import { filterItems } from '$lib/helpers'
  import { uiState, notesState } from '$lib/state'
  import type { Note } from '$lib/types'
  import { ModalType } from '$lib/enums'

  const { setCurrentNote, togglePinnedNote, assignTrashToNote } = notesState
  const { openModal, notify } = uiState

  export let notes: Note[] = []
  $: filteredNotes = filterItems(notes)

  const _openEditNoteForm = (id: string) => {
    setCurrentNote(id)
    openModal(ModalType.Note)
  }

  const _togglePinnedNote = async (id: string, pinned: boolean) => {
    await firestore.updateNote(id, { pinned: !pinned })
    togglePinnedNote(id)
    notify(pinned ? 'A note is unpinned' : 'A note is pinned')
  }

  const _assignTrashToNote = async (id: string) => {
    await firestore.updateNote(id, { trash: true })
    assignTrashToNote(id)
    notify('A note has been moved to trash')
  }
</script>

{#if filteredNotes.length > 0}
  <div class="wrapper" class:grid={!$uiState.listView} class:list={$uiState.listView}>
    {#each filteredNotes as note (note.id)}
      <NoteCard
        {note}
        active={$notesState.currentNoteId === note.id}
        on:click={() => _openEditNoteForm(note.id)}
        handlePinned={() => _togglePinnedNote(note.id, note.pinned)}
        handleTrash={() => _assignTrashToNote(note.id)}
      />
    {/each}
  </div>
{:else}
  <EmptyGrid>
    <span slot="message"> You have no notes. Tap "Add a note" to add a new note. </span>
  </EmptyGrid>
{/if}

<style lang="scss">
  .wrapper {
    padding: 2rem 0;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
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
