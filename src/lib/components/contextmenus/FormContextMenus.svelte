<script lang="ts">
  import BackgroundContextMenu from './BackgroundContextMenu.svelte'
  import TagsContextMenu from './TagsContextMenu.svelte'
  import { uiStore } from '$lib/stores'

  export let ids: string[] = [],
    color: string | undefined = undefined
</script>

{#if $uiStore.contextMenu.tags}
  <TagsContextMenu bind:ids />
{/if}

{#if $uiStore.contextMenu.background}
  <BackgroundContextMenu bind:color />
{/if}
