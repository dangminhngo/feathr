<script lang="ts">
  import type { Tag } from '$lib/types'
  export let tag: Tag
</script>

<div class="pill">
  {tag.label}
</div>

<style lang="scss">
  .pill {
    padding: 0.15rem 0.5rem;
    border: 1px solid var(--theme-primary-700);
    border-radius: var(--rounded-full);
    background-color: var(--theme-primary-800);
    color: var(--theme-primary-300);
    font-size: var(--text-xs);
    font-weight: 500;
  }
</style>
