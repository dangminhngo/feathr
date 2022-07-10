<script lang="ts">
  import { goto } from '$app/navigation'
  import ContextMenuWrapper from './ContextMenuWrapper.svelte'
  import { logOut } from '$lib/firebase/auth'
  import { uiState, authState } from '$lib/state'
  import { ModalType } from '$lib/enums'

  const { closeAllContextMenus, openModal } = uiState
  const _toggleModal = (type: ModalType) => {
    closeAllContextMenus()
    openModal(type)
  }

  const handleLogOut = async () => {
    await logOut()
    authState.unmount()
    goto('/auth/signin')
  }
</script>

<ContextMenuWrapper>
  <div class="account">
    <div role="menuitem" on:click={() => _toggleModal(ModalType.Account)}>Your account</div>
    <div class="logout" role="menuitem" on:click={handleLogOut}>Log out</div>
  </div>
</ContextMenuWrapper>

<style lang="scss">
  .account {
    width: 10rem;
    display: flex;
    flex-direction: column;
  }

  div[role='menuitem'] {
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: var(--text-sm);
    text-align: left;
    transition: background-color 0.15s ease-out;
    user-select: none;

    &:hover {
      background-color: var(--theme-context-menu-bg-hover);
      color: var(--theme-context-menu-fg-hover);
    }
  }

  .logout {
    color: var(--theme-accent);
    font-weight: 500;
  }
</style>
