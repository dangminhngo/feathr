<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'
  import ListCard from '$lib/components/items/ListCard.svelte'
  import EmptyGrid from './EmptyGrid.svelte'
  import firestore from '$lib/firebase/firestore'
  import { uiState, notesState, listsState } from '$lib/state'
  import { ModalType } from '$lib/enums'
  import type { Note, List } from '$lib/types'

  export let items: (Note | List)[] = []
  const { setCurrentNote, togglePinnedNote, assignTrashToNote } = notesState
  const { setCurrentList, togglePinnedList, assignTrashToList } = listsState
  const { openModal } = uiState

  const _openEditNoteForm = (id: string) => {
    setCurrentNote(id)
    openModal(ModalType.Note)
  }

  const _openEditListForm = (id: string) => {
    setCurrentList(id)
    openModal(ModalType.List)
  }

  const _togglePinnedNote = async (id: string, pinned: boolean) => {
    await firestore.updateNote(id, { pinned: !pinned })
    togglePinnedNote(id)
  }

  const _assignTrashToNote = async (id: string) => {
    await firestore.updateNote(id, { trash: true })
    assignTrashToNote(id)
  }

  const _togglePinnedList = async (id: string, pinned: boolean) => {
    await firestore.updateList(id, { pinned: !pinned })
    togglePinnedList(id)
  }

  const _assignTrashToList = async (id: string) => {
    await firestore.updateList(id, { trash: true })
    assignTrashToList(id)
  }
</script>

{#if items.length > 0}
  <div class="search-grid" class:grid={!$uiState.listView} class:list={$uiState.listView}>
    {#each items as item (item.id)}
      {#if 'tasks' in item}
        <ListCard
          list={item}
          active={$listsState.currentListId === item.id}
          on:click={() => _openEditListForm(item.id)}
          handlePinned={() => _togglePinnedList(item.id, item.pinned)}
          handleTrash={() => _assignTrashToList(item.id)}
        />
      {:else}
        <NoteCard
          note={item}
          active={$notesState.currentNoteId === item.id}
          on:click={() => _openEditNoteForm(item.id)}
          handlePinned={() => _togglePinnedNote(item.id, item.pinned)}
          handleTrash={() => _assignTrashToNote(item.id)}
        />
      {/if}
    {/each}
  </div>
{:else}
  <EmptyGrid type="search">
    <span slot="message"> No search results. Try another keyword. </span>
  </EmptyGrid>
{/if}

<style lang="scss">
  .search-grid {
    padding: 2rem 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }

  .list {
    margin: 0 auto;
    width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
