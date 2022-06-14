<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = '',
    size: 'lg' | 'md' | 'sm' = 'lg'

  const iconSize = size !== 'sm' ? 20 : 18
</script>

<button class:lg={size === 'lg'} class:md={size === 'md'} class:sm={size === 'sm'} on:click>
  <Icon class="icon" {name} width={iconSize} height={iconSize} />
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

  button.md {
    width: 2rem;
    height: 2rem;
  }

  button.sm {
    width: 1.5rem;
    height: 1.5rem;
  }

  button:hover {
    background-color: var(--theme-primary-700);
  }
</style>
