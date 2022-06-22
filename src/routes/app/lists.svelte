<script lang="ts">
  import PlaceholderField from '$lib/components/forms/PlaceholderField.svelte'
  import ListForm from '$lib/components/forms/ListForm.svelte'
  import ListGrid from '$lib/components/grids/ListGrid.svelte'
  import { listsState } from '$lib/state'
</script>

<PlaceholderField component={ListForm} placeholder="Add a list ..." />
<ListGrid lists={$listsState.lists} />
