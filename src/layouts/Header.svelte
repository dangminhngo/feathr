<script>
  import MenuButton from '$lib/components/MenuButton.svelte'
  import SearchBox from '$lib/components/SearchBox.svelte'
</script>

<header class="header">
  <MenuButton />
  <SearchBox placeholder="Search notes or tasks ..." />
</header>

<style lang="scss">
  .header {
    padding: 1rem 4rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
</style>
