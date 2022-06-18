<script lang="ts">
  import { onMount } from 'svelte'
  import CheckBox from '$lib/components/CheckBox.svelte'
  import ContentEditable from '$lib/components/ContentEditable.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import type { Task } from '$lib/types'

  export let task: Task,
    editable = true,
    handleDelete: () => void = () => {
      /**/
    }
  let contentEditable: ContentEditable
  let showButton = false

  const handleMouseLeave = () => {
    showButton = false
  }

  const handleMouseEnter = () => {
    showButton = true
  }

  onMount(() => {
    contentEditable?.focus()
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
  <CheckBox bind:checked={task.done} />
  <ContentEditable bind:this={contentEditable} {editable} size="sm" bind:value={task.title} />
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
