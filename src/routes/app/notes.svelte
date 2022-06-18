<script lang="ts">
  import FormField from '$lib/components/FormField.svelte'
  import NoteGrid from '$containers/NoteGrid.svelte'
  import NoteForm from '$containers/NoteForm.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import TagsContextMenu from '$containers/TagsContextMenu.svelte'

  import { uiStore, notesStore } from '$lib/stores'

  const { setCurrentNote } = notesStore
  const { closeAllModals } = uiStore

  const handleModalClose = () => {
    setCurrentNote('')
    closeAllModals()
  }
</script>

<FormField />
<NoteGrid notes={$notesStore.notes.filter((n) => !n.trash)} />

{#if $uiStore.modal.note}
  <Modal handleOutsideClick={handleModalClose}>
    <NoteForm />
  </Modal>
{/if}

{#if $uiStore.contextMenu.tags}
  <TagsContextMenu />
{/if}
