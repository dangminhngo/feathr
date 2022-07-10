<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let checked = false
</script>

<label class="wrapper" class:checked>
  <input type="checkbox" bind:checked on:change />
  <span class="checkbox">
    {#if checked}
      <Icon name="check" width={16} height={16} />
    {/if}
  </span>
  <span><slot /></span>
</label>

<style lang="scss">
  .wrapper {
    cursor: pointer;
    padding: 0.25rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: var(--text-sm);
  }

  .wrapper.checked {
    color: var(--theme-fg);
  }

  input {
    display: none;
  }

  .checkbox {
    width: 0.875rem;
    height: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--theme-fg);
    border-radius: 2px;
  }
</style>
