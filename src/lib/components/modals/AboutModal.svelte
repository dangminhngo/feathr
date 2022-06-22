<script lang="ts">
  import ModalWrapper from './ModalWrapper.svelte'
  import { uiState } from '$lib/state'

  const { closeAllModals } = uiState
  const handleModalClose = () => {
    closeAllModals()
  }
</script>

{#if $uiState.modal.about}
  <ModalWrapper handleBackdropClick={handleModalClose}>About</ModalWrapper>
{/if}
