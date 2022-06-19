<script lang="ts">
  import SettingsContextMenu from './SettingsContextMenu.svelte'
  import { uiStore } from '$lib/stores'
</script>

{#if $uiStore.contextMenu.settings}
  <SettingsContextMenu />
{/if}
