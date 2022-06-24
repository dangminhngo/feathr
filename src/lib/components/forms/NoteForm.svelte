<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import Button from '$lib/components/Button.svelte'
  import Field from '$lib/components/Field.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import FormContextMenus from '$lib/components/contextmenus/FormContextMenus.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
  import firestore from '$lib/firebase/firestore'
  import { uiState, notesState } from '$lib/state'
  import { getItemById, isEmptyNote, createEmptyNote } from '$lib/helpers'
  import { themeKey } from '$lib/consts'
  import { ContextMenuType } from '$lib/enums'

  let titleField: Field

  let note = createEmptyNote()
  const editingNote = getItemById($notesState.notes, $notesState.currentNoteId)

  if (editingNote) note = { ...editingNote }

  const togglePinned = () => {
    note.pinned = !note.pinned
  }

  onMount(() => titleField?.focus())

  const { getPalette } = getContext(themeKey)
  const palette = getPalette()

  const { setCurrentNote, addNote, updateNote } = notesState
  const { closeAllModals, toggleContextMenu } = uiState

  const _toggleContextMenu = (type: ContextMenuType, id: string) => (e: MouseEvent) => {
    setCurrentNote(id)
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(type, {
      x: rect.x,
      y: rect.y + rect.height,
    })
  }

  const dispatch = createEventDispatcher()

  const handleSubmit = async () => {
    closeAllModals()
    dispatch('close')
    if (isEmptyNote(note)) return
    if (editingNote) {
      await firestore.updateNote(note.id, note)
      updateNote(note.id, note)
    } else {
      await firestore.addNote(note)
      addNote(note)
    }
    setCurrentNote('')
  }
</script>

<div class="form">
  <Field bind:this={titleField} name="Title" placeholder="Title" bind:value={note.title} />
  <Field name="Body" placeholder="Body" bind:value={note.body} />
  <TagPillGrid ids={note.tagIds} />
  <div class="actions">
    <div class="left">
      <IconButton
        name={note.pinned ? 'pinFull' : 'pin'}
        size="md"
        on:click={togglePinned}
        active={note.pinned}
      />
      <IconButton name="picture" size="md" />
      <IconButton
        name="tags"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Tags, note.id)(e)}
      />
      <IconButton
        name="brush"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Background, note.id)(e)}
      />
    </div>
    <div class="right">
      <Button on:click={handleSubmit}>{isEmptyNote(note) ? 'Close' : 'Save'}</Button>
    </div>
  </div>
</div>

<FormContextMenus bind:ids={note.tagIds} bind:color={note.color} />

<style lang="scss">
  .form {
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    border-radius: var(--rounded);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--theme-primary-300);
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }
</style>
