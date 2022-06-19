<script lang="ts">
  import { getContext } from 'svelte'

  import IconButton from '$lib/components/IconButton.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
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

  const { getBrushPalette } = getContext(themeKey)
  const brushPalette = getBrushPalette()
</script>

<div
  class="note"
  class:trash={note.trash}
  style="background-color: {note.color
    ? brushPalette[note.color]
    : 'transparent'}; border-color: {note.color
    ? brushPalette[note.color]
    : 'var(--theme-primary-700)'};"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
>
  <div class="title">{note.title}</div>
  <div class="body">{note.body}</div>
  <TagPillGrid ids={note.tagIds} />
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
        <IconButton size="sm" name="beer" on:click={handleRestore} />
        <IconButton size="sm" name="deleteFull" on:click={handleDelete} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .note {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
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
