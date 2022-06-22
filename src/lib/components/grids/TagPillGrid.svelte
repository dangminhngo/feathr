<script lang="ts">
  import TagPill from '$lib/components/items/TagPill.svelte'
  import { tagsState } from '$lib/state'
  import { getTags } from '$lib/helpers'

  export let ids: string[] = []

  $: tags = getTags($tagsState.tags, ids)
</script>

<div class="tag-list">
  {#each tags as tag (tag.id)}
    <TagPill {tag} />
  {/each}
</div>

<style lang="scss">
  .tag-list {
    display: flex;
    gap: 0.5rem;
  }
</style>
