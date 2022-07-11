<script lang="ts">
  import TagPill from '$lib/components/items/TagPill.svelte'
  import { uiState, notesState, listsState, tagsState } from '$lib/state'
  import firestore from '$lib/firebase/firestore'
  import { getTags, getItemById } from '$lib/helpers'

  export let itemId: string,
    type: 'note' | 'list' = 'note',
    ids: string[] = []

  const { notify } = uiState
  const { removeTagFromNote } = notesState
  const { removeTagFromList } = listsState

  const _removeTagFromItem = async (id: string) => {
    const tag = getItemById(tags, id)

    if (type === 'note') {
      await firestore.removeTagFromNote(itemId, id)
      removeTagFromNote(itemId, id)
      notify(`Tag ${tag?.label} has been removed from a note`)
    } else {
      await firestore.removeTagFromList(itemId, id)
      removeTagFromList(itemId, id)
      notify(`Tag ${tag?.label} has been removed from a list`)
    }
  }

  $: tags = getTags($tagsState.tags, ids)
</script>

{#if tags.length > 0}
  <div class="tag-list">
    {#each tags as tag (tag.id)}
      <TagPill {tag} handleRemove={() => _removeTagFromItem(tag.id)} />
    {/each}
  </div>
{/if}

<style lang="scss">
  .tag-list {
    display: flex;
    gap: 0.5rem;
  }
</style>
