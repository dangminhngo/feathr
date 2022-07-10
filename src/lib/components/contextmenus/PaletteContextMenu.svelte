<script lang="ts">
  import { getContext } from 'svelte'
  import ContextMenuWrapper from './ContextMenuWrapper.svelte'
  import SelectableColorCircle from './SelectableColorCircle.svelte'
  import { themeKey } from '$lib/consts'

  const { getPalette } = getContext(themeKey)
  const palette = getPalette()

  export let color = 'default'
  const keys = Object.keys(palette)
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
  }

  .list {
    margin-top: 0.5rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
</style>
