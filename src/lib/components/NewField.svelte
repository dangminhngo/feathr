<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte'
  import NoteForm from '$containers/NoteForm.svelte'

  let newNoteType: null | 'note' | 'task' = 'note'

  const setNewNoteType = (noteType: 'note' | 'task') => (newNoteType = noteType)

  $: console.log(newNoteType)
</script>

<div class="wrapper">
  {#if newNoteType === 'note'}
    <NoteForm />
  {:else if newNoteType === 'task'}
    <div>Task Form</div>
  {:else}
    <div class="field">
      <div class="placeholder" on:click={() => setNewNoteType('note')}>Add a note ...</div>
      <div class="buttons">
        <IconButton name="taskList" on:click={() => setNewNoteType('task')} />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    margin: 0 auto;
    width: 30rem;
  }

  .field {
    position: relative;
    width: 100%;
    border: 1px solid var(--theme-primary-700);
    border-radius: var(--rounded);
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
  }
</style>
