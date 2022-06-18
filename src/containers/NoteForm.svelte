<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import { goto } from '$app/navigation'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import TagPill from '$lib/components/TagPill.svelte'
  import TagsContextMenu from '$containers/TagsContextMenu.svelte'

  import { uiStore, notesStore, tagsStore } from '$lib/stores'
  import { getItemById, getTags, isEmptyNote, createEmptyNote } from '$lib/helpers'
  import type { Note } from '$lib/types'
  import { ContextMenuType } from '$lib/enums'

  let titleContentEditable: ContentEditable

  let note: Note = createEmptyNote(),
    notes: Note[],
    currentNoteId: string,
    editingNote: Note | undefined

  $: {
    ;({ notes, currentNoteId } = $notesStore)
    editingNote = getItemById(notes, currentNoteId)

    if (editingNote) note = editingNote
  }

  const togglePinned = () => {
    note.pinned = !note.pinned
  }

  onMount(() => titleContentEditable.focus())

  const dispatch = createEventDispatcher()
  const { setCurrentNote, addNote, updateNote } = notesStore
  const { closeAllModals, toggleContextMenu } = uiStore

  const toggleTagsContextMenu = (id: string) => (e: MouseEvent) => {
    setCurrentNote(id)
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(ContextMenuType.Tags, {
      x: rect.x,
      y: rect.y + rect.height,
    })
  }

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
    goto('/app/notes')
  }

  $: tags = getTags($tagsStore.tags, note.tagIds)
</script>

<div class="form">
  <ContentEditable bind:this={titleContentEditable} placeholder="Title" bind:value={note.title} />
  <hr class="sep" />
  <ContentEditable size="sm" placeholder="Body" bind:value={note.body} />
  <div class="tags">
    {#each tags as tag (tag.id)}
      <TagPill {tag} />
    {/each}
  </div>
  <div class="actions">
    <div class="left">
      <IconButton
        name={note.pinned ? 'pinFull' : 'pin'}
        size="md"
        on:click={togglePinned}
        active={note.pinned}
      />
      <IconButton name="picture" size="md" />
      <IconButton name="tags" size="md" on:click={(e) => toggleTagsContextMenu(note.id)(e)} />
      <IconButton name="brush" size="md" />
    </div>
    <div class="right">
      <button class="close-button" on:click={handleSubmit}
        >{isEmptyNote(note) ? 'Close' : 'Save'}</button
      >
    </div>
  </div>
  {#if $uiStore.contextMenu.tags}
    <TagsContextMenu bind:tagIds={note.tagIds} />
  {/if}
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

  .tags {
    display: flex;
    gap: 0.5rem;
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
