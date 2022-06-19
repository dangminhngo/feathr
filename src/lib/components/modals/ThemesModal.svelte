<script lang="ts">
  import ModalWrapper from './ModalWrapper.svelte'
  import { uiStore } from '$lib/stores'

  const { closeAllModals } = uiStore
  const handleModalClose = () => {
    closeAllModals()
  }
</script>

{#if $uiStore.modal.themes}
  <ModalWrapper handleBackdropClick={handleModalClose}>Themes</ModalWrapper>
{/if}
