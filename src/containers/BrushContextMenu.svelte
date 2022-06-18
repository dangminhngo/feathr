<script lang="ts">
  import ContextMenu from '$containers/ContextMenu.svelte'
  import Color from '$lib/components/Color.svelte'
  import { colorKeys } from '$lib/consts'

  export let color: string | undefined = undefined
</script>

<ContextMenu>
  <div class="colors">
    <p>Choose your favorite color</p>
    <div class="list">
      <Color bind:group={color} name="color" value={undefined} />
      {#each colorKeys as key}
        <Color bind:group={color} name="color" value={key} />
      {/each}
    </div>
  </div>
</ContextMenu>

<style lang="scss">
  .colors {
    padding: 0.25rem 0.5rem;
    font-size: var(--text-sm);
    color: var(--theme-primary-400);
  }

  .list {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
