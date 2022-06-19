<script lang="ts">
  import BackgroundContextMenu from '$lib/components/contextmenus/BackgroundContextMenu.svelte'
  import TagsContextMenu from '$lib/components/contextmenus/TagsContextMenu.svelte'
  import { uiStore } from '$lib/stores'

  export let ids: string[], color: string | undefined
</script>

{#if $uiStore.contextMenu.tags}
  <TagsContextMenu bind:ids />
{/if}

{#if $uiStore.contextMenu.background}
  <BackgroundContextMenu bind:color />
{/if}
