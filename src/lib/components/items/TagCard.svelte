<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import Confirm from '$lib/components/Confirm.svelte'
  import type { Tag } from '$lib/types'

  export let tag: Tag, handleDelete: () => void

  let showButtons = false

  const handleMouseEnter = () => {
    showButtons = true
  }

  const handleMouseLeave = () => {
    showButtons = false
  }
</script>

<div class="tag" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} on:click>
  <span class="icon">
    <Icon name="tag" width={18} height={18} />
  </span>
  <div class="label">
    {tag.label}
  </div>
  <div class="actions" class:show={showButtons}>
    <Confirm let:confirm>
      <IconButton name="close" variant="none" on:click={() => confirm(handleDelete)} />
      <span slot="message">
        Do you want to delete tag "{tag.label}"?
      </span>
      <span slot="description">
        Tag "{tag.label}" will be removed from your notes and lists. This action cannot be undone.
      </span>
      <span slot="confirm"> Delete </span>
    </Confirm>
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
    background-color: var(--theme-bg-dim);
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
