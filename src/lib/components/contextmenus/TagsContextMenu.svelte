<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import ContextMenuWrapper from './ContextMenuWrapper.svelte'
  import CheckboxField from './CheckboxField.svelte'
  import firestore from '$lib/firebase/firestore'
  import { uiState, notesState, tagsState } from '$lib/state'
  import { searchTags, clickOutside, createEmptyTag } from '$lib/helpers'

  let keyword = ''
  export let ids: string[] = []

  const { closeAllContextMenus } = uiState
  const { setCurrentNote } = notesState
  const { addTag } = tagsState

  const handleCloseContextMenu = () => {
    setCurrentNote('')
    closeAllContextMenus()
  }

  const handleAddTagWithKeyword = async () => {
    const tag = createEmptyTag()
    tag.label = keyword
    firestore.addTag(tag)
    addTag(tag)
    keyword = ''
  }

  const toggleTagId = (id: string) => (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked
    if (!checked) {
      ids = ids.filter((tid) => tid !== id)
      return
    }

    ids = [...ids, id]
  }

  $: filteredTags = searchTags($tagsState.tags, keyword)
</script>

<ContextMenuWrapper>
  <div class="tags" use:clickOutside on:outsideclick={handleCloseContextMenu}>
    <div class="form">
      <input type="text" placeholder="Search tags ..." bind:value={keyword} />
      <span class="icon">
        <Icon name="search" width={16} height={16} />
      </span>
    </div>
    <div class="list">
      {#each filteredTags as tag (tag.id)}
        <CheckboxField checked={ids.includes(tag.id)} on:change={(e) => toggleTagId(tag.id)(e)}>
          {tag.label}
        </CheckboxField>
      {/each}
    </div>
    {#if !filteredTags.length && keyword}
      <button class="add" on:click={handleAddTagWithKeyword}>
        <Icon name="plus" width={16} height={16} />
        <span>Add <strong>{keyword}</strong></span>
      </button>
    {/if}
  </div>
</ContextMenuWrapper>

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
