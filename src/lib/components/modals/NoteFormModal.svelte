<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import NoteForm from '$lib/components/forms/NoteForm.svelte'

  import { uiState, notesState } from '$lib/state'

  const { setCurrentNote } = notesState
  const { closeAllModals } = uiState

  const handleModalClose = () => {
    setCurrentNote('')
    closeAllModals()
  }
</script>

{#if $uiState.modal.note}
  <ModalWrapper title="Note" handleClose={handleModalClose}>
    <NoteForm />
  </ModalWrapper>
{/if}
