<script lang="ts">
  import { getContext } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  import IconButton from '$lib/components/IconButton.svelte'
  import EditableTask from '$lib/components/EditableTask.svelte'
  import TagPillGrid from '$lib/components/grids/TagPillGrid.svelte'
  import TaskList from '$lib/components/grids/TaskList.svelte'
  import firestore from '$lib/firebase/firestore'
  import { getFilteredTasks } from '$lib/helpers'
  import { themeKey } from '$lib/consts'
  import type { List, Task } from '$lib/types'

  export let list: List,
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

  const handleMouseEnter = () => (buttonsShow = true)
  const handleMouseLeave = () => (buttonsShow = false)

  let undoneTasks: Task[], doneTasks: Task[]
  $: ({ undoneTasks, doneTasks } = getFilteredTasks(list))

  const { getBrushPalette } = getContext(themeKey)
  const brushPalette = getBrushPalette()
  $: color = brushPalette[list.color]

  const _updateList = async () => {
    await firestore.updateList(list.id, list)
  }

  $: list, _updateList()
</script>

<div
  class="task-list"
  class:trash={list.trash}
  style="background-color: {color ?? 'transparent'}; border-color: {color ??
    'var(--theme-primary-700)'};"
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:click
>
  {#if list.title}
    <div class="title">{list.title}</div>
  {/if}
  <div class="tasks">
    <TaskList>
      {#if list.tasks.length > 0 && undoneTasks.length === 0}
        <div class="message">All tasks completed</div>
      {/if}
      {#each undoneTasks as task (task.id)}
        <div in:receive|local={{ key: task.id }} out:send|local={{ key: task.id }} animate:flip>
          <EditableTask editable={false} bind:task alt={!!list.color} />
        </div>
      {/each}
    </TaskList>
    {#if list.tasks.length === 0}
      <div class="message">No tasks</div>
    {:else}
      <hr class="sep" />
    {/if}
    <TaskList>
      {#if list.tasks.length > 0 && doneTasks.length === 0}
        <div class="message">No tasks completed</div>
      {/if}
      {#each doneTasks as task (task.id)}
        <div in:receive|local={{ key: task.id }} out:send|local={{ key: task.id }} animate:flip>
          <EditableTask editable={false} bind:task alt={!!list.color} />
        </div>
      {/each}
    </TaskList>
  </div>
  <TagPillGrid ids={list.tagIds} />
  <div class="buttons">
    <div class="left" class:pinned={list.pinned} class:show={buttonsShow} class:active>
      {#if !list.trash}
        <IconButton size="sm" name={list.pinned ? 'pinFull' : 'pin'} on:click={handlePinned} />
      {/if}
    </div>
    <div class="right" class:show={buttonsShow} class:active>
      {#if !list.trash}
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
    border-width: 1px;
    border-style: solid;
    border-radius: var(--rounded);
  }

  .task-list.trash > * {
    pointer-events: none;
  }

  .title {
    font-weight: 500;
  }

  .sep {
    border: 1px solid var(--theme-primary-400);
  }

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .message {
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
