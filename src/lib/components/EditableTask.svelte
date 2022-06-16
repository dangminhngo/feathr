<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import CheckBox from '$lib/components/CheckBox.svelte'
  import ContentEditable from '$lib/components/ContentEditable.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import type { Task } from '$lib/types'

  const dispatch = createEventDispatcher()
  export let task: Task,
    editable = true,
    handleDelete: () => void = () => {
      /**/
    }
  let showButton = false

  const handleMouseLeave = () => {
    showButton = false
  }

  const handleMouseEnter = () => {
    showButton = true
  }

  const handleCheckBoxChange = () => {
    dispatch('toggle')
  }

  let { title, done } = task
</script>

<div class="task" class:done on:mouseleave={handleMouseLeave} on:mouseenter={handleMouseEnter}>
  <div class="draggable" class:show={showButton}>
    <Icon name="link" width={16} height={16} />
  </div>
  <CheckBox bind:checked={done} on:change={handleCheckBoxChange} />
  <ContentEditable {editable} size="sm" bind:value={title} />
  <div class="buttons" class:show={showButton}>
    <IconButton size="sm" name="close" on:click={handleDelete} />
  </div>
</div>

<style lang="scss">
  .task {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .task:not(:last-child) {
    border-bottom: 1px solid var(--theme-primary-800);
  }

  .task.done {
    text-decoration: line-through;
    color: var(--theme-primary-500);
  }

  .draggable {
    cursor: grabbing;
    opacity: 0;
    pointer-events: none;
    color: var(--theme-primary-400);
  }

  .buttons {
    opacity: 0;
    pointer-events: none;
    color: var(--theme-primary-400);
  }

  .draggable.show,
  .buttons.show {
    opacity: 1;
    pointer-events: all;
  }
</style>
