<script lang="ts">
  import PlaceholderField from '$lib/components/forms/PlaceholderField.svelte'
  import ListForm from '$lib/components/forms/ListForm.svelte'
  import ListGrid from '$lib/components/grids/ListGrid.svelte'
  import { listsStore } from '$lib/stores'
</script>

<PlaceholderField component={ListForm} placeholder="Add a task list ..." />
<ListGrid lists={$listsStore.lists} />
