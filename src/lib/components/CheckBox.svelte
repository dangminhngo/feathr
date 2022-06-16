<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  export let checked = false
</script>

<label class="label" class:checked>
  <input class="checkbox" type="checkbox" bind:checked on:change|stopPropagation />
  <Icon name="check" width={16} height={16} />
</label>

<style lang="scss">
  .label {
    cursor: pointer;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--theme-primary-500);
    border-radius: 2px;
    color: transparent;
  }

  .label.checked {
    border: 2px solid var(--theme-accent);
    background-color: var(--theme-accent);
    color: var(--theme-primary-50);
  }

  .checkbox {
    display: none;
  }
</style>
