<script lang="ts">
  import { onMount, getContext } from 'svelte'
  import { goto } from '$app/navigation'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import TagPillList from '$containers/TagPillList.svelte'
  import TagsContextMenu from '$containers/TagsContextMenu.svelte'
  import BrushContextMenu from '$containers/BrushContextMenu.svelte'

  import { uiStore, notesStore } from '$lib/stores'
  import { getItemById, isEmptyNote, createEmptyNote } from '$lib/helpers'
  import { themeKey } from '$lib/theming/themes'
  import type { Note } from '$lib/types'
  import { ContextMenuType } from '$lib/enums'

  let titleContentEditable: ContentEditable

  let note: Note = createEmptyNote()
  const editingNote: Note | undefined = getItemById($notesStore.notes, $notesStore.currentNoteId)

  if (editingNote) note = editingNote

  const togglePinned = () => {
    note.pinned = !note.pinned
  }

  onMount(() => titleContentEditable?.focus())

  const { getBrushPalette } = getContext(themeKey)
  const brushPalette = getBrushPalette()

  const { setCurrentNote, addNote, updateNote } = notesStore
  const { closeForm, closeAllModals, toggleContextMenu } = uiStore

  const _toggleContextMenu = (type: ContextMenuType, id: string) => (e: MouseEvent) => {
    setCurrentNote(id)
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(type, {
      x: rect.x,
      y: rect.y + rect.height,
    })
  }

  const handleSubmit = () => {
    closeAllModals()
    closeForm()
    if (isEmptyNote(note)) return
    if (editingNote) {
      updateNote(note.id, note)
    } else {
      addNote(note)
    }
    setCurrentNote('')
    goto('/app/notes')
  }
</script>

<div
  class="form"
  style="background-color: {note.color ? brushPalette[note.color] : 'transparent'};"
>
  <ContentEditable bind:this={titleContentEditable} placeholder="Title" bind:value={note.title} />
  <ContentEditable size="sm" placeholder="Body" bind:value={note.body} />
  <TagPillList ids={note.tagIds} />
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

{#if $uiStore.contextMenu.tags}
  <TagsContextMenu bind:ids={note.tagIds} />
{/if}

{#if $uiStore.contextMenu.brush}
  <BrushContextMenu bind:color={note.color} />
{/if}

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
    transition: all 0.15s ease-out;
    border-radius: var(--rounded);

    &:hover {
      color: var(--theme-primary-100);
    }
  }
</style>
