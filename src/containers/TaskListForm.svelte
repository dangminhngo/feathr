<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import EditableTask from '$lib/components/EditableTask.svelte'

  import {
    createEmptyTaskList,
    getFilteredTasks,
    addTask,
    removeTask,
    clickOutside,
  } from '$lib/helpers'
  import type { TaskList, Task } from '$lib/types'

  let titleContentEditable: ContentEditable
  let taskList: TaskList = createEmptyTaskList()

  const dispatch = createEventDispatcher()

  const handleAddTask = () => {
    taskList = addTask(taskList)
  }

  const handleDeleteTask = (id: string) => {
    taskList = removeTask(taskList, id)
  }

  const closeForm = () => {
    dispatch('close')
  }

  let undoneTasks: Task[], doneTasks: Task[]
  $: ({ undoneTasks, doneTasks } = getFilteredTasks(taskList))

  onMount(() => titleContentEditable.focus())
</script>

<div class="form" use:clickOutside on:outsideclick={closeForm}>
  <ContentEditable bind:this={titleContentEditable} placeholder="Title" value={taskList.title} />
  <hr class="sep" />
  {#each undoneTasks as task (task.id)}
    <EditableTask {task} handleDelete={() => handleDeleteTask(task.id)} />
  {/each}
  <button class="add" on:click={handleAddTask}>
    <Icon name="plus" width={16} height={16} />
    <span>Add a task</span>
  </button>
  {#if doneTasks.length !== 0}
    <p>{doneTasks.length} tasks done</p>
  {/if}
  {#each doneTasks as task (task.id)}
    <EditableTask {task} handleDelete={() => handleDeleteTask(task.id)} />
  {/each}
  <div class="actions">
    <div class="left">
      <IconButton name="pin" size="md" />
      <IconButton name="picture" size="md" />
      <IconButton name="tags" size="md" />
      <IconButton name="brush" size="md" />
    </div>
    <div class="right">
      <button class="close-button" on:click={closeForm}>Close</button>
    </div>
  </div>
</div>

<style lang="scss">
  .form {
    padding: 0 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .add {
    cursor: pointer;
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: var(--text-sm);
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  .add:hover {
    background-color: var(--theme-primary-700);
  }

  p {
    padding-top: 0.75rem;
    padding-bottom: 0.25rem;
    font-size: var(--text-sm);
    color: var(--theme-primary-300);
  }

  .sep {
    border-color: var(--theme-primary-500);
  }

  .actions {
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--theme-primary-400);
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }

  .close-button {
    cursor: pointer;
    padding: 0 0.5rem;
    height: 2rem;
    border-radius: var(--rounded);
    font-size: var(--text-sm);
    transition: all 0.15s ease-out;

    &:hover {
      background-color: var(--theme-primary-700);
    }
  }
</style>
