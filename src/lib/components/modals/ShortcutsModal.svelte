<script lang="ts">
  import ModalWrapper from './ModalWrapper.svelte'
  import { uiStore } from '$lib/stores'

  const { closeAllContextMenus, closeAllModals } = uiStore
  const handleModalClose = () => {
    closeAllContextMenus()
    closeAllModals()
  }
</script>

{#if $uiStore.modal.shortcuts}
  <ModalWrapper handleBackdropClick={handleModalClose}>Shortcuts</ModalWrapper>
{/if}
