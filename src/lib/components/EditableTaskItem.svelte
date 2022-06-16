<script lang="ts">
  import CheckBox from '$lib/components/CheckBox.svelte'
  import ContentEditable from '$lib/components/ContentEditable.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import type { TaskItem } from '$lib/types'

  export let taskItem: TaskItem
  let showButton = false

  const handleMouseLeave = () => {
    showButton = false
  }

  const handleMouseEnter = () => {
    showButton = true
  }

  let { title, done } = taskItem
</script>

<div class="task-item" class:done on:mouseleave={handleMouseLeave} on:mouseenter={handleMouseEnter}>
  <div class="draggable" class:show={showButton}>
    <Icon name="link" width={16} height={16} />
  </div>
  <CheckBox bind:checked={done} />
  <ContentEditable size="sm" bind:value={title} />
  <div class="buttons" class:show={showButton}>
    <IconButton size="sm" name="close" />
  </div>
</div>

<style lang="scss">
  .task-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .task-item:not(:first-child) {
    border-bottom: 1px solid var(--theme-primary-700);
  }

  .task-item.done {
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
