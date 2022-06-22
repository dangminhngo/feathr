<script lang="ts">
  import PlaceholderField from '$lib/components/forms/PlaceholderField.svelte'
  import NoteForm from '$lib/components/forms/NoteForm.svelte'
  import NoteGrid from '$lib/components/grids/NoteGrid.svelte'

  import { notesState } from '$lib/state'
</script>

<PlaceholderField component={NoteForm} placeholder="Add a note ..." />
<NoteGrid notes={$notesState.notes.filter((n) => !n.trash)} />
