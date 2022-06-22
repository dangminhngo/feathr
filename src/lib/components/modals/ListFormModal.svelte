<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import ListForm from '$lib/components/forms/ListForm.svelte'

  import { uiState, listsState } from '$lib/state'

  const { setCurrentList } = listsState
  const { closeAllModals } = uiState

  const handleModalClose = () => {
    setCurrentList('')
    closeAllModals()
  }
</script>

{#if $uiState.modal.list}
  <ModalWrapper handleBackdropClick={handleModalClose}>
    <ListForm />
  </ModalWrapper>
{/if}
