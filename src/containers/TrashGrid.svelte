<script lang="ts">
  import NoteCard from '$lib/components/NoteCard.svelte'
  import TaskListCard from '$lib/components/TaskListCard.svelte'
  import { notesStore, taskListsStore } from '$lib/stores'
  import { filterTrashItems } from '$lib/helpers'

  const { deleteNote, unassignTrashToNote } = notesStore
  const { deleteTaskList, unassignTrashToTaskList } = taskListsStore

  const _deleteNote = (id: string) => {
    deleteNote(id)
  }

  const _deleteTaskList = (id: string) => {
    deleteTaskList(id)
  }

  const _unassignTrashToNote = (id: string) => {
    unassignTrashToNote(id)
  }

  const _unassignTrashToTaskList = (id: string) => {
    unassignTrashToTaskList(id)
  }

  $: trashItems = filterTrashItems($notesStore.notes, $taskListsStore.taskLists)
</script>

<div class="grid">
  {#each trashItems as item (item.id)}
    {#if 'tasks' in item}
      <TaskListCard
        taskList={item}
        handleRestore={() => _unassignTrashToTaskList(item.id)}
        handleDelete={() => _deleteTaskList(item.id)}
      />
    {:else}
      <NoteCard
        note={item}
        handleRestore={() => _unassignTrashToNote(item.id)}
        handleDelete={() => _deleteNote(item.id)}
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
