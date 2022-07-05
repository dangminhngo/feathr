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
  import Image from '$lib/components/Image.svelte'
  import ImageGrid from '$lib/components/ImageGrid.svelte'
  import UploadImageButton from '$lib/components/UploadImageButton.svelte'
  import FormContextMenus from '$lib/components/contextmenus/FormContextMenus.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
  import TaskList from '$lib/components/grids/TaskList.svelte'
  import firestore from '$lib/firebase/firestore'
  import storage from '$lib/firebase/storage'
  import { themeKey } from '$lib/consts'
  import { ContextMenuType } from '$lib/enums'
  import {
    getItemById,
    isEmptyList,
    lastTaskInListIsEmptyTask,
    createEmptyList,
    createEmptyTask,
    getFilteredTasks,
    reorderList,
  } from '$lib/helpers'
  import { uiState, listsState } from '$lib/state'
  import type { List, Task } from '$lib/types'

  let titleField: Field,
    dragHovering: number | null = null,
    draggableTaskId: string | null = null
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

  let uploadingImage = false

  const handleImageChange = async (e: Event) => {
    uploadingImage = true
    const files = (e.target as HTMLInputElement).files
    const urls = await storage.uploadImage(files)
    list.images = [...list.images, ...urls]
    uploadingImage = false
  }

  const dispatch = createEventDispatcher()
  const handleSubmit = async () => {
    closeAllModals()
    dispatch('close')
    if (isEmptyList(list) || lastTaskInListIsEmptyTask(list)) return
    if (editingList) {
      await firestore.updateList(list.id, list)
      updateList(list.id, list)
    } else {
      await firestore.addList(list)
      addList(list)
    }
    setCurrentList('')
  }

  const handleTaskDragStart = (e: DragEvent, index: number) => {
    if (!e.dataTransfer) {
      throw new Error('dataTransfer is null')
    }

    console.log(index)

    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.dropEffect = 'move'
    const start = index
    e.dataTransfer.setData('text/plain', String(start))
  }

  const handleTaskDrop = (e: DragEvent, target: number) => {
    if (!e.dataTransfer) {
      throw new Error('dataTransfer is null')
    }

    console.log(target)

    e.dataTransfer.dropEffect = 'move'
    const start = +e.dataTransfer.getData('text/plain')
    list.tasks = reorderList(list.tasks, start, target)
    dragHovering = null
  }

  type DraggingEvent = EditableTask['$$events_def']['signin']
  const handleTaskDragging = ({ detail }: DraggingEvent) => {
    draggableTaskId = detail.id
  }

  const handleTaskDragEnd = () => {
    draggableTaskId = null
  }

  let undoneTasks: Task[], doneTasks: Task[]
  $: ({ undoneTasks, doneTasks } = getFilteredTasks(list))

  const { getPalette } = getContext(themeKey)
  const palette = getPalette()

  onMount(() => titleField?.focus())

  $: console.log(list.tasks, dragHovering, draggableTaskId)
</script>

<div
  class="form"
  style="background-color: {list.color !== 'default' ? palette[list.color] : 'transparent'}"
>
  {#if list.images.length > 0}
    <ImageGrid>
      {#each list.images as image}
        <Image src={image} alt={list.id} />
      {/each}
    </ImageGrid>
  {/if}
  {#if uploadingImage}
    <p class="uploading-message">Uploading images ...</p>
  {/if}
  <Field bind:this={titleField} name="Title" placeholder="Title" bind:value={list.title} />
  {#if undoneTasks.length}
    <TaskList>
      {#each undoneTasks as task, index (task.id)}
        <div
          class="task-wrapper"
          draggable={draggableTaskId === task.id}
          class:hovering={dragHovering === index}
          in:receive|local={{ key: task.id }}
          out:send|local={{ key: task.id }}
          animate:flip
          on:dragover|preventDefault
          on:dragstart={(e) => handleTaskDragStart(e, index)}
          on:dragenter={() => (dragHovering = index)}
          on:drop|preventDefault={(e) => handleTaskDrop(e, index)}
          on:dragend={handleTaskDragEnd}
        >
          <EditableTask
            bind:task
            handleDelete={() => _deleteTask(task.id)}
            alt={!!list.color}
            on:dragging={handleTaskDragging}
          />
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
      <UploadImageButton on:change={handleImageChange} />
      <IconButton
        name="tags"
        size="md"
        on:click={(e) => _toggleContextMenu(ContextMenuType.Tags, list.id)(e)}
      />
      <IconButton
        name={list.color !== 'default' ? 'brushFull' : 'brush'}
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
    gap: 0.75rem;
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

  .uploading-message {
    font-size: var(--text-sm);
    font-weight: 700;
  }

  .task-wrapper.hovering {
    background-color: var(--theme-accent);
  }
</style>
