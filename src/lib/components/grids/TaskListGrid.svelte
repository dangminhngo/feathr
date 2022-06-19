<script lang="ts">
  import TaskListCard from '$lib/components/items/TaskListCard.svelte'
  import { uiStore, taskListsStore } from '$lib/stores'
  import { filterItems } from '$lib/helpers'
  import type { TaskList } from '$lib/types'
  import { ModalType } from '$lib/enums'

  export let taskLists: TaskList[] = []
  $: filteredTaskLists = filterItems(taskLists)

  const { setCurrentTaskList, togglePinnedTaskList, assignTrashToTaskList } = taskListsStore
  const { openModal } = uiStore

  const openEditTaskListForm = (id: string) => {
    setCurrentTaskList(id)
    openModal(ModalType.TaskList)
  }
</script>

<div class="grid">
  {#each filteredTaskLists as taskList (taskList.id)}
    <TaskListCard
      bind:taskList
      active={$taskListsStore.currentTaskListId === taskList.id}
      on:click={() => openEditTaskListForm(taskList.id)}
      handlePinned={() => togglePinnedTaskList(taskList.id)}
      handleTrash={() => assignTrashToTaskList(taskList.id)}
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
