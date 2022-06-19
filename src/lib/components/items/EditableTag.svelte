<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import Field from '$lib/components/Field.svelte'
  import { clickOutside } from '$lib/helpers'
  import type { Tag } from '$lib/types'

  export let tag: Tag, handleDelete: () => void
  let input: Field,
    showButtons = false,
    editing = false

  const handleMouseEnter = () => {
    showButtons = true
  }

  const handleMouseLeave = () => {
    showButtons = false
  }

  const setEditing = () => {
    editing = true
    input?.focus()
  }

  const resetEditing = () => {
    editing = false
  }
</script>

<div
  class="tag"
  class:editing
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  use:clickOutside
  on:outsideclick={resetEditing}
>
  {#if showButtons}
    <IconButton name="close" size="md" on:click={handleDelete} />
  {:else}
    <span class="icon">
      <Icon name="tag" width={18} height={18} />
    </span>
  {/if}
  <div class="label">
    <Field bind:this={input} size="sm" editable={editing} bind:value={tag.label} />
  </div>
  <div class="actions" class:show={showButtons}>
    <IconButton
      name={editing ? 'pencilFull' : 'pencil'}
      size="md"
      on:click={editing ? resetEditing : setEditing}
    />
  </div>
</div>

<style lang="scss">
  .tag {
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: var(--rounded);
    font-size: var(--text-sm);
    transition: all 0.15s ease-out;
  }

  .tag:hover {
    background-color: var(--theme-primary-800);
    color: var(--theme-primary-100);
  }

  .tag.editing {
    cursor: text;
  }

  .icon {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .label {
    flex: 1;
    margin-left: 0.5rem;
  }

  .actions {
    margin-left: auto;
    display: flex;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: all 0.15s ease-out;
  }

  .actions.show {
    opacity: 1;
    pointer-events: all;
  }
</style>
