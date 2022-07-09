<script lang="ts">
  import { onMount, tick } from 'svelte'
  import ThemeContext from '$lib/contexts/ThemeContext.svelte'
  import LoadingBar from '$lib/components/LoadingBar.svelte'
  import Header from '$lib/components/layouts/Header.svelte'
  import Nav from '$lib/components/layouts/Nav.svelte'
  import GlobalContextMenus from '$lib/components/contextmenus/GlobalContextMenus.svelte'
  import Notification from '$lib/components/Notification.svelte'
  import Modals from '$lib/components/modals/Modals.svelte'
  import { uiState, notesState, listsState, tagsState } from '$lib/state'
  import { fetchInitialData } from '$lib/firebase/firestore'

  const { notify } = uiState
  let loading = true

  onMount(async () => {
    try {
      await tick()
      const { notes, lists, tags } = await fetchInitialData()
      $notesState.notes = notes
      $listsState.lists = lists
      $tagsState.tags = tags
      loading = false
    } catch (err) {
      if (err instanceof Error) {
        loading = false
        notify(err.message, true)
      }
    }
  })
</script>

<ThemeContext>
  <Header />
  <div class="main">
    <Nav />
    {#if loading}
      <LoadingBar />
    {:else}
      <main>
        <slot />
      </main>
    {/if}
  </div>
  <Modals />
  <GlobalContextMenus />
  {#if $uiState.notification}
    <Notification />
  {/if}
</ThemeContext>

<style lang="scss">
  :global(body) {
    background-color: var(--theme-primary-900);
    color: var(--theme-primary-200);
  }

  .main {
    display: flex;
  }

  main {
    padding: 2rem 4rem;
    width: 100%;
  }
</style>
