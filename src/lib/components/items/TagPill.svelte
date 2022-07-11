<script lang="ts">
  import Confirm from '$lib/components/Confirm.svelte'
  import Icon from '$lib/components/Icon.svelte'
  import type { Tag } from '$lib/types'
  export let tag: Tag, handleRemove: () => void
</script>

<div class="pill">
  <span>{tag.label}</span>
  <Confirm let:confirm>
    <button on:click|stopPropagation={() => confirm(handleRemove)}>
      <Icon name="close" size={16} />
    </button>
    <span slot="message"> Are you sure to remove this tag? </span>
    <span slot="description"> This tag will be removed from this item and cannot be undone. </span>
    <span slot="confirm"> Delete </span>
  </Confirm>
</div>

<style lang="scss">
  .pill {
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: var(--rounded);
    background-color: var(--theme-fg);
    color: var(--theme-bg);
    font-size: var(--text-xs);
    font-weight: 500;
    overflow: hidden;
  }

  button {
    cursor: pointer;
    transition: color 0.15s ease-out;
  }

  button:hover {
    color: var(--theme-danger);
  }
</style>
