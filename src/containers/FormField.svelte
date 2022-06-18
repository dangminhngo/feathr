<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte'
  import NoteForm from '$containers/NoteForm.svelte'
  import TaskListForm from '$containers/TaskListForm.svelte'
  import { uiStore } from '$lib/stores'
  import { FormType } from '$lib/enums'

  const { openForm } = uiStore
</script>

<div class="wrapper">
  {#if $uiStore.form === FormType.Note}
    <NoteForm />
  {:else if $uiStore.form === FormType.TaskList}
    <TaskListForm />
  {:else}
    <div class="field">
      <div class="placeholder" on:click={() => openForm(FormType.Note)}>Add a note ...</div>
      <div class="buttons">
        <IconButton name="taskList" on:click={() => openForm(FormType.TaskList)} />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    margin: 0 auto;
    width: 30rem;
    border: 1px solid var(--theme-primary-600);
    border-radius: var(--rounded);
  }

  .field {
    position: relative;
    width: 100%;
    outline: none;
  }

  .placeholder {
    cursor: text;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: var(--theme-primary-400);
  }

  .buttons {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: var(--theme-primary-400);
  }
</style>
