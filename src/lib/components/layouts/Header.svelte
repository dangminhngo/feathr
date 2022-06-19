<script lang="ts">
  import { goto } from '$app/navigation'
  import { uiStore } from '$lib/stores'

  import Hamburger from './Hamburger.svelte'
  import ProfilePicture from './ProfilePicture.svelte'
  import Search from './Search.svelte'

  let keyword = ''

  const handleSubmit = () => {
    if (!keyword) return
    goto(`/app/search/${keyword}`)
    keyword = ''
  }
</script>

<header class="header">
  <Hamburger on:click={uiStore.toggleNav} />
  <Search placeholder="Search notes or tasks ..." bind:value={keyword} on:submit={handleSubmit} />
  <div class="buttons">
    <ProfilePicture />
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
