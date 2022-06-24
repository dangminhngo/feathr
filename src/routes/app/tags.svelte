<script lang="ts">
  import PlaceholderField from '$lib/components/forms/PlaceholderField.svelte'
  import TagForm from '$lib/components/forms/TagForm.svelte'
  import TagGrid from '$lib/components/grids/TagGrid.svelte'
</script>

<PlaceholderField component={TagForm} placeholder="Add a tag ..." />
<TagGrid />
