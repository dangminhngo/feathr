<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte'
  import EditableTask from '$lib/components/EditableTask.svelte'
  import { getFilteredTasks } from '$lib/helpers'
  import type { TaskList, Task } from '$lib/types'

  export let taskList: TaskList,
    active = false,
    handlePinned: () => void = () => {
      /**/
    },
    handleTrash: () => void = () => {
      /**/
    },
    handleRestore: () => void = () => {
      /**/
    },
    handleDelete: () => void = () => {
      /**/
    }

  let buttonsShow = false

  const handleMouseEnter = () => (buttonsShow = true)
  const handleMouseLeave = () => (buttonsShow = false)

  let undoneTasks: Task[], doneTasks: Task[]
  $: ({ undoneTasks, doneTasks } = getFilteredTasks(taskList))
</script>

<div
  class="task-list"
  class:trash={taskList.trash}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
>
  {#if taskList.title}
    <div class="title">{taskList.title}</div>
  {/if}
  <div class="tasks">
    {#if undoneTasks.length === 0}
      <div class="message">All tasks completed</div>
    {/if}
    {#each undoneTasks as task (task.id)}
      <EditableTask editable={false} bind:task />
    {/each}
    <hr class="sep" />
    {#if doneTasks.length === 0}
      <div class="message">No tasks completed</div>
    {/if}
    {#each doneTasks as task (task.id)}
      <EditableTask editable={false} bind:task />
    {/each}
  </div>
  <div class="buttons">
    <div class="left" class:pinned={taskList.pinned} class:show={buttonsShow} class:active>
      {#if !taskList.trash}
        <IconButton
          size="sm"
          name={taskList.pinned ? 'pinFull' : 'pin'}
          active={taskList.pinned}
          on:click={handlePinned}
        />
      {/if}
    </div>
    <div class="right" class:show={buttonsShow} class:active>
      {#if !taskList.trash}
        <IconButton size="sm" name="trash" on:click={handleTrash} />
      {:else}
        <IconButton size="sm" name="beer" on:click={handleRestore} />
        <IconButton size="sm" name="deleteFull" on:click={handleDelete} />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  .task-list {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--theme-primary-600);
    border-radius: var(--rounded);
  }

  .task-list.trash > * {
    pointer-events: none;
  }

  .title {
    font-weight: 500;
  }

  .sep {
    border-color: var(--theme-primary-600);
  }

  .message {
    padding: 0.75rem 0;
    font-size: var(--text-sm);
    color: var(--theme-primary-400);
  }

  .buttons {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.15s ease-out;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    color: var(--theme-primary-400);
    opacity: 0;
    pointer-events: none;
  }

  .left.pinned,
  .left.active,
  .right.active {
    opacity: 1;
    pointer-events: all;
  }

  .left.show,
  .right.show {
    opacity: 1;
    pointer-events: all;
  }
</style>
