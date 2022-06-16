<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import EditableTaskItem from '$lib/components/EditableTaskItem.svelte'

  import { clickOutside } from '$lib/helpers'
  import type { TaskItem } from '$lib/types'

  let titleContentEditable: ContentEditable

  let title = ''
  let tasks: TaskItem[] = [
    {
      id: '1',
      title: 'Task 1',
      done: false,
    },
    {
      id: '2',
      title: 'Task 2',
      done: false,
    },
    {
      id: '3',
      title: 'Task 3',
      done: true,
    },
    {
      id: '4',
      title: 'Task 4',
      done: true,
    },
  ]

  const dispatch = createEventDispatcher()

  const closeForm = () => {
    dispatch('close')
  }

  $: undoneTasks = tasks.filter((t) => !t.done)
  $: doneTasks = tasks.filter((t) => t.done)

  onMount(() => titleContentEditable.focus())
</script>

<div class="form" use:clickOutside on:outsideclick={closeForm}>
  <ContentEditable bind:this={titleContentEditable} placeholder="Title" value={title} />
  <hr class="sep" />
  {#each undoneTasks as task (task.id)}
    <EditableTaskItem title={task.title} done={task.done} />
  {/each}
  <div class="new">
    <Icon name="plus" width={16} height={16} />
    <ContentEditable size="sm" placeholder="Add a task" />
  </div>
  <p>{doneTasks.length} tasks done</p>
  {#each doneTasks as task (task.id)}
    <EditableTaskItem title={task.title} done={task.done} />
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
  }

  .new {
    padding-left: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
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
