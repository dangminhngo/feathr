<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import Field from '$lib/components/Field.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import ContextMenus from '$lib/components/contextmenus/ContextMenus.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
  import { uiStore, notesStore } from '$lib/stores'
  import { getItemById, isEmptyNote, createEmptyNote } from '$lib/helpers'
  import { themeKey } from '$lib/consts'
  import type { Note } from '$lib/types'
  import { ContextMenuType } from '$lib/enums'

  let titleField: Field

  let note: Note = createEmptyNote()
  const editingNote: Note | undefined = getItemById($notesStore.notes, $notesStore.currentNoteId)

  if (editingNote) note = { ...editingNote }

  const togglePinned = () => {
    note.pinned = !note.pinned
  }

  onMount(() => titleField?.focus())

  const { getBrushPalette } = getContext(themeKey)
  const brushPalette = getBrushPalette()

  const { setCurrentNote, addNote, updateNote } = notesStore
  const { closeAllModals, toggleContextMenu } = uiStore

  const _toggleContextMenu = (type: ContextMenuType, id: string) => (e: MouseEvent) => {
    setCurrentNote(id)
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(type, {
      x: rect.x,
      y: rect.y + rect.height,
    })
  }

  const dispatch = createEventDispatcher()

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

<div
  class="form"
  style="background-color: {note.color ? brushPalette[note.color] : 'transparent'};"
>
  <Field bind:this={titleField} placeholder="Title" bind:value={note.title} />
  <Field size="sm" placeholder="Body" bind:value={note.body} />
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
        on:click={(e) => _toggleContextMenu(ContextMenuType.Brush, note.id)(e)}
      />
    </div>
    <div class="right">
      <button class="close-button" on:click={handleSubmit}
        >{isEmptyNote(note) ? 'Close' : 'Save'}</button
      >
    </div>
  </div>
</div>

<ContextMenus bind:ids={note.tagIds} bind:color={note.color} />

<style lang="scss">
  .form {
    padding: 0 1rem;
    width: 100%;
    border-radius: var(--rounded);
  }

  .actions {
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
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

  .close-button {
    cursor: pointer;
    padding: 0 0.5rem;
    height: 2rem;
    font-size: var(--text-sm);
    font-weight: 700;
    border-radius: var(--rounded);
    transition: all 0.15s ease-out;

    &:hover {
      background-color: var(--theme-primary-50);
      color: var(--theme-primary-900);
    }
  }
</style>
