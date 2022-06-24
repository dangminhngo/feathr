<script lang="ts">
  import { getContext } from 'svelte'

  import Icon from '$lib/components/Icon.svelte'
  import { themeKey } from '$lib/consts'

  export let name: string,
    value = 'default',
    group: string | undefined = undefined
  $: selected = group === value

  const { getPalette } = getContext(themeKey)
  const palette = getPalette()
</script>

<label
  class:selected
  style="background-color: {value !== 'default' ? palette[value] : 'var(--theme-primary-900)'};"
>
  <input type="radio" bind:group {name} {value} />
  {#if selected}
    <Icon name="check" />
  {/if}
</label>

<style lang="scss">
  label {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--theme-primary-800);
    border-radius: 100%;
    transition: all 0.15s ease-out;
  }

  label.selected {
    border-color: var(--theme-primary-50);
    color: var(--theme-primary-50);
  }

  input {
    display: none;
  }
</style>
