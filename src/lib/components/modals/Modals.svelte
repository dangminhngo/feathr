<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import NoteForm from '$lib/components/forms/NoteForm.svelte'
  import ListForm from '$lib/components/forms/ListForm.svelte'

  import { uiStore, notesStore, listsStore } from '$lib/stores'

  const { setCurrentList } = listsStore
  const { setCurrentNote } = notesStore
  const { closeAllModals } = uiStore

  const handleNoteModalClose = () => {
    setCurrentNote('')
    closeAllModals()
  }

  const handleListModalClose = () => {
    setCurrentList('')
    closeAllModals()
  }
</script>

{#if $uiStore.modal.note}
  <ModalWrapper handleBackdropClick={handleNoteModalClose}>
    <NoteForm />
  </ModalWrapper>
{/if}

{#if $uiStore.modal.list}
  <ModalWrapper handleBackdropClick={handleListModalClose}>
    <ListForm />
  </ModalWrapper>
{/if}
