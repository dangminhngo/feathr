<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import TagForm from '$lib/components/forms/TagForm.svelte'

  import { uiState, tagsState } from '$lib/state'

  const { setCurrentTag } = tagsState
  const { closeAllModals } = uiState

  const handleModalClose = () => {
    setCurrentTag('')
    closeAllModals()
  }
</script>

{#if $uiState.modal.tag}
  <ModalWrapper title="Tag" handleClose={handleModalClose}>
    <TagForm />
  </ModalWrapper>
{/if}
