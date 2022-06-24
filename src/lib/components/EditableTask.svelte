<script lang="ts">
  import { onMount } from 'svelte'
  import Checkbox from './Checkbox.svelte'
  import Icon from './Icon.svelte'
  import IconButton from './IconButton.svelte'
  import type { Task } from '$lib/types'

  export let task: Task,
    editable = true,
    alt = false,
    handleDelete: () => void = () => {
      /**/
    }
  let titleField: HTMLInputElement,
    showButton = false

  const handleMouseLeave = () => {
    showButton = false
  }

  const handleMouseEnter = () => {
    showButton = true
  }

  onMount(() => {
    titleField?.focus()
  })
</script>

<div
  class="task"
  class:done={task.done}
  on:mouseleave={handleMouseLeave}
  on:mouseenter={handleMouseEnter}
>
  {#if editable}
    <div class="draggable" class:show={showButton}>
      <Icon name="link" width={16} height={16} />
    </div>
  {/if}
  <Checkbox bind:checked={task.done} {alt} />
  {#if editable}
    <input
      class="field"
      bind:this={titleField}
      type="text"
      placeholder="Enter your task"
      bind:value={task.title}
    />
  {:else}
    <span class="field">{task.title}</span>
  {/if}
  {#if editable}
    <div class="buttons" class:show={showButton}>
      <IconButton size="sm" name="close" on:click={handleDelete} />
    </div>
  {/if}
</div>

<style lang="scss">
  .task {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .task.done {
    text-decoration: line-through;
    color: var(--theme-primary-300);
  }

  .draggable {
    cursor: grabbing;
    opacity: 0;
    pointer-events: none;
    color: var(--theme-primary-400);
  }

  .field {
    flex: 1;
    font-size: var(--text-sm);
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
