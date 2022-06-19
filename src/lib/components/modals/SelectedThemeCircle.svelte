<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import type { Theme } from '$lib/types'
  export let name: string, theme: Theme, group: string

  $: selected = group === theme.name
  $: console.log(group, theme)
</script>

<label class:selected>
  <input type="radio" bind:group {name} value={theme.name} />
  <div class="circle">
    <span style="background-color: {theme.palette['primary-900']}">&nbsp;</span>
    <span style="background-color: {theme.palette.accent}">&nbsp;</span>
    {#if selected}
      <span class="icon">
        <Icon name="check" width={24} height={24} />
      </span>
    {/if}
  </div>
  <span class="name">{theme.name}</span>
</label>

<style lang="scss">
  label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    font-size: var(--text-sm);
  }

  .circle {
    position: relative;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: stretch;
    border: 2px solid var(--theme-primary-800);
    border-radius: 100%;
    overflow: hidden;
  }

  .selected > .circle {
    border-color: var(--theme-primary-50);
  }

  input {
    display: none;
  }

  span {
    flex: 1;
    display: block;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--theme-primary-50);
  }

  .name {
    cursor: pointer;
    color: var(--theme-primary-400);
  }

  .selected > .name {
    color: var(--theme-primary-50);
    font-weight: 700;
  }
</style>
