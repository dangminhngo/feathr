<script lang="ts">
  import { page } from '$app/stores'
  import SearchGrid from '$lib/components/grids/SearchGrid.svelte'
  import { notesStore, taskListsStore } from '$lib/stores'
  import { getSearchResults } from '$lib/helpers'

  const keyword = $page.params.keyword

  $: items = getSearchResults($notesStore.notes, $taskListsStore.taskLists, keyword)
</script>

<div class="message">Search results for <strong>{keyword}</strong></div>
<SearchGrid {items} />

<style lang="scss">
  .message {
    text-align: center;
  }
</style>
