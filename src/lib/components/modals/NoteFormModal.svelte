<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import NoteForm from '$lib/components/forms/NoteForm.svelte'

  import { uiStore, notesStore } from '$lib/stores'

  const { setCurrentNote } = notesStore
  const { closeAllModals } = uiStore

  const handleModalClose = () => {
    setCurrentNote('')
    closeAllModals()
  }
</script>

{#if $uiStore.modal.note}
  <ModalWrapper handleBackdropClick={handleModalClose}>
    <NoteForm />
  </ModalWrapper>
{/if}
