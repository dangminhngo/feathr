<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import ContextMenu from '$containers/ContextMenu.svelte'
  import CheckGroup from '$lib/components/CheckGroup.svelte'
  import { uiStore, notesStore, tagsStore } from '$lib/stores'
  import { searchTags, clickOutside, createEmptyTag } from '$lib/helpers'

  let keyword = ''
  export let tagIds: string[] = []

  const { closeAllContextMenus } = uiStore
  const { setCurrentNote } = notesStore
  const { addTag } = tagsStore

  const handleCloseContextMenu = () => {
    setCurrentNote('')
    closeAllContextMenus()
  }

  const handleAddTagWithKeyword = () => {
    const tag = createEmptyTag()
    tag.label = keyword
    addTag(tag)
    keyword = ''
  }

  const toggleTagId = (id: string) => (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked
    if (!checked) {
      tagIds = tagIds.filter((tid) => tid !== id)
      return
    }

    tagIds = [...tagIds, id]
  }

  $: filteredTags = searchTags($tagsStore.tags, keyword)
  $: console.log(tagIds)
</script>

<ContextMenu>
  <div class="tags" use:clickOutside on:outsideclick={handleCloseContextMenu}>
    <div class="form">
      <input type="text" placeholder="Search tags ..." bind:value={keyword} />
      <span class="icon">
        <Icon name="search" width={16} height={16} />
      </span>
    </div>
    <div class="list">
      {#each filteredTags as tag (tag.id)}
        <CheckGroup checked={tagIds.includes(tag.id)} on:change={(e) => toggleTagId(tag.id)(e)}
          >{tag.label}</CheckGroup
        >
      {/each}
    </div>
    {#if !filteredTags.length}
      <button class="add" on:click={handleAddTagWithKeyword}>
        <Icon name="plus" width={16} height={16} />
        <span>Add <strong>{keyword}</strong></span>
      </button>
    {/if}
  </div>
</ContextMenu>

<style lang="scss">
  .tags {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form {
    margin: 0 0.5rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    border-radius: var(--rounded);
    background-color: var(--theme-primary-900);
    font-size: var(--text-sm);
  }

  .icon {
    color: var(--theme-primary-400);
  }

  .add {
    cursor: pointer;
    align-self: flex-start;
    margin: 0 0.5rem;
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    font-size: var(--text-sm);
  }
</style>
