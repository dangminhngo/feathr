<script lang="ts">
  import { onMount, getContext } from 'svelte'
  import { goto } from '$app/navigation'

  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import EditableTask from '$lib/components/EditableTask.svelte'
  import TagPillList from '$containers/TagPillList.svelte'
  import TagsContextMenu from '$containers/TagsContextMenu.svelte'
  import BrushContextMenu from '$containers/BrushContextMenu.svelte'
  import { themeKey } from '$lib/theming/themes'
  import { ContextMenuType } from '$lib/enums'

  import {
    getItemById,
    isEmptyTaskList,
    lastTaskInTaskListIsEmptyTask,
    createEmptyTaskList,
    createEmptyTask,
    getFilteredTasks,
  } from '$lib/helpers'
  import { uiStore, taskListsStore } from '$lib/stores'
  import type { TaskList, Task } from '$lib/types'

  let titleContentEditable: ContentEditable
  let taskList: TaskList = createEmptyTaskList(),
    editingTaskList = getItemById($taskListsStore.taskLists, $taskListsStore.currentTaskListId)

  if (editingTaskList) taskList = { ...editingTaskList }

  const _addTask = () => {
    if (lastTaskInTaskListIsEmptyTask(taskList)) return
    const task = createEmptyTask()
    taskList.tasks = [...taskList.tasks, task]
  }

  const _deleteTask = (id: string) => {
    taskList.tasks = taskList.tasks.filter((t) => t.id !== id)
  }

  const togglePinned = () => {
    taskList.pinned = !taskList.pinned
  }

  const { addTaskList, updateTaskList, setCurrentTaskList } = taskListsStore
  const { closeForm, closeAllModals, toggleContextMenu } = uiStore

  const _toggleContextMenu = (type: ContextMenuType, id: string) => (e: MouseEvent) => {
    setCurrentTaskList(id)
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(type, {
      x: rect.x,
      y: rect.y + rect.height,
    })
  }

  const handleSubmit = () => {
    closeForm()
    closeAllModals()
    if (isEmptyTaskList(taskList) || lastTaskInTaskListIsEmptyTask(taskList)) return
    if (editingTaskList) updateTaskList(taskList.id, taskList)
    else {
      addTaskList(taskList)
    }
    setCurrentTaskList('')
    goto('/app/tasks')
  }

  let undoneTasks: Task[], doneTasks: Task[]
  $: ({ undoneTasks, doneTasks } = getFilteredTasks(taskList))

  onMount(() => titleContentEditable?.focus())

  const { getBrushPalette } = getContext(themeKey)
  const brushPalette = getBrushPalette()
</script>

<div
  class="form"
  style="background-color: {taskList.color ? brushPalette[taskList.color] : 'transparent'};"
>
  <ContentEditable
    bind:this={titleContentEditable}
    placeholder="Title"
    bind:value={taskList.title}
  />
  {#each undoneTasks as task (task.id)}
    <EditableTask bind:task handleDelete={() => _deleteTask(task.id)} alt={!!taskList.color} />
  {/each}
  <button class="add" on:click={_addTask}>
    <Icon name="plus" width={16} height={16} />
    <span>Add a task</span>
  </button>
  {#if doneTasks.length !== 0}
    <p>{doneTasks.length} tasks done</p>
  {/if}
  {#each doneTasks as task (task.id)}
    <EditableTask bind:task handleDelete={() => _deleteTask(task.id)} alt={!!taskList.color} />
  {/each}
  <TagPillList ids={taskList.tagIds} />
  <div class="actions">
    <div class="left">
      <IconButton
        name={taskList.pinned ? 'pinFull' : 'pin'}
        size="md"
        active={taskList.pinned}
        on:click={togglePinned}
      />
      <IconButton name="picture" size="md" />
      <IconButton
        name="tags"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Tags, taskList.id)(e)}
      />
      <IconButton
        name="brush"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Brush, taskList.id)(e)}
      />
    </div>
    <div class="right">
      <button class="close-button" on:click={handleSubmit}
        >{isEmptyTaskList(taskList) ? 'Close' : 'Save'}</button
      >
    </div>
  </div>
</div>

{#if $uiStore.contextMenu.tags}
  <TagsContextMenu bind:ids={taskList.tagIds} />
{/if}

{#if $uiStore.contextMenu.brush}
  <BrushContextMenu bind:color={taskList.color} />
{/if}

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
    font-weight: 500;
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  .add:hover {
    background-color: var(--theme-primary-700);
  }

  p {
    padding: 0.25rem 0;
    font-size: var(--text-sm);
    color: var(--theme-primary-300);
  }

  .actions {
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    font-weight: 700;
    transition: all 0.15s ease-out;

    &:hover {
      background-color: var(--theme-primary-50);
      color: var(--theme-primary-900);
    }
  }
</style>
