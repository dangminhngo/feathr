<script lang="ts">
  import TagLine from '$lib/components/TagLine.svelte'
  import { tagsStore } from '$lib/stores'
  import { filterTags } from '$lib/helpers'

  const { deleteTag } = tagsStore

  const _deleteTag = (id: string) => {
    deleteTag(id)
  }

  $: filteredTags = filterTags($tagsStore.tags)
  $: console.log($tagsStore)
</script>

<div class="tag-list">
  {#each Object.keys(filteredTags) as key}
    <div class="key">
      <p class="character">{key}</p>
      {#each filteredTags[key] as tag (tag.id)}
        <TagLine bind:tag handleDelete={() => _deleteTag(tag.id)} />
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .tag-list {
    margin: 0 auto;
    margin-top: 2rem;
    width: 30rem;
  }

  .key:not(:first-child) {
    margin-top: 1.5rem;
  }

  .character {
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--theme-primary-800);
    color: var(--theme-primary-600);
  }
</style>
