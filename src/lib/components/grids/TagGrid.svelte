<script lang="ts">
  import TagCard from '$lib/components/items/TagCard.svelte'
  import firestore from '$lib/firebase/firestore'
  import { uiState, tagsState } from '$lib/state'
  import { filterTags } from '$lib/helpers'
  import { ModalType } from '$lib/enums'

  const { setCurrentTag, deleteTag } = tagsState
  const { openModal, notify } = uiState

  const _deleteTag = async (id: string) => {
    await firestore.deleteTag(id)
    deleteTag(id)
    notify('A tag has been deleted')
  }

  const _openTagFormModal = (id: string) => {
    setCurrentTag(id)
    openModal(ModalType.Tag)
  }

  $: filteredTags = filterTags($tagsState.tags)
</script>

<div class="tag-list">
  {#each filteredTags as { character, tags } (character)}
    <div class="key">
      <p class="character">{character}</p>
      {#each tags as tag (tag.id)}
        <TagCard
          bind:tag
          on:click={() => _openTagFormModal(tag.id)}
          handleDelete={async () => await _deleteTag(tag.id)}
        />
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
    border-bottom: 1px solid var(--theme-primary-700);
    color: var(--theme-primary-500);
  }
</style>
