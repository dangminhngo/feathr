<script lang="ts">
  import ContextMenuWrapper from './ContextMenuWrapper.svelte'
  import SelectableColorCircle from './SelectableColorCircle.svelte'
  import palettes from '$lib/data/palettes.json'

  export let color = 'default'
  const keys = Object.keys(palettes.light)
</script>

<ContextMenuWrapper>
  <div class="colors">
    <p>Choose your favorite color</p>
    <div class="list">
      <SelectableColorCircle bind:group={color} name="color" value="default" />
      {#each keys as key}
        <SelectableColorCircle bind:group={color} name="color" value={key} />
      {/each}
    </div>
  </div>
</ContextMenuWrapper>

<style lang="scss">
  .colors {
    padding: 0.25rem 0.5rem;
    font-size: var(--text-sm);
    color: var(--theme-primary-300);
  }

  .list {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
</style>
