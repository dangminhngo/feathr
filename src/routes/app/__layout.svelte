<script lang="ts">
  import { onMount, tick } from 'svelte'
  import ThemeContext from '$lib/contexts/ThemeContext.svelte'
  import Header from '$lib/components/layouts/Header.svelte'
  import Nav from '$lib/components/layouts/Nav.svelte'
  import GlobalContextMenus from '$lib/components/contextmenus/GlobalContextMenus.svelte'
  import Modals from '$lib/components/modals/Modals.svelte'
  import { notesState, listsState, tagsState } from '$lib/state'
  import { fetchInitialData } from '$lib/firebase/firestore'

  onMount(async () => {
    try {
      await tick()
      const { notes, lists, tags } = await fetchInitialData()
      $notesState.notes = notes
      $listsState.lists = lists
      $tagsState.tags = tags
    } catch (err) {
      console.log(err)
    }
  })
</script>

<ThemeContext>
  <Header />
  <div class="main">
    <Nav />
    <main>
      <slot />
    </main>
  </div>
  <Modals />
  <GlobalContextMenus />
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
