<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = '',
    size: 'lg' | 'sm' = 'lg'
</script>

<button class:lg={size === 'lg'} class:sm={size === 'sm'} on:click>
  <Icon class="icon" {name} width={20} height={20} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  button.lg {
    width: 2.25rem;
    height: 2.25rem;
  }

  button.sm {
    width: 2rem;
    height: 2rem;
  }

  button:hover {
    background-color: var(--theme-primary-700);
  }
</style>
