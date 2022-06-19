<script lang="ts">
  import ModalWrapper from './ModalWrapper.svelte'
  import { uiStore } from '$lib/stores'

  const { closeAllModals } = uiStore
  const handleModalClose = () => {
    closeAllModals()
  }
</script>

{#if $uiStore.modal.about}
  <ModalWrapper handleBackdropClick={handleModalClose}>About</ModalWrapper>
{/if}
