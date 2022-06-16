<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import IconButton from '$lib/components/IconButton.svelte'

  import { uiStore, notesStore } from '$lib/stores'
  import { getNoteById, isEmptyNote, clickOutside, createEmptyNote } from '$lib/helpers'
  import type { Note } from '$lib/types'

  let titleContentEditable: ContentEditable

  let note: Note, notes: Note[], currentNoteId: string, editingNote: Note | undefined

  $: {
    ;({ notes, currentNoteId } = $notesStore)
    editingNote = getNoteById(notes, currentNoteId)
    console.log('editing', editingNote)
    note = editingNote ?? createEmptyNote()
  }

  const togglePinned = () => {
    note.pinned = !note.pinned
  }

  onMount(() => titleContentEditable.focus())

  const dispatch = createEventDispatcher()
  const { setCurrentNote, addNote, updateNote } = notesStore
  const { closeAllModals } = uiStore

  const handleSubmit = () => {
    closeAllModals()
    dispatch('close')
    if (isEmptyNote(note)) return
    if (editingNote) {
      updateNote(note.id, note)
    } else {
      addNote(note)
    }
    setCurrentNote('')
  }
</script>

<div class="form" use:clickOutside on:outsideclick={handleSubmit}>
  <ContentEditable bind:this={titleContentEditable} placeholder="Title" bind:value={note.title} />
  <hr class="sep" />
  <ContentEditable size="sm" placeholder="Body" bind:value={note.body} />
  <div class="actions">
    <div class="left">
      <IconButton
        name={note.pinned ? 'pinFull' : 'pin'}
        size="md"
        on:click={togglePinned}
        active={note.pinned}
      />
      <IconButton name="picture" size="md" />
      <IconButton name="tags" size="md" />
      <IconButton name="brush" size="md" />
    </div>
    <div class="right">
      <button class="close-button" on:click={handleSubmit}
        >{isEmptyNote(note) ? 'Close' : 'Save'}</button
      >
    </div>
  </div>
</div>

<style lang="scss">
  .form {
    padding: 0 1rem;
    width: 100%;
    border-radius: var(--rounded);
  }

  .sep {
    border-color: var(--theme-primary-700);
  }

  .actions {
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--theme-primary-400);
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .close-button {
    cursor: pointer;
    padding: 0 0.5rem;
    height: 2rem;
    font-size: var(--text-sm);
    transition: all 0.15s ease-out;
    border-radius: var(--rounded);

    &:hover {
      background-color: var(--theme-primary-700);
    }
  }
</style>
