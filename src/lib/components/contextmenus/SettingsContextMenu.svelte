<script lang="ts">
  import ContextMenuWrapper from './ContextMenuWrapper.svelte'
  import { uiState } from '$lib/state'
  import { ModalType } from '$lib/enums'

  const { toggleListView, closeAllContextMenus, openModal } = uiState
  const _toggleModal = (type: ModalType) => {
    closeAllContextMenus()
    openModal(type)
  }
</script>

<ContextMenuWrapper>
  <div class="settings">
    <div role="menuitem" on:click={toggleListView}>
      {$uiState.listView ? 'Grid view' : 'List view'}
    </div>
    <div role="menuitem" on:click={() => _toggleModal(ModalType.Themes)}>Change theme</div>
    <div role="menuitem" on:click={() => _toggleModal(ModalType.Shortcuts)}>Shortcuts</div>
    <div role="menuitem" on:click={() => _toggleModal(ModalType.About)}>About</div>
  </div>
</ContextMenuWrapper>

<style lang="scss">
  .settings {
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
      background-color: var(--theme-primary-700);
    }
  }
</style>
