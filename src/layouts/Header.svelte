<script lang="ts">
  import { goto } from '$app/navigation'
  import { uiStore } from '$lib/stores'

  import MenuButton from '$lib/components/MenuButton.svelte'
  import SearchBox from '$lib/components/SearchBox.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  import ProfilePictureButton from '$lib/components/ProfilePictureButton.svelte'

  let keyword = ''

  const handleSubmit = () => {
    if (!keyword) return
    goto(`/app/search/${keyword}`)
  }
</script>

<header class="header">
  <MenuButton on:click={uiStore.toggleNav} />
  <SearchBox
    placeholder="Search notes or tasks ..."
    bind:value={keyword}
    on:submit={handleSubmit}
  />
  <div class="buttons">
    <IconButton name="cog" on:click={() => console.log('Clicked')} />
    <ProfilePictureButton />
  </div>
</header>

<style lang="scss">
  .header {
    padding: 0.875rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    border-bottom: 1px solid var(--theme-primary-700);
  }

  .buttons {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
