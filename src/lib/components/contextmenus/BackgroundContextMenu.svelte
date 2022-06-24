<script lang="ts">
  import ContextMenuWrapper from './ContextMenuWrapper.svelte'
  import SelectableColorCircle from './SelectableColorCircle.svelte'
  import { colorKeys } from '$lib/consts'

  export let color = 'default'
</script>

<ContextMenuWrapper>
  <div class="colors">
    <p>Choose your favorite color</p>
    <div class="list">
      <SelectableColorCircle bind:group={color} name="color" value="default" />
      {#each colorKeys as key}
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
