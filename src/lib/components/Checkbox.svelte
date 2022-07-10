<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  export let checked = false,
    alt = false
</script>

<label class="label" class:checked class:alt on:click|stopPropagation>
  <input class="checkbox" type="checkbox" bind:checked />
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
    border: 2px solid var(--theme-fg);
    border-radius: 2px;
    color: transparent;
  }

  .label.checked {
    border: 2px solid var(--theme-accent);
    background-color: var(--theme-accent);
    color: var(--theme-fg);
  }

  .label.checked.alt {
    border: 2px solid var(--theme-fg);
    background-color: var(--theme-fg);
    color: var(--theme-accent);
  }

  .checkbox {
    display: none;
  }
</style>
