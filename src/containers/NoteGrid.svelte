<script lang="ts">
  import NoteCard from '$lib/components/NoteCard.svelte'

  import { filterNotes } from '$lib/helpers'
  import { notesStore } from '$lib/stores'
  import type { Note } from '$lib/types'

  const { togglePinnedNote, assignTrashToNote } = notesStore

  export let notes: Note[] = []
  $: filteredNotes = filterNotes(notes)
</script>

<div class="grid">
  {#each filteredNotes as note (note.id)}
    <NoteCard
      {...note}
      handlePinned={() => togglePinnedNote(note.id)}
      handleDeleteNote={() => assignTrashToNote(note.id)}
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
