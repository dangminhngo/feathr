<script lang="ts">
  import { getContext } from 'svelte'

  import IconButton from '$lib/components/IconButton.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
  import ImageGrid from '$lib/components/ImageGrid.svelte'
  import Image from '$lib/components/Image.svelte'
  import Confirm from '$lib/components/Confirm.svelte'
  import { themeKey } from '$lib/consts'
  import type { Note } from '$lib/types'
  export let note: Note,
    active = false,
    handlePinned: () => void = () => {
      /**/
    },
    handleTrash: () => void = () => {
      /**/
    },
    handleRestore: () => void = () => {
      /**/
    },
    handleDelete: () => void = () => {
      /**/
    }

  let buttonsShow = false

  const handleMouseEnter = () => (buttonsShow = true)
  const handleMouseLeave = () => (buttonsShow = false)

  const { getPalette } = getContext(themeKey)
  const palette = getPalette()
  $: color = palette[note.color]
</script>

<div
  class="note"
  class:trash={note.trash}
  style="background-color: {color ?? 'transparent'}; border-color: {color ?? 'var(--theme-sep)'};"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
>
  <ImageGrid cols={2}>
    {#each note.images as image}
      <Image src={image} alt={note.title} />
    {/each}
  </ImageGrid>
  <div class="title">{note.title}</div>
  <div class="body">{note.body}</div>
  <TagPillGrid itemId={note.id} ids={note.tagIds} />
  <div class="buttons">
    <div class="left" class:pinned={note.pinned} class:show={buttonsShow} class:active>
      {#if !note.trash}
        <IconButton size="sm" name={note.pinned ? 'pinFull' : 'pin'} on:click={handlePinned} />
      {/if}
    </div>
    <div class="right" class:show={buttonsShow} class:active>
      {#if !note.trash}
        <IconButton size="sm" name="trash" on:click={handleTrash} />
      {:else}
        <IconButton size="sm" name="redo" on:click={handleRestore} />
        <Confirm let:confirm>
          <IconButton size="sm" name="trashFull" on:click={() => confirm(handleDelete)} />
          <span slot="message"> Are you sure to delete this note? </span>
          <span slot="description">
            This note will be permanently deleted and cannot be undone.
          </span>
          <span slot="confirm"> Delete </span>
        </Confirm>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .note {
    flex: 0 0 20rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.75rem;
    border-width: 1px;
    border-style: solid;
    border-radius: var(--rounded);
  }

  .note.trash > * {
    pointer-events: none;
  }

  .title {
    font-weight: 500;
  }

  .body {
    font-size: var(--text-sm);
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.15s ease-out;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
  }

  .left.pinned,
  .left.active,
  .right.active {
    opacity: 1;
    pointer-events: all;
  }

  .left.show,
  .right.show {
    opacity: 1;
    pointer-events: all;
  }
</style>
