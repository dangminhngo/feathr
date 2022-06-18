<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let checked = false
</script>

<label class="wrapper" class:checked>
  <input type="checkbox" bind:checked />
  <div class="checkbox">
    {#if checked}
      <Icon name="check" width={14} height={14} />
    {/if}
  </div>
  <slot />
</label>

<style lang="scss">
  .wrapper {
    cursor: pointer;
    padding: 0.25rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: var(--text-sm);
    color: var(--theme-primary-400);
  }

  .wrapper:hover {
    background-color: var(--theme-primary-700);
  }

  .wrapper.checked {
    color: var(--theme-primary-200);
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
    border: 1px solid var(--theme-primary-400);
    border-radius: 2px;
  }
</style>
