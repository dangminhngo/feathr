<script lang="ts">
  import ModalWrapper from './ModalWrapper.svelte'
  import { uiState } from '$lib/state'

  const { closeAllContextMenus, closeAllModals } = uiState
  const handleModalClose = () => {
    closeAllContextMenus()
    closeAllModals()
  }
</script>

{#if $uiState.modal.shortcuts}
  <ModalWrapper handleClose={handleModalClose}>Shortcuts</ModalWrapper>
{/if}
