<script lang="ts">
  import TagPill from '$lib/components/items/TagPill.svelte'
  import { tagsState } from '$lib/state'
  import { getTags } from '$lib/helpers'

  export let ids: string[] = []

  $: tags = getTags($tagsState.tags, ids)
</script>

{#if tags.length > 0}
  <div class="tag-list">
    {#each tags as tag (tag.id)}
      <TagPill {tag} />
    {/each}
  </div>
{/if}

<style lang="scss">
  .tag-list {
    padding: 0.5rem 0;
    display: flex;
    gap: 0.5rem;
  }
</style>
