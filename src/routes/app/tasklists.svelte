<script lang="ts">
  import PlaceholderField from '$lib/components/forms/PlaceholderField.svelte'
  import TaskListForm from '$lib/components/forms/TaskListForm.svelte'
  import TaskListGrid from '$lib/components/grids/TaskListGrid.svelte'
  import { taskListsStore } from '$lib/stores'
</script>

<PlaceholderField component={TaskListForm} placeholder="Add a task list ..." />
<TaskListGrid taskLists={$taskListsStore.taskLists} />
