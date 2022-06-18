<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte'
  import TagPillList from '$containers/TagPillList.svelte'
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
</script>

<div
  class="note"
  class:trash={note.trash}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
>
  <div class="title">{note.title}</div>
  <div class="body">{note.body}</div>
  <TagPillList ids={note.tagIds} />
  <div class="buttons">
    <div class="left" class:pinned={note.pinned} class:show={buttonsShow} class:active>
      {#if !note.trash}
        <IconButton
          size="sm"
          name={note.pinned ? 'pinFull' : 'pin'}
          active={note.pinned}
          on:click={handlePinned}
        />
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
    border: 1px solid var(--theme-primary-600);
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
    color: var(--theme-primary-400);
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
