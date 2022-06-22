<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import TrashGrid from '$lib/components/grids/TrashGrid.svelte'
  import { notesState, listsState } from '$lib/state'
  import { isEmptyTrash } from '$lib/helpers'

  const { emptyTrashNotes } = notesState
  const { emptyTrashLists } = listsState

  const handleEmptyTrash = () => {
    emptyTrashNotes()
    emptyTrashLists()
  }
</script>

<div class="message">
  {#if isEmptyTrash($notesState.notes, $listsState.lists)}
    <span>Your trash is empty.</span>
  {:else}
    <span>All stuff in trash will be deleted in 7 days.</span>
    <button class="empty" on:click={handleEmptyTrash}>
      <Icon name="deleteFull" />
      <span>Empty Trash</span>
    </button>
  {/if}
</div>
<TrashGrid />

<style lang="scss">
  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  .empty {
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: var(--theme-primary-700);
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  .empty:hover {
    background-color: var(--theme-accent);
  }
</style>
