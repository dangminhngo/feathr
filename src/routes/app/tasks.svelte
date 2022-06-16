<script lang="ts">
  import FormField from '$lib/components/FormField.svelte'
  import TaskGrid from '$/containers/TaskGrid.svelte'
  import Modal from '$lib/components/Modal.svelte'

  import { uiStore, tasksStore } from '$lib/stores'

  const { setCurrentTask } = tasksStore
  const { closeAllModals } = uiStore

  const handleModalClose = () => {
    setCurrentTask('')
    closeAllModals()
  }
</script>

<FormField />
<TaskGrid tasks={$tasksStore.tasks} />
