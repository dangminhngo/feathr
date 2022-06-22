<script lang="ts">
  import { page } from '$app/stores'
  import SearchGrid from '$lib/components/grids/SearchGrid.svelte'
  import { notesState, listsState } from '$lib/state'
  import { getSearchResults } from '$lib/helpers'

  const keyword = $page.params.keyword

  $: items = getSearchResults($notesState.notes, $listsState.lists, keyword)
</script>

<div class="message">Search results for <strong>{keyword}</strong></div>
<SearchGrid {items} />

<style lang="scss">
  .message {
    text-align: center;
  }
</style>
