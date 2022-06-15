<script lang="ts">
  import FormField from '$lib/components/FormField.svelte'
  import NoteGrid from '$containers/NoteGrid.svelte'

  import { notesStore } from '$lib/stores'

  $: notes = $notesStore.notes
</script>

<FormField />
<NoteGrid notes={notes.filter((n) => !n.trash)} />
