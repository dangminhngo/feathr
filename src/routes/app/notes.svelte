<script lang="ts">
  import FormField from '$lib/components/FormField.svelte'
  import NoteGrid from '$containers/NoteGrid.svelte'
  import NoteForm from '$containers/NoteForm.svelte'
  import Modal from '$lib/components/Modal.svelte'

  import { notesStore } from '$lib/stores'

  $: notes = $notesStore.notes
</script>

<FormField />
<NoteGrid notes={notes.filter((n) => !n.trash)} />
<Modal>
  <NoteForm />
</Modal>
