<script lang="ts">
  import NoteCard from '$lib/components/items/NoteCard.svelte'
  import ListCard from '$lib/components/items/ListCard.svelte'
  import { uiStore, notesStore, listsStore } from '$lib/stores'
  import { ModalType } from '$lib/enums'
  import type { Note, List } from '$lib/types'

  export let items: (Note | List)[] = []
  const { setCurrentNote, togglePinnedNote, assignTrashToNote } = notesStore
  const { setCurrentList, togglePinnedList, assignTrashToList } = listsStore
  const { openModal } = uiStore

  const openEditNoteForm = (id: string) => {
    setCurrentNote(id)
    openModal(ModalType.Note)
  }

  const openEditListForm = (id: string) => {
    setCurrentList(id)
    openModal(ModalType.List)
  }
</script>

<div class="grid">
  {#each items as item (item.id)}
    {#if 'tasks' in item}
      <ListCard
        list={item}
        active={$listsStore.currentListId === item.id}
        on:click={() => openEditListForm(item.id)}
        handlePinned={() => togglePinnedList(item.id)}
        handleTrash={() => assignTrashToList(item.id)}
      />
    {:else}
      <NoteCard
        note={item}
        active={$notesStore.currentNoteId === item.id}
        on:click={() => openEditNoteForm(item.id)}
        handlePinned={() => togglePinnedNote(item.id)}
        handleTrash={() => assignTrashToNote(item.id)}
      />
    {/if}
  {/each}
</div>

<style lang="scss">
  .grid {
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(5, 20rem);
    gap: 1.5rem;
  }
</style>
