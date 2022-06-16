<script lang="ts">
  import FormField from '$lib/components/FormField.svelte'
  import TaskListGrid from '$/containers/TaskListGrid.svelte'
  import Modal from '$lib/components/Modal.svelte'

  import { uiStore, taskListsStore } from '$lib/stores'

  const { setCurrentTaskList } = taskListsStore
  const { closeAllModals } = uiStore

  const handleModalClose = () => {
    setCurrentTaskList('')
    closeAllModals()
  }
</script>

<FormField />
<TaskListGrid taskLists={$taskListsStore.taskLists} />
