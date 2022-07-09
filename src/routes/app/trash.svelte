<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import TrashGrid from '$lib/components/grids/TrashGrid.svelte'
  import Confirm from '$lib/components/Confirm.svelte'
  import firestore from '$lib/firebase/firestore'
  import { notesState, listsState } from '$lib/state'
  import { isEmptyTrash } from '$lib/helpers'

  const { emptyTrashNotes } = notesState
  const { emptyTrashLists } = listsState

  const handleEmptyTrash = async () => {
    await firestore.emptyTrash()
    emptyTrashNotes()
    emptyTrashLists()
  }
</script>

<div class="message">
  {#if isEmptyTrash($notesState.notes, $listsState.lists)}
    <span>Your trash is empty.</span>
  {:else}
    <span>All stuff in trash will be deleted in 7 days.</span>
    <Confirm let:confirm>
      <button class="empty" on:click={() => confirm(handleEmptyTrash)}>
        <Icon name="deleteFull" />
        <span>Empty Trash</span>
      </button>
      <span slot="message"> Are you sure to empty your trash? </span>
      <span slot="description">
        This action will delete permanently all items in your trash and cannot be undone.
      </span>
      <span slot="confirm"> Empty trash </span>
    </Confirm>
  {/if}
</div>
<TrashGrid />

<style lang="scss">
  .message {
    padding: 0.5rem 1rem;
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
    border-radius: var(--rounded);
    border: 1px solid var(--clr-danger);
    color: var(--clr-danger);
    font-weight: 500;
    font-size: var(--text-sm);
    transition: background-color 0.15s ease-out;
  }
</style>
