<script lang="ts">
  import FormField from '$containers/FormField.svelte'
  import NoteGrid from '$containers/NoteGrid.svelte'

  import { notesStore } from '$lib/stores'
</script>

<FormField />
<NoteGrid notes={$notesStore.notes.filter((n) => !n.trash)} />
