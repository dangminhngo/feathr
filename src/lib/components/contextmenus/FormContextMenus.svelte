<script lang="ts">
  import PaletteContextMenu from './PaletteContextMenu.svelte'
  import TagsContextMenu from './TagsContextMenu.svelte'
  import { uiState } from '$lib/state'

  export let ids: string[] = [],
    color: string | undefined = undefined
</script>

{#if $uiState.contextMenu.tags}
  <TagsContextMenu bind:ids />
{/if}

{#if $uiState.contextMenu.background}
  <PaletteContextMenu bind:color />
{/if}
