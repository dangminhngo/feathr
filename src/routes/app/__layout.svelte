<script lang="ts">
  import ThemeContext from '$lib/theming/ThemeContext.svelte'
  import Header from '$layouts/Header.svelte'
  import Nav from '$layouts/Nav.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import NoteForm from '$containers/NoteForm.svelte'
  import TaskListForm from '$containers/TaskListForm.svelte'

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

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<ThemeContext>
  <Header />
  <div class="main">
    <Nav />
    <main>
      <slot />
    </main>
  </div>

  {#if $uiStore.modal.note}
    <Modal handleBackdropClick={handleNoteModalClose}>
      <NoteForm />
    </Modal>
  {/if}

  {#if $uiStore.modal.taskList}
    <Modal handleBackdropClick={handleTaskListModalClose}>
      <TaskListForm />
    </Modal>
  {/if}
</ThemeContext>

<style lang="scss">
  :global(:root) {
    --text-md: 1rem;
    --text-sm: 0.875rem;
    --text-xs: 0.75rem;

    --sidenav-width: 16rem;
    --button-height: 2.25rem;
    --input-height: 2.25rem;

    --rounded: 4px;
    --rounded-lg: 8px;
    --rounded-full: 100px;

    --shadow: 0 0 0.5rem hsla(0, 0%, 0%, 0.4);
  }

  :global(*, *::before, *::after) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    color: var(--theme-primary-200);
    background-color: var(--theme-primary-900);
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  :global(button, input) {
    border: none;
    outline: none;
    background-color: inherit;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
  }

  :global(a) {
    text-decoration: none;
    color: inherit;
  }

  .main {
    display: flex;
  }

  main {
    padding: 2rem 4rem;
    width: 100%;
  }
</style>
