<script lang="ts">
  import PlaceholderField from '$lib/components/forms/PlaceholderField.svelte'
  import NoteForm from '$lib/components/forms/NoteForm.svelte'
  import NoteGrid from '$lib/components/grids/NoteGrid.svelte'

  import { notesStore } from '$lib/stores'
</script>

<PlaceholderField component={NoteForm} placeholder="Add a note ..." />
<NoteGrid notes={$notesStore.notes.filter((n) => !n.trash)} />
