<script lang="ts">
  import MenuButton from '$lib/components/MenuButton.svelte'
  import SearchBox from '$lib/components/SearchBox.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
</script>

<header class="header">
  <MenuButton />
  <SearchBox placeholder="Search notes or tasks ..." />
  <IconButton name="cog" on:click={() => console.log('Clicked')} />
</header>

<style lang="scss">
  .header {
    padding: 0.875rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 1px solid var(--theme-primary-700);
  }
</style>
