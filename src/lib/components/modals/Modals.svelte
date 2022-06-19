<script lang="ts">
  import ModalWrapper from '$lib/components/modals/ModalWrapper.svelte'
  import NoteForm from '$lib/components/forms/NoteForm.svelte'
  import TaskListForm from '$lib/components/forms/TaskListForm.svelte'

  import { uiStore, notesStore, taskListsStore } from '$lib/stores'

  const { setCurrentTaskList } = taskListsStore
  const { setCurrentNote } = notesStore
  const { closeAllModals } = uiStore

  const handleNoteModalClose = () => {
    setCurrentNote('')
    closeAllModals()
  }

  const handleTaskListModalClose = () => {
    setCurrentTaskList('')
    closeAllModals()
  }
</script>

{#if $uiStore.modal.note}
  <ModalWrapper handleBackdropClick={handleNoteModalClose}>
    <NoteForm />
  </ModalWrapper>
{/if}

{#if $uiStore.modal.taskList}
  <ModalWrapper handleBackdropClick={handleTaskListModalClose}>
    <TaskListForm />
  </ModalWrapper>
{/if}
