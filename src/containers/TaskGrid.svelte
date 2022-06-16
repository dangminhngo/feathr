<script lang="ts">
  import TaskCard from '$lib/components/TaskCard.svelte'
  import { uiStore, tasksStore } from '$lib/stores'
  import { filterItems } from '$lib/helpers'
  import type { Task } from '$lib/types'

  export let tasks: Task[] = []
  $: filteredTasks = filterItems(tasks)

  const { openModal } = uiStore
  const { setCurrentTask, togglePinnedTask, assignTaskToTrash } = tasksStore

  const openEditTaskForm = (id: string) => {
    setCurrentTask(id)
    openModal('note')
  }

  $: console.log($tasksStore)
</script>

<div class="grid">
  {#each filteredTasks as task (task.id)}
    <TaskCard
      {task}
      on:click={() => openEditTaskForm(task.id)}
      handlePinned={() => togglePinnedTask(task.id)}
      handleDelete={() => assignTaskToTrash(task.id)}
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
