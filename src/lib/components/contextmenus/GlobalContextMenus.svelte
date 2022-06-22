<script lang="ts">
  import SettingsContextMenu from './SettingsContextMenu.svelte'
  import UserAccountContextMenu from './UserAccountContextMenu.svelte'
  import { uiState } from '$lib/state'
</script>

{#if $uiState.contextMenu.settings}
  <SettingsContextMenu />
{/if}

{#if $uiState.contextMenu.account}
  <UserAccountContextMenu />
{/if}
