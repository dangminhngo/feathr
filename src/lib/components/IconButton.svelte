<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = '',
    size: 'lg' | 'md' | 'sm' = 'lg',
    active = false

  const getIconSize = (size: 'lg' | 'md' | 'sm'): number => {
    if (size === 'lg') return 20
    if (size === 'md') return 18
    return 16
  }
</script>

<button
  class:lg={size === 'lg'}
  class:md={size === 'md'}
  class:sm={size === 'sm'}
  class:active
  on:click|stopPropagation
>
  <Icon class="icon" {name} size={getIconSize(size)} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: all 0.15s ease-out;
  }

  button.lg {
    width: 2.25rem;
    height: 2.25rem;
  }

  button.md {
    width: 1.75rem;
    height: 1.75rem;
  }

  button.sm {
    width: 1.25rem;
    height: 1.25rem;
  }

  button.active {
    color: var(--theme-accent);
  }

  button:hover {
    background-color: var(--theme-primary-50);
    color: var(--theme-primary-900);
  }
</style>
