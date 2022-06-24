<script lang="ts">
  import { onMount, getContext, createEventDispatcher } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import Button from '$lib/components/Button.svelte'
  import EditableTask from '$lib/components/EditableTask.svelte'
  import Field from '$lib/components/Field.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import FormContextMenus from '$lib/components/contextmenus/FormContextMenus.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
  import TaskList from '$lib/components/grids/TaskList.svelte'
  import firestore from '$lib/firebase/firestore'
  import { themeKey } from '$lib/consts'
  import { ContextMenuType } from '$lib/enums'
  import {
    getItemById,
    isEmptyList,
    lastTaskInListIsEmptyTask,
    createEmptyList,
    createEmptyTask,
    getFilteredTasks,
  } from '$lib/helpers'
  import { uiState, listsState } from '$lib/state'
  import type { List, Task } from '$lib/types'

  let titleField: Field
  let list: List = createEmptyList(),
    editingList = getItemById($listsState.lists, $listsState.currentListId)

  if (editingList) list = { ...editingList }

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node) {
      const style = getComputedStyle(node)
      const transform = style.transform === 'none' ? '' : style.transform

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      }
    },
  })

  const _addTask = () => {
    if (lastTaskInListIsEmptyTask(list)) return
    const task = createEmptyTask()
    list.tasks = [...list.tasks, task]
  }

  const _deleteTask = (id: string) => {
    list.tasks = list.tasks.filter((l) => l.id !== id)
  }

  const togglePinned = () => {
    list.pinned = !list.pinned
  }

  const { addList, updateList, setCurrentList } = listsState
  const { closeAllModals, toggleContextMenu } = uiState

  const _toggleContextMenu = (type: ContextMenuType, id: string) => (e: MouseEvent) => {
    setCurrentList(id)
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(type, {
      x: rect.x,
      y: rect.y + rect.height,
    })
  }

  const dispatch = createEventDispatcher()
  const handleSubmit = async () => {
    closeAllModals()
    dispatch('close')
    if (isEmptyList(list) || lastTaskInListIsEmptyTask(list)) return
    if (editingList) {
      await firestore.updateList(list)
      updateList(list.id, list)
    } else {
      await firestore.addList(list)
      addList(list)
    }
    setCurrentList('')
  }

  let undoneTasks: Task[], doneTasks: Task[]
  $: ({ undoneTasks, doneTasks } = getFilteredTasks(list))

  onMount(() => titleField?.focus())

  const { getBrushPalette } = getContext(themeKey)
  const brushPalette = getBrushPalette()
</script>

<div class="form">
  <Field bind:this={titleField} name="Title" placeholder="Title" bind:value={list.title} />
  {#if undoneTasks.length}
    <TaskList>
      {#each undoneTasks as task (task.id)}
        <div in:receive|local={{ key: task.id }} out:send|local={{ key: task.id }} animate:flip>
          <EditableTask bind:task handleDelete={() => _deleteTask(task.id)} alt={!!list.color} />
        </div>
      {/each}
    </TaskList>
  {/if}
  <button class="add" on:click={_addTask}>
    <Icon name="plus" width={16} height={16} />
    <span>Add a task</span>
  </button>
  {#if doneTasks.length}
    <TaskList>
      <p>{doneTasks.length} tasks done</p>
      {#each doneTasks as task (task.id)}
        <div in:receive|local={{ key: task.id }} out:send|local={{ key: task.id }} animate:flip>
          <EditableTask bind:task handleDelete={() => _deleteTask(task.id)} alt={!!list.color} />
        </div>
      {/each}
    </TaskList>
  {/if}
  <TagPillGrid ids={list.tagIds} />
  <div class="actions">
    <div class="left">
      <IconButton
        name={list.pinned ? 'pinFull' : 'pin'}
        size="md"
        active={list.pinned}
        on:click={togglePinned}
      />
      <IconButton name="picture" size="md" />
      <IconButton
        name="tags"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Tags, list.id)(e)}
      />
      <IconButton
        name="brush"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Background, list.id)(e)}
      />
    </div>
    <div class="right">
      <Button on:click={handleSubmit}>{isEmptyList(list) ? 'Close' : 'Save'}</Button>
    </div>
  </div>
</div>

<FormContextMenus bind:ids={list.tagIds} bind:color={list.color} />

<style lang="scss">
  .form {
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    border-radius: var(--rounded);
  }

  .add {
    cursor: pointer;
    padding: 0.375rem 0.5rem;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }
</style>
