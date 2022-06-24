<script lang="ts">
  import { goto } from '$app/navigation'
  import IconButton from '$lib/components/IconButton.svelte'
  import Hamburger from './Hamburger.svelte'
  import ProfilePicture from './ProfilePicture.svelte'
  import Search from './Search.svelte'
  import { authState, uiState } from '$lib/state'
  import { ContextMenuType } from '$lib/enums'

  let keyword = ''

  const handleSubmit = () => {
    if (!keyword) return
    goto(`/app/search/${keyword}`)
    keyword = ''
  }

  const { toggleContextMenu } = uiState
  const _toggleContextMenu = (type: ContextMenuType) => (e: MouseEvent) => {
    const rect = (e.target as HTMLButtonElement).getBoundingClientRect()
    toggleContextMenu(type, {
      x: rect.x + rect.width - 160,
      y: rect.y + rect.height + 14,
    })
  }
</script>

<header class="header">
  <Hamburger on:click={uiState.toggleNav} />
  <Search placeholder="Search notes or lists ..." bind:value={keyword} on:submit={handleSubmit} />
  <div class="buttons">
    <IconButton name="cog" on:click={(e) => _toggleContextMenu(ContextMenuType.Settings)(e)} />
    {#if $authState.isAuth && $authState.authUser}
      <ProfilePicture
        url={$authState.authUser?.photoURL}
        email={$authState.authUser?.email}
        on:click={(e) => _toggleContextMenu(ContextMenuType.Account)(e)}
      />
    {/if}
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
