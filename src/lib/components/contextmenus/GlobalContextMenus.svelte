<script lang="ts">
  import SettingsContextMenu from './SettingsContextMenu.svelte'
  import UserAccountContextMenu from './UserAccountContextMenu.svelte'
  import { uiStore } from '$lib/stores'
</script>

{#if $uiStore.contextMenu.settings}
  <SettingsContextMenu />
{/if}

{#if $uiStore.contextMenu.account}
  <UserAccountContextMenu />
{/if}
