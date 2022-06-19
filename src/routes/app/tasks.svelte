<script lang="ts">
  import FormField from '$containers/FormField.svelte'
  import TaskListGrid from '$/containers/TaskListGrid.svelte'

  import { taskListsStore } from '$lib/stores'
</script>

<FormField />
<TaskListGrid taskLists={$taskListsStore.taskLists} />
