<script lang="ts">
  import ThemeContext from '$lib/contexts/ThemeContext.svelte'
  import Header from '$lib/components/layouts/Header.svelte'
  import Nav from '$lib/components/layouts/Nav.svelte'
  import GlobalContextMenus from '$lib/components/contextmenus/GlobalContextMenus.svelte'
  import Modals from '$lib/components/modals/Modals.svelte'
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
  .main {
    display: flex;
  }

  main {
    padding: 2rem 4rem;
    width: 100%;
  }
</style>
