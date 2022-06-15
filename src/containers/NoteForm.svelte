<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import IconButton from '$lib/components/IconButton.svelte'

  import { notesStore } from '$lib/stores'
  import { createEmptyNote } from '$lib/helpers'

  let titleContentEditable: ContentEditable

  let title = '',
    body = '',
    images: string[] = [],
    tagIds: string[] = [],
    pinned = false,
    trash = false

  let note = createEmptyNote()

  $: {
    note = {
      ...note,
      title,
      body,
      images,
      tagIds,
      pinned,
      trash,
    }

    console.log(note)
  }

  const dispatch = createEventDispatcher()

  const closeForm = () => {
    notesStore.addNote(note)
    dispatch('close')
  }

  const togglePinned = () => {
    pinned = !pinned
  }

  onMount(() => titleContentEditable.focus())

  $: console.log($notesStore)
</script>

<div class="form">
  <ContentEditable bind:this={titleContentEditable} placeholder="Title" bind:value={title} />
  <hr class="sep" />
  <ContentEditable size="sm" placeholder="Body" bind:value={body} />
  <div class="actions">
    <div class="left">
      <IconButton
        name={pinned ? 'pinFull' : 'pin'}
        size="md"
        on:click={togglePinned}
        active={pinned}
      />
      <IconButton name="picture" size="md" />
      <IconButton name="tags" size="md" />
      <IconButton name="brush" size="md" />
    </div>
    <div class="right">
      <button class="close-button" on:click={closeForm}>Close</button>
    </div>
  </div>
</div>

<style lang="scss">
  .form {
    padding: 0 1rem;
    width: 100%;
    border: 1px solid var(--theme-primary-500);
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
    border-radius: var(--rounded);
    font-size: var(--text-sm);
    transition: all 0.15s ease-out;

    &:hover {
      background-color: var(--theme-primary-700);
    }
  }
</style>
