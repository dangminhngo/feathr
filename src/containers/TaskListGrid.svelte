<script lang="ts">
  import TaskListCard from '$lib/components/TaskListCard.svelte'
  import { uiStore, taskListsStore } from '$lib/stores'
  import { filterItems } from '$lib/helpers'
  import type { TaskList } from '$lib/types'
  import { ModalType } from '$lib/enums'

  export let taskLists: TaskList[] = []
  $: filteredTaskLists = filterItems(taskLists)

  const { openModal } = uiStore
  const { setCurrentTaskList, togglePinnedTaskList, assignTaskListToTrash } = taskListsStore

  const openEditTaskListForm = (id: string) => {
    setCurrentTaskList(id)
    openModal(ModalType.TaskList)
  }

  $: console.log($taskListsStore)
</script>

<div class="grid">
  {#each filteredTaskLists as taskList (taskList.id)}
    <TaskListCard
      bind:taskList
      on:click={() => openEditTaskListForm(taskList.id)}
      handlePinned={() => togglePinnedTaskList(taskList.id)}
      handleDelete={() => assignTaskListToTrash(taskList.id)}
    />
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
