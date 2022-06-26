<script lang="ts">
  import type { Tag } from '$lib/types'
  export let tag: Tag
</script>

<div class="pill">
  {tag.label}
</div>

<style lang="scss">
  .pill {
    cursor: pointer;
    padding: 0.15rem 0.5rem;
    border-radius: var(--rounded);
    background-color: var(--theme-primary-50);
    color: var(--theme-primary-800);
    font-size: var(--text-xs);
    font-weight: 500;
  }
</style>
