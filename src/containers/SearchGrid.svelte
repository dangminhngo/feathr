<script lang="ts">
  import NoteCard from '$lib/components/NoteCard.svelte'
  import TaskListCard from '$lib/components/TaskListCard.svelte'
  import { uiStore, notesStore, taskListsStore } from '$lib/stores'
  import { ModalType } from '$lib/enums'
  import type { Note, TaskList } from '$lib/types'

  export let items: (Note | TaskList)[] = []
  const { setCurrentNote, togglePinnedNote, assignTrashToNote } = notesStore
  const { setCurrentTaskList, togglePinnedTaskList, assignTrashToTaskList } = taskListsStore
  const { openModal } = uiStore

  const openEditNoteForm = (id: string) => {
    setCurrentNote(id)
    openModal(ModalType.Note)
  }

  const openEditTaskListForm = (id: string) => {
    setCurrentTaskList(id)
    openModal(ModalType.TaskList)
  }
</script>

<div class="grid">
  {#each items as item (item.id)}
    {#if 'tasks' in item}
      <TaskListCard
        taskList={item}
        active={$taskListsStore.currentTaskListId === item.id}
        on:click={() => openEditTaskListForm(item.id)}
        handlePinned={() => togglePinnedTaskList(item.id)}
        handleTrash={() => assignTrashToTaskList(item.id)}
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
