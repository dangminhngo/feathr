<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import ListForm from '$lib/components/forms/ListForm.svelte'

  import { uiStore, listsStore } from '$lib/stores'

  const { setCurrentList } = listsStore
  const { closeAllModals } = uiStore

  const handleModalClose = () => {
    setCurrentList('')
    closeAllModals()
  }
</script>

{#if $uiStore.modal.list}
  <ModalWrapper handleBackdropClick={handleModalClose}>
    <ListForm />
  </ModalWrapper>
{/if}
